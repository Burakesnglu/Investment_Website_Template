'use client';

import { usePathname, useRouter } from 'next/navigation';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function RootAdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  
  // Don't show navigation on login page
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-secondary text-white">
        <div className="p-4">
          <h1 className="text-xl font-bold text-primary">Bal & Fora Admin</h1>
        </div>
        <nav className="mt-8">
          <ul>
            <li>
              <a href="/admin/dashboard" className="flex items-center px-6 py-3 text-sm text-gray-300 hover:bg-secondary-dark hover:text-white">
                Dashboard
              </a>
            </li>
            <li>
              <a href="/admin/contact" className="flex items-center px-6 py-3 text-sm text-gray-300 hover:bg-secondary-dark hover:text-white">
                İletişim Formları
              </a>
            </li>
            <li>
              <a href="/admin/documents" className="flex items-center px-6 py-3 text-sm text-gray-300 hover:bg-secondary-dark hover:text-white">
                Belgeler
              </a>
            </li>
            <li>
              <a href="/admin/blog" className="flex items-center px-6 py-3 text-sm text-gray-300 hover:bg-secondary-dark hover:text-white">
                Blog
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
} 