import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../service/UserContext";

// A wrapper to protect routes based on user authentication status
const ProtectedRoute = ({ children, requireAuth = true }) => {
  const { userInfo } = useContext(UserContext);

  // Redirect to login 
  if (requireAuth && !userInfo) {
    // if auth is required but user is not logged in
    return <Navigate to="/login" replace />;
  }

  // Redirect from auth pages (login, register)
  if (!requireAuth && userInfo) {
    // if user is already logged in
    return <Navigate to="/" replace />;
  }

  // Else, render the child component
  return children;
};

export default ProtectedRoute;
