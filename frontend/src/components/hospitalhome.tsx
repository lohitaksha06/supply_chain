import { useNavigate } from 'react-router-dom';
import type { CSSProperties } from 'react';

const HospitalHome = () => {
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
      <h1 style={styles.title}>Hospital Dashboard</h1>
      <p style={styles.subtitle}>Register hospital, request medicine, and track supply</p>
      <div style={styles.grid}>
        <div style={styles.card} onClick={() => navigate('/hospital')}>
          <h3>Register Hospital</h3>
          <p>Enter location, registration ID and request required medicines</p>
        </div>
        <div style={styles.card} onClick={() => navigate('/tracker')}>
          <h3>Track Medicine</h3>
          <p>Check where a batch is located and when it was added</p>
        </div>
        <div style={styles.card} onClick={() => navigate('/batches')}>
          <h3>Available Batches</h3>
          <p>View existing medicine batches added by companies</p>
        </div>
      </div>
    </div>
  );
};

export default HospitalHome;
