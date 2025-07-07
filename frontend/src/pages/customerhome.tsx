// src/pages/customerhome.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const CustomerHome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-cyan-200 px-6 py-12">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl p-10 animate-fade-in">
        <h1 className="text-4xl font-bold text-blue-800 mb-8 text-center">💊 Customer Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card: Verify Medicine */}
          <div className="p-6 bg-blue-50 border border-blue-200 rounded-xl shadow-md hover:shadow-lg transition">
            <h2 className="text-2xl font-semibold text-blue-700 mb-2">🔍 Verify Medicine</h2>
            <p className="text-gray-600 mb-4">Check if a batch of medicine is authentic and blockchain-verified.</p>
            <button
              onClick={() => navigate('/verify')}
              className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
            >
              Start Verification
            </button>
          </div>

          {/* Card: Order History */}
          <div className="p-6 bg-cyan-50 border border-cyan-200 rounded-xl shadow-md hover:shadow-lg transition">
            <h2 className="text-2xl font-semibold text-cyan-700 mb-2">📦 Order History</h2>
            <p className="text-gray-600 mb-4">View your previously ordered or verified batches.</p>
            <button
              onClick={() => navigate('/customer')}
              className="bg-cyan-600 text-white px-5 py-2 rounded hover:bg-cyan-700 transition"
            >
              View History
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerHome;
