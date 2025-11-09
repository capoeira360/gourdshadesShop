'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Intro.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function Intro() {
  const background = useRef(null);
  const homeHeader = useRef(null);
  const heroTitle = useRef(null);
  const heroSubtitle = useRef(null);

  useEffect(() => {
    // Keep subtitle width aligned to header width on small devices only
    const updateSubtitleWidth = () => {
      if (!heroTitle.current || !heroSubtitle.current || typeof window === 'undefined') return;
      const isSmall = window.matchMedia('(max-width: 768px)').matches;
      if (isSmall) {
        const titleWidth = heroTitle.current.offsetWidth;
        heroSubtitle.current.style.width = `${titleWidth}px`;
      } else {
        heroSubtitle.current.style.width = '';
      }
    };

    // Initial alignment after fonts load and layout settle
    const raf = requestAnimationFrame(updateSubtitleWidth);
    window.addEventListener('resize', updateSubtitleWidth);
    window.addEventListener('orientationchange', updateSubtitleWidth);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', updateSubtitleWidth);
      window.removeEventListener('orientationchange', updateSubtitleWidth);
    };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Check if all refs are available before proceeding
      if (!background.current || !homeHeader.current || !heroTitle.current || !heroSubtitle.current) {
        return;
      }

      // Set initial states for all elements
      gsap.set(background.current, {
        clipPath: "inset(30%)",
        scale: 1.1
      });

      // Ensure text elements start in their normal position with full brightness
      gsap.set([heroTitle.current, heroSubtitle.current], {
        y: 0,
        opacity: 1
      });

      // Main scroll-triggered animation for background
      gsap.timeline({
        scrollTrigger: {
          trigger: homeHeader.current,
          start: "top 80%",
          end: "bottom 20%",
          scrub: 1.5,
          ease: "power2.inOut"
        }
      })
      .to(background.current, {
        clipPath: "inset(0%)",
        scale: 1,
        ease: "none"
      }, 0);

      // Text exit animation with proper range for bidirectional behavior
      ScrollTrigger.create({
        trigger: homeHeader.current,
        start: "top 30%",
        end: "top -50%",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          
          // Check if refs are still available before animating
          if (heroTitle.current && heroSubtitle.current) {
            // Animate both texts together with smooth bidirectional movement
            gsap.set([heroTitle.current, heroSubtitle.current], {
              y: progress * -400,
              opacity: 1 - progress
            });
            // Re-align subtitle width on small devices as text scales
            if (typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches) {
              const titleWidth = heroTitle.current.offsetWidth;
              heroSubtitle.current.style.width = `${titleWidth}px`;
            }
          }
        }
      });

      // Parallax effect for background
      gsap.to(background.current, {
        yPercent: -15,
        ease: "none",
        scrollTrigger: {
          trigger: homeHeader.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 2
        }
      });
    });

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className={styles.homeHeader} ref={homeHeader}>
      <div className={styles.backgroundImage} ref={background}>
        <Image
          src="/images/background.jpg"
          alt="Background"
          fill
          style={{ objectFit: 'cover' }}
          priority
          unoptimized
        />
      </div>
      
      <div className={styles.intro}>
        <div className={styles.textContent}>
          <h1 className={styles.heroTitle} ref={heroTitle}>
            <span className={styles.handText}>Gourd</span> <span className={styles.underlinedText}>Shades</span>
          </h1>
          
          <p className={styles.heroSubtitle} ref={heroSubtitle}>
            We use dried shells of Calabash to create stunning lampshades by drilling perforated patterns on them to let the light escape. This allows the lampshade to display exceptionally beautiful patterns and shades of light to its surrounding.
          </p>
        </div>
        
        <div className={styles.imageContent}>
          <div className={styles.imageFrame}>
            <Image
              src="/images/IMG-20250516-WA0016-hero-replace.jpg"
              alt="Hero Lamp"
              fill
              style={{ objectFit: 'contain', objectPosition: 'center center' }}
              priority
              unoptimized
            />
          </div>
        </div>
      </div>
    </div>
  );
}