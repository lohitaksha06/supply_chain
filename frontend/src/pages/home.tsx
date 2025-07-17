import React from 'react';
import { useNavigate } from 'react-router-dom';
import './home.css';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard">
      <h1 className="title">Welcome to PharmaChain</h1>
      <p className="subtitle">Blockchain-powered pharmaceutical supply tracker</p>

      <div className="cards">
        <div className="card" onClick={() => navigate('/company')}>
          <h3>Register Company</h3>
          <p>Sign up a verified pharmaceutical company</p>
        </div>

        <div className="card" onClick={() => navigate('/tracker')}>
          <h3>Track Medicine</h3>
          <p>Enter a batch ID to trace medicine journey</p>
        </div>

        <div className="card" onClick={() => navigate('/batches')}>
          <h3>All Batches</h3>
          <p>View all recorded medicine batches</p>
        </div>

        <div className="card" onClick={() => navigate('/customer')}>
          <h3>Customer Request</h3>
          <p>Let customers submit stock or location requests</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
