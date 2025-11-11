'use client';

import { useState } from 'react';
import { useData } from '@/contexts/DataContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Mail, Phone, MapPin, Clock, Send, MessageSquare } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ContactPage() {
  const { addMessage, settings } = useData();
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addMessage(formData);
    alert(t.messageSent);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <>
      <Header />
      <div className="pt-20">
        {/* Hero Section with Image */}
        <section className="relative h-[500px] flex items-center">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/95 to-blue-800/90 z-10" />
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1920&q=80)'
            }}
          />
          <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{t.getInTouch}</h1>
            <p className="text-xl text-blue-100 max-w-3xl">
              {t.contactHeroDesc}
            </p>
          </div>
        </section>

        {/* Contact Form and Info */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className="bg-white p-8 rounded-xl shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <MessageSquare className="w-6 h-6 text-blue-600" />
                  </div>
                  <h2 className="text-2xl font-bold">{t.sendMessage}</h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t.fullName}</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      placeholder={t.enterName}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t.email}</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      placeholder={t.enterEmail}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t.subject}</label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      placeholder={t.messageSubject}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t.message}</label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                      placeholder={t.writeMessage}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full px-6 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <Send className="w-5 h-5" />
                    {t.send}
                  </button>
                </form>
              </div>

              {/* Contact Info Cards */}
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="h-32 bg-gradient-to-br from-blue-500 to-blue-700 relative">
                    <div 
                      className="absolute inset-0 bg-cover bg-center opacity-20"
                      style={{
                        backgroundImage: 'url(https://images.unsplash.com/photo-1596524430615-b46475ddff6e?w=600&q=80)'
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Mail className="w-12 h-12 text-white" />
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-lg mb-2">{t.email}</h3>
                    <p className="text-gray-600">{settings.email}</p>
                    <a href={`mailto:${settings.email}`} className="text-blue-600 hover:underline mt-2 inline-block">
                      {t.sendEmail} →
                    </a>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="h-32 bg-gradient-to-br from-green-500 to-green-700 relative">
                    <div 
                      className="absolute inset-0 bg-cover bg-center opacity-20"
                      style={{
                        backgroundImage: 'url(https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&q=80)'
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Phone className="w-12 h-12 text-white" />
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-lg mb-2">{t.phone}</h3>
                    <p className="text-gray-600">{settings.phone}</p>
                    <a href={`tel:${settings.phone}`} className="text-blue-600 hover:underline mt-2 inline-block">
                      {t.callUs} →
                    </a>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="h-32 bg-gradient-to-br from-purple-500 to-purple-700 relative">
                    <div 
                      className="absolute inset-0 bg-cover bg-center opacity-20"
                      style={{
                        backgroundImage: 'url(https://images.unsplash.com/photo-1524661135-423995f22d0b?w=600&q=80)'
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <MapPin className="w-12 h-12 text-white" />
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-lg mb-2">{t.address}</h3>
                    <p className="text-gray-600">{settings.address}</p>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Working Hours */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative h-[400px] rounded-xl overflow-hidden shadow-2xl">
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: 'url(https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80)'
                  }}
                />
              </div>

              <div className="bg-white p-8 rounded-xl shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Clock className="w-6 h-6 text-blue-600" />
                  </div>
                  <h2 className="text-2xl font-bold">{t.workingHours}</h2>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b">
                    <span className="text-gray-700 font-medium">{t.mondayFriday}</span>
                    <span className="text-blue-600 font-bold">09:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b">
                    <span className="text-gray-700 font-medium">{t.saturday}</span>
                    <span className="text-blue-600 font-bold">10:00 - 15:00</span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-gray-700 font-medium">{t.sunday}</span>
                    <span className="text-red-600 font-bold">{t.closed}</span>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-600">
                    <strong>{t.note}:</strong> {t.emergencyNote}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>




      </div>
      <Footer />
    </>
  );
}
