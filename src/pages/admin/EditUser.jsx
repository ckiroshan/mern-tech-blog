import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUserById, updateUserById } from "../../service/api";
import { MdCheckCircle } from "react-icons/md";

const EditUser = () => {
  // Get user ID from URL
  const { userId } = useParams();
  // Hook to access navigation
  const navigate = useNavigate();
  // Use-State variables: form-data, submission-state, success-message toggle
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    isAdmin: false,
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Fetch user data on component mount
  useEffect(() => {
    const loadUser = async () => {
      try {
        const user = await getUserById(userId);
        setFormData({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          username: user.username,
          isAdmin: user.isAdmin,
          password: "", // Keep password blank unless changed
        });
      } catch (error) {
        console.error("Failed to load user:", error);
      }
    };
    loadUser();
  }, [userId]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Only send password if it's not empty
      const updateData = { ...formData };
      if (!updateData.password) {
        delete updateData.password;
      }

      await updateUserById(userId, updateData);
      setShowSuccess(true);
      // Redirect after short delay
      setTimeout(() => {
        navigate("/user/admin");
      }, 1500);
    } catch (error) {
      console.error("Update failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h1 className="post__heading">Edit User</h1>
      {/* Success alert */}
      {showSuccess && (
        <div className="alert alert-success">
          <MdCheckCircle size={20} />
          <span>User updated successfully!</span>
        </div>
      )}
      {/* Input fields */}
      <input type="text" name="firstName" className="form__input" placeholder="First Name" value={formData.firstName} onChange={handleChange} />
      <input type="text" name="lastName" className="form__input" placeholder="Last Name" value={formData.lastName} onChange={handleChange} />
      <input type="email" name="email" className="form__input" placeholder="Email" value={formData.email} onChange={handleChange} />
      <input type="text" name="username" className="form__input" placeholder="Username" value={formData.username} onChange={handleChange} />
      <input type="password" name="password" className="form__input" placeholder="New Password (leave blank to keep current)" value={formData.password} onChange={handleChange} />
      {/* Admin checkbox */}
      <div className="form-checkbox">
        <input type="checkbox" name="isAdmin" id="isAdmin" checked={formData.isAdmin} onChange={handleChange} />
        <label htmlFor="isAdmin">Admin User</label>
      </div>
      {/* Submit button */}
      <button className="form__button" disabled={isSubmitting}>
        {isSubmitting ? "Updating..." : "Update User"}
      </button>
    </form>
  );
};

export default EditUser;
