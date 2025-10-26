'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { Handshake, Building2, Award, TrendingUp } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

function ClientsPartnersPage() {
  const { t, language } = useLanguage();

  const clients = [
    { id: 1, name: 'SOCAR', logo: 'https://via.placeholder.com/200x80/1e40af/ffffff?text=SOCAR' },
    { id: 2, name: 'BP', logo: 'https://via.placeholder.com/200x80/059669/ffffff?text=BP' },
    { id: 3, name: 'Azerenerji', logo: 'https://via.placeholder.com/200x80/dc2626/ffffff?text=Azerenerji' },
    { id: 4, name: 'Azercell', logo: 'https://via.placeholder.com/200x80/7c3aed/ffffff?text=Azercell' },
    { id: 5, name: 'Bakcell', logo: 'https://via.placeholder.com/200x80/ea580c/ffffff?text=Bakcell' },
    { id: 6, name: 'Aztelekom', logo: 'https://via.placeholder.com/200x80/0891b2/ffffff?text=Aztelekom' },
    { id: 7, name: 'TANAP', logo: 'https://via.placeholder.com/200x80/16a34a/ffffff?text=TANAP' },
    { id: 8, name: 'Azerishiq', logo: 'https://via.placeholder.com/200x80/ca8a04/ffffff?text=Azerishiq' },
  ];

  const partners = [
    { id: 1, name: 'Siemens', logo: 'https://via.placeholder.com/200x80/0ea5e9/ffffff?text=Siemens' },
    { id: 2, name: 'ABB', logo: 'https://via.placeholder.com/200x80/ef4444/ffffff?text=ABB' },
    { id: 3, name: 'Schneider Electric', logo: 'https://via.placeholder.com/200x80/10b981/ffffff?text=Schneider' },
    { id: 4, name: 'General Electric', logo: 'https://via.placeholder.com/200x80/3b82f6/ffffff?text=GE' },
  ];

  return (
    <>
      <Header />
      <div className="pt-20">
        {/* Hero Section */}
        <section className="relative h-[400px] flex items-center">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/95 to-purple-900/90 z-10" />
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1920&q=80)'
            }}
          />
          <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
            <div className="flex items-center gap-4 mb-6">
              <Handshake className="w-16 h-16" />
              <h1 className="text-4xl md:text-5xl font-bold">{t.clientsPartnersPageTitle}</h1>
            </div>
            <p className="text-xl text-indigo-100 max-w-3xl">
              {t.clientsPartnersHeroDesc}
            </p>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 bg-indigo-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold mb-2">50+</div>
                <div className="text-indigo-200">
                  {language === 'az' ? 'Aktiv Müştəri' : 'Active Clients'}
                </div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">200+</div>
                <div className="text-indigo-200">
                  {language === 'az' ? 'Tamamlanmış Layihə' : 'Completed Projects'}
                </div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">15+</div>
                <div className="text-indigo-200">
                  {language === 'az' ? 'İl Təcrübə' : 'Years Experience'}
                </div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">98%</div>
                <div className="text-indigo-200">
                  {language === 'az' ? 'Müştəri Məmnuniyyəti' : 'Client Satisfaction'}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Clients */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.ourClients}</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                {language === 'az' 
                  ? 'Etibarlı müştərilərimizlə uzunmüddətli əməkdaşlıq' 
                  : 'Long-term cooperation with our trusted clients'}
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {clients.map((client) => (
                <div 
                  key={client.id}
                  className="flex items-center justify-center p-8 bg-white rounded-xl hover:shadow-lg transition-shadow group"
                >
                  <img 
                    src={client.logo} 
                    alt={client.name}
                    className="max-w-full h-auto opacity-60 group-hover:opacity-100 transition-opacity grayscale group-hover:grayscale-0"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Strategic Partners */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.strategicPartners}</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                {language === 'az'
                  ? 'Dünya brendləri ilə strateji tərəfdaşlıq'
                  : 'Strategic partnership with world brands'}
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
              {partners.map((partner) => (
                <div 
                  key={partner.id}
                  className="flex items-center justify-center p-8 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow group"
                >
                  <img 
                    src={partner.logo} 
                    alt={partner.name}
                    className="max-w-full h-auto opacity-60 group-hover:opacity-100 transition-opacity grayscale group-hover:grayscale-0"
                  />
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-8 bg-blue-50 rounded-xl">
                <Building2 className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3">
                  {language === 'az' ? 'Güclü Əlaqələr' : 'Strong Relationships'}
                </h3>
                <p className="text-gray-600">
                  {language === 'az'
                    ? 'Uzunmüddətli və etibarlı əməkdaşlıq'
                    : 'Long-term and reliable cooperation'}
                </p>
              </div>

              <div className="text-center p-8 bg-green-50 rounded-xl">
                <Award className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3">
                  {language === 'az' ? 'Qarşılıqlı Uğur' : 'Mutual Success'}
                </h3>
                <p className="text-gray-600">
                  {language === 'az'
                    ? 'Hər iki tərəf üçün faydalı nəticələr'
                    : 'Beneficial results for both parties'}
                </p>
              </div>

              <div className="text-center p-8 bg-purple-50 rounded-xl">
                <TrendingUp className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3">
                  {language === 'az' ? 'Birgə İnkişaf' : 'Joint Development'}
                </h3>
                <p className="text-gray-600">
                  {language === 'az'
                    ? 'Birlikdə böyümə və inkişaf'
                    : 'Growing and developing together'}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-r from-indigo-900 to-purple-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {t.becomePartner}
            </h2>
            <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
              {language === 'az'
                ? 'Bizimlə əməkdaşlıq etmək və uğurlu layihələr həyata keçirmək üçün əlaqə saxlayın'
                : 'Contact us to collaborate and implement successful projects'}
            </p>
            <Link 
              href="/contact"
              className="inline-block px-8 py-4 bg-white text-indigo-900 font-semibold rounded-lg hover:bg-indigo-50 transition-colors shadow-lg"
            >
              {t.contactUs}
            </Link>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}

export default ClientsPartnersPage;
