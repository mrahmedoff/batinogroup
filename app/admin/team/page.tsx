'use client';

import { useState } from 'react';
import { useData } from '@/contexts/DataContext';
import { Plus, Edit2, Trash2, X, User, Upload, Loader2 } from 'lucide-react';
import { uploadImage } from '@/lib/uploadImage';

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
          <h1 className="text-2xl font-bold text-slate-900">Team</h1>
          <p className="text-sm text-slate-500 mt-1">Manage team members</p>
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
            <div className="w-20 h-20 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center overflow-hidden">
              {member.image ? (
                <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
              ) : (
                <User className="w-10 h-10 text-blue-600" strokeWidth={1.5} />
              )}
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
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>(member?.image || '');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        setUploadError('Yalnız JPG, PNG və WEBP formatları qəbul edilir');
        return;
      }

      // Validate file size (max 5MB)
      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        setUploadError('Şəkil ölçüsü 5MB-dan çox ola bilməz');
        return;
      }

      setImageFile(file);
      setUploadError('');
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    setUploadError('');

    try {
      let imageUrl = formData.image;

      // Upload new image if selected
      if (imageFile) {
        imageUrl = await uploadImage(imageFile, 'team');
      }

      // Save member data with image URL
      onSave({
        ...formData,
        image: imageUrl
      });
    } catch (error) {
      console.error('Upload error:', error);
      setUploadError(error instanceof Error ? error.message : 'Şəkil yüklənərkən xəta baş verdi');
      setIsUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
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
        
        <form onSubmit={handleSubmit} className="space-y-4">
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

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Şəkil</label>
            
            {/* Image Preview */}
            {imagePreview && (
              <div className="mb-3">
                <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-blue-100">
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}

            {/* File Input */}
            <div className="relative">
              <input
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/webp"
                onChange={handleImageChange}
                className="hidden"
                id="image-upload"
              />
              <label
                htmlFor="image-upload"
                className="w-full px-4 py-3 border-2 border-dashed border-slate-300 rounded-lg hover:border-blue-500 transition-colors cursor-pointer flex items-center justify-center gap-3 bg-slate-50 hover:bg-blue-50"
              >
                <Upload className="w-5 h-5 text-slate-400" />
                <span className="text-sm text-slate-600">
                  {imageFile ? imageFile.name : 'Select image'}
                </span>
              </label>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              JPG, PNG və ya WEBP formatında, maksimum 5MB
            </p>
            {uploadError && (
              <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                <X className="w-3 h-3" />
                {uploadError}
              </p>
            )}
          </div>

          <div className="flex gap-3 pt-4">
            <button 
              type="submit" 
              disabled={isUploading}
              className="flex-1 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isUploading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Yüklənir...
                </>
              ) : (
                'Yadda saxla'
              )}
            </button>
            <button 
              type="button" 
              onClick={onClose}
              disabled={isUploading}
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
