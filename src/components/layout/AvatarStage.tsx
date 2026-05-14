import { useCallback, useEffect, useRef, useState } from 'react';
import { useAvatarSequence } from '@/hooks/useAvatarSequence';
import { useScrollAvatarTimeline } from '@/hooks/useScrollAvatarTimeline';
import { getFrameUrls, getIdleSequence } from '@/data/avatarSequences';
import { SECTION_POSITIONS, applyAvatarPosition } from '@/data/avatarPositions';

const HERO_IDLE_SEQ = getIdleSequence('hero')!;
const HERO_IDLE_FRAMES = getFrameUrls(HERO_IDLE_SEQ);
const PROJECTS_HOLD_FRAME = '/avatar/experience-to-projects/00194.webp';

const PARTICLES = [
  { left: '20%', top: '15%', delay: '0s', duration: '6s' },
  { left: '75%', top: '25%', delay: '1s', duration: '8s' },
  { left: '40%', top: '70%', delay: '2s', duration: '7s' },
  { left: '85%', top: '60%', delay: '0.5s', duration: '9s' },
  { left: '15%', top: '80%', delay: '3s', duration: '6s' },
  { left: '60%', top: '10%', delay: '1.5s', duration: '7.5s' },
];

type AvatarMode = 'idle' | 'transition' | 'hold';

function getTransitionTarget(sequenceId: string) {
  return sequenceId.split('-to-')[1] ?? '';
}

export function AvatarStage() {
  const [mode, setMode] = useState<AvatarMode>('idle');
  const [activeSection, setActiveSection] = useState('hero');
  const [transitionFrameUrl, setTransitionFrameUrl] = useState('');
  const [holdFrameUrl, setHoldFrameUrl] = useState('');
  const [hasTransparent, setHasTransparent] = useState(false);
  const modeRef = useRef(mode);

  useEffect(() => {
    applyAvatarPosition(SECTION_POSITIONS.hero);
  }, []);

  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.avatarSection = activeSection;
    root.dataset.avatarMode = mode;

    return () => {
      delete root.dataset.avatarSection;
      delete root.dataset.avatarMode;
    };
  }, [activeSection, mode]);

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

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      const c = document.createElement('canvas');
      c.width = 4;
      c.height = 4;
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
      setHoldFrameUrl(url);
    },
    []
  );

  const handleTransitionStart = useCallback(() => {
    pauseIdle();
    setMode('transition');
  }, [pauseIdle]);

  const handleTransitionEnd = useCallback((sequenceId: string) => {
    const targetSection = getTransitionTarget(sequenceId);
    if (targetSection) setActiveSection(targetSection);
    setMode('hold');
  }, []);

  const handleSectionEnter = useCallback(
    (sectionId: string) => {
      setActiveSection(sectionId);

      if (sectionId === 'hero') {
        setMode('idle');
        playIdle();
        return;
      }

      if (sectionId === 'projects' && modeRef.current === 'idle') {
        pauseIdle();
        setHoldFrameUrl(PROJECTS_HOLD_FRAME);
        setTransitionFrameUrl(PROJECTS_HOLD_FRAME);
        setMode('hold');
      }
    },
    [pauseIdle, playIdle]
  );

  useScrollAvatarTimeline({
    onTransitionFrame: handleTransitionFrame,
    onTransitionStart: handleTransitionStart,
    onTransitionEnd: handleTransitionEnd,
    onSectionEnter: handleSectionEnter,
  });

  const displayUrl =
    mode === 'idle' ? idleFrameUrl
    : mode === 'transition' ? transitionFrameUrl
    : holdFrameUrl || transitionFrameUrl;

  const isBreathing = mode === 'hold';
  const isProjectsHold = activeSection === 'projects' && mode === 'hold';

  return (
    <div className={`avatar-stage-fullscreen${isProjectsHold ? ' projects-hold' : ''}`}>
      <div className="avatar-stage-bg">
        <div className="stage-glow-orb" style={{ left: 'var(--avatar-x)', top: 'var(--avatar-y)', transform: 'translate(-50%, -50%)' }} />
        <div style={{
          position: 'absolute', width: '180px', height: '180px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)',
          left: 'calc(var(--avatar-x) - 15%)', top: 'calc(var(--avatar-y) - 20%)',
          pointerEvents: 'none', animation: 'stageGlowPulse 7s ease-in-out infinite', animationDelay: '2.5s',
        }} />
        {PARTICLES.map((p, i) => (
          <div key={i} className="stage-particle" style={{ left: p.left, top: p.top, animationDelay: p.delay, animationDuration: p.duration }} />
        ))}
      </div>

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
    </div>
  );
}
