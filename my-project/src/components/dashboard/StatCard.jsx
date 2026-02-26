import React from 'react';

const StatCard = ({ title, value, unit, icon: Icon, colorClass }) => {
  return (
    <div className={`p-4 rounded-xl shadow-sm text-white flex flex-col justify-between h-32 ${colorClass}`}>
      <div className="flex justify-between items-start">
        <span className="font-medium text-sm opacity-90">{title}</span>
        <div className="p-2 bg-white/20 rounded-lg">
          <Icon size={20} />
        </div>
      </div>
      <div className="mt-2">
        <span className="text-3xl font-bold">{value}</span>
        <span className="ml-1 text-sm opacity-80">{unit}</span>
      </div>
    </div>
  );
};

export default StatCard;