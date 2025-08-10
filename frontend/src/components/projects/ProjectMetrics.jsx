// frontend/src/components/projects/ProjectMetrics.jsx
'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import { 
  FaChartLine, FaUsers, FaRocket, FaTachometerAlt, FaSearchengin, 
  FaMobile, FaShieldAlt, FaExternalLinkAlt, FaAward, FaThumbsUp 
} from 'react-icons/fa'

export default function ProjectMetrics({ metrics, results, color = 'blue', projectUrl }) {
  // Animation au défilement
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })
  
  const sectionOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8])
  
  // Animation d'apparition
  const [titleRef, titleInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [metricsRef, metricsInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  
  // État pour l'animation des compteurs
  const [counters, setCounters] = useState({})
  
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

  // Métriques par défaut basées sur des projets réels
  const defaultMetrics = [
    {
      label: "Performance",
      value: "98",
      unit: "%",
      description: "Score de performance Google PageSpeed",
      icon: FaTachometerAlt,
      color: "green"
    },
    {
      label: "Temps de chargement",
      value: "1.2",
      unit: "s",
      description: "Temps de chargement initial",
      icon: FaRocket,
      color: color
    },
    {
      label: "SEO Score",
      value: "95",
      unit: "/100",
      description: "Score d'optimisation SEO",
      icon: FaSearchengin,
      color: color
    },
    {
      label: "Responsive",
      value: "100",
      unit: "%",
      description: "Compatibilité mobile parfaite",
      icon: FaMobile,
      color: "blue"
    },
    {
      label: "Sécurité",
      value: "A+",
      unit: "",
      description: "Niveau de sécurité SSL Labs",
      icon: FaShieldAlt,
      color: "green"
    },
    {
      label: "Satisfaction client",
      value: "100",
      unit: "%",
      description: "Retour client très positif",
      icon: FaThumbsUp,
      color: color
    }
  ]

  const finalMetrics = metrics && metrics.length > 0 ? metrics : defaultMetrics

  // Animation des compteurs
  useEffect(() => {
    if (metricsInView) {
      finalMetrics.forEach((metric, index) => {
        const target = parseFloat(metric.value) || 0
        let current = 0
        const increment = target / 60 // Animation sur ~1 seconde
        
        const timer = setInterval(() => {
          current += increment
          if (current >= target) {
            current = target
            clearInterval(timer)
          }
          
          setCounters(prev => ({
            ...prev,
            [index]: metric.value.includes('.') ? current.toFixed(1) : Math.round(current)
          }))
        }, 16) // ~60fps
        
        return () => clearInterval(timer)
      })
    }
  }, [metricsInView, finalMetrics])

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }
  
  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  }

  // Styles pour les backgrounds
  const sectionStyle = {
    background: `linear-gradient(135deg, rgba(${colors.rgb}, 0.03) 0%, #ffffff 50%, rgba(${colors.rgb}, 0.01) 100%)`
  }

  const badgeStyle = {
    background: `rgba(${colors.rgb}, 0.1)`,
    border: `1px solid rgba(${colors.rgb}, 0.15)`,
    color: colors.solid
  }

  return (
    <motion.section 
      ref={sectionRef}
      style={{ 
        opacity: sectionOpacity,
        ...sectionStyle
      }}
      className="py-24 relative overflow-hidden"
    >
      {/* Background décoratif */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-1/3 right-1/4 w-40 h-40 rounded-full opacity-5"
          style={{ backgroundColor: colors.solid }}
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 360]
          }}
          transition={{ duration: 20, repeat: Infinity }}
        />
      </div>

      <div className="container relative z-10">
        
        {/* En-tête */}
        <div className="text-center mb-20">
          <motion.div
            ref={titleRef}
            initial={{ opacity: 0, y: -30, scale: 0.8 }}
            animate={titleInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.6, type: "spring" }}
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full backdrop-blur-sm shadow-lg mb-8"
            style={badgeStyle}
          >
            <div 
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ backgroundColor: colors.solid }}
            >
              <FaChartLine className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-sm uppercase tracking-wider">
              Résultats & Performance
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl md:text-5xl font-bold text-gray-900 mb-6"
          >
            Des résultats qui parlent{' '}
            <span style={{ color: colors.solid }}>d'eux-mêmes</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            Découvrez les performances exceptionnelles obtenues grâce à notre 
            approche technique rigoureuse et nos optimisations poussées.
          </motion.p>
        </div>

        {/* Grille des métriques */}
        <motion.div
          ref={metricsRef}
          variants={containerVariants}
          initial="hidden"
          animate={metricsInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {finalMetrics.map((metric, index) => {
            const IconComponent = metric.icon || FaChartLine
            const currentValue = counters[index] || 0
            
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group"
              >
                <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 h-full">
                  {/* Icône */}
                  <div 
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
                    style={{ backgroundColor: `rgba(${colors.rgb}, 0.1)` }}
                  >
                    <IconComponent 
                      className="w-8 h-8"
                      style={{ color: colors.solid }}
                    />
                  </div>
                  
                  {/* Valeur animée */}
                  <div className="mb-4">
                    <div className="flex items-baseline gap-1">
                      <span 
                        className="text-4xl font-bold"
                        style={{ color: colors.solid }}
                      >
                        {currentValue}
                      </span>
                      <span 
                        className="text-xl font-semibold opacity-70"
                        style={{ color: colors.solid }}
                      >
                        {metric.unit}
                      </span>
                    </div>
                  </div>
                  
                  {/* Label et description */}
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {metric.label}
                  </h3>
                  
                  <div 
                    className="w-12 h-1 rounded-full mb-4"
                    style={{ backgroundColor: colors.solid }}
                  />
                  
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {metric.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Section résultats textuels */}
        {results && (
          <motion.div
            variants={itemVariants}
            className="bg-white p-8 md:p-12 rounded-3xl shadow-lg border border-gray-100 max-w-4xl mx-auto mb-16"
          >
            <div className="text-center mb-8">
              <div 
                className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
                style={{ backgroundColor: `rgba(${colors.rgb}, 0.1)` }}
              >
                <FaAward 
                  className="w-8 h-8"
                  style={{ color: colors.solid }}
                />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Impact & Bénéfices
              </h3>
            </div>
            
            <div className="prose prose-lg max-w-none text-gray-600 text-center">
              {typeof results === 'string' ? (
                <p className="leading-relaxed">{results}</p>
              ) : (
                <div className="space-y-4">
                  {results.map((result, index) => (
                    <p key={index} className="leading-relaxed">
                      {result}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* CTA vers le projet */}
        {projectUrl && (
          <motion.div
            variants={itemVariants}
            className="text-center"
          >
            <Link
              href={projectUrl}
              target="_blank"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              style={{ backgroundColor: colors.solid }}
            >
              <FaExternalLinkAlt className="w-5 h-5" />
              Voir le projet en action
            </Link>
          </motion.div>
        )}
      </div>
    </motion.section>
  )
}