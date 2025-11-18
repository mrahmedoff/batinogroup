'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Calendar, Tag, ArrowRight, Search, Clock, User } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { newsData } from '@/lib/newsData';

function NewsPage() {
  const { t, language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const displayNews = newsData.map(news => ({
    id: news.id,
    slug: news.slug,
    title: news.title.az,
    excerpt: news.excerpt.az,
    category: news.category.az,
    categorySlug: news.categorySlug,
    date: news.date,
    image: news.image,
    author: news.author.az,
    readTime: news.readTime
  }));

  const oldNewsData = [
    {
      id: 1,
      title: 'New Project: Cooperation with SOCAR',
      excerpt: 'BatinoGroup started a new strategic project with SOCAR. The project in oil and gas sector...',
      category: 'Company News',
      date: '2024-01-15',
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80',
      categorySlug: 'company'
    },
    {
      id: 2,
      title: 'ISO 45001 Certificate Received',
      excerpt: 'Our company received the international safety standard ISO 45001 certificate...',
      category: 'Company News',
      date: '2024-01-10',
      image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80',
      categorySlug: 'company'
    },
    {
      id: 3,
      title: 'New Technologies in Energy Sector',
      excerpt: 'Digital transformation and implementation of new technologies in energy sector...',
      category: 'Industry News',
      date: '2024-01-08',
      image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&q=80',
      categorySlug: 'industry'
    },
    {
      id: 4,
      title: 'New Office Opened in Baku',
      excerpt: 'BatinoGroup opened a new modern office building in Baku. The office for 200 employees...',
      category: 'Company News',
      date: '2024-01-05',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
      categorySlug: 'company'
    },
    {
      id: 5,
      title: 'Safety Week Held',
      excerpt: 'Various trainings and seminars within the framework of safety week in our company...',
      category: 'Press Releases',
      date: '2024-01-03',
      image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80',
      categorySlug: 'press'
    },
    {
      id: 6,
      title: 'Participation in International Industry Exhibition',
      excerpt: 'BatinoGroup participated in the international industry exhibition held in Turkey...',
      category: 'Industry News',
      date: '2024-01-01',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
      categorySlug: 'industry'
    }
  ];

  const categories = [
    { slug: 'all', name: t.allNews },
    { slug: 'company', name: t.companyNews },
    { slug: 'industry', name: t.industryNews },
    { slug: 'press', name: t.pressReleases }
  ];

  const filteredNews = selectedCategory === 'all' 
    ? displayNews 
    : displayNews.filter(news => news.categorySlug === selectedCategory);

  return (
    <>
      <Header />
      <div className="pt-20">
        {/* Hero Section */}
        <section className="relative h-[400px] flex items-center">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/95 to-cyan-900/90 z-10" />
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1920&q=80)'
            }}
          />
          <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{t.newsPageTitle}</h1>
            <p className="text-xl text-blue-100 max-w-3xl">
              {t.newsHeroDesc}
            </p>
          </div>
        </section>

        {/* Category Filter */}
        <section className="py-8 bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap gap-4 justify-center">
              {categories.map((cat) => (
                <button
                  key={cat.slug}
                  onClick={() => setSelectedCategory(cat.slug)}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                    selectedCategory === cat.slug
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* News Grid */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {filteredNews.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredNews.map((news) => (
                  <article 
                    key={news.id}
                    className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all overflow-hidden group"
                  >
                    <div className="relative h-56 overflow-hidden">
                      <div 
                        className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                        style={{
                          backgroundImage: `url(${news.image})`
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full">
                          {news.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(news.date).toLocaleDateString('en-US')}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{news.readTime} {t.readTime}</span>
                        </div>
                      </div>
                      <h3 className="text-xl font-bold mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {news.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                        {news.excerpt}
                      </p>
                      <Link 
                        href={`/news/${news.slug}`}
                        className="text-blue-600 font-semibold text-sm inline-flex items-center gap-2 group-hover:gap-3 transition-all"
                      >
                        {t.readMore}
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-gray-500 text-lg">{t.noNews}</p>
              </div>
            )}
          </div>
        </section>

        {/* Newsletter Subscription */}
        <section className="py-20 bg-gradient-to-r from-blue-900 to-cyan-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Stay Updated
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Enter your email address to stay informed about the latest news
            </p>
            <div className="max-w-md mx-auto flex gap-4">
              <input 
                type="email"
                placeholder={t.email}
                className="flex-1 px-6 py-4 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="px-8 py-4 bg-white text-blue-900 font-semibold rounded-lg hover:bg-blue-50 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}

export default NewsPage;
