import { useState, useContext, useEffect } from "react";
import { UserContext } from "../service/UserContext";
import { fetchUserPosts, updateUser } from "../service/api";
import { format } from "date-fns";
import ProfileField from "../components/buttons/ProfileField";
import UserPost from "../components/UserPost";
import PostPagination from "../components/buttons/PostPagination";
import { Link } from "react-router-dom";

const MyProfile = () => {
  // Access user info from context
  const { userInfo, setUserInfo } = useContext(UserContext);
  // Use-State variables: isUpdating, currentPage, userPosts, totalPages, isLoadingPosts
  const [isUpdating, setIsUpdating] = useState(false);             // Track profile field
  const [currentPage, setCurrentPage] = useState(0);              // Track current page
  const [userPosts, setUserPosts] = useState([]);                // list of all posts
  const [totalPages, setTotalPages] = useState(1);              // Total number of pages
  const [isLoadingPosts, setIsLoadingPosts] = useState(false); // loading message

  // Pagination: Posts displayed per page
  const POSTS_PER_PAGE = 3;

  // Fetch posts for the logged-in user
  useEffect(() => {
    const loadPosts = async () => {
      if (userInfo?.id) {
        setIsLoadingPosts(true);
        try {
          const data = await fetchUserPosts(
            userInfo.id,
            currentPage + 1, // API expects 1-based indexing
            POSTS_PER_PAGE
          );
          setUserPosts(data.posts);        // Update posts
          setTotalPages(data.totalPages); // Update total pages
        } catch (error) {
          console.error("Error loading posts:", error);
        } finally {
          setIsLoadingPosts(false);
        }
      }
    };
    loadPosts();
  }, [currentPage, userInfo?.id]);

  // Handle user field updates (password, firstName, lastName)
  const handleUpdate = async (field, newValue) => {
    setIsUpdating(true);
    try {
      const updateData = { [field]: newValue };
      const response = await updateUser(updateData);

      if (response.ok) {
        const updatedUser = await response.json();
        setUserInfo(updatedUser); // Update context with new data
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

  // Handle page navigation (pagination)
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // Date Format for user's joined date
  const formattedDate = format(new Date(userInfo.createdAt), "MMM d, yyyy | h:mm a");

  return (
    <div className="profile__container">
      
      {/* Section: User Info */}
      <div className="profile__section">
        <div className="profile__header">
          <h2 className="profile__title">My Info</h2>
        </div>
        <div className="profile__details">
          <ProfileField label="Joined" value={formattedDate} />
          <ProfileField label="Email" value={userInfo?.email || ""} />
          <ProfileField label="Username" value={userInfo?.username || ""} />
          <ProfileField label="Password" editable password fieldName="password" onSave={handleUpdate} isUpdating={isUpdating} />
          <ProfileField label="First Name" value={userInfo?.firstName || ""} editable fieldName="firstName" onSave={handleUpdate} isUpdating={isUpdating} />
          <ProfileField label="Last Name" value={userInfo?.lastName || ""} editable fieldName="lastName" onSave={handleUpdate} isUpdating={isUpdating} />
        </div>
      </div>

      {/* Section: User's Posts */}
      <div className="posts__section">
        <div className="profile__header">
          <h2 className="profile__title">My Posts</h2>
          {/* Show pagination only if posts exist */}
          {userPosts.length > 0 && <PostPagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />}
        </div>

        {/* Conditionally render post loading or empty state */}
        {isLoadingPosts ? (
          <div className="loading__text">Loading posts...</div>
        ) : userPosts.length > 0 ? (
          userPosts.map((post) => <UserPost key={post._id} post={post} />)
        ) : (
          <div className="no__posts">
            <p>No posts created yet</p>
            <Link to="/add-post" className="create__post__link">
              Create your first post
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
