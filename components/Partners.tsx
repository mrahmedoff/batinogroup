'use client';

import { useLanguage } from '@/contexts/LanguageContext';

export default function Partners() {
  const { language } = useLanguage();

  const partners = [
    { id: 1, name: 'SOCAR', logo: 'https://via.placeholder.com/150x60/1e40af/ffffff?text=SOCAR' },
    { id: 2, name: 'BP', logo: 'https://via.placeholder.com/150x60/059669/ffffff?text=BP' },
    { id: 3, name: 'Azerenerji', logo: 'https://via.placeholder.com/150x60/dc2626/ffffff?text=Azerenerji' },
    { id: 4, name: 'Azercell', logo: 'https://via.placeholder.com/150x60/7c3aed/ffffff?text=Azercell' },
    { id: 5, name: 'Bakcell', logo: 'https://via.placeholder.com/150x60/ea580c/ffffff?text=Bakcell' },
    { id: 6, name: 'Aztelekom', logo: 'https://via.placeholder.com/150x60/0891b2/ffffff?text=Aztelekom' },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {language === 'az' ? 'Tərəfdaşlarımız' : 'Our Partners'}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {language === 'az' 
              ? 'Etibarlı tərəfdaşlarımızla birlikdə uğura doğru' 
              : 'Together with our trusted partners towards success'}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {partners.map((partner) => (
            <div 
              key={partner.id}
              className="flex items-center justify-center p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group"
            >
              <img 
                src={partner.logo} 
                alt={partner.name}
                className="max-w-full h-auto opacity-60 group-hover:opacity-100 transition-opacity grayscale group-hover:grayscale-0"
              />
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-center text-white">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            {language === 'az' 
              ? 'Tərəfdaşımız olmaq istəyirsiniz?' 
              : 'Want to become our partner?'}
          </h3>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            {language === 'az'
              ? 'Bizimlə əməkdaşlıq etmək və uğurlu layihələr həyata keçirmək üçün əlaqə saxlayın'
              : 'Contact us to collaborate and implement successful projects'}
          </p>
          <a 
            href="/contact"
            className="inline-block px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors shadow-lg"
          >
            {language === 'az' ? 'Əlaqə saxlayın' : 'Contact Us'}
          </a>
        </div>
      </div>
    </section>
  );
}
