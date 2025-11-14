'use client';

import { useState } from 'react';
import { useData } from '@/contexts/DataContext';
import { Plus, Edit2, Trash2, X, Briefcase, MapPin, Clock, DollarSign } from 'lucide-react';

interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract';
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
  const [filter, setFilter] = useState<'All' | 'Published' | 'Draft'>('All');

  const handleDelete = async (id: string) => {
    if (!id || id.trim() === '') {
      alert('Error: Job ID is missing. Please refresh the page and try again.');
      return;
    }

    if (confirm('Are you sure you want to delete this job position?')) {
      try {
        await deleteJob(id);
      } catch (error) {
        console.error('Delete failed:', error);
        alert('Error occurred while deleting job position: ' + (error as Error).message);
      }
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

  const filteredJobs = filter === 'All' 
    ? jobs 
    : filter === 'Published'
    ? jobs.filter(j => j.published)
    : jobs.filter(j => !j.published);

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Job Positions</h1>
          <p className="text-sm text-slate-500 mt-1">Manage job listings</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={async () => {
              console.log('=== MANUAL FIREBASE TEST ===');
              
              // Test Firebase directly
              const { db } = await import('../../../../lib/firebase');
              const { collection, getDocs } = await import('firebase/firestore');
              
              if (db) {
                try {
                  const snapshot = await getDocs(collection(db, 'jobs'));
                  console.log('Firebase jobs count:', snapshot.size);
                  
                  snapshot.forEach((doc, index) => {
                    console.log(`Firebase Job ${index}:`, {
                      id: doc.id,
                      exists: doc.exists(),
                      data: doc.data()
                    });
                  });
                } catch (error) {
                  console.error('Firebase test error:', error);
                }
              }
            }}
            className="px-4 py-2 bg-gray-600 text-white text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors"
          >
            Test
          </button>
          <button 
            onClick={async () => {
              if (confirm('Delete the problematic job from Firebase?')) {
                try {
                  const { deleteDocument } = await import('../../../../lib/firebaseHelpers');
                  await deleteDocument('jobs', 'dBUGcSQLJnHtBuLqFyuP');
                  console.log('Deleted problematic job');
                  window.location.reload();
                } catch (error) {
                  console.error('Delete error:', error);
                  alert('Error: ' + (error as Error).message);
                }
              }
            }}
            className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors"
          >
            Clear
          </button>
          <button 
            onClick={handleAdd}
            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" strokeWidth={2} />
            New Position
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-blue-600" strokeWidth={2} />
            </div>
            <div>
              <div className="text-sm text-slate-500 font-medium">Total</div>
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
              <div className="text-sm text-slate-500 font-medium">Published</div>
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
              <div className="text-sm text-slate-500 font-medium">Draft</div>
              <div className="text-2xl font-bold text-slate-900">
                {jobs.filter(j => !j.published).length}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="mb-6 flex gap-2">
        {(['All', 'Published', 'Draft'] as const).map((type) => (
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
        {filteredJobs.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
            <div className="text-slate-400 mb-4">
              <Briefcase className="w-16 h-16 mx-auto" strokeWidth={1} />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">No Job Positions Found</h3>
            <p className="text-slate-500 mb-4">
              {jobs.length === 0 
                ? "No jobs have been created yet. Click 'Create First Job' to get started."
                : "No jobs match the current filter. Try changing the filter above."
              }
            </p>
            <button 
              onClick={handleAdd}
              className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Create First Job
            </button>
          </div>
        ) : (
          filteredJobs.map((job, index) => (
            <div key={job.id || `admin-job-${index}`} className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-bold text-slate-900">{job.title}</h3>
                  <span className={`inline-block px-2 py-1 text-xs font-semibold rounded ${
                    job.published 
                      ? 'text-green-600 bg-green-50' 
                      : 'text-yellow-600 bg-yellow-50'
                  }`}>
                    {job.published ? 'Published' : 'Draft'}
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
                {job.published ? 'Hide' : 'Publish'}
              </button>
              <button 
                onClick={() => handleEdit(job)}
                className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors inline-flex items-center gap-1"
              >
                <Edit2 className="w-4 h-4" strokeWidth={2} />
                Edit
              </button>
              <button 
                onClick={() => {
                  if (!job.id || job.id.trim() === '') {
                    alert('Error: Job ID is missing. Please refresh the page and try again.');
                    return;
                  }
                  handleDelete(job.id);
                }}
                className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors inline-flex items-center gap-1"
              >
                <Trash2 className="w-4 h-4" strokeWidth={2} />
                Delete
              </button>
            </div>
          </div>
          ))
        )}
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
    location: 'Baku, Azerbaijan',
    type: 'Full-time',
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
            {job ? 'Edit Position' : 'New Position'}
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
              <label className="block text-sm font-medium text-slate-700 mb-2">Position</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                placeholder="Project Manager"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Department</label>
              <input
                type="text"
                value={formData.department}
                onChange={(e) => setFormData({...formData, department: e.target.value})}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                placeholder="Project Management"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Location</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Type</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({...formData, type: e.target.value as any})}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Salary</label>
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
            <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
              rows={3}
              placeholder="Brief information about the position"
              required
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-slate-700">Requirements</label>
              <button
                type="button"
                onClick={addRequirement}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                + Add
              </button>
            </div>
            <div className="space-y-2">
              {formData.requirements.map((req, index) => (
                <div key={`admin-req-${index}`} className="flex gap-2">
                  <input
                    type="text"
                    value={req}
                    onChange={(e) => updateRequirement(index, e.target.value)}
                    className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="Enter requirement"
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
              <label className="block text-sm font-medium text-slate-700">Job Responsibilities</label>
              <button
                type="button"
                onClick={addResponsibility}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                + Add
              </button>
            </div>
            <div className="space-y-2">
              {formData.responsibilities.map((resp, index) => (
                <div key={`admin-resp-${index}`} className="flex gap-2">
                  <input
                    type="text"
                    value={resp}
                    onChange={(e) => updateResponsibility(index, e.target.value)}
                    className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="Enter responsibility"
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
              Publish immediately
            </label>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Save
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-slate-200 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
