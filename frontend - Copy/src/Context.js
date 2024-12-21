import React, { createContext, useState, useEffect } from 'react';

// Create AuthContext
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const initialToken = localStorage.getItem('token');
  console.log('Initial Token:', initialToken);

  const [token, setToken] = useState(initialToken);

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  const login = (newToken) => {
    setToken(newToken);
  };

  const logout = () => {
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, setToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};