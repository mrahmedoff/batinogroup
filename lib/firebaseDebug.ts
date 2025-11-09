// Firebase debug helper
import { db, isFirebaseConfigured } from './firebase';

export const debugFirebase = () => {
  console.log('=== Firebase Debug Info ===');
  console.log('Is configured:', isFirebaseConfigured);
  console.log('Database instance:', !!db);
  console.log('Environment variables:');
  console.log('- API Key:', process.env.NEXT_PUBLIC_FIREBASE_API_KEY ? 'Set' : 'Missing');
  console.log('- Project ID:', process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'Missing');
  console.log('- Auth Domain:', process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ? 'Set' : 'Missing');
  
  if (typeof window !== 'undefined') {
    // Store debug info in localStorage for easy access
    window.localStorage.setItem('firebase-debug', JSON.stringify({
      configured: isFirebaseConfigured,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      timestamp: new Date().toISOString()
    }));
  }
  
  return {
    isConfigured: isFirebaseConfigured,
    hasDb: !!db,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
  };
};

// Test Firebase connection
export const testFirebaseConnection = async () => {
  if (!isFirebaseConfigured || !db) {
    console.error('Firebase not configured');
    return false;
  }
  
  try {
    // Try to read from a collection (this will fail if Firestore rules are wrong)
    const { collection, getDocs } = await import('firebase/firestore');
    const testCollection = collection(db, 'categories');
    const snapshot = await getDocs(testCollection);
    
    console.log('Firebase connection test successful');
    console.log('Categories collection size:', snapshot.size);
    
    return true;
  } catch (error) {
    console.error('Firebase connection test failed:', error);
    return false;
  }
};

// Add sample data for testing
export const addSampleData = async () => {
  if (!isFirebaseConfigured || !db) {
    console.error('Firebase not configured');
    return false;
  }
  
  try {
    const { addCategory } = await import('./firebase/categories');
    const { addProduct } = await import('./firebase/products');
    
    console.log('Adding sample category...');
    const categoryId = await addCategory({
      name: 'TEST CATEGORY',
      type: 'main',
      description: 'Test category for debugging',
      status: 'active',
      order: 1,
      menuType: 'products'
    });
    
    console.log('Adding sample subcategory...');
    await addCategory({
      name: 'Test Subcategory',
      type: 'sub',
      parentId: categoryId,
      description: 'Test subcategory for debugging',
      status: 'active',
      order: 1,
      menuType: 'products'
    });
    
    console.log('Adding sample product...');
    await addProduct({
      name: 'Test Product',
      category: categoryId,
      subcategory: 'Test Subcategory',
      status: 'active'
    });
    
    console.log('Sample data added successfully!');
    return true;
    
  } catch (error) {
    console.error('Error adding sample data:', error);
    return false;
  }
};

// Make functions available globally for debugging
if (typeof window !== 'undefined') {
  (window as any).firebaseDebug = {
    debug: debugFirebase,
    test: testFirebaseConnection,
    addSample: addSampleData
  };
}