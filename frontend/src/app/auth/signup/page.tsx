'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import { Eye, EyeOff, Mail, Lock, User, Pill, Building2, Hospital } from 'lucide-react'
import axios from 'axios'
import { API_BASE_URL } from '@/lib/utils'

export default function SignupPage() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'customer'
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  
  const { login } = useAuth()
  const router = useRouter()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      setIsLoading(false)
      return
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters')
      setIsLoading(false)
      return
    }

    try {
      await axios.post(`${API_BASE_URL}/api/signup`, {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        role: formData.role
      })

      const loginResponse = await axios.post(`${API_BASE_URL}/api/login`, {
        email: formData.email,
        password: formData.password
      })

      const { token, user, role } = loginResponse.data

      if (token) {
        login(token, {
          id: '',
          username: user,
          name: user,
          email: formData.email,
          role: role as 'company' | 'hospital' | 'customer'
        })

        const roleRoutes = {
          company: '/dashboard/company',
          hospital: '/dashboard/hospital',
          customer: '/dashboard/customer'
        }
        
        router.push(roleRoutes[role as keyof typeof roleRoutes] || '/dashboard/customer')
      }
      
    } catch (err: any) {
      setError(err.response?.data?.message || 'Signup failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const roles = [
    { value: 'customer', label: 'Customer', icon: User, color: '#0891b2' },
    { value: 'company', label: 'Company', icon: Building2, color: '#0d9488' },
    { value: 'hospital', label: 'Hospital', icon: Hospital, color: '#059669' }
  ]

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #f0fdfa 0%, #ccfbf1 50%, #99f6e4 100%)',
      padding: '40px 20px'
    }}>
      <div style={{ 
        width: '100%', 
        maxWidth: '520px',
        backgroundColor: 'white',
        borderRadius: '24px',
        padding: '50px 40px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.1)'
      }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ 
            width: '80px', 
            height: '80px', 
            background: 'linear-gradient(135deg, #14b8a6, #0d9488)', 
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px auto',
            boxShadow: '0 10px 30px rgba(20, 184, 166, 0.3)'
          }}>
            <Pill style={{ width: '40px', height: '40px', color: 'white' }} />
          </div>
          <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#1f2937', marginBottom: '8px' }}>
            Create Account
          </h1>
          <p style={{ fontSize: '16px', color: '#6b7280' }}>
            Join PharmaChain today
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {error && (
            <div style={{ 
              backgroundColor: '#fef2f2', 
              border: '2px solid #fecaca', 
              color: '#dc2626',
              padding: '16px',
              borderRadius: '12px',
              marginBottom: '24px',
              fontSize: '14px'
            }}>
              {error}
            </div>
          )}

          {/* Role Selection */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '12px' }}>
              I am a...
            </label>
            <div style={{ display: 'flex', gap: '12px' }}>
              {roles.map((role) => {
                const Icon = role.icon
                const isSelected = formData.role === role.value
                return (
                  <button
                    key={role.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, role: role.value })}
                    style={{
                      flex: 1,
                      padding: '16px 12px',
                      borderRadius: '12px',
                      border: isSelected ? `3px solid ${role.color}` : '3px solid #e5e7eb',
                      backgroundColor: isSelected ? `${role.color}10` : 'white',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    <Icon style={{ width: '28px', height: '28px', color: isSelected ? role.color : '#9ca3af' }} />
                    <span style={{ fontSize: '14px', fontWeight: '600', color: isSelected ? role.color : '#6b7280' }}>
                      {role.label}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Username */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
              Username
            </label>
            <div style={{ position: 'relative' }}>
              <User style={{ 
                position: 'absolute', 
                left: '16px', 
                top: '50%', 
                transform: 'translateY(-50%)',
                width: '20px', 
                height: '20px', 
                color: '#9ca3af' 
              }} />
              <input
                type="text"
                name="username"
                required
                value={formData.username}
                onChange={handleInputChange}
                placeholder="Choose a username"
                style={{ 
                  width: '100%',
                  padding: '16px 16px 16px 50px',
                  fontSize: '16px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '12px',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => e.target.style.borderColor = '#14b8a6'}
                onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
              />
            </div>
          </div>

          {/* Email */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
              Email Address
            </label>
            <div style={{ position: 'relative' }}>
              <Mail style={{ 
                position: 'absolute', 
                left: '16px', 
                top: '50%', 
                transform: 'translateY(-50%)',
                width: '20px', 
                height: '20px', 
                color: '#9ca3af' 
              }} />
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                style={{ 
                  width: '100%',
                  padding: '16px 16px 16px 50px',
                  fontSize: '16px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '12px',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => e.target.style.borderColor = '#14b8a6'}
                onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
              />
            </div>
          </div>

          {/* Password */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <Lock style={{ 
                position: 'absolute', 
                left: '16px', 
                top: '50%', 
                transform: 'translateY(-50%)',
                width: '20px', 
                height: '20px', 
                color: '#9ca3af' 
              }} />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                required
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Create a password"
                style={{ 
                  width: '100%',
                  padding: '16px 50px 16px 50px',
                  fontSize: '16px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '12px',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => e.target.style.borderColor = '#14b8a6'}
                onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{ 
                  position: 'absolute', 
                  right: '16px', 
                  top: '50%', 
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '0'
                }}
              >
                {showPassword ? (
                  <EyeOff style={{ width: '20px', height: '20px', color: '#9ca3af' }} />
                ) : (
                  <Eye style={{ width: '20px', height: '20px', color: '#9ca3af' }} />
                )}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div style={{ marginBottom: '32px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
              Confirm Password
            </label>
            <div style={{ position: 'relative' }}>
              <Lock style={{ 
                position: 'absolute', 
                left: '16px', 
                top: '50%', 
                transform: 'translateY(-50%)',
                width: '20px', 
                height: '20px', 
                color: '#9ca3af' 
              }} />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                required
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm your password"
                style={{ 
                  width: '100%',
                  padding: '16px 50px 16px 50px',
                  fontSize: '16px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '12px',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => e.target.style.borderColor = '#14b8a6'}
                onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                style={{ 
                  position: 'absolute', 
                  right: '16px', 
                  top: '50%', 
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '0'
                }}
              >
                {showConfirmPassword ? (
                  <EyeOff style={{ width: '20px', height: '20px', color: '#9ca3af' }} />
                ) : (
                  <Eye style={{ width: '20px', height: '20px', color: '#9ca3af' }} />
                )}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            style={{ 
              width: '100%',
              padding: '18px',
              fontSize: '18px',
              fontWeight: 'bold',
              color: 'white',
              backgroundColor: isLoading ? '#5eead4' : '#0d9488',
              border: 'none',
              borderRadius: '12px',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              transition: 'background-color 0.2s',
              boxShadow: '0 10px 30px rgba(13, 148, 136, 0.3)'
            }}
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>

          {/* Sign In Link */}
          <p style={{ textAlign: 'center', marginTop: '24px', color: '#6b7280', fontSize: '16px' }}>
            Already have an account?{' '}
            <Link href="/auth/login" style={{ color: '#0d9488', fontWeight: '600', textDecoration: 'none' }}>
              Sign in here
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}
