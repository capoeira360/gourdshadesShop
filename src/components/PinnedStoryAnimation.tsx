'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface PinnedStoryAnimationProps {
  title: string;
  paragraphs: string[];
  className?: string;
}

const PinnedStoryAnimation: React.FC<PinnedStoryAnimationProps> = ({
  title,
  paragraphs,
  className = ''
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleCharsRef = useRef<HTMLSpanElement[]>([]);
  const paragraphCharsRef = useRef<HTMLSpanElement[][]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    // Split title into characters
    const titleElement = containerRef.current.querySelector('.story-title');
    if (titleElement) {
      const titleText = titleElement.textContent || '';
      titleElement.innerHTML = titleText
        .split('')
        .map((char, index) => 
          `<span class="story-char" data-char="${index}" style="opacity: 0;">${char === ' ' ? '&nbsp;' : char}</span>`
        )
        .join('');
      
      titleCharsRef.current = Array.from(titleElement.querySelectorAll('.story-char'));
    }

    // Split paragraphs into characters
    const paragraphElements = containerRef.current.querySelectorAll('.story-paragraph');
    paragraphElements.forEach((paragraph, pIndex) => {
      const paragraphText = paragraph.textContent || '';
      paragraph.innerHTML = paragraphText
        .split('')
        .map((char, index) => 
          `<span class="story-char" data-char="${index}" style="opacity: 0;">${char === ' ' ? '&nbsp;' : char}</span>`
        )
        .join('');
      
      paragraphCharsRef.current[pIndex] = Array.from(paragraph.querySelectorAll('.story-char'));
    });

    // Collect all character spans for animation
    const allChars = [
      ...titleCharsRef.current,
      ...paragraphCharsRef.current.flat()
    ];

    // Create GSAP timeline with ScrollTrigger
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=800px", // Length of scroll animation
        pin: true,
        scrub: true,
        anticipatePin: 1,
        onEnter: () => {
          // Optional: Add any enter animations
        },
        onLeave: () => {
          // Optional: Add any leave animations
        },
        onEnterBack: () => {
          // Optional: Add any enter back animations
        }
      }
    });

    // Animate characters with stagger
    tl.to(allChars, {
      opacity: 1,
      stagger: 0.02,
      ease: "none",
      duration: 1
    });

    return () => {
      // Cleanup ScrollTrigger
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === containerRef.current) {
          trigger.kill();
        }
      });
    };
  }, [title, paragraphs]);

  return (
    <section 
      ref={containerRef}
      id="our-story"
      className={`min-h-screen flex items-center justify-center bg-white ${className}`}
      style={{
        background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 50%, #ffffff 100%)'
      }}
    >
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="story-title text-4xl md:text-6xl font-light mb-12 leading-tight"
            style={{ color: '#2c2c2c' }}>
          {title}
        </h2>
        <div className="space-y-8">
          {paragraphs.map((paragraph, index) => (
            <p 
              key={index}
              className="story-paragraph text-lg md:text-xl leading-relaxed max-w-3xl mx-auto"
              style={{ color: '#4a4a4a' }}
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PinnedStoryAnimation;