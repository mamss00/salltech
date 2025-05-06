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
        
        <motion.div
          ref={contentRef}
          initial={{ opacity: 0, y: 20 }}
          animate={contentInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="p-8 md:p-12"
        >
          {/* Contenu riche de l'introduction simplifié et élégant */}
          <div className="prose prose-lg max-w-none relative">
            <motion.div
              initial={{ opacity: 0 }}
              animate={contentInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="relative bg-white shadow-sm rounded-2xl p-8 md:p-10"
            >
              {renderRichText(content)}
            </motion.div>
          </div>
          
          {/* Séparateur minimal avec ligne simple */}
          <div className="my-10 flex items-center justify-center">
            <motion.div 
              className={`h-px w-16 bg-${color}/50`}
              initial={{ width: 0 }}
              animate={contentInView ? { width: '4rem' } : {}}
              transition={{ duration: 0.8, delay: 0.7 }}
            />
          </div>
          
          {/* Section "Pourquoi choisir SALLTECH" simplifiée */}
          {features && features.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={contentInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8"
            >
              {features.map((feature, index) => {
                const displayIcon = getDisplayIcon(feature.icone);
                return (
                  <div key={index} className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-shadow duration-300">
                    <div className={`mx-auto w-12 h-12 rounded-full bg-${color}/10 flex items-center justify-center text-${color} mb-4`}>
                      {displayIcon ? (
                        <span className="text-2xl">{displayIcon}</span>
                      ) : feature.icone && !feature.icone.startsWith('U+') ? (
                        <DynamicIcon 
                          icon={feature.icone} 
                          className="w-6 h-6"
                          colorClass={`text-${color}`}
                        />
                      ) : (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      )}
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-center">{feature.titre}</h3>
                    <p className="text-gray-600 text-center">{feature.description}</p>
                  </div>
                );
              })}
            </motion.div>
          )}
          
          {/* Encadré simple et élégant */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={contentInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-white rounded-2xl shadow-sm p-8 border-t-2 border-blue"
          >
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="md:w-1/3 flex justify-center">
                <img 
                  src="/images/mauritania-map.svg" 
                  alt="Mauritanie" 
                  className="w-32 h-32 object-contain opacity-80"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22100%22%20height%3D%22100%22%20viewBox%3D%220%200%20100%20100%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22%233498db%22%20opacity%3D%220.2%22%2F%3E%3C%2Fsvg%3E';
                  }}
                />
              </div>
              
              <div className="md:w-2/3">
                <h3 className={`text-xl font-semibold mb-3 text-${color}`}>
                  Pourquoi choisir SALLTECH ?
                </h3>
                <p className="text-gray-600 mb-4">
                  Notre expertise technique combinée à notre connaissance approfondie du marché mauritanien nous permet 
                  de créer des solutions parfaitement adaptées à vos besoins spécifiques et à votre contexte local.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span className={`inline-block w-4 h-4 rounded-full bg-${color} mr-2 flex-shrink-0`}></span>
                    <span className="text-gray-700">Solutions sur mesure pour le marché mauritanien</span>
                  </li>
                  <li className="flex items-center">
                    <span className="inline-block w-4 h-4 rounded-full bg-purple mr-2 flex-shrink-0"></span>
                    <span className="text-gray-700">Équipe locale hautement qualifiée</span>
                  </li>
                  <li className="flex items-center">
                    <span className="inline-block w-4 h-4 rounded-full bg-red mr-2 flex-shrink-0"></span>
                    <span className="text-gray-700">Support et proximité garantis</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}