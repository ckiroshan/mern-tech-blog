import { useContext, useState } from "react";
import { verifyUser } from "../service/api";
import { Navigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { userInfo, setUserInfo } = useContext(UserContext);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleFormSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await verifyUser({ username, password });

      if (response.status === 200) {
        const userData = await response.json();
        setUserInfo(userData);
        setRedirect(true);
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

  if (redirect) return <Navigate to={"/"} />;
  return (
    <form className="form" onSubmit={handleFormSubmit}>
      <h1 className="post__heading">Login</h1>
      <input type="text" className="form__input" placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" className="form__input" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button className="form__button" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Login"}
      </button>
    </form>
  );
};

export default Login;
