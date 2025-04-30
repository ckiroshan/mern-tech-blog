import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../service/UserContext";
import { getProfile, logoutUser } from "../service/api";
import PlusIcon from "./icons/PlusIcon";
import HamburgerIcon from "./icons/HamburgerIcon";
import UserIcon from "./icons/UserIcon";
import LogoutIcon from "./icons/LogoutIcon";
import SearchIcon from "./icons/SearchIcon";

const Header = () => {
  const { userInfo, setUserInfo, searchQuery, setSearchQuery } = useContext(UserContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);

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
      <Link to="/" className="header__logo">
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
            <Link className="nav-link" to="/add-post">
              <PlusIcon />
              Create Post
            </Link>

            <div className="user-menu">
              <span className="username">Hey, {username}</span>
              <button className="hamburger-btn" onClick={() => setDropdownOpen(!dropdownOpen)}>
                <HamburgerIcon />
              </button>

              {dropdownOpen && (
                <div className="dropdown">
                  <div className="dropdown-item">
                    <UserIcon />
                    <span>My Profile</span>
                  </div>
                  <div className="dropdown-item" onClick={logout}>
                    <LogoutIcon />
                    <span>Logout</span>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
        {!username && (
          <>
            <Link className="nav-link" to="/login">
              Login
            </Link>
            <Link className="nav-link" to="/register">
              Register
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
