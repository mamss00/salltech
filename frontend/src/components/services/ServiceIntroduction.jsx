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
            
            {/* Nouveau design d'encadré avec style amélioré - plus simple */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={contentInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="bg-white p-1 rounded-2xl shadow-lg relative overflow-hidden"
            >
              {/* Bordure dégradée subtile */}
              <div className="absolute inset-0 rounded-2xl opacity-20 pointer-events-none">
                <div className={`h-1 w-full bg-gradient-to-r from-${color} via-purple to-red`}></div>
              </div>
              
              {/* Contenu intérieur */}
              <div className="bg-white rounded-xl p-8 relative z-10 border border-gray-100">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 relative z-10">
                  {/* Icône simplifiée */}
                  <div className="md:col-span-3 flex justify-center">
                    <motion.div 
                      className="relative"
                      whileHover={{
                        scale: 1.05,
                        transition: { duration: 0.2 }
                      }}
                    >
                      {/* Cercle simple avec ombre légère */}
                      <motion.div
                        className={`w-20 h-20 rounded-full bg-${color}/10 flex items-center justify-center relative`}
                        animate={{
                          boxShadow: [
                            `0 0 0 0 rgba(var(--color-${color}), 0)`,
                            `0 0 0 8px rgba(var(--color-${color}), 0.05)`,
                            `0 0 0 0 rgba(var(--color-${color}), 0)`
                          ]
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        {/* Icône */}
                        <motion.svg 
                          className={`w-10 h-10 text-${color}`} 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="1.5"
                          animate={{
                            scale: [1, 1.05, 1],
                          }}
                          transition={{
                            duration: 4,
                            repeat: Infinity,
                            repeatType: "mirror"
                          }}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                        </motion.svg>
                      </motion.div>
                    </motion.div>
                  </div>
                  
                  {/* Texte */}
                  <div className="md:col-span-9">
                    <motion.h3 
                      className="text-xl font-bold mb-4"
                      initial={{ opacity: 0, x: -20 }}
                      animate={contentInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.5, delay: 1 }}
                    >
                      <span className={`text-${color}`}>Pourquoi choisir </span>
                      <span className="text-gray-800">SALLTECH</span>
                      <motion.span
                        className="ml-1 opacity-0"
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 1, repeat: Infinity, repeatDelay: 1 }}
                      >
                        _
                      </motion.span>
                    </motion.h3>
                    
                    {/* Ligne séparatrice simple */}
                    <motion.div
                      className={`h-0.5 w-0 bg-${color}/20 mb-5 rounded-full`}
                      initial={{ width: 0 }}
                      animate={contentInView ? { width: '100px' } : {}}
                      transition={{ duration: 0.8, delay: 1.2 }}
                    />
                    
                    <motion.p 
                      className="text-gray-700 mb-4"
                      initial={{ opacity: 0 }}
                      animate={contentInView ? { opacity: 1 } : {}}
                      transition={{ duration: 0.6, delay: 1.3 }}
                    >
                      Notre expertise technique combinée à notre connaissance approfondie du marché mauritanien nous permet 
                      de créer des solutions parfaitement adaptées à vos besoins spécifiques et à votre contexte local.
                    </motion.p>
                    
                    {/* Points clés avec icônes simples */}
                    <motion.div 
                      className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5"
                      initial={{ opacity: 0, y: 20 }}
                      animate={contentInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.6, delay: 1.5 }}
                    >
                      <div className="flex items-center">
                        <div className={`w-8 h-8 rounded-full bg-${color}/10 flex items-center justify-center text-${color} mr-3 flex-shrink-0`}>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                        </div>
                        <span className="text-sm text-gray-600">Solutions sur mesure</span>
                      </div>
                      
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-purple/10 flex items-center justify-center text-purple mr-3 flex-shrink-0">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                        </div>
                        <span className="text-sm text-gray-600">Connaissance locale</span>
                      </div>
                      
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-red/10 flex items-center justify-center text-red mr-3 flex-shrink-0">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                        </div>
                        <span className="text-sm text-gray-600">Support de proximité</span>
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