'use client';

import { useData } from '@/contexts/DataContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { CheckCircle, ArrowRight, Settings, Zap, Wrench, Headphones } from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ServicesPage() {
  const { services } = useData();
  const { t } = useLanguage();

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
              backgroundImage: 'url(https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1920&q=80)'
            }}
          />
          <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{t.services}</h1>
            <p className="text-xl text-blue-100 max-w-3xl">
              {t.servicesHeroDesc}
            </p>
          </div>
        </section>

        {/* Services Grid with Images */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => {
                const images = [
                  'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&q=80',
                  'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600&q=80',
                  'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&q=80',
                  'https://images.unsplash.com/photo-1581092918484-8313e1f7e8c7?w=600&q=80',
                ];

                // Icon mapping
                const iconMap: Record<string, any> = {
                  Settings: () => <Settings className="w-12 h-12 text-white" />,
                  Zap: () => <Zap className="w-12 h-12 text-white" />,
                  Wrench: () => <Wrench className="w-12 h-12 text-white" />,
                  Headphones: () => <Headphones className="w-12 h-12 text-white" />,
                };

                const IconComponent = iconMap[service.icon] || iconMap.Settings;

                return (
                  <div
                    key={service.id}
                    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all group"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <div
                        className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-300"
                        style={{
                          backgroundImage: `url(${images[index % images.length]})`
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                      <div className="absolute bottom-4 left-4">
                        <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                          <IconComponent />
                        </div>
                      </div>
                    </div>
                    <div className="p-8">
                      <h3 className="text-2xl font-bold mb-4 group-hover:text-blue-600 transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 mb-6 leading-relaxed">
                        {service.description}
                      </p>
                      <button className="text-blue-600 font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
                        {t.learnMore}
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Why Choose Us with Image */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">{t.whyChooseUs}</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative h-[400px] rounded-xl overflow-hidden shadow-2xl">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: 'url(https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80)'
                  }}
                />
              </div>
              <div className="grid grid-cols-1 gap-6">
                <div className="flex gap-4 bg-white p-6 rounded-xl shadow">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold mb-2">{t.professionalTeam}</h3>
                    <p className="text-gray-600">{t.professionalTeamDetail}</p>
                  </div>
                </div>
                <div className="flex gap-4 bg-white p-6 rounded-xl shadow">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold mb-2">{t.qualityWork}</h3>
                    <p className="text-gray-600">{t.qualityWorkDetail}</p>
                  </div>
                </div>
                <div className="flex gap-4 bg-white p-6 rounded-xl shadow">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold mb-2">{t.timelyDelivery}</h3>
                    <p className="text-gray-600">{t.timelyDeliveryDetail}</p>
                  </div>
                </div>
                <div className="flex gap-4 bg-white p-6 rounded-xl shadow">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold mb-2">{t.support247}</h3>
                    <p className="text-gray-600">{t.support247Detail}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-blue-900 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-6">{t.readyForProject}</h2>
            <p className="text-xl text-blue-100 mb-8">
              {t.readyForProjectDesc}
            </p>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-900 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              {t.contactUs}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
