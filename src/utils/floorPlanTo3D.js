import * as THREE from 'three';
import { createWoodTexture, createTileTexture, createMarbleTexture, createArtCanvasTexture } from './textureGenerator';
import { buildFurniture } from './furnitureModels';

// Architectural PBR Materials
const wallPlasterMat = new THREE.MeshStandardMaterial({
  color: 0xf4f6f8,
  roughness: 0.82,
  metalness: 0.02
});

const baseboardTrimMat = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  roughness: 0.35,
  metalness: 0.1
});

const windowFrameMat = new THREE.MeshStandardMaterial({
  color: 0x1e293b,
  roughness: 0.4,
  metalness: 0.6
});

const curtainFabricMat = new THREE.MeshStandardMaterial({
  color: 0xf1f5f9,
  roughness: 0.92,
  side: THREE.DoubleSide
});

const glassWindowMat = new THREE.MeshPhysicalMaterial({
  color: 0xffffff,
  transparent: true,
  opacity: 0.3,
  roughness: 0.05,
  transmission: 0.95,
  ior: 1.52
});

const doorWoodMat = new THREE.MeshStandardMaterial({
  color: 0x85583b,
  roughness: 0.55
});

const doorHandleMat = new THREE.MeshStandardMaterial({
  color: 0xd4af37,
  metalness: 0.9,
  roughness: 0.2
});

const ceilingPlasterMat = new THREE.MeshStandardMaterial({
  color: 0xfafafa,
  roughness: 0.9,
  side: THREE.DoubleSide
});

const glassCeilingMat = new THREE.MeshPhysicalMaterial({
  color: 0x93c5fd,
  transparent: true,
  opacity: 0.25,
  roughness: 0.08,
  transmission: 0.92,
  side: THREE.DoubleSide
});

const railingMat = new THREE.MeshStandardMaterial({
  color: 0x1e293b,
  metalness: 0.8,
  roughness: 0.25
});

const ceilingPotLightMat = new THREE.MeshBasicMaterial({
  color: 0xffedd5
});

const grassMat = new THREE.MeshStandardMaterial({
  color: 0x416544,
  roughness: 0.95
});

const stonePatioMat = new THREE.MeshStandardMaterial({
  color: 0x64748b,
  roughness: 0.8
});

// Frame finish materials dictionary
const frameMaterials = {
  gold: new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.85, roughness: 0.25 }),
  black: new THREE.MeshStandardMaterial({ color: 0x18181b, metalness: 0.6, roughness: 0.4 }),
  wood: new THREE.MeshStandardMaterial({ color: 0xb08968, roughness: 0.6 }),
  white: new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.3 })
};

/**
 * Builds the realistic 3D architectural hierarchy with interactive doors & movable wall art
 */
export function buildFloorPlan3D(
  plan,
  options = {
    showCeiling: 'none',
    wallHeightMultiplier: 1.0,
    furnitureTheme: {},
    hideFurniture: false,
    doorsOpen: false,
    wallFrames: []
  }
) {
  const rootGroup = new THREE.Group();
  rootGroup.name = "FloorPlanRoot";
  rootGroup.userData.doorPivots = [];

  const ceilingH = (plan.ceilingHeight || 3.0) * options.wallHeightMultiplier;

  // 0. Outdoor Landscaping (Lawn & Paved Patio Pathway)
  const landscapingGroup = new THREE.Group();
  landscapingGroup.name = "Landscaping";

  let minX = -10, maxX = 10, minZ = -10, maxZ = 10;
  if (plan.walls && plan.walls.length > 0) {
    minX = Math.min(...plan.walls.map(w => Math.min(w.start[0], w.end[0]))) - 5;
    maxX = Math.max(...plan.walls.map(w => Math.max(w.start[0], w.end[0]))) + 5;
    minZ = Math.min(...plan.walls.map(w => Math.min(w.start[1], w.end[1]))) - 5;
    maxZ = Math.max(...plan.walls.map(w => Math.max(w.start[1], w.end[1]))) + 5;
  }

  const lawnWidth = Math.max(36, (maxX - minX) + 8);
  const lawnDepth = Math.max(36, (maxZ - minZ) + 8);
  const lawnGeo = new THREE.BoxGeometry(lawnWidth, 0.15, lawnDepth);
  const lawnMesh = new THREE.Mesh(lawnGeo, grassMat);
  lawnMesh.position.set((minX + maxX) / 2, -0.15, (minZ + maxZ) / 2);
  lawnMesh.receiveShadow = true;
  landscapingGroup.add(lawnMesh);

  // Stone entrance walkway
  const walkwayGeo = new THREE.BoxGeometry(2.4, 0.02, 6.0);
  const walkwayMesh = new THREE.Mesh(walkwayGeo, stonePatioMat);
  walkwayMesh.position.set(minX + 2.5, -0.06, 0);
  walkwayMesh.receiveShadow = true;
  landscapingGroup.add(walkwayMesh);

  rootGroup.add(landscapingGroup);

  // 1. Build Room Floors & Ceilings
  const floorsGroup = new THREE.Group();
  floorsGroup.name = "Floors";

  const ceilingsGroup = new THREE.Group();
  ceilingsGroup.name = "Ceilings";

  plan.rooms.forEach((room) => {
    let floorMat;
    switch (room.floorType) {
      case 'tile':
        floorMat = new THREE.MeshStandardMaterial({
          map: createTileTexture(),
          roughness: 0.35,
          metalness: 0.08
        });
        break;
      case 'marble':
        floorMat = new THREE.MeshStandardMaterial({
          map: createMarbleTexture(),
          roughness: 0.15,
          metalness: 0.12
        });
        break;
      case 'decking':
      case 'concrete':
        floorMat = new THREE.MeshStandardMaterial({
          color: room.floorColor ? parseInt(room.floorColor.replace('#', '0x')) : 0x64748b,
          roughness: 0.85
        });
        break;
      case 'hardwood':
      default:
        floorMat = new THREE.MeshStandardMaterial({
          map: createWoodTexture(),
          roughness: 0.45,
          metalness: 0.05
        });
        break;
    }

    const floorGeo = new THREE.BoxGeometry(room.width, 0.12, room.depth);
    const floorMesh = new THREE.Mesh(floorGeo, floorMat);
    floorMesh.position.set(room.x, -0.06, room.z);
    floorMesh.receiveShadow = true;
    floorMesh.userData = { roomName: room.name, roomId: room.id };
    floorsGroup.add(floorMesh);

    // Ceiling Mesh
    if (options.showCeiling && options.showCeiling !== 'none' && options.wallHeightMultiplier >= 0.8) {
      const cMat = options.showCeiling === 'glass' ? glassCeilingMat : ceilingPlasterMat;
      const ceilingGeo = new THREE.BoxGeometry(room.width, 0.08, room.depth);
      const ceilingMesh = new THREE.Mesh(ceilingGeo, cMat);
      ceilingMesh.position.set(room.x, ceilingH + 0.04, room.z);
      ceilingMesh.castShadow = true;
      ceilingsGroup.add(ceilingMesh);
    }

    // Ceiling Recessed Can Lights
    const canRim = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.02, 16), ceilingPotLightMat);
    canRim.position.set(room.x, ceilingH - 0.01, room.z);
    rootGroup.add(canRim);

    // Warm Ambient Point Light
    const roomLight = new THREE.PointLight(0xffedd5, 0.85, 10, 1.4);
    roomLight.position.set(room.x, ceilingH - 0.25, room.z);
    roomLight.castShadow = false;
    rootGroup.add(roomLight);
  });

  rootGroup.add(floorsGroup);
  if (ceilingsGroup.children.length > 0) {
    rootGroup.add(ceilingsGroup);
  }

  // 2. Build Walls, Interactive Doors & Openings
  const wallsGroup = new THREE.Group();
  wallsGroup.name = "Walls";

  let doorCounter = 0;

  plan.walls.forEach((wall) => {
    const p1 = new THREE.Vector2(wall.start[0], wall.start[1]);
    const p2 = new THREE.Vector2(wall.end[0], wall.end[1]);
    const length = p1.distanceTo(p2);
    const angle = Math.atan2(p2.y - p1.y, p2.x - p1.x);
    const thickness = (wall.thickness || 0.25);
    const height = wall.isRailing ? 1.05 : ceilingH;

    const midX = (p1.x + p2.x) / 2;
    const midZ = (p1.y + p2.y) / 2;

    const wallSubGroup = new THREE.Group();
    wallSubGroup.position.set(midX, 0, midZ);
    wallSubGroup.rotation.y = -angle;

    if (wall.isRailing) {
      const topRail = new THREE.Mesh(new THREE.BoxGeometry(length, 0.06, thickness), railingMat);
      topRail.position.y = 1.0;
      topRail.castShadow = true;
      wallSubGroup.add(topRail);

      const numSpindles = Math.floor(length / 0.4);
      for (let s = 0; s <= numSpindles; s++) {
        const sx = -length / 2 + s * (length / numSpindles);
        const spindle = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.95), railingMat);
        spindle.position.set(sx, 0.5, 0);
        wallSubGroup.add(spindle);
      }
    } else if (wall.openings && wall.openings.length > 0) {
      let currentOffset = 0;
      wall.openings.forEach((opening) => {
        const openingStart = opening.offset;
        const openingWidth = opening.width;
        const openingEnd = openingStart + openingWidth;

        const segLen = openingStart - currentOffset;
        if (segLen > 0.05) {
          const segGeo = new THREE.BoxGeometry(segLen, height, thickness);
          const segMesh = new THREE.Mesh(segGeo, wallPlasterMat);
          segMesh.position.set(-length / 2 + currentOffset + segLen / 2, height / 2, 0);
          segMesh.castShadow = true;
          segMesh.receiveShadow = true;
          wallSubGroup.add(segMesh);

          // Baseboard skirting
          const baseboard = new THREE.Mesh(new THREE.BoxGeometry(segLen, 0.12, thickness + 0.03), baseboardTrimMat);
          baseboard.position.set(-length / 2 + currentOffset + segLen / 2, 0.06, 0);
          wallSubGroup.add(baseboard);
        }

        const opCenterX = -length / 2 + openingStart + openingWidth / 2;

        if (opening.type === 'door') {
          doorCounter++;
          const doorHeight = Math.min(2.15, height * 0.85);
          const lintelHeight = height - doorHeight;
          if (lintelHeight > 0.05) {
            const lintelGeo = new THREE.BoxGeometry(openingWidth, lintelHeight, thickness);
            const lintel = new THREE.Mesh(lintelGeo, wallPlasterMat);
            lintel.position.set(opCenterX, doorHeight + lintelHeight / 2, 0);
            lintel.castShadow = true;
            wallSubGroup.add(lintel);
          }

          // Door Architrave Frame
          const doorFrame = new THREE.Mesh(new THREE.BoxGeometry(openingWidth + 0.08, doorHeight + 0.04, thickness + 0.04), baseboardTrimMat);
          doorFrame.position.set(opCenterX, (doorHeight + 0.04) / 2, 0);
          wallSubGroup.add(doorFrame);

          // INTERACTIVE DOOR HINGE PIVOT
          // Pivot placed at the left door jamb
          const hingePivot = new THREE.Group();
          const hingeX = opCenterX - openingWidth / 2 + 0.04;
          hingePivot.position.set(hingeX, 0, 0);

          // Door Leaf attached to hinge
          const doorWidth = openingWidth * 0.94;
          const doorPanel = new THREE.Mesh(new THREE.BoxGeometry(doorWidth, doorHeight * 0.98, 0.045), doorWoodMat);
          doorPanel.position.set(doorWidth / 2, doorHeight / 2, 0);
          doorPanel.castShadow = true;

          // Brass lever handle
          const handle = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.03, 0.06), doorHandleMat);
          handle.position.set(doorWidth - 0.08, 0.95, 0.03);

          doorPanel.userData = { isDoor: true, doorIndex: doorCounter, isOpen: options.doorsOpen };
          handle.userData = { isDoor: true, doorIndex: doorCounter, isOpen: options.doorsOpen };

          hingePivot.add(doorPanel, handle);

          // Initial rotation based on options.doorsOpen
          hingePivot.rotation.y = options.doorsOpen ? Math.PI / 2 : 0;
          hingePivot.userData = {
            targetRotY: options.doorsOpen ? Math.PI / 2 : 0,
            isOpen: options.doorsOpen
          };

          rootGroup.userData.doorPivots.push(hingePivot);
          wallSubGroup.add(hingePivot);
        } else if (opening.type === 'window') {
          const sillHeight = Math.min(0.9, height * 0.35);
          const winHeight = Math.min(1.4, height * 0.5);

          const sillGeo = new THREE.BoxGeometry(openingWidth, sillHeight, thickness);
          const sill = new THREE.Mesh(sillGeo, wallPlasterMat);
          sill.position.set(opCenterX, sillHeight / 2, 0);
          sill.castShadow = true;
          wallSubGroup.add(sill);

          const topLintelH = height - (sillHeight + winHeight);
          if (topLintelH > 0.05) {
            const topLintelGeo = new THREE.BoxGeometry(openingWidth, topLintelH, thickness);
            const topLintel = new THREE.Mesh(topLintelGeo, wallPlasterMat);
            topLintel.position.set(opCenterX, sillHeight + winHeight + topLintelH / 2, 0);
            topLintel.castShadow = true;
            wallSubGroup.add(topLintel);
          }

          const frame = new THREE.Mesh(new THREE.BoxGeometry(openingWidth + 0.06, winHeight + 0.06, thickness + 0.04), windowFrameMat);
          frame.position.set(opCenterX, sillHeight + winHeight / 2, 0);
          wallSubGroup.add(frame);

          const vMullion = new THREE.Mesh(new THREE.BoxGeometry(0.04, winHeight, thickness + 0.05), windowFrameMat);
          vMullion.position.set(opCenterX, sillHeight + winHeight / 2, 0);
          const hMullion = new THREE.Mesh(new THREE.BoxGeometry(openingWidth, 0.04, thickness + 0.05), windowFrameMat);
          hMullion.position.set(opCenterX, sillHeight + winHeight / 2, 0);
          wallSubGroup.add(vMullion, hMullion);

          const glassGeo = new THREE.BoxGeometry(openingWidth, winHeight, 0.02);
          const glass = new THREE.Mesh(glassGeo, glassWindowMat);
          glass.position.set(opCenterX, sillHeight + winHeight / 2, 0);
          wallSubGroup.add(glass);

          // Sheer Curtains
          [-openingWidth / 2 - 0.15, openingWidth / 2 + 0.15].forEach((cx) => {
            const curtain = new THREE.Mesh(new THREE.BoxGeometry(0.25, winHeight + 0.4, 0.12), curtainFabricMat);
            curtain.position.set(opCenterX + cx, sillHeight + winHeight / 2, thickness / 2 + 0.08);
            wallSubGroup.add(curtain);
          });
        }

        currentOffset = openingEnd;
      });

      const remainingLen = length - currentOffset;
      if (remainingLen > 0.05) {
        const segGeo = new THREE.BoxGeometry(remainingLen, height, thickness);
        const segMesh = new THREE.Mesh(segGeo, wallPlasterMat);
        segMesh.position.set(-length / 2 + currentOffset + remainingLen / 2, height / 2, 0);
        segMesh.castShadow = true;
        segMesh.receiveShadow = true;
        wallSubGroup.add(segMesh);

        const baseboard = new THREE.Mesh(new THREE.BoxGeometry(remainingLen, 0.12, thickness + 0.03), baseboardTrimMat);
        baseboard.position.set(-length / 2 + currentOffset + remainingLen / 2, 0.06, 0);
        wallSubGroup.add(baseboard);
      }
    } else {
      const wallGeo = new THREE.BoxGeometry(length, height, thickness);
      const wallMesh = new THREE.Mesh(wallGeo, wallPlasterMat);
      wallMesh.position.y = height / 2;
      wallMesh.castShadow = true;
      wallMesh.receiveShadow = true;
      wallSubGroup.add(wallMesh);

      const baseboard = new THREE.Mesh(new THREE.BoxGeometry(length, 0.12, thickness + 0.03), baseboardTrimMat);
      baseboard.position.y = 0.06;
      wallSubGroup.add(baseboard);
    }

    wallsGroup.add(wallSubGroup);
  });
  rootGroup.add(wallsGroup);

  // 3. Customizable Movable Wall Frames
  const wallArtGroup = new THREE.Group();
  wallArtGroup.name = "CustomWallFrames";

  const framesToRender = options.wallFrames && options.wallFrames.length > 0
    ? options.wallFrames
    : [
        { id: 'def-1', x: -3.5, y: 1.8, z: -5.5, width: 1.6, height: 1.0, artVariant: 1, frameFinish: 'gold', rot: 0 },
        { id: 'def-2', x: -3.5, y: 1.8, z: 6.2, width: 1.5, height: 0.95, artVariant: 2, frameFinish: 'wood', rot: 180 }
      ];

  framesToRender.forEach((f) => {
    const fMat = frameMaterials[f.frameFinish] || frameMaterials.gold;
    const canvasMat = new THREE.MeshStandardMaterial({
      map: createArtCanvasTexture(f.artVariant || 1),
      roughness: 0.4
    });

    const frameMesh = new THREE.Mesh(new THREE.BoxGeometry(f.width, f.height, 0.04), fMat);
    frameMesh.position.set(f.x, f.y, f.z);
    frameMesh.castShadow = true;

    const canvasMesh = new THREE.Mesh(new THREE.BoxGeometry(f.width - 0.1, f.height - 0.1, 0.045), canvasMat);
    canvasMesh.position.set(f.x, f.y, f.z + (f.rot === 180 ? -0.005 : 0.005));

    if (f.rot) {
      frameMesh.rotation.y = THREE.MathUtils.degToRad(f.rot);
      canvasMesh.rotation.y = THREE.MathUtils.degToRad(f.rot);
    }

    wallArtGroup.add(frameMesh, canvasMesh);
  });

  rootGroup.add(wallArtGroup);

  // 4. Build Furniture Items
  if (!options.hideFurniture) {
    const furnitureGroup = new THREE.Group();
    furnitureGroup.name = "Furniture";

    plan.rooms.forEach((room) => {
      if (room.furniture && Array.isArray(room.furniture)) {
        room.furniture.forEach((f) => {
          const itemMesh = buildFurniture(f, options.furnitureTheme);
          furnitureGroup.add(itemMesh);
        });
      }
    });
    rootGroup.add(furnitureGroup);
  }

  return rootGroup;
}
