'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Cog6ToothIcon, ClockIcon } from '@heroicons/react/24/outline';

export default function Maintenance() {
  const router = useRouter();
  const [contactInfo, setContactInfo] = useState<any>(null);

  useEffect(() => {
    fetchContactInfo();
    
    // Her 5 saniyede bir yoxla
    const interval = setInterval(async () => {
      try {
        const response = await fetch('/api/maintenance');
        const data = await response.json();
        if (!data.maintenanceMode) {
          // Maintenance mode deaktivdirsə, ana səhifəyə yönləndir
          router.push('/az');
        }
      } catch (error) {
        console.error('Failed to check maintenance mode:', error);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [router]);

  const fetchContactInfo = async () => {
    try {
      const response = await fetch('/api/content');
      const data = await response.json();
      setContactInfo(data.contact);
    } catch (error) {
      console.error('Failed to fetch contact info:', error);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 flex items-center justify-center p-6">
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative max-w-2xl w-full">
        <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-12 text-center">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full mb-8 animate-pulse">
            <Cog6ToothIcon className="w-12 h-12 text-white animate-spin" style={{ animationDuration: '3s' }} />
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Texniki Xidmət
          </h1>

          {/* Description */}
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Vebsaytımız hazırda texniki xidmət altındadır. Daha yaxşı xidmət təqdim etmək üçün sistemimizi yeniləyirik.
          </p>

          {/* Info Box */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-8">
            <div className="flex items-center justify-center mb-4">
              <ClockIcon className="w-6 h-6 text-blue-600 mr-2" />
              <p className="text-lg font-semibold text-gray-800">Tezliklə qayıdacağıq</p>
            </div>
            <p className="text-gray-600">
              Təcili məsələlər üçün bizimlə əlaqə saxlaya bilərsiniz
            </p>
          </div>

          {/* Contact Info */}
          {contactInfo ? (
            <div className="space-y-3 text-gray-700">
              <p className="flex items-center justify-center">
                <span className="font-semibold mr-2">📞 Telefon:</span>
                <a href={`tel:${contactInfo.phone}`} className="text-blue-600 hover:text-blue-700">
                  {contactInfo.phone}
                </a>
              </p>
              <p className="flex items-center justify-center">
                <span className="font-semibold mr-2">✉️ Email:</span>
                <a href={`mailto:${contactInfo.email}`} className="text-blue-600 hover:text-blue-700">
                  {contactInfo.email}
                </a>
              </p>
            </div>
          ) : (
            <div className="space-y-3 text-gray-700">
              <div className="animate-pulse flex items-center justify-center">
                <div className="h-4 bg-gray-200 rounded w-48"></div>
              </div>
              <div className="animate-pulse flex items-center justify-center">
                <div className="h-4 bg-gray-200 rounded w-56"></div>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              © 2025 BatinoGroup. Bütün hüquqlar qorunur.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
