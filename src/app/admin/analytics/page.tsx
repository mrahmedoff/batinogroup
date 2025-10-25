'use client';

import { useEffect, useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import {
  ChartBarIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  EyeIcon,
  UserGroupIcon,
  EnvelopeIcon,
  ClockIcon,
  GlobeAltIcon,
  DevicePhoneMobileIcon,
  ComputerDesktopIcon,
} from '@heroicons/react/24/outline';

export default function Analytics() {
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('30d');

  useEffect(() => {
    fetchAnalytics();
  }, [timeRange]);

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/analytics?range=${timeRange}`);
      const data = await response.json();
      setAnalytics(data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
      setLoading(false);
    }
  };

  if (loading || !analytics) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Statistika və Analitika</h1>
            <p className="text-gray-600 mt-1">Vebsayt performansı və istifadəçi davranışı</p>
          </div>
          
          {/* Time Range Selector */}
          <div className="flex items-center space-x-2 bg-white rounded-lg shadow-sm p-1">
            {[
              { value: '1d', label: 'Bu Gün' },
              { value: '7d', label: '7 Gün' },
              { value: '30d', label: '30 Gün' },
              { value: '90d', label: '90 Gün' },
            ].map((range) => (
              <button
                key={range.value}
                onClick={() => setTimeRange(range.value)}
                className={`px-4 py-2 rounded-md font-medium transition-colors ${
                  timeRange === range.value
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.entries(analytics.trends).map(([key, data]: [string, any]) => (
            <div key={key} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  key === 'visitors' ? 'bg-blue-100' :
                  key === 'pageViews' ? 'bg-purple-100' :
                  key === 'messages' ? 'bg-green-100' : 'bg-orange-100'
                }`}>
                  {key === 'visitors' && <UserGroupIcon className="w-6 h-6 text-blue-600" />}
                  {key === 'pageViews' && <EyeIcon className="w-6 h-6 text-purple-600" />}
                  {key === 'messages' && <EnvelopeIcon className="w-6 h-6 text-green-600" />}
                  {key === 'bounceRate' && <ChartBarIcon className="w-6 h-6 text-orange-600" />}
                </div>
                <div className={`flex items-center space-x-1 text-sm font-semibold ${
                  data.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {data.trend === 'up' ? (
                    <ArrowTrendingUpIcon className="w-4 h-4" />
                  ) : (
                    <ArrowTrendingDownIcon className="w-4 h-4" />
                  )}
                  <span>{Math.abs(data.change)}%</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">
                {typeof data.value === 'number' && data.value > 1000 
                  ? data.value.toLocaleString() 
                  : data.value}
                {key === 'bounceRate' && '%'}
              </h3>
              <p className="text-sm text-gray-600">
                {key === 'visitors' ? 'Ziyarətçilər' :
                 key === 'pageViews' ? 'Səhifə Baxışları' :
                 key === 'messages' ? 'Mesajlar' : 'Bounce Rate'}
              </p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Daily Stats Chart */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Son 30 Günün Statistikası</h2>
            <div className="h-64 flex items-end justify-between space-x-2">
              {analytics.dailyStats.slice(-15).map((day: any, index: number) => {
                const maxVisitors = Math.max(...analytics.dailyStats.map((d: any) => d.visitors));
                const height = (day.visitors / maxVisitors) * 100;
                return (
                  <div key={index} className="flex-1 flex flex-col items-center group">
                    <div className="relative w-full">
                      <div
                        className="w-full bg-gradient-to-t from-blue-600 to-purple-600 rounded-t-lg transition-all duration-300 group-hover:from-blue-700 group-hover:to-purple-700 cursor-pointer"
                        style={{ height: `${height * 2}px` }}
                      >
                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          {day.visitors} ziyarətçi
                        </div>
                      </div>
                    </div>
                    <span className="text-xs text-gray-500 mt-2">
                      {new Date(day.date).getDate()}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Device Stats */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Cihaz Statistikası</h2>
            <div className="space-y-4">
              {analytics.devices.map((device: any, index: number) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      {device.name === 'Desktop' && <ComputerDesktopIcon className="w-5 h-5 text-gray-600 mr-2" />}
                      {device.name === 'Mobile' && <DevicePhoneMobileIcon className="w-5 h-5 text-gray-600 mr-2" />}
                      {device.name === 'Tablet' && <GlobeAltIcon className="w-5 h-5 text-gray-600 mr-2" />}
                      <span className="text-sm font-medium text-gray-700">{device.name}</span>
                    </div>
                    <span className="text-sm font-bold text-gray-900">{device.value}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="h-2 rounded-full transition-all duration-500"
                      style={{ width: `${device.value}%`, backgroundColor: device.color }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Pages */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Ən Çox Baxılan Səhifələr</h2>
            <div className="space-y-4">
              {analytics.topPages.map((page: any, index: number) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center flex-1">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm mr-3">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{page.path}</p>
                      <p className="text-sm text-gray-500">{page.views.toLocaleString()} baxış</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">{page.percentage}%</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Countries */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Ölkələr üzrə Statistika</h2>
            <div className="space-y-4">
              {analytics.countries.map((country: any, index: number) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">{country.flag}</span>
                    <span className="font-medium text-gray-900">{country.name}</span>
                  </div>
                  <span className="text-lg font-bold text-gray-900">{country.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Browsers */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Brauzer Statistikası</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {analytics.browsers.map((browser: any, index: number) => (
              <div key={index} className="p-6 bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl text-center hover:shadow-md transition-shadow">
                <p className="text-3xl font-bold text-gray-900 mb-2">{browser.value}%</p>
                <p className="text-sm font-medium text-gray-600">{browser.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
