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
      {/* Arrière-plan avec animation subtile */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Vagues abstraites animées */}
        <svg className="absolute top-0 left-0 w-full h-full opacity-5" viewBox="0 0 1200 800" preserveAspectRatio="none">
          <motion.path
            d="M 0,100 C 200,300 800,100 1200,250 L 1200,800 L 0,800 Z"
            fill={`var(--color-${color})`}
            animate={{
              d: [
                "M 0,100 C 200,300 800,100 1200,250 L 1200,800 L 0,800 Z",
                "M 0,150 C 300,250 600,150 1200,300 L 1200,800 L 0,800 Z",
                "M 0,100 C 200,300 800,100 1200,250 L 1200,800 L 0,800 Z"
              ]
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut"
            }}
          />
          
          <motion.path
            d="M 0,400 C 300,330 600,450 1200,400 L 1200,800 L 0,800 Z"
            fill="var(--color-purple)"
            opacity="0.05"
            animate={{
              d: [
                "M 0,400 C 300,330 600,450 1200,400 L 1200,800 L 0,800 Z",
                "M 0,350 C 200,450 800,350 1200,450 L 1200,800 L 0,800 Z",
                "M 0,400 C 300,330 600,450 1200,400 L 1200,800 L 0,800 Z"
              ]
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut"
            }}
          />
        </svg>
        
        {/* Particules flottantes */}
        <div className="absolute inset-0">
          {Array.from({ length: 20 }).map((_, index) => {
            const size = Math.random() * 6 + 2;
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            const delay = Math.random() * 5;
            const duration = Math.random() * 20 + 10;
            
            return (
              <motion.div
                key={`particle-${index}`}
                className="absolute rounded-full"
                style={{
                  width: size,
                  height: size,
                  left: `${posX}%`,
                  top: `${posY}%`,
                  backgroundColor: index % 3 === 0 
                    ? `var(--color-${color})`
                    : index % 3 === 1
                      ? 'var(--color-purple)'
                      : 'var(--color-red)',
                  opacity: 0.3
                }}
                animate={{
                  x: [0, Math.random() * 100 - 50, 0],
                  y: [0, Math.random() * 100 - 50, 0],
                  opacity: [0.1, 0.3, 0.1]
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
          className="text-center mb-12"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={contentInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-block px-6 py-2 rounded-full bg-gradient-to-r from-gray-50 to-white shadow-sm border border-gray-100 text-sm font-medium text-gray-600 mb-4"
          >
            INTRODUCTION
          </motion.span>
          
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={contentInView ? { opacity: 1, y: 0 } : {}}
            transition={{ 
              delay: 0.4,
              duration: 0.6,
              type: "spring",
              stiffness: 60
            }}
          >
            <span>À propos de </span>
            <motion.span 
              className={`text-${color} relative`}
              animate={{ 
                textShadow: [
                  `0 0 0px transparent`,
                  `0 0 10px var(--color-${color}, #3498db)`,
                  `0 0 0px transparent`
                ] 
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                repeatType: "mirror"
              }}
            >
              ce service
              <motion.span
                className={`absolute -bottom-2 left-0 right-0 h-1 bg-${color} rounded-full`}
                initial={{ width: 0 }}
                animate={contentInView ? { width: "100%" } : {}}
                transition={{ 
                  delay: 0.8, 
                  duration: 0.8, 
                  ease: "easeOut" 
                }}
              />
            </motion.span>
          </motion.h2>
        </motion.div>
        
        <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          {/* En-tête décoratif */}
          <div className="relative h-[2px]">
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-blue/40 via-purple/40 to-red/40 animate-gradient-shift bg-[length:200%_auto]"></div>
            <div className="absolute bottom-0 inset-x-0 h-px bg-white/80"></div>
          </div>
          
          <motion.div
            ref={contentRef}
            initial={{ opacity: 0, y: 20 }}
            animate={contentInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="p-8 md:p-12"
          >
            {/* Contenu riche de l'introduction avec animation de mise en évidence */}
            <div className="prose prose-lg max-w-none relative">
              <motion.div
                initial={{ opacity: 0 }}
                animate={contentInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="relative"
              >
                {/* Effet de surlignage élégant */}
                <motion.div 
                  className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: [0, 0.05, 0],
                    x: ["-100%", "100%"],
                  }}
                  transition={{
                    opacity: { 
                      duration: 1.5, 
                      ease: "easeInOut",
                      repeat: Infinity,
                      repeatDelay: 5
                    },
                    x: { 
                      duration: 1.5, 
                      ease: "easeInOut",
                      repeat: Infinity,
                      repeatDelay: 5
                    }
                  }}
                >
                  <div className="h-full w-full bg-gradient-to-r from-transparent via-blue/10 to-transparent" />
                </motion.div>
                
                {renderRichText(content)}
              </motion.div>
            </div>
            
            {/* Ligne séparatrice élégante */}
            <motion.div 
              className="my-10"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={contentInView ? { opacity: 1, scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <div className="h-px w-full bg-gradient-to-r from-blue/20 via-purple/20 to-red/20"></div>
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
            
            {/* Encadré d'information amélioré */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={contentInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="bg-gradient-to-br from-gray-50 via-white to-gray-50 p-8 rounded-2xl shadow-lg border border-gray-100 relative overflow-hidden"
            >
              {/* Motif de fond technique */}
              <svg className="absolute inset-0 w-full h-full opacity-5" viewBox="0 0 300 300">
                <pattern id="gridPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                  <circle cx="10" cy="10" r="0.5" fill={`var(--color-${color})`} />
                </pattern>
                <rect width="100%" height="100%" fill="url(#gridPattern)" />
              </svg>
              
              <div className="flex flex-col md:flex-row items-center relative z-10">
                <motion.div 
                  className="mb-6 md:mb-0 md:mr-10"
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
                >
                  <motion.div 
                    className={`w-20 h-20 bg-gradient-to-br from-${color} to-purple rounded-2xl flex items-center justify-center text-white shadow-lg relative overflow-hidden`}
                    animate={{ scale: [1, 1.03, 1] }}
                    transition={{ duration: 5, repeat: Infinity, repeatType: "mirror" }}
                  >
                    {/* Particules internes */}
                    <motion.div
                      className="absolute w-2 h-2 bg-white rounded-full"
                      animate={{
                        x: [0, Math.random() * 20 - 10, 0],
                        y: [0, Math.random() * 20 - 10, 0],
                        opacity: [0.2, 0.7, 0.2]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatType: "mirror"
                      }}
                    />
                    
                    <motion.div
                      className="absolute w-1.5 h-1.5 bg-white rounded-full"
                      style={{ left: '60%', top: '30%' }}
                      animate={{
                        x: [0, Math.random() * 15 - 7, 0],
                        y: [0, Math.random() * 15 - 7, 0],
                        opacity: [0.2, 0.6, 0.2]
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        repeatType: "mirror",
                        delay: 1
                      }}
                    />
                    
                    {/* Icône animée */}
                    <motion.svg 
                      className="w-10 h-10 relative z-10" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                      animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, 10, 0, -10, 0]
                      }}
                      transition={{
                        duration: 6,
                        repeat: Infinity,
                        repeatType: "mirror"
                      }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"></path>
                    </motion.svg>
                  </motion.div>
                </motion.div>
                
                <div className="text-left">
                  <motion.h3 
                    className="text-xl font-semibold mb-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={contentInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 1 }}
                  >
                    Pourquoi choisir <span className={`text-${color}`}>SALLTECH</span> ?
                  </motion.h3>
                  
                  <motion.div 
                    className={`h-0.5 w-0 bg-gradient-to-r from-${color} via-purple to-red mb-4`}
                    initial={{ width: 0 }}
                    animate={contentInView ? { width: '80px' } : {}}
                    transition={{ duration: 0.6, delay: 1.1 }}
                  />
                  
                  <motion.p 
                    className="text-gray-600"
                    initial={{ opacity: 0 }}
                    animate={contentInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.6, delay: 1.2 }}
                  >
                    Notre expertise technique combinée à notre connaissance approfondie du marché mauritanien nous permet 
                    de créer des solutions parfaitement adaptées à vos besoins spécifiques et à votre contexte local.
                  </motion.p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}