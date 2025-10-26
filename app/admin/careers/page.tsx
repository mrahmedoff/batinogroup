'use client';

import { useState } from 'react';
import { useData } from '@/contexts/DataContext';
import { Plus, Edit2, Trash2, X, Briefcase, MapPin, Clock, DollarSign } from 'lucide-react';

interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: 'Tam ştat' | 'Part-time' | 'Müqavilə';
  salary: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  published: boolean;
  postedDate: string;
}

export default function CareersAdmin() {
  const { jobs, addJob, updateJob, deleteJob } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [filter, setFilter] = useState<'Hamısı' | 'Dərc edilib' | 'Qaralama'>('Hamısı');

  const handleDelete = (id: string) => {
    if (confirm('Bu vakansiyanı silmək istədiyinizdən əminsiniz?')) {
      deleteJob(id);
    }
  };

  const handleEdit = (job: Job) => {
    setEditingJob(job);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingJob(null);
    setIsModalOpen(true);
  };

  const handleSave = (job: Job) => {
    if (editingJob) {
      updateJob(job);
    } else {
      addJob({ ...job, postedDate: new Date().toISOString().split('T')[0] });
    }
    setIsModalOpen(false);
  };

  const togglePublish = (id: string) => {
    const job = jobs.find(j => j.id === id);
    if (job) {
      updateJob({ ...job, published: !job.published });
    }
  };

  const filteredJobs = filter === 'Hamısı' 
    ? jobs 
    : filter === 'Dərc edilib'
    ? jobs.filter(j => j.published)
    : jobs.filter(j => !j.published);

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Vakansiyalar</h1>
          <p className="text-sm text-slate-500 mt-1">İş elanlarını idarə edin</p>
        </div>
        <button 
          onClick={handleAdd}
          className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" strokeWidth={2} />
          Yeni Vakansiya
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-blue-600" strokeWidth={2} />
            </div>
            <div>
              <div className="text-sm text-slate-500 font-medium">Ümumi</div>
              <div className="text-2xl font-bold text-slate-900">{jobs.length}</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-green-600" strokeWidth={2} />
            </div>
            <div>
              <div className="text-sm text-slate-500 font-medium">Dərc edilib</div>
              <div className="text-2xl font-bold text-slate-900">
                {jobs.filter(j => j.published).length}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-yellow-50 rounded-lg flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-yellow-600" strokeWidth={2} />
            </div>
            <div>
              <div className="text-sm text-slate-500 font-medium">Qaralama</div>
              <div className="text-2xl font-bold text-slate-900">
                {jobs.filter(j => !j.published).length}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="mb-6 flex gap-2">
        {(['Hamısı', 'Dərc edilib', 'Qaralama'] as const).map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              filter === type
                ? 'bg-blue-600 text-white'
                : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filteredJobs.map((job) => (
          <div key={job.id} className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-bold text-slate-900">{job.title}</h3>
                  <span className={`inline-block px-2 py-1 text-xs font-semibold rounded ${
                    job.published 
                      ? 'text-green-600 bg-green-50' 
                      : 'text-yellow-600 bg-yellow-50'
                  }`}>
                    {job.published ? 'Dərc edilib' : 'Qaralama'}
                  </span>
                </div>
                
                <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 mb-3">
                  <span className="inline-flex items-center gap-1">
                    <Briefcase className="w-4 h-4" strokeWidth={2} />
                    {job.department}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="w-4 h-4" strokeWidth={2} />
                    {job.location}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="w-4 h-4" strokeWidth={2} />
                    {job.type}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <DollarSign className="w-4 h-4" strokeWidth={2} />
                    {job.salary}
                  </span>
                </div>
                
                <p className="text-sm text-slate-600">{job.description}</p>
              </div>
            </div>

            <div className="flex gap-2 pt-4 border-t border-slate-200">
              <button 
                onClick={() => togglePublish(job.id)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  job.published
                    ? 'text-yellow-600 bg-yellow-50 hover:bg-yellow-100'
                    : 'text-green-600 bg-green-50 hover:bg-green-100'
                }`}
              >
                {job.published ? 'Gizlət' : 'Dərc et'}
              </button>
              <button 
                onClick={() => handleEdit(job)}
                className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors inline-flex items-center gap-1"
              >
                <Edit2 className="w-4 h-4" strokeWidth={2} />
                Redaktə
              </button>
              <button 
                onClick={() => handleDelete(job.id)}
                className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors inline-flex items-center gap-1"
              >
                <Trash2 className="w-4 h-4" strokeWidth={2} />
                Sil
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <JobModal 
          job={editingJob}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

function JobModal({ job, onClose, onSave }: { 
  job: Job | null; 
  onClose: () => void; 
  onSave: (job: Job) => void;
}) {
  const [formData, setFormData] = useState<Job>(job || {
    id: '',
    title: '',
    department: '',
    location: 'Bakı, Azərbaycan',
    type: 'Tam ştat',
    salary: '',
    description: '',
    requirements: [''],
    responsibilities: [''],
    published: false,
    postedDate: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const addRequirement = () => {
    setFormData({...formData, requirements: [...formData.requirements, '']});
  };

  const updateRequirement = (index: number, value: string) => {
    const newReqs = [...formData.requirements];
    newReqs[index] = value;
    setFormData({...formData, requirements: newReqs});
  };

  const removeRequirement = (index: number) => {
    setFormData({...formData, requirements: formData.requirements.filter((_, i) => i !== index)});
  };

  const addResponsibility = () => {
    setFormData({...formData, responsibilities: [...formData.responsibilities, '']});
  };

  const updateResponsibility = (index: number, value: string) => {
    const newResps = [...formData.responsibilities];
    newResps[index] = value;
    setFormData({...formData, responsibilities: newResps});
  };

  const removeResponsibility = (index: number) => {
    setFormData({...formData, responsibilities: formData.responsibilities.filter((_, i) => i !== index)});
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-900">
            {job ? 'Vakansiyanı Redaktə Et' : 'Yeni Vakansiya'}
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
              <label className="block text-sm font-medium text-slate-700 mb-2">Vəzifə</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                placeholder="Layihə Meneceri"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Şöbə</label>
              <input
                type="text"
                value={formData.department}
                onChange={(e) => setFormData({...formData, department: e.target.value})}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                placeholder="Layihə İdarəetməsi"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Yer</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Tip</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({...formData, type: e.target.value as any})}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              >
                <option value="Tam ştat">Tam ştat</option>
                <option value="Part-time">Part-time</option>
                <option value="Müqavilə">Müqavilə</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Maaş</label>
              <input
                type="text"
                value={formData.salary}
                onChange={(e) => setFormData({...formData, salary: e.target.value})}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                placeholder="2000-3000 AZN"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Təsvir</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
              rows={3}
              placeholder="Vakansiya haqqında qısa məlumat"
              required
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-slate-700">Tələblər</label>
              <button
                type="button"
                onClick={addRequirement}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                + Əlavə et
              </button>
            </div>
            <div className="space-y-2">
              {formData.requirements.map((req, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={req}
                    onChange={(e) => updateRequirement(index, e.target.value)}
                    className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="Tələb daxil edin"
                  />
                  {formData.requirements.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeRequirement(index)}
                      className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <X className="w-4 h-4" strokeWidth={2} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-slate-700">Vəzifə Öhdəlikləri</label>
              <button
                type="button"
                onClick={addResponsibility}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                + Əlavə et
              </button>
            </div>
            <div className="space-y-2">
              {formData.responsibilities.map((resp, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={resp}
                    onChange={(e) => updateResponsibility(index, e.target.value)}
                    className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="Öhdəlik daxil edin"
                  />
                  {formData.responsibilities.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeResponsibility(index)}
                      className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <X className="w-4 h-4" strokeWidth={2} />
                    </button>
                  )}
                </div>
              ))}
            </div>
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
