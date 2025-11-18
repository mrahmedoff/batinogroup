'use client';

import { useParams } from 'next/navigation';
import { useProducts } from '@/contexts/ProductContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ArrowLeft, Package, Search, Filter, Image as ImageIcon } from 'lucide-react';
import { useState, useMemo } from 'react';

export default function CategoryPage() {
  const params = useParams();
  const categoryId = params.categoryId as string;
  
  const { 
    categories, 
    products, 
    loading, 
    getSubCategories, 
    getProductsByCategory 
  } = useProducts();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [sortBy, setSortBy] = useState('name');

  // Kateqoriyanı tap
  const category = categories.find(cat => cat.id === categoryId);
  
  // Bu kateqoriyaya aid məhsulları al
  const categoryProducts = getProductsByCategory(categoryId);
  
  // Alt kateqoriyaları al
  const subcategories = getSubCategories(categoryId);
  
  // Filtrlənmiş və sıralanmış məhsullar
  const filteredProducts = useMemo(() => {
    let filtered = categoryProducts.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesSubcategory = !selectedSubcategory || product.subcategory === selectedSubcategory;
      
      return matchesSearch && matchesSubcategory;
    });

    // Sıralama
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        default:
          return 0;
      }
    });

    return filtered;
  }, [categoryProducts, searchTerm, selectedSubcategory, sortBy]);

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="pt-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-slate-600">Kateqoriya yüklənir...</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="pt-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-slate-900 mb-4">Kateqoriya tapılmadı</h1>
              <p className="text-slate-600 mb-8">Axtardığınız kateqoriya mövcud deyil.</p>
              <Link 
                href="/products"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Məhsullara qayıt
              </Link>
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
            <span className="text-slate-900 font-medium">{category.name}</span>
          </nav>

          {/* Kateqoriya başlığı */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-4">{category.name}</h1>
            {category.description && (
              <p className="text-lg text-slate-600 max-w-3xl">{category.description}</p>
            )}
          </div>

          {/* Filtrlər və axtarış */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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

              {/* Alt kateqoriya filtri */}
              <select
                value={selectedSubcategory}
                onChange={(e) => setSelectedSubcategory(e.target.value)}
                className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              >
                <option value="">Bütün Alt Kateqoriyalar</option>
                {subcategories.map((sub) => (
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
                <option value="newest">Ən yenilər</option>
              </select>

              {/* Nəticə sayı */}
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Package className="w-4 h-4" />
                <span>{filteredProducts.length} məhsul tapıldı</span>
              </div>
            </div>
          </div>

          {/* Alt kateqoriyalar (əgər varsa) */}
          {subcategories.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-slate-900 mb-4">Alt Kateqoriyalar</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {subcategories.map((sub) => {
                  const subProducts = categoryProducts.filter(p => p.subcategory === sub.name);
                  return (
                    <button
                      key={sub.id}
                      onClick={() => setSelectedSubcategory(selectedSubcategory === sub.name ? '' : sub.name)}
                      className={`p-4 rounded-lg border transition-all ${
                        selectedSubcategory === sub.name
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <div className="font-medium">{sub.name}</div>
                      <div className="text-sm text-slate-500 mt-1">
                        {subProducts.length} məhsul
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

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
                {searchTerm || selectedSubcategory 
                  ? 'Axtarış kriteriyalarınıza uyğun məhsul tapılmadı.'
                  : 'Bu kateqoriyada hələ məhsul əlavə edilməyib.'
                }
              </p>
              {(searchTerm || selectedSubcategory) && (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedSubcategory('');
                  }}
                  className="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors"
                >
                  Filtrləri təmizlə
                </button>
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}