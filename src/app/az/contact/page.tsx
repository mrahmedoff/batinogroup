'use client';
import { translations } from '../../translations';
import { EnvelopeIcon, UserIcon, ChatBubbleLeftIcon, MapPinIcon, PhoneIcon, ClockIcon, BuildingOfficeIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { useState, useEffect } from 'react';
import { trackMessage } from '../../components/Analytics';

export default function Contact() {
  const t = translations.az;
  const [content, setContent] = useState<any>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  });

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const response = await fetch('/api/content');
      const data = await response.json();
      setContent(data);
    } catch (error) {
      console.error('Failed to fetch content:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          subject: 'Vebsaytdan yeni mesaj',
        }),
      });
      
      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', phone: '', company: '', message: '' });
        setTimeout(() => setSubmitted(false), 5000);
        
        // Mesaj statistikasını yenilə
        trackMessage();
      }
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setSubmitting(false);
    }
  };

  if (!content) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6 border border-white/20">
            <PhoneIcon className="w-5 h-5 mr-2" />
            <span className="text-sm font-medium">Əlaqə</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6">{t.contact.title}</h1>
          <p className="text-xl max-w-3xl mx-auto opacity-90 leading-relaxed">
            {t.contact.text}
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <PhoneIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">{t.contact.phone}</h3>
              <p className="text-gray-600 mb-2">{content.contact.phone}</p>
              <p className="text-sm text-gray-500">{content.contact.workingHours.weekdays}</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <EnvelopeIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">{t.contact.emailLabel}</h3>
              <p className="text-gray-600 mb-2">{content.contact.email}</p>
              <p className="text-sm text-gray-500">24 saat ərzində cavab veririk</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <MapPinIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">{t.contact.address}</h3>
              <p className="text-gray-600 mb-2">{content.contact.address}</p>
              <p className="text-sm text-gray-500">Ofisimizə xoş gəlmisiniz</p>
            </div>
          </div>

          {/* Main Contact Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <div className="bg-white p-8 md:p-10 rounded-2xl shadow-xl">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Mesaj Göndərin</h2>
              
              {submitted && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center">
                  <CheckCircleIcon className="w-6 h-6 text-green-600 mr-3" />
                  <div>
                    <p className="text-green-800 font-semibold">Mesajınız uğurla göndərildi!</p>
                    <p className="text-green-600 text-sm">Tezliklə sizinlə əlaqə saxlayacağıq.</p>
                  </div>
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-left mb-2 font-semibold text-gray-700 flex items-center">
                    <UserIcon className="w-5 h-5 mr-2 text-blue-600" />
                    {t.contact.name}
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                    placeholder="Adınız və Soyadınız"
                    required
                  />
                </div>
                <div>
                  <label className="block text-left mb-2 font-semibold text-gray-700 flex items-center">
                    <EnvelopeIcon className="w-5 h-5 mr-2 text-blue-600" />
                    {t.contact.email}
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                    placeholder="email@example.com"
                    required
                  />
                </div>
                <div>
                  <label className="block text-left mb-2 font-semibold text-gray-700 flex items-center">
                    <PhoneIcon className="w-5 h-5 mr-2 text-blue-600" />
                    Telefon
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                    placeholder="+994 XX XXX XX XX"
                  />
                </div>
                <div>
                  <label className="block text-left mb-2 font-semibold text-gray-700 flex items-center">
                    <BuildingOfficeIcon className="w-5 h-5 mr-2 text-blue-600" />
                    Şirkət
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                    placeholder="Şirkət adı"
                  />
                </div>
                <div>
                  <label className="block text-left mb-2 font-semibold text-gray-700 flex items-center">
                    <ChatBubbleLeftIcon className="w-5 h-5 mr-2 text-blue-600" />
                    {t.contact.message}
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                    rows={5}
                    placeholder="Mesajınızı yazın..."
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Göndərilir...
                    </span>
                  ) : (
                    t.contact.send
                  )}
                </button>
              </form>
            </div>

            {/* Additional Info */}
            <div className="space-y-8">
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-2xl">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">İş Saatları</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700 font-medium">Bazar ertəsi - Cümə</span>
                    <span className="text-gray-600">{content.contact.workingHours.weekdays.split(': ')[1]}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700 font-medium">Şənbə</span>
                    <span className="text-gray-600">{content.contact.workingHours.saturday.split(': ')[1]}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700 font-medium">Bazar</span>
                    <span className="text-gray-600">{content.contact.workingHours.sunday.split(': ')[1]}</span>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-white rounded-lg">
                  <div className="flex items-center text-green-600">
                    <ClockIcon className="w-5 h-5 mr-2" />
                    <span className="font-semibold">24/7 Təcili Dəstək Xətti Mövcuddur</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-8 rounded-2xl">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Tez-tez Verilən Suallar</h3>
                <div className="space-y-4">
                  <details className="group">
                    <summary className="font-semibold text-gray-800 cursor-pointer flex justify-between items-center">
                      Cavab müddəti nə qədərdir?
                      <span className="text-purple-600 group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <p className="mt-2 text-gray-600 text-sm">
                      Biz 24 saat ərzində bütün sorğulara cavab veririk. Təcili hallarda dərhal əlaqə saxlayırıq.
                    </p>
                  </details>
                  <details className="group">
                    <summary className="font-semibold text-gray-800 cursor-pointer flex justify-between items-center">
                      Pulsuz məsləhət ala bilərəm?
                      <span className="text-purple-600 group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <p className="mt-2 text-gray-600 text-sm">
                      Bəli, ilkin məsləhət tamamilə pulsuzdur. Mütəxəssislərimiz sizə ən uyğun həlli təklif edəcək.
                    </p>
                  </details>
                  <details className="group">
                    <summary className="font-semibold text-gray-800 cursor-pointer flex justify-between items-center">
                      Ofisə gəlmək mümkündür?
                      <span className="text-purple-600 group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <p className="mt-2 text-gray-600 text-sm">
                      Əlbəttə! Əvvəlcədən görüş təyin etməklə ofisimizə gələ bilərsiniz.
                    </p>
                  </details>
                </div>
              </div>

              <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-8 rounded-2xl">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Sosial Media</h3>
                <p className="text-gray-600 mb-6">Bizi sosial şəbəkələrdə izləyin</p>
                <div className="flex gap-4">
                  <a
                    href="#"
                    className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    <span className="font-bold">f</span>
                  </a>
                  <a
                    href="#"
                    className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-blue-400 hover:text-white transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    <span className="font-bold">t</span>
                  </a>
                  <a
                    href="#"
                    className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-blue-700 hover:text-white transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    <span className="font-bold">in</span>
                  </a>
                  <a
                    href="#"
                    className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-red-600 hover:text-white transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    <span className="font-bold">yt</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Ofisimizin Yeri</h2>
            <p className="text-xl text-gray-600">Bakı şəhərinin mərkəzində yerləşirik</p>
          </div>
          <div className="max-w-5xl mx-auto">
            <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl overflow-hidden shadow-xl h-96 flex items-center justify-center">
              <div className="text-center">
                <MapPinIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 font-semibold">Xəritə burada göstəriləcək</p>
                <p className="text-sm text-gray-500 mt-2">{t.footer.address}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Hələ də Sualınız Var?</h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto opacity-90">
            Bizimlə əlaqə saxlamaqdan çəkinməyin. Komandamız sizə kömək etməyə hazırdır.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`tel:${t.footer.phone}`}
              className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-xl inline-flex items-center justify-center"
            >
              <PhoneIcon className="w-5 h-5 mr-2" />
              İndi Zəng Edin
            </a>
            <a
              href={`mailto:${t.footer.email}`}
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold hover:bg-white hover:text-blue-600 transition-all duration-300 inline-flex items-center justify-center"
            >
              <EnvelopeIcon className="w-5 h-5 mr-2" />
              Email Göndərin
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
