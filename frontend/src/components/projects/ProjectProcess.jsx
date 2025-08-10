// frontend/src/components/projects/ProjectProcess.jsx - VERSION AVEC ANIMATIONS AVANCÉES
'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  FaSearch, FaPencilRuler, FaCode, FaBug, FaRocket, 
  FaCreditCard, FaMobileAlt, FaDatabase, FaShieldAlt, 
  FaChartLine, FaCheckCircle, FaClock, FaUsers, FaCog,
  FaPlay, FaPause
} from 'react-icons/fa'

export default function ProjectProcess({ steps, color = 'blue', projectTitle }) {
  // États pour les animations
  const [activeStep, setActiveStep] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  
  // Animation au défilement
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })
  
  const sectionOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8])
  
  // Animation d'apparition
  const [titleRef, titleInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [timelineRef, timelineInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  
  // Spring pour les animations fluides
  const lineProgress = useSpring(0, { stiffness: 100, damping: 30 })
  
  // Fonction pour obtenir les couleurs
  const getColorStyles = (colorName) => {
    const colorMap = {
      blue: { solid: '#3498db', rgb: '52, 152, 219', light: '#e3f2fd' },
      purple: { solid: '#9b59b6', rgb: '155, 89, 182', light: '#f3e5f5' },
      red: { solid: '#e74c3c', rgb: '231, 76, 60', light: '#ffebee' }
    }
    return colorMap[colorName] || colorMap.blue
  }

  const colors = getColorStyles(color)

  // Mapping des icônes
  const iconMap = {
    'FaSearch': FaSearch,
    'FaPencilRuler': FaPencilRuler,
    'FaCode': FaCode,
    'FaBug': FaBug,
    'FaRocket': FaRocket,
    'FaCreditCard': FaCreditCard,
    'FaMobileAlt': FaMobileAlt,
    'FaDatabase': FaDatabase,
    'FaShieldAlt': FaShieldAlt,
    'FaChartLine': FaChartLine,
    'FaCheckCircle': FaCheckCircle,
    'FaClock': FaClock,
    'FaUsers': FaUsers,
    'FaCog': FaCog
  }

  const getIcon = (iconName) => {
    return iconMap[iconName] || FaRocket
  }

  // Auto-play des étapes
  useEffect(() => {
    if (!isAutoPlaying || !steps?.length) return
    
    const interval = setInterval(() => {
      setActiveStep(prev => (prev + 1) % steps.length)
    }, 4000)
    
    return () => clearInterval(interval)
  }, [isAutoPlaying, steps?.length])

  // Animation de la ligne progressive
  useEffect(() => {
    if (timelineInView && steps?.length) {
      const targetProgress = ((activeStep + 1) / steps.length) * 100
      lineProgress.set(targetProgress)
    }
  }, [activeStep, timelineInView, steps?.length, lineProgress])

  // Styles pour le badge animé
  const badgeStyle = {
    background: `linear-gradient(135deg, rgba(${colors.rgb}, 0.15) 0%, rgba(${colors.rgb}, 0.05) 100%)`,
    border: `1px solid rgba(${colors.rgb}, 0.3)`,
    backdropFilter: 'blur(10px)'
  }

  // Variantes d'animation avancées
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  }

  const stepVariants = {
    hidden: { 
      opacity: 0, 
      y: 60,
      scale: 0.8,
      rotateX: -15
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  }

  // Valider que steps existe
  if (!steps || !Array.isArray(steps) || steps.length === 0) {
    return null
  }

  return (
    <motion.section 
      ref={sectionRef}
      className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden"
      style={{ opacity: sectionOpacity }}
    >
      {/* Éléments décoratifs d'arrière-plan animés */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-10 right-20 w-40 h-40 rounded-full opacity-5"
          style={{ 
            background: `radial-gradient(circle, ${colors.solid} 0%, transparent 70%)`
          }}
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
            opacity: [0.05, 0.1, 0.05]
          }}
          transition={{ duration: 20, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-20 left-16 w-32 h-32 rounded-full opacity-5"
          style={{ 
            background: `radial-gradient(circle, ${colors.solid} 0%, transparent 70%)`
          }}
          animate={{ 
            scale: [1, 1.3, 1],
            rotate: [360, 180, 0],
            opacity: [0.05, 0.08, 0.05]
          }}
          transition={{ duration: 25, repeat: Infinity }}
        />
        
        {/* Particules flottantes */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full opacity-20"
            style={{ 
              backgroundColor: colors.solid,
              left: `${20 + (i * 15)}%`,
              top: `${30 + (i * 8)}%`
            }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 0.5
            }}
          />
        ))}
      </div>

      <div className="container relative z-10">
        
        {/* En-tête de section avec animations avancées */}
        <div className="text-center mb-16">
          <motion.div
            ref={titleRef}
            initial={{ opacity: 0, y: -40, scale: 0.8 }}
            animate={titleInView ? { 
              opacity: 1, 
              y: 0, 
              scale: 1,
              boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
            } : {}}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full backdrop-blur-sm shadow-xl mb-8 border"
            style={badgeStyle}
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 25px 50px rgba(0,0,0,0.15)"
            }}
          >
            <motion.div 
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ backgroundColor: colors.solid }}
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <FaCog className="w-5 h-5 text-white" />
            </motion.div>
            <span className="font-bold text-sm uppercase tracking-wider">
              Méthodologie de développement
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
          >
            Notre approche pour{' '}
            <motion.span 
              style={{ color: colors.solid }}
              animate={{ 
                textShadow: [
                  "0 0 0px rgba(52, 152, 219, 0)",
                  "0 0 20px rgba(52, 152, 219, 0.3)",
                  "0 0 0px rgba(52, 152, 219, 0)"
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              {projectTitle || 'ce projet'}
            </motion.span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed"
          >
            Découvrez les étapes clés qui ont permis de mener ce projet à la réussite, 
            de la conception initiale au déploiement final.
          </motion.p>

          {/* Contrôles de lecture */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.8 }}
            className="flex items-center justify-center gap-4 mt-8"
          >
            <motion.button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-lg border border-gray-200 hover:shadow-xl transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isAutoPlaying ? <FaPause className="w-3 h-3" /> : <FaPlay className="w-3 h-3" />}
              <span className="text-sm font-medium">
                {isAutoPlaying ? 'Pause' : 'Play'}
              </span>
            </motion.button>
            
            <div className="text-sm text-gray-500">
              Étape {activeStep + 1} sur {steps.length}
            </div>
          </motion.div>
        </div>

        {/* ✅ TIMELINE CONTINUE AVEC ANIMATIONS AVANCÉES */}
        <motion.div
          ref={timelineRef}
          variants={containerVariants}
          initial="hidden"
          animate={timelineInView ? "visible" : "hidden"}
          className="max-w-6xl mx-auto"
        >
          {/* Version Desktop - Timeline centrale continue */}
          <div className="hidden md:block relative">
            
            {/* ✅ LIGNE PRINCIPALE CONTINUE ET ANIMÉE */}
            <div className="absolute left-1/2 top-0 bottom-0 transform -translate-x-1/2 w-1 bg-gray-200 rounded-full" />
            
            {/* Ligne de progression animée */}
            <motion.div 
              className="absolute left-1/2 top-0 transform -translate-x-1/2 w-1 rounded-full origin-top z-10"
              style={{ 
                background: `linear-gradient(to bottom, ${colors.solid}, rgba(${colors.rgb}, 0.6))`,
                scaleY: lineProgress.get() / 100
              }}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: timelineInView ? lineProgress.get() / 100 : 0 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />

            {/* Pulse animé sur la ligne active */}
            <motion.div
              className="absolute left-1/2 transform -translate-x-1/2 w-3 h-3 rounded-full z-20"
              style={{ 
                backgroundColor: colors.solid,
                top: `${(activeStep / (steps.length - 1)) * 100}%`,
                boxShadow: `0 0 20px ${colors.solid}`
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />

            {steps.map((step, index) => {
              const IconComponent = getIcon(step.icone)
              const isLeft = index % 2 === 0
              const isActive = index <= activeStep
              
              return (
                <motion.div
                  key={index}
                  variants={stepVariants}
                  className="relative flex items-center mb-24 last:mb-0"
                  onHoverStart={() => !isAutoPlaying && setActiveStep(index)}
                >
                  {/* Grid System Parfait */}
                  <div className="grid grid-cols-12 gap-8 w-full items-center">
                    
                    {/* Contenu gauche */}
                    <div className="col-span-5">
                      {isLeft ? (
                        <motion.div 
                          className="bg-white p-8 rounded-2xl border border-gray-100 relative overflow-hidden"
                          style={{
                            boxShadow: isActive 
                              ? `0 20px 40px rgba(${colors.rgb}, 0.15)` 
                              : "0 10px 30px rgba(0,0,0,0.1)"
                          }}
                          animate={{
                            scale: isActive ? 1.02 : 1,
                            y: isActive ? -5 : 0
                          }}
                          whileHover={{ 
                            y: -10, 
                            scale: 1.03,
                            boxShadow: `0 25px 50px rgba(${colors.rgb}, 0.2)`
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          {/* Gradient animé de fond */}
                          <motion.div
                            className="absolute inset-0 opacity-5"
                            style={{
                              background: `linear-gradient(135deg, ${colors.solid} 0%, transparent 50%)`
                            }}
                            animate={{ opacity: isActive ? 0.1 : 0.05 }}
                          />
                          
                          <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-4">
                              <motion.div 
                                className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold"
                                style={{ backgroundColor: colors.solid }}
                                animate={{ rotate: isActive ? 360 : 0 }}
                                transition={{ duration: 0.8 }}
                              >
                                {index + 1}
                              </motion.div>
                              <motion.div 
                                className="h-1 rounded-full"
                                style={{ backgroundColor: colors.solid }}
                                animate={{ width: isActive ? 60 : 40 }}
                                transition={{ duration: 0.5 }}
                              />
                            </div>
                            
                            <h3 className="text-xl font-bold text-gray-900 mb-4">
                              {step.titre}
                            </h3>
                            
                            <p className="text-gray-600 leading-relaxed mb-4">
                              {step.description}
                            </p>
                            
                            {step.duree && (
                              <motion.div 
                                className="flex items-center gap-2 text-sm font-medium"
                                style={{ color: colors.solid }}
                                animate={{ opacity: isActive ? 1 : 0.7 }}
                              >
                                <FaClock className="w-3 h-3" />
                                <span>Durée: {step.duree}</span>
                              </motion.div>
                            )}
                          </div>
                        </motion.div>
                      ) : null}
                    </div>

                    {/* ✅ ICÔNE PARFAITEMENT CENTRÉE AVEC ANIMATIONS */}
                    <div className="col-span-2 flex justify-center">
                      <motion.div 
                        className="relative"
                        animate={{ scale: isActive ? 1.1 : 1 }}
                        transition={{ duration: 0.5 }}
                      >
                        {/* Halo animé */}
                        <motion.div
                          className="absolute inset-0 rounded-full"
                          style={{ backgroundColor: colors.solid }}
                          animate={{
                            scale: isActive ? [1, 1.5, 1] : 1,
                            opacity: isActive ? [0.3, 0.1, 0.3] : 0
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                        
                        <motion.div 
                          className="w-16 h-16 rounded-full flex items-center justify-center border-4 border-white shadow-xl z-30 relative cursor-pointer"
                          style={{ backgroundColor: colors.solid }}
                          whileHover={{ 
                            scale: 1.2,
                            boxShadow: `0 0 30px ${colors.solid}`
                          }}
                          onClick={() => setActiveStep(index)}
                          animate={{
                            boxShadow: isActive 
                              ? `0 0 25px ${colors.solid}` 
                              : "0 10px 20px rgba(0,0,0,0.2)"
                          }}
                        >
                          <motion.div
                            animate={{ rotate: isActive ? 360 : 0 }}
                            transition={{ duration: 1 }}
                          >
                            <IconComponent className="w-6 h-6 text-white" />
                          </motion.div>
                        </motion.div>
                      </motion.div>
                    </div>

                    {/* Contenu droite */}
                    <div className="col-span-5">
                      {!isLeft ? (
                        <motion.div 
                          className="bg-white p-8 rounded-2xl border border-gray-100 relative overflow-hidden"
                          style={{
                            boxShadow: isActive 
                              ? `0 20px 40px rgba(${colors.rgb}, 0.15)` 
                              : "0 10px 30px rgba(0,0,0,0.1)"
                          }}
                          animate={{
                            scale: isActive ? 1.02 : 1,
                            y: isActive ? -5 : 0
                          }}
                          whileHover={{ 
                            y: -10, 
                            scale: 1.03,
                            boxShadow: `0 25px 50px rgba(${colors.rgb}, 0.2)`
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          {/* Gradient animé de fond */}
                          <motion.div
                            className="absolute inset-0 opacity-5"
                            style={{
                              background: `linear-gradient(225deg, ${colors.solid} 0%, transparent 50%)`
                            }}
                            animate={{ opacity: isActive ? 0.1 : 0.05 }}
                          />
                          
                          <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-4 justify-end">
                              <motion.div 
                                className="h-1 rounded-full"
                                style={{ backgroundColor: colors.solid }}
                                animate={{ width: isActive ? 60 : 40 }}
                                transition={{ duration: 0.5 }}
                              />
                              <motion.div 
                                className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold"
                                style={{ backgroundColor: colors.solid }}
                                animate={{ rotate: isActive ? 360 : 0 }}
                                transition={{ duration: 0.8 }}
                              >
                                {index + 1}
                              </motion.div>
                            </div>
                            
                            <h3 className="text-xl font-bold text-gray-900 mb-4 text-right">
                              {step.titre}
                            </h3>
                            
                            <p className="text-gray-600 leading-relaxed mb-4 text-right">
                              {step.description}
                            </p>
                            
                            {step.duree && (
                              <motion.div 
                                className="flex items-center gap-2 text-sm font-medium justify-end"
                                style={{ color: colors.solid }}
                                animate={{ opacity: isActive ? 1 : 0.7 }}
                              >
                                <span>Durée: {step.duree}</span>
                                <FaClock className="w-3 h-3" />
                              </motion.div>
                            )}
                          </div>
                        </motion.div>
                      ) : null}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* ✅ VERSION MOBILE AVEC LIGNE CONTINUE */}
          <div className="md:hidden">
            <div className="relative">
              {/* Ligne principale mobile */}
              <div className="absolute left-8 top-0 bottom-0 w-1 bg-gray-200 rounded-full" />
              
              {/* Ligne de progression mobile */}
              <motion.div 
                className="absolute left-8 top-0 w-1 rounded-full origin-top"
                style={{ 
                  background: `linear-gradient(to bottom, ${colors.solid}, rgba(${colors.rgb}, 0.6))`,
                  height: `${((activeStep + 1) / steps.length) * 100}%`
                }}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: timelineInView ? 1 : 0 }}
                transition={{ duration: 2 }}
              />

              <div className="space-y-12">
                {steps.map((step, index) => {
                  const IconComponent = getIcon(step.icone)
                  const isActive = index <= activeStep
                  
                  return (
                    <motion.div
                      key={index}
                      variants={stepVariants}
                      className="relative flex gap-6"
                      onTouchStart={() => setActiveStep(index)}
                    >
                      {/* Icône mobile avec animations */}
                      <div className="relative z-20">
                        <motion.div 
                          className="w-16 h-16 rounded-full flex items-center justify-center border-4 border-white shadow-xl"
                          style={{ backgroundColor: colors.solid }}
                          animate={{
                            scale: isActive ? 1.1 : 1,
                            boxShadow: isActive 
                              ? `0 0 20px ${colors.solid}` 
                              : "0 8px 16px rgba(0,0,0,0.2)"
                          }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <motion.div
                            animate={{ rotate: isActive ? 360 : 0 }}
                            transition={{ duration: 1 }}
                          >
                            <IconComponent className="w-5 h-5 text-white" />
                          </motion.div>
                        </motion.div>
                      </div>

                      {/* Contenu mobile */}
                      <div className="flex-1">
                        <motion.div 
                          className="bg-white p-6 rounded-xl border border-gray-100 relative overflow-hidden"
                          style={{
                            boxShadow: isActive 
                              ? `0 15px 30px rgba(${colors.rgb}, 0.15)` 
                              : "0 8px 20px rgba(0,0,0,0.1)"
                          }}
                          animate={{
                            scale: isActive ? 1.02 : 1,
                            y: isActive ? -3 : 0
                          }}
                        >
                          {/* Gradient de fond mobile */}
                          <motion.div
                            className="absolute inset-0 opacity-5"
                            style={{
                              background: `linear-gradient(135deg, ${colors.solid} 0%, transparent 70%)`
                            }}
                            animate={{ opacity: isActive ? 0.1 : 0.05 }}
                          />
                          
                          <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-3">
                              <motion.div 
                                className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
                                style={{ backgroundColor: colors.solid }}
                                animate={{ rotate: isActive ? 180 : 0 }}
                              >
                                {index + 1}
                              </motion.div>
                              <h3 className="text-lg font-bold text-gray-900">
                                {step.titre}
                              </h3>
                            </div>
                            
                            <p className="text-gray-600 leading-relaxed mb-3">
                              {step.description}
                            </p>
                            
                            {step.duree && (
                              <motion.div 
                                className="flex items-center gap-2 text-sm font-medium"
                                style={{ color: colors.solid }}
                                animate={{ opacity: isActive ? 1 : 0.7 }}
                              >
                                <FaClock className="w-3 h-3" />
                                <span>Durée: {step.duree}</span>
                              </motion.div>
                            )}
                          </div>
                        </motion.div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* ✅ RÉSUMÉ FINAL AVEC ANIMATIONS SOPHISTIQUÉES */}
          <motion.div
            variants={stepVariants}
            className="mt-20 text-center"
          >
            <motion.div 
              className="bg-white p-10 rounded-3xl border border-gray-100 max-w-4xl mx-auto relative overflow-hidden"
              style={{
                boxShadow: "0 30px 60px rgba(0,0,0,0.1)"
              }}
              whileHover={{
                boxShadow: `0 40px 80px rgba(${colors.rgb}, 0.15)`
              }}
            >
              {/* Gradient animé de fond */}
              <motion.div
                className="absolute inset-0 opacity-5"
                style={{
                  background: `radial-gradient(circle at center, ${colors.solid} 0%, transparent 70%)`
                }}
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.05, 0.1, 0.05]
                }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              
              <div className="relative z-10">
                <motion.div 
                  className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl"
                  style={{ 
                    background: `linear-gradient(135deg, rgba(${colors.rgb}, 0.1) 0%, rgba(${colors.rgb}, 0.05) 100%)`,
                    border: `2px solid rgba(${colors.rgb}, 0.2)`
                  }}
                  animate={{
                    boxShadow: [
                      `0 0 20px rgba(${colors.rgb}, 0.2)`,
                      `0 0 40px rgba(${colors.rgb}, 0.4)`,
                      `0 0 20px rgba(${colors.rgb}, 0.2)`
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <FaCheckCircle 
                    className="w-12 h-12"
                    style={{ color: colors.solid }}
                  />
                </motion.div>
                
                <h3 className="text-3xl font-bold text-gray-900 mb-6">
                  Résultat final
                </h3>
                
                <p className="text-xl text-gray-600 leading-relaxed mb-8 max-w-2xl mx-auto">
                  Cette méthodologie rigoureuse nous a permis de livrer un projet 
                  qui dépasse les attentes initiales, dans les délais impartis et 
                  avec un niveau de qualité exceptionnel.
                </p>
                
                {/* Badges de réussite animés */}
                <div className="flex flex-wrap justify-center gap-4 text-sm">
                  {[
                    { icon: FaUsers, text: "Équipe dédiée", bg: "bg-green-50", text: "text-green-700", border: "border-green-200" },
                    { icon: FaClock, text: "Respect des délais", bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200" },
                    { icon: FaRocket, text: "Performance optimisée", bg: colors.light, text: colors.solid, border: `rgba(${colors.rgb}, 0.3)` }
                  ].map((badge, index) => (
                    <motion.div
                      key={index}
                      className={`flex items-center gap-2 px-6 py-3 rounded-full border ${badge.bg} ${badge.text} ${badge.border}`}
                      style={index === 2 ? { 
                        backgroundColor: `rgba(${colors.rgb}, 0.1)`, 
                        color: colors.solid,
                        borderColor: `rgba(${colors.rgb}, 0.3)`
                      } : {}}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + (index * 0.1) }}
                      whileHover={{ 
                        scale: 1.05,
                        y: -2
                      }}
                    >
                      <badge.icon className="w-4 h-4" />
                      <span className="font-medium">{badge.text}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  )
}