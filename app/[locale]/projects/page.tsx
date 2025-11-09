'use client';

import { useState } from 'react';
import { useData } from '@/contexts/DataContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Filter } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ProjectsPage() {
  const { projects } = useData();
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState(t.all);

  const categories = [t.all, ...Array.from(new Set(projects.map(p => p.category)))];
  const filteredProjects = selectedCategory === t.all 
    ? projects 
    : projects.filter(p => p.category === selectedCategory);

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
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{t.ourProjects}</h1>
          <p className="text-xl text-blue-100 max-w-3xl">
            {t.projectsHeroDesc}
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-white border-b sticky top-20 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 overflow-x-auto">
            <Filter className="w-5 h-5 text-gray-400 flex-shrink-0" />
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => {
              const images = [
                'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
                'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
                'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80',
                'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80',
                'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
                'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80',
              ];
              return (
                <div 
                  key={project.id}
                  className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all"
                >
                  <div className="aspect-video relative overflow-hidden">
                    <div 
                      className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-300"
                      style={{
                        backgroundImage: `url(${images[index % images.length]})`
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  </div>
                  <div className="p-6">
                    <span className="inline-block px-3 py-1 text-xs font-semibold text-blue-600 bg-blue-50 rounded-full mb-3">
                      {project.category}
                    </span>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{project.description}</p>
                    <button className="text-blue-600 font-semibold hover:underline">
                      {t.viewDetails} →
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">{t.noCategoryProjects}</p>
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">{t.achievements}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">{projects.length}+</div>
              <div className="text-gray-600">{t.completedProjects}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">98%</div>
              <div className="text-gray-600">{t.clientSatisfaction}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">15+</div>
              <div className="text-gray-600">{t.yearsExperience}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">24/7</div>
              <div className="text-gray-600">{t.support247}</div>
            </div>
          </div>
        </div>
      </section>
    </div>
    <Footer />
    </>
  );
}
