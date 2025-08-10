// frontend/src/components/projects/ProjectProcess.jsx - VERSION CORRIGÉE
'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useAnimation } from 'framer-motion'
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
  
  // Contrôles d'animation
  const titleControls = useAnimation()
  const badgeControls = useAnimation()
  
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

  // Mapping des icônes - ✅ CORRIGÉ
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
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  }

  const stepVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  const lineVariants = {
    hidden: { scaleY: 0 },
    visible: {
      scaleY: 1,
      transition: {
        duration: 1.5,
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
        
        {/* En-tête de section - ✅ AMÉLIORÉ */}
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

        {/* Timeline des étapes - ✅ DESIGN CORRIGÉ */}
        <motion.div
          ref={timelineRef}
          variants={containerVariants}
          initial="hidden"
          animate={timelineInView ? "visible" : "hidden"}
          className="relative max-w-6xl mx-auto"
        >
          {/* Ligne centrale de la timeline - ✅ POSITIONNEMENT CORRIGÉ */}
          <motion.div
            variants={lineVariants}
            className="absolute left-1/2 top-0 bottom-0 w-1 origin-top transform -translate-x-1/2 rounded-full hidden md:block"
            style={{ backgroundColor: `rgba(${colors.rgb}, 0.2)` }}
          />

          {/* Ligne mobile - ✅ AJOUTÉE */}
          <motion.div
            variants={lineVariants}
            className="absolute left-8 top-0 bottom-0 w-1 origin-top rounded-full md:hidden"
            style={{ backgroundColor: `rgba(${colors.rgb}, 0.2)` }}
          />

          {/* Étapes - ✅ ALIGNEMENT PARFAIT */}
          <div className="space-y-16">
            {steps.map((step, index) => {
              const IconComponent = getIcon(step.icone)
              const isEven = index % 2 === 0
              
              return (
                <motion.div
                  key={index}
                  variants={stepVariants}
                  className="relative"
                >
                  {/* Icône centrale - ✅ CENTRAGE PARFAIT */}
                  <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 z-20">
                    <motion.div 
                      className="w-16 h-16 rounded-full flex items-center justify-center border-4 border-white shadow-xl"
                      style={{ backgroundColor: colors.solid }}
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <IconComponent className="w-6 h-6 text-white" />
                    </motion.div>
                  </div>

                  {/* Contenu - ✅ RESPONSIVE AMÉLIORÉ */}
                  <div className="flex flex-col md:flex-row md:items-center">
                    {/* Desktop: alternance gauche/droite */}
                    <div className={`w-full md:w-1/2 ${isEven ? 'md:order-1 md:pr-12' : 'md:order-2 md:pl-12'}`}>
                      <motion.div 
                        className={`bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 ml-24 md:ml-0 ${
                          isEven ? 'md:text-right' : 'md:text-left'
                        }`}
                        whileHover={{ y: -5 }}
                      >
                        {/* Badge numéro - ✅ AMÉLIORÉ */}
                        <div className={`flex items-center gap-3 mb-4 ${isEven ? 'md:justify-end' : 'md:justify-start'}`}>
                          <div 
                            className="inline-flex items-center justify-center w-8 h-8 rounded-full text-white text-sm font-bold"
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
                        
                        {/* Durée - ✅ DESIGN AMÉLIORÉ */}
                        {step.duree && (
                          <div className={`flex items-center gap-2 text-sm text-gray-500 ${
                            isEven ? 'md:justify-end' : 'md:justify-start'
                          }`}>
                            <FaClock className="w-3 h-3" style={{ color: colors.solid }} />
                            <span className="font-medium">Durée: {step.duree}</span>
                          </div>
                        )}
                      </motion.div>
                    </div>

                    {/* Espace vide pour l'autre côté */}
                    <div className="hidden md:block md:w-1/2"></div>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Résumé final - ✅ DESIGN AMÉLIORÉ */}
          <motion.div
            variants={stepVariants}
            className="mt-20 text-center"
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
              
              {/* Badges de réussite - ✅ DESIGN MODERNE */}
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