import React, { createContext, useState, useEffect, useCallback } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const savedToken = localStorage.getItem('token');
    
    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser));
      setToken(savedToken);
      setIsLoggedIn(true);
    }
    setLoading(false);
  }, []);

  const login = useCallback((userData) => {
    setUser({
      _id: userData._id,
      name: userData.name,
      email: userData.email,
      role: userData.role
    });
    setToken(userData.token);
    setIsLoggedIn(true);
    
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', userData.token);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    setToken(null);
    setIsLoggedIn(false);
  }, []);

  const value = {
    user, setUser,
    token, setToken,
    isLoggedIn, setIsLoggedIn,
    loading,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
