'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, Settings, FolderKanban, Users, Image, Mail, Sliders, Home,
  Newspaper, Handshake, Award, Briefcase, ChevronDown, ChevronRight, LogOut, User, Menu, X
} from 'lucide-react';
import { useState } from 'react';
import { useData } from '@/contexts/DataContext';
import { useAuth } from '@/contexts/AuthContext';

interface MenuItem {
  label: string;
  href?: string;
  icon: any;
  badge?: number;
  submenu?: { label: string; href: string }[];
}

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { messages } = useData();
  const { user, logout } = useAuth();
  const [expandedMenus, setExpandedMenus] = useState<string[]>(['content']);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const unreadCount = messages.filter(m => !m.read).length;

  const handleLogout = async () => {
    if (confirm('Çıxış etmək istədiyinizdən əminsiniz?')) {
      setIsLoggingOut(true);
      try {
        await logout();
        router.push('/admin/login');
      } catch (error) {
        console.error('Logout error:', error);
        setIsLoggingOut(false);
      }
    }
  };

  const toggleMenu = (label: string) => {
    setExpandedMenus(prev => 
      prev.includes(label) 
        ? prev.filter(item => item !== label)
        : [...prev, label]
    );
  };

  const menuSections = [
    {
      title: 'ƏSAS',
      items: [
        { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
      ]
    },
    {
      title: 'MƏZMUN İDARƏSİ',
      items: [
        { label: 'Xidmətlər', href: '/admin/services', icon: Settings },
        { label: 'Layihələr', href: '/admin/projects', icon: FolderKanban },
        { label: 'Xəbərlər', href: '/admin/news', icon: Newspaper },
        { label: 'Media', href: '/admin/media', icon: Image },
      ]
    },
    {
      title: 'ŞİRKƏT',
      items: [
        { label: 'Komanda', href: '/admin/team', icon: Users },
        { label: 'Tərəfdaşlar', href: '/admin/partners', icon: Handshake },
        { label: 'Sertifikatlar', href: '/admin/certificates', icon: Award },
        { label: 'Vakansiyalar', href: '/admin/careers', icon: Briefcase },
      ]
    },
    {
      title: 'SİSTEM',
      items: [
        { label: 'Mesajlar', href: '/admin/messages', icon: Mail, badge: unreadCount },
        { label: 'Parametrlər', href: '/admin/settings', icon: Sliders },
      ]
    }
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 w-10 h-10 bg-white border border-slate-200 rounded-lg flex items-center justify-center shadow-lg hover:bg-slate-50 transition-colors"
      >
        {isMobileMenuOpen ? (
          <X className="w-5 h-5 text-slate-900" strokeWidth={2} />
        ) : (
          <Menu className="w-5 h-5 text-slate-900" strokeWidth={2} />
        )}
      </button>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-40
        w-64 bg-white border-r border-slate-200 flex flex-col
        transform transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Logo */}
        <div className="p-6 border-b border-slate-200">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">B</span>
            </div>
            <div>
              <span className="text-lg font-bold text-slate-900 block">BatinoGroup</span>
              <span className="text-xs text-slate-500">Admin Panel</span>
            </div>
          </Link>
        </div>

      {/* Menu Sections */}
      <div className="flex-1 py-4 overflow-y-auto">
        {menuSections.map((section, sectionIdx) => (
          <div key={section.title} className={sectionIdx > 0 ? 'mt-6' : ''}>
            <div className="px-6 mb-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                {section.title}
              </span>
            </div>
            <nav className="px-3 space-y-1">
              {section.items.map((item) => {
                const isActive = pathname === item.href;
                const IconComponent = item.icon;
                const hasSubmenu = 'submenu' in item && Array.isArray(item.submenu) && item.submenu.length > 0;
                const isExpanded = expandedMenus.includes(item.label);

                if (hasSubmenu && 'submenu' in item && Array.isArray(item.submenu)) {
                  return (
                    <div key={item.label}>
                      <button
                        onClick={() => toggleMenu(item.label)}
                        className={`w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                          isExpanded
                            ? 'bg-slate-50 text-slate-900'
                            : 'text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <IconComponent className="w-5 h-5" strokeWidth={2} />
                          <span className="text-sm font-medium">{item.label}</span>
                        </div>
                        {isExpanded ? (
                          <ChevronDown className="w-4 h-4" strokeWidth={2} />
                        ) : (
                          <ChevronRight className="w-4 h-4" strokeWidth={2} />
                        )}
                      </button>
                      {isExpanded && (
                        <div className="ml-8 mt-1 space-y-1">
                          {item.submenu.map((subitem) => {
                            const isSubActive = pathname === subitem.href;
                            return (
                              <Link
                                key={subitem.href}
                                href={subitem.href}
                                className={`block px-3 py-2 text-sm rounded-lg transition-colors ${
                                  isSubActive
                                    ? 'text-blue-600 bg-blue-50 font-medium'
                                    : 'text-slate-600 hover:bg-slate-50'
                                }`}
                              >
                                {subitem.label}
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.href}
                    href={item.href!}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <IconComponent className="w-5 h-5" strokeWidth={2} />
                      <span className="text-sm font-medium">{item.label}</span>
                    </div>
                    {item.badge !== undefined && item.badge > 0 && (
                      <span className="px-2 py-0.5 text-xs font-semibold text-white bg-red-500 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>
        ))}
      </div>

      {/* Bottom Section */}
      <div className="p-4 border-t border-slate-200 space-y-2">
        {/* User Info */}
        {user && (
          <div className="px-3 py-2 bg-slate-50 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-slate-900 truncate">
                  {user.email}
                </p>
                <p className="text-xs text-slate-500">Admin</p>
              </div>
            </div>
          </div>
        )}

        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2.5 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
        >
          <Home className="w-5 h-5" strokeWidth={2} />
          <span className="text-sm font-medium">Sayta qayıt</span>
        </Link>

        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="w-full flex items-center gap-3 px-3 py-2.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
        >
          <LogOut className="w-5 h-5" strokeWidth={2} />
          <span className="text-sm font-medium">
            {isLoggingOut ? 'Çıxış edilir...' : 'Çıxış'}
          </span>
        </button>
      </div>
      </aside>
    </>
  );
}
