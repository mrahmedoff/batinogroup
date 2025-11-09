'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  getProducts, 
  addProduct, 
  updateProduct, 
  deleteProduct, 
  subscribeToProductsChanges,
  Product 
} from '@/lib/firebase/products';
import { 
  getCategories, 
  addCategory, 
  updateCategory, 
  deleteCategory, 
  subscribeToCategoriesChanges,
  Category 
} from '@/lib/firebase/categories';

interface ProductContextType {
  // Products
  products: Product[];
  loading: boolean;
  error: string | null;
  addProduct: (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => Promise<string>;
  updateProduct: (id: string, product: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  
  // Categories
  categories: Category[];
  categoriesLoading: boolean;
  categoriesError: string | null;
  addCategory: (category: Omit<Category, 'id' | 'createdAt' | 'updatedAt'>) => Promise<string>;
  updateCategory: (id: string, category: Partial<Category>) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;
  
  // Helper functions
  getCategoriesByMenuType: (menuType: string) => Category[];
  getProductsByCategory: (category: string) => Product[];
  getMainCategories: () => Category[];
  getSubCategories: (parentId: string) => Category[];
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    // During SSR, return default values instead of throwing
    if (typeof window === 'undefined') {
      return {
        products: [],
        loading: false,
        error: null,
        addProduct: async () => '',
        updateProduct: async () => {},
        deleteProduct: async () => {},
        categories: [],
        categoriesLoading: false,
        categoriesError: null,
        addCategory: async () => '',
        updateCategory: async () => {},
        deleteCategory: async () => {},
        getCategoriesByMenuType: () => [],
        getProductsByCategory: () => [],
        getMainCategories: () => [],
        getSubCategories: () => []
      };
    }
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};

interface ProductProviderProps {
  children: ReactNode;
}

export const ProductProvider: React.FC<ProductProviderProps> = ({ children }) => {
  // Products state
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Categories state
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [categoriesError, setCategoriesError] = useState<string | null>(null);

  // Load initial data and setup real-time listeners
  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') {
      setLoading(false);
      setCategoriesLoading(false);
      return;
    }

    let unsubscribeProducts: (() => void) | undefined;
    let unsubscribeCategories: (() => void) | undefined;

    const setupListeners = async () => {
      try {
        console.log('Setting up Firebase listeners...');
        
        // Check Firebase configuration
        const { isFirebaseConfigured } = await import('@/lib/firebase');
        console.log('Firebase configured:', isFirebaseConfigured);
        
        if (!isFirebaseConfigured) {
          console.error('Firebase not configured! Please check your environment variables.');
          setError('Firebase not configured');
          setCategoriesError('Firebase not configured');
          setProducts([]);
          setCategories([]);
          setLoading(false);
          setCategoriesLoading(false);
          return;
        }
        
        // Setup products listener with error handling
        unsubscribeProducts = subscribeToProductsChanges(
          (newProducts) => {
            console.log('Products updated:', newProducts.length);
            setProducts(newProducts);
            setLoading(false);
            setError(null);
          }
        );

        // Setup categories listener with error handling
        unsubscribeCategories = subscribeToCategoriesChanges(
          (newCategories) => {
            console.log('Categories updated:', newCategories.length);
            setCategories(newCategories);
            setCategoriesLoading(false);
            setCategoriesError(null);
          }
        );

      } catch (err) {
        console.error('Error setting up listeners:', err);
        const errorMessage = err instanceof Error ? err.message : 'Firebase connection error';
        setError(errorMessage);
        setCategoriesError(errorMessage);
        setLoading(false);
        setCategoriesLoading(false);
      }
    };

    // Add delay to ensure Firebase is initialized
    const timer = setTimeout(setupListeners, 1000);

    // Cleanup listeners on unmount
    return () => {
      clearTimeout(timer);
      if (unsubscribeProducts) {
        try {
          unsubscribeProducts();
        } catch (err) {
          console.warn('Error unsubscribing from products:', err);
        }
      }
      if (unsubscribeCategories) {
        try {
          unsubscribeCategories();
        } catch (err) {
          console.warn('Error unsubscribing from categories:', err);
        }
      }
    };
  }, []);

  // Product functions
  const handleAddProduct = async (productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const id = await addProduct(productData);
      return id;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error adding product');
      throw err;
    }
  };

  const handleUpdateProduct = async (id: string, productData: Partial<Product>) => {
    try {
      await updateProduct(id, productData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error updating product');
      throw err;
    }
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      await deleteProduct(id);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error deleting product');
      throw err;
    }
  };

  // Category functions
  const handleAddCategory = async (categoryData: Omit<Category, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const id = await addCategory(categoryData);
      return id;
    } catch (err) {
      setCategoriesError(err instanceof Error ? err.message : 'Error adding category');
      throw err;
    }
  };

  const handleUpdateCategory = async (id: string, categoryData: Partial<Category>) => {
    try {
      await updateCategory(id, categoryData);
    } catch (err) {
      setCategoriesError(err instanceof Error ? err.message : 'Error updating category');
      throw err;
    }
  };

  const handleDeleteCategory = async (id: string) => {
    try {
      await deleteCategory(id);
    } catch (err) {
      setCategoriesError(err instanceof Error ? err.message : 'Error deleting category');
      throw err;
    }
  };

  // Helper functions
  const getCategoriesByMenuType = (menuType: string): Category[] => {
    return categories.filter(cat => cat.menuType === menuType && cat.status === 'active');
  };

  const getProductsByCategory = (category: string): Product[] => {
    return products.filter(product => product.category === category && product.status === 'active');
  };

  const getMainCategories = (): Category[] => {
    return categories.filter(cat => cat.type === 'main' && cat.status === 'active');
  };

  const getSubCategories = (parentId: string): Category[] => {
    return categories.filter(cat => cat.type === 'sub' && cat.parentId === parentId && cat.status === 'active');
  };

  const value: ProductContextType = {
    // Products
    products,
    loading,
    error,
    addProduct: handleAddProduct,
    updateProduct: handleUpdateProduct,
    deleteProduct: handleDeleteProduct,
    
    // Categories
    categories,
    categoriesLoading,
    categoriesError,
    addCategory: handleAddCategory,
    updateCategory: handleUpdateCategory,
    deleteCategory: handleDeleteCategory,
    
    // Helper functions
    getCategoriesByMenuType,
    getProductsByCategory,
    getMainCategories,
    getSubCategories,
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};