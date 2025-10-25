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
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  useEffect(() => {
    fetchAnalytics();
    
    // Hər 5 saniyədə bir yenilə (real-time)
    const interval = setInterval(() => {
      fetchAnalytics();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [timeRange]);

  const fetchAnalytics = async () => {
    try {
      const response = await fetch(`/api/analytics?range=${timeRange}`);
      const data = await response.json();
      setAnalytics(data);
      setLastUpdate(new Date());
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
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold text-gray-900">Statistika və Analitika</h1>
              <div className="flex items-center gap-2 px-3 py-1 bg-green-100 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-medium text-green-700">Real-time</span>
              </div>
            </div>
            <p className="text-gray-600 mt-1">
              Vebsayt performansı və istifadəçi davranışı • 
              <span className="text-gray-500 text-sm ml-2">
                Son yenilənmə: {lastUpdate.toLocaleTimeString('az-AZ')}
              </span>
            </p>
          </div>
          
          {/* Time Range Selector & Refresh */}
          <div className="flex items-center gap-3">
            <button
              onClick={fetchAnalytics}
              className="px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-all flex items-center gap-2 text-gray-700 hover:text-blue-600"
              title="Yenilə"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span className="font-medium">Yenilə</span>
            </button>
            
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
        </div>

        {/* Key Metrics - Enhanced Card Design */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.entries(analytics.trends).map(([key, data]: [string, any]) => (
            <div key={key} className="group relative bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden cursor-pointer transform hover:-translate-y-1">
              {/* Background Gradient Effect */}
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 ${
                key === 'visitors' ? 'bg-gradient-to-br from-blue-500 to-blue-600' :
                key === 'pageViews' ? 'bg-gradient-to-br from-purple-500 to-purple-600' :
                key === 'messages' ? 'bg-gradient-to-br from-green-500 to-green-600' : 'bg-gradient-to-br from-orange-500 to-orange-600'
              }`}></div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300 ${
                    key === 'visitors' ? 'bg-gradient-to-br from-blue-500 to-blue-600' :
                    key === 'pageViews' ? 'bg-gradient-to-br from-purple-500 to-purple-600' :
                    key === 'messages' ? 'bg-gradient-to-br from-green-500 to-green-600' : 'bg-gradient-to-br from-orange-500 to-orange-600'
                  }`}>
                    {key === 'visitors' && <UserGroupIcon className="w-7 h-7 text-white" />}
                    {key === 'pageViews' && <EyeIcon className="w-7 h-7 text-white" />}
                    {key === 'messages' && <EnvelopeIcon className="w-7 h-7 text-white" />}
                    {key === 'bounceRate' && <ChartBarIcon className="w-7 h-7 text-white" />}
                  </div>
                  <div className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-bold ${
                    data.trend === 'up' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {data.trend === 'up' ? (
                      <ArrowTrendingUpIcon className="w-4 h-4" />
                    ) : (
                      <ArrowTrendingDownIcon className="w-4 h-4" />
                    )}
                    <span>{Math.abs(data.change)}%</span>
                  </div>
                </div>
                <h3 className={`text-3xl font-bold mb-1 transition-colors ${
                  key === 'visitors' ? 'text-gray-900 group-hover:text-blue-600' :
                  key === 'pageViews' ? 'text-gray-900 group-hover:text-purple-600' :
                  key === 'messages' ? 'text-gray-900 group-hover:text-green-600' : 'text-gray-900 group-hover:text-orange-600'
                }`}>
                  {typeof data.value === 'number' && data.value > 1000 
                    ? data.value.toLocaleString() 
                    : data.value}
                  {key === 'bounceRate' && '%'}
                </h3>
                <p className="text-sm font-medium text-gray-600">
                  {key === 'visitors' ? 'Ziyarətçilər' :
                   key === 'pageViews' ? 'Səhifə Baxışları' :
                   key === 'messages' ? 'Mesajlar' : 'Bounce Rate'}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Daily Stats Chart - Enhanced Card */}
          <div className="lg:col-span-2 bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-lg p-8 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {timeRange === '1d' ? 'Bugünkü' : 
                   timeRange === '7d' ? 'Son 7 Günün' : 
                   timeRange === '30d' ? 'Son 30 Günün' : 'Son 90 Günün'} Statistikası
                </h2>
                <p className="text-sm text-gray-600 mt-1">Ziyarətçi sayının dinamikası</p>
              </div>
              <div className="px-4 py-2 bg-blue-100 rounded-full">
                <span className="text-sm font-bold text-blue-700">📊 Canlı</span>
              </div>
            </div>
            {analytics.dailyStats.length === 0 ? (
              <div className="h-64 flex items-center justify-center">
                <div className="text-center">
                  <ChartBarIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 font-medium">Hələ statistika məlumatı yoxdur</p>
                  <p className="text-sm text-gray-400 mt-2">Vebsayta ziyarətçilər gəldikdə burada görünəcək</p>
                </div>
              </div>
            ) : (
              <div className="h-64 flex items-end justify-between space-x-2">
                {analytics.dailyStats.slice(-15).map((day: any, index: number) => {
                  const maxVisitors = Math.max(...analytics.dailyStats.map((d: any) => d.visitors), 1);
                  const height = (day.visitors / maxVisitors) * 100;
                  return (
                    <div key={index} className="flex-1 flex flex-col items-center group">
                      <div className="relative w-full">
                        <div
                          className="w-full bg-gradient-to-t from-blue-600 to-purple-600 rounded-t-lg transition-all duration-300 group-hover:from-blue-700 group-hover:to-purple-700 cursor-pointer"
                          style={{ height: `${Math.max(height * 2, 4)}px` }}
                        >
                          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
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
            )}
          </div>

          {/* Device Stats - Enhanced Card */}
          <div className="bg-gradient-to-br from-white to-purple-50 rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Cihaz Statistikası</h2>
              <p className="text-sm text-gray-600 mt-1">İstifadəçi cihazları</p>
            </div>
            <div className="space-y-5">
              {analytics.devices.map((device: any, index: number) => (
                <div key={index} className="group p-4 bg-white rounded-xl hover:shadow-md transition-all border border-gray-100">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mr-3 shadow-md group-hover:shadow-lg transition-shadow">
                        {device.name === 'Desktop' && <ComputerDesktopIcon className="w-5 h-5 text-white" />}
                        {device.name === 'Mobile' && <DevicePhoneMobileIcon className="w-5 h-5 text-white" />}
                        {device.name === 'Tablet' && <GlobeAltIcon className="w-5 h-5 text-white" />}
                      </div>
                      <span className="text-sm font-bold text-gray-900">{device.name}</span>
                    </div>
                    <span className="text-lg font-bold text-gray-900">{device.value}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner">
                    <div
                      className="h-3 rounded-full transition-all duration-500 shadow-md"
                      style={{ width: `${device.value}%`, backgroundColor: device.color }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Pages - Enhanced Card */}
          <div className="bg-gradient-to-br from-white to-green-50 rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Ən Çox Baxılan Səhifələr</h2>
              <p className="text-sm text-gray-600 mt-1">Populyar məzmun</p>
            </div>
            {analytics.topPages.length === 0 ? (
              <div className="text-center py-12">
                <EyeIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">Hələ səhifə baxışı yoxdur</p>
              </div>
            ) : (
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
            )}
          </div>

          {/* Countries - Enhanced Card */}
          <div className="bg-gradient-to-br from-white to-orange-50 rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Ölkələr üzrə Statistika</h2>
              <p className="text-sm text-gray-600 mt-1">Coğrafi paylanma</p>
            </div>
            {analytics.countries.length === 0 ? (
              <div className="text-center py-12">
                <GlobeAltIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">Hələ ölkə məlumatı yoxdur</p>
                <p className="text-sm text-gray-400 mt-1">Ziyarətçilər gəldikdə IP əsasında ölkələr görünəcək</p>
              </div>
            ) : (
              <div className="space-y-4">
                {analytics.countries.map((country: any, index: number) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">{country.flag}</span>
                      <span className="font-medium text-gray-900">{country.name}</span>
                    </div>
                    <span className="text-lg font-bold text-gray-900">{country.value.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Browsers - Enhanced Card Grid */}
        <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg p-8 border border-gray-100">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Brauzer Statistikası</h2>
            <p className="text-sm text-gray-600 mt-1">İstifadəçi brauzerlərinin paylanması</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {analytics.browsers.map((browser: any, index: number) => (
              <div key={index} className="group p-6 bg-white rounded-2xl text-center hover:shadow-xl transition-all border-2 border-gray-100 hover:border-blue-300 transform hover:-translate-y-1 cursor-pointer">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-shadow">
                  <span className="text-2xl">🌐</span>
                </div>
                <p className="text-4xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">{browser.value}%</p>
                <p className="text-sm font-bold text-gray-600">{browser.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
