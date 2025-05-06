'use client'

import React, { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import { getStrapiMediaUrl } from '@/utils/helpers'

export default function ServiceTechnologies({ technologies = [], color = 'blue' }) {
  // Référence pour l'animation au défilement
  const containerRef = useRef(null)
  const scrollContainerRef = useRef(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })
  
  // Animation de la section complète lors du défilement
  const containerOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.6, 1, 1, 0.6])
  
  // Animation des titres et contenu
  const [titleRef, titleInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [techGridRef, techGridInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  
  // État pour le survol
  const [isHovered, setIsHovered] = useState(false)
  const [technologies1, setTechnologies1] = useState([])
  const [technologies2, setTechnologies2] = useState([])
  
  // Technologies par défaut
  const defaultTechs = [
    { nom: "React", description: "Bibliothèque JavaScript pour créer des interfaces utilisateur dynamiques" },
    { nom: "Next.js", description: "Framework React orienté serveur pour des applications web performantes" },
    { nom: "Tailwind CSS", description: "Framework CSS utilitaire pour un développement rapide" },
    { nom: "Node.js", description: "Environnement d'exécution JavaScript côté serveur" },
    { nom: "MongoDB", description: "Base de données NoSQL orientée document" },
    { nom: "Laravel", description: "Framework PHP élégant pour le développement web" }
  ];
  
  // Utiliser les technologies fournies ou les technologies par défaut
  const allTechnologies = technologies.length > 0 ? technologies : defaultTechs;
  
  // Définir les deux ensembles de technologies pour l'animation
  useEffect(() => {
    setTechnologies1(allTechnologies);
    setTechnologies2(allTechnologies);
  }, [allTechnologies]);
  
  // Défilement infini sans requêtes d'animation - technique CSS pure pour plus de fluidité
  const scrollSpeed = isHovered ? '0s' : '40s';
  
  // Définir les couleurs en fonction de la technologie
  const getColorsForTech = (techName) => {
    const techColors = {
      // Couleurs adaptées aux technologies courantes
      'React': { primary: "rgb(97, 218, 251)", secondary: "rgb(20, 158, 202)" }, // Bleu React
      'Next': { primary: "rgb(0, 0, 0)", secondary: "rgb(70, 70, 70)" },         // Noir Next.js
      'Tailwind': { primary: "rgb(56, 189, 248)", secondary: "rgb(14, 165, 233)" }, // Bleu Tailwind
      'Node': { primary: "rgb(83, 158, 67)", secondary: "rgb(60, 120, 50)" },    // Vert Node.js
      'MongoDB': { primary: "rgb(77, 179, 61)", secondary: "rgb(57, 150, 41)" }, // Vert MongoDB
      'Laravel': { primary: "rgb(255, 45, 32)", secondary: "rgb(200, 35, 25)" }, // Rouge Laravel
      'Vue': { primary: "rgb(65, 184, 131)", secondary: "rgb(35, 140, 95)" },    // Vert Vue.js
      'Angular': { primary: "rgb(221, 0, 49)", secondary: "rgb(180, 0, 40)" },   // Rouge Angular
      'PHP': { primary: "rgb(119, 123, 179)", secondary: "rgb(90, 94, 150)" },   // Violet PHP
      'MySQL': { primary: "rgb(0, 117, 143)", secondary: "rgb(0, 90, 110)" },    // Bleu MySQL
      'Python': { primary: "rgb(55, 118, 171)", secondary: "rgb(255, 211, 67)" },// Bleu/Jaune Python
      'Java': { primary: "rgb(244, 138, 12)", secondary: "rgb(168, 88, 2)" },    // Orange Java
      'JavaScript': { primary: "rgb(240, 219, 79)", secondary: "rgb(50, 51, 48)" }, // Jaune/Noir JS
      'TypeScript': { primary: "rgb(0, 122, 204)", secondary: "rgb(0, 97, 162)" }, // Bleu TypeScript
      'Docker': { primary: "rgb(13, 136, 209)", secondary: "rgb(10, 100, 160)" }, // Bleu Docker
      'WordPress': { primary: "rgb(33, 117, 155)", secondary: "rgb(15, 90, 140)" }, // Bleu WordPress
      'Flutter': { primary: "rgb(69, 209, 253)", secondary: "rgb(66, 165, 245)" }, // Bleu Flutter
      'Swift': { primary: "rgb(252, 88, 66)", secondary: "rgb(240, 65, 45)" },     // Orange Swift
      'Firebase': { primary: "rgb(245, 131, 32)", secondary: "rgb(225, 133, 53)" },     // Orange Firebase
      'Kotlin': { primary: "rgb(143, 104, 233)", secondary: "rgb(112, 69, 214)" }, // Violet Kotlin
      'GraphQL': { primary: "rgb(230, 50, 170)", secondary: "rgb(223, 62, 169)" }, // Violet GraphQL
      'Ruby': { primary: "rgb(204, 52, 45)", secondary: "rgb(170, 12, 5)" },       // Rouge Ruby
      'Go': { primary: "rgb(0, 173, 216)", secondary: "rgb(0, 130, 190)" },        // Bleu Go
    };
    
    // Chercher une correspondance approximative dans les noms de technologie
    if (!techName) return { primary: "rgb(90, 130, 180)", secondary: "rgb(65, 105, 150)" };
    
    // Convertir en minuscules pour faciliter la recherche
    const techNameLower = techName.toLowerCase();
    
    for (const [key, value] of Object.entries(techColors)) {
      if (techNameLower.includes(key.toLowerCase())) {
        return value;
      }
    }
    
    // Couleurs par défaut basées sur l'initiale du nom pour une variété
    const initial = techName.charAt(0).toUpperCase();
    
    if (/[A-E]/.test(initial)) return { primary: "rgb(90, 130, 180)", secondary: "rgb(65, 105, 150)" };
    if (/[F-J]/.test(initial)) return { primary: "rgb(70, 170, 120)", secondary: "rgb(50, 140, 95)" };
    if (/[K-O]/.test(initial)) return { primary: "rgb(140, 100, 165)", secondary: "rgb(120, 80, 140)" };
    if (/[P-T]/.test(initial)) return { primary: "rgb(205, 170, 50)", secondary: "rgb(185, 140, 35)" };
    if (/[U-Z]/.test(initial)) return { primary: "rgb(200, 85, 70)", secondary: "rgb(170, 65, 50)" };
    
    return { primary: "rgb(90, 130, 180)", secondary: "rgb(65, 105, 150)" };
  };

  return (
    <section 
      ref={containerRef}
      className="py-20 relative overflow-hidden bg-gray-50"
    >
      {/* Arrière-plan technique amélioré avec plus d'éléments décoratifs */}
      <div className="absolute inset-0 overflow-hidden z-0 opacity-50">
        {/* Grille de circuits avancée */}
        <svg width="100%" height="100%" className="absolute opacity-5" viewBox="0 0 800 800">
          <pattern id="circuitPattern" patternUnits="userSpaceOnUse" width="150" height="150">
            <path d="M 0 75 L 150 75 M 75 0 L 75 150" stroke={`var(--color-${color})`} strokeWidth="0.4" fill="none" />
            <circle cx="75" cy="75" r="2" fill="none" stroke={`var(--color-${color})`} strokeWidth="0.4" />
            <circle cx="0" cy="75" r="2" fill="none" stroke={`var(--color-${color})`} strokeWidth="0.4" />
            <circle cx="150" cy="75" r="2" fill="none" stroke={`var(--color-${color})`} strokeWidth="0.4" />
            <circle cx="75" cy="0" r="2" fill="none" stroke={`var(--color-${color})`} strokeWidth="0.4" />
            <circle cx="75" cy="150" r="2" fill="none" stroke={`var(--color-${color})`} strokeWidth="0.4" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#circuitPattern)" />
        </svg>
        
        {/* Lignes élégantes de code/circuit qui se dessinent */}
        <motion.svg 
          className="absolute inset-0 w-full h-full opacity-5" 
          viewBox="0 0 800 600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.05 }}
          transition={{ duration: 2 }}
        >
          <motion.path
            d="M 50,150 C 100,50 200,150 250,200 C 300,250 400,150 450,100 L 600,100 C 650,100 700,150 750,200"
            stroke={`var(--color-${color})`}
            strokeWidth="1"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 8, ease: "easeInOut", repeat: Infinity, repeatType: "loop", repeatDelay: 4 }}
          />
          <motion.path
            d="M 100,300 L 200,300 C 250,300 250,350 300,350 L 500,350 C 550,350 550,300 600,300 L 700,300"
            stroke="var(--color-purple)"
            strokeWidth="1"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 7, ease: "easeInOut", repeat: Infinity, repeatType: "loop", repeatDelay: 3, delay: 2 }}
          />
          <motion.path
            d="M 200,450 L 300,450 C 350,450 350,400 400,400 L 450,400 C 500,400 500,450 550,450 L 650,450"
            stroke="var(--color-red)"
            strokeWidth="1"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 6, ease: "easeInOut", repeat: Infinity, repeatType: "loop", repeatDelay: 5, delay: 1 }}
          />
          
          {/* Cercles des connecteurs de circuits */}
          {[
            { cx: 50, cy: 150, color: "var(--color-blue)" },
            { cx: 250, cy: 200, color: "var(--color-blue)" },
            { cx: 450, cy: 100, color: "var(--color-blue)" },
            { cx: 600, cy: 100, color: "var(--color-blue)" },
            { cx: 750, cy: 200, color: "var(--color-blue)" },
            { cx: 100, cy: 300, color: "var(--color-purple)" },
            { cx: 200, cy: 300, color: "var(--color-purple)" },
            { cx: 300, cy: 350, color: "var(--color-purple)" },
            { cx: 500, cy: 350, color: "var(--color-purple)" },
            { cx: 600, cy: 300, color: "var(--color-purple)" },
            { cx: 700, cy: 300, color: "var(--color-purple)" },
            { cx: 200, cy: 450, color: "var(--color-red)" },
            { cx: 300, cy: 450, color: "var(--color-red)" },
            { cx: 400, cy: 400, color: "var(--color-red)" },
            { cx: 450, cy: 400, color: "var(--color-red)" },
            { cx: 550, cy: 450, color: "var(--color-red)" },
            { cx: 650, cy: 450, color: "var(--color-red)" },
          ].map((node, i) => (
            <motion.circle
              key={`node-${i}`}
              cx={node.cx}
              cy={node.cy}
              r="4"
              fill={node.color}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                duration: 0.5, 
                delay: 0.05 * i + 1,
                repeat: Infinity,
                repeatType: "reverse",
                repeatDelay: 15
              }}
            />
          ))}
        </motion.svg>
        
        {/* Points décoratifs techno */}
        {Array.from({ length: 40 }).map((_, i) => (
          <motion.div
            key={`dot-${i}`}
            className="absolute w-1 h-1 rounded-full"
            style={{
              backgroundColor: i % 3 === 0 
                ? `var(--color-${color})` 
                : i % 3 === 1 
                  ? 'var(--color-purple)' 
                  : 'var(--color-red)',
              opacity: 0.3 + (Math.random() * 0.3),
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.3 + (Math.random() * 0.3), 0.7, 0.3 + (Math.random() * 0.3)],
              scale: [1, 1.3, 1]
            }}
            transition={{
              duration: 3 + Math.random() * 5,
              repeat: Infinity,
              repeatType: "mirror",
              delay: Math.random() * 5
            }}
          />
        ))}
        
        {/* "Nuages" de technologie */}
        <motion.div 
          className={`absolute top-10 right-10 w-96 h-96 rounded-full bg-gradient-to-bl from-${color}/5 to-transparent opacity-40 blur-3xl`}
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            repeatType: "mirror"
          }}
        />
        
        <motion.div 
          className="absolute bottom-10 left-10 w-64 h-64 rounded-full bg-gradient-to-tr from-purple/5 to-transparent opacity-40 blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.3, 0.2]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "mirror",
            delay: 2
          }}
        />
        
        {/* Formes géométriques tech */}
        <motion.div
          className="absolute right-1/4 top-1/3 w-24 h-24 border border-blue/20 rounded-lg opacity-20"
          animate={{
            rotate: [0, 45, 0],
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="absolute left-1/3 bottom-1/4 w-16 h-16 border border-purple/20 rounded-full opacity-20"
          animate={{
            rotate: [0, 360],
            scale: [1, 0.8, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="absolute left-1/4 top-1/4 w-20 h-20 border border-red/20 rotate-45 opacity-20"
          animate={{
            rotate: [45, 90, 45],
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 5
          }}
        />
      </div>

      <motion.div 
        className="container relative z-10"
        style={{ opacity: containerOpacity }}
      >
        {/* En-tête de section avec style tech élégant */}
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
            <span className="inline-block px-4 py-1.5 bg-gray-800 text-white text-xs tracking-wider font-medium rounded-md border border-gray-700 shadow-inner">
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
            
            {/* Curseur clignotant */}
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1.2, repeat: Infinity }}
              className={`absolute -right-4 top-2 h-8 w-0.5 bg-${color}`}
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
        
        {/* Conteneur de technologies avec défilement continu sans pause au survol */}
        <div 
          className="overflow-hidden mx-auto"
          ref={techGridRef}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={techGridInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="pb-4"
          >
            {/* Défilement basé sur CSS Animations sans pause au survol */}
            <div className="tech-carousel-container relative">
              <style jsx>{`
                @keyframes scroll {
                  0% { transform: translateX(0); }
                  100% { transform: translateX(-100%); }
                }
                
                .tech-scroll {
                  animation: scroll 40s linear infinite;
                  will-change: transform;
                }
              `}</style>
              
              <div className="tech-carousel-inner inline-flex whitespace-nowrap">
                {/* Premier ensemble de technologies */}
                <div className="tech-scroll inline-flex">
                  {technologies1.map((tech, index) => renderTechCard(tech, index, getColorsForTech))}
                </div>
                
                {/* Deuxième ensemble de technologies pour défilement continu */}
                <div className="tech-scroll inline-flex">
                  {technologies2.map((tech, index) => renderTechCard(tech, index + allTechnologies.length, getColorsForTech))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

// Fonction pour rendre les cartes de technologie
function renderTechCard(tech, index, getColorsForTech) {
  // Récupérer l'URL du logo
  let logoUrl = null;
  if (tech.logo?.data) {
    logoUrl = getStrapiMediaUrl(tech.logo.data.attributes.url);
  } else if (tech.logo?.url) {
    logoUrl = getStrapiMediaUrl(tech.logo.url);
  }
  
  const { primary, secondary } = getColorsForTech(tech.nom);
  
  // Effet de délai progressif
  const delay = 0.03 * index;

  return (
    <motion.div 
      key={`tech-${index}`}
      initial={{ y: 20, opacity: 0 }}
      animate={{ 
        y: 0, 
        opacity: 1,
        transition: { 
          type: "spring",
          stiffness: 50,
          damping: 15,
          delay
        }
      }}
      className="w-44 mx-2 inline-block" // Réduit de 56 à 44 pour des cartes plus étroites
    >
      <div className="bg-white rounded-lg h-full shadow-sm overflow-hidden border border-gray-100 transition-all duration-300 relative group hover:shadow-md">
        {/* Ligne décorative */}
        <div className="h-0.5 w-full overflow-hidden">
          <motion.div
            className="h-full w-full"
            style={{
              background: `linear-gradient(90deg, ${primary} 0%, ${secondary} 100%)`,
              backgroundSize: "200% 100%"
            }}
            animate={{
              backgroundPosition: ["0% 0%", "100% 0%"]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        </div>
        
        {/* Contenu de la carte */}
        <div className="p-4 flex flex-col items-center">
          {/* Logo ou initial */}
          <div className="relative w-12 h-12 flex items-center justify-center mb-3 overflow-hidden">
            {logoUrl ? (
              <motion.div
                className="w-full h-full flex items-center justify-center"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
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
                  width={48}
                  height={48}
                  className="object-contain max-w-full max-h-full"
                />
              </motion.div>
            ) : (
              <motion.div
                className="flex items-center justify-center w-8 h-8 rounded-full"
                style={{ backgroundColor: `${primary}15` }}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 100,
                  damping: 15,
                  delay: delay + 0.2
                }}
              >
                <motion.span
                  style={{ color: primary }}
                  className="text-base font-semibold"
                >
                  {tech.nom?.charAt(0) || '?'}
                </motion.span>
              </motion.div>
            )}
          </div>
          
          {/* Traitement spécial pour WordPress & WooCommerce */}
          <div
            className="text-sm font-medium text-center mb-1 min-h-[40px] p-1 flex flex-col justify-center overflow-hidden"
            style={{ 
              color: 'rgba(70, 70, 70, 1)',
              overflowWrap: 'break-word',
              wordWrap: 'break-word',
              hyphens: 'manual',
              width: '100%'
            }}
          >
            {tech.nom === "WordPress & WooCommerce" ? (
              <>
                WordPress &<br />WooCommerce
              </>
            ) : (
              tech.nom || `Technologie ${index + 1}`
            )}
          </div>
          
          {/* Ligne décorative */}
          <motion.div
            className="h-px my-2"
            style={{ 
              background: `linear-gradient(90deg, ${primary}, ${secondary})`,
              backgroundSize: "200% 100%"
            }}
            initial={{ width: 0 }}
            animate={{ 
              width: '32px',
              backgroundPosition: ["0% 0%", "100% 0%"]
            }}
            transition={{ 
              width: { delay: delay + 0.35, duration: 0.6 },
              backgroundPosition: {
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse"
              }
            }}
          />
          
          {/* Description avec défilement plus lent */}
          {tech.description && (
            <motion.div
              className="text-xs text-gray-500 text-center h-16 overflow-hidden relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: delay + 0.4, duration: 0.4 }}
            >
              {tech.description.length > 40 ? (
                // Animation de défilement si le texte est long, mais plus lent
                <motion.div
                  initial={{ y: 0 }}
                  animate={{ 
                    y: [0, -40, 0]
                  }}
                  transition={{
                    y: {
                      duration: 20, // Durée augmentée de 10 à 20 secondes
                      times: [0, 0.45, 1],
                      repeat: Infinity,
                      repeatDelay: 5, // Pause plus longue
                      ease: "easeInOut"
                    }
                  }}
                >
                  <p className="break-words whitespace-normal px-1">{tech.description}</p>
                </motion.div>
              ) : (
                // Pas d'animation si le texte est court
                <div className="break-words whitespace-normal px-1">{tech.description}</div>
              )}
            </motion.div>
          )}
        </div>
        
        {/* Points lumineux aux coins - effet tech */}
        <motion.div 
          className="absolute top-0 left-0 w-1 h-1 rounded-full"
          style={{ backgroundColor: primary }}
          animate={{ opacity: [0.2, 0.8, 0.2] }}
          transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 % 1 }}
        />
        <motion.div 
          className="absolute top-0 right-0 w-1 h-1 rounded-full"
          style={{ backgroundColor: secondary }}
          animate={{ opacity: [0.2, 0.8, 0.2] }}
          transition={{ duration: 2, repeat: Infinity, delay: (index * 0.2 + 0.5) % 1 }}
        />
        <motion.div 
          className="absolute bottom-0 left-0 w-1 h-1 rounded-full"
          style={{ backgroundColor: secondary }}
          animate={{ opacity: [0.2, 0.8, 0.2] }}
          transition={{ duration: 2, repeat: Infinity, delay: (index * 0.2 + 1) % 1 }}
        />
        <motion.div 
          className="absolute bottom-0 right-0 w-1 h-1 rounded-full"
          style={{ backgroundColor: primary }}
          animate={{ opacity: [0.2, 0.8, 0.2] }}
          transition={{ duration: 2, repeat: Infinity, delay: (index * 0.2 + 1.5) % 1 }}
        />
      </div>
    </motion.div>
  );
}