import { useCallback, useEffect, useRef, useState } from 'react';
import { preloadImagesBatched } from '@/utils/preloadImages';

interface UseAvatarSequenceOptions {
  frameUrls: string[];
  fps?: number;
  autoPlay?: boolean;
  loop?: boolean;
}

interface UseAvatarSequenceReturn {
  currentFrameUrl: string;
  currentFrameIndex: number;
  isLoaded: boolean;
  loadProgress: number;
  setFrameIndex: (index: number) => void;
  play: () => void;
  pause: () => void;
  isPlaying: boolean;
}

/**
 * Hook to manage an avatar animation sequence.
 * Handles preloading, idle loop playback (RAF), and manual frame control.
 * Pauses when the tab is hidden to save resources.
 */
export function useAvatarSequence({
  frameUrls,
  fps = 24,
  autoPlay = false,
  loop = true,
}: UseAvatarSequenceOptions): UseAvatarSequenceReturn {
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const rafRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);
  const frameIntervalRef = useRef<number>(1000 / fps);
  const isPlayingRef = useRef(false);
  const frameIndexRef = useRef(0);
  const frameCountRef = useRef(frameUrls.length);

  // Update refs when props change
  useEffect(() => {
    frameIntervalRef.current = 1000 / fps;
  }, [fps]);

  useEffect(() => {
    frameCountRef.current = frameUrls.length;
  }, [frameUrls.length]);

  // Preload frames
  useEffect(() => {
    if (frameUrls.length === 0) return;

    let cancelled = false;

    Promise.resolve().then(() => {
      if (cancelled) return;
      setIsLoaded(false);
      setLoadProgress(0);
    });

    preloadImagesBatched(frameUrls, 30, (loaded, total) => {
      if (cancelled) return;
      setLoadProgress(loaded / total);
    }).then(() => {
      if (cancelled) return;
      setIsLoaded(true);
      if (autoPlay) {
        isPlayingRef.current = true;
        setIsPlaying(true);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [frameUrls, autoPlay]);

  // RAF loop for idle playback
  const tick = useCallback(function tick(timestamp: number) {
    if (!isPlayingRef.current) return;

    if (timestamp - lastTimeRef.current >= frameIntervalRef.current) {
      lastTimeRef.current = timestamp;

      let nextFrame = frameIndexRef.current + 1;
      if (nextFrame >= frameCountRef.current) {
        if (loop) {
          nextFrame = 0;
        } else {
          isPlayingRef.current = false;
          setIsPlaying(false);
          return;
        }
      }

      frameIndexRef.current = nextFrame;
      setCurrentFrameIndex(nextFrame);
    }

    rafRef.current = requestAnimationFrame(tick);
  }, [loop]);

  // Start/stop RAF loop when isPlaying changes
  useEffect(() => {
    if (isPlaying && isLoaded) {
      lastTimeRef.current = 0;
      rafRef.current = requestAnimationFrame(tick);
    }

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [isPlaying, isLoaded, tick]);

  // Tab visibility: pause when hidden, resume when visible
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) {
        if (rafRef.current !== null) {
          cancelAnimationFrame(rafRef.current);
          rafRef.current = null;
        }
      } else if (isPlayingRef.current && isLoaded) {
        lastTimeRef.current = 0;
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, [isLoaded, tick]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  const setFrameIndex = useCallback((index: number) => {
    const clamped = Math.max(0, Math.min(index, frameUrls.length - 1));
    frameIndexRef.current = clamped;
    setCurrentFrameIndex(clamped);
  }, [frameUrls.length]);

  const play = useCallback(() => {
    isPlayingRef.current = true;
    setIsPlaying(true);
  }, []);

  const pause = useCallback(() => {
    isPlayingRef.current = false;
    setIsPlaying(false);
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, []);

  return {
    currentFrameUrl: frameUrls[currentFrameIndex] ?? '',
    currentFrameIndex,
    isLoaded,
    loadProgress,
    setFrameIndex,
    play,
    pause,
    isPlaying,
  };
}
