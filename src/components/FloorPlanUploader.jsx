import React, { useState } from 'react';
import { SAMPLE_PLANS } from '../data/sampleFloorPlans';
import { parseFloorPlanImage } from '../utils/aiFloorPlanParser';
import { UploadCloud, CheckCircle2, Sparkles, X, FileImage, ArrowRight, Loader2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { formatLakhs } from '../utils/currency';

export default function FloorPlanUploader({
  isOpen,
  onClose,
  currentPlan,
  onSelectPlan
}) {
  const [activeTab, setActiveTab] = useState('presets');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState('');
  const [dragActive, setDragActive] = useState(false);

  if (!isOpen) return null;

  const handleSelectPreset = (plan) => {
    onSelectPlan(plan);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 }
    });
    onClose();
  };

  const handleFileUpload = async (file) => {
    if (!file) return;
    setIsProcessing(true);

    try {
      setProcessingStep('Analyzing 2D line vectors & structural raster...');
      await new Promise(r => setTimeout(r, 600));

      setProcessingStep('Segmenting walls, partitions & doorways...');
      await new Promise(r => setTimeout(r, 600));

      setProcessingStep('Synthesizing 3D Three.js mesh & applying textures...');
      const parsed = await parseFloorPlanImage(file, file.name.replace(/\.[^/.]+$/, ""));

      onSelectPlan(parsed);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in">
      <div className="glass-panel w-full max-w-4xl rounded-3xl border border-slate-700/80 p-6 shadow-2xl relative flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-400" />
              Choose Architectural Model or Upload Blueprint
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Select an authentic architectural blueprint by square footage or upload your own 2D drawing.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 pt-4">
          <button
            onClick={() => setActiveTab('presets')}
            className={`py-2 px-4 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'presets'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            🏛️ Architectural Models (650 to 3,000 SQ FT)
          </button>
          <button
            onClick={() => setActiveTab('upload')}
            className={`py-2 px-4 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'upload'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            ⚡ Upload Custom 2D Blueprint (AI Vision)
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto py-4">
          {activeTab === 'presets' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {SAMPLE_PLANS.map((plan) => {
                const isCurrent = currentPlan && currentPlan.id === plan.id;
                return (
                  <div
                    key={plan.id}
                    onClick={() => handleSelectPreset(plan)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between group ${
                      isCurrent
                        ? 'bg-indigo-950/40 border-indigo-500 ring-2 ring-indigo-500/30'
                        : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-800/40'
                    }`}
                  >
                    <div>
                      <div className="w-full h-20 rounded-xl bg-slate-950 border border-slate-800 flex flex-col items-center justify-center p-2.5 text-center mb-3 group-hover:border-indigo-500/40 transition-colors">
                        <div className="font-mono text-[10px] text-indigo-400 uppercase font-semibold">
                          {plan.type}
                        </div>
                        <div className="text-sm font-extrabold text-slate-100 mt-0.5">
                          {plan.sqFt?.toLocaleString('en-IN')} SQ FT
                        </div>
                        <div className="text-[10px] text-slate-400">
                          {plan.bedrooms} Bed, {plan.bathrooms} Bath • {plan.rooms.length} Rooms
                        </div>
                      </div>

                      <h3 className="text-xs font-bold text-white group-hover:text-indigo-300 transition-colors line-clamp-1">
                        {plan.name}
                      </h3>
                      <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                        {plan.description}
                      </p>
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-slate-800/60 flex items-center justify-between">
                      <span className="text-xs font-semibold text-emerald-400">
                        {formatLakhs(plan.estimatedCost)} est.
                      </span>
                      <span className="text-xs font-bold text-indigo-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        Launch 3D <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="space-y-4">
              {isProcessing ? (
                <div className="py-16 flex flex-col items-center justify-center gap-4 text-center">
                  <Loader2 className="w-10 h-10 text-indigo-500 animate-spin" />
                  <div>
                    <h3 className="text-base font-bold text-white">
                      AI Spatial Extraction in Progress
                    </h3>
                    <p className="text-xs font-mono text-indigo-400 mt-1 animate-pulse">
                      {processingStep}
                    </p>
                  </div>
                </div>
              ) : (
                <div
                  onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                  onDragLeave={() => setDragActive(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setDragActive(false);
                    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                      handleFileUpload(e.dataTransfer.files[0]);
                    }
                  }}
                  className={`border-2 border-dashed rounded-3xl p-10 flex flex-col items-center justify-center text-center transition-all cursor-pointer ${
                    dragActive
                      ? 'border-indigo-500 bg-indigo-500/10'
                      : 'border-slate-700/80 hover:border-indigo-400 bg-slate-900/30'
                  }`}
                >
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    className="hidden"
                    id="floorplan-file-input"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        handleFileUpload(e.target.files[0]);
                      }
                    }}
                  />
                  <label htmlFor="floorplan-file-input" className="cursor-pointer flex flex-col items-center">
                    <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-3">
                      <UploadCloud className="w-7 h-7 text-indigo-400" />
                    </div>
                    <h3 className="text-sm font-bold text-white">
                      Drop any 2D Blueprint, Sketch, or Floor Plan
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 max-w-sm">
                      Supports JPG, PNG, architectural CAD drawings, or hand sketches.
                    </p>
                    <span className="mt-4 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white shadow-lg shadow-indigo-600/30">
                      Browse File on Mac
                    </span>
                  </label>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
