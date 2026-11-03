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

  gsap.timeline({
    scrollTrigger: {
      trigger: scene,
      start: "top top",
      end: "bottom top",
      scrub: 1.2
    }
  })
  // The balloon gently moves upwards
  .to(balloonRig, {
    y: -240,
    rotation: -4,
    scale: 0.92,
    ease: "none"
  }, 0)

  // Character responds to the balloon lifting upwards
  .to(characterRig, {
    y: -210,
    rotation: 3,
    scale: 0.95,
    ease: "none"
  }, 0)

  // Opening text smoothly transitions out as user scrolls toward Chapter I
  .to(textOverlay, {
    opacity: 0,
    y: -50,
    ease: "power1.out"
  }, 0.35)

  .to(".cloud-1", {
    y: -80,
    x: -30,
    ease: "none"
  }, 0)
  .to(".cloud-2", {
    y: -100,
    x: 40,
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
