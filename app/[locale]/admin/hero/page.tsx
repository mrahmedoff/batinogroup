'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X, Upload, Eye } from 'lucide-react';
import { useData } from '@/contexts/DataContext';

interface HeroSlide {
  id: string;
  title: string;
  description: string;
  image: string;
  order: number;
  active: boolean;
  buttonText?: string;
  buttonLink?: string;
}

export default function HeroAdminPage() {
  const { refreshHeroSlides } = useData();
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSlide, setEditingSlide] = useState<HeroSlide | null>(null);
  const [formData, setFormData] = useState<Partial<HeroSlide>>({
    title: '',
    description: '',
    image: '',
    order: 1,
    active: true,
    buttonText: 'Learn More',
    buttonLink: '/about'
  });

  // Load hero slides from Firebase
  useEffect(() => {
    loadSlides();
  }, []);

  const loadSlides = async (forceReload = false) => {
    try {
      setIsLoading(true);
      console.log('Loading slides...', forceReload ? '(Force reload)' : '');

      // Add cache busting parameter
      const cacheBuster = forceReload ? `?t=${Date.now()}` : '';
      const response = await fetch(`/api/hero-slides${cacheBuster}`, {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        }
      });

      console.log('Response status:', response.status);

      if (response.ok) {
        const data = await response.json();
        console.log('Loaded slides count:', data.length);
        console.log('Loaded slides:', data);

        const sortedSlides = data.sort((a: HeroSlide, b: HeroSlide) => a.order - b.order);
        setSlides(sortedSlides);

        console.log('Updated slides state with', sortedSlides.length, 'slides');
      } else {
        console.error('Failed to load slides:', response.status);
      }
    } catch (error) {
      console.error('Error loading slides:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Clean form data
      const cleanFormData = {
        title: formData.title,
        description: formData.description,
        image: formData.image,
        order: formData.order || slides.length + 1,
        active: formData.active,
        buttonText: formData.buttonText,
        buttonLink: formData.buttonLink
      };

      let slideData: any = cleanFormData;

      if (editingSlide) {
        slideData.id = editingSlide.id;
      }

      console.log('Submitting clean slide data:', slideData);

      const method = editingSlide ? 'PUT' : 'POST';
      const response = await fetch('/api/hero-slides', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(slideData)
      });

      const result = await response.json();
      console.log('API Response:', result);

      if (response.ok) {
        alert(editingSlide ? 'Slide updated successfully!' : 'Slide created successfully!');
        await loadSlides();
        await refreshHeroSlides();
        localStorage.setItem('heroSlidesUpdated', Date.now().toString());
        setIsModalOpen(false);
        setEditingSlide(null);
        setFormData({
          title: '',
          description: '',
          image: '',
          order: 1,
          active: true,
          buttonText: 'Learn More',
          buttonLink: '/about'
        });
      } else {
        alert('Error: ' + (result.error || 'Failed to save slide') + '\nDetails: ' + (result.details || ''));
      }
    } catch (error) {
      console.error('Error saving slide:', error);
      alert('Error saving slide: ' + error);
    }
  };

  const handleEdit = (slide: HeroSlide) => {
    setEditingSlide(slide);
    const cleanSlideData = {
      title: slide.title,
      description: slide.description,
      image: slide.image,
      order: slide.order,
      active: slide.active,
      buttonText: slide.buttonText,
      buttonLink: slide.buttonLink
    };
    setFormData(cleanSlideData);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this slide?')) {
      try {
        console.log('=== DELETE OPERATION ===');
        console.log('Deleting slide with id:', id);

        const originalSlides = [...slides];
        setSlides(slides.filter(slide => slide.id !== id));

        const response = await fetch('/api/hero-slides', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id })
        });

        const result = await response.json();
        console.log('Delete response:', response.status, result);

        if (response.ok) {
          console.log('✅ Delete successful');
          alert('Slide deleted successfully!');
          await loadSlides(true);
          await refreshHeroSlides();
          localStorage.setItem('heroSlidesUpdated', Date.now().toString());
        } else {
          console.log('❌ Delete failed:', result.error);
          setSlides(originalSlides);
          alert('Error deleting slide: ' + (result.error || 'Unknown error'));
        }
      } catch (error) {
        console.error('❌ Delete error:', error);
        setSlides(slides);
        alert('Error deleting slide: ' + error);
      }
    }
  };

  const toggleActive = async (slide: HeroSlide) => {
    try {
      const cleanSlideData = {
        id: slide.id,
        title: slide.title,
        description: slide.description,
        image: slide.image,
        order: slide.order,
        active: !slide.active,
        buttonText: slide.buttonText,
        buttonLink: slide.buttonLink
      };

      console.log('Toggling slide active status:', cleanSlideData);

      const response = await fetch('/api/hero-slides', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cleanSlideData)
      });

      const result = await response.json();
      console.log('Toggle response:', result);

      if (response.ok) {
        await loadSlides();
        await refreshHeroSlides();
        localStorage.setItem('heroSlidesUpdated', Date.now().toString());
      } else {
        alert('Error toggling slide: ' + (result.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error toggling slide:', error);
      alert('Error toggling slide: ' + error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Hero Slides Management</h1>
        <div className="flex gap-2">
          <button
            onClick={() => loadSlides(true)}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center gap-2"
          >
            Refresh
          </button>
          <button
            onClick={() => {
              setEditingSlide(null);
              setFormData({
                title: '',
                description: '',
                image: '',
                order: slides.length + 1,
                active: true,
                buttonText: 'Learn More',
                buttonLink: '/about'
              });
              setIsModalOpen(true);
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add New Slide
          </button>
        </div>
      </div>

      {/* Slides Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {slides.map((slide) => (
          <div key={slide.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative h-48">
              {slide.image ? (
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <Upload className="w-12 h-12 text-gray-400" />
                </div>
              )}
              <div className="absolute top-2 right-2 flex gap-2">
                <button
                  onClick={() => toggleActive(slide)}
                  className={`p-1 rounded-full ${slide.active ? 'bg-green-500' : 'bg-gray-500'
                    } text-white`}
                >
                  <Eye className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="p-4">
              <h3 className="font-bold text-lg mb-2 line-clamp-2">{slide.title}</h3>
              <p className="text-gray-600 text-sm mb-3 line-clamp-3">{slide.description}</p>

              <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                <span>Order: {slide.order}</span>
                <span className={`px-2 py-1 rounded ${slide.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                  {slide.active ? 'Active' : 'Inactive'}
                </span>
              </div>

              <div className="text-xs text-gray-400 mb-3 font-mono">
                ID: {slide.id}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(slide)}
                  className="flex-1 px-3 py-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 flex items-center justify-center gap-1"
                >
                  <Edit className="w-4 h-4" />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(slide.id)}
                  className="flex-1 px-3 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200 flex items-center justify-center gap-1"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {slides.length === 0 && (
        <div className="text-center py-12">
          <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No slides yet</h3>
          <p className="text-gray-600 mb-4">Create your first hero slide to get started.</p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Add First Slide
          </button>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">
                  {editingSlide ? 'Edit Slide' : 'Add New Slide'}
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Title</label>
                  <input
                    type="text"
                    required
                    value={formData.title || ''}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter slide title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <textarea
                    required
                    value={formData.description || ''}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={3}
                    placeholder="Enter slide description"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Image URL</label>
                  <input
                    type="url"
                    required
                    value={formData.image || ''}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Order</label>
                    <input
                      type="number"
                      min="1"
                      value={formData.order || 1}
                      onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Status</label>
                    <select
                      value={formData.active ? 'true' : 'false'}
                      onChange={(e) => setFormData({ ...formData, active: e.target.value === 'true' })}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="true">Active</option>
                      <option value="false">Inactive</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Button Text (Optional)</label>
                    <input
                      type="text"
                      value={formData.buttonText || ''}
                      onChange={(e) => setFormData({ ...formData, buttonText: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Learn More"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Button Link (Optional)</label>
                    <input
                      type="text"
                      value={formData.buttonLink || ''}
                      onChange={(e) => setFormData({ ...formData, buttonLink: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="/about"
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    {editingSlide ? 'Update Slide' : 'Create Slide'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}