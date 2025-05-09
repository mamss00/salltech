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
  
  // Pour l'effet de typing
  const [text, setText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

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
  
  // Effet de typing
  useEffect(() => {
    const typingSpeed = 100;
    const deleteSpeed = 50;
    const delayBeforeDelete = 2000;
    const delayBeforeNewPhrase = 500;
    
    let timer;
    
    if (isTyping) {
      if (charIndex < phrases[phraseIndex].length) {
        timer = setTimeout(() => {
          setText(phrases[phraseIndex].substring(0, charIndex + 1));
          setCharIndex(prev => prev + 1);
        }, typingSpeed);
      } else {
        timer = setTimeout(() => {
          setIsTyping(false);
        }, delayBeforeDelete);
      }
    } else {
      if (charIndex > 0) {
        timer = setTimeout(() => {
          setText(phrases[phraseIndex].substring(0, charIndex - 1));
          setCharIndex(prev => prev - 1);
        }, deleteSpeed);
      } else {
        timer = setTimeout(() => {
          setIsTyping(true);
          setPhraseIndex((prev) => (prev + 1) % phrases.length);
        }, delayBeforeNewPhrase);
      }
    }
    
    return () => clearTimeout(timer);
  }, [charIndex, isTyping, phraseIndex, phrases]);

  // Animation séquentielle pour le panneau de droite
  useEffect(() => {
    // Marquer l'animation comme terminée après un délai
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
            <pattern id="dotGrid" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="0.5" fill="rgba(52, 152, 219, 0.5)" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#dotGrid)" />
          </svg>
        </div>
        
        {/* Motif de lignes diagonales */}
        <div className="absolute inset-0 opacity-3">
          <svg width="100%" height="100%">
            <pattern id="diagonalLines" width="40" height="40" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <line x1="0" y1="0" x2="0" y2="40" stroke="rgba(52, 152, 219, 0.2)" strokeWidth="0.5" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#diagonalLines)" />
          </svg>
        </div>
        
        {/* Particules flottantes */}
        {particles.map((particle, index) => (
          <motion.div
            key={`particle-${index}`}
            className="absolute w-1 h-1 rounded-full bg-blue/20"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`
            }}
            animate={{
              y: [0, 100, 0],
              opacity: [0, particle.size / 4, 0],
              scale: [0, 1, 0]
            }}
            transition={{
              y: {
                duration: particle.duration,
                repeat: Infinity,
                ease: "linear"
              },
              opacity: {
                duration: particle.duration * 0.8,
                repeat: Infinity,
                ease: "easeInOut"
              },
              scale: {
                duration: particle.duration * 0.2,
                repeat: Infinity,
                ease: "easeInOut",
                repeatType: "loop"
              }
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-5 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center min-h-[calc(100vh-8rem)]">
          {/* Colonne de gauche - Contenu principal amélioré */}
          <motion.div
            className="self-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Badge élégant amélioré avec effet lumineux */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center px-5 py-2.5 rounded-full relative overflow-hidden mb-8 shadow-lg shadow-blue/10"
              style={{ background: "linear-gradient(120deg, rgba(52, 152, 219, 0.1), rgba(52, 152, 219, 0.2), rgba(52, 152, 219, 0.1))" }}
            >
              {/* Effet de brillance qui parcourt l'élément */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-blue/10 to-transparent"
                style={{ 
                  backgroundSize: "200% 100%"
                }}
                animate={{
                  backgroundPosition: ["100% 0%", "-100% 0%"],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 5
                }}
              />
              
              <motion.span 
                className="w-2.5 h-2.5 rounded-full bg-blue mr-3 relative z-10"
                animate={{ 
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                {/* Effet de halo */}
                <motion.span 
                  className="absolute inset-0 rounded-full bg-blue opacity-20"
                  animate={{
                    scale: [1, 2, 1],
                    opacity: [0.2, 0, 0.2]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.span>
              
              <span className="text-blue text-sm font-semibold tracking-wider uppercase relative z-10">
                INNOVER. CRÉER. TRANSFORMER.
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
                  <motion.span 
                    className={`absolute -right-2 h-8 w-0.5 ${isTyping ? 'opacity-100' : 'opacity-0'}`}
                    animate={{ opacity: isTyping ? [1, 0, 1] : 0 }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    style={{
                      background: "linear-gradient(to bottom, #3498db, #9b59b6, #e74c3c)"
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
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="flex flex-wrap gap-4"
            >
              <CTAButton 
                href="#services" 
                className="inline-flex items-center text-lg"
              >
                Découvrir nos services
              </CTAButton>
              
              <motion.a
                href="#portfolio"
                className="inline-flex items-center text-lg px-8 py-3 rounded-xl font-medium border transition-all duration-300 relative overflow-hidden"
                style={{ borderColor: "rgba(52, 152, 219, 0.3)", color: "#3498db" }}
                whileHover={{ 
                  scale: 1.03,
                  boxShadow: "0 4px 15px rgba(52, 152, 219, 0.1)"
                }}
                whileTap={{ scale: 0.97 }}
              >
                {/* Effet de hover animé */}
                <motion.span 
                  className="absolute inset-0 bg-blue/5 opacity-0 transition-opacity duration-300"
                  whileHover={{ opacity: 1 }}
                />
                
                <span className="relative z-10">Nos réalisations</span>
                <motion.svg 
                  className="w-5 h-5 ml-2 relative z-10" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </motion.svg>
              </motion.a>
            </motion.div>
            
            {/* Indicateurs de confiance avec effet élégant */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.8 }}
              className="mt-14 flex gap-8 items-center"
            >
              <div className="flex -space-x-3 relative">
                {[1, 2, 3, 4].map((num) => (
                  <motion.div 
                    key={num}
                    className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center overflow-hidden shadow-md relative z-10"
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 1.5 + (num * 0.1), duration: 0.5 }}
                    whileHover={{ y: -5, zIndex: 20 }}
                  >
                    <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </motion.div>
                ))}
                <motion.div 
                  className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold relative z-10"
                  style={{ background: "linear-gradient(135deg, #3498db, #2980b9)" }}
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1.9, duration: 0.5 }}
                  whileHover={{ y: -5, scale: 1.1, zIndex: 20 }}
                >
                  +34
                </motion.div>
              </div>
              <motion.div 
                className="text-sm text-gray-600"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 2, duration: 0.5 }}
              >
                <span className="font-semibold text-gray-900">+50 clients satisfaits</span><br/>
                nous font confiance
              </motion.div>
            </motion.div>
          </motion.div>
          
          {/* Colonne de droite - Carte d'expertise avec animations complexes */}
          <div className="relative">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ 
                duration: 0.8, 
                delay: 0.3,
                type: "spring",
                stiffness: 100
              }}
              className="relative z-10"
            >
              {/* Carte principale avec glassmorphism et ombres dynamiques */}
              <motion.div
                className="rounded-2xl overflow-hidden shadow-2xl backdrop-blur-xl border border-white/20 text-white"
                style={{
                  background: "linear-gradient(135deg, rgba(52, 152, 219, 0.95), rgba(155, 89, 182, 0.95))"
                }}
                whileHover={{ 
                  boxShadow: "0 25px 50px -12px rgba(52, 152, 219, 0.35), 0 10px 15px -3px rgba(52, 152, 219, 0.2)", 
                  y: -5
                }}
                transition={{ duration: 0.3 }}
              >
                {/* Particules d'arrière-plan améliorées */}
                <div className="absolute inset-0 overflow-hidden">
                  {Array.from({ length: 25 }).map((_, i) => (
                    <motion.div 
                      key={i}
                      className="absolute w-1.5 h-1.5 rounded-full"
                      style={{
                        background: i % 2 === 0 
                          ? "rgba(255, 255, 255, 0.4)" 
                          : "linear-gradient(135deg, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.2))",
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        boxShadow: i % 3 === 0 ? "0 0 5px rgba(255, 255, 255, 0.3)" : "none"
                      }}
                      initial={{
                        opacity: 0.2 + Math.random() * 0.3,
                        scale: 0.5 + Math.random() * 0.5
                      }}
                      animate={{
                        x: [
                          0,
                          (Math.random() * 40 - 20),
                          0
                        ],
                        y: [
                          0,
                          (Math.random() * 40 - 20),
                          0
                        ],
                        opacity: [
                          0.2 + Math.random() * 0.3, 
                          0.5 + Math.random() * 0.3, 
                          0.2 + Math.random() * 0.3
                        ],
                        scale: [
                          0.5 + Math.random() * 0.5,
                          0.7 + Math.random() * 0.5,
                          0.5 + Math.random() * 0.5
                        ]
                      }}
                      transition={{
                        duration: 5 + Math.random() * 10,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut"
                      }}
                    />
                  ))}
                </div>
                
                {/* Motif de fond avec grille scintillante */}
                <div className="absolute inset-0 opacity-5">
                  <svg width="100%" height="100%">
                    <pattern id="smallDots" width="20" height="20" patternUnits="userSpaceOnUse">
                      <circle cx="2" cy="2" r="1" fill="white" />
                    </pattern>
                    <rect width="100%" height="100%" fill="url(#smallDots)" />
                  </svg>
                </div>
                
                {/* Animation de gradient sur tout le conteneur */}
                <motion.div 
                  className="absolute inset-0"
                  style={{ 
                    background: "linear-gradient(135deg, rgba(52, 152, 219, 0.1), rgba(155, 89, 182, 0.1), rgba(52, 152, 219, 0.1))",
                    backgroundSize: "400% 400%",
                  }}
                  animate={{
                    backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"]
                  }}
                  transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />

                {/* Contenu avec animations séquentielles */}
                <motion.div 
                  className="p-10 relative z-10"
                  variants={containerVariants}
                  initial="hidden"
                  animate={animationCompleted ? "visible" : "hidden"}
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
                  
                  {/* Badge d'expertise - avec animation améliorée */}
                  <motion.div
                    variants={itemVariants}
                    className="inline-block px-4 py-1.5 mb-8 rounded-full border border-white/30 shadow-md overflow-hidden relative backdrop-blur-sm"
                    whileHover={{ scale: 1.05 }}
                  >
                    {/* Animation de gradient qui tourne */}
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
                    
                    {/* Particules lumineuses améliorées */}
                    {Array.from({ length: 8 }).map((_, i) => (
                      <motion.div 
                        key={i}
                        className="absolute rounded-full bg-white/60"
                        style={{
                          width: 2 + Math.random() * 3,
                          height: 2 + Math.random() * 3,
                          top: Math.random() * 100 + "%",
                          left: Math.random() * 100 + "%",
                          filter: "blur(0.5px)",
                          boxShadow: "0 0 3px rgba(255, 255, 255, 0.5)"
                        }}
                        animate={{
                          opacity: [0, 1, 0],
                          scale: [0, 1, 0],
                        }}
                        transition={{
                          duration: 1.5 + Math.random() * 2,
                          repeat: Infinity,
                          delay: Math.random() * 2,
                          ease: "easeInOut"
                        }}
                      />
                    ))}
                    
                    <span className="text-white font-medium text-sm relative z-10 px-1 flex items-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-white mr-2 animate-pulse"></span>
                      EXPERTISE RECONNUE
                    </span>
                  </motion.div>
                  
                  <motion.h2 
                    variants={itemVariants}
                    className="text-3xl md:text-4xl font-bold mb-6"
                  >
                    Pourquoi nous choisir
                  </motion.h2>
                  
                  <motion.div 
                    variants={itemVariants}
                    className="h-1 w-24 bg-white/60 mb-8 rounded-full overflow-hidden"
                  >
                    <motion.div 
                      className="h-full w-full bg-white"
                      animate={{ 
                        x: ["-100%", "100%"]
                      }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity, 
                        repeatDelay: 3 
                      }}
                    />
                  </motion.div>
                  
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
                  
                  {/* Indicateurs interactifs améliorés */}
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
                          {/* Effet visuel sur l'élément actif */}
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
                        <span className={`absolute -bottom-5 left-1/2 transform -translate-x-1/2 text-xs font-medium transition-all duration-300 whitespace-nowrap ${
                          currentKey === index ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'
                        }`}>
                          0{index + 1}
                        </span>
                      </button>
                    ))}
                  </motion.div>
                  
                  {/* Liste des projets avec animation - contraste amélioré */}
                  <motion.div variants={itemVariants}>
                    <motion.div
                      className="flex items-center mb-4"
                    >
                      <motion.div 
                        className="w-6 h-px bg-white/50 mr-3" 
                        animate={{ width: ["0%", "100%", "0%"] }}
                        transition={{ duration: 8, repeat: Infinity }}
                      />
                      <motion.p
                        className="text-sm text-white/90 font-medium uppercase tracking-wider"
                      >
                        Projets experts
                      </motion.p>
                      <motion.div 
                        className="w-6 h-px bg-white/50 ml-3" 
                        animate={{ width: ["0%", "100%", "0%"] }}
                        transition={{ duration: 8, repeat: Infinity, delay: 4 }}
                      />
                    </motion.div>

                    {/* Grille de logos plus propre et améliorée */}
                    <div className="grid grid-cols-3 gap-3">
                      {expertProjects.map((project, index) => (
                        <motion.div 
                          key={index}
                          className="bg-white/10 backdrop-blur-md p-3 rounded-xl flex flex-col items-center border border-white/20 overflow-hidden group relative"
                          whileHover={{ 
                            scale: 1.05,
                            backgroundColor: "rgba(255, 255, 255, 0.2)"
                          }}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ 
                            opacity: 1, 
                            y: 0,
                            transition: { delay: 1.5 + index * 0.1 }
                          }}
                        >
                          {/* Effet de brillance au survol amélioré */}
                          <motion.div 
                            className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                            style={{ 
                              backgroundSize: "200% 100%",
                            }}
                            animate={{
                              backgroundPosition: ["100% 0%", "-100% 0%"],
                            }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                            }}
                          />
                          
                          {/* Conteneur de logo avec effet d'ombre */}
                          <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center mb-2 overflow-hidden relative z-10 shadow-md">
                            <motion.div
                              whileHover={{ scale: 1.1 }}
                              transition={{ type: "spring", stiffness: 300, damping: 10 }}
                            >
                              <img 
                                src={project.logo} 
                                alt={`Logo ${project.name}`}
                                className="w-6 h-6 object-contain"
                              />
                            </motion.div>
                          </div>
                          <span className="text-white/90 font-medium text-sm relative z-10">{project.name}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
              
              {/* Badge flottant amélioré */}
              <motion.div
                className="absolute -top-6 -right-6 bg-gradient-to-br from-red to-purple text-white px-4 py-2 rounded-lg shadow-lg flex items-center text-sm font-medium border border-white/20 backdrop-blur-md"
                initial={{ opacity: 0, scale: 0, rotate: -10 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ 
                  delay: 2, 
                  duration: 0.5,
                  type: "spring",
                  stiffness: 200
                }}
                whileHover={{ scale: 1.05 }}
              >
                {/* Effet de pulsation */}
                <motion.div 
                  className="absolute inset-0 rounded-lg bg-gradient-to-br from-red/50 to-purple/50 z-0"
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
          </div>
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