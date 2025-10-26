'use client';

import Link from 'next/link';
import { useData } from '@/contexts/DataContext';
import { 
  Settings, 
  FolderKanban, 
  Users, 
  Mail,
  Briefcase,
  Award,
  Newspaper,
  Image,
  Handshake,
  Cog
} from 'lucide-react';

export default function AdminDashboard() {
  const { services, projects, team, messages, news, partners, certificates, jobs, isLoading } = useData();

  if (isLoading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Yüklənir...</p>
        </div>
      </div>
    );
  }

  const stats = [
    { 
      title: 'Xidmətlər', 
      count: services.length, 
      icon: Settings,
      href: '/admin/services',
      color: 'blue'
    },
    { 
      title: 'Layihələr', 
      count: projects.length, 
      icon: FolderKanban,
      href: '/admin/projects',
      color: 'purple'
    },
    { 
      title: 'Komanda', 
      count: team.length, 
      icon: Users,
      href: '/admin/team',
      color: 'green'
    },
    { 
      title: 'Mesajlar', 
      count: messages.filter(m => !m.read).length, 
      icon: Mail,
      href: '/admin/messages',
      color: 'orange'
    },
    { 
      title: 'Xəbərlər', 
      count: news.length, 
      icon: Newspaper,
      href: '/admin/news',
      color: 'red'
    },
    { 
      title: 'Tərəfdaşlar', 
      count: partners.length, 
      icon: Handshake,
      href: '/admin/partners',
      color: 'teal'
    },
    { 
      title: 'Sertifikatlar', 
      count: certificates.length, 
      icon: Award,
      href: '/admin/certificates',
      color: 'yellow'
    },
    { 
      title: 'Vakansiyalar', 
      count: jobs.length, 
      icon: Briefcase,
      href: '/admin/careers',
      color: 'indigo'
    },
  ];

  const quickLinks = [
    {
      title: 'Karyera',
      description: 'CV müraciətlərini idarə edin',
      icon: Briefcase,
      href: '/admin/careers',
      color: 'indigo'
    },
    {
      title: 'Sertifikatlar',
      description: 'Şirkət sertifikatları',
      icon: Award,
      href: '/admin/certificates',
      color: 'yellow'
    },
    {
      title: 'Xəbərlər',
      description: 'Xəbər və məqalələr',
      icon: Newspaper,
      href: '/admin/news',
      color: 'red'
    },
    {
      title: 'Media',
      description: 'Şəkil və video idarəsi',
      icon: Image,
      href: '/admin/media',
      color: 'pink'
    },
    {
      title: 'Tərəfdaşlar',
      description: 'Müştəri və tərəfdaşlar',
      icon: Handshake,
      href: '/admin/partners',
      color: 'teal'
    },
    {
      title: 'Parametrlər',
      description: 'Sistem parametrləri',
      icon: Cog,
      href: '/admin/settings',
      color: 'gray'
    },
  ];

  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600',
    purple: 'bg-purple-50 text-purple-600',
    green: 'bg-green-50 text-green-600',
    orange: 'bg-orange-50 text-orange-600',
    indigo: 'bg-indigo-50 text-indigo-600',
    yellow: 'bg-yellow-50 text-yellow-600',
    red: 'bg-red-50 text-red-600',
    pink: 'bg-pink-50 text-pink-600',
    teal: 'bg-teal-50 text-teal-600',
    gray: 'bg-gray-50 text-gray-600',
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 lg:mb-8 pt-12 lg:pt-0">
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">Xoş gəlmisiniz! Sistemə ümumi baxış</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 lg:mb-8">
        {stats.map((stat) => {
          const IconComponent = stat.icon;
          return (
            <Link
              key={stat.title}
              href={stat.href}
              className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 border border-slate-200 hover:shadow-md transition-all active:scale-95 lg:hover:scale-105"
            >
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center ${colorClasses[stat.color as keyof typeof colorClasses]}`}>
                  <IconComponent className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2} />
                </div>
              </div>
              <div className="text-xs sm:text-sm text-slate-500 font-medium mb-1">{stat.title}</div>
              <div className="text-2xl sm:text-3xl font-bold text-slate-900">{stat.count}</div>
            </Link>
          );
        })}
      </div>

      {/* Quick Links */}
      <div className="mb-6 lg:mb-8">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-3 sm:mb-4">Sürətli Keçidlər</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {quickLinks.map((link) => {
            const IconComponent = link.icon;
            return (
              <Link
                key={link.title}
                href={link.href}
                className="bg-white rounded-lg p-3 sm:p-4 border border-slate-200 hover:shadow-md transition-all hover:border-slate-300 active:scale-95 group"
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${colorClasses[link.color as keyof typeof colorClasses]} group-hover:scale-110 transition-transform`}>
                    <IconComponent className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={2} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm sm:text-base font-semibold text-slate-900 mb-0.5 sm:mb-1">{link.title}</h3>
                    <p className="text-xs text-slate-500 line-clamp-1">{link.description}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Recent Messages */}
      <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 border border-slate-200">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900">Son Mesajlar</h2>
            <p className="text-xs text-slate-500 mt-1">
              {messages.length > 0 ? `Cəmi ${messages.length} mesaj` : 'Mesaj yoxdur'}
            </p>
          </div>
          {messages.length > 0 && (
            <Link 
              href="/admin/messages"
              className="text-xs sm:text-sm text-blue-600 hover:text-blue-700 font-medium whitespace-nowrap"
            >
              Hamısına bax →
            </Link>
          )}
        </div>

        <div className="space-y-2 sm:space-y-3">
          {messages.length === 0 ? (
            <div className="text-center py-8 sm:py-12">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Mail className="w-6 h-6 sm:w-8 sm:h-8 text-slate-400" strokeWidth={2} />
              </div>
              <p className="text-xs sm:text-sm text-slate-500">Hələ heç bir mesaj yoxdur</p>
            </div>
          ) : (
            <>
              {messages.slice(0, 5).map((message) => (
                <Link
                  key={message.id}
                  href="/admin/messages"
                  className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg hover:bg-slate-50 active:bg-slate-100 transition-colors border border-transparent hover:border-slate-200"
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    message.read ? 'bg-slate-100' : 'bg-orange-50'
                  }`}>
                    <Mail className={`w-4 h-4 ${
                      message.read ? 'text-slate-400' : 'text-orange-600'
                    }`} strokeWidth={2} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className={`text-xs sm:text-sm font-medium truncate ${
                        message.read ? 'text-slate-600' : 'text-slate-900'
                      }`}>
                        {message.name}
                      </p>
                      {!message.read && (
                        <span className="flex-shrink-0 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-orange-500 rounded-full"></span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 truncate mt-0.5 sm:mt-1">{message.message}</p>
                    <p className="text-xs text-slate-400 mt-0.5 sm:mt-1">{message.date}</p>
                  </div>
                </Link>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
