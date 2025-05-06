import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../service/UserContext";
import { format } from "date-fns";
import { fetchAdminStats, fetchAllUsers, fetchPendingPosts, fetchAllPosts, approvePost, deletePost, deleteUser } from "../../service/api";
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

  // Load real data from API
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        // Fetch all data in parallel
        const [statsData, usersData, pendingData, allPostsData] = await Promise.all([fetchAdminStats(), fetchAllUsers(), fetchPendingPosts(), fetchAllPosts()]);

        setStats(statsData);
        setUsers(usersData);
        setPendingPosts(pendingData);
        setAllPosts(allPostsData.posts || []);
      } catch (error) {
        console.error("Failed to load admin data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleApprovePost = async (postId) => {
    try {
      await approvePost(postId);
      setPendingPosts(pendingPosts.filter((post) => post._id !== postId));
      setAllPosts(allPosts.map((post) => (post._id === postId ? { ...post, isApproved: true } : post)));
      setStats((prev) => ({
        ...prev,
        pendingPosts: prev.pendingPosts - 1,
        totalPosts: prev.totalPosts,
      }));
    } catch (error) {
      console.error("Failed to approve post:", error);
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      await deletePost(postId);
      const wasPending = pendingPosts.some((p) => p._id === postId);
      setPendingPosts(pendingPosts.filter((post) => post._id !== postId));
      setAllPosts(allPosts.filter((post) => post._id !== postId));
      setStats((prev) => ({
        ...prev,
        totalPosts: prev.totalPosts - 1,
        pendingPosts: wasPending ? prev.pendingPosts - 1 : prev.pendingPosts,
      }));
    } catch (error) {
      console.error("Failed to delete post:", error);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      const response = await deleteUser(userId);
      const userPostCount = response.postsDeleted || 0;

      setUsers(users.filter((user) => user._id !== userId));
      setAllPosts(allPosts.filter((post) => post.author._id !== userId));
      setStats((prev) => ({
        ...prev,
        totalUsers: prev.totalUsers - 1,
        totalPosts: prev.totalPosts - userPostCount,
      }));
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  if (loading) {
    return <div className="admin-loading">Loading admin data...</div>;
  }

  const formattedDate = format(new Date(userInfo.updatedAt), "MMM d, yyyy | h:mm a");

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>

      {/* Stats Cards */}
      <div className="stats-container">
        <div className="stat-card">
          <h3>Total Users</h3>
          <p>{stats.totalUsers}</p>
        </div>
        <div className="stat-card">
          <h3>Total Posts</h3>
          <p>{stats.totalPosts}</p>
        </div>
        <div className="stat-card">
          <h3>Pending Approval</h3>
          <p>{stats.pendingPosts}</p>
        </div>
      </div>

      {/* Pending Posts Table */}
      <section className="admin-section">
        <h2>Posts Awaiting Approval ({pendingPosts.length})</h2>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Status</th>
                <th>Last Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pendingPosts.length > 0 ? (
                pendingPosts.map((post) => (
                  <tr key={post._id}>
                    <td>
                      <Link to={`/posts/${post._id}`}>{post.title}</Link>
                    </td>
                    <td>{post.author?.username || "Unknown"}</td>
                    <td>
                      <span className={`status-badge ${post.isApproved ? "approved" : "pending"}`}>{post.isApproved ? "Approved" : "Pending"}</span>
                    </td>
                    <td>{format(new Date(post.updatedAt), "MMM d, yyyy | h:mm a")}</td>
                    <td className="actions">
                      <button className="approve-btn" onClick={() => handleApprovePost(post._id)}>
                        Approve
                      </button>
                      <button>
                        <Link className="edit-btn" to={`/posts/edit/${post._id}`} onClick={(e) => e.stopPropagation()}>
                          Edit
                        </Link>
                      </button>
                      <button className="delete-btn" onClick={() => handleDeletePost(post._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="no-posts">
                    No posts pending approval
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* All Users Table */}
      <section className="admin-section">
        <h2>User Management ({users.length})</h2>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Joined</th>
                <th>Full Name</th>
                <th>Username</th>
                <th>Email</th>
                <th>Posts</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{formattedDate}</td>
                  <td>{`${user.firstName} ${user.lastName}`}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.postCount || 0}</td>
                  <td className="actions">
                    <button>
                      <Link className="edit-btn" to={`/admin/users/edit/${user._id}`} onClick={(e) => e.stopPropagation()}>
                        Edit
                      </Link>
                    </button>
                    <button className="delete-btn" onClick={() => handleDeleteUser(user._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Approved Posts Table */}
      <section className="admin-section">
        <h2>Approved Posts ({allPosts.length})</h2>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Status</th>
                <th>Created</th>
                <th>Last Updated</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {allPosts.length > 0 ? (
                allPosts.map((post) => (
                  <tr key={post._id}>
                    <td>
                      <Link to={`/posts/${post._id}`}>{post.title}</Link>
                    </td>
                    <td>{post.author?.username || "Unknown"}</td>
                    <td>
                      <span className={`status-badge ${post.isApproved ? "approved" : "pending"}`}>{post.isApproved ? "Approved" : "Pending"}</span>
                    </td>
                    <td>{format(new Date(post.createdAt), "MMM d, yyyy")}</td>
                    <td>{format(new Date(post.updatedAt), "MMM d, yyyy")}</td>
                    <td className="actions">
                      {!post.isApproved && (
                        <button className="approve-btn" onClick={() => handleApprovePost(post._id)}>
                          Approve
                        </button>
                      )}
                      <button>
                        <Link className="edit-btn" to={`/posts/edit/${post._id}`} onClick={(e) => e.stopPropagation()}>
                          Edit
                        </Link>
                      </button>
                      <button className="delete-btn" onClick={() => handleDeletePost(post._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="no-posts">
                    No posts found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;
