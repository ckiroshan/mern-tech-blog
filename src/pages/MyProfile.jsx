import { useState, useContext } from "react";
import { UserContext } from "../service/UserContext";
import { updateUser } from "../service/api";
import { format } from "date-fns";
import ProfileField from "../components/buttons/ProfileField";
import UserPost from "../components/UserPost";
import PostPagination from "../components/buttons/PostPagination";

const MyProfile = () => {
  const { userInfo, setUserInfo } = useContext(UserContext);
  const [isUpdating, setIsUpdating] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  // Dummy posts data
  const [userPosts, setUserPosts] = useState([
    {
      _id: "1",
      title: "My First Blog Post",
      summary: "This is a summary of my first post about web development.",
      content: "<p>Full content would go here...</p>",
      categories: ["Web Development"],
      cover: "uploads/image1.jpg",
      updatedAt: new Date().toISOString(),
    },
    {
      _id: "2",
      title: "Learning React Hooks",
      summary: "My journey learning React hooks and state management.",
      content: "<p>Full content about React hooks...</p>",
      categories: ["Programming", "Frameworks"],
      cover: "uploads/image2.jpg",
      updatedAt: new Date(Date.now() - 86400000).toISOString(),
    },
  ]);

  // Constants for pagination
  const POSTS_PER_PAGE = 3;
  const totalPages = Math.ceil(userPosts.length / POSTS_PER_PAGE);

  // Get current posts to display
  const currentPosts = userPosts.slice(currentPage * POSTS_PER_PAGE, (currentPage + 1) * POSTS_PER_PAGE);

  const handleUpdate = async (field, newValue) => {
    setIsUpdating(true);
    try {
      const updateData = { [field]: newValue };
      const response = await updateUser(updateData);

      if (response.ok) {
        const updatedUser = await response.json();
        setUserInfo(updatedUser);
        return true;
      } else {
        const error = await response.json();
        console.error("Update failed:", error);
        return false;
      }
    } catch (error) {
      console.error("Error updating user:", error);
      return false;
    } finally {
      setIsUpdating(false);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const formattedDate = format(new Date(userInfo.updatedAt), "MMM d, yyyy | h:mm a");

  return (
    <div className="profile-container">
      <div className="profile-section">
        <div className="profile-header">
          <h2 className="profile-title">My Info</h2>
        </div>
        <div className="profile-details">
          <ProfileField label="Joined" value={formattedDate} />
          <ProfileField label="Email" value={userInfo?.email || ""} />
          <ProfileField label="Username" value={userInfo?.username || ""} />
          <ProfileField label="Password" editable password fieldName="password" onSave={handleUpdate} isUpdating={isUpdating} />
          <ProfileField label="First Name" value={userInfo?.firstName || ""} editable fieldName="firstName" onSave={handleUpdate} isUpdating={isUpdating} />
          <ProfileField label="Last Name" value={userInfo?.lastName || ""} editable fieldName="lastName" onSave={handleUpdate} isUpdating={isUpdating} />
        </div>
      </div>

      <div className="posts-section">
        <div className="profile-header">
          <h2 className="profile-title">My Posts</h2>
          <PostPagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} className="post-pagination-controls" />
        </div>
        <>
          {currentPosts.length > 0 ? (
            currentPosts.map((post) => <UserPost key={post._id} post={post} />)
          ) : (
            <div className="no-posts">
              <p>No posts created yet</p>
            </div>
          )}
        </>
      </div>
    </div>
  );
};

export default MyProfile;
