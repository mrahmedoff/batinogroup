'use client';

import { useEffect, useState } from 'react';

export default function BatinoLoader() {
  const [isLoading, setIsLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Block body scroll while loading
    document.body.style.overflow = 'hidden';
    
    // Start fade out after 3.5 seconds
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 3500);

    // Hide completely after 4 seconds
    const hideTimer = setTimeout(() => {
      setIsLoading(false);
      // Restore body scroll
      document.body.style.overflow = 'unset';
    }, 4000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
      // Restore body scroll on cleanup
      document.body.style.overflow = 'unset';
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div className={`fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 transition-opacity duration-500 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-ping opacity-75"></div>
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-white rounded-full animate-pulse opacity-50"></div>
        <div className="absolute top-1/2 left-1/6 w-1.5 h-1.5 bg-blue-300 rounded-full animate-bounce opacity-60"></div>
        <div className="absolute bottom-1/4 right-1/3 w-1 h-1 bg-blue-200 rounded-full animate-ping opacity-40"></div>
      </div>

      <div className="text-center relative z-10">
        {/* Main Logo Container */}
        <div className="mb-8 relative">
          {/* Outer Ring */}
          <div className="w-32 h-32 mx-auto relative">
            <div className="absolute inset-0 border-4 border-blue-400 rounded-full animate-spin opacity-30"></div>
            <div className="absolute inset-2 border-2 border-blue-300 rounded-full animate-spin opacity-50" style={{ animationDirection: 'reverse', animationDuration: '3s' }}></div>
            
            {/* Inner Logo */}
            <div className="absolute inset-4 bg-white rounded-full flex items-center justify-center shadow-2xl transform hover:scale-105 transition-transform duration-300 p-2">
              <img
                src="/assets/batinologo.png"
                alt="Batino Group Logo"
                width={60}
                height={60}
                className="object-contain animate-pulse"
              />
            </div>
          </div>
        </div>
        
        {/* Company Name with Glow Effect */}
        <h1 className="text-5xl font-bold text-white mb-2 animate-pulse">
          <span className="bg-gradient-to-r from-blue-400 via-white to-blue-400 bg-clip-text text-transparent">
            Batino Group
          </span>
        </h1>
        
        {/* Subtitle */}
        <p className="text-blue-200 mb-8 text-lg font-medium opacity-90">
          Equipment Solutions & Engineering
        </p>
        
        {/* Enhanced Loading Animation */}
        <div className="flex justify-center items-center space-x-3 mb-6">
          <div className="w-4 h-4 bg-blue-400 rounded-full animate-bounce shadow-lg"></div>
          <div className="w-4 h-4 bg-blue-300 rounded-full animate-bounce shadow-lg" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-4 h-4 bg-blue-200 rounded-full animate-bounce shadow-lg" style={{ animationDelay: '0.2s' }}></div>
        </div>

        {/* Progress Bar */}
        <div className="w-64 mx-auto bg-slate-700 rounded-full h-2 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full animate-pulse shadow-lg transform origin-left animate-[loading_3.5s_ease-in-out_forwards]"></div>
        </div>
        
        {/* Loading Text */}
        <p className="text-blue-300 mt-4 text-sm font-medium animate-pulse">
          Loading...
        </p>
      </div>

      <style jsx>{`
        @keyframes loading {
          0% { 
            width: 0%; 
            opacity: 0.5;
          }
          50% { 
            opacity: 1;
          }
          100% { 
            width: 100%; 
            opacity: 0.8;
          }
        }
      `}</style>
    </div>
  );
}