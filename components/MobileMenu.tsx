'use client';

import { useState } from 'react';
import Link from 'next/link';
import { X, ChevronRight, ChevronLeft, Phone } from 'lucide-react';
import { useProducts } from '@/contexts/ProductContext';
import { useLanguage } from '@/contexts/LanguageContext';

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedMenuType, setSelectedMenuType] = useState<'products' | 'about' | 'services' | 'projects' | 'media' | null>(null);
    const { getCategoriesByMenuType, getSubCategories } = useProducts();
    const { t } = useLanguage();

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
            href: '/career',
            hasMegaMenu: false
        },
    ];

    // Firebase-dən kateqoriyaları al
    const getMainCategories = (menuType: string) => {
        const categories = getCategoriesByMenuType(menuType);
        return categories.filter(category => category.type === 'main');
    };

    // Seçilmiş kateqoriyaya aid alt kateqoriyaları al
    const getSelectedSubcategories = (categoryId: string) => {
        return getSubCategories(categoryId);
    };

    const getBaseUrl = (menuType: string) => {
        switch (menuType) {
            case 'products': return '/products';
            case 'about': return '/about';
            case 'services': return '/services';
            case 'projects': return '/projects';
            case 'media': return '/media';
            default: return '/';
        }
    };

    const handleMenuItemClick = (item: typeof menuItems[0]) => {
        if (item.hasMegaMenu && item.megaMenuType) {
            const categories = getMainCategories(item.megaMenuType);
            if (categories.length > 0) {
                setSelectedMenuType(item.megaMenuType);
                return;
            }
        }
        // Əgər mega menu yoxdursa və ya kateqoriya yoxdursa, birbaşa keçid et
        window.location.href = item.href;
        onClose();
    };

    const handleBackToMain = () => {
        setSelectedCategory(null);
        setSelectedMenuType(null);
    };

    const handleBackToCategories = () => {
        setSelectedCategory(null);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 md:hidden">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in-backdrop"
                onClick={onClose}
            />
            
            {/* Menu Panel */}
            <div className="absolute inset-y-0 right-0 w-full max-w-sm bg-white shadow-2xl animate-slide-in-from-right">
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-blue-100">
                        <div className="flex items-center gap-3">
                            {(selectedMenuType || selectedCategory) && (
                                <button
                                    onClick={selectedCategory ? handleBackToCategories : handleBackToMain}
                                    className="p-2 rounded-full hover:bg-white/50 transition-colors"
                                >
                                    <ChevronLeft className="w-5 h-5 text-blue-600" />
                                </button>
                            )}
                            <h2 className="text-lg font-bold text-gray-900">
                                {selectedCategory ? (
                                    (() => {
                                        const category = selectedMenuType ? 
                                            getMainCategories(selectedMenuType).find(cat => cat.id === selectedCategory) : 
                                            null;
                                        return category?.name || t.subcategories;
                                    })()
                                ) : selectedMenuType ? (
                                    t.categories
                                ) : (
                                    t.menu
                                )}
                            </h2>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 rounded-full hover:bg-white/50 transition-colors"
                        >
                            <X className="w-6 h-6 text-gray-600" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto">
                        {!selectedMenuType && !selectedCategory && (
                            // Ana menyu
                            <div className="p-4">
                                <nav className="space-y-2">
                                    {menuItems.map((item) => {
                                        const hasSubMenu = item.hasMegaMenu && item.megaMenuType && getCategoriesByMenuType(item.megaMenuType).length > 0;
                                        
                                        if (hasSubMenu) {
                                            return (
                                                <button
                                                    key={item.title}
                                                    onClick={() => handleMenuItemClick(item)}
                                                    className="w-full flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-gray-50 to-gray-100 hover:from-blue-50 hover:to-blue-100 hover:border-blue-200 border border-transparent transition-all duration-200 transform hover:scale-105"
                                                >
                                                    <span className="font-medium text-gray-900">{item.title}</span>
                                                    <ChevronRight className="w-5 h-5 text-blue-500" />
                                                </button>
                                            );
                                        } else {
                                            return (
                                                <Link
                                                    key={item.title}
                                                    href={item.href}
                                                    onClick={onClose}
                                                    className="w-full flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-gray-50 to-gray-100 hover:from-blue-50 hover:to-blue-100 hover:border-blue-200 border border-transparent transition-all duration-200 transform hover:scale-105"
                                                >
                                                    <span className="font-medium text-gray-900">{item.title}</span>
                                                </Link>
                                            );
                                        }
                                    })}
                                    
                                    {/* Contact Link */}
                                    <Link
                                        href="/contact"
                                        onClick={onClose}
                                        className="w-full flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 hover:border-green-200 border border-transparent transition-all duration-200 transform hover:scale-105"
                                    >
                                        <span className="font-medium text-gray-900">{t.contact}</span>
                                        <Phone className="w-5 h-5 text-green-500" />
                                    </Link>
                                </nav>
                            </div>
                        )}

                        {selectedMenuType && !selectedCategory && (
                            // Kateqoriyalar
                            <div className="p-4 animate-slide-in-right">
                                {/* Əsas səhifəyə keçid */}
                                <div className="mb-4">
                                    <Link
                                        href={getBaseUrl(selectedMenuType)}
                                        onClick={onClose}
                                        className="w-full flex items-center justify-center p-4 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white transition-all duration-200 transform hover:scale-105"
                                    >
                                        <span className="font-medium">
                                            {selectedMenuType === 'about' && t.aboutUs}
                                            {selectedMenuType === 'products' && t.products}
                                            {selectedMenuType === 'services' && t.ourActivity}
                                            {selectedMenuType === 'media' && t.media}
                                            {' səhifəsinə keç'}
                                        </span>
                                    </Link>
                                </div>
                                
                                <div className="space-y-2">
                                    {getMainCategories(selectedMenuType).map((category) => (
                                        <button
                                            key={category.id}
                                            onClick={() => setSelectedCategory(category.id)}
                                            className="w-full flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-gray-50 to-gray-100 hover:from-blue-50 hover:to-blue-100 hover:border-blue-200 border border-transparent transition-all duration-200 transform hover:scale-105"
                                        >
                                            <div className="text-left">
                                                <div className="font-medium text-gray-900">{category.name}</div>
                                                {category.description && (
                                                    <div className="text-sm text-gray-500 mt-1 line-clamp-2">
                                                        {category.description}
                                                    </div>
                                                )}
                                            </div>
                                            <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 ml-2" />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {selectedMenuType && selectedCategory && (
                            // Alt kateqoriyalar
                            <div className="p-4 animate-slide-in-right">
                                {(() => {
                                    const category = getMainCategories(selectedMenuType).find(cat => cat.id === selectedCategory);
                                    const subcategories = getSelectedSubcategories(selectedCategory);
                                    
                                    if (!category) return null;

                                    return (
                                        <>
                                            {/* Kateqoriya məlumatları */}
                                            <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
                                                <h3 className="font-bold text-gray-900 mb-2">{category.name}</h3>
                                                {category.description && (
                                                    <p className="text-sm text-gray-600">{category.description}</p>
                                                )}
                                            </div>

                                            {subcategories.length > 0 ? (
                                                <div className="space-y-2">
                                                    {subcategories.map((subcategory) => (
                                                        <Link
                                                            key={subcategory.id}
                                                            href={`${getBaseUrl(selectedMenuType)}/subcategory/${encodeURIComponent(subcategory.name)}`}
                                                            onClick={onClose}
                                                            className="block p-4 rounded-lg bg-white border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200"
                                                        >
                                                            <div className="flex items-center justify-between">
                                                                <div>
                                                                    <div className="font-medium text-gray-900">{subcategory.name}</div>
                                                                    {subcategory.description && (
                                                                        <div className="text-sm text-gray-500 mt-1 line-clamp-2">
                                                                            {subcategory.description}
                                                                        </div>
                                                                    )}
                                                                </div>
                                                                <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0 ml-2" />
                                                            </div>
                                                        </Link>
                                                    ))}
                                                </div>
                                            ) : (
                                                <div className="text-center py-8">
                                                    <p className="text-gray-500 mb-4">{t.noSubcategories}</p>
                                                    <Link
                                                        href={`${getBaseUrl(selectedMenuType)}/category/${category.id}`}
                                                        onClick={onClose}
                                                        className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                                                    >
                                                        {t.goToCategory}
                                                    </Link>
                                                </div>
                                            )}
                                        </>
                                    );
                                })()}
                            </div>
                        )}
                    </div>


                </div>
            </div>
        </div>
    );
}