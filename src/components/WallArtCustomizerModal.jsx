import React from 'react';
import { X, Image, Sliders, Palette, Move, Plus, Trash2, CheckCircle2 } from 'lucide-react';

export const ARTWORK_STYLES = [
  { id: 1, name: 'Minimalist Geometric (Indigo & Brass)', preview: '#6366f1' },
  { id: 2, name: 'Japandi Sage (Nature & Earth)', preview: '#ccd5ae' },
  { id: 3, name: 'Bauhaus Colorblock (Modern)', preview: '#f43f5e' },
  { id: 4, name: 'Emerald & Liquid Gold (Luxury)', preview: '#064e3b' },
  { id: 5, name: 'Monochrome Architectural Line', preview: '#0f172a' }
];

export const FRAME_FINISHES = [
  { id: 'gold', name: 'Brushed Champagne Gold', color: '#d4af37', hex: 0xd4af37 },
  { id: 'black', name: 'Matte Jet Black', color: '#18181b', hex: 0x18181b },
  { id: 'wood', name: 'Scandinavian White Oak', color: '#b08968', hex: 0xb08968 },
  { id: 'white', name: 'Gallery Satin White', color: '#ffffff', hex: 0xffffff }
];

export default function WallArtCustomizerModal({
  isOpen,
  onClose,
  wallFrames,
  setWallFrames,
  currentPlan
}) {
  const [selectedFrameId, setSelectedFrameId] = React.useState(wallFrames[0]?.id || null);

  if (!isOpen) return null;

  const currentFrame = wallFrames.find(f => f.id === selectedFrameId) || wallFrames[0];

  const updateCurrentFrame = (updates) => {
    if (!currentFrame) return;
    setWallFrames(prev => prev.map(f => f.id === currentFrame.id ? { ...f, ...updates } : f));
  };

  const handleAddNewFrame = () => {
    const firstRoom = currentPlan.rooms[0];
    const newFrame = {
      id: 'frame_' + Date.now(),
      title: `${firstRoom?.name || 'Room'} Wall Art`,
      roomId: firstRoom?.id || 'r1',
      x: firstRoom ? firstRoom.x : 0,
      z: firstRoom ? firstRoom.z - firstRoom.depth / 2 + 0.15 : 0,
      y: 1.8,
      width: 1.6,
      height: 1.0,
      artVariant: 1,
      frameFinish: 'gold',
      rot: 0
    };
    setWallFrames(prev => [...prev, newFrame]);
    setSelectedFrameId(newFrame.id);
  };

  const handleRemoveFrame = (id) => {
    setWallFrames(prev => prev.filter(f => f.id !== id));
    if (selectedFrameId === id) {
      const remaining = wallFrames.filter(f => f.id !== id);
      setSelectedFrameId(remaining[0]?.id || null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="glass-panel w-full max-w-3xl rounded-3xl border border-slate-700/80 p-6 shadow-2xl relative flex flex-col max-h-[92vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
              <Image className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                Customizable Wall Frames & Art Positioning
              </h2>
              <p className="text-xs text-slate-400">
                Shift wall art anywhere, adjust hanging height, and choose luxury gallery frame finishes.
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

        {/* Body */}
        <div className="flex-1 overflow-y-auto py-4 space-y-6">
          {/* Active Frame Selector & Add New */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Select Wall Frame to Customize ({wallFrames.length})
              </label>
              <button
                onClick={handleAddNewFrame}
                className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white flex items-center gap-1.5 shadow-sm transition-all"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add New Art Frame</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {wallFrames.map((frame, idx) => {
                const isSelected = frame.id === currentFrame?.id;
                return (
                  <div
                    key={frame.id}
                    onClick={() => setSelectedFrameId(frame.id)}
                    className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-indigo-950/60 border-indigo-500 ring-2 ring-indigo-500/40 text-white'
                        : 'bg-slate-900/40 border-slate-800 hover:border-slate-700 text-slate-300'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold truncate">{frame.title || `Wall Art #${idx + 1}`}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">
                        Style {frame.artVariant} • {frame.frameFinish} frame
                      </div>
                    </div>
                    {wallFrames.length > 1 && (
                      <button
                        onClick={(e) => { e.stopPropagation(); handleRemoveFrame(frame.id); }}
                        className="p-1 rounded text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 ml-2"
                        title="Delete this frame"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {currentFrame && (
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-5">
              {/* 1. Shift Position (Left / Right / Height) */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                    <Move className="w-3.5 h-3.5 text-indigo-400" />
                    Shift Position Anywhere along Wall
                  </label>
                  <span className="text-[11px] font-mono text-indigo-400">
                    X: {currentFrame.x.toFixed(1)}m | Y: {currentFrame.y.toFixed(1)}m | Z: {currentFrame.z.toFixed(1)}m
                  </span>
                </div>

                {/* Horizontal Shift Slider */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] text-slate-400">
                    <span>Shift Left / Right (X Position)</span>
                    <span className="font-mono">{currentFrame.x.toFixed(1)} m</span>
                  </div>
                  <input
                    type="range"
                    min="-8"
                    max="8"
                    step="0.2"
                    value={currentFrame.x}
                    onChange={(e) => updateCurrentFrame({ x: Number(e.target.value) })}
                    className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 pt-1">
                    <button
                      onClick={() => updateCurrentFrame({ x: currentFrame.x - 0.5 })}
                      className="px-2 py-0.5 bg-slate-800 hover:bg-slate-700 rounded text-slate-300"
                    >
                      ⬅️ Shift -0.5m
                    </button>
                    <button
                      onClick={() => updateCurrentFrame({ x: 0 })}
                      className="px-2 py-0.5 bg-slate-800 hover:bg-slate-700 rounded text-slate-300"
                    >
                      🎯 Center
                    </button>
                    <button
                      onClick={() => updateCurrentFrame({ x: currentFrame.x + 0.5 })}
                      className="px-2 py-0.5 bg-slate-800 hover:bg-slate-700 rounded text-slate-300"
                    >
                      Shift +0.5m ➡️
                    </button>
                  </div>
                </div>

                {/* Vertical Height Slider */}
                <div className="space-y-1 pt-2">
                  <div className="flex justify-between text-[11px] text-slate-400">
                    <span>Hanging Height (Y from Floor)</span>
                    <span className="font-mono">{currentFrame.y.toFixed(1)} m</span>
                  </div>
                  <input
                    type="range"
                    min="1.0"
                    max="2.5"
                    step="0.1"
                    value={currentFrame.y}
                    onChange={(e) => updateCurrentFrame({ y: Number(e.target.value) })}
                    className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                  />
                </div>

                {/* Depth Position (North / South Wall) */}
                <div className="space-y-1 pt-2">
                  <div className="flex justify-between text-[11px] text-slate-400">
                    <span>Wall Alignment (Z Position)</span>
                    <span className="font-mono">{currentFrame.z.toFixed(1)} m</span>
                  </div>
                  <input
                    type="range"
                    min="-7"
                    max="7"
                    step="0.2"
                    value={currentFrame.z}
                    onChange={(e) => updateCurrentFrame({ z: Number(e.target.value) })}
                    className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                  />
                </div>
              </div>

              {/* 2. Artwork Painting Style */}
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                  <Palette className="w-3.5 h-3.5 text-emerald-400" />
                  Choose Artwork Style
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {ARTWORK_STYLES.map((art) => {
                    const isSelected = (currentFrame.artVariant || 1) === art.id;
                    return (
                      <button
                        key={art.id}
                        onClick={() => updateCurrentFrame({ artVariant: art.id })}
                        className={`p-2.5 rounded-xl border flex items-center gap-2 text-left transition-all ${
                          isSelected
                            ? 'bg-emerald-950/60 border-emerald-500 ring-1 ring-emerald-500/40 text-white'
                            : 'bg-slate-900/40 border-slate-800 hover:border-slate-700 text-slate-300'
                        }`}
                      >
                        <span
                          className="w-5 h-5 rounded-md shrink-0 shadow-inner"
                          style={{ backgroundColor: art.preview }}
                        />
                        <span className="text-xs font-medium leading-tight">{art.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 3. Frame Finish & Material */}
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                  <Palette className="w-3.5 h-3.5 text-amber-400" />
                  Choose Frame Molding Finish
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {FRAME_FINISHES.map((finish) => {
                    const isSelected = (currentFrame.frameFinish || 'gold') === finish.id;
                    return (
                      <button
                        key={finish.id}
                        onClick={() => updateCurrentFrame({ frameFinish: finish.id })}
                        className={`p-2.5 rounded-xl border flex items-center gap-2 transition-all ${
                          isSelected
                            ? 'bg-amber-950/60 border-amber-500 ring-1 ring-amber-500/40 text-white'
                            : 'bg-slate-900/40 border-slate-800 hover:border-slate-700 text-slate-300'
                        }`}
                      >
                        <span
                          className="w-5 h-5 rounded-full shrink-0 shadow-inner border border-white/20"
                          style={{ backgroundColor: finish.color }}
                        />
                        <span className="text-xs font-medium">{finish.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white shadow-lg shadow-indigo-600/30 transition-all"
          >
            Done & Apply to 3D View
          </button>
        </div>
      </div>
    </div>
  );
}
