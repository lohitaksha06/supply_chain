import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import CompanyForm from './components/companyform';
import BatchTracker from './components/batchtracker';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<CompanyForm />} />
        <Route path="/track" element={<BatchTracker />} />
      </Routes>
    </Router>
  );
}

export default App;