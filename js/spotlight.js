/**
 * ==========================================
 * SPOTLIGHT REVEAL CONTROLLER
 * Quản lý hiệu ứng mặt nạ rọi đèn (CSS Mask)
 * di chuyển mượt mà theo trỏ chuột và cảm ứng tay.
 * ==========================================
 */

export function initSpotlight() {
  const revealImg = document.getElementById('reveal-img');
  if (!revealImg) return;

  let isUpdating = false;

  function updateSpotlight(x, y) {
    const width = window.innerWidth;
    const radius = width < 480 ? 120 : (width < 720 ? 160 : 260);
    const gradient = `radial-gradient(circle ${radius}px at ${x}px ${y}px, #fff 0%, #fff 40%, rgba(255,255,255,0.75) 60%, rgba(255,255,255,0.4) 75%, rgba(255,255,255,0.12) 88%, transparent 100%)`;
    
    revealImg.style.webkitMaskImage = gradient;
    revealImg.style.maskImage = gradient;
  }

  function handleMove(e) {
    if (isUpdating) return;
    isUpdating = true;

    requestAnimationFrame(() => {
      const rect = revealImg.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      updateSpotlight(x, y);
      isUpdating = false;
    });
  }

  window.addEventListener('mousemove', handleMove);
  window.addEventListener('touchmove', handleMove, { passive: true });
}
