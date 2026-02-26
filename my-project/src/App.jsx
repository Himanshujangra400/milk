// src/App.jsx
import React, { useState, useEffect } from 'react';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import StatCard from './components/dashboard/StatCard';
import { MilkCollectionChart, EarningsChart } from './components/dashboard/DashboardCharts';
import RecentEntries from './components/dashboard/RecentEntries';
import MilkEntry from './components/pages/MilkEntry';
import { Milk, Beef, Calculator, Users, TrendingUp, Menu } from 'lucide-react';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activePage, setActivePage] = useState('dashboard');

  // 1. LocalStorage se data load karna
  const [entries, setEntries] = useState(() => {
    const savedEntries = localStorage.getItem('dairy_entries');
    return savedEntries ? JSON.parse(savedEntries) : [];
  });

  // 2. Data save karne ka effect
  useEffect(() => {
    localStorage.setItem('dairy_entries', JSON.stringify(entries));
  }, [entries]);

  // 3. Nayi entry add karne ka function
  const addEntry = (newEntry) => {
    setEntries([newEntry, ...entries]); 
  };

  // 4. Dynamic Calculations
  const totalMilk = entries.reduce((sum, item) => sum + Number(item.litres), 0);
  const totalCash = entries.reduce((sum, item) => sum + Number(item.total), 0);
  const cowMilk = entries.filter(e => e.type === 'Cow').reduce((sum, item) => sum + Number(item.litres), 0);
  const buffaloMilk = entries.filter(e => e.type === 'Buffalo').reduce((sum, item) => sum + Number(item.litres), 0);

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden relative">
      {/* Sidebar Section */}
      <div className={`fixed inset-y-0 left-0 z-50 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 lg:relative lg:translate-x-0`}>
        <Sidebar setActivePage={setActivePage} activePage={activePage} />
      </div>

      {isSidebarOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setIsSidebarOpen(false)}></div>}

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header Section */}
        <div className="flex items-center bg-white border-b border-gray-200">
          <button className="p-4 lg:hidden text-gray-600" onClick={() => setIsSidebarOpen(true)}><Menu size={28} /></button>
          <div className="flex-1"><Header /></div>
        </div>

        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {activePage === 'dashboard' ? (
            <>
              {/* Stat Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
                <StatCard title="Total Milk Today" value={totalMilk.toFixed(1)} unit="L" icon={Milk} colorClass="bg-gradient-to-br from-green-500 to-green-700" />
                <StatCard title="Cow Milk" value={cowMilk.toFixed(1)} unit="L" icon={TrendingUp} colorClass="bg-gradient-to-br from-emerald-500 to-emerald-700" />
                <StatCard title="Buffalo Milk" value={buffaloMilk.toFixed(1)} unit="L" icon={Beef} colorClass="bg-gradient-to-br from-green-600 to-green-800" />
                <StatCard title="Total Amount" value={totalCash.toLocaleString()} unit="₹" icon={Calculator} colorClass="bg-gradient-to-br from-lime-600 to-green-700" />
                <StatCard title="Total Farmers" value={[...new Set(entries.map(e => e.farmer))].length} unit="" icon={Users} colorClass="bg-gradient-to-br from-green-700 to-green-900" />
              </div>

              {/* Charts Row: Yahan 'entries' pass kar diya hai */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-2 rounded-xl shadow-sm">
                  <MilkCollectionChart entries={entries} />
                </div>
                <div className="bg-white p-2 rounded-xl shadow-sm">
                  <EarningsChart entries={entries} />
                </div>
              </div>

              {/* Recent Table */}
              <div className="mt-6 mb-10 text-black">
                 <RecentEntries entries={entries.slice(0, 5)} /> 
              </div>
            </>
          ) : (
            /* MilkEntry: Yahan bhi 'entries' pass kiya hai taaki form ke niche wali table update ho sake */
            <MilkEntry onSave={addEntry} entries={entries} />
          )}
        </main>
      </div>
    </div>
  );
}

export default App;