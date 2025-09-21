import type { CSSProperties } from 'react';

const Footer = () => {
  const styles: { [k: string]: CSSProperties } = {
    footer: { background: '#0b1220', color: '#94a3b8', padding: '24px 16px', marginTop: 24 },
    content: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, maxWidth: 1200, margin: '0 auto' },
    section: {},
    h3: { color: '#e2e8f0', margin: 0 },
    h4: { color: '#cbd5e1', margin: '0 0 8px 0' },
    list: { listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 6 },
    link: { color: '#93c5fd', textDecoration: 'none' },
    bottom: { marginTop: 16, textAlign: 'center', borderTop: '1px solid #1e293b', paddingTop: 12 },
  };
  return (
    <footer style={styles.footer}>
      <div style={styles.content}>
        <div style={styles.section}>
          <h3 style={styles.h3}>PharmaChain</h3>
          <p>Secure and transparent pharmaceutical supply chain tracking</p>
        </div>
        <div style={styles.section}>
          <h4 style={styles.h4}>Quick Links</h4>
          <ul style={styles.list}>
            <li><a style={styles.link} href="/track">Track Medicine</a></li>
            <li><a style={styles.link} href="/verify">Verify Batch</a></li>
            <li><a style={styles.link} href="/batches">View Batches</a></li>
          </ul>
        </div>
        <div style={styles.section}>
          <h4 style={styles.h4}>Contact</h4>
          <p>Email: support@pharmachain.com</p>
          <p>Phone: (555) 123-4567</p>
        </div>
      </div>
      <div style={styles.bottom}>
        <p>&copy; 2025 PharmaChain. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
