'use client';

import { useState } from 'react';
import { useData } from '@/contexts/DataContext';
import { Plus, Edit2, Trash2, X, Eye, Calendar } from 'lucide-react';

interface NewsItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  date: string;
  published: boolean;
}

export default function NewsAdmin() {
  const { news, addNews, updateNews, deleteNews } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null);

  const handleDelete = (id: string) => {
    if (confirm('Bu xəbəri silmək istədiyinizdən əminsiniz?')) {
      deleteNews(id);
    }
  };

  const handleEdit = (item: NewsItem) => {
    setEditingNews(item);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingNews(null);
    setIsModalOpen(true);
  };

  const handleSave = (item: NewsItem) => {
    if (editingNews) {
      updateNews(item);
    } else {
      addNews(item);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">News</h1>
          <p className="text-sm text-slate-500 mt-1">Manage and publish news</p>
        </div>
        <button 
          onClick={handleAdd}
          className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" strokeWidth={2} />
          Yeni Xəbər
        </button>
      </div>

      <div className="bg-white rounded-xl overflow-hidden border border-slate-200">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Başlıq</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Kateqoriya</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Tarix</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Status</th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-slate-600 uppercase">Əməliyyatlar</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {news.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <div>
                    <div className="text-sm font-medium text-slate-900">{item.title}</div>
                    <div className="text-xs text-slate-500 mt-1">{item.excerpt}</div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-block px-2 py-1 text-xs font-semibold text-blue-600 bg-blue-50 rounded">
                    {item.category}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" strokeWidth={2} />
                    {item.date}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-block px-2 py-1 text-xs font-semibold rounded ${
                    item.published 
                      ? 'text-green-600 bg-green-50' 
                      : 'text-yellow-600 bg-yellow-50'
                  }`}>
                    {item.published ? 'Dərc edilib' : 'Qaralama'}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button 
                    className="text-sm text-slate-600 hover:text-slate-700 font-medium mr-3 inline-flex items-center gap-1"
                  >
                    <Eye className="w-4 h-4" strokeWidth={2} />
                    Bax
                  </button>
                  <button 
                    onClick={() => handleEdit(item)}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium mr-3 inline-flex items-center gap-1"
                  >
                    <Edit2 className="w-4 h-4" strokeWidth={2} />
                    Redaktə
                  </button>
                  <button 
                    onClick={() => handleDelete(item.id)}
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
        <NewsModal 
          news={editingNews}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

function NewsModal({ news, onClose, onSave }: { 
  news: NewsItem | null; 
  onClose: () => void; 
  onSave: (news: NewsItem) => void;
}) {
  const [formData, setFormData] = useState<NewsItem>(news || {
    id: '',
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: 'Şirkət Xəbərləri',
    author: 'Admin',
    date: new Date().toISOString().split('T')[0],
    published: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const slug = formData.title
      .toLowerCase()
      .replace(/ə/g, 'e')
      .replace(/ı/g, 'i')
      .replace(/ö/g, 'o')
      .replace(/ü/g, 'u')
      .replace(/ş/g, 's')
      .replace(/ç/g, 'c')
      .replace(/ğ/g, 'g')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
    onSave({ ...formData, slug });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-900">
            {news ? 'Xəbəri Redaktə Et' : 'Yeni Xəbər'}
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5 text-slate-400" strokeWidth={2} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Başlıq</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                placeholder="Xəbər başlığı"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Kateqoriya</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              >
                <option>Şirkət Xəbərləri</option>
                <option>Sənaye Xəbərləri</option>
                <option>Mətbuat Relizləri</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Qısa Təsvir</label>
            <textarea
              value={formData.excerpt}
              onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
              rows={2}
              placeholder="Xəbərin qısa təsviri"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Məzmun</label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({...formData, content: e.target.value})}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
              rows={8}
              placeholder="Xəbərin tam məzmunu"
              required
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="published"
              checked={formData.published}
              onChange={(e) => setFormData({...formData, published: e.target.checked})}
              className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="published" className="text-sm font-medium text-slate-700">
              Dərhal dərc et
            </label>
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
