'use client';

import React, { useState } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import SectionContainer from '@/components/layout/SectionContainer';
import SectionTitle from '@/components/ui/SectionTitle';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

// Fonlar verileri
const funds = [
  {
    id: 1,
    name: 'BAL & FORA Hisse Senedi Fonu',
    shortName: 'Hisse Senedi Fonu',
    description: 'BIST 100 Endeksinin üzerinde getiri sağlamayı hedefleyen, ağırlıklı olarak hisse senetlerine yatırım yapan fon.',
    category: 'Hisse Senedi',
    risk: 'Yüksek',
    performance: [
      { date: '2023-01', value: 100 },
      { date: '2023-02', value: 103 },
      { date: '2023-03', value: 105 },
      { date: '2023-04', value: 110 },
      { date: '2023-05', value: 108 },
      { date: '2023-06', value: 115 },
    ],
    benchmarkPerformance: [
      { date: '2023-01', value: 100 },
      { date: '2023-02', value: 102 },
      { date: '2023-03', value: 101 },
      { date: '2023-04', value: 104 },
      { date: '2023-05', value: 103 },
      { date: '2023-06', value: 106 },
    ],
    managers: ['Ahmet Yılmaz', 'Mehmet Demir'],
    fees: { management: 1.5, entry: 0, exit: 0 },
    minInvestment: 5000,
    assets: 1250000000,
    currency: 'TRY',
    inceptionDate: '2016-03-15',
  },
  {
    id: 2,
    name: 'BAL & FORA Borçlanma Araçları Fonu',
    shortName: 'Borçlanma Araçları Fonu',
    description: 'Kamu ve özel sektör borçlanma araçlarına yatırım yaparak istikrarlı getiri hedefleyen fon.',
    category: 'Borçlanma Araçları',
    risk: 'Orta',
    performance: [
      { date: '2023-01', value: 100 },
      { date: '2023-02', value: 102 },
      { date: '2023-03', value: 103 },
      { date: '2023-04', value: 105 },
      { date: '2023-05', value: 107 },
      { date: '2023-06', value: 109 },
    ],
    benchmarkPerformance: [
      { date: '2023-01', value: 100 },
      { date: '2023-02', value: 101 },
      { date: '2023-03', value: 102 },
      { date: '2023-04', value: 103 },
      { date: '2023-05', value: 105 },
      { date: '2023-06', value: 106 },
    ],
    managers: ['Zeynep Kaya'],
    fees: { management: 1.2, entry: 0, exit: 0 },
    minInvestment: 1000,
    assets: 950000000,
    currency: 'TRY',
    inceptionDate: '2015-07-22',
  },
  {
    id: 3,
    name: 'BAL & FORA Para Piyasası Fonu',
    shortName: 'Para Piyasası Fonu',
    description: 'Kısa vadeli para ve sermaye piyasası araçlarına yatırım yaparak istikrarlı ve düşük riskli getiri hedefleyen fon.',
    category: 'Para Piyasası',
    risk: 'Düşük',
    performance: [
      { date: '2023-01', value: 100 },
      { date: '2023-02', value: 101 },
      { date: '2023-03', value: 102 },
      { date: '2023-04', value: 103 },
      { date: '2023-05', value: 104 },
      { date: '2023-06', value: 105 },
    ],
    benchmarkPerformance: [
      { date: '2023-01', value: 100 },
      { date: '2023-02', value: 100.5 },
      { date: '2023-03', value: 101 },
      { date: '2023-04', value: 101.5 },
      { date: '2023-05', value: 102 },
      { date: '2023-06', value: 102.5 },
    ],
    managers: ['Ayşe Yıldız'],
    fees: { management: 0.8, entry: 0, exit: 0 },
    minInvestment: 1000,
    assets: 2100000000,
    currency: 'TRY',
    inceptionDate: '2015-05-10',
  },
  {
    id: 4,
    name: 'BAL & FORA Karma Fon',
    shortName: 'Karma Fon',
    description: 'Hisse senedi, borçlanma araçları ve diğer yatırım araçlarına dengeli bir şekilde yatırım yaparak orta-uzun vadede getiri hedefleyen fon.',
    category: 'Karma',
    risk: 'Orta',
    performance: [
      { date: '2023-01', value: 100 },
      { date: '2023-02', value: 102 },
      { date: '2023-03', value: 104 },
      { date: '2023-04', value: 106 },
      { date: '2023-05', value: 107 },
      { date: '2023-06', value: 110 },
    ],
    benchmarkPerformance: [
      { date: '2023-01', value: 100 },
      { date: '2023-02', value: 101 },
      { date: '2023-03', value: 103 },
      { date: '2023-04', value: 104 },
      { date: '2023-05', value: 105 },
      { date: '2023-06', value: 107 },
    ],
    managers: ['Ahmet Yılmaz', 'Zeynep Kaya'],
    fees: { management: 1.3, entry: 0, exit: 0 },
    minInvestment: 3000,
    assets: 750000000,
    currency: 'TRY',
    inceptionDate: '2016-11-08',
  },
];

// Kategori filtreleme için
const categories = ['Tümü', 'Hisse Senedi', 'Borçlanma Araçları', 'Para Piyasası', 'Karma'];

// Risk seviyesi filtreleme için
const riskLevels = ['Tümü', 'Düşük', 'Orta', 'Yüksek'];

export default function FundsPage() {
  const [selectedCategory, setSelectedCategory] = useState('Tümü');
  const [selectedRisk, setSelectedRisk] = useState('Tümü');
  
  // Kategori ve risk seviyesine göre filtreleme
  const filteredFunds = funds.filter(fund => {
    const categoryMatch = selectedCategory === 'Tümü' || fund.category === selectedCategory;
    const riskMatch = selectedRisk === 'Tümü' || fund.risk === selectedRisk;
    return categoryMatch && riskMatch;
  });
  
  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="relative bg-hero-gradient text-text-light py-24">
        <div className="absolute inset-0 bg-gradient-to-r from-background-dark/90 to-background-dark/70 z-0"></div>
        <div className="container mx-auto px-4 md:px-8 z-10 relative">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Yatırım Fonlarımız</h1>
            <p className="text-xl text-gray-300">
              Hedeflerinize uygun yatırım fonu çözümlerimiz ile birikimlerinizi değerlendirin.
            </p>
          </div>
        </div>
      </section>
      
      {/* Filtreler Section */}
      <SectionContainer background="light" className="pb-6">
        <div className="flex flex-wrap gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Kategori</label>
            <div className="inline-flex rounded-md shadow-sm">
              {categories.map((category, index) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`
                    px-4 py-2 text-sm font-medium
                    ${index === 0 ? 'rounded-l-md' : ''}
                    ${index === categories.length - 1 ? 'rounded-r-md' : ''}
                    ${selectedCategory === category 
                      ? 'bg-primary text-text-dark' 
                      : 'bg-white text-gray-700 hover:bg-accent-gray'}
                    border ${index > 0 ? 'border-l-0' : ''} border-gray-300
                  `}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Risk Seviyesi</label>
            <div className="inline-flex rounded-md shadow-sm">
              {riskLevels.map((risk, index) => (
                <button
                  key={risk}
                  onClick={() => setSelectedRisk(risk)}
                  className={`
                    px-4 py-2 text-sm font-medium
                    ${index === 0 ? 'rounded-l-md' : ''}
                    ${index === riskLevels.length - 1 ? 'rounded-r-md' : ''}
                    ${selectedRisk === risk 
                      ? 'bg-primary text-text-dark' 
                      : 'bg-white text-gray-700 hover:bg-accent-gray'}
                    border ${index > 0 ? 'border-l-0' : ''} border-gray-300
                  `}
                >
                  {risk}
                </button>
              ))}
            </div>
          </div>
        </div>
      </SectionContainer>
      
      {/* Fonlar Section */}
      <SectionContainer background="light">
        {filteredFunds.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredFunds.map((fund) => (
              <Card
                key={fund.id}
                title={fund.name}
                description={fund.description}
                variant="fund"
                href={`/fonlarimiz/${fund.id}`}
                stats={[
                  { label: 'Risk', value: fund.risk },
                  { label: 'Yönetim Ücreti', value: `%${fund.fees.management}` },
                  { label: 'Asgari Yatırım', value: `${fund.minInvestment.toLocaleString()} TL` },
                  { label: 'Toplam Varlık', value: `${(fund.assets / 1000000000).toFixed(1)} Milyar TL` },
                ]}
              >
                <div className="mt-4 bg-accent-gray h-24 rounded-md flex items-center justify-center">
                  <span className="text-sm text-gray-500">Performans Grafiği Gösterimi</span>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-500 mb-4">Seçilen kriterlere uygun fon bulunamadı.</p>
            <Button 
              onClick={() => {
                setSelectedCategory('Tümü');
                setSelectedRisk('Tümü');
              }}
              variant="primary"
            >
              Tüm Fonları Göster
            </Button>
          </div>
        )}
      </SectionContainer>
      
      {/* Performans Karşılaştırma Section */}
      <SectionContainer id="karsilastirma" background="gray">
        <SectionTitle 
          title="Fon Karşılaştırma Aracı"
          subtitle="Fonlarımızın performansını karşılaştırarak ihtiyacınıza en uygun fonu seçin"
        />
        
        <div className="bg-white rounded-lg shadow-soft p-8">
          <div className="text-center py-20">
            <p className="text-gray-500 mb-4">
              Fonları karşılaştırmak için gelişmiş grafikler ve analiz araçları burada yer alacak.
            </p>
            <p className="text-gray-500">
              (Bu bölüm, gerçek uygulamada ApexCharts veya Recharts gibi grafikler kullanılarak geliştirilecektir.)
            </p>
          </div>
        </div>
      </SectionContainer>
      
      {/* Yatırımcı Profili Testi */}
      <SectionContainer id="yatirimci-profili" background="light">
        <SectionTitle 
          title="Yatırımcı Profili Testi"
          subtitle="Risk toleransınızı ve yatırım hedeflerinizi belirleyerek size en uygun fonları keşfedin"
        />
        
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-soft p-8">
          <div className="space-y-6">
            <p className="text-gray-600 mb-6">
              Aşağıdaki soruları yanıtlayarak risk toleransınızı ve yatırım hedeflerinizi belirleyin. Bu test sonucunda size en uygun yatırım fonlarını önerebiliriz.
            </p>
            
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-medium mb-4">1. Yatırım hedefiniz nedir?</h3>
              <div className="space-y-3">
                <div>
                  <label className="flex items-center">
                    <input type="radio" name="goal" className="h-4 w-4 text-primary" />
                    <span className="ml-2">Sermayemi korumak ve düşük riskle getiri sağlamak</span>
                  </label>
                </div>
                <div>
                  <label className="flex items-center">
                    <input type="radio" name="goal" className="h-4 w-4 text-primary" />
                    <span className="ml-2">Orta vadede dengeli bir büyüme sağlamak</span>
                  </label>
                </div>
                <div>
                  <label className="flex items-center">
                    <input type="radio" name="goal" className="h-4 w-4 text-primary" />
                    <span className="ml-2">Uzun vadede yüksek getiri elde etmek, dalgalanmalar önemli değil</span>
                  </label>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-medium mb-4">2. Yatırım vadeniz ne kadar?</h3>
              <div className="space-y-3">
                <div>
                  <label className="flex items-center">
                    <input type="radio" name="horizon" className="h-4 w-4 text-primary" />
                    <span className="ml-2">Kısa vade (0-1 yıl)</span>
                  </label>
                </div>
                <div>
                  <label className="flex items-center">
                    <input type="radio" name="horizon" className="h-4 w-4 text-primary" />
                    <span className="ml-2">Orta vade (1-3 yıl)</span>
                  </label>
                </div>
                <div>
                  <label className="flex items-center">
                    <input type="radio" name="horizon" className="h-4 w-4 text-primary" />
                    <span className="ml-2">Uzun vade (3+ yıl)</span>
                  </label>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-medium mb-4">3. Yatırımlarınızda ne kadar risk almaya hazırsınız?</h3>
              <div className="space-y-3">
                <div>
                  <label className="flex items-center">
                    <input type="radio" name="risk" className="h-4 w-4 text-primary" />
                    <span className="ml-2">Düşük risk - Sermayemi korumak birinci önceliğim</span>
                  </label>
                </div>
                <div>
                  <label className="flex items-center">
                    <input type="radio" name="risk" className="h-4 w-4 text-primary" />
                    <span className="ml-2">Orta risk - Dengeli bir yatırım yaklaşımı tercih ederim</span>
                  </label>
                </div>
                <div>
                  <label className="flex items-center">
                    <input type="radio" name="risk" className="h-4 w-4 text-primary" />
                    <span className="ml-2">Yüksek risk - Yüksek getiri için risk alabilirim</span>
                  </label>
                </div>
              </div>
            </div>
            
            <div className="pt-6 text-center">
              <Button variant="primary">
                Profil Testini Tamamla
              </Button>
            </div>
          </div>
        </div>
      </SectionContainer>
    </PageLayout>
  );
} 