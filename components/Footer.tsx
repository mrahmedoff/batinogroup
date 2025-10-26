'use client';

import Link from 'next/link';
import { useData } from '@/contexts/DataContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Linkedin, 
  Instagram, 
  Twitter,
  Youtube,
  Clock,
  ArrowRight,
  Send
} from 'lucide-react';

export default function Footer() {
  const { settings } = useData();
  const { t } = useLanguage();

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-6 group">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="text-white font-bold text-2xl">B</span>
              </div>
              <span className="text-2xl font-bold">{settings.siteName}</span>
            </Link>
            <p className="text-gray-400 mb-6 leading-relaxed">
              {t.aboutHeroDesc}
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Clock className="w-4 h-4" />
              <span>{t.mondayFriday}: 09:00 - 18:00</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 relative inline-block">
              {t.quickLinks}
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-blue-500"></span>
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white hover:translate-x-1 transition-all inline-flex items-center gap-2 group">
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  {t.about}
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-400 hover:text-white hover:translate-x-1 transition-all inline-flex items-center gap-2 group">
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  {t.services}
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-gray-400 hover:text-white hover:translate-x-1 transition-all inline-flex items-center gap-2 group">
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  {t.projects}
                </Link>
              </li>
              <li>
                <Link href="/media" className="text-gray-400 hover:text-white hover:translate-x-1 transition-all inline-flex items-center gap-2 group">
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  {t.media}
                </Link>
              </li>
              <li>
                <Link href="/career" className="text-gray-400 hover:text-white hover:translate-x-1 transition-all inline-flex items-center gap-2 group">
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  {t.career}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white hover:translate-x-1 transition-all inline-flex items-center gap-2 group">
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  {t.contact}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-6 relative inline-block">
              {t.contact}
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-blue-500"></span>
            </h3>
            <ul className="space-y-4">
              <li>
                <a 
                  href={`mailto:${settings.email}`}
                  className="flex items-start gap-3 text-gray-400 hover:text-white transition-colors group"
                >
                  <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center group-hover:bg-blue-600 transition-colors flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">{t.email}</div>
                    <div className="text-sm">{settings.email}</div>
                  </div>
                </a>
              </li>
              <li>
                <a 
                  href={`tel:${settings.phone}`}
                  className="flex items-start gap-3 text-gray-400 hover:text-white transition-colors group"
                >
                  <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center group-hover:bg-blue-600 transition-colors flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">{t.phone}</div>
                    <div className="text-sm">{settings.phone}</div>
                  </div>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-gray-400">
                  <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">{t.address}</div>
                    <div className="text-sm">{settings.address}</div>
                  </div>
                </div>
              </li>
            </ul>
          </div>

          {/* Newsletter & Social */}
          <div>
            <h3 className="text-lg font-bold mb-6 relative inline-block">
              {t.followUs}
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-blue-500"></span>
            </h3>
            
            {/* Social Media Icons */}
            <div className="flex flex-wrap gap-3 mb-6">
              <a 
                href={settings.facebook || '#'} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-11 h-11 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-all hover:scale-110 group"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href={settings.linkedin || '#'} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-11 h-11 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-700 transition-all hover:scale-110 group"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href={settings.instagram || '#'} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-11 h-11 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-600 transition-all hover:scale-110 group"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-11 h-11 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-sky-500 transition-all hover:scale-110 group"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-11 h-11 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-red-600 transition-all hover:scale-110 group"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>

            {/* Newsletter */}
            <div className="bg-gray-800 rounded-lg p-4">
              <p className="text-sm text-gray-400 mb-3">
                {t.stayUpdated}
              </p>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder={t.email}
                  className="flex-1 px-3 py-2 bg-gray-700 rounded text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 transition-colors">
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm text-center md:text-left">
              &copy; 2025 {settings.siteName}. {t.allRightsReserved}.
            </p>
            <div className="flex gap-6 text-sm text-gray-400">
              <Link href="/privacy" className="hover:text-white transition-colors">
                {t.privacyPolicy}
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors">
                {t.termsOfUse}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
