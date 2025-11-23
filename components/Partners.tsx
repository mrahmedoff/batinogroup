'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { useData } from '@/contexts/DataContext';

export default function Partners() {
  const { language, t } = useLanguage();
  const { partners } = useData();

  // Filter only partners (type: 'Tərəfdaş') with valid data
  const partnersList = partners.filter(partner => 
    partner.type === 'Tərəfdaş' && 
    partner.name && 
    partner.name.trim() !== ''
  );

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t.ourPartners}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t.partnersDesc}
          </p>
        </div>

        {partnersList.length > 0 ? (
          <div className="relative overflow-hidden">
            <div className="flex animate-marquee space-x-8">
              {/* İlk set */}
              {partnersList.map((partner, index) => (
                <div 
                  key={`first-${partner.id || `partner-${index}`}`}
                  className="flex-shrink-0 flex items-center justify-center w-80 h-40 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group"
                >
                  {partner.logo ? (
                    <img 
                      src={partner.logo} 
                      alt={partner.name}
                      className="w-full h-full object-contain opacity-60 group-hover:opacity-100 transition-opacity grayscale group-hover:grayscale-0"
                    />
                  ) : (
                    <div className="text-gray-500 text-sm font-medium text-center">
                      {partner.name}
                    </div>
                  )}
                </div>
              ))}
              {/* İkinci set (seamless loop için) */}
              {partnersList.map((partner, index) => (
                <div 
                  key={`second-${partner.id || `partner-${index}`}`}
                  className="flex-shrink-0 flex items-center justify-center w-80 h-40 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group"
                >
                  {partner.logo ? (
                    <img 
                      src={partner.logo} 
                      alt={partner.name}
                      className="w-full h-full object-contain opacity-60 group-hover:opacity-100 transition-opacity grayscale group-hover:grayscale-0"
                    />
                  ) : (
                    <div className="text-gray-500 text-sm font-medium text-center">
                      {partner.name}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            {t.noPartners}
          </div>
        )}

        <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-center text-white">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            {t.becomePartner}
          </h3>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            {t.becomePartnerDesc}
          </p>
          <a 
            href="/contact"
            className="inline-block px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors shadow-lg"
          >
            {t.contactUs}
          </a>
        </div>
      </div>
    </section>
  );
}
