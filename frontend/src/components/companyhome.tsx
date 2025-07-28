import { useNavigate } from 'react-router-dom';
import './home.css';

const CompanyHome = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard">
      <h1 className="title">Company Dashboard</h1>
      <p className="subtitle">Register your pharmaceutical company and add medicine batches</p>

      <div className="cards">
        <div className="card" onClick={() => navigate('/company')}>
          <h3>Register Company</h3>
          <p>Add company details to the blockchain system</p>
        </div>

        <div className="card" onClick={() => navigate('/tracker')}>
          <h3>Add Medicine Batch</h3>
          <p>Upload a new batch with expiry, location, and contents</p>
        </div>

        <div className="card" onClick={() => navigate('/batches')}>
          <h3>View All Batches</h3>
          <p>See all tracked medicine batches</p>
        </div>
      </div>
    </div>
  );
};

export default CompanyHome;
