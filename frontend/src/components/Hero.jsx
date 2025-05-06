'use client'
import React, { useEffect, useState, useRef } from 'react';
import CTAButton from '@/components/CTAButton';

function FixedHero() {
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
  
  // Experts Projects avec logos
  const expertProjects = [
    { name: 'BMW', logo: 'M' },
    { name: 'Air France', logo: 'AF' },
    { name: 'LVMH', logo: 'LV' },
    { name: 'SAP', logo: 'S' },
    { name: 'HDI', logo: 'H' }
  ];
  
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
          setTimeout(() => {
            setIsTyping(false);
          }, delayBeforeDelete);
          return;
        }
      } else {
        setText(currentPhrase.substring(0, charIndex - 1));
        setCharIndex(prev => prev - 1);
        
        // Si on a fini de supprimer toute la phrase
        if (charIndex === 0) {
          setIsTyping(true);
          setPhraseIndex((prev) => (prev + 1) % phrases.length);
          setTimeout(() => {
            setIsTyping(true);
          }, delayBeforeNewPhrase);
          return;
        }
      }
      
    }, isTyping ? typingSpeed : deleteSpeed);
    
    return () => clearTimeout(timer);
  }, [charIndex, isTyping, phraseIndex, phrases]);

  // Animation séquentielle pour le panneau de droite
  useEffect(() => {
    // Réinitialiser l'animation au montage
    setAnimationStage(0);
    
    // Séquence d'animation progressive
    const stage1 = setTimeout(() => setAnimationStage(1), 500); 
    const stage2 = setTimeout(() => setAnimationStage(2), 800);
    const stage3 = setTimeout(() => setAnimationStage(3), 1100);
    const stage4 = setTimeout(() => setAnimationStage(4), 1400);
    const stage5 = setTimeout(() => setAnimationStage(5), 1700);
    
    // Nettoyage
    return () => {
      clearTimeout(stage1);
      clearTimeout(stage2);
      clearTimeout(stage3);
      clearTimeout(stage4);
      clearTimeout(stage5);
    };
  }, []);
  
  // Défilement automatique des points clés
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentKey(prev => (prev + 1) % keyPoints.length);
    }, 4000);
    
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden pt-32 pb-16">
      <div className="container mx-auto px-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Colonne de gauche - Contenu principal */}
          <div className="md:pr-8">
            <h2 className="text-blue text-lg font-semibold tracking-wider uppercase mb-6 animate-fade-in">
              INNOVER. CRÉER. TRANSFORMER.
            </h2>
            
            <div className="h-[140px] mb-10 md:mb-16 relative">
              <h1 className="text-4xl md:text-[3.5rem] font-extrabold leading-tight absolute top-0 left-0 w-full">
                Pour ceux qui<br />
                aiment <span className="gradient-text inline-block relative min-w-[280px]">
                  {text}
                  <span className={`absolute -right-2 ${isTyping ? 'animate-blink' : ''}`}>|</span>
                </span>
              </h1>
            </div>
            
            <div className="mt-20 md:mt-0">
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
          <div className="mt-16 md:mt-0 relative rounded-3xl overflow-hidden h-[500px] md:h-full bg-gradient-to-br from-purple-500/90 via-purple-600/80 to-pink-500/80 shadow-lg">
            {/* Particules scintillantes */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(30)].map((_, i) => (
                <div 
                  key={i}
                  className="absolute w-1 h-1 rounded-full bg-white/60"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    opacity: 0.4 + Math.random() * 0.4,
                    animation: `twinkle ${2 + Math.random() * 4}s infinite ${Math.random() * 5}s`
                  }}
                ></div>
              ))}
            </div>
            
            {/* Contenu */}
            <div className="relative z-10 p-8 md:p-10 text-white h-full flex flex-col">
              {/* Badge d'expertise */}
              <div 
                className={`transform transition-all duration-700 ease-out ${
                  animationStage >= 1 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 -translate-y-8'
                }`}
              >
                <span className="inline-block px-4 py-1.5 rounded-full bg-purple-800 text-white text-sm font-medium shadow-md">
                  EXPERTISE INTERNATIONALE
                </span>
              </div>
              
              {/* Titre principal */}
              <h2 
                className={`text-3xl font-bold mt-4 mb-4 transform transition-all duration-700 ease-out ${
                  animationStage >= 2 
                    ? 'opacity-100 translate-x-0' 
                    : 'opacity-0 -translate-x-8'
                }`}
              >
                Pourquoi nous choisir
              </h2>
              
              {/* Ligne décorative */}
              <div 
                className={`h-1 w-32 bg-white/50 mb-8 transform transition-all duration-700 ease-out ${
                  animationStage >= 3 
                    ? 'opacity-100 scale-x-100 origin-left' 
                    : 'opacity-0 scale-x-0 origin-left'
                }`}
              ></div>
              
              {/* Points clés */}
              <div 
                className={`flex-grow transition-all duration-700 ease-out ${
                  animationStage >= 4 ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <div className="relative h-32"> {/* Hauteur fixe pour contenir les points qui défilent */}
                  {keyPoints.map((item, index) => (
                    <div 
                      key={index}
                      className={`absolute top-0 left-0 right-0 transition-all duration-500 ${
                        currentKey === index 
                          ? 'opacity-100 translate-y-0' 
                          : 'opacity-0 translate-y-8 pointer-events-none'
                      }`}
                    >
                      <div className="flex items-start">
                        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mr-4 flex-shrink-0">
                          <span className="text-lg">{item.icon}</span>
                        </div>
                        <div>
                          <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                          <p className="text-white/90">{item.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Points indicateurs */}
                <div className="flex space-x-2 mt-6">
                  {keyPoints.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setCurrentKey(index);
                        // Réinitialiser le timer quand l'utilisateur clique
                        if (intervalRef.current) clearInterval(intervalRef.current);
                        intervalRef.current = setInterval(() => {
                          setCurrentKey(prev => (prev + 1) % keyPoints.length);
                        }, 4000);
                      }}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        currentKey === index ? 'bg-white' : 'bg-white/30'
                      }`}
                      aria-label={`Point ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
              
              {/* Section des projets */}
              <div 
                className={`mt-auto transition-all duration-700 ease-out ${
                  animationStage >= 5 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-8'
                }`}
              >
                <p className="text-sm text-white/90 mb-4">Projets sur lesquels nos experts ont travaillé :</p>
                <div className="flex flex-wrap gap-2">
                  {expertProjects.map((project, index) => (
                    <div 
                      key={index} 
                      className="bg-white/20 backdrop-blur-sm px-3 py-2 rounded-lg flex items-center transition-all duration-300 hover:bg-white/30"
                    >
                      <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center mr-2 text-xs font-bold">
                        {project.logo}
                      </div>
                      <span>{project.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Styles pour les animations */}
      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.5); }
        }
        
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
        }
      `}</style>
    </section>
  );
}

export default FixedHero;