'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { Award, CheckCircle, FileCheck } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

function CertificatesPage() {
  const { t, language } = useLanguage();

  const certificates = [
    {
      title: 'ISO 9001:2015',
      category: t.qualityCertificates,
      description: language === 'az' ? 'Keyfiyyət İdarəetmə Sistemi' : 'Quality Management System',
      year: '2020',
      image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&q=80'
    },
    {
      title: 'ISO 14001:2015',
      category: t.qualityCertificates,
      description: language === 'az' ? 'Ətraf Mühit İdarəetmə Sistemi' : 'Environmental Management System',
      year: '2020',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80'
    },
    {
      title: 'ISO 45001:2018',
      category: t.qualityCertificates,
      description: language === 'az' ? 'İş Sağlamlığı və Təhlükəsizliyi' : 'Occupational Health and Safety',
      year: '2021',
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80'
    },
    {
      title: 'OHSAS 18001',
      category: t.industryCertificates,
      description: language === 'az' ? 'Peşə Sağlamlığı və Təhlükəsizliyi' : 'Occupational Health and Safety',
      year: '2019',
      image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&q=80'
    },
    {
      title: 'API Certification',
      category: t.industryCertificates,
      description: language === 'az' ? 'Neft Sənayesi Sertifikatı' : 'Oil Industry Certification',
      year: '2021',
      image: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=600&q=80'
    },
    {
      title: 'CE Marking',
      category: t.industryCertificates,
      description: language === 'az' ? 'Avropa Uyğunluq Sertifikatı' : 'European Conformity Certificate',
      year: '2020',
      image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&q=80'
    }
  ];

  return (
    <>
      <Header />
      <div className="pt-20">
        {/* Hero Section */}
        <section className="relative h-[400px] flex items-center">
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/95 to-emerald-900/90 z-10" />
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1920&q=80)'
            }}
          />
          <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
            <div className="flex items-center gap-4 mb-6">
              <Award className="w-16 h-16" />
              <h1 className="text-4xl md:text-5xl font-bold">{t.certificatesPageTitle}</h1>
            </div>
            <p className="text-xl text-green-100 max-w-3xl">
              {t.certificatesHeroDesc}
            </p>
          </div>
        </section>

        {/* Certificates Grid */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {certificates.map((cert, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all overflow-hidden group"
                >
                  <div className="relative h-48 overflow-hidden">
                    <div 
                      className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                      style={{
                        backgroundImage: `url(${cert.image})`
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <span className="px-3 py-1 bg-green-600 text-white text-xs font-semibold rounded-full">
                        {cert.year}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <FileCheck className="w-5 h-5 text-green-600" />
                      <span className="text-sm text-green-600 font-semibold">{cert.category}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{cert.title}</h3>
                    <p className="text-gray-600 text-sm">{cert.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quality Commitment */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {language === 'az' ? 'Keyfiyyət Öhdəliyimiz' : 'Our Quality Commitment'}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-8">
                <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3">
                  {language === 'az' ? 'Beynəlxalq Standartlar' : 'International Standards'}
                </h3>
                <p className="text-gray-600">
                  {language === 'az' 
                    ? 'Bütün fəaliyyətlərimizdə beynəlxalq keyfiyyət standartlarına riayət edirik'
                    : 'We comply with international quality standards in all our activities'}
                </p>
              </div>

              <div className="text-center p-8">
                <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3">
                  {language === 'az' ? 'Davamlı Təkmilləşdirmə' : 'Continuous Improvement'}
                </h3>
                <p className="text-gray-600">
                  {language === 'az'
                    ? 'Proseslərimizi daim təkmilləşdirir və yeniləyirik'
                    : 'We constantly improve and update our processes'}
                </p>
              </div>

              <div className="text-center p-8">
                <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3">
                  {language === 'az' ? 'Müştəri Məmnuniyyəti' : 'Customer Satisfaction'}
                </h3>
                <p className="text-gray-600">
                  {language === 'az'
                    ? 'Müştəri məmnuniyyəti bizim əsas prioritetimizdir'
                    : 'Customer satisfaction is our top priority'}
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}

export default CertificatesPage;
