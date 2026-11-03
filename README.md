# Priyanshi — Still Becoming.
### An Illustrated Personal Journey of a Computer Science Student

A hand-drawn, poetic web experience capturing the authentic story of a Computer Science undergraduate navigating hackathons, problem-solving, and the patient pursuit of human-centered software.

---

## ⚡ Instant Deployment Guide (Zero-Build Static Site)

This website is a **production-ready, zero-dependency static site**. It requires **no build step, no npm install, and no compilers**. You can deploy it in under 60 seconds:

### Method 1: GitHub Pages (Recommended — 100% Free)
1. Initialize a git repository and push this folder:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio release"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git push -u origin main
   ```
2. Go to your repository on GitHub:
   - Navigate to **Settings** > **Pages** (under Code and automation).
   - Under **Build and deployment > Branch**, select `main` and `/ (root)`.
   - Click **Save**.
3. Your site is live immediately at `https://<your-username>.github.io/<your-repo-name>/`.

---

### Method 2: Netlify Drop (Fastest — 30 Seconds, No Terminal)
1. Go to [**app.netlify.com/drop**](https://app.netlify.com/drop).
2. Drag and drop the `portfolio-website` folder directly into the browser window.
3. Your site is live instantly with an HTTPS URL.

---

### Method 3: Vercel (CLI or Dashboard)
- **Via Dashboard**: Import your GitHub repository on [vercel.com](https://vercel.com). Vercel auto-detects static HTML and deploys in seconds.
- **Via CLI**:
  ```bash
  npx vercel --prod
  ```

---

## 📖 Chapter Breakdown

### 🎈 Prologue (Scene 1) — *Welcome to My Little World*
- **Preserved**: Hand-drawn balloon entrance, physics-based descent, and center settling.
- **Protagonist**: Priyanshi lowering a large pastel peach balloon into a warm cream paper world.
- **Scroll Interaction**: As the visitor scrolls, the balloon and character float upward into the sky with parallax depth.

### 💡 Chapter I — *The Unexpected Beginning*
- **The Story**: Moving beyond textbook CS assignments with predetermined test cases into the electrifying, ambiguous world of hackathons. Learning to embrace open-ended problem statements and turning whiteboard sketches into working software.
- **Protagonist Vignette**: Priyanshi sitting cross-legged with an open spiral sketchbook, pencil in hand, surrounded by floating sticky notes, a lightbulb, and thoughts.

### 🧭 Chapter II — *An Idea Called Saarthi* (Flagship Storytelling Chapter)
A continuous 6-scene illustrated journey into the making of Saarthi, resolving **“Missing Context in Digital Banking”**:
1. **Scene 2.1 — The Question**:
   - *“What if digital banking understood what people actually needed?”*
   - Priyanshi enters the workspace carrying her notebook, questioning why digital finance feels so detached and anxiety-inducing.
   - *Meet Saarthi:* A smarter, context-aware financial workspace.
2. **Scene 2.2 — Understanding the Problem**:
   - Research wall displaying real friction points: The Context Void, Anxiety Gates, and Jargon Traps (RTGS/IMPS/clearance holds).
   - Priyanshi mapping user hesitations with her pencil.
3. **Scene 2.3 — The Idea Takes Shape**:
   - Hand-drawn notebook wireframe sketches with an interactive **Blueprint Comparison toggle** (Notebook Sketch vs. Actual Interface).
4. **Scene 2.4 — Inside Saarthi (Architecture)**:
   - Clear visual explanation of the 5 core components, transparently differentiating implemented modules from planned concepts:
     - **AI Orchestrator** *(Implemented)*: Deterministic checks first, AI natural explanation second.
     - **Financial Engine** *(Implemented)*: Canonical ledger normalization and zero-hallucination math.
     - **Voice & Text ("Talk It Out")** *(Implemented)*: Web Speech API microphone input.
     - **User Memory** *(Conceptual/Planned)*: Long-term privacy-first pattern tracking.
     - **Web Intelligence** *(Conceptual/Planned)*: Real-time verified benchmark search.
5. **Scene 2.5 — The Real Product (Interactive Walkthrough)**:
   - Walkthrough embedded inside a hand-drawn laptop frame using original screenshots from `assets/saarthi/`:
     - `01 • Login & Calm Start` (`login.png`)
     - `02 • Financial Cockpit & Signal` (`home1.png`)
     - `03 • Canonical Ledger` (`Screenshot 2026-11-03 225536.png`)
     - `04 • Audit & Investigate` (`Screenshot 2026-11-03 225549.png`)
     - `05 • Money Time Machine / Digital Twin` (`Screenshot 2026-11-03 225326.png`)
     - `06 • Voice Interaction ("Talk It Out")` (`Screenshot 2026-11-03 225518.png`)
   - Interactive tab selection, Next/Previous controls, step counters, and pinned floating annotations.
6. **Scene 2.6 — What This Project Taught Me**:
   - Priyanshi stepping away from the workspace, notebook in hand, with a serene smile.
   - *“Building Saarthi taught me that creating technology is not just about making something work. It is about understanding the problem, questioning assumptions and turning an idea into something people can actually use.”*
   - Closing bridge: *“One project opened a thousand new questions.”*

### 🧩 Chapter III — *Still Figuring Things Out*
- **The Story**: The authentic everyday reality of a CS student. Balancing C++ pointer tracing and Data Structures & Algorithms with modern interactive web development, UI/UX empathy, and curiosity about emerging AI research.
- **Protagonist Vignette**: Priyanshi seated at a study desk with open code notebooks, a steaming cup of tea, terminal brackets `{ while }`, and graph tree diagrams.

### ✉️ Chapter IV — *Say Hello to Priyanshi*
- **Closing Statement**: *“Still becoming. Always curious. Always building.”*
- **Invitation**: *“Have an interesting idea, opportunity or conversation in mind? I'd love to hear from you.”*
- **Prominent Email Action**: Direct `mailto:pkshah2021@gmail.com` button and letter note box.
- **Protagonist Vignette**: Priyanshi waving with a warm, friendly smile, accompanied by a floating paper airplane and letter.

---

## 💻 Local Preview
Double-click [**`index.html`**](file:///C:/Users/shoot/.gemini/antigravity/scratch/portfolio-website/index.html) to open in your browser, or run:
```powershell
python -m http.server 3000
```
Then visit `http://localhost:3000`.
