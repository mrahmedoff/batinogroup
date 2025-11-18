'use client';

import { useState } from 'react';
import { Image as ImageIcon, Upload, Eye, Trash2 } from 'lucide-react';

export default function MediaAdmin() {
  const [files, setFiles] = useState([
    { id: '1', name: 'project1.jpg', type: 'image', size: '2.4 MB', date: '2025-10-26' },
    { id: '2', name: 'team-photo.jpg', type: 'image', size: '1.8 MB', date: '2025-10-25' },
    { id: '3', name: 'company-video.mp4', type: 'video', size: '15.2 MB', date: '2025-10-24' },
  ]);

  const handleDelete = (id: string) => {
    if (confirm('Bu faylı silmək istədiyinizdən əminsiniz?')) {
      setFiles(files.filter(f => f.id !== id));
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Media Kitabxanası</h1>
          <p className="text-sm text-slate-500 mt-1">Şəkil və video fayllarını idarə edin</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
          <Upload className="w-4 h-4" strokeWidth={2} />
          Fayl Yüklə
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-200">
          <div className="flex gap-2">
            <button className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg">
              Hamısı ({files.length})
            </button>
            <button className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
              Şəkillər
            </button>
            <button className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
              Videolar
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-6">
          {files.map((file) => (
            <div key={file.id} className="border border-slate-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
              <div className="aspect-video bg-slate-100 flex items-center justify-center">
                <ImageIcon className="w-12 h-12 text-slate-400" strokeWidth={1.5} />
              </div>
              <div className="p-3">
                <p className="font-medium text-sm text-slate-900 truncate">{file.name}</p>
                <div className="flex justify-between items-center mt-2 text-xs text-slate-500">
                  <span>{file.size}</span>
                  <span>{file.date}</span>
                </div>
                <div className="flex gap-2 mt-3">
                  <button className="flex-1 px-3 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded hover:bg-blue-100 transition-colors inline-flex items-center justify-center gap-1">
                    <Eye className="w-3 h-3" strokeWidth={2} />
                    Bax
                  </button>
                  <button 
                    onClick={() => handleDelete(file.id)}
                    className="flex-1 px-3 py-1 text-xs font-medium text-red-600 bg-red-50 rounded hover:bg-red-100 transition-colors inline-flex items-center justify-center gap-1"
                  >
                    <Trash2 className="w-3 h-3" strokeWidth={2} />
                    Sil
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
