'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import DynamicIcon from '@/utils/DynamicIcon'
import { getStrapiMediaUrl } from '@/utils/helpers'

export default function EnhancedServiceFeatures({ features, color = 'blue' }) {
  // Référence pour l'animation au défilement
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })
  
  // Animation de la section complète lors du défilement
  const containerOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.6, 1, 1, 0.6])
  const containerScale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.95, 1, 1, 0.95])
  
  // Animation du titre lors de l'affichage
  const [titleRef, titleInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  
  // Animation variants pour les cartes
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  }
  
  const cardVariants = {
    hidden: { 
      y: 50, 
      opacity: 0,
      scale: 0.9
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { 
        type: "spring",
        stiffness: 80,
        damping: 15,
        mass: 1
      }
    },
    hover: {
      y: -10,
      scale: 1.03,
      boxShadow: "0 20px 30px rgba(0,0,0,0.1)",
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 20
      }
    },
    tap: {
      scale: 0.98,
      boxShadow: "0 10px 15px rgba(0,0,0,0.05)",
      transition: { 
        type: "spring", 
        stiffness: 500, 
        damping: 20
      }
    }
  }
  
  // Animation pour les icônes
  const iconVariants = {
    hidden: { scale: 0, rotate: -20 },
    visible: { 
      scale: 1, 
      rotate: 0,
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 20,
        delay: 0.3
      }
    },
    hover: {
      scale: 1.2,
      rotate: 5,
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 10
      }
    }
  }
  
  // Animation pour les listes
  const listContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.5
      }
    }
  }
  
  const listItemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  }
  
  // Les observateurs pour chaque carte
  const [featuresRef, featuresInView] = useInView({ 
    triggerOnce: true, 
    threshold: 0.1,
    rootMargin: "-100px 0px"
  })
  
  if (!features || features.length === 0) {
    return null;
  }

  // Convertir le code Unicode en emoji si nécessaire
  const getDisplayIcon = (iconStr) => {
    if (!iconStr) return null;
    if (iconStr.startsWith('U+')) {
      try {
        return String.fromCodePoint(parseInt(iconStr.replace('U+', ''), 16));
      } catch (e) {
        return '💡';
      }
    }
    return iconStr;
  };

  return (
    <section 
      ref={containerRef} 
      className="py-24 relative overflow-hidden"
    >
      {/* Éléments de fond */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {/* Formes géométriques flottantes */}
        <div className={`absolute top-1/4 right-[5%] w-32 h-32 bg-${color}/5 rounded-full blur-xl animate-float-1`}></div>
        <div className={`absolute bottom-1/4 left-[10%] w-40 h-40 bg-purple/5 rounded-full blur-xl animate-float-2`}></div>
        <div className={`absolute top-2/3 right-[20%] w-24 h-24 bg-red/5 rounded-full blur-xl animate-float-3`}></div>
        
        {/* Motif de grille subtil */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-gray-50/80 to-white/0">
          <svg width="100%" height="100%" className="opacity-10">
            <defs>
              <pattern id="grid-pattern" width="50" height="50" patternUnits="userSpaceOnUse">
                <rect width="50" height="50" fill="none" />
                <circle cx="2" cy="2" r="1" fill={`var(--color-${color})`} />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-pattern)" />
          </svg>
        </div>
      </div>

      <motion.div 
        className="container relative z-10"
        style={{
          opacity: containerOpacity,
          scale: containerScale
        }}
      >
        <motion.div 
          ref={titleRef}
          initial={{ opacity: 0, y: 30 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ 
            duration: 0.8,
            type: "spring",
            stiffness: 50,
            damping: 15
          }}
          className="text-center mb-20"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={titleInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="inline-block px-6 py-2 rounded-full bg-gradient-to-r from-gray-50 to-white shadow-sm border border-gray-100 text-sm font-medium text-gray-600 mb-4"
          >
            FONCTIONNALITÉS
          </motion.span>
          
          <h2 className="text-3xl md:text-5xl font-bold mb-6 relative inline-block">
            Ce que nous{' '}
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={titleInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.5 }}
              className={`relative text-${color} inline-block`}
            >
              proposons
              <motion.svg
                initial={{ pathLength: 0 }}
                animate={titleInView ? { pathLength: 1 } : {}}
                transition={{ delay: 0.7, duration: 1.5, ease: "easeInOut" }}
                className={`absolute -bottom-2 left-0 w-full h-3 text-${color} overflow-visible`}
                preserveAspectRatio="none"
                viewBox="0 0 100 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <motion.path
                  d="M0 5C25 5 25 0 50 0C75 0 75 5 100 5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </motion.svg>
            </motion.span>
          </h2>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={titleInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-lg text-gray-600 max-w-3xl mx-auto"
          >
            Nos solutions sont complètes et adaptées à vos besoins spécifiques, 
            conçues pour transformer votre présence numérique.
          </motion.p>
        </motion.div>
        
        <motion.div
          ref={featuresRef}
          variants={containerVariants}
          initial="hidden"
          animate={featuresInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-10"
        >
          {features.map((feature, index) => {
            // Récupérer l'icône (émoji ou icône)
            const displayIcon = getDisplayIcon(feature.icone);
            
            // Récupérer l'URL de l'image s'il existe
            let imageUrl = null;
            if (feature.image?.data) {
              imageUrl = getStrapiMediaUrl(feature.image.data.attributes.url);
            } else if (feature.image?.url) {
              imageUrl = getStrapiMediaUrl(feature.image.url);
            }
            
            // Observer pour chaque carte individuelle
            const [cardRef, cardInView] = useInView({ 
              triggerOnce: true, 
              threshold: 0.1,
              rootMargin: "-50px 0px"
            });

            return (
              <motion.div 
                key={index}
                ref={cardRef}
                variants={cardVariants}
                whileHover="hover"
                whileTap="tap"
                className="relative bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-lg transition-all"
              >
                <div className={`absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-${color} to-purple`}></div>
                
                <div className="p-8 md:p-10 relative z-10">
                  <motion.div 
                    variants={iconVariants}
                    whileHover="hover"
                    className={`w-16 h-16 bg-gradient-to-br from-${color}/20 to-${color}/5 rounded-xl flex items-center justify-center text-${color} mb-6`}
                  >
                    {displayIcon ? (
                      <span className="text-3xl">{displayIcon}</span>
                    ) : (
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                      </svg>
                    )}
                  </motion.div>
                  
                  <motion.h3 
                    initial={{ opacity: 0, x: -10 }}
                    animate={cardInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className={`text-2xl font-bold mb-4 text-${color}`}
                  >
                    {feature.titre}
                  </motion.h3>
                  
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={cardInView ? { width: "3rem" } : {}}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className={`h-1 bg-gradient-to-r from-${color} via-purple to-transparent mb-4`}
                  ></motion.div>
                  
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={cardInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="text-gray-600 mb-6"
                  >
                    {feature.description}
                  </motion.p>
                  
                  {/* Afficher les fonctionnalités spécifiques si disponibles */}
                  {feature.fonctionnalites && feature.fonctionnalites.length > 0 && (
                    <motion.ul 
                      variants={listContainerVariants}
                      initial="hidden"
                      animate={cardInView ? "visible" : "hidden"}
                      className="space-y-3 mb-6"
                    >
                      {feature.fonctionnalites.map((item, i) => (
                        <motion.li 
                          key={i} 
                          variants={listItemVariants}
                          className="flex items-start"
                        >
                          <span className={`flex-shrink-0 w-5 h-5 rounded-full bg-${color}/10 flex items-center justify-center mr-3 mt-0.5`}>
                            <svg className={`w-3 h-3 text-${color}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                            </svg>
                          </span>
                          <span className="text-gray-600">{item.texte}</span>
                        </motion.li>
                      ))}
                    </motion.ul>
                  )}
                  
                  {/* Afficher des boutons d'action */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={cardInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.6, duration: 0.5 }}
                    className="mt-4"
                  >
                    <button className={`text-sm font-medium text-${color} flex items-center hover:underline`}>
                      En savoir plus
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                      </svg>
                    </button>
                  </motion.div>
                </div>
                
                {/* Afficher l'image si disponible */}
                {imageUrl && (
                  <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={cardInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.7, duration: 0.6 }}
                    className="relative h-48 w-full"
                  >
                    <Image
                      src={imageUrl}
                      alt={feature.titre}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    {/* Overlay de couleur */}
                    <div className={`absolute inset-0 bg-gradient-to-t from-${color}/60 to-transparent opacity-70`}></div>
                    
                    {/* Effet de vagues en bas de l'image */}
                    <svg className="absolute bottom-0 left-0 w-full text-white" viewBox="0 0 1200 120" preserveAspectRatio="none">
                      <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" fill="currentColor"></path>
                      <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" fill="currentColor"></path>
                      <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="currentColor"></path>
                    </svg>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </section>
  )
}