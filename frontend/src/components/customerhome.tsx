import { useNavigate } from 'react-router-dom';
import './home.css';

const CustomerHome = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard">
      <h1 className="title">Customer Dashboard</h1>
      <p className="subtitle">Submit medicine requests and track batch information</p>

      <div className="cards">
        <div className="card" onClick={() => navigate('/customer')}>
          <h3>Request Medicine</h3>
          <p>Submit a medicine requirement with quantity and location</p>
        </div>

        <div className="card" onClick={() => navigate('/tracker')}>
          <h3>Track Batch</h3>
          <p>Enter a batch ID to trace medicine source and location</p>
        </div>

        <div className="card" onClick={() => navigate('/batches')}>
          <h3>Available Batches</h3>
          <p>See all public medicine batches</p>
        </div>
      </div>
    </div>
  );
};

export default CustomerHome;
