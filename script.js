/* ============================================================
   PRIYANSHI — STILL BECOMING
   Phase 2: Cinematic 2.5D Hero World & Interaction Controller
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  // Register GSAP Plugins
  if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
  }

  // 1. Initialize Kinetic Typography Pre-processing
  setupKineticTypography();

  // 2. Initialize Opening Camera & Balloon-Girl Entrance
  initOpeningSequence();

  // 3. Initialize Delayed Cursor Parallax
  initCursorParallax();

  // 4. Initialize Scroll-Driven Pathway & Walking Motion
  initScrollCamera();

  // 5. Initialize Quiet Terminal Modal (Ctrl+K)
  initTerminal();

  // 6. Smooth Scroll Cue Action
  initScrollCue();

  // 7. Balloon Dissolve & Canvas Stardust Burst
  initBalloonDissolveOnScroll();

  // 8. Signature 3D Memory Turntable & Focus Object Zoom
  initMemoryCarousel();

  // 9. Saarthi Interface Walkthrough & Technical Flowcharts
  initSaarthiWalkthrough();

  // 10. Image Lightbox Modal for Production Screenshots
  initImageLightbox();

  // 11. Open Engineering Notebook Subjects
  initNotebookTabs();

  // 12. Twilight Observatory & Constellation Telescope
  initTwilightObservatory();

  // 13. Contact Horizon & Tactile Wax-Sealed Letter
  initContactExperience();

  // 14. Milestones Timeline Strip & Scroll Animation
  initMilestonesTimeline();

  // 15. Table of Contents & Cinematic Chapter Transitions
  initChapterTransitions();
});

/* ============================================================
   1. KINETIC TYPOGRAPHY SETUP
   Splits the hero title into individual letter spans for stagger
   ============================================================ */
function setupKineticTypography() {
  const titleEl = document.getElementById("kinetic-hero-title");
  if (!titleEl) return;

  const text = titleEl.textContent.trim();
  titleEl.innerHTML = "";
  
  // Wrap each letter in a span for individual kinetic animation
  Array.from(text).forEach((char) => {
    const span = document.createElement("span");
    span.textContent = char;
    span.className = "kinetic-letter";
    span.style.display = "inline-block";
    span.style.willChange = "transform, opacity";
    titleEl.appendChild(span);
  });
}

/* ============================================================
   2. OPENING CAMERA & BALLOON-GIRL ENTRANCE SEQUENCE
   ============================================================ */
function initOpeningSequence() {
  const actorGroup = document.getElementById("main-actor-group");
  const balloonRig = document.getElementById("balloon-rig");
  const characterRig = document.getElementById("character-rig");
  const legLeft = document.getElementById("char-leg-left");
  const legRight = document.getElementById("char-leg-right");
  const scarfTails = document.getElementById("scarf-tails");
  const balloonString = document.getElementById("balloon-string");

  const titleLetters = document.querySelectorAll(".kinetic-letter");
  const signature = document.getElementById("hero-signature");
  const roleLine = document.getElementById("hero-role-line");
  const scrollCue = document.getElementById("hero-scroll-cue");

  const stars = document.querySelectorAll(".drawn-star");
  const sparkles = document.querySelectorAll(".sparkle");

  // Fallback if GSAP is unavailable
  if (typeof gsap === "undefined") {
    if (actorGroup) actorGroup.style.opacity = "1";
    if (titleLetters.length) titleLetters.forEach(l => l.style.opacity = "1");
    if (signature) signature.style.opacity = "1";
    if (roleLine) roleLine.style.opacity = "1";
    if (scrollCue) scrollCue.style.opacity = "1";
    return;
  }

  // Initial State: Character and balloon positioned above viewport
  gsap.set(actorGroup, { y: -540, opacity: 1 });
  gsap.set(balloonRig, { rotation: -6, transformOrigin: "500px 240px" });
  gsap.set(characterRig, { rotation: 4, transformOrigin: "0px 0px" });
  gsap.set([stars, sparkles], { scale: 0, opacity: 0, transformOrigin: "center" });

  if (titleLetters.length) {
    gsap.set(titleLetters, { opacity: 0, y: 35, rotateX: -40 });
  }
  if (signature) {
    gsap.set(signature, { opacity: 0, y: 15, scale: 0.95 });
  }
  if (roleLine) {
    gsap.set(roleLine, { opacity: 0, y: 15 });
  }
  if (scrollCue) {
    gsap.set(scrollCue, { opacity: 0, y: 12 });
  }

  // Master Entrance Timeline
  const masterTimeline = gsap.timeline({
    defaults: { ease: "power2.out" }
  });

  masterTimeline
    .addLabel("enter", 0.2)
    // 1. Actor group lowers smoothly into frame
    .to(actorGroup, {
      duration: 1.85,
      y: 0,
      ease: "power2.out"
    }, "enter")

    // 2. Balloon follows with gentle elastic sway
    .to(balloonRig, {
      duration: 2.1,
      rotation: 2.2,
      ease: "elastic.out(1, 0.55)"
    }, "enter+=0.1")

    // 3. Legs swinging with air resistance during descent
    .to(legLeft, {
      duration: 0.55,
      rotation: 12,
      yoyo: true,
      repeat: 3,
      ease: "sine.inOut"
    }, "enter")
    .to(legRight, {
      duration: 0.55,
      rotation: -10,
      yoyo: true,
      repeat: 3,
      ease: "sine.inOut"
    }, "enter")

    // 4. Scarf tail flutter
    .to(scarfTails, {
      duration: 0.48,
      rotation: 16,
      yoyo: true,
      repeat: 3,
      ease: "sine.inOut"
    }, "enter")

    // 5. String flex during air descent
    .to(balloonString, {
      duration: 1.6,
      attr: { d: "M 500 407 Q 498 440 484 472 T 482 505" },
      ease: "power1.out"
    }, "enter+=0.1")

    // 6. Character & Balloon settle softly into equilibrium
    .addLabel("settled", "-=0.35")
    .to(balloonRig, {
      duration: 0.85,
      rotation: 0,
      ease: "power2.out"
    }, "settled")
    .to(characterRig, {
      duration: 0.85,
      rotation: 0,
      ease: "power2.out"
    }, "settled")

    // 7. Kinetic Typography: "PRIYANSHI" letters cascade upward
    .addLabel("revealText", "settled+=0.05")
    .to(titleLetters, {
      duration: 0.75,
      opacity: 1,
      y: 0,
      rotateX: 0,
      stagger: 0.05,
      ease: "back.out(1.5)"
    }, "revealText")

    // 8. Signature "Still Becoming" handwritten reveal
    .to(signature, {
      duration: 0.7,
      opacity: 1,
      y: 0,
      scale: 1,
      ease: "power2.out"
    }, "revealText+=0.25")

    // 9. Minimal role line & scroll prompt
    .to([roleLine, scrollCue], {
      duration: 0.6,
      opacity: 1,
      y: 0,
      stagger: 0.12,
      ease: "power2.out"
    }, "revealText+=0.4")

    // 10. Sparkles & hand-drawn stars pop in
    .to(stars, {
      duration: 0.55,
      scale: 1,
      opacity: 1,
      stagger: 0.08,
      ease: "back.out(2)"
    }, "revealText+=0.3")
    .to(sparkles, {
      duration: 0.5,
      scale: 1,
      opacity: 1,
      stagger: 0.06,
      ease: "back.out(2.2)"
    }, "revealText+=0.35")

    // 11. Hand off to continuous ambient physics loop
    .call(startAmbientPhysics, [], "revealText+=0.7");
}

/* ============================================================
   3. CONTINUOUS AMBIENT ORGANIC FLOATING PHYSICS
   ============================================================ */
function startAmbientPhysics() {
  if (typeof gsap === "undefined") return;

  const balloonRig = document.getElementById("balloon-rig");
  const characterRig = document.getElementById("character-rig");
  const scarfTails = document.getElementById("scarf-tails");
  const hairFlutter = document.getElementById("hair-flutter");
  const legLeft = document.getElementById("char-leg-left");
  const legRight = document.getElementById("char-leg-right");

  // Balloon continuous natural float & breath
  if (balloonRig) {
    gsap.to(balloonRig, {
      duration: 3.8,
      y: "+=12",
      rotation: 1.6,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  }

  // Character soft floating rhythm (harmonized with lag)
  if (characterRig) {
    gsap.to(characterRig, {
      duration: 4.1,
      y: "+=10",
      rotation: -1.2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 0.3
    });
  }

  // Free swinging dangler legs
  if (legLeft) {
    gsap.to(legLeft, {
      duration: 3.2,
      rotation: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  }
  if (legRight) {
    gsap.to(legRight, {
      duration: 3.6,
      rotation: -3.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 0.2
    });
  }

  // Scarf tails wind oscillation
  if (scarfTails) {
    gsap.to(scarfTails, {
      duration: 2.7,
      rotation: 7,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  }

  // Hair flutter
  if (hairFlutter) {
    gsap.to(hairFlutter, {
      duration: 2.1,
      rotation: 5.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  }
}

/* ============================================================
   4. DELAYED CURSOR PARALLAX (2.5D DEPTH LAYERS)
   ============================================================ */
function initCursorParallax() {
  const isTouch = window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window;
  if (isTouch) return; // Touch screens utilize scroll physics

  const balloonRig = document.getElementById("balloon-rig");
  const characterRig = document.getElementById("character-rig");
  const parallaxLayers = document.querySelectorAll(".parallax-layer");

  let targetX = 0;
  let targetY = 0;
  let charX = 0;
  let charY = 0;
  let balloonX = 0;
  let balloonY = 0;
  let balloonRot = 0;

  window.addEventListener("pointermove", (e) => {
    // Normalized coordinates (-1 to 1) from viewport center
    targetX = (e.clientX / window.innerWidth - 0.5) * 2;
    targetY = (e.clientY / window.innerHeight - 0.5) * 2;
  }, { passive: true });

  function tick() {
    // 1. Character responsive tracking with smooth damping
    charX += (targetX * 14 - charX) * 0.055;
    charY += (targetY * 10 - charY) * 0.055;

    // 2. Balloon delayed tracking (simulating air inertia on thread)
    balloonX += (targetX * 24 - balloonX) * 0.038;
    balloonY += (targetY * 18 - balloonY) * 0.038;
    balloonRot += (targetX * 2.8 - balloonRot) * 0.045;

    if (characterRig) {
      characterRig.style.transform = `translate(${480 + charX}px, ${500 + charY}px)`;
    }
    if (balloonRig) {
      balloonRig.style.transform = `translate3d(${balloonX}px, ${balloonY}px, 0px) rotate(${balloonRot}deg)`;
    }

    // 3. Background Parallax Layers based on data-speed
    parallaxLayers.forEach((layer) => {
      const speed = parseFloat(layer.getAttribute("data-speed")) || 0.2;
      const lx = targetX * 18 * speed;
      const ly = targetY * 12 * speed;
      layer.style.transform = `translate3d(${lx}px, ${ly}px, 0px)`;
    });

    requestAnimationFrame(tick);
  }

  tick();
}

/* ============================================================
   5. SCROLL-DRIVEN CAMERA & WALKING PATHWAY
   ============================================================ */
function initScrollCamera() {
  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;

  const openingStage = document.getElementById("opening-stage");
  const layerForeground = document.querySelector(".layer-foreground");
  const layerMiddle = document.querySelector(".layer-middle-ground");
  const layerHills = document.querySelector(".layer-distant-hills");
  const recedingPath = document.querySelector(".receding-path");
  const charLegs = document.getElementById("char-legs");
  const legLeft = document.getElementById("char-leg-left");
  const legRight = document.getElementById("char-leg-right");

  if (!openingStage) return;

  // Camera scroll timeline across the opening hero scene
  const scrollCamTl = gsap.timeline({
    scrollTrigger: {
      trigger: openingStage,
      start: "top top",
      end: "+=120%",
      scrub: 1.2,
      pin: false
    }
  });

  // 1. Foreground wildflowers rush past fastest (1.25x parallax)
  if (layerForeground) {
    scrollCamTl.to(layerForeground, {
      y: -140,
      ease: "none"
    }, 0);
  }

  // 2. Receding pathway scales and translates towards viewer
  if (recedingPath) {
    scrollCamTl.to(recedingPath, {
      strokeDashoffset: -60,
      ease: "none"
    }, 0);
  }

  // 3. Middleground shifts naturally
  if (layerMiddle) {
    scrollCamTl.to(layerMiddle, {
      y: -60,
      ease: "none"
    }, 0);
  }

  // 4. Distant hills move slowly (0.15x parallax)
  if (layerHills) {
    scrollCamTl.to(layerHills, {
      y: -25,
      ease: "none"
    }, 0);
  }

  // 5. Walking cadence on character legs as visitor scrolls
  if (legLeft && legRight) {
    scrollCamTl.to(legLeft, {
      rotation: 16,
      repeat: 3,
      yoyo: true,
      ease: "sine.inOut"
    }, 0);
    scrollCamTl.to(legRight, {
      rotation: -16,
      repeat: 3,
      yoyo: true,
      ease: "sine.inOut"
    }, 0);
  }
}

/* ============================================================
   6. SCROLL CUE ACTION
   ============================================================ */
function initScrollCue() {
  const scrollCue = document.getElementById("hero-scroll-cue");
  if (!scrollCue) return;

  scrollCue.addEventListener("click", () => {
    const toc = document.getElementById("table-of-contents");
    if (toc && typeof triggerChapterTransition === "function") {
      triggerChapterTransition(toc, "Table of Contents");
    } else if (toc) {
      toc.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.scrollBy({
        top: window.innerHeight * 0.85,
        behavior: "smooth"
      });
    }
  });
}

/* ============================================================
   7. QUIET TERMINAL MODAL (Ctrl+K or `)
   ============================================================ */
function initTerminal() {
  const overlay = document.getElementById("terminal-overlay");
  const backdrop = document.getElementById("terminal-backdrop");
  const btnToggle = document.getElementById("btn-terminal-pill");
  const btnCloseDot = document.getElementById("term-close-dot");
  const btnEsc = document.getElementById("term-esc-btn");
  const terminalInput = document.getElementById("terminal-input");
  const terminalOutput = document.getElementById("terminal-output");

  if (!overlay || !terminalInput || !terminalOutput) return;

  let history = [];
  let historyIndex = -1;

  function openTerminal() {
    overlay.classList.add("active");
    overlay.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    setTimeout(() => {
      terminalInput.focus();
    }, 80);
  }

  function closeTerminal() {
    overlay.classList.remove("active");
    overlay.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  function printLine(text, className = "") {
    const p = document.createElement("p");
    if (className) p.className = className;
    p.innerHTML = text;
    terminalOutput.appendChild(p);
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
  }

  function handleCommand(cmdRaw) {
    const cmd = cmdRaw.trim().toLowerCase();
    printLine(`<span class="term-prompt">priyanshi@portfolio:~$</span> <span class="term-log-cmd">${escapeHtml(cmdRaw)}</span>`);

    if (!cmd) return;

    switch (cmd) {
      case "help":
        printLine("Available commands:");
        printLine("  <span class=\"term-cmd\">work</span>     - View flagship projects (Saarthi & more)");
        printLine("  <span class=\"term-cmd\">craft</span>    - Explore engineering craft & learning");
        printLine("  <span class=\"term-cmd\">connect</span>  - Contact Priyanshi directly");
        printLine("  <span class=\"term-cmd\">about</span>    - Brief background statement");
        printLine("  <span class=\"term-cmd\">email</span>    - Get direct contact email address");
        printLine("  <span class=\"term-cmd\">clear</span>    - Clear terminal screen");
        printLine("  <span class=\"term-cmd\">exit</span>     - Close this terminal modal");
        break;

      case "work":
        printLine("Navigating to work...", "term-success");
        closeTerminal();
        const workSec = document.getElementById("project-showcase");
        if (workSec) workSec.scrollIntoView({ behavior: "smooth" });
        break;

      case "craft":
        printLine("Navigating to craft & learning...", "term-success");
        closeTerminal();
        const craftSec = document.getElementById("learning-library");
        if (craftSec) craftSec.scrollIntoView({ behavior: "smooth" });
        break;

      case "connect":
        printLine("Navigating to contact...", "term-success");
        closeTerminal();
        const connSec = document.getElementById("contact-horizon");
        if (connSec) connSec.scrollIntoView({ behavior: "smooth" });
        break;

      case "about":
        printLine("Priyanshi Shah", "term-welcome");
        printLine("First-year CS student at New LJ Institute of Engineering & Technology.");
        printLine("Exploring C++, data structures, web development, and AI through real projects.");
        break;

      case "email":
        printLine("Direct email: <a href=\"mailto:pkshah2021@gmail.com\" style=\"color:#E8B86D;text-decoration:underline;\">pkshah2021@gmail.com</a>", "term-welcome");
        break;

      case "clear":
        terminalOutput.innerHTML = "";
        break;

      case "exit":
      case "quit":
        closeTerminal();
        break;

      default:
        printLine(`Command not found: "${escapeHtml(cmd)}". Type <span class="term-cmd">help</span> for available commands.`, "term-error");
        break;
    }
  }

  function escapeHtml(str) {
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  // Event Listeners for Open / Close
  if (btnToggle) btnToggle.addEventListener("click", openTerminal);
  if (btnCloseDot) btnCloseDot.addEventListener("click", closeTerminal);
  if (btnEsc) btnEsc.addEventListener("click", closeTerminal);
  if (backdrop) backdrop.addEventListener("click", closeTerminal);

  // Global Keyboard Shortcuts
  window.addEventListener("keydown", (e) => {
    // Ctrl+K or Cmd+K or backtick (when not in an input)
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      if (overlay.classList.contains("active")) {
        closeTerminal();
      } else {
        openTerminal();
      }
    } else if (e.key === "Escape" && overlay.classList.contains("active")) {
      closeTerminal();
    } else if (e.key === "`" && !overlay.classList.contains("active") && document.activeElement.tagName !== "INPUT" && document.activeElement.tagName !== "TEXTAREA") {
      e.preventDefault();
      openTerminal();
    }
  });

  // Terminal Input Handling
  terminalInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const val = terminalInput.value;
      if (val.trim()) {
        history.push(val);
        historyIndex = history.length;
      }
      handleCommand(val);
      terminalInput.value = "";
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length && historyIndex > 0) {
        historyIndex--;
        terminalInput.value = history[historyIndex];
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (history.length && historyIndex < history.length - 1) {
        historyIndex++;
        terminalInput.value = history[historyIndex];
      } else {
        historyIndex = history.length;
        terminalInput.value = "";
      }
    }
  });
}

/* ============================================================
   8. BALLOON ASCENT, RELEASE & CANVAS PARTICLE DISSOLVE
   ============================================================ */
function initBalloonDissolveOnScroll() {
  const canvas = document.getElementById("balloon-dissolve-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  const dpr = window.devicePixelRatio || 1;
  let particles = [];
  let animId = null;
  let hasDissolved = false;

  function resizeCanvas() {
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    ctx.scale(dpr, dpr);
  }

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas, { passive: true });

  function spawnBurst(originX, originY) {
    const colors = ["#E8B86D", "#F5BCA9", "#E59982", "#FAF7F2", "#FFF0D6"];
    for (let i = 0; i < 75; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 2.0 + Math.random() * 5.5;
      particles.push({
        x: originX,
        y: originY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1.2,
        r: 2.5 + Math.random() * 3.8,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 1,
        decay: 0.014 + Math.random() * 0.018,
        isStar: Math.random() > 0.45,
        rotation: Math.random() * Math.PI,
        rotSpeed: (Math.random() - 0.5) * 0.1
      });
    }

    if (!animId) {
      loopParticles();
    }
  }

  function loopParticles() {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.04; // Gentle air float
      p.vx *= 0.985;
      p.rotation += p.rotSpeed;
      p.alpha -= p.decay;

      if (p.alpha <= 0) {
        particles.splice(i, 1);
        continue;
      }

      ctx.save();
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = p.color;

      if (p.isStar) {
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.beginPath();
        for (let s = 0; s < 4; s++) {
          ctx.lineTo(Math.cos((s * 90) * Math.PI / 180) * p.r * 1.5, Math.sin((s * 90) * Math.PI / 180) * p.r * 1.5);
          ctx.lineTo(Math.cos((s * 90 + 45) * Math.PI / 180) * (p.r * 0.5), Math.sin((s * 90 + 45) * Math.PI / 180) * (p.r * 0.5));
        }
        ctx.closePath();
        ctx.fill();
      } else {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }

    if (particles.length > 0) {
      animId = requestAnimationFrame(loopParticles);
    } else {
      animId = null;
    }
  }

  // Trigger burst via ScrollTrigger as user scrolls into the bridge scene
  const openingStage = document.getElementById("opening-stage");
  const balloonRig = document.getElementById("balloon-rig");
  const balloonString = document.getElementById("balloon-string");
  const pipGuide = document.getElementById("pip-companion-guide");

  if (typeof ScrollTrigger !== "undefined" && openingStage && balloonRig) {
    ScrollTrigger.create({
      trigger: openingStage,
      start: "bottom 85%",
      onEnter: () => {
        if (!hasDissolved) {
          hasDissolved = true;
          const rect = balloonRig.getBoundingClientRect();
          const originX = rect.left + rect.width / 2;
          const originY = rect.top + rect.height / 2;
          
          gsap.to(balloonRig, {
            y: -280,
            opacity: 0,
            duration: 1.2,
            ease: "power2.in"
          });
          if (balloonString) {
            gsap.to(balloonString, {
              opacity: 0,
              duration: 0.6
            });
          }
          spawnBurst(originX, originY);

          // Pip takes flight forward
          if (pipGuide) {
            gsap.fromTo(pipGuide, 
              { opacity: 0, x: -60, y: 40, scale: 0.8 },
              { opacity: 1, x: 0, y: 0, scale: 1, duration: 1.6, ease: "power2.out" }
            );
          }
        }
      },
      onLeaveBack: () => {
        hasDissolved = false;
        gsap.to(balloonRig, {
          y: 0,
          opacity: 1,
          duration: 1.0,
          ease: "power2.out"
        });
        if (balloonString) {
          gsap.to(balloonString, {
            opacity: 1,
            duration: 0.8
          });
        }
      }
    });
  }
}

/* ============================================================
   9. SIGNATURE 3D MEMORY TURNTABLE & FOCUS OBJECT ZOOM
   ============================================================ */
function initMemoryCarousel() {
  const viewport = document.getElementById("carousel-viewport");
  const ring = document.getElementById("carousel-ring");
  const items = document.querySelectorAll(".carousel-item");
  const btnPrev = document.getElementById("carousel-prev-btn");
  const btnNext = document.getElementById("carousel-next-btn");

  const focusOverlay = document.getElementById("memory-focus-overlay");
  const focusBackdrop = document.getElementById("focus-backdrop");
  const focusRender = document.getElementById("focus-object-render");
  const focusTag = document.getElementById("focus-note-tag");
  const focusTitle = document.getElementById("focus-note-title");
  const focusSubtitle = document.getElementById("focus-note-subtitle");
  const focusBody = document.getElementById("focus-note-body");
  const btnClose = document.getElementById("btn-close-memory");
  const btnNextMemory = document.getElementById("btn-next-memory");

  if (!viewport || !ring || items.length === 0) return;

  const count = items.length;
  let currentRotation = 0;
  let targetRotation = 0;
  let isDragging = false;
  let startX = 0;
  let lastX = 0;
  let autoRotate = true;
  let selectedIndex = 0;

  function getRadius() {
    return window.innerWidth < 768 ? 150 : 215;
  }

  function updateCarousel() {
    const radius = getRadius();
    const step = 360 / count;

    items.forEach((item, index) => {
      const angleDeg = (index * step + currentRotation) % 360;
      const angleRad = (angleDeg * Math.PI) / 180;

      const x = Math.sin(angleRad) * radius;
      const z = Math.cos(angleRad) * radius;

      // 0 (back) to 1 (front)
      const normalizedZ = (z + radius) / (2 * radius);
      const scale = 0.72 + normalizedZ * 0.42;
      const opacity = 0.45 + normalizedZ * 0.55;
      const zIndex = Math.round(normalizedZ * 100);

      item.style.transform = `translate3d(${x}px, 0px, ${z}px) scale(${scale})`;
      item.style.opacity = opacity;
      item.style.zIndex = zIndex;
    });
  }

  function tick() {
    currentRotation += (targetRotation - currentRotation) * 0.085;

    if (autoRotate && !isDragging) {
      targetRotation += 0.08;
    }

    updateCarousel();
    requestAnimationFrame(tick);
  }

  // Pointer drag handling (mouse & touch)
  viewport.addEventListener("pointerdown", (e) => {
    isDragging = true;
    autoRotate = false;
    startX = e.clientX;
    lastX = e.clientX;
    viewport.classList.add("is-dragging");
  });

  window.addEventListener("pointermove", (e) => {
    if (!isDragging) return;
    const deltaX = e.clientX - lastX;
    lastX = e.clientX;
    targetRotation += deltaX * 0.45;
  }, { passive: true });

  window.addEventListener("pointerup", () => {
    if (!isDragging) return;
    isDragging = false;
    viewport.classList.remove("is-dragging");
    // Resume gentle auto-rotation after 3 seconds idle
    setTimeout(() => {
      if (!isDragging && (!focusOverlay || !focusOverlay.classList.contains("active"))) {
        autoRotate = true;
      }
    }, 3000);
  });

  // Prev / Next step buttons
  if (btnPrev) {
    btnPrev.addEventListener("click", () => {
      autoRotate = false;
      targetRotation += 360 / count;
    });
  }
  if (btnNext) {
    btnNext.addEventListener("click", () => {
      autoRotate = false;
      targetRotation -= 360 / count;
    });
  }

  // Item Click & Object Selection Zoom-in
  function openMemory(index) {
    selectedIndex = index;
    const item = items[index];
    if (!item || !focusOverlay) return;

    autoRotate = false;
    const svgBox = item.querySelector(".item-visual-box");
    if (svgBox && focusRender) {
      focusRender.innerHTML = svgBox.innerHTML;
    }

    if (focusTag) focusTag.textContent = item.dataset.tag || "01. Achievements";
    if (focusTitle) focusTitle.textContent = item.dataset.title || "Achievements";
    if (focusSubtitle) focusSubtitle.textContent = item.dataset.subtitle || "";
    if (focusBody) focusBody.textContent = item.dataset.note || "";

    focusOverlay.classList.add("active");
    focusOverlay.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeMemory() {
    if (!focusOverlay) return;
    focusOverlay.classList.remove("active");
    focusOverlay.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    autoRotate = true;
  }

  items.forEach((item, index) => {
    item.addEventListener("click", () => {
      // If we weren't just actively dragging
      if (Math.abs(lastX - startX) < 8) {
        openMemory(index);
      }
    });
  });

  if (btnClose) btnClose.addEventListener("click", closeMemory);
  if (focusBackdrop) focusBackdrop.addEventListener("click", closeMemory);

  if (btnNextMemory) {
    btnNextMemory.addEventListener("click", () => {
      openMemory((selectedIndex + 1) % count);
    });
  }

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && focusOverlay && focusOverlay.classList.contains("active")) {
      closeMemory();
    }
  });

  tick();
}

/* ============================================================
   10. SAARTHI PRODUCT WALKTHROUGH CONTROLLER
   ============================================================ */
function initSaarthiWalkthrough() {
  const container = document.getElementById("walkthrough-container");
  if (!container) return;

  const tabs = container.querySelectorAll(".walkthrough-tab");
  const slides = container.querySelectorAll(".walkthrough-slide");
  const titleEl = document.getElementById("walkthrough-title");
  const descEl = document.getElementById("walkthrough-desc");
  const counterEl = document.getElementById("step-counter");
  const btnPrev = document.getElementById("walkthrough-prev");
  const btnNext = document.getElementById("walkthrough-next");

  const walkthroughData = [
    {
      title: "01 • Welcome & Login",
      desc: "The starting point of Saarthi. We added demo credentials so anyone visiting can try the app right away without filling out forms."
    },
    {
      title: "02 • At-a-Glance Dashboard",
      desc: "Shows total money coming in, money going out, and your remaining balance with an easy-to-read financial health score."
    },
    {
      title: "03 • Clean Transaction Ledger",
      desc: "Turns cryptic bank statement codes into familiar names like Swiggy, Amazon, and Uber so you know exactly where your money went."
    },
    {
      title: "04 • Spending Checks & Alerts",
      desc: "Flags unusual charges or forgotten renewals so you can review them quickly without having to dig through old statements."
    },
    {
      title: "05 • What-If Budget Simulator",
      desc: "Lets you test questions like 'What happens if I cut food spending by 20%?' to see the savings impact before you make the decision."
    },
    {
      title: "06 • Voice Search ('Talk It Out')",
      desc: "Lets anyone ask questions out loud using speech recognition instead of typing complex search terms."
    }
  ];

  let currentSlide = 0;

  function updateSlide(index) {
    if (index < 0) index = walkthroughData.length - 1;
    if (index >= walkthroughData.length) index = 0;
    currentSlide = index;

    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === currentSlide);
    });

    tabs.forEach((tab, i) => {
      const isSelected = i === currentSlide;
      tab.classList.toggle("active", isSelected);
      tab.setAttribute("aria-selected", isSelected ? "true" : "false");
    });

    if (titleEl) titleEl.textContent = walkthroughData[currentSlide].title;
    if (descEl) descEl.textContent = walkthroughData[currentSlide].desc;
    if (counterEl) counterEl.textContent = `${currentSlide + 1} / ${walkthroughData.length}`;
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const slideIdx = parseInt(tab.getAttribute("data-slide"), 10);
      if (!isNaN(slideIdx)) {
        updateSlide(slideIdx);
      }
    });
  });

  if (btnPrev) {
    btnPrev.addEventListener("click", () => {
      updateSlide(currentSlide - 1);
    });
  }

  if (btnNext) {
    btnNext.addEventListener("click", () => {
      updateSlide(currentSlide + 1);
    });
  }

  // Keyboard navigation when container has focus
  container.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") {
      updateSlide(currentSlide + 1);
    } else if (e.key === "ArrowLeft") {
      updateSlide(currentSlide - 1);
    }
  });
}

/* ============================================================
   11. PRODUCTION SCREENSHOT LIGHTBOX MODAL
   ============================================================ */
function initImageLightbox() {
  const modal = document.getElementById("image-lightbox-modal");
  const fullImg = document.getElementById("lightbox-full-img");
  const captionEl = document.getElementById("lightbox-caption");
  const btnClose = document.getElementById("lightbox-close-btn");
  const backdrop = document.getElementById("lightbox-backdrop");
  const screenshots = document.querySelectorAll("#walkthrough-container .screenshot-img");

  if (!modal || !fullImg) return;

  function openLightbox(imgSrc, altText) {
    fullImg.src = imgSrc;
    fullImg.alt = altText;
    if (captionEl) captionEl.textContent = altText;
    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  screenshots.forEach((img) => {
    img.addEventListener("click", () => {
      openLightbox(img.src, img.alt);
    });
  });

  if (btnClose) btnClose.addEventListener("click", closeLightbox);
  if (backdrop) backdrop.addEventListener("click", closeLightbox);

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      closeLightbox();
    }
  });
}

/* ============================================================
   12. OPEN ENGINEERING NOTEBOOK CONTROLLER
   Subject tab switching with rich technical reflections & diagrams
   ============================================================ */
function initNotebookTabs() {
  const tabs = document.querySelectorAll(".notebook-tabs-bar .notebook-tab");
  const badgeEl = document.getElementById("nb-subject-badge");
  const titleEl = document.getElementById("nb-subject-title");
  const proseEl = document.getElementById("nb-reflection-prose");
  const listEl = document.getElementById("nb-takeaways-list");
  const pageNumLeft = document.getElementById("page-num-left");
  const pageNumRight = document.getElementById("page-num-right");
  const panes = document.querySelectorAll(".notebook-diagram-pane");

  if (!tabs.length) return;

  const notebookData = [
    {
      badge: "C++ & Memory",
      title: "Pointers, Memory & How Computers Work",
      leftPage: "p. 24 &bull; Foundations",
      rightPage: "p. 25 &bull; Mental Model",
      prose: [
        "Learning C++ made me realize that code isn't just abstract logic—it actually runs in physical memory. Every variable has an address, and every piece of memory has to be managed carefully.",
        "Understanding concepts like RAII and ownership changed how I think: good software doesn't just clean up after errors happen, it is designed so resources are handled safely by default."
      ],
      takeaways: [
        "&bull; Clean memory ownership prevents tricky, hard-to-find bugs",
        "&bull; Understanding how data sits in memory helps write faster code",
        "&bull; Writing C++ gave me huge respect for what high-level languages do behind the scenes"
      ]
    },
    {
      badge: "Algorithms & DSA",
      title: "Trees, Graphs & Problem Solving",
      leftPage: "p. 38 &bull; Problem Solving",
      rightPage: "p. 39 &bull; Visualizing Steps",
      prose: [
        "Data structures aren't just interview puzzles; they are ways of organizing information so you can solve problems efficiently.",
        "Tracing recursive functions and tree traversals by hand on paper helped me visualize how big, confusing problems break down into smaller, manageable steps."
      ],
      takeaways: [
        "&bull; Break complex problems into simple base cases before writing code",
        "&bull; Picking the right data structure makes the solution much clearer",
        "&bull; Drawing steps on paper is still the best debugging tool"
      ]
    },
    {
      badge: "Web & Systems",
      title: "How Browsers Render & Run Smoothly",
      leftPage: "p. 52 &bull; The Browser",
      rightPage: "p. 53 &bull; Fluid Motion",
      prose: [
        "Web browsers do an amazing amount of work behind the scenes. Learning how HTML, CSS, and JavaScript turn into pixels on screen changed how I build interfaces.",
        "To keep animations feeling smooth at 60 frames per second, I learned to rely on GPU-friendly CSS properties like transform and opacity rather than triggering heavy layout recalculations."
      ],
      takeaways: [
        "&bull; Use transform and opacity for fluid, stutter-free animations",
        "&bull; Time animations with requestAnimationFrame for smooth motion",
        "&bull; Keep user interactions snappy by avoiding heavy blocking tasks on the main thread"
      ]
    },
    {
      badge: "Building with AI",
      title: "Where AI Helps & Where Code Rules",
      leftPage: "p. 66 &bull; Safe AI",
      rightPage: "p. 67 &bull; Saarthi Lessons",
      prose: [
        "Building Saarthi taught me an important lesson about AI: language models shouldn't do math when exact numbers matter. Numbers and rules need to be strictly verified by code.",
        "Where AI really shines is explaining things in plain English—turning complex numbers, bank records, and dry facts into friendly, understandable insights that help people."
      ],
      takeaways: [
        "&bull; Let code handle math and facts; let AI handle natural explanations",
        "&bull; Always check inputs and outputs before showing them to users",
        "&bull; Give people clear reasons and sources for whatever the system says"
      ]
    },
    {
      badge: "Human-Centered Design",
      title: "Warm Interfaces & Thoughtful Details",
      leftPage: "p. 80 &bull; Human First",
      rightPage: "p. 81 &bull; Visual Rhythm",
      prose: [
        "Good software respects human attention. Instead of aggressive notifications and sterile gray dashboards, I enjoy designing interfaces that feel calm, warm, and inviting—like turning pages in a well-kept notebook.",
        "Small details—smooth transitions, soft drop-shadows, and tactile click states—make digital tools feel less mechanical and much more human."
      ],
      takeaways: [
        "&bull; Use soft contrast and warm palettes instead of harsh contrasts",
        "&bull; Smooth, natural motion makes interactions feel tactile and friendly",
        "&bull; Keep layouts clean so people can focus on what matters"
      ]
    }
  ];

  function selectTab(index) {
    if (index < 0 || index >= notebookData.length) return;
    const data = notebookData[index];

    // Update tab pills
    tabs.forEach((tab, i) => {
      const isSelected = i === index;
      tab.classList.toggle("active", isSelected);
      tab.setAttribute("aria-selected", isSelected ? "true" : "false");
    });

    // Update left page
    if (pageNumLeft) pageNumLeft.innerHTML = data.leftPage;
    if (pageNumRight) pageNumRight.innerHTML = data.rightPage;
    if (badgeEl) badgeEl.textContent = data.badge;
    if (titleEl) titleEl.textContent = data.title;
    if (proseEl) {
      proseEl.innerHTML = data.prose.map((p) => `<p>${p}</p>`).join("");
    }
    if (listEl) {
      listEl.innerHTML = data.takeaways.map((item) => `<li>${item}</li>`).join("");
    }

    // Update right page diagram pane
    panes.forEach((pane, i) => {
      pane.classList.toggle("active", i === index);
    });
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const idx = parseInt(tab.getAttribute("data-tab"), 10);
      if (!isNaN(idx)) {
        selectTab(idx);
      }
    });
  });
}

/* ============================================================
   13. TWILIGHT OBSERVATORY & CELESTIAL CONSTELLATION MAPPER
   Rotating brass telescope aiming at active research questions
   ============================================================ */
function initTwilightObservatory() {
  const buttons = document.querySelectorAll(".telescope-direction-buttons .btn-telescope-target");
  const constellationGroups = document.querySelectorAll(".dome-sky-svg .constellation-group");
  const barrel = document.getElementById("telescope-barrel");
  const cardTag = document.getElementById("celestial-tag");
  const cardTitle = document.getElementById("celestial-title");
  const cardDesc = document.getElementById("celestial-desc");
  const cardReading = document.getElementById("celestial-reading");
  const card = document.getElementById("celestial-card");

  if (!buttons.length || !constellationGroups.length) return;

  const constellations = [
    {
      angle: -36,
      tag: "Constellation 01 &bull; Currently Exploring",
      title: "01. Software Engineering",
      desc: "I'm exploring programming fundamentals, C++, data structures and algorithms. I want to understand how software works, not just how to write code.",
      reading: "<span>Currently Exploring:</span> Programming Fundamentals &bull; C++ &bull; Data Structures &bull; Problem Solving"
    },
    {
      angle: -10,
      tag: "Constellation 02 &bull; Currently Exploring",
      title: "02. Web Development",
      desc: "I'm learning to build interactive websites, exploring frontend and backend development, and figuring out how to turn ideas into working products.",
      reading: "<span>Currently Exploring:</span> Interactive Frontend &bull; Backend Basics &bull; Responsive Layouts"
    },
    {
      angle: 24,
      tag: "Constellation 03 &bull; Currently Exploring",
      title: "03. Artificial Intelligence",
      desc: "I'm curious about AI, prompt engineering and intelligent applications. I want to understand how these tools work and how they can solve real problems.",
      reading: "<span>Currently Exploring:</span> Practical AI &bull; Prompt Engineering &bull; Real-World Use Cases"
    },
    {
      angle: -52,
      tag: "Constellation 04 &bull; Currently Exploring",
      title: "04. Creative Technology",
      desc: "I'm exploring UI/UX, animations, interactive experiences and 3D elements. I love the idea of making technology both useful and enjoyable.",
      reading: "<span>Currently Exploring:</span> UI/UX Design &bull; Vector Animations &bull; Interactive Experiences"
    },
    {
      angle: 5,
      tag: "Constellation 05 &bull; Currently Exploring",
      title: "05. Product & Research",
      desc: "I'm learning how to find real-world problems, research ideas, understand users and turn observations into useful products.",
      reading: "<span>Currently Exploring:</span> Finding Real Problems &bull; User Feedback &bull; Practical Prototypes"
    },
    {
      angle: 42,
      tag: "Constellation 06 &bull; Currently Exploring",
      title: "06. Computer Science Beyond Code",
      desc: "I'm curious about operating systems, cybersecurity and computer architecture. I want to understand what actually happens behind the screen.",
      reading: "<span>Currently Exploring:</span> Operating Systems &bull; Cybersecurity Basics &bull; Computer Architecture"
    }
  ];

  function aimTelescope(index) {
    if (index < 0 || index >= constellations.length) return;
    const target = constellations[index];

    // Update buttons
    buttons.forEach((btn, i) => {
      btn.classList.toggle("active", i === index);
    });

    // Rotate telescope barrel
    if (barrel) {
      barrel.style.transform = `rotate(${target.angle}deg)`;
    }

    // Highlight constellation SVG group
    constellationGroups.forEach((group, i) => {
      group.classList.toggle("active", i === index);
    });

    // Update celestial card details with subtle gentle transition
    if (card) {
      card.style.opacity = "0.7";
      setTimeout(() => {
        if (cardTag) {
          cardTag.innerHTML = `<span class="exploring-pulse-dot"></span><span>${target.tag}</span>`;
        }
        if (cardTitle) cardTitle.textContent = target.title;
        if (cardDesc) cardDesc.textContent = target.desc;
        if (cardReading) cardReading.innerHTML = target.reading;
        card.style.opacity = "1";
      }, 120);
    }
  }

  // Button clicks
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const idx = parseInt(btn.getAttribute("data-constellation"), 10);
      if (!isNaN(idx)) {
        aimTelescope(idx);
      }
    });
  });

  // Constellation SVG group clicks
  constellationGroups.forEach((group, i) => {
    group.addEventListener("click", () => {
      aimTelescope(i);
    });
  });

  // Initial aim
  aimTelescope(0);
}

/* ============================================================
   14. CONTACT HORIZON & TACTILE ENVELOPE CONTROLLER
   Interactive wax-sealed letter fold/unfold & back to top
   ============================================================ */
function initContactExperience() {
  const sealTrigger = document.getElementById("envelope-seal-trigger");
  const cardWrapper = document.getElementById("envelope-card");
  const btnTop = document.getElementById("btn-back-to-top");

  if (sealTrigger && cardWrapper) {
    sealTrigger.addEventListener("click", () => {
      const isFolded = cardWrapper.classList.toggle("folded");
      sealTrigger.setAttribute("aria-expanded", isFolded ? "false" : "true");
      
      const label = sealTrigger.querySelector(".seal-label-whisper");
      if (label) {
        label.textContent = isFolded ? "Click wax seal to unfold letter" : "Click wax seal to fold letter";
      }
    });

    // Support keyboard activation
    sealTrigger.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        sealTrigger.click();
      }
    });
  }

  if (btnTop) {
    btnTop.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }
}

/* ============================================================
   15. MILESTONES TIMELINE & SCROLL REVEAL
   Subtle entrance and marker highlight as visitor scrolls
   ============================================================ */
function initMilestonesTimeline() {
  const strip = document.getElementById("milestones-timeline-strip");
  const nodes = document.querySelectorAll(".milestones-timeline-strip .milestone-node");
  const line = document.querySelector(".milestones-connecting-line");

  if (!strip || !nodes.length) return;

  if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
    // Subtle stagger reveal of milestone markers
    gsap.from(nodes, {
      scrollTrigger: {
        trigger: strip,
        start: "top 85%",
        toggleActions: "play none none reverse"
      },
      y: 20,
      opacity: 0,
      stagger: 0.12,
      duration: 0.8,
      ease: "power2.out"
    });

    if (line) {
      gsap.from(line, {
        scrollTrigger: {
          trigger: strip,
          start: "top 85%",
          toggleActions: "play none none reverse"
        },
        scaleX: 0,
        transformOrigin: "left center",
        duration: 1,
        ease: "power2.out"
      });
    }
  }

  // Interactive focus on click / touch
  nodes.forEach((node) => {
    node.addEventListener("click", () => {
      nodes.forEach((n) => n.classList.remove("active"));
      node.classList.add("active");
    });
  });
}

/* ============================================================
   16. TABLE OF CONTENTS & CINEMATIC CHAPTER TRANSITIONS
   Handles chapter navigation with transitional wipe and arrival pulse
   ============================================================ */
function triggerChapterTransition(targetEl, label) {
  if (!targetEl) return;
  const wipeEl = document.getElementById("cinematic-transition-wipe");
  const wipeText = document.getElementById("transition-wipe-text");

  // Show shimmering golden transition wipe
  if (wipeEl) {
    if (wipeText && label) {
      wipeText.innerHTML = `<span>Traveling to</span> <strong>${escapeHtml(label)}</strong>`;
    }
    wipeEl.classList.add("active");
    wipeEl.setAttribute("aria-hidden", "false");
  }

  // Smooth scroll to target section
  setTimeout(() => {
    targetEl.scrollIntoView({ behavior: "smooth", block: "start" });

    // Hide transition wipe
    setTimeout(() => {
      if (wipeEl) {
        wipeEl.classList.remove("active");
        wipeEl.setAttribute("aria-hidden", "true");
      }

      // Trigger arrival highlight pulse
      targetEl.classList.remove("section-arrival-pulse");
      void targetEl.offsetWidth; // Force reflow
      targetEl.classList.add("section-arrival-pulse");

      setTimeout(() => {
        targetEl.classList.remove("section-arrival-pulse");
      }, 1900);
    }, 320);
  }, 180);
}

function initChapterTransitions() {
  const tocCards = document.querySelectorAll(".toc-chapter-card[data-target]");
  const allNavLinks = document.querySelectorAll(".quiet-nav a[href^='#']");

  tocCards.forEach((card) => {
    card.addEventListener("click", (e) => {
      const targetSelector = card.getAttribute("data-target");
      if (!targetSelector) return;
      const target = document.querySelector(targetSelector);
      if (target) {
        e.preventDefault();
        const titleEl = card.querySelector(".chapter-title");
        const label = titleEl ? titleEl.textContent.trim() : "Chapter";
        triggerChapterTransition(target, label);
      }
    });
  });

  allNavLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      if (href && href.startsWith("#") && href.length > 1) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          triggerChapterTransition(target, link.textContent.trim());
        }
      }
    });
  });
}
