import React from 'react';
import "./login.css";

const Login = () => {
  return (
    <div className="login-container">
      <div className="login-left-panel">
        <div className="login-branding">
          {/* Removed img tag - you can add text-only logo */}
          <h1>Pharma<span>Chain</span></h1>
          <p>Secure access to medecine records and track your medecine location</p>
        </div>
        <div className="login-illustration">
          {/* Empty container - can remove or keep for future use */}
        </div>
      </div>
      
      <div className="login-form-container">
        <div className="login-form-wrapper">
          <h2>Welcome Back</h2>
          <p className="login-subtitle">Sign in to your account</p>
          
          <form className="login-form">
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                placeholder="doctor@medicalcenter.com"
                className="form-input"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                className="form-input"
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
          
          <p className="login-footer">
            Don't have an account? <a href="#">Request access</a>
          </p>
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