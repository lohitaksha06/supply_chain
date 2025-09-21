import { useNavigate } from 'react-router-dom';
import type { CSSProperties } from 'react';

const CustomerHome = () => {
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
      <h1 style={styles.title}>Customer Dashboard</h1>
      <p style={styles.subtitle}>Submit medicine requests and track batch information</p>
      <div style={styles.grid}>
        <div style={styles.card} onClick={() => navigate('/customer')}>
          <h3>Request Medicine</h3>
          <p>Submit a medicine requirement with quantity and location</p>
        </div>
        <div style={styles.card} onClick={() => navigate('/tracker')}>
          <h3>Track Batch</h3>
          <p>Enter a batch ID to trace medicine source and location</p>
        </div>
        <div style={styles.card} onClick={() => navigate('/batches')}>
          <h3>Available Batches</h3>
          <p>See all public medicine batches</p>
        </div>
      </div>
    </div>
  );
};

export default CustomerHome;
