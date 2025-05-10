'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { getServices, titreToSlug } from '@/utils/api'
import Link from 'next/link'
import { generateParticles } from '@/components/background/GridUtils'
import ConnectionLines from '@/components/background/ConnectionLines'

const EnhancedServices = () => {
  // Refs pour les animations scroll
  const sectionRef = useRef(null)
  const [titleRef, titleInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [descRef, descInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [servicesRef, servicesInView] = useInView({ triggerOnce: true, threshold: 0.1 })

  // États pour les données
  const [services, setServices] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [hoveredCard, setHoveredCard] = useState(null)
  const [appear, setAppear] = useState(false)
  
  // Pour les particules d'arrière-plan
  const particles = generateParticles(30, 'blue')
  
  // Animation au scroll pour l'ensemble de la section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  const sectionOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0.5, 1, 1, 0.5])
  const sectionScale = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0.95, 1, 1, 0.95])

  // Déclencher l'animation de séquence après le chargement
  useEffect(() => {
    if (!isLoading && !error && services.length > 0) {
      // Délai avant de déclencher la séquence d'animation
      const timer = setTimeout(() => {
        setAppear(true)
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [isLoading, error, services.length])

  // Chargement des services
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const servicesData = await getServices()
        const sorted = [...servicesData].sort((a, b) => (a.Ordreaffichage || 999) - (b.Ordreaffichage || 999))
        setServices(sorted)
      } catch (err) {
        console.error('Erreur lors du chargement des services:', err)
        setError('Erreur lors du chargement des services. Veuillez réessayer plus tard.')
      } finally {
        setIsLoading(false)
      }
    }
    fetchServices()
  }, [])

  // Fonction pour extraire le texte du format richtext
  const extractTextFromRichText = (content) => {
    if (!Array.isArray(content)) return ''
    return content.map(block => block.children?.map(child => child.text || '').join('')).join('\n')
  }

  // Conversion des codes unicode en emojis
  const unicodeToEmoji = (value) => {
    if (!value?.startsWith('U+')) return value || '💡'
    try {
      return String.fromCodePoint(parseInt(value.replace('U+', ''), 16))
    } catch {
      return '💡'
    }
  }

  // Variants d'animation pour le conteneur
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.25,
        delayChildren: 0.5,
        when: "beforeChildren",
        ease: "easeOut"
      }
    }
  }

  // Variants d'animation pour les cartes - effet unique pour services
  const itemVariants = {
    hidden: { 
      y: 60,
      opacity: 0,
      scale: 0.92,
      rotateY: 15 // Léger effet 3D spécifique aux cards de services
    },
    visible: (i) => ({
      y: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: { 
        type: "spring",
        stiffness: 80,
        damping: 15,
        delay: i * 0.2 + 0.3
      }
    })
  }

  // Variants pour les éléments internes des cartes
  const iconVariants = {
    hidden: { scale: 0, opacity: 0, rotateZ: -30 },
    visible: (i) => ({ 
      scale: 1, 
      opacity: 1, 
      rotateZ: 0,
      transition: { 
        type: "spring", 
        delay: 0.3 + (i * 0.1),
        duration: 0.6 
      } 
    })
  }

  const titleVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({ 
      opacity: 1, 
      x: 0,
      transition: { 
        type: "spring", 
        delay: 0.5 + (i * 0.1),
        duration: 0.5 
      } 
    })
  }

  const lineVariants = {
    hidden: { width: "0%" },
    visible: (i) => ({ 
      width: "50px", 
      transition: { 
        type: "spring", 
        delay: 0.7 + (i * 0.1),
        duration: 0.5 
      } 
    })
  }

  const descriptionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({ 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        delay: 0.9 + (i * 0.1),
        duration: 0.5 
      } 
    })
  }

  const linkVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i) => ({ 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        delay: 1.1 + (i * 0.1),
        duration: 0.5 
      } 
    })
  }

  // Obtenir la classe de couleur en fonction de l'index - couleurs plus vives pour services
  const getColorByIndex = (index) => {
    const colorClasses = [
      'from-blue/20 to-blue/5',
      'from-purple/20 to-purple/5',
      'from-red/20 to-red/5'
    ]
    return colorClasses[index % colorClasses.length]
  }

  return (
    <section 
      id="services" 
      className="py-32 relative overflow-hidden"
      ref={sectionRef}
    >
      {/* Arrière-plan amélioré avec effets dynamiques - garder les grilles mais avec style spécifique */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Lignes de connexion fluides - garder mais modifier légèrement pour services */}
        <ConnectionLines color="blue" animate={true} />
        
        {/* Cercles colorés en arrière-plan - positionnement unique pour services */}
        <motion.div 
          className="absolute -top-10 right-1/4 w-96 h-96 rounded-full"
          style={{ 
            background: "radial-gradient(circle, rgba(52, 152, 219, 0.15) 0%, rgba(52, 152, 219, 0) 70%)"
          }}
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ 
            duration: 12,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        
        <motion.div 
          className="absolute bottom-0 left-1/3 w-96 h-96 rounded-full"
          style={{ 
            background: "radial-gradient(circle, rgba(155, 89, 182, 0.15) 0%, rgba(155, 89, 182, 0) 70%)"
          }}
          animate={{ 
            scale: [1, 1.15, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ 
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 2
          }}
        />
        
        {/* Grille spécifique pour services - garder mais personnaliser */}
        <div className="absolute inset-0 opacity-5">
          <svg width="100%" height="100%">
            <pattern id="servicesGrid" width="30" height="30" patternUnits="userSpaceOnUse">
              <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(52, 152, 219, 0.6)" strokeWidth="0.5" />
              <circle cx="0" cy="0" r="1" fill="rgba(52, 152, 219, 0.3)" />
              <circle cx="30" cy="0" r="1" fill="rgba(52, 152, 219, 0.3)" />
              <circle cx="0" cy="30" r="1" fill="rgba(52, 152, 219, 0.3)" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#servicesGrid)" />
          </svg>
        </div>
        
        {/* Éléments décoratifs supplémentaires pour services */}
        <svg className="absolute top-20 left-10 h-40 w-40 opacity-10" viewBox="0 0 100 100">
          <polygon 
            points="50,10 90,30 90,70 50,90 10,70 10,30" 
            fill="none" 
            stroke="rgba(52, 152, 219, 0.4)" 
            strokeWidth="1"
          />
          <polygon 
            points="50,20 80,35 80,65 50,80 20,65 20,35" 
            fill="none" 
            stroke="rgba(52, 152, 219, 0.3)" 
            strokeWidth="0.5"
          />
        </svg>
        
        <svg className="absolute bottom-20 right-10 h-40 w-40 opacity-10" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(155, 89, 182, 0.4)" strokeWidth="1" />
          <circle cx="50" cy="50" r="30" fill="none" stroke="rgba(155, 89, 182, 0.3)" strokeWidth="0.5" />
          <circle cx="50" cy="50" r="20" fill="none" stroke="rgba(155, 89, 182, 0.2)" strokeWidth="0.5" />
        </svg>
        
        {/* Particules plus dynamiques pour services */}
        {particles.map((particle, index) => (
          <motion.div
            key={`particle-${index}`}
            className="absolute w-1 h-1 rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              backgroundColor: index % 3 === 0 ? 'rgba(52, 152, 219, 0.3)' : 
                             index % 3 === 1 ? 'rgba(155, 89, 182, 0.3)' : 
                                              'rgba(231, 76, 60, 0.3)'
            }}
            animate={{
              // Motif de déplacement unique pour services - en zigzag
              x: [0, particle.size * 5, -particle.size * 5, 0],
              y: [0, -particle.size * 5, particle.size * 5, 0],
              opacity: [0, particle.size / 3, particle.size / 3, 0],
              scale: [0, 1, 1, 0]
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <motion.div 
        className="container relative z-10"
        style={{ opacity: sectionOpacity, scale: sectionScale }}
      >
        {/* Séquence d'animation du titre */}
        <div className="text-center relative">
          <motion.div
            className="inline-block mb-6"
            initial={{ opacity: 0, y: -10, scale: 0.9 }}
            animate={titleInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
          >
            {/* Badge avec style distinctif pour services */}
            <motion.span 
              className="inline-flex items-center px-5 py-2.5 rounded-full relative overflow-hidden"
              style={{ 
                background: "linear-gradient(120deg, rgba(52, 152, 219, 0.1), rgba(52, 152, 219, 0.2), rgba(52, 152, 219, 0.1))",
                border: "1px solid rgba(52, 152, 219, 0.2)"
              }}
              animate={titleInView ? {
                boxShadow: ['0 0 0 rgba(52, 152, 219, 0)', '0 0 10px rgba(52, 152, 219, 0.3)', '0 0 0 rgba(52, 152, 219, 0)']
              } : {}}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
            >
              {/* Icône hexagonale distinctive pour services */}
              <motion.div 
                className="mr-3 relative z-10"
                animate={{ 
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                <svg className="w-5 h-5 text-blue" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <polygon points="12,2 22,8.5 22,15.5 12,22 2,15.5 2,8.5" strokeWidth="1.5" />
                  <line x1="12" y1="2" x2="12" y2="22" strokeWidth="1.5" />
                  <line x1="2" y1="8.5" x2="22" y2="8.5" strokeWidth="1.5" />
                  <line x1="2" y1="15.5" x2="22" y2="15.5" strokeWidth="1.5" />
                </svg>
              </motion.div>
              
              <span className="text-blue text-sm font-semibold tracking-wider uppercase relative z-10">
                NOS SOLUTIONS
              </span>
            </motion.span>
          </motion.div>
          
          <motion.h2
            ref={titleRef}
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-extrabold mb-6 text-center relative"
          >
            Nos <motion.span 
              className="gradient-text relative"
              animate={{ 
                backgroundPosition: ['0% center', '100% center', '0% center'] 
              }}
              transition={{ 
                duration: 8, 
                ease: 'linear', 
                repeat: Infinity 
              }}
            >
              Services
              {/* Éléments décoratifs autour du mot "Services" */}
              <motion.div 
                className="absolute -top-1 -right-4 w-3 h-3 rounded-full bg-blue/30"
                animate={{ 
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "mirror",
                  delay: 1
                }}
              />
              <motion.div 
                className="absolute -bottom-2 -left-2 w-2 h-2 rounded-full bg-purple/30"
                animate={{ 
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "mirror",
                  delay: 2
                }}
              />
            </motion.span>
            
            <motion.div 
              className="h-1 w-24 mx-auto mt-6 overflow-hidden rounded-full"
              initial={{ width: 0, opacity: 0 }}
              animate={titleInView ? { width: "6rem", opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <motion.div
                className="h-full w-full bg-gradient-to-r from-blue via-purple to-red"
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
              />
            </motion.div>
          </motion.h2>

          <motion.p
            ref={descRef}
            initial={{ opacity: 0, y: 20 }}
            animate={descInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-600 max-w-3xl mx-auto text-center mb-20"
          >
            Nous proposons des services digitaux sur mesure pour les entreprises mauritaniennes.
            Des solutions adaptées à vos besoins pour accompagner votre transformation numérique.
          </motion.p>
        </div>

        {/* État de chargement avec animation spécifique aux services */}
        {isLoading ? (
          <div className="flex flex-col justify-center items-center h-64">
            <motion.div 
              className="w-16 h-16 mb-6 relative"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <div className="absolute top-0 left-0 right-0 bottom-0">
                {/* Spinner hexagonal unique aux services */}
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <polygon 
                    points="50,10 85,30 85,70 50,90 15,70 15,30" 
                    fill="none" 
                    stroke="url(#spinGradient)"
                    strokeWidth="4"
                    strokeLinecap="round"
                  >
                    <defs>
                      <linearGradient id="spinGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#3498db" />
                        <stop offset="50%" stopColor="#9b59b6" />
                        <stop offset="100%" stopColor="#e74c3c" />
                      </linearGradient>
                    </defs>
                  </polygon>
                </svg>
              </div>
            </motion.div>
            <p className="text-gray-500 text-lg">Chargement en cours...</p>
          </div>
        ) : error ? (
          <motion.div 
            className="text-center py-10 px-6 bg-red/10 rounded-xl backdrop-blur-sm"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", duration: 0.5 }}
          >
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red/20 flex items-center justify-center">
              <svg className="w-8 h-8 text-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <p className="text-xl font-semibold text-red/90 mb-2">Oops! Une erreur est survenue</p>
            <p className="text-gray-600">{error}</p>
          </motion.div>
        ) : (
          <motion.div
            ref={servicesRef}
            variants={containerVariants}
            initial="hidden"
            animate={servicesInView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {services.map((service, index) => {
              const color = service.Couleur || getColorByIndex(index)
              const emoji = unicodeToEmoji(service.Emoji)
              const textColor = color.includes('blue') ? 'text-blue' : color.includes('purple') ? 'text-purple' : color.includes('red') ? 'text-red' : 'text-blue'
              const backgroundColor = color.includes('blue') ? 'bg-blue' : color.includes('purple') ? 'bg-purple' : color.includes('red') ? 'bg-red' : 'bg-blue'
              const slug = service.slug || titreToSlug(service.Titre)
              const isHovered = hoveredCard === service.id

              return (
                <motion.div
                  key={service.id}
                  custom={index}
                  variants={itemVariants}
                  className="group h-full perspective-500"
                  onMouseEnter={() => setHoveredCard(service.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <motion.div 
                    className={`backdrop-blur-sm rounded-xl overflow-hidden transition-all duration-500 h-full flex flex-col relative`}
                    style={{
                      background: `linear-gradient(135deg, ${color.includes('blue') ? 'rgba(52, 152, 219, 0.15)' : 
                                                            color.includes('purple') ? 'rgba(155, 89, 182, 0.15)' : 
                                                            'rgba(231, 76, 60, 0.15)'}, 
                                                 ${color.includes('blue') ? 'rgba(52, 152, 219, 0.05)' : 
                                                  color.includes('purple') ? 'rgba(155, 89, 182, 0.05)' : 
                                                  'rgba(231, 76, 60, 0.05)'})`
                    }}
                    whileHover={{ 
                      y: -10, 
                      boxShadow: '0 20px 30px rgba(0, 0, 0, 0.1)',
                      rotateY: 5, // Léger effet 3D au survol, unique à la section services
                      scale: 1.02
                    }}
                  >
                    {/* Élément décoratif supérieur distinctif pour services */}
                    <div 
                      className={`h-1 w-full ${backgroundColor} relative`}
                    >
                      <motion.div 
                        className="absolute inset-y-0 left-0 w-16 bg-white/30"
                        initial={{ x: "-100%" }}
                        animate={isHovered ? { x: ["100%", "-100%"] } : {}}
                        transition={{ 
                          duration: 1.5, 
                          repeat: isHovered ? Infinity : 0,
                          ease: "linear"
                        }}
                      />
                    </div>
                    
                    {/* Effet de grille de fond subtile pour chaque carte */}
                    <div className="absolute inset-0 opacity-10 pointer-events-none">
                      <svg width="100%" height="100%">
                        <pattern id={`cardGrid-${index}`} width="20" height="20" patternUnits="userSpaceOnUse">
                          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" />
                        </pattern>
                        <rect width="100%" height="100%" fill={`url(#cardGrid-${index})`} className={textColor} />
                      </svg>
                    </div>
                    
                    {/* Effet de surbrillance au survol */}
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                      style={{ 
                        backgroundSize: "200% 100%",
                        opacity: 0
                      }}
                      animate={isHovered ? {
                        backgroundPosition: ["100% 0%", "-100% 0%"],
                        opacity: 1
                      } : {}}
                      transition={{
                        duration: 1.5
                      }}
                    />
                    
                    {/* Contenu avec z-index supérieur */}
                    <div className="p-8 relative z-10 flex flex-col h-full">
                      {/* Icône avec animation séquentielle */}
                      <motion.div 
                        className="mb-6 relative"
                        custom={index}
                        variants={iconVariants}
                      >
                        <div className="relative">
                          {/* Forme géométrique derrière l'icône - hexagone pour services */}
                          <motion.div 
                            className="absolute -inset-4 opacity-0"
                            initial={{ opacity: 0 }}
                            animate={isHovered ? {
                              opacity: 0.2,
                              rotate: [0, 180],
                              scale: [1, 1.2, 1],
                            } : {}}
                            transition={{ 
                              duration: 5, 
                              repeat: isHovered ? Infinity : 0,
                              repeatType: "reverse"
                            }}
                          >
                            <svg viewBox="0 0 100 100" className={`w-full h-full ${textColor}`}>
                              <polygon 
                                points="50,3 97,25 97,75 50,97 3,75 3,25" 
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1"
                              />
                            </svg>
                          </motion.div>
                          
                          <motion.span 
                            className={`text-5xl ${textColor} relative z-10 inline-block`}
                            animate={isHovered ? {
                              rotate: [0, 5, 0, -5, 0],
                              scale: [1, 1.1, 1]
                            } : {}}
                            transition={{ duration: 2, repeat: isHovered ? Infinity : 0 }}
                          >
                            {emoji}
                          </motion.span>
                          
                          {/* Effet de halo */}
                          <motion.div 
                            className={`absolute -inset-8 ${backgroundColor}/5 rounded-full opacity-0`}
                            animate={isHovered ? {
                              scale: [1, 1.5, 1],
                              opacity: [0, 0.5, 0]
                            } : {}}
                            transition={{ duration: 2, repeat: isHovered ? Infinity : 0 }}
                          />
                        </div>
                      </motion.div>
                      
                      {/* Titre avec animation séquentielle */}
                      <motion.h3 
                        custom={index}
                        variants={titleVariants}
                        className={`text-2xl font-bold mb-4 transition-colors duration-300 group-hover:${textColor}`}
                      >
                        {service.Titre}
                      </motion.h3>
                      
                      {/* Ligne séparatrice avec animation séquentielle - style unique */}
                      <motion.div 
                        custom={index}
                        variants={lineVariants}
                        className={`h-0.5 mb-5 overflow-hidden rounded-sm relative`}
                        style={{ background: `rgba(var(--color-${color.includes('blue') ? 'blue' : color.includes('purple') ? 'purple' : 'red'}-rgb), 0.3)` }}
                      >
                        <motion.div 
                          className={`absolute inset-y-0 left-0 ${backgroundColor}`}
                          animate={{ x: ["0%", "100%", "0%"] }}
                          transition={{ 
                            duration: 4, 
                            repeat: Infinity, 
                            repeatType: "reverse" 
                          }}
                          style={{ width: "30%" }}
                        />
                      </motion.div>
                      
                      {/* Description avec animation séquentielle */}
                      <motion.p 
                        custom={index}
                        variants={descriptionVariants}
                        className="text-gray-600 mb-6 flex-grow"
                      >
                        {extractTextFromRichText(service.Description)}
                      </motion.p>
                      
                      {/* Lien avec animation séquentielle - style distinctif */}
                      <motion.div
                        custom={index}
                        variants={linkVariants}
                        className="mt-auto pointer-events-auto relative z-20 overflow-hidden"
                      >
                        <Link 
                          href={`/services/${slug}`} 
                          className={`inline-flex items-center ${textColor} font-medium relative overflow-hidden group-hover:pl-0.5 transition-all duration-300`}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <motion.span
                           className="relative z-10 flex items-center"
                           whileHover={{ x: 5 }}
                           transition={{ type: "spring", stiffness: 400, damping: 10 }}
                         >
                           En savoir plus
                           <motion.svg 
                             className="w-5 h-5 ml-2 inline-block" 
                             fill="none" 
                             stroke="currentColor" 
                             viewBox="0 0 24 24"
                             animate={isHovered ? { x: [0, 5, 0] } : {}}
                             transition={{ duration: 1, repeat: isHovered ? Infinity : 0 }}
                           >
                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                           </motion.svg>
                         </motion.span>
                         
                         {/* Ligne sous le lien - effet distinctif pour services */}
                         <motion.div 
                           className={`absolute bottom-0 left-0 h-0.5 ${backgroundColor}/70`}
                           initial={{ width: 0 }}
                           whileHover={{ width: "100%" }}
                           transition={{ duration: 0.3 }}
                         />
                       </Link>
                     </motion.div>
                   </div>
                   
                   {/* Points lumineux aux coins avec effet distinctif */}
                   <motion.div
                     className={`absolute top-2 right-2 w-1 h-1 rounded-full ${backgroundColor}/70`}
                     animate={{ opacity: [0.3, 0.8, 0.3] }}
                     transition={{ duration: 2, repeat: Infinity }}
                   />
                   <motion.div
                     className={`absolute bottom-2 left-2 w-1 h-1 rounded-full ${backgroundColor}/70`}
                     animate={{ opacity: [0.3, 0.8, 0.3] }}
                     transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                   />
                   
                   {/* Élément décoratif distinctif pour services */}
                   <motion.div 
                     className="absolute -bottom-3 -right-3 w-8 h-8 opacity-0"
                     animate={isHovered ? { opacity: 0.3 } : {}}
                     transition={{ duration: 0.3 }}
                   >
                     <svg viewBox="0 0 50 50" className={textColor}>
                       <polygon points="25,5 45,20 45,35 25,45 5,35 5,20" fill="none" stroke="currentColor" />
                       <line x1="25" y1="5" x2="25" y2="45" stroke="currentColor" strokeWidth="0.5" />
                       <line x1="5" y1="20" x2="45" y2="20" stroke="currentColor" strokeWidth="0.5" />
                       <line x1="5" y1="35" x2="45" y2="35" stroke="currentColor" strokeWidth="0.5" />
                     </svg>
                   </motion.div>
                 </motion.div>
               </motion.div>
             )
           })}
         </motion.div>
       )}
                   
     
       {/* Voir tous les services - Bouton flottant avec style unique pour services */}
       {!isLoading && !error && services.length > 0 && (
         <motion.div
           className="text-center mt-16"
           initial={{ opacity: 0, y: 20 }}
           animate={appear ? { opacity: 1, y: 0 } : {}}
           transition={{ delay: 1, duration: 0.6 }}
         >
           <motion.div
             className="inline-block relative overflow-hidden rounded-xl"
             whileHover={{ 
               y: -5, 
               boxShadow: '0 20px 30px rgba(0, 0, 0, 0.1)',
             }}
             whileTap={{ scale: 0.97 }}
             transition={{ type: "spring", stiffness: 400, damping: 17 }}
           >
               <motion.div
                 className="absolute inset-0 bg-gradient-to-r from-blue via-purple to-red bg-[length:200%_auto]"
                 animate={{ 
                   backgroundPosition: ['0% center', '100% center', '0% center'] 
                 }}
                 transition={{ 
                   duration: 8, 
                   ease: 'linear', 
                   repeat: Infinity 
                 }}
               />
               
               {/* Élément décoratif spécifique pour le bouton de services */}
               <div className="absolute inset-0 opacity-20 overflow-hidden">
                 <svg width="100%" height="100%" preserveAspectRatio="none">
                   <pattern id="servicesBtnPattern" patternUnits="userSpaceOnUse" width="10" height="10" patternTransform="rotate(45)">
                     <line x1="0" y1="0" x2="0" y2="10" stroke="white" strokeWidth="0.5" />
                   </pattern>
                   <rect width="100%" height="100%" fill="url(#servicesBtnPattern)" />
                 </svg>
               </div>
               
               {/* Effet de brillance qui se déplace */}
               <motion.div 
                 className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                 style={{ 
                   backgroundSize: "200% 100%",
                 }}
                 animate={{
                   backgroundPosition: ["100% 0%", "-100% 0%"],
                 }}
                 transition={{
                   duration: 2,
                   repeat: Infinity,
                   repeatDelay: 3
                 }}
               />
               
               <Link 
                 href="/services" 
                 className="inline-flex items-center text-white px-8 py-4 font-medium relative z-10"
               >
                 <span className="mr-2">Voir tous nos services</span>
                 <motion.svg 
                   className="w-5 h-5" 
                   fill="none" 
                   stroke="currentColor" 
                   viewBox="0 0 24 24"
                   animate={{ x: [0, 5, 0] }}
                   transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                 >
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                 </motion.svg>
               </Link>
             </motion.div>
         </motion.div>
       )}
     </motion.div>
   </section>
 )
}

export default EnhancedServices