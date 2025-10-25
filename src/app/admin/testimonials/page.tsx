'use client';

import { useState, useEffect } from 'react';
import AdminLayout from '../components/AdminLayout';
import {
  StarIcon,
  PlusIcon,
  PencilSquareIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';

export default function Testimonials() {
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [testimonials, setTestimonials] = useState<any[]>([]);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const response = await fetch('/api/testimonials');
      const data = await response.json();
      setTestimonials(data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch testimonials:', error);
      setLoading(false);
    }
  };

  const saveTestimonials = async (updatedTestimonials: any[]) => {
    try {
      await fetch('/api/testimonials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTestimonials),
      });
    } catch (error) {
      console.error('Failed to save testimonials:', error);
    }
  };

  const [formData, setFormData] = useState({
    name: '',
    position: '',
    company: '',
    text: '',
    rating: 5,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let updatedTestimonials;
    
    if (editingId) {
      // Update existing
      updatedTestimonials = testimonials.map(t => 
        t.id === editingId ? { ...t, ...formData } : t
      );
    } else {
      // Add new
      updatedTestimonials = [...testimonials, {
        id: Date.now(),
        ...formData,
        image: '',
        active: true,
      }];
    }
    
    setTestimonials(updatedTestimonials);
    await saveTestimonials(updatedTestimonials);
    setShowModal(false);
    setEditingId(null);
    setFormData({ name: '', position: '', company: '', text: '', rating: 5 });
  };

  const handleEdit = (testimonial: any) => {
    setFormData({
      name: testimonial.name,
      position: testimonial.position,
      company: testimonial.company,
      text: testimonial.text,
      rating: testimonial.rating,
    });
    setEditingId(testimonial.id);
    setShowModal(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm('Bu rəyi silmək istədiyinizdən əminsiniz?')) {
      const updatedTestimonials = testimonials.filter(t => t.id !== id);
      setTestimonials(updatedTestimonials);
      await saveTestimonials(updatedTestimonials);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Müştəri Rəyləri</h1>
            <p className="text-gray-600 mt-1">Müştəri rəylərini idarə edin</p>
          </div>
          <button
            onClick={() => {
              setFormData({ name: '', position: '', company: '', text: '', rating: 5 });
              setEditingId(null);
              setShowModal(true);
            }}
            className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg"
          >
            <PlusIcon className="w-5 h-5" />
            <span>Yeni Rəy</span>
          </button>
        </div>

        {/* Stats - Enhanced Card Design */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="group relative bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all border border-gray-100 overflow-hidden cursor-pointer transform hover:-translate-y-1">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-600 opacity-0 group-hover:opacity-5 transition-opacity"></div>
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-gray-600 mb-2 uppercase tracking-wide">Ümumi Rəylər</p>
                <p className="text-4xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{testimonials.length}</p>
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                <StarIcon className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
          <div className="group relative bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all border border-gray-100 overflow-hidden cursor-pointer transform hover:-translate-y-1">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-green-600 opacity-0 group-hover:opacity-5 transition-opacity"></div>
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-gray-600 mb-2 uppercase tracking-wide">Aktiv Rəylər</p>
                <p className="text-4xl font-bold text-gray-900 group-hover:text-green-600 transition-colors">
                  {testimonials.filter(t => t.active).length}
                </p>
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                <span className="text-3xl">✓</span>
              </div>
            </div>
          </div>
          <div className="group relative bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all border border-gray-100 overflow-hidden cursor-pointer transform hover:-translate-y-1">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500 to-yellow-600 opacity-0 group-hover:opacity-5 transition-opacity"></div>
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-gray-600 mb-2 uppercase tracking-wide">Orta Reytinq</p>
                <p className="text-4xl font-bold text-gray-900 group-hover:text-yellow-600 transition-colors">5.0</p>
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                <span className="text-3xl">⭐</span>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials Grid - Enhanced Card Design */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="group relative bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all border-2 border-gray-100 hover:border-blue-200 overflow-hidden transform hover:-translate-y-1">
              {/* Background Gradient Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 opacity-0 group-hover:opacity-5 transition-opacity"></div>
              
              <div className="relative z-10">
                {/* Rating */}
                <div className="flex items-center mb-4 p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className={`w-6 h-6 ${
                        i < testimonial.rating ? 'text-yellow-400 fill-current drop-shadow-md' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>

                {/* Text */}
                <div className="mb-5 p-4 bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl">
                  <p className="text-gray-700 italic leading-relaxed font-medium">"{testimonial.text}"</p>
                </div>

                {/* Author */}
                <div className="mb-4 p-4 bg-white rounded-xl border border-gray-100">
                  <div className="flex items-center mb-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mr-3 shadow-md">
                      <span className="text-white font-bold">{testimonial.name.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">{testimonial.name}</p>
                      <p className="text-sm text-gray-600">{testimonial.position}</p>
                    </div>
                  </div>
                  <p className="text-sm font-semibold text-gray-500 ml-13">{testimonial.company}</p>
                </div>

                {/* Status & Actions */}
                <div className="flex items-center justify-between pt-4 border-t-2 border-gray-100">
                  <span className={`px-4 py-2 rounded-xl text-xs font-bold shadow-md ${
                    testimonial.active
                      ? 'bg-gradient-to-r from-green-500 to-green-600 text-white'
                      : 'bg-gray-200 text-gray-700'
                  }`}>
                    {testimonial.active ? '✓ Aktiv' : 'Deaktiv'}
                  </span>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleEdit(testimonial)}
                      className="p-2.5 text-blue-600 hover:bg-blue-50 rounded-xl transition-all shadow-md hover:shadow-lg transform hover:scale-110"
                    >
                      <PencilSquareIcon className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(testimonial.id)}
                      className="p-2.5 text-red-600 hover:bg-red-50 rounded-xl transition-all shadow-md hover:shadow-lg transform hover:scale-110"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-gray-900/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900">
                  {editingId ? 'Rəyi Redaktə Et' : 'Yeni Rəy Əlavə Et'}
                </h2>
              </div>
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Ad Soyad
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Vəzifə
                    </label>
                    <input
                      type="text"
                      value={formData.position}
                      onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Şirkət
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Rəy Mətni
                  </label>
                  <textarea
                    value={formData.text}
                    onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Reytinq
                  </label>
                  <div className="flex items-center space-x-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setFormData({ ...formData, rating: star })}
                        className="focus:outline-none"
                      >
                        <StarIcon
                          className={`w-8 h-8 ${
                            star <= formData.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center space-x-4 pt-6 border-t border-gray-200">
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all"
                  >
                    {editingId ? 'Yenilə' : 'Əlavə Et'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      setEditingId(null);
                    }}
                    className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all"
                  >
                    Ləğv Et
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
