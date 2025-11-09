'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { FileText, CheckCircle, AlertTriangle, Scale, Link2, Edit } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function TermsPage() {
  const { t } = useLanguage();

  return (
    <>
      <Header />
      <div className="pt-20">
        {/* Hero Section */}
        <section className="relative h-[400px] flex items-center">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/95 to-purple-800/90 z-10" />
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1920&q=80)'
            }}
          />
          <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
            <div className="flex items-center gap-4 mb-4">
              <FileText className="w-12 h-12" />
              <h1 className="text-4xl md:text-5xl font-bold">{t.termsOfUseTitle}</h1>
            </div>
            <p className="text-xl text-purple-100 max-w-3xl">
              {t.termsHeroDesc}
            </p>
            <p className="text-sm text-purple-200 mt-4">
              {t.lastUpdated}: 26 Oktyabr 2025
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Acceptance */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
                <h2 className="text-3xl font-bold">{t.acceptance}</h2>
              </div>
              <p className="text-gray-600 leading-relaxed">
                {t.acceptanceText}
              </p>
            </div>

            {/* Use of Site */}
            <div className="mb-12 bg-blue-50 rounded-xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <FileText className="w-8 h-8 text-blue-600" />
                <h2 className="text-3xl font-bold">{t.useOfSite}</h2>
              </div>
              <p className="text-gray-600 leading-relaxed mb-4">
                {t.useOfSiteText}
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-1">✗</span>
                  <span className="text-gray-600">{t.useOfSiteItem1}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-1">✗</span>
                  <span className="text-gray-600">{t.useOfSiteItem2}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-1">✗</span>
                  <span className="text-gray-600">{t.useOfSiteItem3}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-1">✗</span>
                  <span className="text-gray-600">{t.useOfSiteItem4}</span>
                </li>
              </ul>
            </div>

            {/* Intellectual Property */}
            <div className="mb-12 bg-purple-50 rounded-xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <Scale className="w-8 h-8 text-purple-600" />
                <h2 className="text-3xl font-bold">{t.intellectualProperty}</h2>
              </div>
              <p className="text-gray-600 leading-relaxed">
                {t.intellectualPropertyText}
              </p>
            </div>

            {/* Disclaimer */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="w-8 h-8 text-orange-600" />
                <h2 className="text-3xl font-bold">{t.disclaimer}</h2>
              </div>
              <p className="text-gray-600 leading-relaxed">
                {t.disclaimerText}
              </p>
            </div>

            {/* Limitations */}
            <div className="mb-12 bg-orange-50 rounded-xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="w-8 h-8 text-orange-600" />
                <h2 className="text-3xl font-bold">{t.limitations}</h2>
              </div>
              <p className="text-gray-600 leading-relaxed">
                {t.limitationsText}
              </p>
            </div>

            {/* External Links */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <Link2 className="w-8 h-8 text-blue-600" />
                <h2 className="text-3xl font-bold">{t.links}</h2>
              </div>
              <p className="text-gray-600 leading-relaxed">
                {t.linksText}
              </p>
            </div>

            {/* Modifications */}
            <div className="mb-12 bg-green-50 rounded-xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <Edit className="w-8 h-8 text-green-600" />
                <h2 className="text-3xl font-bold">{t.modifications}</h2>
              </div>
              <p className="text-gray-600 leading-relaxed">
                {t.modificationsText}
              </p>
            </div>

            {/* Governing Law */}
            <div className="mb-12 bg-gray-50 rounded-xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <Scale className="w-8 h-8 text-gray-600" />
                <h2 className="text-3xl font-bold">{t.governingLaw}</h2>
              </div>
              <p className="text-gray-600 leading-relaxed">
                {t.governingLawText}
              </p>
            </div>

            {/* Contact */}
            <div className="bg-purple-900 text-white rounded-xl p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">{t.contact}</h3>
              <p className="mb-6">{t.contactForTerms}</p>
              <a 
                href="/contact" 
                className="inline-block bg-white text-purple-900 px-8 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors"
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
