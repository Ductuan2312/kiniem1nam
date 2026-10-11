/**
 * ==========================================
 * TEXT & SCROLL ANIMATIONS CONTROLLER
 * Tách từng từ cho tiêu đề .words-pull-up và
 * kích hoạt hiển thị cuộn qua IntersectionObserver.
 * ==========================================
 */

export function initAnimations() {
  // 1. TÁCH TỪ (WORD SPLIT)
  const splitEls = document.querySelectorAll('.words-pull-up');
  splitEls.forEach(el => {
    if (el.dataset.split === 'true') return;

    let wordIndex = 0;
    if (el.tagName.toLowerCase() === 'h1' && el.children.length > 0) {
      Array.from(el.children).forEach(span => {
        if (span.tagName.toLowerCase() === 'span') {
          span.classList.add('pull-line');
          const words = span.textContent.trim().split(/\s+/);
          span.innerHTML = words.map(w => {
            const html = `<span class="pull-word" style="animation-delay: ${wordIndex * 0.1}s">${w}</span>`;
            wordIndex++;
            return html;
          }).join(' ');
        }
      });
    } else {
      const words = el.textContent.trim().split(/\s+/);
      el.innerHTML = words.map((w, i) => `<span class="pull-word" style="animation-delay: ${i * 0.1}s">${w}</span>`).join(' ');
    }
    el.dataset.split = 'true';
  });

  // 2. THEO DÕI CUỘN HIỂN THỊ (SCROLL REVEAL OBSERVER)
  if ('IntersectionObserver' in window) {
    // Observer cho các tiêu đề chữ
    const wordObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('words-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    document.querySelectorAll('.words-pull-up').forEach(el => wordObserver.observe(el));

    // Observer cho các khối fade-up
    const fadeObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const delay = entry.target.dataset.delay;
          if (delay) entry.target.style.animationDelay = `${delay}s`;
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    document.querySelectorAll('.fade-up-reveal').forEach(el => fadeObserver.observe(el));
  } else {
    // Fallback cho các trình duyệt cũ không hỗ trợ IntersectionObserver
    document.querySelectorAll('.words-pull-up').forEach(el => el.classList.add('words-visible'));
    document.querySelectorAll('.fade-up-reveal').forEach(el => {
      el.style.animationDelay = '0s';
      el.classList.add('is-visible');
    });
  }
}
