import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./login.css";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }

      const data = await response.json();

      // Save token and user info in localStorage for persistent login
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      // Redirect to home page after successful login
      navigate('/home');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    }
  };

  return (
    <div className="login-container">
      <div className="login-left-panel">
        <div className="login-branding">
          <h1>Pharma<span>Chain</span></h1>
          <p>Secure access to medicine records and track your medicine location</p>
        </div>
        <div className="login-illustration">
          {/* Optional image/illustration */}
        </div>
      </div>
      
      <div className="login-form-container">
        <div className="login-form-wrapper">
          <h2>Welcome Back</h2>
          <p className="login-subtitle">Sign in to your account</p>

          {error && <div className="error-message">{error}</div>}

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="doctor@medicalcenter.com"
                className="form-input"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                className="form-input"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <div className="forgot-password">
                <a href="#">Forgot password?</a>
              </div>
            </div>
            
            <button type="submit" className="login-button">
              Sign In
            </button>
            
            <div className="login-divider">
              <span>or</span>
            </div>
            
            <button type="button" className="sso-button">
              Sign in with Google
            </button>
          </form>
          
          <div className="login-footer">
            Don't have an account?{" "}
            <button className="register-button" onClick={() => navigate("/signup")}>
              Register here
            </button>
          </div>
        </div>
        
        <div className="login-footer-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Use</a>
          <a href="#">Help Center</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
