'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Intro.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function Intro() {
  const background = useRef(null);
  const introImage = useRef(null);
  const homeHeader = useRef(null);
  const heroTitle = useRef(null);
  const heroSubtitle = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Check if all refs are available before proceeding
      if (!background.current || !introImage.current || !homeHeader.current || !heroTitle.current || !heroSubtitle.current) {
        return;
      }

      // Set initial states for all elements
      gsap.set(background.current, {
        clipPath: "inset(30%)",
        scale: 1.1
      });
      
      gsap.set(introImage.current, {
        scale: 1.2,
        opacity: 0.8
      });

      // Ensure text elements start in their normal position with full brightness
      gsap.set([heroTitle.current, heroSubtitle.current], {
        y: 0,
        opacity: 1
      });

      // Main scroll-triggered animation for background and image
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
      }, 0)
      .to(introImage.current, {
        scale: 1,
        opacity: 1,
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

      // Subtle parallax for image
      gsap.to(introImage.current, {
        yPercent: -8,
        ease: "none",
        scrollTrigger: {
          trigger: homeHeader.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
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
        <div className={styles.introImage} ref={introImage}>
          <Image
            src="/images/lamp-hero.jpg"
            alt="Elegant Lamp"
            fill
            style={{ objectFit: 'contain' }}
            priority
            unoptimized
          />
        </div>
        
        <h1 className={styles.heroTitle} ref={heroTitle}>
          Illuminate Your Space
        </h1>
        
        <p className={styles.heroSubtitle} ref={heroSubtitle}>
          Discover our curated collection of premium lighting solutions
        </p>
      </div>
    </div>
  );
}