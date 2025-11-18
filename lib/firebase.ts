import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || '',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || '',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || '',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '',
};

// Check if Firebase is configured
const isFirebaseConfigured = firebaseConfig.apiKey && firebaseConfig.projectId;

// Log configuration status (only in development)
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  console.log('Firebase Configuration Status:', {
    configured: isFirebaseConfigured,
    projectId: firebaseConfig.projectId,
    hasApiKey: !!firebaseConfig.apiKey
  });
}

// Initialize Firebase - allow build to continue even without config
let app: any;
let db: any;
let storage: any;
let auth: any;

try {
  if (isFirebaseConfigured) {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
    db = getFirestore(app);
    storage = getStorage(app);
    auth = getAuth(app);
  } else {
    // Create mock instances for build time
    if (process.env.NODE_ENV === 'development') {
      console.warn('Firebase not configured. Using mock instances.');
    }
    app = null;
    db = null;
    storage = null;
    auth = null;
  }
} catch (error) {
  console.error('Firebase initialization error:', error);
  app = null;
  db = null;
  storage = null;
  auth = null;
}

export { db, storage, auth, isFirebaseConfigured };
