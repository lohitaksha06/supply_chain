import React from 'react';

const VerifyBatch = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Verify Batch Authenticity</h2>
        <input
          type="text"
          placeholder="Enter Batch Hash"
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring"
        />
        <button className="mt-4 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
          Verify
        </button>
      </div>
    </div>
  );
};

export default VerifyBatch;
