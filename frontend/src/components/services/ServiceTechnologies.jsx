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
  
  // État pour gérer la technologie active
  const [activeIndex, setActiveIndex] = useState(0);
  const totalItems = allTechnologies.length;
  
  // Avancer automatiquement à la prochaine technologie toutes les 3 secondes
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(prevIndex => (prevIndex + 1) % totalItems);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [totalItems]);
  
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
      className="py-24 relative overflow-hidden bg-gray-50"
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

        {/* Carousel simplifié et élégant */}
        <div className="max-w-7xl mx-auto relative mt-16">
          {/* Technologie active au centre */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`active-${activeIndex}`}
              className="flex justify-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
            >
              <div className="max-w-lg bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 relative">
                {/* Barre de couleur en haut */}
                <div className="h-2 w-full">
                  <motion.div
                    className="h-full w-full"
                    style={{
                      background: `linear-gradient(90deg, ${getColorsForTech(allTechnologies[activeIndex].nom).primary} 0%, ${getColorsForTech(allTechnologies[activeIndex].nom).secondary} 100%)`,
                    }}
                  />
                </div>
                
                <div className="p-8 flex flex-col md:flex-row items-center">
                  {/* Logo */}
                  <div className="md:w-1/3 flex justify-center mb-6 md:mb-0">
                    {allTechnologies[activeIndex].logo?.data ? (
                      <Image
                        src={getStrapiMediaUrl(allTechnologies[activeIndex].logo.data.attributes.url)}
                        alt={allTechnologies[activeIndex].nom}
                        width={100}
                        height={100}
                        className="object-contain"
                      />
                    ) : (
                      <div 
                        className="w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold"
                        style={{ 
                          backgroundColor: `${getColorsForTech(allTechnologies[activeIndex].nom).primary}20`, 
                          color: getColorsForTech(allTechnologies[activeIndex].nom).primary 
                        }}
                      >
                        {allTechnologies[activeIndex].nom.charAt(0)}
                      </div>
                    )}
                  </div>
                  
                  {/* Contenu */}
                  <div className="md:w-2/3 md:pl-8 text-center md:text-left">
                    <h3 
                      className="text-2xl font-bold mb-3"
                      style={{ color: getColorsForTech(allTechnologies[activeIndex].nom).primary }}
                    >
                      {allTechnologies[activeIndex].nom}
                    </h3>
                    
                    <p className="text-gray-600">
                      {allTechnologies[activeIndex].description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          
          {/* Petites vignettes des technologies précédentes/suivantes */}
          <div className="flex justify-center mt-8 relative">
            <div className="relative w-full max-w-3xl flex items-center">
              {/* Indicateur de navigation */}
              <div className="w-full h-1 bg-gray-200 rounded-full absolute">
                <motion.div 
                  className="h-full bg-blue rounded-full"
                  style={{ width: `${(activeIndex + 1) / totalItems * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              
              {/* Vignettes miniatures */}
              <div className="w-full py-6 overflow-hidden">
                <div className="flex justify-center space-x-3">
                  {allTechnologies.map((tech, idx) => {
                    const isActive = idx === activeIndex;
                    const { primary } = getColorsForTech(tech.nom);
                    
                    return (
                      <motion.button
                        key={idx}
                        onClick={() => setActiveIndex(idx)}
                        className={`w-10 h-10 rounded-full flex items-center justify-center border-2 focus:outline-none transition-all duration-300 ${
                          isActive ? 'border-blue scale-110' : 'border-gray-200'
                        }`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        style={{ 
                          backgroundColor: isActive ? `${primary}20` : 'white',
                          borderColor: isActive ? primary : '#e5e7eb'
                        }}
                      >
                        <span 
                          className="font-semibold text-xs"
                          style={{ color: isActive ? primary : '#9ca3af' }}
                        >
                          {idx + 1}
                        </span>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          
          {/* Boutons de navigation */}
          <div className="flex justify-center mt-4 space-x-4">
            <button 
              onClick={() => setActiveIndex(prev => (prev - 1 + totalItems) % totalItems)}
              className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-600 hover:bg-gray-50 focus:outline-none transition-all duration-300"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              onClick={() => setActiveIndex(prev => (prev + 1) % totalItems)}
              className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-600 hover:bg-gray-50 focus:outline-none transition-all duration-300"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  )
}