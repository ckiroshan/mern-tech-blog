import React, { useContext } from "react";
import React from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../service/UserContext";

const Header = () => {
  const { userInfo, setUserInfo } = useContext(UserContext);

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
