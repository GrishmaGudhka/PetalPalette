// src/components/AuthContext.js

import React, { createContext, useState } from "react";

// Create Authentication Context
export const AuthContext = createContext();

// Authentication Provider
export const AuthProvider = ({ children }) => {

  // Retrieve user from localStorage if available
  const storedUser = JSON.parse(localStorage.getItem("user"));

  // User State
  const [user, setUser] = useState(storedUser);

  // Login State
  const [isLoggedIn, setIsLoggedIn] = useState(!!storedUser);

  // Login Function
  const login = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
    setIsLoggedIn(true);
  };

  // Logout Function
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};