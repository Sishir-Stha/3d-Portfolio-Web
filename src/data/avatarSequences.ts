export interface AvatarSequence {
  id: string;
  type: 'idle' | 'transition';
  folder: string;       // path relative to /public/avatar/
  frameCount: number;
  fromSection: string;
  toSection?: string;    // undefined for idle
  fps?: number;          // only for idle loops
}

export const avatarSequences: AvatarSequence[] = [
  {
    id: 'hero-idle',
    type: 'idle',
    folder: 'hero-idle',
    frameCount: 192,
    fromSection: 'hero',
    fps: 24,
  },
  {
    id: 'hero-to-about',
    type: 'transition',
    folder: 'hero-to-about',
    frameCount: 192,
    fromSection: 'hero',
    toSection: 'about',
  },
  {
    id: 'about-to-skills',
    type: 'transition',
    folder: 'about-to-skills',
    frameCount: 192,
    fromSection: 'about',
    toSection: 'skills',
  },
  {
    id: 'skills-to-experience',
    type: 'transition',
    folder: 'skills-to-experience',
    frameCount: 194,
    fromSection: 'skills',
    toSection: 'experience',
  },
  {
    id: 'experience-to-projects',
    type: 'transition',
    folder: 'experience-to-projects',
    frameCount: 194,
    fromSection: 'experience',
    toSection: 'projects',
  },
  {
    id: 'projects-to-contact',
    type: 'transition',
    folder: 'projects-to-contact',
    frameCount: 121,
    fromSection: 'projects',
    toSection: 'contact',
  },
];

/**
 * Generate frame URLs for a given sequence.
 * Frames are in /public/avatar/{folder}/00001.webp → 000XX.webp
 */
export function getFrameUrls(sequence: AvatarSequence): string[] {
  return Array.from({ length: sequence.frameCount }, (_, i) => {
    const num = String(i + 1).padStart(5, '0');
    return `/avatar/${sequence.folder}/${num}.webp`;
  });
}

/**
 * Get the transition sequence for a given section pair.
 */
export function getTransitionSequence(fromSection: string): AvatarSequence | undefined {
  return avatarSequences.find(
    (s) => s.type === 'transition' && s.fromSection === fromSection
  );
}

/**
 * Get the idle sequence for a given section (only hero has one).
 */
export function getIdleSequence(section: string): AvatarSequence | undefined {
  return avatarSequences.find(
    (s) => s.type === 'idle' && s.fromSection === section
  );
}

/**
 * Section order for scroll tracking.
 */
export const sectionOrder = ['hero', 'about', 'skills', 'experience', 'projects', 'contact'] as const;
export type SectionId = (typeof sectionOrder)[number];
