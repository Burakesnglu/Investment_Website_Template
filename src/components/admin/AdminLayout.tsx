'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/admin/login');
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-6">
          <Link href="/admin/dashboard">
            <h1 className="text-xl font-bold text-secondary">Bal & Fora <span className="text-primary">Admin</span></h1>
          </Link>
        </div>
        <nav className="mt-6 px-4 space-y-1">
          <NavLink href="/admin/dashboard" currentPath={pathname}>
            Dashboard
          </NavLink>
          <NavLink href="/admin/documents" currentPath={pathname}>
            Belgeler
          </NavLink>
          <NavLink href="/admin/contacts" currentPath={pathname}>
            İletişim Formları
          </NavLink>
          <NavLink href="/admin/funds" currentPath={pathname}>
            Fonlar
          </NavLink>
          <NavLink href="/admin/team" currentPath={pathname}>
            Ekip
          </NavLink>
          <NavLink href="/admin/blog" currentPath={pathname}>
            Blog
          </NavLink>
          <NavLink href="/admin/settings" currentPath={pathname}>
            Ayarlar
          </NavLink>
          
          <div className="pt-6 border-t mt-6">
            <button 
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 rounded-md text-sm text-red-600 hover:bg-red-50"
            >
              Çıkış Yap
            </button>
          </div>
        </nav>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow-sm">
          <div className="px-6 py-4 flex justify-between items-center">
            <h2 className="text-lg font-medium text-gray-800">
              {pathname === '/admin/dashboard' && 'Dashboard'}
              {pathname === '/admin/documents' && 'Belgeler'}
              {pathname === '/admin/contacts' && 'İletişim Formları'}
              {pathname === '/admin/funds' && 'Fonlar'}
              {pathname === '/admin/team' && 'Ekip'}
              {pathname === '/admin/blog' && 'Blog'}
              {pathname === '/admin/settings' && 'Ayarlar'}
            </h2>
            <div>
              {/* User profile can be added here */}
            </div>
          </div>
        </header>
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

interface NavLinkProps {
  href: string;
  currentPath: string;
  children: React.ReactNode;
}

function NavLink({ href, currentPath, children }: NavLinkProps) {
  const router = useRouter();
  const isActive = currentPath === href;

  return (
    <button
      onClick={() => router.push(href)}
      className={`w-full text-left px-4 py-2 rounded-md text-sm ${
        isActive
          ? 'bg-primary text-white'
          : 'text-gray-600 hover:bg-gray-100'
      }`}
    >
      {children}
    </button>
  );
} 