'use client';

import { useData } from '@/contexts/DataContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Target, Eye, Award, Users } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function AboutPage() {
  const { team } = useData();
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
            backgroundImage: 'url(https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80)'
          }}
        />
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{t.whoWeAre}</h1>
          <p className="text-xl text-blue-100 max-w-3xl">
            {t.aboutHeroDesc}
          </p>
        </div>
      </section>

      {/* Company Story with Image */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">{t.ourStory}</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                2010-cu ildə qurulan BatinoGroup, təchizat və mühəndislik sahəsində innovativ həllər təqdim edən 
                lider şirkətlərdən biridir. 15 illik təcrübəmiz ərzində 200-dən çox uğurlu layihə həyata keçirmişik.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                Komandamız 50-dən çox peşəkar mütəxəssisdən ibarətdir və hər biri öz sahəsində ekspertdir. 
                Müştərilərimizin etibarı və məmnuniyyəti bizim ən böyük motivasiyamızdır.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Beynəlxalq standartlara uyğun xidmətlərimizlə regionda lider mövqeyini qoruyuruq və 
                daim inkişaf edərək gələcəyə inamlı addımlarla irəliləyirik.
              </p>
            </div>
            <div className="relative h-[400px] rounded-xl overflow-hidden shadow-2xl">
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: 'url(https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80)'
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision with Images */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-blue-500 to-blue-700 relative">
                <div 
                  className="absolute inset-0 bg-cover bg-center opacity-30"
                  style={{
                    backgroundImage: 'url(https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80)'
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Target className="w-16 h-16 text-white" />
                </div>
              </div>
              <div className="p-8">
                <h2 className="text-2xl font-bold mb-4">{t.ourMission}</h2>
                <p className="text-gray-600 leading-relaxed">
                  Müştərilərimizə ən yüksək keyfiyyətli təchizat həlləri və mühəndislik xidmətləri təqdim etmək, 
                  onların biznes məqsədlərinə çatmalarına kömək etmək və sənayedə innovasiya standartlarını müəyyənləşdirmək.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-purple-500 to-purple-700 relative">
                <div 
                  className="absolute inset-0 bg-cover bg-center opacity-30"
                  style={{
                    backgroundImage: 'url(https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80)'
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Eye className="w-16 h-16 text-white" />
                </div>
              </div>
              <div className="p-8">
                <h2 className="text-2xl font-bold mb-4">{t.ourVision}</h2>
                <p className="text-gray-600 leading-relaxed">
                  Regionda təchizat və mühəndislik sahəsində ən etibarlı və innovativ şirkət olmaq, 
                  beynəlxalq standartlara uyğun xidmətlərlə müştərilərimizin uzunmüddətli tərəfdaşı olmaq.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values with Images */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">{t.ourValues}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="h-40 bg-gradient-to-br from-green-400 to-green-600 relative">
                <div 
                  className="absolute inset-0 bg-cover bg-center opacity-20"
                  style={{
                    backgroundImage: 'url(https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80)'
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Award className="w-12 h-12 text-white" />
                </div>
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold mb-3">{t.quality}</h3>
                <p className="text-gray-600">
                  {t.qualityDesc}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="h-40 bg-gradient-to-br from-blue-400 to-blue-600 relative">
                <div 
                  className="absolute inset-0 bg-cover bg-center opacity-20"
                  style={{
                    backgroundImage: 'url(https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80)'
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Users className="w-12 h-12 text-white" />
                </div>
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold mb-3">{t.teamwork}</h3>
                <p className="text-gray-600">
                  {t.teamworkDesc}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="h-40 bg-gradient-to-br from-orange-400 to-orange-600 relative">
                <div 
                  className="absolute inset-0 bg-cover bg-center opacity-20"
                  style={{
                    backgroundImage: 'url(https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80)'
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Target className="w-12 h-12 text-white" />
                </div>
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold mb-3">{t.goalOriented}</h3>
                <p className="text-gray-600">
                  {t.goalOrientedDesc}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section with Images */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{t.ourTeam}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t.professionalTeamDesc}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {team.map((member, index) => {
              const images = [
                'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80',
                'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80',
                'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80',
                'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&q=80',
              ];
              return (
                <div key={member.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all group">
                  <div className="aspect-square relative overflow-hidden">
                    <div 
                      className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-300"
                      style={{
                        backgroundImage: `url(${images[index % images.length]})`
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="text-lg font-bold mb-1">{member.name}</h3>
                    <p className="text-sm text-blue-600 font-medium">{member.position}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Office Gallery */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{t.ourOffice}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t.modernWorkspace}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="relative h-64 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow">
              <div 
                className="absolute inset-0 bg-cover bg-center hover:scale-110 transition-transform duration-300"
                style={{
                  backgroundImage: 'url(https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=600&q=80)'
                }}
              />
            </div>
            <div className="relative h-64 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow">
              <div 
                className="absolute inset-0 bg-cover bg-center hover:scale-110 transition-transform duration-300"
                style={{
                  backgroundImage: 'url(https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=600&q=80)'
                }}
              />
            </div>
            <div className="relative h-64 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow">
              <div 
                className="absolute inset-0 bg-cover bg-center hover:scale-110 transition-transform duration-300"
                style={{
                  backgroundImage: 'url(https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600&q=80)'
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">15+</div>
              <div className="text-blue-200">{t.yearsExperience}</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">200+</div>
              <div className="text-blue-200">{t.completedProjects}</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-blue-200">{t.teamMembers}</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">100%</div>
              <div className="text-blue-200">{t.clientSatisfaction}</div>
            </div>
          </div>
        </div>
      </section>
    </div>
    <Footer />
    </>
  );
}
