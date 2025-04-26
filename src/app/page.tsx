'use client';

import PageLayout from '@/components/layout/PageLayout';
import HeroSection from '@/components/sections/HeroSection';
import ServicesSection from '@/components/sections/ServicesSection';
import AboutSection from '@/components/sections/AboutSection';
import WhyUsSection from '@/components/sections/WhyUsSection';
import StatsCounterSection from '@/components/sections/StatsCounterSection';
import ReportsSection from '@/components/sections/ReportsSection';
import FaqSection from '@/components/sections/FaqSection';
import BlogSection from '@/components/sections/BlogSection';
import MetaTags from '@/components/common/MetaTags';
import ErrorBoundary from '@/components/common/ErrorBoundary';

import {
  heroData,
  servicesData,
  aboutData,
  whyUsData,
  statsData,
  reportsData,
  faqData,
  blogData,
} from '@/data/home-data';

export default function Home() {
  return (
    <>
      <MetaTags 
        title="Ana Sayfa"
        description="Bal & Fora Yatırım, profesyonel portföy yönetimi ve yatırım danışmanlığı hizmetleri sunan Türkiye'nin önde gelen finans kurumlarından biridir."
        keywords="bal ve fora, yatırım, finans, portföy yönetimi, fon, yatırım danışmanlığı"
        ogUrl="https://balfora.com"
      />
      
      <ErrorBoundary>
        <PageLayout>
          <HeroSection {...heroData} />
          
          <ServicesSection {...servicesData} />
          
          <AboutSection {...aboutData} />
          
          <WhyUsSection {...whyUsData} />
          
          <StatsCounterSection {...statsData} />
          
          <ReportsSection {...reportsData} />
          
          <FaqSection {...faqData} />
          
          {/* <BlogSection {...blogData} /> */}
        </PageLayout>
      </ErrorBoundary>
    </>
  );
}
