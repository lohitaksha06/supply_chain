'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { User } from '@/types'

interface AuthContextType {
  user: User | null
  token: string | null
  login: (token: string, user: User) => void
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    // Load auth data from localStorage on mount
    const storedToken = localStorage.getItem('authToken')
    const storedUser = localStorage.getItem('user')
    const storedRole = localStorage.getItem('role')

    if (storedToken && storedUser && storedRole) {
      try {
        const userData = JSON.parse(storedUser)
        setToken(storedToken)
        setUser({
          id: userData.id || '',
          username: userData.username || userData,
          email: userData.email || '',
          role: storedRole as 'company' | 'hospital' | 'customer'
        })
      } catch (error) {
        // Clear invalid data
        localStorage.clear()
      }
    }
  }, [])

  const login = (newToken: string, userData: User) => {
    setToken(newToken)
    setUser(userData)
    localStorage.setItem('authToken', newToken)
    localStorage.setItem('user', JSON.stringify(userData))
    localStorage.setItem('role', userData.role)
  }

  const logout = () => {
    setToken(null)
    setUser(null)
    localStorage.removeItem('authToken')
    localStorage.removeItem('user')
    localStorage.removeItem('role')
  }

  return (
    <AuthContext.Provider value={{
      user,
      token,
      login,
      logout,
      isAuthenticated: !!token && !!user
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}