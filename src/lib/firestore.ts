import { db } from './firebase';
import { 
  collection, 
  addDoc, 
  getDocs, 
  getDoc,
  doc, 
  updateDoc, 
  deleteDoc,
  query,
  orderBy,
  Timestamp,
  where
} from 'firebase/firestore';

// Messages
export const addMessage = async (data: {
  name: string;
  email: string;
  phone?: string;
  message: string;
}) => {
  return await addDoc(collection(db, 'messages'), {
    ...data,
    createdAt: Timestamp.now(),
    read: false
  });
};

export const getMessages = async () => {
  const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const markMessageAsRead = async (id: string) => {
  return await updateDoc(doc(db, 'messages', id), { read: true });
};

export const deleteMessage = async (id: string) => {
  return await deleteDoc(doc(db, 'messages', id));
};

// Testimonials
export const addTestimonial = async (data: {
  name: string;
  position: string;
  company: string;
  text: string;
  rating: number;
  image?: string;
}) => {
  return await addDoc(collection(db, 'testimonials'), {
    ...data,
    createdAt: Timestamp.now(),
    approved: false
  });
};

export const getTestimonials = async (approvedOnly = true) => {
  let q = query(collection(db, 'testimonials'), orderBy('createdAt', 'desc'));
  if (approvedOnly) {
    q = query(collection(db, 'testimonials'), where('approved', '==', true), orderBy('createdAt', 'desc'));
  }
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const updateTestimonial = async (id: string, data: any) => {
  return await updateDoc(doc(db, 'testimonials', id), data);
};

export const deleteTestimonial = async (id: string) => {
  return await deleteDoc(doc(db, 'testimonials', id));
};

// Settings
export const getSettings = async () => {
  const docRef = doc(db, 'settings', 'site');
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? docSnap.data() : null;
};

export const updateSettings = async (data: any) => {
  const docRef = doc(db, 'settings', 'site');
  return await updateDoc(docRef, data);
};

// Analytics
export const trackPageView = async (page: string) => {
  return await addDoc(collection(db, 'analytics'), {
    type: 'pageview',
    page,
    timestamp: Timestamp.now()
  });
};

export const getAnalytics = async (startDate?: Date, endDate?: Date) => {
  let q = query(collection(db, 'analytics'), orderBy('timestamp', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};
