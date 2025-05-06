import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../service/UserContext";
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
  const [posts, setPosts] = useState([]);

  // Redirect if not admin
  useEffect(() => {
    if (!userInfo?.isAdmin) {
      navigate("/");
      console.log(userInfo);
    }
  }, [userInfo, navigate]);

  // Load dummy data for testing
  useEffect(() => {
    // Replace with actual API calls later
    setStats({
      totalUsers: 42,
      totalPosts: 156,
      pendingPosts: 8,
    });

    setUsers([
      { id: 1, firstName: "The", lastName: "Admin", username: "admin", email: "admin@example.com", posts: 12 },
      { id: 2, firstName: "John", lastName: "Doe", username: "john_doe", email: "john@example.com", posts: 5 },
      { id: 3, firstName: "Jane", lastName: "Smith", username: "jane_smith", email: "jane@example.com", posts: 8 },
      { id: 4, firstName: "Tech", lastName: "Guy", username: "tech_guy", email: "tech@example.com", posts: 15 },
    ]);

    setPosts([
      {
        id: 1,
        title: "React Hooks Guide",
        author: "john_doe",
        status: "approved",
        createdAt: "2023-05-15",
      },
      {
        id: 2,
        title: "Node.js Best Practices",
        author: "jane_smith",
        status: "pending",
        createdAt: "2023-05-16",
      },
      {
        id: 3,
        title: "MongoDB Optimization",
        author: "tech_guy",
        status: "pending",
        createdAt: "2023-05-17",
      },
      {
        id: 4,
        title: "CSS Grid Tutorial",
        author: "john_doe",
        status: "approved",
        createdAt: "2023-05-18",
      },
    ]);
  }, []);

  const handleApprovePost = (postId) => {
    // TODO: Implement API call
    setPosts(posts.map((post) => (post.id === postId ? { ...post, status: "approved" } : post)));
    setStats((prev) => ({
      ...prev,
      pendingPosts: prev.pendingPosts - 1,
    }));
  };

  const handleDeletePost = (postId) => {
    // TODO: Implement API call
    setPosts(posts.filter((post) => post.id !== postId));
    setStats((prev) => ({
      ...prev,
      totalPosts: prev.totalPosts - 1,
      pendingPosts: posts.find((p) => p.id === postId)?.status === "pending" ? prev.pendingPosts - 1 : prev.pendingPosts,
    }));
  };

  const handleDeleteUser = (userId) => {
    // TODO: Implement API call
    const userPosts = 5; // Would get this from API in real implementation
    setUsers(users.filter((user) => user.id !== userId));
    setStats((prev) => ({
      ...prev,
      totalUsers: prev.totalUsers - 1,
      totalPosts: prev.totalPosts - userPosts,
    }));
  };

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
        <h2>Posts Awaiting Approval</h2>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts
                .filter((post) => post.status === "pending")
                .map((post) => (
                  <tr key={post.id}>
                    <td>{post.title}</td>
                    <td>{post.author}</td>
                    <td>{post.createdAt}</td>
                    <td className="actions">
                      <button className="approve-btn" onClick={() => handleApprovePost(post.id)}>
                        Approve
                      </button>
                      <button className="delete-btn" onClick={() => handleDeletePost(post.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* All Users Table */}
      <section className="admin-section">
        <h2>User Management</h2>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Username</th>
                <th>Email</th>
                <th>Posts</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{`${user.firstName} ${user.lastName}`}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.posts}</td>
                  <td className="actions">
                    <button className="approve-btn" onClick={() => handleDeleteUser(user.id)}>
                      Edit
                    </button>
                    <button className="delete-btn" onClick={() => handleDeleteUser(user.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Pending Posts Table */}
      <section className="admin-section">
        <h2>Posts Management</h2>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts
                .filter((post) => post.status === "pending")
                .map((post) => (
                  <tr key={post.id}>
                    <td>{post.title}</td>
                    <td>{post.author}</td>
                    <td>{post.createdAt}</td>
                    <td className="actions">
                      <button className="approve-btn" onClick={() => handleApprovePost(post.id)}>
                        Approve
                      </button>
                      <button className="delete-btn" onClick={() => handleDeletePost(post.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;
