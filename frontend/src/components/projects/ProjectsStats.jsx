'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaGlobe, FaMobile, FaShoppingCart, FaUsers, FaTrophy, FaHeart } from 'react-icons/fa'

export default function ProjectsStats({ stats }) {
  // Animation au défilement
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })
  
  const sectionOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8])
  
  // Animation d'apparition
  const [statsRef, statsInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  
  // États pour l'animation des compteurs
  const [animatedStats, setAnimatedStats] = useState({
    total: 0,
    websites: 0,
    mobile: 0,
    ecommerce: 0,
    clients: 0
  })
  
  // Animation des compteurs
  useEffect(() => {
    if (statsInView) {
      const duration = 2000 // 2 secondes
      const steps = 60
      const stepDuration = duration / steps
      
      let step = 0
      const timer = setInterval(() => {
        step++
        const progress = step / steps
        const easeOutQuart = 1 - Math.pow(1 - progress, 4)
        
        setAnimatedStats({
          total: Math.round(stats.total * easeOutQuart),
          websites: Math.round(stats.websites * easeOutQuart),
          mobile: Math.round(stats.mobile * easeOutQuart),
          ecommerce: Math.round(stats.ecommerce * easeOutQuart),
          clients: Math.round(stats.clients * easeOutQuart)
        })
        
        if (step >= steps) {
          clearInterval(timer)
          setAnimatedStats(stats)
        }
      }, stepDuration)
      
      return () => clearInterval(timer)
    }
  }, [statsInView, stats])
  
  // Configuration des statistiques avec icônes et couleurs
  const statsConfig = [
    {
      key: 'total',
      label: 'Projets réalisés',
      icon: FaTrophy,
      color: 'purple',
      suffix: '+'
    },
    {
      key: 'websites',
      label: 'Sites web',
      icon: FaGlobe,
      color: 'blue',
      suffix: ''
    },
    {
      key: 'mobile',
      label: 'Apps mobiles',
      icon: FaMobile,
      color: 'green',
      suffix: ''
    },
    {
      key: 'ecommerce',
      label: 'E-commerce',
      icon: FaShoppingCart,
      color: 'red',
      suffix: ''
    },
    {
      key: 'clients',
      label: 'Clients satisfaits',
      icon: FaUsers,
      color: 'yellow',
      suffix: '+'
    },
    {
      key: 'satisfaction',
      label: 'Satisfaction',
      icon: FaHeart,
      color: 'pink',
      value: 100,
      suffix: '%'
    }
  ]
  
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
      className="py-20 bg-gradient-to-br from-gray-900 via-purple/20 to-gray-900 text-white relative overflow-hidden"
    >
      {/* Éléments décoratifs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Particules flottantes */}
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
        
        {/* Formes géométriques */}
        <motion.div
          className="absolute top-20 right-20 w-40 h-40 border border-purple/20 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
        
        <motion.div
          className="absolute bottom-20 left-20 w-32 h-32 bg-purple/10 rounded-lg"
          animate={{ 
            rotate: [0, 45, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      <div className="container relative z-10">
        {/* En-tête de section */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={statsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-block text-purple font-semibold tracking-wider uppercase text-sm mb-4"
          >
            NOS CHIFFRES CLÉS
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={statsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl md:text-4xl font-bold mb-6"
          >
            L'excellence en{' '}
            <span className="text-purple">chiffres</span>
          </motion.h2>
          
          <motion.div 
            initial={{ width: 0 }}
            animate={statsInView ? { width: "6rem" } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="h-1 bg-purple mx-auto mb-8"
          ></motion.div>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={statsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg text-gray-300 max-w-3xl mx-auto"
          >
            Des résultats concrets qui témoignent de notre engagement 
            et de la qualité de nos réalisations.
          </motion.p>
        </div>
        
        {/* Grille des statistiques */}
        <motion.div
          ref={statsRef}
          variants={containerVariants}
          initial="hidden"
          animate={statsInView ? "visible" : "hidden"}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8"
        >
          {statsConfig.map((stat, index) => {
            const IconComponent = stat.icon
            const value = stat.key === 'satisfaction' ? stat.value : animatedStats[stat.key]
            
            return (
              <motion.div
                key={stat.key}
                variants={itemVariants}
                className="group text-center"
              >
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 hover:border-gray-600 hover:bg-gray-800/70 transition-all duration-300">
                  {/* Icône */}
                  <div className={`w-16 h-16 bg-${stat.color}/20 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-${stat.color}/30 transition-colors`}>
                    <IconComponent className={`w-7 h-7 text-${stat.color}`} />
                  </div>
                  
                  {/* Valeur animée */}
                  <div className={`text-3xl md:text-4xl font-bold text-${stat.color} mb-2`}>
                    {value}{stat.suffix}
                  </div>
                  
                  {/* Label */}
                  <div className="text-gray-300 text-sm font-medium">
                    {stat.label}
                  </div>
                  
                  {/* Barre de progression décorative */}
                  <div className="mt-4 w-full h-1 bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full bg-${stat.color}`}
                      initial={{ width: 0 }}
                      animate={statsInView ? { width: "100%" } : {}}
                      transition={{ 
                        duration: 2, 
                        delay: 0.5 + (index * 0.1),
                        ease: "easeOut"
                      }}
                    ></motion.div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
        
        {/* Citation inspirante */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={statsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="text-center mt-16"
        >
          <blockquote className="text-xl md:text-2xl text-gray-300 italic mb-6 max-w-4xl mx-auto">
            "Chaque projet est une nouvelle opportunité de dépasser les attentes 
            et de créer des solutions qui transforment réellement les entreprises."
          </blockquote>
          
          <div className="flex items-center justify-center gap-3">
            <div className="w-12 h-12 bg-purple/20 rounded-full flex items-center justify-center">
              <span className="text-purple font-bold text-lg">S</span>
            </div>
            <div className="text-left">
              <div className="font-semibold text-white">Équipe SALLTECH</div>
              <div className="text-gray-400 text-sm">Experts en solutions digitales</div>
            </div>
          </div>
        </motion.div>
        
        {/* Badge de performance */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={statsInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 2 }}
          className="text-center mt-12"
        >
          <div className="inline-flex items-center gap-4 px-8 py-4 bg-purple/20 backdrop-blur-sm rounded-full border border-purple/30">
            <div className="w-3 h-3 bg-purple rounded-full animate-pulse"></div>
            <span className="text-purple font-semibold">
              100% des projets livrés dans les délais
            </span>
            <div className="w-3 h-3 bg-purple rounded-full animate-pulse"></div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}