'use client';

import { useParams } from 'next/navigation';
import { useProducts } from '@/contexts/ProductContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ArrowLeft, Image as ImageIcon } from 'lucide-react';

export default function SubcategoryPage() {
  const params = useParams();
  const subcategoryName = decodeURIComponent(params.subcategoryName as string);

  const {
    categories,
    products,
    loading
  } = useProducts();

  // Find products belonging to subcategory
  const subcategoryProducts = products.filter(
    product => product.subcategory === subcategoryName && product.status === 'active'
  );

  // Find subcategory
  const subcategory = categories.find(cat =>
    cat.type === 'sub' && cat.name === subcategoryName
  );

  // Find parent category
  const parentCategory = subcategory ? categories.find(cat =>
    cat.id === subcategory.parentId
  ) : null;


  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="pt-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-slate-600">Loading subcategory...</p>
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
      <main className="pt-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb - simple as in reference image */}
          <nav className="flex items-center gap-2 text-xs text-gray-500 mb-6">
            <Link href="/products" className="hover:text-blue-600 transition-colors">
              Products
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
            <span className="text-gray-700">{subcategoryName}</span>
          </nav>

          {/* Subcategory header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{subcategoryName}</h1>
            <div className="text-sm text-gray-500">
              {subcategoryProducts.length} products available
            </div>
          </div>

          {/* Products */}
          {subcategoryProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {subcategoryProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-slate-200 overflow-hidden">
                  {/* Product image */}
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
              <h3 className="text-lg font-medium text-slate-900 mb-2">
                No Products Found
              </h3>
              <p className="text-slate-600">
                No products have been added to this subcategory yet.
              </p>
            </div>
          )}

          {/* Back button */}
          <div className="mt-12 text-center">
            {parentCategory ? (
              <Link
                href={`/products/category/${parentCategory.id}`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to {parentCategory.name}
              </Link>
            ) : (
              <Link
                href="/products"
                className="inline-flex items-center gap-2 px-6 py-3 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Products
              </Link>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}