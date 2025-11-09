'use client';

import { useState } from 'react';
import { useData } from '@/contexts/DataContext';
import { Plus, Edit2, Trash2, X, Building2 } from 'lucide-react';

interface Partner {
  id: string;
  name: string;
  logo: string;
  website: string;
  type: 'Müştəri' | 'Tərəfdaş';
  description: string;
}

export default function PartnersAdmin() {
  const { partners, addPartner, updatePartner, deletePartner } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPartner, setEditingPartner] = useState<Partner | null>(null);
  const [filter, setFilter] = useState<'Hamısı' | 'Müştəri' | 'Tərəfdaş'>('Hamısı');

  const handleDelete = (id: string) => {
    if (confirm('Bu tərəfdaşı silmək istədiyinizdən əminsiniz?')) {
      deletePartner(id);
    }
  };

  const handleEdit = (partner: Partner) => {
    setEditingPartner(partner);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingPartner(null);
    setIsModalOpen(true);
  };

  const handleSave = (partner: Partner) => {
    if (editingPartner) {
      updatePartner(partner);
    } else {
      addPartner(partner);
    }
    setIsModalOpen(false);
  };

  const filteredPartners = filter === 'Hamısı' 
    ? partners 
    : partners.filter(p => p.type === filter);

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Müştərilər və Tərəfdaşlar</h1>
          <p className="text-sm text-slate-500 mt-1">Müştəri və tərəfdaş şirkətləri idarə edin</p>
        </div>
        <button 
          onClick={handleAdd}
          className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" strokeWidth={2} />
          Yeni Əlavə Et
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="mb-6 flex gap-2">
        {(['Hamısı', 'Müştəri', 'Tərəfdaş'] as const).map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              filter === type
                ? 'bg-blue-600 text-white'
                : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            {type} ({type === 'Hamısı' ? partners.length : partners.filter(p => p.type === type).length})
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPartners.map((partner) => (
          <div key={partner.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
            <div className="aspect-video bg-slate-50 flex items-center justify-center p-6">
              <Building2 className="w-16 h-16 text-slate-300" strokeWidth={1.5} />
            </div>
            <div className="p-5">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-lg font-bold text-slate-900">{partner.name}</h3>
                <span className={`inline-block px-2 py-1 text-xs font-semibold rounded ${
                  partner.type === 'Müştəri'
                    ? 'text-green-600 bg-green-50'
                    : 'text-blue-600 bg-blue-50'
                }`}>
                  {partner.type}
                </span>
              </div>
              <p className="text-sm text-slate-600 mb-3">{partner.description}</p>
              <a 
                href={partner.website} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs text-blue-600 hover:underline mb-4 block"
              >
                {partner.website}
              </a>
              
              <div className="flex gap-2">
                <button 
                  onClick={() => handleEdit(partner)}
                  className="flex-1 px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors inline-flex items-center justify-center gap-1"
                >
                  <Edit2 className="w-4 h-4" strokeWidth={2} />
                  Redaktə
                </button>
                <button 
                  onClick={() => handleDelete(partner.id)}
                  className="flex-1 px-3 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors inline-flex items-center justify-center gap-1"
                >
                  <Trash2 className="w-4 h-4" strokeWidth={2} />
                  Sil
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <PartnerModal 
          partner={editingPartner}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

function PartnerModal({ partner, onClose, onSave }: { 
  partner: Partner | null; 
  onClose: () => void; 
  onSave: (partner: Partner) => void;
}) {
  const [formData, setFormData] = useState<Partner>(partner || {
    id: '',
    name: '',
    logo: '',
    website: '',
    type: 'Müştəri',
    description: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-6 max-w-md w-full">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-900">
            {partner ? 'Redaktə Et' : 'Yeni Əlavə Et'}
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
            <label className="block text-sm font-medium text-slate-700 mb-2">Şirkət Adı</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="SOCAR"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Tip</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({...formData, type: e.target.value as 'Müştəri' | 'Tərəfdaş'})}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            >
              <option value="Müştəri">Müştəri</option>
              <option value="Tərəfdaş">Tərəfdaş</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Veb Sayt</label>
            <input
              type="url"
              value={formData.website}
              onChange={(e) => setFormData({...formData, website: e.target.value})}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="https://example.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Təsvir</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
              rows={3}
              placeholder="Şirkət haqqında qısa məlumat"
              required
            />
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
