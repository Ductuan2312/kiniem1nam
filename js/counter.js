/**
 * ==========================================
 * LOVE COUNTER CONTROLLER
 * Đếm chính xác thời gian bên nhau (ngày, giờ, phút, giây)
 * và cập nhật liên tục mỗi giây.
 * ==========================================
 */

export function initLoveCounter() {
  const counterContainer = document.getElementById('love-counter');
  if (!counterContainer) return;

  // Lấy ngày bắt đầu từ data attribute (mặc định lấy 1 năm trước: 11/10/2025)
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
