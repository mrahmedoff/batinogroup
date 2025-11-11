'use client';

import { useEffect } from 'react';
import { debugFirebase } from '@/lib/firebaseDebug';

export default function FirebaseDebugClient() {
  useEffect(() => {
    // This will only run on the client side
    debugFirebase();
  }, []);

  return null; // This component doesn't render anything
}