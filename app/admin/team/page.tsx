'use client';

import { useState } from 'react';
import { useData } from '@/contexts/DataContext';
import { Plus, Edit2, Trash2, X, User } from 'lucide-react';

export default function TeamAdmin() {
  const { team, addTeamMember, updateTeamMember, deleteTeamMember } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<any>(null);

  const handleDelete = (id: string) => {
    if (confirm('Bu komanda üzvünü silmək istədiyinizdən əminsiniz?')) {
      deleteTeamMember(id);
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Komanda</h1>
          <p className="text-sm text-slate-500 mt-1">Komanda üzvlərini idarə edin</p>
        </div>
        <button 
          onClick={() => { setEditingMember(null); setIsModalOpen(true); }}
          className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" strokeWidth={2} />
          Yeni Üzv
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {team.map((member) => (
          <div key={member.id} className="bg-white rounded-xl p-6 border border-slate-200 text-center hover:shadow-md transition-shadow">
            <div className="w-20 h-20 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
              <User className="w-10 h-10 text-blue-600" strokeWidth={1.5} />
            </div>
            <h3 className="text-lg font-bold text-slate-900">{member.name}</h3>
            <p className="text-sm text-slate-600 mb-4">{member.position}</p>
            
            <div className="flex gap-2">
              <button 
                onClick={() => { setEditingMember(member); setIsModalOpen(true); }}
                className="flex-1 px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors inline-flex items-center justify-center gap-1"
              >
                <Edit2 className="w-4 h-4" strokeWidth={2} />
                Redaktə
              </button>
              <button 
                onClick={() => handleDelete(member.id)}
                className="flex-1 px-3 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors inline-flex items-center justify-center gap-1"
              >
                <Trash2 className="w-4 h-4" strokeWidth={2} />
                Sil
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <TeamModal 
          member={editingMember}
          onClose={() => setIsModalOpen(false)}
          onSave={(member: any) => {
            if (editingMember) {
              updateTeamMember(member);
            } else {
              addTeamMember(member);
            }
            setIsModalOpen(false);
          }}
        />
      )}
    </div>
  );
}

function TeamModal({ member, onClose, onSave }: any) {
  const [formData, setFormData] = useState(member || {
    name: '',
    position: '',
    image: ''
  });

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-6 max-w-md w-full">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-900">
            {member ? 'Üzvü Redaktə Et' : 'Yeni Üzv'}
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
            <label className="block text-sm font-medium text-slate-700 mb-2">Ad Soyad</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="Əli Məmmədov"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Vəzifə</label>
            <input
              type="text"
              value={formData.position}
              onChange={(e) => setFormData({...formData, position: e.target.value})}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="Frontend Developer"
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
