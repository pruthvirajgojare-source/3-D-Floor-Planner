import React from 'react';
import { X, Armchair, Palette, Sparkles, Plus, Trash2, Eye, EyeOff } from 'lucide-react';

export const SOFA_COLORS = [
  { name: 'Charcoal Slate', hex: 0x334155, preview: '#334155' },
  { name: 'Royal Indigo', hex: 0x3730a3, preview: '#3730a3' },
  { name: 'Emerald Velvet', hex: 0x065f46, preview: '#065f46' },
  { name: 'Cognac Leather', hex: 0x9a3412, preview: '#9a3412' },
  { name: 'Linen Sand', hex: 0xd6d3d1, preview: '#d6d3d1' },
];

export const BED_COLORS = [
  { name: 'Deep Teal', hex: 0x0f766e, preview: '#0f766e' },
  { name: 'Midnight Navy', hex: 0x1e3a8a, preview: '#1e3a8a' },
  { name: 'Crimson Wine', hex: 0x881337, preview: '#881337' },
  { name: 'Warm Terracotta', hex: 0xb45309, preview: '#b45309' },
];

export const WOOD_FINISHES = [
  { name: 'Warm Walnut', hex: 0x85583b, preview: '#85583b' },
  { name: 'Natural Oak', hex: 0xb08968, preview: '#b08968' },
  { name: 'Dark Espresso', hex: 0x3e2723, preview: '#3e2723' },
  { name: 'Matte Jet Black', hex: 0x18181b, preview: '#18181b' },
];

export default function FurnitureCustomizerModal({
  isOpen,
  onClose,
  furnitureTheme,
  setFurnitureTheme,
  hideFurniture,
  setHideFurniture,
  currentPlan,
  onUpdatePlan
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in">
      <div className="glass-panel w-full max-w-2xl rounded-3xl border border-slate-700/80 p-6 shadow-2xl relative flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
              <Armchair className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                Furniture & Interior Style Customizer
              </h2>
              <p className="text-xs text-slate-400">
                Tailor upholstery fabrics, woodwork, and stage rooms in real time.
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

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto py-4 space-y-6">
          {/* 1. Staging Mode: Furnished vs Bare Shell */}
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-white uppercase tracking-wider">
                  Real Estate Staging Mode
                </div>
                <div className="text-[11px] text-slate-400">
                  Switch between staged designer furniture and empty bare-shell room views.
                </div>
              </div>
              <button
                onClick={() => setHideFurniture(!hideFurniture)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                  hideFurniture
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    : 'bg-indigo-600 text-white shadow-md'
                }`}
              >
                {hideFurniture ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                {hideFurniture ? 'Bare Shell (Empty)' : 'Fully Furnished'}
              </button>
            </div>
          </div>

          {!hideFurniture && (
            <>
              {/* 2. Living Room Sofa Upholstery */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                  <Palette className="w-3.5 h-3.5 text-indigo-400" />
                  Sofa Upholstery Fabric
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {SOFA_COLORS.map((col) => {
                    const isSelected = furnitureTheme.sofaColor === col.hex || (!furnitureTheme.sofaColor && col.hex === SOFA_COLORS[0].hex);
                    return (
                      <button
                        key={col.name}
                        onClick={() => setFurnitureTheme({ ...furnitureTheme, sofaColor: col.hex })}
                        className={`p-2 rounded-xl border flex flex-col items-center gap-1.5 transition-all ${
                          isSelected
                            ? 'bg-indigo-950/60 border-indigo-500 ring-2 ring-indigo-500/40 text-white'
                            : 'bg-slate-900/40 border-slate-800 hover:border-slate-700 text-slate-300'
                        }`}
                      >
                        <span
                          className="w-6 h-6 rounded-full shadow-inner border border-white/20"
                          style={{ backgroundColor: col.preview }}
                        />
                        <span className="text-[10px] font-medium text-center">{col.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 3. Bedroom Bedding & Headboard Fabric */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                  <Palette className="w-3.5 h-3.5 text-emerald-400" />
                  Bed Linen & Headboard Velvet
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {BED_COLORS.map((col) => {
                    const isSelected = furnitureTheme.bedColor === col.hex || (!furnitureTheme.bedColor && col.hex === BED_COLORS[0].hex);
                    return (
                      <button
                        key={col.name}
                        onClick={() => setFurnitureTheme({ ...furnitureTheme, bedColor: col.hex })}
                        className={`p-2 rounded-xl border flex flex-col items-center gap-1.5 transition-all ${
                          isSelected
                            ? 'bg-emerald-950/60 border-emerald-500 ring-2 ring-emerald-500/40 text-white'
                            : 'bg-slate-900/40 border-slate-800 hover:border-slate-700 text-slate-300'
                        }`}
                      >
                        <span
                          className="w-6 h-6 rounded-full shadow-inner border border-white/20"
                          style={{ backgroundColor: col.preview }}
                        />
                        <span className="text-[10px] font-medium text-center">{col.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 4. Millwork & Cabinet Wood Tone */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                  <Palette className="w-3.5 h-3.5 text-amber-400" />
                  Cabinetry & Millwork Wood Tone
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {WOOD_FINISHES.map((wood) => {
                    const isSelected = furnitureTheme.woodColor === wood.hex || (!furnitureTheme.woodColor && wood.hex === WOOD_FINISHES[0].hex);
                    return (
                      <button
                        key={wood.name}
                        onClick={() => setFurnitureTheme({ ...furnitureTheme, woodColor: wood.hex })}
                        className={`p-2 rounded-xl border flex flex-col items-center gap-1.5 transition-all ${
                          isSelected
                            ? 'bg-amber-950/60 border-amber-500 ring-2 ring-amber-500/40 text-white'
                            : 'bg-slate-900/40 border-slate-800 hover:border-slate-700 text-slate-300'
                        }`}
                      >
                        <span
                          className="w-6 h-6 rounded-full shadow-inner border border-white/20"
                          style={{ backgroundColor: wood.preview }}
                        />
                        <span className="text-[10px] font-medium text-center">{wood.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white shadow-lg shadow-indigo-600/30 transition-all"
          >
            Apply to 3D View
          </button>
        </div>
      </div>
    </div>
  );
}
