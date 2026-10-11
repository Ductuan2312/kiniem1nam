/**
 * ==========================================
 * EXTRA INTERACTIONS CONTROLLER
 * 1. Bức thư tình (Mở / Đóng phong bì thư)
 * 2. Lightbox xem ảnh cận cảnh
 * 3. Hiệu ứng thả tim bay rực rỡ
 * ==========================================
 */

export function initInteractions() {
  // --- 1. MỞ / ĐÓNG BỨC THƯ TÌNH ---
  const openLetterBtn = document.getElementById('open-letter-btn');
  const closeLetterBtn = document.getElementById('close-letter-btn');
  const letterCard = document.getElementById('love-letter-card');

  if (openLetterBtn && letterCard) {
    openLetterBtn.addEventListener('click', () => {
      letterCard.classList.add('letter-open');
      openLetterBtn.style.display = 'none';
    });
  }

  if (closeLetterBtn && letterCard) {
    closeLetterBtn.addEventListener('click', () => {
      letterCard.classList.remove('letter-open');
      if (openLetterBtn) openLetterBtn.style.display = 'inline-flex';
    });
  }

  // --- 2. LIGHTBOX PHÓNG TO ẢNH ---
  const lightbox = document.getElementById('photo-lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.getElementById('lightbox-close');
  const galleryItems = document.querySelectorAll('.gallery-item');

  if (lightbox && lightboxImg) {
    galleryItems.forEach(item => {
      item.addEventListener('click', () => {
        const img = item.querySelector('img');
        const caption = item.querySelector('.gallery-caption');
        if (img) {
          lightboxImg.src = img.src;
          lightboxImg.alt = img.alt || 'Kỷ niệm tình yêu';
          if (lightboxCaption) {
            lightboxCaption.textContent = caption ? caption.textContent : '';
          }
          lightbox.classList.add('lightbox-active');
          document.body.style.overflow = 'hidden';
        }
      });
    });

    const closeLightbox = () => {
      lightbox.classList.remove('lightbox-active');
      document.body.style.overflow = '';
    };

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('lightbox-active')) {
        closeLightbox();
      }
    });
  }

  // --- 3. HIỆU ỨNG THẢ TIM BAY (FLOATING HEARTS) ---
  const heartBtn = document.getElementById('send-heart-btn');
  const heartCounterEl = document.getElementById('heart-count');
  let heartCount = 365;

  if (heartBtn) {
    heartBtn.addEventListener('click', (e) => {
      heartCount++;
      if (heartCounterEl) heartCounterEl.textContent = heartCount;

      // Tạo các hạt trái tim bay
      for (let i = 0; i < 6; i++) {
        createFloatingHeart(e.clientX, e.clientY);
      }
    });
  }

  function createFloatingHeart(x, y) {
    const heart = document.createElement('span');
    heart.className = 'floating-heart';
    heart.textContent = ['❤️', '💖', '✨', '🌹', '🥰'][Math.floor(Math.random() * 5)];
    
    // Tọa độ ngẫu nhiên lệch xung quanh vị trí click
    const offsetX = (Math.random() - 0.5) * 80;
    const offsetY = (Math.random() - 0.5) * 40;
    const size = Math.random() * 14 + 18;
    const duration = Math.random() * 1.2 + 1.2;

    heart.style.left = `${x + offsetX}px`;
    heart.style.top = `${y + offsetY}px`;
    heart.style.fontSize = `${size}px`;
    heart.style.animationDuration = `${duration}s`;

    document.body.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, duration * 1000);
  }

  // --- 4. NÚT CUỘN XUỐNG TỪ HERO ---
  const scrollDownBtn = document.getElementById('scroll-down-btn');
  const counterSec = document.getElementById('counter-section');
  if (scrollDownBtn && counterSec) {
    scrollDownBtn.addEventListener('click', () => {
      counterSec.scrollIntoView({ behavior: 'smooth' });
    });
  }
}
