import React from 'react';

const CustomerForm = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-50">
      <form className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-center">Customer Details</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input type="text" placeholder="John Doe"
            className="mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring" />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Purchase Code</label>
          <input type="text" placeholder="PURC-12345"
            className="mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring" />
        </div>

        <button type="submit"
          className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CustomerForm;
