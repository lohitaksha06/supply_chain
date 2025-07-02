import React from 'react';

function CompanyHome() {
  return (
    <div className="min-h-screen bg-white px-6 py-12">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">🏢 Company Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 border rounded-lg shadow hover:shadow-lg">
          <h2 className="text-xl font-semibold">Register New Medicine Batch</h2>
          <p className="text-gray-600 mt-2">Submit medicine and company info to add a new batch.</p>
        </div>
        <div className="p-6 border rounded-lg shadow hover:shadow-lg">
          <h2 className="text-xl font-semibold">View All Batches</h2>
          <p className="text-gray-600 mt-2">Track existing medicine batches registered by your company.</p>
        </div>
      </div>
    </div>
  );
}

export default CompanyHome;
