import { useCallback, useEffect, useRef, useState } from 'react';
import { useAvatarSequence } from '@/hooks/useAvatarSequence';
import { useScrollAvatarTimeline } from '@/hooks/useScrollAvatarTimeline';
import { getFrameUrls, getIdleSequence } from '@/data/avatarSequences';
import { SECTION_POSITIONS, applyAvatarPosition } from '@/data/avatarPositions';

// Stable module-level constants
const HERO_IDLE_SEQ = getIdleSequence('hero')!;
const HERO_IDLE_FRAMES = getFrameUrls(HERO_IDLE_SEQ);

const PARTICLES = [
  { left: '20%', top: '15%', delay: '0s', duration: '6s' },
  { left: '75%', top: '25%', delay: '1s', duration: '8s' },
  { left: '40%', top: '70%', delay: '2s', duration: '7s' },
  { left: '85%', top: '60%', delay: '0.5s', duration: '9s' },
  { left: '15%', top: '80%', delay: '3s', duration: '6s' },
  { left: '60%', top: '10%', delay: '1.5s', duration: '7.5s' },
];

type AvatarMode = 'idle' | 'transition' | 'hold';

export function AvatarStage() {
  const [mode, setMode] = useState<AvatarMode>('idle');
  const [transitionFrameUrl, setTransitionFrameUrl] = useState('');
  const [hasTransparent, setHasTransparent] = useState(false);
  const holdFrameRef = useRef('');

  // Set initial position
  useEffect(() => {
    applyAvatarPosition(SECTION_POSITIONS.hero);
  }, []);

  const {
    currentFrameUrl: idleFrameUrl,
    isLoaded: idleLoaded,
    play: playIdle,
    pause: pauseIdle,
  } = useAvatarSequence({
    frameUrls: HERO_IDLE_FRAMES,
    fps: 24,
    autoPlay: false,
    loop: true,
  });

  useEffect(() => {
    if (idleLoaded && mode === 'idle') playIdle();
  }, [idleLoaded, mode, playIdle]);

  // Detect transparency once
  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      const c = document.createElement('canvas');
      c.width = 4; c.height = 4;
      const ctx = c.getContext('2d');
      if (!ctx) return;
      ctx.drawImage(img, 0, 0, 4, 4);
      setHasTransparent(ctx.getImageData(0, 0, 1, 1).data[3] < 200);
    };
    img.src = HERO_IDLE_FRAMES[0];
  }, []);

  const handleTransitionFrame = useCallback(
    (frameIndex: number, _seqId: string, frameUrls: string[]) => {
      const url = frameUrls[frameIndex] ?? '';
      setTransitionFrameUrl(url);
      holdFrameRef.current = url;
    }, []
  );

  const handleTransitionStart = useCallback((_: string) => {
    pauseIdle();
    setMode('transition');
  }, [pauseIdle]);

  const handleTransitionEnd = useCallback((_: string) => {
    setMode('hold');
  }, []);

  const handleSectionEnter = useCallback((sectionId: string) => {
    if (sectionId === 'hero') {
      setMode('idle');
      playIdle();
    }
  }, [playIdle]);

  useScrollAvatarTimeline({
    onTransitionFrame: handleTransitionFrame,
    onTransitionStart: handleTransitionStart,
    onTransitionEnd: handleTransitionEnd,
    onSectionEnter: handleSectionEnter,
  });

  const displayUrl =
    mode === 'idle' ? idleFrameUrl
    : mode === 'transition' ? transitionFrameUrl
    : holdFrameRef.current || transitionFrameUrl;

  const isBreathing = mode === 'hold';

  return (
    <div className="avatar-stage-fullscreen">
      {/* Background effects layer */}
      <div className="avatar-stage-bg">
        {/* Ambient glow orbs */}
        <div className="stage-glow-orb" style={{ left: 'var(--avatar-x)', top: 'var(--avatar-y)', transform: 'translate(-50%, -50%)' }} />
        <div style={{
          position: 'absolute', width: '180px', height: '180px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)',
          left: 'calc(var(--avatar-x) - 15%)', top: 'calc(var(--avatar-y) - 20%)',
          pointerEvents: 'none', animation: 'stageGlowPulse 7s ease-in-out infinite', animationDelay: '2.5s',
        }} />
        {/* Floating particles near avatar */}
        {PARTICLES.map((p, i) => (
          <div key={i} className="stage-particle" style={{ left: p.left, top: p.top, animationDelay: p.delay, animationDuration: p.duration }} />
        ))}
      </div>

      {/* Avatar frame — positioned by CSS vars */}
      <div className={`avatar-frame-fullscreen ${hasTransparent ? 'transparent' : ''} ${isBreathing ? 'avatar-breathing' : ''}`}>
        {displayUrl && (
          <img
            src={displayUrl}
            alt="Sishir Shrestha avatar"
            width={1280}
            height={720}
            draggable={false}
          />
        )}
      </div>

      {/* "Your Guide" badge follows avatar */}
      <div className="avatar-badge" style={{ left: 'var(--avatar-x)', top: 'calc(var(--avatar-y) - 42%)' }}>
        <span className="avatar-badge-dot" />
        Your Guide
      </div>
    </div>
  );
}
