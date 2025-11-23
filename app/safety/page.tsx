'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { Shield, Users, Wrench, ClipboardCheck, Award, AlertTriangle, CheckCircle, HardHat } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

function SafetyPage() {
  const { t } = useLanguage();

  const safetyFeatures = [
    {
      icon: Shield,
      title: t.safetyPolicy,
      description: t.safetyPolicyDesc,
      color: 'blue'
    },
    {
      icon: Users,
      title: t.safetyTraining,
      description: t.safetyTrainingDesc,
      color: 'green'
    },
    {
      icon: HardHat,
      title: t.safetyEquipment,
      description: t.safetyEquipmentDesc,
      color: 'orange'
    },
    {
      icon: ClipboardCheck,
      title: t.safetyInspection,
      description: t.safetyInspectionDesc,
      color: 'purple'
    }
  ];

  return (
    <>
      <Header />
      <div className="pt-20">
        {/* Hero Section */}
        <section className="relative h-[400px] flex items-center">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-900/95 to-red-900/90 z-10" />
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=80)'
            }}
          />
          <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
            <div className="flex items-center gap-4 mb-6">
              <Shield className="w-16 h-16" />
              <h1 className="text-4xl md:text-5xl font-bold">{t.safetyPageTitle}</h1>
            </div>
            <p className="text-xl text-orange-100 max-w-3xl">
              {t.safetyHeroDesc}
            </p>
          </div>
        </section>

        {/* Safety First Banner */}
        <section className="py-12 bg-orange-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <AlertTriangle className="w-16 h-16 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">{t.safetyFirst}</h2>
            <p className="text-xl text-orange-100 max-w-2xl mx-auto">
              {t.zeroAccidents}
            </p>
          </div>
        </section>

        {/* Safety Features */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {safetyFeatures.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div 
                    key={index}
                    className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all p-8"
                  >
                    <div className={`w-16 h-16 bg-gradient-to-br from-${feature.color}-500 to-${feature.color}-700 rounded-xl flex items-center justify-center mb-6`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Safety Standards */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.safetyStandards}</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-8 bg-blue-50 rounded-xl">
                <Award className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3">ISO 45001</h3>
                <p className="text-gray-600">Occupational Health and Safety Management System</p>
              </div>

              <div className="text-center p-8 bg-green-50 rounded-xl">
                <Award className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3">OHSAS 18001</h3>
                <p className="text-gray-600">Peşə Sağlamlığı və Təhlükəsizliyi Standartı</p>
              </div>

              <div className="text-center p-8 bg-purple-50 rounded-xl">
                <Award className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3">NEBOSH</h3>
                <p className="text-gray-600">Beynəlxalq Təhlükəsizlik Sertifikatı</p>
              </div>
            </div>
          </div>
        </section>

        {/* Safety Checklist */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative h-[500px] rounded-xl overflow-hidden shadow-2xl">
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: 'url(https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80)'
                  }}
                />
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Təhlükəsizlik Tədbirlərimiz</h2>
                <div className="space-y-4">
                  {[
                    'Gündəlik təhlükəsizlik brifinqləri',
                    'Fərdi qoruyucu avadanlıq (FQA) istifadəsi',
                    'Workplace safety inspection',
                    'Təcili vəziyyət planları və təlimləri',
                    'Safety alarm systems',
                    'Tibbi yardım və ilk yardım avadanlığı',
                    'Qəza hesabatı və təhlili',
                    'Davamlı təkmilləşdirmə proqramları'
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}

export default SafetyPage;
