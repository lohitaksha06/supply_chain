import React, { useState } from 'react';

const CustomerForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    medicineName: '',
    purchaseCode: '',
    purchaseDate: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Customer form submitted:', formData);
    // TODO: Send to backend
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-blue-100">
      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded px-10 pt-8 pb-10 w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Customer Purchase Form</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Full Name</label>
          <input type="text" name="fullName" value={formData.fullName} onChange={handleChange}
            required className="mt-1 w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-purple-400" />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange}
            required className="mt-1 w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-purple-400" />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Phone Number</label>
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange}
            required className="mt-1 w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-purple-400" />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Medicine Name</label>
          <input type="text" name="medicineName" value={formData.medicineName} onChange={handleChange}
            required className="mt-1 w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-purple-400" />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Purchase Code</label>
          <input type="text" name="purchaseCode" value={formData.purchaseCode} onChange={handleChange}
            required className="mt-1 w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-purple-400" />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">Purchase Date</label>
          <input type="date" name="purchaseDate" value={formData.purchaseDate} onChange={handleChange}
            required className="mt-1 w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-purple-400" />
        </div>

        <button type="submit"
          className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition">
          Submit Purchase
        </button>
      </form>
    </div>
  );
};

export default CustomerForm;
