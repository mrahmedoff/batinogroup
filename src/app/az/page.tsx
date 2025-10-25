'use client';
import { translations } from '../translations';
import { ArrowRightIcon, UserGroupIcon, CogIcon, PhoneIcon, CheckCircleIcon, SparklesIcon, ShieldCheckIcon, RocketLaunchIcon, ChartBarIcon, GlobeAltIcon, TruckIcon, ClipboardDocumentCheckIcon, StarIcon } from '@heroicons/react/24/outline';
import { useState, useEffect } from 'react';

export default function Home() {
  const t = translations.az;
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [content, setContent] = useState<any>(null);
  const [testimonials, setTestimonials] = useState<any[]>([]);

  useEffect(() => {
    fetchContent();
    fetchTestimonials();
  }, []);

  const fetchContent = async () => {
    try {
      const response = await fetch('/api/content');
      const data = await response.json();
      setContent(data);
    } catch (error) {
      console.error('Failed to fetch content:', error);
    }
  };

  const fetchTestimonials = async () => {
    try {
      const response = await fetch('/api/testimonials');
      const data = await response.json();
      setTestimonials(data.filter((t: any) => t.active));
    } catch (error) {
      console.error('Failed to fetch testimonials:', error);
    }
  };

  if (!content) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <>
      {/* Hero Section - Modern & Animated */}
      <section className="relative py-32 text-center bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6 border border-white/20">
            <SparklesIcon className="w-5 h-5 mr-2" />
            <span className="text-sm font-medium">{content.home.hero.badge}</span>
          </div>
          <h1 className="text-6xl md:text-7xl font-extrabold mb-6 leading-tight animate-fade-in-up">
            {content.home.hero.title}
          </h1>
          <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto leading-relaxed opacity-90">
            {content.home.hero.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-2xl flex items-center group">
              {t.home.getStarted} 
              <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold hover:bg-white hover:text-blue-600 transition-all duration-300">
              {t.home.learnMore}
            </button>
          </div>
          <div className="mt-16 flex justify-center gap-8 text-sm">
            <div className="flex items-center">
              <CheckCircleIcon className="w-5 h-5 mr-2" />
              <span>{t.home.trustBadges.certified}</span>
            </div>
            <div className="flex items-center">
              <CheckCircleIcon className="w-5 h-5 mr-2" />
              <span>{t.home.trustBadges.secure}</span>
            </div>
            <div className="flex items-center">
              <CheckCircleIcon className="w-5 h-5 mr-2" />
              <span>{t.home.trustBadges.support}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white border-b">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {content.home.stats.map((stat: any, index: number) => (
              <div key={index} className="text-center group hover:scale-105 transition-transform duration-300">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
                <div className="text-sm text-gray-500 mt-1">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section - Enhanced */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">{t.home.featuresTitle}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t.home.featuresSubtitle}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {t.home.featuresDetailed.map((feature, index) => (
              <div key={index} className="group p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {feature.icon === 'shield' && <ShieldCheckIcon className="w-8 h-8 text-white" />}
                  {feature.icon === 'rocket' && <RocketLaunchIcon className="w-8 h-8 text-white" />}
                  {feature.icon === 'chart' && <ChartBarIcon className="w-8 h-8 text-white" />}
                  {feature.icon === 'globe' && <GlobeAltIcon className="w-8 h-8 text-white" />}
                  {feature.icon === 'truck' && <TruckIcon className="w-8 h-8 text-white" />}
                  {feature.icon === 'check' && <ClipboardDocumentCheckIcon className="w-8 h-8 text-white" />}
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed mb-4">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.points.map((point, idx) => (
                    <li key={idx} className="flex items-start text-sm text-gray-600">
                      <CheckCircleIcon className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-4">
              <CogIcon className="w-12 h-12 text-purple-600 mr-4" />
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800">{t.home.servicesTitle}</h2>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t.home.servicesText}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {t.home.servicesGrid.map((service, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-purple-600">
                <h3 className="text-2xl font-bold text-gray-800 mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <div className="flex items-center text-purple-600 font-semibold hover:text-purple-700 cursor-pointer">
                  <span>{t.home.learnMore}</span>
                  <ArrowRightIcon className="w-4 h-4 ml-2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      {testimonials.length > 0 && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">{t.home.testimonialsTitle}</h2>
              <p className="text-xl text-gray-600">{t.home.testimonialsSubtitle}</p>
            </div>
            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-10 rounded-2xl shadow-xl">
                <div className="flex justify-center mb-6">
                  {[...Array(testimonials[activeTestimonial]?.rating || 5)].map((_, i) => (
                    <StarIcon key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-xl text-gray-700 italic mb-6 text-center leading-relaxed">
                  "{testimonials[activeTestimonial]?.text}"
                </p>
                <div className="text-center">
                  <p className="font-bold text-gray-800">{testimonials[activeTestimonial]?.name}</p>
                  <p className="text-gray-600">{testimonials[activeTestimonial]?.position}</p>
                  <p className="text-sm text-gray-500">{testimonials[activeTestimonial]?.company}</p>
                </div>
              </div>
              <div className="flex justify-center mt-8 gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      activeTestimonial === index ? 'bg-purple-600 w-8' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Partners Section */}
      <section className="py-16 bg-gray-50 border-y">
        <div className="container mx-auto px-6">
          <h3 className="text-center text-gray-600 font-semibold mb-8">{t.home.partnersTitle}</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-60">
            {t.home.partners.map((partner, index) => (
              <div key={index} className="text-center text-2xl font-bold text-gray-400 hover:text-gray-600 transition-colors">
                {partner}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">{t.home.faqTitle}</h2>
            <p className="text-xl text-gray-600">{t.home.faqSubtitle}</p>
          </div>
          <div className="max-w-3xl mx-auto space-y-4">
            {t.home.faqs.map((faq, index) => (
              <details key={index} className="group bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors">
                <summary className="font-bold text-lg text-gray-800 cursor-pointer flex justify-between items-center">
                  {faq.question}
                  <span className="text-purple-600 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-4 text-gray-600 leading-relaxed">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">{t.home.ctaTitle}</h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto opacity-90">{t.home.ctaText}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-xl">
              {t.home.ctaButton}
            </button>
            <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold hover:bg-white hover:text-blue-600 transition-all duration-300">
              <PhoneIcon className="w-5 h-5 inline mr-2" />
              {t.home.ctaSecondary}
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
