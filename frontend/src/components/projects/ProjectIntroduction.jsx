// frontend/src/components/projects/EnhancedProjectIntroduction.jsx - VERSION CORRIGÉE
'use client'

import { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { renderRichText } from '@/utils/helpers'
import DynamicIcon from '@/utils/DynamicIcon'
import { FaCheckCircle, FaRocket, FaLightbulb, FaCog } from 'react-icons/fa'

export default function EnhancedProjectIntroduction({ content, features, color = 'blue' }) {
  // Animation au défilement sophistiquée
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })
  
  const sectionOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.6, 1, 1, 0.6])
  const contentY = useTransform(scrollYProgress, [0, 0.5], [0, -30])
  
  // Animation d'apparition avec contrôles
  const [titleRef, titleInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [contentRef, contentInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [featuresRef, featuresInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  
  // Contrôles d'animation sophistiqués
  const titleControls = useAnimation()
  const badgeControls = useAnimation()
  const lineControls = useAnimation()
  const contentControls = useAnimation()
  
  // Classes CSS sécurisées (éviter les classes dynamiques)
  const colorClasses = {
    blue: {
      text: 'text-blue',
      bg: 'bg-blue/10',
      border: 'border-blue/20',
      bgPulse: 'bg-blue',
      gradientFrom: 'from-blue/10',
      gradientVia: 'via-blue/5',
      gradientTo: 'to-transparent',
      borderColor: 'border-blue/20',
      gradientBar: 'from-blue',
      gradientBarTo: 'to-purple',
      hoverFrom: 'group-hover:from-blue/20',
      hoverTo: 'group-hover:to-blue/10',
      bgIcon: 'bg-blue/10',
      borderIcon: 'border-blue/10'
    },
    purple: {
      text: 'text-purple',
      bg: 'bg-purple/10',
      border: 'border-purple/20',
      bgPulse: 'bg-purple',
      gradientFrom: 'from-purple/10',
      gradientVia: 'via-purple/5',
      gradientTo: 'to-transparent',
      borderColor: 'border-purple/20',
      gradientBar: 'from-purple',
      gradientBarTo: 'to-red',
      hoverFrom: 'group-hover:from-purple/20',
      hoverTo: 'group-hover:to-purple/10',
      bgIcon: 'bg-purple/10',
      borderIcon: 'border-purple/10'
    },
    red: {
      text: 'text-red',
      bg: 'bg-red/10',
      border: 'border-red/20',
      bgPulse: 'bg-red',
      gradientFrom: 'from-red/10',
      gradientVia: 'via-red/5',
      gradientTo: 'to-transparent',
      borderColor: 'border-red/20',
      gradientBar: 'from-red',
      gradientBarTo: 'to-purple',
      hoverFrom: 'group-hover:from-red/20',
      hoverTo: 'group-hover:to-red/10',
      bgIcon: 'bg-red/10',
      borderIcon: 'border-red/10'
    }
  }
  
  const currentColorClasses = colorClasses[color] || colorClasses.blue

  // Animation séquentielle sophistiquée
  useEffect(() => {
    if (titleInView) {
      const sequence = async () => {
        await badgeControls.start({
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration: 0.5, type: "spring", stiffness: 100 }
        })
        
        await titleControls.start({
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, delay: 0.1 }
        })
        
        await lineControls.start({
          width: "8rem",
          opacity: 1,
          transition: { duration: 0.8, delay: 0.2 }
        })
        
        await contentControls.start({
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, delay: 0.3 }
        })
      }
      sequence()
    }
  }, [titleInView, titleControls, badgeControls, lineControls, contentControls])
  
  // Animation variants sophistiquées
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  }
  
  const itemVariants = {
    hidden: { 
      y: 50, 
      opacity: 0,
      scale: 0.95
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { 
        duration: 0.8, 
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  }

  // Icônes par défaut avec format correct pour DynamicIcon
  const defaultIcons = ['Fa/FaRocket', 'Fa/FaLightbulb', 'Fa/FaCog', 'Fa/FaCheckCircle']

  return (
    <motion.section 
      ref={sectionRef}
      style={{ opacity: sectionOpacity }}
      className="py-24 bg-gradient-to-br from-white via-gray-50/50 to-white relative overflow-hidden"
    >
      {/* Fond décoratif sophistiqué */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Formes organiques sophistiquées */}
        <motion.div
          className="absolute top-20 left-10 w-64 h-64 opacity-5"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <path
              d="M39.3,-64.8C52.8,-59.2,66.9,-51.9,71.1,-40.3C75.3,-28.6,69.7,-12.7,67.8,2.8C65.9,18.2,68,33.2,62.4,43.8C56.9,54.5,43.7,60.8,30.6,65.1C17.4,69.3,4.4,71.4,-9.1,70.7C-22.5,70,-36.4,66.5,-47.5,58.2C-58.6,49.9,-66.8,37,-71.7,22.5C-76.5,8.1,-77.9,-7.9,-73.6,-21.5C-69.3,-35.1,-59.2,-46.3,-47,-54.4C-34.8,-62.4,-20.4,-67.2,-5.3,-69.9C9.8,-72.7,25.7,-70.5,39.3,-64.8Z"
              fill="rgba(52, 152, 219, 0.1)"
            />
          </svg>
        </motion.div>

        <motion.div
          className="absolute bottom-20 right-10 w-48 h-48 opacity-5"
          animate={{
            rotate: [360, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <path
              d="M47.2,-73.9C61.3,-66.9,73,-54.2,79.6,-39.3C86.1,-24.4,87.5,-7.2,82.7,7.8C78,22.8,66.9,35.8,55.3,47.5C43.6,59.3,31.3,69.9,16.5,75.4C1.7,80.8,-15.6,81.1,-28.9,74.4C-42.2,67.8,-51.6,54.1,-58.9,40.3C-66.3,26.5,-71.7,12.6,-73.1,-2.5C-74.6,-17.7,-72.1,-34.1,-63.3,-46.1C-54.5,-58.1,-39.6,-65.8,-24.5,-72C-9.5,-78.2,5.7,-83,20.2,-81.5C34.8,-79.9,48.8,-71.9,61.8,-61.9Z"
              fill="rgba(52, 152, 219, 0.08)"
            />
          </svg>
        </motion.div>

        {/* Grille sophistiquée */}
        <div className="absolute inset-0 opacity-3">
          <svg width="100%" height="100%">
            <pattern id="introPattern" patternUnits="userSpaceOnUse" width="80" height="80">
              <circle cx="40" cy="40" r="1" fill="rgb(52, 152, 219)" />
              <circle cx="20" cy="20" r="0.5" fill="rgb(52, 152, 219)" />
              <circle cx="60" cy="60" r="0.5" fill="rgb(52, 152, 219)" />
              <path d="M20,20 Q40,30 60,20" stroke="rgb(52, 152, 219)" strokeWidth="0.3" fill="none" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#introPattern)" />
          </svg>
        </div>
      </div>

      <div className="container relative z-10">
        <motion.div 
          style={{ y: contentY }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start"
        >
          
          {/* Contenu textuel sophistiqué */}
          <div className="lg:col-span-7 space-y-8">
            <div ref={titleRef}>
              {/* Badge sophistiqué */}
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.8 }}
                animate={badgeControls}
                className="inline-block mb-6"
              >
                <div className={`px-6 py-3 bg-gradient-to-r ${currentColorClasses.gradientFrom} ${currentColorClasses.gradientVia} ${currentColorClasses.gradientTo} rounded-full border ${currentColorClasses.borderColor} backdrop-blur-sm`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 ${currentColorClasses.bgPulse} rounded-full animate-pulse`}></div>
                    <span className={`${currentColorClasses.text} font-semibold tracking-wider uppercase text-sm`}>
                      Présentation du Projet
                    </span>
                  </div>
                </div>
              </motion.div>
              
              {/* Titre sophistiqué */}
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={titleControls}
                className="text-3xl md:text-5xl font-bold mb-6 leading-tight"
              >
                Une réalisation qui fait la{' '}
                <span className={`${currentColorClasses.text} relative`}>
                  différence
                  <motion.div
                    className="absolute -bottom-2 left-0 h-1 bg-blue/30 rounded-full"
                    initial={{ width: 0 }}
                    animate={titleInView ? { width: "100%" } : {}}
                    transition={{ duration: 0.8, delay: 0.8 }}
                  ></motion.div>
                </span>
              </motion.h2>
              
              {/* Ligne décorative sophistiquée */}
              <motion.div 
                initial={{ width: 0, opacity: 0 }}
                animate={lineControls}
                className="h-1 bg-gradient-to-r from-blue via-purple to-red rounded-full mb-8"
                style={{ maxWidth: "8rem" }}
              ></motion.div>
            </div>
            
            {/* Contenu rich text sophistiqué */}
            <motion.div
              ref={contentRef}
              initial={{ opacity: 0, y: 30 }}
              animate={contentControls}
              className="prose prose-lg max-w-none"
            >
              {content && Array.isArray(content) ? (
                content.map((block, index) => (
                  <motion.div 
                    key={index} 
                    className="mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={contentInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <div className="text-gray-700 leading-relaxed">
                      {renderRichText([block])}
                    </div>
                  </motion.div>
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={contentInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6 }}
                  className="text-gray-700 leading-relaxed text-lg"
                >
                  <p className="mb-4">
                    Ce projet illustre parfaitement notre expertise technique et notre capacité 
                    à livrer des solutions innovantes adaptées aux besoins spécifiques de nos clients.
                  </p>
                  <p>
                    Chaque détail a été pensé pour offrir une expérience utilisateur exceptionnelle, 
                    tout en respectant les plus hauts standards de qualité et de performance.
                  </p>
                </motion.div>
              )}
            </motion.div>

            {/* Métriques de performance */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={contentInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="grid grid-cols-2 md:grid-cols-3 gap-4"
            >
              {[
                { label: "Performance", value: "98%" },
                { label: "Satisfaction", value: "100%" },
                { label: "Délai", value: "Respecté" }
              ].map((metric, index) => (
                <div key={index} className="text-center p-4 bg-white rounded-lg border border-gray-100 hover:shadow-lg transition-shadow">
                  <div className={`text-2xl font-bold ${currentColorClasses.text} mb-1`}>{metric.value}</div>
                  <div className="text-xs text-gray-500 uppercase tracking-wide">{metric.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
          
          {/* Points clés sophistiqués */}
          {features && features.length > 0 && (
            <div className="lg:col-span-5">
              <motion.div
                ref={featuresRef}
                variants={containerVariants}
                initial="hidden"
                animate={featuresInView ? "visible" : "hidden"}
                className="space-y-6"
              >
                <motion.div
                  variants={itemVariants}
                  className="mb-8"
                >
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <div className={`w-8 h-8 ${currentColorClasses.bgIcon} rounded-lg flex items-center justify-center`}>
                      <FaCheckCircle className={`w-4 h-4 ${currentColorClasses.text}`} />
                    </div>
                    Points clés du projet
                  </h3>
                </motion.div>
                
                <div className="space-y-4">
                  {features.slice(0, 4).map((feature, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      className="group"
                    >
                      <div className="p-6 bg-white rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                        <div className="flex items-start gap-4">
                          <div className={`w-12 h-12 bg-gradient-to-br ${currentColorClasses.gradientFrom} to-blue/5 rounded-xl flex items-center justify-center flex-shrink-0 ${currentColorClasses.hoverFrom} ${currentColorClasses.hoverTo} transition-colors border ${currentColorClasses.borderIcon}`}>
                            <DynamicIcon 
                              icon={feature.icone || defaultIcons[index % defaultIcons.length]} 
                              className={`w-5 h-5 ${currentColorClasses.text}`} 
                            />
                          </div>
                          
                          <div className="flex-1">
                            <h4 className="font-bold text-gray-900 mb-2 group-hover:text-gray-800 text-lg">
                              {feature.titre}
                            </h4>
                            <p className="text-gray-600 text-sm leading-relaxed">
                              {feature.description}
                            </p>
                            
                            {/* Barre de progression décorative */}
                            <div className="mt-3 w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                              <motion.div
                                className={`h-full bg-gradient-to-r ${currentColorClasses.gradientBar} ${currentColorClasses.gradientBarTo}`}
                                initial={{ width: 0 }}
                                animate={featuresInView ? { width: "100%" } : {}}
                                transition={{ 
                                  duration: 1.2, 
                                  delay: 0.8 + (index * 0.2),
                                  ease: "easeOut"
                                }}
                              ></motion.div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          )}
        </motion.div>
      </div>
    </motion.section>
  )
}