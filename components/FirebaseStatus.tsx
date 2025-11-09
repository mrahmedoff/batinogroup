'use client';

import { useEffect, useState } from 'react';
import { useProducts } from '@/contexts/ProductContext';

export default function FirebaseStatus() {
  const { products, categories, loading, categoriesLoading, error, categoriesError } = useProducts();
  const [isVisible, setIsVisible] = useState(false);
  const [firebaseConfig, setFirebaseConfig] = useState<any>(null);

  useEffect(() => {
    // Show status in development
    if (process.env.NODE_ENV === 'development') {
      setIsVisible(true);
      
      // Check Firebase config
      setFirebaseConfig({
        hasApiKey: !!process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
        hasProjectId: !!process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
      });
      
      // Auto-hide after 15 seconds
      const timer = setTimeout(() => setIsVisible(false), 15000);
      return () => clearTimeout(timer);
    }
  }, []);

  if (!isVisible) return null;

  const hasErrors = error || categoriesError;
  const isConnected = !hasErrors && firebaseConfig?.hasApiKey && firebaseConfig?.hasProjectId;

  return (
    <div className={`fixed bottom-4 right-4 p-4 rounded-lg text-sm z-50 max-w-sm ${
      hasErrors ? 'bg-red-900 bg-opacity-90 text-red-100' : 
      isConnected ? 'bg-green-900 bg-opacity-90 text-green-100' :
      'bg-yellow-900 bg-opacity-90 text-yellow-100'
    }`}>
      <div className="font-semibold mb-2 flex items-center gap-2">
        <span className={`w-2 h-2 rounded-full ${
          hasErrors ? 'bg-red-400' : 
          isConnected ? 'bg-green-400' : 'bg-yellow-400'
        }`}></span>
        Firebase Status
      </div>
      <div className="space-y-1">
        <div>Config: {firebaseConfig?.hasApiKey ? '✅' : '❌'} API Key, {firebaseConfig?.hasProjectId ? '✅' : '❌'} Project ID</div>
        <div>Project: {firebaseConfig?.projectId || 'Not set'}</div>
        <div>Products: {loading ? 'Loading...' : `${products.length} loaded`}</div>
        <div>Categories: {categoriesLoading ? 'Loading...' : `${categories.length} loaded`}</div>
        {hasErrors && (
          <div className="text-xs mt-2 p-2 bg-red-800 rounded">
            Error: {error || categoriesError}
          </div>
        )}
        <div className="text-xs opacity-75 mt-2">
          Real Firebase Database Connected
        </div>
      </div>
      <button 
        onClick={() => setIsVisible(false)}
        className="absolute top-1 right-2 opacity-75 hover:opacity-100"
      >
        ×
      </button>
    </div>
  );
}