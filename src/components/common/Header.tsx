'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiMenu, FiX } from 'react-icons/fi';

interface MarketData {
  symbol: string;
  value: string;
  change: string;
  isUp: boolean;
}

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [marketData, setMarketData] = useState<MarketData[]>([
    { symbol: 'USD/TRY', value: '31.92', change: '+0.24%', isUp: true },
    { symbol: 'EUR/TRY', value: '34.65', change: '+0.18%', isUp: true },
    { symbol: 'BIST 100', value: '9.234', change: '-0.42%', isUp: false },
    { symbol: 'ALTIN/ONS', value: '2,348', change: '+0.76%', isUp: true },
    { symbol: 'BITCOIN', value: '63,248', change: '+1.24%', isUp: true },
    { symbol: 'USD/TRY', value: '31.92', change: '+0.24%', isUp: true },
    { symbol: 'EUR/TRY', value: '34.65', change: '+0.18%', isUp: true },
    { symbol: 'BIST 100', value: '9.234', change: '-0.42%', isUp: false },
    { symbol: 'ALTIN/ONS', value: '2,348', change: '+0.76%', isUp: true },
    { symbol: 'BITCOIN', value: '63,248', change: '+1.24%', isUp: true },
  ]);

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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 w-full z-50 ${isScrolled ? 'shadow-md bg-white/95 backdrop-blur-sm' : 'bg-white'} transition-all duration-300`}>
      {/* Market Ticker */}
      <div className="bg-secondary text-text-light py-1.5 overflow-hidden">
        <div className="relative w-full overflow-hidden">
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
        </div>
      </div>
      
      {/* Main Navigation */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-3">
          {/* Logo */}
          <Link href="/" className="relative z-50">
            <div className="flex items-center font-bold text-2xl text-primary">
            Bal & Fora
            </div>
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
            <Link href="/blog" className="text-text-dark hover:text-primary transition-colors duration-300">
              Blog
            </Link>
            <Link href="/iletisim" className="text-text-dark hover:text-primary transition-colors duration-300">
              İletişim
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="relative z-50 text-text-dark md:hidden"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? 'Menüyü Kapat' : 'Menüyü Aç'}
          >
            {isMenuOpen ? (
              <FiX />
            ) : (
              <FiMenu />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-white transition-transform duration-300 ease-in-out z-40 ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } md:hidden`}
      >
        <div className="container mx-auto px-4 pt-24 pb-8">
          <nav className="flex flex-col space-y-6">
            <Link
              href="/hakkimizda"
              className="text-xl font-medium text-text-dark hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Hakkımızda
            </Link>
            <Link
              href="/fonlarimiz"
              className="text-xl font-medium text-text-dark hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Fonlarımız
            </Link>
            <Link
              href="/yatirimci-iliskileri"
              className="text-xl font-medium text-text-dark hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Yatırımcı İlişkileri
            </Link>
            <Link
              href="/blog"
              className="text-xl font-medium text-text-dark hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </Link>
            <Link
              href="/iletisim"
              className="text-xl font-medium text-text-dark hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              İletişim
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header; 