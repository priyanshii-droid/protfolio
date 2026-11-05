# Priyanshi — Still Becoming (Production Build)

A cinematic, interactive, illustrated personal portfolio website by Priyanshi.

## Deployment Instructions

This clean production folder (`portfolio-clean`) contains only the standalone files required to deploy the complete website. Zero build tools or heavy node dependencies are required.

### Option 1: Deploy to Vercel (Recommended)
1. Push this directory or repo to GitHub / GitLab / Bitbucket.
2. In [Vercel](https://vercel.com/), click **Add New Project** and import the repository (set Root Directory to `portfolio-clean` if deploying from a monorepo).
3. The bundled `vercel.json` will automatically configure caching, clean URLs, and security headers.
4. Click **Deploy**.

### Option 2: Deploy to Netlify
1. Drag and drop the `portfolio-clean` folder into [Netlify Drop](https://app.netlify.com/drop).
2. Or connect the repository — the bundled `netlify.toml` will handle routing and headers.

### Option 3: Deploy to GitHub Pages
1. Go to repository **Settings** &rarr; **Pages**.
2. Select the branch and folder (e.g. `/portfolio-clean` or root if pushed directly).
3. Click **Save**.

---

## File Structure

- `index.html`: Main interactive illustrated film experience, hero balloon dissolve, table of contents, 3D turntable, flowchart, open notebook, curiosity observatory, sunset horizon, and terminal modal.
- `saarthi.html`: Dedicated deep-dive case study for flagship project Saarthi (user interviews, 4-layer pipeline, 8-screen walkthrough with click-to-zoom lightbox, comparison matrix, and engineering reflections).
- `style.css`: Complete responsive design system (cream-and-espresso palette, 2.5D papercraft, smooth transitions, mobile adaptations).
- `script.js`: Native vanilla JS with GSAP ScrollTrigger choreography, interactive turntable, open notebook tabs, curiosity observatory telescope pivot, and cinematic chapter transitions.
- `assets/saarthi/`: Verified high-resolution screenshots for the Saarthi case study.
- `favicon.svg`: Monogram vector favicon.
- `robots.txt` & `sitemap.xml`: SEO crawlability and indexing.
- `vercel.json` & `netlify.toml`: Deployment and cache configuration.
