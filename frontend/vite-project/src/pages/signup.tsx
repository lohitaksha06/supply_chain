import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './signup.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    email: '',
    password: '',
    role: 'company' // Default role
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:3001/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Signup failed');
      }

      const data = await response.json();

      // Save token and user info in localStorage for persistent login
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('role', data.role); // store the role for routing later

      // Redirect based on role
      if (data.role === 'company') navigate('/dashboard/company');
      else if (data.role === 'hospital') navigate('/dashboard/hospital');
      else if (data.role === 'patient') navigate('/dashboard/customer');
      else navigate('/home'); // fallback

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    }
  };

  return (
    <div className="login-container">
      <div className="login-form-container">
        <div className="login-form-wrapper">
          <h2>Create Account</h2>
          <p className="login-subtitle">Track your medicine supply chain</p>

          {error && <div className="error-message">{error}</div>}

          <form className="login-form" onSubmit={handleSubmit}>
            {/* Conditionally show company name only if role is company */}
            {formData.role === 'company' && (
              <div className="form-group">
                <label>Company Name</label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  required
                />
              </div>
            )}

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                minLength={8}
                required
              />
            </div>

            <div className="form-group">
              <label>Account Type</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
              >
                <option value="">Select Role</option>
                <option value="company">Company</option>
                <option value="hospital">Hospital</option>
                <option value="patient">Patient</option>
              </select>
            </div>

            <button type="submit" className="login-button">
              Create Account
            </button>

            <p className="login-footer">
              Already have an account? <a href="/login">Log in</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
