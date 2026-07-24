/**
 * Impeccable Aesthetics FX Module
 * - Custom Mix-Blend-Difference Cursor with Spring Interpolation (Desktop only)
 * - Magnetic Hover Button Physics
 */

export function initImpeccableFX() {
  // Mobile / Touch check - Disable custom cursor on touch screens
  if (window.matchMedia('(pointer: coarse)').matches) return;

  // 1. Inject Custom Cursor Elements
  let cursorDot = document.getElementById('impeccable-cursor');
  if (!cursorDot) {
    cursorDot = document.createElement('div');
    cursorDot.id = 'impeccable-cursor';
    cursorDot.className = 'impeccable-cursor';
    document.body.appendChild(cursorDot);
  }

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let cursorX = mouseX;
  let cursorY = mouseY;
  let isHovered = false;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Smooth lerp / spring loop for cursor
  function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.18;
    cursorY += (mouseY - cursorY) * 0.18;

    if (cursorDot) {
      cursorDot.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) scale(${isHovered ? 2.2 : 1})`;
    }
    requestAnimationFrame(animateCursor);
  }
  requestAnimationFrame(animateCursor);

  // Hover expansion on interactive elements
  const hoverTargets = document.querySelectorAll('a, button, .button-primary, .button-secondary-pill, summary, .chip');
  hoverTargets.forEach((el) => {
    el.addEventListener('mouseenter', () => { isHovered = true; });
    el.addEventListener('mouseleave', () => { isHovered = false; });
  });

  // 2. Magnetic Buttons Effect
  const magneticButtons = document.querySelectorAll('.button-primary, .button-secondary-pill, .btn-sm');
  magneticButtons.forEach((btn) => {
    let btnX = 0;
    let btnY = 0;

    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) * 0.35;
      const deltaY = (e.clientY - centerY) * 0.35;

      btnX += (deltaX - btnX) * 0.2;
      btnY += (deltaY - btnY) * 0.2;

      btn.style.transform = `translate3d(${btnX}px, ${btnY}px, 0)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = `translate3d(0px, 0px, 0)`;
      btn.style.transition = 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)';
    });

    btn.addEventListener('mouseenter', () => {
      btn.style.transition = 'none';
    });
  });
}
