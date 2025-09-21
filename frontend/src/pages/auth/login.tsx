import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { CSSProperties } from 'react';

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

  const styles: { [k: string]: CSSProperties } = {
    page: { display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '100vh' },
    left: { background: '#0ea5e9', color: '#fff', display: 'grid', placeItems: 'center', padding: 24 },
    right: { display: 'grid', placeItems: 'center', padding: 24 },
    card: { width: 380, border: '1px solid #e2e8f0', borderRadius: 8, padding: 16 },
    input: { width: '100%', border: '1px solid #cbd5e1', borderRadius: 6, padding: 8, marginTop: 4 },
    label: { fontSize: 12, color: '#64748b' },
    actions: { display: 'flex', gap: 8, alignItems: 'center', justifyContent: 'space-between' },
    button: { background: '#0ea5e9', color: '#fff', border: 0, padding: '8px 12px', borderRadius: 6, cursor: 'pointer' },
    link: { background: 'transparent', color: '#0ea5e9', border: 0, padding: 0, cursor: 'pointer' },
    error: { color: '#ef4444', marginBottom: 8 },
  };
  return (
    <div style={styles.page}>
      <div style={styles.left}>
        <div>
          <h1>Pharma<span>Chain</span></h1>
          <p>Secure access to medicine records and track your medicine location</p>
        </div>
      </div>
      <div style={styles.right}>
        <div style={styles.card}>
          <h2>Welcome Back</h2>
          <p>Sign in to your account</p>
          {error && <div style={styles.error}>{error}</div>}
          <form onSubmit={handleSubmit}>
            <div>
              <label style={styles.label} htmlFor="email">Email Address</label>
              <input style={styles.input} type="email" id="email" name="email" placeholder="doctor@medicalcenter.com" value={formData.email} onChange={handleChange} required />
            </div>
            <div>
              <label style={styles.label} htmlFor="password">Password</label>
              <input style={styles.input} type="password" id="password" name="password" placeholder="Enter your password" value={formData.password} onChange={handleChange} required />
            </div>
            <div style={styles.actions}>
              <button type="submit" style={styles.button}>Sign In</button>
              <button type="button" style={styles.link}>Forgot password?</button>
            </div>
          </form>
          <div style={{ marginTop: 8 }}>
            Don't have an account?{' '}
            <button style={styles.link} onClick={() => navigate('/signup')}>Register here</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
