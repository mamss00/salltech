'use client'

import { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import Link from 'next/link'
import DynamicIcon from '@/utils/DynamicIcon'
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
  
  // Base de données des couleurs des technologies
  const techColors = {
    'React': {
      primary: 'rgb(97, 218, 251)', // Bleu React
      secondary: 'rgb(20, 158, 202)',
      tertiary: 'rgb(8, 126, 164)'
    },
    'Next': {
      primary: 'rgb(0, 0, 0)', // Noir Next.js
      secondary: 'rgb(50, 50, 50)',
      tertiary: 'rgb(100, 100, 100)'
    },
    'Node': {
      primary: 'rgb(83, 158, 67)', // Vert Node.js
      secondary: 'rgb(60, 120, 50)',
      tertiary: 'rgb(40, 90, 33)'
    },
    'WordPress': {
      primary: 'rgb(33, 117, 155)', // Bleu WordPress
      secondary: 'rgb(25, 90, 120)',
      tertiary: 'rgb(15, 70, 90)'
    },
    'Tailwind': {
      primary: 'rgb(56, 189, 248)', // Bleu Tailwind
      secondary: 'rgb(45, 150, 200)',
      tertiary: 'rgb(30, 100, 150)'
    },
    'MongoDB': {
      primary: 'rgb(77, 179, 61)', // Vert MongoDB
      secondary: 'rgb(57, 150, 41)',
      tertiary: 'rgb(37, 120, 21)'
    },
    'Docker': {
      primary: 'rgb(13, 136, 209)', // Bleu Docker
      secondary: 'rgb(10, 100, 160)',
      tertiary: 'rgb(6, 80, 130)'
    },
    'PHP': {
      primary: 'rgb(119, 123, 179)', // Violet PHP
      secondary: 'rgb(90, 94, 150)',
      tertiary: 'rgb(70, 74, 130)'
    },
    'MySQL': {
      primary: 'rgb(0, 117, 143)', // Bleu MySQL
      secondary: 'rgb(0, 90, 110)',
      tertiary: 'rgb(0, 70, 90)'
    },
    'Laravel': {
      primary: 'rgb(255, 45, 32)', // Rouge Laravel
      secondary: 'rgb(200, 35, 25)',
      tertiary: 'rgb(160, 25, 20)'
    },
    'Vue': {
      primary: 'rgb(65, 184, 131)', // Vert Vue.js
      secondary: 'rgb(50, 160, 110)',
      tertiary: 'rgb(35, 140, 95)'
    },
    'Python': {
      primary: 'rgb(55, 118, 171)', // Bleu Python
      secondary: 'rgb(255, 211, 67)',
      tertiary: 'rgb(55, 118, 171)'
    }
  };
  
  // Couleurs par défaut
  const defaultColors = {
    primary: `var(--color-${color})`,
    secondary: `var(--color-purple)`,
    tertiary: `var(--color-red)`
  };
  
  // Fonction pour analyser le nom de la technologie et trouver la meilleure correspondance
  const getTechColorScheme = (fullTechName) => {
    if (!fullTechName) return defaultColors;
    
    // Séparer les différentes parties du nom (ex: "React & Next.js" -> ["React", "Next.js"])
    const techParts = fullTechName.split(/\s*[&,+]\s*|\s+/).map(part => 
      part.replace(/\.js$/i, '').replace(/CSS$/i, '').trim()
    );
    
    // Chercher une correspondance pour chaque partie
    for (const part of techParts) {
      // Chercher une correspondance exacte
      for (const [tech, colors] of Object.entries(techColors)) {
        if (part.toLowerCase() === tech.toLowerCase()) {
          return colors;
        }
      }
      
      // Chercher une correspondance partielle
      for (const [tech, colors] of Object.entries(techColors)) {
        if (part.toLowerCase().includes(tech.toLowerCase()) || 
            tech.toLowerCase().includes(part.toLowerCase())) {
          return colors;
        }
      }
    }
    
    // Si aucune correspondance n'est trouvée, utiliser les couleurs par défaut
    return defaultColors;
  };
  
  // Fonction pour créer un dégradé à partir des couleurs
  const createGradient = (colorScheme) => {
    return `linear-gradient(90deg, ${colorScheme.primary} 0%, ${colorScheme.secondary} 50%, ${colorScheme.tertiary} 100%)`;
  };
  
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
            
            {/* Curseur clignotant (effet d'invite de commande) */}
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
            
            // Obtenir dynamiquement les couleurs pour cette technologie
            const colorScheme = getTechColorScheme(tech.nom);
            const gradient = createGradient(colorScheme);
            
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
                  {/* Ligne décorative adaptative */}
                  <div className="h-1 w-full overflow-hidden">
                    <motion.div
                      className="h-full w-full"
                      style={{
                        backgroundImage: gradient,
                        backgroundSize: "200% 100%"
                      }}
                      animate={{
                        backgroundPosition: ["0% 0%", "100% 0%", "0% 0%"]
                      }}
                      transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  </div>
                  
                  <div className="p-5 flex flex-col items-center">
                    {/* Logo ou initial avec container standardisé */}
                    <div className="relative w-16 h-16 flex items-center justify-center mb-4 overflow-hidden">
                      {logoUrl ? (
                        <motion.div
                          className="w-full h-full flex items-center justify-center"
                          initial={{ scale: 0, rotateY: 90 }}
                          animate={{ scale: 1, rotateY: 0 }}
                          transition={{ 
                            type: "spring",
                            stiffness: 70,
                            damping: 15,
                            delay: delay + 0.2
                          }}
                        >
                          <Image
                            src={logoUrl}
                            alt={tech.nom || `Technologie ${index + 1}`}
                            width={64}
                            height={64}
                            className="object-contain max-w-full max-h-full"
                          />
                          
                          {/* Effet de brillance sur le logo */}
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                            initial={{ x: "200%" }}
                            animate={{ x: ["-200%", "200%"] }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              repeatDelay: 4,
                              delay: delay + 1,
                              ease: "easeInOut"
                            }}
                          />
                        </motion.div>
                      ) : (
                        <motion.div
                          className="flex items-center justify-center w-10 h-10 rounded-full"
                          style={{ backgroundColor: `${colorScheme.primary}15` }}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ 
                            type: "spring", 
                            stiffness: 100,
                            damping: 15,
                            delay: delay + 0.2
                          }}
                        >
                          <motion.span
                            style={{ color: colorScheme.primary }}
                            className="text-lg font-semibold"
                            animate={{
                              textShadow: [
                                "0 0 0px transparent",
                                `0 0 10px ${colorScheme.primary}`,
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
                          </motion.span>
                          
                          {/* Cercles concentriques animés */}
                          <motion.div
                            style={{ borderColor: `${colorScheme.primary}30` }}
                            className="absolute w-12 h-12 rounded-full border"
                            animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                              repeatType: "mirror"
                            }}
                          />
                          <motion.div
                            style={{ borderColor: `${colorScheme.primary}15` }}
                            className="absolute w-16 h-16 rounded-full border"
                            animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.8, 0.4] }}
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                              repeatType: "mirror",
                              delay: 0.2
                            }}
                          />
                        </motion.div>
                      )}
                    </div>
                    
                    {/* Nom de la technologie */}
                    <motion.h3
                      className="text-base font-medium mb-1 min-h-[2.5rem] flex items-center justify-center text-center transition-colors duration-300"
                      style={{ 
                        color: 'rgba(70, 70, 70, 1)', 
                      }}
                      whileHover={{ color: colorScheme.primary }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: delay + 0.3, duration: 0.4 }}
                    >
                      {tech.nom || `Technologie ${index + 1}`}
                    </motion.h3>
                    
                    {/* Ligne décorative */}
                    <motion.div
                      className="h-px my-2"
                      style={{ 
                        backgroundImage: gradient,
                        backgroundSize: "200% 100%"
                      }}
                      initial={{ width: 0 }}
                      animate={{ 
                        width: '40px',
                        backgroundPosition: ["0% 0%", "100% 0%", "0% 0%"]
                      }}
                      transition={{ 
                        width: { delay: delay + 0.35, duration: 0.6 },
                        backgroundPosition: {
                          duration: 8,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }
                      }}
                    />
                    
                    {/* Description avec effet d'apparition et de défilement */}
                    {tech.description && (
                      <motion.div
                        className="text-xs text-gray-500 text-center h-[2.5em] overflow-hidden relative"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "2.5em" }}
                        transition={{ delay: delay + 0.4, duration: 0.4 }}
                      >
                        <motion.div
                          initial={{ y: 0 }}
                          animate={{ 
                            y: tech.description.length > 30 ? [-40, 0, -40] : 0
                          }}
                          transition={{
                            duration: 10,
                            repeat: Infinity,
                            repeatType: "loop",
                            delay: delay + 1
                          }}
                        >
                          {tech.description}
                        </motion.div>
                      </motion.div>
                    )}
                  </div>
                  
                  {/* Points lumineux aux coins */}
                  <motion.div 
                    className="absolute top-0 left-0 w-1 h-1 rounded-full"
                    style={{ backgroundColor: colorScheme.primary }}
                    animate={{ opacity: [0.2, 1, 0.2] }}
                    transition={{ duration: 2, repeat: Infinity, delay: delay }}
                  />
                  <motion.div 
                    className="absolute top-0 right-0 w-1 h-1 rounded-full"
                    style={{ backgroundColor: colorScheme.secondary }}
                    animate={{ opacity: [0.2, 1, 0.2] }}
                    transition={{ duration: 2, repeat: Infinity, delay: delay + 0.5 }}
                  />
                  <motion.div 
                    className="absolute bottom-0 left-0 w-1 h-1 rounded-full"
                    style={{ backgroundColor: colorScheme.secondary }}
                    animate={{ opacity: [0.2, 1, 0.2] }}
                    transition={{ duration: 2, repeat: Infinity, delay: delay + 1 }}
                  />
                  <motion.div 
                    className="absolute bottom-0 right-0 w-1 h-1 rounded-full"
                    style={{ backgroundColor: colorScheme.primary }}
                    animate={{ opacity: [0.2, 1, 0.2] }}
                    transition={{ duration: 2, repeat: Infinity, delay: delay + 1.5 }}
                  />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
        
        {/* Bouton de fin de section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={techGridInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1, duration: 0.6 }}
          className="flex justify-center mt-14"
        >
          <div 
            className="w-12 h-12 rounded-full shadow-md flex items-center justify-center text-white cursor-pointer"
            style={{ 
              background: `linear-gradient(135deg, var(--color-${color}) 0%, var(--color-purple) 50%, var(--color-red) 100%)` 
            }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}