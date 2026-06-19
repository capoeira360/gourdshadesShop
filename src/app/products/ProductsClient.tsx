'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { products } from './data';
import PriceDisplay from '@/components/PriceDisplay';

export default function ProductsClient() {
  const searchParams = useSearchParams();
  const MOBILE_BREAKPOINT = 768;
  const initialView = searchParams.get('view') === 'grid' ? 'grid' : 'list';
  const initialSlide = Number.parseInt(searchParams.get('slide') ?? '0', 10);
  const [currentIndex, setCurrentIndex] = useState(() => (
    Number.isNaN(initialSlide) ? 0 : Math.max(0, Math.min(initialSlide, products.length - 1))
  ));
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>(initialView);
  const [isPhone, setIsPhone] = useState(false);
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
  const effectiveViewMode = isPhone ? 'grid' : viewMode;

  const getShortDescription = (description: string) => {
    if (description.length <= 190) {
      return description;
    }

    const trimmed = description.slice(0, 187);
    const lastSpace = trimmed.lastIndexOf(' ');
    return `${trimmed.slice(0, lastSpace > 0 ? lastSpace : trimmed.length)}...`;
  };

  const getProductImageAlt = (name: string) => `${name} handmade calabash lamp by Gourd Shades`;

  const getProductHref = (productId: string, sourceIndex?: number) => {
    const params = new URLSearchParams();
    params.set('fromView', viewMode);

    if (viewMode === 'list') {
      params.set('fromSlide', String(sourceIndex ?? currentIndex));
    }

    return `/products/${productId}?${params.toString()}`;
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
    if (isPaused || effectiveViewMode !== 'list') return;

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
  }, [currentIndex, isPaused, goNext, effectiveViewMode]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const mediaQuery = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const updateViewportState = (event?: MediaQueryListEvent) => {
      const matches = event ? event.matches : mediaQuery.matches;
      setIsPhone(matches);
    };

    updateViewportState();
    mediaQuery.addEventListener('change', updateViewportState);

    return () => {
      mediaQuery.removeEventListener('change', updateViewportState);
    };
  }, []);

  useEffect(() => {
    if (isPhone && viewMode === 'list') {
      setViewMode('grid');
    }
  }, [isPhone, viewMode]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const params = new URLSearchParams(window.location.search);
    params.set('view', effectiveViewMode);

    if (effectiveViewMode === 'list') {
      params.set('slide', String(currentIndex));
    } else {
      params.delete('slide');
    }

    const nextQuery = params.toString();
    const nextUrl = nextQuery ? `${window.location.pathname}?${nextQuery}` : window.location.pathname;
    const currentUrl = `${window.location.pathname}${window.location.search}`;

    if (nextUrl !== currentUrl) {
      window.history.replaceState(window.history.state, '', nextUrl);
    }
  }, [currentIndex, effectiveViewMode]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (effectiveViewMode !== 'list') {
      return;
    }

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
      onMouseEnter={() => effectiveViewMode === 'list' && setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <section className="mx-auto max-w-4xl px-4 pb-8 text-center text-primary">
        <h1
          className="text-3xl sm:text-4xl font-light"
          style={{ fontFamily: 'var(--font-libre-baskerville), Arial, Helvetica, sans-serif' }}
        >
          Handmade Calabash Lamps Collection
        </h1>
        <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-[#4f342e]/80 sm:text-base">
          Explore handcrafted gourd lamps by Gourd Shades, including wildlife-inspired, abstract,
          and new design pieces created to bring warm sculptural light into homes, hotels, and
          statement interiors.
        </p>
        <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-[#4f342e]/75">
          Learn more <Link href="/about" className="underline underline-offset-4 hover:text-[#8f735f]">about the maker</Link>,
          see our <Link href="/services" className="underline underline-offset-4 hover:text-[#8f735f]">community work</Link>,
          or <Link href="/contact" className="underline underline-offset-4 hover:text-[#8f735f]">contact us</Link> for pricing,
          custom ideas, and product enquiries.
        </p>
      </section>

      {/* Background accent wash */}
      <div
        className="carousel-bg-wash"
        style={{
          background: `radial-gradient(ellipse at 70% 50%, ${currentSlide.accent}18 0%, transparent 70%)`,
        }}
      />

      <div className="carousel-shell">
        <div className="carousel-toolbar">
          {!isPhone && (
            <div className="carousel-view-toggle" aria-label="Choose products view">
              <button
                type="button"
                className={`carousel-view-button ${effectiveViewMode === 'list' ? 'active' : ''}`}
                onClick={() => setViewMode('list')}
              >
                List
              </button>
              <button
                type="button"
                className={`carousel-view-button ${effectiveViewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
              >
                Grid
              </button>
            </div>
          )}
        </div>

        {effectiveViewMode === 'list' ? (
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
                    <Link href={getProductHref(products[currentIndex].id)} className="carousel-view-link">
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
                  href={getProductHref(products[currentIndex].id)}
                  className={`carousel-image-frame products-grid-card carousel-list-card ${isTransitioning ? 'transitioning' : 'visible'}`}
                >
                  <div className="products-grid-media carousel-list-card-media">
                    <Image
                      src={currentSlide.imageUrl}
                      alt={getProductImageAlt(currentSlide.title)}
                      fill
                      className="products-grid-image object-cover"
                      sizes="(max-width: 1024px) 100vw, 380px"
                    />
                    <div className="products-grid-overlay" />
                    <span className="products-grid-cta">View lamp</span>
                  </div>
                  <div className="products-grid-body carousel-list-card-body">
                    <p className="products-grid-name carousel-list-card-name">{currentSlide.title}</p>
                    <p className="products-grid-price carousel-list-card-price">{currentSlide.price}</p>
                  </div>
                </Link>
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
              {products.map((product, index) => (
                <Link key={product.id} href={getProductHref(product.id, index)} className="products-grid-card">
                  <div className="products-grid-media">
                    <Image
                      src={product.images[0]}
                      alt={getProductImageAlt(product.name)}
                      fill
                      className="products-grid-image object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    />
                    <div className="products-grid-overlay" />
                    <span className="products-grid-cta">View lamp</span>
                  </div>
                  <div className="products-grid-body">
                    <p className="products-grid-name">{product.name}</p>
                    <p className="products-grid-description">{getShortDescription(product.description)}</p>
                    <PriceDisplay price={product.price} className="products-grid-price inline-flex text-lg mt-4" />
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
