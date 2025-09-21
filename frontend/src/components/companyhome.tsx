import { useNavigate } from 'react-router-dom';
import type { CSSProperties } from 'react';

const CompanyHome = () => {
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
      <h1 style={styles.title}>Company Dashboard</h1>
      <p style={styles.subtitle}>Register your pharmaceutical company and add medicine batches</p>
      <div style={styles.grid}>
        <div style={styles.card} onClick={() => navigate('/company')}>
          <h3>Register Company</h3>
          <p>Add company details to the blockchain system</p>
        </div>
        <div style={styles.card} onClick={() => navigate('/tracker')}>
          <h3>Add Medicine Batch</h3>
          <p>Upload a new batch with expiry, location, and contents</p>
        </div>
        <div style={styles.card} onClick={() => navigate('/batches')}>
          <h3>View All Batches</h3>
          <p>See all tracked medicine batches</p>
        </div>
      </div>
    </div>
  );
};

export default CompanyHome;
