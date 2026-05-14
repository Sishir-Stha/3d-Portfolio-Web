import { useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { avatarSequences, getFrameUrls, sectionOrder } from '@/data/avatarSequences';
import { progressToFrame } from '@/utils/frameUtils';
import {
  TRANSITION_POSITIONS,
  SECTION_POSITIONS,
  lerpPosition,
  applyAvatarPosition,
} from '@/data/avatarPositions';

gsap.registerPlugin(ScrollTrigger);

interface ScrollAvatarCallbacks {
  onTransitionFrame: (frameIndex: number, sequenceId: string, frameUrls: string[]) => void;
  onTransitionStart: (sequenceId: string) => void;
  onTransitionEnd:   (sequenceId: string, targetSection: string) => void;
  onSectionEnter:    (sectionId: string)  => void;
}

export function useScrollAvatarTimeline(callbacks: ScrollAvatarCallbacks) {
  const triggersRef   = useRef<ScrollTrigger[]>([]);
  const callbacksRef  = useRef(callbacks);

  useEffect(() => { callbacksRef.current = callbacks; }, [callbacks]);

  const setupTriggers = useCallback(() => {
    triggersRef.current.forEach((t) => t.kill());
    triggersRef.current = [];

    // Pre-build frame URL map
    const frameUrlsMap = new Map<string, string[]>();
    avatarSequences
      .filter((s) => s.type === 'transition')
      .forEach((s) => frameUrlsMap.set(s.id, getFrameUrls(s)));

    // ── Transition scroll triggers ──────────────────────────────────────
    const transitions = avatarSequences.filter((s) => s.type === 'transition');

    transitions.forEach((seq) => {
      const triggerEl = document.getElementById(seq.fromSection);
      if (!triggerEl) return;

      const frameUrls  = frameUrlsMap.get(seq.id);
      if (!frameUrls)  return;

      const posTrans   = TRANSITION_POSITIONS[seq.id];

      const trigger = ScrollTrigger.create({
        trigger: triggerEl,
        // Transition fires while the section scrolls out of view
        start: 'bottom bottom',
        end:   'bottom top',
        scrub: 0.6,
        onUpdate: (self) => {
          const p = self.progress;

          // 1. Frame
          const frameIndex = progressToFrame(p, seq.frameCount);
          callbacksRef.current.onTransitionFrame(frameIndex, seq.id, frameUrls);

          // 2. Position — same progress drives the move
          if (posTrans) {
            const pos = lerpPosition(posTrans.start, posTrans.end, p);
            applyAvatarPosition(pos);
          }
        },
        onEnter:     () => callbacksRef.current.onTransitionStart(seq.id),
        onLeave:     () => {
          if (posTrans) applyAvatarPosition(posTrans.end);
          callbacksRef.current.onTransitionEnd(seq.id, seq.toSection ?? seq.fromSection);
        },
        onEnterBack: () => callbacksRef.current.onTransitionStart(seq.id),
        onLeaveBack: () => {
          if (posTrans) applyAvatarPosition(posTrans.start);
          callbacksRef.current.onTransitionEnd(seq.id, seq.fromSection);
        },
      });

      triggersRef.current.push(trigger);
    });

    // ── Section enter triggers (idle/hold position snap) ─────────────────
    sectionOrder.forEach((sectionId) => {
      const el = document.getElementById(sectionId);
      if (!el) return;

      const trigger = ScrollTrigger.create({
        trigger: el,
        start: 'top center',
        end:   'bottom center',
        onEnter:     () => {
          callbacksRef.current.onSectionEnter(sectionId);
          // Snap avatar to section idle position (smooth via CSS transition)
          const pos = SECTION_POSITIONS[sectionId];
          if (pos) applyAvatarPosition(pos);
        },
        onEnterBack: () => {
          callbacksRef.current.onSectionEnter(sectionId);
          const pos = SECTION_POSITIONS[sectionId];
          if (pos) applyAvatarPosition(pos);
        },
      });

      triggersRef.current.push(trigger);
    });
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setupTriggers(), 250);
    return () => {
      clearTimeout(t);
      triggersRef.current.forEach((t) => t.kill());
      triggersRef.current = [];
    };
  }, [setupTriggers]);

  useEffect(() => {
    const h = () => ScrollTrigger.refresh();
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, []);

  return { refresh: () => ScrollTrigger.refresh() };
}
