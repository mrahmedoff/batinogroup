'use client';

import { useState, useEffect } from 'react';
import AdminLayout from '../components/AdminLayout';
import {
  DocumentTextIcon,
  PencilSquareIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';

export default function ContentManagement() {
  const [activeTab, setActiveTab] = useState('home');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  const [content, setContent] = useState<any>({
    home: {
      hero: {
        badge: '',
        title: '',
        subtitle: '',
      },
      stats: [],
    },
    about: {
      title: '',
      description: '',
      mission: '',
      vision: '',
      values: '',
    },
    contact: {
      phone: '',
      email: '',
      address: '',
    },
  });

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const response = await fetch('/api/content');
      const data = await response.json();
      setContent(data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch content:', error);
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content),
      });
      
      if (response.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    } catch (error) {
      console.error('Failed to save content:', error);
    } finally {
      setSaving(false);
    }
  };

  const tabs = [
    { id: 'home', name: 'Ana Səhifə', icon: '🏠' },
    { id: 'about', name: 'Haqqımızda', icon: 'ℹ️' },
    { id: 'services', name: 'Xidmətlər', icon: '⚙️' },
    { id: 'contact', name: 'Əlaqə', icon: '📞' },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Məzmun İdarəetməsi</h1>
            <p className="text-gray-600 mt-1">Vebsayt məzmununu redaktə edin</p>
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50"
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
                <DocumentTextIcon className="w-5 h-5" />
                <span>Yadda Saxla</span>
              </>
            )}
          </button>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-4 px-6" aria-label="Tabs">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-3 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <span className="text-xl">{tab.icon}</span>
                  <span>{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Content Editor */}
          <div className="p-6">
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-gray-600">Yüklənir...</p>
              </div>
            ) : (
              <>
                {activeTab === 'home' && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Badge Mətni
                      </label>
                      <input
                        type="text"
                        value={content.home.hero.badge}
                        onChange={(e) => setContent({
                          ...content,
                          home: {
                            ...content.home,
                            hero: { ...content.home.hero, badge: e.target.value }
                          }
                        })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Başlıq
                      </label>
                      <input
                        type="text"
                        value={content.home.hero.title}
                        onChange={(e) => setContent({
                          ...content,
                          home: {
                            ...content.home,
                            hero: { ...content.home.hero, title: e.target.value }
                          }
                        })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Alt Başlıq
                      </label>
                      <textarea
                        value={content.home.hero.subtitle}
                        onChange={(e) => setContent({
                          ...content,
                          home: {
                            ...content.home,
                            hero: { ...content.home.hero, subtitle: e.target.value }
                          }
                        })}
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    {/* Preview */}
                    <div className="mt-8 p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl">
                      <h3 className="text-lg font-bold text-gray-900 mb-4">Önizləmə</h3>
                      <div className="bg-white p-8 rounded-lg">
                        <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full mb-4">
                          <span className="text-sm font-medium text-blue-800">{content.home.hero.badge}</span>
                        </div>
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">{content.home.hero.title}</h1>
                        <p className="text-lg text-gray-600">{content.home.hero.subtitle}</p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'about' && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Başlıq
                      </label>
                      <input
                        type="text"
                        value={content.about.title}
                        onChange={(e) => setContent({
                          ...content,
                          about: { ...content.about, title: e.target.value }
                        })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Təsvir
                      </label>
                      <textarea
                        value={content.about.description}
                        onChange={(e) => setContent({
                          ...content,
                          about: { ...content.about, description: e.target.value }
                        })}
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Missiya
                      </label>
                      <textarea
                        value={content.about.mission}
                        onChange={(e) => setContent({
                          ...content,
                          about: { ...content.about, mission: e.target.value }
                        })}
                        rows={2}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Vizyon
                      </label>
                      <textarea
                        value={content.about.vision}
                        onChange={(e) => setContent({
                          ...content,
                          about: { ...content.about, vision: e.target.value }
                        })}
                        rows={2}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Dəyərlər
                      </label>
                      <input
                        type="text"
                        value={content.about.values}
                        onChange={(e) => setContent({
                          ...content,
                          about: { ...content.about, values: e.target.value }
                        })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                )}

                {activeTab === 'services' && (
                  <div className="text-center py-12">
                    <PencilSquareIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Xidmətlər Məzmunu</h3>
                    <p className="text-gray-600">Bu bölmə tezliklə əlavə ediləcək</p>
                  </div>
                )}

                {activeTab === 'contact' && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Telefon
                      </label>
                      <input
                        type="tel"
                        value={content.contact.phone}
                        onChange={(e) => setContent({
                          ...content,
                          contact: { ...content.contact, phone: e.target.value }
                        })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        value={content.contact.email}
                        onChange={(e) => setContent({
                          ...content,
                          contact: { ...content.contact, email: e.target.value }
                        })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Ünvan
                      </label>
                      <input
                        type="text"
                        value={content.contact.address}
                        onChange={(e) => setContent({
                          ...content,
                          contact: { ...content.contact, address: e.target.value }
                        })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
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
