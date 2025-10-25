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
      values: [],
    },
    services: {
      title: '',
      subtitle: '',
      items: [],
    },
    contact: {
      phone: '',
      email: '',
      address: '',
      workingHours: {
        weekdays: '',
        saturday: '',
        sunday: '',
      },
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

        {/* Tabs - Enhanced Card Design */}
        <div className="bg-gradient-to-r from-white to-blue-50 rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="p-4 bg-gradient-to-r from-blue-600 to-purple-600">
            <h3 className="text-white font-bold text-lg">Səhifə Bölmələri</h3>
            <p className="text-blue-100 text-sm">Redaktə etmək istədiyiniz bölməni seçin</p>
          </div>
          <div className="p-4">
            <nav className="flex flex-wrap gap-3" aria-label="Tabs">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-3 px-6 py-3 rounded-xl font-bold transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white scale-105'
                      : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200'
                  }`}
                >
                  <span className="text-2xl">{tab.icon}</span>
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
                  <div className="space-y-8">
                    {/* Hero Section - Enhanced Card */}
                    <div className="bg-gradient-to-br from-white to-blue-50 p-8 rounded-2xl shadow-lg border-2 border-gray-100">
                      <div className="flex items-center mb-6">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                          <span className="text-2xl">🎯</span>
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900">Hero Bölməsi</h3>
                          <p className="text-sm text-gray-600">Ana səhifə başlıq bölməsi</p>
                        </div>
                      </div>
                      <div className="space-y-4">
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
                            placeholder="Məsələn: Azərbaycanda #1 Təchizat Şirkəti"
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
                            placeholder="Əsas başlıq"
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
                            placeholder="Qısa təsvir"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Statistics - Enhanced Card */}
                    <div className="bg-gradient-to-br from-white to-purple-50 p-8 rounded-2xl shadow-lg border-2 border-gray-100">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center">
                          <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                            <span className="text-2xl">📊</span>
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold text-gray-900">Statistika</h3>
                            <p className="text-sm text-gray-600">Rəqəmlərlə nailiyyətlər</p>
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            const newStat = { label: '', value: '', icon: '📊' };
                            setContent({
                              ...content,
                              home: {
                                ...content.home,
                                stats: [...(content.home.stats || []), newStat]
                              }
                            });
                          }}
                          className="px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl hover:from-purple-700 hover:to-purple-800 transition-all shadow-lg hover:shadow-xl font-bold transform hover:-translate-y-0.5"
                        >
                          + Statistika Əlavə Et
                        </button>
                      </div>
                      
                      <div className="space-y-4">
                        {(content.home.stats || []).map((stat: any, index: number) => (
                          <div key={index} className="bg-white p-6 rounded-2xl border-2 border-gray-200 shadow-md hover:shadow-lg transition-all">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div>
                                <label className="block text-xs font-semibold text-gray-600 mb-1">
                                  Icon (Emoji)
                                </label>
                                <input
                                  type="text"
                                  value={stat.icon}
                                  onChange={(e) => {
                                    const newStats = [...content.home.stats];
                                    newStats[index].icon = e.target.value;
                                    setContent({
                                      ...content,
                                      home: { ...content.home, stats: newStats }
                                    });
                                  }}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-2xl text-center"
                                  placeholder="📊"
                                />
                              </div>
                              <div>
                                <label className="block text-xs font-semibold text-gray-600 mb-1">
                                  Rəqəm
                                </label>
                                <input
                                  type="text"
                                  value={stat.value}
                                  onChange={(e) => {
                                    const newStats = [...content.home.stats];
                                    newStats[index].value = e.target.value;
                                    setContent({
                                      ...content,
                                      home: { ...content.home, stats: newStats }
                                    });
                                  }}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  placeholder="500+"
                                />
                              </div>
                              <div>
                                <label className="block text-xs font-semibold text-gray-600 mb-1">
                                  Etiket
                                </label>
                                <div className="flex gap-2">
                                  <input
                                    type="text"
                                    value={stat.label}
                                    onChange={(e) => {
                                      const newStats = [...content.home.stats];
                                      newStats[index].label = e.target.value;
                                      setContent({
                                        ...content,
                                        home: { ...content.home, stats: newStats }
                                      });
                                    }}
                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Müştərilər"
                                  />
                                  <button
                                    onClick={() => {
                                      const newStats = content.home.stats.filter((_: any, i: number) => i !== index);
                                      setContent({
                                        ...content,
                                        home: { ...content.home, stats: newStats }
                                      });
                                    }}
                                    className="px-3 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                                  >
                                    🗑️
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Preview - Enhanced Card */}
                    <div className="mt-8 p-8 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl shadow-lg border-2 border-blue-200">
                      <div className="flex items-center mb-6">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                          <span className="text-2xl">👁️</span>
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900">Önizləmə</h3>
                          <p className="text-sm text-gray-600">Dəyişikliklərin görünüşü</p>
                        </div>
                      </div>
                      <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                        <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full mb-4">
                          <span className="text-sm font-medium text-blue-800">{content.home.hero.badge}</span>
                        </div>
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">{content.home.hero.title}</h1>
                        <p className="text-lg text-gray-600 mb-8">{content.home.hero.subtitle}</p>
                        
                        {content.home.stats && content.home.stats.length > 0 && (
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                            {content.home.stats.map((stat: any, index: number) => (
                              <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                                <div className="text-3xl mb-2">{stat.icon}</div>
                                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                                <div className="text-sm text-gray-600">{stat.label}</div>
                              </div>
                            ))}
                          </div>
                        )}
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
                  <div className="space-y-8">
                    {/* Services Header */}
                    <div className="bg-gray-50 p-6 rounded-xl">
                      <h3 className="text-lg font-bold text-gray-900 mb-4">Xidmətlər Başlığı</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Başlıq
                          </label>
                          <input
                            type="text"
                            value={content.services?.title || ''}
                            onChange={(e) => setContent({
                              ...content,
                              services: { ...content.services, title: e.target.value }
                            })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Xidmətlərimiz"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Alt Başlıq
                          </label>
                          <textarea
                            value={content.services?.subtitle || ''}
                            onChange={(e) => setContent({
                              ...content,
                              services: { ...content.services, subtitle: e.target.value }
                            })}
                            rows={3}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Xidmətlər haqqında qısa məlumat"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Services List - Enhanced Card */}
                    <div className="bg-gradient-to-br from-white to-green-50 p-8 rounded-2xl shadow-lg border-2 border-gray-100">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center">
                          <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-green-700 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                            <span className="text-2xl">⚙️</span>
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold text-gray-900">Xidmətlər Siyahısı</h3>
                            <p className="text-sm text-gray-600">Təklif olunan xidmətlər</p>
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            const newService = { 
                              icon: '⚙️', 
                              title: '', 
                              description: '',
                              features: []
                            };
                            setContent({
                              ...content,
                              services: {
                                ...content.services,
                                items: [...(content.services?.items || []), newService]
                              }
                            });
                          }}
                          className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl hover:from-green-700 hover:to-green-800 transition-all shadow-lg hover:shadow-xl font-bold transform hover:-translate-y-0.5"
                        >
                          + Xidmət Əlavə Et
                        </button>
                      </div>
                      
                      <div className="space-y-4">
                        {(content.services?.items || []).map((service: any, index: number) => (
                          <div key={index} className="bg-white p-6 rounded-2xl border-2 border-gray-200 shadow-md hover:shadow-lg transition-all">
                            <div className="flex items-start justify-between mb-4">
                              <h4 className="font-bold text-gray-900">Xidmət #{index + 1}</h4>
                              <button
                                onClick={() => {
                                  const newServices = content.services.items.filter((_: any, i: number) => i !== index);
                                  setContent({
                                    ...content,
                                    services: { ...content.services, items: newServices }
                                  });
                                }}
                                className="px-3 py-1 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors text-sm"
                              >
                                Sil
                              </button>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                              <div>
                                <label className="block text-xs font-semibold text-gray-600 mb-1">
                                  Icon (Emoji)
                                </label>
                                <input
                                  type="text"
                                  value={service.icon}
                                  onChange={(e) => {
                                    const newServices = [...content.services.items];
                                    newServices[index].icon = e.target.value;
                                    setContent({
                                      ...content,
                                      services: { ...content.services, items: newServices }
                                    });
                                  }}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-2xl text-center"
                                  placeholder="⚙️"
                                />
                              </div>
                              <div>
                                <label className="block text-xs font-semibold text-gray-600 mb-1">
                                  Başlıq
                                </label>
                                <input
                                  type="text"
                                  value={service.title}
                                  onChange={(e) => {
                                    const newServices = [...content.services.items];
                                    newServices[index].title = e.target.value;
                                    setContent({
                                      ...content,
                                      services: { ...content.services, items: newServices }
                                    });
                                  }}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  placeholder="Xidmət adı"
                                />
                              </div>
                            </div>
                            
                            <div>
                              <label className="block text-xs font-semibold text-gray-600 mb-1">
                                Təsvir
                              </label>
                              <textarea
                                value={service.description}
                                onChange={(e) => {
                                  const newServices = [...content.services.items];
                                  newServices[index].description = e.target.value;
                                  setContent({
                                    ...content,
                                    services: { ...content.services, items: newServices }
                                  });
                                }}
                                rows={3}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Xidmət haqqında məlumat"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'contact' && (
                  <div className="space-y-8">
                    {/* Contact Info */}
                    <div className="bg-gray-50 p-6 rounded-xl">
                      <h3 className="text-lg font-bold text-gray-900 mb-4">Əlaqə Məlumatları</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            📞 Telefon
                          </label>
                          <input
                            type="tel"
                            value={content.contact.phone}
                            onChange={(e) => setContent({
                              ...content,
                              contact: { ...content.contact, phone: e.target.value }
                            })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="+994 XX XXX XX XX"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            📧 Email
                          </label>
                          <input
                            type="email"
                            value={content.contact.email}
                            onChange={(e) => setContent({
                              ...content,
                              contact: { ...content.contact, email: e.target.value }
                            })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="info@example.com"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            📍 Ünvan
                          </label>
                          <textarea
                            value={content.contact.address}
                            onChange={(e) => setContent({
                              ...content,
                              contact: { ...content.contact, address: e.target.value }
                            })}
                            rows={2}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Bakı şəhəri, ..."
                          />
                        </div>
                      </div>
                    </div>

                    {/* Working Hours */}
                    <div className="bg-gray-50 p-6 rounded-xl">
                      <h3 className="text-lg font-bold text-gray-900 mb-4">⏰ İş Saatları</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Bazar ertəsi - Cümə
                          </label>
                          <input
                            type="text"
                            value={content.contact.workingHours?.weekdays || ''}
                            onChange={(e) => setContent({
                              ...content,
                              contact: { 
                                ...content.contact, 
                                workingHours: { 
                                  ...content.contact.workingHours, 
                                  weekdays: e.target.value 
                                }
                              }
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
                            value={content.contact.workingHours?.saturday || ''}
                            onChange={(e) => setContent({
                              ...content,
                              contact: { 
                                ...content.contact, 
                                workingHours: { 
                                  ...content.contact.workingHours, 
                                  saturday: e.target.value 
                                }
                              }
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
                            value={content.contact.workingHours?.sunday || ''}
                            onChange={(e) => setContent({
                              ...content,
                              contact: { 
                                ...content.contact, 
                                workingHours: { 
                                  ...content.contact.workingHours, 
                                  sunday: e.target.value 
                                }
                              }
                            })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Bazar: Bağlı"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Preview */}
                    <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl">
                      <h3 className="text-lg font-bold text-gray-900 mb-4">Önizləmə</h3>
                      <div className="bg-white p-6 rounded-lg space-y-4">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">📞</span>
                          <div>
                            <p className="text-sm text-gray-600">Telefon</p>
                            <p className="font-semibold text-gray-900">{content.contact.phone}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">📧</span>
                          <div>
                            <p className="text-sm text-gray-600">Email</p>
                            <p className="font-semibold text-gray-900">{content.contact.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">📍</span>
                          <div>
                            <p className="text-sm text-gray-600">Ünvan</p>
                            <p className="font-semibold text-gray-900">{content.contact.address}</p>
                          </div>
                        </div>
                        <div className="border-t pt-4 mt-4">
                          <p className="text-sm font-semibold text-gray-700 mb-2">İş Saatları:</p>
                          <p className="text-sm text-gray-600">{content.contact.workingHours?.weekdays}</p>
                          <p className="text-sm text-gray-600">{content.contact.workingHours?.saturday}</p>
                          <p className="text-sm text-gray-600">{content.contact.workingHours?.sunday}</p>
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
