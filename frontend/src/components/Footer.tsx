import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>PharmaChain</h3>
          <p>Secure and transparent pharmaceutical supply chain tracking</p>
        </div>
        
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/track">Track Medicine</a></li>
            <li><a href="/verify">Verify Batch</a></li>
            <li><a href="/batches">View Batches</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contact</h4>
          <p>Email: support@pharmachain.com</p>
          <p>Phone: (555) 123-4567</p>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; 2025 PharmaChain. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
