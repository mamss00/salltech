import React, { useEffect, useState, useRef } from 'react';
import CTAButton from '@/components/CTAButton';

function ElegantHero() {
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
    <section id="home" className="relative min-h-[80vh] flex items-center overflow-hidden pt-32 pb-8">
      {/* Arrière-plan avec effets parallaxes */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-purple/5 rounded-full blur-[100px] transform -translate-x-1/4 animate-float-slow"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-red/5 rounded-full blur-[100px] transform translate-x-1/4 animate-float-reverse"></div>
      </div>
      
      {/* Grid avec espacement approprié */}
      <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-10 relative z-10">
        {/* Colonne de gauche - Contenu principal */}
        <div className="px-6 md:px-12 flex flex-col justify-center">
          <h2 className="text-blue text-lg font-semibold tracking-wider uppercase mb-5 opacity-90">
            INNOVER. CRÉÉR. TRANSFORMER.
          </h2>
          
          {/* Titre plus compact sur une seule ligne */}
          <div className="h-[80px] mb-6 relative">
            <h1 className="text-3xl md:text-[2.5rem] font-extrabold leading-tight absolute top-0 left-0 w-full">
              Pour ceux qui aiment <span className="gradient-text inline-block relative min-w-[200px]">
                {text}
                <span className={`absolute -right-2 ${isTyping ? 'animate-blink' : ''}`}>|</span>
              </span>
            </h1>
          </div>
          
          <div className="mt-4">
            <p className="text-lg text-gray-600 max-w-[520px] leading-[1.6] mb-6">
              Startup innovante à Nouakchott, nous développons des solutions digitales sur mesure pour accompagner les entreprises mauritaniennes dans leur transformation numérique.
            </p>
          </div>
          
          <CTAButton 
            href="#services" 
            className="md:text-left text-center md:self-start inline-flex items-center py-3 px-6 text-base"
          >
            Découvrir nos services
          </CTAButton>
        </div>
        
        {/* Colonne de droite - Pourquoi nous choisir */}
        <div className="relative h-full min-h-[480px] flex items-center justify-center overflow-hidden p-5">
          {/* Background premium */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple/60 via-purple/50 to-red/40 rounded-3xl shadow-xl"></div>
          
          {/* Bordure élégante */}
          <div className="absolute inset-[1px] rounded-3xl border border-white/20"></div>
          
          {/* Effet de verre */}
          <div className="absolute inset-0 backdrop-blur-sm rounded-3xl"></div>
          
          {/* Élément lumineux qui se déplace */}
          <div className="absolute w-full h-32 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-y-[-5deg] top-1/3 -translate-y-1/2 animate-light-move"></div>
          
          {/* Points lumineux */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <div 
                key={i}
                className="absolute rounded-full bg-white"
                style={{
                  width: `${Math.random() * 3 + 1}px`,
                  height: `${Math.random() * 3 + 1}px`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  opacity: Math.random() * 0.5 + 0.2,
                  animation: `sparkle ${3 + Math.random() * 4}s infinite ${Math.random() * 5}s`
                }}
              ></div>
            ))}
          </div>
          
          {/* Container du contenu principal */}
          <div className="relative z-20 p-8 text-white w-full max-w-xl">
            {/* Badge supérieur élégant */}
            <div 
              className={`inline-block px-5 py-1.5 rounded-full text-sm font-medium mb-6 transition-all duration-500 bg-white/20 backdrop-blur-sm shadow-lg border border-white/30 ${
                animationStage >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
              }`}
            >
              EXPERTISE INTERNATIONALE
            </div>
            
            {/* Titre avec animation */}
            <h2 
              className={`text-3xl font-bold mb-3 transition-all duration-500 ${
                animationStage >= 2 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
              }`}
            >
              Pourquoi nous choisir
            </h2>
            
            {/* Ligne décorative animée */}
            <div 
              className={`h-1 rounded-full mb-6 transition-all duration-700 ease-out bg-white/60 ${
                animationStage >= 3 ? 'w-28 opacity-100' : 'w-0 opacity-0'
              }`}
            ></div>
            
            {/* Points clés avec défilement vertical */}
            <div className={`h-[140px] overflow-hidden relative mb-8 ${
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
                  {/* Icône avec style élégant */}
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mr-4 mt-1 shadow-lg backdrop-blur-sm border border-white/30">
                    <span className="text-xl">{item.icon}</span>
                  </div>
                  
                  <span>
                    <strong className="block text-xl font-semibold mb-1">{item.title}</strong>
                    <span className="text-white">{item.description}</span>
                  </span>
                </div>
              ))}
              
              {/* Points indicateurs élégants */}
              <div className="absolute -bottom-1 left-0 right-0 flex justify-center space-x-3 mt-4">
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
            
            {/* Projets avec design élégant */}
            <div className={`transition-all duration-500 ${
              animationStage >= 5 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              <p className="text-white font-medium mb-4">Projets sur lesquels nos experts ont travaillé :</p>
              <div className="flex flex-wrap gap-3">
                {expertProjects.map((project, index) => (
                  <div 
                    key={index} 
                    className="bg-white/20 rounded-xl shadow-lg transition-all duration-300 hover:-translate-y-1 border border-white/30 backdrop-blur-sm"
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-center p-2.5">
                      {/* Logo élégant */}
                      <div className="w-8 h-8 rounded-full bg-purple-500/30 border border-white/30 backdrop-blur-sm flex items-center justify-center mr-3 shadow-inner">
                        <span className="text-white font-bold text-xs">{project.logo}</span>
                      </div>
                      <div className="text-white font-medium pr-1">{project.name}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Style pour les animations */}
      <style jsx>{`
        @keyframes float-slow {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-30px, 30px); }
        }
        
        @keyframes float-reverse {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(30px, -30px); }
        }
        
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        
        @keyframes sparkle {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.5); }
        }
        
        @keyframes light-move {
          0% { transform: translateX(-100%) translateY(-50%) skewY(-5deg); }
          100% { transform: translateX(100%) translateY(-50%) skewY(-5deg); }
        }
        
        .animate-float-slow {
          animation: float-slow 20s ease-in-out infinite;
        }
        
        .animate-float-reverse {
          animation: float-reverse 25s ease-in-out infinite;
        }
        
        .animate-blink {
          animation: blink 1s infinite;
        }
        
        .animate-light-move {
          animation: light-move 10s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}

export default ElegantHero;