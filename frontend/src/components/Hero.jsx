'use client'

import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import CTAButton from '@/components/CTAButton';

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

  // Effet de particules pour le fond
  const generateParticles = (count) => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      speed: Math.random() * 40 + 20
    }));
  };

  const particles = generateParticles(30);

  return (
    <section className="min-h-screen flex items-center pt-32 pb-16 overflow-hidden relative">
      {/* Fond décoratif avec effet de parallaxe */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-2/3 bg-blue/5 rounded-full blur-3xl transform translate-x-1/4 -translate-y-1/4"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-2/3 bg-purple/5 rounded-full blur-3xl transform -translate-x-1/4 translate-y-1/4"></div>
        
        {/* Grille décorative avec points */}
        <div className="absolute inset-0 opacity-20">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(52, 152, 219, 0.3)" strokeWidth="0.5" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        
        {/* Particules animées */}
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-1 h-1 rounded-full bg-blue/30"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`
            }}
            animate={{
              y: ["0%", "100%"],
              opacity: [0, 1, 0]
            }}
            transition={{
              y: {
                duration: particle.speed,
                repeat: Infinity,
                ease: "linear"
              },
              opacity: {
                duration: particle.speed * 0.8,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-5 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center min-h-[calc(100vh-8rem)]">
          {/* Colonne de gauche - Contenu principal */}
          <motion.div
            className="self-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Badge élégant */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center px-4 py-2 rounded-full bg-blue/10 border border-blue/20 shadow-sm mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-blue mr-2 animate-pulse"></span>
              <span className="text-blue text-sm font-semibold tracking-wider uppercase">
                INNOVER. CRÉER. TRANSFORMER.
              </span>
            </motion.div>
            
            <div className="mb-10 relative">
              <motion.h1 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-4xl md:text-6xl font-extrabold leading-tight"
              >
                Pour ceux qui<br />
                aiment <motion.span 
                  className="gradient-text relative inline-block min-w-[200px]"
                  initial={{ backgroundPosition: "0% 50%" }}
                  animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                >
                  {text}
                  <span className={`absolute -right-2 ${isTyping ? 'animate-blink' : ''}`}>|</span>
                </motion.span>
              </motion.h1>
            </div>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-xl text-gray-600 max-w-xl leading-relaxed mb-12"
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
                className="inline-flex items-center text-lg px-8 py-3 rounded-xl font-medium text-blue border border-blue/30 hover:bg-blue/5 transition-all duration-300"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <span>Nos réalisations</span>
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </motion.a>
            </motion.div>
            
            {/* Indicateurs de confiance */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.8 }}
              className="mt-14 flex gap-8 items-center"
            >
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((num) => (
                  <div key={num} className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center overflow-hidden shadow-md">
                    <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                ))}
                <div className="w-10 h-10 rounded-full border-2 border-white bg-blue flex items-center justify-center text-white text-xs font-bold">
                  +34
                </div>
              </div>
              <div className="text-sm text-gray-600">
                <span className="font-semibold text-gray-900">+50 clients satisfaits</span><br/>
                nous font confiance
              </div>
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
                {/* Particules d'arrière-plan */}
                <div className="absolute inset-0 overflow-hidden">
                  {[...Array(20)].map((_, i) => (
                    <motion.div 
                      key={i}
                      className="absolute w-1 h-1 rounded-full bg-white/40"
                      initial={{
                        x: Math.random() * 100 + "%",
                        y: Math.random() * 100 + "%",
                        opacity: 0.2 + Math.random() * 0.3
                      }}
                      animate={{
                        x: [
                          Math.random() * 100 + "%", 
                          Math.random() * 100 + "%",
                          Math.random() * 100 + "%"
                        ],
                        y: [
                          Math.random() * 100 + "%", 
                          Math.random() * 100 + "%",
                          Math.random() * 100 + "%"
                        ],
                        opacity: [0.2, 0.5, 0.2],
                        scale: [1, 1.5, 1]
                      }}
                      transition={{
                        duration: 5 + Math.random() * 10,
                        repeat: Infinity,
                        repeatType: "reverse"
                      }}
                    />
                  ))}
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
                  
                  {/* Badge d'expertise - avec animation */}
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
                    
                    {/* Particules lumineuses */}
                    {[...Array(5)].map((_, i) => (
                      <motion.div 
                        key={i}
                        className="absolute rounded-full bg-white/60"
                        style={{
                          width: 2 + Math.random() * 3,
                          height: 2 + Math.random() * 3,
                          top: Math.random() * 100 + "%",
                          left: Math.random() * 100 + "%",
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
                        }`} />
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

                    {/* Grille de logos plus propre */}
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
                          {/* Effet de brillance au survol */}
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
                          
                          <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center mb-2 overflow-hidden relative z-10">
                            <img 
                              src={project.logo} 
                              alt={`Logo ${project.name}`}
                              className="w-6 h-6 object-contain"
                            />
                          </div>
                          <span className="text-white/90 font-medium text-sm relative z-10">{project.name}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
              
              {/* Badge flottant */}
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
                <span className="text-xl mr-2">✨</span>
                Depuis 2019
              </motion.div>
            </motion.div>
            
            {/* Éléments décoratifs en arrière-plan */}
            <motion.div
              className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-blue/20 blur-3xl"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 0.6, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.2 }}
            />
            <motion.div
              className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full bg-purple/20 blur-3xl"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 0.6, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.4 }}
            />
            
            {/* Formes géométriques */}
            <motion.div
              className="absolute top-1/4 -left-6 w-12 h-12 border-2 border-blue/30 rounded-lg"
              initial={{ opacity: 0, rotate: 0 }}
              animate={{ 
                opacity: [0, 1, 0.5, 1, 0],
                rotate: [0, 90, 180, 270, 360],
                scale: [0.8, 1, 0.9, 1, 0.8]
              }}
              transition={{ 
                duration: 15, 
                repeat: Infinity,
                times: [0, 0.25, 0.5, 0.75, 1]
              }}
            />
            
            <motion.div
              className="absolute bottom-1/3 -right-6 w-8 h-8 border-2 border-purple/30 rounded-full"
              initial={{ opacity: 0, rotate: 0 }}
              animate={{ 
                opacity: [0, 0.7, 0.3, 0.7, 0],
                rotate: [0, -90, -180, -270, -360],
                scale: [0.8, 1.2, 0.9, 1.2, 0.8]
              }}
              transition={{ 
                duration: 12, 
                repeat: Infinity,
                times: [0, 0.25, 0.5, 0.75, 1],
                delay: 2
              }}
            />
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