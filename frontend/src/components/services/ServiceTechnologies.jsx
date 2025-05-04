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
  
  // Fonction pour extraire l'URL du logo de façon robuste
  const extractLogoUrl = (tech) => {
    if (!tech || !tech.logo) return null;
    
    // Cas 1: Structure Strapi standard - data.attributes
    if (tech.logo?.data?.attributes?.url) {
      return getStrapiMediaUrl(tech.logo.data.attributes.url);
    } 
    // Cas 2: Structure avec formats 
    else if (tech.logo?.data?.attributes?.formats?.small?.url) {
      return getStrapiMediaUrl(tech.logo.data.attributes.formats.small.url);
    }
    else if (tech.logo?.data?.attributes?.formats?.thumbnail?.url) {
      return getStrapiMediaUrl(tech.logo.data.attributes.formats.thumbnail.url);
    } 
    // Cas 3: Structure normalisée - url direct
    else if (tech.logo?.url) {
      return getStrapiMediaUrl(tech.logo.url);
    } 
    // Cas 4: Structure normalisée avec formats
    else if (tech.logo?.formats?.small?.url) {
      return getStrapiMediaUrl(tech.logo.formats.small.url);
    }
    else if (tech.logo?.formats?.thumbnail?.url) {
      return getStrapiMediaUrl(tech.logo.formats.thumbnail.url);
    }
    
    return null;
  };
  
  // Fonction pour déterminer la couleur basée sur le nom de la technologie
  const getTechColor = (index, techName = '') => {
    const techColorMap = {
      'react': 'blue',
      'react.js': 'blue',
      'next': 'blue',
      'node': 'green',
      'node.js': 'green',
      'wordpress': 'blue',
      'woocommerce': 'purple',
      'vue': 'green',
      'angular': 'red',
      'php': 'purple',
      'python': 'blue',
      'javascript': 'yellow',
      'typescript': 'blue',
      'docker': 'blue',
      'mysql': 'blue',
      'postgresql': 'blue',
      'mongodb': 'green',
      'firebase': 'orange',
      'tailwind': 'blue'
    };
    
    if (techName) {
      const lowerName = techName.toLowerCase();
      for (const [key, value] of Object.entries(techColorMap)) {
        if (lowerName.includes(key)) {
          return value;
        }
      }
    }
    
    // Couleurs par défaut basées sur l'index
    return index % 3 === 0 ? color : (index % 3 === 1 ? 'purple' : 'red');
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
        
        {/* Formes techniques animées */}
        <motion.div 
          className="absolute top-10 right-10 w-96 h-96 rounded-full"
          style={{ 
            background: `radial-gradient(circle, rgba(var(--color-${color}), 0.1) 0%, transparent 70%)`,
            filter: 'blur(48px)'
          }}
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
          className="absolute bottom-10 left-10 w-64 h-64 rounded-full"
          style={{ 
            background: `radial-gradient(circle, rgba(var(--color-purple), 0.1) 0%, transparent 70%)`,
            filter: 'blur(48px)'
          }}
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
        {/* En-tête de section tech avec animation améliorée */}
        <motion.div 
          ref={titleRef}
          className="text-center mb-16"
        >
          {/* Badge tech animé */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <motion.span
              whileHover={{ scale: 1.05, boxShadow: '0 5px 15px rgba(0,0,0,0.1)' }}
              className="inline-block px-4 py-1.5 bg-gray-900 text-white text-xs tracking-wider font-medium rounded-md border border-gray-700 shadow-inner"
            >
              &lt;TECHNOLOGIES /&gt;
            </motion.span>
          </motion.div>
          
          {/* Titre avec animation séquentielle */}
          <motion.h2
            initial={{ opacity: 0 }}
            animate={titleInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-3xl md:text-5xl font-bold relative inline-block mb-8"
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={titleInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              Technologies
            </motion.span>
            
            <motion.span
              initial={{ opacity: 0, x: 20 }}
              animate={titleInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
              className={`text-${color} ml-3`}
            >
              utilisées
            </motion.span>
            
            {/* Curseur clignotant avec animation fluide */}
            <motion.span
              animate={{ 
                opacity: [1, 0, 1],
                height: ['1.5em', '1.5em']
              }}
              transition={{ 
                opacity: { duration: 1.2, repeat: Infinity },
                height: { duration: 0 }
              }}
              className={`absolute -right-4 top-2 w-1 bg-${color}`}
              style={{ height: '1.5em' }}
            />
          </motion.h2>
          
          {/* Description animée */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-lg text-gray-600 max-w-3xl mx-auto"
          >
            <motion.span
              initial={{ backgroundSize: '0% 2px' }}
              animate={titleInView ? { backgroundSize: '100% 2px' } : {}}
              transition={{ duration: 1.2, delay: 0.8 }}
              style={{
                background: `linear-gradient(90deg, var(--color-${color}) 0%, var(--color-purple) 50%, var(--color-red) 100%)`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: '0 100%'
              }}
            >
              Nous utilisons les technologies les plus modernes et performantes
            </motion.span>{' '}
            pour créer vos solutions digitales sur mesure
          </motion.p>
        </motion.div>
        
        {/* Grille de technologies avec animation améliorée */}
        <motion.div
          ref={techGridRef}
          variants={gridVariants}
          initial="hidden"
          animate={techGridInView ? "visible" : "hidden"}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
        >
          {technologies.map((tech, index) => {
            // Récupérer l'URL du logo de façon robuste
            const logoUrl = extractLogoUrl(tech);
            
            // Déterminer la couleur en fonction du nom de la technologie ou de l'index
            const techColor = getTechColor(index, tech.nom);
            
            // Effet de délai progressif basé sur l'index
            const delay = 0.15 * index;

            return (
              <motion.div 
                key={index}
                variants={cardVariants}
                custom={index}
                whileHover={{ 
                  y: -8,
                  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                  transition: { 
                    type: "spring", 
                    stiffness: 400, 
                    damping: 10 
                  }
                }}
                className="h-full"
              >
                <div className="bg-white rounded-lg h-full shadow-sm overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-lg relative group">
                  {/* Ligne décorative avec animation de dégradé subtile */}
                  <div className="h-1 w-full overflow-hidden">
                    <motion.div
                      className="h-full w-full"
                      style={{
                        background: `linear-gradient(90deg, var(--color-${techColor}) 0%, var(--color-purple) 50%, var(--color-red) 100%)`,
                        backgroundSize: '200% 100%'
                      }}
                      animate={{
                        backgroundPosition: ['0% 0%', '100% 0%', '0% 0%']
                      }}
                      transition={{
                        duration: 8,
                        ease: "easeInOut",
                        repeat: Infinity,
                        delay: delay * 0.3
                      }}
                    />
                  </div>
                  
                  <div className="p-5 flex flex-col items-center">
                    {/* Conteneur du logo avec effets */}
                    <div className="relative w-16 h-16 flex items-center justify-center mb-4 overflow-hidden">
                      {logoUrl ? (
                        // Si un logo existe, l'afficher avec animation
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
                            onError={(e) => {
                              // Gérer les erreurs de chargement d'image en remplaçant par l'initiale
                              e.target.style.display = 'none';
                              const parent = e.target.parentNode;
                              if (parent) {
                                const initial = document.createElement('div');
                                initial.className = `flex items-center justify-center w-10 h-10 rounded-full bg-${techColor}/10`;
                                initial.innerHTML = `<span class="text-lg font-semibold text-${techColor}">${(tech.nom || '?').charAt(0)}</span>`;
                                parent.appendChild(initial);
                              }
                            }}
                          />
                          
                          {/* Effet de brillance sur le logo */}
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                            initial={{ x: "200%" }}
                            animate={{ x: ["-200%", "200%"] }}
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                              repeatDelay: 5,
                              delay: delay + 1,
                              ease: "easeInOut"
                            }}
                          />
                        </motion.div>
                      ) : (
                        // Fallback pour les technologies sans logo
                        <motion.div
                          className={`flex items-center justify-center w-10 h-10 rounded-full bg-${techColor}/10`}
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
                            className={`text-lg font-semibold text-${techColor}`}
                            animate={{
                              textShadow: [
                                "0 0 0px transparent",
                                `0 0 10px var(--color-${techColor})`,
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
                            className={`absolute w-12 h-12 rounded-full border border-${techColor}/20`}
                            animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                              repeatType: "mirror"
                            }}
                          />
                          <motion.div
                            className={`absolute w-16 h-16 rounded-full border border-${techColor}/10`}
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
                    
                    {/* Nom de la technologie avec hauteur fixe pour les titres longs */}
                    <motion.h3
                      className={`text-base font-medium text-center mb-1 min-h-[2.5rem] flex items-center justify-center group-hover:text-${techColor} transition-colors duration-300`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: delay + 0.3, duration: 0.4 }}
                    >
                      {tech.nom || `Technologie ${index + 1}`}
                    </motion.h3>
                    
                    {/* Séparateur animé */}
                    <motion.div
                      className={`h-px bg-gradient-to-r from-${techColor} via-purple to-red my-2`}
                      initial={{ width: 0 }}
                      animate={{ width: '40px' }}
                      transition={{ delay: delay + 0.4, duration: 0.6 }}
                    />
                    
                    {/* Description avec effet d'apparition et hauteur fixe */}
                    {tech.description && (
                      <motion.div
                        className="text-xs text-gray-500 text-center h-[2.5em] overflow-hidden relative"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: delay + 0.4, duration: 0.4 }}
                      >
                        <motion.div
                          animate={{ 
                            y: tech.description.length > 50 ? [0, -50, 0] : 0
                          }}
                          transition={{ 
                            duration: tech.description.length > 50 ? 8 : 0, 
                            repeat: tech.description.length > 50 ? Infinity : 0,
                            repeatType: "reverse",
                            repeatDelay: 2
                          }}
                        >
                          {tech.description}
                        </motion.div>
                      </motion.div>
                    )}
                  </div>
                  
                  {/* Points lumineux aux coins avec apparition coordonnée */}
                  <motion.div 
                    className={`absolute top-0 left-0 w-1 h-1 rounded-full bg-${techColor}`}
                    animate={{ opacity: [0.2, 1, 0.2] }}
                    transition={{ duration: 2, repeat: Infinity, delay: delay }}
                  />
                  <motion.div 
                    className={`absolute top-0 right-0 w-1 h-1 rounded-full bg-${techColor}`}
                    animate={{ opacity: [0.2, 1, 0.2] }}
                    transition={{ duration: 2, repeat: Infinity, delay: delay + 0.5 }}
                  />
                  <motion.div 
                    className={`absolute bottom-0 left-0 w-1 h-1 rounded-full bg-${techColor}`}
                    animate={{ opacity: [0.2, 1, 0.2] }}
                    transition={{ duration: 2, repeat: Infinity, delay: delay + 1 }}
                  />
                  <motion.div 
                    className={`absolute bottom-0 right-0 w-1 h-1 rounded-full bg-${techColor}`}
                    animate={{ opacity: [0.2, 1, 0.2] }}
                    transition={{ duration: 2, repeat: Infinity, delay: delay + 1.5 }}
                  />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
        
        {/* Animation finale pour la section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={techGridInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="flex justify-center mt-14"
        >
          <motion.div 
            whileHover={{ scale: 1.1, boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
            className={`w-12 h-12 rounded-full bg-gradient-to-br from-${color} via-purple to-red shadow-md flex items-center justify-center text-white cursor-pointer`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </motion.div>
        </motion.div>
      </motion.div>
      
      {/* Styles CSS globaux pour les animations */}
      <style jsx global>{`
        @keyframes gentleGradientAnimate {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </section>
  )
}