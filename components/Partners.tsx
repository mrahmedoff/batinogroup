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

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {partnersList.length > 0 ? (
            partnersList.map((partner) => (
              <div 
                key={partner.id}
                className="flex items-center justify-center p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group"
              >
                {partner.logo ? (
                  <img 
                    src={partner.logo} 
                    alt={partner.name}
                    className="max-w-full h-auto opacity-60 group-hover:opacity-100 transition-opacity grayscale group-hover:grayscale-0"
                  />
                ) : (
                  <div className="w-24 h-12 bg-gray-200 rounded flex items-center justify-center text-gray-500 text-sm font-medium">
                    {partner.name}
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="col-span-6 text-center py-12 text-gray-500">
              {t.noPartners}
            </div>
          )}
        </div>

        <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-center text-white">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            {t.becomePartner}
          </h3>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            {t.becomePartnerDesc}
          </p>
          <a 
            href={`/${language}/contact`}
            className="inline-block px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors shadow-lg"
          >
            {t.contactUs}
          </a>
        </div>
      </div>
    </section>
  );
}
