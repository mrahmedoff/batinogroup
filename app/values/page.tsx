'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { Shield, Lightbulb, Award, Users, Leaf, Handshake, CheckCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

function ValuesPage() {
  const { t } = useLanguage();

  const values = [
    {
      icon: Shield,
      title: t.integrity,
      description: t.integrityDesc,
      color: 'blue'
    },
    {
      icon: Lightbulb,
      title: t.innovation,
      description: t.innovationDesc,
      color: 'yellow'
    },
    {
      icon: Award,
      title: t.excellence,
      description: t.excellenceDesc,
      color: 'purple'
    },
    {
      icon: Users,
      title: t.customerFocus,
      description: t.customerFocusDesc,
      color: 'green'
    },
    {
      icon: Leaf,
      title: t.sustainability,
      description: t.sustainabilityDesc,
      color: 'emerald'
    },
    {
      icon: Handshake,
      title: t.collaboration,
      description: t.collaborationDesc,
      color: 'orange'
    }
  ];

  const colorClasses = {
    blue: 'from-blue-500 to-blue-700',
    yellow: 'from-yellow-500 to-yellow-600',
    purple: 'from-purple-500 to-purple-700',
    green: 'from-green-500 to-green-700',
    emerald: 'from-emerald-500 to-emerald-700',
    orange: 'from-orange-500 to-orange-700'
  };

  return (
    <>
      <Header />
      <div className="pt-20">
        <section className="relative h-[400px] flex items-center">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/95 to-blue-900/90 z-10" />
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920&q=80)'
            }}
          />
          <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{t.valuesPageTitle}</h1>
            <p className="text-xl text-blue-100 max-w-3xl">
              {t.valuesHeroDesc}
            </p>
          </div>
        </section>

        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.ourCoreValues}</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <div 
                    key={index}
                    className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 overflow-hidden group"
                  >
                    <div className={`h-2 bg-gradient-to-r ${colorClasses[value.color as keyof typeof colorClasses]}`} />
                    <div className="p-8">
                      <div className={`w-16 h-16 bg-gradient-to-br ${colorClasses[value.color as keyof typeof colorClasses]} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold mb-4">{value.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{value.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">{t.howWeWork}</h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Our values define how we work every day, make decisions, and maintain relationships with our clients.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold mb-1">Şəffaflıq</h4>
                      <p className="text-gray-600 text-sm">Bütün proseslərdə açıq və şəffaf ünsiyyət</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold mb-1">Məsuliyyət</h4>
                      <p className="text-gray-600 text-sm">Öhdəliklərimizə tam sadiqlik</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold mb-1">Keyfiyyət</h4>
                      <p className="text-gray-600 text-sm">Hər işdə ən yüksək standartlar</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold mb-1">İnkişaf</h4>
                      <p className="text-gray-600 text-sm">Daimi öyrənmə və təkmilləşmə</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative h-[500px] rounded-xl overflow-hidden shadow-2xl">
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: 'url(https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80)'
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-r from-blue-900 to-purple-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Dəyərlərimizi paylaşırsınız?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Contact us to learn more about our values and work together
            </p>
            <Link 
              href="/contact"
              className="inline-block px-8 py-4 bg-white text-blue-900 font-semibold rounded-lg hover:bg-blue-50 transition-colors shadow-lg"
            >
              {t.contact}
            </Link>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}


export default ValuesPage;
