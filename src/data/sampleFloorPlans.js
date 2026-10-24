export const SAMPLE_PLANS = [
  // 1. 650 SQ FT — Modern Minimalist Studio
  {
    id: 'plan-650',
    sqFt: 650,
    name: '650 SQ FT — Minimalist Urban Studio',
    type: 'Studio Apartment',
    bedrooms: 1,
    bathrooms: 1,
    ceilingHeight: 3.0,
    estimatedCost: 1850000,
    description: 'Smart luxury micro-living featuring an open-concept lounge, kitchenette, dedicated sleeping alcove, and designer spa bath.',
    rooms: [
      {
        id: 's1',
        name: 'Open Living & Lounge',
        type: 'living',
        x: -1.8,
        z: -1.2,
        width: 5.4,
        depth: 4.8,
        floorType: 'hardwood',
        floorColor: '#9c7352',
        furniture: [
          { type: 'sofa', name: 'Scandinavian 3-Seater Sofa', price: 32000, x: -2.8, z: -1.2, rot: 90, scale: [2.2, 0.75, 0.95] },
          { type: 'coffeeTable', name: 'Glass & Brass Coffee Table', price: 10500, x: -1.2, z: -1.2, rot: 0, scale: [1.1, 0.38, 0.65] },
          { type: 'tvUnit', name: '65" OLED TV & Fluted Credenza', price: 62000, x: 0.4, z: -1.2, rot: -90, scale: [1.6, 0.48, 0.42] },
          { type: 'rug', name: 'Woven Geometric Rug', price: 9500, x: -1.5, z: -1.2, rot: 0, scale: [2.6, 0.02, 2.0] },
          { type: 'plant', name: 'Potted Fiddle Leaf Fig', price: 3200, x: 0.4, z: -3.0, rot: 0, scale: [0.5, 1.3, 0.5] }
        ]
      },
      {
        id: 's2',
        name: 'Sleeping Sanctuary',
        type: 'bedroom',
        x: -1.8,
        z: 2.8,
        width: 5.4,
        depth: 3.2,
        floorType: 'hardwood',
        floorColor: '#9c7352',
        furniture: [
          { type: 'bedDouble', name: 'Queen Upholstered Bed & Lamps', price: 42000, x: -1.8, z: 3.3, rot: 180, scale: [1.9, 0.65, 2.0] },
          { type: 'wardrobe', name: 'Built-in 4-Door Wardrobe', price: 45000, x: -4.0, z: 2.2, rot: 90, scale: [1.8, 2.4, 0.6] }
        ]
      },
      {
        id: 's3',
        name: 'Chef Kitchenette & Bar',
        type: 'kitchen',
        x: 2.4,
        z: -1.4,
        width: 3.0,
        depth: 4.4,
        floorType: 'tile',
        floorColor: '#e2e8f0',
        furniture: [
          { type: 'kitchenCounter', name: 'Modular Quartz Kitchen Counter', price: 68000, x: 2.4, z: -3.0, rot: 0, scale: [2.6, 0.9, 0.7] },
          { type: 'fridge', name: 'Stainless Steel Refrigerator', price: 45000, x: 3.4, z: -1.4, rot: -90, scale: [0.8, 1.85, 0.8] }
        ]
      },
      {
        id: 's4',
        name: 'Designer Spa Bath',
        type: 'bathroom',
        x: 2.4,
        z: 2.2,
        width: 3.0,
        depth: 2.8,
        floorType: 'marble',
        floorColor: '#f8fafc',
        furniture: [
          { type: 'bathtub', name: 'Freestanding Soaking Tub', price: 38000, x: 2.4, z: 2.8, rot: 0, scale: [1.4, 0.58, 0.75] },
          { type: 'toilet', name: 'Floating Smart Toilet', price: 18500, x: 1.4, z: 1.6, rot: 90, scale: [0.5, 0.7, 0.6] }
        ]
      }
    ],
    walls: [
      { start: [-4.8, -3.8], end: [4.1, -3.8], thickness: 0.22, height: 3.0, openings: [{ offset: 2.0, width: 2.4, type: 'window' }] },
      { start: [4.1, -3.8], end: [4.1, 4.6], thickness: 0.22, height: 3.0, openings: [{ offset: 5.5, width: 1.2, type: 'window' }] },
      { start: [4.1, 4.6], end: [-4.8, 4.6], thickness: 0.22, height: 3.0, openings: [{ offset: 2.5, width: 1.8, type: 'window' }] },
      { start: [-4.8, 4.6], end: [-4.8, -3.8], thickness: 0.22, height: 3.0, openings: [{ offset: 4.2, width: 1.0, type: 'door' }] },
      { start: [0.8, 0.6], end: [4.1, 0.6], thickness: 0.16, height: 3.0, openings: [{ offset: 0.8, width: 0.85, type: 'door' }] },
      { start: [0.8, 0.6], end: [0.8, 4.6], thickness: 0.16, height: 3.0 }
    ]
  },

  // 2. 1,200 SQ FT — Contemporary 2-BHK Urban Apartment
  {
    id: 'plan-1200',
    sqFt: 1200,
    name: '1,200 SQ FT — Contemporary 2-BHK Flat',
    type: 'Urban Apartment',
    bedrooms: 2,
    bathrooms: 2,
    ceilingHeight: 3.0,
    estimatedCost: 3400000,
    description: 'Efficient contemporary 2-bedroom home with an open-plan great room, master suite with ensuite bath, guest room, and private balcony.',
    rooms: [
      {
        id: 'a1',
        name: 'Great Living & Dining Room',
        type: 'living',
        x: -2.8,
        z: -2.0,
        width: 6.6,
        depth: 5.6,
        floorType: 'hardwood',
        floorColor: '#b58d67',
        furniture: [
          { type: 'sofa', name: 'Italian Sectional Sofa', price: 48000, x: -4.0, z: -2.0, rot: 90, scale: [2.5, 0.75, 1.0] },
          { type: 'coffeeTable', name: 'Tempered Glass Coffee Table', price: 11500, x: -2.2, z: -2.0, rot: 0, scale: [1.2, 0.38, 0.7] },
          { type: 'tvUnit', name: '75" TV & Media Console', price: 68000, x: -0.4, z: -2.0, rot: -90, scale: [1.8, 0.5, 0.45] },
          { type: 'rug', name: 'Moroccan Wool Rug', price: 12000, x: -2.6, z: -2.0, rot: 0, scale: [2.8, 0.02, 2.2] },
          { type: 'diningTable', name: '4-Seater Dining Set', price: 28000, x: -3.5, z: -4.0, rot: 0, scale: [1.5, 0.75, 0.9] }
        ]
      },
      {
        id: 'a2',
        name: 'Open Chef Kitchen',
        type: 'kitchen',
        x: 3.0,
        z: -3.0,
        width: 4.8,
        depth: 3.6,
        floorType: 'tile',
        floorColor: '#e2e8f0',
        furniture: [
          { type: 'kitchenCounter', name: 'Modular Quartz Countertop & Sink', price: 85000, x: 3.0, z: -4.2, rot: 0, scale: [3.8, 0.9, 0.75] },
          { type: 'kitchenIsland', name: 'Quartz Island with Pendants', price: 65000, x: 3.0, z: -2.0, rot: 0, scale: [2.2, 0.9, 0.95] },
          { type: 'fridge', name: 'French Door Refrigerator', price: 58000, x: 4.8, z: -3.0, rot: -90, scale: [0.9, 1.9, 0.85] }
        ]
      },
      {
        id: 'a3',
        name: 'Master Bed Suite',
        type: 'bedroom',
        x: -2.8,
        z: 3.2,
        width: 6.6,
        depth: 4.6,
        floorType: 'hardwood',
        floorColor: '#9c7352',
        furniture: [
          { type: 'bedDouble', name: 'King Upholstered Bed with Nightstands', price: 55000, x: -2.8, z: 4.2, rot: 180, scale: [2.1, 0.65, 2.1] },
          { type: 'wardrobe', name: '6-Door Custom Wardrobe', price: 58000, x: -5.4, z: 2.5, rot: 90, scale: [2.4, 2.4, 0.65] },
          { type: 'desk', name: 'Home Office Work Desk', price: 16500, x: -0.6, z: 4.2, rot: 180, scale: [1.3, 0.75, 0.65] }
        ]
      },
      {
        id: 'a4',
        name: 'Guest Bedroom',
        type: 'bedroom',
        x: 3.0,
        z: 0.8,
        width: 4.8,
        depth: 4.0,
        floorType: 'hardwood',
        floorColor: '#b58d67',
        furniture: [
          { type: 'bedDouble', name: 'Queen Solid Teak Minimalist Bed', price: 38000, x: 3.0, z: 1.8, rot: 180, scale: [1.8, 0.6, 2.0] },
          { type: 'wardrobe', name: 'Guest Wardrobe', price: 42000, x: 4.8, z: -0.2, rot: -90, scale: [1.8, 2.2, 0.6] }
        ]
      },
      {
        id: 'a5',
        name: 'Master Ensuite Bath',
        type: 'bathroom',
        x: 3.0,
        z: 4.0,
        width: 4.8,
        depth: 2.4,
        floorType: 'marble',
        floorColor: '#f8fafc',
        furniture: [
          { type: 'bathtub', name: 'Freestanding Soaking Tub', price: 42000, x: 3.8, z: 4.4, rot: 0, scale: [1.5, 0.58, 0.78] },
          { type: 'toilet', name: 'Smart Wall-Hung Toilet', price: 18500, x: 1.6, z: 3.8, rot: 90, scale: [0.52, 0.7, 0.62] }
        ]
      }
    ],
    walls: [
      { start: [-6.3, -5.0], end: [5.6, -5.0], thickness: 0.24, height: 3.0, openings: [{ offset: 7.5, width: 2.0, type: 'window' }] },
      { start: [5.6, -5.0], end: [5.6, 5.4], thickness: 0.24, height: 3.0, openings: [{ offset: 2.8, width: 1.6, type: 'window' }, { offset: 7.8, width: 1.4, type: 'window' }] },
      { start: [5.6, 5.4], end: [-6.3, 5.4], thickness: 0.24, height: 3.0, openings: [{ offset: 3.5, width: 2.0, type: 'window' }] },
      { start: [-6.3, 5.4], end: [-6.3, -5.0], thickness: 0.24, height: 3.0, openings: [{ offset: 5.2, width: 1.1, type: 'door' }] },
      { start: [0.5, -5.0], end: [0.5, -1.0], thickness: 0.18, height: 3.0 },
      { start: [0.5, -1.0], end: [5.6, -1.0], thickness: 0.18, height: 3.0, openings: [{ offset: 1.6, width: 0.95, type: 'door' }] },
      { start: [-6.3, 0.8], end: [0.5, 0.8], thickness: 0.18, height: 3.0, openings: [{ offset: 2.5, width: 0.95, type: 'door' }] },
      { start: [0.5, 0.8], end: [0.5, 5.4], thickness: 0.18, height: 3.0, openings: [{ offset: 1.5, width: 0.9, type: 'door' }] },
      { start: [0.5, 2.8], end: [5.6, 2.8], thickness: 0.18, height: 3.0, openings: [{ offset: 1.8, width: 0.9, type: 'door' }] }
    ]
  },

  // 3. 1,850 SQ FT — Executive 3-BHK Family Residence
  {
    id: 'plan-1850',
    sqFt: 1850,
    name: '1,850 SQ FT — Executive 3-BHK Residence',
    type: 'Family Home',
    bedrooms: 3,
    bathrooms: 2,
    ceilingHeight: 3.0,
    estimatedCost: 5200000,
    description: 'Expansive family residence featuring a grand salon, separate dining gallery, gourmet kitchen with breakfast island, master retreat, and two private bedrooms.',
    rooms: [
      {
        id: 'e1',
        name: 'Grand Great Salon',
        type: 'living',
        x: -3.6,
        z: -2.8,
        width: 7.6,
        depth: 6.2,
        floorType: 'hardwood',
        floorColor: '#b58d67',
        furniture: [
          { type: 'sofa', name: 'Italian Sectional Sofa', price: 48000, x: -4.8, z: -2.8, rot: 90, scale: [2.6, 0.75, 1.1] },
          { type: 'coffeeTable', name: 'Tempered Glass Coffee Table', price: 11500, x: -3.0, z: -2.8, rot: 0, scale: [1.3, 0.38, 0.75] },
          { type: 'tvUnit', name: '75" TV & Media Console', price: 72000, x: -1.0, z: -2.8, rot: -90, scale: [2.0, 0.5, 0.45] },
          { type: 'rug', name: 'Moroccan Wool Rug', price: 12000, x: -3.6, z: -2.8, rot: 0, scale: [3.2, 0.02, 2.4] },
          { type: 'diningTable', name: '6-Seater Oak Dining Set', price: 42000, x: -4.0, z: -5.0, rot: 0, scale: [1.8, 0.75, 1.0] },
          { type: 'plant', name: 'Indoor Fiddle Leaf Fig', price: 3500, x: -1.0, z: -5.2, rot: 0, scale: [0.6, 1.4, 0.6] }
        ]
      },
      {
        id: 'e2',
        name: 'Gourmet Chef Kitchen',
        type: 'kitchen',
        x: 4.0,
        z: -3.4,
        width: 7.2,
        depth: 5.0,
        floorType: 'tile',
        floorColor: '#e2e8f0',
        furniture: [
          { type: 'kitchenCounter', name: 'Modular Quartz Countertop & Sink', price: 95000, x: 4.0, z: -5.2, rot: 0, scale: [4.6, 0.9, 0.75] },
          { type: 'kitchenIsland', name: 'Calacatta Quartz Island with Brass Pendants', price: 75000, x: 4.0, z: -2.6, rot: 0, scale: [2.8, 0.9, 1.1] },
          { type: 'fridge', name: 'Smart French-Door Refrigerator', price: 68000, x: 6.8, z: -3.8, rot: -90, scale: [0.95, 1.9, 0.85] }
        ]
      },
      {
        id: 'e3',
        name: 'Primary Master Suite',
        type: 'bedroom',
        x: -3.6,
        z: 3.8,
        width: 7.6,
        depth: 5.6,
        floorType: 'hardwood',
        floorColor: '#9c7352',
        furniture: [
          { type: 'bedDouble', name: 'King Upholstered Bed with Nightstands', price: 58000, x: -3.6, z: 4.8, rot: 180, scale: [2.2, 0.65, 2.2] },
          { type: 'wardrobe', name: '6-Door Custom Wardrobe', price: 65000, x: -6.5, z: 2.8, rot: 90, scale: [2.8, 2.4, 0.65] },
          { type: 'desk', name: 'Executive Work Desk & Chair', price: 16500, x: -0.8, z: 4.8, rot: 180, scale: [1.4, 0.75, 0.7] }
        ]
      },
      {
        id: 'e4',
        name: 'Junior Bedroom Suite',
        type: 'bedroom',
        x: 4.0,
        z: 1.2,
        width: 7.2,
        depth: 4.0,
        floorType: 'hardwood',
        floorColor: '#b58d67',
        furniture: [
          { type: 'bedDouble', name: 'Queen Solid Teak Minimalist Bed', price: 38000, x: 4.0, z: 2.0, rot: 180, scale: [1.9, 0.6, 2.0] },
          { type: 'wardrobe', name: 'Built-in Guest Wardrobe', price: 42000, x: 6.8, z: 0.2, rot: -90, scale: [2.0, 2.2, 0.65] }
        ]
      },
      {
        id: 'e5',
        name: 'Master Spa Bath & Wetroom',
        type: 'bathroom',
        x: 4.0,
        z: 4.8,
        width: 7.2,
        depth: 3.2,
        floorType: 'marble',
        floorColor: '#f8fafc',
        furniture: [
          { type: 'bathtub', name: 'Freestanding Soaking Tub', price: 42000, x: 5.2, z: 5.2, rot: 0, scale: [1.6, 0.58, 0.8] },
          { type: 'toilet', name: 'Smart Wall-Hung Toilet', price: 18500, x: 2.0, z: 4.6, rot: 90, scale: [0.55, 0.7, 0.65] }
        ]
      }
    ],
    walls: [
      { start: [-7.8, -6.2], end: [7.8, -6.2], thickness: 0.26, height: 3.0, openings: [{ offset: 10.5, width: 2.4, type: 'window' }] },
      { start: [7.8, -6.2], end: [7.8, 6.8], thickness: 0.26, height: 3.0, openings: [{ offset: 3.8, width: 1.8, type: 'window' }, { offset: 9.5, width: 1.6, type: 'window' }] },
      { start: [7.8, 6.8], end: [-7.8, 6.8], thickness: 0.26, height: 3.0, openings: [{ offset: 4.5, width: 2.2, type: 'window' }] },
      { start: [-7.8, 6.8], end: [-7.8, -6.2], thickness: 0.26, height: 3.0, openings: [{ offset: 6.5, width: 1.2, type: 'door' }] },
      { start: [0.4, -6.2], end: [0.4, -0.8], thickness: 0.18, height: 3.0 },
      { start: [0.4, -0.8], end: [7.8, -0.8], thickness: 0.18, height: 3.0, openings: [{ offset: 2.2, width: 1.1, type: 'door' }] },
      { start: [-7.8, 0.8], end: [0.4, 0.8], thickness: 0.18, height: 3.0, openings: [{ offset: 3.0, width: 1.1, type: 'door' }] },
      { start: [0.4, 0.8], end: [0.4, 6.8], thickness: 0.18, height: 3.0, openings: [{ offset: 1.6, width: 1.0, type: 'door' }] },
      { start: [0.4, 3.2], end: [7.8, 3.2], thickness: 0.18, height: 3.0, openings: [{ offset: 2.5, width: 1.0, type: 'door' }] }
    ]
  },

  // 4. 2,400 SQ FT — Signature 4-BHK Luxury Penthouse
  {
    id: 'plan-2400',
    sqFt: 2400,
    name: '2,400 SQ FT — Signature 4-BHK Penthouse',
    type: 'Luxury Penthouse',
    bedrooms: 4,
    bathrooms: 3,
    ceilingHeight: 3.2,
    estimatedCost: 7500000,
    description: 'High-floor luxury penthouse with panoramic glass expanses, grand entertainment salon, private library/study, and 4 dedicated suites.',
    rooms: [
      {
        id: 'p1',
        name: 'Grand Entertainment Salon',
        type: 'living',
        x: -4.0,
        z: -2.8,
        width: 8.4,
        depth: 6.8,
        floorType: 'marble',
        floorColor: '#f8fafc',
        furniture: [
          { type: 'sofa', name: 'Italian Leather Sectional Sofa', price: 48000, x: -5.4, z: -2.8, rot: 90, scale: [2.8, 0.75, 1.15] },
          { type: 'coffeeTable', name: 'Tempered Glass Coffee Table', price: 11500, x: -3.4, z: -2.8, rot: 0, scale: [1.4, 0.38, 0.8] },
          { type: 'tvUnit', name: '75" 4K TV & Media Console', price: 72000, x: -1.0, z: -2.8, rot: -90, scale: [2.2, 0.5, 0.45] },
          { type: 'rug', name: 'Moroccan Wool Rug', price: 12000, x: -3.8, z: -2.8, rot: 0, scale: [3.4, 0.02, 2.6] },
          { type: 'diningTable', name: '6-Seater Oak Dining Set', price: 42000, x: -4.5, z: -5.2, rot: 0, scale: [2.0, 0.75, 1.0] },
          { type: 'plant', name: 'Indoor Fiddle Leaf Fig', price: 3500, x: -1.0, z: -5.4, rot: 0, scale: [0.65, 1.5, 0.65] }
        ]
      },
      {
        id: 'p2',
        name: 'Exhibition Kitchen & Island',
        type: 'kitchen',
        x: 4.4,
        z: -2.8,
        width: 8.0,
        depth: 6.8,
        floorType: 'tile',
        floorColor: '#cbd5e1',
        furniture: [
          { type: 'kitchenCounter', name: 'Modular Quartz Countertop & Sink', price: 95000, x: 4.4, z: -5.4, rot: 0, scale: [5.0, 0.9, 0.8] },
          { type: 'kitchenIsland', name: 'Calacatta Quartz Island with Brass Pendants', price: 75000, x: 4.4, z: -2.6, rot: 0, scale: [3.0, 0.9, 1.15] },
          { type: 'fridge', name: 'Smart French-Door Refrigerator', price: 68000, x: 7.4, z: -4.2, rot: -90, scale: [0.95, 1.95, 0.9] }
        ]
      },
      {
        id: 'p3',
        name: 'Presidential Primary Wing',
        type: 'bedroom',
        x: -4.0,
        z: 4.2,
        width: 8.4,
        depth: 5.8,
        floorType: 'hardwood',
        floorColor: '#582f0e',
        furniture: [
          { type: 'bedDouble', name: 'King Luxury Upholstered Bed with Nightstands', price: 58000, x: -4.0, z: 5.4, rot: 180, scale: [2.3, 0.68, 2.2] },
          { type: 'wardrobe', name: 'Custom Built-in 6-Door Wardrobe', price: 65000, x: -7.2, z: 3.2, rot: 90, scale: [3.0, 2.4, 0.7] },
          { type: 'desk', name: 'Executive Work Desk & Chair', price: 16500, x: -1.0, z: 5.4, rot: 180, scale: [1.5, 0.75, 0.7] }
        ]
      },
      {
        id: 'p4',
        name: 'Guest Quarters Suite',
        type: 'bedroom',
        x: 4.4,
        z: 4.2,
        width: 8.0,
        depth: 5.8,
        floorType: 'hardwood',
        floorColor: '#7f4f24',
        furniture: [
          { type: 'bedDouble', name: 'Queen Solid Teak Minimalist Bed', price: 38000, x: 4.4, z: 5.4, rot: 180, scale: [1.9, 0.62, 2.0] },
          { type: 'wardrobe', name: 'Built-in Guest Wardrobe', price: 45000, x: 7.4, z: 3.2, rot: -90, scale: [2.2, 2.3, 0.65] }
        ]
      }
    ],
    walls: [
      { start: [-8.6, -6.6], end: [8.8, -6.6], thickness: 0.28, height: 3.2, openings: [{ offset: 4.2, width: 2.8, type: 'window' }, { offset: 12.0, width: 2.8, type: 'window' }] },
      { start: [8.8, -6.6], end: [8.8, 7.6], thickness: 0.28, height: 3.2, openings: [{ offset: 4.5, width: 2.0, type: 'window' }, { offset: 10.5, width: 2.0, type: 'window' }] },
      { start: [8.8, 7.6], end: [-8.6, 7.6], thickness: 0.28, height: 3.2, openings: [{ offset: 6.8, width: 2.6, type: 'window' }] },
      { start: [-8.6, 7.6], end: [-8.6, -6.6], thickness: 0.28, height: 3.2, openings: [{ offset: 6.5, width: 1.3, type: 'door' }] },
      { start: [0.4, -6.6], end: [0.4, 0.8], thickness: 0.2, height: 3.2, openings: [{ offset: 3.2, width: 1.5, type: 'door' }] },
      { start: [-8.6, 0.8], end: [8.8, 0.8], thickness: 0.2, height: 3.2, openings: [{ offset: 3.0, width: 1.2, type: 'door' }, { offset: 12.0, width: 1.2, type: 'door' }] },
      { start: [0.4, 0.8], end: [0.4, 7.6], thickness: 0.2, height: 3.2 }
    ]
  },

  // 5. 3,000 SQ FT — Royal 5-BHK Grand Architectural Villa
  {
    id: 'plan-3000',
    sqFt: 3000,
    name: '3,000 SQ FT — Royal Grand Architectural Villa',
    type: 'Grand Villa Estate',
    bedrooms: 5,
    bathrooms: 4,
    ceilingHeight: 3.4,
    estimatedCost: 9800000,
    description: 'Palatial 3,000 sq ft luxury villa with central reception atrium, formal banquet hall, exhibition chef kitchen with island, presidential master wing, junior suites, and private veranda.',
    rooms: [
      {
        id: 'v1',
        name: 'Palatial Great Salon',
        type: 'living',
        x: -4.4,
        z: -3.2,
        width: 9.4,
        depth: 7.4,
        floorType: 'marble',
        floorColor: '#f8fafc',
        furniture: [
          { type: 'sofa', name: 'Italian Leather Sectional Sofa', price: 48000, x: -6.0, z: -3.2, rot: 90, scale: [3.0, 0.8, 1.2] },
          { type: 'coffeeTable', name: 'Tempered Glass Coffee Table', price: 11500, x: -3.8, z: -3.2, rot: 0, scale: [1.6, 0.4, 0.9] },
          { type: 'tvUnit', name: '75" 4K TV & Media Console', price: 72000, x: -1.2, z: -3.2, rot: -90, scale: [2.4, 0.5, 0.48] },
          { type: 'rug', name: 'Moroccan Wool Rug', price: 12000, x: -4.4, z: -3.2, rot: 0, scale: [3.8, 0.02, 3.0] },
          { type: 'diningTable', name: '6-Seater Oak Dining Set', price: 42000, x: -5.2, z: -6.0, rot: 0, scale: [2.2, 0.75, 1.1] },
          { type: 'plant', name: 'Indoor Fiddle Leaf Fig', price: 3500, x: -1.2, z: -6.2, rot: 0, scale: [0.7, 1.6, 0.7] }
        ]
      },
      {
        id: 'v2',
        name: 'Chef Exhibition Kitchen & Atrium',
        type: 'kitchen',
        x: 4.8,
        z: -3.2,
        width: 8.8,
        depth: 7.4,
        floorType: 'tile',
        floorColor: '#cbd5e1',
        furniture: [
          { type: 'kitchenCounter', name: 'Modular Quartz Countertop & Sink', price: 95000, x: 4.8, z: -6.0, rot: 0, scale: [5.4, 0.9, 0.8] },
          { type: 'kitchenIsland', name: 'Calacatta Quartz Island with Brass Pendants', price: 75000, x: 4.8, z: -3.0, rot: 0, scale: [3.4, 0.9, 1.2] },
          { type: 'fridge', name: 'Smart Refrigerator', price: 68000, x: 8.2, z: -4.8, rot: -90, scale: [1.0, 1.95, 0.9] }
        ]
      },
      {
        id: 'v3',
        name: 'Presidential Master Suite',
        type: 'bedroom',
        x: -4.4,
        z: 4.8,
        width: 9.4,
        depth: 6.8,
        floorType: 'hardwood',
        floorColor: '#582f0e',
        furniture: [
          { type: 'bedDouble', name: 'King Luxury Upholstered Bed with Nightstands', price: 58000, x: -4.4, z: 6.4, rot: 180, scale: [2.4, 0.7, 2.3] },
          { type: 'wardrobe', name: 'Custom Built-in 6-Door Wardrobe', price: 65000, x: -7.8, z: 3.8, rot: 90, scale: [3.4, 2.5, 0.7] },
          { type: 'desk', name: 'Executive Work Desk & Chair', price: 16500, x: -1.4, z: 6.4, rot: 180, scale: [1.6, 0.75, 0.75] }
        ]
      },
      {
        id: 'v4',
        name: 'Junior Executive Suite',
        type: 'bedroom',
        x: 4.8,
        z: 4.8,
        width: 8.8,
        depth: 6.8,
        floorType: 'hardwood',
        floorColor: '#7f4f24',
        furniture: [
          { type: 'bedDouble', name: 'Queen Solid Teak Minimalist Bed', price: 38000, x: 4.8, z: 6.4, rot: 180, scale: [2.0, 0.65, 2.1] },
          { type: 'wardrobe', name: 'Guest Wardrobe', price: 45000, x: 8.2, z: 3.8, rot: -90, scale: [2.6, 2.4, 0.65] }
        ]
      }
    ],
    walls: [
      { start: [-9.5, -7.2], end: [9.6, -7.2], thickness: 0.28, height: 3.4, openings: [{ offset: 4.8, width: 3.0, type: 'window' }, { offset: 13.5, width: 3.0, type: 'window' }] },
      { start: [9.6, -7.2], end: [9.6, 8.6], thickness: 0.28, height: 3.4, openings: [{ offset: 5.5, width: 2.2, type: 'window' }, { offset: 12.5, width: 2.2, type: 'window' }] },
      { start: [9.6, 8.6], end: [-9.5, 8.6], thickness: 0.28, height: 3.4, openings: [{ offset: 8.5, width: 2.8, type: 'window' }] },
      { start: [-9.5, 8.6], end: [-9.5, -7.2], thickness: 0.28, height: 3.4, openings: [{ offset: 7.5, width: 1.4, type: 'door' }] },
      { start: [0.4, -7.2], end: [0.4, 1.2], thickness: 0.2, height: 3.4, openings: [{ offset: 3.8, width: 1.8, type: 'door' }] },
      { start: [-9.5, 1.2], end: [9.6, 1.2], thickness: 0.2, height: 3.4, openings: [{ offset: 3.5, width: 1.2, type: 'door' }, { offset: 13.5, width: 1.2, type: 'door' }] },
      { start: [0.4, 1.2], end: [0.4, 8.6], thickness: 0.2, height: 3.4 }
    ]
  }
];
