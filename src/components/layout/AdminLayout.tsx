import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { IconDashboard, IconFolders, IconDocuments, IconBlog, IconTeam, IconSettings, IconMessages, IconLogout } from '@/components/icons';

const menuItems = [
  { href: '/admin', icon: IconDashboard, label: 'Dashboard' },
  { href: '/admin/funds', icon: IconFolders, label: 'Fonlar' },
  { href: '/admin/documents', icon: IconDocuments, label: 'Belgeler' },
  { href: '/admin/blog', icon: IconBlog, label: 'Blog' },
  { href: '/admin/team', icon: IconTeam, label: 'Ekip' },
  { href: '/admin/messages', icon: IconMessages, label: 'Mesajlar' },
  { href: '/admin/settings', icon: IconSettings, label: 'Ayarlar' },
];

type AdminLayoutProps = {
  children: React.ReactNode;
};

export default function AdminLayout({ children }: AdminLayoutProps) {
  const { isAuthenticated, isAdminUser, isLoading, signOut } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || !isAdminUser)) {
      router.push('/admin/login');
    }
  }, [isLoading, isAuthenticated, isAdminUser, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!isAuthenticated || !isAdminUser) {
    return null;
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
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center px-6 py-3 text-sm ${
                      isActive
                        ? 'bg-primary text-secondary font-medium'
                        : 'text-gray-300 hover:bg-secondary-dark hover:text-white'
                    }`}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="absolute bottom-0 w-64 p-4">
          <button
            onClick={() => {
              signOut();
              router.push('/admin/login');
            }}
            className="flex items-center w-full px-6 py-3 text-sm text-gray-300 hover:bg-secondary-dark hover:text-white"
          >
            <IconLogout className="w-5 h-5 mr-3" />
            Çıkış Yap
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
} 