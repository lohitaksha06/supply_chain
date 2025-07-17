import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthRoute from './components/AuthRoute';

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
        <Route path="/home" element={<AuthRoute element={<Home />} />} />
        <Route path="/register" element={<AuthRoute element={<CompanyForm />} />} />
        <Route path="/track" element={<AuthRoute element={<TrackerInput />} />} />
        <Route path="/batches" element={<AuthRoute element={<BatchTable />} />} />
        <Route path="/customer" element={<AuthRoute element={<CustomerForm />} />} />
        <Route path="/verify" element={<AuthRoute element={<VerifyBatch />} />} />
        <Route path="/hospital" element={<AuthRoute element={<HospitalForm />} />} />

        {/* Dashboards */}
        <Route path="/company/dashboard" element={<AuthRoute element={<CompanyDashboard />} />} />
        <Route path="/customer/dashboard" element={<AuthRoute element={<CustomerDashboard />} />} />
        <Route path="/hospital/dashboard" element={<AuthRoute element={<HospitalDashboard />} />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
