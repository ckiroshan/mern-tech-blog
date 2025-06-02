import { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../service/UserContext";
import { fetchAdminStats, fetchAllUsers, fetchPendingPosts, fetchApprovedPosts, approvePost, deletePost, deleteUser } from "../../service/api";
import AdminStats from "./components/AdminStatsCards";
import PendingPostsTable from "./components/PendingPostsTable";
import UsersTable from "./components/UsersTable";
import ApprovedPostsTable from "./components/ApprovedPostsTable";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  // Access & update user context
  const { userInfo } = useContext(UserContext);
  // Hook to access navigation
  const navigate = useNavigate();
  // Use-State variables: stats, users, pending-posts, all-posts, loading state
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalPosts: 0,
    pendingPosts: 0,
  });
  const [users, setUsers] = useState([]);
  const [pendingPosts, setPendingPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Redirect non-admin users
  useEffect(() => {
    if (!userInfo?.isAdmin) {
      navigate("/");
      console.log(userInfo);
    }
  }, [userInfo, navigate]);

  // Load Admin-dashboard data
  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const [statsData, usersData, pendingData, allPostsData] = await Promise.all([fetchAdminStats(), fetchAllUsers(), fetchPendingPosts(), fetchApprovedPosts()]);

      setStats(statsData);
      setUsers(usersData);
      setPendingPosts(pendingData);
      setAllPosts(allPostsData.posts || []);
    } catch (error) {
      console.error("Failed to load admin data:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch data on component mount
  useEffect(() => {
    loadData();
  }, [loadData]);

  // Approve a post
  const handleApprovePost = useCallback(async (postId) => {
    try {
      await approvePost(postId);
      setPendingPosts((prev) => prev.filter((post) => post._id !== postId));
      setAllPosts((prev) => prev.map((post) => (post._id === postId ? { ...post, isApproved: true } : post)));
      setStats((prev) => ({
        ...prev,
        pendingPosts: prev.pendingPosts - 1,
      }));
    } catch (error) {
      console.error("Failed to approve post:", error);
    }
  }, []);

  // Delete a post
  const handleDeletePost = useCallback(
    async (postId) => {
      try {
        await deletePost(postId);
        const wasPending = pendingPosts.some((p) => p._id === postId);

        setPendingPosts((prev) => prev.filter((post) => post._id !== postId));
        setAllPosts((prev) => prev.filter((post) => post._id !== postId));
        setStats((prev) => ({
          ...prev,
          totalPosts: prev.totalPosts - 1,
          pendingPosts: wasPending ? prev.pendingPosts - 1 : prev.pendingPosts,
        }));
      } catch (error) {
        console.error("Failed to delete post:", error);
      }
    },
    [pendingPosts]
  );

  // Delete a user
  const handleDeleteUser = useCallback(async (userId) => {
    try {
      const response = await deleteUser(userId);
      const userPostCount = response.postsDeleted || 0;

      setUsers((prev) => prev.filter((user) => user._id !== userId));
      setAllPosts((prev) => prev.filter((post) => post.author._id !== userId));
      setStats((prev) => ({
        ...prev,
        totalUsers: prev.totalUsers - 1,
        totalPosts: prev.totalPosts - userPostCount,
      }));
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  }, []);

  // Show loader while data is being fetched
  if (loading) {
    return <div className="admin-loading">Loading admin data...</div>;
  }

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      {/* Stats Cards */}
      <AdminStats stats={stats} />
      {/* Table: Pending Posts */}
      <PendingPostsTable posts={pendingPosts} onApprove={handleApprovePost} onDelete={handleDeletePost} />
      {/* Table: All Users */}
      <UsersTable users={users} onDelete={handleDeleteUser} />
      {/* Table: Approved Posts */}
      <ApprovedPostsTable posts={allPosts} onApprove={handleApprovePost} onDelete={handleDeletePost} />
    </div>
  );
};

export default AdminDashboard;
