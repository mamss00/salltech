import React, { useEffect, useState, useRef } from 'react';
import CTAButton from '@/components/CTAButton';

function OptimizedHero() {
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
    <section id="home" className="relative min-h-[80vh] flex items-center overflow-hidden pt-36 pb-8">
      {/* Arrière-plan avec effets parallaxes */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-blue/5 rounded-full blur-[100px] transform -translate-x-1/4 animate-float-slow"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-purple/5 rounded-full blur-[100px] transform translate-x-1/4 animate-float-reverse"></div>
      </div>
      
      {/* Grid avec espacement approprié */}
      <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-6 relative z-10">
        {/* Colonne de gauche - Contenu principal */}
        <div className="px-5 md:px-10 flex flex-col justify-center">
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
        <div className="relative h-full min-h-[460px] flex items-center justify-center overflow-hidden p-4">
          {/* Background avec effet de verre amélioré */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue/40 to-purple/40 rounded-2xl backdrop-blur-md shadow-2xl border border-white/10 animate-pulse-veryslow"></div>
          
          {/* Élément lumineux qui se déplace */}
          <div className="absolute w-[120%] h-20 bg-white/30 blur-xl top-1/2 -translate-y-1/2 left-0 opacity-20 animate-light-sweep"></div>
          
          {/* Particules en arrière-plan */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(15)].map((_, i) => (
              <div 
                key={i}
                className="absolute w-1 h-1 rounded-full bg-white opacity-60"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animation: `twinkle ${2 + Math.random() * 4}s infinite ${Math.random() * 5}s`
                }}
              ></div>
            ))}
          </div>
          
          {/* Motifs géométriques améliorés */}
          <div className="absolute inset-0 opacity-10">
            <svg width="100%" height="100%" className="absolute opacity-20">
              <defs>
                <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
                  <path d="M 10 0 L 10 30 M 20 0 L 20 30 M 0 10 L 30 10 M 0 20 L 30 20" stroke="white" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>
          
          {/* Container du contenu principal avec effet de brillance */}
          <div className="relative z-20 p-6 text-white w-full max-w-xl">
            {/* Badge supérieur amélioré */}
            <div 
              className={`relative inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-5 shadow-lg transition-all duration-500 overflow-hidden ${
                animationStage >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
              }`}
            >
              {/* Fond animé du badge */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue/60 via-purple/60 to-blue/60 animate-gradient-x"></div>
              
              {/* Bordure brillante */}
              <div className="absolute inset-0 border border-white/30 rounded-full"></div>
              
              {/* Effet de brillance */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="w-20 h-full absolute top-0 -left-10 bg-white opacity-20 transform rotate-20 animate-shimmer"></div>
              </div>
              
              {/* Contenu du badge */}
              <span className="relative z-10">EXPERTISE INTERNATIONALE</span>
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
            <div className="relative h-1 mb-6 overflow-hidden">
              <div 
                className={`absolute top-0 left-0 h-full bg-gradient-to-r from-white/90 via-purple/90 to-blue/90 rounded-full transition-all duration-700 ease-out ${
                  animationStage >= 3 ? 'w-32 opacity-100' : 'w-0 opacity-0'
                }`}
              ></div>
              
              {/* Effet de pulsation sur la ligne */}
              <div 
                className="absolute top-0 left-0 h-full w-10 bg-white/80 filter blur-sm"
                style={{
                  animation: animationStage >= 3 ? 'line-pulse 3s infinite' : 'none',
                  transformOrigin: 'left'
                }}
              ></div>
            </div>
            
            {/* Points clés avec défilement vertical amélioré */}
            <div className={`h-[140px] overflow-hidden relative mb-6 ${
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
                  {/* Icône avec effets améliorés */}
                  <div className="relative w-10 h-10 flex-shrink-0 mr-4 mt-1">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/10 rounded-full animate-pulse-slow"></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-full animate-ping-slow"></div>
                    <div className="relative w-full h-full flex items-center justify-center">
                      <span className="text-xl transform hover:scale-110 transition-transform duration-300">{item.icon}</span>
                    </div>
                  </div>
                  
                  <span>
                    <strong className="block text-xl font-semibold mb-1">{item.title}</strong>
                    <span className="text-white/90">{item.description}</span>
                  </span>
                </div>
              ))}
              
              {/* Points indicateurs améliorés */}
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
                    className={`relative w-2 h-2 rounded-full transition-all duration-300 ${
                      currentKey === index ? 'bg-white scale-125' : 'bg-white/40'
                    }`}
                    aria-label={`Point ${index + 1}`}
                  >
                    {/* Effet de halo pour le point actif */}
                    {currentKey === index && (
                      <span className="absolute inset-0 bg-white rounded-full animate-ping-slow opacity-75"></span>
                    )}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Projets avec logos améliorés */}
            <div className={`transition-all duration-500 ${
              animationStage >= 5 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              <p className="text-sm text-white/90 mb-3 font-medium">Projets sur lesquels nos experts ont travaillé :</p>
              <div className="flex flex-wrap gap-2">
                {expertProjects.map((project, index) => (
                  <div 
                    key={index} 
                    className="bg-gradient-to-br from-white/30 to-white/10 rounded-xl shadow-lg transition-all duration-300 hover:-translate-y-1 group border border-white/10 overflow-hidden"
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-center p-2 relative">
                      {/* Effet de survol */}
                      <div className="absolute inset-0 bg-gradient-to-r from-blue/0 via-white/20 to-blue/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                      
                      {/* Logo avancé */}
                      <div className="relative w-7 h-7 rounded-lg bg-gradient-to-br from-blue/60 to-purple/60 flex items-center justify-center mr-2 shadow-md overflow-hidden group-hover:scale-110 transition-transform duration-300">
                        {/* Brillance sur le logo */}
                        <div className="absolute top-0 right-0 w-2 h-2 bg-white/60 rounded-full blur-[1px]"></div>
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
        
        @keyframes gradient-x {
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
        
        @keyframes pulse-veryslow {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.02); }
        }
        
        @keyframes ping-slow {
          0% { transform: scale(0.8); opacity: 0.8; }
          70%, 100% { transform: scale(1.5); opacity: 0; }
        }
        
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%) rotate(20deg); }
          100% { transform: translateX(200%) rotate(20deg); }
        }
        
        @keyframes line-pulse {
          0%, 100% { transform: scaleX(1); opacity: 0.5; }
          50% { transform: scaleX(1.2); opacity: 0.8; }
        }
        
        @keyframes light-sweep {
          0% { transform: translateX(-100%) translateY(-50%); }
          100% { transform: translateX(100%) translateY(-50%); }
        }
        
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.3); }
        }
        
        .animate-float-slow {
          animation: float-slow 20s ease-in-out infinite;
        }
        
        .animate-float-reverse {
          animation: float-reverse 25s ease-in-out infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
        
        .animate-pulse-veryslow {
          animation: pulse-veryslow 10s ease-in-out infinite;
        }
        
        .animate-ping-slow {
          animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        
        .animate-blink {
          animation: blink 1s infinite;
        }
        
        .animate-shimmer {
          animation: shimmer 3s infinite;
        }
        
        .animate-gradient-x {
          animation: gradient-x 4s ease infinite;
          background-size: 200% 100%;
        }
        
        .animate-light-sweep {
          animation: light-sweep 5s ease-in-out infinite;
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

export default OptimizedHero;