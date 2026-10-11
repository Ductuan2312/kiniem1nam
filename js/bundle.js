/**
 * ==========================================
 * BUNDLE JAVASCRIPT (IIFE)
 * Tích hợp toàn bộ chức năng:
 * - Spotlight Reveal Mask
 * - Word Pull-Up & Scroll Observer
 * - Music Controller & Autoplay Unblock
 * - Love Days Real-Time Counter
 * - Love Letter & Lightbox & Heart Particles
 * ==========================================
 */

(function () {
  'use strict';

  // --- 1. SPOTLIGHT REVEAL CONTROLLER ---
  function initSpotlight() {
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

  // --- 2. ANIMATIONS & TEXT OBSERVER ---
  function initAnimations() {
    // Tách từ cho .words-pull-up
    const splitEls = document.querySelectorAll('.words-pull-up');
    splitEls.forEach((el) => {
      if (el.dataset.split === 'true') return;

      let wordIndex = 0;
      if (el.tagName.toLowerCase() === 'h1' && el.children.length > 0) {
        Array.from(el.children).forEach((span) => {
          if (span.tagName.toLowerCase() === 'span') {
            span.classList.add('pull-line');
            const words = span.textContent.trim().split(/\s+/);
            span.innerHTML = words
              .map((w) => {
                const html = `<span class="pull-word" style="animation-delay: ${wordIndex * 0.1}s">${w}</span>`;
                wordIndex++;
                return html;
              })
              .join(' ');
          }
        });
      } else {
        const words = el.textContent.trim().split(/\s+/);
        el.innerHTML = words
          .map((w, i) => `<span class="pull-word" style="animation-delay: ${i * 0.1}s">${w}</span>`)
          .join(' ');
      }
      el.dataset.split = 'true';
    });

    // Kích hoạt quan sát cuộn / hiển thị
    if ('IntersectionObserver' in window) {
      const wordObserver = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('words-visible');
              obs.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1 }
      );

      document.querySelectorAll('.words-pull-up').forEach((el) => wordObserver.observe(el));

      const fadeObserver = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const delay = entry.target.dataset.delay;
              if (delay) entry.target.style.animationDelay = `${delay}s`;
              entry.target.classList.add('is-visible');
              obs.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.05 }
      );

      document.querySelectorAll('.fade-up-reveal').forEach((el) => fadeObserver.observe(el));
    } else {
      document.querySelectorAll('.words-pull-up').forEach((el) => el.classList.add('words-visible'));
      document.querySelectorAll('.fade-up-reveal').forEach((el) => {
        el.style.animationDelay = '0s';
        el.classList.add('is-visible');
      });
    }
  }

  // --- 3. BACKGROUND AUDIO CONTROLLER ---
  function initAudio() {
    const audio = document.getElementById('bg-audio');
    const toggleBtn = document.getElementById('music-toggle-btn');
    const btnText = document.getElementById('music-btn-text');

    if (!audio) return;

    let isPlaying = false;

    function updateUI(playing) {
      isPlaying = playing;
      if (!toggleBtn) return;

      if (playing) {
        toggleBtn.classList.add('music-playing');
        toggleBtn.classList.remove('music-paused');
        if (btnText) btnText.textContent = 'MUSIC ON';
        toggleBtn.setAttribute('aria-label', 'Tắt nhạc nền');
      } else {
        toggleBtn.classList.remove('music-playing');
        toggleBtn.classList.add('music-paused');
        if (btnText) btnText.textContent = 'MUSIC OFF';
        toggleBtn.setAttribute('aria-label', 'Bật nhạc nền');
      }
    }

    function playAudio() {
      audio
        .play()
        .then(() => {
          updateUI(true);
        })
        .catch(() => {
          updateUI(false);
        });
    }

    function pauseAudio() {
      audio.pause();
      updateUI(false);
    }

    if (toggleBtn) {
      toggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (isPlaying) {
          pauseAudio();
        } else {
          playAudio();
        }
      });
    }

    // Tự động phát khi tải trang
    playAudio();

    // Mở khóa âm thanh khi tương tác lần đầu
    const unlockAudio = () => {
      if (!isPlaying) {
        playAudio();
      }
      window.removeEventListener('click', unlockAudio);
      window.removeEventListener('touchstart', unlockAudio);
      window.removeEventListener('keydown', unlockAudio);
    };

    window.addEventListener('click', unlockAudio, { once: true });
    window.addEventListener('touchstart', unlockAudio, { once: true, passive: true });
    window.addEventListener('keydown', unlockAudio, { once: true });
  }

  // --- 4. LOVE COUNTER ---
  function initLoveCounter() {
    const counterContainer = document.getElementById('love-counter');
    if (!counterContainer) return;

    const startDateStr = counterContainer.dataset.startDate || '2025-10-11T00:00:00';
    const startDate = new Date(startDateStr);

    const daysEl = document.getElementById('count-days');
    const hoursEl = document.getElementById('count-hours');
    const minutesEl = document.getElementById('count-minutes');
    const secondsEl = document.getElementById('count-seconds');

    function updateCounter() {
      const now = new Date();
      const diff = Math.max(0, now - startDate);

      const totalSeconds = Math.floor(diff / 1000);
      const days = Math.floor(totalSeconds / (3600 * 24));
      const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = Math.floor(totalSeconds % 60);

      if (daysEl) daysEl.textContent = String(days).padStart(3, '0');
      if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
      if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
      if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
    }

    updateCounter();
    setInterval(updateCounter, 1000);
  }

  // --- 5. EXTRA INTERACTIONS ---
  function initInteractions() {
    // A. Bức thư tình
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

    // B. Lightbox ảnh
    const lightbox = document.getElementById('photo-lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxClose = document.getElementById('lightbox-close');
    const galleryItems = document.querySelectorAll('.gallery-item');

    if (lightbox && lightboxImg) {
      galleryItems.forEach((item) => {
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

    // C. Thả tim bay
    const heartBtn = document.getElementById('send-heart-btn');
    const heartCounterEl = document.getElementById('heart-count');
    let heartCount = 365;

    if (heartBtn) {
      heartBtn.addEventListener('click', (e) => {
        heartCount++;
        if (heartCounterEl) heartCounterEl.textContent = heartCount;

        for (let i = 0; i < 6; i++) {
          createFloatingHeart(e.clientX, e.clientY);
        }
      });
    }

    function createFloatingHeart(x, y) {
      const heart = document.createElement('span');
      heart.className = 'floating-heart';
      heart.textContent = ['❤️', '💖', '✨', '🌹', '🥰'][Math.floor(Math.random() * 5)];

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

    // D. Nút cuộn xuống từ hero
    const scrollDownBtn = document.getElementById('scroll-down-btn');
    const counterSec = document.getElementById('counter-section');
    if (scrollDownBtn && counterSec) {
      scrollDownBtn.addEventListener('click', () => {
        counterSec.scrollIntoView({ behavior: 'smooth' });
      });
    }

    // E. Nút cuộn lên đầu trang
    const backToTopBtn = document.getElementById('back-to-top-btn');
    if (backToTopBtn) {
      backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }

  // --- 6. MARQUEE GALLERY — CLICK ZOOM + TILT 3D ---
  function initMarqueeGallery() {
    const zoomOverlay = document.getElementById('mgallery-zoom');
    const zoomImg = document.getElementById('mgallery-zoom-img');
    const galleryWrapper = document.querySelector('.marquee-gallery-wrapper');
    if (!zoomOverlay || !zoomImg) return;

    const items = document.querySelectorAll('.mgallery-item');
    let activeItem = null;
    let isAnimating = false;

    // ── Marquee items: chỉ có hover highlight nhẹ, KHÔNG có tilt ──
    items.forEach((item) => {
      item.addEventListener('mouseenter', () => {
        if (activeItem) return;
        item.style.boxShadow = '0 16px 40px rgba(60,42,32,0.2)';
        item.style.zIndex = '5';
      });

      item.addEventListener('mouseleave', () => {
        item.style.boxShadow = '';
        item.style.zIndex = '';
      });

      // ── Nhấn → ảnh bay ra chính giữa ──
      item.addEventListener('click', () => {
        if (isAnimating || activeItem) return;
        isAnimating = true;
        activeItem = item;

        const src = item.dataset.src;
        const rect = item.getBoundingClientRect();
        const vw = window.innerWidth;
        const vh = window.innerHeight;

        // Vị trí center của item so với center viewport
        const dx = (rect.left + rect.width / 2) - vw / 2;
        const dy = (rect.top + rect.height / 2) - vh / 2;

        // Scale ban đầu: item height / chiều cao ảnh đích
        const targetH = Math.min(vh * 0.82, 800);
        const startScale = rect.height / targetH;

        // Reset hover state
        item.style.boxShadow = '';
        item.style.zIndex = '';

        // Thiết lập zoom img tại đúng vị trí item
        zoomImg.src = src;
        zoomImg.style.transition = 'none';
        zoomImg.style.transform = `translate(${dx}px, ${dy}px) scale(${startScale})`;
        zoomImg.style.opacity = '0.15';
        zoomImg.style.borderRadius = '16px';

        // Mờ item gốc nhưng giữ nguyên định hướng
        item.style.opacity = '0';
        item.style.transition = 'opacity 0.3s ease';

        // Pause băng chuyền
        if (galleryWrapper) galleryWrapper.classList.add('zoom-paused');

        // Bật backdrop
        zoomOverlay.setAttribute('aria-hidden', 'false');
        zoomOverlay.classList.add('zoom-active');

        // Fly to center
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            zoomImg.style.transition = 'transform 0.55s cubic-bezier(0.22,1,0.36,1), opacity 0.35s ease, border-radius 0.4s ease';
            zoomImg.style.transform = 'translate(0px,0px) scale(1)';
            zoomImg.style.opacity = '1';
            zoomImg.style.borderRadius = '20px';
            setTimeout(() => { isAnimating = false; }, 570);
          });
        });
      });
    });

    // ── Hiệu ứng nghiêng 3D trên ảnh đang zoom (chỉ khi đang hiển thị) ──
    let tiltActive = false;
    zoomImg.addEventListener('mousemove', (e) => {
      if (!activeItem || isAnimating) return;
      tiltActive = true;
      const rect = zoomImg.getBoundingClientRect();
      const cx = (e.clientX - rect.left) / rect.width - 0.5;
      const cy = (e.clientY - rect.top) / rect.height - 0.5;
      zoomImg.style.transition = 'transform 0.08s ease';
      zoomImg.style.transform = `translate(0px,0px) scale(1) perspective(900px) rotateY(${cx * 14}deg) rotateX(${-cy * 14}deg)`;
    });

    zoomImg.addEventListener('mouseleave', () => {
      if (!activeItem || !tiltActive) return;
      tiltActive = false;
      zoomImg.style.transition = 'transform 0.35s cubic-bezier(0.22,1,0.36,1)';
      zoomImg.style.transform = 'translate(0px,0px) scale(1)';
    });

    // ── Nhấn ra ngoài → ảnh bay về chỗ cũ ──
    function closeZoom() {
      if (!activeItem || isAnimating) return;
      isAnimating = true;

      const item = activeItem;
      const rect = item.getBoundingClientRect();
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      const dx = (rect.left + rect.width / 2) - vw / 2;
      const dy = (rect.top + rect.height / 2) - vh / 2;
      const targetH = Math.min(vh * 0.82, 800);
      const endScale = rect.height / targetH;

      // Reset tilt → về trạng thái bình thường trước khi fly back
      zoomImg.style.transition = 'transform 0.2s ease, opacity 0.15s ease';
      zoomImg.style.transform = 'translate(0px,0px) scale(1)';

      // Sau khi tilt về thì fly back
      setTimeout(() => {
        zoomImg.style.transition = 'transform 0.48s cubic-bezier(0.4,0,0.6,1), opacity 0.28s ease, border-radius 0.35s ease';
        zoomImg.style.transform = `translate(${dx}px,${dy}px) scale(${endScale})`;
        zoomImg.style.opacity = '0';
        zoomImg.style.borderRadius = '16px';

        // Khôi phục item gốc — chỉ opacity, KHÔNG transform
        item.style.transition = 'opacity 0.3s ease';
        item.style.opacity = '';

        setTimeout(() => {
          zoomOverlay.classList.remove('zoom-active');
          zoomOverlay.setAttribute('aria-hidden', 'true');
          if (galleryWrapper) galleryWrapper.classList.remove('zoom-paused');
          item.style.transition = '';
          activeItem = null;
          isAnimating = false;
          setTimeout(() => {
            zoomImg.src = '';
            zoomImg.style.transform = '';
            zoomImg.style.opacity = '';
            zoomImg.style.transition = '';
            zoomImg.style.borderRadius = '';
          }, 60);
        }, 490);
      }, 220);
    }

    // Backdrop click
    const backdrop = zoomOverlay.querySelector('.mgallery-zoom-backdrop');
    if (backdrop) backdrop.addEventListener('click', closeZoom);

    // Click vào ảnh không đóng
    zoomImg.addEventListener('click', (e) => e.stopPropagation());

    // Phím Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeZoom();
    });
  }

  // KHỞI CHẠY TẤT CẢ
  function runAll() {
    initSpotlight();
    initAnimations();
    initAudio();
    initLoveCounter();
    initInteractions();
    initMarqueeGallery();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runAll);
  } else {
    runAll();
  }
})();
