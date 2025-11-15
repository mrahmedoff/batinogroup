'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { DataProvider } from '@/contexts/DataContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import AdminSidebar from '@/components/admin/AdminSidebar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <AuthProvider>
      <LanguageProvider>
        <DataProvider>
          <AdminLayoutContent>{children}</AdminLayoutContent>
        </DataProvider>
      </LanguageProvider>
    </AuthProvider>
  );
}

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user && pathname !== '/admin/login') {
      router.push('/admin/login');
    }
  }, [user, loading, router, pathname]);

  // If not logged in and not on login page, show nothing (will redirect)
  if (!user && pathname !== '/admin/login') {
    return null;
  }

  // If on login page, show login page without sidebar
  if (pathname === '/admin/login') {
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
