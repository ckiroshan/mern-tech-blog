import React, { useContext, useEffect } from "react";
import React from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../service/UserContext";
import { getProfile } from "../service/api";

const Header = () => {
  const { userInfo, setUserInfo } = useContext(UserContext);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const userInfo = await getProfile();
        setUserInfo(userInfo);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    }
    fetchProfile();
  }, []);
  
  const username = userInfo?.username;

  return (
    <header>
      <Link to="/" className="logo">
        iBlog
      </Link>
      <nav>
        {username && (
          <>
            <Link to="/add-post">Add new post</Link>
            <a onClick={logout}>Logout</a>
          </>
        )}
        {!username && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
