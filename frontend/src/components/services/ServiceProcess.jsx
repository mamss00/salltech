'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export default function SuperEnhancedServiceProcess({ steps, color = 'blue' }) {
  // État pour suivre l'étape en focus et étape active
  const [focusedStep, setFocusedStep] = useState(null)
  const [activeStep, setActiveStep] = useState(0)
  const [autoPlayEnabled, setAutoPlayEnabled] = useState(true)
  
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
  
  // Auto-play pour les étapes
  useEffect(() => {
    if (!steps || steps.length === 0 || !autoPlayEnabled) return
    
    const interval = setInterval(() => {
      setActiveStep(prev => (prev + 1) % steps.length)
    }, 5000)
    
    return () => clearInterval(interval)
  }, [steps, autoPlayEnabled])
  
  // Trier les étapes par numéro
  const sortedSteps = [...(steps || [])].sort((a, b) => a.numero - b.numero)
  
  // Convertir les codes de couleur CSS en RGB pour les animations et dégradés
  const colorToRGB = (colorName) => {
    const colors = {
      blue: '52, 152, 219',
      purple: '155, 89, 182',
      red: '231, 76, 60'
    }
    return colors[colorName] || colors.blue
  }
  
  // Générer des couleurs pour le dégradé basées sur la couleur principale
  const getStepColors = (index) => {
    // Palette de couleurs plus élégante et adoucie
    const colorMap = {
      blue: { primary: '#5b96c7', secondary: '#426f95', light: '#ebf5fa' },
      purple: { primary: '#9c78ad', secondary: '#755585', light: '#f4ecf7' },
      red: { primary: '#c96c61', secondary: '#9d5750', light: '#fdedec' },
    }
    
    // Choisir les couleurs en fonction de l'étape pour varier l'apparence
    const baseColor = index % 3 === 0 ? color : index % 3 === 1 ? 'purple' : 'red'
    return colorMap[baseColor] || colorMap.blue
  }
  
  // Vérifier si les étapes existent
  if (!steps || steps.length === 0) {
    return null
  }

  const mainColorRGB = colorToRGB(color)

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
              <rect x="100" y="100" width="600" height="1000" stroke={`rgb(${mainColorRGB})`} strokeWidth="1" fill="none" />
              <rect x="150" y="150" width="500" height="900" stroke={`rgb(${mainColorRGB})`} strokeWidth="1" fill="none" />
              <rect x="200" y="200" width="400" height="800" stroke={`rgb(${mainColorRGB})`} strokeWidth="1" fill="none" />
              <rect x="250" y="250" width="300" height="700" stroke={`rgb(${mainColorRGB})`} strokeWidth="1" fill="none" />
              <rect x="300" y="300" width="200" height="600" stroke={`rgb(${mainColorRGB})`} strokeWidth="1" fill="none" />
            </g>
          </g>
          
          {/* Particules animées - Réduites en nombre mais plus visibles */}
          {Array.from({ length: 15 }).map((_, i) => {
            const x = Math.random() * 800
            const y = Math.random() * 1200
            const size = Math.random() * 8 + 3 // Plus grandes
            const delay = Math.random() * 5
            const duration = Math.random() * 10 + 10
            const opacity = Math.random() * 0.6 + 0.3 // Plus visibles
            
            return (
              <motion.circle
                key={`particle-${i}`}
                cx={x}
                cy={y}
                r={size}
                fill={`rgba(${colorToRGB(i % 3 === 0 ? color : i % 3 === 1 ? 'purple' : 'red')}, ${opacity})`}
                initial={{ opacity }}
                animate={{
                  opacity: [opacity, opacity * 1.5, opacity],
                  scale: [1, 1.2, 1],
                  cx: [x, x + Math.random() * 150 - 75, x], // Mouvement plus large
                  cy: [y, y + Math.random() * 150 - 75, y]
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
          {/* Badge plus moderne et futuriste */}
          <motion.div
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
            className="inline-block mb-4"
          >
            <div className="px-6 py-2 rounded-full bg-gradient-to-r from-gray-50 to-white shadow-lg border border-gray-200 text-sm font-medium text-gray-800 relative overflow-hidden">
              <div className="absolute inset-0 opacity-30">
                <svg width="100%" height="100%">
                  <pattern id="diagonalHatch" width="10" height="10" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
                    <line x1="0" y1="0" x2="0" y2="10" style={{ stroke: `rgb(${mainColorRGB})`, strokeWidth: 0.5 }} />
                  </pattern>
                  <rect width="100%" height="100%" fill="url(#diagonalHatch)" />
                </svg>
              </div>
              <div className="relative flex items-center">
                <motion.div 
                  className="w-2 h-2 mr-2 rounded-full"
                  style={{ backgroundColor: `rgb(${mainColorRGB})` }}
                  animate={{ scale: [1, 1.5, 1], opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                MÉTHODOLOGIE
              </div>
            </div>
          </motion.div>
          
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
                  `0 0 15px rgba(${mainColorRGB}, 0.7)`,
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
                className="absolute -bottom-2 left-0 right-0 h-1 rounded-full"
                style={{ backgroundColor: `rgb(${mainColorRGB})` }}
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
            qui atteignent vos objectifs avec précision
          </motion.p>
        </motion.div>
        
        {/* Mode compact moderne avec navigation par onglets */}
        <div className="max-w-5xl mx-auto">
          {/* Navigation des étapes - Style plus élégant */}
          <div className="mb-12 flex justify-center">
            <div className="bg-white/90 backdrop-blur-sm rounded-full shadow-md p-1.5 flex flex-wrap justify-center gap-1">
              {sortedSteps.map((step, index) => {
                const { primary } = getStepColors(index)
                return (
                  <motion.button
                    key={index}
                    onClick={() => {
                      setActiveStep(index)
                      setAutoPlayEnabled(false)
                    }}
                    className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300`}
                    style={{ 
                      color: activeStep === index ? 'white' : 'rgb(90, 90, 90)',
                      overflow: 'hidden'
                    }}
                  >
                    {activeStep === index && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 rounded-full"
                        initial={false}
                        style={{ backgroundColor: primary }}
                        transition={{ type: "spring", stiffness: 200, damping: 28 }}
                      />
                    )}
                    <span className="relative z-10 flex items-center">
                      <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center mr-2 text-xs font-medium">
                        {step.numero}
                      </span>
                      {step.titre.length > 12 ? step.titre.substring(0, 12) + '...' : step.titre}
                    </span>
                  </motion.button>
                )
              })}
              <motion.button
                onClick={() => setAutoPlayEnabled(!autoPlayEnabled)}
                className="relative px-3 py-2 rounded-full bg-gray-100/80 text-gray-700 text-sm font-medium hover:bg-gray-200/80 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {autoPlayEnabled ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
              </motion.button>
            </div>
          </div>
          
          {/* Conteneur principal */}
          <div className="relative">
            {/* Indicateur de progression - Ligne connectant les étapes */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full"
                style={{ 
                  backgroundColor: getStepColors(activeStep).primary,
                  width: `${(activeStep / (sortedSteps.length - 1)) * 100}%`
                }}
                animate={{ width: `${(activeStep / (sortedSteps.length - 1)) * 100}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>
            
            {/* Affichage des étapes - Animation de transition */}
            <div className="mt-8">
              <AnimatePresence mode="wait">
                {sortedSteps.map((step, index) => {
                  if (index !== activeStep) return null
                  
                  // Obtenir les couleurs pour cette étape
                  const { primary, secondary, light } = getStepColors(index)
                  
                  return (
                    <motion.div
                      key={`step-${index}`}
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -50 }}
                      transition={{ 
                        type: "spring",
                        stiffness: 300,
                        damping: 30
                      }}
                      className="rounded-2xl overflow-hidden"
                    >
                      <div className="flex flex-col md:flex-row bg-white shadow-xl rounded-2xl overflow-hidden">
                        {/* Animation d'illustration du processus - Côté gauche */}
                        <div className="md:w-1/3 bg-gradient-to-br p-8 relative overflow-hidden"
                          style={{ 
                            background: `linear-gradient(135deg, ${primary}DD, ${secondary}DD)` 
                          }}
                        >
                          {/* Numéro et titre */}
                          <div className="relative z-10 text-white">
                            <div className="flex items-center mb-4">
                              <motion.div 
                                className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mr-4"
                                animate={{ scale: [1, 1.1, 1] }}
                                transition={{ duration: 3, repeat: Infinity }}
                              >
                                <span className="text-3xl font-bold">{step.numero}</span>
                              </motion.div>
                              <h3 className="text-2xl font-bold">{step.titre}</h3>
                            </div>
                            
                            {/* Tags en chips modernes */}
                            {step.tags && step.tags.length > 0 && (
                              <div className="flex flex-wrap gap-2 mb-6">
                                {step.tags.map((tag, tagIndex) => (
                                  <motion.span
                                    key={tagIndex}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.1 * tagIndex }}
                                    className="inline-block px-3 py-1 bg-white/30 backdrop-blur-sm rounded-full text-sm"
                                  >
                                    {tag.texte}
                                  </motion.span>
                                ))}
                              </div>
                            )}
                            
                            {/* Illustration abstraite animée */}
                            <div className="hidden md:block mt-8">
                              <svg width="100%" height="120" viewBox="0 0 200 120" fill="none">
                                <motion.circle cx="40" cy="60" r="8" fill="white" opacity="0.6"
                                  animate={{ 
                                    cx: [40, 60, 40], 
                                    cy: [60, 40, 60],
                                    opacity: [0.6, 0.3, 0.6]
                                  }}
                                  transition={{ duration: 5, repeat: Infinity }}
                                />
                                <motion.circle cx="160" cy="60" r="6" fill="white" opacity="0.5"
                                  animate={{ 
                                    cx: [160, 140, 160], 
                                    cy: [60, 80, 60],
                                    opacity: [0.5, 0.2, 0.5]
                                  }}
                                  transition={{ duration: 5, repeat: Infinity }}
                                />
                                <motion.path 
                                  d="M40,60 Q100,20 160,60" 
                                  stroke="white" 
                                  strokeWidth="1.5"
                                  strokeDasharray="5,5"
                                  initial={{ pathLength: 0 }}
                                  animate={{ pathLength: [0, 1, 0] }}
                                  transition={{ duration: 5, repeat: Infinity }}
                                  opacity="0.6"
                                />
                                <motion.path 
                                  d="M40,60 Q100,100 160,60" 
                                  stroke="white" 
                                  strokeWidth="1.5"
                                  opacity="0.5"
                                  initial={{ pathLength: 0 }}
                                  animate={{ pathLength: [0, 1, 0] }}
                                  transition={{ duration: 5, delay: 2.5, repeat: Infinity }}
                                />
                              </svg>
                            </div>
                          </div>
                          
                          {/* Effet de particules */}
                          <div className="absolute inset-0">
                            {Array.from({ length: 8 }).map((_, i) => (
                              <motion.div
                                key={`particle-step-${i}`}
                                className="absolute rounded-full bg-white/40"
                                style={{
                                  width: Math.random() * 8 + 4,
                                  height: Math.random() * 8 + 4,
                                  left: `${Math.random() * 100}%`,
                                  top: `${Math.random() * 100}%`,
                                }}
                                animate={{
                                  x: [0, Math.random() * 50 - 25, 0],
                                  y: [0, Math.random() * 50 - 25, 0],
                                  opacity: [0.4, 0.7, 0.4]
                                }}
                                transition={{
                                  duration: Math.random() * 5 + 3,
                                  repeat: Infinity,
                                  repeatType: "reverse"
                                }}
                              />
                            ))}
                          </div>
                          
                          {/* Motif géométrique de fond */}
                          <div className="absolute inset-0 opacity-10">
                            <svg width="100%" height="100%">
                              <pattern id="gridPattern" patternUnits="userSpaceOnUse" width="20" height="20" patternTransform="rotate(45)">
                                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="white" strokeWidth="0.5" />
                              </pattern>
                              <rect width="100%" height="100%" fill="url(#gridPattern)" />
                            </svg>
                          </div>
                        </div>
                        
                        {/* Contenu détaillé - Côté droit */}
                        <div className="md:w-2/3 p-8 md:p-10">
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                          >
                            <h4 className="text-lg font-semibold text-gray-600 mb-4">Étape {step.numero} / {sortedSteps.length}</h4>
                            
                            <div className="prose prose-lg max-w-none">
                              <p className="text-gray-700">{step.description}</p>
                            </div>
                            
                            {/* Contenu interactif détaillé */}
                            {step.tags && step.tags.length > 0 && (
                              <div className="mt-6 pt-6 border-t border-gray-100">
                                <h5 className="text-lg font-semibold mb-4 flex items-center">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" style={{ color: primary }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                  </svg>
                                  Technologies et outils associés
                                </h5>
                                
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                  {step.tags.map((tag, tagIndex) => (
                                    <motion.div
                                      key={tagIndex}
                                      initial={{ opacity: 0, y: 10 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      transition={{ delay: 0.1 * tagIndex }}
                                      className="flex items-center bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                                      style={{ border: `1px solid ${light}` }}
                                    >
                                      <div className="w-8 h-8 rounded-md flex items-center justify-center mr-3"
                                        style={{ backgroundColor: primary + '20' }}
                                      >
                                        <span style={{ color: primary }}>{tagIndex + 1}</span>
                                      </div>
                                      <span className="text-gray-700">{tag.texte}</span>
                                    </motion.div>
                                  ))}
                                </div>
                              </div>
                            )}
                            
                            {/* Boutons de navigation entre étapes */}
                            <div className="flex justify-between mt-8 pt-6 border-t border-gray-100">
                              <motion.button
                                onClick={() => {
                                  setActiveStep(prev => (prev - 1 + sortedSteps.length) % sortedSteps.length)
                                  setAutoPlayEnabled(false)
                                }}
                                className="flex items-center px-4 py-2 rounded-lg bg-gray-50 text-gray-700 hover:bg-gray-100 transition-colors duration-200 border border-gray-200"
                                whileHover={{ x: -5 }}
                                whileTap={{ scale: 0.95 }}
                                disabled={sortedSteps.length <= 1}
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                                </svg>
                                Précédent
                              </motion.button>
                              
                              <motion.button
                                onClick={() => {
                                  setActiveStep(prev => (prev + 1) % sortedSteps.length)
                                  setAutoPlayEnabled(false)
                                }}
                                className="flex items-center px-4 py-2 rounded-lg text-white hover:shadow-md transition-all duration-200"
                                style={{ 
                                  backgroundColor: primary,
                                  boxShadow: "0 2px 10px rgba(0,0,0,0.08)"
                                }}
                                whileHover={{ x: 5 }}
                                whileTap={{ scale: 0.95 }}
                                disabled={sortedSteps.length <= 1}
                              >
                                Suivant
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                                </svg>
                              </motion.button>
                            </div>
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </AnimatePresence>
            </div>
          </div>
          
          {/* Appel à l'action final */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="text-center mt-16"
          >
            <div className="bg-white/70 backdrop-blur-md shadow-lg rounded-2xl p-8 relative overflow-hidden">
              {/* Élément décoratif radial */}
              <div className="absolute inset-0 overflow-hidden">
                <div 
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full aspect-square opacity-10"
                  style={{ 
                    background: `radial-gradient(circle, rgb(${mainColorRGB}) 0%, rgba(255,255,255,0) 70%)`
                  }}
                />
              </div>
              
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-4">Prêt à transformer votre vision en réalité ?</h3>
                <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                  Notre équipe d'experts est prête à vous accompagner dans chaque étape de votre projet. 
                  Découvrez comment notre méthodologie peut vous aider à atteindre vos objectifs.
                </p>
                
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <motion.a
                    href="#contact"
                    className="inline-flex items-center justify-center px-6 py-3 rounded-xl font-medium text-white"
                    style={{ 
                      backgroundColor: getStepColors(0).primary,
                      boxShadow: "0 4px 15px rgba(0,0,0,0.1)"
                    }}
                    whileHover={{ 
                      scale: 1.03, 
                      boxShadow: `0 8px 20px rgba(0,0,0,0.12)` 
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>Demander un devis gratuit</span>
                    <motion.svg 
                      className="w-5 h-5 ml-2" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, repeatType: "mirror" }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </motion.svg>
                  </motion.a>
                  
                  <motion.a
                    href="#portfolio"
                    className="inline-flex items-center justify-center px-6 py-3 rounded-xl font-medium border-2 transition-all"
                    style={{ borderColor: `rgb(${mainColorRGB})`, color: `rgb(${mainColorRGB})` }}
                    whileHover={{ 
                      backgroundColor: `rgba(${mainColorRGB}, 0.1)`,
                      scale: 1.02
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>Voir nos réalisations</span>
                  </motion.a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
      
      {/* Éléments de fond visuels flottants */}
      <div className="absolute bottom-0 right-0 w-64 h-64 transform translate-x-1/3 translate-y-1/3">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <motion.path
            d="M43.2,-68.1C57.1,-61.5,69.9,-51.1,74.8,-37.7C79.7,-24.2,76.7,-7.7,72.9,7.8C69,23.2,64.4,37.5,54.8,47.2C45.3,56.8,30.8,62,16.8,63.8C2.8,65.6,-10.7,64.1,-21.9,58.7C-33.2,53.3,-42.2,44.1,-51.6,33.9C-60.9,23.8,-70.7,11.9,-74.5,-2.2C-78.4,-16.3,-76.2,-32.6,-67.5,-43.9C-58.8,-55.3,-43.6,-61.6,-29.4,-68.2C-15.3,-74.7,-2.1,-81.5,8.9,-79.5C19.9,-77.5,29.3,-74.7,43.2,-68.1Z"
            fill={`rgba(${mainColorRGB}, 0.05)`}
            transform="translate(100 100)"
            animate={{
              d: [
                "M43.2,-68.1C57.1,-61.5,69.9,-51.1,74.8,-37.7C79.7,-24.2,76.7,-7.7,72.9,7.8C69,23.2,64.4,37.5,54.8,47.2C45.3,56.8,30.8,62,16.8,63.8C2.8,65.6,-10.7,64.1,-21.9,58.7C-33.2,53.3,-42.2,44.1,-51.6,33.9C-60.9,23.8,-70.7,11.9,-74.5,-2.2C-78.4,-16.3,-76.2,-32.6,-67.5,-43.9C-58.8,-55.3,-43.6,-61.6,-29.4,-68.2C-15.3,-74.7,-2.1,-81.5,8.9,-79.5C19.9,-77.5,29.3,-74.7,43.2,-68.1Z",
                "M52.1,-73.3C67.8,-67.3,80.9,-52.7,85.4,-36.2C89.9,-19.6,85.9,-1.1,80.3,15.5C74.7,32.1,67.5,46.8,55.6,57.1C43.6,67.4,27,73.4,10.4,74.6C-6.2,75.7,-22.8,72.1,-34.8,63.5C-46.8,54.9,-54.3,41.4,-64.1,26.7C-73.9,12,-86,-3.9,-84.6,-18.4C-83.1,-32.8,-68.2,-45.8,-52.8,-52C-37.4,-58.2,-21.5,-57.6,-3.9,-62.3C13.7,-67,36.4,-79.3,52.1,-73.3Z",
                "M43.2,-68.1C57.1,-61.5,69.9,-51.1,74.8,-37.7C79.7,-24.2,76.7,-7.7,72.9,7.8C69,23.2,64.4,37.5,54.8,47.2C45.3,56.8,30.8,62,16.8,63.8C2.8,65.6,-10.7,64.1,-21.9,58.7C-33.2,53.3,-42.2,44.1,-51.6,33.9C-60.9,23.8,-70.7,11.9,-74.5,-2.2C-78.4,-16.3,-76.2,-32.6,-67.5,-43.9C-58.8,-55.3,-43.6,-61.6,-29.4,-68.2C-15.3,-74.7,-2.1,-81.5,8.9,-79.5C19.9,-77.5,29.3,-74.7,43.2,-68.1Z"
              ]
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut"
            }}
          />
        </svg>
      </div>
      
      <div className="absolute top-0 left-0 w-72 h-72 transform -translate-x-1/3 -translate-y-1/3">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <motion.path
            d="M39.3,-64.8C52.8,-59.2,66.9,-51.9,71.1,-40.3C75.3,-28.6,69.7,-12.7,67.8,2.8C65.9,18.2,68,33.2,62.4,43.8C56.9,54.5,43.7,60.8,30.6,65.1C17.4,69.3,4.4,71.4,-9.1,70.7C-22.5,70,-36.4,66.5,-47.5,58.2C-58.6,49.9,-66.8,37,-71.7,22.5C-76.5,8.1,-77.9,-7.9,-73.6,-21.5C-69.3,-35.1,-59.2,-46.3,-47,-54.4C-34.8,-62.4,-20.4,-67.2,-5.3,-69.9C9.8,-72.7,25.7,-70.5,39.3,-64.8Z"
            fill="rgba(155, 89, 182, 0.05)"
            transform="translate(100 100)"
            animate={{
              d: [
                "M39.3,-64.8C52.8,-59.2,66.9,-51.9,71.1,-40.3C75.3,-28.6,69.7,-12.7,67.8,2.8C65.9,18.2,68,33.2,62.4,43.8C56.9,54.5,43.7,60.8,30.6,65.1C17.4,69.3,4.4,71.4,-9.1,70.7C-22.5,70,-36.4,66.5,-47.5,58.2C-58.6,49.9,-66.8,37,-71.7,22.5C-76.5,8.1,-77.9,-7.9,-73.6,-21.5C-69.3,-35.1,-59.2,-46.3,-47,-54.4C-34.8,-62.4,-20.4,-67.2,-5.3,-69.9C9.8,-72.7,25.7,-70.5,39.3,-64.8Z",
                "M47.2,-73.9C61.3,-66.9,73,-54.2,79.6,-39.3C86.1,-24.4,87.5,-7.2,82.7,7.8C78,22.8,66.9,35.8,55.3,47.5C43.6,59.3,31.3,69.9,16.5,75.4C1.7,80.8,-15.6,81.1,-28.9,74.4C-42.2,67.8,-51.6,54.1,-58.9,40.3C-66.3,26.5,-71.7,12.6,-73.1,-2.5C-74.6,-17.7,-72.1,-34.1,-63.3,-46.1C-54.5,-58.1,-39.6,-65.8,-24.5,-72C-9.5,-78.2,5.7,-83,20.2,-81.5C34.8,-79.9,48.8,-71.9,61.8,-61.9Z",
                "M39.3,-64.8C52.8,-59.2,66.9,-51.9,71.1,-40.3C75.3,-28.6,69.7,-12.7,67.8,2.8C65.9,18.2,68,33.2,62.4,43.8C56.9,54.5,43.7,60.8,30.6,65.1C17.4,69.3,4.4,71.4,-9.1,70.7C-22.5,70,-36.4,66.5,-47.5,58.2C-58.6,49.9,-66.8,37,-71.7,22.5C-76.5,8.1,-77.9,-7.9,-73.6,-21.5C-69.3,-35.1,-59.2,-46.3,-47,-54.4C-34.8,-62.4,-20.4,-67.2,-5.3,-69.9C9.8,-72.7,25.7,-70.5,39.3,-64.8Z"
              ]
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut"
            }}
          />
        </svg>
      </div>
      
      {/* Effet de trame visuelle au bas de la section */}
      <div className="absolute bottom-0 left-0 w-full h-16 overflow-hidden">
        <div className="absolute inset-0 opacity-3">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <pattern id="bottomPattern" patternUnits="userSpaceOnUse" width="30" height="30">
              <circle cx="15" cy="15" r="0.5" fill={`rgb(${mainColorRGB})`} />
            </pattern>
            <rect width="100%" height="100%" fill="url(#bottomPattern)" />
          </svg>
        </div>
      </div>
    </section>
  )
}