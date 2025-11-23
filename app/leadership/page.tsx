'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { Mail, Linkedin, Award, GraduationCap, Briefcase } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function LeadershipPage() {
  const { t, language } = useLanguage();

  const leaders = [
    {
      id: 1,
      name: 'Elchin Mammadov',
      position: t.ceo,
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80',
      email: 'elchin@batinogroup.az',
      linkedin: '#',
      experience: language === 'az' ? '20+ years experience' : '20+ years experience',
      education: language === 'az' ? 'MBA, Harvard Business School' : 'MBA, Harvard Business School',
      bio: language === 'az' 
        ? 'Has more than 20 years of experience in the oil and gas industry. Founded BatinoGroup in 2010 and has managed to turn the company into one of the leading engineering companies in the region.'
        : 'Over 20 years of experience in the oil and gas industry. Founded BatinoGroup in 2010 and successfully transformed it into one of the leading engineering companies in the region.'
    },
    {
      id: 2,
      name: 'Leyla Həsənova',
      position: t.cto,
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80',
      email: 'leyla@batinogroup.az',
      linkedin: '#',
      experience: language === 'az' ? '15+ years experience' : '15+ years experience',
      education: language === 'az' ? 'PhD, Engineering' : 'PhD, Engineering',
      bio: language === 'az'
        ? 'Expert in technology and innovation. Plays a leading role in implementing digital transformation and technological development strategies in the company.'
        : 'Expert in technology and innovation. Plays a leading role in implementing digital transformation and technological development strategies in the company.'
    },
    {
      id: 3,
      name: 'Rəşad Əliyev',
      position: t.cfo,
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80',
      email: 'rashad@batinogroup.az',
      linkedin: '#',
      experience: language === 'az' ? '18+ years experience' : '18+ years experience',
      education: language === 'az' ? 'Maliyyə, London School of Economics' : 'Finance, London School of Economics',
      bio: language === 'az'
        ? 'Has extensive experience in financial management and strategic planning. Ensures the financial stability and growth of the company.'
        : 'Has extensive experience in financial management and strategic planning. Ensures the financial stability and growth of the company.'
    },
    {
      id: 4,
      name: 'Nigar Quliyeva',
      position: t.coo,
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80',
      email: 'nigar@batinogroup.az',
      linkedin: '#',
      experience: language === 'az' ? '16+ years experience' : '16+ years experience',
      education: language === 'az' ? 'Operations Management, MIT' : 'Operations Management, MIT',
      bio: language === 'az'
        ? 'Specialist in project management and optimization of operational processes. Ensures efficient management of the company\'s daily operations.'
        : 'Specialist in project management and optimization of operational processes. Ensures efficient management of the company\'s daily operations.'
    }
  ];

  return (
    <>
      <Header />
      <div className="pt-20">
        {/* Hero Section */}
        <section className="relative h-[400px] flex items-center">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/95 to-indigo-900/90 z-10" />
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1920&q=80)'
            }}
          />
          <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{t.leadershipPageTitle}</h1>
            <p className="text-xl text-blue-100 max-w-3xl">
              {t.leadershipHeroDesc}
            </p>
          </div>
        </section>

        {/* Leadership Team */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.executiveTeam}</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                {t.meetOurLeaders}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {leaders.map((leader) => (
                <div 
                  key={leader.id}
                  className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all overflow-hidden"
                >
                  <div className="md:flex">
                    <div className="md:w-1/3">
                      <div 
                        className="h-64 md:h-full bg-cover bg-center"
                        style={{
                          backgroundImage: `url(${leader.image})`
                        }}
                      />
                    </div>
                    <div className="md:w-2/3 p-8">
                      <h3 className="text-2xl font-bold mb-2">{leader.name}</h3>
                      <p className="text-blue-600 font-semibold mb-4">{leader.position}</p>
                      
                      <p className="text-gray-600 text-sm leading-relaxed mb-6">
                        {leader.bio}
                      </p>

                      <div className="space-y-3 mb-6">
                        <div className="flex items-center gap-3 text-sm">
                          <Briefcase className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600">{leader.experience}</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                          <GraduationCap className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600">{leader.education}</span>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <a 
                          href={`mailto:${leader.email}`}
                          className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors"
                        >
                          <Mail className="w-5 h-5" />
                        </a>
                        <a 
                          href={leader.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors"
                        >
                          <Linkedin className="w-5 h-5" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {language === 'az' ? 'Rəhbərlik Prinsiplərimiz' : 'Our Leadership Principles'}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-8 bg-blue-50 rounded-xl">
                <Award className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3">
                  {language === 'az' ? 'Vizyoner Düşüncə' : 'Visionary Thinking'}
                </h3>
                <p className="text-gray-600">
                  {language === 'az' 
                    ? 'Future vision and innovative solutions' 
                    : 'Future vision and innovative solutions'}
                </p>
              </div>

              <div className="text-center p-8 bg-green-50 rounded-xl">
                <Award className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3">
                  {language === 'az' ? 'Komanda Rəhbərliyi' : 'Team Leadership'}
                </h3>
                <p className="text-gray-600">
                  {language === 'az' 
                    ? 'Güclü komanda qurmaq və inkişaf etdirmək' 
                    : 'Building and developing strong teams'}
                </p>
              </div>

              <div className="text-center p-8 bg-purple-50 rounded-xl">
                <Award className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3">
                  {language === 'az' ? 'Strateji Yanaşma' : 'Strategic Approach'}
                </h3>
                <p className="text-gray-600">
                  {language === 'az' 
                    ? 'Uzunmüddətli planlaşdırma və icra' 
                    : 'Long-term planning and execution'}
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
