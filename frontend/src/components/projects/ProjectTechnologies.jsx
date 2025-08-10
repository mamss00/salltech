// frontend/src/components/projects/ProjectTechnologies.jsx - VERSION CLAIRE
'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export default function ProjectTechnologies({ technologies, color = 'blue' }) {
  // Animation au défilement
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })
  
  const sectionOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8])
  
  // Animation d'apparition
  const [titleRef, titleInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [techRef, techInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  
  // Dédoublonner les technologies
  const uniqueTechnologies = (() => {
    if (!technologies || !Array.isArray(technologies)) return []
    
    const seen = new Set()
    return technologies.filter(tech => {
      if (!tech || !tech.nom) return false
      
      const key = tech.nom.toLowerCase().trim()
      if (seen.has(key)) return false
      
      seen.add(key)
      return true
    })
  })()
  
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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  }

  if (!uniqueTechnologies || uniqueTechnologies.length === 0) return null

  return (
    <motion.section 
      ref={sectionRef}
      style={{ opacity: sectionOpacity }}
      className="py-20 bg-gradient-to-br from-white to-gray-50 relative overflow-hidden"
    >
      {/* Éléments décoratifs légers */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Motifs géométriques légers */}
        <div className="absolute top-10 left-10 w-32 h-32 opacity-5">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="2" fill={`var(--color-${color})`} />
            <circle cx="30" cy="30" r="1" fill={`var(--color-${color})`} />
            <circle cx="70" cy="70" r="1.5" fill={`var(--color-${color})`} />
            <path d="M30,30 L50,50 L70,70" stroke={`var(--color-${color})`} strokeWidth="0.5" fill="none" />
          </svg>
        </div>
        
        <div className="absolute bottom-20 right-20 w-24 h-24 opacity-5">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <rect x="40" y="40" width="20" height="20" fill="none" stroke={`var(--color-${color})`} strokeWidth="1" />
            <rect x="20" y="20" width="60" height="60" fill="none" stroke={`var(--color-${color})`} strokeWidth="0.5" />
          </svg>
        </div>
        
        {/* Particules flottantes */}
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-2 h-2 bg-${color}/10 rounded-full`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3,
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
            STACK TECHNIQUE
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-6"
          >
            Technologies &{' '}
            <span className={`text-${color}`}>Expertise</span>
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
            Les technologies et outils utilisés pour réaliser ce projet exceptionnel.
          </motion.p>
        </div>
        
        {/* Grille des technologies - Design clair et moderne */}
        <motion.div
          ref={techRef}
          variants={containerVariants}
          initial="hidden"
          animate={techInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {uniqueTechnologies.map((tech, index) => (
            <motion.div
              key={`tech-${tech.nom}-${index}`}
              variants={itemVariants}
              className="group"
            >
              <div className="p-6 bg-white rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-3 h-3 bg-${color} rounded-full group-hover:animate-pulse`}></div>
                  <h4 className="text-lg font-semibold text-gray-900">
                    {tech.nom}
                  </h4>
                </div>
                
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {tech.description || 'Technologie utilisée dans ce projet'}
                </p>
                
                {/* Barre de progression décorative */}
                <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full bg-${color}`}
                    initial={{ width: 0 }}
                    animate={techInView ? { width: "100%" } : {}}
                    transition={{ 
                      duration: 1.5, 
                      delay: index * 0.1,
                      ease: "easeOut"
                    }}
                  ></motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Badge de performance moderne */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={techInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center mt-16"
        >
          <div className={`inline-flex items-center gap-4 px-8 py-4 bg-${color}/10 rounded-full border border-${color}/20`}>
            <div className={`w-3 h-3 bg-${color} rounded-full animate-pulse`}></div>
            <span className="text-gray-700 font-medium">
              {uniqueTechnologies.length} {uniqueTechnologies.length === 1 ? 'technologie maîtrisée' : 'technologies maîtrisées'}
            </span>
            <div className={`w-3 h-3 bg-${color} rounded-full animate-pulse`}></div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}