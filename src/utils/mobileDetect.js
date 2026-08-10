/**
 * Returns true if the current device is likely a mobile or tablet.
 * Used to reduce 3D scene complexity on low-power devices.
 */
export function isMobileDevice() {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 768 || /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
}

/**
 * Returns appropriate particle count based on device capability.
 */
export function getParticleCount() {
  if (isMobileDevice()) return 1000;
  if (window.innerWidth < 1200) return 2500;
  return 4000;
}

/**
 * Returns appropriate pixel ratio — capped to avoid GPU overload on high-DPR mobile screens.
 */
export function getSafePixelRatio() {
  const dpr = window.devicePixelRatio || 1;
  if (isMobileDevice()) return Math.min(dpr, 1.5);
  return Math.min(dpr, 2);
}
