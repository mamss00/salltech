'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import DynamicIcon from '@/utils/DynamicIcon'

export default function ProjectFeatures({ features, color = 'blue' }) {
  // Animation au défilement
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })
  
  const sectionOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8])
  
  // Animation d'apparition
  const [titleRef, titleInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [featuresRef, featuresInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  
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

  if (!features || features.length === 0) return null

  return (
    <motion.section 
      ref={sectionRef}
      style={{ opacity: sectionOpacity }}
      className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden"
    >
      {/* Éléments décoratifs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-1 h-1 bg-${color}/20 rounded-full`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="container relative z-10">
        {/* En-tête de section */}
        <div className="text-center mb-16">
          <motion.span
            ref={titleRef}
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className={`inline-block text-${color} font-semibold tracking-wider uppercase text-sm mb-4`}
          >
            FONCTIONNALITÉS CLÉS
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-6"
          >
            Ce qui rend ce projet{' '}
            <span className={`text-${color}`}>exceptionnel</span>
          </motion.h2>
          
          <motion.div 
            initial={{ width: 0 }}
            animate={titleInView ? { width: "6rem" } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className={`h-1 bg-${color} mx-auto mb-8`}
          ></motion.div>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg text-gray-600 max-w-3xl mx-auto"
          >
            Découvrez les fonctionnalités et innovations techniques qui font 
            de ce projet une réalisation remarquable.
          </motion.p>
        </div>
        
        {/* Grille des fonctionnalités */}
        <motion.div
          ref={featuresRef}
          variants={containerVariants}
          initial="hidden"
          animate={featuresInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group"
            >
              <div className="relative h-full p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-gray-100">
                {/* Élément décoratif en arrière-plan */}
                <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-${color}/5 to-transparent rounded-bl-2xl`}></div>
                
                {/* Icône */}
                <div className={`w-16 h-16 bg-${color}/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-${color}/20 transition-colors relative z-10`}>
                  <DynamicIcon 
                    name={feature.icone || 'FaStar'} 
                    className={`w-7 h-7 text-${color}`} 
                  />
                </div>
                
                {/* Contenu */}
                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-gray-800">
                    {feature.titre}
                  </h3>
                  
                  <div className={`w-12 h-0.5 bg-${color}/60 mb-4 group-hover:w-16 transition-all duration-300`}></div>
                  
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
                
                {/* Effet de survol */}
                <div className={`absolute inset-0 bg-gradient-to-br from-${color}/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl`}></div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Statistiques ou badges si besoin */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={featuresInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white rounded-full shadow-lg border border-gray-100">
            <div className={`w-2 h-2 bg-${color} rounded-full animate-pulse`}></div>
            <span className="text-gray-600 font-medium">
              {features.length} fonctionnalités développées sur mesure
            </span>
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}