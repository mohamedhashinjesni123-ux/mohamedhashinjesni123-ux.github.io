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
      repoUrl: "https://github.com/mhsatgit/cursorly",
    },
    compasslink: {
      title: "CompassLink",
      repoUrl: "https://github.com/mhsatgit/compasslink",
    },
    fairscore: {
      title: "FairScore",
      repoUrl: "https://github.com/mhsatgit/fairscore",
      liveUrl: "https://mhsatgit.github.io/fairscore/",
    },
    smartwatch: {
      title: "Smartwatch UI Replica",
      repoUrl: "https://github.com/mhsatgit/smartwatch",
      liveUrl: "https://mhsatgit.github.io/smartwatch/",
    },
  },
};

const WORKBENCH_MODULES = {
  cursorly: {
    file: "cursorly/engine/filter_one_euro.py",
    repoUrl: "https://github.com/mhsatgit/cursorly",
    module: "Mobile-to-PC Input Engine",
    channel: "WS · ADB · RFCOMM · HID",
    state: "Win32 SendInput + 1ms timer",
    archNodes: ["Android / Browser", "1€ Filter + Gestures", "Windows Host Input"],
    codeHtml:
      `<span class="tok-cm"># Cursorly — Adaptive 1€ filter + sub-pixel</span>\n` +
      `<span class="tok-kw">def</span> <span class="tok-fn">process_delta</span>(dx: <span class="tok-ty">float</span>, dy: <span class="tok-ty">float</span>, dt: <span class="tok-ty">float</span>):\n` +
      `    fx, fy = one_euro_2d.filter(dx, dy, dt)\n` +
      `    ix, iy = subpixel_accum.accumulate(fx, fy)\n` +
      `    win32_mouse.send_relative(ix, iy)\n` +
      `    <span class="tok-kw">return</span> {<span class="tok-str">"packet"</span>: <span class="tok-str">"!BBffd"</span>, <span class="tok-str">"bytes"</span>: <span class="tok-num">18</span>}`,
  },
  compass: {
    file: "android/.../UsbSensorTransport.kt",
    repoUrl: "https://github.com/mhsatgit/compasslink",
    module: "Quaternion Sensor Bridge",
    channel: "SensorManager · ADB Reverse",
    state: "3D Canvas + Windows Input",
    archNodes: ["Phone SensorManager", "ADB Tunnel :8765", "Node.js + 3D Canvas"],
    codeHtml:
      `<span class="tok-cm">// CompassLink — [x, y, z, w] orientation stream</span>\n` +
      `<span class="tok-kw">override fun</span> <span class="tok-fn">onSensorChanged</span>(ev: <span class="tok-ty">SensorEvent</span>) {\n` +
      `    SensorManager.getQuaternionFromVector(\n` +
      `        q, ev.values\n` +
      `    )\n` +
      `    <span class="tok-kw">val</span> f = <span class="tok-fn">Orientation</span>(q[<span class="tok-num">1</span>], q[<span class="tok-num">2</span>], q[<span class="tok-num">3</span>], q[<span class="tok-num">0</span>])\n` +
      `    adbTcpBridge.emitNdjson(f)\n` +
      `}`,
  },
  fairscore: {
    file: "apps/api/app/services/explainability.py",
    repoUrl: "https://github.com/mhsatgit/fairscore",
    module: "Fair Credit Intelligence",
    channel: "FastAPI · scikit-learn · Fairlearn",
    state: "Guarded XAI + Audit UI",
    archNodes: ["Applicant Input", "RF + Fairlearn Audit", "Next.js Dashboard"],
    codeHtml:
      `<span class="tok-cm"># FairScore — Guarded local explanations</span>\n` +
      `<span class="tok-kw">if</span> feat <span class="tok-kw">in</span> EXCLUDED_EXPLANATION_FEATURES:\n` +
      `    <span class="tok-kw">continue</span>  <span class="tok-cm"># omit protected attributes</span>\n` +
      `sem = <span class="tok-fn">_semantic_impact</span>(feat, value)\n` +
      `<span class="tok-kw">if</span> sem <span class="tok-kw">and</span> sem != model_impact:\n` +
      `    <span class="tok-kw">continue</span>  <span class="tok-cm"># suppress polarity conflict</span>`,
  },
};

const prefersReducedMotion = () =>
  window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const isFinePointerDesktop = () =>
  window.matchMedia &&
  window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
  !prefersReducedMotion();

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
    if (!project || !project.repoUrl) return;

    anchor.setAttribute("href", project.repoUrl);
    anchor.setAttribute("target", "_blank");
    anchor.setAttribute("rel", "noopener noreferrer");
  });

  document.querySelectorAll("[data-project-demo]").forEach((anchor) => {
    const key = anchor.getAttribute("data-project-demo");
    const project = projects[key];
    if (!project || !project.liveUrl) return;

    anchor.setAttribute("href", project.liveUrl);
    anchor.setAttribute("target", "_blank");
    anchor.setAttribute("rel", "noopener noreferrer");
  });

  const yearEl = document.getElementById("copyright-year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }
}

function initThemeToggle() {
  const STORAGE_KEY = "portfolio-theme";
  const root = document.documentElement;
  const toggleBtn = document.getElementById("theme-toggle");
  const themeMeta = document.querySelector('meta[name="theme-color"]');

  const getCurrentTheme = () =>
    root.getAttribute("data-theme") === "light" ? "light" : "dark";

  const syncThemeUI = (theme) => {
    const isLight = theme === "light";
    root.setAttribute("data-theme", theme);
    if (themeMeta) {
      themeMeta.setAttribute("content", isLight ? "#ffffff" : "#070709");
    }
    if (toggleBtn) {
      const nextLabel = isLight ? "Switch to dark mode" : "Switch to light mode";
      toggleBtn.setAttribute("aria-pressed", String(isLight));
      toggleBtn.setAttribute("aria-label", nextLabel);
      toggleBtn.setAttribute("title", nextLabel);
    }
  };

  syncThemeUI(getCurrentTheme());

  if (!toggleBtn) return;

  toggleBtn.addEventListener("click", () => {
    const nextTheme = getCurrentTheme() === "light" ? "dark" : "light";
    syncThemeUI(nextTheme);
    try {
      window.localStorage.setItem(STORAGE_KEY, nextTheme);
    } catch {
      // Ignore storage errors in restricted browsing contexts
    }
    document.dispatchEvent(new CustomEvent("portfolio:themechange", { detail: { theme: nextTheme } }));
  });
}

function initNavigation() {
  const header = document.getElementById("site-header");
  const mobileToggle = document.getElementById("mobile-menu-toggle");
  const mobileNav = document.getElementById("mobile-nav");
  const backToTop = document.getElementById("back-to-top");
  const backToTopRing = document.getElementById("back-to-top-ring-fill");
  const progressBar = document.getElementById("scroll-progress-bar");
  const desktopNav = document.querySelector(".desktop-nav");
  const navIndicator = document.getElementById("nav-indicator");
  const navLinks = document.querySelectorAll(".nav-link[data-section], .mobile-nav-link[data-section]");

  const ringCircumference = 2 * Math.PI * 20;
  let mobileCloseTimer = null;

  const setMobileMenuState = (open) => {
    if (!mobileToggle || !mobileNav) return;
    window.clearTimeout(mobileCloseTimer);
    mobileToggle.setAttribute("aria-expanded", String(open));

    if (open) {
      mobileNav.removeAttribute("hidden");
      window.requestAnimationFrame(() => {
        mobileNav.classList.add("is-open");
      });
    } else {
      mobileNav.classList.remove("is-open");
      if (prefersReducedMotion()) {
        mobileNav.setAttribute("hidden", "");
      } else {
        mobileCloseTimer = window.setTimeout(() => {
          if (!mobileNav.classList.contains("is-open")) {
            mobileNav.setAttribute("hidden", "");
          }
        }, 250);
      }
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

    document.addEventListener("click", (event) => {
      if (
        mobileToggle.getAttribute("aria-expanded") === "true" &&
        !mobileNav.contains(event.target) &&
        !mobileToggle.contains(event.target)
      ) {
        setMobileMenuState(false);
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && mobileToggle.getAttribute("aria-expanded") === "true") {
        setMobileMenuState(false);
        mobileToggle.focus();
      }
    });
  }

  let scrollUiRaf = false;
  const updateScrollUI = () => {
    scrollUiRaf = false;
    const y = window.scrollY;
    const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const ratio = Math.min(1, Math.max(0, y / maxScroll));

    if (header) {
      header.classList.toggle("is-scrolled", y > 24);
    }
    if (backToTop) {
      backToTop.classList.toggle("is-visible", y > 460);
    }
    if (progressBar) {
      progressBar.style.transform = `scaleX(${ratio.toFixed(4)})`;
    }
    if (backToTopRing) {
      backToTopRing.style.strokeDashoffset = (ringCircumference * (1 - ratio)).toFixed(2);
    }
  };

  const scheduleScrollUI = () => {
    if (scrollUiRaf) return;
    scrollUiRaf = true;
    window.requestAnimationFrame(updateScrollUI);
  };

  window.addEventListener("scroll", scheduleScrollUI, { passive: true });
  window.addEventListener("resize", scheduleScrollUI, { passive: true });
  updateScrollUI();

  if (backToTop) {
    backToTop.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion() ? "auto" : "smooth",
      });
    });
  }

  const moveNavIndicator = (activeDesktopLink) => {
    if (!desktopNav || !navIndicator || !activeDesktopLink) return;
    if (desktopNav.offsetParent === null) return;

    const width = activeDesktopLink.offsetWidth;
    const left = activeDesktopLink.offsetLeft;
    if (width <= 0) return;

    desktopNav.classList.add("has-indicator");
    navIndicator.style.width = `${width}px`;
    navIndicator.style.transform = `translate3d(${left}px, 0, 0)`;
    navIndicator.classList.add("is-ready");
  };

  // Track sections corresponding to nav links on the current page
  const navIds = Array.from(
    new Set(
      Array.from(navLinks)
        .map((l) => l.getAttribute("data-section"))
        .filter(Boolean)
    )
  );
  const trackedSections = navIds
    .map((id) => document.getElementById(id))
    .filter(Boolean)
    .sort((a, b) => a.offsetTop - b.offsetTop);

  if (navLinks.length && trackedSections.length) {
    const trackedIds = new Set(trackedSections.map((sec) => sec.id));
    let currentActiveId = trackedSections[0].id;

    const setActiveSection = (id) => {
      currentActiveId = id;
      let activeDesktopLink = null;
      navLinks.forEach((link) => {
        const isActive = link.getAttribute("data-section") === id;
        link.classList.toggle("is-active", isActive);
        if (isActive) {
          link.setAttribute("aria-current", "page");
          if (link.classList.contains("nav-link")) {
            activeDesktopLink = link;
          }
        } else {
          link.removeAttribute("aria-current");
        }
      });
      moveNavIndicator(activeDesktopLink);
    };

    let pendingTargetId = null;
    let pendingTimerId = null;

    const clearPendingTarget = () => {
      pendingTargetId = null;
      if (pendingTimerId !== null) {
        window.clearTimeout(pendingTimerId);
        pendingTimerId = null;
      }
    };

    const activateTargetOnNavigate = (id) => {
      if (!id || !trackedIds.has(id)) return;
      clearPendingTarget();
      pendingTargetId = id;
      pendingTimerId = window.setTimeout(() => {
        clearPendingTarget();
        syncActiveSectionFallback();
      }, 1000);
      setActiveSection(id);
    };

    const syncActiveSectionFallback = () => {
      const doc = document.documentElement;
      const atBottom = window.innerHeight + window.scrollY >= doc.scrollHeight - 4;
      const probeY = Math.min(Math.max(window.innerHeight * 0.35, 120), 260);

      if (pendingTargetId) {
        const target = document.getElementById(pendingTargetId);
        const rect = target ? target.getBoundingClientRect() : null;
        const arrived =
          !rect ||
          (atBottom && pendingTargetId === trackedSections[trackedSections.length - 1].id) ||
          (rect.top <= probeY && rect.top >= -40);
        if (!arrived) {
          setActiveSection(pendingTargetId);
          return;
        }
        clearPendingTarget();
      }

      if (atBottom) {
        setActiveSection(trackedSections[trackedSections.length - 1].id);
        return;
      }

      let activeId = trackedSections[0].id;
      for (const section of trackedSections) {
        if (section.getBoundingClientRect().top <= probeY) {
          activeId = section.id;
        } else {
          break;
        }
      }
      setActiveSection(activeId);
    };

    if ("IntersectionObserver" in window) {
      const visibleRatios = new Map();
      const sectionObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            visibleRatios.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
          });

          if (pendingTargetId) {
            syncActiveSectionFallback();
            return;
          }

          const doc = document.documentElement;
          if (window.innerHeight + window.scrollY >= doc.scrollHeight - 4) {
            setActiveSection(trackedSections[trackedSections.length - 1].id);
            return;
          }
          if (window.scrollY < 80) {
            setActiveSection(trackedSections[0].id);
            return;
          }

          let bestId = null;
          let bestRatio = 0;
          trackedSections.forEach((sec) => {
            const ratio = visibleRatios.get(sec.id) || 0;
            if (ratio > bestRatio) {
              bestRatio = ratio;
              bestId = sec.id;
            }
          });

          if (bestId) {
            setActiveSection(bestId);
          } else {
            syncActiveSectionFallback();
          }
        },
        {
          rootMargin: "-22% 0px -48% 0px",
          threshold: [0, 0.15, 0.35, 0.6],
        }
      );

      trackedSections.forEach((sec) => sectionObserver.observe(sec));
    }

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", () => {
        const href = anchor.getAttribute("href");
        if (!href || href.length < 2) return;
        activateTargetOnNavigate(href.slice(1));
      });
    });

    ["wheel", "touchstart"].forEach((evt) => {
      window.addEventListener(evt, clearPendingTarget, { passive: true });
    });

    window.addEventListener("keydown", (event) => {
      if (["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " "].includes(event.key)) {
        clearPendingTarget();
      }
    });

    const repositionIndicator = () => {
      const activeDesktop = document.querySelector(`.desktop-nav .nav-link[data-section="${currentActiveId}"]`);
      moveNavIndicator(activeDesktop);
    };

    window.addEventListener("scroll", syncActiveSectionFallback, { passive: true });
    window.addEventListener("resize", repositionIndicator, { passive: true });
    window.addEventListener("hashchange", syncActiveSectionFallback);

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(repositionIndicator);
    }

    syncActiveSectionFallback();
  }
}

function initScrollReveals() {
  const targets = Array.from(document.querySelectorAll(".reveal"));
  if (!targets.length) return;

  if (prefersReducedMotion() || !("IntersectionObserver" in window)) {
    targets.forEach((el) => el.classList.add("is-revealed"));
    return;
  }

  const aboveFoldReveals = document.querySelectorAll("#home .reveal");
  const immediateSet = new Set(aboveFoldReveals);

  window.requestAnimationFrame(() => {
    aboveFoldReveals.forEach((el) => el.classList.add("is-revealed"));
  });

  const pending = new Set(targets.filter((el) => !immediateSet.has(el)));

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-revealed");
          pending.delete(entry.target);
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -36px 0px" }
  );

  pending.forEach((el) => observer.observe(el));

  let revealRaf = false;
  const revealAboveOrInView = () => {
    revealRaf = false;
    const cutoff = window.innerHeight - 24;
    pending.forEach((el) => {
      if (el.getBoundingClientRect().top <= cutoff) {
        el.classList.add("is-revealed");
        pending.delete(el);
        observer.unobserve(el);
      }
    });
    if (pending.size === 0) {
      window.removeEventListener("scroll", scheduleRevealSweep);
    }
  };

  const scheduleRevealSweep = () => {
    if (revealRaf || pending.size === 0) return;
    revealRaf = true;
    window.requestAnimationFrame(revealAboveOrInView);
  };

  window.addEventListener("scroll", scheduleRevealSweep, { passive: true });
  window.addEventListener("hashchange", scheduleRevealSweep);
  window.requestAnimationFrame(revealAboveOrInView);
}

function initHeroWorkbench() {
  const tabs = document.querySelectorAll(".workbench-tab");
  const codeEl = document.getElementById("workbench-code");
  const fileEl = document.getElementById("workbench-file");
  const repoLinkEl = document.getElementById("workbench-repo-link");
  const modEl = document.getElementById("telemetry-module");
  const chanEl = document.getElementById("telemetry-channel");
  const stateEl = document.getElementById("telemetry-state");
  const archNodes = [
    document.getElementById("arch-node-1"),
    document.getElementById("arch-node-2"),
    document.getElementById("arch-node-3"),
  ];

  if (!tabs.length || !codeEl) return;
  let switchTimer = null;

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const key = tab.getAttribute("data-tab");
      const data = WORKBENCH_MODULES[key];
      if (!data || tab.classList.contains("is-active")) return;

      tabs.forEach((t) => {
        const active = t === tab;
        t.classList.toggle("is-active", active);
        t.setAttribute("aria-selected", String(active));
      });

      const applySwap = () => {
        codeEl.innerHTML = `<code>${data.codeHtml}</code>`;
        if (fileEl) fileEl.textContent = data.file;
        if (repoLinkEl) repoLinkEl.setAttribute("href", data.repoUrl);
        if (modEl) modEl.textContent = data.module;
        if (chanEl) chanEl.textContent = data.channel;
        if (stateEl) stateEl.textContent = data.state;
        if (Array.isArray(data.archNodes)) {
          data.archNodes.forEach((label, idx) => {
            if (archNodes[idx]) archNodes[idx].textContent = label;
          });
        }
        codeEl.classList.remove("is-switching");
      };

      if (prefersReducedMotion()) {
        applySwap();
      } else {
        window.clearTimeout(switchTimer);
        codeEl.classList.add("is-switching");
        switchTimer = window.setTimeout(applySwap, 130);
      }
    });
  });
}

function initPreviewModeTabs() {
  const groups = document.querySelectorAll(".project-preview");
  groups.forEach((preview) => {
    const tabs = preview.querySelectorAll(".preview-mode-tab[data-preview-target]");
    const panes = preview.querySelectorAll(".preview-pane");
    if (!tabs.length || !panes.length) return;

    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const targetId = tab.getAttribute("data-preview-target");
        tabs.forEach((t) => {
          const active = t === tab;
          t.classList.toggle("is-active", active);
          t.setAttribute("aria-selected", String(active));
        });
        panes.forEach((pane) => {
          const match = pane.id === targetId;
          pane.classList.toggle("is-active", match);
          if (match) pane.removeAttribute("hidden");
          else pane.setAttribute("hidden", "");
        });
      });
    });
  });
}

function initInteractiveCards() {
  if (!isFinePointerDesktop()) return;

  const spotlightTargets = document.querySelectorAll(
    ".project-card, .skill-group, .workbench-card, .achievement-spotlight"
  );

  spotlightTargets.forEach((card) => {
    const isTiltCard = card.classList.contains("project-card");
    let framePending = false;
    let lastX = 0;
    let lastY = 0;
    let lastTarget = null;

    const updateCardEffect = () => {
      framePending = false;
      const rect = card.getBoundingClientRect();
      if (!rect.width || !rect.height) return;

      const x = lastX - rect.left;
      const y = lastY - rect.top;
      card.style.setProperty("--spot-x", `${x.toFixed(1)}px`);
      card.style.setProperty("--spot-y", `${y.toFixed(1)}px`);

      if (isTiltCard) {
        const overInteractivePreview =
          lastTarget && lastTarget.closest("#compass-canvas, .trackpad-surface, .watch-body");
        if (overInteractivePreview) {
          card.style.setProperty("--tilt-x", "0deg");
          card.style.setProperty("--tilt-y", "0deg");
          return;
        }
        const nx = (x / rect.width - 0.5) * 2;
        const ny = (y / rect.height - 0.5) * 2;
        const maxTilt = card.classList.contains("project-card--featured") ? 1.6 : 2.3;
        const tiltY = nx * maxTilt;
        const tiltX = -ny * maxTilt;
        card.style.setProperty("--tilt-x", `${tiltX.toFixed(2)}deg`);
        card.style.setProperty("--tilt-y", `${tiltY.toFixed(2)}deg`);
      }
    };

    card.addEventListener("pointermove", (event) => {
      lastX = event.clientX;
      lastY = event.clientY;
      lastTarget = event.target;
      if (!framePending) {
        framePending = true;
        window.requestAnimationFrame(updateCardEffect);
      }
    });

    card.addEventListener("pointerleave", () => {
      if (isTiltCard) {
        card.style.setProperty("--tilt-x", "0deg");
        card.style.setProperty("--tilt-y", "0deg");
      }
    });
  });
}

function initMagneticAndRipples() {
  const buttons = document.querySelectorAll(".btn");

  buttons.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      if (prefersReducedMotion()) return;
      const rect = btn.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const ripple = document.createElement("span");
      ripple.className = "btn-ripple";
      ripple.style.width = `${size}px`;
      ripple.style.height = `${size}px`;
      const cx = event.clientX ? event.clientX - rect.left : rect.width / 2;
      const cy = event.clientY ? event.clientY - rect.top : rect.height / 2;
      ripple.style.left = `${cx - size / 2}px`;
      ripple.style.top = `${cy - size / 2}px`;
      btn.appendChild(ripple);

      const cleanup = () => ripple.remove();
      ripple.addEventListener("animationend", cleanup, { once: true });
      window.setTimeout(cleanup, 650);
    });
  });

  if (!isFinePointerDesktop()) return;

  const magneticTargets = document.querySelectorAll(".btn-primary, .btn-nav");
  magneticTargets.forEach((el) => {
    let rafId = null;

    el.addEventListener("pointermove", (event) => {
      const rect = el.getBoundingClientRect();
      const dx = ((event.clientX - rect.left) / rect.width - 0.5) * 8;
      const dy = ((event.clientY - rect.top) / rect.height - 0.5) * 6;
      if (rafId) window.cancelAnimationFrame(rafId);
      rafId = window.requestAnimationFrame(() => {
        el.style.transform = `translate3d(${dx.toFixed(2)}px, ${(dy - 2).toFixed(2)}px, 0)`;
      });
    });

    el.addEventListener("pointerleave", () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      el.style.transform = "";
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
  let isInViewport = true;
  let rafId = null;

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

  surface.addEventListener("pointerdown", (event) => {
    if (prefersReducedMotion()) return;
    const rect = surface.getBoundingClientRect();
    const burst = document.createElement("span");
    burst.className = "trackpad-click-ripple";
    burst.style.left = `${event.clientX - rect.left}px`;
    burst.style.top = `${event.clientY - rect.top}px`;
    surface.appendChild(burst);
    burst.addEventListener("animationend", () => burst.remove(), { once: true });
    window.setTimeout(() => burst.remove(), 600);
  });

  const animateTrackpad = (now) => {
    rafId = null;
    if (!isInViewport || document.hidden) return;

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
      rafId = window.requestAnimationFrame(animateTrackpad);
    }
  };

  const ensureRunning = () => {
    if (!prefersReducedMotion() && isInViewport && !document.hidden && !rafId) {
      rafId = window.requestAnimationFrame(animateTrackpad);
    }
  };

  if ("IntersectionObserver" in window) {
    const obs = new IntersectionObserver(
      (entries) => {
        isInViewport = entries[0].isIntersecting;
        if (isInViewport) ensureRunning();
      },
      { threshold: 0.05 }
    );
    obs.observe(surface);
  }

  document.addEventListener("visibilitychange", ensureRunning);
  ensureRunning();
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

  const logicalWidth = 360;
  const logicalHeight = 220;

  const syncCanvasDpr = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = logicalWidth * dpr;
    canvas.height = logicalHeight * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  syncCanvasDpr();
  window.addEventListener("resize", syncCanvasDpr, { passive: true });

  let yaw = 0.48;
  let pitch = -0.32;
  let roll = 0.16;
  let velYaw = 0;
  let velPitch = 0;
  let isDragging = false;
  let isInViewport = true;
  let rafId = null;
  let lastPointer = { x: 0, y: 0 };

  canvas.addEventListener("pointerdown", (e) => {
    isDragging = true;
    velYaw = 0;
    velPitch = 0;
    lastPointer = { x: e.clientX, y: e.clientY };
    canvas.setPointerCapture(e.pointerId);
  });

  canvas.addEventListener("pointermove", (e) => {
    if (!isDragging) return;
    const dx = e.clientX - lastPointer.x;
    const dy = e.clientY - lastPointer.y;
    lastPointer = { x: e.clientX, y: e.clientY };
    velYaw = dx * 0.012;
    velPitch = dy * 0.012;
    yaw += velYaw;
    pitch = Math.max(-1.1, Math.min(1.1, pitch + velPitch));
    if (prefersReducedMotion()) drawFrame();
  });

  const stopDrag = () => {
    isDragging = false;
  };
  canvas.addEventListener("pointerup", stopDrag);
  canvas.addEventListener("pointercancel", stopDrag);

  const w = 42;
  const h = 80;
  const d = 6;
  const vertices = [
    [-w, -h, -d], [w, -h, -d], [w, h, -d], [-w, h, -d],
    [-w, -h, d],  [w, -h, d],  [w, h, d],  [-w, h, d],
  ];

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
    const cz = Math.cos(roll), sz = Math.sin(roll);
    const x1 = x * cz - y * sz;
    const y1 = x * sz + y * cz;
    const z1 = z;

    const cx = Math.cos(pitch), sx = Math.sin(pitch);
    const y2 = y1 * cx - z1 * sx;
    const z2 = y1 * sx + z1 * cx;
    const x2 = x1;

    const cy = Math.cos(yaw), sy = Math.sin(yaw);
    const x3 = x2 * cy + z2 * sy;
    const z3 = -x2 * sy + z2 * cy;
    const y3 = y2;

    const fov = 340;
    const scale = fov / (fov + z3 + 90);
    return [logicalWidth / 2 + x3 * scale, logicalHeight / 2 + y3 * scale, z3];
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
    const isLight = document.documentElement.getAttribute("data-theme") === "light";
    ctx.clearRect(0, 0, logicalWidth, logicalHeight);

    ctx.beginPath();
    ctx.ellipse(logicalWidth / 2, logicalHeight / 2 + 6, 110, 32, 0, 0, Math.PI * 2);
    ctx.strokeStyle = isLight ? "rgba(220, 38, 38, 0.22)" : "rgba(248, 113, 113, 0.18)";
    ctx.lineWidth = 1;
    ctx.stroke();

    const proj = vertices.map(rotatePoint);
    const projScreen = screenVerts.map(rotatePoint);

    ctx.beginPath();
    ctx.moveTo(projScreen[0][0], projScreen[0][1]);
    for (let i = 1; i < projScreen.length; i++) {
      ctx.lineTo(projScreen[i][0], projScreen[i][1]);
    }
    ctx.closePath();
    ctx.fillStyle = isLight ? "rgba(220, 38, 38, 0.11)" : "rgba(239, 68, 68, 0.14)";
    ctx.fill();
    ctx.strokeStyle = isLight ? "rgba(185, 28, 28, 0.55)" : "rgba(251, 113, 133, 0.5)";
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.beginPath();
    edges.forEach(([a, b]) => {
      ctx.moveTo(proj[a][0], proj[a][1]);
      ctx.lineTo(proj[b][0], proj[b][1]);
    });
    ctx.strokeStyle = isLight ? "rgba(17, 17, 20, 0.84)" : "rgba(245, 245, 247, 0.78)";
    ctx.lineWidth = 1.4;
    ctx.stroke();

    const origin = rotatePoint([0, 0, 0]);
    const zAxis = rotatePoint([0, 0, 56]);
    ctx.beginPath();
    ctx.moveTo(origin[0], origin[1]);
    ctx.lineTo(zAxis[0], zAxis[1]);
    ctx.strokeStyle = isLight ? "#dc2626" : "#f87171";
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(zAxis[0], zAxis[1], 3.5, 0, Math.PI * 2);
    ctx.fillStyle = isLight ? "#dc2626" : "#f87171";
    ctx.fill();

    updateTelemetry();
  };

  let lastTime = 0;
  const tick = (ts) => {
    rafId = null;
    if (!isInViewport || document.hidden) {
      lastTime = 0;
      return;
    }

    const dt = lastTime ? Math.min(0.05, (ts - lastTime) / 1000) : 0.016;
    lastTime = ts;

    if (!isDragging && !prefersReducedMotion()) {
      yaw += dt * 0.55 + velYaw;
      pitch = Math.max(-1.1, Math.min(1.1, pitch + velPitch));
      velYaw *= 0.92;
      velPitch *= 0.92;
      if (Math.abs(velPitch) < 0.0005) {
        pitch += (-0.28 + Math.sin(ts * 0.0011) * 0.16 - pitch) * 0.06;
      }
      roll = Math.cos(ts * 0.0009) * 0.14;
    }

    drawFrame();
    if (!prefersReducedMotion()) {
      rafId = window.requestAnimationFrame(tick);
    }
  };

  const ensureRunning = () => {
    if (!prefersReducedMotion() && isInViewport && !document.hidden && !rafId) {
      rafId = window.requestAnimationFrame(tick);
    }
  };

  if ("IntersectionObserver" in window) {
    const obs = new IntersectionObserver(
      (entries) => {
        isInViewport = entries[0].isIntersecting;
        if (isInViewport) ensureRunning();
      },
      { threshold: 0.05 }
    );
    obs.observe(canvas);
  }

  document.addEventListener("visibilitychange", ensureRunning);
  document.addEventListener("portfolio:themechange", drawFrame);
  drawFrame();
  ensureRunning();
}

function initSmartwatchGallery() {
  const tabs = document.querySelectorAll(".watch-tab[data-watch-shot]");
  const img = document.getElementById("watch-demo-img");
  const caption = document.getElementById("watch-demo-caption");

  if (!tabs.length || !img) return;

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const nextSrc = tab.getAttribute("data-watch-shot");
      const nextAlt = tab.getAttribute("data-watch-alt") || "";
      const nextCaption = tab.getAttribute("data-watch-caption") || "";
      if (!nextSrc) return;

      tabs.forEach((t) => {
        const active = t === tab;
        t.classList.toggle("is-active", active);
        t.setAttribute("aria-selected", String(active));
      });

      img.setAttribute("src", nextSrc);
      img.setAttribute("alt", nextAlt);
      if (caption) caption.textContent = nextCaption;
    });
  });
}

function initOrbitSimulationReplay() {
  const img = document.getElementById("orbit-demo-img");
  const badge = document.getElementById("orbit-stage-badge");
  const caption = document.getElementById("orbit-stage-caption");
  const playBtn = document.getElementById("orbit-play-btn");
  const stepBtns = document.querySelectorAll(".orbit-step-btn[data-orbit-step]");

  if (!img || !stepBtns.length) return;

  const stages = [
    {
      src: "assets/projects/orbit/frame-1.webp",
      alt: "ORBIT Edge-Core workload orchestrator steady state with inference-api on core-1",
      badge: "1 / 4 · Steady State",
      caption: "inference-api running on core-1",
    },
    {
      src: "assets/projects/orbit/frame-2.webp",
      alt: "ORBIT surge forecast showing chennai spike expected above capacity cap",
      badge: "2 / 4 · Surge Forecast",
      caption: "Chennai +60s forecast exceeds 600 cap",
    },
    {
      src: "assets/projects/orbit/frame-3.webp",
      alt: "ORBIT rolling migration moving inference-api from core-1 to edge-chennai with zero dropped requests",
      badge: "3 / 4 · Core → Edge",
      caption: "PREDICTIVE_PREWARM: core-1 → edge-chennai",
    },
    {
      src: "assets/projects/orbit/frame-5.webp",
      alt: "ORBIT stabilized edge-chennai serving inference-api with improved 9.2ms p95 latency",
      badge: "4 / 4 · SLA Stabilized",
      caption: "inference-api active on edge-chennai (9.2ms p95)",
    },
  ];

  let current = 0;
  let playing = !prefersReducedMotion();
  let inView = false;
  let timerId = null;

  const renderStage = (index) => {
    current = (index + stages.length) % stages.length;
    const stage = stages[current];
    img.setAttribute("src", stage.src);
    img.setAttribute("alt", stage.alt);
    if (badge) badge.textContent = stage.badge;
    if (caption) caption.textContent = stage.caption;
    stepBtns.forEach((btn, idx) => {
      const active = idx === current;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-selected", String(active));
    });
  };

  const syncPlayButton = () => {
    if (!playBtn) return;
    playBtn.setAttribute("aria-pressed", String(playing));
    playBtn.setAttribute("aria-label", playing ? "Pause simulation playback" : "Play simulation playback");
    const label = playBtn.querySelector("span");
    const icon = playBtn.querySelector("svg, i");
    if (label) label.textContent = playing ? "Auto" : "Paused";
    if (icon && window.lucide && typeof window.lucide.createIcons === "function") {
      const nextIcon = document.createElement("i");
      nextIcon.setAttribute("data-lucide", playing ? "pause" : "play");
      nextIcon.setAttribute("aria-hidden", "true");
      icon.replaceWith(nextIcon);
      window.lucide.createIcons({ nodes: [playBtn] });
    }
  };

  const stopTimer = () => {
    if (timerId !== null) {
      window.clearInterval(timerId);
      timerId = null;
    }
  };

  const startTimer = () => {
    stopTimer();
    if (!playing || !inView || document.hidden || prefersReducedMotion()) return;
    timerId = window.setInterval(() => {
      renderStage(current + 1);
    }, 1700);
  };

  stepBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const idx = Number(btn.getAttribute("data-orbit-step"));
      playing = false;
      stopTimer();
      syncPlayButton();
      renderStage(idx);
    });
  });

  if (playBtn) {
    playBtn.addEventListener("click", () => {
      playing = !playing;
      syncPlayButton();
      if (playing) startTimer();
      else stopTimer();
    });
  }

  if ("IntersectionObserver" in window) {
    const obs = new IntersectionObserver(
      (entries) => {
        inView = entries[0].isIntersecting;
        if (inView) startTimer();
        else stopTimer();
      },
      { threshold: 0.2 }
    );
    obs.observe(img);
  } else {
    inView = true;
    startTimer();
  }

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stopTimer();
    else startTimer();
  });

  syncPlayButton();
}

function initCopyEmail() {
  const copyBtn = document.getElementById("copy-email-btn");
  if (!copyBtn) return;
  let resetTimerId = null;

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
      const icon = copyBtn.querySelector("svg, i");
      copyBtn.classList.add("is-copied");
      if (label) label.textContent = "Email Copied";

      if (icon && window.lucide && typeof window.lucide.createIcons === "function") {
        const checkPlaceholder = document.createElement("i");
        checkPlaceholder.setAttribute("data-lucide", "check");
        checkPlaceholder.setAttribute("aria-hidden", "true");
        icon.replaceWith(checkPlaceholder);
        window.lucide.createIcons({ nodes: [copyBtn] });
      }

      window.clearTimeout(resetTimerId);
      resetTimerId = window.setTimeout(() => {
        copyBtn.classList.remove("is-copied");
        if (label) label.textContent = "Copy Email";
        const currentIcon = copyBtn.querySelector("svg, i");
        if (currentIcon && window.lucide && typeof window.lucide.createIcons === "function") {
          const copyPlaceholder = document.createElement("i");
          copyPlaceholder.setAttribute("data-lucide", "copy");
          copyPlaceholder.setAttribute("aria-hidden", "true");
          currentIcon.replaceWith(copyPlaceholder);
          window.lucide.createIcons({ nodes: [copyBtn] });
        }
      }, 2200);

      showToast(`Copied ${email} to clipboard.`);
    } else {
      showToast(`Email: ${email}`);
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  applyPortfolioConfig();
  initThemeToggle();
  initNavigation();
  initScrollReveals();
  initHeroWorkbench();
  initPreviewModeTabs();
  initInteractiveCards();
  initMagneticAndRipples();
  initCursorlyTrackpad();
  initCompassCanvas();
  initSmartwatchGallery();
  initOrbitSimulationReplay();
  initCopyEmail();

  if (window.lucide && typeof window.lucide.createIcons === "function") {
    window.lucide.createIcons();
  }
});
