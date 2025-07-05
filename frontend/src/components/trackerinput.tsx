import React from 'react';

const TrackerInput = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 shadow-md rounded w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4 text-center">Track Medicine Batch</h2>
        <input
          type="text"
          placeholder="Enter Batch ID"
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring"
        />
        <button
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Track
        </button>
      </div>
    </div>
  );
};

export default TrackerInput;
