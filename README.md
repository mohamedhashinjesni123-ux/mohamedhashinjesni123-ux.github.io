# Mohamed Hashin S — Software Engineer Portfolio

Personal software engineering portfolio built with semantic HTML5, modern CSS3, and vanilla JavaScript. Designed to run directly in any browser and deploy seamlessly via GitHub Pages with zero build step.

**Live Site:** [mohamedhashinjesni123-ux.github.io](https://mohamedhashinjesni123-ux.github.io/)

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
│   ├── projects/
│   │   ├── compasslink/
│   │   ├── cursorly/
│   │   ├── fairscore/
│   │   ├── orbit/
│   │   └── smartwatch/
│   └── resume/
│       └── Mohamed_Hashin_S_Resume.pdf
├── robots.txt
├── sitemap.xml
└── README.md
```

## Features

- **Dark Mode (Default) & Light Mode Theme Toggle**
  - **Dark Mode (Red & Black):** Deep obsidian surfaces (`#070709`, `#0f0e11`, `#141216`) with crimson/red accents (`#ef4444`, `#f87171`, `#b91c1c`).
  - **Light Mode (Red & White):** Crisp white/neutral surfaces (`#ffffff`, `#fafafa`, `#fff5f5`) with high-contrast red accents (`#dc2626`, `#b91c1c`, `#991b1b`).
  - Header theme toggle (`#theme-toggle`) persists the selection in `localStorage`, updates `<meta name="theme-color">`, prevents flash on reload, and redraws theme-aware canvas elements immediately.
  - Red gradient `MH` SVG favicon (`assets/icons/favicon.svg`) and matching red-and-black Open Graph preview (`assets/images/og-preview.svg`).
- **Floating Navigation & Scroll UX** — Sticky pill navbar with animated active-section indicator, top scroll progress bar, responsive mobile drawer, and circular back-to-top progress button.
- **Interactive Engineering Workbench (Hero)** — Tabbed code, pipeline telemetry, and architecture node viewer across **Cursorly**, **CompassLink**, and **FairScore** modules.
- **01 / Featured Work**
  - **Cursorly** — Interactive trackpad simulator with smoothed delta readout and `WS` / `ADB` / `HID` transport switching, paired with Web Client UI screenshots.
  - **CompassLink** — Theme-aware HTML5 Canvas 3D smartphone orientation wireframe with drag-to-orbit telemetry, paired with a 3D dashboard capture.
  - **FairScore** — Explainable & fair credit risk visualization, multi-screen real app gallery, GitHub repo, and live demo.
  - **Smartwatch UI Replica** — Switchable real watch menu screenshot gallery (`Face`, `Apps`, `Stats`, `Quick`, `Sports`, `Alerts`), GitHub repo, and live demo.
- **02 / Technical Expertise & 03 / About & Education** — Categorized engineering stack (including **Android Studio** under Tooling & Environment), aligned academic profile (`9.03 CGPA`), and engineering principles.
- **04 / Achievements** — VIT Parallax Hackathon Runner-Up spotlight with live demo link ([orbit.aayu.sh](https://orbit.aayu.sh/)) and a step-by-step **Edge ↔ Core** workload migration replay (`Steady`, `Surge`, `Migrate`, `Settled`).
- **05 / Credentials, 06 / DSA & 07 / Contact** — Certifications showcase, algorithmic foundations banner, and one-click copy-to-clipboard email flow driven by `PORTFOLIO_CONFIG` in `js/script.js`.

## Run Locally

Open `index.html` directly in a browser, or serve the folder over a local static server:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.
