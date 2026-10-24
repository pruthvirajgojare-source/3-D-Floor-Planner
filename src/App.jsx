import React, { useState } from 'react';
import Header from './components/Header';
import ControlsPanel from './components/ControlsPanel';
import ThreeCanvas from './components/ThreeCanvas';
import FloorPlanUploader from './components/FloorPlanUploader';
import CostEstimatorModal from './components/CostEstimatorModal';
import PitchDeckHelperModal from './components/PitchDeckHelperModal';
import FurnitureCustomizerModal from './components/FurnitureCustomizerModal';
import FurnitureCatalogModal from './components/FurnitureCatalogModal';
import WallArtCustomizerModal from './components/WallArtCustomizerModal';
import BlueprintMiniMap from './components/BlueprintMiniMap';
import { SAMPLE_PLANS } from './data/sampleFloorPlans';

const DEFAULT_WALL_FRAMES = [
  { id: 'frame-1', title: 'Grand Living Art', roomId: 'r1', x: -3.5, y: 1.8, z: -5.5, width: 1.8, height: 1.1, artVariant: 1, frameFinish: 'gold', rot: 0 },
  { id: 'frame-2', title: 'Master Suite Canvas', roomId: 'r2', x: -3.5, y: 1.8, z: 6.2, width: 1.5, height: 1.0, artVariant: 4, frameFinish: 'gold', rot: 180 },
  { id: 'frame-3', title: 'Dining Architectural Print', roomId: 'r1', x: 2.0, y: 1.8, z: -5.5, width: 1.3, height: 0.9, artVariant: 3, frameFinish: 'black', rot: 0 }
];

export default function App() {
  const [currentPlan, setCurrentPlan] = useState(SAMPLE_PLANS[2]); // Default 1,850 sq ft Executive 3-BHK
  const [activeMode, setActiveMode] = useState('orbit'); // 'orbit' or 'walkthrough'
  const [wallHeightCutaway, setWallHeightCutaway] = useState(false);
  const [showCeiling, setShowCeiling] = useState('none'); // 'none', 'glass', 'solid'
  const [lightingMode, setLightingMode] = useState('day'); // 'day', 'sunset', 'night'
  const [doorsOpen, setDoorsOpen] = useState(false);
  const [wallFrames, setWallFrames] = useState(DEFAULT_WALL_FRAMES);

  // Furniture customization state
  const [furnitureTheme, setFurnitureTheme] = useState({
    sofaColor: 0x334155,
    bedColor: 0x0f766e,
    woodColor: 0x85583b
  });
  const [hideFurniture, setHideFurniture] = useState(false);

  // Modals state
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isCostModalOpen, setIsCostModalOpen] = useState(false);
  const [isPitchModalOpen, setIsPitchModalOpen] = useState(false);
  const [isFurnitureModalOpen, setIsFurnitureModalOpen] = useState(false);
  const [isCatalogModalOpen, setIsCatalogModalOpen] = useState(false);
  const [isWallArtModalOpen, setIsWallArtModalOpen] = useState(false);

  // Add furniture to a specific room
  const handleAddFurniture = (roomId, newItem) => {
    setCurrentPlan((prevPlan) => {
      const updatedRooms = prevPlan.rooms.map((room) => {
        if (room.id === roomId) {
          return {
            ...room,
            furniture: [...(room.furniture || []), newItem]
          };
        }
        return room;
      });
      return { ...prevPlan, rooms: updatedRooms };
    });
  };

  // Remove furniture from a specific room
  const handleRemoveFurniture = (roomId, itemIndex) => {
    setCurrentPlan((prevPlan) => {
      const updatedRooms = prevPlan.rooms.map((room) => {
        if (room.id === roomId) {
          const updatedFurniture = (room.furniture || []).filter((_, idx) => idx !== itemIndex);
          return { ...room, furniture: updatedFurniture };
        }
        return room;
      });
      return { ...prevPlan, rooms: updatedRooms };
    });
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-slate-950 text-slate-100 overflow-hidden font-sans">
      {/* Top Application Header */}
      <Header
        onOpenCostEstimator={() => setIsCostModalOpen(true)}
        onOpenPitchGuide={() => setIsPitchModalOpen(true)}
        onOpenCatalog={() => setIsCatalogModalOpen(true)}
        onOpenWallArt={() => setIsWallArtModalOpen(true)}
      />

      {/* Main Workspace: Left Controls Sidebar + Center 3D Viewport */}
      <div className="flex flex-1 relative overflow-hidden">
        <ControlsPanel
          currentPlan={currentPlan}
          setCurrentPlan={setCurrentPlan}
          activeMode={activeMode}
          setActiveMode={setActiveMode}
          wallHeightCutaway={wallHeightCutaway}
          setWallHeightCutaway={setWallHeightCutaway}
          showCeiling={showCeiling}
          setShowCeiling={setShowCeiling}
          lightingMode={lightingMode}
          setLightingMode={setLightingMode}
          onOpenUploadModal={() => setIsUploadModalOpen(true)}
          onOpenFurnitureModal={() => setIsFurnitureModalOpen(true)}
          onOpenCatalogModal={() => setIsCatalogModalOpen(true)}
          onOpenWallArtModal={() => setIsWallArtModalOpen(true)}
          hideFurniture={hideFurniture}
          doorsOpen={doorsOpen}
          setDoorsOpen={setDoorsOpen}
        />

        <main className="flex-1 relative h-full w-full">
          <ThreeCanvas
            currentPlan={currentPlan}
            wallHeightCutaway={wallHeightCutaway}
            showCeiling={showCeiling}
            lightingMode={lightingMode}
            activeMode={activeMode}
            setActiveMode={setActiveMode}
            furnitureTheme={furnitureTheme}
            hideFurniture={hideFurniture}
            doorsOpen={doorsOpen}
            setDoorsOpen={setDoorsOpen}
            wallFrames={wallFrames}
          />

          {/* Bottom Right 2D Blueprint Mini-Map */}
          <div className="absolute bottom-4 right-4 z-20">
            <BlueprintMiniMap currentPlan={currentPlan} />
          </div>
        </main>
      </div>

      {/* Modals */}
      <FloorPlanUploader
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        currentPlan={currentPlan}
        onSelectPlan={(plan) => setCurrentPlan(plan)}
      />

      <CostEstimatorModal
        isOpen={isCostModalOpen}
        onClose={() => setIsCostModalOpen(false)}
        currentPlan={currentPlan}
        targetSqFt={currentPlan.sqFt}
      />

      <PitchDeckHelperModal
        isOpen={isPitchModalOpen}
        onClose={() => setIsPitchModalOpen(false)}
      />

      <FurnitureCustomizerModal
        isOpen={isFurnitureModalOpen}
        onClose={() => setIsFurnitureModalOpen(false)}
        furnitureTheme={furnitureTheme}
        setFurnitureTheme={setFurnitureTheme}
        hideFurniture={hideFurniture}
        setHideFurniture={setHideFurniture}
        currentPlan={currentPlan}
      />

      <FurnitureCatalogModal
        isOpen={isCatalogModalOpen}
        onClose={() => setIsCatalogModalOpen(false)}
        currentPlan={currentPlan}
        onAddFurniture={handleAddFurniture}
        onRemoveFurniture={handleRemoveFurniture}
      />

      <WallArtCustomizerModal
        isOpen={isWallArtModalOpen}
        onClose={() => setIsWallArtModalOpen(false)}
        wallFrames={wallFrames}
        setWallFrames={setWallFrames}
        currentPlan={currentPlan}
      />
    </div>
  );
}
