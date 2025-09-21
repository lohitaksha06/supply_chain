import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { CSSProperties } from 'react';

const Signup = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    email: '',
    password: '',
    role: 'company' // Default role
  });
    const [error, setError] = useState('');
    import type { CSSProperties } from 'react';
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
      if (data.role === 'company') navigate('/company/dashboard');
      else if (data.role === 'hospital') navigate('/hospital/dashboard');
      else if (data.role === 'patient') navigate('/customer/dashboard');
      else navigate('/home'); // fallback

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    }
  };

  const styles: { [k: string]: CSSProperties } = {
    wrap: { display: 'grid', placeItems: 'center', minHeight: '100vh' },
    card: { width: 420, border: '1px solid #e2e8f0', borderRadius: 8, padding: 16 },
    input: { width: '100%', border: '1px solid #cbd5e1', borderRadius: 6, padding: 8, marginTop: 4 },
    label: { fontSize: 12, color: '#64748b' },
    button: { background: '#0ea5e9', color: '#fff', border: 0, padding: '8px 12px', borderRadius: 6, cursor: 'pointer', marginTop: 8 },
    error: { color: '#ef4444', marginBottom: 8 },
  };
  return (
  const styles: { [k: string]: CSSProperties } = {
    wrap: { display: 'grid', placeItems: 'center', minHeight: '100vh', padding: 24 },
    panel: { width: '100%', maxWidth: 480 },
    h2: { margin: '0 0 8px 0' },
    subtitle: { color: '#64748b', marginBottom: 12 },
    group: { display: 'grid', gap: 6, marginBottom: 12 },
    input: { border: '1px solid #e2e8f0', borderRadius: 6, padding: '8px 10px' },
    button: { background: '#0f172a', color: '#fff', border: '1px solid #1e293b', borderRadius: 6, padding: '10px 12px', cursor: 'pointer' },
    link: { color: '#3b82f6', background: 'transparent', border: 'none', padding: 0, cursor: 'pointer' },
    error: { background: '#fee2e2', color: '#991b1b', border: '1px solid #fecaca', padding: 8, borderRadius: 6, marginBottom: 12 },
  };
  return (
    <div style={styles.wrap}>
      <div style={styles.panel}>
        <h2 style={styles.h2}>Create Account</h2>
        <p style={styles.subtitle}>Track your medicine supply chain</p>
        {error && <div style={styles.error}>{error}</div>}
        <form onSubmit={handleSubmit}>
          {formData.role === 'company' && (
            <div style={styles.group}>
              <label>Company Name</label>
              <input style={styles.input} type="text" name="companyName" value={formData.companyName} onChange={handleChange} required />
            </div>
          )}
          <div style={styles.group}>
            <label>Email</label>
            <input style={styles.input} type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div style={styles.group}>
            <label>Password</label>
            <input style={styles.input} type="password" name="password" value={formData.password} onChange={handleChange} minLength={8} required />
          </div>
          <div style={styles.group}>
            <label>Account Type</label>
            <select name="role" value={formData.role} onChange={handleChange} required>
              <option value="">Select Role</option>
              <option value="company">Company</option>
              <option value="hospital">Hospital</option>
              <option value="patient">Patient</option>
            </select>
          </div>
          <button type="submit" style={styles.button}>Create Account</button>
          <p style={{ marginTop: 12 }}>
            Already have an account? <a href="/login">Log in</a>
          </p>
        </form>
      </div>
    </div>
  );
  );
};

export default Signup;
