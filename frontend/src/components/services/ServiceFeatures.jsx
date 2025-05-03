'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
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
      opacity: 0
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 80,
        damping: 15
      }
    },
    hover: {
      y: -10,
      boxShadow: "0 20px 30px rgba(0,0,0,0.1)",
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 20
      }
    }
  }
  
  // Les observateurs pour la section des fonctionnalités
  const [featuresRef, featuresInView] = useInView({ 
    triggerOnce: true, 
    threshold: 0.1
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
      className="py-24 relative overflow-hidden bg-gradient-to-b from-white to-gray-50"
    >
      {/* Éléments de fond subtils */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className={`absolute top-0 right-0 w-96 h-96 bg-${color}/5 rounded-full blur-3xl`}></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple/5 rounded-full blur-3xl"></div>
        
        {/* Motif graphique comme dans MÉTHODOLOGIE */}
        <svg className="absolute opacity-5" width="100%" height="100%" viewBox="0 0 800 800">
          <defs>
            <pattern id="smallGrid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#smallGrid)" />
        </svg>
      </div>

      <motion.div 
        className="container relative z-10"
        style={{ opacity: containerOpacity }}
      >
        <div className="text-center mb-20">
          {/* Badge rond comme dans MÉTHODOLOGIE */}
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={titleInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-block px-6 py-2 rounded-full bg-gradient-to-r from-gray-50 to-white shadow-sm border border-gray-100 text-sm font-medium text-gray-600 mb-4"
          >
            FONCTIONNALITÉS
          </motion.span>
          
          {/* Titre principal avec mise en forme similaire à MÉTHODOLOGIE */}
          <motion.div 
            ref={titleRef}
            className="mb-6"
          >
            <h2 className="text-3xl md:text-5xl font-bold">
              Ce que nous <span className={`text-${color}`}>proposons</span>
            </h2>
          </motion.div>
          
          {/* Description avec animation subtile */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={titleInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-lg text-gray-600 max-w-3xl mx-auto"
          >
            Nos solutions sont complètes et adaptées à vos besoins spécifiques, 
            conçues pour transformer votre présence numérique.
          </motion.p>
        </div>
        
        {/* Grille de services - style similaire aux cartes MÉTHODOLOGIE */}
        <div className="max-w-5xl mx-auto">
          <motion.div
            ref={featuresRef}
            variants={containerVariants}
            initial="hidden"
            animate={featuresInView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {features.map((feature, index) => {
              const displayIcon = getDisplayIcon(feature.icone);
              
              // Couleurs pour les cartes, avec variation comme dans MÉTHODOLOGIE
              const getCardStyle = () => {
                if (index % 3 === 0) return {
                  gradientFrom: `from-${color}/20`,
                  gradientTo: `to-${color}/5`,
                  textColor: `text-${color}`
                };
                if (index % 3 === 1) return {
                  gradientFrom: 'from-purple/20',
                  gradientTo: 'to-purple/5',
                  textColor: 'text-purple'
                };
                return {
                  gradientFrom: 'from-red/20',
                  gradientTo: 'to-red/5',
                  textColor: 'text-red'
                };
              };
              
              const { gradientFrom, gradientTo, textColor } = getCardStyle();
              
              return (
                <motion.div 
                  key={index}
                  variants={cardVariants}
                  whileHover="hover"
                  className={`bg-gradient-to-br ${gradientFrom} ${gradientTo} backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-xl hover:-translate-y-2 group p-8 h-full`}
                >
                  {/* Icône stylisée comme dans MÉTHODOLOGIE */}
                  <div className="text-4xl mb-5">
                    <span className={`text-5xl ${textColor}`}>{displayIcon}</span>
                  </div>
                  
                  {/* Titre avec style similaire à MÉTHODOLOGIE */}
                  <h3 className={`text-2xl font-bold mb-4 group-hover:${textColor} transition-colors duration-300`}>
                    {feature.titre}
                  </h3>
                  
                  {/* Ligne décorative animée */}
                  <div className="h-0.5 w-12 bg-gradient-to-r from-blue via-purple to-red mb-5 opacity-60 group-hover:w-20 transition-all duration-300"></div>
                  
                  {/* Description */}
                  <p className="text-gray-600 mb-6">{feature.description}</p>
                  
                  {/* Bouton stylisé comme dans MÉTHODOLOGIE */}
                  <Link 
                    href="#contact"
                    className={`inline-flex items-center ${textColor} font-medium hover:underline transition-all duration-300 group-hover:text-opacity-80`}
                  >
                    <span>Demander un devis</span>
                    <span className="inline-flex items-center ml-2">
                      <span className="flex items-center ml-2 h-1">
                        <span className="w-1 h-1 bg-current rounded-full mr-1 opacity-0 animate-dot-pulse-1"></span>
                        <span className="w-1 h-1 bg-current rounded-full mr-1 opacity-0 animate-dot-pulse-2"></span>
                        <span className="w-1 h-1 bg-current rounded-full opacity-0 animate-dot-pulse-3"></span>
                      </span>
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}