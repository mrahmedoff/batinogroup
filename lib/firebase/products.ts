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

export interface Product {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  image?: string;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

const COLLECTION_NAME = 'products';

// Məhsul əlavə et
export const addProduct = async (productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
  if (!db) {
    throw new Error('Firebase not configured');
  }
  
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...productData,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding product:', error);
    throw error;
  }
};

// Məhsul yenilə
export const updateProduct = async (id: string, productData: Partial<Product>) => {
  if (!db) {
    throw new Error('Firebase not configured');
  }
  
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(docRef, {
      ...productData,
      updatedAt: Timestamp.now()
    });
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

// Məhsul sil
export const deleteProduct = async (id: string) => {
  if (!db) {
    throw new Error('Firebase not configured');
  }
  
  try {
    await deleteDoc(doc(db, COLLECTION_NAME, id));
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};

// Bütün məhsulları al
export const getProducts = async (): Promise<Product[]> => {
  if (!db) {
    console.warn('Firebase not configured, returning empty array');
    return [];
  }
  
  try {
    const q = query(collection(db, COLLECTION_NAME), orderBy('name', 'asc'));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate?.()?.toISOString?.()?.split('T')[0] || '',
      updatedAt: doc.data().updatedAt?.toDate?.()?.toISOString?.()?.split('T')[0] || ''
    })) as Product[];
  } catch (error) {
    console.error('Error getting products:', error);
    throw error;
  }
};

// Kateqoriyaya görə məhsulları al
export const getProductsByCategory = async (category: string): Promise<Product[]> => {
  if (!db) {
    console.warn('Firebase not configured, returning empty array');
    return [];
  }
  
  try {
    const q = query(
      collection(db, COLLECTION_NAME), 
      where('category', '==', category),
      where('status', '==', 'active'),
      orderBy('name', 'asc')
    );
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate?.()?.toISOString?.()?.split('T')[0] || '',
      updatedAt: doc.data().updatedAt?.toDate?.()?.toISOString?.()?.split('T')[0] || ''
    })) as Product[];
  } catch (error) {
    console.error('Error getting products by category:', error);
    throw error;
  }
};

// Alt kateqoriyaya görə məhsulları al
export const getProductsBySubcategory = async (subcategory: string): Promise<Product[]> => {
  if (!db) {
    console.warn('Firebase not configured, returning empty array');
    return [];
  }
  
  try {
    const q = query(
      collection(db, COLLECTION_NAME), 
      where('subcategory', '==', subcategory),
      where('status', '==', 'active'),
      orderBy('name', 'asc')
    );
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate?.()?.toISOString?.()?.split('T')[0] || '',
      updatedAt: doc.data().updatedAt?.toDate?.()?.toISOString?.()?.split('T')[0] || ''
    })) as Product[];
  } catch (error) {
    console.error('Error getting products by subcategory:', error);
    throw error;
  }
};

// Məhsul axtarışı
export const searchProducts = async (searchTerm: string): Promise<Product[]> => {
  if (!db) {
    console.warn('Firebase not configured, returning empty array');
    return [];
  }
  
  try {
    // Firestore doesn't have full-text search, so we get all products and filter client-side
    const products = await getProducts();
    
    return products.filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.subcategory.toLowerCase().includes(searchTerm.toLowerCase())
    );
  } catch (error) {
    console.error('Error searching products:', error);
    throw error;
  }
};

// Real-time məhsul dinləyicisi
export const subscribeToProductsChanges = (
  callback: (products: Product[]) => void,
  category?: string
) => {
  if (!db) {
    console.warn('Firebase not configured, calling callback with empty array');
    callback([]);
    return () => {}; // Return empty unsubscribe function
  }
  
  try {
    let q;
    
    if (category) {
      q = query(
        collection(db, COLLECTION_NAME),
        where('category', '==', category),
        where('status', '==', 'active'),
        orderBy('name', 'asc')
      );
    } else {
      q = query(collection(db, COLLECTION_NAME), orderBy('name', 'asc'));
    }

    return onSnapshot(
      q, 
      (querySnapshot) => {
        const products = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate?.()?.toISOString?.()?.split('T')[0] || '',
          updatedAt: doc.data().updatedAt?.toDate?.()?.toISOString?.()?.split('T')[0] || ''
        })) as Product[];
        
        console.log(`Products listener: ${products.length} products loaded`);
        callback(products);
      },
      (error) => {
        console.error('Products listener error:', error);
        // Call callback with empty array on error to prevent infinite loading
        callback([]);
      }
    );
  } catch (error) {
    console.error('Error setting up products listener:', error);
    callback([]);
    return () => {};
  }
};