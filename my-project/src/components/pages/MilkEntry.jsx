import React, { useState } from 'react';
import { Search, Save, Edit2, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';

const MilkEntry = ({ onSave, onEdit, onDelete, entries = [] }) => {
  // --- Form States (Logic starts here) ---
  const [farmer, setFarmer] = useState('');
  const [shift, setShift] = useState('Morning');
  const [milkType, setMilkType] = useState('Cow');
  const [litres, setLitres] = useState('');
  const [fat, setFat] = useState('');
  const [snf, setSnf] = useState('');
  const [fat2, setFat2] = useState(''); // Teesra box
  const [rate, setRate] = useState(38.00);
  const [editingId, setEditingId] = useState(null);

  // Live Calculation
  const totalAmount = (parseFloat(litres) || 0) * rate;

  // Save Function
  const handleSave = () => {
    if (!farmer || !litres) {
      alert("Please enter Farmer Name and Litres!");
      return;
    }

    const entry = {
      id: editingId || Date.now(),
      farmer: farmer,
      shift: shift,
      type: milkType,
      litres: parseFloat(litres),
      fat: fat,
      total: totalAmount,
      date: new Date().toLocaleDateString()
    };

    if (editingId && onEdit) {
      onEdit(entry);
      alert("Entry updated");
    } else {
      onSave(entry);
      alert("Entry Saved Successfully!");
    }

    // Form Reset
    setFarmer('');
    setLitres('');
    setFat('');
    setSnf('');
    setFat2('');
    setEditingId(null);
  };

  return (
    <div className="space-y-6">
      {/* 1. Top Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Milk Entry</h2>
          <p className="text-gray-500 text-sm">Today: April 25, 2024 | {shift} Shift</p>
        </div>
        
        <div className="flex bg-gray-200 p-1 rounded-lg w-fit">
          <button 
            onClick={() => setShift('Morning')}
            className={`px-6 py-2 rounded-md text-sm font-medium transition ${shift === 'Morning' ? 'bg-[#006A4E] text-white shadow' : 'text-gray-600'}`}
          >
            Morning
          </button>
          <button 
            onClick={() => setShift('Evening')}
            className={`px-6 py-2 rounded-md text-sm font-medium transition ${shift === 'Evening' ? 'bg-[#006A4E] text-white shadow' : 'text-gray-600'}`}
          >
            Evening
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 2. Left: Entry Form */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-700 mb-4">Select Farmer</h3>
          <div className="relative mb-6">
            <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
              <Search size={18} />
            </span>
            <input 
              type="text" 
              value={farmer}
              onChange={(e) => setFarmer(e.target.value)}
              placeholder="Search Farmer Name" 
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Milk Type</label>
              <div className="flex border border-gray-200 rounded-lg p-1">
                <button 
                  onClick={() => setMilkType('Cow')}
                  className={`flex-1 py-2 text-sm rounded-md transition ${milkType === 'Cow' ? 'bg-green-50 text-green-700 border border-green-200' : 'text-gray-500'}`}
                >
                  Cow
                </button>
                <button 
                  onClick={() => setMilkType('Buffalo')}
                  className={`flex-1 py-2 text-sm rounded-md transition ${milkType === 'Buffalo' ? 'bg-green-50 text-green-700 border border-green-200' : 'text-gray-500'}`}
                >
                  Buffalo
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Litres</label>
              <input 
                type="number" 
                value={litres}
                onChange={(e) => setLitres(e.target.value)}
                placeholder="0.00 L" 
                className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-8">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Fat %</label>
              <input type="text" value={fat} onChange={(e) => setFat(e.target.value)} placeholder="0.0" className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">SNF %</label>
              <input type="text" value={snf} onChange={(e) => setSnf(e.target.value)} placeholder="0.0" className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Fat %</label>
              <input type="text" value={fat2} onChange={(e) => setFat2(e.target.value)} placeholder="0.0" className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600" />
            </div>
          </div>

          <button 
            onClick={handleSave}
            className="w-full md:w-fit bg-[#006A4E] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#00543d] transition flex items-center justify-center gap-2"
          >
            <Save size={20} />
            {editingId ? 'Update Entry' : 'Save Entry'}
          </button>
        </div>

        {/* 3. Right: Live Calculation Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col">
          <h3 className="font-bold text-gray-700 mb-4">Live Calculation</h3>
          <div className="space-y-4 flex-1">
            <div className="flex justify-between text-gray-600">
              <span>Rate per Litre</span>
              <span className="font-bold text-gray-800">₹ {rate.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Total Amount</span>
              <span className="font-bold text-gray-800">₹ {totalAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Bonus</span>
              <span className="font-bold text-gray-800">₹ 0.00</span>
            </div>
            
            <div className="mt-4 p-4 bg-green-50 border border-green-100 rounded-xl">
              <div className="flex justify-between items-center">
                <span className="text-green-800 font-medium text-lg">Final Amount</span>
                <span className="text-green-800 font-bold text-2xl">₹ {totalAmount.toFixed(2)}</span>
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-2 italic">✓ Bonus is automatically calculated based on Fat %.</p>
          </div>
        </div>
      </div>

      {/* 4. Bottom: Today's Entries Table (Ab dynamic hai!) */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h3 className="font-bold text-gray-800">Today's Entries</h3>
          <div className="flex items-center gap-2 text-sm text-gray-500">
             <span>Page 1 of 1</span>
             <button className="p-1 border rounded disabled:opacity-30"><ChevronLeft size={16} /></button>
             <button className="p-1 border rounded disabled:opacity-30"><ChevronRight size={16} /></button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50/80 text-gray-500 text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 font-semibold">Farmer</th>
                <th className="px-6 py-4 font-semibold">Shift</th>
                <th className="px-6 py-4 font-semibold">Litres</th>
                <th className="px-6 py-4 font-semibold">Fat %</th>
                <th className="px-6 py-4 font-semibold">Rate</th>
                <th className="px-6 py-4 font-semibold">Total</th>
                <th className="px-6 py-4 font-semibold text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {entries.length > 0 ? entries.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50/50 transition">
                  <td className="px-6 py-4 font-medium text-gray-800">{row.farmer}</td>
                  <td className="px-6 py-4 text-gray-600">{row.shift}</td>
                  <td className="px-6 py-4 text-gray-800 font-medium">{row.litres} L</td>
                  <td className="px-6 py-4 text-gray-600">{row.fat}%</td>
                  <td className="px-6 py-4 text-gray-600">₹ 38.00</td>
                  <td className="px-6 py-4 font-bold text-gray-800">₹ {row.total.toFixed(2)}</td>
                  <td className="px-6 py-4 flex justify-center gap-2">
                    <button
                      className="p-2 text-white bg-green-600 rounded-md hover:bg-green-700 transition"
                      onClick={() => {
                        // populate form for editing
                        setFarmer(row.farmer);
                        setShift(row.shift);
                        setMilkType(row.type);
                        setLitres(row.litres);
                        setFat(row.fat);
                        setSnf('');
                        setFat2('');
                        setRate(row.rate || 38);
                        setEditingId(row.id);
                      }}
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      className="p-2 text-white bg-red-500 rounded-md hover:bg-red-600 transition"
                      onClick={() => onDelete && onDelete(row.id)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="7" className="px-6 py-10 text-center text-gray-400">No entries yet. Add your first entry above!</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MilkEntry;