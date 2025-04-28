import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../service/UserContext";
import { getProfile, logoutUser } from "../service/api";

const Header = () => {
  const { userInfo, setUserInfo, searchQuery, setSearchQuery } = useContext(UserContext);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const userInfo = await getProfile();
        // Will be null if not authenticated
        setUserInfo(userInfo || null);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
        setUserInfo(null);
      }
    }
    fetchProfile();
  }, []);

  async function logout() {
    try {
      await logoutUser();
      setUserInfo(null);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const username = userInfo?.username;

  return (
    <header>
      <Link to="/" className="logo">
        iRO-BiTS
      </Link>
      <nav>
        <form className="search-form" onSubmit={handleSearch}>
          <input type="text" placeholder="Search..." value={searchQuery} onChange={handleSearchChange} className="search-input" />
          <button type="submit" className="search-button">
            <SearchIcon />
          </button>
        </form>
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
