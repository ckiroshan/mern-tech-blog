import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { UserContext } from "../service/UserContext";
import { getProfile, logoutUser } from "../service/api";
import PlusIcon from "./icons/PlusIcon";
import HamburgerIcon from "./icons/HamburgerIcon";
import UserIcon from "./icons/UserIcon";
import LogoutIcon from "./icons/LogoutIcon";
import SearchIcon from "./icons/SearchIcon";
import { MdContactPhone } from "react-icons/md";
import { RiLoginCircleFill } from "react-icons/ri";
import { IoIosPersonAdd } from "react-icons/io";
import AdminIcon from "./icons/AdminIcon";

const Header = () => {
  // Access & update user context
  const { userInfo, setUserInfo, searchQuery, setSearchQuery } = useContext(UserContext);
  // Use-State variables: dropdownOpen, isMobile
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 800);

  const location = useLocation();
  const isHomePage = location.pathname === "/";

  // Track window resize for mobile view
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 800);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch user profile on load
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

  // Handle logout
  async function logout() {
    try {
      await logoutUser();
      setUserInfo(null);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  // Search handlers
  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const username = userInfo?.username;
  const id = userInfo?.id;
  const Name = `${userInfo?.firstName} ${userInfo?.lastName}`;

  return (
    <header>
      <Link to="/" className="header__logo">
        iRO-BiTS
      </Link>
      <nav>
        {/* Show search bar only on homepage */}
        {isHomePage && (
          <form className="search-form" onSubmit={handleSearch}>
            <input type="text" placeholder="Search..." value={searchQuery} onChange={handleSearchChange} className="search-input" />
            <button type="submit" className="search-button">
              <SearchIcon />
            </button>
          </form>
        )}
        <div className="user-menu">
          {/* Desktop view: nav-links */}
          {!isMobile && username && (
            <>
              <Link className="nav-link" to="/add-post">
                <PlusIcon />
                Create Post
              </Link>
              <span className="username">Hola, {Name}!</span>
            </>
          )}

          {!isMobile && !username && (
            <>
              <Link className="nav-link" to="/login">
                <RiLoginCircleFill />
                Login
              </Link>
              <Link className="nav-link" to="/register">
                <IoIosPersonAdd />
                Register
              </Link>
            </>
          )}

          {/* Mobile hamburger menu */}
          <button className="hamburger-btn" onClick={() => setDropdownOpen(!dropdownOpen)} aria-label="Menu">
            <HamburgerIcon />
          </button>

          {/* Mobile: dropdown menu */}
          {dropdownOpen && (
            <div className="dropdown">
              {/* For logged-in users on mobile */}
              {isMobile && username && (
                <>
                  <Link className="dropdown-item" to="/add-post" onClick={() => setDropdownOpen(false)}>
                    <PlusIcon />
                    <span>Create Post</span>
                  </Link>
                </>
              )}

              {/* Mobile: For logged-out users */}
              {isMobile && !username && (
                <>
                  <Link className="dropdown-item" to="/login" onClick={() => setDropdownOpen(false)}>
                    <span>Login</span>
                  </Link>
                  <Link className="dropdown-item" to="/register" onClick={() => setDropdownOpen(false)}>
                    <span>Register</span>
                  </Link>
                </>
              )}

              {/* All devices: For logged-in users */}
              {username && (
                <>
                  {/* Admin Dashboard (Admin only) */}
                  {userInfo?.isAdmin && (
                    <Link className="dropdown-item" to="/user/admin" onClick={() => setDropdownOpen(false)}>
                      <AdminIcon />
                      <span>Admin Dashboard</span>
                    </Link>
                  )}
                  <Link className="dropdown-item" to={`/user/profile/${id}`} onClick={() => setDropdownOpen(false)}>
                    <UserIcon />
                    <span>My Profile</span>
                  </Link>
                  <div className="dropdown-item" onClick={logout}>
                    <LogoutIcon />
                    <span>Logout</span>
                  </div>
                </>
              )}
              {/* Contact Page */}
              <Link className="dropdown-item" to="/contact" onClick={() => setDropdownOpen(false)}>
                <MdContactPhone />
                <span>Contact Us</span>
              </Link>
              {/* Logout link */}
              {username && (
                <div className="dropdown-item" onClick={logout}>
                  <LogoutIcon />
                  <span>Logout</span>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
