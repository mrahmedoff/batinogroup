import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  getDocs, 
  query, 
  orderBy, 
  where,
  onSnapshot,
  Timestamp 
} from 'firebase/firestore';
import { db } from '../firebase';

export interface Category {
  id: string;
  name: string;
  type: 'main' | 'sub';
  parentId?: string;
  description: string;
  status: 'active' | 'inactive';
  order: number;
  menuType: 'products' | 'about' | 'services' | 'projects' | 'media';
  createdAt: string;
  updatedAt: string;
}

const COLLECTION_NAME = 'categories';

// Kateqoriya əlavə et
export const addCategory = async (categoryData: Omit<Category, 'id' | 'createdAt' | 'updatedAt'>) => {
  if (!db) {
    throw new Error('Firebase not configured');
  }
  
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...categoryData,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding category:', error);
    throw error;
  }
};

// Kateqoriya yenilə
export const updateCategory = async (id: string, categoryData: Partial<Category>) => {
  if (!db) {
    throw new Error('Firebase not configured');
  }
  
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(docRef, {
      ...categoryData,
      updatedAt: Timestamp.now()
    });
  } catch (error) {
    console.error('Error updating category:', error);
    throw error;
  }
};

// Kateqoriya sil
export const deleteCategory = async (id: string) => {
  if (!db) {
    throw new Error('Firebase not configured');
  }
  
  try {
    await deleteDoc(doc(db, COLLECTION_NAME, id));
  } catch (error) {
    console.error('Error deleting category:', error);
    throw error;
  }
};

// Bütün kateqoriyaları al
export const getCategories = async (): Promise<Category[]> => {
  if (!db) {
    console.warn('Firebase not configured, returning empty array');
    return [];
  }
  
  try {
    const q = query(collection(db, COLLECTION_NAME), orderBy('order', 'asc'));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate?.()?.toISOString?.()?.split('T')[0] || '',
      updatedAt: doc.data().updatedAt?.toDate?.()?.toISOString?.()?.split('T')[0] || ''
    })) as Category[];
  } catch (error) {
    console.error('Error getting categories:', error);
    throw error;
  }
};

// Menu tipinə görə kateqoriyaları al
export const getCategoriesByMenuType = async (menuType: string): Promise<Category[]> => {
  if (!db) {
    console.warn('Firebase not configured, returning empty array');
    return [];
  }
  
  try {
    const q = query(
      collection(db, COLLECTION_NAME), 
      where('menuType', '==', menuType),
      where('status', '==', 'active'),
      orderBy('order', 'asc')
    );
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate?.()?.toISOString?.()?.split('T')[0] || '',
      updatedAt: doc.data().updatedAt?.toDate?.()?.toISOString?.()?.split('T')[0] || ''
    })) as Category[];
  } catch (error) {
    console.error('Error getting categories by menu type:', error);
    throw error;
  }
};

// Real-time kateqoriya dinləyicisi
export const subscribeToCategoriesChanges = (
  callback: (categories: Category[]) => void,
  menuType?: string
) => {
  if (!db) {
    console.warn('Firebase not configured, calling callback with empty array');
    callback([]);
    return () => {}; // Return empty unsubscribe function
  }
  
  try {
    let q;
    
    if (menuType) {
      q = query(
        collection(db, COLLECTION_NAME),
        where('menuType', '==', menuType),
        where('status', '==', 'active'),
        orderBy('order', 'asc')
      );
    } else {
      q = query(collection(db, COLLECTION_NAME), orderBy('order', 'asc'));
    }

    return onSnapshot(
      q, 
      (querySnapshot) => {
        const categories = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate?.()?.toISOString?.()?.split('T')[0] || '',
          updatedAt: doc.data().updatedAt?.toDate?.()?.toISOString?.()?.split('T')[0] || ''
        })) as Category[];
        
        console.log(`Categories listener: ${categories.length} categories loaded`);
        callback(categories);
      },
      (error) => {
        console.error('Categories listener error:', error);
        // Call callback with empty array on error to prevent infinite loading
        callback([]);
      }
    );
  } catch (error) {
    console.error('Error setting up categories listener:', error);
    callback([]);
    return () => {};
  }
};