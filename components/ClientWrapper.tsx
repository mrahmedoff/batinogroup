'use client';

import { useState, useEffect } from 'react';
import BatinoLoader from './BatinoLoader';

interface ClientWrapperProps {
  children: React.ReactNode;
}

export default function ClientWrapper({ children }: ClientWrapperProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Show loader for 5 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <BatinoLoader />;
  }

  return <>{children}</>;
}