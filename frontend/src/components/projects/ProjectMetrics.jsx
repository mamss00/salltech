// frontend/src/components/projects/ProjectMetrics.jsx
'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaRocket, FaClock, FaCheckCircle, FaShieldAlt, FaMobile, FaChartLine } from 'react-icons/fa'

export default function ProjectMetrics({ metrics, color = 'blue' }) {
  // Animation au défilement
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })
  
  const sectionOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8])
  
  // Animation d'apparition
  const [metricsRef, metricsInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  
  // État pour l'animation des compteurs
  const [counters, setCounters] = useState({
    performance: 0,
    satisfaction: 0,
    delivery: 0,
    maintenance: 0
  })

  // RGB values pour les effets
  const colorRGB = {
    blue: '52, 152, 219',
    purple: '155, 89, 182', 
    red: '231, 76, 60'
  }
  const mainColorRGB = colorRGB[color] || colorRGB.blue

  // Animation des compteurs
  useEffect(() => {
    if (metricsInView) {
      const targets = {
        performance: 98,
        satisfaction: 100,
        delivery: 100,
        maintenance: 100
      }
      
      Object.keys(targets).forEach((key, index) => {
        setTimeout(() => {
          let current = 0
          const target = targets[key]
          const increment = target / 50 // 50 étapes d'animation
          
          const timer = setInterval(() => {
            current += increment
            if (current >= target) {
              current = target
              clearInterval(timer)
            }
            
            setCounters(prev => ({
              ...prev,
              [key]: Math.round(current)
            }))
          }, 30)
        }, index * 200)
      })
    }
  }, [metricsInView])

  // Données des métriques avec icônes
  const metricsData = [
    {
      key: 'performance',
      icon: FaRocket,
      label: 'Performance',
      value: counters.performance,
      suffix: '%',
      description: 'Score PageSpeed Insights',
      color: color
    },
    {
      key: 'satisfaction',
      icon: FaCheckCircle,
      label: 'Satisfaction Client',
      value: counters.satisfaction,
      suffix: '%',
      description: 'Retours clients positifs',
      color: 'purple'
    },
    {
      key: 'delivery',
      icon: FaClock,
      label: 'Livraison',
      value: counters.delivery,
      suffix: '%',
      description: 'Respect des délais',
      color: 'red'
    },
    {
      key: 'maintenance',
      icon: FaShieldAlt,
      label: 'Disponibilité',
      value: counters.maintenance,
      suffix: '%',
      description: 'Uptime du service',
      color: color
    }
  ]

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }
  
  const itemVariants = {
    hidden: { y: 30, opacity: 0, scale: 0.9 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  }

  return (
    <motion.section 
      ref={sectionRef}
      style={{ opacity: sectionOpacity }}
      className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden"
    >
      {/* Fond décoratif */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Grille sophistiquée */}
        <div className="absolute inset-0 opacity-5">
          <svg width="100%" height="100%">
            <pattern id="metricsPattern" patternUnits="userSpaceOnUse" width="60" height="60">
              <circle cx="30" cy="30" r="1" fill={`rgb(${mainColorRGB})`} />
              <circle cx="15" cy="15" r="0.5" fill={`rgb(${mainColorRGB})`} />
              <circle cx="45" cy="45" r="0.5" fill={`rgb(${mainColorRGB})`} />
              <path d="M15,15 L30,30 L45,45" stroke={`rgb(${mainColorRGB})`} strokeWidth="0.3" fill="none" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#metricsPattern)" />
          </svg>
        </div>

        {/* Formes géométriques */}
        <motion.div
          className="absolute top-20 right-20 w-32 h-32 opacity-5"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <polygon points="50,10 90,50 50,90 10,50" fill={`rgb(${mainColorRGB})`} />
          </svg>
        </motion.div>
      </div>

      <div className="container relative z-10">
        {/* En-tête */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={metricsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className={`inline-block text-${color} font-semibold tracking-wider uppercase text-sm mb-4`}
          >
            Résultats Mesurables
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={metricsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-6"
          >
            Performance &{' '}
            <span className={`text-${color}`}>Excellence</span>
          </motion.h2>
          
          <motion.div 
            initial={{ width: 0 }}
            animate={metricsInView ? { width: "6rem" } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className={`h-1 bg-${color} mx-auto mb-8`}
          ></motion.div>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={metricsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg text-gray-600 max-w-3xl mx-auto"
          >
            Des chiffres qui parlent d'eux-mêmes et démontrent notre engagement vers l'excellence.
          </motion.p>
        </div>

        {/* Grille des métriques */}
        <motion.div
          ref={metricsRef}
          variants={containerVariants}
          initial="hidden"
          animate={metricsInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {metricsData.map((metric, index) => (
            <motion.div
              key={metric.key}
              variants={itemVariants}
              className="group"
            >
              <div className="relative p-8 bg-white rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-2 text-center">
                {/* Icône */}
                <div className={`w-16 h-16 bg-gradient-to-br from-${metric.color}/10 to-${metric.color}/5 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:from-${metric.color}/20 group-hover:to-${metric.color}/10 transition-colors border border-${metric.color}/10`}>
                  <metric.icon className={`w-8 h-8 text-${metric.color}`} />
                </div>
                
                {/* Valeur avec animation */}
                <div className={`text-4xl font-extrabold text-${metric.color} mb-2`}>
                  {metric.value}
                  <span className="text-2xl">{metric.suffix}</span>
                </div>
                
                {/* Label */}
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {metric.label}
                </h3>
                
                {/* Description */}
                <p className="text-sm text-gray-600">
                  {metric.description}
                </p>
                
                {/* Barre de progression */}
                <div className="mt-4 w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full bg-gradient-to-r from-${metric.color} to-${metric.color}/70`}
                    initial={{ width: 0 }}
                    animate={metricsInView ? { width: `${metric.value}%` } : {}}
                    transition={{ 
                      duration: 1.5, 
                      delay: 0.5 + (index * 0.2),
                      ease: "easeOut"
                    }}
                  ></motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Section bonus - Certifications/Technologies */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={metricsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-16 text-center"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: FaMobile, label: "Responsive Design" },
              { icon: FaShieldAlt, label: "Sécurité SSL" },
              { icon: FaChartLine, label: "SEO Optimisé" },
              { icon: FaRocket, label: "Performance+" }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={metricsInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 1.2 + (index * 0.1) }}
                className="flex flex-col items-center p-4 bg-white rounded-lg border border-gray-100 hover:shadow-md transition-shadow"
              >
                <feature.icon className={`w-6 h-6 text-${color} mb-2`} />
                <span className="text-sm font-medium text-gray-700">{feature.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}