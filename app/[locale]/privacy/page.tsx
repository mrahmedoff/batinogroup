'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { Shield, Lock, Eye, FileText, Users, AlertCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function PrivacyPage() {
  const { t } = useLanguage();

  return (
    <>
      <Header />
      <div className="pt-20">
        {/* Hero Section */}
        <section className="relative h-[400px] flex items-center">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/95 to-blue-800/90 z-10" />
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1920&q=80)'
            }}
          />
          <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
            <div className="flex items-center gap-4 mb-4">
              <Shield className="w-12 h-12" />
              <h1 className="text-4xl md:text-5xl font-bold">{t.privacyPolicyTitle}</h1>
            </div>
            <p className="text-xl text-blue-100 max-w-3xl">
              {t.privacyHeroDesc}
            </p>
            <p className="text-sm text-blue-200 mt-4">
              {t.lastUpdated}: 26 Oktyabr 2025
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Introduction */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <FileText className="w-8 h-8 text-blue-600" />
                <h2 className="text-3xl font-bold">{t.introduction}</h2>
              </div>
              <p className="text-gray-600 leading-relaxed">
                {t.introductionText}
              </p>
            </div>

            {/* Data Collection */}
            <div className="mb-12 bg-blue-50 rounded-xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <Eye className="w-8 h-8 text-blue-600" />
                <h2 className="text-3xl font-bold">{t.dataCollection}</h2>
              </div>
              <p className="text-gray-600 leading-relaxed mb-4">
                {t.dataCollectionText}
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span className="text-gray-600">{t.dataCollectionItem1}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span className="text-gray-600">{t.dataCollectionItem2}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span className="text-gray-600">{t.dataCollectionItem3}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span className="text-gray-600">{t.dataCollectionItem4}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span className="text-gray-600">{t.dataCollectionItem5}</span>
                </li>
              </ul>
            </div>

            {/* Data Usage */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <FileText className="w-8 h-8 text-blue-600" />
                <h2 className="text-3xl font-bold">{t.dataUsage}</h2>
              </div>
              <p className="text-gray-600 leading-relaxed mb-4">
                {t.dataUsageText}
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span className="text-gray-600">{t.dataUsageItem1}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span className="text-gray-600">{t.dataUsageItem2}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span className="text-gray-600">{t.dataUsageItem3}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span className="text-gray-600">{t.dataUsageItem4}</span>
                </li>
              </ul>
            </div>

            {/* Data Protection */}
            <div className="mb-12 bg-green-50 rounded-xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <Lock className="w-8 h-8 text-green-600" />
                <h2 className="text-3xl font-bold">{t.dataProtection}</h2>
              </div>
              <p className="text-gray-600 leading-relaxed">
                {t.dataProtectionText}
              </p>
            </div>

            {/* Cookies */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <FileText className="w-8 h-8 text-blue-600" />
                <h2 className="text-3xl font-bold">{t.cookies}</h2>
              </div>
              <p className="text-gray-600 leading-relaxed">
                {t.cookiesText}
              </p>
            </div>

            {/* Third Party */}
            <div className="mb-12 bg-purple-50 rounded-xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <Users className="w-8 h-8 text-purple-600" />
                <h2 className="text-3xl font-bold">{t.thirdParty}</h2>
              </div>
              <p className="text-gray-600 leading-relaxed">
                {t.thirdPartyText}
              </p>
            </div>

            {/* Your Rights */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-8 h-8 text-blue-600" />
                <h2 className="text-3xl font-bold">{t.yourRights}</h2>
              </div>
              <p className="text-gray-600 leading-relaxed mb-4">
                {t.yourRightsText}
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span className="text-gray-600">{t.yourRightsItem1}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span className="text-gray-600">{t.yourRightsItem2}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span className="text-gray-600">{t.yourRightsItem3}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span className="text-gray-600">{t.yourRightsItem4}</span>
                </li>
              </ul>
            </div>

            {/* Changes */}
            <div className="mb-12 bg-orange-50 rounded-xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <AlertCircle className="w-8 h-8 text-orange-600" />
                <h2 className="text-3xl font-bold">{t.changes}</h2>
              </div>
              <p className="text-gray-600 leading-relaxed">
                {t.changesText}
              </p>
            </div>

            {/* Contact */}
            <div className="bg-blue-900 text-white rounded-xl p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">{t.contact}</h3>
              <p className="mb-6">{t.contactForPrivacy}</p>
              <a 
                href="/contact" 
                className="inline-block bg-white text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                {t.contactUs}
              </a>
            </div>

          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
