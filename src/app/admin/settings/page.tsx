'use client';

import { useState, useEffect } from 'react';
import AdminLayout from '../components/AdminLayout';
import {
  Cog6ToothIcon,
  CheckCircleIcon,
  GlobeAltIcon,
  BellIcon,
  ShieldCheckIcon,
  UserIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';

export default function Settings() {
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('general');

  const [settings, setSettings] = useState({
    siteName: 'BatinoGroup',
    siteDescription: '',
    emailNotifications: true,
    smsNotifications: false,
    maintenanceMode: false,
  });

  const [contact, setContact] = useState({
    phone: '',
    email: '',
    address: '',
    workingHours: {
      weekdays: '',
      saturday: '',
      sunday: '',
    },
    socialMedia: {
      facebook: '',
      linkedin: '',
      instagram: '',
    },
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/settings');
      const data = await response.json();
      setSettings(data.settings || settings);
      setContact(data.contact || contact);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch settings:', error);
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ settings, contact }),
      });
      
      if (response.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    } catch (error) {
      console.error('Failed to save settings:', error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Tənzimləmələr</h1>
            <p className="text-gray-600 mt-1">Sistem parametrlərini idarə edin</p>
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg disabled:opacity-50"
          >
            {saving ? (
              <>
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Yadda saxlanılır...</span>
              </>
            ) : saved ? (
              <>
                <CheckCircleIcon className="w-5 h-5" />
                <span>Yadda saxlanıldı!</span>
              </>
            ) : (
              <>
                <Cog6ToothIcon className="w-5 h-5" />
                <span>Yadda Saxla</span>
              </>
            )}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Settings Menu */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-4 space-y-2">
              <button 
                onClick={() => setActiveSection('general')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                  activeSection === 'general' 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <GlobeAltIcon className="w-5 h-5" />
                <span>Ümumi</span>
              </button>
              <button 
                onClick={() => setActiveSection('contact')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                  activeSection === 'contact' 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <UserIcon className="w-5 h-5" />
                <span>Əlaqə Məlumatları</span>
              </button>
              <button 
                onClick={() => setActiveSection('hours')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                  activeSection === 'hours' 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <ClockIcon className="w-5 h-5" />
                <span>İş Saatları</span>
              </button>
              <button 
                onClick={() => setActiveSection('notifications')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                  activeSection === 'notifications' 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <BellIcon className="w-5 h-5" />
                <span>Bildirişlər</span>
              </button>
              <button 
                onClick={() => setActiveSection('system')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                  activeSection === 'system' 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <ShieldCheckIcon className="w-5 h-5" />
                <span>Sistem</span>
              </button>
            </div>
          </div>

          {/* Settings Content */}
          <div className="lg:col-span-2 space-y-6">
            {loading ? (
              <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                <div className="animate-spin w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-gray-600">Yüklənir...</p>
              </div>
            ) : (
              <>
                {/* General Settings */}
                {activeSection === 'general' && (
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Ümumi Tənzimləmələr</h2>
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Sayt Adı
                        </label>
                        <input
                          type="text"
                          value={settings.siteName}
                          onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Sayt Təsviri
                        </label>
                        <textarea
                          value={settings.siteDescription}
                          onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
                          rows={3}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Contact Settings */}
                {activeSection === 'contact' && (
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Əlaqə Məlumatları</h2>
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Telefon
                        </label>
                        <input
                          type="tel"
                          value={contact.phone}
                          onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="+994 12 123 45 67"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          value={contact.email}
                          onChange={(e) => setContact({ ...contact, email: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="info@batinogroup.com"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Ünvan
                        </label>
                        <input
                          type="text"
                          value={contact.address}
                          onChange={(e) => setContact({ ...contact, address: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Bakı, Azərbaycan"
                        />
                      </div>

                      <div className="pt-4 border-t border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Sosial Media</h3>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                              Facebook
                            </label>
                            <input
                              type="url"
                              value={contact.socialMedia.facebook}
                              onChange={(e) => setContact({
                                ...contact,
                                socialMedia: { ...contact.socialMedia, facebook: e.target.value }
                              })}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="https://facebook.com/batinogroup"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                              LinkedIn
                            </label>
                            <input
                              type="url"
                              value={contact.socialMedia.linkedin}
                              onChange={(e) => setContact({
                                ...contact,
                                socialMedia: { ...contact.socialMedia, linkedin: e.target.value }
                              })}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="https://linkedin.com/company/batinogroup"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                              Instagram
                            </label>
                            <input
                              type="url"
                              value={contact.socialMedia.instagram}
                              onChange={(e) => setContact({
                                ...contact,
                                socialMedia: { ...contact.socialMedia, instagram: e.target.value }
                              })}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="https://instagram.com/batinogroup"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Working Hours */}
                {activeSection === 'hours' && (
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">İş Saatları</h2>
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Bazar ertəsi - Cümə
                        </label>
                        <input
                          type="text"
                          value={contact.workingHours.weekdays}
                          onChange={(e) => setContact({
                            ...contact,
                            workingHours: { ...contact.workingHours, weekdays: e.target.value }
                          })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Bazar ertəsi - Cümə: 09:00 - 18:00"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Şənbə
                        </label>
                        <input
                          type="text"
                          value={contact.workingHours.saturday}
                          onChange={(e) => setContact({
                            ...contact,
                            workingHours: { ...contact.workingHours, saturday: e.target.value }
                          })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Şənbə: 10:00 - 15:00"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Bazar
                        </label>
                        <input
                          type="text"
                          value={contact.workingHours.sunday}
                          onChange={(e) => setContact({
                            ...contact,
                            workingHours: { ...contact.workingHours, sunday: e.target.value }
                          })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Bazar: Bağlı"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Notification Settings */}
                {activeSection === 'notifications' && (
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Bildiriş Tənzimləmələri</h2>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-semibold text-gray-900">Email Bildirişləri</p>
                          <p className="text-sm text-gray-600">Yeni mesajlar üçün email bildirişi</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.emailNotifications}
                            onChange={(e) => setSettings({ ...settings, emailNotifications: e.target.checked })}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-semibold text-gray-900">SMS Bildirişləri</p>
                          <p className="text-sm text-gray-600">Təcili mesajlar üçün SMS</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.smsNotifications}
                            onChange={(e) => setSettings({ ...settings, smsNotifications: e.target.checked })}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                {/* System Settings */}
                {activeSection === 'system' && (
                  <div className="space-y-6">
                    <div className="bg-white rounded-xl shadow-sm p-6">
                      <h2 className="text-xl font-bold text-gray-900 mb-6">Sistem Tənzimləmələri</h2>
                      <div className="space-y-6">
                        {/* Maintenance Mode Toggle */}
                        <div className="p-6 bg-gradient-to-r from-red-50 to-orange-50 rounded-xl border-2 border-red-200">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <div className="flex items-center mb-2">
                                <Cog6ToothIcon className="w-6 h-6 text-red-600 mr-2" />
                                <p className="text-lg font-bold text-gray-900">Texniki Xidmət Rejimi</p>
                              </div>
                              <p className="text-sm text-gray-600 mb-3">
                                Aktivləşdirildikdə vebsayt istifadəçilər üçün bağlanacaq. Yalnız admin panel işləyəcək.
                              </p>
                              <ul className="text-sm text-gray-600 space-y-1 ml-4">
                                <li>• Bütün səhifələr texniki xidmət səhifəsinə yönləndiriləcək</li>
                                <li>• Admin panel normal işləməyə davam edəcək</li>
                                <li>• API endpoint-ləri aktiv qalacaq</li>
                              </ul>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer ml-4">
                              <input
                                type="checkbox"
                                checked={settings.maintenanceMode}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    if (confirm('Texniki xidmət rejimini aktivləşdirmək istədiyinizdən əminsiniz? Vebsayt istifadəçilər üçün əlçatan olmayacaq.')) {
                                      setSettings({ ...settings, maintenanceMode: true });
                                    }
                                  } else {
                                    setSettings({ ...settings, maintenanceMode: false });
                                  }
                                }}
                                className="sr-only peer"
                              />
                              <div className="w-14 h-7 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-red-600"></div>
                            </label>
                          </div>
                          
                          {settings.maintenanceMode && (
                            <div className="mt-4 p-4 bg-white rounded-lg border-2 border-red-300">
                              <div className="flex items-start">
                                <div className="flex-shrink-0">
                                  <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                  </svg>
                                </div>
                                <div className="ml-3">
                                  <h3 className="text-sm font-bold text-red-800">Texniki Xidmət Rejimi AKTİVDİR</h3>
                                  <p className="text-sm text-red-700 mt-1">
                                    Vebsayt hazırda istifadəçilər üçün əlçatan deyil. Deaktiv etmək üçün toggle-i söndürün və yadda saxlayın.
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Preview */}
                        <div className="p-6 bg-gray-50 rounded-xl">
                          <h3 className="text-lg font-semibold text-gray-900 mb-4">Texniki Xidmət Səhifəsi Önizləməsi</h3>
                          <div className="bg-white rounded-lg p-6 border-2 border-gray-200">
                            <div className="text-center">
                              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full mb-4">
                                <Cog6ToothIcon className="w-8 h-8 text-white" />
                              </div>
                              <h4 className="text-2xl font-bold text-gray-900 mb-2">Texniki Xidmət</h4>
                              <p className="text-gray-600 mb-4">
                                Vebsaytımız hazırda texniki xidmət altındadır.
                              </p>
                              <a 
                                href="/maintenance" 
                                target="_blank"
                                className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold"
                              >
                                Tam səhifəni görün →
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
