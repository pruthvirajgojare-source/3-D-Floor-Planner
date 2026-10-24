import React from 'react';
import {
  Eye,
  Sun,
  Sunset,
  Moon,
  Scissors,
  Layers,
  Sparkles,
  Armchair,
  Home,
  ShoppingBag,
  Sliders,
  CheckCircle2,
  Image,
  DoorOpen,
  DoorClosed
} from 'lucide-react';
import { SAMPLE_PLANS } from '../data/sampleFloorPlans';
import { formatINR, formatLakhs } from '../utils/currency';

export default function ControlsPanel({
  currentPlan,
  setCurrentPlan,
  activeMode,
  setActiveMode,
  wallHeightCutaway,
  setWallHeightCutaway,
  showCeiling,
  setShowCeiling,
  lightingMode,
  setLightingMode,
  onOpenUploadModal,
  onOpenFurnitureModal,
  onOpenCatalogModal,
  onOpenWallArtModal,
  hideFurniture,
  doorsOpen,
  setDoorsOpen
}) {
  const allCurrentItems = currentPlan.rooms.flatMap(r => (r.furniture || []));
  const totalFurniturePrice = allCurrentItems.reduce((acc, f) => acc + (f.price || 35000), 0);

  const handleSelectDesign = (plan) => {
    setCurrentPlan(plan);
  };

  return (
    <aside className="w-80 h-[calc(100vh-4rem)] glass-panel border-r border-slate-800/80 flex flex-col p-4 gap-4 overflow-y-auto select-none z-20">
      {/* Current Plan Overview Card */}
      <div className="p-4 rounded-2xl bg-gradient-to-b from-slate-800/60 to-slate-900/60 border border-slate-700/50 shadow-md">
        <div className="flex items-start justify-between gap-2">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-400">
              Active Design
            </span>
            <h2 className="text-base font-bold text-white mt-0.5 leading-snug">
              {currentPlan.name}
            </h2>
          </div>
          <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-indigo-950 text-indigo-300 border border-indigo-800/60 shrink-0">
            {currentPlan.type}
          </span>
        </div>

        <p className="text-xs text-slate-400 mt-2 line-clamp-2">
          {currentPlan.description}
        </p>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-slate-700/40">
          <div className="text-center p-1.5 rounded-lg bg-slate-900/50">
            <div className="text-[10px] text-slate-400">Total Area</div>
            <div className="text-xs font-bold text-indigo-300">{currentPlan.sqFt?.toLocaleString('en-IN')} ft²</div>
          </div>
          <div className="text-center p-1.5 rounded-lg bg-slate-900/50">
            <div className="text-[10px] text-slate-400">Bedrooms</div>
            <div className="text-xs font-bold text-slate-100">{currentPlan.bedrooms} Bed</div>
          </div>
          <div className="text-center p-1.5 rounded-lg bg-slate-900/50">
            <div className="text-[10px] text-slate-400">Baths</div>
            <div className="text-xs font-bold text-slate-100">{currentPlan.bathrooms} Bath</div>
          </div>
        </div>

        {/* Upload Custom 2D Blueprint */}
        <button
          onClick={onOpenUploadModal}
          className="w-full mt-3 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700/80 border border-slate-700/60 text-xs font-semibold text-slate-200 flex items-center justify-center gap-1.5 transition-all shadow-sm"
        >
          <Layers className="w-3.5 h-3.5 text-indigo-400" />
          Upload Custom 2D Blueprint
        </button>
      </div>

      {/* INTERACTIVE DOORS & WALL FRAMES TOOLBAR */}
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={() => setDoorsOpen(prev => !prev)}
          className={`p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1 text-center transition-all ${
            doorsOpen
              ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 ring-1 ring-amber-500/30'
              : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-300'
          }`}
        >
          {doorsOpen ? <DoorOpen className="w-4 h-4 text-amber-400" /> : <DoorClosed className="w-4 h-4 text-slate-400" />}
          <span className="text-[11px] font-bold">{doorsOpen ? 'Doors Open' : 'Doors Closed'}</span>
          <span className="text-[9px] text-slate-400">Click to swing</span>
        </button>

        <button
          onClick={onOpenWallArtModal}
          className="p-2.5 rounded-xl bg-indigo-950/30 border border-indigo-500/30 hover:border-indigo-500/60 text-indigo-200 flex flex-col items-center justify-center gap-1 text-center transition-all group"
        >
          <Image className="w-4 h-4 text-indigo-400 group-hover:scale-110 transition-transform" />
          <span className="text-[11px] font-bold">Shift Wall Art</span>
          <span className="text-[9px] text-indigo-300">Move anywhere</span>
        </button>
      </div>

      {/* DISTINCT HOME DESIGN SELECTION */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5 text-indigo-400" />
            Home Models by Square Footage
          </label>
        </div>

        <div className="space-y-1.5">
          {SAMPLE_PLANS.map((plan) => {
            const isSelected = currentPlan.id === plan.id;
            return (
              <button
                key={plan.id}
                onClick={() => handleSelectDesign(plan)}
                className={`w-full p-2.5 rounded-xl border text-left transition-all flex items-center justify-between group ${
                  isSelected
                    ? 'bg-indigo-950/60 border-indigo-500 ring-1 ring-indigo-500/50 shadow-md'
                    : 'bg-slate-900/40 border-slate-800 hover:border-slate-700 hover:bg-slate-800/40'
                }`}
              >
                <div>
                  <div className={`text-xs font-bold ${isSelected ? 'text-white' : 'text-slate-300 group-hover:text-white'}`}>
                    {plan.sqFt?.toLocaleString('en-IN')} SQ FT • {plan.type}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">
                    {plan.bedrooms} Bed, {plan.bathrooms} Bath • <span className="text-emerald-400 font-semibold">{formatLakhs(plan.estimatedCost)}</span> est.
                  </div>
                </div>
                {isSelected && (
                  <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Furniture Store & Pricing */}
      <div className="p-3.5 rounded-2xl bg-gradient-to-r from-emerald-950/40 to-teal-950/40 border border-emerald-500/30 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/20 flex items-center justify-center">
            <ShoppingBag className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <div className="text-xs font-bold text-white">Furniture Store (INR)</div>
            <div className="text-[10px] text-emerald-300">
              {allCurrentItems.length} items • <span className="font-mono font-bold">{formatINR(totalFurniturePrice)}</span>
            </div>
          </div>
        </div>
        <button
          onClick={onOpenCatalogModal}
          className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-bold text-white shadow-md shadow-emerald-600/30 transition-all shrink-0"
        >
          Catalog
        </button>
      </div>

      {/* Style & Fabric Customizer */}
      <div className="p-3 rounded-2xl bg-gradient-to-r from-purple-950/30 to-indigo-950/30 border border-purple-500/30 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Armchair className="w-4 h-4 text-purple-400" />
          <div>
            <div className="text-xs font-bold text-white">Staging & Fabrics</div>
            <div className="text-[10px] text-purple-300">
              {hideFurniture ? 'Mode: Bare Shell' : 'Colors & Wood finishes'}
            </div>
          </div>
        </div>
        <button
          onClick={onOpenFurnitureModal}
          className="px-2.5 py-1 rounded-xl bg-purple-600/40 hover:bg-purple-600 text-[11px] font-bold text-white border border-purple-500/40 transition-all"
        >
          Customize
        </button>
      </div>

      {/* View Mode Toggle */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
          <Eye className="w-3.5 h-3.5 text-indigo-400" />
          Camera Perspective
        </label>
        <div className="grid grid-cols-2 gap-2 p-1 bg-slate-900/80 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveMode('orbit')}
            className={`py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
              activeMode === 'orbit'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
            }`}
          >
            <span>🪐 Orbit View</span>
          </button>
          <button
            onClick={() => setActiveMode('walkthrough')}
            className={`py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
              activeMode === 'walkthrough'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
            }`}
          >
            <span>🚶 Walk Inside</span>
          </button>
        </div>
      </div>

      {/* Ceiling / Roof Toggle */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
          <Home className="w-3.5 h-3.5 text-sky-400" />
          Ceiling & Roof Structure
        </label>
        <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-900/80 rounded-xl border border-slate-800">
          <button
            onClick={() => setShowCeiling('none')}
            className={`py-1.5 px-2 rounded-lg text-[11px] font-semibold transition-all ${
              showCeiling === 'none'
                ? 'bg-slate-700 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Open Top
          </button>
          <button
            onClick={() => setShowCeiling('glass')}
            className={`py-1.5 px-2 rounded-lg text-[11px] font-semibold transition-all ${
              showCeiling === 'glass'
                ? 'bg-sky-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Glass Skylight
          </button>
          <button
            onClick={() => setShowCeiling('solid')}
            className={`py-1.5 px-2 rounded-lg text-[11px] font-semibold transition-all ${
              showCeiling === 'solid'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Solid Ceiling
          </button>
        </div>
      </div>

      {/* Architectural Wall Cutaway Mode */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
          <Scissors className="w-3.5 h-3.5 text-amber-400" />
          Wall Rendering Mode
        </label>
        <div className="grid grid-cols-2 gap-2 p-1 bg-slate-900/80 rounded-xl border border-slate-800">
          <button
            onClick={() => setWallHeightCutaway(false)}
            className={`py-2 px-3 rounded-lg text-xs font-semibold transition-all ${
              !wallHeightCutaway
                ? 'bg-slate-700 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
            }`}
          >
            Full Walls (3.0m)
          </button>
          <button
            onClick={() => setWallHeightCutaway(true)}
            className={`py-2 px-3 rounded-lg text-xs font-semibold transition-all ${
              wallHeightCutaway
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
            }`}
          >
            Dollhouse Cutaway
          </button>
        </div>
      </div>

      {/* Lighting / Atmosphere Toggle */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
          <Sun className="w-3.5 h-3.5 text-amber-400" />
          Lighting Atmosphere & Lamps
        </label>
        <div className="grid grid-cols-3 gap-2 p-1 bg-slate-900/80 rounded-xl border border-slate-800">
          <button
            onClick={() => setLightingMode('day')}
            className={`py-2 px-2 rounded-lg text-[11px] font-semibold flex flex-col items-center gap-1 transition-all ${
              lightingMode === 'day'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sun className="w-3.5 h-3.5 text-amber-400" />
            <span>Daylight</span>
          </button>
          <button
            onClick={() => setLightingMode('sunset')}
            className={`py-2 px-2 rounded-lg text-[11px] font-semibold flex flex-col items-center gap-1 transition-all ${
              lightingMode === 'sunset'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sunset className="w-3.5 h-3.5 text-orange-400" />
            <span>Sunset</span>
          </button>
          <button
            onClick={() => setLightingMode('night')}
            className={`py-2 px-2 rounded-lg text-[11px] font-semibold flex flex-col items-center gap-1 transition-all ${
              lightingMode === 'night'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Moon className="w-3.5 h-3.5 text-sky-400" />
            <span>Night Glow</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
