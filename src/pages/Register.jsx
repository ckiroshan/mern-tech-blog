import { useState } from "react";
import { createUser } from "../service/api";
import { useNavigate } from "react-router-dom";
import { MdCheckCircle } from "react-icons/md";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  async function handleFormSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await createUser({ username, password });

      if (response.status === 201) {
        setShowSuccess(true);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        alert("Registration failed");
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert("An error occurred during registration");
    } finally {
      setIsSubmitting(false);
    }
  }
  return (
    <form className="form" onSubmit={handleFormSubmit}>
      <h1 className="post__heading">Register</h1>
      {showSuccess && (
        <div className="alert alert-success">
          <MdCheckCircle size={20} />
          <span>Registration successful! Redirecting to login...</span>
        </div>
      )}
      <input type="text" className="form__input" placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" className="form__input" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button className="form__button" disabled={isSubmitting} style={{ opacity: isSubmitting ? 0.7 : 1 }}>
        {isSubmitting ? "Submitting..." : "Register"}
      </button>
    </form>
  );
};

export default Register;
