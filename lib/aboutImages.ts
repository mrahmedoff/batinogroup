import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from './firebase';

export interface AboutImages {
  au1: string;
  au2: string;
  au3: string;
}

export const getAboutImages = async (): Promise<AboutImages> => {
  try {
    const docRef = doc(db, 'settings', 'aboutImages');
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data() as AboutImages;
    } else {
      // Default images
      const defaultImages: AboutImages = {
        au1: '/au1.jpg',
        au2: '/au2.jpg',
        au3: '/au3.jpg'
      };
      
      // Create document with default values
      await setDoc(docRef, defaultImages);
      return defaultImages;
    }
  } catch (error) {
    console.error('Error getting about images:', error);
    return {
      au1: '/au1.jpg',
      au2: '/au2.jpg',
      au3: '/au3.jpg'
    };
  }
};