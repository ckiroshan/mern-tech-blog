import { useContext, useState } from "react";
import { verifyUser } from "../service/api";
import { Link, Navigate } from "react-router-dom";

const Login = () => {
  // Use-State variables: username, password
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false); // To redirect after login
  const [isSubmitting, setIsSubmitting] = useState(false); // To handle form submission status
  // Access & update user context
  const { userInfo, setUserInfo } = useContext(UserContext);

  // Handle login form submission
  async function handleFormSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await verifyUser({ username, password });

      if (response.status === 200) {
        const userData = await response.json();
        setUserInfo(userData); // Store user info in global context
        setRedirect(true);    // Trigger navigation to home
      } else {
        alert("Wrong Credentials, please try again!");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred during login");
    } finally {
      setIsSubmitting(false);
    }
  }

  // Redirect to home after successful login
  if (redirect) return <Navigate to={"/"} />;
  return (
    <form className="form" onSubmit={handleFormSubmit}>
      <h1 className="post__heading">Login</h1>
      <p className="contact-text">
        Are you new here? please register from <Link to={"/register"}>here</Link>
      </p>
      {/* Username input */}
      <input type="text" className="form__input" placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)} />
      {/* Password input */}
      <input type="password" className="form__input" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      {/* Submit button */}
      <button className="form__button" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
      {/* Password recovery info */}
      <p className="contact-text">
        Forgot password? Reach out to us from <Link to={"/contact"}>here</Link>, & you'll receive a temp password to login.
      </p>
    </form>
  );
};

export default Login;
