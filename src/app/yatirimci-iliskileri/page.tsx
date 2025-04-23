'use client';

import React, { useState } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import SectionContainer from '@/components/layout/SectionContainer';
import SectionTitle from '@/components/ui/SectionTitle';
import Button from '@/components/ui/Button';

// Raporlar verileri
const documents = [
  {
    id: 'doc-1',
    title: 'Finansal Rapor 2023/Q4',
    category: 'Finansal Rapor',
    date: '2024-01-15',
    size: '2.4',
    format: 'PDF',
    url: '#',
  },
  {
    id: 'doc-2',
    title: 'Finansal Rapor 2023/Q3',
    category: 'Finansal Rapor',
    date: '2023-10-15',
    size: '2.1',
    format: 'PDF',
    url: '#',
  },
  {
    id: 'doc-3',
    title: 'Finansal Rapor 2023/Q2',
    category: 'Finansal Rapor',
    date: '2023-07-15',
    size: '1.9',
    format: 'PDF',
    url: '#',
  },
  {
    id: 'doc-4',
    title: 'Finansal Rapor 2023/Q1',
    category: 'Finansal Rapor',
    date: '2023-04-15',
    size: '2.2',
    format: 'PDF',
    url: '#',
  },
  {
    id: 'doc-5',
    title: 'Faaliyet Raporu 2022',
    category: 'Faaliyet Raporu',
    date: '2023-03-30',
    size: '5.6',
    format: 'PDF',
    url: '#',
  },
  {
    id: 'doc-6',
    title: 'Aylık Bülten - Aralık 2023',
    category: 'Aylık Bülten',
    date: '2024-01-05',
    size: '1.2',
    format: 'PDF',
    url: '#',
  },
  {
    id: 'doc-7',
    title: 'Aylık Bülten - Kasım 2023',
    category: 'Aylık Bülten',
    date: '2023-12-05',
    size: '1.1',
    format: 'PDF',
    url: '#',
  },
  {
    id: 'doc-8',
    title: 'Aylık Bülten - Ekim 2023',
    category: 'Aylık Bülten',
    date: '2023-11-05',
    size: '1.3',
    format: 'PDF',
    url: '#',
  },
  {
    id: 'doc-9',
    title: 'KAP Bildirimi - Yatırımcı Sunumu',
    category: 'KAP Bildirimi',
    date: '2023-12-12',
    size: '3.7',
    format: 'PDF',
    url: '#',
  },
  {
    id: 'doc-10',
    title: 'KAP Bildirimi - Genel Kurul Toplantısı',
    category: 'KAP Bildirimi',
    date: '2023-11-20',
    size: '0.8',
    format: 'PDF',
    url: '#',
  },
  {
    id: 'doc-11',
    title: 'Yatırımcı Sunumu 2023/Q4',
    category: 'Yatırımcı Sunumu',
    date: '2024-01-20',
    size: '4.2',
    format: 'PDF',
    url: '#',
  },
  {
    id: 'doc-12',
    title: 'Yatırımcı Sunumu 2023/Q3',
    category: 'Yatırımcı Sunumu',
    date: '2023-10-20',
    size: '3.8',
    format: 'PDF',
    url: '#',
  },
];

// Kategori filtreleme için
const categories = ['Tümü', 'Finansal Rapor', 'Faaliyet Raporu', 'Aylık Bülten', 'KAP Bildirimi', 'Yatırımcı Sunumu'];

// Yıl filtreleme için
const years = ['Tümü', '2024', '2023', '2022', '2021', '2020'];

export default function InvestorRelationsPage() {
  const [selectedCategory, setSelectedCategory] = useState('Tümü');
  const [selectedYear, setSelectedYear] = useState('Tümü');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Dökümanları filtrele
  const filteredDocuments = documents.filter(doc => {
    const categoryMatch = selectedCategory === 'Tümü' || doc.category === selectedCategory;
    const yearMatch = selectedYear === 'Tümü' || doc.date.includes(selectedYear);
    const searchMatch = searchQuery === '' || 
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      doc.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    return categoryMatch && yearMatch && searchMatch;
  });
  
  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="relative bg-hero-gradient text-text-light py-24">
        <div className="absolute inset-0 bg-gradient-to-r from-background-dark/90 to-background-dark/70 z-0"></div>
        <div className="container mx-auto px-4 md:px-8 z-10 relative">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Yatırımcı İlişkileri</h1>
            <p className="text-xl text-gray-300">
              Finansal raporlar, bültenler ve yatırımcılara özel sunumlarımız
            </p>
          </div>
        </div>
      </section>
      
      {/* Döküman Arşivi Section */}
      <SectionContainer background="light">
        <SectionTitle 
          title="Döküman Arşivi"
          subtitle="Finansal raporlar, bültenler ve diğer önemli belgelerimize buradan ulaşabilirsiniz"
        />
        
        {/* Filtreler ve Arama */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Kategori Filtresi */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Kategori
            </label>
            <select
              id="category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          
          {/* Yıl Filtresi */}
          <div>
            <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-1">
              Yıl
            </label>
            <select
              id="year"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            >
              {years.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
          
          {/* Arama */}
          <div>
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
              Arama
            </label>
            <div className="relative">
              <input
                type="text"
                id="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Döküman adı veya kategori..."
                className="w-full rounded-md border border-gray-300 py-2 px-3 pl-10 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        
        {/* Döküman Tablosu */}
        <div className="bg-white rounded-lg shadow-soft overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Döküman Adı
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Kategori
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tarih
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Boyut
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">İndir</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredDocuments.length > 0 ? (
                  filteredDocuments.map((doc) => (
                    <tr key={doc.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-8 w-8 bg-accent-gray rounded-md flex items-center justify-center text-accent-blue">
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{doc.title}</div>
                            <div className="text-sm text-gray-500">{doc.format}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-accent-gray text-gray-800">
                          {doc.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(doc.date).toLocaleDateString('tr-TR', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {doc.size} MB
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <a href={doc.url} className="text-primary hover:text-primary-dark transition-colors">
                          <span className="inline-flex items-center">
                            <span>İndir</span>
                            <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                          </span>
                        </a>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-16 text-center text-sm text-gray-500">
                      <p className="mb-4">Belirtilen kriterlere uygun döküman bulunamadı.</p>
                      <Button
                        onClick={() => {
                          setSelectedCategory('Tümü');
                          setSelectedYear('Tümü');
                          setSearchQuery('');
                        }}
                        variant="primary"
                        size="sm"
                      >
                        Tüm Dökümanları Göster
                      </Button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </SectionContainer>
      
      {/* Finansal Takvim */}
      <SectionContainer background="gray">
        <SectionTitle 
          title="Finansal Takvim"
          subtitle="Önemli tarihler ve etkinlikler"
        />
        
        <div className="bg-white rounded-lg shadow-soft p-6">
          <div className="grid gap-8 divide-y divide-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 pt-6 first:pt-0">
              <div className="md:col-span-1">
                <div className="text-lg font-semibold text-gray-900">27 Şubat 2024</div>
                <div className="text-sm text-primary-dark">10:00</div>
              </div>
              <div className="md:col-span-4">
                <h3 className="text-lg font-medium text-gray-900">4. Çeyrek Finansal Sonuçları Yayını</h3>
                <p className="mt-2 text-gray-600">
                  2023 yılı 4. çeyrek finansal sonuçlarımız yayınlanacaktır.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 pt-6">
              <div className="md:col-span-1">
                <div className="text-lg font-semibold text-gray-900">15 Mart 2024</div>
                <div className="text-sm text-primary-dark">14:00</div>
              </div>
              <div className="md:col-span-4">
                <h3 className="text-lg font-medium text-gray-900">Yatırımcı Bilgilendirme Toplantısı</h3>
                <p className="mt-2 text-gray-600">
                  2023 yılı finansal sonuçları ve 2024 hedefleri için yatırımcı bilgilendirme toplantısı gerçekleştirilecektir.
                </p>
                <div className="mt-4">
                  <Button variant="secondary" size="sm">
                    <span className="flex items-center">
                      <svg className="mr-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Takvime Ekle
                    </span>
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 pt-6">
              <div className="md:col-span-1">
                <div className="text-lg font-semibold text-gray-900">10 Nisan 2024</div>
                <div className="text-sm text-primary-dark">11:00</div>
              </div>
              <div className="md:col-span-4">
                <h3 className="text-lg font-medium text-gray-900">Yıllık Olağan Genel Kurul Toplantısı</h3>
                <p className="mt-2 text-gray-600">
                  2023 yılı faaliyetlerinin değerlendirileceği ve 2024 yılı planlarının görüşüleceği Yıllık Olağan Genel Kurul Toplantımız İstanbul merkez ofisimizde yapılacaktır.
                </p>
                <div className="mt-4">
                  <Button variant="secondary" size="sm">
                    <span className="flex items-center">
                      <svg className="mr-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Takvime Ekle
                    </span>
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 pt-6">
              <div className="md:col-span-1">
                <div className="text-lg font-semibold text-gray-900">15 Mayıs 2024</div>
                <div className="text-sm text-primary-dark">09:00</div>
              </div>
              <div className="md:col-span-4">
                <h3 className="text-lg font-medium text-gray-900">1. Çeyrek Finansal Sonuçları Yayını</h3>
                <p className="mt-2 text-gray-600">
                  2024 yılı 1. çeyrek finansal sonuçlarımız yayınlanacaktır.
                </p>
              </div>
            </div>
          </div>
        </div>
      </SectionContainer>
      
      {/* Sıkça Sorulan Sorular */}
      <SectionContainer background="light">
        <SectionTitle 
          title="Yatırımcı İlişkileri SSS"
          subtitle="Sıkça sorulan sorular ve cevapları"
        />
        
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="bg-white rounded-lg shadow-soft overflow-hidden">
            <button className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none">
              <h3 className="text-lg font-medium text-gray-900">Kar payı dağıtım politikanız nedir?</h3>
              <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className="px-6 pb-4">
              <p className="text-gray-600">
                Kar payı dağıtım politikamız, şirketimizin uzun vadeli büyüme hedefleri doğrultusunda, yeni yatırımlar ve fon ihtiyaçları göz önünde bulundurularak oluşturulmuştur. Genel kural olarak, dağıtılabilir net karın en az %20'sinin nakit ve/veya bedelsiz pay olarak dağıtılması hedeflenmektedir. Ancak bu oran, ekonomik koşullar, yatırım planları ve nakit durumu gibi faktörlere bağlı olarak Yönetim Kurulu tarafından her yıl yeniden değerlendirilir.
              </p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-soft overflow-hidden">
            <button className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none">
              <h3 className="text-lg font-medium text-gray-900">Yatırımcı ilişkileri birimine nasıl ulaşabilirim?</h3>
              <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className="px-6 pb-4">
              <p className="text-gray-600">
                Yatırımcı İlişkileri birimimize <a href="mailto:yatirimci@balfora.com.tr" className="text-primary hover:underline">yatirimci@balfora.com.tr</a> e-posta adresi üzerinden veya +90 (212) 555 XX XX telefon numarasından ulaşabilirsiniz. Sorularınız ve talepleriniz için en kısa sürede dönüş yapılacaktır.
              </p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-soft overflow-hidden">
            <button className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none">
              <h3 className="text-lg font-medium text-gray-900">Hisse performansınızı nasıl takip edebilirim?</h3>
              <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className="px-6 pb-4">
              <p className="text-gray-600">
                Şirketimizin hisse performansını Borsa İstanbul (BİST) web sitesi üzerinden "BLFR" koduyla takip edebilirsiniz. Ayrıca, web sitemizin Yatırımcı İlişkileri bölümünde de güncel hisse bilgilerine ve performans grafiklerine ulaşabilirsiniz.
              </p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-soft overflow-hidden">
            <button className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none">
              <h3 className="text-lg font-medium text-gray-900">Kurumsal yönetim politikanız nedir?</h3>
              <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className="px-6 pb-4">
              <p className="text-gray-600">
                Kurumsal yönetim politikamız; şeffaflık, adillik, sorumluluk ve hesap verebilirlik ilkeleri üzerine kurulmuştur. Şirketimiz, tüm faaliyetlerinde bu ilkeleri gözetmekte ve SPK Kurumsal Yönetim İlkeleri'ne uyum sağlamak için sürekli çalışmaktadır. Kurumsal Yönetim Komitemiz, bu ilkelerin uygulanmasını gözetmekte ve iyileştirme alanlarını belirlemektedir.
              </p>
            </div>
          </div>
        </div>
      </SectionContainer>
      
      {/* E-Bülten Aboneliği */}
      <SectionContainer background="primary" className="text-text-dark">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Yatırımcı Bültenimize Abone Olun</h2>
          <p className="text-lg mb-8">
            Finansal raporlar, şirket haberleri ve yatırımcı etkinlikleri hakkında düzenli bilgi almak için e-bültenimize abone olun.
          </p>
          
          <div className="sm:flex sm:gap-4 max-w-xl mx-auto">
            <div className="sm:flex-1">
              <input
                type="email"
                placeholder="E-posta adresiniz"
                className="w-full rounded-md border-gray-300 py-3 px-4 shadow-sm focus:border-secondary focus:ring-secondary"
              />
            </div>
            <Button variant="secondary" className="mt-4 sm:mt-0">
              Abone Ol
            </Button>
          </div>
          
          <p className="mt-4 text-sm">
            Verileriniz gizlilik politikamıza uygun olarak korunacaktır. İstediğiniz zaman abonelikten çıkabilirsiniz.
          </p>
        </div>
      </SectionContainer>
    </PageLayout>
  );
} 