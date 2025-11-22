'use client';

import { useProducts } from '@/contexts/ProductContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function ProductsPage() {
  const { products, getCategoriesByMenuType, getSubCategories, getProductsByCategory } = useProducts();

  // Products menu tipindəki kateqoriyaları al
  const productCategories = getCategoriesByMenuType('products').filter(cat => cat.type === 'main');

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">
              Products & Systems
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our comprehensive range of industrial products, spare parts, and advanced devices
              designed to optimize your operations and enhance productivity.
            </p>
          </div>

          {/* Firebase-dən gələn kateqoriyalar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {productCategories.length > 0 ? (
              productCategories.map((category) => {
                const subcategories = getSubCategories(category.id);
                const categoryProducts = getProductsByCategory(category.id);

                return (
                  <div key={category.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow group cursor-pointer">
                    <Link href={`/products/category/${category.id}`} className="block">
                      <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">{category.name}</h3>
                      <p className="text-gray-600 mb-4">
                        {category.description}
                      </p>

                      {/* Alt kateqoriyalar */}
                      {subcategories.length > 0 && (
                        <div className="mb-4">
                          <h4 className="text-sm font-semibold text-gray-700 mb-2">Subcategories:</h4>
                          <ul className="text-sm text-gray-500 space-y-1">
                            {subcategories.slice(0, 4).map((sub) => (
                              <li key={sub.id}>• {sub.name}</li>
                            ))}
                            {subcategories.length > 4 && (
                              <li className="text-blue-600">• +{subcategories.length - 4} more...</li>
                            )}
                          </ul>
                        </div>
                      )}

                      {/* Məhsul sayı */}
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <p className="text-sm text-gray-600">
                          {categoryProducts.length} products available
                        </p>
                        <span className="inline-block mt-2 text-blue-600 hover:text-blue-800 text-sm font-medium group-hover:underline">
                          Bütün məhsulları gör →
                        </span>
                      </div>
                    </Link>
                  </div>
                );
              })
            ) : (
              // Loading state
              <div className="col-span-3 text-center py-12">
                <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-600">Loading categories...</p>
              </div>
            )}
          </div>


        </div>
      </main>
      <Footer />
    </div>
  );
}