'use client';

import Link from 'next/link';
import { ArrowRight, Phone } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function CTA() {
  const { t } = useLanguage();

  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-purple-900 z-10" />
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80)'
        }}
      />
      
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
          {t.readyForProject}
        </h2>
        <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
          {t.readyForProjectDesc}
        </p>
        
        <div className="flex flex-wrap gap-4 justify-center">
          <Link 
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-900 font-semibold rounded-lg hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            {t.contactUs}
            <ArrowRight className="w-5 h-5" />
          </Link>
          <a 
            href="tel:+994123456789"
            className="inline-flex items-center gap-2 px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-900 transition-all"
          >
            <Phone className="w-5 h-5" />
            {t.callUs}
          </a>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6">
            <div className="text-4xl font-bold mb-2">24/7</div>
            <div className="text-blue-100">{t.support247}</div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6">
            <div className="text-4xl font-bold mb-2">100%</div>
            <div className="text-blue-100">{t.clientSatisfaction}</div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6">
            <div className="text-4xl font-bold mb-2">15+</div>
            <div className="text-blue-100">{t.yearsExperience}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
