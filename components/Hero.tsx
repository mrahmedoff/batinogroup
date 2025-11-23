'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useData } from '@/contexts/DataContext';
import { settings } from 'firebase/analytics';

export default function Hero() {
  const { t } = useLanguage();
  const { heroSlides, isLoading, refreshHeroSlides } = useData();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Firebase'den gelen aktif slide'ları kullan, yoksa default slide'ları kullan
  const activeSlides = heroSlides.filter(slide => slide.active);
  
  const defaultSlides = [
    {
      id: 'default-1',
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=80',
      title: t.heroSlide1Title,
      description: t.heroSlide1Desc,
      buttonText: t.learnMore,
      buttonLink: '/about',
      order: 1,
      active: true
    },
    {
      id: 'default-2',
      image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1920&q=80',
      title: t.heroSlide2Title,
      description: t.heroSlide2Desc,
      buttonText: t.learnMore,
      buttonLink: '/about',
      order: 2,
      active: true
    },
    {
      id: 'default-3',
      image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1920&q=80',
      title: t.heroSlide3Title,
      description: t.heroSlide3Desc,
      buttonText: t.learnMore,
      buttonLink: '/about',
      order: 3,
      active: true
    }
  ];

  const slides = activeSlides.length > 0 ? activeSlides : defaultSlides;

  // Reset currentSlide if it's out of bounds
  useEffect(() => {
    if (currentSlide >= slides.length) {
      setCurrentSlide(0);
    }
  }, [slides.length, currentSlide]);

  useEffect(() => {
    if (slides.length === 0) return; // Don't start timer if no slides
    
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  // Periodic refresh for hero slides (every 30 seconds)
  useEffect(() => {
    const refreshTimer = setInterval(() => {
      refreshHeroSlides();
    }, 30000); // 30 saniyədə bir yenilə
    
    return () => clearInterval(refreshTimer);
  }, [refreshHeroSlides]);

  // Listen for hero slides updates from other tabs/windows
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'heroSlidesUpdated') {
        refreshHeroSlides();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [refreshHeroSlides]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };
  
  // Show loading state while data is being fetched
  if (isLoading) {
    return (
      <section className="relative h-[700px] flex items-center overflow-hidden bg-gray-900">
        <div className="absolute inset-0 bg-black/30 z-10" />
        
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white w-full">
          <div className="max-w-3xl">
            <div className="animate-pulse">
              <div className="h-16 bg-white/20 rounded mb-6"></div>
              <div className="h-6 bg-white/20 rounded mb-4"></div>
              <div className="h-6 bg-white/20 rounded w-3/4 mb-8"></div>
              <div className="flex gap-4">
                <div className="h-12 w-32 bg-white/20 rounded"></div>
                <div className="h-12 w-32 bg-white/20 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* Main Hero Section with Slider */}
      <section className="relative h-[700px] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-black/30 z-10" />
        
        {/* Slider Images */}
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              backgroundImage: `url(${slide.image})`
            }}
          />
        ))}
        
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white w-full">
          <div className="max-w-3xl">
            {slides.length > 0 && slides[currentSlide] && (
              <>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 animate-fade-in drop-shadow-lg">
                  {slides[currentSlide].title}
                </h1>
                <p className="text-xl text-white/90 mb-8 leading-relaxed drop-shadow-md">
                  {slides[currentSlide].description}
                </p>
                <div className="flex flex-wrap gap-4">
                  {slides[currentSlide].buttonText && slides[currentSlide].buttonLink && (
                    <Link 
                      href={slides[currentSlide].buttonLink || '/about'}
                      className="px-8 py-4 bg-white text-blue-900 font-semibold rounded-lg hover:bg-blue-50 transition-all inline-flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    >
                      {slides[currentSlide].buttonText || t.learnMore}
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  )}
                  <Link 
                    href="/contact"
                    className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-900 transition-all inline-flex items-center gap-2"
                  >
                    {t.contactUs}
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Slider Controls */}
        {slides.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
              aria-label="Next slide"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>

            {/* Slider Indicators */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentSlide 
                      ? 'bg-white w-8' 
                      : 'bg-white/50 hover:bg-white/75'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </section>


    </>
  );
}
