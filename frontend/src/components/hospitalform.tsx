// src/components/hospitalform.tsx
import { useState } from "react";

const HospitalForm = () => {
  const [formData, setFormData] = useState({
    hospitalName: '',
    hospitalID: '',
    medicineNeeded: '',
    quantity: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Hospital request submitted:", formData);
    // TODO: Send this to backend
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-teal-100 to-cyan-200">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Hospital Medicine Request</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Hospital Name</label>
          <input type="text" name="hospitalName" value={formData.hospitalName} onChange={handleChange}
            required className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-400" />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Hospital ID</label>
          <input type="text" name="hospitalID" value={formData.hospitalID} onChange={handleChange}
            required className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-400" />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Medicine Needed</label>
          <input type="text" name="medicineNeeded" value={formData.medicineNeeded} onChange={handleChange}
            required className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-400" />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">Quantity</label>
          <input type="number" name="quantity" value={formData.quantity} onChange={handleChange}
            required className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-400" />
        </div>

        <button type="submit" className="w-full bg-cyan-600 text-white py-2 rounded hover:bg-cyan-700 transition">
          Submit Request
        </button>
      </form>
    </div>
  );
};

export default HospitalForm;
