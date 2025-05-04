import { createContext, useState, useEffect } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [userInfo, setUserInfo] = useState(() => {
    // Initialize from localStorage if available
    const storedUser = typeof window !== "undefined" ? localStorage.getItem("userInfo") : null;
    return storedUser ? JSON.parse(storedUser) : {};
  });
  const [searchQuery, setSearchQuery] = useState("");

  // Persist to localStorage whenever userInfo changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
    }
  }, [userInfo]);

  return (
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
