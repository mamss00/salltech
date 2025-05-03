'use client'

import { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import Link from 'next/link'
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
  
  // Animation du titre lors de l'affichage
  const [titleRef, titleInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  
  // Contrôles d'animation pour les éléments du titre
  const titleControls = useAnimation()
  const badgeControls = useAnimation()
  const lineControls = useAnimation()
  const descriptionControls = useAnimation()
  
  // Observer pour chaque carte individuellement
  const cardRefs = features.map(() => useInView({ triggerOnce: true, threshold: 0.1 }))
  
  // Animation séquentielle du titre lorsqu'il est visible
  useEffect(() => {
    if (titleInView) {
      const sequence = async () => {
        // Animation du badge
        await badgeControls.start({
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration: 0.5, ease: "easeOut" }
        })
        
        // Animation du titre (avec un léger délai)
        await titleControls.start({
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: "easeOut" }
        })
        
        // Animation de la ligne (avec un léger délai)
        await lineControls.start({
          width: "150px",
          opacity: 1,
          transition: { duration: 0.8, ease: "easeInOut" }
        })
        
        // Animation de la description (avec un léger délai)
        await descriptionControls.start({
          opacity: 1,
          y: 0,
          transition: { duration: 0.7, ease: "easeOut" }
        })
      }
      
      sequence()
    }
  }, [titleInView, badgeControls, titleControls, lineControls, descriptionControls])
  
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
      className="py-24 relative overflow-hidden bg-gradient-to-b from-white to-gray-50"
    >
      {/* Animations d'arrière-plan */}
      <motion.div 
        className="absolute inset-0 overflow-hidden z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        {/* Formes géométriques animées */}
        <motion.div
          initial={{ x: -200, opacity: 0 }}
          animate={{ x: 0, opacity: 0.6 }}
          transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
          className={`absolute top-0 right-0 w-96 h-96 bg-${color}/5 rounded-full blur-3xl`}
        ></motion.div>
        
        <motion.div
          initial={{ x: 200, opacity: 0 }}
          animate={{ x: 0, opacity: 0.6 }}
          transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
          className="absolute bottom-0 left-0 w-96 h-96 bg-purple/5 rounded-full blur-3xl"
        ></motion.div>
        
        {/* Motif graphique comme dans MÉTHODOLOGIE */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.05 }}
          transition={{ duration: 2, delay: 0.7 }}
        >
          <svg className="absolute w-full h-full" viewBox="0 0 800 800">
            <defs>
              <pattern id="smallGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#smallGrid)" />
          </svg>
        </motion.div>
      </motion.div>

      <motion.div 
        className="container relative z-10"
        style={{ opacity: containerOpacity }}
      >
        <div className="text-center mb-20">
          {/* Badge animé */}
          <motion.span
            initial={{ opacity: 0, y: -20, scale: 0.8 }}
            animate={badgeControls}
            className="inline-block px-6 py-2 rounded-full bg-gradient-to-r from-gray-50 to-white shadow-sm border border-gray-100 text-sm font-medium text-gray-600 mb-4"
          >
            FONCTIONNALITÉS
          </motion.span>
          
          {/* Titre avec animation séquentielle */}
          <motion.h2
            ref={titleRef}
            initial={{ opacity: 0, y: 30 }}
            animate={titleControls}
            className="text-3xl md:text-5xl font-bold mb-6"
          >
            Ce que nous <span className={`text-${color}`}>proposons</span>
          </motion.h2>
          
          {/* Ligne décorative avec animation */}
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={lineControls}
            className={`h-1 bg-gradient-to-r from-${color} via-purple to-red rounded-full mx-auto mb-6`}
            style={{ maxWidth: "150px" }}
          ></motion.div>
          
          {/* Description avec animation d'entrée */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={descriptionControls}
            className="text-lg text-gray-600 max-w-3xl mx-auto"
          >
            Nos solutions sont complètes et adaptées à vos besoins spécifiques, 
            conçues pour transformer votre présence numérique.
          </motion.p>
        </div>
        
        {/* Grille de services avec animation d'entrée indépendante pour chaque carte */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const displayIcon = getDisplayIcon(feature.icone);
              const [ref, inView] = cardRefs[index];
              
              // Couleurs pour les cartes, avec variation comme dans MÉTHODOLOGIE
              const getCardStyle = () => {
                if (index % 3 === 0) return {
                  gradientFrom: `from-${color}/20`,
                  gradientTo: `to-${color}/5`,
                  textColor: `text-${color}`,
                  iconBg: `bg-${color}/15`,
                  iconColor: `text-${color}`
                };
                if (index % 3 === 1) return {
                  gradientFrom: 'from-purple/20',
                  gradientTo: 'to-purple/5',
                  textColor: 'text-purple',
                  iconBg: 'bg-purple/15',
                  iconColor: 'text-purple'
                };
                return {
                  gradientFrom: 'from-red/20',
                  gradientTo: 'to-red/5',
                  textColor: 'text-red',
                  iconBg: 'bg-red/15',
                  iconColor: 'text-red'
                };
              };
              
              const { gradientFrom, gradientTo, textColor, iconBg, iconColor } = getCardStyle();
              
              // Décalage plus marqué entre les cartes (0.4 seconde entre chaque carte)
              const cardDelay = 0.4 * index;
              
              return (
                <motion.div 
                  key={index}
                  ref={ref}
                  initial={{ opacity: 0, y: 70, scale: 0.9 }}
                  animate={inView ? { 
                    opacity: 1, 
                    y: 0, 
                    scale: 1,
                    transition: { 
                      type: "spring", 
                      stiffness: 70, 
                      damping: 15,
                      delay: cardDelay,
                      duration: 0.8
                    }
                  } : {}}
                  whileHover={{ 
                    y: -10, 
                    boxShadow: "0 20px 30px rgba(0,0,0,0.1)",
                    transition: { 
                      type: "spring", 
                      stiffness: 300, 
                      damping: 20
                    }
                  }}
                  className={`bg-gradient-to-br ${gradientFrom} ${gradientTo} backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-xl group p-8 h-full`}
                >
                  {/* Icône avec animation d'entrée indépendante */}
                  <motion.div 
                    className="text-4xl mb-5 relative"
                    initial={{ scale: 0, rotate: -20 }}
                    animate={inView ? { 
                      scale: 1, 
                      rotate: 0,
                      transition: { 
                        delay: cardDelay + 0.2,
                        type: "spring",
                        stiffness: 200,
                        damping: 15
                      }
                    } : {}}
                  >
                    {/* Cercle décoratif derrière l'icône */}
                    <motion.div
                      className={`absolute inset-0 ${iconBg} rounded-full w-12 h-12 -left-1 -top-1 opacity-50`}
                      initial={{ scale: 0 }}
                      animate={inView ? { 
                        scale: 1,
                        transition: { 
                          delay: cardDelay + 0.4, 
                          duration: 0.5 
                        }
                      } : {}}
                    ></motion.div>
                    
                    <span className={`text-5xl ${iconColor} relative z-10`}>{displayIcon}</span>
                  </motion.div>
                  
                  {/* Titre avec animation d'entrée indépendante */}
                  <motion.h3 
                    className={`text-2xl font-bold mb-4 group-hover:${textColor} transition-colors duration-300`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { 
                      opacity: 1, 
                      x: 0,
                      transition: { 
                        delay: cardDelay + 0.4, 
                        duration: 0.5 
                      }
                    } : {}}
                  >
                    {feature.titre}
                  </motion.h3>
                  
                  {/* Ligne décorative animée */}
                  <motion.div 
                    className="h-0.5 w-12 bg-gradient-to-r from-blue via-purple to-red mb-5 opacity-60 group-hover:w-20 transition-all duration-300"
                    initial={{ width: 0 }}
                    animate={inView ? { 
                      width: "3rem",
                      transition: { 
                        delay: cardDelay + 0.5, 
                        duration: 0.6 
                      }
                    } : {}}
                  ></motion.div>
                  
                  {/* Description avec animation d'entrée indépendante */}
                  <motion.p 
                    className="text-gray-600 mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { 
                      opacity: 1, 
                      y: 0,
                      transition: { 
                        delay: cardDelay + 0.6, 
                        duration: 0.5 
                      }
                    } : {}}
                  >
                    {feature.description}
                  </motion.p>
                  
                  {/* Bouton avec animation d'entrée indépendante */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={inView ? { 
                      opacity: 1, 
                      y: 0,
                      transition: { 
                        delay: cardDelay + 0.7, 
                        duration: 0.5 
                      }
                    } : {}}
                  >
                    <Link 
                      href="#contact"
                      className={`inline-flex items-center ${textColor} font-medium hover:underline transition-all duration-300 group-hover:text-opacity-80`}
                    >
                      <span>Demander un devis</span>
                      <span className="dots-container inline-flex items-center ml-2 h-1">
                        <span className="dot w-1 h-1 bg-current rounded-full mr-0.5 opacity-0 animate-dot-pulse-1"></span>
                        <span className="dot w-1 h-1 bg-current rounded-full mr-0.5 opacity-0 animate-dot-pulse-2"></span>
                        <span className="dot w-1 h-1 bg-current rounded-full opacity-0 animate-dot-pulse-3"></span>
                      </span>
                    </Link>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </section>
  )
}