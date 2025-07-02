import React from 'react';

function HospitalHome() {
  return (
    <div className="min-h-screen bg-white px-6 py-12">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">🏥 Hospital Dashboard</h1>

      <div className="space-y-6">
        <div className="p-6 border rounded-lg shadow hover:shadow-lg">
          <h2 className="text-xl font-semibold">Search & Track Medicines</h2>
          <p className="text-gray-600 mt-2">Verify batch authenticity before accepting shipments.</p>
        </div>
        <div className="p-6 border rounded-lg shadow hover:shadow-lg">
          <h2 className="text-xl font-semibold">Recent Orders</h2>
          <p className="text-gray-600 mt-2">View your hospital’s latest medicine delivery records.</p>
        </div>
      </div>
    </div>
  );
}

export default HospitalHome;
