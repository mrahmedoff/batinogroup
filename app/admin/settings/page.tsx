'use client';

import { useState, useEffect } from 'react';
import { useData } from '@/contexts/DataContext';
import { Save, Upload } from 'lucide-react';

export default function SettingsAdmin() {
  const { settings, updateSettings } = useData();
  const [formData, setFormData] = useState(settings);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string>('');

  useEffect(() => {
    setFormData(settings);
  }, [settings]);

  const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Yalnız şəkil faylları seçin!');
      return;
    }

    setLogoFile(file);
    
    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setLogoPreview(result);
      setFormData(prev => ({ ...prev, logo: result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(formData);
    alert('Parametrlər yadda saxlanıldı!');
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Parametrlər</h1>
        <p className="text-sm text-slate-500 mt-1">Sayt parametrlərini konfiqurasiya edin</p>
      </div>

      {/* Info Banner */}
      <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-start gap-3">
          <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-white text-xs font-bold">i</span>
          </div>
          <div>
            <h3 className="text-sm font-medium text-blue-900 mb-1">Logo Yükləmə Funksiyası</h3>
            <p className="text-sm text-blue-700">
              Yeni logo yükləyəndə avtomatik olaraq saytın bütün səhifələrində (header və footer) göstəriləcək. 
              Dəyişiklikləri yadda saxlamağı unutmayın.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {/* Logo Upload Section */}
        <div id="logo" className="bg-white rounded-xl p-6 border border-slate-200">
          <div className="mb-4">
            <h2 className="text-lg font-bold text-slate-900">Sayt Loqosu</h2>
            <p className="text-sm text-slate-500 mt-1">Saytın header və footer hissələrində göstəriləcək logo</p>
          </div>
          
          {/* Logo Upload */}
          <div className="space-y-6">
            {/* Current Logo Display */}
            {(logoPreview || formData.logo) && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3">Mövcud Logo:</label>
                <div className="inline-block p-4 border-2 border-slate-200 rounded-lg bg-slate-50">
                  <img 
                    src={logoPreview || formData.logo} 
                    alt="Logo" 
                    className="w-32 h-20 object-contain"
                  />
                </div>
              </div>
            )}
            
            {/* File Input */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-3">Yeni Logo Yükləyin:</label>
              <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-slate-400 transition-colors">
                <Upload className="w-8 h-8 text-slate-400 mx-auto mb-3" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoChange}
                  className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                <p className="text-xs text-slate-500 mt-2">PNG, JPG, GIF formatları dəstəklənir (maksimum 5MB)</p>
                <p className="text-xs text-slate-400 mt-1">Tövsiyə edilən ölçü: 200x80 piksel</p>
              </div>
            </div>
          </div>
        </div>

        {/* General Settings */}
        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900 mb-4">Ümumi Məlumatlar</h2>
              
              <div className="space-y-4">

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Sayt Adı</label>
                <input
                  type="text"
                  value={formData.siteName}
                  onChange={(e) => setFormData({...formData, siteName: e.target.value})}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Telefon</label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Ünvan</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-bold text-slate-900 mb-4">Sosial Şəbəkələr</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Facebook</label>
                <input
                  type="url"
                  value={formData.facebook}
                  onChange={(e) => setFormData({...formData, facebook: e.target.value})}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="https://facebook.com/..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">LinkedIn</label>
                <input
                  type="url"
                  value={formData.linkedin}
                  onChange={(e) => setFormData({...formData, linkedin: e.target.value})}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="https://linkedin.com/..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Instagram</label>
                <input
                  type="url"
                  value={formData.instagram}
                  onChange={(e) => setFormData({...formData, instagram: e.target.value})}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="https://instagram.com/..."
                />
              </div>
            </div>
          </div>

            <button 
              type="submit"
              className="w-full px-4 py-3 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" strokeWidth={2} />
              Yadda Saxla
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
