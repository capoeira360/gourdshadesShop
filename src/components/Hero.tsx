'use client';

import { useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  const setupAnimations = useCallback(() => {
    if (!heroRef.current || typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      // Initial text reveal animation
      const tl = gsap.timeline();
      
      // Split text into characters for staggered animation
      if (titleRef.current) {
        const titleText = titleRef.current.textContent || '';
        titleRef.current.innerHTML = titleText
          .split('')
          .map(char => `<span class="inline-block">${char === ' ' ? '&nbsp;' : char}</span>`)
          .join('');
      }

      if (subtitleRef.current) {
        const subtitleText = subtitleRef.current.textContent || '';
        subtitleRef.current.innerHTML = subtitleText
          .split(' ')
          .map(word => `<span class="inline-block">${word}&nbsp;</span>`)
          .join('');
      }

      // Initial reveal animations
      tl.from(titleRef.current?.children || [], {
        duration: 0.8,
        y: 100,
        opacity: 0,
        stagger: 0.02,
        ease: 'power3.out',
      })
      .from(subtitleRef.current?.children || [], {
        duration: 0.6,
        y: 50,
        opacity: 0,
        stagger: 0.05,
        ease: 'power2.out',
      }, '-=0.4')
      .from(ctaRef.current, {
        duration: 0.8,
        y: 30,
        opacity: 0,
        ease: 'power2.out',
      }, '-=0.3');

      // Scroll-triggered parallax animations
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
        invalidateOnRefresh: true,
        refreshPriority: -1,
        animation: gsap.to(backgroundRef.current, {
          yPercent: -50,
          ease: 'none',
        }),
      });

      ScrollTrigger.create({
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
        invalidateOnRefresh: true,
        refreshPriority: -1,
        animation: gsap.to(imageRef.current, {
          yPercent: -30,
          scale: 1.1,
          ease: 'none',
        }),
      });

      ScrollTrigger.create({
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
        invalidateOnRefresh: true,
        refreshPriority: -1,
        animation: gsap.to(textRef.current, {
          yPercent: -20,
          opacity: 0.3,
          ease: 'none',
        }),
      });

      ScrollTrigger.create({
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
        invalidateOnRefresh: true,
        refreshPriority: -1,
        animation: gsap.to(overlayRef.current, {
          opacity: 0.8,
          ease: 'none',
        }),
      });

      // Scroll indicator animation
      if (scrollIndicatorRef.current) {
        gsap.to(scrollIndicatorRef.current, {
          y: 10,
          duration: 1.5,
          repeat: -1,
          yoyo: true,
          ease: 'power2.inOut',
        });

        ScrollTrigger.create({
          trigger: heroRef.current,
          start: 'top top',
          end: '50% top',
          scrub: true,
          animation: gsap.to(scrollIndicatorRef.current, {
            opacity: 0,
            y: -20,
            ease: 'none',
          }),
        });
      }

      // Floating elements animation
      const floatingElements = heroRef.current?.querySelectorAll('.floating-element');
      floatingElements?.forEach((element, index) => {
        gsap.to(element, {
          y: `${-20 - index * 10}`,
          rotation: `${index * 5}`,
          duration: 3 + index * 0.5,
          repeat: -1,
          yoyo: true,
          ease: 'power2.inOut',
          delay: index * 0.2,
        });

        ScrollTrigger.create({
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
          animation: gsap.to(element, {
            yPercent: -40 - index * 10,
            opacity: 0.5,
            ease: 'none',
          }),
        });
      });

    }, heroRef);

    return () => {
      if (ctx) ctx.revert();
    };
  }, []);

  useEffect(() => {
    const cleanup = setupAnimations();
    return cleanup;
  }, [setupAnimations]);

  return (
    <section
      ref={heroRef}
      className="relative h-screen overflow-hidden"
      style={{ willChange: 'transform' }}
    >
      {/* Background Layer */}
      <div
        ref={backgroundRef}
        className="absolute inset-0 bg-gradient-to-br from-light-bluish-gray via-very-light-gray to-slightly-darker-gray"
        style={{ willChange: 'transform', transform: 'translate3d(0,0,0)' }}
      />

      {/* Hero Image Layer */}
      <div
        ref={imageRef}
        className="absolute inset-0 flex items-center justify-center"
        style={{ willChange: 'transform', transform: 'translate3d(0,0,0)' }}
      >
        <div className="relative w-full h-full bg-gradient-to-r from-accent/10 to-primary/5">
          {/* Floating Elements */}
          <div className="floating-element absolute top-1/4 left-1/4 w-32 h-32 bg-accent/20 rounded-full blur-xl" />
          <div className="floating-element absolute top-1/3 right-1/3 w-24 h-24 bg-primary/10 rounded-full blur-lg" />
          <div className="floating-element absolute bottom-1/3 left-1/2 w-40 h-40 bg-accent/15 rounded-full blur-2xl" />
          <div className="floating-element absolute top-1/2 right-1/4 w-28 h-28 bg-primary/15 rounded-full blur-xl" />
          
          {/* Main Hero Visual */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-96 h-96 bg-gradient-to-br from-accent/30 to-primary/20 rounded-full blur-3xl opacity-60" />
          </div>
        </div>
      </div>

      {/* Text Content Layer */}
      <div
        ref={textRef}
        className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6"
        style={{ willChange: 'transform', transform: 'translate3d(0,0,0)' }}
      >
        <h1
          ref={titleRef}
          className="text-6xl md:text-8xl font-light text-primary mb-6 leading-tight"
        >
          Illuminate Your Space
        </h1>
        
        <p
          ref={subtitleRef}
          className="text-xl md:text-2xl text-text-secondary mb-12 max-w-2xl leading-relaxed"
        >
          Discover our curated collection of premium lighting solutions that transform any environment into something extraordinary
        </p>
        
        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-6">
          <button className="px-8 py-4 bg-primary text-white rounded-full hover:bg-primary/90 transition-all duration-300 transform hover:scale-105">
            Explore Collection
          </button>
          <button className="px-8 py-4 border-2 border-primary text-primary rounded-full hover:bg-primary hover:text-white transition-all duration-300">
            Learn More
          </button>
        </div>
      </div>

      {/* Overlay Layer */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black/0 pointer-events-none"
        style={{ willChange: 'transform' }}
      />

      {/* Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="scroll-indicator absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-text-secondary"
      >
        <span className="text-sm mb-2">Scroll</span>
        <div className="w-px h-8 bg-text-secondary/50" />
      </div>
    </section>
  );
};

export default Hero;