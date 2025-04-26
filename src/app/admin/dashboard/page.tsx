'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import type { Database } from '@/types/database.types';
import Link from 'next/link';

type AdminUser = Database['public']['Tables']['admin_users']['Row'];

export default function AdminDashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    documents: 0,
    contacts: 0,
    funds: 0,
    blogs: 0
  });

  useEffect(() => {
    checkUser();
    fetchStats();
  }, []);

  const checkUser = async () => {
    try {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError) throw sessionError;
      if (!session?.user) {
        router.push('/admin/login');
        return;
      }

      const { data: adminData, error: adminError } = await supabase
        .from('admin_users')
        .select('*')
        .eq('user_id', session.user.id)
        .single();

      if (adminError) throw adminError;
      if (!adminData) {
        router.push('/admin/login');
        return;
      }

      setUser(adminData);
    } catch (error) {
      console.error('Error checking user:', error);
      router.push('/admin/login');
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      // Belge sayısını getir
      const { count: documentsCount } = await supabase
        .from('documents')
        .select('*', { count: 'exact', head: true });

      // İletişim formu sayısını getir
      const { count: contactsCount } = await supabase
        .from('contact_forms')
        .select('*', { count: 'exact', head: true });

      setStats({
        ...stats,
        documents: documentsCount || 0,
        contacts: contactsCount || 0
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      router.push('/admin/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Hoş Geldiniz, {user?.email ? user.email.split('@')[0] : 'Yönetici'}</h1>
        <p className="text-gray-600">Bal & Fora Admin Paneli'ne hoş geldiniz. Buradan tüm site içeriğini yönetebilirsiniz.</p>
      </div>

      {/* Özet İstatistikler */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="Dökümanlar" 
          value={stats.documents} 
          icon={<DocumentIcon />}
          color="text-blue-600"
          bgColor="bg-blue-100"
          link="/admin/documents"
        />
        <StatCard 
          title="İletişim Formları" 
          value={stats.contacts} 
          icon={<ContactIcon />}
          color="text-green-600"
          bgColor="bg-green-100"
          link="/admin/contact"
        />
        <StatCard 
          title="Fonlar" 
          value={stats.funds} 
          icon={<FundIcon />}
          color="text-purple-600"
          bgColor="bg-purple-100"
          link="/admin/funds"
        />
        <StatCard 
          title="Blog Yazıları" 
          value={stats.blogs} 
          icon={<BlogIcon />}
          color="text-amber-600"
          bgColor="bg-amber-100"
          link="/admin/blog"
        />
      </div>

      {/* Hızlı Erişim / Eylemler */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Hızlı Erişim</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <ActionButton 
            title="Döküman Ekle" 
            description="Yeni rapor, bülten veya KAP dökümanı ekle"
            icon={<PlusIcon />}
            link="/admin/documents"
            color="bg-primary hover:bg-primary-dark"
          />
          <ActionButton 
            title="İletişim Formları" 
            description="Gelen iletişim formlarını görüntüle"
            icon={<MessageIcon />}
            link="/admin/contact"
            color="bg-secondary hover:bg-secondary-dark text-white"
          />
          <ActionButton 
            title="Fon Yönetimi" 
            description="Fon detaylarını ve performansını düzenle"
            icon={<ChartIcon />}
            link="/admin/funds"
            color="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
          />
          <ActionButton 
            title="Blog Yaz" 
            description="Yeni bir blog yazısı oluştur"
            icon={<EditIcon />}
            link="/admin/blog"
            color="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
          />
        </div>
      </div>

      {/* Sistem Durumu */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Sistem Durumu</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Sunucu Durumu</span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Aktif
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Veritabanı Bağlantısı</span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Çalışıyor
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Son Yedekleme</span>
              <span className="text-sm text-gray-600">
                {new Date().toLocaleDateString('tr-TR')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Yardımcı Bileşenler
interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  link: string;
}

function StatCard({ title, value, icon, color, bgColor, link }: StatCardProps) {
  return (
    <Link href={link}>
      <div className="bg-white rounded-lg shadow p-6 transition-all hover:shadow-md cursor-pointer">
        <div className="flex items-center">
          <div className={`${bgColor} p-3 rounded-full ${color}`}>
            {icon}
          </div>
          <div className="ml-4">
            <h3 className="text-sm font-medium text-gray-500">{title}</h3>
            <div className="text-2xl font-semibold">{value}</div>
          </div>
        </div>
      </div>
    </Link>
  );
}

interface ActionButtonProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
  color: string;
}

function ActionButton({ title, description, icon, link, color }: ActionButtonProps) {
  return (
    <Link href={link}>
      <div className={`rounded-lg p-4 transition-all ${color}`}>
        <div className="flex items-center">
          <div className="flex-shrink-0">
            {icon}
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium">{title}</h3>
            <p className="text-xs opacity-80">{description}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}

// İkonlar
function DocumentIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  );
}

function ContactIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}

function FundIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  );
}

function BlogIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="white">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    </svg>
  );
}

function MessageIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="white">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
    </svg>
  );
}

function EditIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    </svg>
  );
} 