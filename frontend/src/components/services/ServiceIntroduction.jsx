'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import DynamicIcon from '@/utils/DynamicIcon'
import { renderRichText } from '@/utils/helpers'

export default function EnhancedServiceIntroduction({ content, features, color = 'blue' }) {
  // Référence pour l'animation au défilement
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })
  
  // Animation de la section complète lors du défilement
  const containerOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.7, 1, 1, 0.7])
  
  // Animation du titre et du contenu
  const [contentRef, contentInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [featuresRef, featuresInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  
  // Convertir le code Unicode en emoji si nécessaire
  const getDisplayIcon = (iconStr) => {
    if (!iconStr) return null;
    if (iconStr.startsWith('U+')) {
      try {
        return String.fromCodePoint(parseInt(iconStr.replace('U+', ''), 16));
      } catch (e) {
        return null;
      }
    }
    return iconStr;
  };
  
  return (
    <section 
      ref={containerRef}
      className="py-24 relative overflow-hidden"
    >
      {/* Arrière-plan avec effet hexagonal et particules */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Pattern hexagonal */}
        <svg width="100%" height="100%" className="absolute opacity-5">
          <defs>
            <pattern id="hexagonPattern" width="50" height="43.4" patternUnits="userSpaceOnUse" patternTransform="scale(0.5)">
              <path d="M25,0 L50,14.4 L50,28.8 L25,43.4 L0,28.8 L0,14.4 Z" fill="none" stroke={`var(--color-${color})`} strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hexagonPattern)" />
        </svg>
        
        {/* Cercles dégradés */}
        <motion.div
          className="absolute top-40 right-20 w-96 h-96 rounded-full"
          style={{ 
            background: `radial-gradient(circle, rgba(var(--color-${color}), 0.05) 0%, rgba(var(--color-${color}), 0) 70%)`,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="absolute bottom-20 left-40 w-72 h-72 rounded-full"
          style={{ 
            background: `radial-gradient(circle, rgba(var(--color-purple), 0.05) 0%, rgba(var(--color-purple), 0) 70%)`,
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
            delay: 2
          }}
        />
        
        {/* Particules flottantes avec style plus technique */}
        <div className="absolute inset-0">
          {Array.from({ length: 15 }).map((_, index) => {
            const size = index % 3 === 0 ? 6 : index % 3 === 1 ? 4 : 2;
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            const delay = Math.random() * 5;
            const duration = Math.random() * 20 + 10;
            
            // Formes variées basées sur l'index
            const shape = index % 4 === 0 ? 'rounded-none' : // carré
                         index % 4 === 1 ? 'rounded-full' : // cercle
                         index % 4 === 2 ? 'rounded-sm rotate-45' : // diamant
                         'rounded-sm'; // petit carré
            
            return (
              <motion.div
                key={`particle-${index}`}
                className={`absolute ${shape}`}
                style={{
                  width: size,
                  height: size,
                  left: `${posX}%`,
                  top: `${posY}%`,
                  border: index % 5 === 0 ? `1px solid var(--color-${color})` : 'none',
                  backgroundColor: index % 3 === 0 
                    ? `var(--color-${color})`
                    : index % 3 === 1
                      ? 'var(--color-purple)'
                      : 'var(--color-red)',
                  opacity: 0.2
                }}
                animate={{
                  x: [0, Math.random() * 100 - 50, 0],
                  y: [0, Math.random() * 100 - 50, 0],
                  opacity: [0.1, 0.3, 0.1],
                  rotate: index % 2 === 0 ? [0, 180, 360] : undefined
                }}
                transition={{
                  duration,
                  delay,
                  repeat: Infinity,
                  repeatType: "mirror",
                  ease: "easeInOut"
                }}
              />
            );
          })}
        </div>
      </div>
      
      <motion.div 
        className="container relative z-10"
        style={{ opacity: containerOpacity }}
      >
        {/* En-tête stylisée */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={contentInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <motion.div
            className="flex items-center justify-center space-x-4 mb-8"
            initial={{ opacity: 0 }}
            animate={contentInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.div 
              className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent flex-1" 
              initial={{ width: 0 }}
              animate={contentInView ? { width: "100%" } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
            <motion.div 
              className={`w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-lg border border-${color}/20 relative overflow-hidden`}
              initial={{ scale: 0 }}
              animate={contentInView ? { scale: 1 } : {}}
              transition={{ 
                type: "spring",
                stiffness: 200,
                damping: 20,
                delay: 0.4
              }}
              whileHover={{ rotate: 5 }}
            >
              <motion.div
                className={`absolute inset-0 bg-${color}/5 rounded-full`}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 0, 0.5]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "mirror"
                }}
              />
              <motion.svg 
                className={`w-8 h-8 text-${color}`} 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.2, 1]
                }}
                transition={{
                  rotate: {
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                  },
                  scale: {
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "mirror"
                  }
                }}
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 8v4l3 3" />
              </motion.svg>
            </motion.div>
            <motion.div 
              className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent flex-1"
              initial={{ width: 0 }}
              animate={contentInView ? { width: "100%" } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
          </motion.div>
          
          <motion.h2
            className="text-3xl md:text-5xl font-bold text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={contentInView ? { opacity: 1, y: 0 } : {}}
            transition={{ 
              delay: 0.6,
              duration: 0.6,
              type: "spring",
              stiffness: 60
            }}
          >
            <motion.span 
              className={`relative z-10 inline-block`}
            >
              <motion.span
                className="absolute -inset-1 z-0 opacity-20 blur-lg rounded-lg"
                style={{ backgroundColor: `var(--color-${color})` }}
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.1, 0.2, 0.1]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "mirror"
                }}
              />
              <motion.span className={`relative z-10 text-${color}`}>
                À propos
              </motion.span>
            </motion.span>
            <motion.div
              className="w-full h-px my-6 bg-gradient-to-r from-transparent via-gray-200 to-transparent"
              initial={{ width: 0 }}
              animate={contentInView ? { width: "100%" } : {}}
              transition={{ duration: 1, delay: 0.9 }}
            />
            <motion.p 
              className="text-lg text-gray-600 max-w-3xl mx-auto mt-4 font-normal"
              initial={{ opacity: 0 }}
              animate={contentInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 1 }}
            >
              Découvrez ce que notre service peut vous apporter
            </motion.p>
          </motion.h2>
        </motion.div>
        
        <div className="max-w-4xl mx-auto bg-white/85 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          {/* En-tête décoratif géométrique */}
          <div className="h-1.5 bg-gradient-to-r from-blue via-purple to-red relative overflow-hidden">
            {/* Animation de pulsation lumineuse */}
            <motion.div 
              className="absolute inset-0 bg-white/30"
              initial={{ x: "-100%" }}
              animate={{ x: ["100%", "-100%"] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>
          
          <motion.div
            ref={contentRef}
            initial={{ opacity: 0, y: 20 }}
            animate={contentInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="p-8 md:p-12"
          >
            {/* Contenu riche de l'introduction avec design plus élégant */}
            <div className="prose prose-lg max-w-none relative">
              <motion.div
                initial={{ opacity: 0 }}
                animate={contentInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="relative bg-white border border-gray-100 rounded-xl p-8 shadow-sm"
              >
                {/* Points graphiques aux coins */}
                <motion.div className={`absolute top-3 left-3 w-1.5 h-1.5 rounded-full bg-${color}`} 
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.div className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-purple" 
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                />
                <motion.div className="absolute bottom-3 left-3 w-1.5 h-1.5 rounded-full bg-red" 
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                />
                <motion.div className="absolute bottom-3 right-3 w-1.5 h-1.5 rounded-full bg-purple" 
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
                />
                
                {/* Contenu avec effet de mise en évidence */}
                <div className="relative overflow-hidden">
                  {/* Effet de scan lumineux */}
                  <motion.div 
                    className="absolute top-0 h-full w-1/3 bg-gradient-to-r from-transparent via-blue/5 to-transparent pointer-events-none"
                    initial={{ left: "-30%" }}
                    animate={{ left: ["100%", "-30%"] }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      repeatDelay: 3
                    }}
                  />
                  
                  {renderRichText(content)}
                </div>
              </motion.div>
            </div>
            
            {/* Séparateur 3D avec ombre portée */}
            <motion.div 
              className="my-12 relative h-0.5"
              initial={{ opacity: 0 }}
              animate={contentInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue/20 via-purple/20 to-red/20 rounded-full shadow-sm"></div>
              <div className="absolute inset-0 -bottom-0.5 bg-gray-100/50 blur-sm rounded-full transform translate-y-0.5"></div>
            </motion.div>
            
            {/* Caractéristiques principales, si disponibles */}
            {features && features.length > 0 && (
              <motion.div
                ref={featuresRef}
                initial={{ opacity: 0 }}
                animate={featuresInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
              >
                {features.map((feature, index) => {
                  // Récupérer l'icône (emoji ou icône)
                  const displayIcon = getDisplayIcon(feature.icone);
                  const delay = 0.1 * index;
                  
                  // Alternance de couleurs pour les cartes
                  const cardColor = index % 3 === 0 ? 'blue' : index % 3 === 1 ? 'purple' : 'red';
                
                  return (
                    <motion.div 
                      key={index} 
                      initial={{ opacity: 0, y: 30, scale: 0.9 }}
                      animate={featuresInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                      transition={{ 
                        duration: 0.6, 
                        delay: delay, 
                        type: "spring",
                        stiffness: 100,
                        damping: 15
                      }}
                      whileHover={{ 
                        y: -10, 
                        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                      }}
                      className={`bg-white p-6 rounded-xl shadow-md border border-${cardColor}/10 overflow-hidden relative group`}
                    >
                      {/* Fond animé subtil */}
                      <div className="absolute inset-0 opacity-5 pointer-events-none overflow-hidden">
                        <motion.div
                          className={`absolute -inset-2 bg-gradient-to-br from-${cardColor}/20 to-transparent rounded-full blur-2xl`}
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.5, 0.8, 0.5],
                            rotate: [0, 360]
                          }}
                          transition={{
                            duration: 10,
                            repeat: Infinity,
                            repeatType: "mirror"
                          }}
                        />
                      </div>
                      
                      <motion.div 
                        className={`w-14 h-14 bg-${cardColor}/10 rounded-xl flex items-center justify-center text-${cardColor} mb-4 mx-auto relative`}
                        initial={{ scale: 0, rotate: -20 }}
                        animate={featuresInView ? { scale: 1, rotate: 0 } : {}}
                        transition={{ 
                          delay: delay + 0.2,
                          type: "spring",
                          stiffness: 200,
                          damping: 15
                        }}
                      >
                        {/* Effet de pulsation autour de l'icône */}
                        <motion.span
                          className="absolute inset-0 rounded-xl"
                          animate={{
                            boxShadow: [
                              `0 0 0 0 rgba(var(--color-${cardColor}), 0)`,
                              `0 0 0 8px rgba(var(--color-${cardColor}), 0.1)`,
                              `0 0 0 0 rgba(var(--color-${cardColor}), 0)`,
                            ]
                          }}
                          transition={{
                            duration: 2.5,
                            repeat: Infinity,
                            repeatDelay: 0.5,
                          }}
                        />
                        
                        {displayIcon ? (
                          <motion.span 
                            className="text-3xl"
                            animate={{
                              scale: [1, 1.1, 1],
                              rotate: [0, 5, 0, -5, 0]
                            }}
                            transition={{
                              duration: 5,
                              repeat: Infinity,
                              repeatType: "mirror"
                            }}
                          >
                            {displayIcon}
                          </motion.span>
                        ) : feature.icone && !feature.icone.startsWith('U+') ? (
                          <DynamicIcon 
                            icon={feature.icone} 
                            className="w-7 h-7"
                            colorClass={`text-${cardColor}`}
                          />
                        ) : (
                          <motion.svg 
                            className="w-7 h-7" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                            animate={{
                              scale: [1, 1.1, 1],
                              rotate: [0, 15, 0]
                            }}
                            transition={{
                              duration: 5,
                              repeat: Infinity,
                              repeatType: "mirror"
                            }}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </motion.svg>
                        )}
                      </motion.div>
                      
                      <motion.h3 
                        className={`text-xl font-semibold mb-2 text-center group-hover:text-${cardColor} transition-colors duration-300`}
                        initial={{ opacity: 0 }}
                        animate={featuresInView ? { opacity: 1 } : {}}
                        transition={{ delay: delay + 0.3, duration: 0.4 }}
                      >
                        {feature.titre}
                      </motion.h3>
                      
                      <motion.div 
                        className={`h-0.5 w-0 bg-gradient-to-r from-${cardColor} to-transparent rounded-full mx-auto mb-3 group-hover:w-24 transition-all duration-300`}
                        initial={{ width: 0 }}
                        animate={featuresInView ? { width: '40px' } : {}}
                        transition={{ delay: delay + 0.4, duration: 0.4 }}
                      />
                      
                      <motion.p 
                        className="text-gray-600 text-center"
                        initial={{ opacity: 0 }}
                        animate={featuresInView ? { opacity: 1 } : {}}
                        transition={{ delay: delay + 0.5, duration: 0.4 }}
                      >
                        {feature.description}
                      </motion.p>
                      
                      {/* Points lumineux aux coins */}
                      <motion.div 
                        className={`absolute top-0 left-0 w-1 h-1 rounded-full bg-${cardColor}`}
                        animate={{ opacity: [0.2, 1, 0.2] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <motion.div 
                        className={`absolute top-0 right-0 w-1 h-1 rounded-full bg-${cardColor}`}
                        animate={{ opacity: [0.2, 1, 0.2] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                      />
                      <motion.div 
                        className={`absolute bottom-0 left-0 w-1 h-1 rounded-full bg-${cardColor}`}
                        animate={{ opacity: [0.2, 1, 0.2] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                      />
                      <motion.div 
                        className={`absolute bottom-0 right-0 w-1 h-1 rounded-full bg-${cardColor}`}
                        animate={{ opacity: [0.2, 1, 0.2] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
                      />
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
            
            {/* Nouveau design d'encadré avec style techno */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={contentInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="backdrop-blur-sm p-1 rounded-2xl shadow-lg relative overflow-hidden"
              style={{
                background: `linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.9) 100%)`,
              }}
            >
              {/* Bordure dégradée animée */}
              <motion.div
                className="absolute inset-0 rounded-2xl opacity-30 pointer-events-none overflow-hidden"
                style={{ background: `linear-gradient(90deg, var(--color-${color}), var(--color-purple), var(--color-red), var(--color-${color}))`, backgroundSize: '400% 100%' }}
                animate={{ backgroundPosition: ['0% center', '100% center', '0% center'] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />
              
              {/* Contenu intérieur */}
              <div className="bg-white/90 backdrop-blur-sm rounded-xl p-8 relative z-10">
                {/* Motif de circuit imprimé */}
                <svg className="absolute inset-0 w-full h-full opacity-5" viewBox="0 0 200 200">
                  <pattern id="circuitPattern" patternUnits="userSpaceOnUse" width="40" height="40">
                    <rect width="40" height="40" fill="none" />
                    <path d="M10,0 L10,30 L30,30" stroke={`var(--color-${color})`} strokeWidth="0.5" fill="none" />
                    <circle cx="30" cy="30" r="2" stroke={`var(--color-${color})`} strokeWidth="0.5" fill="none" />
                    <circle cx="10" cy="30" r="2" stroke={`var(--color-${color})`} strokeWidth="0.5" fill="none" />
                    <circle cx="10" cy="10" r="2" stroke={`var(--color-${color})`} strokeWidth="0.5" fill="none" />
                  </pattern>
                  <rect width="100%" height="100%" fill="url(#circuitPattern)" />
                </svg>
              
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 relative z-10">
                  {/* Icône animée */}
                  <div className="md:col-span-3 flex justify-center">
                    <motion.div 
                      className="relative"
                      whileHover={{
                        scale: 1.05,
                        transition: { duration: 0.2 }
                      }}
                    >
                      {/* Cercles d'énergie pulsants */}
                      <motion.div
                        className="absolute inset-0 rounded-full"
                        animate={{
                          boxShadow: [
                            `0 0 0 4px rgba(var(--color-${color}), 0.1)`,
                            `0 0 0 12px rgba(var(--color-${color}), 0)`,
                          ]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeOut"
                        }}
                      />
                      
                      <motion.div
                        className="absolute inset-0 rounded-full"
                        animate={{
                          boxShadow: [
                            `0 0 0 8px rgba(var(--color-purple), 0.05)`,
                            `0 0 0 20px rgba(var(--color-purple), 0)`,
                          ]
                        }}
                        transition={{
                          duration: 2.5,
                          repeat: Infinity,
                          ease: "easeOut",
                          delay: 0.5
                        }}
                      />
                      
                      {/* Conteneur hexagonal */}
                      <div className="relative">
                        <svg width="105" height="120" viewBox="0 0 105 120" className="relative z-10">
                          <defs>
                            <linearGradient id="hexGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor={`var(--color-${color})`} />
                              <stop offset="100%" stopColor="var(--color-purple)" />
                            </linearGradient>
                          </defs>
                          <path 
                            d="M52.5,5 L97.5,30 L97.5,90 L52.5,115 L7.5,90 L7.5,30 Z" 
                            stroke="url(#hexGradient)" 
                            strokeWidth="2" 
                            fill="white"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        
                        {/* Icône au centre */}
                        <motion.div
                          className="absolute inset-0 flex items-center justify-center"
                          animate={{
                            scale: [1, 1.05, 1],
                            rotate: [0, 5, 0, -5, 0]
                          }}
                          transition={{
                            duration: 6,
                            repeat: Infinity,
                            repeatType: "mirror"
                          }}
                        >
                          <svg className={`w-12 h-12 text-${color}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                          </svg>
                        </motion.div>
                        
                        {/* Point lumineux qui tourne autour de l'hexagone */}
                        <motion.div
                          className={`absolute w-2 h-2 rounded-full bg-${color} shadow-lg shadow-${color}/30 z-20`}
                          style={{ 
                            top: '50%',
                            left: '50%',
                            marginLeft: '45px',
                            marginTop: '-1px'
                          }}
                          animate={{
                            rotate: [0, 360]
                          }}
                          transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: "linear"
                          }}
                          transformOrigin="center center"
                        />
                      </div>
                    </motion.div>
                  </div>
                  
                  {/* Texte */}
                  <div className="md:col-span-9">
                    <motion.h3 
                      className="text-xl font-bold mb-4 flex items-center"
                      initial={{ opacity: 0, x: -20 }}
                      animate={contentInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.5, delay: 1 }}
                    >
                      <span className={`text-${color}`}>Pourquoi choisir</span>
                      <motion.span 
                        className="ml-2 relative"
                        animate={{
                          color: [`var(--color-${color})`, "var(--color-purple)", "var(--color-red)", `var(--color-${color})`]
                        }}
                        transition={{
                          duration: 8,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                      >
                        SALLTECH
                      </motion.span>
                      <motion.span
                        className="ml-1"
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 1, repeat: Infinity, repeatDelay: 1 }}
                      >
                        _
                      </motion.span>
                    </motion.h3>
                    
                    {/* Ligne séparatrice techno */}
                    <motion.div
                      className="relative h-0.5 mb-5 overflow-hidden"
                      initial={{ width: 0 }}
                      animate={contentInView ? { width: '100%' } : {}}
                      transition={{ duration: 0.8, delay: 1.2 }}
                    >
                      <div className={`absolute inset-0 bg-gradient-to-r from-${color} to-transparent`}></div>
                      
                      {/* Effet de scan */}
                      <motion.div
                        className="absolute top-0 bottom-0 w-20 bg-white/50"
                        animate={{ x: ['-100%', '400%'] }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatDelay: 3
                        }}
                      />
                    </motion.div>
                    
                    <motion.p 
                      className="text-gray-700 mb-4"
                      initial={{ opacity: 0 }}
                      animate={contentInView ? { opacity: 1 } : {}}
                      transition={{ duration: 0.6, delay: 1.3 }}
                    >
                      Notre expertise technique combinée à notre connaissance approfondie du marché mauritanien nous permet 
                      de créer des solutions parfaitement adaptées à vos besoins spécifiques et à votre contexte local.
                    </motion.p>
                    
                    {/* Points clés avec icônes */}
                    <motion.div 
                      className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-5"
                      initial={{ opacity: 0, y: 20 }}
                      animate={contentInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.6, delay: 1.5 }}
                    >
                      <div className="flex items-center">
                        <div className={`w-8 h-8 rounded-lg bg-${color}/10 flex items-center justify-center text-${color} mr-2 flex-shrink-0`}>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                        </div>
                        <span className="text-sm">Solutions sur mesure</span>
                      </div>
                      
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-lg bg-purple/10 flex items-center justify-center text-purple mr-2 flex-shrink-0">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                        </div>
                        <span className="text-sm">Connaissance locale</span>
                      </div>
                      
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-lg bg-red/10 flex items-center justify-center text-red mr-2 flex-shrink-0">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                        </div>
                        <span className="text-sm">Support de proximité</span>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}