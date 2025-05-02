'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { renderRichText } from '@/utils/helpers'

export default function EnhancedServiceFAQ({ questions, color = 'blue' }) {
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
  
  // État pour gérer les questions ouvertes
  const [openIndex, setOpenIndex] = useState(null)
  
  // Fonction pour basculer l'état ouvert/fermé d'une question
  const toggleQuestion = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }
  
  if (!questions || questions.length === 0) {
    return null;
  }

  return (
    <section 
      ref={containerRef}
      className="py-24 relative overflow-hidden"
    >
      {/* Motifs d'arrière-plan */}
      <div className="absolute inset-0 z-0">
        {/* Cercles décoratifs */}
        <div className={`absolute top-10 right-10 w-40 h-40 rounded-full bg-${color}/5 blur-3xl`}></div>
        <div className={`absolute bottom-10 left-10 w-60 h-60 rounded-full bg-purple/5 blur-3xl`}></div>
        
        {/* Motif de points */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%">
            <pattern id="dots-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill={`var(--color-${color})`} />
            </pattern>
            <rect width="100%" height="100%" fill="url(#dots-pattern)" />
          </svg>
        </div>
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
            FAQ
          </motion.span>
          
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Questions <span className={`text-${color}`}>Fréquentes</span>
          </h2>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={titleInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-lg text-gray-600 max-w-3xl mx-auto"
          >
            Des réponses à vos interrogations sur nos services
          </motion.p>
        </motion.div>
        
        <div className="max-w-3xl mx-auto relative">
          {/* Élément décoratif */}
          <div className={`hidden md:block absolute top-0 bottom-0 left-0 w-0.5 bg-gradient-to-b from-${color}/50 via-purple/30 to-transparent`}></div>
          
          <div className="space-y-6 md:pl-8">
            {questions.map((item, index) => {
              // Observer pour chaque question
              const [itemRef, itemInView] = useInView({ 
                triggerOnce: true, 
                threshold: 0.1,
                rootMargin: "-50px 0px"
              });
              
              const isOpen = openIndex === index;
              
              return (
                <motion.div 
                  key={index}
                  ref={itemRef}
                  initial={{ opacity: 0, y: 30 }}
                  animate={itemInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ 
                    duration: 0.5,
                    delay: index * 0.1
                  }}
                  className={`bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-300 ${
                    isOpen ? 'shadow-lg ring-1 ring-gray-200' : ''
                  }`}
                >
                  <motion.button
                    className="w-full flex justify-between items-center p-6 text-left focus:outline-none"
                    onClick={() => toggleQuestion(index)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-content-${index}`}
                    whileHover={{ backgroundColor: `rgba(var(--color-${color}), 0.05)` }}
                    whileTap={{ scale: 0.995 }}
                  >
                    <motion.div className="flex items-center">
                      <motion.span 
                        animate={isOpen ? {
                          backgroundColor: `var(--color-${color})`,
                          color: 'white'
                        } : {
                          backgroundColor: `rgba(var(--color-${color}), 0.1)`,
                          color: `var(--color-${color})`
                        }}
                        className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 text-sm font-semibold flex-shrink-0`}
                      >
                        Q
                      </motion.span>
                      <h3 className="font-bold text-lg pr-10">{item.question}</h3>
                    </motion.div>
                    
                    <motion.span 
                      animate={isOpen ? { rotate: 180 } : { rotate: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`flex-shrink-0 ml-4 text-${color}`}
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </motion.span>
                  </motion.button>
                  
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ 
                          height: "auto", 
                          opacity: 1,
                          transition: {
                            height: {
                              duration: 0.3,
                            },
                            opacity: {
                              duration: 0.3,
                              delay: 0.1
                            }
                          }
                        }}
                        exit={{ 
                          height: 0, 
                          opacity: 0,
                          transition: {
                            height: {
                              duration: 0.3,
                            },
                            opacity: {
                              duration: 0.2,
                            }
                          }
                        }}
                        id={`faq-content-${index}`}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6">
                          <div className={`h-px w-full bg-gradient-to-r from-${color}/20 to-transparent mb-4`}></div>
                          
                          <div className="flex">
                            <motion.span 
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: 0.2 }}
                              className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 mt-1 text-sm font-semibold flex-shrink-0 bg-gray-100 text-gray-600`}
                            >
                              R
                            </motion.span>
                            
                            <motion.div 
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.4, delay: 0.3 }}
                              className="prose prose-sm max-w-none text-gray-600 flex-1"
                            >
                              {renderRichText(item.reponse)}
                            </motion.div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
          
          {/* Élément indicateur de fin */}
          <motion.div 
            initial={{ opacity: 0, scale: 0 }}
            animate={titleInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="flex justify-center mt-12"
          >
            <div className={`w-12 h-12 rounded-full bg-gray-50 border border-${color}/20 flex items-center justify-center shadow-sm`}>
              <svg className={`w-6 h-6 text-${color}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
              </svg>
            </div>
          </motion.div>
          
          {/* Question supplémentaire */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={titleInView ? { opacity: 1 } : {}}
            transition={{ delay: 1, duration: 0.6 }}
            className="text-center mt-16"
          >
            <p className="text-gray-600">Vous avez d'autres questions ? N'hésitez pas à nous contacter.</p>
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/contact"
              className={`inline-flex items-center mt-4 text-${color} font-medium`}
            >
              Contactez-nous
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </motion.a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}