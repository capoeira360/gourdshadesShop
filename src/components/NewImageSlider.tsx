'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

interface SliderItem {
  id: number;
  image: string;
  author: string;
  title: string;
  topic: string;
  description: string;
  buttons: {
    primary: string;
    secondary: string;
  };
  thumbnail: {
    title: string;
    description: string;
  };
}

const NewImageSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const autoNextRef = useRef<NodeJS.Timeout | null>(null);

  const timeRunning = 3000;
  const timeAutoNext = 7000;

  const sliderItems: SliderItem[] = [
    {
      id: 1,
      image: '/images/20240520_161231-featured-1.jpg',
      author: 'LAMPCO',
      title: 'PREMIUM LIGHTING',
      topic: 'COLLECTION',
      description: 'Discover our exquisite collection of handcrafted lighting fixtures that blend traditional craftsmanship with modern innovation. Each piece is meticulously designed to transform your space into a sanctuary of elegance and warmth.',
      buttons: {
        primary: 'EXPLORE NOW',
        secondary: 'VIEW CATALOG'
      },
      thumbnail: {
        title: 'Premium Collection',
        description: 'Luxury Lighting'
      }
    },
    {
      id: 2,
      image: '/images/20240612_135238-featured-2.jpg',
      author: 'LAMPCO',
      title: 'MODERN DESIGN',
      topic: 'INNOVATION',
      description: 'Experience the perfect fusion of contemporary aesthetics and cutting-edge technology. Our modern lighting solutions are designed to complement today\'s architectural trends while providing exceptional functionality.',
      buttons: {
        primary: 'DISCOVER MORE',
        secondary: 'GET QUOTE'
      },
      thumbnail: {
        title: 'Modern Design',
        description: 'Contemporary Style'
      }
    },
    {
      id: 3,
      image: '/images/20240614_140014-featured-3.jpg',
      author: 'LAMPCO',
      title: 'ARTISAN CRAFT',
      topic: 'HERITAGE',
      description: 'Celebrate the timeless art of traditional craftsmanship with our heritage collection. Each fixture tells a story of skilled artisans who have perfected their craft over generations, creating pieces that stand the test of time.',
      buttons: {
        primary: 'LEARN MORE',
        secondary: 'CONTACT US'
      },
      thumbnail: {
        title: 'Artisan Craft',
        description: 'Handmade Excellence'
      }
    },
    {
      id: 4,
      image: '/images/20240804_155809-featured-4.jpg',
      author: 'LAMPCO',
      title: 'SMART LIGHTING',
      topic: 'TECHNOLOGY',
      description: 'Step into the future with our intelligent lighting systems that adapt to your lifestyle. Control ambiance, energy efficiency, and mood with intuitive smart features that make your home truly responsive to your needs.',
      buttons: {
        primary: 'EXPLORE TECH',
        secondary: 'SMART DEMO'
      },
      thumbnail: {
        title: 'Smart Lighting',
        description: 'Future Technology'
      }
    }
  ];

  const showSlider = (type: 'next' | 'prev') => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    
    if (type === 'next') {
      setCurrentIndex((prev) => (prev + 1) % sliderItems.length);
      carouselRef.current?.classList.add('next');
    } else {
      setCurrentIndex((prev) => (prev === 0 ? sliderItems.length - 1 : prev - 1));
      carouselRef.current?.classList.add('prev');
    }

    // Clear existing timeouts
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (autoNextRef.current) clearTimeout(autoNextRef.current);

    // Remove animation classes after animation completes
    timeoutRef.current = setTimeout(() => {
      carouselRef.current?.classList.remove('next', 'prev');
      setIsAnimating(false);
    }, timeRunning);

    // Set next auto-advance
    autoNextRef.current = setTimeout(() => {
      showSlider('next');
    }, timeAutoNext);
  };

  const handleNext = () => showSlider('next');
  const handlePrev = () => showSlider('prev');

  // Auto-advance functionality
  useEffect(() => {
    autoNextRef.current = setTimeout(() => {
      showSlider('next');
    }, timeAutoNext);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (autoNextRef.current) clearTimeout(autoNextRef.current);
    };
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (autoNextRef.current) clearTimeout(autoNextRef.current);
    };
  }, []);

  return (
    <div className="carousel" ref={carouselRef}>
      {/* Main slider items */}
      <div className="list">
        {sliderItems.map((item, index) => (
          <div 
            key={item.id} 
            className={`item ${index === currentIndex ? 'active' : ''}`}
            style={{ 
              zIndex: index === currentIndex ? 1 : 0,
              opacity: index === currentIndex ? 1 : 0,
              backgroundImage: `url(${item.image})`
            }}
          >
            {/* Blurred background */}
            <div className="background-blur" style={{ backgroundImage: `url(${item.image})` }}></div>
            
            {/* Main image at original size */}
            <Image
              src={item.image}
              alt={item.title}
              width={0}
              height={0}
              sizes="100vw"
              className="slider-image"
              style={{ width: 'auto', height: '100vh', maxWidth: '100%' }}
              priority={index === 0}
            />
            <div className="content">
              <div className="title">{item.title}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Thumbnail navigation */}
      <div className="thumbnail">
        {sliderItems.map((item, index) => (
          <div 
            key={`thumb-${item.id}`} 
            className={`item ${index === currentIndex ? 'active' : ''}`}
          >
            <Image
              src={item.image}
              alt={item.thumbnail.title}
              width={150}
              height={220}
              className="thumbnail-image"
              style={{ objectFit: 'cover' }}
            />
            <div className="content">
              <div className="title">{item.thumbnail.title}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      <div className="arrows">
        <button id="prev" onClick={handlePrev} disabled={isAnimating}>
          &lt;
        </button>
        <button id="next" onClick={handleNext} disabled={isAnimating}>
          &gt;
        </button>
      </div>

      {/* Progress bar */}
      <div className="time"></div>

      <style jsx>{`
        .carousel {
          height: 100vh;
          width: 100vw;
          overflow: hidden;
          position: relative;
          font-family: 'Poppins', sans-serif;
        }

        .carousel .list .item {
          width: 100%;
          height: 100%;
          position: absolute;
          inset: 0 0 0 0;
          transition: opacity 0.5s ease-in-out;
        }

        .carousel .list .item :global(.slider-image) {
          width: auto;
          height: 100vh;
          max-width: 100%;
          object-fit: contain;
          object-position: center;
          margin: 0 auto;
          display: block;
          position: relative;
          z-index: 2;
        }

        .carousel .list .item .background-blur {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          filter: blur(20px);
          z-index: 1;
          transform: scale(1.1);
        }

        .carousel .list .item::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: inherit;
          background-size: cover;
          background-position: center;
          filter: blur(20px);
          z-index: -1;
          transform: scale(1.1);
        }

        .carousel .list .item {
          width: 100%;
          height: 100%;
          position: absolute;
          inset: 0 0 0 0;
          transition: opacity 0.5s ease-in-out;
          display: flex;
          align-items: center;
          justify-content: center;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }

        .carousel .list .item .content {
          position: absolute;
          top: 50%;
          right: 5%;
          transform: translateY(-50%);
          width: auto;
          max-width: 40%;
          padding: 40px 60px;
          background: linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 100%);
          backdrop-filter: blur(10px);
          border-radius: 20px;
          border: 1px solid rgba(255,255,255,0.1);
          box-sizing: border-box;
          color: #fff;
          text-shadow: 0 2px 8px rgba(0,0,0,0.5);
          z-index: 3;
          text-align: center;
        }

        .carousel .list .item .title {
          font-size: 2.8em;
          font-weight: 800;
          line-height: 1.1em;
          margin-bottom: 5px;
          background: linear-gradient(135deg, #fff 0%, #f1683a 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-shadow: 0 2px 8px rgba(241,104,58,0.3);
        }

        /* Thumbnail styles */
        .thumbnail {
          position: absolute;
          bottom: 112px;
          right: 5%;
          transform: none;
          width: auto;
          max-width: 40%;
          z-index: 100;
          display: flex;
          gap: 15px;
          flex-direction: row;
          padding: 20px;
          background: linear-gradient(135deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 100%);
          backdrop-filter: blur(15px);
          border-radius: 20px;
          border: 1px solid rgba(255,255,255,0.1);
          overflow-x: auto;
          overflow-y: hidden;
        }

        .thumbnail .item {
          width: 120px;
          height: 160px;
          flex-shrink: 0;
          position: relative;
          cursor: pointer;
          transition: all 0.4s ease;
          border-radius: 15px;
          overflow: hidden;
          border: 2px solid transparent;
        }

        .thumbnail .item.active {
          border-color: #f1683a;
          transform: scale(1.05);
          box-shadow: 0 8px 25px rgba(241,104,58,0.4);
        }

        .thumbnail .item:hover:not(.active) {
          transform: scale(1.02);
          border-color: rgba(255,255,255,0.3);
        }

        .thumbnail .item :global(.thumbnail-image) {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }

        .thumbnail .item:hover :global(.thumbnail-image) {
          transform: scale(1.1);
        }

        .thumbnail .item .content {
          color: #fff;
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 12px;
          background: linear-gradient(transparent, rgba(0,0,0,0.8));
        }

        .thumbnail .item .content .title {
          font-weight: 600;
          font-size: 12px;
          margin-bottom: 4px;
          text-shadow: 0 1px 3px rgba(0,0,0,0.7);
        }

        /* Arrow styles */
        .arrows {
          position: absolute;
          bottom: 40px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 300;
          width: 85%;
          max-width: 1000px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          pointer-events: none;
        }

        .arrows button {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%);
          border: 2px solid rgba(255,255,255,0.2);
          color: #fff;
          font-family: monospace;
          font-weight: bold;
          font-size: 18px;
          cursor: pointer;
          z-index: 100;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          backdrop-filter: blur(20px);
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: auto;
          box-shadow: 0 8px 32px rgba(0,0,0,0.3);
        }

        .arrows button:hover:not(:disabled) {
          background: linear-gradient(135deg, rgba(241,104,58,0.8) 0%, rgba(241,104,58,0.6) 100%);
          border-color: #f1683a;
          transform: scale(1.1);
          box-shadow: 0 12px 40px rgba(241,104,58,0.4);
        }

        .arrows button:active {
          transform: scale(0.95);
        }

        .arrows button#prev {
          margin-right: auto;
        }

        .arrows button#next {
          margin-left: auto;
        }

        .arrows button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        /* Animation classes */
        .carousel .list .item.active {
          z-index: 1;
        }

        .carousel .list .item.active .content .title {
          transform: translateY(50px);
          filter: blur(20px);
          opacity: 0;
          animation: showContent 0.5s 1s linear 1 forwards;
        }

        @keyframes showContent {
          to {
            transform: translateY(0px);
            filter: blur(0px);
            opacity: 1;
          }
        }

        .carousel .list .item.active .content .title {
          animation-delay: 1.2s !important;
        }

        /* Progress bar */
        .carousel .time {
          position: absolute;
          z-index: 1000;
          width: 0%;
          height: 3px;
          background-color: #f1683a;
          left: 0;
          top: 0;
        }

        .carousel.next .time,
        .carousel.prev .time {
          animation: runningTime 3s linear 1 forwards;
        }

        @keyframes runningTime {
          from { width: 100% }
          to { width: 0 }
        }

        /* Responsive design */
        @media screen and (max-width: 1024px) {
          .carousel .list .item .content {
            padding: 30px;
            max-width: 90%;
          }

          .carousel .list .item .content .title {
            font-size: 3.5rem;
          }

          .thumbnail {
            max-width: 85%;
            bottom: 30px;
            padding: 15px;
            right: 5%;
          }

          .thumbnail .item {
            width: 100px;
            height: 140px;
          }

          .arrows {
            width: 90%;
            bottom: 30px;
          }

          .arrows button {
            width: 50px;
            height: 50px;
            font-size: 16px;
          }
        }

        @media screen and (max-width: 768px) {
          .carousel .list .item .content {
            padding: 20px;
            max-width: 85%;
            right: 5%;
            text-align: center;
          }

          .carousel .list .item .content .title {
            font-size: 2.2rem;
            line-height: 1.2;
          }

          .thumbnail {
            bottom: 80px;
            max-width: 90%;
            padding: 10px 15px;
            gap: 10px;
            right: 5%;
          }

          .thumbnail .item {
            width: 80px;
            height: 100px;
            flex-shrink: 0;
          }

          .thumbnail .item .content {
            display: none;
          }

          .arrows {
            width: 95%;
            bottom: 20px;
          }

          .arrows button {
            width: 45px;
            height: 45px;
            font-size: 14px;
          }

          .progress-bar {
            height: 4px;
          }
        }

        @media screen and (max-width: 480px) {
          .carousel .list .item .content {
            padding: 15px;
            max-width: 90%;
            right: 5%;
          }

          .carousel .list .item .content .title {
            font-size: 1.8rem;
          }

          .carousel .list .item .content .description {
            font-size: 0.8rem;
            margin: 10px 0;
          }

          .thumbnail {
            bottom: 70px;
            padding: 8px 12px;
            gap: 8px;
            max-width: 95%;
            right: 2.5%;
          }

          .thumbnail .item {
            width: 70px;
            height: 90px;
          }

          .arrows button {
            width: 40px;
            height: 40px;
            font-size: 12px;
          }

          .arrows {
            width: 98%;
            bottom: 15px;
          }
        }
      `}</style>
    </div>
  );
};

export default NewImageSlider;