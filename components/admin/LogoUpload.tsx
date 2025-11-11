'use client';

import { useState, useRef } from 'react';
import { X, Image as ImageIcon } from 'lucide-react';
import { uploadFile } from '@/lib/firebaseHelpers';

interface LogoUploadProps {
  currentLogo: string;
  onLogoChange: (logoUrl: string) => void;
}

export default function LogoUpload({ currentLogo, onLogoChange }: LogoUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Yalnız şəkil faylları yükləyə bilərsiniz!');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Fayl ölçüsü 5MB-dan çox ola bilməz!');
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewUrl(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    // Upload file
    setIsUploading(true);
    try {
      console.log('Starting logo upload...');
      const logoUrl = await uploadFile(file, 'logos');
      console.log('Logo upload successful:', logoUrl);
      
      onLogoChange(logoUrl);
      setPreviewUrl(null); // Clear preview after successful upload
      
      // Firebase URL və ya local URL-ə görə fərqli mesaj
      if (logoUrl.startsWith('blob:')) {
        alert('Logo yükləndi! (Development rejimi - Firebase konfigurasiya edilməyib)');
      } else {
        alert('Logo uğurla Firebase-ə yükləndi!');
      }
    } catch (error) {
      console.error('Logo yükləmə xətası:', error);
      
      // Xəta növünə görə fərqli mesajlar
      const errorMessage = error instanceof Error ? error.message : 'Naməlum xəta';
      if (errorMessage.includes('unauthorized') || errorMessage.includes('permission')) {
        alert('Firebase icazə xətası! Firebase Storage Rules yoxlanmalıdır.');
      } else {
        alert(`Logo yükləmədə xəta: ${errorMessage}`);
      }
      setPreviewUrl(null);
    } finally {
      setIsUploading(false);
      // Clear file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemovePreview = () => {
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const displayLogo = previewUrl || currentLogo;

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-slate-700">Sayt Loqosu</label>
      

      
      {/* Current/Preview Logo */}
      {displayLogo && (
        <div className="relative inline-block">
          <div className="w-32 h-20 border-2 border-slate-200 rounded-lg overflow-hidden bg-white flex items-center justify-center">
            <img 
              src={displayLogo} 
              alt="Logo" 
              className="max-w-full max-h-full object-contain"
            />
          </div>
          {previewUrl && (
            <button
              type="button"
              onClick={handleRemovePreview}
              className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>
      )}

      {/* Upload Area */}
      <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-slate-400 transition-colors">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
          disabled={isUploading}
        />
        
        <div className="space-y-2">
          <div className="mx-auto w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center">
            {isUploading ? (
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            ) : (
              <ImageIcon className="w-6 h-6 text-slate-400" />
            )}
          </div>
          
          <div>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="text-blue-600 hover:text-blue-700 font-medium disabled:opacity-50"
            >
              {isUploading ? 'Yüklənir...' : 'Logo seçin'}
            </button>
            <p className="text-xs text-slate-500 mt-1">
              PNG, JPG, GIF (maksimum 5MB)
            </p>
          </div>
        </div>
      </div>

      <div className="text-xs text-slate-500">
        <p>• Ən yaxşı nəticə üçün 200x80 piksel ölçüsündə şəkil istifadə edin</p>
        <p>• Şəffaf arxa fon (PNG) tövsiyə olunur</p>
      </div>
    </div>
  );
}