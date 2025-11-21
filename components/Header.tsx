'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Phone, Menu, ChevronDown } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useProducts } from '@/contexts/ProductContext';
import { useData } from '@/contexts/DataContext';
import MegaMenu from './MegaMenu';
import MobileMenu from './MobileMenu';




export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
    const [activeMegaMenu, setActiveMegaMenu] = useState<'products' | 'about' | 'services' | 'projects' | 'media' | null>(null);

    const { t } = useLanguage();
    const { getCategoriesByMenuType, categoriesLoading } = useProducts();
    const { settings } = useData();

    const menuItems = [
        {
            title: t.aboutUs,
            href: '/about',
            hasMegaMenu: true,
            megaMenuType: 'about' as const
        },
        {
            title: t.products,
            href: '/products',
            hasMegaMenu: true,
            megaMenuType: 'products' as const
        },
        {
            title: t.ourActivity,
            href: '/services',
            hasMegaMenu: true,
            megaMenuType: 'services' as const
        },

        {
            title: t.media,
            href: '/media',
            hasMegaMenu: true,
            megaMenuType: 'media' as const
        },
        {
            title: t.career,
            href: '/career'
        },
    ];

    return (
        <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    <Link href="/" className="flex items-center">
                        <img
                            src={settings.logo || "/batinologo.png"}
                            alt={settings.siteName || "Batino Group Logo"}
                            width={120}
                            height={50}
                            className="object-contain"
                        />
                    </Link>

                    <nav className="hidden md:flex items-center gap-6 relative">
                        {menuItems.map((item) => (
                            <div
                                key={item.title}
                                className="relative"
                                onMouseEnter={() => {
                                    if (item.hasMegaMenu && item.megaMenuType) {
                                        // Always show mega menu, let it handle loading state
                                        setIsMegaMenuOpen(true);
                                        setActiveMegaMenu(item.megaMenuType);
                                        setOpenDropdown(null);
                                    } else {
                                        setOpenDropdown(item.title);
                                        setIsMegaMenuOpen(false);
                                        setActiveMegaMenu(null);
                                    }
                                }}
                                onMouseLeave={() => {
                                    if (!item.hasMegaMenu) {
                                        setOpenDropdown(null);
                                    }
                                }}
                            >
                                <Link
                                    href={item.href}
                                    className="flex items-center gap-1 text-gray-700 hover:text-blue-600 transition-colors py-2"
                                >
                                    {item.title}
                                    {(() => {
                                        if ('submenu' in item && item.submenu) {
                                            return <ChevronDown className="w-4 h-4" />;
                                        }
                                        if (item.hasMegaMenu && item.megaMenuType) {
                                            // Show chevron if has mega menu (loading will be handled in MegaMenu)
                                            return <ChevronDown className="w-4 h-4" />;
                                        }
                                        return null;
                                    })()}
                                </Link>

                                {(() => {
                                    const hasSubmenu = 'submenu' in item && Array.isArray(item.submenu);
                                    if (hasSubmenu && openDropdown === item.title) {
                                        const menuItem = item as { submenu: { title: string; href: string; }[] };
                                        return (
                                            <div className="absolute top-full left-0 mt-0 w-64 bg-white shadow-xl rounded-lg py-2 border border-gray-100">
                                                {menuItem.submenu.map((subItem) => (
                                                    <Link
                                                        key={subItem.title}
                                                        href={subItem.href}
                                                        className="block px-6 py-3 text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                                                    >
                                                        {subItem.title}
                                                    </Link>
                                                ))}
                                            </div>
                                        );
                                    }
                                    return null;
                                })()}
                            </div>
                        ))}

                        <Link href="/contact" className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors">
                            <Phone className="w-5 h-5" />
                        </Link>
                    </nav>

                    <button
                        className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <Menu className="w-6 h-6 text-gray-700" />
                    </button>
                </div>
            </div>

            {activeMegaMenu && (
                <MegaMenu
                    isOpen={isMegaMenuOpen}
                    onClose={() => {
                        setIsMegaMenuOpen(false);
                        setActiveMegaMenu(null);
                    }}
                    menuType={activeMegaMenu}
                />
            )}

            {/* Mobile Menu */}
            <MobileMenu
                isOpen={isMenuOpen}
                onClose={() => setIsMenuOpen(false)}
            />
        </header>
    );
}
