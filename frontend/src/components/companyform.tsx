import React from 'react';

const CompanyForm = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <form className="bg-white shadow-md rounded px-10 pt-8 pb-10 w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Company Registration</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Company Name</label>
          <input type="text" placeholder="Company XYZ"
            className="mt-1 block w-full border px-3 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-400" />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">License Number</label>
          <input type="text" placeholder="123456789"
            className="mt-1 block w-full border px-3 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-400" />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">Upload Certificate</label>
          <input type="file"
            className="mt-1 block w-full text-sm text-gray-600" />
        </div>

        <button type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CompanyForm;
