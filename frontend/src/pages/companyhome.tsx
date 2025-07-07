import React from 'react';
import { useNavigate } from 'react-router-dom';

const CompanyHome: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('pharmachain_user');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-100 p-6">
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-blue-800">Welcome, PharmaCorp</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-white shadow-md rounded-xl p-6 border-l-4 border-blue-600">
          <p className="text-gray-500 text-sm">Batches Registered</p>
          <h2 className="text-2xl font-bold text-blue-700">12</h2>
        </div>
        <div className="bg-white shadow-md rounded-xl p-6 border-l-4 border-green-600">
          <p className="text-gray-500 text-sm">Pending Verifications</p>
          <h2 className="text-2xl font-bold text-green-700">4</h2>
        </div>
        <div className="bg-white shadow-md rounded-xl p-6 border-l-4 border-yellow-500">
          <p className="text-gray-500 text-sm">In Transit</p>
          <h2 className="text-2xl font-bold text-yellow-600">6</h2>
        </div>
        <div className="bg-white shadow-md rounded-xl p-6 border-l-4 border-purple-600">
          <p className="text-gray-500 text-sm">Delivered</p>
          <h2 className="text-2xl font-bold text-purple-700">20</h2>
        </div>
      </div>

      {/* Navigation Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <button
          onClick={() => navigate('/register')}
          className="w-full bg-blue-600 text-white py-3 rounded-lg shadow hover:bg-blue-700 transition"
        >
          Register New Batch
        </button>

        <button
          onClick={() => navigate('/batches')}
          className="w-full bg-indigo-600 text-white py-3 rounded-lg shadow hover:bg-indigo-700 transition"
        >
          View All Batches
        </button>

        <button
          onClick={() => navigate('/track')}
          className="w-full bg-green-600 text-white py-3 rounded-lg shadow hover:bg-green-700 transition"
        >
          Track Medicine
        </button>

        <button
          onClick={() => navigate('/verify')}
          className="w-full bg-yellow-500 text-white py-3 rounded-lg shadow hover:bg-yellow-600 transition"
        >
          Verify Batch Authenticity
        </button>
      </div>

      {/* Optional: Company Info / Animated Card */}
      <div className="mt-10 bg-white shadow-lg rounded-xl p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Company Overview</h3>
        <p className="text-gray-600">
          PharmaCorp is a registered pharmaceutical supplier committed to transparent and tamper-proof medicine tracking
          through blockchain integration.
        </p>
      </div>
    </div>
  );
};

export default CompanyHome;
