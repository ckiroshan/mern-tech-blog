import { useState } from "react";
import { createUser } from "../service/api";
import { Link, useNavigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { MdCheckCircle } from "react-icons/md";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  async function handleFormSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await createUser({ firstName, lastName, email, username, password });

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
      <p className="contact-text">Fill & submit this form to create a new account.</p>
      {showSuccess && (
        <div className="alert alert-success">
          <MdCheckCircle size={20} />
          <span>Registration successful! Redirecting to login...</span>
        </div>
      )}
      <input type="text" className="form__input" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
      <input type="text" className="form__input" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
      <input type="text" className="form__input" placeholder="Email ID" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="text" className="form__input" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" className="form__input" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button className="form__button" disabled={isSubmitting} style={{ opacity: isSubmitting ? 0.7 : 1 }}>
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
      <p className="contact-text">
        Already have an account? Login from <Link to={"/login"}>here</Link>.
      </p>
    </form>
  );
};

export default Register;
