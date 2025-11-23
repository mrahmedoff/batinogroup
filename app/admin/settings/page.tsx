'use client';

import { useState, useEffect } from 'react';
import { useData } from '@/contexts/DataContext';
import { Save, Info } from 'lucide-react';
import LogoUpload from '@/components/admin/LogoUpload';

export default function SettingsAdmin() {
  const { settings, updateSettings } = useData();
  const [formData, setFormData] = useState({
    siteName: '',
    email: '',
    phone: '',
    address: '',
    facebook: '',
    linkedin: '',
    instagram: '',
    logo: '',
    voen: ''
  });

  useEffect(() => {
    if (settings) {
      setFormData({
        siteName: settings.siteName || '',
        email: settings.email || '',
        phone: settings.phone || '',
        address: settings.address || '',
        facebook: settings.facebook || '',
        linkedin: settings.linkedin || '',
        instagram: settings.instagram || '',
        logo: settings.logo || '',
        voen: settings.voen || ''
      });
    }
  }, [settings]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(formData);
    alert('Settings saved!');
  };

  const handleLogoChange = (logoUrl: string) => {
    const newFormData = {...formData, logo: logoUrl};
    setFormData(newFormData);
    
    // Auto save when logo is uploaded
    updateSettings(newFormData);
    console.log('Logo automatically saved:', logoUrl);
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
        <p className="text-sm text-slate-500 mt-1">Configure site settings</p>
      </div>

      {/* Info Banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 max-w-2xl">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="text-sm font-medium text-blue-900 mb-1">About Logo Upload</h3>
            <p className="text-sm text-blue-700">
              After uploading the logo, it will automatically appear in the header and footer sections of the site. 
              Use a PNG format image with 200x80 pixel dimensions for best results.
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
            <h2 className="text-lg font-bold text-slate-900 mb-4">General Information</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Site Name</label>
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
                <label className="block text-sm font-medium text-slate-700 mb-2">Address</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">VOEN</label>
                <input
                  type="text"
                  value={formData.voen}
                  onChange={(e) => setFormData({...formData, voen: e.target.value})}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="1234567890"
                />
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-bold text-slate-900 mb-4">Social Networks</h2>
            
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
