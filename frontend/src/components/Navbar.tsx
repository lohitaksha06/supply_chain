import React from 'react';
import { Link } from 'react-router-dom';
import type { CSSProperties } from 'react';

export const Navbar: React.FC = () => {
  const styles: { [k: string]: CSSProperties } = {
    nav: {
      background: '#0f172a',
      color: '#fff',
      padding: '12px 16px',
      position: 'sticky',
      top: 0,
      zIndex: 10,
    },
    container: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      maxWidth: 1200,
      margin: '0 auto',
    },
    logo: {
      color: '#fff',
      textDecoration: 'none',
      fontWeight: 700,
      fontSize: 18,
    },
    menu: {
      display: 'flex',
      gap: 12,
      listStyle: 'none',
      margin: 0,
      padding: 0,
    },
    link: {
      color: '#cbd5e1',
      textDecoration: 'none',
      fontSize: 14,
    },
  };
  return (
    <nav style={styles.nav}>
      <div style={styles.container}>
        <Link to="/" style={styles.logo}>Supply Chain</Link>
        <ul style={styles.menu}>
          <li>
            <Link to="/login" style={styles.link}>Login</Link>
          </li>
          <li>
            <Link to="/signup" style={styles.link}>Sign Up</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};
