import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Login from './pages/login';
import Signup from './pages/signup';
import CompanyHome from './pages/companyhome';
import HospitalHome from './pages/hospitalhome';
import CustomerHome from './pages/customerhome';

import companyform from './components/companyform';
import BatchTable from './components/BatchTable';
import TrackerInput from './components/trackerinput';
import CustomerForm from './components/customer';
import VerifyBatch from './components/verifybatch';

function App() {
  return (
    <Router>
      <Routes>
        {/* Auth */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Dashboards */}
        <Route path="/companyhome" element={<CompanyHome />} />
        <Route path="/hospitalhome" element={<HospitalHome />} />
        <Route path="/customerhome" element={<CustomerHome />} />

        {/* Features */}
        <Route path="/register" element={<CompanyForm />} />
        <Route path="/track" element={<TrackerInput />} />
        <Route path="/verify" element={<VerifyBatch />} />
        <Route path="/batches" element={<BatchTable />} />
        <Route path="/customer" element={<CustomerForm />} />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
