'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface TextGradientOpacityOnScrollProps {
  text: string;
  className?: string;
  containerClassName?: string;
  staggerDelay?: number;
  scrollStart?: string;
  scrollEnd?: string;
}

export default function TextGradientOpacityOnScroll({
  text,
  className = '',
  containerClassName = '',
  staggerDelay = 0.05,
  scrollStart = 'top 80%',
  scrollEnd = 'bottom 20%'
}: TextGradientOpacityOnScrollProps) {
  const refs = useRef<(HTMLSpanElement | null)[]>([]);
  const container = useRef<HTMLDivElement>(null);

  // Clear refs on re-render
  refs.current = [];

  useEffect(() => {
    if (refs.current.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.set(refs.current, { opacity: 0 });

      gsap.to(refs.current, {
        scrollTrigger: {
          trigger: container.current,
          start: scrollStart,
          end: scrollEnd,
          scrub: 1,
        },
        opacity: 1,
        ease: "none",
        stagger: staggerDelay,
      });
    }, container);

    return () => ctx.revert();
  }, [staggerDelay, scrollStart, scrollEnd]);

  const addToRefs = (el: HTMLSpanElement | null) => {
    if (el && !refs.current.includes(el)) {
      refs.current.push(el);
    }
  };

  // Split text into words and letters, create spans per character
  const splitWords = (text: string) => {
    return text.split(' ').map((word, wIdx) => (
      <span key={`word-${wIdx}`} className="inline-block">
        {word.split('').map((char, cIdx) => (
          <span
            key={`char-${wIdx}-${cIdx}`}
            ref={addToRefs}
            className={`inline-block animated-char ${className}`}
            style={{ opacity: 0 }}
          >
            {char}
          </span>
        ))}
        {wIdx < text.split(' ').length - 1 && (
          <span className="inline-block">&nbsp;</span>
        )}
      </span>
    ));
  };

  return (
    <div ref={container} className={containerClassName}>
      {splitWords(text)}
    </div>
  );
}