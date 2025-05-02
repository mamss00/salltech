'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export default function EnhancedServiceProcess({ steps, color = 'blue' }) {
  // Référence pour l'animation au défilement
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })
  
  // Animation du conteneur au défilement
  const containerOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0.7, 1, 1, 0.7])
  
  // Animation du titre
  const [titleRef, titleInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  
  // Trier les étapes par numéro
  const sortedSteps = [...steps].sort((a, b) => a.numero - b.numero);
  
  // Générer des couleurs pour le dégradé basées sur la couleur principale
  const getStepColors = (index) => {
    const colors = {
      blue: ['from-blue-50', 'to-blue-100', 'border-blue-200', 'bg-blue', 'text-blue-600'],
      purple: ['from-purple-50', 'to-purple-100', 'border-purple-200', 'bg-purple', 'text-purple-600'],
      red: ['from-red-50', 'to-red-100', 'border-red-200', 'bg-red', 'text-red-600']
    };
    
    // Choisir les couleurs en fonction de l'étape pour varier l'apparence
    if (index % 3 === 0) return colors[color] || colors.blue;
    if (index % 3 === 1) return colors.purple;
    return colors.red;
  };
  
  if (!steps || steps.length === 0) {
    return null;
  }

  return (
    <section 
      ref={containerRef}
      className="py-24 relative overflow-hidden bg-gradient-to-b from-white to-gray-50"
    >
      {/* Motifs d'arrière-plan */}
      <div className="absolute inset-0 z-0">
        <svg className="absolute top-0 left-0 w-full opacity-5" viewBox="0 0 800 800">
          <rect width="800" height="800" fill="none" />
          <g>
            <g transform="rotate(45 400 400)">
              <rect x="100" y="100" width="600" height="600" stroke={`var(--color-${color})`} strokeWidth="1" fill="none" />
              <rect x="150" y="150" width="500" height="500" stroke={`var(--color-${color})`} strokeWidth="1" fill="none" />
              <rect x="200" y="200" width="400" height="400" stroke={`var(--color-${color})`} strokeWidth="1" fill="none" />
              <rect x="250" y="250" width="300" height="300" stroke={`var(--color-${color})`} strokeWidth="1" fill="none" />
              <rect x="300" y="300" width="200" height="200" stroke={`var(--color-${color})`} strokeWidth="1" fill="none" />
            </g>
          </g>
        </svg>
      </div>
      
      <motion.div 
        className="container relative z-10"
        style={{ opacity: containerOpacity }}
      >
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={titleInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-block px-6 py-2 rounded-full bg-gradient-to-r from-gray-50 to-white shadow-sm border border-gray-100 text-sm font-medium text-gray-600 mb-4"
          >
            MÉTHODOLOGIE
          </motion.span>
          
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Notre <span className={`text-${color}`}>Processus</span>
          </h2>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={titleInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-lg text-gray-600 max-w-3xl mx-auto"
          >
            Une approche méthodique et éprouvée pour créer des solutions digitales 
            qui atteignent vos objectifs
          </motion.p>
        </motion.div>
        
        <div className="max-w-5xl mx-auto">
          <div className="relative">
            {/* Ligne verticale de connexion */}
            <motion.div 
              initial={{ height: 0 }}
              animate={titleInView ? { height: "100%" } : {}}
              transition={{ duration: 1.5, delay: 0.6, ease: "easeOut" }}
              className={`absolute top-0 bottom-0 left-16 md:left-28 w-1 bg-gradient-to-b from-${color} via-purple to-red rounded-full z-0 hidden md:block`}
            ></motion.div>
            
            <div className="space-y-24">
              {sortedSteps.map((step, index) => {
                // Observer pour chaque étape
                const [stepRef, stepInView] = useInView({ 
                  triggerOnce: true, 
                  threshold: 0.1,
                  rootMargin: "-50px 0px"
                });
                
                // Couleurs pour cette étape
                const [fromColor, toColor, borderColor, bgColor, textColor] = getStepColors(index);
                
                return (
                  <motion.div
                    key={index}
                    ref={stepRef}
                    initial={{ opacity: 0, y: 50 }}
                    animate={stepInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ 
                      duration: 0.8,
                      delay: index * 0.1,
                      type: "spring",
                      stiffness: 50
                    }}
                    className="flex flex-col md:flex-row"
                  >
                    <motion.div 
                      initial={{ scale: 0, rotate: -90 }}
                      animate={stepInView ? { scale: 1, rotate: 0 } : {}}
                      transition={{ 
                        duration: 0.6, 
                        delay: 0.3,
                        type: "spring",
                        stiffness: 200,
                        damping: 15
                      }}
                      className="md:w-28 flex-shrink-0 flex items-start justify-center mb-4 md:mb-0 relative z-10"
                    >
                      <motion.div 
                        whileHover={{ scale: 1.1 }}
                        className={`w-14 h-14 md:w-16 md:h-16 bg-white rounded-full border-2 border-${color} shadow-xl flex items-center justify-center text-${color} relative`}
                      >
                        {/* Effet de pulsation */}
                        <motion.span
                          animate={{
                            boxShadow: [
                              `0 0 0 0px rgba(var(--color-${color}), 0.3)`,
                              `0 0 0 10px rgba(var(--color-${color}), 0)`,
                            ],
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            repeatDelay: 0.5,
                          }}
                          className="absolute inset-0 rounded-full"
                        />
                        
                        <span className="text-xl font-bold">{step.numero}</span>
                      </motion.div>
                    </motion.div>
                    
                    <motion.div 
                      whileHover={{ 
                        y: -5,
                        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                      }}
                      transition={{ duration: 0.3 }}
                      className={`bg-gradient-to-br ${fromColor} ${toColor} rounded-2xl shadow-lg p-8 md:p-10 md:ml-4 relative z-10 border ${borderColor}`}
                    >
                      <h3 className={`text-2xl font-bold mb-3 ${textColor}`}>{step.titre}</h3>
                      
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={stepInView ? { width: "4rem" } : {}}
                        transition={{ delay: 0.5, duration: 0.6 }}
                        className={`h-1 bg-${color}/30 rounded-full mb-4`}
                      ></motion.div>
                      
                      <motion.p 
                        initial={{ opacity: 0 }}
                        animate={stepInView ? { opacity: 1 } : {}}
                        transition={{ delay: 0.6, duration: 0.6 }}
                        className="text-gray-600 mb-6"
                      >
                        {step.description}
                      </motion.p>
                      
                      {/* Afficher les tags si disponibles */}
                      {step.tags && step.tags.length > 0 && (
                        <motion.div 
                          initial={{ opacity: 0, y: 20 }}
                          animate={stepInView ? { opacity: 1, y: 0 } : {}}
                          transition={{ 
                            delay: 0.8,
                            staggerChildren: 0.1,
                            duration: 0.5
                          }}
                          className="flex flex-wrap gap-2"
                        >
                          {step.tags.map((tag, tagIndex) => (
                            <motion.span 
                              key={tagIndex}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={stepInView ? { opacity: 1, scale: 1 } : {}}
                              transition={{ delay: 0.8 + (tagIndex * 0.1) }}
                              whileHover={{ scale: 1.05 }}
                              className={`inline-block px-3 py-1 text-sm bg-white/60 backdrop-blur-sm ${textColor} rounded-full shadow-sm border ${borderColor}`}
                            >
                              {tag.texte}
                            </motion.span>
                          ))}
                        </motion.div>
                      )}
                      
                      {/* Élément graphique décoratif */}
                      <div className="absolute bottom-4 right-4 opacity-20">
                        <svg 
                          className={`w-24 h-24 text-${color}`} 
                          viewBox="0 0 80 80" 
                          fill="none"
                        >
                          <circle cx="40" cy="40" r="30" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
                          <circle cx="40" cy="40" r="20" stroke="currentColor" strokeWidth="1" />
                        </svg>
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>
          
          {/* Indication de la fin du processus */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="flex justify-center mt-16"
          >
            <div className={`w-16 h-16 bg-gradient-to-br from-${color} to-purple rounded-full shadow-lg flex items-center justify-center text-white`}>
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}