import React from 'react';

function CustomerHome() {
  return (
    <div className="min-h-screen bg-white px-6 py-12">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">💊 Customer Portal</h1>

      <div className="space-y-6">
        <div className="p-6 border rounded-lg shadow hover:shadow-lg">
          <h2 className="text-xl font-semibold">Verify Medicine</h2>
          <p className="text-gray-600 mt-2">Enter batch ID to check if your medicine is genuine.</p>
        </div>
        <div className="p-6 border rounded-lg shadow hover:shadow-lg">
          <h2 className="text-xl font-semibold">Order History</h2>
          <p className="text-gray-600 mt-2">Track previously verified or ordered batches.</p>
        </div>
      </div>
    </div>
  );
}

export default CustomerHome;
