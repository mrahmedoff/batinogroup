'use client';

import { useParams } from 'next/navigation';
import { useProducts } from '@/contexts/ProductContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ArrowLeft, Package, Search, Image as ImageIcon } from 'lucide-react';
import { useState, useMemo } from 'react';

export default function SubcategoryPage() {
  const params = useParams();
  const subcategoryName = decodeURIComponent(params.subcategoryName as string);
  
  const { 
    categories, 
    products, 
    loading 
  } = useProducts();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');

  // Alt kateqoriyaya aid məhsulları tap
  const subcategoryProducts = products.filter(
    product => product.subcategory === subcategoryName && product.status === 'active'
  );
  
  // Ana kateqoriyanı tap
  const parentCategory = categories.find(cat => {
    const subcategories = categories.filter(sub => 
      sub.type === 'sub' && sub.parentId === cat.id
    );
    return subcategories.some(sub => sub.name === subcategoryName);
  });

  // Filtrlənmiş və sıralanmış məhsullar
  const filteredProducts = useMemo(() => {
    let filtered = subcategoryProducts.filter(product => {
      return product.name.toLowerCase().includes(searchTerm.toLowerCase());
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
  }, [subcategoryProducts, searchTerm, sortBy]);

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="pt-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-slate-600">Alt kateqoriya yüklənir...</p>
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
            {parentCategory && (
              <>
                <Link 
                  href={`/products/category/${parentCategory.id}`}
                  className="hover:text-blue-600 transition-colors"
                >
                  {parentCategory.name}
                </Link>
                <span>/</span>
              </>
            )}
            <span className="text-slate-900 font-medium">{subcategoryName}</span>
          </nav>

          {/* Alt kateqoriya başlığı */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-4">{subcategoryName}</h1>
            <p className="text-lg text-slate-600">
              {subcategoryProducts.length} məhsul mövcuddur
            </p>
          </div>

          {/* Filtrlər və axtarış */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                    <h3 className="font-semibold text-slate-900">
                      {product.name}
                    </h3>
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
                {searchTerm 
                  ? 'Axtarış kriteriyalarınıza uyğun məhsul tapılmadı.'
                  : 'Bu alt kateqoriyada hələ məhsul əlavə edilməyib.'
                }
              </p>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors"
                >
                  Axtarışı təmizlə
                </button>
              )}
            </div>
          )}

          {/* Geri qayıt düyməsi */}
          <div className="mt-12 text-center">
            {parentCategory ? (
              <Link 
                href={`/products/category/${parentCategory.id}`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                {parentCategory.name} kateqoriyasına qayıt
              </Link>
            ) : (
              <Link 
                href="/products"
                className="inline-flex items-center gap-2 px-6 py-3 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Məhsullara qayıt
              </Link>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}