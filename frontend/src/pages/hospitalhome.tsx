import React from 'react';
import { useNavigate } from 'react-router-dom';

const HospitalHome: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('pharmachain_user');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-100 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-blue-800">Welcome, City Hospital</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-white shadow-md rounded-xl p-6 border-l-4 border-blue-600">
          <p className="text-gray-500 text-sm">Orders Placed</p>
          <h2 className="text-2xl font-bold text-blue-700">18</h2>
        </div>
        <div className="bg-white shadow-md rounded-xl p-6 border-l-4 border-green-600">
          <p className="text-gray-500 text-sm">Verified Medicines</p>
          <h2 className="text-2xl font-bold text-green-700">27</h2>
        </div>
        <div className="bg-white shadow-md rounded-xl p-6 border-l-4 border-yellow-500">
          <p className="text-gray-500 text-sm">Deliveries</p>
          <h2 className="text-2xl font-bold text-yellow-600">14</h2>
        </div>
        <div className="bg-white shadow-md rounded-xl p-6 border-l-4 border-purple-600">
          <p className="text-gray-500 text-sm">Pending Checks</p>
          <h2 className="text-2xl font-bold text-purple-700">3</h2>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <button
          onClick={() => navigate('/verify')}
          className="w-full bg-blue-600 text-white py-3 rounded-lg shadow hover:bg-blue-700 transition"
        >
          Verify Medicine
        </button>

        <button
          onClick={() => navigate('/track')}
          className="w-full bg-indigo-600 text-white py-3 rounded-lg shadow hover:bg-indigo-700 transition"
        >
          Track Medicine
        </button>

        <button
          onClick={() => navigate('/customer')}
          className="w-full bg-green-600 text-white py-3 rounded-lg shadow hover:bg-green-700 transition"
        >
          Purchase Logs
        </button>
      </div>

      {/* Hospital Info */}
      <div className="mt-10 bg-white shadow-lg rounded-xl p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Hospital Info</h3>
        <p className="text-gray-600">
          City Hospital is integrated with PharmaChain to ensure all medicines used are verifiable, traceable, and safe.
          Blockchain-backed batch verification helps ensure transparency in medical inventory handling.
        </p>
      </div>
    </div>
  );
};

export default HospitalHome;
