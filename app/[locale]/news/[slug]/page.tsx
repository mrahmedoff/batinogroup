'use client';

import { useParams } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { Calendar, Clock, User, ArrowLeft, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { newsData } from '@/lib/newsData';

export default function NewsDetailPage() {
  const params = useParams();
  const { t, language } = useLanguage();
  const slug = params.slug as string;

  const news = newsData.find(item => item.slug === slug);

  if (!news) {
    return (
      <>
        <Header />
        <div className="pt-20 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">{t.noNews}</h1>
            <Link href="/news" className="text-blue-600 hover:underline">
              {t.backToNews}
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const relatedNews = newsData
    .filter(item => item.categorySlug === news.categorySlug && item.id !== news.id)
    .slice(0, 3);

  return (
    <>
      <Header />
      <div className="pt-20">
        {/* Hero Section */}
        <section className="relative h-[500px] flex items-end">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20 z-10" />
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${news.image})`
            }}
          />
          <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 text-white w-full">
            <Link 
              href="/news"
              className="inline-flex items-center gap-2 mb-6 text-white/80 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              {t.backToNews}
            </Link>
            <span className="inline-block px-3 py-1 bg-blue-600 text-white text-sm font-semibold rounded-full mb-4">
              {news.category[language]}
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              {news.title[language]}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5" />
                <span>{news.author[language]}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>{new Date(news.date).toLocaleDateString(language === 'az' ? 'az-AZ' : 'en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>{news.readTime} {t.readTime}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="prose prose-lg max-w-none">
              {news.content[language].split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-gray-700 leading-relaxed mb-6">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Share Buttons */}
            <div className="mt-12 pt-8 border-t">
              <h3 className="text-lg font-bold mb-4">{t.share}</h3>
              <div className="flex gap-4">
                <button className="w-12 h-12 bg-blue-600 text-white rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors">
                  <Facebook className="w-5 h-5" />
                </button>
                <button className="w-12 h-12 bg-sky-500 text-white rounded-lg flex items-center justify-center hover:bg-sky-600 transition-colors">
                  <Twitter className="w-5 h-5" />
                </button>
                <button className="w-12 h-12 bg-blue-700 text-white rounded-lg flex items-center justify-center hover:bg-blue-800 transition-colors">
                  <Linkedin className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Related News */}
        {relatedNews.length > 0 && (
          <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold mb-12">{t.relatedNews}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedNews.map((item) => (
                  <Link 
                    key={item.id}
                    href={`/news/${item.slug}`}
                    className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all overflow-hidden group"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <div 
                        className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                        style={{
                          backgroundImage: `url(${item.image})`
                        }}
                      />
                    </div>
                    <div className="p-6">
                      <span className="text-sm text-blue-600 font-semibold">
                        {item.category[language]}
                      </span>
                      <h3 className="text-lg font-bold mt-2 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                        {item.title[language]}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-2">
                        {item.excerpt[language]}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
      <Footer />
    </>
  );
}
