import { useState } from "react";

const MyProfile = () => {
  return (
    <div className="profile-container">
      <div className="profile-section">
        <div className="profile-header">
          <h2 className="profile-title">My Info</h2>
        </div>
        <div className="profile-details">
          <ProfileField label="Email" value="smicheals@gmail.com" />
          <ProfileField label="Username" value="smicheals77" />
          <ProfileField label="Password" value="******" editable password />
          <ProfileField label="First Name" value="John" editable />
          <ProfileField label="Last Name" value="Doe" editable />
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

const ProfileField = ({ label, value, editable = false, password = false }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [fieldValue, setFieldValue] = useState(value);

  const handleEdit = () => setIsEditing(true);
  const handleSave = () => setIsEditing(false);
  const handleCancel = () => {
    setFieldValue(value);
    setIsEditing(false);
  };

  return (
    <div className="profile-field">
      <span className="field-label">{label}:</span>

      {isEditing ? (
        <div className="edit-field-group">
          <input type={password ? "password" : "text"} value={fieldValue} onChange={(e) => setFieldValue(e.target.value)} className="field-input" />
          <div className="edit-controls">
            <button onClick={handleSave} className="control-button save">
              ✓
            </button>
            <button onClick={handleCancel} className="control-button cancel">
              ✕
            </button>
          </div>
        </div>
      ) : (
        <div className="field-value-group">
          <span className="field-value">{password ? "•".repeat(6) : fieldValue}</span>
          {editable && (
            <button onClick={handleEdit} className="edit-button">
              ✎
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default MyProfile;
