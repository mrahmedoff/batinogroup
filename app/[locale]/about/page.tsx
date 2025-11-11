'use client';

import { useProducts } from '@/contexts/ProductContext';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Building2, Users, Award, Globe, ArrowRight } from 'lucide-react';

export default function AboutPage() {
  const { getCategoriesByMenuType } = useProducts();
  const { language, t } = useLanguage();
  
  // About menu tipindəki kateqoriyaları al
  const aboutCategories = getCategoriesByMenuType('about').filter(cat => cat.type === 'main');

  const defaultSections = [
    {
      id: 'company-overview',
      name: 'Company Overview',
      description: 'Discover our story, mission, vision, and the values that drive our success.',
      icon: Building2,
      href: `/${language}/about/company-overview`,
      items: ['Our Story', 'Mission & Vision', 'Company Values', 'Leadership Team']
    },
    {
      id: 'leadership',
      name: 'Leadership Team',
      description: 'Meet our experienced leadership team and their expertise.',
      icon: Users,
      href: `/${language}/leadership`,
      items: ['Executive Team', 'Board of Directors', 'Department Heads', 'Advisory Board']
    },
    {
      id: 'certificates',
      name: 'Quality & Certifications',
      description: 'Our commitment to quality management and industry standards.',
      icon: Award,
      href: `/${language}/certificates`,
      items: ['ISO Certifications', 'Quality Management', 'Safety Standards', 'Environmental Policy']
    },
    {
      id: 'partnerships',
      name: 'Clients & Partners',
      description: 'Our strategic partnerships and global network of clients and suppliers.',
      icon: Globe,
      href: `/${language}/clients-partners`,
      items: ['Strategic Partners', 'Global Clients', 'Supplier Network', 'Joint Ventures']
    }
  ];

  const sectionsToShow = aboutCategories.length > 0 ? aboutCategories : defaultSections;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-32">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl font-bold mb-6">
              About BatinoGroup
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Learn more about our company, values, leadership team, and commitment to excellence 
              in construction and industrial services.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">15+</div>
              <div className="text-gray-600">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">200+</div>
              <div className="text-gray-600">Completed Projects</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">50+</div>
              <div className="text-gray-600">Team Members</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">98%</div>
              <div className="text-gray-600">Client Satisfaction</div>
            </div>
          </div>

          {/* About Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {sectionsToShow.map((section) => {
              const IconComponent = 'icon' in section ? section.icon : Building2;
              
              return (
                <div key={section.id} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 group cursor-pointer border border-gray-100">
                  <Link href={'href' in section ? section.href : `/${language}/about/${section.id}`} className="block">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                          <IconComponent className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                          {section.name}
                        </h3>
                        <p className="text-gray-600 mb-4 leading-relaxed">
                          {section.description}
                        </p>
                        
                        {/* Items list */}
                        {'items' in section && section.items && (
                          <ul className="text-sm text-gray-500 space-y-2 mb-4">
                            {section.items.map((item, index) => (
                              <li key={index} className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                                {item}
                              </li>
                            ))}
                          </ul>
                        )}
                        
                        <div className="flex items-center text-blue-600 group-hover:text-blue-800 font-medium">
                          <span>Learn More</span>
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>

          {/* Company Values Section */}
          <div className="mt-20 bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Core Values</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                The principles that guide our work and define our commitment to excellence
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Excellence</h3>
                <p className="text-gray-600">Delivering the highest quality in every project we undertake</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Integrity</h3>
                <p className="text-gray-600">Building trust through honest and transparent business practices</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Innovation</h3>
                <p className="text-gray-600">Embracing new technologies and creative solutions</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}