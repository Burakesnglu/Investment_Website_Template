'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import SectionContainer from '../layout/SectionContainer';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  primaryButtonText: string;
  primaryButtonLink: string;
  secondaryButtonText: string;
  secondaryButtonLink: string;
}

export default function HeroSection({
  title = "Geleceğinizi <span>Güçlendiren</span> Yatırım Çözümleri",
  subtitle = "Profesyonel portföy yönetimi ve kişiselleştirilmiş yatırım stratejileri ile finansal hedeflerinize ulaşmanıza yardımcı oluyoruz.",
  primaryButtonText = "Fonlarımızı Keşfedin",
  primaryButtonLink = "/fonlarimiz",
  secondaryButtonText = "Bize Ulaşın",
  secondaryButtonLink = "/iletisim"
}: HeroSectionProps) {
  const titleRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (titleRef.current) observer.observe(titleRef.current);
    if (imageRef.current) observer.observe(imageRef.current);

    return () => {
      if (titleRef.current) observer.unobserve(titleRef.current);
      if (imageRef.current) observer.unobserve(imageRef.current);
    };
  }, []);

  // Function to render title with HTML tags
  const renderTitle = () => {
    return { __html: title };
  };

  return (
    <div className="relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-background-dark z-0">
        {/* Grid pattern */}
        <div className="absolute top-0 right-0 w-full h-full opacity-5">
          <div className="absolute top-0 left-0 w-full h-full" style={{ 
            backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '30px 30px'
          }}></div>
        </div>
        <div className="absolute top-0 right-0 w-1/2 h-full">
          <div className="absolute top-20 right-0 w-full h-4/5 bg-gold-radial-gradient opacity-20 blur-3xl rounded-full"></div>
        </div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2">
          <div className="absolute bottom-0 left-0 w-full h-full bg-primary-dark/10 blur-3xl rounded-full"></div>
        </div>
      </div>

      <SectionContainer className="relative z-10">
        <div className="flex flex-col lg:flex-row items-center min-h-[40vh] py-10">
          {/* Left Side Content */}
          <div 
            ref={titleRef} 
            className="w-full lg:w-1/2 text-center lg:text-left mb-10 lg:mb-0 opacity-0 translate-y-8 transition-all duration-1000"
          >
            <div className="inline-block bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm font-medium mb-6">
              <span className="mr-2">•</span>
              <span>BAL & FORA YATIRIM</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight" dangerouslySetInnerHTML={renderTitle()}>
            </h1>
            
            <p className="text-lg mb-8 max-w-lg mx-auto lg:mx-0">
              {subtitle}
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <Link 
                href={primaryButtonLink} 
                className="btn-primary px-8 py-3.5 font-medium text-base hover:shadow-premium"
              >
                {primaryButtonText}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 inline-block" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
              <Link 
                href={secondaryButtonLink} 
                className="btn-outline px-8 py-3.5 font-medium text-base text-primary border-primary hover:bg-primary/5"
              >
                {secondaryButtonText}
              </Link>
            </div>
            
            <div className="mt-12 flex items-center justify-center lg:justify-start">
              <div className="flex -space-x-2">
                <div className="w-10 h-10 rounded-full border-2 overflow-hidden bg-primary-light flex items-center justify-center">
                  <span className="text-primary-dark font-bold text-xs">AA</span>
                </div>
                <div className="w-10 h-10 rounded-full border-2 overflow-hidden bg-primary-light flex items-center justify-center">
                  <span className="text-primary-dark font-bold text-xs">BB</span>
                </div>
                <div className="w-10 h-10 rounded-full border-2 overflow-hidden bg-primary-light flex items-center justify-center">
                  <span className="text-primary-dark font-bold text-xs">CC</span>
                </div>
              </div>
              <div className="ml-4">
                <div className="flex items-center">
                  <div className="text-yellow-400 flex">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-600">
                    <span className="font-medium">4.9</span> / 5.0
                  </span>
                </div>
                <div className="text-xs mt-0.5 text-gray-800">200+ mutlu yatırımcı</div>
              </div>
            </div>
          </div>
          
          {/* Right Side Image */}
          <div 
            ref={imageRef} 
            className="w-full lg:w-1/2 relative opacity-0 translate-y-8 transition-all duration-1000 delay-300"
          >
            <div className="relative w-full max-w-lg mx-auto">
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-primary/20 rounded-full blur-xl z-0"></div>
              <div className="absolute -bottom-10 -right-10 w-28 h-28 bg-blue-400/20 rounded-full blur-xl z-0"></div>
              
              <div className="relative z-10 bg-gradient-to-br from-background-dark/50 to-background-dark/80 backdrop-blur-sm p-3 rounded-2xl border border-white/10 shadow-premium">
                <div className="flex justify-between items-center mb-6 px-3 pt-3">
                  <div>
                    <h3 className="text-sm font-medium text-text-light">Portföy Performansı</h3>
                    <p className="text-xs text-text-light/60">Son 12 ay</p>
                  </div>
                  <div className="flex items-center bg-primary/10 px-2 py-1 rounded-full">
                    <span className="w-2 h-2 bg-primary rounded-full mr-1.5"></span>
                    <span className="text-xs font-medium text-primary">%28.5</span>
                  </div>
                </div>
                
                <div className="relative h-64 w-full bg-gradient-to-b from-background-dark to-background-dark/50 rounded-xl overflow-hidden">
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none">
                    {/* Grid lines */}
                    <line x1="0" y1="50" x2="400" y2="50" stroke="#ffffff10" strokeWidth="1" />
                    <line x1="0" y1="100" x2="400" y2="100" stroke="#ffffff10" strokeWidth="1" />
                    <line x1="0" y1="150" x2="400" y2="150" stroke="#ffffff10" strokeWidth="1" />
                    
                    <line x1="50" y1="0" x2="50" y2="200" stroke="#ffffff10" strokeWidth="1" />
                    <line x1="150" y1="0" x2="150" y2="200" stroke="#ffffff10" strokeWidth="1" />
                    <line x1="250" y1="0" x2="250" y2="200" stroke="#ffffff10" strokeWidth="1" />
                    <line x1="350" y1="0" x2="350" y2="200" stroke="#ffffff10" strokeWidth="1" />
                    
                    {/* Chart Line */}
                    <path 
                      d="M0,180 C20,160 40,170 60,140 C80,110 100,130 120,110 C140,90 160,80 180,70 C200,60 220,55 240,50 C260,45 280,40 300,30 C320,20 340,40 360,35 C380,30 400,20 400,20" 
                      fill="none" 
                      stroke="url(#goldGradient)" 
                      strokeWidth="3"
                    />
                    
                    {/* Area under the chart */}
                    <path 
                      d="M0,180 C20,160 40,170 60,140 C80,110 100,130 120,110 C140,90 160,80 180,70 C200,60 220,55 240,50 C260,45 280,40 300,30 C320,20 340,40 360,35 C380,30 400,20 400,20 L400,200 L0,200 Z" 
                      fill="url(#areaGradient)" 
                      opacity="0.3"
                    />
                    
                    {/* Gradient definitions */}
                    <defs>
                      <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#F2E9BF" />
                        <stop offset="100%" stopColor="#D4AF37" />
                      </linearGradient>
                      <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#D4AF37" />
                        <stop offset="100%" stopColor="#D4AF3700" />
                      </linearGradient>
                    </defs>
                  </svg>
                  
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white/5 backdrop-blur-md rounded-lg px-6 py-3 shadow-premium">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="h-2 w-2 rounded-full bg-primary"></div>
                        <span className="text-xs text-text-light/80">Yıllık Getiri</span>
                      </div>
                      <div className="text-2xl font-bold text-text-light">%28.5</div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 px-4 pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex gap-3">
                      <div className="flex flex-col">
                        <span className="text-xs text-text-light/60">Toplam Değer</span>
                        <span className="text-sm font-medium text-text-light">₺4.85M</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs text-text-light/60">Yatırımcı</span>
                        <span className="text-sm font-medium text-text-light">214</span>
                      </div>
                    </div>
                    <div className="flex items-center bg-background-dark/50 p-2 rounded-full">
                      <div className="w-6 h-6 bg-text-light rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-background-dark" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -right-4 -bottom-4 transform translate-y-1/2 z-20 bg-gradient-to-br from-background-dark/50 to-background-dark/80 backdrop-blur-sm p-3 rounded-xl border border-white/10 shadow-premium w-40">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-gold-gradient flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-2">
                    <div className="text-xs text-text-light/60">Yıllık Ücret</div>
                    <div className="text-sm font-medium text-text-light">%1.50</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Wave */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden">
          <svg 
            className="w-full h-auto" 
            viewBox="0 0 1440 100" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            <path 
              d="M0 50L48 45.7C96 41.3 192 32.7 288 29.2C384 25.7 480 27.3 576 33.3C672 39.3 768 49.7 864 58.3C960 67 1056 74 1152 70.8C1248 67.7 1344 54.3 1392 47.7L1440 41V101H1392C1344 101 1248 101 1152 101C1056 101 960 101 864 101C768 101 672 101 576 101C480 101 384 101 288 101C192 101 96 101 48 101H0V50Z" 
              fill="white" 
              fillOpacity="0.05"
            />
            <path 
              d="M0 70L48 68.2C96 66.3 192 62.7 288 60.5C384 58.3 480 57.7 576 60.5C672 63.3 768 69.7 864 73C960 76.3 1056 76.7 1152 72.3C1248 68 1344 59 1392 54.5L1440 50V101H1392C1344 101 1248 101 1152 101C1056 101 960 101 864 101C768 101 672 101 576 101C480 101 384 101 288 101C192 101 96 101 48 101H0V70Z" 
              fill="white" 
              fillOpacity="0.05"
            />
          </svg>
        </div>
      </SectionContainer>
    </div>
  );
} 