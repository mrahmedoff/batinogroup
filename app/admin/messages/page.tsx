'use client';

import { useState } from 'react';
import { useData } from '@/contexts/DataContext';
import { Mail, Trash2, Inbox, Calendar, X, Send, CheckCircle, AlertCircle, Loader2, FileText, Download } from 'lucide-react';

export default function MessagesAdmin() {
  const { messages, deleteMessage, markMessageAsRead } = useData();
  const [selectedMessage, setSelectedMessage] = useState<any>(null);
  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);
  const [replyStatus, setReplyStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [replyError, setReplyError] = useState('');

  const handleDelete = (id: string) => {
    if (confirm('Bu mesajı silmək istədiyinizdən əminsiniz?')) {
      deleteMessage(id);
      if (selectedMessage?.id === id) {
        setSelectedMessage(null);
      }
    }
  };

  const handleSelectMessage = (message: any) => {
    setSelectedMessage(message);
    if (!message.read) {
      markMessageAsRead(message.id);
    }
  };

  const jobApplications = messages.filter(m => m.subject.includes('Vakansiya müraciəti'));
  const regularMessages = messages.filter(m => !m.subject.includes('Vakansiya müraciəti'));

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Mesajlar</h1>
        <p className="text-sm text-slate-500 mt-1">Gələn mesajları və vakansiya müraciətlərini idarə edin</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <Mail className="w-6 h-6 text-blue-600" strokeWidth={2} />
            </div>
            <div>
              <div className="text-sm text-slate-500 font-medium">Ümumi Mesajlar</div>
              <div className="text-2xl font-bold text-slate-900">{messages.length}</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
              <Mail className="w-6 h-6 text-green-600" strokeWidth={2} />
            </div>
            <div>
              <div className="text-sm text-slate-500 font-medium">Vakansiya Müraciətləri</div>
              <div className="text-2xl font-bold text-slate-900">{jobApplications.length}</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center">
              <Mail className="w-6 h-6 text-red-600" strokeWidth={2} />
            </div>
            <div>
              <div className="text-sm text-slate-500 font-medium">Oxunmamış</div>
              <div className="text-2xl font-bold text-slate-900">
                {messages.filter(m => !m.read).length}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="p-4 border-b border-slate-200">
            <h2 className="font-semibold text-slate-900">Gələn Mesajlar ({messages.length})</h2>
          </div>
          <div className="divide-y divide-slate-200 max-h-[600px] overflow-y-auto">
            {messages.map((message) => {
              const isJobApplication = message.subject.includes('Vakansiya müraciəti');
              return (
                <div
                  key={message.id}
                  onClick={() => handleSelectMessage(message)}
                  className={`p-4 cursor-pointer hover:bg-slate-50 transition-colors ${
                    !message.read ? 'bg-blue-50' : ''
                  } ${selectedMessage?.id === message.id ? 'border-l-4 border-blue-600' : ''}`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <div className="flex-1">
                      <span className="font-semibold text-sm text-slate-900">{message.name}</span>
                      {isJobApplication && (
                        <span className="ml-2 inline-block px-2 py-0.5 text-xs font-semibold text-green-600 bg-green-50 rounded">
                          Vakansiya
                        </span>
                      )}
                    </div>
                    {!message.read && (
                    <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                  )}
                </div>
                  <p className="text-sm text-slate-600 truncate">{message.subject}</p>
                  <p className="text-xs text-slate-400 mt-1">{message.date}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200">
          {selectedMessage ? (
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">{selectedMessage.subject}</h2>
                  <div className="flex items-center gap-4 text-sm text-slate-600">
                    <span className="inline-flex items-center gap-1">
                      <Mail className="w-4 h-4" strokeWidth={2} />
                      {selectedMessage.email}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="w-4 h-4" strokeWidth={2} />
                      {selectedMessage.date}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(selectedMessage.id)}
                  className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors inline-flex items-center gap-1"
                >
                  <Trash2 className="w-4 h-4" strokeWidth={2} />
                  Sil
                </button>
              </div>

              <div className="border-t border-slate-200 pt-6">
                <p className="text-slate-700 whitespace-pre-wrap">{selectedMessage.message}</p>
                
                {/* CV Download Link */}
                {selectedMessage.message.includes('CV Link:') && (
                  <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <FileText className="w-5 h-5 text-blue-600" />
                      <span className="font-semibold text-blue-900">CV Faylı</span>
                    </div>
                    <a
                      href={selectedMessage.message.split('CV Link: ')[1]?.split('\n')[0]?.trim()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      CV-ni Yüklə
                    </a>
                  </div>
                )}
              </div>

              <div className="mt-6 pt-6 border-t border-slate-200">
                <button 
                  onClick={() => setIsReplyModalOpen(true)}
                  className="px-6 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center gap-2"
                >
                  <Mail className="w-4 h-4" strokeWidth={2} />
                  Cavabla
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full min-h-[600px]">
              <div className="text-center">
                <Inbox className="w-16 h-16 text-slate-300 mx-auto mb-4" strokeWidth={1.5} />
                <p className="text-slate-600 font-medium">Mesaj seçin</p>
                <p className="text-sm text-slate-400 mt-1">Oxumaq üçün soldan mesaj seçin</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Reply Modal */}
      {isReplyModalOpen && selectedMessage && (
        <ReplyModal
          message={selectedMessage}
          onClose={() => {
            setIsReplyModalOpen(false);
            setReplyStatus('idle');
            setReplyError('');
          }}
          status={replyStatus}
          error={replyError}
          onSend={async (replyData) => {
            setReplyStatus('sending');
            setReplyError('');

            try {
              const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  to: selectedMessage.email,
                  subject: `Re: ${selectedMessage.subject}`,
                  message: replyData.message,
                  replyTo: replyData.replyTo || 'info@batinogroup.az'
                }),
              });

              const data = await response.json();

              if (!response.ok) {
                throw new Error(data.error || 'Email göndərilmədi');
              }

              setReplyStatus('success');
              setTimeout(() => {
                setIsReplyModalOpen(false);
                setReplyStatus('idle');
              }, 2000);

            } catch (error) {
              console.error('Reply error:', error);
              setReplyStatus('error');
              setReplyError(error instanceof Error ? error.message : 'Xəta baş verdi');
            }
          }}
        />
      )}
    </div>
  );
}

function ReplyModal({ 
  message, 
  onClose, 
  onSend,
  status,
  error
}: { 
  message: any; 
  onClose: () => void; 
  onSend: (data: { message: string; replyTo: string }) => void;
  status: 'idle' | 'sending' | 'success' | 'error';
  error: string;
}) {
  const [replyMessage, setReplyMessage] = useState('');
  const [replyTo, setReplyTo] = useState('info@batinogroup.az');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (replyMessage.trim()) {
      onSend({ message: replyMessage, replyTo });
    }
  };

  if (status === 'success') {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Email göndərildi!</h3>
          <p className="text-gray-600">
            Cavabınız {message.email} ünvanına uğurla göndərildi.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-xl p-6 max-w-3xl w-full my-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Cavab Göndər</h2>
            <p className="text-sm text-gray-600 mt-1">
              Alıcı: <span className="font-semibold">{message.email}</span>
            </p>
          </div>
          <button
            onClick={onClose}
            disabled={status === 'sending'}
            className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Original Message */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="text-xs text-gray-500 mb-2">Orijinal mesaj:</div>
          <div className="text-sm text-gray-700">
            <div className="font-semibold mb-1">{message.subject}</div>
            <div className="text-xs text-gray-500 mb-2">{message.date}</div>
            <div className="max-h-32 overflow-y-auto text-gray-600 whitespace-pre-wrap">
              {message.message}
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cavab Email Ünvanı
            </label>
            <input
              type="email"
              value={replyTo}
              onChange={(e) => setReplyTo(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="info@batinogroup.az"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Müştəri cavab verdikdə bu ünvana göndəriləcək
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mesajınız <span className="text-red-500">*</span>
            </label>
            <textarea
              value={replyMessage}
              onChange={(e) => setReplyMessage(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
              rows={10}
              placeholder="Cavabınızı yazın..."
              required
              disabled={status === 'sending'}
            />
          </div>

          {status === 'error' && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-red-900">Xəta baş verdi</div>
                <div className="text-sm text-red-700 mt-1">{error}</div>
              </div>
            </div>
          )}

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              <strong>Qeyd:</strong> Email avtomatik olaraq müştərinin email ünvanına göndəriləcək. 
              Email provider konfiqurasiyası tələb olunur (Resend API).
            </p>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={status === 'sending' || !replyMessage.trim()}
              className="flex-1 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === 'sending' ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Göndərilir...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Email Göndər
                </>
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              disabled={status === 'sending'}
              className="px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50"
            >
              Ləğv et
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
