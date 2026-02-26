// src/components/dashboard/DashboardCharts.jsx
import React, { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

// --- 1. Milk Collection Chart (Ab yeh entries data lega) ---
export const MilkCollectionChart = ({ entries = [] }) => {
  
  // Data processing: Entries ko chart format mein badalna
  const dynamicMilkData = useMemo(() => {
    if (entries.length === 0) return [];

    // Last 7 entries ko graph par dikhayenge
    return entries.slice(0, 7).reverse().map(item => ({
      name: item.farmer.split(' ')[0], // Sirf pehla naam
      cow: item.type === 'Cow' ? Number(item.litres) : 0,
      buffalo: item.type === 'Buffalo' ? Number(item.litres) : 0,
    }));
  }, [entries]);

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-80">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Milk Collection (Litres)</h3>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart data={dynamicMilkData}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
          <XAxis dataKey="name" axisLine={false} tickLine={false} />
          <YAxis axisLine={false} tickLine={false} />
          <Tooltip />
          <Line 
            type="monotone" 
            dataKey="cow" 
            stroke="#10b981" 
            strokeWidth={3} 
            name="Cow Milk"
            dot={{ r: 4 }} 
            activeDot={{ r: 6 }} 
          />
          <Line 
            type="monotone" 
            dataKey="buffalo" 
            stroke="#3b82f6" 
            strokeWidth={3} 
            name="Buffalo Milk"
            dot={{ r: 4 }} 
            activeDot={{ r: 6 }} 
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

// --- 2. Daily Earnings Chart (Ab yeh bhi entries data lega) ---
export const EarningsChart = ({ entries = [] }) => {
  
  const dynamicEarningData = useMemo(() => {
    if (entries.length === 0) return [];

    return entries.slice(0, 7).reverse().map(item => ({
      name: item.farmer.split(' ')[0],
      amount: item.total,
    }));
  }, [entries]);

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-80">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Daily Earnings (₹)</h3>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart data={dynamicEarningData}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
          <XAxis dataKey="name" axisLine={false} tickLine={false} />
          <YAxis axisLine={false} tickLine={false} />
          <Tooltip cursor={{fill: 'transparent'}} />
          <Bar 
            dataKey="amount" 
            fill="#10b981" 
            name="Earnings"
            radius={[4, 4, 0, 0]} 
            barSize={30} 
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};