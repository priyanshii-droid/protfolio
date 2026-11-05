/* ============================================================
   PRIYANSHI — STILL BECOMING
   Storybook Opening Sequence & Chapter Scroll Animations (GSAP)
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  // Check reduced motion preference
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Initialize Storybook Sequence
  if (typeof gsap !== "undefined") {
    // Register ScrollTrigger if available
    if (typeof ScrollTrigger !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }

    if (!prefersReducedMotion) {
      // Scene 1: Preserved Opening Sequence
      initStorybookOpeningSequence();
      initStorybookScrollInteraction();

      // Chapters: Illustrated Book Animations
      initChapterVignetteAnimations();
      initSaarthiStorySceneAnimations();
    } else {
      initAccessibleState();
    }
  } else {
    initAccessibleState();
  }

  // Supporting interactions
  initSketchMorph();
  initSaarthiWalkthrough();
  initMobileNavigation();
  initContactForm();
  initMemoryCarousel();
  initBallDrop();
  initScrapbookTimeline();
  initStickyNotes();
  initIdeasDrawer();
  initBalloonMemories();
  initTerminal();

  // Continuous storybook world interactions
  initOpeningCursorParallax();
  initDeskGatewayAnimation();
  initScrapbookCube();
  initPersistentCompanion();
});

/* ============================================================
   1. SCENE 1: STORYBOOK OPENING ANIMATION SEQUENCE (PRESERVED)
   ============================================================ */
function initStorybookOpeningSequence() {
  const masterTimeline = gsap.timeline({
    defaults: { ease: "power2.out" }
  });

  const actorGroup = document.getElementById("main-actor-group");
  const balloonRig = document.getElementById("balloon-rig");
  const characterRig = document.getElementById("character-rig");
  const legLeft = document.getElementById("char-leg-left");
  const legRight = document.getElementById("char-leg-right");
  const scarfTails = document.getElementById("scarf-tails");
  const hairFlutter = document.getElementById("hair-flutter");
  const string = document.getElementById("balloon-string");

  const storyTag = document.getElementById("story-tag");
  const storyTitle = document.getElementById("story-title");
  const storyManifesto = document.getElementById("story-manifesto");
  const storyActions = document.getElementById("story-actions");
  const scrollHint = document.getElementById("scroll-hint");

  const stars = document.querySelectorAll(".drawn-star");
  const sparkles = document.querySelectorAll(".sparkle");
  const seeds = document.querySelectorAll(".floating-seed");

  // Step 1: Initial State (Offscreen above viewport)
  gsap.set(actorGroup, { y: -520, opacity: 1 });
  gsap.set(balloonRig, { rotation: -6, transformOrigin: "500px 240px" });
  gsap.set(characterRig, { rotation: 4, transformOrigin: "0px 0px" });
  gsap.set([stars, sparkles, seeds], { scale: 0, opacity: 0, transformOrigin: "center" });
  gsap.set([storyTag, storyTitle, storyManifesto, storyActions, scrollHint], { opacity: 0, y: 15 });

  // Step 2 & 3: Character enters from upper screen holding the string, lowering balloon
  masterTimeline
    .addLabel("enter", 0.2)
    .to(actorGroup, {
      duration: 1.8,
      y: 0,
      ease: "power2.out"
    }, "enter")

    // Balloon physics: slight lag, rotation, and elastic pull as if lowered down
    .to(balloonRig, {
      duration: 2.0,
      rotation: 2,
      ease: "elastic.out(1, 0.5)"
    }, "enter+=0.1")

    // Character gentle sway and leg kick during descent
    .to(legLeft, {
      duration: 0.6,
      rotation: 12,
      yoyo: true,
      repeat: 3,
      ease: "sine.inOut"
    }, "enter")
    .to(legRight, {
      duration: 0.6,
      rotation: -10,
      yoyo: true,
      repeat: 3,
      ease: "sine.inOut"
    }, "enter")

    // Scarf flutter during descent
    .to(scarfTails, {
      duration: 0.5,
      rotation: 18,
      yoyo: true,
      repeat: 3,
      ease: "sine.inOut"
    }, "enter")

    // String flex/tension
    .to(string, {
      duration: 1.6,
      attr: { d: "M 500 407 Q 498 440 484 472 T 482 505" },
      ease: "power1.out"
    }, "enter+=0.1")

    // Step 5: Balloon & Character Settle into Center
    .addLabel("settled", "-=0.3")
    .to(balloonRig, {
      duration: 0.8,
      rotation: 0,
      ease: "power2.out"
    }, "settled")
    .to(characterRig, {
      duration: 0.8,
      rotation: 0,
      ease: "power2.out"
    }, "settled")

    // Step 6: Reveal Text: "WELCOME TO MY LITTLE WORLD" & "I'm Priyanshi — Still Becoming."
    .addLabel("revealText", "settled+=0.1")
    .to([storyTag, storyTitle, storyManifesto, storyActions, scrollHint], {
      duration: 0.8,
      opacity: 1,
      y: 0,
      stagger: 0.12,
      ease: "power2.out"
    }, "revealText")

    // Step 7: Pop-in Doodles, Stars & Hand-Drawn Sparkles
    .to(stars, {
      duration: 0.6,
      scale: 1,
      opacity: 1,
      stagger: 0.1,
      ease: "back.out(1.8)"
    }, "revealText+=0.2")
    .to(sparkles, {
      duration: 0.5,
      scale: 1,
      opacity: 1,
      stagger: 0.08,
      ease: "back.out(2)"
    }, "revealText+=0.3")
    .to(seeds, {
      duration: 0.6,
      scale: 1,
      opacity: 0.85,
      stagger: 0.1,
      ease: "power2.out"
    }, "revealText+=0.4")
    .call(startAmbientStorybookPhysics, [], "revealText+=0.8");
}

/* ============================================================
   2. AMBIENT NATURAL FLOATING PHYSICS FOR SCENE 1 (PRESERVED)
   ============================================================ */
function startAmbientStorybookPhysics() {
  const balloonRig = document.getElementById("balloon-rig");
  const characterRig = document.getElementById("character-rig");
  const scarfTails = document.getElementById("scarf-tails");
  const hairFlutter = document.getElementById("hair-flutter");
  const legLeft = document.getElementById("char-leg-left");
  const legRight = document.getElementById("char-leg-right");

  // Gentle, continuous floating motion for the balloon
  gsap.to(balloonRig, {
    duration: 3.8,
    y: "+=12",
    rotation: 1.6,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  });

  // Character floating softly in harmony with the balloon string
  gsap.to(characterRig, {
    duration: 4.1,
    y: "+=10",
    rotation: -1.2,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
    delay: 0.3
  });

  // Dangler legs subtle floating drift
  gsap.to(legLeft, {
    duration: 3.2,
    rotation: 4,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  });
  gsap.to(legRight, {
    duration: 3.6,
    rotation: -3,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
    delay: 0.2
  });

  // Scarf breeze ripple
  gsap.to(scarfTails, {
    duration: 2.8,
    rotation: 8,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  });

  // Whimsical top hair flutter
  gsap.to(hairFlutter, {
    duration: 2.2,
    rotation: 6,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  });

  // Little dandelion seeds drift slowly across the sky
  gsap.to(".floating-seed.seed-1", {
    duration: 8.5,
    x: "+=25",
    y: "-=18",
    rotation: 6,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  });
  gsap.to(".floating-seed.seed-2", {
    duration: 9.2,
    x: "-=20",
    y: "+=15",
    rotation: -5,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  });

  // Stars gentle twinkling
  gsap.to(".drawn-star", {
    duration: 2.4,
    scale: 1.15,
    opacity: 0.9,
    stagger: {
      each: 0.6,
      repeat: -1,
      yoyo: true
    },
    ease: "sine.inOut"
  });
}

/* ============================================================
   3. SCROLL INTERACTION: SCENE 1 TO CHAPTER I
   ============================================================ */
function initStorybookScrollInteraction() {
  if (typeof ScrollTrigger === "undefined") return;

  const scene = document.getElementById("storybook-scene");
  const balloonRig = document.getElementById("balloon-rig");
  const characterRig = document.getElementById("character-rig");
  const textOverlay = document.getElementById("storybook-text-overlay");

  // Continuous seamless transition from Sky into Desk
  gsap.timeline({
    scrollTrigger: {
      trigger: scene,
      start: "top top",
      end: "bottom top",
      scrub: 1.2
    }
  })
  // Character and balloon gracefully descend toward the desk environment
  .to(balloonRig, {
    y: 110,
    rotation: 2.2,
    scale: 0.96,
    ease: "none"
  }, 0)

  .to(characterRig, {
    y: 130,
    rotation: -1.8,
    scale: 0.97,
    ease: "none"
  }, 0)

  // Opening text smoothly dissolves as user descends toward the desk
  .to(textOverlay, {
    opacity: 0,
    y: -40,
    ease: "power1.out"
  }, 0.25)

  // Clouds float upward out of view as we descend
  .to(".cloud-1", {
    y: -120,
    x: -30,
    opacity: 0.2,
    ease: "none"
  }, 0)
  .to(".cloud-2", {
    y: -140,
    x: 40,
    opacity: 0.2,
    ease: "none"
  }, 0);
}

/* ============================================================
   4. CHAPTER VIGNETTE ANIMATIONS (SCROLL-TRIGGERED STORYBOOK)
   ============================================================ */
function initChapterVignetteAnimations() {
  if (typeof ScrollTrigger === "undefined") return;

  const chapters = document.querySelectorAll(".chapter-section");

  chapters.forEach((chapter) => {
    const narrativeCard = chapter.querySelector(".story-paragraph-card");
    const vignette = chapter.querySelector(".vignette-frame");
    const subElements = chapter.querySelectorAll(".reflection-pill, .milestone-card, .learning-card");

    // Smooth physical entrance with 100% solid opacity - NEVER dimming or fading to 0.4
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: chapter,
        start: "top 88%",
        once: true
      }
    });

    if (narrativeCard) {
      tl.from(narrativeCard, {
        duration: 0.7,
        y: 20,
        ease: "power2.out"
      });
    }

    if (vignette) {
      tl.from(vignette, {
        duration: 0.8,
        y: 20,
        scale: 0.98,
        ease: "power2.out"
      }, "-=0.4");
    }

    if (subElements.length > 0) {
      tl.from(subElements, {
        duration: 0.5,
        y: 15,
        stagger: 0.06,
        ease: "power2.out"
      }, "-=0.3");
    }
  });

  // Chapter I: Floating Sticky Notes & Lightbulb Subtle Drift
  gsap.to(".float-note-1", {
    duration: 3.5,
    y: "+=8",
    rotation: -4,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  });
  gsap.to(".float-note-2", {
    duration: 4.0,
    y: "-=7",
    rotation: 6,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
    delay: 0.5
  });
  gsap.to(".float-bulb", {
    duration: 3.0,
    y: "-=6",
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  });

  // Chapter II: Saarthi Floating Compass & Shield Drift
  gsap.to(".float-saarthi-compass", {
    duration: 4.2,
    y: "-=9",
    rotation: 5,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  });
  gsap.to(".float-saarthi-shield", {
    duration: 3.8,
    y: "+=8",
    rotation: -4,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
    delay: 0.3
  });

  // Chapter III: Floating C++ Book, Terminal & Tea Steam
  gsap.to(".float-book-1", {
    duration: 4.5,
    y: "-=8",
    rotation: -8,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  });
  gsap.to(".float-code-brackets", {
    duration: 3.7,
    y: "+=7",
    rotation: 8,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
    delay: 0.4
  });
  gsap.to(".float-cup", {
    duration: 3.2,
    y: "-=5",
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  });

  // Chapter IV: Floating Paper Plane, Letter & Waving Arm
  gsap.to(".float-plane", {
    duration: 4.8,
    x: "+=12",
    y: "-=10",
    rotation: 4,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  });
  gsap.to(".float-letter", {
    duration: 3.6,
    y: "+=6",
    rotation: -6,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  });

  // Priyanshi Friendly Waving Arm in Chapter IV
  const wavingArm = document.getElementById("waving-arm");
  if (wavingArm) {
    gsap.to(wavingArm, {
      duration: 1.2,
      rotation: 14,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  }
}

/* ============================================================
   5. ACCESSIBLE / REDUCED-MOTION FALLBACK
   ============================================================ */
function initAccessibleState() {
  const actorGroup = document.getElementById("main-actor-group");
  const textOverlay = document.getElementById("storybook-text-overlay");
  const storyTag = document.getElementById("story-tag");
  const storyTitle = document.getElementById("story-title");
  const storyManifesto = document.getElementById("story-manifesto");
  const storyActions = document.getElementById("story-actions");
  const scrollHint = document.getElementById("scroll-hint");
  const stars = document.querySelectorAll(".drawn-star");
  const sparkles = document.querySelectorAll(".sparkle");

  if (actorGroup) {
    actorGroup.style.opacity = "1";
    actorGroup.style.transform = "translate(0, 0)";
  }

  if (textOverlay) {
    textOverlay.style.opacity = "1";
  }

  [storyTag, storyTitle, storyManifesto, storyActions, scrollHint].forEach((el) => {
    if (el) {
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }
  });

  stars.forEach((s) => {
    s.style.opacity = "1";
    s.style.transform = "scale(1)";
  });

  sparkles.forEach((sp) => {
    sp.style.opacity = "0.85";
    sp.style.transform = "scale(1)";
  });

  // Ensure all cards, vignettes, and frames are visible
  document.querySelectorAll(".vignette-frame, .sketch-morph-frame, .product-walkthrough-container, .story-paragraph-card, .arch-card").forEach((el) => {
    el.style.opacity = "1";
    el.style.visibility = "visible";
  });
}

/* ============================================================
   6. NAVIGATION & SCROLL SPY
   ============================================================ */
function initMobileNavigation() {
  const menuToggle = document.getElementById("menu-toggle");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  if (!menuToggle || !navMenu) return;

  menuToggle.addEventListener("click", () => {
    menuToggle.classList.toggle("active");
    navMenu.classList.toggle("open");
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      menuToggle.classList.remove("active");
      navMenu.classList.remove("open");
    });
  });

  // Active link scroll spy
  window.addEventListener("scroll", () => {
    const scrollPos = window.pageYOffset + 140;
    const sections = document.querySelectorAll("section[id]");

    sections.forEach((sec) => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute("id");

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach((nl) => {
          nl.classList.remove("active");
          if (nl.getAttribute("href") === `#${id}`) {
            nl.classList.add("active");
          }
        });
      }
    });
  });
}

/* ============================================================
   7. CONTACT FORM INTERACTION
   ============================================================ */
function initContactForm() {
  const form = document.getElementById("contact-form");
  const feedback = document.getElementById("form-feedback");

  if (!form || !feedback) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();

    feedback.innerHTML = `Thank you, ${name || "fellow traveler"}! Your note is ready. <a href="mailto:pkshah2021@gmail.com?subject=${encodeURIComponent(subject || 'Hello from your portfolio')}&body=${encodeURIComponent(message + '\n\n— ' + (name || 'A fellow traveler'))}" style="text-decoration: underline; font-weight: 600; color: #2F4D2A;">Click here to send directly to pkshah2021@gmail.com ↗</a>`;
    feedback.className = "form-feedback success";

    form.reset();

    setTimeout(() => {
      feedback.style.display = "none";
    }, 14000);
  });
}

/* ============================================================
   8. SAARTHI SCENE SCROLL ANIMATIONS (GSAP)
   ============================================================ */
function initSaarthiStorySceneAnimations() {
  if (typeof ScrollTrigger === "undefined") return;

  const saarthiScenes = document.querySelectorAll(".saarthi-story-scene");

  saarthiScenes.forEach((scene) => {
    // Only animate textual badges, quotes, and cards - full 100% solid opacity at all times
    const textCards = scene.querySelectorAll(".scene-step-badge, .scene-lead-quote, .story-paragraph-card, .arch-card");
    if (textCards.length > 0) {
      gsap.from(textCards, {
        scrollTrigger: {
          trigger: scene,
          start: "top 88%",
          once: true
        },
        duration: 0.6,
        y: 18,
        stagger: 0.06,
        ease: "power2.out"
      });
    }
  });

  // Scene 1: Floating Question Marks & Thought Bubble
  gsap.to(".float-question-1", {
    duration: 3.2,
    y: "-=10",
    rotation: -6,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  });
  gsap.to(".float-question-2", {
    duration: 3.8,
    y: "+=8",
    rotation: 5,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
    delay: 0.4
  });
  gsap.to(".float-thought-cloud", {
    duration: 4.2,
    y: "-=6",
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  });

  // Scene 2: Research Sticky Notes Floating
  gsap.to(".s-note-1", {
    duration: 3.6,
    y: "+=6",
    rotation: -6,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  });
  gsap.to(".s-note-2", {
    duration: 4.0,
    y: "-=7",
    rotation: 5,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
    delay: 0.3
  });
  gsap.to(".s-note-3", {
    duration: 3.4,
    y: "+=8",
    rotation: -4,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
    delay: 0.6
  });

  // Scene 6: Horizon Stars
  gsap.to(".float-horizon-star-1", {
    duration: 2.8,
    scale: 1.2,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  });
  gsap.to(".float-horizon-star-2", {
    duration: 3.2,
    scale: 1.15,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
    delay: 0.5
  });
}

/* ============================================================
   9. SKETCH-TO-INTERFACE MORPH TOGGLE (SCENE 3)
   ============================================================ */
function initSketchMorph() {
  const btnSketch = document.getElementById("btn-show-sketch");
  const btnInterface = document.getElementById("btn-show-interface");
  const layerSketch = document.getElementById("layer-sketch");
  const layerInterface = document.getElementById("layer-interface");

  if (!btnSketch || !btnInterface || !layerSketch || !layerInterface) return;

  btnSketch.addEventListener("click", () => {
    btnSketch.classList.add("active");
    btnInterface.classList.remove("active");
    layerSketch.classList.add("active");
    layerInterface.classList.remove("active");
  });

  btnInterface.addEventListener("click", () => {
    btnInterface.classList.add("active");
    btnSketch.classList.remove("active");
    layerInterface.classList.add("active");
    layerSketch.classList.remove("active");
  });
}

/* ============================================================
   10. SAARTHI PRODUCT WALKTHROUGH CONTROLS (SCENE 5)
   ============================================================ */
function initSaarthiWalkthrough() {
  const walkthroughContainer = document.getElementById("walkthrough-container");
  if (!walkthroughContainer) return;

  const tabs = walkthroughContainer.querySelectorAll(".walkthrough-tab");
  const slides = walkthroughContainer.querySelectorAll(".walkthrough-slide");
  const titleEl = document.getElementById("walkthrough-title");
  const descEl = document.getElementById("walkthrough-desc");
  const counterEl = document.getElementById("step-counter");
  const btnPrev = document.getElementById("walkthrough-prev");
  const btnNext = document.getElementById("walkthrough-next");

  const walkthroughData = [
    {
      title: "01 • Private Financial Workspace (Login)",
      desc: "The calm starting point of Saarthi. Designed to remove the feeling of cold administrative interrogation by providing disposable demo workspace access and reassuring copy."
    },
    {
      title: "02 • The Financial Cockpit & Signal",
      desc: "Instant clarity: ₹52,000 in, ₹7,869 out, ₹44,131 surplus. The 100 Financial Signal score offers holistic health rather than an intimidating credit score."
    },
    {
      title: "03 • Canonical Ledger: Normalized Truth",
      desc: "Every calculation starts from normalized data. Raw imports from Excel, CSV, or bank statements are mapped to structured records (Swiggy, Amazon, Uber, Salary) to ensure the AI never invents phantom transactions."
    },
    {
      title: "04 • Audit & Investigate: Evidence First",
      desc: "Letting Saarthi find what matters. The system runs multi-step deterministic checks first, strictly separating facts, observations, and review items before offering natural language summaries."
    },
    {
      title: "05 • Money Time Machine: What-If Simulation",
      desc: "A digital twin for financial decisions. Users can test scenarios—like reducing food spending by 20%—to preview the exact budgetary impact without touching their real bank accounts or ledger."
    },
    {
      title: "06 • Voice & Natural Interaction: Talk It Out",
      desc: "Bringing browser speech recognition to finance. Users who find complex filters intimidating can simply tap the microphone and ask their question naturally in their own words."
    }
  ];

  let currentSlide = 0;

  function updateSlide(index) {
    if (index < 0) index = walkthroughData.length - 1;
    if (index >= walkthroughData.length) index = 0;
    currentSlide = index;

    // Update slides
    slides.forEach((slide, i) => {
      if (i === currentSlide) {
        slide.classList.add("active");
      } else {
        slide.classList.remove("active");
      }
    });

    // Update tabs
    tabs.forEach((tab, i) => {
      const isSelected = i === currentSlide;
      tab.classList.toggle("active", isSelected);
      tab.setAttribute("aria-selected", isSelected ? "true" : "false");
    });

    // Update text explanations
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

  // Keyboard navigation when interacting with walkthrough
  walkthroughContainer.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") {
      updateSlide(currentSlide + 1);
    } else if (e.key === "ArrowLeft") {
      updateSlide(currentSlide - 1);
    }
  });
}

/* ============================================================
   11. SIGNATURE 3D MEMORY CAROUSEL & OBJECT ZOOM INTERACTION
   ============================================================ */
function initMemoryCarousel() {
  const viewport = document.getElementById("carousel-viewport");
  const ring = document.getElementById("carousel-ring");
  const items = document.querySelectorAll(".carousel-item");
  const btnPrev = document.getElementById("carousel-prev-btn");
  const btnNext = document.getElementById("carousel-next-btn");

  // Zoom-in Focus Stage Elements
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
  let velocity = 0;
  let autoRotate = true;
  let selectedIndex = -1;

  function getRadius() {
    return window.innerWidth <= 768 ? 140 : 210;
  }

  // Update item 3D positions around the circular platform
  function updateCarousel() {
    const radius = getRadius();
    const step = 360 / count;

    items.forEach((item, index) => {
      const angleDeg = (index * step + currentRotation) % 360;
      const angleRad = (angleDeg * Math.PI) / 180;

      // Calculate 3D coordinates on circular turntable
      const x = Math.sin(angleRad) * radius;
      const z = Math.cos(angleRad) * radius;
      
      // Depth scaling and layering
      const normalizedZ = (z + radius) / (2 * radius); // 0 (back) to 1 (front)
      const scale = 0.82 + normalizedZ * 0.28;
      const opacity = 0.5 + normalizedZ * 0.5;
      const zIndex = Math.round(normalizedZ * 100);

      // Billboard items towards the viewer
      item.style.transform = `translate3d(${x}px, 0px, ${z}px) scale(${scale})`;
      item.style.zIndex = zIndex;
      item.style.opacity = opacity;
    });
  }

  // Physics animation loop for smooth drag and subtle ambient spin
  function tick() {
    if (!isDragging) {
      if (autoRotate && (!focusOverlay || !focusOverlay.classList.contains("active"))) {
        targetRotation += 0.12; // gentle ambient float
      }
      currentRotation += (targetRotation - currentRotation) * 0.1;
      velocity *= 0.92;
      targetRotation += velocity;
    } else {
      currentRotation += (targetRotation - currentRotation) * 0.35;
    }

    updateCarousel();
    requestAnimationFrame(tick);
  }

  // Drag Interactions (Mouse & Touch)
  function onPointerDown(clientX) {
    isDragging = true;
    autoRotate = false;
    startX = clientX;
    lastX = clientX;
    velocity = 0;
    viewport.classList.add("is-dragging");
  }

  function onPointerMove(clientX) {
    if (!isDragging) return;
    const deltaX = clientX - lastX;
    velocity = deltaX * 0.35;
    targetRotation += velocity;
    lastX = clientX;
  }

  function onPointerUp() {
    if (!isDragging) return;
    isDragging = false;
    viewport.classList.remove("is-dragging");
    setTimeout(() => {
      if (!isDragging && focusOverlay && !focusOverlay.classList.contains("active")) {
        autoRotate = true;
      }
    }, 3000);
  }

  // Mouse listeners
  viewport.addEventListener("mousedown", (e) => {
    if (e.button === 0) onPointerDown(e.clientX);
  });
  window.addEventListener("mousemove", (e) => onPointerMove(e.clientX));
  window.addEventListener("mouseup", onPointerUp);

  // Touch listeners
  viewport.addEventListener("touchstart", (e) => {
    if (e.touches.length === 1) onPointerDown(e.touches[0].clientX);
  }, { passive: true });
  window.addEventListener("touchmove", (e) => {
    if (isDragging && e.touches.length === 1) onPointerMove(e.touches[0].clientX);
  }, { passive: true });
  window.addEventListener("touchend", onPointerUp);

  // Manual rotation buttons
  if (btnPrev) {
    btnPrev.addEventListener("click", () => {
      autoRotate = false;
      targetRotation += 360 / count;
      setTimeout(() => { autoRotate = true; }, 3500);
    });
  }

  if (btnNext) {
    btnNext.addEventListener("click", () => {
      autoRotate = false;
      targetRotation -= 360 / count;
      setTimeout(() => { autoRotate = true; }, 3500);
    });
  }

  // ----------------------------------------------------
  // OBJECT SELECTION & 3D ZOOM-IN INSPECTION MODAL
  // ----------------------------------------------------
  function openMemory(index) {
    selectedIndex = index;
    const item = items[index];
    if (!item) return;

    autoRotate = false;

    // Extract data
    const title = item.getAttribute("data-title") || "";
    const subtitle = item.getAttribute("data-subtitle") || "";
    const tag = item.getAttribute("data-tag") || "Artifact";
    const note = item.getAttribute("data-note") || "";
    const visualBox = item.querySelector(".item-visual-box");

    // Populate Modal
    if (focusTag) focusTag.textContent = tag;
    if (focusTitle) focusTitle.textContent = title;
    if (focusSubtitle) focusSubtitle.textContent = subtitle;
    if (focusBody) focusBody.textContent = `“${note}”`;

    // Clone SVG with crisp resolution
    if (focusRender && visualBox) {
      focusRender.innerHTML = visualBox.innerHTML;
    }

    // Activate Focus Overlay
    if (focusOverlay) {
      focusOverlay.classList.add("active");
      focusOverlay.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    }
  }

  function closeMemory() {
    if (focusOverlay) {
      focusOverlay.classList.remove("active");
      focusOverlay.setAttribute("aria-hidden", "true");
    }
    document.body.style.overflow = "";
    selectedIndex = -1;
    setTimeout(() => {
      autoRotate = true;
    }, 1500);
  }

  // Click on items to inspect
  items.forEach((item, index) => {
    item.addEventListener("click", (e) => {
      if (Math.abs(velocity) > 1.2) return;
      openMemory(index);
    });
  });

  // Close buttons and backdrop
  if (btnClose) btnClose.addEventListener("click", closeMemory);
  if (focusBackdrop) focusBackdrop.addEventListener("click", closeMemory);

  // Next Memory button inside modal
  if (btnNextMemory) {
    btnNextMemory.addEventListener("click", () => {
      const nextIndex = (selectedIndex + 1) % count;
      targetRotation -= 360 / count;
      openMemory(nextIndex);
    });
  }

  // Escape key to close
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && focusOverlay && focusOverlay.classList.contains("active")) {
      closeMemory();
    }
  });

  // Start rotation loop
  tick();
}

/* ============================================================
   12. THE CURIOSITY PEBBLE (BALL DROP SIMULATION)
   ============================================================ */
function initBallDrop() {
  const canvas = document.getElementById("pebble-canvas");
  const btnDrop = document.getElementById("btn-drop-marble");
  const statusBadge = document.getElementById("pebble-status-badge");
  const resultBox = document.getElementById("pebble-result-box");
  const noteNumEl = document.getElementById("pebble-note-num");
  const quoteEl = document.getElementById("pebble-quote");

  if (!canvas || !btnDrop) return;

  const ctx = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;

  // Authentic student lessons
  const lessons = [
    "Every line of code you write was once something you didn't know how to do. Momentum is just one small pebble at a time.",
    "Debugging with print statements or GDB: the bug isn't elusive because it's hard, it's elusive because you made an assumption you didn't check.",
    "In digital banking, a missing explanation creates immediate anxiety. Software that handles human livelihoods must prioritize clarity over cleverness.",
    "A segmentation fault isn't failureâ€”it's the CPU gently reminding you that computers don't guess, they obey.",
    "You don't need to know every framework in existence. You need to know how to ask questions, read documentation, and stay curious when things break."
  ];

  let currentLessonIndex = 0;

  // Pegboard grid
  const pegs = [];
  const rows = [
    { y: 55, xs: [75, 130, 180, 230, 285] },
    { y: 95, xs: [50, 105, 155, 205, 255, 310] },
    { y: 135, xs: [75, 130, 180, 230, 285] },
    { y: 175, xs: [50, 105, 155, 205, 255, 310] }
  ];

  rows.forEach(row => {
    row.xs.forEach(x => {
      pegs.push({ x, y: row.y, r: 4.5, pulse: 0 });
    });
  });

  // Marble state
  const marble = {
    x: 180,
    y: 18,
    vx: 0,
    vy: 0,
    r: 7.5,
    active: false,
    settled: false,
    trail: []
  };

  function dropMarble() {
    marble.x = 180 + (Math.random() - 0.5) * 20;
    marble.y = 18;
    marble.vx = (Math.random() - 0.5) * 1.5;
    marble.vy = 0.5;
    marble.active = true;
    marble.settled = false;
    marble.trail = [];
    
    if (statusBadge) {
      statusBadge.textContent = "Bouncing down pegs...";
      statusBadge.style.color = "var(--pastel-coral)";
    }
  }

  function settleMarble() {
    marble.settled = true;
    marble.active = false;

    // Pick next lesson
    currentLessonIndex = (currentLessonIndex + 1) % lessons.length;
    if (noteNumEl) noteNumEl.textContent = currentLessonIndex + 1;
    if (quoteEl) quoteEl.textContent = `â€œ${lessons[currentLessonIndex]}â€`;

    if (statusBadge) {
      statusBadge.textContent = "Landed in Cradle! âœ¨";
      statusBadge.style.color = "var(--pastel-sage-dark, #5F7D5A)";
    }

    if (resultBox) {
      resultBox.style.transform = "rotate(0deg) scale(1.03)";
      setTimeout(() => {
        resultBox.style.transform = "rotate(-1deg) scale(1)";
      }, 350);
    }
  }

  function update() {
    if (marble.active) {
      marble.vy += 0.38; // gravity
      marble.vx *= 0.99; // air resistance
      marble.vy *= 0.99;
      marble.x += marble.vx;
      marble.y += marble.vy;

      // Add to trail
      marble.trail.push({ x: marble.x, y: marble.y, life: 1 });
      if (marble.trail.length > 8) marble.trail.shift();

      // Side wall bounces
      const minX = 20 + marble.r;
      const maxX = width - 20 - marble.r;
      if (marble.x < minX) {
        marble.x = minX;
        marble.vx = -marble.vx * 0.65;
      } else if (marble.x > maxX) {
        marble.x = maxX;
        marble.vx = -marble.vx * 0.65;
      }

      // Peg collisions
      pegs.forEach(peg => {
        const dx = marble.x - peg.x;
        const dy = marble.y - peg.y;
        const dist = Math.hypot(dx, dy);
        const minDist = marble.r + peg.r;

        if (dist < minDist && dist > 0) {
          const nx = dx / dist;
          const ny = dy / dist;
          // separate
          marble.x = peg.x + nx * minDist;
          marble.y = peg.y + ny * minDist;

          // bounce
          const dot = marble.vx * nx + marble.vy * ny;
          if (dot < 0) {
            marble.vx -= 1.62 * dot * nx;
            marble.vy -= 1.62 * dot * ny;
            marble.vx += (Math.random() - 0.5) * 0.8;
          }
          peg.pulse = 1;
        }
      });

      // Bottom cradle
      const floorY = 205;
      if (marble.y >= floorY) {
        marble.y = floorY;
        marble.vy = -marble.vy * 0.45;
        // funnel towards center
        marble.vx += (180 - marble.x) * 0.08;
        marble.vx *= 0.85;

        if (Math.abs(marble.vy) < 0.4 && Math.abs(marble.vx) < 0.2) {
          settleMarble();
        }
      }
    }

    // Decay peg pulses
    pegs.forEach(peg => {
      if (peg.pulse > 0) peg.pulse -= 0.05;
    });

    // Decay trail
    marble.trail.forEach(t => {
      t.life -= 0.08;
    });
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);

    // Warm wooden pegboard background
    ctx.fillStyle = "#F8EFEB";
    ctx.fillRect(0, 0, width, height);

    // Subtle guide grain lines
    ctx.strokeStyle = "rgba(44, 40, 37, 0.05)";
    ctx.lineWidth = 1;
    for (let y = 30; y < height; y += 20) {
      ctx.beginPath();
      ctx.moveTo(15, y);
      ctx.lineTo(width - 15, y);
      ctx.stroke();
    }

    // Funnel catcher chute at bottom
    ctx.strokeStyle = "#2C2825";
    ctx.lineWidth = 2.5;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(30, 195);
    ctx.quadraticCurveTo(80, 215, 140, 218);
    ctx.lineTo(220, 218);
    ctx.quadraticCurveTo(280, 215, 330, 195);
    ctx.stroke();

    // Pegs
    pegs.forEach(peg => {
      // Peg shadow
      ctx.fillStyle = "rgba(44, 40, 37, 0.15)";
      ctx.beginPath();
      ctx.arc(peg.x + 1, peg.y + 1.5, peg.r, 0, Math.PI * 2);
      ctx.fill();

      // Peg body
      ctx.fillStyle = peg.pulse > 0 ? "#E59982" : "#8E837A";
      ctx.beginPath();
      ctx.arc(peg.x, peg.y, peg.r + peg.pulse * 2, 0, Math.PI * 2);
      ctx.fill();

      // Brass pin center
      ctx.fillStyle = "#FAF7F2";
      ctx.beginPath();
      ctx.arc(peg.x - 1, peg.y - 1, peg.r * 0.35, 0, Math.PI * 2);
      ctx.fill();
    });

    // Trail
    marble.trail.forEach(t => {
      if (t.life > 0) {
        ctx.fillStyle = `rgba(229, 153, 130, ${t.life * 0.35})`;
        ctx.beginPath();
        ctx.arc(t.x, t.y, marble.r * 0.65, 0, Math.PI * 2);
        ctx.fill();
      }
    });

    // Marble
    if (marble.active || marble.settled) {
      // Marble drop shadow
      ctx.fillStyle = "rgba(44, 40, 37, 0.22)";
      ctx.beginPath();
      ctx.ellipse(marble.x, marble.y + 5, marble.r, marble.r * 0.45, 0, 0, Math.PI * 2);
      ctx.fill();

      // Marble glossy sphere
      const grad = ctx.createRadialGradient(
        marble.x - marble.r * 0.3,
        marble.y - marble.r * 0.3,
        1,
        marble.x,
        marble.y,
        marble.r
      );
      grad.addColorStop(0, "#FCE9DE");
      grad.addColorStop(0.5, "#E59982");
      grad.addColorStop(1, "#B85D43");

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(marble.x, marble.y, marble.r, 0, Math.PI * 2);
      ctx.fill();

      // Crisp outline
      ctx.strokeStyle = "#2C2825";
      ctx.lineWidth = 1.4;
      ctx.stroke();

      // Little specular shine dot
      ctx.fillStyle = "#FFFFFF";
      ctx.beginPath();
      ctx.arc(marble.x - marble.r * 0.35, marble.y - marble.r * 0.35, marble.r * 0.28, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function loop() {
    update();
    draw();
    requestAnimationFrame(loop);
  }

  btnDrop.addEventListener("click", dropMarble);

  // Trigger once on view
  let triggeredOnScroll = false;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !triggeredOnScroll) {
        triggeredOnScroll = true;
        setTimeout(dropMarble, 600);
      }
    });
  }, { threshold: 0.4 });

  observer.observe(canvas);
  loop();
}

/* ============================================================
   13. SCRAPBOOK JOURNEY TIMELINE & POLAROID FRAMES
   ============================================================ */
function initScrapbookTimeline() {
  const nodes = document.querySelectorAll(".milestone-node");
  const cardPill = document.getElementById("ms-pill");
  const cardTitle = document.getElementById("ms-title");
  const cardDesc = document.getElementById("ms-desc");
  const cardTakeaway = document.getElementById("ms-takeaway");
  const polaroids = document.querySelectorAll(".polaroid-frame");

  if (nodes.length === 0) return;

  const milestonesData = [
    {
      pill: "Milestone 01 â€¢ High School",
      title: "Writing My Very First Line of Code",
      desc: "It was an asterisks pyramid printed to the command prompt in a dusty computer lab. It crashed three times before running. But that feelingâ€”of giving an inanimate machine a thought and watching it respondâ€”sparked the endless curiosity that brought me into Computer Science.",
      takeaway: "<em>Lesson: â€œEvery master began by printing naive text to a dark terminal.â€</em>"
    },
    {
      pill: "Milestone 02 â€¢ Year 1",
      title: "Deep End: The First Hackathon",
      desc: "Walking into an auditorium packed with senior engineers, multiple monitors, and unfamiliar terminal commands felt terrifying. For two hours I questioned if I belonged. Then we grabbed sketchbooks, asked naive user questions, and started building. I learned that you don't need to know everything to make a meaningful start.",
      takeaway: "<em>Lesson: â€œAction dispels imposter syndrome faster than preparation ever can.â€</em>"
    },
    {
      pill: "Milestone 03 â€¢ FinTech Track",
      title: "The Genesis of Saarthi",
      desc: "Watching my family get paralyzed by ambiguous banking alerts ('Transaction Pending: Error Code 8821') convinced me that banking apps lacked human context. We pitched Saarthiâ€”an assistant that bridges raw ledger entries with real-world contextâ€”and spent 36 sleepless hours turning sketches into a working prototype.",
      takeaway: "<em>Lesson: â€œThe strongest software comes from solving frustrations you've personally witnessed.â€</em>"
    },
    {
      pill: "Milestone 04 â€¢ Core Foundations",
      title: "Wrestling with C++ & DSA",
      desc: "Countless late nights wrestling with pointer arithmetic, memory allocation, and graph traversals. When you strip away modern frameworks and look directly at memory, you develop deep respect for what happens under the hood.",
      takeaway: "<em>Lesson: â€œUnderstanding how things break teaches you how to build things that last.â€</em>"
    },
    {
      pill: "Milestone 05 â€¢ Present",
      title: "Designing for Humans (Still Becoming)",
      desc: "Today, my craft lives at the intersection of rigorous problem-solving and gentle, human-centric design. Every interface is a conversation, and every system should respect the human on the other side.",
      takeaway: "<em>Lesson: â€œStill becoming. The journey itself is the craft.â€</em>"
    }
  ];

  nodes.forEach(node => {
    node.addEventListener("click", () => {
      const stepIndex = parseInt(node.getAttribute("data-step"), 10);
      const data = milestonesData[stepIndex];
      if (!data) return;

      nodes.forEach(n => n.classList.remove("active"));
      node.classList.add("active");

      // Smooth content update
      if (cardTitle) {
        cardTitle.style.opacity = "0.2";
        setTimeout(() => {
          if (cardPill) cardPill.textContent = data.pill;
          if (cardTitle) cardTitle.textContent = data.title;
          if (cardDesc) cardDesc.textContent = data.desc;
          if (cardTakeaway) cardTakeaway.innerHTML = data.takeaway;
          cardTitle.style.opacity = "1";
        }, 150);
      }
    });
  });

  // Polaroid interactive tilts & snaps
  polaroids.forEach(polaroid => {
    polaroid.addEventListener("click", () => {
      polaroid.classList.toggle("is-focused");
    });
  });
}

/* ============================================================
   14. INTERACTIVE STICKY NOTE WALL & EXPANDED CARD MODAL
   ============================================================ */
function initStickyNotes() {
  const notes = document.querySelectorAll(".sticky-note");
  const overlay = document.getElementById("sticky-expanded-overlay");
  const backdrop = document.getElementById("sticky-modal-backdrop");
  const btnClose = document.getElementById("btn-close-sticky");
  const tagEl = document.getElementById("sticky-tag");
  const titleEl = document.getElementById("sticky-title");
  const dateEl = document.getElementById("sticky-date");
  const bodyEl = document.getElementById("sticky-body");

  if (notes.length === 0 || !overlay) return;

  function openNote(note) {
    const tag = note.getAttribute("data-tag") || "Reflection";
    const title = note.getAttribute("data-title") || "Note";
    const date = note.getAttribute("data-date") || "Scrapbook";
    const fullContentEl = note.querySelector(".note-full-content");
    const fullContent = fullContentEl ? fullContentEl.innerHTML : note.querySelector(".note-mini-preview").textContent;

    if (tagEl) tagEl.textContent = tag;
    if (titleEl) titleEl.textContent = title;
    if (dateEl) dateEl.textContent = date;
    if (bodyEl) bodyEl.innerHTML = `<p>${fullContent.trim()}</p>`;

    overlay.classList.add("active");
    overlay.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeNote() {
    overlay.classList.remove("active");
    overlay.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  notes.forEach(note => {
    note.addEventListener("click", () => openNote(note));
  });

  if (btnClose) btnClose.addEventListener("click", closeNote);
  if (backdrop) backdrop.addEventListener("click", closeNote);

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && overlay.classList.contains("active")) {
      closeNote();
    }
  });
}

/* ============================================================
   15. UNFINISHED IDEAS DRAWER
   ============================================================ */
function initIdeasDrawer() {
  const drawerBox = document.getElementById("drawer-box");
  const btnPull = document.getElementById("btn-pull-drawer");
  const btnToggle = document.getElementById("btn-drawer-toggle");
  const toggleText = document.getElementById("drawer-toggle-text");
  const pullLabel = document.querySelector(".handle-pull-label");
  const toggleIcon = document.querySelector(".drawer-toggle-icon");

  if (!drawerBox) return;

  function toggleDrawer() {
    const isOpen = drawerBox.classList.toggle("is-open");

    if (toggleText) {
      toggleText.textContent = isOpen ? "Close Drawer" : "Pull Drawer Open";
    }
    if (pullLabel) {
      pullLabel.textContent = isOpen ? "Push Drawer â†‘" : "Pull Drawer â†“";
    }
    if (toggleIcon) {
      toggleIcon.textContent = isOpen ? "â†‘" : "â†“";
    }
  }

  if (btnPull) btnPull.addEventListener("click", toggleDrawer);
  if (btnToggle) btnToggle.addEventListener("click", toggleDrawer);
}

/* ============================================================
   16. BALLOON MEMORIES ("LITTLE THINGS THAT MADE ME")
   ============================================================ */
function initBalloonMemories() {
  const balloons = document.querySelectorAll(".interactive-memory-balloon");
  const canvas = document.getElementById("balloon-pop-canvas");
  const trayCard = document.getElementById("balloon-tray-card");
  const trayTitle = document.getElementById("tray-title");
  const trayQuote = document.getElementById("tray-quote");
  const btnReinflate = document.getElementById("btn-reinflate-balloons");

  if (balloons.length === 0) return;

  let ctx = null;
  let particles = [];

  if (canvas) {
    ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    if (rect.width > 0) {
      canvas.width = rect.width;
      canvas.height = rect.height;
    }
  }

  function spawnBurst(originX, originY, color) {
    if (!ctx) return;
    for (let i = 0; i < 35; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 2 + Math.random() * 5;
      particles.push({
        x: originX,
        y: originY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1.5,
        r: 3 + Math.random() * 4,
        color: color || "#E59982",
        alpha: 1,
        decay: 0.02 + Math.random() * 0.02,
        isStar: Math.random() > 0.5
      });
    }
  }

  function updateParticles() {
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.12; // soft gravity
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
        ctx.beginPath();
        for (let j = 0; j < 4; j++) {
          ctx.rotate(Math.PI / 2);
          ctx.lineTo(p.r * 1.5, 0);
          ctx.lineTo(p.r * 0.4, p.r * 0.4);
        }
        ctx.fill();
      } else {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }

    if (particles.length > 0) {
      requestAnimationFrame(updateParticles);
    }
  }

  balloons.forEach(balloon => {
    balloon.addEventListener("click", (e) => {
      if (balloon.classList.contains("is-popped")) return;

      const title = balloon.getAttribute("data-title") || "Memory";
      const lesson = balloon.getAttribute("data-lesson") || "";
      const color = balloon.getAttribute("data-color") || "#E59982";

      if (canvas) {
        const cRect = canvas.getBoundingClientRect();
        const bRect = balloon.getBoundingClientRect();
        const originX = bRect.left + bRect.width / 2 - cRect.left;
        const originY = bRect.top + bRect.height / 3 - cRect.top;
        spawnBurst(originX, originY, color);
        if (particles.length <= 35) {
          requestAnimationFrame(updateParticles);
        }
      }

      balloon.classList.add("is-popped");

      if (trayCard) {
        trayCard.style.display = "block";
        if (trayTitle) trayTitle.textContent = title;
        if (trayQuote) trayQuote.textContent = `â€œ${lesson}â€`;
        trayCard.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    });
  });

  if (btnReinflate) {
    btnReinflate.addEventListener("click", () => {
      balloons.forEach((balloon, i) => {
        setTimeout(() => {
          balloon.classList.remove("is-popped");
        }, i * 100);
      });
      if (trayCard) {
        trayCard.style.display = "none";
      }
    });
  }
}

/* ============================================================
   17. RETRO COMMAND CENTRE (TERMINAL NAVIGATION ENGINE)
   ============================================================ */
function initTerminal() {
  const overlay = document.getElementById("terminal-overlay");
  const backdrop = document.getElementById("terminal-backdrop");
  const btnToggle = document.getElementById("btn-command-centre-toggle");
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
    }, 100);
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

  function executeCommand(cmdRaw) {
    const cmd = cmdRaw.trim().toLowerCase();
    if (!cmd) return;

    printLine(`<span class="term-prompt">priyanshi@portfolio:~$</span> ${escapeHTML(cmdRaw)}`, "term-cmd-history");

    switch (cmd) {
      case "help":
        printLine("<span class='term-highlight'>Available commands:</span>");
        printLine("  <span class='term-cmd'>about</span>     - Priyanshi's story & student background");
        printLine("  <span class='term-cmd'>saarthi</span>   - Deep dive into the flagship banking context prototype");
        printLine("  <span class='term-cmd'>skills</span>    - Technical stack & foundations (C++, DSA, UI, AI)");
        printLine("  <span class='term-cmd'>artifacts</span> - Scroll to 3D Memory Stand");
        printLine("  <span class='term-cmd'>timeline</span>  - Scroll to Scrapbook Journey Timeline");
        printLine("  <span class='term-cmd'>drawer</span>    - Open the Unfinished Ideas Drawer");
        printLine("  <span class='term-cmd'>ball</span>      - Drop a pebble down the pegboard");
        printLine("  <span class='term-cmd'>balloons</span>  - Go to Balloon Memories garden");
        printLine("  <span class='term-cmd'>contact</span>   - Contact details (email & manifesto)");
        printLine("  <span class='term-cmd'>clear</span>     - Clear terminal buffer");
        printLine("  <span class='term-cmd'>exit</span>      - Close this terminal modal");
        break;

      case "about":
        printLine("Priyanshi â€” Computer Science undergraduate & creative builder.");
        printLine("Philosophy: <em>Still Becoming.</em> Always curious, always learning, building with empathy.");
        printLine("Focused on bridging rigorous computing foundations with humane interfaces.");
        break;

      case "projects":
      case "saarthi":
        printLine("â˜… <strong>Saarthi</strong> â€” Missing Context in Digital Banking Assistant.");
        printLine("Built during a FinTech hackathon to bridge raw bank ledgers with clear human context.");
        printLine("<a href='saarthi.html' class='term-link'>â†’ Click here to open the Dedicated Saarthi Case Study page</a>");
        break;

      case "skills":
        printLine("<strong>Foundations:</strong> C++, Data Structures & Algorithms, OOP, Memory Management");
        printLine("<strong>Frontend:</strong> JavaScript (ES6+), HTML5 Canvas, CSS3 3D transforms, SVG, GSAP");
        printLine("<strong>Design:</strong> UI/UX Research, Wireframing, Accessible Typography, Information Hierarchy");
        printLine("<strong>Applied:</strong> Contextual AI orchestration, Financial data parsing, REST APIs");
        break;

      case "artifacts":
      case "carousel":
        printLine("Navigating to 3D Memory Carousel...");
        closeTerminal();
        const carousel = document.getElementById("memory-stand");
        if (carousel) carousel.scrollIntoView({ behavior: "smooth" });
        break;

      case "timeline":
        printLine("Navigating to Scrapbook Journey Timeline...");
        closeTerminal();
        const timeline = document.getElementById("journey-timeline");
        if (timeline) timeline.scrollIntoView({ behavior: "smooth" });
        break;

      case "drawer":
        printLine("Opening Unfinished Ideas Drawer...");
        closeTerminal();
        const drawerMod = document.getElementById("ideas-drawer-module");
        if (drawerMod) {
          drawerMod.scrollIntoView({ behavior: "smooth" });
          const box = document.getElementById("drawer-box");
          if (box && !box.classList.contains("is-open")) {
            const btnPull = document.getElementById("btn-pull-drawer");
            if (btnPull) btnPull.click();
          }
        }
        break;

      case "ball":
      case "pebble":
        printLine("Dropping Curiosity Pebble...");
        closeTerminal();
        const pebbleSec = document.querySelector(".curiosity-pebble-container");
        if (pebbleSec) {
          pebbleSec.scrollIntoView({ behavior: "smooth" });
          const btn = document.getElementById("btn-drop-marble");
          if (btn) btn.click();
        }
        break;

      case "balloons":
        printLine("Navigating to Balloon Memories garden...");
        closeTerminal();
        const balloonsSec = document.getElementById("balloon-memories");
        if (balloonsSec) balloonsSec.scrollIntoView({ behavior: "smooth" });
        break;

      case "contact":
        printLine("Email: <a href='mailto:pkshah2021@gmail.com' class='term-link'>pkshah2021@gmail.com</a>");
        printLine("â€œStill becoming. Always curious. Always building.â€");
        closeTerminal();
        const ch4 = document.getElementById("chapter-4");
        if (ch4) ch4.scrollIntoView({ behavior: "smooth" });
        break;

      case "clear":
        terminalOutput.innerHTML = `
          <p class="term-welcome">Priyanshi's Scrapbook Command Centre [v2.4]</p>
          <p class="term-dim">Type <span class="term-cmd">help</span> for a list of scrapbook navigation commands.</p>
        `;
        break;

      case "exit":
      case "quit":
        closeTerminal();
        break;

      default:
        printLine(`Command not recognized: '<span class="term-err">${escapeHTML(cmdRaw)}</span>'. Type <span class="term-cmd">help</span> for commands.`, "term-dim");
        break;
    }
  }

  function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag));
  }

  // Input listeners
  terminalInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const val = terminalInput.value;
      if (val.trim()) {
        history.push(val);
        historyIndex = history.length;
        executeCommand(val);
      }
      terminalInput.value = "";
    } else if (e.key === "ArrowUp") {
      if (history.length > 0 && historyIndex > 0) {
        historyIndex--;
        terminalInput.value = history[historyIndex];
      }
    } else if (e.key === "ArrowDown") {
      if (historyIndex < history.length - 1) {
        historyIndex++;
        terminalInput.value = history[historyIndex];
      } else {
        historyIndex = history.length;
        terminalInput.value = "";
      }
    }
  });

  // Toggles and Close triggers
  if (btnToggle) btnToggle.addEventListener("click", openTerminal);
  if (btnCloseDot) btnCloseDot.addEventListener("click", closeTerminal);
  if (btnEsc) btnEsc.addEventListener("click", closeTerminal);
  if (backdrop) backdrop.addEventListener("click", closeTerminal);

  // Global keyboard shortcuts (Ctrl+K, Cmd+K, or ~ when not in an input)
  window.addEventListener("keydown", (e) => {
    const isCtrlK = (e.ctrlKey || e.metaKey) && (e.key === "k" || e.key === "K");
    const isTilde = e.key === "~" || e.key === "`";

    if (isCtrlK || (isTilde && document.activeElement.tagName !== "INPUT" && document.activeElement.tagName !== "TEXTAREA")) {
      e.preventDefault();
      if (overlay.classList.contains("active")) {
        closeTerminal();
      } else {
        openTerminal();
      }
    } else if (e.key === "Escape" && overlay.classList.contains("active")) {
      closeTerminal();
    }
  });
}


/* ============================================================
   18. CURSOR PARALLAX FOR SCENE 1 (THE GIRL & BALLOON)
   ============================================================ */
function initOpeningCursorParallax() {
  const isTouch = window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window;
  if (isTouch) return; // Touch uses scroll float

  const balloonRig = document.getElementById("balloon-rig");
  const characterRig = document.getElementById("character-rig");

  if (!balloonRig || !characterRig) return;

  let targetX = 0;
  let targetY = 0;
  let charX = 0;
  let charY = 0;
  let balloonX = 0;
  let balloonY = 0;
  let balloonRot = 0;

  window.addEventListener("pointermove", (e) => {
    // Normalized coordinates (-1 to 1) from viewport center
    const nx = (e.clientX / window.innerWidth - 0.5) * 2;
    const ny = (e.clientY / window.innerHeight - 0.5) * 2;
    targetX = nx;
    targetY = ny;
  }, { passive: true });

  function tickParallax() {
    // Damped lerp for character (smooth lag)
    charX += (targetX * 14 - charX) * 0.05;
    charY += (targetY * 10 - charY) * 0.05;

    // Independent delayed lerp for floating balloon (larger displacement & gentle air sway)
    balloonX += (targetX * 24 - balloonX) * 0.035;
    balloonY += (targetY * 18 - balloonY) * 0.035;
    balloonRot += (targetX * 2.8 - balloonRot) * 0.04;

    // Displace character and balloon independently relative to their base coordinates
    characterRig.style.transform = `translate(${480 + charX}px, ${500 + charY}px)`;
    balloonRig.style.transform = `translate3d(${balloonX}px, ${balloonY}px, 0px) rotate(${balloonRot}deg)`;

    requestAnimationFrame(tickParallax);
  }

  tickParallax();
}

/* ============================================================
   19. SEAMLESS TRANSITION: SKY TO DESK & DRAWER GATEWAY
   ============================================================ */
function initDeskGatewayAnimation() {
  if (typeof ScrollTrigger === "undefined") return;

  const deskScene = document.getElementById("desk-gateway-scene");
  const deskViewport = document.getElementById("desk-stage-viewport");
  const drawerBox = document.getElementById("drawer-box");
  const cubeStage = document.getElementById("scrapbook-cube-stage");

  if (!deskScene || !deskViewport || !drawerBox) return;

  // Camera zoom and approach towards desk on scroll
  gsap.fromTo(deskViewport, 
    { scale: 0.94, y: 35, opacity: 0.9 },
    {
      scale: 1,
      y: 0,
      opacity: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: deskScene,
        start: "top 80%",
        end: "top 30%",
        scrub: 1
      }
    }
  );

  // Smooth drawer auto-open and 3D Scrapbook emergence as visitor approaches
  ScrollTrigger.create({
    trigger: deskScene,
    start: "top 60%",
    onEnter: () => {
      if (!drawerBox.classList.contains("is-open")) {
        drawerBox.classList.add("is-open");
        const toggleText = document.getElementById("drawer-toggle-text");
        const pullLabel = document.querySelector(".handle-pull-label");
        const toggleIcon = document.querySelector(".drawer-toggle-icon");
        if (toggleText) toggleText.textContent = "Close Drawer";
        if (pullLabel) pullLabel.textContent = "Push Drawer â†‘";
        if (toggleIcon) toggleIcon.textContent = "â†‘";
      }
    },
    onLeaveBack: () => {
      if (drawerBox.classList.contains("is-open")) {
        drawerBox.classList.remove("is-open");
        const toggleText = document.getElementById("drawer-toggle-text");
        const pullLabel = document.querySelector(".handle-pull-label");
        const toggleIcon = document.querySelector(".drawer-toggle-icon");
        if (toggleText) toggleText.textContent = "Pull Drawer Open";
        if (pullLabel) pullLabel.textContent = "Pull Drawer Open â†“";
        if (toggleIcon) toggleIcon.textContent = "â†“";
      }
    }
  });

  // Scrapbook 3D Box emergence effect from the drawer cavity
  if (cubeStage) {
    gsap.fromTo(cubeStage,
      { y: 50, scale: 0.88, opacity: 0 },
      {
        y: 0,
        scale: 1,
        opacity: 1,
        ease: "back.out(1.4)",
        scrollTrigger: {
          trigger: deskScene,
          start: "top 45%",
          end: "top 10%",
          scrub: 1.2
        }
      }
    );
  }
}

/* ============================================================
   20. THE 3D ROTATING SCRAPBOOK BOX (CHAPTER PORTAL)
   ============================================================ */
function initScrapbookCube() {
  const viewport = document.getElementById("scrapbook-cube-viewport");
  const cube = document.getElementById("scrapbook-cube");
  const tabs = document.querySelectorAll(".cube-tab");
  const faces = document.querySelectorAll(".cube-face");

  if (!viewport || !cube) return;

  let currentRotY = 0;
  let targetRotY = 0;
  let isDragging = false;
  let startX = 0;
  let lastX = 0;
  let velocity = 0;
  let autoRotate = true;

  const faceAngles = [0, -90, -180, -270];

  function setActiveTab(faceIndex) {
    tabs.forEach((tab, i) => {
      if (i === faceIndex) {
        tab.classList.add("active");
        tab.setAttribute("aria-selected", "true");
      } else {
        tab.classList.remove("active");
        tab.setAttribute("aria-selected", "false");
      }
    });
  }

  function getActiveFaceIndex() {
    let norm = ((-targetRotY % 360) + 360) % 360;
    let idx = Math.round(norm / 90) % 4;
    return idx;
  }

  function updateCubeTransform() {
    cube.style.transform = `rotateY(${currentRotY}deg)`;
  }

  function tick() {
    if (!isDragging) {
      if (autoRotate) {
        targetRotY -= 0.08;
      }
      currentRotY += (targetRotY - currentRotY) * 0.1;
      velocity *= 0.92;
      targetRotY += velocity;
    } else {
      currentRotY += (targetRotY - currentRotY) * 0.35;
    }

    updateCubeTransform();
    requestAnimationFrame(tick);
  }

  // Pointer interactions (mouse & touch)
  function onPointerDown(clientX) {
    isDragging = true;
    autoRotate = false;
    startX = clientX;
    lastX = clientX;
    velocity = 0;
    viewport.classList.add("is-dragging");
  }

  function onPointerMove(clientX) {
    if (!isDragging) return;
    const deltaX = clientX - lastX;
    velocity = deltaX * 0.4;
    targetRotY += velocity;
    lastX = clientX;
    setActiveTab(getActiveFaceIndex());
  }

  function onPointerUp() {
    if (!isDragging) return;
    isDragging = false;
    viewport.classList.remove("is-dragging");

    // Snap to nearest 90-degree face
    const idx = getActiveFaceIndex();
    targetRotY = -idx * 90;
    setActiveTab(idx);

    setTimeout(() => {
      if (!isDragging) autoRotate = true;
    }, 4000);
  }

  // Mouse events
  viewport.addEventListener("mousedown", (e) => {
    if (e.button === 0) onPointerDown(e.clientX);
  });
  window.addEventListener("mousemove", (e) => onPointerMove(e.clientX));
  window.addEventListener("mouseup", onPointerUp);

  // Touch events
  viewport.addEventListener("touchstart", (e) => {
    if (e.touches.length === 1) onPointerDown(e.touches[0].clientX);
  }, { passive: true });
  window.addEventListener("touchmove", (e) => {
    if (isDragging && e.touches.length === 1) onPointerMove(e.touches[0].clientX);
  }, { passive: true });
  window.addEventListener("touchend", onPointerUp);

  // Tab navigation clicks
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      autoRotate = false;
      const faceIndex = parseInt(tab.getAttribute("data-face"), 10);
      targetRotY = faceAngles[faceIndex];
      setActiveTab(faceIndex);
      setTimeout(() => { autoRotate = true; }, 4000);
    });
  });

  // Clicking a face smoothly scrolls to that chapter
  faces.forEach((face) => {
    face.addEventListener("click", (e) => {
      if (Math.abs(velocity) > 1.2) return;
      const targetSelector = face.getAttribute("data-chapter-target");
      if (targetSelector) {
        const targetEl = document.querySelector(targetSelector);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: "smooth" });
        }
      }
    });
  });

  tick();
}

/* ============================================================
   21. PERSISTENT STORYBOOK COMPANION: PRIYANSHI & BALLOON
   ============================================================ */
function initPersistentCompanion() {
  const companion = document.getElementById("persistent-companion");
  const avatarRig = document.getElementById("companion-avatar-rig");
  const compBalloon = document.getElementById("comp-balloon-rig");
  const compChar = document.getElementById("comp-char-rig");
  const heroScene = document.getElementById("storybook-scene");

  if (!companion || !avatarRig || !compBalloon) return;

  const isTouch = window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window;

  // Visibility based on scroll: fade in when leaving Hero, remain as companion
  if (typeof ScrollTrigger !== "undefined" && heroScene) {
    ScrollTrigger.create({
      trigger: heroScene,
      start: "bottom 70%",
      onEnter: () => companion.classList.add("is-visible"),
      onLeaveBack: () => companion.classList.remove("is-visible")
    });

    // Gentle scroll-based height drift as user journeys through chapters
    gsap.to(avatarRig, {
      y: 60,
      ease: "none",
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 2
      }
    });
  }

  // Subtle cursor parallax on desktop
  if (!isTouch) {
    let targetX = 0;
    let targetY = 0;
    let currX = 0;
    let currY = 0;
    let balloonTilt = 0;

    window.addEventListener("pointermove", (e) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      targetX = nx;
      targetY = ny;
    }, { passive: true });

    function tickCompanion() {
      currX += (targetX * 12 - currX) * 0.04;
      currY += (targetY * 8 - currY) * 0.04;
      balloonTilt += (targetX * 2.2 - balloonTilt) * 0.035;

      compChar.style.transform = `translate3d(${currX}px, ${currY}px, 0px)`;
      compBalloon.style.transform = `translate3d(${currX * 1.5}px, ${currY * 1.5}px, 0px) rotate(${balloonTilt}deg)`;

      requestAnimationFrame(tickCompanion);
    }

    tickCompanion();
  }
}