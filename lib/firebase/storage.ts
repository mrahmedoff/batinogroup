import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from '../firebase';

// Şəkil yükləmə funksiyası
export const uploadProductImage = async (file: File, productId?: string): Promise<string> => {
  if (!storage) {
    throw new Error('Firebase Storage not configured');
  }

  try {
    // Fayl adını yaradırıq
    const timestamp = Date.now();
    const fileName = `${timestamp}_${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
    const imagePath = productId 
      ? `products/${productId}/${fileName}`
      : `products/temp/${fileName}`;

    // Storage referansı yaradırıq
    const imageRef = ref(storage, imagePath);

    // Faylı yükləyirik
    const snapshot = await uploadBytes(imageRef, file);
    
    // Download URL-ni alırıq
    const downloadURL = await getDownloadURL(snapshot.ref);
    
    return downloadURL;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw new Error('Şəkil yüklənərkən xəta baş verdi');
  }
};

// Şəkil silmə funksiyası
export const deleteProductImage = async (imageUrl: string): Promise<void> => {
  if (!storage) {
    throw new Error('Firebase Storage not configured');
  }

  try {
    // URL-dən storage referansını yaradırıq
    const imageRef = ref(storage, imageUrl);
    await deleteObject(imageRef);
  } catch (error) {
    console.error('Error deleting image:', error);
    throw new Error('Şəkil silinərkən xəta baş verdi');
  }
};

// Şəkil faylının validasiyası
export const validateImageFile = (file: File): { isValid: boolean; error?: string } => {
  // Fayl ölçüsü yoxlanışı (5MB maksimum)
  const maxSize = 5 * 1024 * 1024; // 5MB
  if (file.size > maxSize) {
    return { isValid: false, error: 'Şəkil ölçüsü 5MB-dan böyük ola bilməz' };
  }

  // Fayl tipi yoxlanışı
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  if (!allowedTypes.includes(file.type)) {
    return { isValid: false, error: 'Yalnız JPEG, PNG və WebP formatları dəstəklənir' };
  }

  return { isValid: true };
};

// Şəkil önizləmə URL-ni yaratma
export const createImagePreview = (file: File): string => {
  return URL.createObjectURL(file);
};

// Şəkil önizləmə URL-ni təmizləmə
export const revokeImagePreview = (previewUrl: string): void => {
  URL.revokeObjectURL(previewUrl);
};