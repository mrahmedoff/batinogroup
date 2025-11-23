'use client';

import { useProducts } from '@/contexts/ProductContext';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Wrench, Zap, Building, Factory, ArrowRight, CheckCircle } from 'lucide-react';

export default function ServicesPage() {
  const { getCategoriesByMenuType } = useProducts();
  const { language, t } = useLanguage();
  
  // Services menu tipindəki kateqoriyaları al
  const serviceCategories = getCategoriesByMenuType('services').filter(cat => cat.type === 'main');

  const defaultServices = [
    {
      id: 'construction',
      name: 'Construction Services',
      description: 'Full-scale construction solutions from design to completion with modern technology and experienced team.',
      icon: Building,
      href: `/services/construction`,
      items: ['Civil Construction', 'Industrial Construction', 'Infrastructure Development', 'Project Management'],
      features: ['Design & Planning', 'Quality Assurance', 'Timely Delivery', '24/7 Support']
    },
    {
      id: 'oil-gas',
      name: 'Oil & Gas Solutions',
      description: 'Specialized services for upstream and downstream operations with 15+ years of industry experience.',
      icon: Factory,
      href: `/services/oil-gas`,
      items: ['Upstream Services', 'Downstream Operations', 'Pipeline Construction', 'Refinery Services'],
      features: ['Safety First', 'Advanced Technology', 'Expert Team', 'Global Standards']
    },
    {
      id: 'energy',
      name: 'Energy & Utilities',
      description: 'Advanced energy solutions and utility infrastructure for sustainable and efficient operations.',
      icon: Zap,
      href: `/services/energy`,
      items: ['Power Generation', 'Renewable Energy', 'Electrical Systems', 'Grid Infrastructure'],
      features: ['Renewable Focus', 'Smart Solutions', 'Energy Efficiency', 'Future Ready']
    },
    {
      id: 'maintenance',
      name: 'Maintenance & Support',
      description: 'Comprehensive maintenance services to ensure optimal performance and longevity of your systems.',
      icon: Wrench,
      href: `/services/maintenance`,
      items: ['Preventive Maintenance', 'Emergency Repairs', 'System Upgrades', 'Technical Support'],
      features: ['24/7 Availability', 'Rapid Response', 'Skilled Technicians', 'Cost Effective']
    }
  ];

  const servicesToShow = serviceCategories.length > 0 ? serviceCategories : defaultServices;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-32">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl font-bold mb-6">
              Our Services
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Comprehensive construction, oil & gas, and energy solutions tailored to meet 
              your industrial and infrastructure needs with excellence and reliability.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Services Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {servicesToShow.map((service, index) => {
              const IconComponent = 'icon' in service ? service.icon : Building;
              
              return (
                <div key={service.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group border border-gray-100">
                  <div className="p-8">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="flex-shrink-0">
                        <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                          <IconComponent className="w-7 h-7 text-blue-600 group-hover:text-white transition-colors" />
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                          {service.name}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {service.description}
                        </p>
                      </div>
                    </div>
                    
                    {/* Service Items */}
                    {'items' in service && service.items && (
                      <div className="mb-6">
                        <h4 className="text-sm font-semibold text-gray-700 mb-3">Service Areas:</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {service.items.map((item, itemIndex) => (
                            <div key={itemIndex} className="flex items-center gap-2 text-sm text-gray-600">
                              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                              {item}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Features */}
                    {'features' in service && service.features && (
                      <div className="mb-6">
                        <h4 className="text-sm font-semibold text-gray-700 mb-3">Key Features:</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {service.features.map((feature, featureIndex) => (
                            <div key={featureIndex} className="flex items-center gap-2 text-sm text-green-600">
                              <CheckCircle className="w-4 h-4" />
                              {feature}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <Link 
                      href={'href' in service ? service.href : `/services/${service.id}`}
                      className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium group-hover:underline"
                    >
                      <span>Learn More</span>
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Why Choose Us Section */}
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose BatinoGroup?</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We deliver exceptional results through our commitment to quality, innovation, and customer satisfaction
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">15+</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Years Experience</h3>
                <p className="text-gray-600 text-sm">Proven track record in industrial services</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Quality Assured</h3>
                <p className="text-gray-600 text-sm">ISO certified processes and standards</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Wrench className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Expert Team</h3>
                <p className="text-gray-600 text-sm">Skilled professionals with industry expertise</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-white">24/7</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Support</h3>
                <p className="text-gray-600 text-sm">Round-the-clock customer service</p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Start Your Project?</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Contact us today to discuss your requirements and get a customized solution for your business needs.
            </p>
            <Link 
              href="/contact"
              className="inline-block px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Get In Touch
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}