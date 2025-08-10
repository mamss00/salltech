// frontend/src/components/projects/ProjectTechnologies.jsx - VERSION CORRIGÉE
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
  
  // CORRECTION 1: Dédoublonner les technologies
  const uniqueTechnologies = (() => {
    if (!technologies || !Array.isArray(technologies)) return []
    
    const seen = new Set()
    return technologies.filter(tech => {
      if (!tech || !tech.nom) return false
      
      // Utiliser le nom comme clé unique
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

  // CORRECTION 2: Ne pas afficher si pas de technologies
  if (!uniqueTechnologies || uniqueTechnologies.length === 0) return null

  return (
    <motion.section 
      ref={sectionRef}
      style={{ opacity: sectionOpacity }}
      className="py-20 bg-gray-900 text-white relative overflow-hidden"
    >
      {/* Effet de particules techniques - RÉDUIT */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-gray-700 font-mono text-xs opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          >
            {i % 4 === 0 ? '{' : i % 4 === 1 ? '}' : i % 4 === 2 ? '<>' : '/>'}
          </motion.div>
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
            className="text-3xl md:text-4xl font-bold mb-6"
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
            className="text-lg text-gray-300 max-w-3xl mx-auto"
          >
            Les technologies et outils utilisés pour réaliser ce projet exceptionnel.
          </motion.p>
        </div>
        
        {/* CORRECTION 3: UNE SEULE section d'affichage - Grille propre */}
        <motion.div
          ref={techRef}
          variants={containerVariants}
          initial="hidden"
          animate={techInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {uniqueTechnologies.map((tech, index) => (
            <motion.div
              key={`tech-${tech.nom}-${index}`} // Clé unique
              variants={itemVariants}
              className="group"
            >
              <div className="p-6 bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700 hover:border-gray-600 hover:bg-gray-800/50 transition-all duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-3 h-3 bg-${color} rounded-full group-hover:animate-pulse`}></div>
                  <h4 className="text-lg font-semibold text-white">
                    {tech.nom}
                  </h4>
                </div>
                
                <p className="text-gray-300 text-sm leading-relaxed">
                  {tech.description || 'Technologie utilisée dans ce projet'}
                </p>
                
                {/* Barre de progression décorative */}
                <div className="mt-4 w-full h-1 bg-gray-700 rounded-full overflow-hidden">
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
        
        {/* Badge de performance - CORRECTION 4: Afficher le vrai nombre */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={techInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center gap-4 px-8 py-4 bg-gray-800/50 backdrop-blur-sm rounded-full border border-gray-700">
            <div className={`w-3 h-3 bg-${color} rounded-full animate-pulse`}></div>
            <span className="text-gray-300 font-medium">
              {uniqueTechnologies.length} {uniqueTechnologies.length === 1 ? 'technologie maîtrisée' : 'technologies maîtrisées'}
            </span>
            <div className={`w-3 h-3 bg-${color} rounded-full animate-pulse`}></div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}