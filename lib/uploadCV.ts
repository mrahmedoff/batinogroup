import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from './firebase';

export const uploadCV = async (file: File, applicantName: string): Promise<string> => {
  try {
    // Validate file type
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
      throw new Error('Yalnız PDF və Word faylları qəbul edilir');
    }

    // Validate file size (max 15MB)
    const maxSize = 15 * 1024 * 1024; // 15MB
    if (file.size > maxSize) {
      throw new Error('Fayl ölçüsü 15MB-dan çox ola bilməz');
    }

    // Create unique filename
    const timestamp = Date.now();
    const sanitizedName = applicantName.replace(/[^a-zA-Z0-9]/g, '_');
    const fileExtension = file.name.split('.').pop();
    const fileName = `cv_${sanitizedName}_${timestamp}.${fileExtension}`;

    // Upload to Firebase Storage
    const storageRef = ref(storage, `cvs/${fileName}`);
    await uploadBytes(storageRef, file);

    // Get download URL
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    console.error('CV upload error:', error);
    throw error;
  }
};
