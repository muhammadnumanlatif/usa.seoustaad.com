import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

gsap.registerPlugin(ScrollTrigger);

export function initScrollEngine() {
  // 1. Initialize Lenis Smooth Scroll
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothTouch: true,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // Sync GSAP ScrollTrigger with Lenis
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  // 2. Canvas Setup
  const canvas = document.getElementById('sequence-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  // 3. Frame Sequence Generator (Procedural 3D Wireframe Tech Engine)
  const TOTAL_FRAMES = 120;
  const frames = [];
  let loadedFrames = 0;

  const loaderProgress = document.getElementById('loader-progress');
  const loaderText = document.getElementById('loader-text');
  const loaderScreen = document.getElementById('canvas-loader');

  // Generate 120 60fps high-tech 3D geometry sequence frames procedurally
  for (let i = 0; i < TOTAL_FRAMES; i++) {
    const offscreen = document.createElement('canvas');
    offscreen.width = 1200;
    offscreen.height = 800;
    const oCtx = offscreen.getContext('2d');

    renderProceduralFrame(oCtx, i, TOTAL_FRAMES);
    frames.push(offscreen);
    
    loadedFrames++;
    const progressPercent = Math.round((loadedFrames / TOTAL_FRAMES) * 100);
    if (loaderProgress) loaderProgress.style.width = `${progressPercent}%`;
    if (loaderText) loaderText.innerText = `${progressPercent}%`;
  }

  // Dismiss Loader
  setTimeout(() => {
    if (loaderScreen) loaderScreen.classList.add('loaded');
  }, 400);

  // Render initial frame
  renderCanvasFrame(0);

  // 4. GSAP ScrollTrigger Sequence Scrubbing
  const sequenceState = { frame: 0 };

  gsap.to(sequenceState, {
    frame: TOTAL_FRAMES - 1,
    snap: 'frame',
    ease: 'none',
    scrollTrigger: {
      trigger: '#canvas-hero',
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.5,
      onUpdate: (self) => {
        const currentFrameIndex = Math.floor(sequenceState.frame);
        renderCanvasFrame(currentFrameIndex);
        updateOverlays(self.progress);
      }
    }
  });

  function renderCanvasFrame(index) {
    if (!ctx || !frames[index]) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw centered with cover aspect ratio
    const img = frames[index];
    const hRatio = canvas.width / img.width;
    const vRatio = canvas.height / img.height;
    const ratio = Math.max(hRatio, vRatio);

    const centerShiftX = (canvas.width - img.width * ratio) / 2;
    const centerShiftY = (canvas.height - img.height * ratio) / 2;

    ctx.drawImage(
      img,
      0, 0, img.width, img.height,
      centerShiftX, centerShiftY, img.width * ratio, img.height * ratio
    );
  }

  // 5. Sync Pinned Text Overlays with Scroll Progress
  function updateOverlays(progress) {
    const card1 = document.getElementById('overlay-1');
    const card2 = document.getElementById('overlay-2');
    const card3 = document.getElementById('overlay-3');
    const card4 = document.getElementById('overlay-4');

    if (card1) card1.classList.toggle('active', progress >= 0 && progress < 0.22);
    if (card2) card2.classList.toggle('active', progress >= 0.25 && progress < 0.48);
    if (card3) card3.classList.toggle('active', progress >= 0.51 && progress < 0.73);
    if (card4) card4.classList.toggle('active', progress >= 0.76 && progress <= 1.0);
  }
}

// Procedural 3D Mesh Renderer (Draws rotating sci-fi geometry morphing into browser UI)
function renderProceduralFrame(ctx, frameIndex, totalFrames) {
  const w = ctx.canvas.width;
  const h = ctx.canvas.height;
  const progress = frameIndex / totalFrames;
  const angle = progress * Math.PI * 4;

  // Background
  const bgGrad = ctx.createRadialGradient(w/2, h/2, 50, w/2, h/2, w);
  bgGrad.addColorStop(0, '#090a0f');
  bgGrad.addColorStop(1, '#000000');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, w, h);

  // Grid Lines
  ctx.strokeStyle = 'rgba(0, 102, 204, 0.12)';
  ctx.lineWidth = 1;
  const gridSize = 40;
  for (let x = 0; x < w; x += gridSize) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, h);
    ctx.stroke();
  }
  for (let y = 0; y < h; y += gridSize) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.stroke();
  }

  // Rotating 3D Mesh Particle Torus
  const cx = w / 2;
  const cy = h / 2;
  const numDots = 140;

  for (let i = 0; i < numDots; i++) {
    const theta = (i / numDots) * Math.PI * 2 + angle;
    const r = 160 + Math.sin(theta * 3 + angle) * 30;
    const x = cx + Math.cos(theta) * r;
    const y = cy + Math.sin(theta) * (r * 0.5);

    const dotSize = 2.5 + Math.sin(theta + angle) * 1.5;
    ctx.fillStyle = i % 2 === 0 ? '#0066cc' : '#00f0ff';
    ctx.shadowColor = '#00f0ff';
    ctx.shadowBlur = 10;
    
    ctx.beginPath();
    ctx.arc(x, y, Math.max(1, dotSize), 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.shadowBlur = 0;

  // Assembling Floating Browser Window Frame
  const boxW = 560 * Math.min(1, progress * 1.4);
  const boxH = 340 * Math.min(1, progress * 1.4);
  const bx = cx - boxW / 2;
  const by = cy - boxH / 2;

  ctx.strokeStyle = 'rgba(41, 151, 255, 0.6)';
  ctx.lineWidth = 2;
  ctx.strokeRect(bx, by, boxW, boxH);

  // Top Bar Dots
  if (boxW > 60) {
    ctx.fillStyle = '#ff5f56'; ctx.beginPath(); ctx.arc(bx + 20, by + 16, 4, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle = '#ffbd2e'; ctx.beginPath(); ctx.arc(bx + 34, by + 16, 4, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle = '#27c93f'; ctx.beginPath(); ctx.arc(bx + 48, by + 16, 4, 0, Math.PI*2); ctx.fill();
  }
}
