'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { products } from './data';

export default function ProductsClient() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const SLIDE_DURATION = 6000;
  const TRANSITION_DURATION = 800;

  const slides = products.map(product => ({
    title: product.name,
    price: product.price,
    description: product.longDescription,
    accent: '#C4956A',
    imageUrl: product.images[0],
    id: product.id
  }));

  const getShortDescription = (description: string) => {
    if (description.length <= 190) {
      return description;
    }

    const trimmed = description.slice(0, 187);
    const lastSpace = trimmed.lastIndexOf(' ');
    return `${trimmed.slice(0, lastSpace > 0 ? lastSpace : trimmed.length)}...`;
  };

  const goToSlide = useCallback(
    (index: number, dir?: 'next' | 'prev') => {
      if (isTransitioning || index === currentIndex) return;
      setIsTransitioning(true);
      setProgress(0);

      setTimeout(() => {
        setCurrentIndex(index);
        setTimeout(() => {
          setIsTransitioning(false);
        }, 50);
      }, TRANSITION_DURATION / 2);
    },
    [isTransitioning, currentIndex]
  );

  const goNext = useCallback(() => {
    const nextIndex = (currentIndex + 1) % slides.length;
    goToSlide(nextIndex, 'next');
  }, [currentIndex, goToSlide]);

  const goPrev = useCallback(() => {
    const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
    goToSlide(prevIndex, 'prev');
  }, [currentIndex, goToSlide]);

  useEffect(() => {
    if (isPaused || viewMode !== 'list') return;

    progressRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + 100 / (SLIDE_DURATION / 50);
      });
    }, 50);

    intervalRef.current = setInterval(() => {
      goNext();
    }, SLIDE_DURATION);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, [currentIndex, isPaused, goNext, viewMode]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 60) {
      if (diff > 0) goNext();
      else goPrev();
    }
  };

  const currentSlide = slides[currentIndex];

  return (
    <div
      className="carousel-wrapper"
      onMouseEnter={() => viewMode === 'list' && setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background accent wash */}
      <div
        className="carousel-bg-wash"
        style={{
          background: `radial-gradient(ellipse at 70% 50%, ${currentSlide.accent}18 0%, transparent 70%)`,
        }}
      />

      <div className="carousel-shell">
        <div className="carousel-toolbar">
          <div className="carousel-view-toggle" aria-label="Choose products view">
            <button
              type="button"
              className={`carousel-view-button ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
            >
              List
            </button>
            <button
              type="button"
              className={`carousel-view-button ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
            >
              Grid
            </button>
          </div>
        </div>

        {viewMode === 'list' ? (
          <>
            <div className="carousel-inner">
              <div className="carousel-content">
                <div className="carousel-content-inner">
                  <div
                    className={`carousel-collection-num ${isTransitioning ? 'transitioning' : 'visible'}`}
                  >
                    <span className="carousel-num-line" />
                    <span className="carousel-kicker">Handcrafted collection</span>
                  </div>

                  <p className="carousel-meta">
                    {String(currentIndex + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
                  </p>

                  <h2
                    className={`carousel-title ${isTransitioning ? 'transitioning' : 'visible'}`}
                  >
                    {currentSlide.title}
                  </h2>

                  <p
                    className={`carousel-description ${isTransitioning ? 'transitioning' : 'visible'}`}
                  >
                    {getShortDescription(currentSlide.description)}
                  </p>

                  <div className={`carousel-nav-arrows ${isTransitioning ? 'transitioning' : 'visible'}`}>
                    <button
                      onClick={goPrev}
                      className="carousel-arrow-btn"
                      aria-label="Previous slide"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M19 12H5M12 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <Link href={`/products/${products[currentIndex].id}`} className="carousel-view-link">
                      View Product
                    </Link>
                    <button
                      onClick={goNext}
                      className="carousel-arrow-btn"
                      aria-label="Next slide"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              <div className="carousel-image-container">
                <Link
                  href={`/products/${products[currentIndex].id}`}
                  className={`carousel-image-frame ${isTransitioning ? 'transitioning' : 'visible'}`}
                >
                  <div className="carousel-card-shell">
                    <div className="carousel-card-media">
                      <Image
                        src={currentSlide.imageUrl}
                        alt={currentSlide.title}
                        fill
                        className="carousel-image object-cover"
                        sizes="(max-width: 1024px) 100vw, 380px"
                      />
                      <div
                        className="carousel-image-overlay"
                        style={{
                          background: 'linear-gradient(180deg, transparent 0%, rgba(17, 24, 39, 0.08) 100%)',
                        }}
                      />
                    </div>
                    <div className="carousel-card-body">
                      <p className="carousel-card-name">{currentSlide.title}</p>
                      <p className="carousel-card-price">{currentSlide.price}</p>
                    </div>
                  </div>
                </Link>

                <div className="carousel-frame-corner carousel-frame-corner--tl" style={{ borderColor: '#e6dccf' }} />
                <div className="carousel-frame-corner carousel-frame-corner--br" style={{ borderColor: '#e6dccf' }} />
              </div>
            </div>

            <div className="carousel-progress-bar">
              {slides.map((slide, index) => (
                <button
                  key={slide.id}
                  onClick={() => goToSlide(index)}
                  className={`carousel-progress-item ${index === currentIndex ? 'active' : ''}`}
                  aria-label={`Go to slide ${index + 1}`}
                >
                  <div className="carousel-progress-track">
                    <div
                      className="carousel-progress-fill"
                      style={{
                        width: index === currentIndex ? `${progress}%` : index < currentIndex ? '100%' : '0%',
                        backgroundColor: index === currentIndex ? currentSlide.accent : undefined,
                      }}
                    />
                  </div>
                </button>
              ))}
            </div>
          </>
        ) : (
          <div className="products-grid-panel">
            <div className="products-grid">
              {products.map((product) => (
                <Link key={product.id} href={`/products/${product.id}`} className="products-grid-card">
                  <div className="products-grid-media">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    />
                  </div>
                  <div className="products-grid-body">
                    <p className="products-grid-name">{product.name}</p>
                    <p className="products-grid-price">{product.price}</p>
                    <p className="products-grid-description">{getShortDescription(product.description)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
