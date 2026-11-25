/**
 * Portfolio Configuration & Interactive Experience
 * Mohamed Hashin S — Software Engineer & Developer
 *
 * Update links, contact info, and project repository URLs in PORTFOLIO_CONFIG.
 */

const PORTFOLIO_CONFIG = {
  owner: {
    name: "Mohamed Hashin S",
    shortName: "Hashin",
    email: "mohamedhashins@gmail.com",
    githubUrl: "https://github.com/mhsatgit",
    linkedinUrl: "https://linkedin.com/in/mohamed-hashin-s-569151384",
    resumeUrl: "assets/resume/Mohamed_Hashin_S_Resume.pdf",
    resumeFilename: "Mohamed_Hashin_S_Resume.pdf",
  },
  projects: {
    cursorly: {
      title: "Cursorly",
      repoUrl: "https://github.com/mhsatgit/Cursorly",
    },
    compasslink: {
      title: "CompassLink",
      repoUrl: "https://github.com/mhsatgit/CompassLink",
    },
    fairscore: {
      title: "FairScore",
      // Configurable placeholder: paste the GitHub repository URL here when published.
      repoUrl: "",
    },
    smartwatch: {
      title: "Smartwatch UI Replica",
      // Configurable placeholder: paste the GitHub repository URL here when published.
      repoUrl: "",
    },
  },
};

const WORKBENCH_MODULES = {
  cursorly: {
    module: "Cursorly Input Engine",
    channel: "WebSocket · ADB · BLE HID",
    state: "Sub-pixel stream active",
    codeHtml:
      `<span class="tok-cm"># Cursorly — Adaptive One Euro jitter filter</span>\n` +
      `<span class="tok-kw">def</span> <span class="tok-fn">smooth_pointer</span>(dx: <span class="tok-ty">float</span>, dy: <span class="tok-ty">float</span>, dt: <span class="tok-ty">float</span>):\n` +
      `    cutoff = min_cutoff + beta * speed(dx, dy, dt)\n` +
      `    fx, fy = filter_x(dx, cutoff), filter_y(dy, cutoff)\n` +
      `    win32.send_input(accum_x.add(fx), accum_y.add(fy))\n` +
      `    <span class="tok-kw">return</span> {<span class="tok-str">"transport"</span>: <span class="tok-str">"ws+adb"</span>, <span class="tok-str">"subpixel"</span>: <span class="tok-num">True</span>}`,
  },
  compass: {
    module: "CompassLink Telemetry",
    channel: "SensorManager · ADB Reverse",
    state: "Quaternion stream locked",
    codeHtml:
      `<span class="tok-cm">// CompassLink — Quaternion orientation stream</span>\n` +
      `<span class="tok-kw">override fun</span> <span class="tok-fn">onSensorChanged</span>(event: <span class="tok-ty">SensorEvent</span>) {\n` +
      `    SensorManager.getQuaternionFromVector(quat, event.values)\n` +
      `    <span class="tok-kw">val</span> packet = <span class="tok-fn">OrientationFrame</span>(quat[<span class="tok-num">0</span>], quat[<span class="tok-num">1</span>], quat[<span class="tok-num">2</span>], quat[<span class="tok-num">3</span>])\n` +
      `    adbTunnel.emitJson(packet)\n` +
      `}`,
  },
  k3d: {
    module: "Edge-Core Orchestrator",
    channel: "K3d · Linux netem",
    state: "Workload migration ready",
    codeHtml:
      `<span class="tok-cm"># VIT Parallax — Dynamic Workload Migration</span>\n` +
      `<span class="tok-kw">controller</span>: <span class="tok-str">"edge-core-migrator"</span>\n` +
      `<span class="tok-kw">cluster</span>: <span class="tok-str">"k3d-edge-simulation"</span>\n` +
      `<span class="tok-kw">network_emulation</span>: <span class="tok-str">"netem-latency-profile"</span>\n` +
      `<span class="tok-kw">policy</span>: <span class="tok-str">"multi-objective-resource-balance"</span>\n` +
      `<span class="tok-kw">target_tier</span>: [<span class="tok-str">"edge"</span>, <span class="tok-str">"core"</span>, <span class="tok-str">"cloud"</span>]`,
  },
};

const prefersReducedMotion = () =>
  window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

let toastTimeoutId = null;

function showToast(message) {
  const toastEl = document.getElementById("toast");
  if (!toastEl) return;

  toastEl.textContent = message;
  toastEl.classList.add("is-visible");

  window.clearTimeout(toastTimeoutId);
  toastTimeoutId = window.setTimeout(() => {
    toastEl.classList.remove("is-visible");
  }, 2800);
}

/**
 * Hydrate links, contact info, project repository CTAs, and copyright year
 * from the centralized PORTFOLIO_CONFIG object.
 */
function applyPortfolioConfig() {
  const { owner, projects } = PORTFOLIO_CONFIG;

  document.querySelectorAll('[data-config-link="github"]').forEach((el) => {
    el.setAttribute("href", owner.githubUrl);
  });

  document.querySelectorAll('[data-config-link="linkedin"]').forEach((el) => {
    el.setAttribute("href", owner.linkedinUrl);
  });

  document.querySelectorAll('[data-config-link="email"]').forEach((el) => {
    el.setAttribute("href", `mailto:${owner.email}`);
  });

  document.querySelectorAll('[data-config-link="email-connect"]').forEach((el) => {
    el.setAttribute(
      "href",
      `mailto:${owner.email}?subject=${encodeURIComponent("Connecting via Portfolio")}`
    );
  });

  document.querySelectorAll('[data-config-link="resume"]').forEach((el) => {
    el.setAttribute("href", owner.resumeUrl);
    el.setAttribute("download", owner.resumeFilename);
  });

  const emailText = document.getElementById("contact-email-text");
  if (emailText) {
    emailText.textContent = owner.email;
  }

  document.querySelectorAll("[data-project-link]").forEach((anchor) => {
    const key = anchor.getAttribute("data-project-link");
    const project = projects[key];
    if (!project) return;

    if (project.repoUrl) {
      anchor.setAttribute("href", project.repoUrl);
      anchor.setAttribute("target", "_blank");
      anchor.setAttribute("rel", "noopener noreferrer");
      const label = anchor.querySelector(".project-cta-label");
      if (label) label.textContent = "View on GitHub";
    } else {
      anchor.setAttribute("href", owner.githubUrl);
      anchor.setAttribute("target", "_blank");
      anchor.setAttribute("rel", "noopener noreferrer");
      anchor.addEventListener("click", (event) => {
        event.preventDefault();
        showToast(
          `${project.title} repo URL is configurable in js/script.js (PORTFOLIO_CONFIG.projects.${key}.repoUrl).`
        );
      });
    }
  });

  const yearEl = document.getElementById("copyright-year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }
}

function initNavigation() {
  const header = document.getElementById("site-header");
  const mobileToggle = document.getElementById("mobile-menu-toggle");
  const mobileNav = document.getElementById("mobile-nav");
  const backToTop = document.getElementById("back-to-top");
  const navLinks = document.querySelectorAll(".nav-link, .mobile-nav-link");
  const sections = document.querySelectorAll("main section[id]");

  const setMobileMenuState = (open) => {
    if (!mobileToggle || !mobileNav) return;
    mobileToggle.setAttribute("aria-expanded", String(open));
    if (open) {
      mobileNav.removeAttribute("hidden");
    } else {
      mobileNav.setAttribute("hidden", "");
    }
  };

  if (mobileToggle && mobileNav) {
    mobileToggle.addEventListener("click", () => {
      const isOpen = mobileToggle.getAttribute("aria-expanded") === "true";
      setMobileMenuState(!isOpen);
    });

    mobileNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => setMobileMenuState(false));
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        setMobileMenuState(false);
      }
    });
  }

  const updateScrollUI = () => {
    const y = window.scrollY;
    if (header) {
      header.classList.toggle("is-scrolled", y > 24);
    }
    if (backToTop) {
      backToTop.classList.toggle("is-visible", y > 460);
    }
  };

  window.addEventListener("scroll", updateScrollUI, { passive: true });
  updateScrollUI();

  if (backToTop) {
    backToTop.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion() ? "auto" : "smooth",
      });
    });
  }

  if ("IntersectionObserver" in window && sections.length) {
    const setActiveSection = (id) => {
      navLinks.forEach((link) => {
        link.classList.toggle("is-active", link.getAttribute("data-section") === id);
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("id");
            if (id === "certifications" || id === "dsa") return;
            setActiveSection(id);
          }
        });
      },
      { rootMargin: "-35% 0px -50% 0px", threshold: 0.05 }
    );

    sections.forEach((sec) => observer.observe(sec));
  }
}

function initScrollReveals() {
  const targets = document.querySelectorAll(".reveal");
  if (!targets.length) return;

  if (prefersReducedMotion() || !("IntersectionObserver" in window)) {
    targets.forEach((el) => el.classList.add("is-revealed"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-revealed");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  targets.forEach((el) => observer.observe(el));
}

function initHeroWorkbench() {
  const tabs = document.querySelectorAll(".workbench-tab");
  const codeEl = document.getElementById("workbench-code");
  const modEl = document.getElementById("telemetry-module");
  const chanEl = document.getElementById("telemetry-channel");
  const stateEl = document.getElementById("telemetry-state");

  if (!tabs.length || !codeEl) return;

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const key = tab.getAttribute("data-tab");
      const data = WORKBENCH_MODULES[key];
      if (!data) return;

      tabs.forEach((t) => {
        const active = t === tab;
        t.classList.toggle("is-active", active);
        t.setAttribute("aria-selected", String(active));
      });

      codeEl.innerHTML = `<code>${data.codeHtml}</code>`;
      if (modEl) modEl.textContent = data.module;
      if (chanEl) chanEl.textContent = data.channel;
      if (stateEl) stateEl.textContent = data.state;
    });
  });
}

function initCursorlyTrackpad() {
  const surface = document.getElementById("cursorly-trackpad");
  const pointer = document.getElementById("cursorly-pointer");
  const ripple = document.getElementById("cursorly-ripple");
  const deltaEl = document.getElementById("cursorly-delta-val");
  const transportVal = document.getElementById("cursorly-transport-val");
  const transportButtons = document.querySelectorAll(".transport-pill");

  transportButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      transportButtons.forEach((b) => b.classList.toggle("is-active", b === btn));
      if (transportVal) {
        transportVal.textContent = btn.getAttribute("data-transport") || "WebSocket";
      }
    });
  });

  if (!surface || !pointer || !ripple) return;

  let targetX = 0.5;
  let targetY = 0.46;
  let currentX = 0.5;
  let currentY = 0.46;
  let pointerInside = false;

  surface.addEventListener("pointerenter", () => {
    pointerInside = true;
  });

  surface.addEventListener("pointerleave", () => {
    pointerInside = false;
    targetX = 0.5;
    targetY = 0.46;
  });

  surface.addEventListener("pointermove", (event) => {
    const rect = surface.getBoundingClientRect();
    targetX = Math.min(0.92, Math.max(0.08, (event.clientX - rect.left) / rect.width));
    targetY = Math.min(0.84, Math.max(0.12, (event.clientY - rect.top) / rect.height));
  });

  const animateTrackpad = (now) => {
    if (!pointerInside && !prefersReducedMotion()) {
      const t = now * 0.0014;
      targetX = 0.5 + Math.cos(t) * 0.16;
      targetY = 0.45 + Math.sin(t * 1.4) * 0.12;
    }

    const prevX = currentX;
    const prevY = currentY;
    const smoothing = prefersReducedMotion() ? 1 : 0.16;
    currentX += (targetX - currentX) * smoothing;
    currentY += (targetY - currentY) * smoothing;

    const xPct = `${(currentX * 100).toFixed(2)}%`;
    const yPct = `${(currentY * 100).toFixed(2)}%`;
    pointer.style.left = xPct;
    pointer.style.top = yPct;
    ripple.style.left = xPct;
    ripple.style.top = yPct;

    if (deltaEl) {
      const dx = ((currentX - prevX) * 140).toFixed(2);
      const dy = ((currentY - prevY) * 140).toFixed(2);
      const signX = Number(dx) >= 0 ? "+" : "";
      const signY = Number(dy) >= 0 ? "+" : "";
      deltaEl.textContent = `${signX}${dx}, ${signY}${dy} px`;
    }

    if (!prefersReducedMotion()) {
      window.requestAnimationFrame(animateTrackpad);
    }
  };

  if (!prefersReducedMotion()) {
    window.requestAnimationFrame(animateTrackpad);
  }
}

/**
 * Interactive 3D Canvas Handset Visualization for CompassLink.
 */
function initCompassCanvas() {
  const canvas = document.getElementById("compass-canvas");
  if (!canvas || !canvas.getContext) return;

  const ctx = canvas.getContext("2d");
  const headingEl = document.getElementById("telemetry-heading");
  const pitchEl = document.getElementById("telemetry-pitch");
  const rollEl = document.getElementById("telemetry-roll");
  const quatEl = document.getElementById("telemetry-quat");

  let yaw = 0.48;
  let pitch = -0.32;
  let roll = 0.16;
  let isDragging = false;
  let lastPointer = { x: 0, y: 0 };

  canvas.addEventListener("pointerdown", (e) => {
    isDragging = true;
    lastPointer = { x: e.clientX, y: e.clientY };
    canvas.setPointerCapture(e.pointerId);
  });

  canvas.addEventListener("pointermove", (e) => {
    if (!isDragging) return;
    const dx = e.clientX - lastPointer.x;
    const dy = e.clientY - lastPointer.y;
    lastPointer = { x: e.clientX, y: e.clientY };
    yaw += dx * 0.012;
    pitch = Math.max(-1.1, Math.min(1.1, pitch + dy * 0.012));
    if (prefersReducedMotion()) drawFrame();
  });

  const stopDrag = () => {
    isDragging = false;
  };
  canvas.addEventListener("pointerup", stopDrag);
  canvas.addEventListener("pointercancel", stopDrag);

  // Smartphone cuboid vertices (width, height, depth)
  const w = 42;
  const h = 80;
  const d = 6;
  const vertices = [
    [-w, -h, -d], [w, -h, -d], [w, h, -d], [-w, h, -d],
    [-w, -h, d],  [w, -h, d],  [w, h, d],  [-w, h, d],
  ];

  // Inner display rectangle slightly proud of front face
  const sw = 35;
  const sh = 68;
  const screenVerts = [
    [-sw, -sh, d + 0.5], [sw, -sh, d + 0.5], [sw, sh, d + 0.5], [-sw, sh, d + 0.5],
  ];

  const edges = [
    [0, 1], [1, 2], [2, 3], [3, 0],
    [4, 5], [5, 6], [6, 7], [7, 4],
    [0, 4], [1, 5], [2, 6], [3, 7],
  ];

  const rotatePoint = ([x, y, z]) => {
    // Roll (Z)
    const cz = Math.cos(roll), sz = Math.sin(roll);
    const x1 = x * cz - y * sz;
    const y1 = x * sz + y * cz;
    const z1 = z;

    // Pitch (X)
    const cx = Math.cos(pitch), sx = Math.sin(pitch);
    const y2 = y1 * cx - z1 * sx;
    const z2 = y1 * sx + z1 * cx;
    const x2 = x1;

    // Yaw (Y)
    const cy = Math.cos(yaw), sy = Math.sin(yaw);
    const x3 = x2 * cy + z2 * sy;
    const z3 = -x2 * sy + z2 * cy;
    const y3 = y2;

    const fov = 340;
    const scale = fov / (fov + z3 + 90);
    return [canvas.width / 2 + x3 * scale, canvas.height / 2 + y3 * scale, z3];
  };

  const updateTelemetry = () => {
    const deg = (rad) => (rad * 180) / Math.PI;
    const hDeg = (((deg(yaw) + 142) % 360) + 360) % 360;
    const pDeg = deg(pitch);
    const rDeg = deg(roll);

    if (headingEl) headingEl.textContent = `${hDeg.toFixed(1)}°`;
    if (pitchEl) pitchEl.textContent = `${pDeg >= 0 ? "+" : ""}${pDeg.toFixed(1)}°`;
    if (rollEl) rollEl.textContent = `${rDeg >= 0 ? "+" : ""}${rDeg.toFixed(1)}°`;

    const qw = Math.cos(yaw * 0.5) * Math.cos(pitch * 0.5);
    const qz = Math.sin(yaw * 0.5) * Math.cos(pitch * 0.5);
    if (quatEl) quatEl.textContent = `${qw.toFixed(2)}, ${qz.toFixed(2)}`;
  };

  const drawFrame = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Subtle reference horizon ring
    ctx.beginPath();
    ctx.ellipse(canvas.width / 2, canvas.height / 2 + 6, 110, 32, 0, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(96, 165, 250, 0.14)";
    ctx.lineWidth = 1;
    ctx.stroke();

    const proj = vertices.map(rotatePoint);
    const projScreen = screenVerts.map(rotatePoint);

    // Draw screen face fill
    ctx.beginPath();
    ctx.moveTo(projScreen[0][0], projScreen[0][1]);
    for (let i = 1; i < projScreen.length; i++) {
      ctx.lineTo(projScreen[i][0], projScreen[i][1]);
    }
    ctx.closePath();
    ctx.fillStyle = "rgba(59, 130, 246, 0.12)";
    ctx.fill();
    ctx.strokeStyle = "rgba(167, 139, 250, 0.45)";
    ctx.lineWidth = 1;
    ctx.stroke();

    // Draw chassis edges
    ctx.beginPath();
    edges.forEach(([a, b]) => {
      ctx.moveTo(proj[a][0], proj[a][1]);
      ctx.lineTo(proj[b][0], proj[b][1]);
    });
    ctx.strokeStyle = "rgba(245, 245, 247, 0.72)";
    ctx.lineWidth = 1.4;
    ctx.stroke();

    // Orientation center vector arrow
    const origin = rotatePoint([0, 0, 0]);
    const zAxis = rotatePoint([0, 0, 56]);
    ctx.beginPath();
    ctx.moveTo(origin[0], origin[1]);
    ctx.lineTo(zAxis[0], zAxis[1]);
    ctx.strokeStyle = "#60a5fa";
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(zAxis[0], zAxis[1], 3.5, 0, Math.PI * 2);
    ctx.fillStyle = "#60a5fa";
    ctx.fill();

    updateTelemetry();
  };

  let lastTime = 0;
  const tick = (ts) => {
    const dt = lastTime ? Math.min(0.05, (ts - lastTime) / 1000) : 0.016;
    lastTime = ts;

    if (!isDragging && !prefersReducedMotion()) {
      yaw += dt * 0.55;
      pitch = -0.28 + Math.sin(ts * 0.0011) * 0.16;
      roll = Math.cos(ts * 0.0009) * 0.14;
    }

    drawFrame();
    if (!prefersReducedMotion()) {
      window.requestAnimationFrame(tick);
    }
  };

  drawFrame();
  if (!prefersReducedMotion()) {
    window.requestAnimationFrame(tick);
  }
}

function initSmartwatchPreview() {
  const tabs = document.querySelectorAll(".watch-tab");
  const views = document.querySelectorAll(".watch-view");
  const timeEl = document.getElementById("watch-time");
  const dateEl = document.getElementById("watch-date");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const target = tab.getAttribute("data-watch-screen");
      tabs.forEach((t) => t.classList.toggle("is-active", t === tab));
      views.forEach((v) =>
        v.classList.toggle("is-active", v.getAttribute("data-screen") === target)
      );
    });
  });

  const updateWatchClock = () => {
    const now = new Date();
    if (timeEl) {
      const hh = String(now.getHours()).padStart(2, "0");
      const mm = String(now.getMinutes()).padStart(2, "0");
      timeEl.textContent = `${hh}:${mm}`;
    }
    if (dateEl) {
      const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
      const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
      dateEl.textContent = `${days[now.getDay()]} ${now.getDate()} ${months[now.getMonth()]}`;
    }
  };

  updateWatchClock();
  window.setInterval(updateWatchClock, 30000);
}

function initCopyEmail() {
  const copyBtn = document.getElementById("copy-email-btn");
  if (!copyBtn) return;

  copyBtn.addEventListener("click", async () => {
    const email = PORTFOLIO_CONFIG.owner.email;
    let copied = false;

    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(email);
        copied = true;
      } catch {
        copied = false;
      }
    }

    if (!copied) {
      const helper = document.createElement("textarea");
      helper.value = email;
      helper.setAttribute("readonly", "");
      helper.style.position = "fixed";
      helper.style.opacity = "0";
      document.body.appendChild(helper);
      helper.select();
      try {
        copied = document.execCommand("copy");
      } catch {
        copied = false;
      }
      document.body.removeChild(helper);
    }

    if (copied) {
      const label = copyBtn.querySelector("span");
      if (label) {
        const original = label.textContent;
        label.textContent = "Email Copied";
        window.setTimeout(() => {
          label.textContent = original;
        }, 2200);
      }
      showToast(`Copied ${email} to clipboard.`);
    } else {
      showToast(`Email: ${email}`);
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  applyPortfolioConfig();
  initNavigation();
  initScrollReveals();
  initHeroWorkbench();
  initCursorlyTrackpad();
  initCompassCanvas();
  initSmartwatchPreview();
  initCopyEmail();

  if (window.lucide && typeof window.lucide.createIcons === "function") {
    window.lucide.createIcons();
  }
});
