import React from 'react';
import { Layers, Sparkles, Calculator, Presentation, Box, ShoppingBag, Image } from 'lucide-react';

export default function Header({ onOpenCostEstimator, onOpenPitchGuide, onOpenCatalog, onOpenWallArt }) {
  return (
    <header className="h-16 px-6 glass-panel border-b border-slate-800/80 flex items-center justify-between z-30 select-none">
      {/* Brand Logo & Title */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/25 ring-1 ring-white/20">
          <Box className="w-5 h-5 text-white" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-indigo-300 bg-clip-text text-transparent">
              PlanToSpace 3D
            </h1>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
              AI ENGINE
            </span>
          </div>
          <p className="text-xs text-slate-400">
            2D Blueprint to Interactive 3D Architectural Viewer
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2.5">
        <button
          onClick={onOpenWallArt}
          className="px-3.5 py-1.5 rounded-xl glass-pill hover:bg-slate-800/90 text-xs font-semibold text-indigo-300 flex items-center gap-2 border border-indigo-500/30 hover:border-indigo-500/60 transition-all shadow-sm"
          title="Shift and customize wall frames anywhere"
        >
          <Image className="w-4 h-4 text-indigo-400" />
          <span>Wall Frames & Art</span>
        </button>

        <button
          onClick={onOpenCatalog}
          className="px-3.5 py-1.5 rounded-xl glass-pill hover:bg-slate-800/90 text-xs font-semibold text-emerald-300 flex items-center gap-2 border border-emerald-500/30 hover:border-emerald-500/60 transition-all shadow-sm"
        >
          <ShoppingBag className="w-4 h-4 text-emerald-400" />
          <span>Furniture Store (₹)</span>
        </button>

        <button
          onClick={onOpenCostEstimator}
          className="px-3.5 py-1.5 rounded-xl glass-pill hover:bg-slate-800/90 text-xs font-semibold text-slate-200 flex items-center gap-2 border border-slate-700/60 hover:border-indigo-500/40 transition-all shadow-sm"
        >
          <Calculator className="w-4 h-4 text-emerald-400" />
          <span>Cost Estimator</span>
        </button>

        <button
          onClick={onOpenPitchGuide}
          className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-xs font-bold text-white flex items-center gap-2 shadow-lg shadow-indigo-600/30 transition-all"
        >
          <Presentation className="w-4 h-4" />
          <span>Pitch Playbook</span>
        </button>
      </div>
    </header>
  );
}
