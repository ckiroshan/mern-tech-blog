import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../service/UserContext";

const ProtectedRoute = ({ children, requireAuth = true }) => {
  const { userInfo } = useContext(UserContext);

  if (requireAuth && !userInfo) {
    // Redirect to login if auth is required but user is not logged in
    return <Navigate to="/login" replace />;
  }

  if (!requireAuth && userInfo) {
    // Redirect from auth pages if already logged in
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
