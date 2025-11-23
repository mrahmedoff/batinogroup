'use client';

import Link from 'next/link';
import { useData } from '@/contexts/DataContext';
import { Settings, Zap, Wrench, Headphones, LucideIcon, ArrowRight } from 'lucide-react';

// Icon mapping
const iconMap: Record<string, LucideIcon> = {
  Settings,
  Zap,
  Wrench,
  Headphones,
};

export default function Services() {
  const { services } = useData();

  return (
    <section id="services" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
            Professional Services
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
            We offer you the best solutions with modern technologies and professional team
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services && services.length > 0 ? services.map((service, index) => {
            const IconComponent = iconMap[service.icon] || Settings;
            return (
              <div 
                key={service.id || `service-${index}`}
                className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow"
              >
                <div className="text-center mb-6">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <IconComponent className="w-8 h-8 text-white" strokeWidth={1.5} />
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-blue-900 mb-4">
                  {service.title}
                </h3>
                
                <p className="text-gray-700 leading-relaxed">
                  {service.description}
                </p>
              </div>
            );
          }) : (
            <div className="col-span-4 text-center py-12">
              <p className="text-gray-500">No services available</p>
            </div>
          )}
        </div>

        <div className="text-center mt-16">
          <Link 
            href="/services"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <span>Learn More</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" strokeWidth={2} />
          </Link>
        </div>
      </div>
    </section>
  );
}
