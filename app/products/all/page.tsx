'use client';

import { useProducts } from '@/contexts/ProductContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ArrowLeft, Package, Search, Filter, Image as ImageIcon } from 'lucide-react';
import { useState, useMemo } from 'react';

export default function AllProductsPage() {
  const { 
    categories, 
    products, 
    loading,
    getMainCategories,
    getSubCategories 
  } = useProducts();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [sortBy, setSortBy] = useState('name');

  // Aktiv məhsulları al
  const activeProducts = products.filter(product => product.status === 'active');
  
  // Products menu tipindəki kateqoriyaları al
  const mainCategories = getMainCategories().filter(cat => cat.menuType === 'products');
  
  // Seçilmiş kateqoriyaya görə alt kateqoriyaları al
  const availableSubcategories = selectedCategory ? getSubCategories(selectedCategory) : [];

  // Filtrlənmiş və sıralanmış məhsullar
  const filteredProducts = useMemo(() => {
    let filtered = activeProducts.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = !selectedCategory || product.category === selectedCategory;
      const matchesSubcategory = !selectedSubcategory || product.subcategory === selectedSubcategory;
      
      return matchesSearch && matchesCategory && matchesSubcategory;
    });

    // Sıralama
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'category':
          return a.subcategory.localeCompare(b.subcategory);
        default:
          return 0;
      }
    });

    return filtered;
  }, [activeProducts, searchTerm, selectedCategory, selectedSubcategory, sortBy]);

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="pt-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-slate-600">Məhsullar yüklənir...</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-slate-600 mb-8">
            <Link href="/products" className="hover:text-blue-600 transition-colors">
              Məhsullar
            </Link>
            <span>/</span>
            <span className="text-slate-900 font-medium">Bütün Məhsullar</span>
          </nav>

          {/* Başlıq */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-4">Bütün Məhsullar</h1>
            <p className="text-lg text-slate-600">
              Bizim tam məhsul kataloqunda {activeProducts.length} məhsul mövcuddur
            </p>
          </div>

          {/* Filtrlər və axtarış */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {/* Axtarış */}
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <input
                  type="text"
                  placeholder="Məhsul axtar..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>

              {/* Kateqoriya filtri */}
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setSelectedSubcategory(''); // Alt kateqoriyanı sıfırla
                }}
                className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              >
                <option value="">Bütün Kateqoriyalar</option>
                {mainCategories.map((category) => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>

              {/* Alt kateqoriya filtri */}
              <select
                value={selectedSubcategory}
                onChange={(e) => setSelectedSubcategory(e.target.value)}
                className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none disabled:bg-slate-50 disabled:text-slate-400"
                disabled={!selectedCategory}
              >
                <option value="">Bütün Alt Kateqoriyalar</option>
                {availableSubcategories.map((sub) => (
                  <option key={sub.id} value={sub.name}>{sub.name}</option>
                ))}
              </select>

              {/* Sıralama */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              >
                <option value="name">Ada görə (A-Z)</option>
                <option value="category">Kateqoriyaya görə</option>
                <option value="newest">Ən yenilər</option>
              </select>

              {/* Nəticə sayı */}
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Package className="w-4 h-4" />
                <span>{filteredProducts.length} məhsul</span>
              </div>
            </div>

            {/* Aktiv filtrlər */}
            {(searchTerm || selectedCategory || selectedSubcategory) && (
              <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-slate-200">
                <span className="text-sm text-slate-600">Aktiv filtrlər:</span>
                {searchTerm && (
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full flex items-center gap-1">
                    Axtarış: "{searchTerm}"
                    <button onClick={() => setSearchTerm('')} className="ml-1 hover:text-blue-900">×</button>
                  </span>
                )}
                {selectedCategory && (
                  <span className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full flex items-center gap-1">
                    {mainCategories.find(c => c.id === selectedCategory)?.name}
                    <button onClick={() => { setSelectedCategory(''); setSelectedSubcategory(''); }} className="ml-1 hover:text-green-900">×</button>
                  </span>
                )}
                {selectedSubcategory && (
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 text-sm rounded-full flex items-center gap-1">
                    {selectedSubcategory}
                    <button onClick={() => setSelectedSubcategory('')} className="ml-1 hover:text-purple-900">×</button>
                  </span>
                )}
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('');
                    setSelectedSubcategory('');
                  }}
                  className="px-3 py-1 bg-slate-100 text-slate-600 text-sm rounded-full hover:bg-slate-200"
                >
                  Hamısını təmizlə
                </button>
              </div>
            )}
          </div>

          {/* Məhsullar */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-slate-200 overflow-hidden">
                  {/* Məhsul şəkli */}
                  <div className="aspect-square bg-gray-100 flex items-center justify-center">
                    {product.image ? (
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <ImageIcon className="w-12 h-12 text-gray-400" />
                    )}
                  </div>
                  
                  <div className="p-6">
                    <h3 className="font-semibold text-slate-900 mb-2 line-clamp-2">
                      {product.name}
                    </h3>
                    
                    <div className="text-sm text-blue-600">
                      {product.subcategory}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Package className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-900 mb-2">
                Məhsul tapılmadı
              </h3>
              <p className="text-slate-600 mb-6">
                Axtarış kriteriyalarınıza uyğun məhsul tapılmadı. Filtrləri dəyişdirməyi cəhd edin.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('');
                  setSelectedSubcategory('');
                }}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Bütün məhsulları göstər
              </button>
            </div>
          )}

          {/* Geri qayıt */}
          <div className="mt-12 text-center">
            <Link 
              href="/products"
              className="inline-flex items-center gap-2 px-6 py-3 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Məhsul kateqoriyalarına qayıt
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}