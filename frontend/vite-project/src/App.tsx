import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import CompanyForm from './components/companyform';
import BatchTracker from './components/batchtracker';
import Login from './pages/login'; // ✅ Import the new login page

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<CompanyForm />} />
        <Route path="/track" element={<BatchTracker />} />
        <Route path="/login" element={<Login />} /> {/* ✅ Add this line */}
      </Routes>
    </Router>
  );
}

export default App;
