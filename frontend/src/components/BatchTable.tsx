import React from 'react';

const BatchTable = () => {
  const batches = [
    { id: 'B001', name: 'Paracetamol', status: 'Verified' },
    { id: 'B002', name: 'Ibuprofen', status: 'Pending' },
  ];

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-center">Batch Records</h2>
      <table className="w-full table-auto bg-white shadow-md rounded">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">Batch ID</th>
            <th className="px-4 py-2">Medicine</th>
            <th className="px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {batches.map((batch) => (
            <tr key={batch.id} className="border-t">
              <td className="px-4 py-2 text-center">{batch.id}</td>
              <td className="px-4 py-2 text-center">{batch.name}</td>
              <td className="px-4 py-2 text-center">{batch.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BatchTable;
