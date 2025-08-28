import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Load user from localStorage on page load
  useEffect(() => {
    const storedUser = localStorage.getItem("coffeno_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const loginUser = (userData) => {
    setUser(userData);
    localStorage.setItem("coffeno_user", JSON.stringify(userData));
  };

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem("coffeno_user");
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};
