'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import SallTechLogo from './SallTechLogo';
import CTAButton from './CTAButton';

export default function EnhancedHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('home');
  
  useEffect(() => {
    // Header fixe au défilement avec animations améliorées
    const handleScroll = () => {
      const scrollY = window.scrollY;
      
      // Mise à jour de l'état de défilement
      setScrolled(scrollY > 20);
      
      // Détection de la section active pour navigation intelligente
      const sections = ['home', 'services', 'portfolio', 'contact'];
      
      sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveLink(section);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animations pour mobile menu
  const mobileMenuVariants = {
    closed: { 
      opacity: 0,
      x: '100%',
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 40
      }
    },
    open: { 
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const mobileMenuItemVariants = {
    closed: { 
      opacity: 0,
      y: 20,
      transition: { duration: 0.2 }
    },
    open: { 
      opacity: 1,
      y: 0,
      transition: { 
        type: 'spring',
        stiffness: 300,
        damping: 20
      }
    }
  };
  
  // Effet de particules pour l'arrière-plan
  const generateParticles = (count) => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 20 + 10
    }));
  };
  
  const headerParticles = generateParticles(10);

  return (
    <motion.header 
      className="fixed w-full z-50 transition-all duration-500"
      initial={{ y: -100, opacity: 0 }}
      animate={{ 
        y: 0, 
        opacity: 1,
        padding: scrolled ? '8px 0' : '16px 0',
        boxShadow: scrolled 
          ? '0 10px 30px rgba(0, 0, 0, 0.08)' 
          : 'none'
      }}
      transition={{ 
        duration: 0.5,
        type: scrolled ? "spring" : "tween",
        stiffness: 400,
        damping: 30
      }}
    >
      {/* Fond élégant avec effet de vitre */}
<div className="absolute inset-0 overflow-hidden">
  <div 
    className="absolute inset-0 backdrop-blur-lg"
    style={{ background: 'rgba(255, 255, 255, 0.75)' }}
  />
  <div 
    className="absolute inset-0"
    style={{
      background: `linear-gradient(135deg, 
        rgba(255, 255, 255, 0.4) 0%, 
        rgba(255, 255, 255, 0.1) 50%, 
        rgba(255, 255, 255, 0.4) 100%)`,
      opacity: 0.6
    }}
  />
  <div 
    className="absolute bottom-0 left-0 right-0 h-px"
    style={{
      background: scrolled 
        ? 'linear-gradient(90deg, transparent, rgba(0,0,0,0.1), transparent)'
        : 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)'
    }}
  />
</div>
      
      <div className="container mx-auto px-5 flex justify-between items-center relative z-10 h-16">
        {/* Logo avec animation */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <Link href="https://www.sall.technology/#home">
            <SallTechLogo />
          </Link>
        </motion.div>
        
        {/* Navigation desktop avec hover élégant */}
        <nav className="hidden md:block">
          <ul className="flex space-x-12">
            {[
              { name: 'Accueil', href: 'home' },
              { name: 'Services', href: 'services' },
              { name: 'Portfolio', href: 'portfolio' }
            ].map((item) => (
              <li key={item.href}>
                <Link 
                  href={`https://www.sall.technology/#${item.href}`} 
                  className="relative py-2 px-1 text-lg font-medium text-gray-800 transition-colors duration-300 hover:text-blue"
                  onClick={() => setActiveLink(item.href)}
                >
                  {item.name}
                  {activeLink === item.href && (
                    <motion.span
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-blue via-purple to-red"
                      layoutId="activeNavIndicator"
                      initial={{ opacity: 0, width: '0%' }}
                      animate={{ opacity: 1, width: '100%' }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
        {/* Bouton CTA avec effet amélioré */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <CTAButton 
            href="https://www.sall.technology/#contact" 
            headerStyle={true}
            showDots={true}
          >
            Contactez-nous
          </CTAButton>
        </motion.div>
        
        {/* Bouton de menu mobile amélioré */}
        <motion.button 
          className="md:hidden z-50 p-2 relative"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="w-8 h-8 flex flex-col justify-center items-center gap-1.5 relative">
            {/* Cercle d'effet */}
            <motion.div 
              className="absolute inset-0 bg-blue/5 rounded-full"
              animate={{ 
                scale: isMobileMenuOpen ? 1 : 0.8,
                opacity: isMobileMenuOpen ? 0.8 : 0
              }}
              transition={{ duration: 0.3 }}
            />
            
            {/* Lignes du hamburger */}
            <motion.span 
              className="block w-6 h-0.5 bg-dark rounded-full"
              animate={{ 
                rotate: isMobileMenuOpen ? 45 : 0,
                y: isMobileMenuOpen ? 2 : 0,
                backgroundColor: isMobileMenuOpen ? "rgb(52, 152, 219)" : "#1a1a2e"
              }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            />
            <motion.span 
              className="block w-6 h-0.5 bg-dark rounded-full"
              animate={{ 
                opacity: isMobileMenuOpen ? 0 : 1,
                x: isMobileMenuOpen ? 20 : 0,
                backgroundColor: isMobileMenuOpen ? "rgb(52, 152, 219)" : "#1a1a2e"
              }}
              transition={{ duration: 0.2 }}
            />
            <motion.span 
              className="block w-6 h-0.5 bg-dark rounded-full"
              animate={{ 
                rotate: isMobileMenuOpen ? -45 : 0,
                y: isMobileMenuOpen ? -2 : 0,
                backgroundColor: isMobileMenuOpen ? "rgb(52, 152, 219)" : "#1a1a2e"
              }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            />
          </div>
        </motion.button>
        
        {/* Menu mobile repensé */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              className="fixed inset-0 bg-white/95 backdrop-blur-md z-40 flex flex-col items-center justify-center"
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              {/* Éléments décoratifs */}
              <motion.div 
                className="absolute top-20 left-10 w-32 h-32 rounded-full bg-blue/10 blur-3xl"
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 5, repeat: Infinity }}
              />
              <motion.div 
                className="absolute bottom-20 right-10 w-32 h-32 rounded-full bg-purple/10 blur-3xl"
                animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 6, repeat: Infinity, delay: 1 }}
              />
              
              {/* Navigation avec motifs géométriques subtils */}
              <nav className="flex flex-col items-center relative z-10 px-6 py-10 backdrop-blur-sm bg-white/30 rounded-3xl">
                {/* Motif géométrique subtil */}
                <div className="absolute inset-0 overflow-hidden rounded-3xl">
                  <svg width="100%" height="100%" className="absolute opacity-10">
                    <pattern id="navPattern" patternUnits="userSpaceOnUse" width="40" height="40">
                      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(52, 152, 219, 0.5)" strokeWidth="0.5" />
                    </pattern>
                    <rect width="100%" height="100%" fill="url(#navPattern)" />
                  </svg>
                </div>
                
                <motion.div
                  className="w-12 h-1 bg-gradient-to-r from-blue via-purple to-red rounded-full mb-8"
                  initial={{ width: 0 }}
                  animate={{ width: "3rem" }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                />
                
                <ul className="flex flex-col items-center space-y-8 mb-12">
                  {[
                    { name: 'Accueil', href: 'home' },
                    { name: 'Services', href: 'services' },
                    { name: 'Portfolio', href: 'portfolio' }
                  ].map((item) => (
                    <motion.li
                      key={item.href}
                      variants={mobileMenuItemVariants}
                      className="relative"
                    >
                      <Link 
                        href={`https://www.sall.technology/#${item.href}`} 
                        className="text-2xl font-medium relative px-4 py-2 transition-colors duration-300 hover:text-blue"
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          setActiveLink(item.href);
                        }}
                      >
                        {item.name}
                        <motion.div 
                          className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-blue via-purple to-red"
                          initial={{ scaleX: 0, opacity: 0 }}
                          whileHover={{ scaleX: 1, opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      </Link>
                    </motion.li>
                  ))}
                </ul>
                
                <motion.div
                  variants={mobileMenuItemVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link 
                    href="https://www.sall.technology/#contact" 
                    className="inline-flex items-center bg-gradient-to-r from-blue via-purple to-red text-white px-8 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Contactez-nous
                    <div className="inline-flex items-center ml-2 h-4">
                      <span className="w-1.5 h-1.5 bg-white rounded-full mr-1 opacity-0 animate-dot-pulse-1"></span>
                      <span className="w-1.5 h-1.5 bg-white rounded-full mr-1 opacity-0 animate-dot-pulse-2"></span>
                      <span className="w-1.5 h-1.5 bg-white rounded-full opacity-0 animate-dot-pulse-3"></span>
                    </div>
                  </Link>
                </motion.div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Effet de barre de progression de défilement */}
      <motion.div 
        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue via-purple to-red"
        style={{ 
          scaleX: scrolled ? 1 : 0,
          transformOrigin: "left" 
        }}
        animate={{ 
          scaleX: scrolled ? 1 : 0,
          opacity: scrolled ? 1 : 0
        }}
        transition={{ duration: 0.5 }}
      />
    </motion.header>
  );
}
