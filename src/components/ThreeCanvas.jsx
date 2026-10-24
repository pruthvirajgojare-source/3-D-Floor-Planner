import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { buildFloorPlan3D } from '../utils/floorPlanTo3D';
import {
  RotateCw,
  Camera,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Compass,
  DoorOpen,
  DoorClosed
} from 'lucide-react';

export default function ThreeCanvas({
  currentPlan,
  wallHeightCutaway,
  lightingMode,
  showCeiling,
  activeMode,
  setActiveMode,
  furnitureTheme = {},
  hideFurniture = false,
  doorsOpen = false,
  setDoorsOpen,
  wallFrames = []
}) {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const controlsRef = useRef(null);
  const modelGroupRef = useRef(null);
  const animFrameIdRef = useRef(null);

  const dirLightRef = useRef(null);
  const hemiLightRef = useRef(null);
  const ambientBounceLightRef = useRef(null);

  const [turntableActive, setTurntableActive] = useState(false);

  // References for render loop to prevent full WebGL context rebuilds
  const doorsOpenRef = useRef(doorsOpen);
  const activeModeRef = useRef(activeMode);
  const turntableActiveRef = useRef(turntableActive);

  useEffect(() => {
    doorsOpenRef.current = doorsOpen;
  }, [doorsOpen]);

  useEffect(() => {
    activeModeRef.current = activeMode;
  }, [activeMode]);

  useEffect(() => {
    turntableActiveRef.current = turntableActive;
  }, [turntableActive]);

  // First-Person Walkthrough State
  const fpStateRef = useRef({
    yaw: 0,
    pitch: 0,
    isDragging: false,
    prevPointerX: 0,
    prevPointerY: 0,
    moveForward: false,
    moveBackward: false,
    moveLeft: false,
    moveRight: false,
    turnLeft: false,
    turnRight: false,
    speedBoost: false,
  });

  // 1. Initialize Three.js Scene
  useEffect(() => {
    if (!containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x94a3b8);
    scene.fog = new THREE.FogExp2(0x94a3b8, 0.012);

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 150);
    camera.position.set(0, 12, 16);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.maxPolarAngle = Math.PI / 2 - 0.02;
    controls.minDistance = 2;
    controls.maxDistance = 55;
    controls.target.set(0, 0, 0);
    controlsRef.current = controls;

    const hemiLight = new THREE.HemisphereLight(0xe0f2fe, 0x334155, 0.9);
    hemiLight.position.set(0, 30, 0);
    scene.add(hemiLight);
    hemiLightRef.current = hemiLight;

    const dirLight = new THREE.DirectionalLight(0xfffaed, 1.9);
    dirLight.position.set(16, 24, 14);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;
    dirLight.shadow.camera.near = 0.5;
    dirLight.shadow.camera.far = 65;
    dirLight.shadow.camera.left = -22;
    dirLight.shadow.camera.right = 22;
    dirLight.shadow.camera.top = 22;
    dirLight.shadow.camera.bottom = -22;
    dirLight.shadow.bias = -0.0003;
    scene.add(dirLight);
    dirLightRef.current = dirLight;

    const ambientBounce = new THREE.AmbientLight(0xfff7ed, 0.45);
    scene.add(ambientBounce);
    ambientBounceLightRef.current = ambientBounce;

    // Keyboard Handlers
    const handleKeyDown = (e) => {
      const key = e.key.toLowerCase();
      const fp = fpStateRef.current;
      if (key === 'w' || key === 'arrowup') fp.moveForward = true;
      if (key === 's' || key === 'arrowdown') fp.moveBackward = true;
      if (key === 'a') fp.moveLeft = true;
      if (key === 'd') fp.moveRight = true;
      if (key === 'q' || key === 'arrowleft') fp.turnLeft = true;
      if (key === 'e' || key === 'arrowright') fp.turnRight = true;
      if (e.shiftKey) fp.speedBoost = true;
    };

    const handleKeyUp = (e) => {
      const key = e.key.toLowerCase();
      const fp = fpStateRef.current;
      if (key === 'w' || key === 'arrowup') fp.moveForward = false;
      if (key === 's' || key === 'arrowdown') fp.moveBackward = false;
      if (key === 'a') fp.moveLeft = false;
      if (key === 'd') fp.moveRight = false;
      if (key === 'q' || key === 'arrowleft') fp.turnLeft = false;
      if (key === 'e' || key === 'arrowright') fp.turnRight = false;
      if (!e.shiftKey) fp.speedBoost = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    // Pointer Click & Drag Look
    const dom = renderer.domElement;
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handlePointerDown = (e) => {
      fpStateRef.current.isDragging = true;
      fpStateRef.current.prevPointerX = e.clientX;
      fpStateRef.current.prevPointerY = e.clientY;
    };

    const handlePointerMove = (e) => {
      if (!fpStateRef.current.isDragging) return;
      if (activeModeRef.current === 'walkthrough') {
        const dx = e.clientX - fpStateRef.current.prevPointerX;
        const dy = e.clientY - fpStateRef.current.prevPointerY;
        fpStateRef.current.prevPointerX = e.clientX;
        fpStateRef.current.prevPointerY = e.clientY;

        fpStateRef.current.yaw -= dx * 0.0035;
        fpStateRef.current.pitch = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, fpStateRef.current.pitch - dy * 0.0035));
      }
    };

    const handlePointerUp = (e) => {
      fpStateRef.current.isDragging = false;

      // Raycast to check if user clicked directly on a door
      if (containerRef.current && cameraRef.current && modelGroupRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

        raycaster.setFromCamera(mouse, cameraRef.current);
        const intersects = raycaster.intersectObjects(modelGroupRef.current.children, true);
        for (let hit of intersects) {
          if (hit.object.userData && hit.object.userData.isDoor) {
            if (setDoorsOpen) {
              setDoorsOpen(prev => !prev);
            }
            break;
          }
        }
      }
    };

    dom.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);

    const handleResize = () => {
      if (!containerRef.current || !rendererRef.current || !cameraRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    const clock = new THREE.Clock();
    const animate = () => {
      animFrameIdRef.current = requestAnimationFrame(animate);
      const delta = Math.min(clock.getDelta(), 0.1);

      // Smooth Door Hinge Swings (lerp to targetRot without rebuilding scene)
      if (modelGroupRef.current && modelGroupRef.current.userData.doorPivots) {
        const targetRot = doorsOpenRef.current ? Math.PI / 2 : 0;
        modelGroupRef.current.userData.doorPivots.forEach(pivot => {
          pivot.rotation.y = THREE.MathUtils.lerp(pivot.rotation.y, targetRot, 0.12);
        });
      }

      if (activeModeRef.current === 'walkthrough') {
        const fp = fpStateRef.current;

        if (fp.turnLeft) fp.yaw += 1.8 * delta;
        if (fp.turnRight) fp.yaw -= 1.8 * delta;

        const euler = new THREE.Euler(fp.pitch, fp.yaw, 0, 'YXZ');
        camera.quaternion.setFromEuler(euler);

        const speed = (fp.speedBoost ? 7.2 : 4.2) * delta;
        const moveVector = new THREE.Vector3();

        if (fp.moveForward) moveVector.z -= 1;
        if (fp.moveBackward) moveVector.z += 1;
        if (fp.moveLeft) moveVector.x -= 1;
        if (fp.moveRight) moveVector.x += 1;

        if (moveVector.lengthSq() > 0) {
          moveVector.normalize();
          moveVector.applyEuler(new THREE.Euler(0, fp.yaw, 0, 'YXZ'));
          camera.position.addScaledVector(moveVector, speed);
        }

        camera.position.y = 1.65;
      } else {
        if (turntableActiveRef.current && modelGroupRef.current) {
          modelGroupRef.current.rotation.y += 0.006;
        }
        controls.update();
      }

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animFrameIdRef.current);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      dom.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      if (renderer.domElement && containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // 2. Rebuild 3D Model with Camera Auto-Centering
  useEffect(() => {
    if (!sceneRef.current || !currentPlan) return;

    if (modelGroupRef.current) {
      sceneRef.current.remove(modelGroupRef.current);
      modelGroupRef.current.traverse((child) => {
        if (child.isMesh) {
          child.geometry.dispose();
        }
      });
    }

    const wallMultiplier = wallHeightCutaway ? 0.38 : 1.0;
    const modelGroup = buildFloorPlan3D(currentPlan, {
      showCeiling: wallHeightCutaway ? 'none' : showCeiling,
      wallHeightMultiplier: wallMultiplier,
      furnitureTheme,
      hideFurniture,
      doorsOpen,
      wallFrames
    });

    sceneRef.current.add(modelGroup);
    modelGroupRef.current = modelGroup;

    if (controlsRef.current && cameraRef.current && activeMode !== 'walkthrough') {
      const box = new THREE.Box3().setFromObject(modelGroup);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.z);

      controlsRef.current.target.set(center.x, 0, center.z);
      cameraRef.current.position.set(
        center.x,
        Math.max(10, maxDim * 0.75 + 2),
        center.z + Math.max(12, maxDim * 0.85 + 2)
      );
      controlsRef.current.update();
    }
  }, [currentPlan, wallHeightCutaway, showCeiling, furnitureTheme, hideFurniture, wallFrames]);

  // 3. Switch Mode (Orbit vs Walkthrough)
  useEffect(() => {
    if (!cameraRef.current || !controlsRef.current || !currentPlan) return;

    if (activeMode === 'walkthrough') {
      controlsRef.current.enabled = false;
      const livingRoom = currentPlan.rooms.find(r => r.type === 'living') || currentPlan.rooms[0];
      const startX = livingRoom ? livingRoom.x : 0;
      const startZ = livingRoom ? livingRoom.z : 0;

      cameraRef.current.position.set(startX, 1.65, startZ);
      cameraRef.current.lookAt(0, 1.65, 0);
      fpStateRef.current.yaw = 0;
      fpStateRef.current.pitch = 0;
    } else {
      controlsRef.current.enabled = true;
      if (modelGroupRef.current) {
        const box = new THREE.Box3().setFromObject(modelGroupRef.current);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.z);

        controlsRef.current.target.set(center.x, 0, center.z);
        cameraRef.current.position.set(
          center.x,
          Math.max(10, maxDim * 0.75 + 2),
          center.z + Math.max(12, maxDim * 0.85 + 2)
        );
        controlsRef.current.update();
      }
    }
  }, [activeMode]);

  // 4. Update Lighting Atmosphere
  useEffect(() => {
    if (!dirLightRef.current || !hemiLightRef.current || !sceneRef.current || !ambientBounceLightRef.current) return;

    if (lightingMode === 'day') {
      sceneRef.current.background = new THREE.Color(0x94a3b8);
      sceneRef.current.fog = new THREE.FogExp2(0x94a3b8, 0.012);
      dirLightRef.current.color.setHex(0xfffaed);
      dirLightRef.current.intensity = 1.9;
      hemiLightRef.current.color.setHex(0xe0f2fe);
      hemiLightRef.current.groundColor.setHex(0x334155);
      hemiLightRef.current.intensity = 0.9;
      ambientBounceLightRef.current.intensity = 0.45;
    } else if (lightingMode === 'sunset') {
      sceneRef.current.background = new THREE.Color(0x2d1b2e);
      sceneRef.current.fog = new THREE.FogExp2(0x2d1b2e, 0.015);
      dirLightRef.current.color.setHex(0xff9e64);
      dirLightRef.current.intensity = 2.1;
      hemiLightRef.current.color.setHex(0xfda4af);
      hemiLightRef.current.groundColor.setHex(0x1e1b4b);
      hemiLightRef.current.intensity = 0.6;
      ambientBounceLightRef.current.intensity = 0.35;
    } else if (lightingMode === 'night') {
      sceneRef.current.background = new THREE.Color(0x030712);
      sceneRef.current.fog = new THREE.FogExp2(0x030712, 0.022);
      dirLightRef.current.color.setHex(0x38bdf8);
      dirLightRef.current.intensity = 0.45;
      hemiLightRef.current.color.setHex(0x1e293b);
      hemiLightRef.current.groundColor.setHex(0x020617);
      hemiLightRef.current.intensity = 0.35;
      ambientBounceLightRef.current.intensity = 0.2;
    }
  }, [lightingMode]);

  const handleTakeSnapshot = () => {
    if (!rendererRef.current) return;
    const dataUrl = rendererRef.current.domElement.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = `${currentPlan.name.replace(/\s+/g, '_')}_render.png`;
    a.click();
  };

  const setNavKey = (key, val) => {
    if (fpStateRef.current) {
      fpStateRef.current[key] = val;
    }
  };

  return (
    <div className="relative w-full h-full select-none overflow-hidden bg-slate-950">
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Top Floating Viewport HUD */}
      <div className="absolute top-4 left-4 z-20 flex flex-wrap items-center gap-2">
        <div className="glass-panel px-3.5 py-1.5 rounded-full flex items-center gap-2 shadow-lg">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
          <span className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
            {activeMode === 'walkthrough' ? '🚶 First-Person Walk' : '🪐 Orbit 3D'}
          </span>
        </div>

        {/* INTERACTIVE DOOR OPEN / CLOSE BUTTON */}
        <button
          onClick={() => setDoorsOpen(prev => !prev)}
          className={`glass-panel px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-lg transition-all ${
            doorsOpen
              ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 ring-1 ring-amber-500/30'
              : 'bg-indigo-600/30 text-indigo-200 border-indigo-500/40 hover:bg-indigo-600/50'
          }`}
          title="Click to swing all doors open or closed (or click any door in 3D!)"
        >
          {doorsOpen ? <DoorOpen className="w-3.5 h-3.5 text-amber-400" /> : <DoorClosed className="w-3.5 h-3.5 text-indigo-400" />}
          <span>{doorsOpen ? 'Doors: Open (Click to Close)' : 'Doors: Closed (Click to Open)'}</span>
        </button>

        <div className="glass-panel px-3.5 py-1.5 rounded-full text-xs font-bold text-indigo-300 border border-indigo-500/30">
          📐 {currentPlan.sqFt?.toLocaleString('en-IN') || 1850} SQ FT
        </div>

        {wallHeightCutaway && (
          <div className="glass-panel px-3 py-1.5 rounded-full text-xs font-medium text-amber-400">
            ✂️ Dollhouse Cutaway
          </div>
        )}

        {showCeiling !== 'none' && !wallHeightCutaway && (
          <div className="glass-panel px-3 py-1.5 rounded-full text-xs font-medium text-sky-400">
            🏠 Ceiling: {showCeiling === 'glass' ? 'Glass Skylight' : 'Solid Plaster'}
          </div>
        )}

        {hideFurniture && (
          <div className="glass-panel px-3 py-1.5 rounded-full text-xs font-medium text-rose-400">
            📦 Bare Shell (Unfurnished)
          </div>
        )}
      </div>

      {/* Top Right Quick Actions */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
        <button
          onClick={() => setTurntableActive(!turntableActive)}
          title="Auto-rotate model 360°"
          className={`glass-panel px-3 py-2 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-all ${
            turntableActive ? 'bg-indigo-600/40 border-indigo-400 text-indigo-200' : 'text-slate-300 hover:text-white'
          }`}
        >
          <RotateCw className={`w-3.5 h-3.5 ${turntableActive ? 'animate-spin' : ''}`} />
          Turntable
        </button>

        <button
          onClick={handleTakeSnapshot}
          title="Download snapshot of 3D view"
          className="glass-panel px-3 py-2 rounded-xl text-xs font-medium text-slate-300 hover:text-white flex items-center gap-1.5 hover:bg-slate-800/80 transition-all"
        >
          <Camera className="w-3.5 h-3.5 text-indigo-400" />
          Snapshot
        </button>
      </div>

      {/* Walkthrough Controls */}
      {activeMode === 'walkthrough' && (
        <div className="absolute bottom-6 left-6 z-20 glass-panel p-3 rounded-2xl flex flex-col items-center gap-2 border border-indigo-500/40 shadow-2xl backdrop-blur-xl">
          <div className="text-[10px] font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-1">
            <Compass className="w-3 h-3 text-indigo-400" />
            Walk & Look Controls
          </div>

          <div className="grid grid-cols-3 gap-1.5">
            <button
              onMouseDown={() => setNavKey('turnLeft', true)}
              onMouseUp={() => setNavKey('turnLeft', false)}
              onTouchStart={() => setNavKey('turnLeft', true)}
              onTouchEnd={() => setNavKey('turnLeft', false)}
              className="w-9 h-9 rounded-xl bg-slate-800/90 hover:bg-indigo-600 active:bg-indigo-500 text-slate-200 flex items-center justify-center transition-all border border-slate-700 shadow-sm"
              title="Turn Left (Q)"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onMouseDown={() => setNavKey('moveForward', true)}
              onMouseUp={() => setNavKey('moveForward', false)}
              onTouchStart={() => setNavKey('moveForward', true)}
              onTouchEnd={() => setNavKey('moveForward', false)}
              className="w-9 h-9 rounded-xl bg-slate-800/90 hover:bg-indigo-600 active:bg-indigo-500 text-slate-200 flex items-center justify-center transition-all border border-slate-700 shadow-sm"
              title="Move Forward (W)"
            >
              <ChevronUp className="w-5 h-5" />
            </button>

            <button
              onMouseDown={() => setNavKey('turnRight', true)}
              onMouseUp={() => setNavKey('turnRight', false)}
              onTouchStart={() => setNavKey('turnRight', true)}
              onTouchEnd={() => setNavKey('turnRight', false)}
              className="w-9 h-9 rounded-xl bg-slate-800/90 hover:bg-indigo-600 active:bg-indigo-500 text-slate-200 flex items-center justify-center transition-all border border-slate-700 shadow-sm"
              title="Turn Right (E)"
            >
              <RotateCw className="w-4 h-4" />
            </button>

            <button
              onMouseDown={() => setNavKey('moveLeft', true)}
              onMouseUp={() => setNavKey('moveLeft', false)}
              onTouchStart={() => setNavKey('moveLeft', true)}
              onTouchEnd={() => setNavKey('moveLeft', false)}
              className="w-9 h-9 rounded-xl bg-slate-800/90 hover:bg-indigo-600 active:bg-indigo-500 text-slate-200 flex items-center justify-center transition-all border border-slate-700 shadow-sm"
              title="Strafe Left (A)"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onMouseDown={() => setNavKey('moveBackward', true)}
              onMouseUp={() => setNavKey('moveBackward', false)}
              onTouchStart={() => setNavKey('moveBackward', true)}
              onTouchEnd={() => setNavKey('moveBackward', false)}
              className="w-9 h-9 rounded-xl bg-slate-800/90 hover:bg-indigo-600 active:bg-indigo-500 text-slate-200 flex items-center justify-center transition-all border border-slate-700 shadow-sm"
              title="Move Backward (S)"
            >
              <ChevronDown className="w-5 h-5" />
            </button>

            <button
              onMouseDown={() => setNavKey('moveRight', true)}
              onMouseUp={() => setNavKey('moveRight', false)}
              onTouchStart={() => setNavKey('moveRight', true)}
              onTouchEnd={() => setNavKey('moveRight', false)}
              className="w-9 h-9 rounded-xl bg-slate-800/90 hover:bg-indigo-600 active:bg-indigo-500 text-slate-200 flex items-center justify-center transition-all border border-slate-700 shadow-sm"
              title="Strafe Right (D)"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="text-[9px] text-slate-400 text-center mt-1">
            Drag mouse to look around • WASD to move • Click doors to open/close
          </div>
        </div>
      )}
    </div>
  );
}
