'use client'

import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import CTAButton from '@/components/CTAButton';
import ConnectionLines from '@/components/background/ConnectionLines';
import { generateParticles } from '@/components/background/GridUtils';

function EnhancedHero() {
  // Animation pour le composant de droite
  const [animationCompleted, setAnimationCompleted] = useState(false);
  
  // ✅ CORRECTION 1: Effet de typing amélioré avec hook personnalisé
  const [text, setText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isTypingActive, setIsTypingActive] = useState(true);

  // Pour le défilement vertical des points clés
  const [currentKey, setCurrentKey] = useState(0);
  const intervalRef = useRef(null);
  
  // Pour les particules d'arrière-plan
  const particles = generateParticles(30, 'blue');
  
  // Points clés qui défileront
  const keyPoints = [
    {
      icon: '🏠',
      title: 'Confiance des leaders',
      description: "L'agence d'Amelle Bacar & Esma Kane, leader du marché immobilier en Mauritanie, a choisi notre expertise pour ses projets digitaux."
    },    
    {
      icon: '🌍',
      title: 'Expertise internationale',
      description: "Nos experts disposent d'une solide expérience sur des projets à dimension internationale, en Europe, en Afrique et ailleurs."
    },
    {
      icon: '🏆',
      title: 'Références de prestige',
      description: "Nous avons accompagné des grandes entreprises sur des projets innovants à fort impact."
    },
    {
      icon: '🎓',
      title: 'Compétences certifiées',
      description: "Notre équipe cumule plus de 15 certifications technologiques reconnues mondialement."
    },
    {
      icon: '🍽️',
      title: 'Success story : AWA Event',
      description: "AWA Event, 3× champion de streetfood en Allemagne et 2ᵉ meilleur d'Europe, nous a confié la création de sa plateforme e-commerce (site & app)."
    }
  ];
  
  // Experts Projects avec logos
  const expertProjects = [
    { 
      name: 'BMW', 
      logo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/BMW.svg'
    },
    { 
      name: 'Air France', 
      logo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Air_France_Logo.svg'
    },
    { 
      name: 'SAP', 
      logo: 'https://upload.wikimedia.org/wikipedia/commons/5/59/SAP_2011_logo.svg'
    },
    { 
      name: 'HDI', 
      logo: 'https://www.hdi.de/assets/img/hdi_logo.svg'
    },
    { 
      name: 'Nordex', 
      logo: 'https://companieslogo.com/img/orig/NDX1.F-b8878605.svg'
    },
    { 
      name: 'DSAA', 
      logo: 'https://www.dsaa.eu/wp-content/uploads/DSAA-Logo-mitClaim-rgb.svg'
    }
  ];
  
  // Phrases plus courtes pour l'effet de typing
  const phrases = [
    "les sites web",
    "les apps",
    "la rigueur",
    "l'excellence", 
    "la qualité"
  ];
  
  // ✅ CORRECTION 1: Effet de typing amélioré et synchronisé
  useEffect(() => {
    const typingSpeed = 100;
    const deleteSpeed = 50;
    const delayBeforeDelete = 2000;
    const delayBeforeNewPhrase = 500;
    
    const timer = setTimeout(() => {
      const currentPhrase = phrases[phraseIndex];
      
      // Logique de typing/deleting
      if (isDeleting) {
        setText(currentPhrase.substring(0, charIndex - 1));
        setCharIndex(prev => prev - 1);
        setIsTypingActive(false);
      } else {
        setText(currentPhrase.substring(0, charIndex + 1));
        setCharIndex(prev => prev + 1);
        setIsTypingActive(true);
      }
      
      // Transitions d'état
      if (!isDeleting && charIndex === currentPhrase.length) {
        setTimeout(() => setIsDeleting(true), delayBeforeDelete);
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
      }
    }, isDeleting ? deleteSpeed : isTypingActive ? typingSpeed : typingSpeed);

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, phraseIndex, phrases, isTypingActive]);

  // Animation séquentielle pour le panneau de droite
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationCompleted(true);
    }, 2500);
    
    return () => clearTimeout(timer);
  }, []);

  // Défilement automatique des points clés
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentKey(prev => (prev + 1) % keyPoints.length);
    }, 6000);
    
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // Variants pour les animations Framer Motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  return (
    <section className="min-h-screen flex items-center pt-32 pb-16 overflow-hidden relative">
      {/* Arrière-plan amélioré */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Lignes de connexion fluides */}
        <ConnectionLines color="blue" animate={true} />
        
        {/* Cercles radials en arrière-plan */}
        <motion.div 
          className="absolute -top-40 -right-40 w-96 h-96 rounded-full"
          style={{ 
            background: "radial-gradient(circle, rgba(52, 152, 219, 0.1) 0%, rgba(52, 152, 219, 0) 70%)"
          }}
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ 
            duration: 12,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        
        <motion.div 
          className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full"
          style={{ 
            background: "radial-gradient(circle, rgba(155, 89, 182, 0.1) 0%, rgba(155, 89, 182, 0) 70%)"
          }}
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ 
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 5
          }}
        />
        
        {/* Grille subtile */}
        <div className="absolute inset-0 opacity-5">
          <svg width="100%" height="100%">
            <pattern id="dots" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="1" fill="currentColor" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#dots)" />
          </svg>
        </div>
      </div>
      
      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Partie gauche : Contenu principal */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center lg:text-left space-y-8"
          >
            {/* Badge d'intro avec animations */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center bg-gradient-to-r from-blue/10 to-purple/10 backdrop-blur-sm px-6 py-3 rounded-full border border-blue/20 shadow-lg relative overflow-hidden group"
              whileHover={{ scale: 1.02 }}
            >
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-blue/20 to-purple/20"
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 3, repeat: Infinity, repeatDelay: 5 }}
              />
              <span className="relative z-10 text-sm font-medium text-gray-700">
                ✨ STARTUP INNOVANTE • 
              </span>
              <span className="relative z-10 text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue to-purple ml-2">
                CRÉER. TRANSFORMER.
              </span>
            </motion.div>
            
            {/* Titre avec effet typing plus compact et élégant */}
            <div className="mb-10 relative">
              <motion.h1 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-3xl md:text-5xl font-extrabold leading-tight"
              >
                Pour ceux qui<br />
                aiment <motion.span 
                  className="gradient-text relative inline-block min-w-[180px]"
                  initial={{ backgroundPosition: "0% 50%" }}
                  animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                >
                  {text}
                  {/* ✅ CORRECTION 1: Curseur corrigé et synchronisé */}
                  <motion.span 
                    className="absolute -right-2 h-8 w-0.5"
                    style={{
                      background: "linear-gradient(to bottom, #3498db, #9b59b6, #e74c3c)"
                    }}
                    animate={{ 
                      opacity: isTypingActive && !isDeleting ? [1, 0, 1] : [1, 1, 1]
                    }}
                    transition={{ 
                      duration: isTypingActive && !isDeleting ? 0.8 : 0.5, 
                      repeat: Infinity,
                      repeatType: "loop"
                    }}
                  />
                </motion.span>
              </motion.h1>
              
              {/* Ligne décorative sous le titre */}
              <motion.div 
                className="h-1 w-16 mt-5 rounded-full overflow-hidden"
                style={{ background: "linear-gradient(to right, #3498db, #9b59b6)" }}
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "4rem", opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <motion.div 
                  className="h-full w-full bg-gradient-to-r from-blue via-purple to-red"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                />
              </motion.div>
            </div>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-lg text-gray-600 max-w-xl leading-relaxed mb-12"
            >
              Startup innovante à Nouakchott, nous développons des solutions digitales sur mesure 
              pour accompagner les entreprises mauritaniennes dans leur transformation numérique.
            </motion.p>
            
            {/* CTA Buttons */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <CTAButton href="#services" size="large">
                  Découvrir nos services
                </CTAButton>
              </motion.div>
              
              <motion.a
                href="#portfolio"
                className="inline-flex items-center px-8 py-4 border-2 border-gray-300 rounded-xl text-gray-700 font-medium hover:border-blue hover:text-blue transition-all duration-300 group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Voir nos réalisations
                <motion.svg 
                  className="ml-2 w-4 h-4"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </motion.svg>
              </motion.a>
            </motion.div>
          </motion.div>
          
          {/* Partie droite : Panneau d'expertise */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={animationCompleted ? "visible" : "hidden"}
            className="relative"
          >
            {/* Panneau principal d'expertise */}
            <motion.div 
              className="relative bg-gradient-to-br from-blue/90 via-purple/90 to-red/90 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20 overflow-hidden"
              variants={itemVariants}
              whileHover={{ 
                scale: 1.02,
                rotateY: 2,
                rotateX: 2
              }}
              style={{
                perspective: "1000px",
                transformStyle: "preserve-3d"
              }}
            >
              {/* Effet de brillance occasionnel sur tout le bloc */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                style={{ 
                  backgroundSize: "200% 100%",
                }}
                animate={{
                  backgroundPosition: ["100% 0%", "-100% 0%"],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatDelay: 7,
                }}
              />
              
              {/* Badge d'expertise */}
              <motion.div
                variants={itemVariants}
                className="inline-block px-4 py-1.5 mb-8 rounded-full border border-white/30 shadow-md overflow-hidden relative backdrop-blur-sm"
                whileHover={{ scale: 1.05 }}
              >
                <motion.div 
                  className="absolute inset-0"
                  style={{
                    background: "linear-gradient(45deg, rgba(52, 152, 219, 0.9), rgba(155, 89, 182, 0.9), rgba(52, 152, 219, 0.9))",
                    backgroundSize: "200% 200%",
                  }}
                  animate={{
                    backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
                
                {/* Particules lumineuses */}
                {Array.from({ length: 8 }).map((_, i) => (
                  <motion.div 
                    key={i}
                    className="absolute w-1 h-1 bg-white/60 rounded-full"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      scale: [0, 1, 0],
                      opacity: [0, 1, 0]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.3
                    }}
                  />
                ))}
                
                <span className="relative z-10 text-white font-medium text-sm">
                  EXPERTISE RECONNUE
                </span>
              </motion.div>
              
              {/* Titre principal */}
              <motion.h2 
                variants={itemVariants}
                className="text-3xl font-bold text-white mb-8"
              >
                Pourquoi nous choisir
                <motion.span 
                  className="inline-block ml-2"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                >
                  🏆
                </motion.span>
              </motion.h2>
              
              {/* Points clés avec animations */}
              <motion.div 
                variants={itemVariants}
                className="mb-8 min-h-[140px] relative"
              >
                <AnimatePresence mode="wait">
                  {keyPoints.map((point, index) => (
                    currentKey === index && (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ 
                          type: "spring",
                          stiffness: 300,
                          damping: 30
                        }}
                        className="absolute inset-0"
                      >
                        <div className="flex items-start">
                          <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center mr-4 flex-shrink-0 border border-white/30 shadow-lg">
                            <motion.span 
                              className="text-xl"
                              animate={{ 
                                scale: [1, 1.2, 1],
                                rotate: [0, 5, 0, -5, 0]
                              }}
                              transition={{
                                duration: 3,
                                repeat: Infinity,
                                repeatType: "reverse"
                              }}
                            >
                              {point.icon}
                            </motion.span>
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold mb-3 flex items-center">
                              {point.title}
                              <motion.span 
                                className="ml-2 w-2 h-2 rounded-full bg-white/70 inline-block"
                                animate={{ scale: [1, 1.5, 1], opacity: [0.7, 1, 0.7] }}
                                transition={{ duration: 2, repeat: Infinity }}
                              />
                            </h3>
                            <p className="text-white/90 text-lg leading-relaxed">{point.description}</p>
                          </div>
                        </div>
                      </motion.div>
                    )
                  ))}
                </AnimatePresence>
              </motion.div>
              
              {/* Indicateurs interactifs */}
              <motion.div 
                variants={itemVariants}
                className="flex space-x-2 mb-10"
              >
                {keyPoints.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentKey(index);
                      if (intervalRef.current) clearInterval(intervalRef.current);
                      intervalRef.current = setInterval(() => {
                        setCurrentKey(prev => (prev + 1) % keyPoints.length);
                      }, 6000);
                    }}
                    className="group relative"
                  >
                    <span className={`block w-8 h-1 rounded-full transition-all duration-300 ${
                      currentKey === index ? 'bg-white' : 'bg-white/30'
                    }`}>
                      {currentKey === index && (
                        <motion.span 
                          className="absolute inset-0 rounded-full bg-white/50"
                          animate={{ 
                            scale: [1, 1.5, 1],
                            opacity: [0.5, 0, 0.5]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity
                          }}
                        />
                      )}
                    </span>
                  </button>
                ))}
              </motion.div>
              
              {/* Section projets experts */}
              <motion.div variants={itemVariants}>
                <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                  <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                    01020304
                  </span>
                  <motion.span 
                    className="mx-2 text-2xl"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    05
                  </motion.span>
                  <span className="text-white/90">Projets experts</span>
                </h3>
                
                {/* Logos des entreprises */}
                <div className="grid grid-cols-3 gap-4">
                  {expertProjects.map((project, index) => (
                    <motion.div
                      key={project.name}
                      className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20 hover:bg-white/20 transition-all duration-300 group"
                      whileHover={{ scale: 1.05, y: -2 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 + 1 }}
                    >
                      <div className="h-8 flex items-center justify-center">
                        <span className="text-white/80 text-xs font-medium group-hover:text-white transition-colors">
                          {project.name}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
            
            {/* ✅ CORRECTION 2: Badge "Depuis 2019" avec z-index corrigé */}
            <motion.div 
              className="absolute -bottom-6 right-8 z-10" // Z-INDEX RÉDUIT de z-40 à z-10
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ 
                opacity: animationCompleted ? 1 : 0,
                scale: animationCompleted ? 1 : 0.8,
                y: animationCompleted ? 0 : 20
              }}
              transition={{ duration: 0.8, delay: 2.2 }}
              whileHover={{ scale: 1.1 }}
            >
              <motion.div 
                className="flex items-center bg-gradient-to-r from-red/70 to-purple/70 backdrop-blur-md text-white px-4 py-2 rounded-full shadow-lg border border-white/20 relative overflow-hidden"
                whileHover={{ 
                  boxShadow: "0 10px 25px rgba(0,0,0,0.15)"
                }}
              >
                {/* Effet de fond animé */}
                <motion.div 
                  className="absolute inset-0 rounded-lg bg-gradient-to-br from-red/50 to-purple/50"
                  animate={{ 
                    opacity: [0.7, 0.4, 0.7]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <span className="text-xl mr-2 relative z-10">✨</span>
                <span className="relative z-10">Depuis 2019</span>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Styles pour les animations */}
      <style jsx>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        
        .animate-blink {
          animation: blink 1s infinite;
        }
        
        @keyframes floatingCircle {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        
        .animate-float {
          animation: floatingCircle 5s ease-in-out infinite;
        }
        
        @keyframes pulse-ring {
          0% { transform: scale(0.8); opacity: 0.2; }
          50% { transform: scale(1.2); opacity: 0.5; }
          100% { transform: scale(0.8); opacity: 0.2; }
        }
        
        .animate-pulse-ring {
          animation: pulse-ring 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </section>
  );
}

export default EnhancedHero;
