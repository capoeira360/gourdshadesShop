'use client';

import { useEffect, useRef } from 'react';
import { usePanel } from '@/contexts/PanelContext';

// Watches window scroll and updates global isScrollingDown state.
// Applies a threshold to avoid flicker on tiny scrolls and keeps UI visible near top.
const ScrollWatcher: React.FC = () => {
  const { setScrollingDown } = usePanel();
  const lastYRef = useRef<number>(0);
  const tickingRef = useRef<boolean>(false);
  const pendingDirectionRef = useRef<'down' | 'up' | null>(null);
  const timerRef = useRef<number | null>(null);
  const lastCommittedDirectionRef = useRef<'down' | 'up'>('up');

  useEffect(() => {
    lastYRef.current = window.scrollY || 0;

    const handleScroll = () => {
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
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, [setScrollingDown]);

  return null;
};

export default ScrollWatcher;
