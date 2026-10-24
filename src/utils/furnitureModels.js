import * as THREE from 'three';
import { createArtCanvasTexture, createRugTexture } from './textureGenerator';

export function getFurnitureMaterials(customTheme = {}) {
  const sofaColor = customTheme.sofaColor || 0x334155;
  const bedColor = customTheme.bedColor || 0x0f766e;
  const woodColor = customTheme.woodColor || 0x85583b;

  return {
    woodMat: new THREE.MeshStandardMaterial({ color: woodColor, roughness: 0.55, metalness: 0.05 }),
    woodDarkMat: new THREE.MeshStandardMaterial({ color: 0x271911, roughness: 0.5 }),
    fabricSofaMat: new THREE.MeshStandardMaterial({ color: sofaColor, roughness: 0.85 }),
    fabricBedMat: new THREE.MeshStandardMaterial({ color: bedColor, roughness: 0.85 }),
    pillowMat: new THREE.MeshStandardMaterial({ color: 0xf59e0b, roughness: 0.7 }),
    pillowSecondaryMat: new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.75 }),
    metalBlackMat: new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.85, roughness: 0.2 }),
    metalBrassMat: new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.88, roughness: 0.2 }),
    metalChromeMat: new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.95, roughness: 0.1 }),
    glassMat: new THREE.MeshPhysicalMaterial({ color: 0xffffff, transparent: true, opacity: 0.35, roughness: 0.05, transmission: 0.92, ior: 1.52 }),
    ceramicWhiteMat: new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.18, metalness: 0.05 }),
    mirrorMat: new THREE.MeshStandardMaterial({ color: 0x93c5fd, metalness: 0.95, roughness: 0.05 }),
    mirrorGlowMat: new THREE.MeshBasicMaterial({ color: 0xffedd5 }),
    tvScreenMat: new THREE.MeshBasicMaterial({ color: 0x030712 }),
    plantGreenMat: new THREE.MeshStandardMaterial({ color: 0x2d6a4f, roughness: 0.65 }),
    plantGreenDarkMat: new THREE.MeshStandardMaterial({ color: 0x1b4332, roughness: 0.7 }),
    plantPotMat: new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.6 }),
    lampShadeMat: new THREE.MeshStandardMaterial({ color: 0xfef08a, roughness: 0.4, emissive: 0xffedd5, emissiveIntensity: 0.7 }),
    rugWovenMat: new THREE.MeshStandardMaterial({ map: createRugTexture(), roughness: 0.9 })
  };
}

function enableShadows(mesh) {
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  if (mesh.children) {
    mesh.children.forEach(enableShadows);
  }
  return mesh;
}

export function buildFurniture(item, customTheme = {}) {
  const mats = getFurnitureMaterials(customTheme);
  const group = new THREE.Group();
  const { type, scale = [1, 1, 1] } = item;

  switch (type) {
    case 'sofa': {
      // Luxury Deep Sectional Sofa
      const base = new THREE.Mesh(new THREE.BoxGeometry(scale[0], 0.32, scale[2]), mats.fabricSofaMat);
      base.position.y = 0.16;
      group.add(base);

      // Cushions with subtle rounded look
      const cushionW = (scale[0] - 0.36) / 3;
      for (let c = 0; c < 3; c++) {
        const cushion = new THREE.Mesh(new THREE.BoxGeometry(cushionW - 0.04, 0.14, scale[2] - 0.22), mats.fabricSofaMat);
        cushion.position.set(-scale[0] / 2 + 0.18 + c * cushionW + cushionW / 2, 0.38, 0.04);
        group.add(cushion);
      }

      // Backrest
      const back = new THREE.Mesh(new THREE.BoxGeometry(scale[0], 0.48, 0.22), mats.fabricSofaMat);
      back.position.set(0, 0.48, -scale[2] / 2 + 0.11);
      group.add(back);

      // Armrests
      const armL = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.38, scale[2]), mats.fabricSofaMat);
      armL.position.set(-scale[0] / 2 + 0.09, 0.36, 0);
      const armR = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.38, scale[2]), mats.fabricSofaMat);
      armR.position.set(scale[0] / 2 - 0.09, 0.36, 0);
      group.add(armL, armR);

      // Pillows
      const p1 = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.32, 0.12), mats.pillowMat);
      p1.position.set(-scale[0] / 3, 0.42, -scale[2] / 4);
      p1.rotation.set(0.15, 0.1, 0);

      const p2 = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.3, 0.12), mats.pillowSecondaryMat);
      p2.position.set(scale[0] / 3, 0.42, -scale[2] / 4);
      p2.rotation.set(0.15, -0.1, 0);
      group.add(p1, p2);

      // Throw Blanket draped over armrest
      const blanket = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.25, 0.6), mats.pillowMat);
      blanket.position.set(-scale[0] / 2 + 0.1, 0.36, 0.1);
      group.add(blanket);
      break;
    }

    case 'coffeeTable': {
      // Tempered glass top with brass legs and display tray
      const top = new THREE.Mesh(new THREE.BoxGeometry(scale[0], 0.035, scale[2]), mats.glassMat);
      top.position.y = scale[1];
      group.add(top);

      // Lower wooden storage shelf
      const shelf = new THREE.Mesh(new THREE.BoxGeometry(scale[0] * 0.9, 0.02, scale[2] * 0.85), mats.woodMat);
      shelf.position.y = scale[1] * 0.35;
      group.add(shelf);

      // 4 Brass Legs
      const legGeo = new THREE.CylinderGeometry(0.018, 0.015, scale[1]);
      [
        [-scale[0] / 2 + 0.08, -scale[2] / 2 + 0.08],
        [scale[0] / 2 - 0.08, -scale[2] / 2 + 0.08],
        [-scale[0] / 2 + 0.08, scale[2] / 2 - 0.08],
        [scale[0] / 2 - 0.08, scale[2] / 2 - 0.08],
      ].forEach(([lx, lz]) => {
        const leg = new THREE.Mesh(legGeo, mats.metalBrassMat);
        leg.position.set(lx, scale[1] / 2, lz);
        group.add(leg);
      });

      // Coffee Table Book & Decorative Ceramic Bowl
      const book = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.03, 0.18), mats.ceramicWhiteMat);
      book.position.set(0.15, scale[1] + 0.025, 0);
      book.rotation.y = 0.2;
      const bowl = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.05, 0.04, 16), mats.metalBrassMat);
      bowl.position.set(-0.2, scale[1] + 0.03, 0.05);
      group.add(book, bowl);
      break;
    }

    case 'tvUnit': {
      // Low fluted walnut credenza
      const credenza = new THREE.Mesh(new THREE.BoxGeometry(scale[0], 0.42, scale[2]), mats.woodMat);
      credenza.position.y = 0.21;
      group.add(credenza);

      // 75" TV with ultra-thin bezel
      const tvScreen = new THREE.Mesh(new THREE.BoxGeometry(scale[0] * 0.82, 0.58, 0.025), mats.tvScreenMat);
      tvScreen.position.set(0, 0.78, 0);

      const tvBezel = new THREE.Mesh(new THREE.BoxGeometry(scale[0] * 0.83, 0.59, 0.02), mats.metalBlackMat);
      tvBezel.position.set(0, 0.78, -0.005);

      const tvStand = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.03, 0.18), mats.metalBlackMat);
      tvStand.position.set(0, 0.435, 0);
      group.add(tvScreen, tvBezel, tvStand);
      break;
    }

    case 'bedDouble': {
      // Platform frame
      const frame = new THREE.Mesh(new THREE.BoxGeometry(scale[0], 0.26, scale[2]), mats.woodMat);
      frame.position.y = 0.13;
      group.add(frame);

      // Padded Velvet Headboard
      const headboard = new THREE.Mesh(new THREE.BoxGeometry(scale[0] + 0.1, 0.95, 0.14), mats.fabricBedMat);
      headboard.position.set(0, 0.55, -scale[2] / 2 + 0.07);
      group.add(headboard);

      // Mattress
      const mattress = new THREE.Mesh(new THREE.BoxGeometry(scale[0] * 0.94, 0.28, scale[2] * 0.92), mats.ceramicWhiteMat);
      mattress.position.set(0, 0.35, 0.05);
      group.add(mattress);

      // Duvet fold
      const duvet = new THREE.Mesh(new THREE.BoxGeometry(scale[0] * 0.95, 0.08, scale[2] * 0.6), mats.fabricBedMat);
      duvet.position.set(0, 0.48, scale[2] * 0.18);
      group.add(duvet);

      // 4 Sleeping Pillows
      [-scale[0] / 3.8, scale[0] / 3.8].forEach((px) => {
        const pBack = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.18, 0.35), mats.pillowMat);
        pBack.position.set(px, 0.55, -scale[2] / 3 - 0.05);
        pBack.rotation.x = 0.3;

        const pFront = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.14, 0.3), mats.ceramicWhiteMat);
        pFront.position.set(px, 0.5, -scale[2] / 3 + 0.1);
        pFront.rotation.x = 0.2;
        group.add(pBack, pFront);
      });

      // Bedside Nightstands & Glowing Designer Table Lamps
      [-scale[0] / 2 - 0.28, scale[0] / 2 + 0.28].forEach((nsX) => {
        const nightstand = new THREE.Mesh(new THREE.BoxGeometry(0.44, 0.45, 0.42), mats.woodMat);
        nightstand.position.set(nsX, 0.225, -scale[2] / 3);
        group.add(nightstand);

        // Brass Lamp
        const lampBase = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.09, 0.03, 16), mats.metalBrassMat);
        lampBase.position.set(nsX, 0.465, -scale[2] / 3);
        const lampRod = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.26), mats.metalBrassMat);
        lampRod.position.set(nsX, 0.6, -scale[2] / 3);

        const lampShade = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.15, 0.18, 16), mats.lampShadeMat);
        lampShade.position.set(nsX, 0.73, -scale[2] / 3);
        group.add(lampBase, lampRod, lampShade);

        // Warm bedside point light
        const bedLight = new THREE.PointLight(0xffedd5, 0.9, 4.5);
        bedLight.position.set(nsX, 0.85, -scale[2] / 3);
        group.add(bedLight);
      });
      break;
    }

    case 'diningTable': {
      // Solid wood top
      const top = new THREE.Mesh(new THREE.BoxGeometry(scale[0], 0.05, scale[2]), mats.woodMat);
      top.position.y = scale[1];
      group.add(top);

      // Tapered legs
      const legGeo = new THREE.CylinderGeometry(0.03, 0.018, scale[1]);
      [
        [-scale[0] / 2 + 0.12, -scale[2] / 2 + 0.1],
        [scale[0] / 2 - 0.12, -scale[2] / 2 + 0.1],
        [-scale[0] / 2 + 0.12, scale[2] / 2 - 0.1],
        [scale[0] / 2 - 0.12, scale[2] / 2 - 0.1]
      ].forEach(([lx, lz]) => {
        const leg = new THREE.Mesh(legGeo, mats.metalBlackMat);
        leg.position.set(lx, scale[1] / 2, lz);
        group.add(leg);
      });

      // 4 Dining Chairs tucked in
      [-scale[0] / 3.5, scale[0] / 3.5].forEach((cx) => {
        [-scale[2] / 2 - 0.22, scale[2] / 2 + 0.22].forEach((cz, zIdx) => {
          const chairSeat = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.04, 0.42), mats.fabricSofaMat);
          chairSeat.position.set(cx, 0.46, cz);
          const chairBack = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.4, 0.04), mats.fabricSofaMat);
          chairBack.position.set(cx, 0.68, zIdx === 0 ? cz - 0.19 : cz + 0.19);
          group.add(chairSeat, chairBack);
        });
      });
      break;
    }

    case 'kitchenIsland': {
      // Quartz Waterfall Island
      const body = new THREE.Mesh(new THREE.BoxGeometry(scale[0], scale[1], scale[2]), new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.5 }));
      body.position.y = scale[1] / 2;
      group.add(body);

      // White Calacatta Waterfall Countertop
      const topSlab = new THREE.Mesh(new THREE.BoxGeometry(scale[0] + 0.1, 0.06, scale[2] + 0.1), mats.ceramicWhiteMat);
      topSlab.position.y = scale[1] + 0.03;
      group.add(topSlab);

      // Hanging Brass Pendants with warm lights
      [-scale[0] / 3, scale[0] / 3].forEach((px) => {
        const wire = new THREE.Mesh(new THREE.CylinderGeometry(0.005, 0.005, 1.2), mats.metalBlackMat);
        wire.position.set(px, scale[1] + 1.2, 0);
        const shade = new THREE.Mesh(new THREE.ConeGeometry(0.16, 0.22, 16), mats.metalBrassMat);
        shade.position.set(px, scale[1] + 0.6, 0);
        const pendantLight = new THREE.PointLight(0xfff3c4, 1.1, 5.0);
        pendantLight.position.set(px, scale[1] + 0.48, 0);
        group.add(wire, shade, pendantLight);

        // Bar Stools under Island
        const stoolSeat = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.04, 16), mats.woodMat);
        stoolSeat.position.set(px, 0.65, scale[2] / 2 + 0.28);
        const stoolLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.65), mats.metalBlackMat);
        stoolLeg.position.set(px, 0.325, scale[2] / 2 + 0.28);
        group.add(stoolSeat, stoolLeg);
      });
      break;
    }

    case 'kitchenCounter': {
      const counter = new THREE.Mesh(new THREE.BoxGeometry(scale[0], scale[1], scale[2]), new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.5 }));
      counter.position.y = scale[1] / 2;
      const topSlab = new THREE.Mesh(new THREE.BoxGeometry(scale[0] + 0.05, 0.05, scale[2] + 0.05), mats.ceramicWhiteMat);
      topSlab.position.y = scale[1] + 0.025;
      group.add(counter, topSlab);

      // Chrome Gooseneck Faucet & Undermount Sink
      const sink = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.02, 0.45), mats.metalBlackMat);
      sink.position.set(0, scale[1] + 0.055, 0);
      const faucetBase = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.32), mats.metalChromeMat);
      faucetBase.position.set(0, scale[1] + 0.2, -0.18);
      const faucetArch = new THREE.Mesh(new THREE.TorusGeometry(0.12, 0.02, 8, 16, Math.PI), mats.metalChromeMat);
      faucetArch.position.set(0, scale[1] + 0.35, -0.06);
      faucetArch.rotation.x = Math.PI / 2;
      group.add(sink, faucetBase, faucetArch);
      break;
    }

    case 'fridge': {
      const fridge = new THREE.Mesh(new THREE.BoxGeometry(scale[0], scale[1], scale[2]), new THREE.MeshStandardMaterial({ color: 0xcfd8dc, metalness: 0.75, roughness: 0.25 }));
      fridge.position.y = scale[1] / 2;

      // Handles
      const handleL = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.8), mats.metalBlackMat);
      handleL.position.set(-0.06, scale[1] * 0.6, scale[2] / 2 + 0.03);
      const handleR = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.8), mats.metalBlackMat);
      handleR.position.set(0.06, scale[1] * 0.6, scale[2] / 2 + 0.03);
      group.add(fridge, handleL, handleR);
      break;
    }

    case 'bathtub': {
      // Freestanding oval spa tub
      const tub = new THREE.Mesh(new THREE.BoxGeometry(scale[0], scale[1], scale[2]), mats.ceramicWhiteMat);
      tub.position.y = scale[1] / 2;

      // Chrome standing floor faucet
      const standingFaucet = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.95), mats.metalChromeMat);
      standingFaucet.position.set(scale[0] / 2 + 0.15, 0.475, 0);
      group.add(tub, standingFaucet);
      break;
    }

    case 'toilet': {
      const base = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.18, 0.42), mats.ceramicWhiteMat);
      base.position.y = 0.21;
      const tank = new THREE.Mesh(new THREE.BoxGeometry(0.44, 0.44, 0.22), mats.ceramicWhiteMat);
      tank.position.set(0, 0.54, -0.16);
      group.add(base, tank);
      break;
    }

    case 'wardrobe': {
      // 6-door millwork wardrobe
      const wardrobe = new THREE.Mesh(new THREE.BoxGeometry(scale[0], scale[1], scale[2]), mats.woodMat);
      wardrobe.position.y = scale[1] / 2;

      // Vertical door seams and brass handles
      const numDoors = 4;
      for (let d = 0; d < numDoors; d++) {
        const dx = -scale[0] / 2 + (d + 0.5) * (scale[0] / numDoors);
        const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.008, 0.35), mats.metalBrassMat);
        handle.position.set(dx + 0.08, scale[1] * 0.5, scale[2] / 2 + 0.015);
        group.add(handle);
      }
      group.add(wardrobe);
      break;
    }

    case 'desk': {
      const deskTop = new THREE.Mesh(new THREE.BoxGeometry(scale[0], 0.04, scale[2]), mats.woodMat);
      deskTop.position.y = scale[1];

      // Laptop open on desk
      const laptopBase = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.015, 0.24), mats.metalChromeMat);
      laptopBase.position.set(0, scale[1] + 0.01, 0);
      const laptopScreen = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.22, 0.01), mats.tvScreenMat);
      laptopScreen.position.set(0, scale[1] + 0.12, -0.11);
      laptopScreen.rotation.x = -0.15;

      const legGeo = new THREE.CylinderGeometry(0.02, 0.02, scale[1]);
      [
        [-scale[0] / 2 + 0.06, -scale[2] / 2 + 0.06],
        [scale[0] / 2 - 0.06, -scale[2] / 2 + 0.06],
        [-scale[0] / 2 + 0.06, scale[2] / 2 - 0.06],
        [scale[0] / 2 - 0.06, scale[2] / 2 - 0.06]
      ].forEach(([lx, lz]) => {
        const leg = new THREE.Mesh(legGeo, mats.metalBlackMat);
        leg.position.set(lx, scale[1] / 2, lz);
        group.add(leg);
      });
      group.add(deskTop, laptopBase, laptopScreen);
      break;
    }

    case 'plant': {
      // Ceramic pot with multi-tier foliage
      const pot = new THREE.Mesh(new THREE.CylinderGeometry(scale[0] * 0.4, scale[0] * 0.3, 0.45, 16), mats.plantPotMat);
      pot.position.y = 0.225;

      const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.04, scale[1] * 0.7), mats.woodMat);
      trunk.position.y = scale[1] * 0.35 + 0.2;

      const f1 = new THREE.Mesh(new THREE.DodecahedronGeometry(scale[0] * 0.55, 1), mats.plantGreenMat);
      f1.position.y = scale[1] * 0.7;

      const f2 = new THREE.Mesh(new THREE.DodecahedronGeometry(scale[0] * 0.45, 1), mats.plantGreenDarkMat);
      f2.position.set(scale[0] * 0.15, scale[1] * 0.85, 0);
      group.add(pot, trunk, f1, f2);
      break;
    }

    case 'rug': {
      // Textured woven rug with border
      const rug = new THREE.Mesh(new THREE.BoxGeometry(scale[0], 0.015, scale[2]), mats.rugWovenMat);
      rug.position.y = 0.008;
      group.add(rug);
      break;
    }

    default:
      break;
  }

  group.position.set(item.x, 0, item.z);
  if (item.rot) {
    group.rotation.y = THREE.MathUtils.degToRad(item.rot);
  }

  return enableShadows(group);
}
