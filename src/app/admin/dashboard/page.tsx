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

  useEffect(() => {
    checkMaintenanceMode();
  }, []);

  const checkMaintenanceMode = async () => {
    try {
      const response = await fetch('/api/settings');
      const data = await response.json();
      setMaintenanceMode(data.settings?.maintenanceMode || false);
    } catch (error) {
      console.error('Failed to check maintenance mode:', error);
    }
  };
  const stats = [
    {
      name: 'Ümumi Ziyarətçi',
      value: '12,543',
      change: '+12.5%',
      trend: 'up',
      icon: EyeIcon,
      color: 'from-blue-500 to-blue-600',
    },
    {
      name: 'Yeni Mesajlar',
      value: '24',
      change: '+8.2%',
      trend: 'up',
      icon: EnvelopeIcon,
      color: 'from-purple-500 to-purple-600',
    },
    {
      name: 'Aktiv Müştərilər',
      value: '1,543',
      change: '+23.1%',
      trend: 'up',
      icon: UserGroupIcon,
      color: 'from-green-500 to-green-600',
    },
    {
      name: 'Konversiya',
      value: '3.2%',
      change: '-2.4%',
      trend: 'down',
      icon: ChartBarIcon,
      color: 'from-orange-500 to-orange-600',
    },
  ];

  const recentMessages = [
    {
      id: 1,
      name: 'Elçin Məmmədov',
      email: 'elcin@example.com',
      message: 'Xidmətləriniz haqqında ətraflı məlumat almaq istəyirəm...',
      time: '5 dəqiqə əvvəl',
      unread: true,
    },
    {
      id: 2,
      name: 'Leyla Həsənova',
      email: 'leyla@example.com',
      message: 'Qiymət təklifi üçün müraciət edirəm...',
      time: '1 saat əvvəl',
      unread: true,
    },
    {
      id: 3,
      name: 'Rəşad Əliyev',
      email: 'rashad@example.com',
      message: 'Əməkdaşlıq təklifi ilə bağlı...',
      time: '3 saat əvvəl',
      unread: false,
    },
  ];

  const recentActivities = [
    { action: 'Yeni mesaj alındı', user: 'Elçin Məmmədov', time: '5 dəqiqə əvvəl' },
    { action: 'Məzmun yeniləndi', user: 'Admin', time: '2 saat əvvəl' },
    { action: 'Yeni rəy əlavə edildi', user: 'Leyla Həsənova', time: '4 saat əvvəl' },
    { action: 'Tənzimləmələr dəyişdirildi', user: 'Admin', time: '1 gün əvvəl' },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Xoş gəlmisiniz! Sistemin ümumi vəziyyəti</p>
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

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.name}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className={`flex items-center space-x-1 text-sm font-semibold ${
                  stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.trend === 'up' ? (
                    <ArrowTrendingUpIcon className="w-4 h-4" />
                  ) : (
                    <ArrowTrendingDownIcon className="w-4 h-4" />
                  )}
                  <span>{stat.change}</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
              <p className="text-sm text-gray-600">{stat.name}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Messages */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Son Mesajlar</h2>
              <a href="/admin/messages" className="text-sm text-blue-600 hover:text-blue-700 font-semibold">
                Hamısını Gör →
              </a>
            </div>
            <div className="space-y-4">
              {recentMessages.map((message) => (
                <div
                  key={message.id}
                  className={`p-4 rounded-lg border transition-all hover:shadow-md cursor-pointer ${
                    message.unread ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">
                          {message.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{message.name}</h3>
                        <p className="text-sm text-gray-500">{message.email}</p>
                      </div>
                    </div>
                    {message.unread && (
                      <span className="px-2 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full">
                        Yeni
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 text-sm mb-2">{message.message}</p>
                  <p className="text-xs text-gray-500">{message.time}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Son Fəaliyyətlər</h2>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                    <p className="text-xs text-gray-500">{activity.user}</p>
                    <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Sürətli Əməliyyatlar</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <a
              href="/admin/content"
              className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all group"
            >
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-3 group-hover:bg-blue-600 transition-colors">
                <span className="text-2xl group-hover:text-white">📝</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Məzmun Redaktə</h3>
              <p className="text-sm text-gray-600">Səhifələri yeniləyin</p>
            </a>
            <a
              href="/admin/testimonials"
              className="p-4 border-2 border-gray-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-all group"
            >
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-3 group-hover:bg-purple-600 transition-colors">
                <span className="text-2xl group-hover:text-white">⭐</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Rəylər</h3>
              <p className="text-sm text-gray-600">Müştəri rəylərini idarə edin</p>
            </a>
            <a
              href="/admin/messages"
              className="p-4 border-2 border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-all group"
            >
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-3 group-hover:bg-green-600 transition-colors">
                <span className="text-2xl group-hover:text-white">✉️</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Mesajlar</h3>
              <p className="text-sm text-gray-600">Gələn mesajları oxuyun</p>
            </a>
            <a
              href="/admin/settings"
              className="p-4 border-2 border-gray-200 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-all group"
            >
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mb-3 group-hover:bg-orange-600 transition-colors">
                <span className="text-2xl group-hover:text-white">⚙️</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Tənzimləmələr</h3>
              <p className="text-sm text-gray-600">Sistem parametrləri</p>
            </a>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
