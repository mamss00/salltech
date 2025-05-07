'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import SallTechLogo from './SallTechLogo';
import CTAButton from './CTAButton';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Header fixe au défilement
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed w-full z-50 bg-salltech-light/80 backdrop-blur-lg transition-all duration-300 ${
        scrolled ? 'py-4 shadow-md' : 'py-6 md:py-8'
      }`}
    >
      <div className="container mx-auto px-5 flex justify-between items-center">
        <div className="z-10">
          <Link href="/" className="block">
            <SallTechLogo />
          </Link>
        </div>
        
        <nav className="hidden md:block">
          <ul className="flex space-x-10">
            <li><Link href="/#home" className="header-link text-lg font-medium">Accueil</Link></li>
            <li><Link href="/#services" className="header-link text-lg font-medium">Services</Link></li>
            <li><Link href="/#portfolio" className="header-link text-lg font-medium">Portfolio</Link></li>
          </ul>
        </nav>
        
        <CTAButton 
          href="/#contact" 
          headerStyle={true}
          showDots={true}
        >
          Contactez-nous
        </CTAButton>

        {/* Bouton menu mobile */}
        <button 
          className="md:hidden p-2 z-50"
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
        
        {/* Menu mobile */}
        <div className={`fixed inset-0 bg-light z-40 flex flex-col items-center justify-center transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          <nav className="flex flex-col items-center">
            <ul className="flex flex-col items-center space-y-8 mb-12">
              <li>
                <Link 
                  href="/#home" 
                  className="text-2xl font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Accueil
                </Link>
              </li>
              <li>
                <Link 
                  href="/#services" 
                  className="text-2xl font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Services
                </Link>
              </li>
              <li>
                <Link 
                  href="/#portfolio" 
                  className="text-2xl font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Portfolio
                </Link>
              </li>
            </ul>
            <Link 
              href="/#contact" 
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