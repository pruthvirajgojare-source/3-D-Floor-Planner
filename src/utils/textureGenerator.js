import * as THREE from 'three';

const textureCache = new Map();

/**
 * Creates luxury Herringbone / Chevron Hardwood Floor texture
 */
export function createWoodTexture() {
  if (textureCache.has('wood_luxury')) return textureCache.get('wood_luxury');

  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#9c7352';
  ctx.fillRect(0, 0, 1024, 1024);

  const plankW = 64;
  const plankH = 256;
  const cols = 1024 / plankW;
  const rows = (1024 / plankH) * 2;

  for (let c = 0; c < cols; c++) {
    for (let r = 0; r < rows; r++) {
      const x = c * plankW;
      const y = r * (plankH / 2);

      const woodTones = ['#a07855', '#966d4a', '#a67e5b', '#8c6340', '#af8764', '#916744'];
      ctx.fillStyle = woodTones[(c * 3 + r * 7) % woodTones.length];
      ctx.fillRect(x, y, plankW - 2, plankH / 2 - 2);

      ctx.strokeStyle = 'rgba(74, 48, 28, 0.18)';
      ctx.lineWidth = 1;
      for (let g = 0; g < 4; g++) {
        ctx.beginPath();
        const gy = y + Math.random() * (plankH / 2);
        ctx.moveTo(x, gy);
        ctx.lineTo(x + plankW, gy + (Math.random() - 0.5) * 6);
        ctx.stroke();
      }

      ctx.strokeStyle = 'rgba(40, 24, 12, 0.4)';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(x, y, plankW - 1, plankH / 2 - 1);
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(3, 3);
  textureCache.set('wood_luxury', texture);
  return texture;
}

/**
 * Creates luxury Italian Calacatta Gold Marble with rich veining
 */
export function createMarbleTexture() {
  if (textureCache.has('marble_luxury')) return textureCache.get('marble_luxury');

  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#fcfbf9';
  ctx.fillRect(0, 0, 1024, 1024);

  for (let i = 0; i < 20; i++) {
    const rx = Math.random() * 1024;
    const ry = Math.random() * 1024;
    const rad = Math.random() * 200 + 100;
    const grad = ctx.createRadialGradient(rx, ry, 0, rx, ry, rad);
    grad.addColorStop(0, 'rgba(235, 230, 222, 0.4)');
    grad.addColorStop(1, 'rgba(252, 251, 249, 0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(rx, ry, rad, 0, Math.PI * 2);
    ctx.fill();
  }

  const veinColors = [
    'rgba(140, 145, 155, 0.35)',
    'rgba(160, 165, 175, 0.25)',
    'rgba(180, 140, 90, 0.3)',
    'rgba(100, 105, 115, 0.4)'
  ];

  veinColors.forEach((color, idx) => {
    ctx.strokeStyle = color;
    ctx.lineWidth = idx === 3 ? 3 : 1.5;
    ctx.beginPath();
    let cx = Math.random() * 1024;
    let cy = 0;
    ctx.moveTo(cx, cy);

    while (cy < 1024) {
      cx += (Math.random() - 0.48) * 80;
      cy += Math.random() * 60 + 20;
      ctx.lineTo(cx, cy);

      if (Math.random() > 0.6) {
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + (Math.random() - 0.5) * 50, cy + Math.random() * 30);
        ctx.moveTo(cx, cy);
      }
    }
    ctx.stroke();
  });

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(1.5, 1.5);
  textureCache.set('marble_luxury', texture);
  return texture;
}

/**
 * Creates modern large-format porcelain bathroom tiles
 */
export function createTileTexture() {
  if (textureCache.has('tile_luxury')) return textureCache.get('tile_luxury');

  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#64748b';
  ctx.fillRect(0, 0, 512, 512);

  const tileSize = 252;
  const gap = 4;

  for (let x = 0; x < 2; x++) {
    for (let y = 0; y < 2; y++) {
      const px = gap + x * (tileSize + gap);
      const py = gap + y * (tileSize + gap);

      ctx.fillStyle = '#e2e8f0';
      ctx.fillRect(px, py, tileSize, tileSize);

      const grad = ctx.createLinearGradient(px, py, px + tileSize, py + tileSize);
      grad.addColorStop(0, 'rgba(255, 255, 255, 0.45)');
      grad.addColorStop(0.5, 'rgba(241, 245, 249, 0.1)');
      grad.addColorStop(1, 'rgba(203, 213, 225, 0.3)');
      ctx.fillStyle = grad;
      ctx.fillRect(px, py, tileSize, tileSize);

      ctx.strokeStyle = 'rgba(255,255,255,0.7)';
      ctx.lineWidth = 1;
      ctx.strokeRect(px + 1, py + 1, tileSize - 2, tileSize - 2);
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(3, 3);
  textureCache.set('tile_luxury', texture);
  return texture;
}

/**
 * Creates stylized modern gallery wall art textures
 */
export function createArtCanvasTexture(variant = 1) {
  const key = `art_canvas_${variant}`;
  if (textureCache.has(key)) return textureCache.get(key);

  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  if (variant === 1) {
    // Abstract Minimalist Geometric Art (Indigo & Brass)
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, 512, 512);

    ctx.fillStyle = '#6366f1';
    ctx.beginPath();
    ctx.arc(256, 256, 160, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#d97706';
    ctx.beginPath();
    ctx.arc(330, 200, 90, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = '#f8fafc';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(100, 360);
    ctx.lineTo(412, 360);
    ctx.stroke();
  } else if (variant === 2) {
    // Serene Japandi Earthy Landscape
    ctx.fillStyle = '#f5f5f0';
    ctx.fillRect(0, 0, 512, 512);

    ctx.fillStyle = '#ccd5ae';
    ctx.beginPath();
    ctx.arc(256, 380, 200, Math.PI, 0);
    ctx.fill();

    ctx.fillStyle = '#d4a373';
    ctx.beginPath();
    ctx.arc(256, 200, 70, 0, Math.PI * 2);
    ctx.fill();
  } else if (variant === 3) {
    // Bauhaus Colorblock
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(0, 0, 512, 512);

    ctx.fillStyle = '#f43f5e';
    ctx.fillRect(100, 100, 180, 300);

    ctx.fillStyle = '#38bdf8';
    ctx.beginPath();
    ctx.arc(340, 220, 90, 0, Math.PI * 2);
    ctx.fill();
  } else if (variant === 4) {
    // Luxury Gold & Emerald Fluid Art
    ctx.fillStyle = '#064e3b';
    ctx.fillRect(0, 0, 512, 512);

    ctx.fillStyle = '#d4af37';
    ctx.beginPath();
    ctx.ellipse(256, 256, 180, 100, Math.PI / 4, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#10b981';
    ctx.beginPath();
    ctx.ellipse(280, 280, 120, 60, Math.PI / 4, 0, Math.PI * 2);
    ctx.fill();
  } else {
    // Monochrome Minimalist Curves
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(0, 0, 512, 512);

    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 14;
    ctx.beginPath();
    ctx.arc(256, 256, 140, 0, Math.PI * 1.5);
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  textureCache.set(key, texture);
  return texture;
}

/**
 * Creates modern woven area rug texture
 */
export function createRugTexture() {
  if (textureCache.has('rug_woven')) return textureCache.get('rug_woven');

  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#1e293b';
  ctx.fillRect(0, 0, 512, 512);

  ctx.strokeStyle = '#6366f1';
  ctx.lineWidth = 8;
  ctx.strokeRect(24, 24, 464, 464);

  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(256, 80);
  ctx.lineTo(432, 256);
  ctx.lineTo(256, 432);
  ctx.lineTo(80, 256);
  ctx.closePath();
  ctx.stroke();

  const texture = new THREE.CanvasTexture(canvas);
  textureCache.set('rug_woven', texture);
  return texture;
}
