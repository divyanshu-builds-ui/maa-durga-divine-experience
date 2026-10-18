# ॥ ॐ दुं दुर्गायै नमः ॥ Maa Durga — Divine Visual Experience

<div align="center">

![Maa Durga Divine Visual Experience](https://img.shields.io/badge/Maa%20Durga-Divine%20Experience-FFB547?style=for-the-badge&logoColor=black)
![License: MIT](https://img.shields.io/badge/License-MIT-FF8A24?style=for-the-badge)
![Tech Stack](https://img.shields.io/badge/Vanilla%20JS%20%7C%20SVG%20%7C%20Canvas-000000?style=for-the-badge&logo=javascript&logoColor=FFB547)
![Zero Dependencies](https://img.shields.io/badge/Dependencies-Zero-22c55e?style=for-the-badge)

<p align="center">
  <b>A breathtaking, dark-themed 4K golden-outline divine visual experience of Maa Durga featuring sacred geometry, real-time live pencil stroke drawing animation, interactive particle embers, and high-energy devotional stotram audio.</b>
</p>

[✨ View Live (durga.makeward.in)](https://durga.makeward.in/) • [⚡ Quick Start](#-quick-start) • [🎨 Features](#-features) • [👨‍💻 Creator](#-creator--studio)

</div>

---

## 🔱 Overview

This project is a devotional fusion of ancient Vedic sacred iconography and modern creative web engineering. It renders the magnificent 10-armed form of **Maa Durga** seated majestically upon Her lion (**Simhavahana**), wielding Her divine cosmic astras (*Trishula, Khadga, Chakra, Gada, Shankha, Dhanush, and Padma*).

Every line is drawn before your eyes by a lifelike golden stylus cursor using high-performance SVG path dash-offset physics, accompanied by floating embers and the reverberating beats of the **Mahishasura Mardini Stotram**.

---

## ✨ Features

- **🖋️ Real-time Live Pencil Drawing Engine:** Watch the sacred artwork materialize line by line, stroke by stroke, with an authentic golden pencil cursor tracking the exact coordinates and curvature of each path.
- **✨ Pure 4K Golden Line Art (Zero Raster Images):** Built completely with scalable SVG vector paths (`fill: none`, `stroke: #FFB547`). Crisp and razor-sharp on 4K, 8K, Retina displays, and mobile screens alike.
- **🌌 Atmospheric Canvas Embers:** Dynamic HTML5 2D canvas particle system simulating floating golden embers rising gracefully from the sacred shrine.
- **☸️ Sacred Mandala Halo:** An intricate Vedic mandala halo continuously rotating behind the Mukut, symbolizing the eternal cosmic cycle.
- **🎵 Divine Background Music:** Integrated high-energy *Mahishasura Mardini Stotram (Droplex Remix / Shanti People)* audio playing seamlessly in a continuous, immersive loop.
- **🔍 Interactive Pan & Zoom:** Freely drag/pan across the shrine and zoom in up to 300% to inspect intricate details of the crown, eyes, and weapons.
- **🎛️ Minimal Glassmorphic Dock:** Elegant, floating bottom dock providing controls for **Replay**, **Motion** (toggle static/animated mode), and **Zoom**.
- **ℹ️ Creator & Agency Showcase:** Subtle, non-intrusive header info button opening details for [MakeWard](https://makeward.in) and developer handles.
- **⚡ Zero External Dependencies:** Pure Vanilla JavaScript, HTML5, and CSS3. No heavy frameworks, no bloated bundles — instant 60 FPS performance everywhere.

---

## 📂 Project Structure

```text
maa-durga-divine-experience/
├── index.html              # Main HTML markup, embedded SVG artwork, and control dock
├── style.css               # Design system, glassmorphism, glowing aesthetics, & responsiveness
├── app.js                  # Particle engine, live drawing scheduler, pan/zoom, & audio controller
├── mahishasura_mardini.webm # High-quality Opus/WebM divine audio track
├── package.json            # Project metadata and quick local dev scripts
├── LICENSE                 # MIT Open-Source License
├── .gitignore              # Files ignored by git
└── README.md               # Documentation & repository showcase
```

---

## 🚀 Quick Start

You can run this project locally in less than 30 seconds:

### Option 1: Direct Browser (No install needed)
Simply clone the repository and double-click `index.html` to open it in Chrome, Edge, Firefox, or Safari:
```bash
git clone https://github.com/divyanshu-builds-ui/maa-durga-divine-experience.git
cd maa-durga-divine-experience
# Open index.html in your browser
```

### Option 2: Using Node.js / NPM
```bash
# Clone the repository
git clone https://github.com/divyanshu-builds-ui/maa-durga-divine-experience.git
cd maa-durga-divine-experience

# Start local preview server (port 3000)
npm run dev
```

### Option 3: Using Python
```bash
# Python 3
python -m http.server 3000
```
Then visit `http://localhost:3000` in your browser.

---

## 🌐 1-Click Free Deployment

You can host this project publicly for free with zero configuration:

### 1. GitHub Pages (Recommended)
1. Push this repository to GitHub.
2. In your repository, go to **Settings** → **Pages**.
3. Under **Branch**, select `main` and root folder `/`, then click **Save**.
4. Your website is live instantly at:
   `https://<your-username>.github.io/<repo-name>/`

### 2. Vercel
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)
1. Import your GitHub repository into Vercel.
2. Keep default settings (Static Site) and click **Deploy**.

### 3. Netlify
Drag and drop this project folder directly onto [Netlify Drop](https://app.netlify.com/drop).

---

## ⚙️ Customization Guide

Want to tweak the visual experience? Open `app.js` or `style.css`:

- **Change Drawing Speed:**  
  In `app.js`, edit `DRAW_SPEED` (default is `2800` for a calm, graceful pace):
  ```javascript
  const DRAW_SPEED = 2800; // Lower is faster, higher is slower
  ```

- **Adjust Particle Density:**  
  In `app.js`, modify `PARTICLE_COUNT`:
  ```javascript
  const PARTICLE_COUNT = 36; // Adjust number of floating golden embers
  ```

- **Customize Colors:**  
  In `style.css`, edit the `:root` design tokens:
  ```css
  :root {
    --color-gold-bright: #FFB547;
    --color-gold-amber: #FF8A24;
    --color-gold-light: #FFE6A3;
  }
  ```

---

## 👨‍💻 Creator & Studio

Created with devotion and passion for creative engineering by **Divyanshu Kumar**:

- 🌐 **Software Studio:** [MakeWard](https://makeward.in) — *Founder-led studio building Web, SaaS, Mobile Apps & AI products.*
- 📸 **Instagram:** [@divyanshu.builds](https://instagram.com/divyanshu.builds) — *Daily UI interactions, creative builds & dev logs.*
- 🐙 **GitHub:** [divyanshu-builds-ui](https://github.com/divyanshu-builds-ui) — *Open-source frontend components and repositories.*
- 💼 **LinkedIn:** [Divyanshu Kumar](https://www.linkedin.com/in/divyanshu-builds)

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!  
Feel free to check the [issues page](https://github.com/divyanshu-builds-ui/maa-durga-divine-experience/issues).

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the **MIT License**. See [`LICENSE`](LICENSE) for more information.

---

<div align="center">

**॥ या देवी सर्वभूतेषु शक्ति-रूपेण संस्थिता । नमस्तस्यै नमस्तस्यै नमस्तस्यै नमो नमः ॥**  
*Dedicated with eternal reverence to Maa Durga.*

</div>
