'use client';

import Link from 'next/link';
import { useData } from '@/contexts/DataContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Settings, Zap, Wrench, Headphones, LucideIcon, ArrowRight } from 'lucide-react';

// Icon mapping
const iconMap: Record<string, LucideIcon> = {
  Settings,
  Zap,
  Wrench,
  Headphones,
};

const serviceImages = [
  'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&q=80',
  'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=600&q=80',
  'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&q=80',
  'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80',
];

export default function Services() {
  const { services } = useData();
  const { t } = useLanguage();

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t.ourServices}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t.servicesHeroDesc}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => {
            const IconComponent = iconMap[service.icon] || Settings;
            return (
              <div 
                key={service.id}
                className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all overflow-hidden transform hover:-translate-y-2 cursor-pointer"
              >
                <div className="relative h-48 overflow-hidden">
                  <div 
                    className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                    style={{
                      backgroundImage: `url(${serviceImages[index % serviceImages.length]})`
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <div className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-lg flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {service.description}
                  </p>
                  <button className="text-blue-600 font-semibold text-sm inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                    {t.readMore}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Link 
            href="/services"
            className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
          >
            {t.learnMore}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
