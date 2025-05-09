import { useState, useContext, useEffect } from "react";
import { UserContext } from "../service/UserContext";
import { fetchUserPosts, updateUser } from "../service/api";
import { format } from "date-fns";
import ProfileField from "../components/buttons/ProfileField";
import UserPost from "../components/UserPost";
import PostPagination from "../components/buttons/PostPagination";
import { Link } from "react-router-dom";

const MyProfile = () => {
  const { userInfo, setUserInfo } = useContext(UserContext);
  const [isUpdating, setIsUpdating] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [userPosts, setUserPosts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoadingPosts, setIsLoadingPosts] = useState(false);

  // Constants for pagination
  const POSTS_PER_PAGE = 3;

  useEffect(() => {
    const loadPosts = async () => {
      if (userInfo?.id) {
        setIsLoadingPosts(true);
        try {
          const data = await fetchUserPosts(
            userInfo.id,
            currentPage + 1, // API uses 1-based index
            POSTS_PER_PAGE
          );
          setUserPosts(data.posts);
          setTotalPages(data.totalPages);
        } catch (error) {
          console.error("Error loading posts:", error);
        } finally {
          setIsLoadingPosts(false);
        }
      }
    };
    loadPosts();
  }, [currentPage, userInfo?.id]);

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

  const formattedDate = format(new Date(userInfo.createdAt), "MMM d, yyyy | h:mm a");

  return (
    <div className="profile__container">
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
      <div className="posts__section">
        <div className="profile__header">
          <h2 className="profile__title">My Posts</h2>
          {userPosts.length > 0 && <PostPagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />}
        </div>
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
