'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import SallTechLogo from './SallTechLogo';
import CTAButton from './CTAButton';

export default function Header() {
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
      <div className="container mx-auto px-5 flex justify-between items-center">
        <div className="z-10">
          <SallTechLogo />
        </div>
        
        <nav className="hidden md:block">
          <ul className="flex space-x-10">
            <li><Link href="#home" className="header-link text-lg font-medium">Accueil</Link></li>
            <li><Link href="#services" className="header-link text-lg font-medium">Services</Link></li>
            <li><Link href="#portfolio" className="header-link text-lg font-medium">Portfolio</Link></li>
          </ul>
        </nav>
        
        <CTAButton 
          href="#contact" 
          headerStyle={true}
          showDots={true}
        >
          Contactez-nous
        </CTAButton>
      </div>
    </header>
  );
}