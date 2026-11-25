# Mohamed Hashin S — Software Engineer Portfolio

Personal software engineering portfolio built with semantic HTML5, modern CSS3, and vanilla JavaScript. Designed to run directly in any browser and deploy seamlessly via GitHub Pages with zero build step.

## Project Structure

```text
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── assets/
│   ├── icons/
│   │   └── favicon.svg
│   ├── images/
│   │   └── og-preview.svg
│   └── resume/
│       └── Mohamed_Hashin_S_Resume.pdf
└── README.md
```

## Features

- Dark technical aesthetic (`#08090D`, `#101116`, `#14161D`) with subtle grid and controlled blue/violet accents
- Floating sticky navigation bar with active section detection and accessible mobile drawer
- Interactive hero workbench switching between Cursorly, CompassLink, and Edge-Core orchestrator modules
- Featured project showcase:
  - **Cursorly** — interactive trackpad surface with live smoothed delta readout and transport switching
  - **CompassLink** — live HTML5 Canvas 3D smartphone orientation preview with drag-to-orbit and telemetry
  - **FairScore** — explainable & fair credit risk analytics dashboard mockup
  - **Smartwatch UI Replica** — interactive Fastrack FT_A9508-inspired watch interface with switchable screens
- Categorized technical skills, VIT Parallax Hackathon Runner-Up spotlight, certifications, DSA foundations, and copy-to-clipboard contact flow
- Centralized `PORTFOLIO_CONFIG` in `js/script.js` for updating links, resume path, and project repository URLs

## Run Locally

Open `index.html` directly in a browser, or serve the folder over a local static server:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.
