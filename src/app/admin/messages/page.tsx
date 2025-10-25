'use client';

import { useState, useEffect } from 'react';
import AdminLayout from '../components/AdminLayout';
import {
  EnvelopeIcon,
  EnvelopeOpenIcon,
  TrashIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
} from '@heroicons/react/24/outline';

export default function Messages() {
  const [selectedMessage, setSelectedMessage] = useState<number | null>(null);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [replyMessage, setReplyMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);

  useEffect(() => {
    fetchMessages();
    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchMessages, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await fetch('/api/messages');
      const data = await response.json();
      setMessages(data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch messages:', error);
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Bu mesajı silmək istədiyinizdən əminsiniz?')) {
      try {
        await fetch('/api/messages', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id }),
        });
        setMessages(messages.filter(m => m.id !== id));
        if (selectedMessage === id) {
          setSelectedMessage(null);
        }
      } catch (error) {
        console.error('Failed to delete message:', error);
      }
    }
  };

  const handleReply = () => {
    setShowReplyModal(true);
    setReplyMessage('');
    setSendSuccess(false);
  };

  const handleSendReply = async () => {
    if (!replyMessage.trim() || !selectedMsg) return;
    
    setSending(true);
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: selectedMsg.email,
          subject: `Re: ${selectedMsg.subject}`,
          message: replyMessage,
          replyTo: 'info@batinogroup.com',
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        setSendSuccess(true);
        setTimeout(() => {
          setShowReplyModal(false);
          setReplyMessage('');
          setSendSuccess(false);
        }, 2000);
      } else {
        alert(`Email göndərilə bilmədi: ${data.details || data.error}`);
      }
    } catch (error) {
      console.error('Failed to send reply:', error);
      alert('Email göndərilə bilmədi. Xəta baş verdi.');
    } finally {
      setSending(false);
    }
  };

  const filteredMessages = messages.filter((msg) => {
    const matchesFilter = filter === 'all' || (filter === 'unread' && msg.unread) || (filter === 'read' && !msg.unread);
    const matchesSearch = msg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         msg.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         msg.subject.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const selectedMsg = messages.find((m) => m.id === selectedMessage);

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Mesajlar</h1>
          <p className="text-gray-600 mt-1">Əlaqə formasından gələn mesajlar</p>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Mesaj axtar..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Filter Buttons */}
            <div className="flex items-center space-x-2">
              <FunnelIcon className="w-5 h-5 text-gray-400" />
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Hamısı ({messages.length})
              </button>
              <button
                onClick={() => setFilter('unread')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === 'unread'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Oxunmamış ({messages.filter((m) => m.unread).length})
              </button>
              <button
                onClick={() => setFilter('read')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === 'read'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Oxunmuş ({messages.filter((m) => !m.unread).length})
              </button>
            </div>
          </div>
        </div>

        {/* Messages Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Messages List */}
          <div className="lg:col-span-1 bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="divide-y divide-gray-200 max-h-[600px] overflow-y-auto">
              {filteredMessages.map((message) => (
                <div
                  key={message.id}
                  onClick={() => setSelectedMessage(message.id)}
                  className={`p-4 cursor-pointer transition-colors ${
                    selectedMessage === message.id
                      ? 'bg-blue-50 border-l-4 border-blue-600'
                      : message.unread
                      ? 'bg-blue-50/30 hover:bg-blue-50'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      {message.unread ? (
                        <EnvelopeIcon className="w-5 h-5 text-blue-600" />
                      ) : (
                        <EnvelopeOpenIcon className="w-5 h-5 text-gray-400" />
                      )}
                      <h3 className={`font-semibold ${message.unread ? 'text-gray-900' : 'text-gray-600'}`}>
                        {message.name}
                      </h3>
                    </div>
                    {message.unread && (
                      <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{message.subject}</p>
                  <p className="text-xs text-gray-500">
                    {message.date} • {message.time}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Message Detail */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
            {selectedMsg ? (
              <div className="space-y-6">
                {/* Header */}
                <div className="flex items-start justify-between pb-6 border-b border-gray-200">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedMsg.subject}</h2>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span>{selectedMsg.date}</span>
                      <span>•</span>
                      <span>{selectedMsg.time}</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleDelete(selectedMsg.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </div>

                {/* Sender Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Göndərən</p>
                    <p className="font-semibold text-gray-900">{selectedMsg.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Email</p>
                    <p className="font-semibold text-gray-900">{selectedMsg.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Şirkət</p>
                    <p className="font-semibold text-gray-900">{selectedMsg.company}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Telefon</p>
                    <p className="font-semibold text-gray-900">{selectedMsg.phone}</p>
                  </div>
                </div>

                {/* Message Content */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Mesaj</h3>
                  <p className="text-gray-700 leading-relaxed">{selectedMsg.message}</p>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-4 pt-6 border-t border-gray-200">
                  <button 
                    onClick={handleReply}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all"
                  >
                    Cavab Ver
                  </button>
                  <button className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all">
                    Oxunmuş Kimi İşarələ
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-center">
                <div>
                  <EnvelopeIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Mesaj Seçin</h3>
                  <p className="text-gray-600">Detalları görmək üçün soldan mesaj seçin</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Reply Modal */}
        {showReplyModal && selectedMsg && (
          <div className="fixed inset-0 bg-gray-900/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Cavab Ver</h2>
                    <p className="text-sm text-gray-600 mt-1">
                      Cavab: <span className="font-semibold">{selectedMsg.name}</span> ({selectedMsg.email})
                    </p>
                  </div>
                  <button
                    onClick={() => setShowReplyModal(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="p-6">
                {/* Original Message */}
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm font-semibold text-gray-700 mb-2">Orijinal Mesaj:</p>
                  <p className="text-sm text-gray-600 italic">"{selectedMsg.message}"</p>
                </div>

                {/* Reply Form */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Cavab Mesajı
                    </label>
                    <textarea
                      value={replyMessage}
                      onChange={(e) => setReplyMessage(e.target.value)}
                      rows={8}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Cavabınızı yazın..."
                      disabled={sending || sendSuccess}
                    />
                  </div>

                  {sendSuccess && (
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-center">
                      <svg className="w-6 h-6 text-green-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <div>
                        <p className="text-green-800 font-semibold">Email uğurla göndərildi!</p>
                        <p className="text-green-600 text-sm">Müştəri tezliklə cavabınızı alacaq.</p>
                      </div>
                    </div>
                  )}

                  {/* Email Preview */}
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <span className="font-semibold">📧 Email:</span> {selectedMsg.email}
                    </p>
                    <p className="text-sm text-blue-800 mt-1">
                      <span className="font-semibold">📋 Mövzu:</span> Re: {selectedMsg.subject}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-gray-200 flex items-center space-x-4">
                <button
                  onClick={handleSendReply}
                  disabled={!replyMessage.trim() || sending || sendSuccess}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {sending ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Göndərilir...
                    </span>
                  ) : sendSuccess ? (
                    'Göndərildi ✓'
                  ) : (
                    'Email Göndər'
                  )}
                </button>
                <button
                  onClick={() => setShowReplyModal(false)}
                  disabled={sending}
                  className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all disabled:opacity-50"
                >
                  Ləğv Et
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
