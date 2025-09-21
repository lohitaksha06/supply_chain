import { useNavigate } from 'react-router-dom';
import type { CSSProperties } from 'react';

const Home = () => {
  const navigate = useNavigate();

  const styles: { [k: string]: CSSProperties } = {
    wrap: { maxWidth: 900, margin: '32px auto', padding: '0 16px' },
    title: { margin: 0, fontSize: 28 },
    subtitle: { color: '#64748b', marginTop: 6 },
    grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 16 },
    card: {
      border: '1px solid #e2e8f0',
      borderRadius: 8,
      padding: 16,
      cursor: 'pointer',
      background: '#fff',
    },
  };

  return (
    <div style={styles.wrap}>
      <h1 style={styles.title}>Welcome to PharmaChain</h1>
      <p style={styles.subtitle}>Blockchain-powered pharmaceutical supply tracker</p>
      <div style={styles.grid}>
        <div style={styles.card} onClick={() => navigate('/company')}>
          <h3>Register Company</h3>
          <p>Sign up a verified pharmaceutical company</p>
        </div>
        <div style={styles.card} onClick={() => navigate('/tracker')}>
          <h3>Track Medicine</h3>
          <p>Enter a batch ID to trace medicine journey</p>
        </div>
        <div style={styles.card} onClick={() => navigate('/batches')}>
          <h3>All Batches</h3>
          <p>View all recorded medicine batches</p>
        </div>
        <div style={styles.card} onClick={() => navigate('/customer')}>
          <h3>Customer Request</h3>
          <p>Let customers submit stock or location requests</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
