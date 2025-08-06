import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthRoute from './utils/AuthRoute';

// Layout
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Sidebar from './components/common/Sidebar';

// Auth
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';

// Home
import Home from './pages/home/Home';
import CompanyHome from './pages/home/CompanyHome';
import CustomerHome from './pages/home/CustomerHome';
import HospitalHome from './pages/home/HospitalHome';

// Dashboards
import CompanyDashboard from './pages/dashboard/CompanyDashboard';
import CustomerDashboard from './pages/dashboard/CustomerDashboard';
import HospitalDashboard from './pages/dashboard/HospitalDashboard';

// Forms
import CompanyForm from './components/forms/CompanyForm';
import CustomerForm from './components/forms/CustomerForm';
import HospitalForm from './components/forms/HospitalForm';
import TrackerInput from './components/forms/TrackerInput';

// Dashboard Components
import BatchTable from './components/dashboard/DataTable';
import VerifyBatch from './components/dashboard/VerifyBatch';

function App() {
  return (
    <Router>
      {/* Global layout (optional) */}
      <Navbar />
      {/* Add Sidebar or Footer here globally if needed */}
      <Routes>
        {/* Auth */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* General Home */}
        <Route path="/home" element={<AuthRoute element={<Home />} />} />

        {/* Forms */}
        <Route path="/register" element={<AuthRoute element={<CompanyForm />} />} />
        <Route path="/customer" element={<AuthRoute element={<CustomerForm />} />} />
        <Route path="/hospital" element={<AuthRoute element={<HospitalForm />} />} />
        <Route path="/track" element={<AuthRoute element={<TrackerInput />} />} />

        {/* Dashboard Pages */}
        <Route path="/company/dashboard" element={<AuthRoute element={<CompanyDashboard />} />} />
        <Route path="/customer/dashboard" element={<AuthRoute element={<CustomerDashboard />} />} />
        <Route path="/hospital/dashboard" element={<AuthRoute element={<HospitalDashboard />} />} />

        {/* Home Pages by Role */}
        <Route path="/company/home" element={<AuthRoute element={<CompanyHome />} />} />
        <Route path="/customer/home" element={<AuthRoute element={<CustomerHome />} />} />
        <Route path="/hospital/home" element={<AuthRoute element={<HospitalHome />} />} />

        {/* Dashboard Utilities */}
        <Route path="/batches" element={<AuthRoute element={<BatchTable />} />} />
        <Route path="/verify" element={<AuthRoute element={<VerifyBatch />} />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
