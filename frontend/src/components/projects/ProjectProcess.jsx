// frontend/src/components/projects/ProjectProcess.jsx - VERSION SANS ERREURS
'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, useMotionValue } from 'framer-motion'
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
  const [isAutoPlaying, setIsAutoPlaying] = useState(true) // ✅ Mode scroll par défaut
  const [hasStarted, setHasStarted] = useState(false)
  const [currentScrollProgress, setCurrentScrollProgress] = useState(0) // ✅ Pour réactivité du JSX
  
  // Animation au défilement - ✅ PROGRESSION BASÉE SUR LE SCROLL
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"] // ✅ Déclenche quand la section entre/sort du centre
  })
  
  const sectionOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0.8, 1, 1, 0.8])
  
  // Animation d'apparition
  const [titleRef, titleInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [timelineRef, timelineInView] = useInView({ triggerOnce: false, threshold: 0.1 }) // ✅ triggerOnce: false pour réactivité continue
  
  // État de progression simple
  const [lineProgress, setLineProgress] = useState(0)
  
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

  // ✅ MISE À JOUR EN TEMPS RÉEL BASÉE SUR LE SCROLL - LOGIQUE CORRIGÉE
  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((value) => {
      if (timelineInView) {
        // Mettre à jour l'état de scroll pour la réactivité du JSX
        setCurrentScrollProgress(value)
        
        // ✅ CALCUL CORRIGÉ - Prendre en compte le résultat final
        const totalSections = steps.length + 1 // +1 pour le résultat final
        const sectionProgress = value * totalSections
        
        // Mettre à jour l'étape active (0 à steps.length-1)
        const newActiveStep = Math.min(steps.length - 1, Math.floor(sectionProgress))
        if (newActiveStep !== activeStep && newActiveStep >= 0) {
          setActiveStep(newActiveStep)
        }
        
        // ✅ PROGRESSION DE LIGNE SYNCHRONISÉE
        // La ligne doit être complète quand on atteint le résultat final
        const lineProgressValue = Math.min(100, (sectionProgress / steps.length) * 100)
        setLineProgress(lineProgressValue)
        
        console.log(`Scroll: ${Math.round(value * 100)}% → Section: ${Math.round(sectionProgress)} → Étape ${newActiveStep + 1}/${steps.length} → Ligne: ${Math.round(lineProgressValue)}%`)
      }
    })
    
    return unsubscribe
  }, [scrollYProgress, activeStep, timelineInView, steps.length])

  // ✅ INITIALISATION CORRIGÉE QUAND LA TIMELINE DEVIENT VISIBLE
  useEffect(() => {
    if (timelineInView && !hasStarted) {
      console.log('Timeline visible - mode scroll activé')
      setHasStarted(true)
      
      // Initialiser selon la position actuelle avec la nouvelle logique
      const currentValue = scrollYProgress.get()
      setCurrentScrollProgress(currentValue)
      
      const totalSections = steps.length + 1
      const sectionProgress = currentValue * totalSections
      const currentStep = Math.min(steps.length - 1, Math.floor(sectionProgress))
      const lineProgressValue = Math.min(100, (sectionProgress / steps.length) * 100)
      
      setLineProgress(lineProgressValue)
      setActiveStep(currentStep)
    }
  }, [timelineInView, hasStarted, scrollYProgress, steps.length])

  // Styles pour le badge animé
  const badgeStyle = {
    background: `linear-gradient(135deg, rgba(${colors.rgb}, 0.15) 0%, rgba(${colors.rgb}, 0.05) 100%)`,
    border: `1px solid rgba(${colors.rgb}, 0.3)`,
    backdropFilter: 'blur(10px)'
  }

  // Variantes d'animation
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
      scale: 0.8
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
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
      {/* Éléments décoratifs d'arrière-plan */}
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
      </div>

      <div className="container relative z-10">
        
        {/* En-tête de section */}
        <div className="text-center mb-16">
          <motion.div
            ref={titleRef}
            initial={{ opacity: 0, y: -40, scale: 0.8 }}
            animate={titleInView ? { 
              opacity: 1, 
              y: 0, 
              scale: 1
            } : {}}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full backdrop-blur-sm shadow-xl mb-8 border"
            style={badgeStyle}
            whileHover={{ scale: 1.05 }}
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
            <span style={{ color: colors.solid }}>
              {projectTitle || 'ce projet'}
            </span>
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

          {/* ✅ INDICATEUR DE SCROLL SIMPLIFIÉ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.7 }}
            className="mt-8 flex items-center justify-center gap-3 text-sm text-gray-500"
          >
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-5 h-8 border-2 border-gray-400 rounded-full flex justify-center"
            >
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1 h-2 bg-gray-400 rounded-full mt-1"
              />
            </motion.div>
            <span>Scrollez pour découvrir chaque étape progressivement</span>
          </motion.div>
        </div>

        {/* Timeline des étapes */}
        <motion.div
          ref={timelineRef}
          variants={containerVariants}
          initial="hidden"
          animate={timelineInView ? "visible" : "hidden"}
          className="max-w-6xl mx-auto"
        >
          {/* Version Desktop */}
          <div className="hidden md:block relative">
            
            {/* Ligne principale continue */}
            <div className="absolute left-1/2 top-0 bottom-0 transform -translate-x-1/2 w-1 bg-gray-200 rounded-full z-0" />
            
            {/* Ligne de progression animée - ✅ SYNCHRONISÉE */}
            <motion.div 
              className="absolute left-1/2 top-0 transform -translate-x-1/2 w-1 rounded-full origin-top z-5"
              style={{ 
                background: `linear-gradient(to bottom, ${colors.solid}, rgba(${colors.rgb}, 0.6))`,
                height: `${lineProgress}%` // ✅ Utilise lineProgress calculé
              }}
              transition={{ duration: 0.1, ease: "easeOut" }}
            />

            {/* Point pulse qui suit la progression de ligne */}
            <motion.div
              className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full z-15"
              style={{ 
                backgroundColor: colors.solid,
                top: `${lineProgress}%`, // ✅ Utilise lineProgress calculé
                boxShadow: `0 0 15px ${colors.solid}`,
                border: '2px solid white'
              }}
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.8, 1, 0.8]
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />

            {steps.map((step, index) => {
              const IconComponent = getIcon(step.icone)
              const isLeft = index % 2 === 0
              
              // ✅ ACTIVATION BASÉE SUR LA NOUVELLE LOGIQUE
              const totalSections = steps.length + 1
              const sectionProgress = currentScrollProgress * totalSections
              const isActive = sectionProgress >= index
              const isCurrentStep = Math.floor(sectionProgress) === index
              
              // ✅ OPACITÉ PROGRESSIVE AMÉLIORÉE
              const baseOpacity = 0.4
              const stepOpacity = isActive 
                ? Math.min(1, baseOpacity + (sectionProgress - index) * 0.6)
                : baseOpacity
              
              return (
                <motion.div
                  key={index}
                  variants={stepVariants}
                  className="relative flex items-center mb-24 last:mb-0"
                >
                  <div className="grid grid-cols-12 gap-8 w-full items-center">
                    
                    {/* Contenu gauche */}
                    <div className="col-span-5">
                      {isLeft ? (
                        <motion.div 
                          className="bg-white p-8 rounded-2xl border border-gray-100 relative overflow-hidden"
                          style={{
                            boxShadow: isActive 
                              ? `0 20px 40px rgba(${colors.rgb}, 0.15)` 
                              : "0 10px 30px rgba(0,0,0,0.1)",
                            opacity: stepOpacity // ✅ Opacité progressive
                          }}
                          animate={{
                            scale: isCurrentStep ? 1.05 : (isActive ? 1.02 : 1),
                            y: isCurrentStep ? -8 : (isActive ? -5 : 0)
                          }}
                          whileHover={{ y: -10, scale: 1.03 }}
                          transition={{ duration: 0.3 }}
                        >
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

                    {/* Icône centrale */}
                    <div className="col-span-2 flex justify-center relative">
                      <motion.div 
                        className="relative z-50"
                        animate={{ scale: isActive ? 1.1 : 1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <motion.div
                          className="absolute inset-0 rounded-full z-40"
                          style={{ backgroundColor: colors.solid }}
                          animate={{
                            scale: isActive ? [1, 1.5, 1] : 1,
                            opacity: isActive ? [0.3, 0.1, 0.3] : 0
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                        
                        <motion.div 
                          className="w-16 h-16 rounded-full flex items-center justify-center border-4 border-white shadow-xl cursor-pointer z-50"
                          style={{ 
                            backgroundColor: colors.solid,
                            opacity: stepOpacity // ✅ Opacité progressive pour les icônes
                          }}
                          whileHover={{ 
                            scale: 1.2,
                            boxShadow: `0 0 30px ${colors.solid}`
                          }}
                          onClick={() => {
                            setActiveStep(index)
                            setIsAutoPlaying(false)
                          }}
                          animate={{
                            boxShadow: isCurrentStep 
                              ? `0 0 30px ${colors.solid}` 
                              : isActive
                                ? `0 0 25px ${colors.solid}` 
                                : "0 10px 20px rgba(0,0,0,0.2)",
                            scale: isCurrentStep ? 1.15 : (isActive ? 1.1 : 1)
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
                              : "0 10px 30px rgba(0,0,0,0.1)",
                            opacity: stepOpacity // ✅ Opacité progressive
                          }}
                          animate={{
                            scale: isCurrentStep ? 1.05 : (isActive ? 1.02 : 1),
                            y: isCurrentStep ? -8 : (isActive ? -5 : 0)
                          }}
                          whileHover={{ y: -10, scale: 1.03 }}
                          transition={{ duration: 0.3 }}
                        >
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

          {/* Version Mobile */}
          <div className="md:hidden">
            <div className="relative">
              {/* Ligne principale mobile */}
              <div className="absolute left-8 top-0 bottom-0 w-1 bg-gray-200 rounded-full z-0" />
              
              {/* Ligne de progression mobile - ✅ SYNCHRONISÉE */}
              <motion.div 
                className="absolute left-8 top-0 w-1 rounded-full origin-top z-5"
                style={{ 
                  background: `linear-gradient(to bottom, ${colors.solid}, rgba(${colors.rgb}, 0.6))`,
                  height: `${lineProgress}%` // ✅ Utilise lineProgress calculé
                }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              />

              {/* Point pulse mobile - ✅ SYNCHRONISÉ */}
              <motion.div
                className="absolute left-8 transform -translate-x-1/2 w-3 h-3 rounded-full z-15"
                style={{ 
                  backgroundColor: colors.solid,
                  top: `${lineProgress}%`, // ✅ Utilise lineProgress calculé
                  boxShadow: `0 0 12px ${colors.solid}`,
                  border: '1px solid white'
                }}
                animate={{
                  scale: [1, 1.4, 1],
                  opacity: [0.8, 1, 0.8]
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />

              <div className="space-y-12">
                {steps.map((step, index) => {
                  const IconComponent = getIcon(step.icone)
                  
                  // ✅ ACTIVATION BASÉE SUR LA NOUVELLE LOGIQUE (mobile)
                  const totalSections = steps.length + 1
                  const sectionProgress = currentScrollProgress * totalSections
                  const isActive = sectionProgress >= index
                  
                  // ✅ OPACITÉ PROGRESSIVE AMÉLIORÉE
                  const baseOpacity = 0.4
                  const stepOpacity = isActive 
                    ? Math.min(1, baseOpacity + (sectionProgress - index) * 0.6)
                    : baseOpacity
                  
                  return (
                    <motion.div
                      key={index}
                      variants={stepVariants}
                      className="relative flex gap-6"
                      onTouchStart={() => {
                        setActiveStep(index)
                        setIsAutoPlaying(false)
                      }}
                    >
                      <div className="relative z-50">
                        <motion.div 
                          className="w-16 h-16 rounded-full flex items-center justify-center border-4 border-white shadow-xl"
                          style={{ 
                            backgroundColor: colors.solid,
                            opacity: stepOpacity // ✅ Opacité progressive mobile
                          }}
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

                      <div className="flex-1">
                        <motion.div 
                          className="bg-white p-6 rounded-xl border border-gray-100 relative overflow-hidden"
                          style={{
                            boxShadow: isActive 
                              ? `0 15px 30px rgba(${colors.rgb}, 0.15)` 
                              : "0 8px 20px rgba(0,0,0,0.1)",
                            opacity: stepOpacity // ✅ Opacité progressive mobile
                          }}
                          animate={{
                            scale: isActive ? 1.02 : 1,
                            y: isActive ? -3 : 0
                          }}
                        >
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

          {/* Résumé final */}
          <motion.div
            variants={stepVariants}
            className="mt-20 text-center"
          >
            <motion.div 
              className="bg-white p-10 rounded-3xl border border-gray-100 max-w-4xl mx-auto relative overflow-hidden"
              style={{ boxShadow: "0 30px 60px rgba(0,0,0,0.1)" }}
              whileHover={{ boxShadow: `0 40px 80px rgba(${colors.rgb}, 0.15)` }}
            >
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
                
                <div className="flex flex-wrap justify-center gap-4 text-sm">
                  {[
                    { icon: FaUsers, text: "Équipe dédiée", bg: "bg-green-50", textColor: "text-green-700", border: "border-green-200" },
                    { icon: FaClock, text: "Respect des délais", bg: "bg-blue-50", textColor: "text-blue-700", border: "border-blue-200" },
                    { icon: FaRocket, text: "Performance optimisée", bg: colors.light, textColor: colors.solid, border: `rgba(${colors.rgb}, 0.3)` }
                  ].map((badge, index) => (
                    <motion.div
                      key={index}
                      className={`flex items-center gap-2 px-6 py-3 rounded-full border ${badge.bg} ${badge.textColor} ${badge.border}`}
                      style={index === 2 ? { 
                        backgroundColor: `rgba(${colors.rgb}, 0.1)`, 
                        color: colors.solid,
                        borderColor: `rgba(${colors.rgb}, 0.3)`
                      } : {}}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + (index * 0.1) }}
                      whileHover={{ scale: 1.05, y: -2 }}
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