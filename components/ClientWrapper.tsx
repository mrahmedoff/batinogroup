'use client';

import { useState, useEffect } from 'react';
import BatinoLoader from './BatinoLoader';

interface ClientWrapperProps {
  children: React.ReactNode;
}

export default function ClientWrapper({ children }: ClientWrapperProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log('ClientWrapper mounted, starting 5 second timer...');
    
    // Show loader for 5 seconds
    const timer = setTimeout(() => {
      console.log('Timer completed, hiding loader...');
      setIsLoading(false);
    }, 5000);

    return () => {
      console.log('Cleaning up timer...');
      clearTimeout(timer);
    };
  }, []);

  console.log('ClientWrapper render - isLoading:', isLoading);

  if (isLoading) {
    return <BatinoLoader />;
  }

  return <>{children}</>;
}