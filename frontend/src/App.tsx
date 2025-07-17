import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Home from './pages/home';
import Login from './pages/login';
import Signup from './pages/signup';

import CompanyForm from './components/companyform';
import BatchTable from './components/batchable';
import TrackerInput from './components/trackerinput';
import CustomerForm from './components/customer';
import VerifyBatch from './components/verifybatch';
import HospitalForm from './components/hospitalform';

// Dashboards (FIXED: Proper PascalCase)
import CompanyDashboard from './pages/dashboardpages/companydashboard';
import CustomerDashboard from './pages/dashboardpages/customerdashboard';
import HospitalDashboard from './pages/dashboardpages/hospitaldashboard';

function App() {
  return (
    <Router>
      <Routes>
        {/* Auth */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Main pages */}
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<CompanyForm />} />
        <Route path="/track" element={<TrackerInput />} />
        <Route path="/batches" element={<BatchTable />} />
        <Route path="/customer" element={<CustomerForm />} />
        <Route path="/verify" element={<VerifyBatch />} />
        <Route path="/hospital" element={<HospitalForm />} />

        {/* Dashboards */}
        <Route path="/company/dashboard" element={<CompanyDashboard />} />
        <Route path="/customer/dashboard" element={<CustomerDashboard />} />
        <Route path="/hospital/dashboard" element={<HospitalDashboard />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
