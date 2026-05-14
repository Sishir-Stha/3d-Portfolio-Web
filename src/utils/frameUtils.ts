/**
 * Calculate frame index from scroll progress (0–1).
 * Ensures the first frame is shown at progress=0 and
 * the last frame is shown at progress=1.
 */
export function progressToFrame(progress: number, totalFrames: number): number {
  const clamped = Math.max(0, Math.min(1, progress));
  return Math.floor(clamped * (totalFrames - 1));
}

/**
 * Generate a padded frame filename.
 * e.g., frameFilename(1, 5) => "00001"
 */
export function frameFilename(index: number, padding: number = 5): string {
  return String(index).padStart(padding, '0');
}
