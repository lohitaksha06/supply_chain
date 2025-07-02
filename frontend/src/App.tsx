import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Login from './pages/login';
import Signup from './pages/signup';

import CustomerHome from './pages/customerhome';
import CompanyHome from './pages/companyhome';
import HospitalHome from './pages/hospitalhome';

import CompanyForm from './components/companyform';
import TrackerInput from './components/trackerinput';
import BatchTable from './components/batchtable';
import CustomerForm from './components/customer';
import VerifyBatch from './components/VerifyBatch';

function App() {
  return (
    <Router>
      <Routes>
        {/* Auth Pages */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Dashboards */}
        <Route path="/home/customer" element={<CustomerHome />} />
        <Route path="/home/company" element={<CompanyHome />} />
        <Route path="/home/hospital" element={<HospitalHome />} />

        {/* Features */}
        <Route path="/register" element={<CompanyForm />} />
        <Route path="/track" element={<TrackerInput />} />
        <Route path="/batches" element={<BatchTable />} />
        <Route path="/customerform" element={<CustomerForm />} />
        <Route path="/verify" element={<VerifyBatch />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
