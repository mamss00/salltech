'use client'

import { useRef, useEffect, useState } from 'react'
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
  
  // Mapping des couleurs
  const colorMap = {
    blue: '#3498db',
    purple: '#9b59b6',
    red: '#e74c3c',
    green: '#2ecc71', 
    yellow: '#f1c40f',
    black: '#2c3e50',
    orange: '#e67e22'
  };
  
  // Fonction pour déterminer la couleur dynamique en fonction de l'index ou du nom de technologie
  const getColorForTech = (index, techName = '') => {
    // Mapping de certaines technologies connues à leurs couleurs
    const techColorMap = {
      'react': 'blue',
      'node': 'green',
      'wordpress': 'blue',
      'tailwind': 'blue',
      'mongodb': 'green',
      'mysql': 'blue',
      'docker': 'blue',
      'vue': 'green',
      'angular': 'red',
      'javascript': 'yellow',
      'typescript': 'blue',
      'php': 'purple',
      'python': 'blue',
      'java': 'red',
      'postgresql': 'blue',
      'firebase': 'orange',
      'aws': 'orange',
      'kubernetes': 'blue',
      'html': 'orange',
      'css': 'blue',
      'sass': 'pink',
      'bootstrap': 'purple',
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
      'woocommerce': 'purple'
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
  
  // Obtenir la valeur de couleur CSS à partir du nom de couleur
  const getColorValue = (colorName) => {
    return colorMap[colorName] || colorMap.blue;
  };
  
  // Générer le CSS pour l'animation de ligne pointillée
  const getDottedLineAnimation = (colorValue, delay) => {
    return {
      position: 'absolute',
      inset: 0,
      animation: `dottedLine 3s infinite alternate ${delay}s`,
      background: `linear-gradient(90deg, 
        ${colorValue} 10%, transparent 10%, 
        transparent 20%, ${colorValue} 20%, 
        ${colorValue} 30%, transparent 30%, 
        transparent 40%, ${colorValue} 40%, 
        ${colorValue} 50%, transparent 50%, 
        transparent 60%, ${colorValue} 60%, 
        ${colorValue} 70%, transparent 70%, 
        transparent 80%, ${colorValue} 80%, 
        ${colorValue} 90%, transparent 90%)`,
      backgroundSize: '200% 100%',
    };
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
            <path d="M 0 50 L 100 50 M 50 0 L 50 100" stroke={getColorValue(color)} strokeWidth="0.5" fill="none" />
            <circle cx="50" cy="50" r="3" fill="none" stroke={getColorValue(color)} strokeWidth="0.5" />
            <circle cx="0" cy="50" r="3" fill="none" stroke={getColorValue(color)} strokeWidth="0.5" />
            <circle cx="100" cy="50" r="3" fill="none" stroke={getColorValue(color)} strokeWidth="0.5" />
            <circle cx="50" cy="0" r="3" fill="none" stroke={getColorValue(color)} strokeWidth="0.5" />
            <circle cx="50" cy="100" r="3" fill="none" stroke={getColorValue(color)} strokeWidth="0.5" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#circuitPattern)" />
        </svg>
        
        {/* Formes techniques */}
        <motion.div 
          className="absolute top-10 right-10 w-96 h-96 rounded-full blur-3xl"
          style={{ background: `linear-gradient(to bottom left, ${getColorValue(color)}0D, transparent)` }}
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
          className="absolute bottom-10 left-10 w-64 h-64 rounded-full blur-3xl"
          style={{ background: `linear-gradient(to top right, ${getColorValue('purple')}0D, transparent)` }}
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
              style={{ color: getColorValue(color) }}
              className="ml-3"
            >
              utilisées
            </motion.span>
            
            {/* Curseur clignotant (effet d'invite de commande) */}
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1.2, repeat: Infinity }}
              style={{ 
                position: 'absolute', 
                right: '-16px', 
                top: '8px', 
                height: '32px', 
                width: '4px', 
                backgroundColor: getColorValue(color) 
              }}
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
            const colorValue = getColorValue(dynamicColor);
            
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
                  <div className="relative h-1 overflow-hidden">
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: `repeating-linear-gradient(to right, 
                          ${colorValue} 0%, ${colorValue} 10%, 
                          transparent 10%, transparent 20%, 
                          ${colorValue} 20%, ${colorValue} 30%, 
                          transparent 30%, transparent 40%,
                          ${colorValue} 40%, ${colorValue} 50%,
                          transparent 50%, transparent 60%,
                          ${colorValue} 60%, ${colorValue} 70%,
                          transparent 70%, transparent 80%,
                          ${colorValue} 80%, ${colorValue} 90%,
                          transparent 90%, transparent 100%)`,
                        backgroundSize: '200% 100%',
                        animation: `moveGradient 3s linear infinite`
                      }}
                    ></div>
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
                          style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            width: '40px', 
                            height: '40px', 
                            borderRadius: '9999px', 
                            backgroundColor: `${colorValue}1A` // 10% opacity
                          }}
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
                            style={{ 
                              fontSize: '1.125rem', 
                              fontWeight: 600, 
                              color: colorValue,
                            }}
                            animate={{
                              textShadow: [
                                "0 0 0px transparent",
                                `0 0 10px ${colorValue}`,
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
                            style={{ 
                              position: 'absolute', 
                              width: '48px', 
                              height: '48px', 
                              borderRadius: '9999px', 
                              border: `1px solid ${colorValue}33` // 20% opacity
                            }}
                            animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                              repeatType: "mirror"
                            }}
                          />
                          <motion.div
                            style={{ 
                              position: 'absolute', 
                              width: '64px', 
                              height: '64px', 
                              borderRadius: '9999px', 
                              border: `1px solid ${colorValue}1A` // 10% opacity
                            }}
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
                    style={{ 
                      position: 'absolute', 
                      top: 0, 
                      left: 0, 
                      width: '4px', 
                      height: '4px', 
                      borderRadius: '9999px', 
                      backgroundColor: colorValue 
                    }}
                    animate={{ opacity: [0.2, 1, 0.2] }}
                    transition={{ duration: 2, repeat: Infinity, delay: delay }}
                  />
                  <motion.div 
                    style={{ 
                      position: 'absolute', 
                      top: 0, 
                      right: 0, 
                      width: '4px', 
                      height: '4px', 
                      borderRadius: '9999px', 
                      backgroundColor: colorValue 
                    }}
                    animate={{ opacity: [0.2, 1, 0.2] }}
                    transition={{ duration: 2, repeat: Infinity, delay: delay + 0.5 }}
                  />
                  <motion.div 
                    style={{ 
                      position: 'absolute', 
                      bottom: 0, 
                      left: 0, 
                      width: '4px', 
                      height: '4px', 
                      borderRadius: '9999px', 
                      backgroundColor: colorValue 
                    }}
                    animate={{ opacity: [0.2, 1, 0.2] }}
                    transition={{ duration: 2, repeat: Infinity, delay: delay + 1 }}
                  />
                  <motion.div 
                    style={{ 
                      position: 'absolute', 
                      bottom: 0, 
                      right: 0, 
                      width: '4px', 
                      height: '4px', 
                      borderRadius: '9999px', 
                      backgroundColor: colorValue 
                    }}
                    animate={{ opacity: [0.2, 1, 0.2] }}
                    transition={{ duration: 2, repeat: Infinity, delay: delay + 1.5 }}
                  />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
      
      {/* Ajout de la keyframe CSS pour l'animation des lignes pointillées */}
      <style jsx global>{`
        @keyframes moveGradient {
          0% { background-position: 0% 0%; }
          100% { background-position: 200% 0%; }
        }
      `}</style>
    </section>
  )
}