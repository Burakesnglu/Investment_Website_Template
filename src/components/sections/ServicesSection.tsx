'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SectionContainer from '../layout/SectionContainer';
import SectionTitle from '../ui/SectionTitle';  
import { motion } from 'framer-motion';

interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  link: string;
}

interface ServicesProps {
  title: string;
  subtitle: string;
  services: Service[];
}

export default function ServicesSection({ title, subtitle, services }: ServicesProps) {
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  
  // Animation to be triggered when element is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card);
    });
    
    return () => {
      cardsRef.current.forEach((card) => {
        if (card) observer.unobserve(card);
      });
    };
  }, []);
  
  // If no services are provided, use these default services
  const defaultServices: Service[] = [
    {
      id: 1,
      title: "Portföy Yönetimi",
      description: "Risk profilinize ve yatırım hedeflerinize göre özelleştirilmiş profesyonel portföy yönetim hizmetleri sunuyoruz.",
      icon: "/icons/portfolio-icon.svg",
      link: "/hizmetlerimiz/portfoy-yonetimi"
    },
    {
      id: 2,
      title: "Yatırım Fonları",
      description: "Farklı risk ve getiri beklentilerine uygun, çeşitlendirilmiş yatırım fonları ile finansal hedeflerinize ulaşmanızı sağlıyoruz.",
      icon: "/icons/investment-icon.svg",
      link: "/fonlarimiz"
    },
    {
      id: 3,
      title: "Varlık Yönetimi",
      description: "Bireysel ve kurumsal müşterilerimiz için uzun vadeli değer yaratmaya odaklanan kapsamlı varlık yönetimi çözümleri.",
      icon: "/icons/wealth-icon.svg",
      link: "/hizmetlerimiz/varlik-yonetimi"
    }
  ];
  
  // Use provided services or fall back to defaults
  const displayServices = services || defaultServices;
  
  return (
    <SectionContainer id="services" className="py-20">
      <SectionTitle 
        title={title || "Hizmetlerimiz"}
        subtitle={subtitle || "Bal & Fora Yatırım olarak finansal hedeflerinize ulaşmanız için profesyonel çözümler sunuyoruz"}
        align="center"
        className="mb-16"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {displayServices.map((service, index) => (
          <motion.div
            key={service.id}
            className={`
              relative overflow-hidden rounded-xl p-8 
              shadow-lg transition-all duration-300
              ${activeCard === service.id 
                ? 'bg-gradient-to-br from-primary/10 to-primary/5 scale-105 z-10' 
                : 'bg-white hover:bg-gradient-to-br hover:from-primary/5 hover:to-white'}
            `}
            onMouseEnter={() => setActiveCard(service.id)}
            onMouseLeave={() => setActiveCard(null)}
            whileHover={{ y: -10 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="flex flex-col h-full">
              <div className="mb-6">
                <div className="w-16 h-16 p-3 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Image 
                    src={service.icon} 
                    alt={service.title}
                    width={32} 
                    height={32}
                    className="text-primary"
                  />
                </div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
              </div>
              
              <div className="mt-auto">
                <Link 
                  href={service.link}
                  className="text-primary font-medium inline-flex items-center group"
                >
                  Detaylı Bilgi
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="text-center">
        <Link 
          href="/hizmetlerimiz" 
          className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary-dark transition-colors duration-300"
        >
          Tüm Hizmetlerimizi Keşfedin
        </Link>
      </div>
    </SectionContainer>
  );
} 