'use client';

import { useState } from 'react';
import { useData } from '@/contexts/DataContext';
import { Plus, Edit2, Trash2, X, Award, Download, Eye } from 'lucide-react';

interface Certificate {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate: string;
  certificateNumber: string;
  type: string;
  file: string;
}

export default function CertificatesAdmin() {
  const { certificates, addCertificate, updateCertificate, deleteCertificate } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCertificate, setEditingCertificate] = useState<Certificate | null>(null);

  const handleDelete = (id: string) => {
    if (confirm('Bu sertifikatı silmək istədiyinizdən əminsiniz?')) {
      deleteCertificate(id);
    }
  };

  const handleEdit = (certificate: Certificate) => {
    setEditingCertificate(certificate);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingCertificate(null);
    setIsModalOpen(true);
  };

  const handleSave = (certificate: Certificate) => {
    if (editingCertificate) {
      updateCertificate(certificate);
    } else {
      addCertificate(certificate);
    }
    setIsModalOpen(false);
  };

  const isExpiringSoon = (expiryDate: string) => {
    const expiry = new Date(expiryDate);
    const today = new Date();
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 90 && diffDays > 0;
  };

  const isExpired = (expiryDate: string) => {
    return new Date(expiryDate) < new Date();
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Sertifikatlar</h1>
          <p className="text-sm text-slate-500 mt-1">Şirkət sertifikatlarını idarə edin</p>
        </div>
        <button 
          onClick={handleAdd}
          className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" strokeWidth={2} />
          Yeni Sertifikat
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
              <Award className="w-6 h-6 text-green-600" strokeWidth={2} />
            </div>
            <div>
              <div className="text-sm text-slate-500 font-medium">Aktiv</div>
              <div className="text-2xl font-bold text-slate-900">
                {certificates.filter(c => !isExpired(c.expiryDate)).length}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-yellow-50 rounded-lg flex items-center justify-center">
              <Award className="w-6 h-6 text-yellow-600" strokeWidth={2} />
            </div>
            <div>
              <div className="text-sm text-slate-500 font-medium">Yenilənməli</div>
              <div className="text-2xl font-bold text-slate-900">
                {certificates.filter(c => isExpiringSoon(c.expiryDate)).length}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center">
              <Award className="w-6 h-6 text-red-600" strokeWidth={2} />
            </div>
            <div>
              <div className="text-sm text-slate-500 font-medium">Vaxtı Keçmiş</div>
              <div className="text-2xl font-bold text-slate-900">
                {certificates.filter(c => isExpired(c.expiryDate)).length}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl overflow-hidden border border-slate-200">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Sertifikat</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Verən</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Verilmə Tarixi</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Bitmə Tarixi</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Status</th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-slate-600 uppercase">Əməliyyatlar</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {certificates.map((cert) => {
              const expired = isExpired(cert.expiryDate);
              const expiringSoon = isExpiringSoon(cert.expiryDate);
              
              return (
                <tr key={cert.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-slate-900">{cert.name}</div>
                      <div className="text-xs text-slate-500 mt-1">{cert.type}</div>
                      <div className="text-xs text-slate-400 mt-1">№ {cert.certificateNumber}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{cert.issuer}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{cert.issueDate}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{cert.expiryDate}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-block px-2 py-1 text-xs font-semibold rounded ${
                      expired 
                        ? 'text-red-600 bg-red-50' 
                        : expiringSoon
                        ? 'text-yellow-600 bg-yellow-50'
                        : 'text-green-600 bg-green-50'
                    }`}>
                      {expired ? 'Vaxtı keçib' : expiringSoon ? 'Yenilənməli' : 'Aktiv'}
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
                      className="text-sm text-blue-600 hover:text-blue-700 font-medium mr-3 inline-flex items-center gap-1"
                    >
                      <Download className="w-4 h-4" strokeWidth={2} />
                      Yüklə
                    </button>
                    <button 
                      onClick={() => handleEdit(cert)}
                      className="text-sm text-blue-600 hover:text-blue-700 font-medium mr-3 inline-flex items-center gap-1"
                    >
                      <Edit2 className="w-4 h-4" strokeWidth={2} />
                      Redaktə
                    </button>
                    <button 
                      onClick={() => handleDelete(cert.id)}
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
        <CertificateModal 
          certificate={editingCertificate}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

function CertificateModal({ certificate, onClose, onSave }: { 
  certificate: Certificate | null; 
  onClose: () => void; 
  onSave: (certificate: Certificate) => void;
}) {
  const [formData, setFormData] = useState<Certificate>(certificate || {
    id: '',
    name: '',
    issuer: '',
    issueDate: '',
    expiryDate: '',
    certificateNumber: '',
    type: '',
    file: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-6 max-w-2xl w-full">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-900">
            {certificate ? 'Sertifikatı Redaktə Et' : 'Yeni Sertifikat'}
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
              <label className="block text-sm font-medium text-slate-700 mb-2">Sertifikat Adı</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                placeholder="ISO 9001:2015"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Verən Təşkilat</label>
              <input
                type="text"
                value={formData.issuer}
                onChange={(e) => setFormData({...formData, issuer: e.target.value})}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                placeholder="TÜV SÜD"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Tip</label>
            <input
              type="text"
              value={formData.type}
              onChange={(e) => setFormData({...formData, type: e.target.value})}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="Keyfiyyət İdarəetməsi"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Sertifikat Nömrəsi</label>
            <input
              type="text"
              value={formData.certificateNumber}
              onChange={(e) => setFormData({...formData, certificateNumber: e.target.value})}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="ISO-9001-2024-001"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Verilmə Tarixi</label>
              <input
                type="date"
                value={formData.issueDate}
                onChange={(e) => setFormData({...formData, issueDate: e.target.value})}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Bitmə Tarixi</label>
              <input
                type="date"
                value={formData.expiryDate}
                onChange={(e) => setFormData({...formData, expiryDate: e.target.value})}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                required
              />
            </div>
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
