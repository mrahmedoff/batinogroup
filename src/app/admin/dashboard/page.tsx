'use client';

import { useEffect, useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import {
  UserGroupIcon,
  EnvelopeIcon,
  EyeIcon,
  ChartBarIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';

export default function Dashboard() {
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [analytics, setAnalytics] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
    
    // Auto-refresh every 10 seconds
    const interval = setInterval(fetchDashboardData, 10000);
    return () => clearInterval(interval);
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch all data in parallel
      const [settingsRes, analyticsRes, messagesRes] = await Promise.all([
        fetch('/api/settings'),
        fetch('/api/analytics?range=30d'),
        fetch('/api/messages'),
      ]);

      const settingsData = await settingsRes.json();
      const analyticsData = await analyticsRes.json();
      const messagesData = await messagesRes.json();

      setMaintenanceMode(settingsData.settings?.maintenanceMode || false);
      setAnalytics(analyticsData);
      setMessages(messagesData);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
      setLoading(false);
    }
  };

  // Calculate stats from real data
  const stats = analytics ? [
    {
      name: 'Ümumi Ziyarətçi',
      value: analytics.overview.totalVisitors.toLocaleString(),
      change: `${analytics.trends.visitors.change >= 0 ? '+' : ''}${analytics.trends.visitors.change}%`,
      trend: analytics.trends.visitors.trend,
      icon: EyeIcon,
      color: 'from-blue-500 to-blue-600',
    },
    {
      name: 'Yeni Mesajlar',
      value: messages.filter((m: any) => m.unread).length.toString(),
      change: `${analytics.trends.messages.change >= 0 ? '+' : ''}${analytics.trends.messages.change}%`,
      trend: analytics.trends.messages.trend,
      icon: EnvelopeIcon,
      color: 'from-purple-500 to-purple-600',
    },
    {
      name: 'Səhifə Baxışları',
      value: analytics.overview.totalPageViews.toLocaleString(),
      change: `${analytics.trends.pageViews.change >= 0 ? '+' : ''}${analytics.trends.pageViews.change}%`,
      trend: analytics.trends.pageViews.trend,
      icon: UserGroupIcon,
      color: 'from-green-500 to-green-600',
    },
    {
      name: 'Bounce Rate',
      value: `${analytics.overview.bounceRate.toFixed(1)}%`,
      change: `${analytics.trends.bounceRate.change >= 0 ? '+' : ''}${analytics.trends.bounceRate.change}%`,
      trend: analytics.trends.bounceRate.trend,
      icon: ChartBarIcon,
      color: 'from-orange-500 to-orange-600',
    },
  ] : [];

  // Get recent messages (last 3)
  const recentMessages = messages.slice(0, 3).map((msg: any) => ({
    id: msg.id,
    name: msg.name,
    email: msg.email,
    message: msg.message.substring(0, 80) + (msg.message.length > 80 ? '...' : ''),
    time: getTimeAgo(msg.date, msg.time),
    unread: msg.unread,
  }));

  // Generate recent activities from real data
  const recentActivities = [
    ...messages.slice(0, 2).map((msg: any) => ({
      action: 'Yeni mesaj alındı',
      user: msg.name,
      time: getTimeAgo(msg.date, msg.time),
    })),
    {
      action: 'Statistika yeniləndi',
      user: 'Sistem',
      time: 'İndi',
    },
  ];

  function getTimeAgo(date: string, time: string) {
    try {
      const messageDate = new Date(`${date} ${time}`);
      const now = new Date();
      const diffMs = now.getTime() - messageDate.getTime();
      const diffMins = Math.floor(diffMs / 60000);
      const diffHours = Math.floor(diffMs / 3600000);
      const diffDays = Math.floor(diffMs / 86400000);

      if (diffMins < 1) return 'İndi';
      if (diffMins < 60) return `${diffMins} dəqiqə əvvəl`;
      if (diffHours < 24) return `${diffHours} saat əvvəl`;
      if (diffDays === 1) return 'Dünən';
      return `${diffDays} gün əvvəl`;
    } catch {
      return date;
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              {!loading && (
                <div className="flex items-center gap-2 px-3 py-1 bg-green-100 rounded-full">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs font-medium text-green-700">Real-time</span>
                </div>
              )}
            </div>
            <p className="text-gray-600 mt-1">Xoş gəlmisiniz! Sistemin ümumi vəziyyəti (hər 10 saniyədə yenilənir)</p>
          </div>
        </div>

        {/* Maintenance Mode Alert */}
        {maintenanceMode && (
          <div className="bg-red-50 border-l-4 border-red-600 p-6 rounded-lg">
            <div className="flex items-start">
              <ExclamationTriangleIcon className="w-6 h-6 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="text-lg font-bold text-red-900 mb-2">Texniki Xidmət Rejimi Aktivdir</h3>
                <p className="text-red-700 mb-3">
                  Vebsayt hazırda istifadəçilər üçün əlçatan deyil. Bütün ziyarətçilər texniki xidmət səhifəsinə yönləndirilir.
                </p>
                <div className="flex items-center space-x-4">
                  <a
                    href="/maintenance"
                    target="_blank"
                    className="text-sm font-semibold text-red-700 hover:text-red-800 underline"
                  >
                    Texniki xidmət səhifəsini görün
                  </a>
                  <span className="text-red-400">•</span>
                  <a
                    href="/admin/settings"
                    className="text-sm font-semibold text-red-700 hover:text-red-800 underline"
                  >
                    Deaktiv et
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Stats Grid - Modern Card Design */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-2xl shadow-lg p-6 animate-pulse border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-14 h-14 bg-gray-200 rounded-xl"></div>
                  <div className="w-16 h-6 bg-gray-200 rounded-full"></div>
                </div>
                <div className="w-24 h-8 bg-gray-200 rounded mb-2"></div>
                <div className="w-32 h-4 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
            <div
              key={stat.name}
              className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border border-gray-100 hover:border-blue-200 overflow-hidden cursor-pointer transform hover:-translate-y-1"
            >
              {/* Background Gradient Effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-14 h-14 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                    <stat.icon className="w-7 h-7 text-white" />
                  </div>
                  <div className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-bold ${
                    stat.trend === 'up' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {stat.trend === 'up' ? (
                      <ArrowTrendingUpIcon className="w-4 h-4" />
                    ) : (
                      <ArrowTrendingDownIcon className="w-4 h-4" />
                    )}
                    <span>{stat.change}</span>
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">{stat.value}</h3>
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
              </div>
            </div>
          ))}
          </div>
        )}

        {/* Quick Chart - Enhanced Card Design */}
        {!loading && analytics && analytics.dailyStats.length > 0 && (
          <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-lg p-8 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Son 7 Günün Statistikası</h2>
                <p className="text-sm text-gray-600 mt-1">Ziyarətçi sayının dinamikası</p>
              </div>
              <div className="px-4 py-2 bg-blue-100 rounded-full">
                <span className="text-sm font-bold text-blue-700">📊 Canlı Məlumat</span>
              </div>
            </div>
            <div className="h-56 flex items-end justify-between space-x-3">
              {analytics.dailyStats.slice(-7).map((day: any, index: number) => {
                const maxVisitors = Math.max(...analytics.dailyStats.slice(-7).map((d: any) => d.visitors), 1);
                const height = (day.visitors / maxVisitors) * 100;
                return (
                  <div key={index} className="flex-1 flex flex-col items-center group">
                    <div className="relative w-full">
                      <div
                        className="w-full bg-gradient-to-t from-blue-600 via-blue-500 to-purple-600 rounded-t-xl transition-all duration-300 group-hover:from-blue-700 group-hover:via-blue-600 group-hover:to-purple-700 cursor-pointer shadow-lg group-hover:shadow-xl"
                        style={{ height: `${Math.max(height * 1.8, 8)}px` }}
                      >
                        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 shadow-xl">
                          <div className="font-bold">{day.visitors} ziyarətçi</div>
                          <div className="text-gray-300 text-xs">{new Date(day.date).toLocaleDateString('az-AZ')}</div>
                        </div>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-gray-600 mt-3 group-hover:text-blue-600 transition-colors">
                      {new Date(day.date).toLocaleDateString('az-AZ', { day: 'numeric', month: 'short' })}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Messages - Enhanced Card */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Son Mesajlar</h2>
                <p className="text-sm text-gray-600 mt-1">Ən son gələn müraciətlər</p>
              </div>
              <a href="/admin/messages" className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg">
                Hamısını Gör →
              </a>
            </div>
            <div className="space-y-4">
              {loading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="p-4 bg-gray-50 rounded-lg animate-pulse">
                      <div className="flex items-start space-x-3 mb-2">
                        <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                        <div className="flex-1">
                          <div className="w-32 h-4 bg-gray-200 rounded mb-2"></div>
                          <div className="w-48 h-3 bg-gray-200 rounded"></div>
                        </div>
                      </div>
                      <div className="w-full h-3 bg-gray-200 rounded mb-2"></div>
                      <div className="w-24 h-3 bg-gray-200 rounded"></div>
                    </div>
                  ))}
                </div>
              ) : recentMessages.length === 0 ? (
                <div className="text-center py-12">
                  <EnvelopeIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">Hələ mesaj yoxdur</p>
                </div>
              ) : (
                recentMessages.map((message) => (
                <div
                  key={message.id}
                  className={`group p-5 rounded-xl border-2 transition-all hover:shadow-lg cursor-pointer transform hover:-translate-y-1 ${
                    message.unread ? 'bg-gradient-to-br from-blue-50 to-purple-50 border-blue-300 hover:border-blue-400' : 'bg-white border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                        <span className="text-white font-bold text-base">
                          {message.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{message.name}</h3>
                        <p className="text-sm text-gray-600">{message.email}</p>
                      </div>
                    </div>
                    {message.unread && (
                      <span className="px-3 py-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold rounded-full shadow-md animate-pulse">
                        Yeni
                      </span>
                    )}
                  </div>
                  <p className="text-gray-700 text-sm mb-2 leading-relaxed">{message.message}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold text-gray-500">{message.time}</p>
                    <span className="text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity text-xs font-semibold">Oxu →</span>
                  </div>
                </div>
              ))
              )}
            </div>
          </div>

          {/* Recent Activity - Enhanced Card */}
          <div className="bg-gradient-to-br from-white to-purple-50 rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Son Fəaliyyətlər</h2>
              <p className="text-sm text-gray-600 mt-1">Sistemdəki son hərəkətlər</p>
            </div>
            <div className="space-y-3">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 bg-white rounded-xl hover:shadow-md transition-all border border-gray-100 group cursor-pointer">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0 shadow-md group-hover:shadow-lg transition-shadow">
                    <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{activity.action}</p>
                    <p className="text-xs text-gray-600 mt-1">{activity.user}</p>
                    <p className="text-xs text-gray-500 mt-1 font-semibold">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions - Modern Card Grid */}
        <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg p-8 border border-gray-100">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Sürətli Əməliyyatlar</h2>
            <p className="text-sm text-gray-600 mt-1">Tez-tez istifadə olunan funksiyalar</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            <a
              href="/admin/content"
              className="group relative p-6 bg-white border-2 border-gray-200 rounded-2xl hover:border-blue-500 hover:shadow-xl transition-all transform hover:-translate-y-2 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-600 opacity-0 group-hover:opacity-10 transition-opacity"></div>
              <div className="relative z-10">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                  <span className="text-3xl">📝</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-lg group-hover:text-blue-600 transition-colors">Məzmun Redaktə</h3>
                <p className="text-sm text-gray-600">Səhifələri yeniləyin</p>
              </div>
            </a>
            <a
              href="/admin/testimonials"
              className="group relative p-6 bg-white border-2 border-gray-200 rounded-2xl hover:border-purple-500 hover:shadow-xl transition-all transform hover:-translate-y-2 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-purple-600 opacity-0 group-hover:opacity-10 transition-opacity"></div>
              <div className="relative z-10">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                  <span className="text-3xl">⭐</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-lg group-hover:text-purple-600 transition-colors">Rəylər</h3>
                <p className="text-sm text-gray-600">Müştəri rəylərini idarə edin</p>
              </div>
            </a>
            <a
              href="/admin/messages"
              className="group relative p-6 bg-white border-2 border-gray-200 rounded-2xl hover:border-green-500 hover:shadow-xl transition-all transform hover:-translate-y-2 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-green-600 opacity-0 group-hover:opacity-10 transition-opacity"></div>
              <div className="relative z-10">
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                  <span className="text-3xl">✉️</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-lg group-hover:text-green-600 transition-colors">Mesajlar</h3>
                <p className="text-sm text-gray-600">Gələn mesajları oxuyun</p>
              </div>
            </a>
            <a
              href="/admin/settings"
              className="group relative p-6 bg-white border-2 border-gray-200 rounded-2xl hover:border-orange-500 hover:shadow-xl transition-all transform hover:-translate-y-2 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-orange-600 opacity-0 group-hover:opacity-10 transition-opacity"></div>
              <div className="relative z-10">
                <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                  <span className="text-3xl">⚙️</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-lg group-hover:text-orange-600 transition-colors">Tənzimləmələr</h3>
                <p className="text-sm text-gray-600">Sistem parametrləri</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
