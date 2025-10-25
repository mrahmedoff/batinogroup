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

  const handleMarkAsRead = async (id: number) => {
    try {
      await fetch('/api/messages/mark-read', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      
      // Update local state
      setMessages(messages.map(m => 
        m.id === id ? { ...m, unread: false } : m
      ));
    } catch (error) {
      console.error('Failed to mark as read:', error);
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

        {/* Filters and Search - Enhanced Card */}
        <div className="bg-gradient-to-r from-white to-blue-50 rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Mesaj axtar..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm"
              />
            </div>

            {/* Filter Buttons */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <FunnelIcon className="w-5 h-5 text-blue-600" />
              </div>
              <button
                onClick={() => setFilter('all')}
                className={`px-5 py-2.5 rounded-xl font-bold transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 ${
                  filter === 'all'
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200'
                }`}
              >
                Hamısı ({messages.length})
              </button>
              <button
                onClick={() => setFilter('unread')}
                className={`px-5 py-2.5 rounded-xl font-bold transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 ${
                  filter === 'unread'
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200'
                }`}
              >
                Oxunmamış ({messages.filter((m) => m.unread).length})
              </button>
              <button
                onClick={() => setFilter('read')}
                className={`px-5 py-2.5 rounded-xl font-bold transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 ${
                  filter === 'read'
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200'
                }`}
              >
                Oxunmuş ({messages.filter((m) => !m.unread).length})
              </button>
            </div>
          </div>
        </div>

        {/* Messages Grid - Enhanced Card Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Messages List - Modern Card */}
          <div className="lg:col-span-1 bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
            <div className="p-4 bg-gradient-to-r from-blue-600 to-purple-600">
              <h3 className="text-white font-bold text-lg">Mesaj Siyahısı</h3>
              <p className="text-blue-100 text-sm">{filteredMessages.length} mesaj</p>
            </div>
            <div className="divide-y divide-gray-100 max-h-[600px] overflow-y-auto">
              {filteredMessages.map((message) => (
                <div
                  key={message.id}
                  onClick={() => {
                    setSelectedMessage(message.id);
                    if (message.unread) {
                      handleMarkAsRead(message.id);
                    }
                  }}
                  className={`group p-5 cursor-pointer transition-all hover:shadow-md ${
                    selectedMessage === message.id
                      ? 'bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-blue-600'
                      : message.unread
                      ? 'bg-blue-50/40 hover:bg-blue-50'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-md ${
                        message.unread ? 'bg-gradient-to-br from-blue-600 to-purple-600' : 'bg-gray-400'
                      }`}>
                        {message.unread ? (
                          <EnvelopeIcon className="w-5 h-5 text-white" />
                        ) : (
                          <EnvelopeOpenIcon className="w-5 h-5 text-white" />
                        )}
                      </div>
                      <h3 className={`font-bold group-hover:text-blue-600 transition-colors ${message.unread ? 'text-gray-900' : 'text-gray-600'}`}>
                        {message.name}
                      </h3>
                    </div>
                    {message.unread && (
                      <span className="w-3 h-3 bg-blue-600 rounded-full animate-pulse shadow-lg"></span>
                    )}
                  </div>
                  <p className="text-sm font-semibold text-gray-700 mb-2">{message.subject}</p>
                  <p className="text-xs font-medium text-gray-500">
                    {message.date} • {message.time}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Message Detail - Enhanced Card */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            {selectedMsg ? (
              <div className="space-y-6">
                {/* Header - Enhanced */}
                <div className="flex items-start justify-between pb-6 border-b-2 border-gray-100">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                        <EnvelopeIcon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900">{selectedMsg.subject}</h2>
                        <div className="flex items-center space-x-3 text-sm font-medium text-gray-600 mt-1">
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full">{selectedMsg.date}</span>
                          <span>•</span>
                          <span>{selectedMsg.time}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleDelete(selectedMsg.id)}
                    className="p-3 text-red-600 hover:bg-red-50 rounded-xl transition-all shadow-md hover:shadow-lg"
                  >
                    <TrashIcon className="w-6 h-6" />
                  </button>
                </div>

                {/* Sender Info - Enhanced Card */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl border border-gray-100">
                  <div className="p-4 bg-white rounded-xl shadow-sm">
                    <p className="text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">Göndərən</p>
                    <p className="font-bold text-gray-900 text-lg">{selectedMsg.name}</p>
                  </div>
                  <div className="p-4 bg-white rounded-xl shadow-sm">
                    <p className="text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">Email</p>
                    <p className="font-bold text-blue-600 text-lg">{selectedMsg.email}</p>
                  </div>
                  <div className="p-4 bg-white rounded-xl shadow-sm">
                    <p className="text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">Şirkət</p>
                    <p className="font-bold text-gray-900 text-lg">{selectedMsg.company}</p>
                  </div>
                  <div className="p-4 bg-white rounded-xl shadow-sm">
                    <p className="text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">Telefon</p>
                    <p className="font-bold text-gray-900 text-lg">{selectedMsg.phone}</p>
                  </div>
                </div>

                {/* Message Content - Enhanced */}
                <div className="p-6 bg-gradient-to-br from-white to-gray-50 rounded-2xl border-2 border-gray-100">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                    <span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-2">
                      💬
                    </span>
                    Mesaj Mətni
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-base">{selectedMsg.message}</p>
                </div>

                {/* Actions - Enhanced */}
                <div className="flex items-center space-x-4 pt-6 border-t-2 border-gray-100">
                  <button 
                    onClick={handleReply}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-bold hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    ✉️ Cavab Ver
                  </button>
                  <button 
                    onClick={() => handleMarkAsRead(selectedMsg.id)}
                    disabled={!selectedMsg.unread}
                    className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-0.5"
                  >
                    {selectedMsg.unread ? '✓ Oxunmuş Kimi İşarələ' : '✓ Oxunmuş'}
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-center">
                <div className="p-12 bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <EnvelopeIcon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Mesaj Seçin</h3>
                  <p className="text-gray-600 text-lg">Detalları görmək üçün soldan mesaj seçin</p>
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
