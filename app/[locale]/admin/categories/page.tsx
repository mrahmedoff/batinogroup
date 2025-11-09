'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, FolderOpen, Search, ChevronRight, X, Package } from 'lucide-react';
import { useProducts } from '@/contexts/ProductContext';
import { Category } from '@/lib/firebase/categories';



const MENU_TYPES = {
  'products': 'Products & Systems',
  'about': 'About Us',
  'services': 'Services',
  'projects': 'Projects',
  'media': 'Media'
};

export default function CategoriesAdmin() {
  const { 
    categories, 
    categoriesLoading, 
    categoriesError, 
    addCategory, 
    updateCategory, 
    deleteCategory,
    getMainCategories,
    getSubCategories 
  } = useProducts();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMenuType, setSelectedMenuType] = useState('products');

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Bu kateqoriyanı silmək istədiyinizə əminsiniz?')) {
      // Check if category has subcategories
      const hasSubcategories = categories.some(c => c.parentId === id);
      if (hasSubcategories) {
        alert('Bu kateqoriyanın alt kateqoriyaları var. Əvvəlcə onları silin.');
        return;
      }
      
      try {
        await deleteCategory(id);
      } catch (error) {
        console.error('Error deleting category:', error);
        alert('Kateqoriya silinərkən xəta baş verdi');
      }
    }
  };

  const filteredCategories = categories.filter(category => {
    const matchesSearch = category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         category.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMenuType = !selectedMenuType || category.menuType === selectedMenuType;
    return matchesSearch && matchesMenuType;
  });

  const mainCategories = filteredCategories.filter(c => c.type === 'main');
  const getSubcategoriesForDisplay = (parentId: string) => 
    filteredCategories.filter(c => c.type === 'sub' && c.parentId === parentId);

  const getMainCategoriesForSelect = () => 
    categories.filter(c => c.type === 'main');

  if (categoriesLoading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Kateqoriyalar yüklənir...</p>
        </div>
      </div>
    );
  }

  if (categoriesError) {
    return (
      <div className="p-8 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-600 mb-4">Xəta: {categoriesError}</p>
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
          <h1 className="text-2xl font-bold text-slate-900">Kateqoriyalar</h1>
          <p className="text-sm text-slate-500 mt-1">Menu kateqoriyalarını və alt kateqoriyalarını idarə edin</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={async () => {
              try {
                const { debugFirebase, testFirebaseConnection } = await import('@/lib/firebaseDebug');
                const debugInfo = debugFirebase();
                const connectionTest = await testFirebaseConnection();
                
                alert(`Firebase Debug:
Configured: ${debugInfo.isConfigured}
Database: ${debugInfo.hasDb}
Project ID: ${debugInfo.projectId}
Connection Test: ${connectionTest ? 'Success' : 'Failed'}

Check console for detailed logs.`);
              } catch (error) {
                console.error('Debug error:', error);
                alert('Debug xətası: ' + error);
              }
            }}
            className="px-4 py-2 bg-yellow-600 text-white text-sm font-medium rounded-lg hover:bg-yellow-700 transition-colors flex items-center gap-2"
          >
            <Search className="w-4 h-4" strokeWidth={2} />
            Firebase Debug
          </button>
          
          {categories.length === 0 && (
            <button
              onClick={async () => {
                if (confirm('Test məlumatları əlavə etmək istəyirsiniz?')) {
                  try {
                    // Import seed functions dynamically
                    const { seedAll } = await import('@/scripts/seedFirebase');
                    await seedAll();
                    alert('Test məlumatları uğurla əlavə edildi!');
                  } catch (error) {
                    console.error('Seed error:', error);
                    alert('Test məlumatları əlavə edilərkən xəta baş verdi');
                  }
                }
              }}
              className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
            >
              <Package className="w-4 h-4" strokeWidth={2} />
              Test Məlumatları
            </button>
          )}
          <button
            onClick={() => { setEditingCategory(null); setIsModalOpen(true); }}
            className="px-4 py-2 bg-blue-600 text-white text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" strokeWidth={2} />
            Yeni Kateqoriya
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Kateqoriya axtar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
          
          <select
            value={selectedMenuType}
            onChange={(e) => setSelectedMenuType(e.target.value)}
            className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          >
            {Object.entries(MENU_TYPES).map(([key, name]) => (
              <option key={key} value={key}>{name}</option>
            ))}
          </select>

          <div className="flex items-center gap-2 text-sm text-slate-600">
            <FolderOpen className="w-4 h-4" />
            <span>{filteredCategories.length} kateqoriya</span>
          </div>
        </div>
      </div>

      {/* Categories Tree */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="p-6">
          <div className="space-y-4">
            {mainCategories.map((mainCategory) => (
              <div key={mainCategory.id} className="border border-slate-200 rounded-lg">
                {/* Main Category */}
                <div className="p-4 bg-slate-50 border-b border-slate-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FolderOpen className="w-5 h-5 text-blue-600" />
                      <div>
                        <h3 className="font-semibold text-slate-900">{mainCategory.name}</h3>
                        <p className="text-sm text-slate-600">{mainCategory.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        mainCategory.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {mainCategory.status === 'active' ? 'Aktiv' : 'Deaktiv'}
                      </span>
                      <button
                        onClick={() => handleEdit(mainCategory)}
                        className="text-sm text-blue-600 hover:text-blue-700 font-medium mr-2 inline-flex items-center gap-1"
                      >
                        <Edit2 className="w-4 h-4" strokeWidth={2} />
                        Redaktə
                      </button>
                      <button
                        onClick={() => handleDelete(mainCategory.id)}
                        className="text-sm text-red-600 hover:text-red-700 font-medium inline-flex items-center gap-1"
                      >
                        <Trash2 className="w-4 h-4" strokeWidth={2} />
                        Sil
                      </button>
                    </div>
                  </div>
                </div>

                {/* Subcategories */}
                <div className="p-4">
                  {getSubcategoriesForDisplay(mainCategory.id).map((subCategory) => (
                    <div key={subCategory.id} className="flex items-center justify-between py-2 px-4 hover:bg-slate-50 rounded-lg transition-colors">
                      <div className="flex items-center gap-3">
                        <ChevronRight className="w-4 h-4 text-slate-400" />
                        <div>
                          <h4 className="font-medium text-slate-900">{subCategory.name}</h4>
                          <p className="text-sm text-slate-600">{subCategory.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          subCategory.status === 'active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {subCategory.status === 'active' ? 'Aktiv' : 'Deaktiv'}
                        </span>
                        <button
                          onClick={() => handleEdit(subCategory)}
                          className="text-sm text-blue-600 hover:text-blue-700 font-medium mr-2 inline-flex items-center gap-1"
                        >
                          <Edit2 className="w-4 h-4" strokeWidth={2} />
                          Redaktə
                        </button>
                        <button
                          onClick={() => handleDelete(subCategory.id)}
                          className="text-sm text-red-600 hover:text-red-700 font-medium inline-flex items-center gap-1"
                        >
                          <Trash2 className="w-4 h-4" strokeWidth={2} />
                          Sil
                        </button>
                      </div>
                    </div>
                  ))}
                  
                  {getSubcategoriesForDisplay(mainCategory.id).length === 0 && (
                    <div className="text-center py-4 text-slate-500">
                      Alt kateqoriya yoxdur
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <CategoryModal 
          category={editingCategory}
          onClose={() => setIsModalOpen(false)}
          onSave={async (categoryData: any) => {
            try {
              if (editingCategory) {
                await updateCategory(editingCategory.id, categoryData);
              } else {
                await addCategory(categoryData);
              }
              setIsModalOpen(false);
            } catch (error) {
              console.error('Error saving category:', error);
              alert('Kateqoriya yadda saxlanılarkən xəta baş verdi');
            }
          }}
          availableParents={getMainCategoriesForSelect()}
        />
      )}
    </div>
  );
}

function CategoryModal({ category, onClose, onSave, availableParents }: any) {
  const [formData, setFormData] = useState(category || {
    name: '',
    type: 'main',
    parentId: '',
    description: '',
    status: 'active',
    order: 0,
    menuType: 'products'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-900">
            {category ? 'Kateqoriyanı Redaktə Et' : 'Yeni Kateqoriya'}
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
            <label className="block text-sm font-medium text-slate-700 mb-2">Kateqoriya Adı</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="Kateqoriya adını daxil edin"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Menu Tipi</label>
            <select
              value={formData.menuType}
              onChange={(e) => setFormData({...formData, menuType: e.target.value})}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            >
              <option value="products">Products & Systems</option>
              <option value="about">About Us</option>
              <option value="services">Services</option>
              <option value="projects">Projects</option>
              <option value="media">Media</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Kateqoriya Tipi</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({...formData, type: e.target.value as 'main' | 'sub', parentId: ''})}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            >
              <option value="main">Əsas Kateqoriya</option>
              <option value="sub">Alt Kateqoriya</option>
            </select>
          </div>

          {formData.type === 'sub' && (
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Əsas Kateqoriya</label>
              <select
                required
                value={formData.parentId}
                onChange={(e) => setFormData({...formData, parentId: e.target.value})}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              >
                <option value="">Əsas kateqoriya seçin</option>
                {availableParents.map((parent: any) => (
                  <option key={parent.id} value={parent.id}>{parent.name}</option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Təsvir</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              rows={3}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
              placeholder="Kateqoriya haqqında qısa məlumat"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Sıralama</label>
            <input
              type="number"
              min="0"
              value={formData.order}
              onChange={(e) => setFormData({...formData, order: parseInt(e.target.value) || 0})}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="0"
            />
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
              className="flex-1 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Yadda saxla
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-slate-200 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-300 transition-colors"
            >
              Ləğv et
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}