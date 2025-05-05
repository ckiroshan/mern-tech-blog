import { useState } from "react";

const ProfileField = ({ label, value, editable = false, password = false, fieldName, onSave, isUpdating }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [fieldValue, setFieldValue] = useState(value);
  const [error, setError] = useState("");

  const handleEdit = () => {
    setFieldValue(value);
    setIsEditing(true);
    setError("");
  };

  const handleSave = async () => {
    if (fieldValue === value) {
      setIsEditing(false);
      return;
    }

    if (password && fieldValue.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    const success = await onSave(fieldName, fieldValue);
    if (success) {
      setIsEditing(false);
    } else {
      setError("Failed to update");
    }
  };

  const handleCancel = () => {
    setFieldValue(value);
    setIsEditing(false);
    setError("");
  };

  return (
    <div className="profile-field">
      <span className="field-label">{label}:</span>

      {isEditing ? (
        <div className="edit-field-group">
          <input type={password ? "password" : "text"} value={fieldValue} onChange={(e) => setFieldValue(e.target.value)} className="field-input" disabled={isUpdating} />
          <div className="edit-controls">
            <button onClick={handleSave} className="control-button save" disabled={isUpdating}>
              ✓
            </button>
            <button onClick={handleCancel} className="control-button cancel" disabled={isUpdating}>
              ✕
            </button>
          </div>
          {error && <div className="field-error">{error}</div>}
        </div>
      ) : (
        <div className="field-value-group">
          <span className="field-value">{password ? "•".repeat(6) : fieldValue}</span>
          {editable && (
            <button onClick={handleEdit} className="edit-button" disabled={isUpdating}>
              ✎
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfileField;
