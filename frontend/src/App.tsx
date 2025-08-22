import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// The corrected import for your route protection component
import ProtectedRoute from './components/ProtectedRoute';

// Layout
import { Navbar } from './components/Navbar'; // Corrected Path
import Footer from './components/Footer'; // Corrected Path

// Auth Pages (Paths are case-sensitive, check your filenames)
import Login from './pages/auth/login';
import Signup from './pages/auth/signup';

// Home (Component, not a Page - based on your screenshot)
import CustomerHome from './components/customerhome';

// Dashboards (check filenames for case)
import CompanyDashboard from './pages/dashboard/companydashboard';
import CustomerDashboard from './pages/dashboard/customerdashboard';
import HospitalDashboard from './pages/dashboard/hospitaldashboard';

// Forms (Assuming a 'forms' folder exists in 'components')
import CompanyForm from './components/forms/CompanyForm';
// import CustomerForm from './components/forms/CustomerForm';
import HospitalForm from './components/forms/HospitalForm';
import TrackerInput from './components/forms/TrackerInput';

// Dashboard Components
import BatchTable from './components/dashboard/DataTable';
import VerifyBatch from './components/verifybatch';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes */}
        {/* All routes inside here will first check for authentication */}
        <Route element={<ProtectedRoute element={<div></div>} />}>
          <Route path="/customer/home" element={<CustomerHome />} />

          {/* Forms */}
          <Route path="/register" element={<CompanyForm />} />
          {/* <Route path="/customer" element={<CustomerForm />} /> */}
          <Route path="/hospital" element={<HospitalForm />} />
          <Route path="/track" element={<TrackerInput />} />

          {/* Dashboard Pages */}
          <Route path="/company/dashboard" element={<CompanyDashboard />} />
          <Route path="/customer/dashboard" element={<CustomerDashboard />} />
          <Route path="/hospital/dashboard" element={<HospitalDashboard />} />

          {/* Dashboard Utilities */}
          <Route path="/batches" element={<BatchTable data={[]} columns={[]} />} />
          <Route path="/verify" element={<VerifyBatch />} />

          {/* NOTE: You probably don't need all the '/company/home', '/customer/home', etc. routes
              if you have a single home component that changes based on user role.
              I have included the main customerhome based on your screenshots. */}
        </Route>

        {/* Fallback for any route that doesn't match */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;