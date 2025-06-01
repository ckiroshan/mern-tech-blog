import { useState } from "react";

// Reusable component for displaying & editing user profile field
const ProfileField = ({ label, value, editable = false, password = false, fieldName, onSave, isUpdating }) => {
  const [isEditing, setIsEditing] = useState(false);      // Track edit mode (On/Off)
  const [fieldValue, setFieldValue] = useState(value);   // Editable value 
  const [error, setError] = useState("");               // Validation error message

  // Handle each field's edit value
  const handleEdit = () => {
    setFieldValue(value);
    setIsEditing(true);
    setError("");
  };

  // Handle save changes
  const handleSave = async () => {
    // Skip if no change
    if (fieldValue === value) {
      setIsEditing(false);
      return;
    }

    // Else validate password
    if (password && fieldValue.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    // Attempt to save
    const success = await onSave(fieldName, fieldValue);
    if (success) {
      setIsEditing(false);
    } else {
      setError("Failed to update");
    }
  };

  // Cancel editing & reset
  const handleCancel = () => {
    setFieldValue(value);
    setIsEditing(false);
    setError("");
  };

  return (
    <div className="profile__field">
      <span className="field__label">{label}:</span>
      {/* Editing Mode of a field */}
      {isEditing ? (
        <div className="edit__field__group">
          <input type={password ? "password" : "text"} value={fieldValue} onChange={(e) => setFieldValue(e.target.value)} className="field__input" disabled={isUpdating} />
          <div className="edit__controls">
            {/* Save button */}
            <button onClick={handleSave} className="control__button save" disabled={isUpdating}>
              ✓
            </button>
            {/* Cancel button */}
            <button onClick={handleCancel} className="control__button cancel" disabled={isUpdating}>
              ✕
            </button>
          </div>
          {error && <div className="field__error">{error}</div>}
        </div>
      ) : (
        // Display mode
        <div className="field__value__group">
          <span className="field__value">{password ? "•".repeat(6) : fieldValue}</span>
          {/* Edit icon if field is editable */}
          {editable && (
            <button onClick={handleEdit} className="edit__button" disabled={isUpdating}>
              ✎
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfileField;
