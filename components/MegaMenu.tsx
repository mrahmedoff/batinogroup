'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { useProducts } from '@/contexts/ProductContext';
import { useLanguage } from '@/contexts/LanguageContext';

interface MegaMenuProps {
    isOpen: boolean;
    onClose: () => void;
    menuType: 'products' | 'about' | 'services' | 'projects' | 'media';
}

export default function MegaMenu({ isOpen, onClose, menuType }: MegaMenuProps) {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const { getCategoriesByMenuType, getSubCategories } = useProducts();
    const { language } = useLanguage();

    // Firebase-dən kateqoriyaları al
    const getMainCategories = () => {
        const categories = getCategoriesByMenuType(menuType);
        return categories.filter(category => category.type === 'main');
    };

    // Seçilmiş kateqoriyaya aid alt kateqoriyaları al
    const getSelectedSubcategories = (categoryId: string) => {
        return getSubCategories(categoryId);
    };



    if (!isOpen) return null;

    // Firebase-dən əsas kateqoriyaları əldə et
    const mainCategories = getMainCategories();
    
    // Əgər heç bir kateqoriya yoxdursa, mega menu göstərmə
    if (mainCategories.length === 0) {
        return null;
    }

    const getBaseUrl = (menuType: string) => {
        switch (menuType) {
            case 'products': return `/${language}/products`;
            case 'about': return `/${language}/about`;
            case 'services': return `/${language}/services`;
            case 'projects': return `/${language}/projects`;
            case 'media': return `/${language}/media`;
            default: return `/${language}`;
        }
    };

    return (
        <div
            className="absolute top-full left-0 w-full bg-white shadow-2xl border-t border-gray-200 z-50 backdrop-blur-sm"
            onMouseLeave={() => {
                setSelectedCategory(null);
                onClose();
            }}
        >
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col lg:flex-row min-h-[400px]">
                    {/* Sol tərəf - Kateqoriyalar */}
                    <div className="w-full lg:w-80 bg-gradient-to-br from-gray-50 to-gray-100 border-r-0 lg:border-r border-gray-200 border-b lg:border-b-0">
                        <div className="p-4 lg:p-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                                <span className="w-2 h-6 bg-blue-500 rounded-full mr-3"></span>
                                Kateqoriyalar
                            </h3>
                            <ul className="space-y-1">
                                {mainCategories.map((category) => (
                                    <li key={category.id}>
                                        <button
                                            className={`w-full text-left flex items-center justify-between py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 ${
                                                selectedCategory === category.id
                                                    ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-500 shadow-md'
                                                    : 'text-gray-700 hover:bg-white hover:text-gray-900 hover:shadow-md'
                                            }`}
                                            onMouseEnter={() => setSelectedCategory(category.id)}
                                            onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
                                        >
                                            <span className="font-medium">{category.name}</span>
                                            <ChevronRight 
                                                className={`w-4 h-4 transition-transform duration-200 ${
                                                    selectedCategory === category.id ? 'rotate-90 text-blue-500' : 'text-gray-400'
                                                }`} 
                                            />
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Sağ tərəf - Alt kateqoriyalar */}
                    <div className="flex-1 relative overflow-hidden min-h-[300px] lg:min-h-[400px]">
                        {selectedCategory && (
                            <div 
                                className="absolute inset-0 p-4 lg:p-6 animate-slide-in-right"
                                key={selectedCategory}
                            >
                                {(() => {
                                    const category = mainCategories.find(cat => cat.id === selectedCategory);
                                    const subcategories = getSelectedSubcategories(selectedCategory);
                                    
                                    if (!category) return null;

                                    return (
                                        <>
                                            <div className="mb-6 pb-4 border-b border-gray-200">
                                                <h4 className="text-lg lg:text-xl font-bold text-gray-900 mb-2">
                                                    {category.name}
                                                </h4>
                                                {category.description && (
                                                    <p className="text-gray-600 text-sm">
                                                        {category.description}
                                                    </p>
                                                )}
                                            </div>

                                            {subcategories.length > 0 ? (
                                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
                                                    {subcategories.map((subcategory) => (
                                                        <Link
                                                            key={subcategory.id}
                                                            href={`${getBaseUrl(menuType)}/subcategory/${encodeURIComponent(subcategory.name)}`}
                                                            className="group p-3 lg:p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-lg hover:bg-blue-50 transition-all duration-300 bg-white transform hover:-translate-y-1"
                                                            onClick={onClose}
                                                        >
                                                            <div className="flex items-center justify-between">
                                                                <div className="flex-1 min-w-0">
                                                                    <h5 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 text-sm lg:text-base">
                                                                        {subcategory.name}
                                                                    </h5>
                                                                    {subcategory.description && (
                                                                        <p className="text-xs lg:text-sm text-gray-500 mt-1 line-clamp-2">
                                                                            {subcategory.description}
                                                                        </p>
                                                                    )}
                                                                </div>
                                                                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors duration-200 ml-2 flex-shrink-0" />
                                                            </div>
                                                        </Link>
                                                    ))}
                                                </div>
                                            ) : (
                                                <div className="text-center py-8 lg:py-12">
                                                    <p className="text-gray-500 text-sm lg:text-base">Bu kateqoriyada alt kateqoriya yoxdur</p>
                                                    <Link
                                                        href={`${getBaseUrl(menuType)}/category/${category.id}`}
                                                        className="inline-block mt-4 px-4 lg:px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm lg:text-base"
                                                        onClick={onClose}
                                                    >
                                                        Kateqoriyaya keç
                                                    </Link>
                                                </div>
                                            )}
                                        </>
                                    );
                                })()}
                            </div>
                        )}
                        
                        {!selectedCategory && (
                            <div className="flex items-center justify-center h-full">
                                <div className="text-center p-4">
                                    <div className="w-12 h-12 lg:w-16 lg:h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <ChevronRight className="w-6 h-6 lg:w-8 lg:h-8 text-gray-400" />
                                    </div>
                                    <p className="text-gray-500 text-base lg:text-lg">Kateqoriya seçin</p>
                                    <p className="text-gray-400 text-xs lg:text-sm mt-1">
                                        <span className="hidden lg:inline">Sol tərəfdən kateqoriya üzərinə gəlin</span>
                                        <span className="lg:hidden">Kateqoriya üzərinə toxunun</span>
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}