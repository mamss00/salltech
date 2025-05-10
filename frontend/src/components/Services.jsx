'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { getServices, titreToSlug } from '@/utils/api'
import Link from 'next/link'
import { generateParticles } from '@/components/background/GridUtils'

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
  const particles = generateParticles(25, 'blue')
  
  // Animation au scroll pour l'ensemble de la section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  const sectionOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0.5, 1, 1, 0.5])
  // Effet unique pour Services - léger zoom au défilement
  const sectionScale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.98, 1, 1, 0.98])

  // Déclencher l'animation de séquence après le chargement
  useEffect(() => {
    if (!isLoading && !error && services.length > 0) {
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

  // Variants d'animation pour le conteneur - spécifique aux services
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        // Moins de décalage entre les éléments que dans Hero
        staggerChildren: 0.2,
        delayChildren: 0.3,
        when: "beforeChildren",
        ease: "easeOut"
      }
    }
  }

  // Variants d'animation pour les cartes - style spécifique aux services
  const itemVariants = {
    hidden: { 
      y: 50,
      opacity: 0,
      scale: 0.95,
      // Légère rotation pour donner un effet "feuille" ou "carte"
      rotateX: 5
    },
    visible: (i) => ({
      y: 0,
      opacity: 1,
      scale: 1,
      rotateX: 0,
      transition: { 
        type: "spring",
        stiffness: 90,
        damping: 12,
        delay: i * 0.15 // Délai moins prononcé que dans Hero
      }
    })
  }

  // Variants pour les éléments internes des cartes - spécifiques aux services
  const iconVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: (i) => ({ 
      scale: 1, 
      opacity: 1,
      transition: { 
        type: "spring", 
        delay: 0.2 + (i * 0.05),
        duration: 0.5
      } 
    })
  }

  const titleVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i) => ({ 
      opacity: 1, 
      x: 0,
      transition: { 
        type: "spring", 
        delay: 0.3 + (i * 0.05),
        duration: 0.4
      } 
    })
  }

  const lineVariants = {
    hidden: { width: "0%", opacity: 0 },
    visible: (i) => ({ 
      width: "40px", 
      opacity: 1,
      transition: { 
        type: "tween", 
        delay: 0.4 + (i * 0.05),
        duration: 0.4
      } 
    })
  }

  const descriptionVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i) => ({ 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "tween", 
        delay: 0.5 + (i * 0.05),
        duration: 0.4
      } 
    })
  }

  const linkVariants = {
    hidden: { opacity: 0, y: 5 },
    visible: (i) => ({ 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        delay: 0.6 + (i * 0.05),
        duration: 0.3
      } 
    })
  }

  // Obtenir la classe de couleur en fonction de l'index
  const getColorByIndex = (index) => {
    // Classes spécifiques aux services - dégradés plus professionnels et structurés
    const colorClasses = [
      'from-blue/15 to-blue/3',
      'from-purple/15 to-purple/3',
      'from-red/15 to-red/3'
    ]
    return colorClasses[index % colorClasses.length]
  }

  // Pattern spécifique pour l'arrière-plan de la section Services
  const servicePattern = (
    <svg width="100%" height="100%" className="absolute inset-0 opacity-5">
      <pattern id="serviceGrid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 20 L 20 40 M 0 20 L 20 0" fill="none" stroke="rgba(52, 152, 219, 0.3)" strokeWidth="0.5" />
      </pattern>
      <rect width="100%" height="100%" fill="url(#serviceGrid)" />
    </svg>
  )

  return (
    <section 
      id="services" 
      className="py-32 relative overflow-hidden bg-gray-50"
      ref={sectionRef}
    >
      {/* Arrière-plan spécifique à la section Services */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Pattern géométrique unique à la section Services */}
        {servicePattern}
        
        {/* Cercles colorés avec disposition spécifique aux services */}
        <motion.div 
          className="absolute top-32 right-10 w-96 h-96 rounded-full opacity-20"
          style={{ 
            background: "radial-gradient(circle, rgba(52, 152, 219, 0.2) 0%, rgba(52, 152, 219, 0) 60%)"
          }}
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{ 
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        
        <motion.div 
          className="absolute bottom-10 left-32 w-64 h-64 rounded-full opacity-15"
          style={{ 
            background: "radial-gradient(circle, rgba(155, 89, 182, 0.15) 0%, rgba(155, 89, 182, 0) 70%)"
          }}
          animate={{ 
            scale: [1, 1.15, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{ 
            duration: 18,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 3
          }}
        />
        
        {/* Hexagones décoratifs - élément unique à la section Services */}
        <svg className="absolute left-0 top-1/4 h-32 w-32 opacity-10">
          <polygon 
            points="30,0 60,15 60,45 30,60 0,45 0,15" 
            fill="none" 
            stroke="rgba(52, 152, 219, 0.5)"
            strokeWidth="1"
            transform="translate(16, 16)"
          />
        </svg>
        
        <svg className="absolute right-0 bottom-1/4 h-40 w-40 opacity-10">
          <polygon 
            points="35,0 70,20 70,60 35,80 0,60 0,20" 
            fill="none" 
            stroke="rgba(155, 89, 182, 0.5)"
            strokeWidth="1"
            transform="translate(20, 20)"
          />
        </svg>
        
        {/* Particules avec animation spécifique pour Services */}
        {particles.map((particle, index) => (
          <motion.div
            key={`particle-${index}`}
            className="absolute w-1 h-1 rounded-full bg-blue/20"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`
            }}
            animate={{
              // Mouvement horizontal plutôt que vertical (different de Hero)
              x: [0, particle.size * 10, 0],
              opacity: [0, particle.size / 4, 0],
              scale: [0, 1, 0]
            }}
            transition={{
              x: {
                duration: particle.duration,
                repeat: Infinity,
                ease: "easeInOut"
              },
              opacity: {
                duration: particle.duration * 0.8,
                repeat: Infinity,
                ease: "easeInOut"
              },
              scale: {
                duration: particle.duration * 0.2,
                repeat: Infinity,
                ease: "easeInOut",
                repeatType: "loop"
              }
            }}
          />
        ))}
      </div>

      <motion.div 
        className="container relative z-10"
        style={{ opacity: sectionOpacity, scale: sectionScale }}
      >
        {/* Séquence d'animation du titre - style spécifique aux services */}
        <div className="text-center relative">
          <motion.div
            className="inline-block mb-6"
            initial={{ opacity: 0, y: -10, scale: 0.9 }}
            animate={titleInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
          >
            {/* Badge avec design spécifique aux services */}
            <motion.span 
              className="inline-flex items-center px-5 py-2 rounded-md relative overflow-hidden border border-blue/20"
              style={{ background: "rgba(52, 152, 219, 0.05)" }}
              animate={titleInView ? {
                boxShadow: ['0 0 0 rgba(52, 152, 219, 0)', '0 0 8px rgba(52, 152, 219, 0.2)', '0 0 0 rgba(52, 152, 219, 0)']
              } : {}}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
            >
              <motion.span 
                className="w-2 h-2 rounded-sm bg-blue mr-3 relative z-10"
                animate={{ 
                  rotate: [0, 90, 180, 270, 360],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              
              <span className="text-blue text-sm font-medium tracking-wide uppercase relative z-10">
                NOS SOLUTIONS
              </span>
            </motion.span>
          </motion.div>
          
          <motion.h2
            ref={titleRef}
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-6 text-center relative"
          >
            <span>Nos </span>
            <motion.span 
              className="gradient-text"
              animate={{ 
                backgroundPosition: ['0% center', '100% center', '0% center'] 
              }}
              transition={{ 
                duration: 10, // Plus lent que dans Hero
                ease: 'linear', 
                repeat: Infinity 
              }}
            >
              Services
            </motion.span>
            
            {/* Ligne décorative sous le titre - style spécifique aux services */}
            <motion.div 
              className="h-1 w-32 mx-auto mt-4 rounded-sm"
              style={{ background: "linear-gradient(to right, rgba(52, 152, 219, 0.7), rgba(155, 89, 182, 0.7))" }}
              initial={{ width: 0, opacity: 0 }}
              animate={titleInView ? { width: "8rem", opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
            />
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
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: 1,
                rotate: 360,
                transition: { duration: 2, repeat: Infinity, ease: "linear" }
              }}
            >
              {/* Spinner avec hexagone - identité unique */}
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <polygon 
                  points="50,10 85,30 85,70 50,90 15,70 15,30" 
                  fill="none" 
                  stroke="url(#spinnerGradient)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <defs>
                    <linearGradient id="spinnerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#3498db" />
                      <stop offset="50%" stopColor="#9b59b6" />
                      <stop offset="100%" stopColor="#e74c3c" />
                    </linearGradient>
                  </defs>
                </polygon>
              </svg>
            </motion.div>
            <p className="text-gray-500 text-lg">Chargement des services...</p>
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
                  className="group h-full"
                  onMouseEnter={() => setHoveredCard(service.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <motion.div 
                    className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 h-full flex flex-col relative border border-gray-100"
                    whileHover={{ 
                      y: -8, 
                      boxShadow: '0 20px 25px rgba(0, 0, 0, 0.07)',
                      borderColor: 'rgba(52, 152, 219, 0.3)'
                    }}
                  >
                    {/* Bandeau supérieur coloré - caractéristique unique aux cartes de service */}
                    <div className={`h-1.5 w-full ${backgroundColor}`}></div>
                    
                    {/* Conteneur principal */}
                    <div className="p-8 flex flex-col h-full">
                      {/* Icône avec animation séquentielle */}
                      <motion.div 
                        className="mb-6 relative"
                        custom={index}
                        variants={iconVariants}
                      >
                        <div className="relative">
                          {/* Cercle décoratif derrière l'icône */}
                          <motion.div 
                            className={`absolute -inset-4 ${backgroundColor}/10 rounded-full opacity-30`}
                            animate={isHovered ? {
                              scale: [1, 1.2, 1],
                            } : {}}
                            transition={{ duration: 1.5, repeat: isHovered ? Infinity : 0 }}
                          />
                          
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
                        </div>
                      </motion.div>
                      
                      {/* Titre avec animation séquentielle */}
                      <motion.h3 
                        custom={index}
                        variants={titleVariants}
                        className={`text-xl font-bold mb-3 transition-colors duration-300 group-hover:${textColor}`}
                      >
                        {service.Titre}
                      </motion.h3>
                      
                      {/* Ligne séparatrice avec animation séquentielle */}
                      <motion.div 
                        custom={index}
                        variants={lineVariants}
                        className={`h-0.5 ${backgroundColor} mb-4 rounded-full`}
                        style={{ width: "40px" }}
                      />
                      
                      {/* Description avec animation séquentielle */}
                      <motion.p 
                        custom={index}
                        variants={descriptionVariants}
                        className="text-gray-600 mb-6 flex-grow"
                      >
                        {extractTextFromRichText(service.Description)}
                      </motion.p>
                      
                      {/* Lien avec animation séquentielle */}
                      <motion.div
                        custom={index}
                        variants={linkVariants}
                        className="mt-auto"
                      >
                        <Link 
                          href={`/services/${slug}`} 
                          className={`inline-flex items-center ${textColor} font-medium relative overflow-hidden`}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <motion.span
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
                        </Link>
                      </motion.div>
                    </div>
                  </motion.div>
                </motion.div>
              )
            })}
          </motion.div>
        )}
                    
      
        {/* Bouton "Voir tous les services" avec style spécifique à cette section */}
        {!isLoading && !error && services.length > 0 && (
          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            animate={appear ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1, duration: 0.6 }}
          >
            <motion.div
              className="inline-block relative overflow-hidden rounded-md"
              whileHover={{ 
                y: -3, 
                boxShadow: '0 10px 15px rgba(52, 152, 219, 0.2)'
              }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
                <motion.div
                  className="absolute inset-0 bg-blue"
                  animate={{ 
                    opacity: [0.9, 1, 0.9]
                  }}
                  transition={{ 
                    duration: 3, 
                    ease: 'easeInOut', 
                    repeat: Infinity 
                  }}
                />
                
                {/* Effet hexagones pour le bouton - identité services */}
                <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <pattern id="hexPattern" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                    <polygon points="5,0 10,2.5 10,7.5 5,10 0,7.5 0,2.5" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="0.5" />
                  </pattern>
                  <rect width="100" height="100" fill="url(#hexPattern)" />
                </svg>
                
                <Link 
                  href="/services" 
                  className="inline-flex items-center justify-center text-white px-8 py-3 font-medium relative z-10"
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