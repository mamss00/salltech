'use client'

import React, { useEffect, useState, useRef } from 'react';
import CTAButton from '@/components/CTAButton';

function EnhancedHero() {
  // Animation pour le composant de droite
  const [animationStage, setAnimationStage] = useState(0);
  
  // Pour l'effet de typing
  const [text, setText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  // Pour le défilement vertical des points clés
  const [currentKey, setCurrentKey] = useState(0);
  const intervalRef = useRef(null);
  
  // Phrases pour l'effet de typing
  const phrases = [
    "les beaux sites",
    "les apps élégantes",
    "le travail propre",
    "l'excellence", 
    "le professionnalisme"
  ];
  
  // Effet de typing
  useEffect(() => {
    const typingSpeed = 100;
    const deleteSpeed = 50;
    const delayBeforeDelete = 2000;
    const delayBeforeNewPhrase = 500;
    
    const timer = setTimeout(() => {
      const currentPhrase = phrases[phraseIndex];
      
      // Typing ou deleting
      if (isTyping) {
        setText(currentPhrase.substring(0, charIndex + 1));
        setCharIndex(prev => prev + 1);
        
        // Si on a fini de taper toute la phrase
        if (charIndex === currentPhrase.length) {
          setIsTyping(false);
          return;
        }
      } else {
        setText(currentPhrase.substring(0, charIndex - 1));
        setCharIndex(prev => prev - 1);
        
        // Si on a fini de supprimer toute la phrase
        if (charIndex === 0) {
          setIsTyping(true);
          setPhraseIndex((prev) => (prev + 1) % phrases.length);
          return;
        }
      }
      
      // Définir la vitesse en fonction de l'état
      const speed = isTyping 
        ? Math.random() * 30 + 80 // Variation naturelle pour le typing
        : charIndex === currentPhrase.length 
          ? delayBeforeDelete // Pause avant de commencer à supprimer
          : charIndex === 0 
            ? delayBeforeNewPhrase // Pause avant de taper la nouvelle phrase
            : deleteSpeed; // Vitesse normale de suppression
      
    }, isTyping ? 100 : 50);
    
    return () => clearTimeout(timer);
  }, [charIndex, isTyping, phraseIndex, phrases]);

  // Animation séquentielle pour le panneau de droite
  useEffect(() => {
    setTimeout(() => setAnimationStage(1), 300);
    setTimeout(() => setAnimationStage(2), 600);
    setTimeout(() => setAnimationStage(3), 900);
    setTimeout(() => setAnimationStage(4), 1200);
    setTimeout(() => setAnimationStage(5), 1800);
  }, []);
  
  // Défilement automatique des points clés
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentKey(prev => (prev + 1) % 4);
    }, 4000);
    
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);
  
  // Experts Projects avec logos
  const expertProjects = [
    { name: 'BMW', logo: 'M' },
    { name: 'Air France', logo: 'AF' },
    { name: 'LVMH', logo: 'LV' },
    { name: 'SAP', logo: 'S' },
    { name: 'HDI', logo: 'H' }
  ];

  // Points clés qui défileront
  const keyPoints = [
    {
      icon: '🌍',
      title: 'Expertise internationale',
      description: 'Tous nos experts ont une expérience significative à l\'international'
    },
    {
      icon: '🏆',
      title: 'Experts de calibre international',
      description: 'Nos experts ont travaillé sur des projets prestigieux pour BMW, Air France, LVMH, SAP et HDI'
    },
    {
      icon: '🏢',
      title: 'Leaders locaux',
      description: 'La plus grande agence immobilière du pays nous a fait confiance'
    },
    {
      icon: '🚀',
      title: '50% de clients internationaux',
      description: 'Notre expertise s\'étend au-delà des frontières mauritaniennes'
    }
  ];

  return (
    <section id="home" className="relative min-h-[90vh] flex items-center overflow-hidden pt-36 pb-8">
      {/* Arrière-plan avec effets parallaxes */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-blue/5 rounded-full blur-[100px] transform -translate-x-1/4 animate-float-slow"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-purple/5 rounded-full blur-[100px] transform translate-x-1/4 animate-float-reverse"></div>
      </div>
      
      {/* Grid avec espacement approprié */}
      <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-6 relative z-10">
        {/* Colonne de gauche - Contenu principal */}
        <div className="px-5 md:px-10 flex flex-col justify-center">
          <h2 className="text-blue text-lg font-semibold tracking-wider uppercase mb-6 opacity-90">
            INNOVER. CRÉÉR. TRANSFORMER.
          </h2>
          
          <div className="h-[140px] mb-6 relative">
            <h1 className="text-4xl md:text-[3.5rem] font-extrabold leading-tight absolute top-0 left-0 w-full">
              Pour ceux qui<br />
              aiment <span className="gradient-text inline-block relative min-w-[280px]">
                {text}
                <span className={`absolute -right-2 ${isTyping ? 'animate-blink' : ''}`}>|</span>
              </span>
            </h1>
          </div>
          
          <div className="mt-6">
            <p className="text-lg md:text-[1.25rem] text-gray-600 max-w-[520px] leading-[1.7] mb-8">
              Startup innovante à Nouakchott, nous développons des solutions digitales sur mesure pour accompagner les entreprises mauritaniennes dans leur transformation numérique.
            </p>
          </div>
          
          <CTAButton 
            href="#services" 
            className="md:text-left text-center md:self-start inline-flex items-center py-[14px] px-[34px] text-[1.05rem]"
          >
            Découvrir nos services
          </CTAButton>
        </div>
        
        {/* Colonne de droite - Pourquoi nous choisir */}
        <div className="relative h-full min-h-[500px] flex items-center justify-center overflow-hidden p-4">
          {/* Background avec effet de verre */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue/40 to-purple/40 rounded-2xl backdrop-blur-md shadow-2xl border border-white/10"></div>
          
          {/* Éléments décoratifs */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-400/20 to-blue-600/20 rounded-full blur-xl opacity-50 transform -translate-x-1/3 translate-y-1/3 animate-pulse-slow"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-br from-purple-400/20 to-purple-600/20 rounded-full blur-xl opacity-50 transform translate-x-1/3 -translate-y-1/3 animate-pulse-slow delay-1000"></div>
          
          {/* Motifs géométriques */}
          <div className="absolute inset-0 opacity-10">
            <svg width="100%" height="100%" className="absolute opacity-20">
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 0 10 L 40 10 M 10 0 L 10 40" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>
          
          {/* Container du contenu principal */}
          <div className="relative z-20 p-6 md:p-8 text-white w-full max-w-xl">
            {/* Badge supérieur avec beaucoup d'espace */}
            <div 
              className={`inline-block px-4 py-1.5 rounded-full bg-gradient-to-r from-blue/40 to-purple/40 backdrop-blur-md text-sm font-medium mb-6 shadow-lg border border-white/20 transition-all duration-500 ${
                animationStage >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
              }`}
            >
              EXPERTISE INTERNATIONALE
            </div>
            
            {/* Titre avec animation */}
            <h2 
              className={`text-3xl font-bold mb-4 transition-all duration-500 ${
                animationStage >= 2 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
              }`}
            >
              Pourquoi nous choisir
            </h2>
            
            {/* Ligne décorative animée */}
            <div 
              className={`h-1 bg-gradient-to-r from-white/80 to-white/20 rounded-full mb-6 transition-all duration-700 ease-out ${
                animationStage >= 3 ? 'w-32 opacity-100' : 'w-0 opacity-0'
              }`}
            ></div>
            
            {/* Points clés avec défilement vertical */}
            <div className={`h-[160px] overflow-hidden relative mb-6 ${
              animationStage >= 4 ? 'opacity-100' : 'opacity-0'
            }`}>
              {keyPoints.map((item, index) => (
                <div 
                  key={index}
                  className={`flex items-start absolute w-full transition-all duration-700 ease-out ${
                    currentKey === index 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-16'
                  }`}
                >
                  <span className="w-10 h-10 bg-gradient-to-br from-white/30 to-white/10 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0 hover:from-white/40 hover:to-white/20 transition-all duration-300 shadow-md">
                    <span className="text-xl">{item.icon}</span>
                  </span>
                  <span>
                    <strong className="block text-xl font-semibold mb-1">{item.title}</strong>
                    <span className="text-white/90">{item.description}</span>
                  </span>
                </div>
              ))}
              
              {/* Points indicateurs */}
              <div className="absolute bottom-0 left-0 right-0 flex justify-center space-x-2 mt-4">
                {keyPoints.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentKey(index);
                      // Réinitialiser le timer de défilement
                      if (intervalRef.current) clearInterval(intervalRef.current);
                      intervalRef.current = setInterval(() => {
                        setCurrentKey(prev => (prev + 1) % 4);
                      }, 4000);
                    }}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      currentKey === index ? 'bg-white scale-125' : 'bg-white/40'
                    }`}
                    aria-label={`Point ${index + 1}`}
                  />
                ))}
              </div>
            </div>
            
            {/* Projets avec logos */}
            <div className={`transition-all duration-500 ${
              animationStage >= 5 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              <p className="text-sm text-white/90 mb-4 font-medium">Projets sur lesquels nos experts ont travaillé :</p>
              <div className="flex flex-wrap gap-2">
                {expertProjects.map((project, index) => (
                  <div 
                    key={index} 
                    className="bg-gradient-to-br from-white/30 to-white/10 rounded-xl hover:from-white/40 hover:to-white/20 shadow-lg transition-all duration-300 hover:-translate-y-1 group border border-white/10"
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-center p-2">
                      {/* Logo stylisé */}
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue/40 to-purple/40 flex items-center justify-center mr-2 shadow-md overflow-hidden group-hover:scale-110 transition-transform duration-300">
                        <span className="text-white font-bold text-xs">{project.logo}</span>
                      </div>
                      <div className="text-white font-semibold text-sm">{project.name}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Style pour les animations avancées */}
      <style jsx>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes float-slow {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-30px, 30px); }
        }
        
        @keyframes float-reverse {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(30px, -30px); }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.1); }
        }
        
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        
        .animate-float-slow {
          animation: float-slow 20s ease-in-out infinite;
        }
        
        .animate-float-reverse {
          animation: float-reverse 25s ease-in-out infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 15s ease-in-out infinite;
        }
        
        .animate-blink {
          animation: blink 1s infinite;
        }
        
        .delay-1000 {
          animation-delay: 1000ms;
        }
        
        .bg-gradient-to-br {
          background-size: 200% 200%;
        }
      `}</style>
    </section>
  );
}

export default EnhancedHero;