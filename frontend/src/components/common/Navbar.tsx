import { useNavigate } from 'react-router-dom';
import type { CSSProperties } from 'react';

const Navbar = () => {
  const styles: { [k: string]: CSSProperties } = {
    nav: {
      background: '#0f172a',
      color: '#fff',
      padding: '12px 16px',
      position: 'sticky',
      top: 0,
      zIndex: 10,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    brand: { fontWeight: 700, fontSize: 18 },
    group: { display: 'flex', gap: 8 },
    user: { display: 'flex', gap: 8, alignItems: 'center' },
    button: {
      background: '#1e293b',
      color: '#e2e8f0',
      border: '1px solid #334155',
      padding: '6px 10px',
      borderRadius: 6,
      cursor: 'pointer',
    },
  };
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const role = localStorage.getItem('role');

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    navigate('/');
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.brand}>PharmaChain</div>
      <div style={styles.group}>
        {role === 'company' && (
          <>
            <button style={styles.button} onClick={() => navigate('/company/home')}>Home</button>
            <button style={styles.button} onClick={() => navigate('/company/dashboard')}>Dashboard</button>
            <button style={styles.button} onClick={() => navigate('/register')}>Register Batch</button>
          </>
        )}
        
        {role === 'hospital' && (
          <>
            <button style={styles.button} onClick={() => navigate('/hospital/home')}>Home</button>
            <button style={styles.button} onClick={() => navigate('/hospital/dashboard')}>Dashboard</button>
            <button style={styles.button} onClick={() => navigate('/verify')}>Verify Batch</button>
          </>
        )}
        
        {role === 'customer' && (
          <>
            <button style={styles.button} onClick={() => navigate('/customer/home')}>Home</button>
            <button style={styles.button} onClick={() => navigate('/customer/dashboard')}>Dashboard</button>
            <button style={styles.button} onClick={() => navigate('/track')}>Track Medicine</button>
          </>
        )}
      </div>
      <div style={styles.user}>
        <span>{user.name || user.email}</span>
        <button style={styles.button} onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
