'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import { getStrapiMediaUrl } from '@/utils/helpers'

export default function ServiceTechnologies({ technologies, color = 'blue' }) {
  // État pour stocker les couleurs dominantes des logos
  const [logoDominantColors, setLogoDominantColors] = useState({});
  
  // Référence pour l'animation au défilement
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })
  
  // Ajout d'un effet pour le débogage initial des données
  useEffect(() => {
    if (technologies && technologies.length > 0) {
      console.log('Technologies structure:', technologies[0]);
    }
  }, [technologies]);
  
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
  
  // Fonction pour déterminer la couleur dynamique en fonction de l'index ou du nom de technologie
  const getColorForTech = (index, techName = '') => {
    // Mapping de certaines technologies connues à leurs couleurs
    const techColorMap = {
      'react': 'blue',
      'vue': 'green',
      'angular': 'red',
      'node': 'green',
      'javascript': 'yellow',
      'typescript': 'blue',
      'php': 'purple',
      'python': 'blue',
      'java': 'red',
      'mongodb': 'green',
      'mysql': 'blue',
      'postgresql': 'blue',
      'firebase': 'yellow',
      'aws': 'orange',
      'docker': 'blue',
      'kubernetes': 'blue',
      'html': 'red',
      'css': 'blue',
      'sass': 'pink',
      'tailwind': 'blue',
      'bootstrap': 'purple',
      'wordpress': 'blue',
      'laravel': 'red',
      'symfony': 'black',
      'express': 'gray',
      'graphql': 'pink',
      'apollo': 'purple',
      'redux': 'purple',
      'vuex': 'green',
      'gatsby': 'purple',
      'next': 'black',
      'nuxt': 'green',
      'flutter': 'blue',
      'react native': 'blue',
      'swift': 'orange',
      'kotlin': 'purple',
      'stripe': 'purple',
      'paypal': 'blue',
      'android': 'green',
      'ios': 'gray',
      'figma': 'purple',
      'sketch': 'orange',
      'adobe': 'red',
      'photoshop': 'blue',
      'illustrator': 'orange',
      'xd': 'purple',
      'indesign': 'pink',
      'git': 'orange',
      'github': 'black',
      'gitlab': 'orange',
      'bitbucket': 'blue',
      'netlify': 'blue',
      'vercel': 'black',
      'heroku': 'purple',
      'digitalocean': 'blue',
      'google cloud': 'blue',
      'azure': 'blue',
      'redis': 'red',
      'elasticsearch': 'green',
      'go': 'blue',
      'rust': 'orange',
      'c#': 'purple',
      '.net': 'purple',
      'ruby': 'red',
      'rails': 'red',
      'django': 'green',
      'flask': 'black',
      'spring': 'green',
      'fastapi': 'green',
      'webpack': 'blue',
      'babel': 'yellow',
      'jest': 'red',
      'cypress': 'green',
      'selenium': 'green',
      'docker compose': 'blue',
      'nginx': 'green',
      'apache': 'red',
      'linux': 'black',
      'ubuntu': 'orange',
      'debian': 'red',
      'centos': 'purple',
      'windows': 'blue',
      'macos': 'gray',
      'jira': 'blue',
      'confluence': 'blue',
      'slack': 'purple',
      'discord': 'purple',
      'trello': 'blue',
      'asana': 'red',
      'notion': 'black'
    };

    // Essayer de trouver une correspondance dans le mapping des technologies
    if (techName) {
      const lowerTechName = techName.toLowerCase();
      for (const [tech, techColor] of Object.entries(techColorMap)) {
        if (lowerTechName.includes(tech)) {
          return techColor;
        }
      }
    }
    
    // Si aucune correspondance n'est trouvée, utiliser l'index
    if (index % 3 === 0) return 'blue';
    if (index % 3 === 1) return 'purple';
    return 'red';
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
            // Récupérer l'URL du logo en utilisant une méthode plus robuste
            let logoUrl = null;
            
            // Cas 1: Structure Strapi standard - data.attributes
            if (tech.logo?.data?.attributes?.url) {
              logoUrl = getStrapiMediaUrl(tech.logo.data.attributes.url);
            } 
            // Cas 2: Essayer avec formats thumbnails si disponible
            else if (tech.logo?.data?.attributes?.formats?.thumbnail?.url) {
              logoUrl = getStrapiMediaUrl(tech.logo.data.attributes.formats.thumbnail.url);
            } 
            // Cas 3: Structure normalisée - url direct
            else if (tech.logo?.url) {
              logoUrl = getStrapiMediaUrl(tech.logo.url);
            } 
            // Cas 4: Structure normalisée avec formats
            else if (tech.logo?.formats?.thumbnail?.url) {
              logoUrl = getStrapiMediaUrl(tech.logo.formats.thumbnail.url);
            }
            
            // En dernier recours, essayer une recherche récursive pour trouver une URL
            if (!logoUrl && tech.logo) {
              const findUrlInObject = (obj) => {
                if (!obj || typeof obj !== 'object') return null;
                
                if (obj.url && typeof obj.url === 'string') {
                  return obj.url;
                }
                
                for (const key in obj) {
                  if (key === 'url' && typeof obj[key] === 'string') {
                    return obj[key];
                  }
                  
                  if (typeof obj[key] === 'object') {
                    const result = findUrlInObject(obj[key]);
                    if (result) return result;
                  }
                }
                
                return null;
              };
              
              const foundUrl = findUrlInObject(tech.logo);
              if (foundUrl) {
                logoUrl = getStrapiMediaUrl(foundUrl);
              }
            }
            
            // Couleur dynamique basée sur le nom de la technologie
            const dynamicColor = getColorForTech(index, tech.nom);
            
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
                  {/* Ligne décorative animée pour toutes les technologies */}
                  <div className="relative h-1">
                    <motion.div
                      className="absolute inset-x-0 top-0 h-1 overflow-hidden"
                      initial={{ opacity: 0.7 }}
                    >
                      <motion.div
                        className="absolute inset-0"
                        animate={{
                          backgroundImage: [
                            `linear-gradient(90deg, var(--color-${dynamicColor}) 10%, transparent 10%, transparent 20%, var(--color-${dynamicColor}) 20%, var(--color-${dynamicColor}) 30%, transparent 30%, transparent 40%, var(--color-${dynamicColor}) 40%, var(--color-${dynamicColor}) 50%, transparent 50%, transparent 60%, var(--color-${dynamicColor}) 60%, var(--color-${dynamicColor}) 70%, transparent 70%, transparent 80%, var(--color-${dynamicColor}) 80%, var(--color-${dynamicColor}) 90%, transparent 90%)`,
                            `linear-gradient(90deg, transparent 10%, var(--color-${dynamicColor}) 10%, var(--color-${dynamicColor}) 20%, transparent 20%, transparent 30%, var(--color-${dynamicColor}) 30%, var(--color-${dynamicColor}) 40%, transparent 40%, transparent 50%, var(--color-${dynamicColor}) 50%, var(--color-${dynamicColor}) 60%, transparent 60%, transparent 70%, var(--color-${dynamicColor}) 70%, var(--color-${dynamicColor}) 80%, transparent 80%, transparent 90%, var(--color-${dynamicColor}) 90%)`
                          ],
                          backgroundSize: ["100% 100%", "200% 100%", "100% 100%"]
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          repeatType: "mirror",
                          delay: delay
                        }}
                      />
                    </motion.div>
                  </div>
                  
                  <div className="p-5 flex flex-col items-center">
                    {/* Logo ou initial avec container standardisé et couleur dynamique */}
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
                            onError={(e) => {
                              console.log(`Erreur de chargement d'image pour ${tech.nom}:`, logoUrl);
                              e.target.onerror = null;
                              // Fallback vers une lettre si l'image ne peut pas être chargée
                              e.target.style.display = 'none';
                              e.target.parentNode.classList.add('logo-error');
                            }}
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
                          className={`flex items-center justify-center w-10 h-10 rounded-full bg-${dynamicColor}/10`}
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
                            className={`text-lg font-semibold text-${dynamicColor}`}
                            animate={{
                              textShadow: [
                                "0 0 0px transparent",
                                `0 0 10px var(--color-${dynamicColor})`,
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
                          
                          {/* Cercles concentriques animés avec couleur dynamique */}
                          <motion.div
                            className={`absolute w-12 h-12 rounded-full border border-${dynamicColor}/20`}
                            animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                              repeatType: "mirror"
                            }}
                          />
                          <motion.div
                            className={`absolute w-16 h-16 rounded-full border border-${dynamicColor}/10`}
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
                  
                  {/* Points lumineux aux coins - effet tech avec couleur dynamique */}
                  <motion.div 
                    className={`absolute top-0 left-0 w-1 h-1 rounded-full bg-${dynamicColor}`}
                    animate={{ opacity: [0.2, 1, 0.2] }}
                    transition={{ duration: 2, repeat: Infinity, delay: delay }}
                  />
                  <motion.div 
                    className={`absolute top-0 right-0 w-1 h-1 rounded-full bg-${dynamicColor}`}
                    animate={{ opacity: [0.2, 1, 0.2] }}
                    transition={{ duration: 2, repeat: Infinity, delay: delay + 0.5 }}
                  />
                  <motion.div 
                    className={`absolute bottom-0 left-0 w-1 h-1 rounded-full bg-${dynamicColor}`}
                    animate={{ opacity: [0.2, 1, 0.2] }}
                    transition={{ duration: 2, repeat: Infinity, delay: delay + 1 }}
                  />
                  <motion.div 
                    className={`absolute bottom-0 right-0 w-1 h-1 rounded-full bg-${dynamicColor}`}
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