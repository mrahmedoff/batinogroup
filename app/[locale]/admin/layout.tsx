'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import AdminSidebar from '@/components/admin/AdminSidebar';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <LoadingSpinner />;
  }

  return <AdminLayoutContent>{children}</AdminLayoutContent>;
}

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user) {
      // Extract locale from pathname
      const pathSegments = pathname.split('/');
      const locale = pathSegments[1] || 'az'; // Default to 'az' if no locale
      const loginPath = `/${locale}/admin/login`;
      
      if (pathname !== loginPath) {
        router.push(loginPath);
      }
    }
  }, [user, loading, router, pathname]);

  // Show loading while checking auth
  if (loading) {
    return <LoadingSpinner />;
  }

  // Extract locale from pathname for proper path checking
  const pathSegments = pathname.split('/');
  const locale = pathSegments[1] || 'az';
  const loginPath = `/${locale}/admin/login`;

  // If not logged in and not on login page, show nothing (will redirect)
  if (!user && pathname !== loginPath) {
    return null;
  }

  // If on login page, show login page without sidebar
  if (pathname === loginPath) {
    return <>{children}</>;
  }

  // If logged in, show admin layout with sidebar
  return (
    <div className="flex h-screen bg-white overflow-hidden">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto bg-slate-50 w-full">
        {children}
      </main>
    </div>
  );
}
