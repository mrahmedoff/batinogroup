'use client';

import { useState } from 'react';
import { useData } from '@/contexts/DataContext';
import { Plus, Edit2, Trash2, X, Settings, Zap, Wrench, Headphones, LucideIcon } from 'lucide-react';

// Icon mapping
const iconMap: Record<string, LucideIcon> = {
  Settings,
  Zap,
  Wrench,
  Headphones,
};

export default function ServicesAdmin() {
  const { services, addService, updateService, deleteService } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<any>(null);

  const handleDelete = (id: string) => {
    if (confirm('Bu xidməti silmək istədiyinizdən əminsiniz?')) {
      deleteService(id);
    }
  };

  const handleEdit = (service: any) => {
    setEditingService(service);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingService(null);
    setIsModalOpen(true);
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Services</h1>
          <p className="text-sm text-slate-500 mt-1">Manage company services</p>
        </div>
        <button 
          onClick={handleAdd}
          className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" strokeWidth={2} />
          Yeni Xidmət
        </button>
      </div>

      <div className="bg-white rounded-xl overflow-hidden border border-slate-200">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Icon</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Başlıq</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Təsvir</th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-slate-600 uppercase">Əməliyyatlar</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {services.map((service, index) => {
              const IconComponent = iconMap[service.icon] || Settings;
              return (
                <tr key={service.id || `service-${index}`} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center">
                      <IconComponent className="w-5 h-5 text-white" />
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-slate-900">{service.title}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{service.description}</td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => handleEdit(service)}
                      className="text-sm text-blue-600 hover:text-blue-700 font-medium mr-4 inline-flex items-center gap-1"
                    >
                      <Edit2 className="w-4 h-4" strokeWidth={2} />
                      Redaktə
                    </button>
                    <button 
                      onClick={() => handleDelete(service.id)}
                      className="text-sm text-red-600 hover:text-red-700 font-medium inline-flex items-center gap-1"
                    >
                      <Trash2 className="w-4 h-4" strokeWidth={2} />
                      Sil
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <ServiceModal 
          service={editingService}
          onClose={() => setIsModalOpen(false)}
          onSave={(service: any) => {
            if (editingService) {
              updateService(service);
            } else {
              addService(service);
            }
            setIsModalOpen(false);
          }}
        />
      )}
    </div>
  );
}

function ServiceModal({ service, onClose, onSave }: any) {
  const [formData, setFormData] = useState(service || {
    title: '',
    description: '',
    icon: 'Settings'
  });
  
  const availableIcons = [
    { name: 'Settings', label: 'Avtomatlaşdırma', Icon: Settings },
    { name: 'Zap', label: 'Elektrik', Icon: Zap },
    { name: 'Wrench', label: 'Mühəndislik', Icon: Wrench },
    { name: 'Headphones', label: 'Dəstək', Icon: Headphones },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const serviceData = {
      ...formData,
      id: formData.id || Date.now().toString()
    };
    onSave(serviceData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-6 max-w-md w-full">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-900">
            {service ? 'Xidməti Redaktə Et' : 'Yeni Xidmət'}
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
            <label className="block text-sm font-medium text-slate-700 mb-2">Icon</label>
            <div className="grid grid-cols-4 gap-2">
              {availableIcons.map(({ name, label, Icon }) => (
                <button
                  key={name}
                  type="button"
                  onClick={() => setFormData({...formData, icon: name})}
                  className={`p-3 border-2 rounded-lg transition-all ${
                    formData.icon === name
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                  title={label}
                >
                  <Icon className={`w-6 h-6 mx-auto ${
                    formData.icon === name ? 'text-blue-600' : 'text-slate-600'
                  }`} />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Başlıq</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="Xidmət adı"
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
              placeholder="Xidmət haqqında qısa məlumat"
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
