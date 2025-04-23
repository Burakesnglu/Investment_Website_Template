import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import SectionContainer from '@/components/layout/SectionContainer';
import SectionTitle from '@/components/ui/SectionTitle';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

// Ekip üyeleri verileri
const teamMembers = [
  {
    id: 1,
    name: 'Ahmet Yılmaz',
    title: 'Kurucu ve Genel Müdür',
    bio: '15 yılı aşkın finans sektörü deneyimi ile yatırım yönetimi alanında uzmanlaşmıştır.',
    photoUrl: '/team/member1.jpg',
  },
  {
    id: 2,
    name: 'Zeynep Kaya',
    title: 'Yatırım Direktörü',
    bio: 'Portföy yönetimi ve stratejik varlık dağılımı konularında uzman, 12 yıllık deneyime sahiptir.',
    photoUrl: '/team/member2.jpg',
  },
  {
    id: 3,
    name: 'Mehmet Demir',
    title: 'Kıdemli Analist',
    bio: 'Makroekonomik analiz ve piyasa araştırmaları konusunda uzmanlaşmış, doktora derecesine sahiptir.',
    photoUrl: '/team/member3.jpg',
  },
  {
    id: 4,
    name: 'Ayşe Yıldız',
    title: 'Müşteri İlişkileri Direktörü',
    bio: 'Müşteri deneyimi ve finansal danışmanlık alanında 10 yıllık tecrübeye sahiptir.',
    photoUrl: '/team/member4.jpg',
  },
];

// Şirket değerleri
const values = [
  {
    id: 1,
    title: 'Güvenilirlik',
    description: 'Tüm iş süreçlerimizde dürüstlük ve şeffaflık ilkelerini ön planda tutuyoruz.',
    iconUrl: '/icons/reliability.svg',
  },
  {
    id: 2,
    title: 'Uzmanlık',
    description: 'Alanında uzman kadromuz ile yatırımcılarımıza en iyi hizmeti sunmayı hedefliyoruz.',
    iconUrl: '/icons/expertise.svg',
  },
  {
    id: 3,
    title: 'Yenilikçilik',
    description: 'Değişen piyasa koşullarına uyum sağlayan yenilikçi yatırım stratejileri geliştiriyoruz.',
    iconUrl: '/icons/innovation.svg',
  },
  {
    id: 4,
    title: 'Sürdürülebilirlik',
    description: 'Yatırım kararlarımızda çevresel, sosyal ve yönetişim faktörlerini göz önünde bulunduruyoruz.',
    iconUrl: '/icons/sustainability.svg',
  },
];

// Ortaklık yapısı
const partnerships = [
  { id: 1, name: 'BAL Holding', percentage: 45 },
  { id: 2, name: 'FORA Investments', percentage: 35 },
  { id: 3, name: 'Kurucu Ortaklar', percentage: 20 },
];

export default function AboutPage() {
  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="relative bg-hero-gradient text-text-light py-24">
        <div className="absolute inset-0 bg-gradient-to-r from-background-dark/90 to-background-dark/70 z-0"></div>
        <div className="container mx-auto px-4 md:px-8 z-10 relative">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Hakkımızda</h1>
            <p className="text-xl text-gray-300">
              2015 yılından bu yana müşterilerimize kaliteli ve güvenilir yatırım hizmetleri sunuyoruz.
            </p>
          </div>
        </div>
      </section>

      {/* Hikayemiz Section */}
      <SectionContainer id="hikayemiz" background="light">
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="lg:w-1/2">
            <SectionTitle 
              title="Hikayemiz"
              subtitle="Bal & Fora Yatırım'ın yolculuğu"
              align="left"
              className="mb-8"
            />
            
            <div className="space-y-4 text-gray-600">
              <p>
                Bal & Fora Yatırım, 2015 yılında Ahmet Yılmaz ve ortakları tarafından İstanbul'da kurulmuştur. Kuruluşumuzdan bu yana, yatırımcılarımıza uzun vadeli değer yaratmayı ve finansal hedeflerine ulaşmalarına yardımcı olmayı amaçladık.
              </p>
              <p>
                İlk yıllarımızda az sayıda müşteriye hizmet verirken, zamanla portföyümüzü ve müşteri tabanımızı genişlettik. 2018 yılında BAL Holding ve FORA Investments'ın stratejik ortaklığı ile şirketimiz önemli bir büyüme aşamasına girdi.
              </p>
              <p>
                Bugün, Türkiye'nin önde gelen bağımsız portföy yönetim şirketlerinden biri olarak, bireysel ve kurumsal müşterilerimize geniş bir yelpazede yatırım çözümleri sunuyoruz. Deneyimli yatırım ekibimiz, değişen piyasa koşullarında fırsatları değerlendirerek, müşterilerimize istikrarlı getiri sağlamayı hedeflemektedir.
              </p>
            </div>
          </div>
          
          <div className="lg:w-1/2">
            <div className="h-full min-h-[400px] rounded-lg shadow-soft overflow-hidden relative">
              {/* Placeholder for company history image */}
              <div className="absolute inset-0 flex items-center justify-center bg-accent-gray">
                <span className="text-gray-400 text-lg font-medium">Şirket Tarihi Görseli</span>
              </div>
            </div>
          </div>
        </div>
      </SectionContainer>

      {/* Değerlerimiz Section */}
      <SectionContainer id="degerlerimiz" background="gray">
        <SectionTitle 
          title="Değerlerimiz"
          subtitle="Bal & Fora Yatırım'ın temel değerleri"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {values.map((value) => (
            <div key={value.id} className="bg-white p-6 rounded-lg shadow-soft flex gap-4">
              <div className="shrink-0">
                <div className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center">
                  <div className="w-6 h-6 bg-primary rounded-full"></div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            </div>
          ))}
        </div>
      </SectionContainer>

      {/* Ekibimiz Section */}
      <SectionContainer id="ekibimiz" background="light">
        <SectionTitle 
          title="Ekibimiz"
          subtitle="Alanında uzman profesyonellerden oluşan ekibimiz"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member) => (
            <Card
              key={member.id}
              title={member.name}
              description={member.title}
              variant="team"
            >
              <p className="text-gray-600 text-sm mt-4">{member.bio}</p>
              <div className="mt-5 flex justify-center">
                <button className="text-primary hover:text-primary-dark transition-colors" aria-label="LinkedIn Profili">
                  <span className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center">
                    <span className="w-3 h-3 bg-primary rounded-full"></span>
                  </span>
                </button>
              </div>
            </Card>
          ))}
        </div>
      </SectionContainer>

      {/* Ortaklık Yapımız Section */}
      <SectionContainer id="ortaklik-yapimiz" background="secondary">
        <SectionTitle 
          title="Ortaklık Yapımız"
          subtitle="Güçlü ortaklık yapımız ile geleceğe yatırım yapıyoruz"
          titleClassName="text-white"
          subtitleClassName="text-gray-200"
        />
        
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-soft overflow-hidden">
            <div className="p-8">
              <div className="space-y-6">
                {partnerships.map((partner) => (
                  <div key={partner.id} className="flex flex-col sm:flex-row sm:items-center justify-between text-gray-700">
                    <div className="text-lg font-medium mb-2 sm:mb-0">{partner.name}</div>
                    <div className="w-full sm:w-1/2">
                      <div className="h-4 bg-accent-gray rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary"
                          style={{ width: `${partner.percentage}%` }}
                        ></div>
                      </div>
                      <div className="mt-1 text-right text-sm text-gray-600">
                        {partner.percentage}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </SectionContainer>

      {/* Ofisimiz Section */}
      <SectionContainer id="ofisimiz" background="light">
        <SectionTitle 
          title="Ofisimiz"
          subtitle="Modern ve teknolojik altyapıya sahip ofisimizde sizleri ağırlamaktan memnuniyet duyarız"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="h-[400px] bg-accent-gray rounded-lg shadow-soft overflow-hidden relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-gray-400 text-lg font-medium">Ofis Görseli 1</span>
            </div>
          </div>
          <div className="h-[400px] bg-accent-gray rounded-lg shadow-soft overflow-hidden relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-gray-400 text-lg font-medium">Ofis Görseli 2</span>
            </div>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <div className="max-w-2xl mx-auto text-gray-600 mb-6">
            <p>
              Levent Mahallesi, Büyükdere Caddesi No:201, 34394 Şişli/İstanbul adresinde bulunan modern ofisimizde, müşterilerimize en iyi hizmeti sunmak için çalışıyoruz. İhtiyaçlarınızı değerlendirmek ve finansal hedeflerinize ulaşmanıza yardımcı olmak için sizi ofisimize bekliyoruz.
            </p>
          </div>
          <Button 
            href="/iletisim"
            variant="primary"
          >
            Bize Ulaşın
          </Button>
        </div>
      </SectionContainer>
    </PageLayout>
  );
} 