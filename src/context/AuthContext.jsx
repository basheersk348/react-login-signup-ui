import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('currentUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const signup = (userData) => {
    const existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    
    const userExists = existingUsers.some(
      (u) => u.email.toLowerCase() === userData.email.toLowerCase()
    );

    if (userExists) {
      return { success: false, message: 'This email is already registered!' };
    }

    const updatedUsers = [...existingUsers, userData];
    localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));
    localStorage.setItem('currentUser', JSON.stringify(userData));
    setUser(userData);

    return { success: true };
  };

  const login = (email, password) => {
    const existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const matchedUser = existingUsers.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (matchedUser) {
      localStorage.setItem('currentUser', JSON.stringify(matchedUser));
      setUser(matchedUser);
      return { success: true };
    }

    return { success: false, message: 'Invalid email or password!' };
  };

  const logout = () => {
    localStorage.removeItem('currentUser');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);