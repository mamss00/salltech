'use client'

import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export default function EnhancedServiceProcess({ steps, color = 'blue' }) {
  // État pour suivre l'étape en focus
  const [focusedStep, setFocusedStep] = useState(null)
  
  // Référence pour l'animation au défilement
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })
  
  // Animations avancées basées sur le défilement
  const containerOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0.7, 1, 1, 0.7])
  const titleScale = useTransform(scrollYProgress, [0, 0.1], [0.95, 1])
  const pathLength = useTransform(scrollYProgress, [0.05, 0.9], [0, 1])
  
  // Animation du titre
  const [titleRef, titleInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  
  // Trier les étapes par numéro
  const sortedSteps = [...steps].sort((a, b) => a.numero - b.numero)
  
  // Générer des couleurs pour le dégradé basées sur la couleur principale
  const getStepColors = (index) => {
    const colors = {
      blue: ['from-blue-50', 'to-blue-100', 'border-blue-200', 'bg-blue', 'text-blue-600'],
      purple: ['from-purple-50', 'to-purple-100', 'border-purple-200', 'bg-purple', 'text-purple-600'],
      red: ['from-red-50', 'to-red-100', 'border-red-200', 'bg-red', 'text-red-600']
    }
    
    // Choisir les couleurs en fonction de l'étape pour varier l'apparence
    if (index % 3 === 0) return colors[color] || colors.blue
    if (index % 3 === 1) return colors.purple
    return colors.red
  }
  
  // Générer des couleurs d'arrière-plan pour les particules
  const getParticleColor = (index) => {
    const colors = {
      blue: ['rgba(52, 152, 219, 0.7)', 'rgba(52, 152, 219, 0.3)'],
      purple: ['rgba(155, 89, 182, 0.7)', 'rgba(155, 89, 182, 0.3)'],
      red: ['rgba(231, 76, 60, 0.7)', 'rgba(231, 76, 60, 0.3)']
    }
    
    if (index % 3 === 0) return colors[color] || colors.blue
    if (index % 3 === 1) return colors.purple
    return colors.red
  }
  
  if (!steps || steps.length === 0) {
    return null
  }

  return (
    <section 
      ref={containerRef}
      className="py-24 relative overflow-hidden bg-gradient-to-b from-white to-gray-50"
    >
      {/* Effet de particules interactives */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <svg className="absolute top-0 left-0 w-full h-full opacity-5" viewBox="0 0 800 1200">
          <rect width="800" height="1200" fill="none" />
          <g>
            <g transform="rotate(45 400 600)">
              <rect x="100" y="100" width="600" height="1000" stroke={`var(--color-${color})`} strokeWidth="1" fill="none" />
              <rect x="150" y="150" width="500" height="900" stroke={`var(--color-${color})`} strokeWidth="1" fill="none" />
              <rect x="200" y="200" width="400" height="800" stroke={`var(--color-${color})`} strokeWidth="1" fill="none" />
              <rect x="250" y="250" width="300" height="700" stroke={`var(--color-${color})`} strokeWidth="1" fill="none" />
              <rect x="300" y="300" width="200" height="600" stroke={`var(--color-${color})`} strokeWidth="1" fill="none" />
            </g>
          </g>
          
          {/* Particules animées */}
          {Array.from({ length: 20 }).map((_, i) => {
            const x = Math.random() * 800
            const y = Math.random() * 1200
            const size = Math.random() * 5 + 2
            const delay = Math.random() * 5
            const duration = Math.random() * 10 + 10
            const opacity = Math.random() * 0.5 + 0.2
            
            return (
              <motion.circle
                key={`particle-${i}`}
                cx={x}
                cy={y}
                r={size}
                fill={`var(--color-${i % 3 === 0 ? color : i % 3 === 1 ? 'purple' : 'red'})`}
                initial={{ opacity }}
                animate={{
                  opacity: [opacity, opacity * 1.5, opacity],
                  scale: [1, 1.2, 1],
                  cx: [x, x + Math.random() * 100 - 50, x],
                  cy: [y, y + Math.random() * 100 - 50, y]
                }}
                transition={{
                  duration,
                  delay,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                }}
              />
            )
          })}
        </svg>
      </div>
      
      <motion.div 
        className="container relative z-10"
        style={{ opacity: containerOpacity }}
      >
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
          style={{ scale: titleScale }}
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8, filter: "blur(4px)" }}
            animate={titleInView ? { 
              opacity: 1, 
              scale: 1, 
              filter: "blur(0px)",
              transition: { 
                delay: 0.2, 
                duration: 0.5,
                type: "spring",
                stiffness: 100
              }
            } : {}}
            className="inline-block px-6 py-2 rounded-full bg-gradient-to-r from-gray-50 to-white shadow-sm border border-gray-100 text-sm font-medium text-gray-600 mb-4"
          >
            MÉTHODOLOGIE
          </motion.span>
          
          <motion.h2
            className="text-3xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ 
              delay: 0.4,
              duration: 0.6,
              type: "spring",
              stiffness: 60
            }}
          >
            <span>Notre </span>
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
              Processus
              <motion.span
                className={`absolute -bottom-2 left-0 right-0 h-1 bg-${color} rounded-full`}
                initial={{ width: 0 }}
                animate={titleInView ? { width: "100%" } : {}}
                transition={{ 
                  delay: 0.8, 
                  duration: 0.8, 
                  ease: "easeOut" 
                }}
              />
            </motion.span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-lg text-gray-600 max-w-3xl mx-auto"
          >
            Une approche méthodique et éprouvée pour créer des solutions digitales 
            qui atteignent vos objectifs
          </motion.p>
        </motion.div>
        
        <div className="max-w-5xl mx-auto">
          <div className="relative">
            {/* Ligne verticale de connexion avec animation SVG avancée */}
            <div className="absolute top-12 bottom-20 left-16 md:left-28 z-0 hidden md:block">
              <svg className="absolute top-0 h-full w-5" viewBox="0 0 5 1000" preserveAspectRatio="none">
                <motion.path
                  d="M 2.5,0 L 2.5,1000"
                  stroke={`url(#lineGradient)`}
                  strokeWidth="3"
                  strokeLinecap="round"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  style={{ pathLength }}
                  strokeDasharray="1 1"
                />
                
                <defs>
                  <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor={`var(--color-${color})`} />
                    <stop offset="50%" stopColor="var(--color-purple)" />
                    <stop offset="100%" stopColor="var(--color-red)" />
                  </linearGradient>
                </defs>
              </svg>
              
              {/* Points lumineux qui se déplacent le long de la ligne */}
              <motion.div
                className={`absolute w-4 h-4 left-0.5 bg-${color} rounded-full shadow-lg shadow-${color}/30`}
                initial={{ top: "0%" }}
                animate={{ 
                  top: ["0%", "100%"],
                  opacity: [0, 1, 1, 0],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  times: [0, 0.2, 0.8, 1]
                }}
              />
              
              <motion.div
                className="absolute w-3 h-3 left-1 bg-purple rounded-full shadow-lg shadow-purple/30"
                initial={{ top: "0%" }}
                animate={{ 
                  top: ["0%", "100%"],
                  opacity: [0, 1, 1, 0],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  delay: 2,
                  ease: "easeInOut",
                  times: [0, 0.2, 0.8, 1]
                }}
              />
            </div>
            
            <div className="space-y-24">
              {sortedSteps.map((step, index) => {
                // Observer pour chaque étape
                const [stepRef, stepInView] = useInView({ 
                  triggerOnce: true, 
                  threshold: 0.1,
                  rootMargin: "-50px 0px"
                })
                
                // Couleurs pour cette étape
                const [fromColor, toColor, borderColor, bgColor, textColor] = getStepColors(index)
                const [particleColorMain, particleColorLight] = getParticleColor(index)
                
                return (
                  <motion.div
                    key={index}
                    ref={stepRef}
                    initial={{ opacity: 0, y: 50 }}
                    animate={stepInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ 
                      duration: 0.8,
                      delay: index * 0.1,
                      type: "spring",
                      stiffness: 50
                    }}
                    className="flex flex-col md:flex-row"
                  >
                    <motion.div 
                      initial={{ scale: 0, rotate: -90 }}
                      animate={stepInView ? { scale: 1, rotate: 0 } : {}}
                      transition={{ 
                        duration: 0.6, 
                        delay: 0.3,
                        type: "spring",
                        stiffness: 200,
                        damping: 15
                      }}
                      className="md:w-28 flex-shrink-0 flex items-start justify-center mb-4 md:mb-0 relative z-10"
                    >
                      <motion.div 
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setFocusedStep(focusedStep === index ? null : index)}
                        className={`w-14 h-14 md:w-16 md:h-16 bg-white rounded-full border-2 border-${color} shadow-xl flex items-center justify-center text-${color} relative cursor-pointer`}
                      >
                        {/* Effet de pulsation */}
                        <motion.span
                          animate={{
                            boxShadow: [
                              `0 0 0 0px rgba(var(--color-${color}), 0.3)`,
                              `0 0 0 10px rgba(var(--color-${color}), 0)`,
                            ],
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            repeatDelay: 0.5,
                          }}
                          className="absolute inset-0 rounded-full"
                        />
                        
                        {/* Effet de rotation autour du numéro */}
                        <motion.div 
                          className="absolute inset-0 rounded-full overflow-hidden"
                          style={{ 
                            backgroundColor: `rgba(var(--color-${color}), 0.05)`,
                            borderRadius: "100%" 
                          }}
                        >
                          <motion.div 
                            className="absolute w-8 h-8 bg-white opacity-20"
                            style={{ borderRadius: "100% 0 0 0" }}
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 4,
                              repeat: Infinity,
                              ease: "linear"
                            }}
                          />
                        </motion.div>
                        
                        {/* Numéro de l'étape */}
                        <motion.span 
                          className="text-xl font-bold relative z-10"
                          animate={focusedStep === index ? { 
                            scale: [1, 1.2, 1],
                            color: [`var(--color-${color})`, `var(--color-purple)`, `var(--color-${color})`]
                          } : {}}
                          transition={{
                            duration: 1.5,
                            repeat: focusedStep === index ? Infinity : 0,
                            repeatType: "mirror"
                          }}
                        >
                          {step.numero}
                        </motion.span>
                      </motion.div>
                    </motion.div>
                    
                    <motion.div 
                      whileHover={{ 
                        y: -5,
                        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                      }}
                      whileTap={{ y: 0 }}
                      onHoverStart={() => setFocusedStep(index)}
                      onHoverEnd={() => setFocusedStep(null)}
                      transition={{ duration: 0.3 }}
                      className={`bg-gradient-to-br ${fromColor} ${toColor} rounded-2xl shadow-lg p-8 md:p-10 md:ml-4 relative z-10 border ${borderColor} overflow-hidden`}
                    >
                      {/* Effet de particules à l'intérieur de la carte */}
                      <div className="absolute inset-0 overflow-hidden">
                        {Array.from({ length: 5 }).map((_, i) => {
                          const size = Math.random() * 6 + 4
                          const delay = Math.random() * 2
                          
                          return (
                            <motion.div
                              key={`card-particle-${index}-${i}`}
                              className="absolute rounded-full"
                              style={{
                                width: size,
                                height: size,
                                backgroundColor: i % 2 === 0 ? particleColorMain : particleColorLight,
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                              }}
                              animate={{
                                x: [0, Math.random() * 100 - 50, 0],
                                y: [0, Math.random() * 100 - 50, 0],
                                opacity: [0.2, 0.7, 0.2],
                                scale: [1, 1.2, 1]
                              }}
                              transition={{
                                duration: Math.random() * 5 + 5,
                                delay,
                                repeat: Infinity,
                                ease: "easeInOut"
                              }}
                            />
                          )
                        })}
                      </div>
                      
                      <h3 className={`text-2xl font-bold mb-3 ${textColor} relative z-10`}>
                        <motion.span
                          initial={{ opacity: 0, x: -20 }}
                          animate={stepInView ? { opacity: 1, x: 0 } : {}}
                          transition={{ delay: 0.3, duration: 0.6 }}
                        >
                          {step.titre}
                        </motion.span>
                      </h3>
                      
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={stepInView ? { width: "4rem" } : {}}
                        transition={{ delay: 0.5, duration: 0.6 }}
                        className={`h-1 bg-${color}/30 rounded-full mb-4`}
                      />
                      
                      <motion.p 
                        initial={{ opacity: 0 }}
                        animate={stepInView ? { opacity: 1 } : {}}
                        transition={{ delay: 0.6, duration: 0.6 }}
                        className="text-gray-600 mb-6 relative z-10"
                      >
                        {step.description}
                      </motion.p>
                      
                      {/* Afficher les tags si disponibles, avec effet d'entrée staggered */}
                      {step.tags && step.tags.length > 0 && (
                        <motion.div 
                          initial={{ opacity: 0, y: 20 }}
                          animate={stepInView ? { opacity: 1, y: 0 } : {}}
                          transition={{ delay: 0.8, duration: 0.5 }}
                          className="flex flex-wrap gap-2 relative z-10"
                        >
                          {step.tags.map((tag, tagIndex) => (
                            <motion.span 
                              key={tagIndex}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={stepInView ? { 
                                opacity: 1, 
                                scale: 1,
                                transition: { 
                                  delay: 0.8 + (tagIndex * 0.1) 
                                }
                              } : {}}
                              whileHover={{ 
                                scale: 1.05, 
                                boxShadow: `0 0 15px rgba(var(--color-${color}), 0.5)` 
                              }}
                              className={`inline-block px-3 py-1 text-sm bg-white/60 backdrop-blur-sm ${textColor} rounded-full shadow-sm border ${borderColor}`}
                            >
                              {tag.texte}
                            </motion.span>
                          ))}
                        </motion.div>
                      )}
                      
                      {/* Contenu détaillé qui apparaît lorsque l'étape est focalisée */}
                      <AnimatePresence>
                        {focusedStep === index && step.tags && step.tags.length > 0 && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="mt-6 pt-4 border-t border-gray-200 relative z-10"
                          >
                            <h4 className="text-lg font-semibold mb-3">Technologies associées</h4>
                            <div className="grid grid-cols-2 gap-3">
                              {step.tags.map((tag, i) => (
                                <motion.div
                                  key={i}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: i * 0.05 }}
                                  className="flex items-center"
                                >
                                  <span className={`w-2 h-2 bg-${color} rounded-full mr-2`} />
                                  <span>{tag.texte}</span>
                                </motion.div>
                              ))}
                            </div>
                            <div className="mt-4 text-sm text-gray-500">
                              <p>Cliquez sur le numéro ou n'importe où sur la carte pour réduire</p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                      
                      {/* Élément graphique décoratif */}
                      <div className="absolute bottom-4 right-4 opacity-20">
                        <motion.svg 
                          className={`w-24 h-24 text-${color}`} 
                          viewBox="0 0 80 80" 
                          fill="none"
                          animate={focusedStep === index ? {
                            rotate: [0, 180, 360],
                            scale: [1, 1.1, 1]
                          } : {}}
                          transition={{
                            duration: focusedStep === index ? 20 : 0,
                            repeat: Infinity,
                            ease: "linear"
                          }}
                        >
                          <circle cx="40" cy="40" r="30" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
                          <circle cx="40" cy="40" r="20" stroke="currentColor" strokeWidth="1" />
                          <motion.circle 
                            cx="40" 
                            cy="40" 
                            r="10" 
                            stroke="currentColor" 
                            strokeWidth="1"
                            animate={focusedStep === index ? {
                              r: [10, 15, 10]
                            } : {}}
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                              repeatType: "mirror"
                            }}
                          />
                        </motion.svg>
                      </div>
                    </motion.div>
                  </motion.div>
                )
              })}
            </div>
          </div>
          
          {/* Indication de la fin du processus */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="flex justify-center mt-16"
          >
            <motion.div 
              className={`w-16 h-16 bg-gradient-to-br from-${color} to-purple rounded-full shadow-lg flex items-center justify-center text-white relative overflow-hidden`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Effet de cercles concentriques */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{ 
                  border: `2px solid rgba(255, 255, 255, 0.2)`, 
                  scale: 0.8
                }}
                animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.7, 0, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{ 
                  border: `2px solid rgba(255, 255, 255, 0.2)`, 
                  scale: 0.6
                }}
                animate={{ scale: [0.6, 1.1, 0.6], opacity: [0.7, 0, 0.7] }}
                transition={{ duration: 2, delay: 0.3, repeat: Infinity }}
              />
              
              <svg className="w-8 h-8 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <motion.path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M5 13l4 4L19 7"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 1.5 }}
                />
              </svg>
              
              {/* Particules internes */}
              <motion.div
                className="absolute w-2 h-2 bg-white rounded-full"
                animate={{
                  x: [0, Math.random() * 20 - 10, 0],
                  y: [0, Math.random() * 20 - 10, 0],
                  opacity: [0.2, 0.8, 0.2]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "mirror"
                }}
              />
            </motion.div>
          </motion.div>
          
          {/* Appel à l'action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="text-center mt-12"
          >
            <p className="text-gray-600 mb-6">Prêt à découvrir ce que notre processus peut faire pour votre projet ?</p>
            <motion.a
              href="#contact"
              className={`inline-flex items-center px-6 py-3 bg-${color} text-white rounded-xl font-medium transition-all`}
              whileHover={{ 
                scale: 1.05, 
                boxShadow: `0 10px 25px -5px rgba(var(--color-${color}), 0.3)` 
              }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Contactez-nous</span>
              <motion.svg 
                className="w-5 h-5 ml-2" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatType: "mirror" }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </motion.svg>
            </motion.a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}