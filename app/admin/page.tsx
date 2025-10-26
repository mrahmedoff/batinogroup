'use client';

import Link from 'next/link';
import { useData } from '@/contexts/DataContext';
import { Settings, FolderKanban, Users, Mail, TrendingUp, TrendingDown, MoreVertical } from 'lucide-react';

export default function AdminDashboard() {
  const { services, projects, team, messages } = useData();

  const stats = [
    { 
      title: 'Xidmətlər', 
      count: services.length, 
      change: '+11.01%',
      isPositive: true,
      icon: Settings,
      href: '/admin/services'
    },
    { 
      title: 'Layihələr', 
      count: projects.length, 
      change: '+15.03%',
      isPositive: true,
      icon: FolderKanban,
      href: '/admin/projects'
    },
    { 
      title: 'Komanda', 
      count: team.length, 
      change: '+8.05%',
      isPositive: true,
      icon: Users,
      href: '/admin/team'
    },
    { 
      title: 'Mesajlar', 
      count: messages.filter(m => !m.read).length, 
      change: '+6.08%',
      isPositive: true,
      icon: Mail,
      href: '/admin/messages'
    },
  ];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-sm text-slate-500 mt-1">Xoş gəlmisiniz! Sistemə ümumi baxış</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const IconComponent = stat.icon;
          const TrendIcon = stat.isPositive ? TrendingUp : TrendingDown;
          return (
            <Link
              key={stat.title}
              href={stat.href}
              className="bg-white rounded-xl p-6 border border-slate-200 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                  <IconComponent className="w-6 h-6 text-blue-600" strokeWidth={2} />
                </div>
                <div className={`flex items-center gap-1 text-xs font-semibold ${stat.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                  <TrendIcon className="w-4 h-4" strokeWidth={2} />
                  {stat.change}
                </div>
              </div>
              <div className="text-sm text-slate-500 font-medium mb-1">{stat.title}</div>
              <div className="text-3xl font-bold text-slate-900">{stat.count}</div>
            </Link>
          );
        })}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Monthly Sales Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6 border border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-slate-900">Aylıq Satışlar</h2>
            <button className="text-slate-400 hover:text-slate-600">
              <MoreVertical className="w-5 h-5" strokeWidth={2} />
            </button>
          </div>
          
          {/* Simple Bar Chart */}
          <div className="flex items-end justify-between h-48 gap-2">
            {['Yan', 'Fev', 'Mar', 'Apr', 'May', 'İyn', 'İyl', 'Avq', 'Sen', 'Okt', 'Noy', 'Dek'].map((month, i) => {
              const heights = [60, 85, 75, 90, 80, 85, 95, 70, 80, 90, 75, 65];
              return (
                <div key={month} className="flex-1 flex flex-col items-center gap-2">
                  <div 
                    className="w-full bg-blue-600 rounded-t hover:bg-blue-700 transition-colors cursor-pointer"
                    style={{ height: `${heights[i]}%` }}
                  ></div>
                  <span className="text-xs text-slate-500">{month}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Monthly Target */}
        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Aylıq Hədəf</h2>
              <p className="text-xs text-slate-500 mt-1">Aylıq məqsədiniz</p>
            </div>
            <button className="text-slate-400 hover:text-slate-600">
              <MoreVertical className="w-5 h-5" strokeWidth={2} />
            </button>
          </div>

          {/* Circular Progress */}
          <div className="flex items-center justify-center mb-6">
            <div className="relative w-48 h-48">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  stroke="#e2e8f0"
                  strokeWidth="12"
                  fill="none"
                />
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  stroke="#3b82f6"
                  strokeWidth="12"
                  fill="none"
                  strokeDasharray="552.92"
                  strokeDashoffset="138.23"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-4xl font-bold text-slate-900">75.55%</div>
                <div className="text-sm text-green-600 font-semibold flex items-center gap-1 mt-1">
                  <TrendingUp className="w-4 h-4" strokeWidth={2} />
                  +10%
                </div>
              </div>
            </div>
          </div>

          <p className="text-center text-sm text-slate-600">
            Bu gün <span className="font-bold text-blue-600">$3287</span> qazandınız
          </p>

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-slate-200">
            <div className="text-center">
              <div className="text-xs text-slate-500 mb-1">Hədəf</div>
              <div className="text-sm font-bold text-slate-900">$20K</div>
            </div>
            <div className="text-center">
              <div className="text-xs text-slate-500 mb-1">Gəlir</div>
              <div className="text-sm font-bold text-green-600">$20K</div>
            </div>
            <div className="text-center">
              <div className="text-xs text-slate-500 mb-1">Bu gün</div>
              <div className="text-sm font-bold text-blue-600">$3.2K</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
