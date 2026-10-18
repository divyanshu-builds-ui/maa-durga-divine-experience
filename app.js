/* ==========================================================================
   MAA DURGA - DIVINE VISUAL EXPERIENCE
   Pure Golden Stylus / Pencil Live Drawing Engine
   Minimal Controls: Refresh, Motion & Zoom
   ========================================================================== */

(function () {
  'use strict';

  // --- State ---
  const state = {
    motionActive: true,      // Motion humesha active rahega
    embersActive: true,      // Golden embers humesha drift karenge
    isDrawing: false,
    scale: 1,
    panX: 0,
    panY: 0,
    isPanning: false,
    startX: 0,
    startY: 0
  };

  // --- DOM Elements ---
  const viewport = document.getElementById('shrine-viewport');
  const transformContainer = document.getElementById('svg-transform-container');
  const canvas = document.getElementById('particles-canvas');
  const ctx = canvas.getContext('2d');

  // Minimal Dock Buttons: Refresh, Music, Motion & Zoom
  const btnRefresh = document.getElementById('btn-refresh');
  const btnSound = document.getElementById('btn-sound');
  const btnMotion = document.getElementById('btn-motion');
  const divineAudio = document.getElementById('divine-audio');
  const btnReset = document.getElementById('btn-reset');
  const btnZoomIn = document.getElementById('btn-zoom-in');
  const btnZoomOut = document.getElementById('btn-zoom-out');
  const zoomText = document.getElementById('zoom-val');

  // SVG Elements & Pencil Cursor
  const pencilCursor = document.getElementById('pencil-cursor');
  const sacredMandalaGroup = document.getElementById('sacred-mandala-halo');
  const auraCircle = document.querySelector('.divine-aura-radial');

  // --- High-Performance GPU Pre-rendered Ember Sprites (Zero Dynamic Gradients) ---
  const spriteAmber = document.createElement('canvas');
  spriteAmber.width = 32;
  spriteAmber.height = 32;
  const sCtxA = spriteAmber.getContext('2d');
  const gA = sCtxA.createRadialGradient(16, 16, 0, 16, 16, 16);
  gA.addColorStop(0, 'rgba(255, 245, 210, 1)');
  gA.addColorStop(0.25, 'rgba(255, 181, 71, 0.85)');
  gA.addColorStop(0.65, 'rgba(255, 138, 36, 0.35)');
  gA.addColorStop(1, 'rgba(255, 138, 36, 0)');
  sCtxA.fillStyle = gA;
  sCtxA.fillRect(0, 0, 32, 32);

  const spriteGold = document.createElement('canvas');
  spriteGold.width = 32;
  spriteGold.height = 32;
  const sCtxG = spriteGold.getContext('2d');
  const gG = sCtxG.createRadialGradient(16, 16, 0, 16, 16, 16);
  gG.addColorStop(0, 'rgba(255, 250, 225, 1)');
  gG.addColorStop(0.25, 'rgba(255, 210, 110, 0.9)');
  gG.addColorStop(0.65, 'rgba(255, 160, 50, 0.35)');
  gG.addColorStop(1, 'rgba(255, 160, 50, 0)');
  sCtxG.fillStyle = gG;
  sCtxG.fillRect(0, 0, 32, 32);

  // --- Lightweight Golden Embers Particle System ---
  let particles = [];
  const PARTICLE_COUNT = 32;
  let animFrameId = null;

  class EmberParticle {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = Math.random() * canvas.width;
      this.y = initial ? Math.random() * canvas.height : canvas.height + 10;
      this.radius = Math.random() * 1.5 + 0.5;
      this.vy = -(Math.random() * 0.45 + 0.2);
      this.vx = (Math.random() - 0.5) * 0.25;
      this.alpha = 0;
      this.maxAlpha = Math.random() * 0.45 + 0.25;
      this.fadeSpeed = Math.random() * 0.006 + 0.003;
      this.fadingIn = true;
      this.hue = Math.random() > 0.4 ? 35 : 42;
      this.pulsePhase = Math.random() * Math.PI * 2;
    }

    update() {
      if (!state.motionActive) return;

      this.y += this.vy;
      this.x += this.vx + Math.sin(this.pulsePhase) * 0.2;
      this.pulsePhase += 0.02;

      if (this.fadingIn) {
        this.alpha += this.fadeSpeed;
        if (this.alpha >= this.maxAlpha) {
          this.fadingIn = false;
        }
      } else {
        this.alpha -= this.fadeSpeed * 0.8;
        if (this.alpha <= 0) {
          this.reset(false);
        }
      }

      if (this.y < -20 || this.x < -20 || this.x > canvas.width + 20) {
        this.reset(false);
      }
    }

    draw() {
      if (this.alpha <= 0) return;
      ctx.globalAlpha = this.alpha;
      const currentRadius = this.radius * (1 + Math.sin(this.pulsePhase) * 0.15);
      const size = currentRadius * 6;
      const sprite = this.hue === 35 ? spriteAmber : spriteGold;
      ctx.drawImage(sprite, this.x - size / 2, this.y - size / 2, size, size);
    }
  }

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function initParticles() {
    resizeCanvas();
    particles = [];
    const count = window.innerWidth < 768 ? 18 : PARTICLE_COUNT;
    for (let i = 0; i < count; i++) {
      particles.push(new EmberParticle());
    }
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (state.embersActive) {
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }
      ctx.globalAlpha = 1;
    }
    animFrameId = requestAnimationFrame(animateParticles);
  }

  window.addEventListener('resize', () => {
    resizeCanvas();
  });

  // --- Zoom & Pan Interaction ---
  function updateTransform() {
    transformContainer.style.transform = `translate(${state.panX}px, ${state.panY}px) scale(${state.scale})`;
    if (zoomText) {
      zoomText.textContent = `${Math.round(state.scale * 100)}%`;
    }
  }

  function setZoom(newScale) {
    state.scale = Math.max(0.7, Math.min(3.5, newScale));
    updateTransform();
  }

  viewport.addEventListener('wheel', (e) => {
    if (e.ctrlKey) {
      e.preventDefault();
      const zoomFactor = e.deltaY < 0 ? 1.1 : 0.9;
      setZoom(state.scale * zoomFactor);
    }
  }, { passive: false });

  // Double-click to toggle between full view (100%) and face close-up (175%)
  viewport.addEventListener('dblclick', (e) => {
    if (e.target.closest('.control-dock')) return;
    if (state.scale > 1.1) {
      state.scale = 1;
      state.panX = 0;
      state.panY = 0;
    } else {
      state.scale = 1.75;
      state.panX = 0;
      state.panY = 120;
    }
    updateTransform();
  });

  viewport.addEventListener('mousedown', (e) => {
    if (e.button !== 0) return;
    state.isPanning = true;
    state.startX = e.clientX - state.panX;
    state.startY = e.clientY - state.panY;
  });

  window.addEventListener('mousemove', (e) => {
    if (!state.isPanning) return;
    state.panX = e.clientX - state.startX;
    state.panY = e.clientY - state.startY;
    updateTransform();
  });

  window.addEventListener('mouseup', () => {
    state.isPanning = false;
  });

  // Touch Support for mobile
  let touchStartDist = 0;
  let touchStartScale = 1;

  viewport.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) {
      state.isPanning = true;
      state.startX = e.touches[0].clientX - state.panX;
      state.startY = e.touches[0].clientY - state.panY;
    } else if (e.touches.length === 2) {
      state.isPanning = false;
      touchStartDist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      touchStartScale = state.scale;
    }
  });

  viewport.addEventListener('touchmove', (e) => {
    if (e.touches.length === 1 && state.isPanning) {
      state.panX = e.touches[0].clientX - state.startX;
      state.panY = e.touches[0].clientY - state.startY;
      updateTransform();
    } else if (e.touches.length === 2) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      if (touchStartDist > 0) {
        const factor = dist / touchStartDist;
        setZoom(touchStartScale * factor);
      }
    }
  }, { passive: true });

  viewport.addEventListener('touchend', () => {
    state.isPanning = false;
    touchStartDist = 0;
  });

  // --- GOLDEN PENCIL LIVE DRAWING ENGINE ---
  let drawQueue = [];
  let isPencilDrawing = false;
  let drawRafId = null;

  function measureStroke(elem) {
    let len = 50;
    try {
      if (typeof elem.getTotalLength === 'function') {
        len = elem.getTotalLength();
      } else if (elem.tagName === 'circle') {
        len = 2 * Math.PI * parseFloat(elem.getAttribute('r') || '10');
      } else if (elem.tagName === 'line') {
        const x1 = parseFloat(elem.getAttribute('x1') || '0');
        const y1 = parseFloat(elem.getAttribute('y1') || '0');
        const x2 = parseFloat(elem.getAttribute('x2') || '0');
        const y2 = parseFloat(elem.getAttribute('y2') || '0');
        len = Math.hypot(x2 - x1, y2 - y1);
      }
    } catch (e) {
      len = 50;
    }
    return Math.max(2, len);
  }

  function getStrokePoint(elem, dist, len) {
    try {
      if (typeof elem.getPointAtLength === 'function') {
        return elem.getPointAtLength(Math.min(dist, len));
      } else if (elem.tagName === 'circle') {
        const cx = parseFloat(elem.getAttribute('cx') || '0');
        const cy = parseFloat(elem.getAttribute('cy') || '0');
        const r = parseFloat(elem.getAttribute('r') || '10');
        const angle = (dist / len) * Math.PI * 2;
        return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
      } else if (elem.tagName === 'line') {
        const x1 = parseFloat(elem.getAttribute('x1') || '0');
        const y1 = parseFloat(elem.getAttribute('y1') || '0');
        const x2 = parseFloat(elem.getAttribute('x2') || '0');
        const y2 = parseFloat(elem.getAttribute('y2') || '0');
        const t = Math.min(1, dist / len);
        return { x: x1 + (x2 - x1) * t, y: y1 + (y2 - y1) * t };
      }
    } catch (e) {
      return { x: 341, y: 255 };
    }
    return { x: 341, y: 255 };
  }

  function buildDrawQueue() {
    drawQueue = [];

    // 1. Mandala Halo Elements (Outer to Inner)
    const mandalaElems = Array.from(document.querySelectorAll('.mandala-draw-elem'));
    mandalaElems.forEach(elem => {
      const len = measureStroke(elem);
      drawQueue.push({ elem, len, stage: 1 });
    });

    // 2. Primary Divine Figure Paths (Maa Durga Mukut, Face, Weapons, Arms, Sari, Lion)
    const primaryPaths = Array.from(document.querySelectorAll('.divine-draw-path'));
    primaryPaths.forEach(elem => {
      const len = measureStroke(elem);
      const stage = parseInt(elem.getAttribute('data-stage') || '5', 10);
      drawQueue.push({ elem, len, stage });
    });
  }

  function startPencilDrawing() {
    if (drawRafId) {
      cancelAnimationFrame(drawRafId);
      drawRafId = null;
    }

    state.isDrawing = true;
    isPencilDrawing = true;

    if (sacredMandalaGroup) {
      sacredMandalaGroup.style.animationPlayState = 'paused';
    }
    if (auraCircle) {
      auraCircle.style.opacity = '0';
      auraCircle.style.transition = 'opacity 2s ease';
    }

    document.body.classList.remove('drawing-completed');
    document.querySelectorAll('.divine-group').forEach(g => g.classList.remove('illuminated'));

    buildDrawQueue();

    // 1. First set all stroke lengths and hide them via dashoffset before making elements visible
    drawQueue.forEach(item => {
      const el = item.elem;
      el.style.strokeDasharray = `${item.len} ${item.len}`;
      el.style.strokeDashoffset = `${item.len}`;
      el.style.fill = 'none';
      el.style.strokeOpacity = '0.95';
    });

    // 2. Position the golden pencil cursor at the exact start point of the first stroke
    if (pencilCursor && drawQueue.length > 0) {
      const firstPt = getStrokePoint(drawQueue[0].elem, 0, drawQueue[0].len);
      pencilCursor.setAttribute('transform', `translate(${firstPt.x.toFixed(1)}, ${firstPt.y.toFixed(1)})`);
      pencilCursor.style.opacity = '1';
    }

    // 3. Activate drawing state - no flash, pure black canvas ready for pencil
    document.body.classList.add('drawing-active');

    let currentIndex = 0;
    let strokeDist = 0;
    let lastTime = performance.now();

    // Drawing speed in SVG coordinates per second (~2800 px/sec for slow, deliberate, deeply detailed hand-sketching)
    const DRAW_SPEED = 2800;

    function step(now) {
      if (!isPencilDrawing) return;

      const deltaMs = Math.min(50, now - lastTime);
      lastTime = now;

      // Distance to advance this frame
      let pixelsToAdvance = (DRAW_SPEED * deltaMs) / 1000;

      while (pixelsToAdvance > 0 && currentIndex < drawQueue.length) {
        const item = drawQueue[currentIndex];
        const remainingOnStroke = item.len - strokeDist;

        if (pixelsToAdvance < remainingOnStroke) {
          strokeDist += pixelsToAdvance;
          item.elem.style.strokeDashoffset = `${item.len - strokeDist}`;
          pixelsToAdvance = 0;
        } else {
          // Finish current stroke
          pixelsToAdvance -= remainingOnStroke;
          item.elem.style.strokeDashoffset = '0';

          const finishedItem = item;
          // Move to next stroke
          currentIndex++;
          strokeDist = 0;

          // Progressive 4K illumination: When a section's strokes finish, illuminate its 4K vector!
          const currGroup = finishedItem.elem.closest('.divine-group');
          const nextItem = currentIndex < drawQueue.length ? drawQueue[currentIndex] : null;
          const nextGroup = nextItem ? nextItem.elem.closest('.divine-group') : null;

          if (currGroup && currGroup !== nextGroup) {
            currGroup.classList.add('illuminated');
          }
        }
      }

      // Update pencil tip position smoothly once per frame (eliminates layout thrashing)
      if (pencilCursor && currentIndex < drawQueue.length) {
        const activeItem = drawQueue[currentIndex];
        const pt = getStrokePoint(activeItem.elem, strokeDist, activeItem.len);
        pencilCursor.setAttribute('transform', `translate(${pt.x.toFixed(1)}, ${pt.y.toFixed(1)})`);
      }

      if (currentIndex < drawQueue.length) {
        drawRafId = requestAnimationFrame(step);
      } else {
        // Complete drawing!
        completeDrawing();
      }
    }

    drawRafId = requestAnimationFrame(step);
  }

  function completeDrawing() {
    isPencilDrawing = false;
    state.isDrawing = false;
    if (drawRafId) {
      cancelAnimationFrame(drawRafId);
      drawRafId = null;
    }

    // Gently fade out the pencil cursor
    if (pencilCursor) {
      pencilCursor.style.opacity = '0';
    }

    // Ensure all 13 divine groups are fully illuminated in 4K neon gold
    document.querySelectorAll('.divine-group').forEach(g => g.classList.add('illuminated'));

    drawQueue.forEach(item => {
      item.elem.style.strokeDashoffset = '0';
      item.elem.style.fill = 'none';
      item.elem.style.strokeOpacity = '0.95';
    });

    // Mark completed to illuminate sacred highlights and aura
    document.body.classList.remove('drawing-active');
    document.body.classList.add('drawing-completed');

    if (auraCircle) auraCircle.style.opacity = '1';

    if (sacredMandalaGroup) {
      sacredMandalaGroup.style.animationPlayState = state.motionActive ? 'running' : 'paused';
    }
  }

  // --- Button Listeners ---

  // Replay Button: Smooth in-place redraw & guaranteed audio playback!
  if (btnRefresh) {
    btnRefresh.addEventListener('click', (e) => {
      e.stopPropagation();
      state.scale = 1;
      state.panX = 0;
      state.panY = 0;
      updateTransform();
      startPencilDrawing();
      tryStartAudio();
    });
  }

  // Motion Toggle: Always active by default
  btnMotion.addEventListener('click', () => {
    tryStartAudio();
    state.motionActive = !state.motionActive;
    document.body.classList.toggle('static-mode', !state.motionActive);
    btnMotion.classList.toggle('active', state.motionActive);
    const label = btnMotion.querySelector('span');
    if (label) {
      label.textContent = state.motionActive ? 'Motion' : 'Static';
    }

    if (!state.motionActive) {
      completeDrawing();
    } else {
      if (sacredMandalaGroup) {
        sacredMandalaGroup.style.animationPlayState = 'running';
      }
    }
  });

  // --- Divine Audio: Mahishasura Mardini (Universal Mobile Unlock & Dock Sync) ---
  const audioPrompt = document.getElementById('audio-prompt');
  let audioUnlocked = false;

  function updateSoundUI(isPlaying) {
    if (btnSound) {
      btnSound.classList.toggle('active', isPlaying);
    }
    if (audioPrompt) {
      if (isPlaying) {
        audioPrompt.classList.add('hidden');
      } else {
        audioPrompt.classList.remove('hidden');
      }
    }
  }

  function tryStartAudio() {
    if (!divineAudio) return;
    try {
      divineAudio.muted = false;
      divineAudio.volume = 0.9;
      divineAudio.loop = true;

      const playPromise = divineAudio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            audioUnlocked = true;
            updateSoundUI(true);
          })
          .catch(() => {
            // Autoplay blocked by browser policy on load; keep prompt visible and await user tap
            updateSoundUI(false);
          });
      }
    } catch (e) {
      updateSoundUI(false);
    }
  }

  function toggleSound() {
    if (!divineAudio) return;
    if (divineAudio.paused) {
      tryStartAudio();
    } else {
      divineAudio.pause();
      updateSoundUI(false);
    }
  }

  // Universal gesture listener: any tap or touch anywhere on the page starts audio
  function handleGlobalUnlock() {
    if (!audioUnlocked || (divineAudio && divineAudio.paused)) {
      tryStartAudio();
    }
  }

  ['click', 'pointerdown', 'touchstart', 'touchend'].forEach(ev => {
    window.addEventListener(ev, handleGlobalUnlock, { passive: true });
    document.addEventListener(ev, handleGlobalUnlock, { passive: true });
  });

  if (viewport) {
    viewport.addEventListener('click', handleGlobalUnlock);
    viewport.addEventListener('touchstart', handleGlobalUnlock, { passive: true });
  }

  // Floating "Tap anywhere" badge direct tap
  if (audioPrompt) {
    audioPrompt.addEventListener('click', (e) => {
      e.stopPropagation();
      tryStartAudio();
    });
    audioPrompt.addEventListener('touchstart', (e) => {
      e.stopPropagation();
      tryStartAudio();
    }, { passive: true });
  }

  // Dock Music button tap/click
  if (btnSound) {
    btnSound.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleSound();
    });
    btnSound.addEventListener('touchstart', (e) => {
      e.stopPropagation();
      toggleSound();
    }, { passive: true });
  }

  // Native media event listeners
  if (divineAudio) {
    divineAudio.addEventListener('play', () => updateSoundUI(true));
    divineAudio.addEventListener('pause', () => updateSoundUI(false));
  }

  // Attempt initial playback immediately on visit
  tryStartAudio();

  // Zoom Controls
  btnZoomIn.addEventListener('click', () => {
    tryStartAudio();
    setZoom(state.scale * 1.25);
  });
  btnZoomOut.addEventListener('click', () => {
    tryStartAudio();
    setZoom(state.scale * 0.8);
  });
  
  if (btnReset) {
    btnReset.addEventListener('click', () => {
      state.scale = 1;
      state.panX = 0;
      state.panY = 0;
      updateTransform();
    });
  }

  // --- Creator & Studio Details Modal ---
  const btnInfo = document.getElementById('btn-info');
  const creatorModal = document.getElementById('creator-modal');
  const btnCloseModal = document.getElementById('btn-close-modal');

  function openCreatorModal() {
    if (creatorModal) {
      creatorModal.classList.add('open');
      creatorModal.setAttribute('aria-hidden', 'false');
    }
  }

  function closeCreatorModal() {
    if (creatorModal) {
      creatorModal.classList.remove('open');
      creatorModal.setAttribute('aria-hidden', 'true');
    }
  }

  if (btnInfo) {
    btnInfo.addEventListener('click', (e) => {
      e.stopPropagation();
      openCreatorModal();
    });
  }

  if (btnCloseModal) {
    btnCloseModal.addEventListener('click', (e) => {
      e.stopPropagation();
      closeCreatorModal();
    });
  }

  if (creatorModal) {
    creatorModal.addEventListener('click', (e) => {
      if (e.target === creatorModal) {
        closeCreatorModal();
      }
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (creatorModal && creatorModal.classList.contains('open')) {
        closeCreatorModal();
      } else if (state.isDrawing) {
        completeDrawing();
      }
    }
  });

  // Check system prefers-reduced-motion
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    state.motionActive = false;
    document.body.classList.add('static-mode');
    btnMotion.classList.remove('active');
    const label = btnMotion.querySelector('span');
    if (label) label.textContent = 'Static';
  }

  // --- Initialize ---
  initParticles();
  animateParticles();
  updateTransform();

  // Start the Golden Pencil Drawing on page load
  if (state.motionActive) {
    setTimeout(() => {
      startPencilDrawing();
    }, 350);
  } else {
    buildDrawQueue();
    completeDrawing();
  }

})();
