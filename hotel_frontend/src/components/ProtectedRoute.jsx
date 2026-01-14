import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // Check if the token exists in LocalStorage
  const token = localStorage.getItem('token');

  // If no token, kick them back to Login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // If token exists, let them see the page
  return children;
};

export default ProtectedRoute;