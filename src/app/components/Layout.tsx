'use client';
import Link from 'next/link';
import { translations } from '../translations';
import { HomeIcon, InformationCircleIcon, WrenchScrewdriverIcon, PhoneIcon, EnvelopeIcon, MapPinIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Analytics from './Analytics';

interface LayoutProps {
  children: React.ReactNode;
  locale: string;
}

export default function Layout({ children, locale }: LayoutProps) {
  const t = translations[locale as keyof typeof translations] || translations.az;
  const footer = t.footer as typeof t.footer & { company: string; services: string; contact: string; follow: string; rights: string; privacy: string; terms: string; address: string; phone: string; email: string; };
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contactInfo, setContactInfo] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    checkMaintenanceMode();
    fetchContactInfo();
    
    // Her 10 saniyede bir maintenance mode yoxla
    const interval = setInterval(checkMaintenanceMode, 10000);
    return () => clearInterval(interval);
  }, []);

  const checkMaintenanceMode = async () => {
    try {
      const response = await fetch('/api/maintenance');
      const data = await response.json();
      if (data.maintenanceMode) {
        router.push('/maintenance');
      }
    } catch (error) {
      console.error('Failed to check maintenance mode:', error);
    }
  };

  const fetchContactInfo = async () => {
    try {
      const response = await fetch('/api/settings');
      const data = await response.json();
      setContactInfo(data.contact);
    } catch (error) {
      console.error('Failed to fetch contact info:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Analytics />
      {/* Modern Header with sticky navigation */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100">
        <nav className="container mx-auto flex justify-between items-center px-6 py-4">
          <Link href="/az" className="flex items-center group">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform">
              <span className="text-white font-bold text-xl">B</span>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              BatinoGroup
            </h1>
          </Link>
          
          {/* Desktop Navigation */}
          <ul className="hidden md:flex space-x-8 items-center">
            <li>
              <Link href="/az" className="text-gray-700 hover:text-blue-600 transition-all duration-300 flex items-center font-medium group">
                <HomeIcon className="w-5 h-5 mr-1 group-hover:scale-110 transition-transform" /> 
                {t.nav.home}
              </Link>
            </li>
            <li>
              <Link href="/az/about" className="text-gray-700 hover:text-blue-600 transition-all duration-300 flex items-center font-medium group">
                <InformationCircleIcon className="w-5 h-5 mr-1 group-hover:scale-110 transition-transform" /> 
                {t.nav.about}
              </Link>
            </li>
            <li>
              <Link href="/az/services" className="text-gray-700 hover:text-blue-600 transition-all duration-300 flex items-center font-medium group">
                <WrenchScrewdriverIcon className="w-5 h-5 mr-1 group-hover:scale-110 transition-transform" /> 
                {t.nav.services}
              </Link>
            </li>
            <li>
              <Link href="/az/contact" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center font-medium">
                <PhoneIcon className="w-5 h-5 mr-1" /> 
                {t.nav.contact}
              </Link>
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <XMarkIcon className="w-6 h-6" />
            ) : (
              <Bars3Icon className="w-6 h-6" />
            )}
          </button>
        </nav>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 py-4">
            <ul className="space-y-4 px-6">
              <li>
                <Link href="/az" className="text-gray-700 hover:text-blue-600 flex items-center font-medium" onClick={() => setMobileMenuOpen(false)}>
                  <HomeIcon className="w-5 h-5 mr-2" /> {t.nav.home}
                </Link>
              </li>
              <li>
                <Link href="/az/about" className="text-gray-700 hover:text-blue-600 flex items-center font-medium" onClick={() => setMobileMenuOpen(false)}>
                  <InformationCircleIcon className="w-5 h-5 mr-2" /> {t.nav.about}
                </Link>
              </li>
              <li>
                <Link href="/az/services" className="text-gray-700 hover:text-blue-600 flex items-center font-medium" onClick={() => setMobileMenuOpen(false)}>
                  <WrenchScrewdriverIcon className="w-5 h-5 mr-2" /> {t.nav.services}
                </Link>
              </li>
              <li>
                <Link href="/az/contact" className="text-gray-700 hover:text-blue-600 flex items-center font-medium" onClick={() => setMobileMenuOpen(false)}>
                  <PhoneIcon className="w-5 h-5 mr-2" /> {t.nav.contact}
                </Link>
              </li>
            </ul>
          </div>
        )}
      </header>

      <main className="flex-1">
        {children}
      </main>

      {/* Modern Footer */}
      <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="container mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Company Info */}
            <div>
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-xl">B</span>
                </div>
                <h3 className="text-2xl font-bold">BatinoGroup</h3>
              </div>
              <p className="text-gray-400 mb-4 leading-relaxed">
                Azərbaycanda aparıcı təchizat və alış-veriş şirkəti. Biznesinizin uğuru üçün etibarlı tərəfdaş.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                  <span className="text-sm">f</span>
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-400 transition-colors">
                  <span className="text-sm">t</span>
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                  <span className="text-sm">in</span>
                </a>
              </div>
            </div>

            {/* Services */}
            <div>
              <h3 className="font-bold text-lg mb-6 text-white">{footer.services}</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/az/services" className="text-gray-400 hover:text-white transition-colors flex items-center group">
                    <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2 group-hover:w-3 transition-all"></span>
                    Təchizat Məsləhətçiliyi
                  </Link>
                </li>
                <li>
                  <Link href="/az/services" className="text-gray-400 hover:text-white transition-colors flex items-center group">
                    <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2 group-hover:w-3 transition-all"></span>
                    Təchizatçı İdarəetməsi
                  </Link>
                </li>
                <li>
                  <Link href="/az/services" className="text-gray-400 hover:text-white transition-colors flex items-center group">
                    <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2 group-hover:w-3 transition-all"></span>
                    Xərc Optimallaşdırması
                  </Link>
                </li>
                <li>
                  <Link href="/az/services" className="text-gray-400 hover:text-white transition-colors flex items-center group">
                    <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2 group-hover:w-3 transition-all"></span>
                    Logistika Həlləri
                  </Link>
                </li>
              </ul>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-bold text-lg mb-6 text-white">Sürətli Keçidlər</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/az/about" className="text-gray-400 hover:text-white transition-colors flex items-center group">
                    <span className="w-1.5 h-1.5 bg-purple-600 rounded-full mr-2 group-hover:w-3 transition-all"></span>
                    Haqqımızda
                  </Link>
                </li>
                <li>
                  <Link href="/az/contact" className="text-gray-400 hover:text-white transition-colors flex items-center group">
                    <span className="w-1.5 h-1.5 bg-purple-600 rounded-full mr-2 group-hover:w-3 transition-all"></span>
                    Əlaqə
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors flex items-center group">
                    <span className="w-1.5 h-1.5 bg-purple-600 rounded-full mr-2 group-hover:w-3 transition-all"></span>
                    {footer.privacy}
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors flex items-center group">
                    <span className="w-1.5 h-1.5 bg-purple-600 rounded-full mr-2 group-hover:w-3 transition-all"></span>
                    {footer.terms}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="font-bold text-lg mb-6 text-white">{footer.contact}</h3>
              <ul className="space-y-4">
                <li className="flex items-start text-gray-400">
                  <MapPinIcon className="w-5 h-5 mr-3 text-blue-500 flex-shrink-0 mt-1" />
                  <span>{contactInfo?.address || footer.address}</span>
                </li>
                <li className="flex items-center text-gray-400">
                  <PhoneIcon className="w-5 h-5 mr-3 text-blue-500 flex-shrink-0" />
                  <a href={`tel:${contactInfo?.phone || footer.phone}`} className="hover:text-white transition-colors">
                    {contactInfo?.phone || footer.phone}
                  </a>
                </li>
                <li className="flex items-center text-gray-400">
                  <EnvelopeIcon className="w-5 h-5 mr-3 text-blue-500 flex-shrink-0" />
                  <a href={`mailto:${contactInfo?.email || footer.email}`} className="hover:text-white transition-colors">
                    {contactInfo?.email || footer.email}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-700 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm mb-4 md:mb-0">
                {footer.rights}
              </p>
              <div className="flex space-x-6 text-sm">
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  {footer.privacy}
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  {footer.terms}
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  Sitemap
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}