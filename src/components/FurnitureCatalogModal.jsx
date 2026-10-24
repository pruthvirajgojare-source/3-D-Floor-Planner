import React, { useState } from 'react';
import { FURNITURE_CATALOG } from '../data/furnitureCatalog';
import { X, ShoppingBag, Plus, Trash2, CheckCircle2 } from 'lucide-react';
import { formatINR, formatLakhs } from '../utils/currency';

export default function FurnitureCatalogModal({
  isOpen,
  onClose,
  currentPlan,
  onAddFurniture,
  onRemoveFurniture
}) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [targetRoomId, setTargetRoomId] = useState(currentPlan.rooms[0]?.id || '');

  if (!isOpen) return null;

  const categories = ['All', 'Living Room', 'Bedroom', 'Kitchen & Dining', 'Bathroom'];

  const filteredCatalog = selectedCategory === 'All'
    ? FURNITURE_CATALOG
    : FURNITURE_CATALOG.filter(item => item.category === selectedCategory);

  const allCurrentItems = currentPlan.rooms.flatMap(r => (r.furniture || []).map(f => ({ ...f, roomId: r.id, roomName: r.name })));
  const totalFurnitureCost = allCurrentItems.reduce((acc, item) => acc + (item.price || 35000), 0);

  const handleAdd = (catalogItem) => {
    const targetRoom = currentPlan.rooms.find(r => r.id === targetRoomId) || currentPlan.rooms[0];
    if (!targetRoom) return;

    const offsetX = (Math.random() - 0.5) * (targetRoom.width * 0.4);
    const offsetZ = (Math.random() - 0.5) * (targetRoom.depth * 0.4);

    const newItem = {
      id: 'f_' + Date.now(),
      type: catalogItem.type,
      name: catalogItem.name,
      price: catalogItem.price,
      x: Number((targetRoom.x + offsetX).toFixed(2)),
      z: Number((targetRoom.z + offsetZ).toFixed(2)),
      rot: 0,
      scale: catalogItem.scale
    };

    onAddFurniture(targetRoom.id, newItem);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="glass-panel w-full max-w-4xl rounded-3xl border border-slate-700/80 p-6 shadow-2xl relative flex flex-col max-h-[92vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white">
                  Furniture Catalog & Price Estimator
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  PRICING IN INR (₹)
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Browse designer furniture with Indian market pricing and stage rooms with one click.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Room Destination Selector & Live Furniture Budget Header */}
        <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-wrap items-center justify-between gap-3 mt-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Add Furniture Into:
            </span>
            <select
              value={targetRoomId}
              onChange={(e) => setTargetRoomId(e.target.value)}
              className="bg-slate-800 border border-slate-700 text-xs font-semibold text-indigo-300 rounded-xl px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              {currentPlan.rooms.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30">
            <span className="text-xs text-emerald-300 font-medium">Total Staging Cost:</span>
            <span className="text-sm font-extrabold text-emerald-400 font-mono">
              {formatINR(totalFurnitureCost)}
            </span>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-1.5 pt-3 overflow-x-auto pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-all ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Main 2-Column Split */}
        <div className="flex-1 overflow-hidden grid grid-cols-1 lg:grid-cols-3 gap-4 py-3">
          {/* Catalog Items */}
          <div className="lg:col-span-2 overflow-y-auto space-y-2.5 pr-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {filteredCatalog.map((item) => (
                <div
                  key={item.id}
                  className="p-3 rounded-2xl bg-slate-900/60 hover:bg-slate-800/60 border border-slate-800 hover:border-slate-700/80 transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-start justify-between gap-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400">
                        {item.category}
                      </span>
                      <span className="text-xs font-extrabold text-emerald-400 font-mono">
                        {formatINR(item.price)}
                      </span>
                    </div>

                    <h4 className="text-xs font-bold text-white mt-1 group-hover:text-indigo-300 transition-colors">
                      {item.name}
                    </h4>
                    <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                      {item.description}
                    </p>
                  </div>

                  <button
                    onClick={() => handleAdd(item)}
                    className="mt-3 w-full py-1.5 px-3 rounded-xl bg-slate-800 group-hover:bg-indigo-600 text-xs font-semibold text-slate-200 group-hover:text-white border border-slate-700/60 group-hover:border-indigo-500 flex items-center justify-center gap-1.5 transition-all shadow-sm"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add to Selected Room</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Placed Items Inventory */}
          <div className="rounded-2xl bg-slate-900/40 border border-slate-800 p-3 flex flex-col overflow-hidden">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Current Inventory ({allCurrentItems.length})
              </span>
              <span className="text-[10px] text-slate-400">Click 🗑️ to remove</span>
            </div>

            <div className="flex-1 overflow-y-auto space-y-1.5 pt-2 pr-1">
              {allCurrentItems.map((item, idx) => (
                <div
                  key={item.id || idx}
                  className="p-2 rounded-xl bg-slate-900/80 border border-slate-800/80 flex items-center justify-between group"
                >
                  <div className="overflow-hidden pr-2">
                    <div className="text-xs font-semibold text-slate-200 truncate">
                      {item.name || item.type}
                    </div>
                    <div className="text-[10px] text-slate-400 truncate">
                      {item.roomName} • <span className="text-emerald-400">{formatINR(item.price || 35000)}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => onRemoveFurniture(item.roomId, idx)}
                    className="p-1 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors shrink-0"
                    title="Remove furniture"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
          <div className="text-xs text-slate-400">
            All prices in Indian Rupees (₹) with estimated GST and delivery included.
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white shadow-lg shadow-indigo-600/30 transition-all"
          >
            Done & View 3D Model
          </button>
        </div>
      </div>
    </div>
  );
}
