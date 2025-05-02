'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import CTAButton from '@/components/CTAButton'

export default function EnhancedServiceCTA({ serviceName, color = 'blue' }) {
  // Référence pour l'animation au défilement
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })
  
  // Animation au défilement
  const containerScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95])
  
  // Animation d'apparition
  const [containerRef2, containerInView] = useInView({ 
    triggerOnce: true, 
    threshold: 0.1
  })
  
  // Animation pour le texte
  const [textRef, textInView] = useInView({ 
    triggerOnce: true, 
    threshold: 0.3
  })
  
  return (
    <section 
      ref={containerRef} 
      className={`py-20 relative overflow-hidden bg-gradient-to-br from-${color}/5 via-purple/5 to-red/5`}
    >
      {/* Formes d'arrière-plan */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          animate={{ 
            y: [0, 20, 0],
            opacity: [0.4, 0.2, 0.4]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className={`absolute -top-20 -right-20 w-96 h-96 bg-${color}/10 rounded-full blur-3xl`}
        ></motion.div>
        
        <motion.div 
          animate={{ 
            y: [0, -20, 0],
            opacity: [0.3, 0.1, 0.3]
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className="absolute -bottom-32 -left-32 w-96 h-96 bg-purple/10 rounded-full blur-3xl"
        ></motion.div>
      </div>
      
      <motion.div 
        className="container relative z-10"
        style={{ scale: containerScale }}
      >
        <motion.div
          ref={containerRef2}
          initial={{ opacity: 0, y: 50 }}
          animate={containerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ 
            duration: 0.8,
            type: "spring",
            stiffness: 50
          }}
          className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100"
        >
          <div className="flex flex-col md:flex-row">
            <motion.div 
              ref={textRef}
              className="md:w-1/2 p-10 md:p-16 flex items-center"
            >
              <div>
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  animate={textInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6 }}
                  className="text-3xl md:text-4xl font-bold mb-6 relative"
                >
                  <span>Prêt à transformer votre</span>{' '}
                  <motion.span 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={textInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="inline-block relative"
                  >
                    <span className="bg-gradient-to-r from-blue via-purple to-red bg-clip-text text-transparent">
                      entreprise
                    </span>
                    <motion.svg
                      initial={{ pathLength: 0 }}
                      animate={textInView ? { pathLength: 1 } : {}}
                      transition={{ delay: 0.7, duration: 1, ease: "easeInOut" }}
                      className="absolute -bottom-2 left-0 w-full h-3 text-red overflow-visible"
                      viewBox="0 0 100 10"
                      preserveAspectRatio="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <motion.path
                        d="M0 5C25 5 25 0 50 0C75 0 75 5 100 5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </motion.svg>
                  </motion.span>{' '}
                  <span>?</span>
                </motion.h2>
                
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={textInView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="text-lg text-gray-600 mb-8"
                >
                  {serviceName ? (
                    <>
                      Contactez SALLTECH dès aujourd'hui pour discuter de votre projet de <span className="font-semibold">{serviceName.toLowerCase()}</span> et obtenir un devis personnalisé sans engagement.
                    </>
                  ) : (
                    <>
                      Contactez SALLTECH dès aujourd'hui pour discuter de votre projet et obtenir un devis personnalisé sans engagement.
                    </>
                  )}
                </motion.p>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={textInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.7, duration: 0.6 }}
                  className="flex flex-wrap gap-4"
                >
                  <CTAButton href="/contact" variant="primary">
                    Demander un devis
                  </CTAButton>
                  <CTAButton href="/services" variant="secondary" showDots={false}>
                    Voir tous nos services
                  </CTAButton>
                </motion.div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ x: "100%" }}
              animate={containerInView ? { x: 0 } : {}}
              transition={{ 
                duration: 0.8,
                delay: 0.3,
                type: "spring",
                stiffness: 50
              }}
              className={`md:w-1/2 bg-gradient-to-br from-${color} via-purple to-red relative min-h-[300px] md:min-h-0`}
            >
              {/* Motif de grille animé */}
              <motion.div 
                animate={{ opacity: [0.1, 0.2, 0.1] }}
                transition={{ duration: 10, repeat: Infinity }}
                className="absolute inset-0 overflow-hidden"
              >
                <svg width="100%" height="100%" className="opacity-20">
                  <pattern id="grid-pattern-cta" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
                  </pattern>
                  <rect width="100%" height="100%" fill="url(#grid-pattern-cta)" />
                </svg>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={containerInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="absolute inset-0 flex items-center justify-center p-8"
              >
                <div className="text-white text-center max-w-md">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 15, repeat: Infinity, repeatType: "reverse" }}
                    className="mx-auto mb-6 opacity-90"
                  >
                    <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.672 1.911a1 1 0 10-1.932.518l.259.966a1 1 0 001.932-.518l-.26-.966zM2.429 4.74a1 1 0 10-.517 1.932l.966.259a1 1 0 00.517-1.932l-.966-.26zm8.814-.569a1 1 0 00-1.415-1.414l-.707.707a1 1 0 101.415 1.415l.707-.708zm-7.071 7.072l.707-.707A1 1 0 003.465 9.12l-.708.707a1 1 0 001.415 1.415zm3.2-5.171a1 1 0 00-1.3 1.3l4 10a1 1 0 001.823.075l1.38-2.759 3.018 3.02a1 1 0 001.414-1.415l-3.019-3.02 2.76-1.379a1 1 0 00-.076-1.822l-10-4z" clipRule="evenodd" />
                    </svg>
                  </motion.div>
                  
                  <motion.h3 
                    initial={{ opacity: 0, y: 20 }}
                    animate={containerInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    className="text-2xl font-bold mb-4"
                  >
                    Entreprises mauritaniennes de toutes tailles
                  </motion.h3>
                  
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={containerInView ? { opacity: 1 } : {}}
                    transition={{ delay: 1, duration: 0.6 }}
                    className="text-lg opacity-90"
                  >
                    Nous adaptons nos solutions à votre budget et à vos besoins, que vous soyez une startup, une PME ou un grand groupe.
                  </motion.p>
                  
                  {/* Indications visuelles */}
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={containerInView ? { opacity: 1 } : {}}
                    transition={{ delay: 1.2, duration: 0.8 }}
                    className="flex justify-center mt-8 space-x-4"
                  >
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-2">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                        </svg>
                      </div>
                      <span className="text-sm font-medium">Entreprises</span>
                    </div>
                    
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-2">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                      </div>
                      <span className="text-sm font-medium">Budget adapté</span>
                    </div>
                    
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-2">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                        </svg>
                      </div>
                      <span className="text-sm font-medium">Qualité</span>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
              
              {/* Effet de brillance animé */}
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity, 
                  repeatDelay: 5
                }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-10 w-1/2"
              ></motion.div>
            </motion.div>
          </div>
        </motion.div>
        
        {/* Badges de confiance */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={containerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="mt-12 flex flex-wrap justify-center items-center gap-8"
        >
          <div className="flex items-center text-gray-500 bg-white/70 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm">
            <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span className="text-sm font-medium">Support en Français</span>
          </div>
          
          <div className="flex items-center text-gray-500 bg-white/70 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm">
            <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span className="text-sm font-medium">Solutions locales</span>
          </div>
          
          <div className="flex items-center text-gray-500 bg-white/70 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm">
            <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span className="text-sm font-medium">Assistance 7/7j</span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}