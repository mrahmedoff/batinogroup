'use client';
import { translations } from '../../translations';
import { BuildingOfficeIcon, UserGroupIcon, LightBulbIcon, TrophyIcon, HeartIcon, ShieldCheckIcon, RocketLaunchIcon, SparklesIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

export default function About() {
  const t = translations.az;

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6 border border-white/20">
            <BuildingOfficeIcon className="w-5 h-5 mr-2" />
            <span className="text-sm font-medium">Haqqımızda</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6">{t.about.title}</h1>
          <p className="text-xl max-w-3xl mx-auto opacity-90 leading-relaxed">
            15+ illik təcrübə ilə Azərbaycanda təchizat sahəsində lider şirkət
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div className="text-center">
                <div className="text-5xl font-bold text-blue-600 mb-2">2010</div>
                <p className="text-gray-600">Təsis ili</p>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-purple-600 mb-2">1500+</div>
                <p className="text-gray-600">Aktiv müştəri</p>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-indigo-600 mb-2">50+</div>
                <p className="text-gray-600">Ölkə əhatəsi</p>
              </div>
            </div>

            <div className="space-y-8 text-lg text-gray-700 leading-relaxed">
              <div className="flex items-start space-x-4 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
                <UserGroupIcon className="w-8 h-8 text-blue-600 mt-1 flex-shrink-0" />
                <p>{t.about.text1}</p>
              </div>
              <div className="flex items-start space-x-4 p-6 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl">
                <BuildingOfficeIcon className="w-8 h-8 text-purple-600 mt-1 flex-shrink-0" />
                <p>{t.about.text2}</p>
              </div>
              <div className="flex items-start space-x-4 p-6 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl">
                <SparklesIcon className="w-8 h-8 text-indigo-600 mt-1 flex-shrink-0" />
                <p>{t.about.text3}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6">
                <TrophyIcon className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">{t.about.mission}</h3>
              <p className="text-gray-600 leading-relaxed">{t.about.missionText}</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-6">
                <RocketLaunchIcon className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">{t.about.vision}</h3>
              <p className="text-gray-600 leading-relaxed">{t.about.visionText}</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center mb-6">
                <HeartIcon className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">{t.about.values}</h3>
              <p className="text-gray-600 leading-relaxed">{t.about.valuesText}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Niyə Bizi Seçməlisiniz?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Biznesinizin uğuru üçün etibarlı tərəfdaş
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: <ShieldCheckIcon className="w-8 h-8 text-white" />,
                title: 'Etibarlılıq',
                description: 'ISO 9001 sertifikatlı proseslər və 15+ illik təcrübə ilə tam etibarlılıq.',
              },
              {
                icon: <UserGroupIcon className="w-8 h-8 text-white" />,
                title: 'Peşəkar Komanda',
                description: '100+ mütəxəssis ilə hər bir layihəyə fərdi yanaşma və peşəkar dəstək.',
              },
              {
                icon: <LightBulbIcon className="w-8 h-8 text-white" />,
                title: 'İnnovativ Həllər',
                description: 'Ən son texnologiyalar və innovativ yanaşmalarla optimal həllər.',
              },
              {
                icon: <TrophyIcon className="w-8 h-8 text-white" />,
                title: 'Keyfiyyət Zəmanəti',
                description: 'Hər bir məhsul və xidmət üçün 100% keyfiyyət zəmanəti.',
              },
              {
                icon: <RocketLaunchIcon className="w-8 h-8 text-white" />,
                title: 'Sürətli Xidmət',
                description: 'Express çatdırılma və 24/7 dəstək ilə sürətli xidmət.',
              },
              {
                icon: <HeartIcon className="w-8 h-8 text-white" />,
                title: 'Müştəri Məmnuniyyəti',
                description: '98% müştəri məmnuniyyəti və uzunmüddətli əməkdaşlıq.',
              },
            ].map((item, index) => (
              <div key={index} className="p-6 bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl hover:shadow-lg transition-all duration-300">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Komandamız</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Peşəkar və təcrübəli mütəxəssislər komandası
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              { name: 'Rəşad Əliyev', position: 'Baş Direktor', experience: '20+ il təcrübə' },
              { name: 'Leyla Məmmədova', position: 'Təchizat Direktoru', experience: '15+ il təcrübə' },
              { name: 'Elçin Həsənov', position: 'Logistika Meneceri', experience: '12+ il təcrübə' },
              { name: 'Nigar Quliyeva', position: 'Keyfiyyət Meneceri', experience: '10+ il təcrübə' },
            ].map((member, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <UserGroupIcon className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{member.name}</h3>
                <p className="text-purple-600 font-semibold mb-2">{member.position}</p>
                <p className="text-sm text-gray-500">{member.experience}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Sertifikatlar və Akkreditasiyalar</h2>
            <p className="text-xl text-gray-600">Beynəlxalq standartlara uyğunluq</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { title: 'ISO 9001:2015', description: 'Keyfiyyət İdarəetmə Sistemi' },
              { title: 'ISO 14001:2015', description: 'Ətraf Mühit İdarəetmə Sistemi' },
              { title: 'ISO 45001:2018', description: 'İş Sağlamlığı və Təhlükəsizliyi' },
            ].map((cert, index) => (
              <div key={index} className="p-8 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl text-center hover:shadow-lg transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <CheckCircleIcon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{cert.title}</h3>
                <p className="text-gray-600">{cert.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Bizimlə Əməkdaşlığa Başlayın</h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto opacity-90">
            Biznesinizi növbəti səviyyəyə çıxarmaq üçün bu gün bizimlə əlaqə saxlayın
          </p>
          <button className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-xl">
            Əlaqə Saxlayın
          </button>
        </div>
      </section>
    </>
  );
}
