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
    <div className="profile__field">
      <span className="field__label">{label}:</span>
      {isEditing ? (
        <div className="edit__field__group">
          <input type={password ? "password" : "text"} value={fieldValue} onChange={(e) => setFieldValue(e.target.value)} className="field__input" disabled={isUpdating} />
          <div className="edit__controls">
            <button onClick={handleSave} className="control__button save" disabled={isUpdating}>
              ✓
            </button>
            <button onClick={handleCancel} className="control__button cancel" disabled={isUpdating}>
              ✕
            </button>
          </div>
          {error && <div className="field__error">{error}</div>}
        </div>
      ) : (
        <div className="field__value__group">
          <span className="field__value">{password ? "•".repeat(6) : fieldValue}</span>
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
