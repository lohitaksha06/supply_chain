import { Navigate } from 'react-router-dom';
import React from 'react';

interface ProtectedRouteProps {
  element: React.ReactElement;
  allowedRoles?: string[];
}

const ProtectedRoute = ({ element, allowedRoles = [] }: ProtectedRouteProps) => {
  const isAuthenticated = !!localStorage.getItem('authToken');
  const userRole = localStorage.getItem('role');

  // Check if user is authenticated
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // If roles are specified, check if user has required role
  if (allowedRoles.length > 0 && userRole && !allowedRoles.includes(userRole)) {
    // Redirect to appropriate dashboard based on role
    const redirectPath = userRole ? `/${userRole}/home` : '/';
    return <Navigate to={redirectPath} replace />;
  }

  return element;
};

export default ProtectedRoute;
