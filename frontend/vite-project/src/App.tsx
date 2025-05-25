import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/home';
import CompanyForm from './components/companyform';
import BatchTracker from './components/batchtracker';
import Login from './pages/login';

function App() {
  return (
    <Router>
      <Routes>
        {/* Make login the default route */}
        <Route path="/" element={<Login />} />
        
        {/* Redirect old root path to login for better UX */}
        <Route path="/home" element={<Home />} />
        
        {/* Keep all your existing routes */}
        <Route path="/register" element={<CompanyForm />} />
        <Route path="/track" element={<BatchTracker />} />
        
        {/* Optional: Add redirect for any unknown routes */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;