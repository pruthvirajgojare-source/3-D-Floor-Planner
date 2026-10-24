import React, { useRef, useEffect } from 'react';
import { MapPin, Maximize2 } from 'lucide-react';

export default function BlueprintMiniMap({ currentPlan }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current || !currentPlan) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // Clear background blueprint style
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, width, height);

    // Grid lines
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 1;
    for (let x = 0; x < width; x += 16) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += 16) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Scale calculation
    const centerX = width / 2;
    const centerY = height / 2;
    const scale = 14; // pixels per meter

    // 1. Draw Rooms with faint tinted fills
    currentPlan.rooms.forEach((room) => {
      const rx = centerX + (room.x - room.width / 2) * scale;
      const ry = centerY + (room.z - room.depth / 2) * scale;
      const rw = room.width * scale;
      const rh = room.depth * scale;

      ctx.fillStyle = 'rgba(99, 102, 241, 0.12)';
      ctx.fillRect(rx, ry, rw, rh);

      // Room Name Label
      ctx.fillStyle = '#cbd5e1';
      ctx.font = '8px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(room.name, rx + rw / 2, ry + rh / 2);
    });

    // 2. Draw Walls
    currentPlan.walls.forEach((wall) => {
      const x1 = centerX + wall.start[0] * scale;
      const y1 = centerY + wall.start[1] * scale;
      const x2 = centerX + wall.end[0] * scale;
      const y2 = centerY + wall.end[1] * scale;

      ctx.strokeStyle = wall.isRailing ? '#06b6d4' : '#f8fafc';
      ctx.lineWidth = wall.isRailing ? 1.5 : (wall.thickness || 0.2) * scale;
      ctx.lineCap = 'round';

      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    });
  }, [currentPlan]);

  return (
    <div className="glass-panel p-2.5 rounded-2xl border border-slate-700/80 shadow-2xl flex flex-col gap-1.5 select-none">
      <div className="flex items-center justify-between px-1">
        <span className="text-[10px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1">
          <MapPin className="w-3 h-3 text-indigo-400" />
          2D Blueprint Reference
        </span>
        <span className="text-[9px] font-mono text-indigo-400 font-semibold">
          1:100 SCALE
        </span>
      </div>
      <canvas
        ref={canvasRef}
        width={200}
        height={150}
        className="rounded-xl border border-slate-800 bg-slate-950"
      />
    </div>
  );
}
