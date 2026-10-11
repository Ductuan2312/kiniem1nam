/**
 * ==========================================
 * MAIN APPLICATION ENTRY POINT (ES MODULE)
 * ==========================================
 */

import { initSpotlight } from './spotlight.js';
import { initAnimations } from './animations.js';
import { initAudio } from './audio.js';
import { initLoveCounter } from './counter.js';
import { initInteractions } from './interactions.js';

document.addEventListener('DOMContentLoaded', () => {
  initSpotlight();
  initAnimations();
  initAudio();
  initLoveCounter();
  initInteractions();
});
