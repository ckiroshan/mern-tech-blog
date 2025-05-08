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
  const { userInfo } = useContext(UserContext);
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalPosts: 0,
    pendingPosts: 0,
  });
  const [users, setUsers] = useState([]);
  const [pendingPosts, setPendingPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Redirect if not admin
  useEffect(() => {
    if (!userInfo?.isAdmin) {
      navigate("/");
      console.log(userInfo);
    }
  }, [userInfo, navigate]);

  // Data fetching handler
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

  // Load data on component mount
  useEffect(() => {
    loadData();
  }, [loadData]);

  // Post approval handler
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

  // Post deletion handler
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

  // User deletion handler
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

  if (loading) {
    return <div className="admin-loading">Loading admin data...</div>;
  }

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      {/* Stats Cards */}
      <AdminStats stats={stats} />
      {/* Pending Posts Table */}
      <PendingPostsTable posts={pendingPosts} onApprove={handleApprovePost} onDelete={handleDeletePost} />
      {/* All Users Table */}
      <UsersTable users={users} onDelete={handleDeleteUser} />
      {/* Approved Posts Table */}
      <ApprovedPostsTable posts={allPosts} onApprove={handleApprovePost} onDelete={handleDeletePost} />
    </div>
  );
};

export default AdminDashboard;
