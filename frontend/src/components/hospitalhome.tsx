import { useNavigate } from 'react-router-dom';
import './home.css';

const HospitalHome = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard">
      <h1 className="title">Hospital Dashboard</h1>
      <p className="subtitle">Register hospital, request medicine, and track supply</p>

      <div className="cards">
        <div className="card" onClick={() => navigate('/hospital')}>
          <h3>Register Hospital</h3>
          <p>Enter location, registration ID and request required medicines</p>
        </div>

        <div className="card" onClick={() => navigate('/tracker')}>
          <h3>Track Medicine</h3>
          <p>Check where a batch is located and when it was added</p>
        </div>

        <div className="card" onClick={() => navigate('/batches')}>
          <h3>Available Batches</h3>
          <p>View existing medicine batches added by companies</p>
        </div>
      </div>
    </div>
  );
};

export default HospitalHome;
