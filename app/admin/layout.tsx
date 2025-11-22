'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import AdminSidebar from '@/components/admin/AdminSidebar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminLayoutContent>{children}</AdminLayoutContent>;
}

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const loginPath = '/admin/login';

  useEffect(() => {
    if (!loading) {
      if (!user && !pathname?.endsWith('/login')) {
        router.push(loginPath);
      } else if (user && pathname?.endsWith('/login')) {
        router.push('/admin');
      }
    }
  }, [user, loading, router, pathname]);

  // If not logged in and not on login page, show nothing (will redirect)
  if (!user && !pathname?.endsWith('/login')) {
    return null;
  }

  // If on login page, show login page without sidebar
  if (pathname?.endsWith('/login')) {
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
