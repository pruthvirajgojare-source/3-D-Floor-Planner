3D Floor Planner 📐🏠

An interactive, web-based 3D architectural floor planning and interior design application built for seamless drafting, spatial layout customization, and real-time 3D rendering.



License: MIT




Node.js Version




React / R3F




PRs Welcome

🌟 Overview

3D Floor Planner bridges the gap between 2D technical architectural drafting and photorealistic 3D visualization. Designed for architects, interior designers, real estate enthusiasts, and DIY home renovators, it provides a fluid, dual-view interface allowing users to sketch floor plans, place structural fixtures, drag-and-drop furnished models, and instantly orbit through a rendered 3D space.

✨ Features

⚬ ✍️ 2D Cad Grid Editor: Intuitive grid layout editor with precise snapping, wall extrusion, angle snapping, and measurement guides.

⚬ 🧊 Real-Time 3D Rendering: Instant synchronization between 2D drafts and 3D scenes using WebGL/Three.js lighting and physics rendering.

⚬ 🚪 Structural Fixtures: Insert doors, windows, glass panels, and wall openings with parametric height and width adjustments.

⚬ 🛋️ Furniture Catalog: Interactive asset library with drag-and-drop support for residential and commercial 3D furniture models.

⚬ 🎨 Material & Texture Customization: Apply realistic floor textures (hardwood, tile, carpet) and custom paint colors to walls and surfaces.

⚬ 📸 Perspective & Camera Controls: Toggle between 2D Top-Down Draft, 3D Dollhouse View, and First-Person Walkthrough modes.

⚬ 💾 Import & Export Capabilities: Save and export floor plans as high-resolution images, JSON layout blueprints, or 3D object models (.obj / .gltf).

🕹️ Interactive Controls

View Mode	Action	Controls
2D Draft	Pan Canvas	Middle Click + Drag or Spacebar + Left Click
2D Draft	Draw Wall	Left Click to start wall \rightarrow Move mouse \rightarrow Left Click to lock segment
2D Draft	Zoom In / Out	Scroll Wheel
3D Mode	Orbit Camera	Left Click + Drag
3D Mode	Pan Camera	Right Click + Drag
3D Mode	Zoom Camera	Scroll Wheel
Walkthrough	Navigation	W, A, S, D or Arrow Keys
Walkthrough	Look Around	Mouse Move (Pointer Lock)

🧰 Tech Stack

⚬ Frontend Framework: React.js / Next.js

⚬ 3D & Graphics Pipeline: Three.js / React Three Fiber / @react-three/drei

⚬ State Management: Zustand / Redux Toolkit

⚬ Styling & UI: Tailwind CSS / Lucide Icons

⚬ Build System: Vite / Webpack

🏗️ Project Directory Structure

[text]
3-D-Floor-Planner/
├── public/
├── src/
│   ├── assets/              # Textures, 3D GLTF models, and static media
│   ├── components/
│   │   ├── 2d/              # 2D Grid Canvas, Drawing Tools, Wall Generators
│   │   ├── 3d/              # Three.js Scenes, Lighting, Camera Controls, Mesh Generators
│   │   ├── ui/              # Toolbars, Sidebars, Modals, Catalog Pickers
│   │   └── common/          # Reusable UI components
│   ├── store/               # Application state management (Zustand/Redux)
│   ├── utils/               # Geometry calculations, SVG path parsers, export scripts
│   ├── constants/           # Preset materials, furniture catalog definitions
│   ├── App.jsx              # Main App entry point
│   └── main.jsx             # React DOM renderer
├── .env.example             # Environment configuration template
├── package.json             # NPM project metadata and dependencies
└── README.md                # Project documentation


⚙️ Installation & Local Setup

Prerequisites

⚬ Node.js: v18.0.0 or higher

⚬ Package Manager: npm (v9+) or yarn

Quick Start

1. Clone the repository:

[bash]
git clone https://github.com/pruthvirajgojare-source/3-D-Floor-Planner.git
cd 3-D-Floor-Planner


2. Install project dependencies:

[bash]
npm install


3. Configure Environment Variables:

[bash]
cp .env.example .env.local


4. Launch the development server:

[bash]
npm run dev


5. Access the application:
Open your browser and navigate to http://localhost:5173 (or the URL displayed in your console).

💡 Step-by-Step Usage Guide

1. Define Room Outer Boundaries:

	⚬ Select the Wall Tool from the toolbar.

	⚬ Click anywhere on the 2D grid to place wall anchor points. Close the loop to create a closed room.

2. Add Structural Elements:

	⚬ Select Doors or Windows from the catalog.

	⚬ Hover over an existing wall segment to snap and place the fixture in place.

3. Furnish and Decorate:

	⚬ Open the Furniture Asset Catalog panel.

	⚬ Drag items (tables, chairs, beds) directly into your room layout.

	⚬ Click on placed items to rotate, scale, or reposition.

4. Render in 3D:

	⚬ Toggle the top toolbar switch from 2D to 3D.

	⚬ Use your mouse to orbit around the layout, adjust wall colors, or enter First-Person Walkthrough Mode.

5. Save or Export Your Project:

	⚬ Click Export to save your layout configuration as a .json blueprint or render a photo snapshot.

🔧 Environment Variables

Rename .env.example to .env.local and configure optional keys:

[env]
# Server Configuration
VITE_PORT=5173

# Feature Flags
VITE_ENABLE_HIGH_QUALITY_SHADOWS=true
VITE_ENABLE_WALKTHROUGH_MODE=true

# Analytics / Third-party Services (Optional)
VITE_ANALYTICS_ID=


🗺️ Development Roadmap

⚬ [x] Core 2D wall drafting engine with grid snapping.

⚬ [x] Dynamic 2D-to-3D wall extrusion pipeline.

⚬ [x] Basic furniture model loading (GLTF/GLB formats).

⚬ [ ] Multi-floor / multi-story layout support.

⚬ [ ] Procedural roof creation tool.

⚬ [ ] Photorealistic lighting and shadow baking system.

⚬ [ ] Cloud save & user layout sharing platform.

🤝 Contributing

Contributions make the open-source community an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

1. Fork the Project.

2. Create your Feature Branch (git checkout -b feature/AmazingFeature).

3. Commit your Changes (git commit -m 'Add some AmazingFeature').

4. Push to the Branch (git push origin feature/AmazingFeature).

5. Open a Pull Request.

📜 License

Distributed under the MIT License. See LICENSE for more information.

👤 Author

Pruthviraj Gojare

⚬ GitHub: @pruthvirajgojare-source

⚬ Repository: 3-D-Floor-Planner
