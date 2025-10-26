'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Phone, Menu, ChevronDown } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const { language, setLanguage, t } = useLanguage();

    const menuItems = [
        {
            title: t.aboutUs,
            href: '/about',
            submenu: [
                { title: t.about, href: '/about' },
                { title: t.ourValues, href: '/values' },
                { title: t.leadership, href: '/leadership' },
                { title: t.safety, href: '/safety' },
                { title: t.certificates, href: '/certificates' },
                { title: t.clientsPartners, href: '/clients-partners' },
            ]
        },
        {
            title: t.ourActivity,
            href: '/services',
            submenu: [
                { title: t.construction, href: '/services/construction' },
                { title: t.oilGas, href: '/services/oil-gas' },
                { title: t.energy, href: '/services/energy' },
                { title: t.industry, href: '/services/industry' },
                { title: t.infrastructure, href: '/services/infrastructure' },
            ]
        },
        {
            title: t.ourProjects,
            href: '/projects',
            submenu: [
                { title: t.allProjects, href: '/projects' },
                { title: t.constructionProjects, href: '/projects?category=construction' },
                { title: t.oilGasProjects, href: '/projects?category=oil-gas' },
                { title: t.energyProjects, href: '/projects?category=energy' },
            ]
        },
        {
            title: t.media,
            href: '/media',
            submenu: [
                { title: t.news, href: '/news' },
                { title: t.photoGallery, href: '/media?type=photo' },
                { title: t.videoGallery, href: '/media?type=video' },
                { title: t.press, href: '/media/press' },
            ]
        },
        {
            title: t.career,
            href: '/career',
            submenu: null
        },
    ];

    return (
        <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-xl">B</span>
                        </div>
                        <span className="text-2xl font-bold text-gray-900">BatinoGroup</span>
                    </Link>

                    <nav className="hidden md:flex items-center gap-6">
                        {menuItems.map((item) => (
                            <div
                                key={item.title}
                                className="relative"
                                onMouseEnter={() => setOpenDropdown(item.title)}
                                onMouseLeave={() => setOpenDropdown(null)}
                            >
                                <Link
                                    href={item.href}
                                    className="flex items-center gap-1 text-gray-700 hover:text-blue-600 transition-colors py-2"
                                >
                                    {item.title}
                                    {item.submenu && <ChevronDown className="w-4 h-4" />}
                                </Link>

                                {item.submenu && openDropdown === item.title && (
                                    <div className="absolute top-full left-0 mt-0 w-64 bg-white shadow-xl rounded-lg py-2 border border-gray-100">
                                        {item.submenu.map((subItem) => (
                                            <Link
                                                key={subItem.title}
                                                href={subItem.href}
                                                className="block px-6 py-3 text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                                            >
                                                {subItem.title}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}

                        <Link href="/contact" className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors">
                            <Phone className="w-5 h-5" />
                        </Link>
                        <div className="relative">
                            <button 
                                onClick={() => setOpenDropdown(openDropdown === 'language' ? null : 'language')}
                                className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
                            >
                                <span className="font-medium">{language.toUpperCase()}</span>
                                <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === 'language' ? 'rotate-180' : ''}`} />
                            </button>
                            {openDropdown === 'language' && (
                                <div className="absolute top-full right-0 mt-2 w-40 bg-white shadow-xl rounded-lg py-2 border border-gray-100">
                                    <button
                                        onClick={() => {
                                            setLanguage('az');
                                            setOpenDropdown(null);
                                        }}
                                        className={`w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors ${
                                            language === 'az' ? 'text-blue-600 font-semibold bg-blue-50' : 'text-gray-700'
                                        }`}
                                    >
                                        🇦🇿 Azərbaycan
                                    </button>
                                    <button
                                        onClick={() => {
                                            setLanguage('en');
                                            setOpenDropdown(null);
                                        }}
                                        className={`w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors ${
                                            language === 'en' ? 'text-blue-600 font-semibold bg-blue-50' : 'text-gray-700'
                                        }`}
                                    >
                                        🇬🇧 English
                                    </button>
                                </div>
                            )}
                        </div>
                    </nav>

                    <button
                        className="md:hidden"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                </div>
            </div>

            {isMenuOpen && (
                <div className="md:hidden bg-white border-t max-h-[80vh] overflow-y-auto">
                    <nav className="flex flex-col p-4">
                        {menuItems.map((item) => (
                            <div key={item.title} className="border-b border-gray-100 last:border-0">
                                <Link
                                    href={item.href}
                                    className="flex items-center justify-between py-3 text-gray-700 hover:text-blue-600 font-medium"
                                    onClick={() => !item.submenu && setIsMenuOpen(false)}
                                >
                                    {item.title}
                                    {item.submenu && <ChevronDown className="w-4 h-4" />}
                                </Link>
                                {item.submenu && (
                                    <div className="pl-4 pb-2 space-y-1">
                                        {item.submenu.map((subItem) => (
                                            <Link
                                                key={subItem.title}
                                                href={subItem.href}
                                                className="block py-2 text-sm text-gray-600 hover:text-blue-600"
                                                onClick={() => setIsMenuOpen(false)}
                                            >
                                                {subItem.title}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                        <div className="mt-4 pt-4 border-t border-gray-100">
                            <div className="text-sm text-gray-500 mb-2 px-2">Language / Dil</div>
                            <button
                                onClick={() => setLanguage('az')}
                                className={`w-full text-left px-4 py-3 rounded-lg mb-2 transition-colors ${
                                    language === 'az'
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-100 text-gray-700'
                                }`}
                            >
                                🇦🇿 Azərbaycan
                            </button>
                            <button
                                onClick={() => setLanguage('en')}
                                className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                                    language === 'en'
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-100 text-gray-700'
                                }`}
                            >
                                🇬🇧 English
                            </button>
                        </div>
                    </nav>
                </div>
            )}
        </header>
    );
}
