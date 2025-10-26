'use client';

import { useState } from 'react';
import { useData } from '@/contexts/DataContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Play, Image as ImageIcon, FileText, Calendar } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function MediaPage() {
  const { media } = useData();
  const { t } = useLanguage();
  const [selectedType, setSelectedType] = useState(t.all);

  const types = [t.all, t.photo, t.video, t.news];
  const filteredMedia = selectedType === t.all 
    ? media 
    : media.filter(m => m.type === selectedType);

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
            backgroundImage: 'url(https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1920&q=80)'
          }}
        />
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{t.mediaGallery}</h1>
          <p className="text-xl text-blue-100 max-w-3xl">
            {t.mediaHeroDesc}
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-white border-b sticky top-20 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            {types.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedType === type
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Media Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredMedia.map((item, index) => {
              const images = [
                'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80',
                'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
                'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
                'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80',
                'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80',
                'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
              ];
              return (
                <div 
                  key={item.id}
                  className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all"
                >
                  <div className="aspect-video relative overflow-hidden">
                    <div 
                      className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-300"
                      style={{
                        backgroundImage: `url(${images[index % images.length]})`
                      }}
                    />
                    <div className="absolute inset-0 bg-black/20"></div>
                    {item.type === 'Video' && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Play className="w-8 h-8 text-blue-600 ml-1" />
                        </div>
                      </div>
                    )}
                    {item.type === 'Şəkil' && (
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                        <ImageIcon className="w-12 h-12 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="inline-block px-3 py-1 text-xs font-semibold text-blue-600 bg-blue-50 rounded-full">
                        {item.type}
                      </span>
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {item.date}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                    <p className="text-gray-600 text-sm">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredMedia.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">{t.noCategoryMedia}</p>
            </div>
          )}
        </div>
      </section>

      {/* Latest News */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12">{t.latestNews}</h2>
          <div className="space-y-6">
            {media.filter(m => m.type === 'Xəbər').slice(0, 3).map((news, index) => {
              const newsImages = [
                'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400&q=80',
                'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&q=80',
                'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=80',
              ];
              return (
                <div key={news.id} className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow">
                  <div className="flex gap-6">
                    <div className="w-48 h-32 rounded-lg flex-shrink-0 overflow-hidden">
                      <div 
                        className="w-full h-full bg-cover bg-center hover:scale-110 transition-transform duration-300"
                        style={{
                          backgroundImage: `url(${newsImages[index % newsImages.length]})`
                        }}
                      />
                    </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <FileText className="w-4 h-4 text-blue-600" />
                      <span className="text-sm text-gray-500">{news.date}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2 hover:text-blue-600 cursor-pointer">
                      {news.title}
                    </h3>
                    <p className="text-gray-600">{news.description}</p>
                    <button className="mt-4 text-blue-600 font-semibold hover:underline">
                      {t.readMore} →
                    </button>
                  </div>
                </div>
              </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
    <Footer />
    </>
  );
}
