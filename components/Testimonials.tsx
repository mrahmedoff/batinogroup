'use client';

import { Star, Quote } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useData } from '@/contexts/DataContext';

export default function Testimonials() {
  const { language, t } = useLanguage();
  const { partners } = useData();

  // Filter only client testimonials (type: 'Müştəri')
  const testimonials = partners
    .filter(partner => partner.type === 'Müştəri')
    .slice(0, 3);

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t.clientReviews}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t.clientReviewsDesc}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.length > 0 ? (
            testimonials.map((testimonial) => (
              <div 
                key={testimonial.id}
                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2"
              >
                <Quote className="w-10 h-10 text-blue-600 mb-4 opacity-50" />
                <p className="text-gray-700 mb-6 leading-relaxed">
                  "{testimonial.description}"
                </p>
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <div className="flex items-center gap-4">
                  <div 
                    className="w-12 h-12 rounded-full bg-cover bg-center bg-gray-200"
                    style={{ backgroundImage: testimonial.logo ? `url(${testimonial.logo})` : undefined }}
                  />
                  <div>
                    <div className="font-bold">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.website}</div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-3 text-center py-12 text-gray-500">
              {t.noClientReviews}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
