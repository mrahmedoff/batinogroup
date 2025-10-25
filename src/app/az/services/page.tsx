'use client';
import { translations } from '../../translations';
import { ClipboardDocumentListIcon, TruckIcon, CurrencyDollarIcon, CubeIcon, MagnifyingGlassIcon, LightBulbIcon, ChartBarIcon, ShieldCheckIcon, CheckCircleIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

export default function Services() {
  const t = translations.az;

  const services = [
    {
      icon: <ClipboardDocumentListIcon className="w-12 h-12 text-white" />,
      title: t.services.procurement.title,
      description: t.services.procurement.text,
      color: 'from-blue-500 to-blue-600',
      features: [
        'Təchizat strategiyalarının hazırlanması',
        'Bazar araşdırması və təhlili',
        'Təchizatçı seçimi və qiymətləndirmə',
        'Tender proseslərinin idarə edilməsi',
      ],
    },
    {
      icon: <TruckIcon className="w-12 h-12 text-white" />,
      title: t.services.supplier.title,
      description: t.services.supplier.text,
      color: 'from-purple-500 to-purple-600',
      features: [
        'Təchizatçı bazasının yaradılması',
        'Performans monitorinqi',
        'Müqavilə idarəetməsi',
        'Risk idarəetməsi',
      ],
    },
    {
      icon: <CurrencyDollarIcon className="w-12 h-12 text-white" />,
      title: t.services.cost.title,
      description: t.services.cost.text,
      color: 'from-indigo-500 to-indigo-600',
      features: [
        'Xərc təhlili və optimallaşdırma',
        'Qənaət imkanlarının müəyyənləşdirilməsi',
        'Büdcə planlaşdırması',
        'ROI hesablamaları',
      ],
    },
    {
      icon: <CubeIcon className="w-12 h-12 text-white" />,
      title: t.services.logistics.title,
      description: t.services.logistics.text,
      color: 'from-green-500 to-green-600',
      features: [
        'Beynəlxalq və yerli daşıma',
        'Anbar idarəetməsi',
        'Gömrük rəsmiləşdirilməsi',
        'Real-vaxt izləmə sistemi',
      ],
    },
    {
      icon: <MagnifyingGlassIcon className="w-12 h-12 text-white" />,
      title: t.services.quality.title,
      description: t.services.quality.text,
      color: 'from-red-500 to-red-600',
      features: [
        'Keyfiyyət standartlarının müəyyənləşdirilməsi',
        'Məhsul yoxlaması və sertifikasiya',
        'Audit və monitorinq',
        'Keyfiyyət hesabatları',
      ],
    },
    {
      icon: <LightBulbIcon className="w-12 h-12 text-white" />,
      title: t.services.consulting.title,
      description: t.services.consulting.text,
      color: 'from-yellow-500 to-yellow-600',
      features: [
        'Biznes proseslərinin təhlili',
        'Strateji planlaşdırma',
        'Rəqəmsallaşdırma həlləri',
        'Təlim və inkişaf proqramları',
      ],
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6 border border-white/20">
            <ClipboardDocumentListIcon className="w-5 h-5 mr-2" />
            <span className="text-sm font-medium">Xidmətlərimiz</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6">{t.services.title}</h1>
          <p className="text-xl max-w-3xl mx-auto opacity-90 leading-relaxed">
            Biznesinizin ehtiyaclarına uyğun hərtərəfli təchizat həlləri
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden"
              >
                <div className={`h-2 bg-gradient-to-r ${service.color}`}></div>
                <div className="p-8">
                  <div className={`w-20 h-20 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">{service.title}</h3>
                  <p className="text-gray-600 leading-relaxed mb-6">{service.description}</p>
                  <ul className="space-y-3 mb-6">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start text-sm text-gray-600">
                        <CheckCircleIcon className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button className="flex items-center text-purple-600 font-semibold hover:text-purple-700 transition-colors group">
                    <span>Ətraflı Məlumat</span>
                    <ArrowRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">İş Prosesimiz</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Sadə və effektiv 4 addımlı proses
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              {
                step: '01',
                title: 'Məsləhət',
                description: 'Ehtiyaclarınızı dinləyir və təhlil edirik',
              },
              {
                step: '02',
                title: 'Planlaşdırma',
                description: 'Optimal strategiya və həll yolları təklif edirik',
              },
              {
                step: '03',
                title: 'İcra',
                description: 'Peşəkar komanda ilə layihəni həyata keçiririk',
              },
              {
                step: '04',
                title: 'Dəstək',
                description: '24/7 davamlı dəstək və monitorinq təmin edirik',
              },
            ].map((item, index) => (
              <div key={index} className="relative">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
                {index < 3 && (
                  <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 -z-10"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Xidmətlərimizin Üstünlükləri</h2>
            <p className="text-xl text-gray-600">Niyə bizim xidmətlərimizi seçməlisiniz?</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: <ShieldCheckIcon className="w-8 h-8 text-white" />,
                title: 'Etibarlılıq',
                description: '15+ illik təcrübə və yüzlərlə uğurlu layihə',
              },
              {
                icon: <ChartBarIcon className="w-8 h-8 text-white" />,
                title: 'Effektivlik',
                description: 'Xərclərdə 30%-ə qədər qənaət',
              },
              {
                icon: <TruckIcon className="w-8 h-8 text-white" />,
                title: 'Sürət',
                description: 'Express çatdırılma və sürətli xidmət',
              },
              {
                icon: <LightBulbIcon className="w-8 h-8 text-white" />,
                title: 'İnnovasiya',
                description: 'Ən son texnologiyalar və həllər',
              },
            ].map((benefit, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Xidmət Göstərdiyimiz Sektorlar</h2>
            <p className="text-xl text-gray-600">Müxtəlif sənaye sahələrində təcrübə</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              'Neft və Qaz',
              'Tikinti',
              'İstehsalat',
              'Energetika',
              'Nəqliyyat',
              'Telekommunikasiya',
              'Qida Sənayesi',
              'Tibb və Farmakologiya',
            ].map((industry, index) => (
              <div
                key={index}
                className="p-6 bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <p className="font-semibold text-gray-800">{industry}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Xidmətlərimiz Haqqında Daha Çox Məlumat?</h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto opacity-90">
            Mütəxəssislərimizlə əlaqə saxlayın və biznesiniz üçün ən uyğun həlli tapın
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-xl">
              Pulsuz Məsləhət Alın
            </button>
            <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold hover:bg-white hover:text-blue-600 transition-all duration-300">
              Qiymət Təklifi İstəyin
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
