'use client';

import { useState, useEffect } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, updateDoc, getDoc, setDoc } from 'firebase/firestore';
import { storage, db } from '@/lib/firebase';
import Image from 'next/image';

export default function AboutImagesAdmin() {
  const [images, setImages] = useState({
    au1: '/au1.jpg',
    au2: '/au2.jpg',
    au3: '/au3.jpg'
  });
  const [uploading, setUploading] = useState<string | null>(null);

  useEffect(() => {
    loadImages();
  }, []);

  const loadImages = async () => {
    try {
      const docRef = doc(db, 'settings', 'aboutImages');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setImages(docSnap.data() as typeof images);
      }
    } catch (error) {
      console.error('Error loading images:', error);
    }
  };

  const handleImageUpload = async (file: File, imageKey: string) => {
    if (!file) return;

    setUploading(imageKey);
    try {
      const storageRef = ref(storage, `about-images/${imageKey}-${Date.now()}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);

      const newImages = { ...images, [imageKey]: downloadURL };
      setImages(newImages);

      const docRef = doc(db, 'settings', 'aboutImages');
      try {
        await updateDoc(docRef, newImages);
      } catch {
        await setDoc(docRef, newImages);
      }
      
      alert('Resim başarıyla güncellendi!');
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Resim yüklenirken hata oluştu!');
    } finally {
      setUploading(null);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">About Page Images</h1>
      
      <div className="grid md:grid-cols-3 gap-8">
        {Object.entries(images).map(([key, url]) => (
          <div key={key} className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4 capitalize">{key} Image</h3>
            
            <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
              <Image
                src={url}
                alt={`About ${key}`}
                fill
                className="object-cover"
              />
            </div>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleImageUpload(file, key);
              }}
              disabled={uploading === key}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />

            {uploading === key && (
              <p className="text-blue-600 mt-2">Uploading...</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}