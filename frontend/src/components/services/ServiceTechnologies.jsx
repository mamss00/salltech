'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import { getStrapiMediaUrl } from '@/utils/helpers'

export default function ServiceTechnologies({ technologies, color = 'blue' }) {
  // Référence pour l'animation au défilement
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })
  
  // Animation de la section complète lors du défilement
  const containerOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.6, 1, 1, 0.6])
  
  // Animation des titres et contenu
  const [titleRef, titleInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [techGridRef, techGridInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  
  // Variants pour la grille
  const gridVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2
      }
    }
  }
  
  // Variants pour les cartes individuelles
  const cardVariants = {
    hidden: { 
      y: 20, 
      opacity: 0
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 50,
        damping: 15
      }
    }
  }
  
  if (!technologies || technologies.length === 0) {
    return null;
  }

  return (
    <section 
      ref={containerRef}
      className="py-20 relative overflow-hidden bg-gray-50"
    >
      {/* Arrière-plan technique */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {/* Motif de circuits */}
        <svg width="100%" height="100%" className="absolute opacity-5" viewBox="0 0 800 800">
          <pattern id="circuitPattern" patternUnits="userSpaceOnUse" width="100" height="100">
            <path d="M 0 50 L 100 50 M 50 0 L 50 100" stroke={`var(--color-${color})`} strokeWidth="0.5" fill="none" />
            <circle cx="50" cy="50" r="3" fill="none" stroke={`var(--color-${color})`} strokeWidth="0.5" />
            <circle cx="0" cy="50" r="3" fill="none" stroke={`var(--color-${color})`} strokeWidth="0.5" />
            <circle cx="100" cy="50" r="3" fill="none" stroke={`var(--color-${color})`} strokeWidth="0.5" />
            <circle cx="50" cy="0" r="3" fill="none" stroke={`var(--color-${color})`} strokeWidth="0.5" />
            <circle cx="50" cy="100" r="3" fill="none" stroke={`var(--color-${color})`} strokeWidth="0.5" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#circuitPattern)" />
        </svg>
        
        {/* Formes techniques */}
        <motion.div 
          className={`absolute top-10 right-10 w-96 h-96 rounded-full bg-gradient-to-bl from-${color}/5 to-transparent opacity-60 blur-3xl`}
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.4, 0.6, 0.4]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "mirror"
          }}
        />
        
        <motion.div 
          className="absolute bottom-10 left-10 w-64 h-64 rounded-full bg-gradient-to-tr from-purple/5 to-transparent opacity-60 blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "mirror",
            delay: 2
          }}
        />
      </div>

      <motion.div 
        className="container relative z-10"
        style={{ opacity: containerOpacity }}
      >
        {/* En-tête de section avec style tech */}
        <motion.div 
          ref={titleRef}
          className="text-center mb-16"
        >
          {/* Badge tech */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <span className="inline-block px-4 py-1.5 bg-gray-900 text-white text-xs tracking-wider font-medium rounded-md border border-gray-700 shadow-inner">
              &lt;TECHNOLOGIES /&gt;
            </span>
          </motion.div>
          
          {/* Titre avec style tech */}
          <motion.h2
            initial={{ opacity: 0 }}
            animate={titleInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-3xl md:text-5xl font-bold relative inline-block mb-8"
          >
            <span>Technologies</span>
            <motion.span
              initial={{ opacity: 0, x: 20 }}
              animate={titleInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
              className={`text-${color} ml-3`}
            >
              utilisées
            </motion.span>
            
            {/* Ligne clignotante (effet d'invite de commande) */}
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1.2, repeat: Infinity }}
              className={`absolute -right-4 top-2 h-8 w-1 bg-${color}`}
            />
          </motion.h2>
          
          {/* Sous-titre technique */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-lg text-gray-600 max-w-3xl mx-auto"
          >
            Nous utilisons les technologies les plus modernes et performantes pour créer vos solutions
          </motion.p>
        </motion.div>
        
        {/* Grille de technologies avec style tech */}
        <motion.div
          ref={techGridRef}
          variants={gridVariants}
          initial="hidden"
          animate={techGridInView ? "visible" : "hidden"}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
        >
          {technologies.map((tech, index) => {
            // Récupérer l'URL du logo
            let logoUrl = null;
            if (tech.logo?.data) {
              logoUrl = getStrapiMediaUrl(tech.logo.data.attributes.url);
            } else if (tech.logo?.url) {
              logoUrl = getStrapiMediaUrl(tech.logo.url);
            }
            
            // Effet de délai progressif
            const delay = 0.15 * index;

            return (
              <motion.div 
                key={index}
                variants={cardVariants}
                custom={index}
                whileHover={{ 
                  y: -8,
                  transition: { 
                    type: "spring", 
                    stiffness: 400, 
                    damping: 10 
                  }
                }}
                className="h-full"
              >
                <div className="bg-white rounded-lg h-full shadow-sm overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-lg relative group">
                  {/* Bordure supérieure avec effet lumineux */}
                  <motion.div 
                    className={`h-1 w-full bg-${color}`}
                    animate={{
                      backgroundImage: [
                        `linear-gradient(90deg, var(--color-${color}) 0%, transparent 100%)`,
                        `linear-gradient(90deg, transparent 0%, var(--color-${color}) 50%, transparent 100%)`,
                        `linear-gradient(90deg, transparent 0%, var(--color-${color}) 100%)`
                      ]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "mirror",
                      delay: delay
                    }}
                  />
                  
                  <div className="p-5 flex flex-col items-center">
                    {/* Logo ou initial */}
                    {logoUrl ? (
                      <motion.div
                        className="w-16 h-16 flex items-center justify-center mb-4"
                        initial={{ rotateY: 90, opacity: 0 }}
                        animate={{ rotateY: 0, opacity: 1 }}
                        transition={{ delay: delay + 0.2, duration: 0.5 }}
                      >
                        <Image
                          src={logoUrl}
                          alt={tech.nom || `Technologie ${index + 1}`}
                          width={64}
                          height={64}
                          className="object-contain w-full h-full"
                        />
                        
                        {/* Effet de brillance */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                          animate={{
                            x: ["200%", "-200%"]
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            repeatType: "loop",
                            repeatDelay: 4,
                            delay: delay + 1
                          }}
                        />
                      </motion.div>
                    ) : (
                      <motion.div
                        className={`relative w-16 h-16 flex items-center justify-center mb-4 rounded-full border border-${color}/20 bg-gray-50`}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ 
                          delay: delay + 0.2, 
                          type: "spring", 
                          stiffness: 100 
                        }}
                      >
                        <motion.div
                          className={`text-lg font-semibold text-${color}`}
                          animate={{
                            textShadow: [
                              "0 0 0px transparent",
                              `0 0 10px var(--color-${color})`,
                              "0 0 0px transparent"
                            ]
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            repeatType: "mirror",
                            delay: delay
                          }}
                        >
                          {tech.nom?.charAt(0) || '?'}
                        </motion.div>
                        
                        {/* Cercles concentriques animés */}
                        <motion.div
                          className={`absolute inset-0 rounded-full border border-${color}/20`}
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            repeatType: "mirror",
                            delay: delay
                          }}
                        />
                      </motion.div>
                    )}
                    
                    {/* Nom de la technologie */}
                    <motion.h3
                      className="text-base font-medium mb-1 text-gray-800"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: delay + 0.3, duration: 0.4 }}
                    >
                      {tech.nom || `Technologie ${index + 1}`}
                    </motion.h3>
                    
                    {/* Description avec effet d'apparition */}
                    {tech.description && (
                      <motion.div
                        className="text-xs text-gray-500 text-center line-clamp-2 overflow-hidden"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        transition={{ delay: delay + 0.4, duration: 0.4 }}
                      >
                        {tech.description}
                      </motion.div>
                    )}
                  </div>
                  
                  {/* Points lumineux aux coins - effet tech */}
                  <motion.div 
                    className={`absolute top-0 left-0 w-1 h-1 rounded-full bg-${color}`}
                    animate={{ opacity: [0.2, 1, 0.2] }}
                    transition={{ duration: 2, repeat: Infinity, delay: delay }}
                  />
                  <motion.div 
                    className={`absolute top-0 right-0 w-1 h-1 rounded-full bg-${color}`}
                    animate={{ opacity: [0.2, 1, 0.2] }}
                    transition={{ duration: 2, repeat: Infinity, delay: delay + 0.5 }}
                  />
                  <motion.div 
                    className={`absolute bottom-0 left-0 w-1 h-1 rounded-full bg-${color}`}
                    animate={{ opacity: [0.2, 1, 0.2] }}
                    transition={{ duration: 2, repeat: Infinity, delay: delay + 1 }}
                  />
                  <motion.div 
                    className={`absolute bottom-0 right-0 w-1 h-1 rounded-full bg-${color}`}
                    animate={{ opacity: [0.2, 1, 0.2] }}
                    transition={{ duration: 2, repeat: Infinity, delay: delay + 1.5 }}
                  />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </section>
  )
}