import { createContext, useState, useEffect } from "react";

// New context to manage user data
export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [userInfo, setUserInfo] = useState(() => {
    // Initialize userInfo state from localStorage if available
    const storedUser = typeof window !== "undefined" ? localStorage.getItem("userInfo") : null;
    return storedUser ? JSON.parse(storedUser) : {};
  });

  // Search query state (shared across components)
  const [searchQuery, setSearchQuery] = useState("");

  // Sync userInfo to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
    }
  }, [userInfo]);

  return (
    // Pass user userInfo & search query state to all child components
    <UserContext.Provider
      value={{
        userInfo,
        setUserInfo,
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
