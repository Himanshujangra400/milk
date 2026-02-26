// src/components/layout/Header.jsx
import React from 'react';
import { LogOut } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white p-6 flex justify-between items-center shadow-sm border-b border-gray-200">
      {/* Left Side: Page Title */}
      <h1 className="text-2xl font-bold text-gray-800">Dairy Collection Center</h1>

      {/* Right Side: Date, User Info, Logout */}
      <div className="flex items-center space-x-6 text-gray-600">
        {/* <div className="text-sm">
          <span>Today: April 25, 2024</span>
          <span className="mx-3">|</span>
          <span>Welcome, Operator</span>
        </div> */}

        <button className="bg-[#006A4E] hover:bg-[#00543d] text-white px-5 py-2 rounded-lg flex items-center space-x-2 font-medium transition">
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </header>
  );
};

export default Header;