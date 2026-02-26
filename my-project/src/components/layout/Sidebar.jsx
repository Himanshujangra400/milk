// src/components/layout/Sidebar.jsx
import React from 'react';
import { LayoutDashboard, Milk, Users, BookOpen, FileText, Settings } from 'lucide-react';

const Sidebar = ({ setActivePage, activePage }) => {
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', id: 'dashboard' },
    { icon: Milk, label: 'Milk Entry', id: 'milk-entry' },
    { icon: Users, label: 'Farmers', id: 'farmers' },
    { icon: BookOpen, label: 'Ledger', id: 'ledger' },
    { icon: FileText, label: 'Reports', id: 'reports' },
    { icon: Settings, label: 'Settings', id: 'settings' },
  ];

  return (
    <div className="h-screen w-64 bg-[#006A4E] text-white flex flex-col">
      <div className="p-6 flex items-center space-x-3">
        <Milk size={32} className="text-white" />
        <span className="text-xl font-bold">DairyCollect</span>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActivePage(item.id)} // Button click par page badlega
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
              activePage === item.id
                ? 'bg-white/20 text-white font-bold'
                : 'hover:bg-white/10 text-green-100'
            }`}
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;