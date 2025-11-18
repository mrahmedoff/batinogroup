/**
 * Firebase Debug Utilities
 * Production'da Firebase yapılandırmasını debug etmek için
 */

export const debugFirebaseConfig = () => {
  if (typeof window === 'undefined') return;
  
  const config = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  };

  console.group('🔍 Firebase Configuration Debug');
  console.log('Environment:', process.env.NODE_ENV);
  console.log('User Agent:', navigator.userAgent);
  console.log('URL:', window.location.href);
  
  console.group('📋 Environment Variables');
  Object.entries(config).forEach(([key, value]) => {
    const status = value ? '✅' : '❌';
    const displayValue = value ? 
      (value.length > 30 ? value.substring(0, 30) + '...' : value) : 
      'MISSING';
    console.log(`${status} ${key}:`, displayValue);
  });
  console.groupEnd();

  const isConfigured = Object.values(config).every(value => !!value);
  console.log(`🎯 Configuration Status: ${isConfigured ? '✅ CONFIGURED' : '❌ NOT CONFIGURED'}`);
  
  if (!isConfigured) {
    console.group('🔧 Troubleshooting');
    console.log('1. Check deployment platform environment variables');
    console.log('2. Ensure all NEXT_PUBLIC_FIREBASE_* variables are set');
    console.log('3. Redeploy after setting environment variables');
    console.log('4. Check build logs for errors');
    console.groupEnd();
  }
  
  console.groupEnd();
  
  return isConfigured;
};

// Auto-run on client side
if (typeof window !== 'undefined') {
  // Run after a short delay to ensure all modules are loaded
  setTimeout(debugFirebaseConfig, 1000);
}