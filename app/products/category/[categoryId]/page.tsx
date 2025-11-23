'use client';

import { useParams } from 'next/navigation';
import { useProducts } from '@/contexts/ProductContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ArrowLeft, Image as ImageIcon } from 'lucide-react';

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

  // Kateqoriyanı tap
  const category = categories.find(cat => cat.id === categoryId);

  // Bu kateqoriyaya aid məhsulları al
  const categoryProducts = getProductsByCategory(categoryId);

  // Alt kateqoriyaları al
  const subcategories = getSubCategories(categoryId);

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="pt-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-slate-600">Loading category...</p>
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
              <h1 className="text-2xl font-bold text-slate-900 mb-4">Category Not Found</h1>
              <p className="text-slate-600 mb-8">The category you are looking for does not exist.</p>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Products
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
              Products
            </Link>
            <span>/</span>
            <span className="text-slate-900 font-medium">{category.name}</span>
          </nav>

          {/* Category header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">{category.name}</h1>
            <p className="text-sm text-slate-600">
              {categoryProducts.length} products available
            </p>
          </div>


          {/* Products */}
          {categoryProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {categoryProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-slate-200 overflow-hidden">
                  {/* Product Image */}
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
                No Products Found
              </h3>
              <p className="text-slate-600">
                No products have been added to this category yet.
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}