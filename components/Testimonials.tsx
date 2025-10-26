'use client';

import { Star, Quote } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Testimonials() {
  const { language } = useLanguage();

  const testimonials = [
    {
      id: 1,
      name: 'Əli Məmmədov',
      position: 'CEO, TechCorp',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
      rating: 5,
      text: {
        az: 'BatinoGroup ilə işləmək böyük zövq oldu. Peşəkar yanaşma və keyfiyyətli xidmət.',
        en: 'Working with BatinoGroup was a great pleasure. Professional approach and quality service.'
      }
    },
    {
      id: 2,
      name: 'Leyla Həsənova',
      position: 'Project Manager, BuildCo',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',
      rating: 5,
      text: {
        az: 'Layihəmiz vaxtında və yüksək keyfiyyətlə tamamlandı. Tövsiyə edirəm!',
        en: 'Our project was completed on time and with high quality. I recommend!'
      }
    },
    {
      id: 3,
      name: 'Rəşad Əliyev',
      position: 'Director, Energy Solutions',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80',
      rating: 5,
      text: {
        az: 'Ən yaxşı mühəndislik həlləri və əla müştəri xidməti. Təşəkkürlər!',
        en: 'The best engineering solutions and excellent customer service. Thank you!'
      }
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {language === 'az' ? 'Müştəri Rəyləri' : 'Client Reviews'}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {language === 'az' 
              ? 'Müştərilərimizin bizimlə bağlı fikirləri' 
              : 'What our clients say about us'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id}
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2"
            >
              <Quote className="w-10 h-10 text-blue-600 mb-4 opacity-50" />
              <p className="text-gray-700 mb-6 leading-relaxed">
                "{testimonial.text[language]}"
              </p>
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <div className="flex items-center gap-4">
                <div 
                  className="w-12 h-12 rounded-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${testimonial.image})` }}
                />
                <div>
                  <div className="font-bold">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.position}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
