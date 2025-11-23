'use client';

import { useState } from 'react';
import { useData } from '@/contexts/DataContext';
import { Plus, Edit2, Trash2, X } from 'lucide-react';

export default function ProjectsAdmin() {
  const { projects, addProject, updateProject, deleteProject } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<any>(null);

  const handleDelete = (id: string) => {
    if (confirm('Bu layihəni silmək istədiyinizdən əminsiniz?')) {
      deleteProject(id);
    }
  };

  const handleEdit = (project: any) => {
    setEditingProject(project);
    setIsModalOpen(true);
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Projects</h1>
          <p className="text-sm text-slate-500 mt-1">Manage your portfolio</p>
        </div>
        <button 
          onClick={() => { setEditingProject(null); setIsModalOpen(true); }}
          className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" strokeWidth={2} />
          Yeni Layihə
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div key={project.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
            <div className="aspect-video bg-gradient-to-br from-blue-500 to-purple-600"></div>
            <div className="p-5">
              <span className="inline-block px-2 py-1 text-xs font-semibold text-blue-600 bg-blue-50 rounded mb-2">
                {project.category}
              </span>
              <h3 className="text-lg font-bold text-slate-900 mb-2">{project.title}</h3>
              <p className="text-sm text-slate-600 mb-4">{project.description}</p>
              
              <div className="flex gap-2">
                <button 
                  onClick={() => handleEdit(project)}
                  className="flex-1 px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors inline-flex items-center justify-center gap-1"
                >
                  <Edit2 className="w-4 h-4" strokeWidth={2} />
                  Redaktə
                </button>
                <button 
                  onClick={() => handleDelete(project.id)}
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
        <ProjectModal 
          project={editingProject}
          onClose={() => setIsModalOpen(false)}
          onSave={(project: any) => {
            if (editingProject) {
              updateProject(project);
            } else {
              addProject(project);
            }
            setIsModalOpen(false);
          }}
        />
      )}
    </div>
  );
}

function ProjectModal({ project, onClose, onSave }: any) {
  const [formData, setFormData] = useState(project || {
    title: '',
    description: '',
    category: '',
    image: ''
  });

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-6 max-w-md w-full">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-900">
            {project ? 'Layihəni Redaktə Et' : 'Yeni Layihə'}
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5 text-slate-400" strokeWidth={2} />
          </button>
        </div>
        
        <form onSubmit={(e) => { e.preventDefault(); onSave(formData); }} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Başlıq</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="Layihə adı"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Kateqoriya</label>
            <input
              type="text"
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="Web Development, Mobile App..."
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
              placeholder="Layihə haqqında qısa məlumat"
              required
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button type="submit" className="flex-1 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
              Yadda saxla
            </button>
            <button type="button" onClick={onClose} className="flex-1 px-4 py-2 bg-slate-200 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-300 transition-colors">
              Ləğv et
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
