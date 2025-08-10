// frontend/src/components/projects/ProjectProcess.jsx - VERSION COMPLÈTEMENT REFAITE
'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  FaSearch, FaPencilRuler, FaCode, FaBug, FaRocket, 
  FaCreditCard, FaMobileAlt, FaDatabase, FaShieldAlt, 
  FaChartLine, FaCheckCircle, FaClock, FaUsers, FaCog
} from 'react-icons/fa'

export default function ProjectProcess({ steps, color = 'blue', projectTitle }) {
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
  
  // Fonction pour obtenir les couleurs
  const getColorStyles = (colorName) => {
    const colorMap = {
      blue: { solid: '#3498db', rgb: '52, 152, 219' },
      purple: { solid: '#9b59b6', rgb: '155, 89, 182' },
      red: { solid: '#e74c3c', rgb: '231, 76, 60' }
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

  // Styles pour le badge animé
  const badgeStyle = {
    background: `linear-gradient(135deg, rgba(${colors.rgb}, 0.1) 0%, rgba(${colors.rgb}, 0.05) 100%)`,
    border: `1px solid rgba(${colors.rgb}, 0.2)`
  }

  // Variantes d'animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  }

  const stepVariants = {
    hidden: { 
      opacity: 0, 
      y: 60,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
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
      className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden"
      style={{ opacity: sectionOpacity }}
    >
      {/* Éléments décoratifs d'arrière-plan */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-10 right-20 w-32 h-32 rounded-full opacity-5"
          style={{ backgroundColor: colors.solid }}
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 20, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-20 left-16 w-24 h-24 rounded-full opacity-5"
          style={{ backgroundColor: colors.solid }}
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [360, 180, 0]
          }}
          transition={{ duration: 25, repeat: Infinity }}
        />
      </div>

      <div className="container relative z-10">
        
        {/* En-tête de section */}
        <div className="text-center mb-16">
          <motion.div
            ref={titleRef}
            initial={{ opacity: 0, y: -30, scale: 0.8 }}
            animate={titleInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full backdrop-blur-sm shadow-lg mb-8"
            style={badgeStyle}
          >
            <div 
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ backgroundColor: colors.solid }}
            >
              <FaCog className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-sm uppercase tracking-wider">
              Méthodologie de développement
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-3xl md:text-5xl font-bold text-gray-900 mb-6"
          >
            Notre approche pour{' '}
            <span style={{ color: colors.solid }}>
              {projectTitle || 'ce projet'}
            </span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            Découvrez les étapes clés qui ont permis de mener ce projet à la réussite, 
            de la conception initiale au déploiement final.
          </motion.p>
        </div>

        {/* ✅ NOUVELLE TIMELINE - SYSTÈME REFAIT COMPLÈTEMENT */}
        <motion.div
          ref={timelineRef}
          variants={containerVariants}
          initial="hidden"
          animate={timelineInView ? "visible" : "hidden"}
          className="max-w-5xl mx-auto"
        >
          {/* Version Desktop - Timeline centrale */}
          <div className="hidden md:block">
            {steps.map((step, index) => {
              const IconComponent = getIcon(step.icone)
              const isLeft = index % 2 === 0
              
              return (
                <motion.div
                  key={index}
                  variants={stepVariants}
                  className="relative flex items-center mb-20 last:mb-0"
                >
                  {/* ✅ GRID SYSTEM PARFAIT */}
                  <div className="grid grid-cols-12 gap-8 w-full items-center">
                    
                    {/* Contenu gauche */}
                    <div className="col-span-5">
                      {isLeft ? (
                        <motion.div 
                          className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
                          whileHover={{ y: -5, scale: 1.02 }}
                        >
                          <div className="flex items-center gap-3 mb-4">
                            <div 
                              className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
                              style={{ backgroundColor: colors.solid }}
                            >
                              {index + 1}
                            </div>
                            <div 
                              className="h-0.5 w-12 rounded-full"
                              style={{ backgroundColor: colors.solid }}
                            />
                          </div>
                          
                          <h3 className="text-xl font-bold text-gray-900 mb-4">
                            {step.titre}
                          </h3>
                          
                          <p className="text-gray-600 leading-relaxed mb-4">
                            {step.description}
                          </p>
                          
                          {step.duree && (
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                              <FaClock className="w-3 h-3" style={{ color: colors.solid }} />
                              <span className="font-medium">Durée: {step.duree}</span>
                            </div>
                          )}
                        </motion.div>
                      ) : null}
                    </div>

                    {/* ✅ ICÔNE PARFAITEMENT CENTRÉE */}
                    <div className="col-span-2 flex justify-center">
                      <motion.div 
                        className="w-16 h-16 rounded-full flex items-center justify-center border-4 border-white shadow-xl z-20 relative"
                        style={{ backgroundColor: colors.solid }}
                        whileHover={{ scale: 1.15 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <IconComponent className="w-6 h-6 text-white" />
                      </motion.div>
                    </div>

                    {/* Contenu droite */}
                    <div className="col-span-5">
                      {!isLeft ? (
                        <motion.div 
                          className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
                          whileHover={{ y: -5, scale: 1.02 }}
                        >
                          <div className="flex items-center gap-3 mb-4 justify-end">
                            <div 
                              className="h-0.5 w-12 rounded-full"
                              style={{ backgroundColor: colors.solid }}
                            />
                            <div 
                              className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
                              style={{ backgroundColor: colors.solid }}
                            >
                              {index + 1}
                            </div>
                          </div>
                          
                          <h3 className="text-xl font-bold text-gray-900 mb-4 text-right">
                            {step.titre}
                          </h3>
                          
                          <p className="text-gray-600 leading-relaxed mb-4 text-right">
                            {step.description}
                          </p>
                          
                          {step.duree && (
                            <div className="flex items-center gap-2 text-sm text-gray-500 justify-end">
                              <span className="font-medium">Durée: {step.duree}</span>
                              <FaClock className="w-3 h-3" style={{ color: colors.solid }} />
                            </div>
                          )}
                        </motion.div>
                      ) : null}
                    </div>
                  </div>

                  {/* ✅ LIGNE CONNECTRICE PRÉCISE */}
                  {index < steps.length - 1 && (
                    <div 
                      className="absolute top-16 left-1/2 transform -translate-x-1/2 w-1 h-20 z-10"
                      style={{ backgroundColor: `rgba(${colors.rgb}, 0.3)` }}
                    />
                  )}
                </motion.div>
              )
            })}
          </div>

          {/* ✅ VERSION MOBILE - SIMPLIFIÉE ET CLAIRE */}
          <div className="md:hidden space-y-8">
            {steps.map((step, index) => {
              const IconComponent = getIcon(step.icone)
              
              return (
                <motion.div
                  key={index}
                  variants={stepVariants}
                  className="relative flex gap-6"
                >
                  {/* Colonne icône + ligne */}
                  <div className="flex flex-col items-center">
                    <motion.div 
                      className="w-14 h-14 rounded-full flex items-center justify-center border-4 border-white shadow-lg"
                      style={{ backgroundColor: colors.solid }}
                      whileHover={{ scale: 1.1 }}
                    >
                      <IconComponent className="w-5 h-5 text-white" />
                    </motion.div>
                    
                    {/* Ligne pour mobile */}
                    {index < steps.length - 1 && (
                      <div 
                        className="w-1 h-16 mt-4"
                        style={{ backgroundColor: `rgba(${colors.rgb}, 0.3)` }}
                      />
                    )}
                  </div>

                  {/* Contenu */}
                  <div className="flex-1">
                    <motion.div 
                      className="bg-white p-6 rounded-xl shadow-lg border border-gray-100"
                      whileHover={{ y: -3 }}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div 
                          className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold"
                          style={{ backgroundColor: colors.solid }}
                        >
                          {index + 1}
                        </div>
                        <h3 className="text-lg font-bold text-gray-900">
                          {step.titre}
                        </h3>
                      </div>
                      
                      <p className="text-gray-600 leading-relaxed mb-3">
                        {step.description}
                      </p>
                      
                      {step.duree && (
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <FaClock className="w-3 h-3" style={{ color: colors.solid }} />
                          <span>Durée: {step.duree}</span>
                        </div>
                      )}
                    </motion.div>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* ✅ RÉSUMÉ FINAL AMÉLIORÉ */}
          <motion.div
            variants={stepVariants}
            className="mt-16 text-center"
          >
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 max-w-3xl mx-auto">
              <div 
                className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
                style={{ backgroundColor: `rgba(${colors.rgb}, 0.1)` }}
              >
                <FaCheckCircle 
                  className="w-10 h-10"
                  style={{ color: colors.solid }}
                />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Résultat final
              </h3>
              
              <p className="text-gray-600 leading-relaxed mb-6">
                Cette méthodologie rigoureuse nous a permis de livrer un projet 
                qui dépasse les attentes initiales, dans les délais impartis et 
                avec un niveau de qualité exceptionnel.
              </p>
              
              {/* Badges de réussite */}
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <div className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-full border border-green-200">
                  <FaUsers className="w-4 h-4" />
                  <span className="font-medium">Équipe dédiée</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full border border-blue-200">
                  <FaClock className="w-4 h-4" />
                  <span className="font-medium">Respect des délais</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full border" 
                     style={{ 
                       backgroundColor: `rgba(${colors.rgb}, 0.1)`, 
                       color: colors.solid,
                       borderColor: `rgba(${colors.rgb}, 0.3)`
                     }}>
                  <FaRocket className="w-4 h-4" />
                  <span className="font-medium">Performance optimisée</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  )
}