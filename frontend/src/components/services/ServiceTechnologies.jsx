'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
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
  
  // Dupliquer les technologies pour permettre un défilement en continu
  const displayTechnologies = allTechnologies.length <= 6 
    ? allTechnologies 
    : [...allTechnologies, ...allTechnologies.slice(0, 6)];
  
  // Effet pour le défilement automatique
  useEffect(() => {
    if (allTechnologies.length <= 6 || isHovered || !scrollContainerRef.current) return;
    
    let animationFrameId;
    let scrollPos = 0;
    const totalWidth = scrollContainerRef.current.scrollWidth;
    const containerWidth = scrollContainerRef.current.clientWidth;
    const scrollStep = 0.4; // Vitesse de défilement (pixels par frame)
    
    const scroll = () => {
      if (!scrollContainerRef.current) return;
      
      scrollPos += scrollStep;
      
      // Réinitialiser la position si on atteint la moitié du contenu dupliqué
      if (scrollPos >= (totalWidth - containerWidth) / 2) {
        scrollPos = 0;
        scrollContainerRef.current.scrollLeft = 0;
      } else {
        scrollContainerRef.current.scrollLeft = scrollPos;
      }
      
      animationFrameId = requestAnimationFrame(scroll);
    };
    
    animationFrameId = requestAnimationFrame(scroll);
    
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [allTechnologies.length, isHovered]);
  
  // Définir les couleurs en fonction de la technologie
  const getColorsForTech = (techName) => {
    const techColors = {
      'React': { primary: "rgb(97, 180, 220)", secondary: "rgb(20, 140, 185)" },
      'Next': { primary: "rgb(40, 40, 40)", secondary: "rgb(80, 80, 80)" },
      'Tailwind': { primary: "rgb(56, 170, 220)", secondary: "rgb(14, 140, 200)" },
      'Node': { primary: "rgb(83, 140, 67)", secondary: "rgb(60, 110, 50)" },
      'MongoDB': { primary: "rgb(77, 160, 61)", secondary: "rgb(57, 130, 41)" },
      'Laravel': { primary: "rgb(220, 45, 32)", secondary: "rgb(180, 35, 25)" },
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
      {/* Arrière-plan technique subtil */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {/* Motif de circuits adouci */}
        <svg width="100%" height="100%" className="absolute opacity-3" viewBox="0 0 800 800">
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
        
        {/* Formes adoucies */}
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
        
        {/* Conteneur de technologies avec défilement continu */}
        <div 
          className="overflow-hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <motion.div
            ref={techGridRef}
            initial={{ opacity: 0 }}
            animate={techGridInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="pb-4"
          >
            <div 
              ref={scrollContainerRef}
              className="flex overflow-x-auto scrollbar-hide pb-4 pt-2 px-2 -mx-2"
              style={{ scrollBehavior: 'smooth' }}
            >
              {displayTechnologies.map((tech, index) => {
                // Récupérer l'URL du logo
                let logoUrl = null;
                if (tech.logo?.data) {
                  logoUrl = getStrapiMediaUrl(tech.logo.data.attributes.url);
                } else if (tech.logo?.url) {
                  logoUrl = getStrapiMediaUrl(tech.logo.url);
                }
                
                const { primary, secondary } = getColorsForTech(tech.nom);
                
                // Effet de délai progressif
                const delay = 0.03 * (index % allTechnologies.length);

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
                    className="flex-shrink-0 w-56 mx-2"
                  >
                    <div className="bg-white rounded-lg h-full shadow-sm overflow-hidden border border-gray-100 transition-all duration-300 relative group hover:shadow-md">
                      {/* Ligne décorative animée */}
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
                      
                      <div className="p-5 flex flex-col items-center">
                        {/* Logo ou initial */}
                        <div className="relative w-16 h-16 flex items-center justify-center mb-4 overflow-hidden">
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
                                width={64}
                                height={64}
                                className="object-contain max-w-full max-h-full"
                              />
                            </motion.div>
                          ) : (
                            <motion.div
                              className="flex items-center justify-center w-10 h-10 rounded-full"
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
                                className="text-lg font-semibold"
                              >
                                {tech.nom?.charAt(0) || '?'}
                              </motion.span>
                            </motion.div>
                          )}
                        </div>
                        
                        {/* Nom de la technologie */}
                        <motion.h3
                          className="text-base font-medium text-center transition-colors duration-300"
                          style={{ color: 'rgba(70, 70, 70, 1)' }}
                          whileHover={{ color: primary }}
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
                            background: `linear-gradient(90deg, ${primary}, ${secondary})`,
                            backgroundSize: "200% 100%"
                          }}
                          initial={{ width: 0 }}
                          animate={{ 
                            width: '40px',
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
                        
                        {/* Description */}
                        {tech.description && (
                          <motion.div
                            className="text-xs text-gray-500 text-center h-16 overflow-hidden relative"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: delay + 0.4, duration: 0.4 }}
                          >
                            <div>{tech.description}</div>
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}