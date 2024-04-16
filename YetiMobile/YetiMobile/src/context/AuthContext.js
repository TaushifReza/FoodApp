import React, { createContext, useState } from "react";

// Create the AuthContext
export const AuthContext = createContext();

// Create the AuthProvider component
export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState(null);

  const setAuthInfo = (data) => {
    setAuthData(data);
  };

  return (
    <AuthContext.Provider value={{ authData, setAuthInfo }}>
      {children}
    </AuthContext.Provider>
  );
};
