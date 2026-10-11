/**
 * ==========================================
 * BACKGROUND AUDIO CONTROLLER
 * Quản lý phát nhạc nền, xử lý chính sách Autoplay
 * của trình duyệt và đồng bộ nút Bật/Tắt âm thanh.
 * ==========================================
 */

export function initAudio() {
  const audio = document.getElementById('bg-audio');
  const toggleBtn = document.getElementById('music-toggle-btn');
  const btnText = document.getElementById('music-btn-text');

  if (!audio) return;

  let isPlaying = false;

  // Cập nhật giao diện nút bấm
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

  // Phát nhạc an toàn
  function playAudio() {
    audio.play()
      .then(() => {
        updateUI(true);
      })
      .catch((err) => {
        console.warn('Autoplay bị trình duyệt hạn chế trước khi có tương tác:', err.message);
        updateUI(false);
      });
  }

  // Tạm dừng nhạc
  function pauseAudio() {
    audio.pause();
    updateUI(false);
  }

  // Xử lý sự kiện click vào nút toggle
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

  // Cố gắng phát tự động ngay khi tải trang
  playAudio();

  // GIẢI PHÁP AUTOPLAY CHO TRÌNH DUYỆT:
  // Nếu trình duyệt chặn autoplay, tự động phát ngay khi người dùng chạm hoặc click lần đầu bất kỳ đâu trên màn hình
  const unlockAudioOnFirstInteraction = () => {
    if (!isPlaying) {
      playAudio();
    }
    // Gỡ bỏ listener sau lần tương tác đầu tiên
    window.removeEventListener('click', unlockAudioOnFirstInteraction);
    window.removeEventListener('touchstart', unlockAudioOnFirstInteraction);
    window.removeEventListener('keydown', unlockAudioOnFirstInteraction);
  };

  window.addEventListener('click', unlockAudioOnFirstInteraction, { once: true });
  window.addEventListener('touchstart', unlockAudioOnFirstInteraction, { once: true, passive: true });
  window.addEventListener('keydown', unlockAudioOnFirstInteraction, { once: true });
}
