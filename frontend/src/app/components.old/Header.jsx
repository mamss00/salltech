'use client'

import { useState, useEffect } from 'react'
import SallTechLogo from './SallTechLogo'

const Header = () => {
  const [scrolled, setScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  return (
    <header className={`fixed w-full z-50 transition-all duration-300 bg-light/90 backdrop-blur-md ${
      scrolled ? 'py-3 shadow-md' : 'py-6 md:py-8'
    }`}>
      <div className="container flex justify-between items-center">
        <a href="#home" className="z-50">
          <SallTechLogo />
        </a>
        
        {/* Navigation desktop */}
        <nav className="hidden md:block">
          <ul className="flex space-x-10">
            <li><a href="#home" className="header-link">Accueil</a></li>
            <li><a href="#services" className="header-link">Services</a></li>
            <li><a href="#portfolio" className="header-link">Portfolio</a></li>
          </ul>
        </nav>
        
        {/* CTA Button - Desktop only */}
        <div className="hidden md:block">
          <a href="#contact" className="cta-button">
            <span>Contactez-nous</span>
            <span className="inline-flex items-center ml-2 h-1">
              <span className="w-1 h-1 bg-white rounded-full mr-1 opacity-0 animate-dot-pulse-1"></span>
              <span className="w-1 h-1 bg-white rounded-full mr-1 opacity-0 animate-dot-pulse-2"></span>
              <span className="w-1 h-1 bg-white rounded-full opacity-0 animate-dot-pulse-3"></span>
            </span>
          </a>
        </div>
        
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
        <div className={`fixed inset-0 bg-light z-40 flex flex-col items-center justify-center transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          <nav className="flex flex-col items-center">
            <ul className="flex flex-col items-center space-y-8 mb-12">
              <li>
                <a 
                  href="#home" 
                  className="text-2xl font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Accueil
                </a>
              </li>
              <li>
                <a 
                  href="#services" 
                  className="text-2xl font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Services
                </a>
              </li>
              <li>
                <a 
                  href="#portfolio" 
                  className="text-2xl font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Portfolio
                </a>
              </li>
            </ul>
            <a 
              href="#contact" 
              className="cta-button"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contactez-nous
              <span className="inline-flex items-center ml-2 h-1">
                <span className="w-1 h-1 bg-white rounded-full mr-1 opacity-0 animate-dot-pulse-1"></span>
                <span className="w-1 h-1 bg-white rounded-full mr-1 opacity-0 animate-dot-pulse-2"></span>
                <span className="w-1 h-1 bg-white rounded-full opacity-0 animate-dot-pulse-3"></span>
              </span>
            </a>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header