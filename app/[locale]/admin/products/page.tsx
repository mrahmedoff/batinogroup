'use client';

import { useState } from 'react';
import { Plus, Edit2, Trash2, Search, X, Upload, Image as ImageIcon } from 'lucide-react';
import { useProducts } from '@/contexts/ProductContext';
import { Product } from '@/lib/firebase/products';
import { 
  uploadProductImage, 
  validateImageFile, 
  createImagePreview, 
  revokeImagePreview 
} from '@/lib/firebase/storage';






export default function ProductsAdmin() {
  const { 
    products, 
    loading, 
    error, 
    addProduct, 
    updateProduct, 
    deleteProduct,
    getMainCategories,
    getSubCategories 
  } = useProducts();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Bu məhsulu silmək istədiyinizə əminsiniz?')) {
      try {
        await deleteProduct(id);
      } catch (error) {
        console.error('Error deleting product:', error);
        alert('Məhsul silinərkən xəta baş verdi');
      }
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    const matchesSubcategory = !selectedSubcategory || product.subcategory === selectedSubcategory;
    
    return matchesSearch && matchesCategory && matchesSubcategory;
  });

  const mainCategories = getMainCategories().filter(cat => cat.menuType === 'products');
  const getAvailableSubcategories = (categoryId: string) => {
    return getSubCategories(categoryId);
  };



  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Məhsullar yüklənir...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-600 mb-4">Xəta: {error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Yenidən cəhd et
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Məhsullar</h1>
          <p className="text-sm text-slate-500 mt-1">Məhsul və materialları idarə edin</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => { setEditingProduct(null); setIsModalOpen(true); }}
            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" strokeWidth={2} />
            Yeni Məhsul
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
          
          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setSelectedSubcategory('');
            }}
            className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          >
            <option value="">Bütün Kateqoriyalar</option>
            {mainCategories.map((category) => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>

          <select
            value={selectedSubcategory}
            onChange={(e) => setSelectedSubcategory(e.target.value)}
            className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none disabled:bg-slate-50 disabled:text-slate-400"
            disabled={!selectedCategory}
          >
            <option value="">Bütün Alt Kateqoriyalar</option>
            {selectedCategory && getAvailableSubcategories(selectedCategory).map((sub) => (
              <option key={sub.id} value={sub.name}>{sub.name}</option>
            ))}
          </select>

          <div className="flex items-center gap-2 text-sm text-slate-600">
            <span className="w-4 h-4 bg-blue-100 text-blue-600 rounded text-xs flex items-center justify-center font-semibold">
              {filteredProducts.length}
            </span>
            <span>məhsul</span>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl overflow-hidden border border-slate-200">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Məhsul</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Kateqoriya</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Alt Kateqoriya</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Status</th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-slate-600 uppercase">Əməliyyatlar</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {filteredProducts.map((product) => (
              <tr key={product.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    {product.image ? (
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-12 h-12 rounded-lg object-cover border border-slate-200"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center border border-slate-200">
                        <ImageIcon className="w-5 h-5 text-slate-400" />
                      </div>
                    )}
                    <div>
                      <div className="text-sm font-medium text-slate-900">{product.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-slate-900">
                  {mainCategories.find(cat => cat.id === product.category)?.name || product.category}
                </td>
                <td className="px-6 py-4 text-sm text-slate-900">
                  {product.subcategory}
                </td>

                <td className="px-6 py-4">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    product.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {product.status === 'active' ? 'Aktiv' : 'Deaktiv'}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => handleEdit(product)}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium mr-4 inline-flex items-center gap-1"
                  >
                    <Edit2 className="w-4 h-4" strokeWidth={2} />
                    Redaktə
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="text-sm text-red-600 hover:text-red-700 font-medium inline-flex items-center gap-1"
                  >
                    <Trash2 className="w-4 h-4" strokeWidth={2} />
                    Sil
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <ProductModal 
          product={editingProduct}
          categories={mainCategories}
          getSubCategories={getAvailableSubcategories}
          onClose={() => setIsModalOpen(false)}
          onSave={async (productData: any) => {
            try {
              if (editingProduct) {
                await updateProduct(editingProduct.id, productData);
              } else {
                await addProduct(productData);
              }
              setIsModalOpen(false);
            } catch (error) {
              console.error('Error saving product:', error);
              alert('Məhsul yadda saxlanılarkən xəta baş verdi');
            }
          }}
        />
      )}
    </div>
  );
}

function ProductModal({ product, categories, getSubCategories, onClose, onSave }: any) {
  const [formData, setFormData] = useState(product || {
    name: '',
    category: '',
    subcategory: '',
    status: 'active',
    image: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>(product?.image || '');
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const getAvailableSubcategories = () => {
    if (!formData.category) return [];
    return getSubCategories(formData.category);
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validation = validateImageFile(file);
    if (!validation.isValid) {
      alert(validation.error);
      return;
    }

    setSelectedImage(file);
    
    // Köhnə preview-i təmizlə
    if (imagePreview && imagePreview !== product?.image) {
      revokeImagePreview(imagePreview);
    }
    
    // Yeni preview yarat
    const preview = createImagePreview(file);
    setImagePreview(preview);
  };

  const handleRemoveImage = () => {
    if (imagePreview && imagePreview !== product?.image) {
      revokeImagePreview(imagePreview);
    }
    setSelectedImage(null);
    setImagePreview('');
    setFormData({...formData, image: ''});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      let imageUrl = formData.image;
      
      // Əgər yeni şəkil seçilibsə, onu yüklə
      if (selectedImage) {
        setIsUploadingImage(true);
        imageUrl = await uploadProductImage(selectedImage, product?.id);
        setIsUploadingImage(false);
      }
      
      const productData = {
        ...formData,
        image: imageUrl
      };
      
      await onSave(productData);
      
      // Preview-i təmizlə
      if (imagePreview && imagePreview !== product?.image) {
        revokeImagePreview(imagePreview);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Məhsul yadda saxlanılarkən xəta baş verdi');
      setIsUploadingImage(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-900">
            {product ? 'Məhsulu Redaktə Et' : 'Yeni Məhsul'}
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5 text-slate-400" strokeWidth={2} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Məhsul Şəkli</label>
            <div className="space-y-3">
              {imagePreview ? (
                <div className="relative inline-block">
                  <img 
                    src={imagePreview} 
                    alt="Məhsul şəkli"
                    className="w-32 h-32 rounded-lg object-cover border border-slate-200"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="w-32 h-32 border-2 border-dashed border-slate-300 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <ImageIcon className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                    <p className="text-xs text-slate-500">Şəkil yoxdur</p>
                  </div>
                </div>
              )}
              
              <div>
                <input
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/webp"
                  onChange={handleImageSelect}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="inline-flex items-center gap-2 px-3 py-2 bg-slate-100 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-200 transition-colors cursor-pointer"
                >
                  <Upload className="w-4 h-4" />
                  Şəkil Seç
                </label>
                <p className="text-xs text-slate-500 mt-1">
                  JPEG, PNG, WebP formatları. Maksimum 5MB.
                </p>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Məhsul Adı</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="Məhsul adını daxil edin"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Kateqoriya</label>
            <select
              required
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value, subcategory: ''})}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            >
              <option value="">Kateqoriya seçin</option>
              {categories.map((category: any) => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Alt Kateqoriya</label>
            <select
              required
              value={formData.subcategory}
              onChange={(e) => setFormData({...formData, subcategory: e.target.value})}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none disabled:bg-slate-50 disabled:text-slate-400"
              disabled={!formData.category}
            >
              <option value="">Alt kateqoriya seçin</option>
              {getAvailableSubcategories().map((sub: any) => (
                <option key={sub.id} value={sub.name}>{sub.name}</option>
              ))}
            </select>
          </div>



          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({...formData, status: e.target.value as 'active' | 'inactive'})}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            >
              <option value="active">Aktiv</option>
              <option value="inactive">Deaktiv</option>
            </select>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={isSubmitting || isUploadingImage}
              className="flex-1 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isUploadingImage ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Şəkil yüklənir...
                </>
              ) : isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Yadda saxlanılır...
                </>
              ) : (
                'Yadda saxla'
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting || isUploadingImage}
              className="flex-1 px-4 py-2 bg-slate-200 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-300 transition-colors disabled:opacity-50"
            >
              Ləğv et
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}