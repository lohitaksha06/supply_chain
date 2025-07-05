import React from 'react';
import { useNavigate } from 'react-router-dom';

const CompanyHome = () => {
  const navigate = useNavigate();

  const handleRegisterBatch = () => navigate('/register');
  const handleViewInventory = () => alert('View Inventory - Coming Soon!');
  const handleVerify = () => navigate('/verify');

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-8">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">Welcome, Company Admin</h1>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <div
          className="bg-white shadow-md rounded-lg p-6 hover:bg-blue-50 cursor-pointer transition"
          onClick={handleRegisterBatch}
        >
          <h2 className="text-xl font-semibold text-blue-600 mb-2">Register New Batch</h2>
          <p className="text-gray-600 text-sm">Log a new medicine batch with details and hash.</p>
        </div>

        <div
          className="bg-white shadow-md rounded-lg p-6 hover:bg-blue-50 cursor-pointer transition"
          onClick={handleViewInventory}
        >
          <h2 className="text-xl font-semibold text-blue-600 mb-2">View Inventory</h2>
          <p className="text-gray-600 text-sm">Access your current registered batches and stock.</p>
        </div>

        <div
          className="bg-white shadow-md rounded-lg p-6 hover:bg-blue-50 cursor-pointer transition"
          onClick={handleVerify}
        >
          <h2 className="text-xl font-semibold text-blue-600 mb-2">Verify Batch</h2>
          <p className="text-gray-600 text-sm">Check batch authenticity using blockchain hashes.</p>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Recent Activity</h2>
        <ul className="list-disc pl-5 text-gray-700 text-sm space-y-2">
          <li>Batch `#MEDX-1283` registered - July 4, 2025</li>
          <li>Verified batch `#MEDX-1024` - July 3, 2025</li>
          <li>Logged out at 5:32 PM - July 2, 2025</li>
        </ul>
      </div>
    </div>
  );
};

export default CompanyHome;
