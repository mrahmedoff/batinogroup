'use client';

import { useState, useEffect } from 'react';
import { useData } from '@/contexts/DataContext';
import { Save, Info } from 'lucide-react';
import LogoUpload from '@/components/admin/LogoUpload';

export default function SettingsAdmin() {
  const { settings, updateSettings } = useData();
  const [formData, setFormData] = useState(settings);

  useEffect(() => {
    setFormData(settings);
  }, [settings]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(formData);
    alert('Parametrlər yadda saxlanıldı!');
  };

  const handleLogoChange = (logoUrl: string) => {
    const newFormData = {...formData, logo: logoUrl};
    setFormData(newFormData);
    
    // Logo yüklənən kimi avtomatik saxla
    updateSettings(newFormData);
    console.log('Logo avtomatik saxlanıldı:', logoUrl);
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Parametrlər</h1>
        <p className="text-sm text-slate-500 mt-1">Sayt parametrlərini konfiqurasiya edin</p>
      </div>

      {/* Info Banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 max-w-2xl">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="text-sm font-medium text-blue-900 mb-1">Logo Yükləmə Haqqında</h3>
            <p className="text-sm text-blue-700">
              Logo yüklədikdən sonra avtomatik olaraq saytın header və footer hissələrində görünəcək. 
              Ən yaxşı nəticə üçün 200x80 piksel ölçüsündə PNG formatında şəkil istifadə edin.
            </p>
          </div>
        </div>
      </div>

      {/* Logo Upload Section */}
      <div className="bg-white rounded-xl p-6 max-w-2xl border border-slate-200 mb-6">
        <h2 className="text-lg font-bold text-slate-900 mb-4">Sayt Loqosu</h2>
        <LogoUpload 
          currentLogo={formData.logo} 
          onLogoChange={handleLogoChange}
        />
      </div>

      <div className="bg-white rounded-xl p-6 max-w-2xl border border-slate-200">
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
  );
}
