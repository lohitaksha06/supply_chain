import { Navigate } from 'react-router-dom';
import React from 'react';

interface AuthRouteProps {
  element: React.ReactElement;
}

const AuthRoute = ({ element }: AuthRouteProps) => {
  const isAuthenticated = !!localStorage.getItem('authToken');
  
  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/" replace />;
  }

  return element;
};

export default AuthRoute;
