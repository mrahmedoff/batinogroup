'use client';

import { useState, useRef } from 'react';
import { X, Image as ImageIcon, Upload, Check } from 'lucide-react';
import { uploadFile } from '@/lib/firebaseHelpers';

interface LogoUploadProps {
  currentLogo: string;
  onLogoChange: (logoUrl: string) => void;
}

export default function LogoUpload({ currentLogo, onLogoChange }: LogoUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Reset states
    setUploadSuccess(false);
    setUploadProgress(0);

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

    // Create preview immediately
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewUrl(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    // Start upload process
    setIsUploading(true);
    
    // Simulate progress for better UX
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + Math.random() * 20;
      });
    }, 200);

    try {
      console.log('Starting logo upload...');
      const logoUrl = await uploadFile(file, 'logos');
      console.log('Logo upload successful:', logoUrl);
      
      // Complete progress
      clearInterval(progressInterval);
      setUploadProgress(100);
      
      // Show success state
      setUploadSuccess(true);
      
      // Update logo
      onLogoChange(logoUrl);
      
      // Success message
      setTimeout(() => {
        if (logoUrl.startsWith('data:')) {
          alert('Logo yükləndi! (Development rejimi - Base64 formatında saxlanıldı)');
        } else if (logoUrl.startsWith('blob:')) {
          alert('Logo yükləndi! (Development rejimi - Local URL)');
        } else {
          alert('Logo uğurla Firebase-ə yükləndi!');
        }
        
        // Reset states after success
        setTimeout(() => {
          setPreviewUrl(null);
          setUploadSuccess(false);
          setUploadProgress(0);
        }, 1500);
      }, 500);
      
    } catch (error) {
      console.error('Logo yükləmə xətası:', error);
      clearInterval(progressInterval);
      
      // Xəta növünə görə fərqli mesajlar
      const errorMessage = error instanceof Error ? error.message : 'Naməlum xəta';
      if (errorMessage.includes('unauthorized') || errorMessage.includes('permission')) {
        alert('Firebase icazə xətası! Firebase Storage Rules yoxlanmalıdır.');
      } else {
        alert(`Logo yükləmədə xəta: ${errorMessage}`);
      }
      
      setPreviewUrl(null);
      setUploadProgress(0);
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
    setUploadProgress(0);
    setUploadSuccess(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      // Create a synthetic event to reuse handleFileSelect
      const syntheticEvent = {
        target: { files }
      } as React.ChangeEvent<HTMLInputElement>;
      
      handleFileSelect(syntheticEvent);
    }
  };

  const displayLogo = previewUrl || currentLogo;

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-slate-700">Sayt Loqosu</label>
      
      {/* Current/Preview Logo with Loading State */}
      {displayLogo && (
        <div className="relative inline-block">
          <div className="w-40 h-24 border-2 border-slate-200 rounded-lg overflow-hidden bg-white flex items-center justify-center relative">
            <img 
              src={displayLogo} 
              alt="Logo" 
              className={`max-w-full max-h-full object-contain transition-all duration-300 ${
                isUploading ? 'opacity-70' : 'opacity-100'
              }`}
            />
            
            {/* Loading Overlay */}
            {isUploading && (
              <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                <div className="bg-white rounded-lg p-3 shadow-lg">
                  <div className="flex flex-col items-center gap-2">
                    {uploadSuccess ? (
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <Check className="w-5 h-5 text-white" />
                      </div>
                    ) : (
                      <div className="relative w-8 h-8">
                        <div className="absolute inset-0 border-2 border-gray-200 rounded-full"></div>
                        <div 
                          className="absolute inset-0 border-2 border-blue-600 rounded-full border-t-transparent animate-spin"
                          style={{
                            transform: `rotate(${uploadProgress * 3.6}deg)`
                          }}
                        ></div>
                      </div>
                    )}
                    <div className="text-xs font-medium text-gray-700">
                      {uploadSuccess ? 'Tamamlandı!' : `${Math.round(uploadProgress)}%`}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Remove Button */}
          {previewUrl && !isUploading && (
            <button
              type="button"
              onClick={handleRemovePreview}
              className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg"
            >
              <X className="w-3 h-3" />
            </button>
          )}
          
          {/* Success Indicator */}
          {uploadSuccess && (
            <div className="absolute -top-2 -left-2 w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center shadow-lg">
              <Check className="w-3 h-3" />
            </div>
          )}
        </div>
      )}

      {/* Upload Area */}
      <div 
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-all duration-300 ${
          isUploading 
            ? 'border-blue-400 bg-blue-50' 
            : 'border-slate-300 hover:border-slate-400 hover:bg-slate-50'
        }`}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
          disabled={isUploading}
        />
        
        <div className="space-y-3">
          <div className="mx-auto w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center relative overflow-hidden">
            {isUploading ? (
              <div className="relative">
                <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-600 border-t-transparent"></div>
                <Upload className="absolute inset-0 w-4 h-4 text-blue-600 m-auto" />
              </div>
            ) : uploadSuccess ? (
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <Check className="w-5 h-5 text-white" />
              </div>
            ) : (
              <ImageIcon className="w-7 h-7 text-slate-400" />
            )}
          </div>
          
          <div>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className={`font-medium transition-colors ${
                isUploading 
                  ? 'text-blue-600 cursor-not-allowed' 
                  : 'text-blue-600 hover:text-blue-700'
              }`}
            >
              {isUploading 
                ? `Yüklənir... ${Math.round(uploadProgress)}%` 
                : uploadSuccess 
                  ? 'Uğurla yükləndi!' 
                  : 'Logo seçin və ya buraya sürükləyin'
              }
            </button>
            <p className="text-xs text-slate-500 mt-2">
              PNG, JPG, GIF formatları • Maksimum 5MB
            </p>
            {isUploading && (
              <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
            )}
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