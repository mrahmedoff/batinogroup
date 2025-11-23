import { storage } from './firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export async function uploadImage(file: File, folder: string = 'partners'): Promise<string> {
  if (!storage) {
    throw new Error('Firebase storage not initialized');
  }

  // Create a unique filename
  const timestamp = Date.now();
  const fileName = `${timestamp}_${file.name}`;
  const storageRef = ref(storage, `${folder}/${fileName}`);

  try {
    // Upload the file
    const snapshot = await uploadBytes(storageRef, file);
    
    // Get the download URL
    const downloadURL = await getDownloadURL(snapshot.ref);
    
    return downloadURL;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw new Error('Image upload failed');
  }
}

export function validateImageFile(file: File): { isValid: boolean; error?: string } {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  const maxSize = 5 * 1024 * 1024; // 5MB

  if (!allowedTypes.includes(file.type)) {
    return { isValid: false, error: 'Yalnız JPEG, PNG və WebP formatları dəstəklənir' };
  }

  if (file.size > maxSize) {
    return { isValid: false, error: 'Şəkil ölçüsü 5MB-dan çox ola bilməz' };
  }

  return { isValid: true };
}