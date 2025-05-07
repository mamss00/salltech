'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { getServices, titreToSlug } from '@/utils/api'
import Link from 'next/link'

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

  // Animation au scroll pour l'ensemble de la section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  const sectionOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0.5, 1, 1, 0.5])

  // Déclencher l'animation de séquence après le chargement
  useEffect(() => {
    if (servicesInView && !isLoading && !error) {
      // Délai avant de déclencher la séquence d'animation
      const timer = setTimeout(() => {
        setAppear(true)
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [servicesInView, isLoading, error])

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
        staggerChildren: 0.15,
        delayChildren: 0.3,
        when: "beforeChildren",
        ease: "easeOut"
      }
    }
  }

  // Variants d'animation pour les cartes
  const itemVariants = {
    hidden: { 
      y: 80,
      opacity: 0,
      scale: 0.9,
      rotateZ: -2
    },
    visible: (i) => ({
      y: 0,
      opacity: 1,
      scale: 1,
      rotateZ: 0,
      transition: { 
        type: "spring",
        stiffness: 80,
        damping: 15,
        mass: 0.8,
        duration: 0.7,
        delay: i * 0.1
      }
    })
  }

  // Variants pour les éléments internes des cartes
  const iconVariants = {
    hidden: { scale: 0, opacity: 0, rotateY: 90 },
    visible: (i) => ({ 
      scale: 1, 
      opacity: 1, 
      rotateY: 0,
      transition: { 
        type: "spring", 
        delay: 0.1 + (i * 0.05),
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
        delay: 0.2 + (i * 0.05),
        duration: 0.5 
      } 
    })
  }

  const lineVariants = {
    hidden: { width: "0%", opacity: 0 },
    visible: (i) => ({ 
      width: "40px", 
      opacity: 1,
      transition: { 
        type: "spring", 
        delay: 0.3 + (i * 0.05),
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
        delay: 0.4 + (i * 0.05),
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
        delay: 0.5 + (i * 0.05),
        duration: 0.5 
      } 
    })
  }

  // Obtenir la classe de couleur en fonction de l'index
  const getColorByIndex = (index) => {
    const colorClasses = [
      'from-blue/20 to-blue/5',
      'from-purple/20 to-purple/5',
      'from-red/20 to-red/5'
    ]
    return colorClasses[index % colorClasses.length]
  }

  // Effet de particules pour l'arrière-plan
  const generateParticles = (count) => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 30 + 20
    }));
  };
  
  const particles = generateParticles(20);

  return (
    <section 
      id="services" 
      className="py-32 relative overflow-hidden"
      ref={sectionRef}
    >
      {/* Arrière-plan amélioré avec effets dynamiques */}
      <div className="absolute inset-0 z-0">
        {/* Cercles colorés en arrière-plan */}
        <motion.div 
          className="absolute -top-32 -right-32 w-96 h-96 bg-blue/5 rounded-full blur-3xl"
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
          className="absolute -bottom-32 -left-32 w-96 h-96 bg-purple/5 rounded-full blur-3xl"
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
        
        <motion.div 
          className="absolute top-1/3 left-1/4 w-64 h-64 bg-red/5 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ 
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 1
          }}
        />
        
        {/* Particules animées */}
        {particles.map(particle => (
          <motion.div
            key={particle.id}
            className="absolute w-1 h-1 rounded-full bg-blue/30"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`
            }}
            animate={{
              y: ["0%", "100%"],
              opacity: [0, 0.8, 0]
            }}
            transition={{
              y: {
                duration: particle.duration,
                repeat: Infinity,
                ease: "linear"
              },
              opacity: {
                duration: particle.duration * 0.8,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
          />
        ))}
        
        {/* Grille subtile */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(52, 152, 219, 0.3)" strokeWidth="0.5" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
      </div>

      <motion.div 
        className="container relative z-10"
        style={{ opacity: sectionOpacity }}
      >
        {/* Séquence d'animation du titre */}
        <div className="text-center relative">
          <motion.div
            className="inline-block mb-6"
            initial={{ opacity: 0, y: -10, scale: 0.9 }}
            animate={titleInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
          >
            <motion.span 
              className="inline-block px-4 py-1.5 bg-blue/10 rounded-full text-blue text-sm font-medium"
              animate={titleInView ? {
                boxShadow: ['0 0 0 rgba(52, 152, 219, 0)', '0 0 10px rgba(52, 152, 219, 0.3)', '0 0 0 rgba(52, 152, 219, 0)']
              } : {}}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
            >
              NOS SOLUTIONS
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
              className="gradient-text"
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
            </motion.span>
            
            {/* Effet de soulignement animé */}
            <motion.div 
              className="absolute left-1/2 transform -translate-x-1/2 -bottom-3 h-1 bg-gradient-to-r from-blue via-purple to-red rounded-full"
              initial={{ width: 0, opacity: 0 }}
              animate={titleInView ? { width: '120px', opacity: 1 } : {}}
              transition={{ delay: 0.4, duration: 0.8 }}
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

        {/* État de chargement avec animation */}
        {isLoading ? (
          <div className="flex flex-col justify-center items-center h-64">
            <motion.div 
              className="w-16 h-16 mb-6 relative"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <div className="absolute top-0 left-0 right-0 bottom-0 rounded-full border-4 border-t-blue border-r-purple border-b-red border-l-transparent"></div>
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
          <AnimatePresence>
            {appear && (
              <motion.div
                ref={servicesRef}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {services.map((service, index) => {
                  const color = service.Couleur || getColorByIndex(index)
                  const emoji = unicodeToEmoji(service.Emoji)
                  const textColor = color.includes('blue') ? 'text-blue' : color.includes('purple') ? 'text-purple' : color.includes('red') ? 'text-red' : 'text-blue'
                  const slug = service.slug || titreToSlug(service.Titre)
                  const isHovered = hoveredCard === service.id

                  return (
                    <motion.div
                      key={service.id}
                      custom={index} // Utiliser custom pour le délai séquentiel
                      variants={itemVariants}
                      className="group h-full"
                      onMouseEnter={() => setHoveredCard(service.id)}
                      onMouseLeave={() => setHoveredCard(null)}
                      initial="hidden"
                      animate="visible"
                    >
                      <motion.div 
                        className={`bg-gradient-to-br ${color} backdrop-blur-sm rounded-2xl shadow-md 
                        transition-all duration-500 h-full flex flex-col p-8 relative overflow-hidden`}
                        whileHover={{ 
                          y: -10, 
                          boxShadow: '0 20px 30px rgba(0, 0, 0, 0.1)',
                          scale: 1.02
                        }}
                      >
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
                        
                        {/* Icône avec animation séquentielle */}
                        <motion.div 
                          className="text-4xl mb-6 relative"
                          custom={index}
                          variants={iconVariants}
                          whileHover={{ scale: 1.1 }}
                          transition={{ type: "spring", stiffness: 300, damping: 10 }}
                        >
                          {/* Cercle décoratif derrière l'icône */}
                          <motion.div 
                            className={`absolute inset-0 w-16 h-16 opacity-20 rounded-full ${textColor.replace('text-', 'bg-')}`}
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
                        </motion.div>
                        
                        {/* Titre avec animation séquentielle */}
                        <motion.h3 
                          custom={index}
                          variants={titleVariants}
                          className={`text-2xl font-bold mb-4 transition-colors duration-300 group-hover:${textColor}`}
                        >
                          {service.Titre}
                        </motion.h3>
                        
                        {/* Ligne séparatrice avec animation séquentielle */}
                        <motion.div 
                          custom={index}
                          variants={lineVariants}
                          className="h-0.5 bg-gradient-to-r from-blue via-purple to-red mb-5 opacity-60 transition-all duration-500 group-hover:w-20"
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
                          whileHover={{ x: 5 }}
                          transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                          <Link 
                            href={`/services/${slug}`} 
                            className={`inline-flex items-center ${textColor} font-medium hover:underline`}
                          >
                            <span>En savoir plus</span>
                            <motion.svg 
                              className="w-5 h-5 ml-2" 
                              fill="none" 
                              stroke="currentColor" 
                              viewBox="0 0 24 24"
                              animate={isHovered ? { x: [0, 5, 0] } : {}}
                              transition={{ duration: 1, repeat: isHovered ? Infinity : 0 }}
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                            </motion.svg>
                          </Link>
                        </motion.div>
                        
                        {/* Points lumineux aux coins */}
                        <motion.div
                          className={`absolute top-2 left-2 w-1 h-1 rounded-full ${textColor.replace('text-', 'bg-')}`}
                          animate={{ opacity: [0.3, 0.8, 0.3] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                        <motion.div
                          className={`absolute bottom-2 right-2 w-1 h-1 rounded-full ${textColor.replace('text-', 'bg-')}`}
                          animate={{ opacity: [0.3, 0.8, 0.3] }}
                          transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                        />
                      </motion.div>
                    </motion.div>
                  )
                })}
              </motion.div>
            )}
          </AnimatePresence>
        )}
        
        {/* Voir tous les services - Bouton flottant */}
        {!isLoading && !error && services.length > 0 && (
          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            animate={appear ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1, duration: 0.6 }}
          >
            <motion.div
              className="inline-block"
              whileHover={{ y: -5, boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)' }}
              whileTap={{ y: 0, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Link 
                href="/services" 
                className="inline-flex items-center bg-gradient-to-r from-blue via-purple to-red text-white px-8 py-4 rounded-xl font-medium"
              >
                <span>Voir tous nos services</span>
                <motion.svg 
                  className="w-5 h-5 ml-2" 
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