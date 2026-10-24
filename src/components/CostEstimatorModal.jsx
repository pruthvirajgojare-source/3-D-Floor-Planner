import React, { useState } from 'react';
import { X, Calculator, Download, CheckCircle2, IndianRupee } from 'lucide-react';
import { formatINR, formatLakhs } from '../utils/currency';

export default function CostEstimatorModal({ isOpen, onClose, currentPlan, targetSqFt = 1850 }) {
  if (!isOpen || !currentPlan) return null;

  const [tier, setTier] = useState('standard');

  const tierMultipliers = {
    economy: 0.78,
    standard: 1.0,
    luxury: 1.45,
  };

  const sqFt = targetSqFt || currentPlan.sqFt || 1850;
  const multiplier = tierMultipliers[tier];

  // Realistic Indian Turnkey Construction & Interior Finishing Rates (₹ per sq ft)
  // Standard Turnkey is ~₹2,100 / sq ft in urban India
  const civilStructureCost = Math.round(sqFt * 850 * multiplier);
  const flooringFinishingCost = Math.round(sqFt * 420 * multiplier);
  const doorsWindowsGlazing = Math.round((currentPlan.walls.length * 28000) * multiplier);
  const plumbingElectrical = Math.round(sqFt * 320 * multiplier);
  const laborPermitsArch = Math.round((civilStructureCost + flooringFinishingCost) * 0.22);

  // Live Furniture Total from this house
  const furnitureTotal = currentPlan.rooms
    .flatMap(r => r.furniture || [])
    .reduce((sum, f) => sum + (f.price || 35000), 0);

  const grandTotal = civilStructureCost + flooringFinishingCost + doorsWindowsGlazing + plumbingElectrical + laborPermitsArch + furnitureTotal;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in">
      <div className="glass-panel w-full max-w-2xl rounded-3xl border border-slate-700/80 p-6 shadow-2xl relative flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
              <Calculator className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white">
                  Construction & Turnkey Cost Estimator
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  INR (₹)
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Turnkey budget for <span className="text-indigo-400 font-bold">{sqFt.toLocaleString('en-IN')} sq ft</span> ({currentPlan.name})
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

        {/* Quality Tier Selector */}
        <div className="py-4 space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Material & Finishing Specification
          </label>
          <div className="grid grid-cols-3 gap-3 p-1.5 bg-slate-900 rounded-2xl border border-slate-800">
            {[
              { id: 'economy', label: 'Economy Grade', desc: 'Vitrified tiles & standard brickwork' },
              { id: 'standard', label: 'Premium Modern', desc: 'Hardwood, quartz & CP fittings' },
              { id: 'luxury', label: 'Royal Luxury', desc: 'Italian marble, teakwood & smart home' },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setTier(t.id)}
                className={`p-2.5 rounded-xl text-left transition-all ${
                  tier === t.id
                    ? 'bg-emerald-600/30 border border-emerald-500 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                <div className="text-xs font-bold">{t.label}</div>
                <div className="text-[10px] text-slate-400 mt-0.5">{t.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Detailed Breakdown List */}
        <div className="flex-1 overflow-y-auto space-y-2 py-2 pr-1">
          {[
            { label: 'RCC Structure & Masonry Walls', qty: `${sqFt.toLocaleString('en-IN')} sq ft`, cost: civilStructureCost, desc: 'Cement, TMT steel, brickwork & plastering' },
            { label: 'Flooring & Skirting Finishing', qty: `${sqFt.toLocaleString('en-IN')} sq ft`, cost: flooringFinishingCost, desc: 'Selected wood parquet, Italian marble or vitrified tiles' },
            { label: 'Doors, Windows & UPVC Glazing', qty: `${currentPlan.walls.length} openings`, cost: doorsWindowsGlazing, desc: 'Teakwood frame doors, soundproof double-pane windows' },
            { label: 'Plumbing, Sanitary & Electrical Points', qty: `${currentPlan.bathrooms} baths + kitchen`, cost: plumbingElectrical, desc: 'Concealed copper wiring, CP fixtures & LED downlights' },
            { label: 'Architectural Design & Contractor Labor', qty: 'Turnkey estimated', cost: laborPermitsArch, desc: 'Structural engineer inspection, site supervision & labor' },
            { label: 'Selected Furniture & Staging Package', qty: `${currentPlan.rooms.flatMap(r => r.furniture || []).length} items`, cost: furnitureTotal, desc: 'All staged beds, sofas, modular kitchen, TV consoles & lighting' },
          ].map((item, idx) => (
            <div key={idx} className="p-3 rounded-xl bg-slate-900/50 border border-slate-800/80 flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold text-slate-200">{item.label}</div>
                <div className="text-[10px] text-slate-400 mt-0.5">{item.desc} ({item.qty})</div>
              </div>
              <div className="text-sm font-mono font-bold text-slate-100">
                {formatINR(item.cost)}
              </div>
            </div>
          ))}
        </div>

        {/* Total Footer Banner */}
        <div className="pt-4 mt-2 border-t border-slate-800 flex items-center justify-between">
          <div>
            <div className="text-[11px] text-slate-400 uppercase font-semibold">Turnkey Project Valuation</div>
            <div className="text-2xl font-extrabold text-emerald-400 font-mono flex items-baseline gap-2">
              <span>{formatINR(grandTotal)}</span>
              <span className="text-xs font-normal text-slate-400">({formatLakhs(grandTotal)})</span>
            </div>
          </div>
          <button
            onClick={() => {
              alert("Project Bill of Materials (BOM) copied in Indian Rupees (₹)!");
            }}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 flex items-center gap-1.5 transition-all"
          >
            <Download className="w-4 h-4 text-emerald-400" />
            Copy Bill of Materials
          </button>
        </div>
      </div>
    </div>
  );
}
