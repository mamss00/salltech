'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import DynamicIcon from '@/utils/DynamicIcon'
import { renderRichText } from '@/utils/helpers'

export default function ServiceIntroduction({ content, features, color = 'blue' }) {
  // Animation au défilement
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })
  
  // Transformations basées sur le défilement
  const contentOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.85, 1, 1, 0.85])
  
  // Animations à l'entrée dans le viewport
  const [titleRef, titleInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [contentRef, contentInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [infoRef, infoInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  
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
      className="py-20 relative overflow-hidden bg-gray-50"
    >
      {/* Background avec motif subtil */}
      <div className="absolute inset-0 z-0 opacity-20">
        <svg width="100%" height="100%">
          <pattern 
            id="diagonalLines" 
            width="40" 
            height="40" 
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(45)"
          >
            <line 
              x1="0" 
              y1="0" 
              x2="0" 
              y2="40" 
              stroke={`var(--color-${color})`} 
              strokeWidth="0.5" 
            />
          </pattern>
          <rect width="100%" height="100%" fill="url(#diagonalLines)" />
        </svg>
        
        {/* Cercles décoratifs */}
        <motion.div 
          className={`absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-${color}/5 blur-3xl`}
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.15, 0.1]
          }}
          transition={{ 
            duration: 15,
            repeat: Infinity,
            repeatType: "mirror"
          }}
        />
        
        <motion.div 
          className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full bg-purple/5 blur-3xl"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.15, 0.1]
          }}
          transition={{ 
            duration: 12,
            repeat: Infinity,
            repeatType: "mirror",
            delay: 3
          }}
        />
      </div>
      
      <motion.div 
        className="container relative z-10"
        style={{ opacity: contentOpacity }}
      >
        <div className="max-w-4xl mx-auto">
          {/* Titre animé */}
          <motion.div
            ref={titleRef}
            initial={{ opacity: 0, y: 30 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <motion.div 
              className="inline-block px-6 py-2 rounded-full bg-white text-sm font-medium text-gray-600 shadow-sm mb-4"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={titleInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.5 }}
            >
              {color === 'blue' ? 'PRÉSENTATION' : color === 'purple' ? 'INTRODUCTION' : 'DÉTAILS'}
            </motion.div>
            
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-2"
              initial={{ opacity: 0 }}
              animate={titleInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <motion.span 
                className={`text-${color}`}
                animate={{ 
                  textShadow: [
                    '0 0 0px rgba(0,0,0,0)',
                    `0 0 10px rgba(var(--color-${color}), 0.5)`,
                    '0 0 0px rgba(0,0,0,0)'
                  ]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "mirror"
                }}
              >
                À propos
              </motion.span>{' '}
              du service
            </motion.h2>
            
            <motion.div 
              className={`h-1 w-24 bg-${color} mx-auto rounded-full my-6`}
              initial={{ width: 0, opacity: 0 }}
              animate={titleInView ? { width: '6rem', opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            />
          </motion.div>
          
          {/* Contenu principal animé */}
          <motion.div
            ref={contentRef}
            initial={{ opacity: 0, y: 30 }}
            animate={contentInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden mb-10"
          >
            <div className="relative">
              {/* Barre supérieure subtile mais visible */}
              <div className={`h-1 bg-gradient-to-r from-${color}/30 to-purple/20 w-full`}></div>
              
              {/* Contenu avec animation subtile */}
              <div className="p-8 lg:p-10 relative overflow-hidden">
                {/* Effet de dégradé animé sur le côté */}
                <motion.div 
                  className="absolute top-0 bottom-0 w-24 bg-gradient-to-r from-transparent via-blue/5 to-transparent"
                  initial={{ opacity: 0, left: "-100%" }}
                  animate={{ opacity: 1, left: ["100%", "-100%"] }}
                  transition={{ 
                    duration: 10, 
                    ease: "easeInOut", 
                    repeat: Infinity,
                    repeatDelay: 5
                  }}
                />
                
                <motion.div 
                  className="prose prose-lg max-w-none"
                  initial={{ opacity: 0 }}
                  animate={contentInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  {/* Effet de surlignage aléatoire sur les paragraphes */}
                  <div className="relative">
                    {renderRichText(content)}
                    
                    {/* Points lumineux animés dans les coins */}
                    <motion.div 
                      className={`absolute top-2 left-2 w-1 h-1 rounded-full bg-${color}/70`}
                      animate={{ 
                        opacity: [0.4, 0.8, 0.4],
                        scale: [1, 1.2, 1]
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        repeatType: "mirror"
                      }}
                    />
                    
                    <motion.div 
                      className="absolute top-2 right-2 w-1 h-1 rounded-full bg-purple/70"
                      animate={{ 
                        opacity: [0.4, 0.8, 0.4],
                        scale: [1, 1.2, 1]
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        repeatType: "mirror",
                        delay: 1
                      }}
                    />
                    
                    <motion.div 
                      className="absolute bottom-2 left-2 w-1 h-1 rounded-full bg-red/70"
                      animate={{ 
                        opacity: [0.4, 0.8, 0.4],
                        scale: [1, 1.2, 1]
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        repeatType: "mirror",
                        delay: 2
                      }}
                    />
                    
                    <motion.div 
                      className="absolute bottom-2 right-2 w-1 h-1 rounded-full bg-purple/70"
                      animate={{ 
                        opacity: [0.4, 0.8, 0.4],
                        scale: [1, 1.2, 1]
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        repeatType: "mirror",
                        delay: 3
                      }}
                    />
                  </div>
                </motion.div>
              </div>
            </div>
            
            {/* Section Pourquoi choisir SALLTECH */}
            <motion.div
              ref={infoRef}
              initial={{ opacity: 0 }}
              animate={infoInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-gray-50 border-t border-gray-100 p-8 lg:p-10"
            >
              <div className="flex flex-col md:flex-row md:items-center">
                {/* Icône animée */}
                <motion.div 
                  className="mb-6 md:mb-0 md:mr-10"
                  initial={{ scale: 0 }}
                  animate={infoInView ? { scale: 1 } : {}}
                  transition={{ 
                    type: "spring", 
                    stiffness: 260, 
                    damping: 20, 
                    delay: 0.4 
                  }}
                >
                  <motion.div 
                    className={`w-16 h-16 rounded-xl bg-gradient-to-br from-${color} to-purple flex items-center justify-center text-white shadow-md relative overflow-hidden`}
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    {/* Effet de surbrillance */}
                    <motion.div
                      className="absolute inset-0 bg-white opacity-0"
                      animate={{ 
                        opacity: [0, 0.3, 0],
                        x: ['-100%', '100%'] 
                      }}
                      transition={{ 
                        duration: 1.5, 
                        repeat: Infinity, 
                        repeatDelay: 3 
                      }}
                    />
                    
                    <svg className="w-8 h-8 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                    </svg>
                  </motion.div>
                </motion.div>
                
                {/* Texte */}
                <div>
                  <motion.h3 
                    className={`text-xl font-bold mb-3 text-${color}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={infoInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    Pourquoi choisir SALLTECH ?
                  </motion.h3>
                  
                  <motion.p 
                    className="text-gray-700 mb-6"
                    initial={{ opacity: 0 }}
                    animate={infoInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.6 }}
                  >
                    Notre expertise technique combinée à notre connaissance approfondie du marché mauritanien nous permet 
                    de créer des solutions parfaitement adaptées à vos besoins spécifiques et à votre contexte local.
                  </motion.p>
                  
                  {/* Points clés */}
                  <motion.div 
                    className="grid grid-cols-1 md:grid-cols-3 gap-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={infoInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.7 }}
                  >
                    <motion.div 
                      className="flex items-start"
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <motion.div 
                        className={`mr-3 w-6 h-6 rounded-full bg-${color}/10 flex items-center justify-center text-${color} flex-shrink-0 mt-0.5`}
                        whileHover={{ scale: 1.2, backgroundColor: `var(--color-${color})`, color: 'white' }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </motion.div>
                      <span className="text-gray-700">Solutions sur mesure</span>
                    </motion.div>
                    
                    <motion.div 
                      className="flex items-start"
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <motion.div 
                        className="mr-3 w-6 h-6 rounded-full bg-purple/10 flex items-center justify-center text-purple flex-shrink-0 mt-0.5"
                        whileHover={{ scale: 1.2, backgroundColor: 'var(--color-purple)', color: 'white' }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </motion.div>
                      <span className="text-gray-700">Connaissance locale</span>
                    </motion.div>
                    
                    <motion.div 
                      className="flex items-start"
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <motion.div 
                        className="mr-3 w-6 h-6 rounded-full bg-red/10 flex items-center justify-center text-red flex-shrink-0 mt-0.5"
                        whileHover={{ scale: 1.2, backgroundColor: 'var(--color-red)', color: 'white' }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </motion.div>
                      <span className="text-gray-700">Support de proximité</span>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Caractéristiques avec animations */}
          {features && features.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => {
                const displayIcon = getDisplayIcon(feature.icone);
                
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    animate={contentInView ? { 
                      opacity: 1, 
                      y: 0,
                      transition: { 
                        delay: 0.2 + (index * 0.1),
                        duration: 0.6,
                        type: "spring",
                        stiffness: 100,
                        damping: 15
                      }
                    } : {}}
                    whileHover={{ 
                      y: -10,
                      transition: { type: "spring", stiffness: 400, damping: 15 }
                    }}
                    className="bg-white rounded-xl shadow-md overflow-hidden"
                  >
                    <div className="p-6">
                      <motion.div 
                        className={`w-12 h-12 rounded-lg bg-${color}/10 flex items-center justify-center text-${color} mb-4 mx-auto`}
                        whileHover={{ 
                          scale: 1.1, 
                          rotate: 5,
                          backgroundColor: `var(--color-${color})`,
                          color: 'white'
                        }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        {displayIcon ? (
                          <span className="text-2xl">{displayIcon}</span>
                        ) : feature.icone && !feature.icone.startsWith('U+') ? (
                          <DynamicIcon 
                            icon={feature.icone} 
                            className="w-6 h-6"
                            colorClass={`text-current`}
                          />
                        ) : (
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                        )}
                      </motion.div>
                      
                      <h3 className="text-xl font-bold mb-2 text-center">{feature.titre}</h3>
                      
                      <motion.div 
                        className={`h-0.5 w-12 bg-${color}/40 mx-auto mb-3`}
                        whileHover={{ width: '50%' }}
                        transition={{ duration: 0.3 }}
                      />
                      
                      <p className="text-gray-600 text-center">{feature.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </motion.div>
    </section>
  )
}