// tapShimmer.js
// Hybrid modular expansion: tap sequence + shimmer feedback
// No globals. All listeners are scoped and removable.

export function createTapShimmerModule({
  // Visual feedback element id (optional)
  shimmerId = null,
  shimmerDuration = 260,

  // Tap elements (hybrid: invisible zones or visible sigils)
  taps = [
    { id: 'tapTopLeft' },
    { id: 'tapTopRight' }
  ],

  // Required sequence of element ids
  requiredSequence = ['tapTopLeft', 'tapTopRight'],

  // Gate set + callback upon success
  onUnlock = () => {},
  // Optional onProgress callback (receives array of current sequence)
  onProgress = null,

  // Auto-reset timing for partial sequences
  autoResetMs = 8000,

  // Feature flags
  enableShimmer = true,
  // Predicate to decide when to initialize (e.g., mobile-only)
  shouldInitialize = () => true
} = {}) {

  let initialized = false;
  let sequence = [];
  let resetTimer = null;
  const listeners = [];

  // Helpers
  const getEl = id => (id ? document.getElementById(id) : null);

  function pulseShimmer() {
    if (!enableShimmer || !shimmerId) return;
    const s = getEl(shimmerId);
    if (!s) return;
    s.classList.add('active');
    setTimeout(() => s.classList.remove('active'), shimmerDuration);
  }

  function resetSequence() {
    sequence = [];
    if (resetTimer) clearTimeout(resetTimer);
    resetTimer = null;
  }

  function scheduleReset() {
    if (resetTimer) clearTimeout(resetTimer);
    resetTimer = setTimeout(resetSequence, autoResetMs);
  }

  function handleTap(id) {
    sequence.push(id);
    if (typeof onProgress === 'function') onProgress([...sequence]);
    pulseShimmer();

    // Check exact match so far; if mismatch, reset softly
    const idx = sequence.length - 1;
    if (sequence[idx] !== requiredSequence[idx]) {
      // wrong step; soft reset to keep ceremony graceful
      scheduleReset();
      return;
    }

    // Completed sequence
    if (sequence.length === requiredSequence.length) {
      resetSequence();
      if (typeof onUnlock === 'function') onUnlock();
    } else {
      scheduleReset();
    }
  }

  function attachListeners() {
    taps.forEach(({ id }) => {
      const el = getEl(id);
      if (!el) return;
      const handler = () => handleTap(id);
      el.addEventListener('click', handler, { passive: true });
      listeners.push({ el, handler });
    });
  }

  function detachListeners() {
    listeners.forEach(({ el, handler }) => el.removeEventListener('click', handler));
    listeners.length = 0;
  }

  // Public API
  function initialize() {
    if (initialized) return;
    if (!shouldInitialize()) return;
    attachListeners();
    initialized = true;
  }

  function destroy() {
    if (!initialized) return;
    detachListeners();
    resetSequence();
    initialized = false;
  }

  function isInitialized() {
    return initialized;
  }

  function setRequiredSequence(nextSeq) {
    if (Array.isArray(nextSeq) && nextSeq.length > 0) {
      requiredSequence = [...nextSeq];
      resetSequence();
    }
  }

  function setEnableShimmer(flag) {
    enableShimmer = !!flag;
  }

  return {
    initialize,
    destroy,
    isInitialized,
    setRequiredSequence,
    setEnableShimmer
  };
}

