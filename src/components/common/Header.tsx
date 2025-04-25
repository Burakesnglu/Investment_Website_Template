'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiMenu, FiX } from 'react-icons/fi';
import { useMarketData } from '@/hooks/useMarketData';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { marketData, loading, error } = useMarketData();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    // Menü açıkken kaydırmayı devre dışı bırak
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 w-full z-50 ${isScrolled ? 'shadow-md bg-white/95 backdrop-blur-sm' : 'bg-white'} transition-all duration-300`}>
      {/* Market Ticker */}
      <div className="bg-secondary text-text-light py-1.5 overflow-hidden">
        <div className="relative w-full overflow-hidden">
          {loading ? (
            <div className="flex justify-center">
              <span className="text-sm">Piyasa verileri yükleniyor...</span>
            </div>
          ) : error ? (
            <div className="flex justify-center">
              <span className="text-sm text-red-400">{error}</span>
            </div>
          ) : (
            <div className="animate-marquee">
              {marketData.map((item, index) => (
                <div key={index} className="inline-flex items-center mx-4">
                  <span className="font-medium">{item.symbol}</span>
                  <span className="ml-2">{item.value}</span>
                  <span className={`ml-2 ${item.isUp ? 'text-green-400' : 'text-red-400'}`}>
                    {item.change}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* Main Navigation */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-3">
          {/* Logo */}
          <Link href="/" className="relative z-50">
            <span className="flex items-center font-bold text-2xl text-primary whitespace-nowrap">
              Bal & Fora
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/hakkimizda" className="text-text-dark hover:text-primary transition-colors duration-300">
              Hakkımızda
            </Link>
            <Link href="/fonlarimiz" className="text-text-dark hover:text-primary transition-colors duration-300">
              Fonlarımız
            </Link>
            <Link href="/yatirimci-iliskileri" className="text-text-dark hover:text-primary transition-colors duration-300">
              Yatırımcı İlişkileri
            </Link>
            {/* <Link href="/blog" className="text-text-dark hover:text-primary transition-colors duration-300">
              Blog
            </Link> */}
            <Link href="/iletisim" className="text-text-dark hover:text-primary transition-colors duration-300">
              İletişim
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="relative z-50 text-text-dark md:hidden p-1"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? 'Menüyü Kapat' : 'Menüyü Aç'}
          >
            {isMenuOpen ? (
              <FiX className="h-6 w-6" />
            ) : (
              <FiMenu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-white z-40 md:hidden overflow-y-auto"
          style={{ paddingTop: '80px' }}
        >
          <div className="container mx-auto px-6">
            <nav className="flex flex-col">
              <Link
                href="/hakkimizda"
                className="text-xl font-medium text-text-dark hover:text-primary py-4 border-b border-gray-100"
                onClick={() => setIsMenuOpen(false)}
                style={{ letterSpacing: 'normal' }}
              >
                <span style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>Hakkımızda</span>
              </Link>
              <Link
                href="/fonlarimiz"
                className="text-xl font-medium text-text-dark hover:text-primary py-4 border-b border-gray-100"
                onClick={() => setIsMenuOpen(false)}
                style={{ letterSpacing: 'normal' }}
              >
                <span style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>Fonlarımız</span>
              </Link>
              <Link
                href="/yatirimci-iliskileri"
                className="text-xl font-medium text-text-dark hover:text-primary py-4 border-b border-gray-100"
                onClick={() => setIsMenuOpen(false)}
                style={{ letterSpacing: 'normal' }}
              >
                <span style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>Yatırımcı İlişkileri</span>
              </Link>
              {/* <Link
                href="/blog"
                className="text-xl font-medium text-text-dark hover:text-primary py-4 border-b border-gray-100"
                onClick={() => setIsMenuOpen(false)}
                style={{ letterSpacing: 'normal' }}
              >
                <span style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>Blog</span>
              </Link> */}
              <Link
                href="/iletisim"
                className="text-xl font-medium text-text-dark hover:text-primary py-4 border-b border-gray-100"
                onClick={() => setIsMenuOpen(false)}
                style={{ letterSpacing: 'normal' }}
              >
                <span style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>İletişim</span>
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header; 