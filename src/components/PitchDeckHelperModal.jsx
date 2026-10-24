import React, { useState } from 'react';
import { X, Presentation, Mic, Award, HelpCircle, Layers, CheckCircle2 } from 'lucide-react';

export default function PitchDeckHelperModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState('script');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="glass-panel w-full max-w-3xl rounded-3xl border border-slate-700/80 p-6 shadow-2xl relative flex flex-col max-h-[92vh] overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
              <Presentation className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                Hackathon Presentation & Pitch Playbook
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  WINNER PLAYBOOK
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Your 2-minute speaking script, slide structure, and judge Q&A cheat sheet (Prices in INR ₹).
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

        {/* Tab Selector */}
        <div className="flex items-center gap-2 pt-4">
          {[
            { id: 'script', label: '🎙️ 2-Min Pitch Script', icon: Mic },
            { id: 'eli5', label: '💡 Tech in Simple Words (ELI5)', icon: Award },
            { id: 'qa', label: '🎯 Judge Q&A Cheat Sheet', icon: HelpCircle },
            { id: 'slides', label: '📑 5-Slide Pitch Outline', icon: Layers },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-3.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === tab.id
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Contents */}
        <div className="flex-1 overflow-y-auto py-4 space-y-4 text-slate-200 text-xs leading-relaxed">
          {activeTab === 'script' && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-2xl bg-indigo-950/40 border border-indigo-500/30">
                <span className="font-bold text-indigo-300">⏱️ Total Time: 2 Minutes. Practice reading this aloud 2 times before presenting!</span>
              </div>

              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                  <div className="font-bold text-indigo-400 mb-1">0:00 - 0:30 | The Hook & Problem</div>
                  <p className="italic text-slate-300">
                    "Judges, imagine buying a home in Bangalore, Mumbai, or Delhi. The builder hands you a flat 2D blueprint. Can you picture how sunlight will look in the living room or if your king-size bed fits? <strong>Most people can't.</strong> And hiring an 3D visualizer takes days and costs ₹25,000 to ₹50,000 per project."
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                  <div className="font-bold text-emerald-400 mb-1">0:30 - 1:15 | The Live Demo (Show, don't just tell!)</div>
                  <p className="italic text-slate-300">
                    "That is why we built <strong>PlanToSpace 3D</strong>. With one click, our spatial engine takes a 2D floor plan and turns it into an architectural 3D walkthrough right in the browser.*
                    <br /><br />
                    <em>(Action: Rotate around the 1,850 sq ft Executive Home, switch to 'Dollhouse Cutaway' view!)</em>
                    <br /><br />
                    "Notice the architectural realism: Chevron wood parquet floors, baseboards, window mullions with linen curtains, and glowing bedside lamps. We can switch between 5 authentic Indian home designs from a 650 sq ft studio to a 3,000 sq ft royal villa. And in one click, we step inside using first-person walkthrough mode!"
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                  <div className="font-bold text-amber-400 mb-1">1:15 - 1:45 | Who It Helps & Indian Market Value</div>
                  <p className="italic text-slate-300">
                    "This directly empowers three sectors:
                    <br />1. <strong>Home Buyers:</strong> Make confident property purchases faster.
                    <br />2. <strong>Architecture Students:</strong> Rapidly visualize 2D drafting projects.
                    <br />3. <strong>Builders & Contractors:</strong> Get live material breakdowns and turnkey cost estimates in Indian Rupees (₹)—from civil structure to furnishing packages in Lakhs and Crores."
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                  <div className="font-bold text-purple-400 mb-1">1:45 - 2:00 | The Strong Close</div>
                  <p className="italic text-slate-300">
                    "PlanToSpace brings blueprints to life in seconds. Thank you, and we look forward to your questions!"
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'eli5' && (
            <div className="space-y-3">
              <div className="p-3.5 rounded-2xl bg-indigo-950/40 border border-indigo-500/30">
                <span className="font-bold text-indigo-300">How to explain your code to a non-technical judge:</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                <div className="font-bold text-indigo-400">1. What is Three.js?</div>
                <p className="text-slate-300">
                  "Three.js is a lightweight JavaScript library that talks directly to your computer's graphics card (GPU) through WebGL. It renders 3D objects, lights, shadows, and textures directly in any web browser without plugins or downloads."
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                <div className="font-bold text-emerald-400">2. How does 2D turn into 3D?</div>
                <p className="text-slate-300">
                  "Think of cookie dough: 2D is a flat stencil on a table. In computer graphics, we 'extrude' the lines upwards by a height (3.0 meters) to turn lines into 3D walls, map textures (hardwood, Italian marble), and place 3D furniture matching the room label."
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                <div className="font-bold text-amber-400">3. How are wall openings (doors & windows) created?</div>
                <p className="text-slate-300">
                  "Instead of one solid block, our algorithm splits each wall with an opening into segments: a wall segment before the door, a top lintel beam above the door frame, and an opening with an angled wooden door and brass handle."
                </p>
              </div>
            </div>
          )}

          {activeTab === 'qa' && (
            <div className="space-y-3">
              <div className="p-3.5 rounded-2xl bg-indigo-950/40 border border-indigo-500/30">
                <span className="font-bold text-indigo-300">Top 3 questions judges will ask, and your winning answers:</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                <div className="font-bold text-indigo-400">Q: "Why WebGL instead of Unreal Engine or Unity?"</div>
                <p className="text-slate-300">
                  <strong>A:</strong> "Zero friction. Home buyers and students won't download a 5GB installer. With WebGL and Three.js, it opens in under 1 second on any phone, tablet, or laptop through a simple link."
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                <div className="font-bold text-emerald-400">Q: "How will you monetize this as a business in India?"</div>
                <p className="text-slate-300">
                  <strong>A:</strong> "Freemium SaaS: Free tier for students with standard presets; Pro tier for real estate brokers and interior designers for ₹2,499/month with custom branding, CAD/GLTF exports, and instant BOM estimations."
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                <div className="font-bold text-amber-400">Q: "How accurate are your construction cost estimates?"</div>
                <p className="text-slate-300">
                  <strong>A:</strong> "Our pricing models are benchmarked against current Indian CPWD and market rates: ₹1,850 to ₹2,800/sq ft for civil framing, finishing, electrical points, and itemized interior furniture packages."
                </p>
              </div>
            </div>
          )}

          {activeTab === 'slides' && (
            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <div className="font-bold text-indigo-400">Slide 1: Title & Tagline</div>
                <p className="text-slate-300">PlanToSpace 3D: Transforming flat 2D floor plans into interactive 3D spaces in seconds.</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <div className="font-bold text-indigo-400">Slide 2: The Core Problem</div>
                <p className="text-slate-300">Flat blueprints are confusing for buyers; manual 3D modeling takes days and costs ₹25k+.</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <div className="font-bold text-indigo-400">Slide 3: Our Solution</div>
                <p className="text-slate-300">AI Spatial Extraction + Instant WebGL 3D Walkthrough + Live INR (₹) Cost Estimator.</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <div className="font-bold text-indigo-400">Slide 4: Live Demo (Screen Share)</div>
                <p className="text-slate-300">Switch Designs (650 to 3,000 sq ft) $\rightarrow$ Orbit $\rightarrow$ Dollhouse Cutaway $\rightarrow$ Walk Inside.</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <div className="font-bold text-indigo-400">Slide 5: Market Opportunity</div>
                <p className="text-slate-300">Indian real estate & interior design market: developers, brokers, students, and home buyers.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
