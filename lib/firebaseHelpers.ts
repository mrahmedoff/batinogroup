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
import { 
  ref, 
  uploadBytes, 
  getDownloadURL 
} from 'firebase/storage';
import { db, storage, isFirebaseConfigured } from './firebase';

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
    console.log('Deleting document:', collectionName, id);
    await deleteDoc(doc(db, collectionName, id));
    console.log('Document deleted from Firebase');
  } catch (error) {
    console.error('Error deleting document:', error);
    throw error;
  }
};

export const getDocuments = async (collectionName: string) => {
  console.log('Loading collection:', collectionName);
  
  if (!isFirebaseConfigured || !db) {
    console.warn('Firebase not configured, returning empty array');
    return [];
  }
  
  try {
    // First try with orderBy, if it fails, try without it
    let querySnapshot;
    try {
      const q = query(collection(db, collectionName), orderBy('createdAt', 'desc'));
      querySnapshot = await getDocs(q);
    } catch (orderError) {
      console.warn('OrderBy failed, using simple query');
      querySnapshot = await getDocs(collection(db, collectionName));
    }
    
    const docs = querySnapshot.docs.map(doc => {
      const docData = doc.data();
      const docId = doc.id;
      
      // Debug log for jobs collection
      if (collectionName === 'jobs') {
        console.log('Job document:', { id: docId, title: (docData as any).title, hasData: Object.keys(docData).length > 0 });
      }
      
      // Check if document has valid data
      if (!docId) {
        console.error('❌ Document missing ID:', { docData, exists: doc.exists() });
        return null; // Skip invalid documents
      }
      
      if (!docData || Object.keys(docData).length === 0) {
        console.error('❌ Document has no data:', { id: docId, exists: doc.exists() });
        return null; // Skip empty documents
      }
      
      const data = {
        id: docId,
        ...docData,
      };
      
      if (collectionName === 'jobs') {
        console.log('Job loaded:', { id: data.id, title: (data as any).title });
      }
      
      return data;
    }).filter(doc => doc !== null); // Remove null entries
    
    console.log('Loaded', docs.length, collectionName);
    return docs;
  } catch (error) {
    console.error('Error getting documents:', error);
    console.error('Error details:', {
      code: (error as any)?.code,
      message: (error as any)?.message,
      name: (error as any)?.name
    });
    
    // Eğer createdAt field'i yoksa, order olmadan dene
    try {
      console.log('Retrying without orderBy...');
      const simpleQuery = collection(db, collectionName);
      const querySnapshot = await getDocs(simpleQuery);
      
      const docs = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      
      console.log('Simple query successful, found', docs.length, 'documents');
      return docs;
    } catch (retryError) {
      console.error('Retry also failed:', retryError);
      return [];
    }
  }
};

// File upload function
export const uploadFile = async (file: File, folder: string = 'uploads'): Promise<string> => {
  if (!isFirebaseConfigured || !storage) {
    console.warn('Firebase Storage not configured, converting to base64');
    // Base64 formatında saxla ki, session-dan asılı olmasın
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.readAsDataURL(file);
    });
  }

  try {
    // Unique filename yaradırıq
    const timestamp = Date.now();
    const fileName = `${timestamp}_${file.name}`;
    const storageRef = ref(storage, `${folder}/${fileName}`);
    
    console.log('Attempting to upload file to Firebase Storage:', fileName);
    
    // Faylı yükləyirik
    const snapshot = await uploadBytes(storageRef, file);
    
    // Download URL alırıq
    const downloadURL = await getDownloadURL(snapshot.ref);
    
    console.log('File uploaded successfully:', downloadURL);
    return downloadURL;
  } catch (error) {
    console.error('Firebase Storage error:', error);
    
    // Firebase xətası olduqda base64 istifadə et
    console.warn('Falling back to base64 due to Firebase error');
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.readAsDataURL(file);
    });
  }
};