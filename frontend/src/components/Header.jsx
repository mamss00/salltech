'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import SallTechLogo from './SallTechLogo';
import CTAButton from './CTAButton';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    // Header fixe au défilement
    const handleScroll = () => {
      const header = document.querySelector('header');
      if (header) {
        if (window.scrollY > 50) {
          header.style.padding = '15px 0';
          header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
        } else {
          header.style.padding = '30px 0';
          header.style.boxShadow = 'none';
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed w-full z-50 bg-salltech-light/95 backdrop-blur-md transition-all duration-300" style={{ padding: '30px 0' }}>
      {/* Shadow/glow effect en arrière-plan */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 to-transparent opacity-70"></div>
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-white/40"></div>
        <div className="absolute -top-10 right-1/4 w-64 h-64 bg-blue/20 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute -bottom-8 left-1/3 w-64 h-64 bg-purple/20 rounded-full blur-3xl opacity-40"></div>
        <div className="absolute top-0 right-0 w-96 h-32 bg-gradient-to-r from-transparent via-red/10 to-transparent blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-5 flex justify-between items-center">
        <div className="z-10">
          <Link href="https://www.sall.technology/#home">
            <SallTechLogo />
          </Link>
        </div>
        
        <nav className="hidden md:block">
          <ul className="flex space-x-10">
            <li><Link href="https://www.sall.technology/#home" className="header-link text-lg font-medium">Accueil</Link></li>
            <li><Link href="https://www.sall.technology/#services" className="header-link text-lg font-medium">Services</Link></li>
            <li><Link href="https://www.sall.technology/#portfolio" className="header-link text-lg font-medium">Portfolio</Link></li>
          </ul>
        </nav>
        
        <CTAButton 
          href="https://www.sall.technology/#contact" 
          headerStyle={true}
          showDots={true}
        >
          Contactez-nous
        </CTAButton>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden z-50 p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <div className="w-6 flex flex-col gap-1.5">
            <span className={`block w-6 h-0.5 bg-dark transition-transform duration-300 ${
              isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''
            }`}></span>
            <span className={`block w-6 h-0.5 bg-dark transition-opacity duration-300 ${
              isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
            }`}></span>
            <span className={`block w-6 h-0.5 bg-dark transition-transform duration-300 ${
              isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
            }`}></span>
          </div>
        </button>
        
        {/* Mobile menu */}
        <div className={`fixed inset-0 bg-white/95 backdrop-blur-lg z-40 flex flex-col items-center justify-center transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          <nav className="flex flex-col items-center">
            <ul className="flex flex-col items-center space-y-8 mb-12">
              <li>
                <Link 
                  href="https://www.sall.technology/#home" 
                  className="text-2xl font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Accueil
                </Link>
              </li>
              <li>
                <Link 
                  href="https://www.sall.technology/#services" 
                  className="text-2xl font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Services
                </Link>
              </li>
              <li>
                <Link 
                  href="https://www.sall.technology/#portfolio" 
                  className="text-2xl font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Portfolio
                </Link>
              </li>
            </ul>
            <Link 
              href="https://www.sall.technology/#contact" 
              className="inline-flex items-center bg-gradient-to-r from-blue via-purple to-red text-white px-8 py-3 rounded-xl font-medium transition-all duration-400"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contactez-nous
              <span className="inline-flex items-center ml-2 h-1">
                <span className="w-1 h-1 bg-white rounded-full mr-1 opacity-0 animate-dot-pulse-1"></span>
                <span className="w-1 h-1 bg-white rounded-full mr-1 opacity-0 animate-dot-pulse-2"></span>
                <span className="w-1 h-1 bg-white rounded-full opacity-0 animate-dot-pulse-3"></span>
              </span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}