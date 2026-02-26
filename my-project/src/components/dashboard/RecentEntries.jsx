// src/components/dashboard/RecentEntries.jsx
import React from 'react';

const RecentEntries = ({ entries }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <table className="w-full text-left">
        <thead className="bg-gray-50 text-gray-500 text-sm">
          <tr>
            <th className="px-6 py-4">Farmer</th>
            <th className="px-6 py-4">Type</th>
            <th className="px-6 py-4">Litres</th>
            <th className="px-6 py-4 text-right">Total Amount</th>
          </tr>
        </thead>
        <tbody>
          {entries.length > 0 ? entries.map((item) => (
            <tr key={item.id} className="border-t border-gray-100">
              <td className="px-6 py-4 font-medium">{item.farmer}</td>
              <td className="px-6 py-4">{item.type}</td>
              <td className="px-6 py-4">{item.litres} L</td>
              <td className="px-6 py-4 text-right font-bold text-gray-800">₹{item.total}</td>
            </tr>
          )) : (
            <tr><td colSpan="4" className="p-10 text-center text-gray-400">Koi data nahi hai bhai, entry karo!</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RecentEntries;