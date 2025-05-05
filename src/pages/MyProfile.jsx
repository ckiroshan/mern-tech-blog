import { useState, useContext } from "react";
import { UserContext } from "../service/UserContext";
import { updateUser } from "../service/api";
import { format } from "date-fns";
import ProfileField from "../components/buttons/ProfileField";

const MyProfile = () => {
  const { userInfo, setUserInfo } = useContext(UserContext);
  const [isUpdating, setIsUpdating] = useState(false);

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
        </div>
        <div className="user-posts">
          {/* Posts will be rendered here */}
          <div className="no-posts">No posts created yet</div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
