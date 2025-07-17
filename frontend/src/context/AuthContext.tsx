import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

// 1. Define the shape of the context
interface AuthContextType {
  user: any;
  login: (userData: any) => void;
  logout: () => void;
}

// 2. Create the actual context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 3. Provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);

  const login = (userData: any) => {
    setUser(userData);
    // Optional: persist user in localStorage/sessionStorage
  };

  const logout = () => {
    setUser(null);
    // Optional: remove user from localStorage/sessionStorage
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// 4. Custom hook for easy access
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
