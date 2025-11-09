import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  getDocs, 
  query, 
  orderBy,
  Timestamp 
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from './firebase';

// Generic CRUD operations
export const addDocument = async (collectionName: string, data: any) => {
  if (!isFirebaseConfigured || !db) {
    console.warn('Firebase not configured, skipping addDocument');
    return { id: Date.now().toString(), ...data };
  }
  try {
    const docRef = await addDoc(collection(db, collectionName), {
      ...data,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
    return { id: docRef.id, ...data };
  } catch (error) {
    console.error('Error adding document:', error);
    throw error;
  }
};

export const updateDocument = async (collectionName: string, id: string, data: any) => {
  if (!isFirebaseConfigured || !db) {
    console.warn('Firebase not configured, skipping updateDocument');
    return { id, ...data };
  }
  try {
    const docRef = doc(db, collectionName, id);
    await updateDoc(docRef, {
      ...data,
      updatedAt: Timestamp.now(),
    });
    return { id, ...data };
  } catch (error) {
    console.error('Error updating document:', error);
    throw error;
  }
};

export const deleteDocument = async (collectionName: string, id: string) => {
  if (!isFirebaseConfigured || !db) {
    console.warn('Firebase not configured, skipping deleteDocument');
    return;
  }
  try {
    await deleteDoc(doc(db, collectionName, id));
  } catch (error) {
    console.error('Error deleting document:', error);
    throw error;
  }
};

export const getDocuments = async (collectionName: string) => {
  if (!isFirebaseConfigured || !db) {
    console.warn('Firebase not configured, returning empty array');
    return [];
  }
  try {
    const q = query(collection(db, collectionName), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error('Error getting documents:', error);
    return [];
  }
};
