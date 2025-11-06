'use client';

import { useEffect, useRef } from 'react';
import { usePanel } from '@/contexts/PanelContext';

// Watches window scroll and updates global isScrollingDown state.
// Applies a threshold to avoid flicker on tiny scrolls and keeps UI visible near top.
const ScrollWatcher: React.FC = () => {
  const { setScrollingDown, setUiAutoHidden } = usePanel();
  const lastYRef = useRef<number>(0);
  const tickingRef = useRef<boolean>(false);
  const pendingDirectionRef = useRef<'down' | 'up' | null>(null);
  const timerRef = useRef<number | null>(null);
  const lastCommittedDirectionRef = useRef<'down' | 'up'>('up');
  const idleTimerRef = useRef<number | null>(null);
  const IDLE_HIDE_DELAY_MS = 4000; // auto-hide after 4 seconds of inactivity

  useEffect(() => {
    lastYRef.current = window.scrollY || 0;

    const resetIdleTimer = () => {
      // Any user activity should show UI immediately and restart idle timer
      if (idleTimerRef.current) {
        window.clearTimeout(idleTimerRef.current);
        idleTimerRef.current = null;
      }
      setUiAutoHidden(false);
      idleTimerRef.current = window.setTimeout(() => {
        setUiAutoHidden(true);
      }, IDLE_HIDE_DELAY_MS);
    };

    const handleScroll = () => {
      resetIdleTimer();
      if (tickingRef.current) return;
      tickingRef.current = true;

      requestAnimationFrame(() => {
        const currentY = window.scrollY || 0;
        const delta = currentY - lastYRef.current;
        const threshold = 6; // minimal movement to trigger
        const nearTop = currentY < 20; // keep visible near top
        const DIRECTION_CHANGE_DELAY_MS = 250; // unified delay across devices

        // Always visible near the very top; cancel any pending hides/shows
        if (nearTop) {
          if (timerRef.current) {
            window.clearTimeout(timerRef.current);
            timerRef.current = null;
            pendingDirectionRef.current = null;
          }
          setScrollingDown(false);
          lastCommittedDirectionRef.current = 'up';
        } else if (Math.abs(delta) > threshold) {
          const newDirection: 'down' | 'up' = delta > 0 ? 'down' : 'up';

          // If direction changed or no timer pending, start/restart delay timer
          if (pendingDirectionRef.current !== newDirection) {
            if (timerRef.current) {
              window.clearTimeout(timerRef.current);
              timerRef.current = null;
            }
            pendingDirectionRef.current = newDirection;
            timerRef.current = window.setTimeout(() => {
              setScrollingDown(newDirection === 'down');
              lastCommittedDirectionRef.current = newDirection;
              pendingDirectionRef.current = null;
              timerRef.current = null;
            }, DIRECTION_CHANGE_DELAY_MS);
          }
        }

        lastYRef.current = currentY;
        tickingRef.current = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', resetIdleTimer, { passive: true });
    window.addEventListener('mousedown', resetIdleTimer, { passive: true });
    window.addEventListener('keydown', resetIdleTimer, { passive: true });
    window.addEventListener('touchstart', resetIdleTimer, { passive: true });

    // Start initial idle timer on mount
    resetIdleTimer();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', resetIdleTimer);
      window.removeEventListener('mousedown', resetIdleTimer);
      window.removeEventListener('keydown', resetIdleTimer);
      window.removeEventListener('touchstart', resetIdleTimer);
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
      }
      if (idleTimerRef.current) {
        window.clearTimeout(idleTimerRef.current);
      }
    };
  }, [setScrollingDown, setUiAutoHidden]);

  return null;
};

export default ScrollWatcher;