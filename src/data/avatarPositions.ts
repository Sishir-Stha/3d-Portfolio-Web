/**
 * Avatar position configuration for each section and transition.
 * All values are percentages of viewport (e.g. x: 70 = left: 70%).
 */

export interface AvatarPosition {
  x: number;   // % of viewport width  (left: x%)
  y: number;   // % of viewport height (top: y%)
  scale: number;
}

/** Section idle/hold positions */
export const SECTION_POSITIONS: Record<string, AvatarPosition> = {
  hero:       { x: 78, y: 50, scale: 1.0 },
  about:      { x: 20, y: 54, scale: 1.0 },
  skills:     { x: 83, y: 58, scale: 0.98 },
  experience: { x: 18, y: 58, scale: 1.0 },
  projects:   { x: 78, y: 40, scale: 0.55 },
  contact:    { x: 18, y: 50, scale: 1.0 },
};

/** Transition start/end positions (from → to) */
export const TRANSITION_POSITIONS: Record<string, { start: AvatarPosition; end: AvatarPosition }> = {
  'hero-to-about':           { start: SECTION_POSITIONS.hero,       end: SECTION_POSITIONS.about      },
  'about-to-skills':         { start: SECTION_POSITIONS.about,      end: SECTION_POSITIONS.skills     },
  'skills-to-experience':    { start: SECTION_POSITIONS.skills,     end: SECTION_POSITIONS.experience },
  'experience-to-projects':  { start: SECTION_POSITIONS.experience, end: SECTION_POSITIONS.projects   },
  'projects-to-contact':     { start: SECTION_POSITIONS.projects,   end: SECTION_POSITIONS.contact    },
};

/** Linear interpolation */
export function lerp(start: number, end: number, progress: number): number {
  return start + (end - start) * progress;
}

/** Interpolate full position */
export function lerpPosition(start: AvatarPosition, end: AvatarPosition, t: number): AvatarPosition {
  return {
    x:     lerp(start.x,     end.x,     t),
    y:     lerp(start.y,     end.y,     t),
    scale: lerp(start.scale, end.scale, t),
  };
}

/** Apply position to document CSS variables */
export function applyAvatarPosition(pos: AvatarPosition) {
  const root = document.documentElement;
  root.style.setProperty('--avatar-x', `${pos.x}%`);
  root.style.setProperty('--avatar-y', `${pos.y}%`);
  root.style.setProperty('--avatar-scale', String(pos.scale));
}
