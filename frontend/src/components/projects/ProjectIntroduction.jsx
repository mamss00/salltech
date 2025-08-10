// frontend/src/components/projects/ProjectIntroduction.jsx - VERSION PREMIUM
'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { renderRichText } from '@/utils/helpers'
import { 
  FaRocket, FaStar, FaChartLine, FaAward, FaCog, FaShieldAlt, 
  FaCode, FaMobile, FaDesktop, FaCloud, FaDatabase, FaSearch,
  FaPalette, FaUsers, FaClock, FaThumbsUp 
} from 'react-icons/fa'

export default function ProjectIntroduction({ content, features, color = 'blue' }) {
  // Animation au défilement
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })
  
  const sectionOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8])
  
  // Animation d'apparition
  const [contentRef, contentInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [featuresRef, featuresInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [statsRef, statsInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  
  // Fonction pour obtenir les couleurs basées sur les variables CSS existantes
  const getColorStyles = (colorName) => {
    const colorMap = {
      blue: { solid: '#3498db', rgb: '52, 152, 219' },
      purple: { solid: '#9b59b6', rgb: '155, 89, 182' },
      red: { solid: '#e74c3c', rgb: '231, 76, 60' }
    }
    return colorMap[colorName] || colorMap.blue
  }

  const colors = getColorStyles(color)

  // Mapping des icônes pour éviter les erreurs
  const iconMap = {
    'FaRocket': FaRocket,
    'FaStar': FaStar,
    'FaChartLine': FaChartLine,
    'FaAward': FaAward,
    'FaCog': FaCog,
    'FaShieldAlt': FaShieldAlt,
    'FaCode': FaCode,
    'FaMobile': FaMobile,
    'FaDesktop': FaDesktop,
    'FaCloud': FaCloud,
    'FaDatabase': FaDatabase,
    'FaSearch': FaSearch,
    'FaPalette': FaPalette,
    'FaUsers': FaUsers,
    'FaClock': FaClock,
    'FaThumbsUp': FaThumbsUp
  }

  // Fonction pour obtenir l'icône
  const getIcon = (iconName) => {
    return iconMap[iconName] || FaStar
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  }
  
  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.7, ease: "easeOut" }
    }
  }

  // Statistiques du projet
  const projectStats = [
    {
      value: "98%",
      label: "Performance",
      description: "Score de performance optimal"
    },
    {
      value: "100%",
      label: "Satisfaction",
      description: "Client entièrement satisfait"
    },
    {
      value: "Respecté",
      label: "Délai",
      description: "Livraison dans les temps"
    }
  ]

  // Styles pour les backgrounds
  const sectionBackgroundStyle = {
    background: `linear-gradient(180deg, #ffffff 0%, rgba(${colors.rgb}, 0.01) 50%, #ffffff 100%)`
  }

  return (
    <motion.section 
      ref={sectionRef}
      style={{ 
        opacity: sectionOpacity,
        ...sectionBackgroundStyle
      }}
      className="py-24 relative overflow-hidden"
    >
      {/* Background décoratif très subtil */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-10 right-10 w-32 h-32 rounded-full opacity-5"
          style={{ backgroundColor: colors.solid }}
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.02, 0.05, 0.02]
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-10 left-10 w-24 h-24 rounded-full opacity-5"
          style={{ backgroundColor: colors.solid }}
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.02, 0.04, 0.02]
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 2 }}
        />
      </div>
      
      <div className="container relative z-10">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-16 items-start">
          
          {/* Contenu principal - 7 colonnes */}
          <motion.div
            ref={contentRef}
            initial={{ opacity: 0, x: -50 }}
            animate={contentInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="xl:col-span-7 space-y-8"
          >
            {/* Badge de section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={contentInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border"
              style={{ borderColor: `rgba(${colors.rgb}, 0.15)` }}
            >
              <div 
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: colors.solid }}
              />
              <span 
                className="font-semibold tracking-wider uppercase text-sm"
                style={{ color: colors.solid }}
              >
                Présentation du projet
              </span>
            </motion.div>
            
            {/* Titre principal */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={contentInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight"
            >
              Une réalisation qui fait la{' '}
              <span style={{ color: colors.solid }}>différence</span>
            </motion.h2>
            
            {/* Ligne décorative */}
            <motion.div 
              initial={{ width: 0 }}
              animate={contentInView ? { width: "5rem" } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="h-1 rounded-full"
              style={{ 
                background: `linear-gradient(90deg, ${colors.solid} 0%, rgba(155, 89, 182, 0.6) 100%)`
              }}
            />
            
            {/* Contenu riche */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={contentInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="prose prose-lg max-w-none text-gray-600 leading-relaxed"
            >
              {content && content.length > 0 ? (
                renderRichText ? renderRichText(content) : (
                  <p className="text-lg">
                    {content?.[0]?.children?.[0]?.text || 'Contenu du projet à afficher'}
                  </p>
                )
              ) : (
                <p className="text-lg">
                  Ce projet représente une approche innovante et sur mesure, 
                  conçue pour répondre aux besoins spécifiques du client et 
                  offrir une expérience utilisateur exceptionnelle.
                </p>
              )}
            </motion.div>

            {/* Statistiques du projet */}
            <motion.div
              ref={statsRef}
              initial={{ opacity: 0, y: 30 }}
              animate={statsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="grid grid-cols-3 gap-8 pt-8"
            >
              {projectStats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={statsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.9 + (index * 0.1) }}
                  className="text-center"
                >
                  <div 
                    className="text-2xl md:text-3xl font-bold mb-2"
                    style={{ color: colors.solid }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-sm font-semibold text-gray-900 mb-1">
                    {stat.label}
                  </div>
                  <div className="text-xs text-gray-500">
                    {stat.description}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          
          {/* Points clés - 5 colonnes */}
          {features && features.length > 0 && (
            <motion.div
              ref={featuresRef}
              variants={containerVariants}
              initial="hidden"
              animate={featuresInView ? "visible" : "hidden"}
              className="xl:col-span-5 space-y-6"
            >
              {/* Titre de la section points clés */}
              <motion.div
                variants={itemVariants}
                className="flex items-center gap-3 mb-8"
              >
                <div 
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `rgba(${colors.rgb}, 0.1)` }}
                >
                  <FaAward 
                    className="w-4 h-4"
                    style={{ color: colors.solid }}
                  />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  Points clés du projet
                </h3>
              </motion.div>
              
              {/* Liste des fonctionnalités */}
              <div className="space-y-4">
                {features.slice(0, 5).map((feature, index) => {
                  const IconComponent = getIcon(feature.icone)
                  
                  return (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      className="group"
                    >
                      <div className="flex items-start gap-4 p-5 bg-white rounded-xl border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                        <div 
                          className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300"
                          style={{ 
                            backgroundColor: `rgba(${colors.rgb}, 0.1)`,
                            border: `1px solid rgba(${colors.rgb}, 0.15)`
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.backgroundColor = `rgba(${colors.rgb}, 0.15)`
                            e.target.style.transform = 'scale(1.05)'
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.backgroundColor = `rgba(${colors.rgb}, 0.1)`
                            e.target.style.transform = 'scale(1)'
                          }}
                        >
                          <IconComponent 
                            className="w-5 h-5"
                            style={{ color: colors.solid }}
                          />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-gray-900 mb-2 group-hover:text-gray-800 transition-colors">
                            {feature.titre}
                          </h4>
                          <div 
                            className="w-8 h-0.5 rounded-full mb-3 group-hover:w-12 transition-all duration-300"
                            style={{ backgroundColor: colors.solid }}
                          />
                          <p className="text-gray-600 text-sm leading-relaxed">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
              
              {/* Badge "Et plus encore" si il y a plus de 5 features */}
              {features.length > 5 && (
                <motion.div
                  variants={itemVariants}
                  className="text-center pt-4"
                >
                  <div 
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium"
                    style={{ 
                      backgroundColor: `rgba(${colors.rgb}, 0.05)`,
                      color: colors.solid 
                    }}
                  >
                    <FaStar className="w-3 h-3" />
                    Et {features.length - 5} autres fonctionnalité{features.length - 5 > 1 ? 's' : ''}
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </motion.section>
  )
}