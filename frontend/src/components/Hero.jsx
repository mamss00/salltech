'use client'

import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CTAButton from '@/components/CTAButton';

function AnimatedHero() {
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
      icon: '🌍',
      title: 'Expertise internationale',
      description: 'Tous nos experts ont une expérience significative à l\'international'
    },
    {
      icon: '🏆',
      title: 'Expertise reconnue',
      description: 'Nos experts ont travaillé sur des projets prestigieux pour de grandes entreprises'
    },
    {
      icon: '🏢',
      title: 'Leaders locaux',
      description: 'La plus grande agence immobilière du pays nous a fait confiance'
    },
    {
      icon: '🚀',
      title: 'Présence internationale',
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
  
  // Phrases encore plus courtes pour l'effet de typing
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
    }, 4000);
    
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
    <section className="min-h-screen flex items-center pt-32 pb-16 overflow-hidden">
      <div className="container mx-auto px-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Colonne de gauche - Contenu principal */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-blue text-lg font-semibold tracking-wider uppercase mb-6"
            >
              INNOVER. CRÉER. TRANSFORMER.
            </motion.h2>
            
            <div className="mb-10 relative">
              <motion.h1 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-4xl md:text-5xl font-extrabold leading-tight"
              >
                Pour ceux qui<br />
                aiment <span className="gradient-text relative inline-block min-w-[160px] md:min-w-[200px]">
                  {text}
                  <span className={`absolute -right-2 ${isTyping ? 'animate-blink' : ''}`}>|</span>
                </span>
              </motion.h1>
            </div>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-lg text-gray-600 max-w-xl leading-relaxed mb-10"
            >
              Startup innovante à Nouakchott, nous développons des solutions digitales sur mesure 
              pour accompagner les entreprises mauritaniennes dans leur transformation numérique.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              <CTAButton 
                href="#services" 
                className="inline-flex items-center text-lg"
              >
                Découvrir nos services
              </CTAButton>
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
              className="bg-gradient-to-br from-blue to-purple rounded-xl shadow-xl overflow-hidden text-white relative z-10 backdrop-blur-sm"
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
                className="p-8 relative z-10 overflow-hidden"
                variants={containerVariants}
                initial="hidden"
                animate={animationCompleted ? "visible" : "hidden"}
                whileHover={{ 
                  boxShadow: "0 0 30px rgba(52, 152, 219, 0.2) inset",
                  transition: { duration: 0.5 }
                }}
              >
                {/* Effet de brillance occasionnel sur tout le bloc */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                  style={{ 
                    backgroundSize: "200% 100%",
                  }}
                  animate={{
                    backgroundPosition: ["100% 0%", "-100% 0%"],
                    opacity: [0, 0.7, 0]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatDelay: 5,
                    times: [0, 0.5, 1]
                  }}
                />
                
                {/* Badge d'expertise - avec animation */}
                <motion.div
                  variants={itemVariants}
                  className="inline-block px-4 py-1.5 mb-6 rounded-full border border-white/30 shadow-md overflow-hidden relative backdrop-blur-sm"
                  whileHover={{ scale: 1.05 }}
                >
                  {/* Animation de gradient qui tourne - plus prononcée */}
                  <motion.div 
                    className="absolute inset-0"
                    style={{
                      background: "linear-gradient(45deg, rgba(52, 152, 219, 0.9), rgba(155, 89, 182, 0.9), rgba(231, 76, 60, 0.9), rgba(52, 152, 219, 0.9))",
                      backgroundSize: "300% 300%",
                    }}
                    animate={{
                      backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"]
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                  
                  {/* Effet de brillance périodique */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
                    animate={{
                      x: ['-100%', '100%'],
                      opacity: [0, 0.9, 0]
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      repeatDelay: 3,
                      ease: "easeInOut",
                      times: [0, 0.5, 1]
                    }}
                  />
                  
                  {/* Particules lumineuses */}
                  {[...Array(7)].map((_, i) => (
                    <motion.div 
                      key={i}
                      className="absolute rounded-full bg-white/80"
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
                  
                  <span className="text-white font-medium text-sm relative z-10 px-1">
                    EXPERTISE INTERNATIONALE
                  </span>
                </motion.div>
                
                <motion.h2 
                  variants={itemVariants}
                  className="text-2xl md:text-3xl font-bold mb-6"
                >
                  Pourquoi nous choisir
                </motion.h2>
                
                <motion.div 
                  variants={itemVariants}
                  className="h-1 w-24 bg-white/60 mb-8"
                />
                
                {/* Points clés avec animations */}
                <motion.div 
                  variants={itemVariants}
                  className="mb-8 min-h-[120px]"
                >
                  <AnimatePresence mode="wait">
                    {keyPoints.map((point, index) => (
                      currentKey === index && (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.4 }}
                        >
                          <div className="flex items-start">
                            <div className="w-10 h-10 rounded-full bg-blue-800 flex items-center justify-center mr-4 flex-shrink-0 border border-white/30">
                              <span className="text-lg">{point.icon}</span>
                            </div>
                            <div>
                              <h3 className="text-xl font-bold mb-2">{point.title}</h3>
                              <p className="text-white">{point.description}</p>
                            </div>
                          </div>
                        </motion.div>
                      )
                    ))}
                  </AnimatePresence>
                </motion.div>
                
                {/* Points indicateurs */}
                <motion.div 
                  variants={itemVariants}
                  className="flex space-x-2 mb-8"
                >
                  {keyPoints.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setCurrentKey(index);
                        if (intervalRef.current) clearInterval(intervalRef.current);
                        intervalRef.current = setInterval(() => {
                          setCurrentKey(prev => (prev + 1) % keyPoints.length);
                        }, 4000);
                      }}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        currentKey === index ? 'bg-white scale-125' : 'bg-white/30'
                      }`}
                      aria-label={`Point ${index + 1}`}
                    />
                  ))}
                </motion.div>
                
                {/* Liste des projets avec animation - contraste amélioré */}
                <motion.div variants={itemVariants}>
                  <motion.p
                    className="text-sm text-white mb-4 font-medium"
                  >
                    Projets sur lesquels nos experts ont travaillé :
                  </motion.p>
                  <div className="flex flex-wrap gap-2">
                    {expertProjects.map((project, index) => (
                      <motion.div 
                        key={index}
                        className="bg-blue-900/80 backdrop-blur-sm px-3 py-2 rounded-lg flex items-center border border-white/30"
                        whileHover={{ 
                          scale: 1.05, 
                          backgroundColor: "rgba(30, 64, 175, 0.9)"
                        }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ 
                          opacity: 1, 
                          scale: 1,
                          transition: { delay: 1.5 + index * 0.1 }
                        }}
                      >
                        <div className="w-6 h-6 rounded-full bg-white text-blue-900 flex items-center justify-center mr-2 text-xs font-bold shadow-md">
                          {project.logo}
                        </div>
                        <span className="text-white font-medium">{project.name}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
            
            {/* Éléments décoratifs en arrière-plan */}
            <motion.div
              className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-blue/20 blur-xl"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 0.6, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.2 }}
            />
            <motion.div
              className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-purple/20 blur-xl"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 0.6, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.4 }}
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
      `}</style>
    </section>
  );
}

export default AnimatedHero;