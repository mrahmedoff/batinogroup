'use client';

import { useProducts } from '@/contexts/ProductContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ArrowLeft, Image as ImageIcon } from 'lucide-react';

export default function AllProductsPage() {
  const {
    products,
    loading
  } = useProducts();

  // Get active products
  const activeProducts = products.filter(product => product.status === 'active');

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
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Bütün Məhsullar</h1>
            <p className="text-sm text-slate-600">
              {activeProducts.length} məhsul mövcuddur
            </p>
          </div>

          {/* Məhsullar */}
          {activeProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {activeProducts.map((product) => (
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
              <h3 className="text-lg font-medium text-slate-900 mb-2">
                Məhsul tapılmadı
              </h3>
              <p className="text-slate-600">
                Hələ məhsul əlavə edilməyib.
              </p>
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