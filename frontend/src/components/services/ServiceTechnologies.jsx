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
  
  // Technologies par défaut si moins de 6 sont fournies
  const defaultTechs = [
    { nom: "React", description: "Bibliothèque JavaScript pour créer des interfaces utilisateur dynamiques" },
    { nom: "Next.js", description: "Framework React orienté serveur pour des applications web performantes" },
    { nom: "Tailwind CSS", description: "Framework CSS utilitaire pour un développement rapide" },
    { nom: "Node.js", description: "Environnement d'exécution JavaScript côté serveur" },
    { nom: "MongoDB", description: "Base de données NoSQL orientée document" },
    { nom: "Laravel", description: "Framework PHP élégant pour le développement web" }
  ];
  
  // Construire la liste complète des technologies (au moins 6)
  const allTechnologies = technologies.length >= 6 
    ? technologies 
    : [...technologies, ...defaultTechs.slice(0, 6 - technologies.length)];
  
  // État pour gérer le défilement des technologies
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(allTechnologies.length / 6);
  
  // Animation pour le slider fluide
  const sliderRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  
  // Changement de page automatique
  useEffect(() => {
    if (totalPages <= 1) return; // Pas de défilement si une seule page
    
    const interval = setInterval(() => {
      setCurrentPage(prev => (prev + 1) % totalPages);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [totalPages]);
  
  // Gestion des événements de glissement
  const handleMouseDown = (e) => {
    if (!sliderRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };
  
  const handleMouseMove = (e) => {
    if (!isDragging || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Multiplier pour accélérer le défilement
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };
  
  const handleMouseUp = () => {
    setIsDragging(false);
    if (!sliderRef.current) return;
    
    // Déterminer quelle page est la plus visible
    const scrollPosition = sliderRef.current.scrollLeft;
    const pageWidth = sliderRef.current.clientWidth;
    const newPage = Math.round(scrollPosition / pageWidth);
    setCurrentPage(Math.min(newPage, totalPages - 1));
  };
  
  // Synchroniser le défilement avec la page actuelle
  useEffect(() => {
    if (!sliderRef.current) return;
    sliderRef.current.scrollTo({
      left: currentPage * sliderRef.current.clientWidth,
      behavior: 'smooth'
    });
  }, [currentPage]);
  
  // Définir les couleurs en fonction de l'index
  const getColorsByIndex = (idx) => {
    const colors = [
      { primary: "rgb(52, 152, 219)", secondary: "rgb(41, 128, 185)" }, // Bleu
      { primary: "rgb(155, 89, 182)", secondary: "rgb(142, 68, 173)" }, // Violet
      { primary: "rgb(231, 76, 60)", secondary: "rgb(192, 57, 43)" },   // Rouge
      { primary: "rgb(46, 204, 113)", secondary: "rgb(39, 174, 96)" },  // Vert
      { primary: "rgb(241, 196, 15)", secondary: "rgb(243, 156, 18)" }, // Jaune
      { primary: "rgb(52, 73, 94)", secondary: "rgb(44, 62, 80)" }      // Bleu-gris
    ];
    return colors[idx % colors.length];
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
        
        {/* Indicateur de progression stylé */}
        {totalPages > 1 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex justify-center mb-10"
          >
            <div className="flex items-center justify-center bg-white px-4 py-2 rounded-full shadow-md border border-gray-100">
              <div className="flex items-baseline">
                <span className="text-3xl font-bold text-blue mr-1">{currentPage + 1}</span>
                <span className="text-gray-400 font-medium">/ {totalPages}</span>
              </div>
              
              <div className="mx-4 h-8 w-px bg-gray-200"></div>
              
              <div className="flex space-x-1">
                {Array.from({ length: totalPages }).map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentPage(idx)}
                    className={`w-8 h-1.5 rounded-full transition-all duration-300 focus:outline-none ${
                      idx === currentPage ? `bg-${color}` : 'bg-gray-200'
                    }`}
                    aria-label={`Page ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
        
        {/* Container du slider */}
        <div className="relative overflow-hidden">
          {/* Flèches de navigation */}
          {totalPages > 1 && (
            <>
              <button 
                onClick={() => setCurrentPage(prev => (prev - 1 + totalPages) % totalPages)}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg text-gray-800 focus:outline-none"
                style={{ 
                  backdropFilter: 'blur(4px)',
                  WebkitBackdropFilter: 'blur(4px)' 
                }}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                </svg>
              </button>
              <button 
                onClick={() => setCurrentPage(prev => (prev + 1) % totalPages)}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg text-gray-800 focus:outline-none"
                style={{ 
                  backdropFilter: 'blur(4px)',
                  WebkitBackdropFilter: 'blur(4px)' 
                }}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </button>
            </>
          )}
          
          {/* Slider fluide */}
          <div
            ref={sliderRef}
            className="overflow-x-hidden w-full cursor-grab snap-x snap-mandatory touch-pan-x"
            style={{ 
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch'
            }}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseUp}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onTouchStart={() => setIsDragging(true)}
            onTouchEnd={() => setIsDragging(false)}
          >
            <motion.div 
              ref={techGridRef}
              initial={{ opacity: 0 }}
              animate={techGridInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8 }}
              className="flex snap-x snap-mandatory"
              style={{ 
                width: `${totalPages * 100}%`,
                transform: `translateX(-${currentPage * (100 / totalPages)}%)`, 
                transition: isDragging ? 'none' : 'transform 0.5s ease-out'
              }}
            >
              {Array.from({ length: totalPages }).map((_, pageIndex) => (
                <div 
                  key={pageIndex} 
                  className="flex-shrink-0 w-full snap-center grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 px-2"
                >
                  {allTechnologies
                    .slice(pageIndex * 6, (pageIndex + 1) * 6)
                    .map((tech, index) => {
                      // Récupérer l'URL du logo
                      let logoUrl = null;
                      if (tech.logo?.data) {
                        logoUrl = getStrapiMediaUrl(tech.logo.data.attributes.url);
                      } else if (tech.logo?.url) {
                        logoUrl = getStrapiMediaUrl(tech.logo.url);
                      }
                      
                      const globalIndex = pageIndex * 6 + index;
                      const { primary, secondary } = getColorsByIndex(globalIndex);
                      
                      // Effet de délai progressif
                      const delay = 0.05 * index;

                      return (
                        <motion.div 
                          key={globalIndex}
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
                          whileHover={{ 
                            y: -8,
                            boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.1)",
                            transition: { 
                              type: "spring", 
                              stiffness: 400, 
                              damping: 10 
                            }
                          }}
                          className="h-full"
                        >
                          <div className="bg-white rounded-lg h-full shadow-sm overflow-hidden border border-gray-100 transition-all duration-300 relative group">
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
                                    style={{ backgroundColor: `${primary}20` }}
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
                                      style={{ color: primary }}
                                      className="text-lg font-semibold"
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
                                        repeatType: "mirror",
                                        delay: delay
                                      }}
                                    >
                                      {tech.nom?.charAt(0) || '?'}
                                    </motion.span>
                                    
                                    {/* Cercles concentriques animés */}
                                    <motion.div
                                      style={{ borderColor: `${primary}30` }}
                                      className="absolute w-12 h-12 rounded-full border"
                                      animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
                                      transition={{
                                        duration: 3,
                                        repeat: Infinity,
                                        repeatType: "mirror"
                                      }}
                                    />
                                    <motion.div
                                      style={{ borderColor: `${primary}15` }}
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
                                className="text-base font-medium text-center transition-colors duration-300"
                                style={{ color: 'rgba(70, 70, 70, 1)' }}
                                whileHover={{ color: primary }}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: delay + 0.3, duration: 0.4 }}
                              >
                                {tech.nom || `Technologie ${globalIndex + 1}`}
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
                                    duration: 3,
                                    repeat: Infinity,
                                    repeatType: "reverse"
                                  }
                                }}
                              />
                              
                              {/* Description avec effet de défilement */}
                              {tech.description && (
                                <motion.div
                                  className="text-xs text-gray-500 text-center h-12 overflow-hidden relative"
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ delay: delay + 0.4, duration: 0.4 }}
                                >
                                  {tech.description.length > 40 ? (
                                    // Animation de défilement si le texte est long
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
                                      {tech.description}
                                    </motion.div>
                                  ) : (
                                    // Pas d'animation si le texte est court
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
                              transition={{ duration: 2, repeat: Infinity, delay: delay }}
                            />
                            <motion.div 
                              className="absolute top-0 right-0 w-1 h-1 rounded-full"
                              style={{ backgroundColor: secondary }}
                              animate={{ opacity: [0.2, 1, 0.2] }}
                              transition={{ duration: 2, repeat: Infinity, delay: delay + 0.5 }}
                            />
                            <motion.div 
                              className="absolute bottom-0 left-0 w-1 h-1 rounded-full"
                              style={{ backgroundColor: secondary }}
                              animate={{ opacity: [0.2, 1, 0.2] }}
                              transition={{ duration: 2, repeat: Infinity, delay: delay + 1 }}
                            />
                            <motion.div 
                              className="absolute bottom-0 right-0 w-1 h-1 rounded-full"
                              style={{ backgroundColor: primary }}
                              animate={{ opacity: [0.2, 1, 0.2] }}
                              transition={{ duration: 2, repeat: Infinity, delay: delay + 1.5 }}
                            />
                          </div>
                        </motion.div>
                      );
                    })}
                </div>
              ))}
            </motion.div>
          </div>
        </div>
        
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