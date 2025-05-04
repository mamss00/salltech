'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import { getStrapiMediaUrl } from '@/utils/helpers'

export default function ServiceTechnologies({ technologies = [], color = 'blue' }) {
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
  
  // État pour gérer la technologie active (centrale)
  const [activeIndex, setActiveIndex] = useState(0);
  const totalItems = allTechnologies.length;
  
  // Avancer automatiquement à la prochaine technologie toutes les 3 secondes
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(prevIndex => (prevIndex + 1) % totalItems);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [totalItems]);
  
  // Préparer les 5 technologies à afficher - 1 mise en avant (au milieu) et 4 autour
  const getVisibleTechnologies = () => {
    const result = [];
    
    // Ajouter les 2 technologies avant la technologie active
    for (let i = -2; i <= 2; i++) {
      // Calcul de l'index avec gestion du dépassement (boucle)
      const index = (activeIndex + i + totalItems) % totalItems;
      result.push(allTechnologies[index]);
    }
    
    return result;
  };
  
  const visibleTechnologies = getVisibleTechnologies();
  
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
      'Kotlin': { primary: "rgb(143, 104, 233)", secondary: "rgb(112, 69, 214)" }, // Violet Kotlin
      'Ruby': { primary: "rgb(204, 52, 45)", secondary: "rgb(170, 12, 5)" },       // Rouge Ruby
      'Go': { primary: "rgb(0, 173, 216)", secondary: "rgb(0, 130, 190)" },        // Bleu Go
    };
    
    // Chercher une correspondance approximative dans les noms de technologie
    if (!techName) return { primary: "rgb(52, 152, 219)", secondary: "rgb(41, 128, 185)" }; // Défaut bleu
    
    // Convertir en minuscules pour faciliter la recherche
    const techNameLower = techName.toLowerCase();
    
    for (const [key, value] of Object.entries(techColors)) {
      if (techNameLower.includes(key.toLowerCase())) {
        return value;
      }
    }
    
    // Couleurs par défaut basées sur l'initiale du nom pour une variété
    const initial = techName.charAt(0).toUpperCase();
    
    if (/[A-E]/.test(initial)) return { primary: "rgb(52, 152, 219)", secondary: "rgb(41, 128, 185)" }; // Bleu
    if (/[F-J]/.test(initial)) return { primary: "rgb(46, 204, 113)", secondary: "rgb(39, 174, 96)" };  // Vert
    if (/[K-O]/.test(initial)) return { primary: "rgb(155, 89, 182)", secondary: "rgb(142, 68, 173)" }; // Violet
    if (/[P-T]/.test(initial)) return { primary: "rgb(241, 196, 15)", secondary: "rgb(243, 156, 18)" }; // Jaune
    if (/[U-Z]/.test(initial)) return { primary: "rgb(231, 76, 60)", secondary: "rgb(192, 57, 43)" };   // Rouge
    
    // Défaut
    return { primary: "rgb(52, 152, 219)", secondary: "rgb(41, 128, 185)" }; // Bleu par défaut
  };

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

        {/* Grille avec 1 élément mis en avant et 4 autres autour */}
        <motion.div 
          ref={techGridRef}
          initial={{ opacity: 0 }}
          animate={techGridInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="relative w-full max-w-6xl mx-auto"
        >
          {/* Structure avec 5 technologies sur la même ligne, celle du milieu mise en avant */}
          <div className="grid grid-cols-5 gap-4">
            {visibleTechnologies.slice(0, 5).map((tech, idx) => {
              const isCenter = idx === 2; // La troisième position (index 2) est au milieu
              
              return (
                <motion.div
                  key={`tech-${idx}-${activeIndex}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: isCenter ? 1 : 0.85, 
                    y: 0,
                    scale: isCenter ? 1.1 : 1,
                    zIndex: isCenter ? 10 : 1
                  }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ 
                    duration: 0.4,
                    delay: isCenter ? 0 : 0.1 * idx
                  }}
                  whileHover={{ 
                    opacity: 1, 
                    y: -5,
                    scale: isCenter ? 1.15 : 1.05,
                    transition: { duration: 0.2 } 
                  }}
                  onClick={() => setActiveIndex((activeIndex + idx) % totalItems)}
                  className={`cursor-pointer ${isCenter ? 'col-span-1' : 'col-span-1'}`}
                >
                  <TechCard 
                    tech={tech} 
                    isCentered={isCenter}
                    getColorsForTech={getColorsForTech}
                  />
                </motion.div>
              );
            })}
          </div>

          {/* Indicateurs de technologies (points) */}
          <div className="flex justify-center mt-8 space-x-1">
            {allTechnologies.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`w-2 h-2 rounded-full focus:outline-none transition-all duration-300 ${
                  idx === activeIndex ? 'bg-blue' : 'bg-gray-300'
                }`}
                aria-label={`Technologie ${idx + 1}`}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

// Composant de carte de technologie extrait pour la réutilisation
const TechCard = ({ tech, isCentered, getColorsForTech }) => {
  // Récupérer l'URL du logo
  let logoUrl = null;
  if (tech.logo?.data) {
    logoUrl = getStrapiMediaUrl(tech.logo.data.attributes.url);
  } else if (tech.logo?.url) {
    logoUrl = getStrapiMediaUrl(tech.logo.url);
  }
  
  const { primary, secondary } = getColorsForTech(tech.nom);
  
  // Classe CSS différente si la carte est centrale
  const cardClass = isCentered 
    ? "bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 transition-all duration-300 transform hover:shadow-xl"
    : "bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 transition-all duration-300 h-full";

  // Taille du logo différente si la carte est centrale
  const logoContainerClass = isCentered 
    ? "relative w-20 h-20 flex items-center justify-center mb-4 overflow-hidden"
    : "relative w-12 h-12 flex items-center justify-center mb-3 overflow-hidden";

  // Taille du texte différente si la carte est centrale
  const titleClass = isCentered 
    ? "text-xl font-bold text-center transition-colors duration-300"
    : "text-base font-medium text-center transition-colors duration-300";

  return (
    <div className={cardClass}>
      {/* Ligne décorative animée */}
      <div className="h-1 w-full overflow-hidden">
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
            duration: 4,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      </div>
      
      <div className={`p-${isCentered ? '6' : '4'} flex flex-col items-center`}>
        {/* Logo ou initial avec container standardisé */}
        <div className={logoContainerClass}>
          {logoUrl ? (
            <motion.div
              className="w-full h-full flex items-center justify-center"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ 
                type: "spring",
                stiffness: 70,
                damping: 15
              }}
            >
              <Image
                src={logoUrl}
                alt={tech.nom || "Technologie"}
                width={isCentered ? 80 : 48}
                height={isCentered ? 80 : 48}
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
                  ease: "easeInOut"
                }}
              />
            </motion.div>
          ) : (
            <motion.div
              className="flex items-center justify-center rounded-full"
              style={{ 
                backgroundColor: `${primary}20`,
                width: isCentered ? '3rem' : '2rem', 
                height: isCentered ? '3rem' : '2rem'
              }}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ 
                type: "spring", 
                stiffness: 100,
                damping: 15
              }}
            >
              <motion.span
                style={{ color: primary }}
                className={isCentered ? "text-xl font-semibold" : "text-base font-semibold"}
                animate={{
                  textShadow: [
                    "0 0 0px transparent",
                    `0 0 10px ${primary}`,
                    "0 0 0px transparent"
                  ]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "mirror"
                }}
              >
                {tech.nom?.charAt(0) || '?'}
              </motion.span>
              
              {/* Cercles concentriques animés */}
              <motion.div
                style={{ borderColor: `${primary}30` }}
                className="absolute rounded-full border"
                animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "mirror"
                }}
              />
            </motion.div>
          )}
        </div>
        
        {/* Nom de la technologie */}
        <motion.h3
          className={titleClass}
          style={{ color: 'rgba(70, 70, 70, 1)' }}
          whileHover={{ color: primary }}
        >
          {tech.nom || "Technologie"}
        </motion.h3>
        
        {/* Ligne décorative */}
        <motion.div
          className="h-px my-2"
          style={{ 
            background: `linear-gradient(90deg, ${primary}, ${secondary})`,
            backgroundSize: "200% 100%",
            width: isCentered ? '60px' : '40px'
          }}
          animate={{ 
            backgroundPosition: ["0% 0%", "100% 0%"]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        
        {/* Description avec effet de défilement - uniquement pour la carte centrale */}
        {tech.description && isCentered && (
          <motion.div
            className="text-sm text-gray-600 text-center mt-2 max-w-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            {tech.description}
          </motion.div>
        )}
        
        {/* Description réduite pour les cartes secondaires */}
        {tech.description && !isCentered && (
          <motion.div
            className="text-xs text-gray-500 text-center h-8 overflow-hidden relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            {tech.description.length > 40 ? (
              <motion.div
                initial={{ y: 0 }}
                animate={{ 
                  y: [0, -40, 0]
                }}
                transition={{
                  y: {
                    duration: 8,
                    times: [0, 0.4, 1],
                    repeat: Infinity,
                    repeatDelay: 2,
                    ease: "easeInOut"
                  }
                }}
              >
                {tech.description.substring(0, 60) + (tech.description.length > 60 ? '...' : '')}
              </motion.div>
            ) : (
              <div>{tech.description}</div>
            )}
          </motion.div>
        )}
      </div>
      
      {/* Points lumineux aux coins - effet tech */}
      <motion.div 
        className="absolute top-0 left-0 w-1 h-1 rounded-full"
        style={{ backgroundColor: primary }}
        animate={{ opacity: [0.2, 1, 0.2] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <motion.div 
        className="absolute top-0 right-0 w-1 h-1 rounded-full"
        style={{ backgroundColor: secondary }}
        animate={{ opacity: [0.2, 1, 0.2] }}
        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
      />
      <motion.div 
        className="absolute bottom-0 left-0 w-1 h-1 rounded-full"
        style={{ backgroundColor: secondary }}
        animate={{ opacity: [0.2, 1, 0.2] }}
        transition={{ duration: 2, repeat: Infinity, delay: 1 }}
      />
      <motion.div 
        className="absolute bottom-0 right-0 w-1 h-1 rounded-full"
        style={{ backgroundColor: primary }}
        animate={{ opacity: [0.2, 1, 0.2] }}
        transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
      />
    </div>
  );
}