'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { renderRichText } from '@/utils/helpers'
import DynamicIcon from '@/utils/DynamicIcon'

export default function ProjectIntroduction({ content, features, color = 'blue' }) {
  // Animation au défilement
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })
  
  const sectionOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8])
  
  // Animation d'apparition
  const [contentRef, contentInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [featuresRef, featuresInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  }

  return (
    <motion.section 
      ref={sectionRef}
      style={{ opacity: sectionOpacity }}
      className="py-20 bg-white relative overflow-hidden"
    >
      {/* Éléments décoratifs */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent opacity-60"></div>
      
      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Contenu texte */}
          <motion.div
            ref={contentRef}
            initial={{ opacity: 0, x: -50 }}
            animate={contentInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={contentInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
                className={`inline-block text-${color} font-semibold tracking-wider uppercase text-sm mb-4`}
              >
                PRÉSENTATION DU PROJET
              </motion.span>
              
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={contentInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-3xl md:text-4xl font-bold text-gray-900 mb-6"
              >
                Une réalisation qui fait la{' '}
                <span className={`text-${color}`}>différence</span>
              </motion.h2>
              
              <motion.div 
                initial={{ width: 0 }}
                animate={contentInView ? { width: "4rem" } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
                className={`h-1 bg-${color} mb-8`}
              ></motion.div>
            </div>
            
            {/* Contenu rich text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={contentInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="prose prose-lg max-w-none"
            >
              {content && Array.isArray(content) ? (
                content.map((block, index) => (
                  <div key={index} className="mb-6">
                    {renderRichText([block])}
                  </div>
                ))
              ) : (
                <p className="text-gray-600 leading-relaxed">
                  Ce projet illustre parfaitement notre expertise technique et notre capacité 
                  à livrer des solutions innovantes adaptées aux besoins spécifiques de nos clients.
                </p>
              )}
            </motion.div>
          </motion.div>
          
          {/* Caractéristiques/Points clés */}
          {features && features.length > 0 && (
            <motion.div
              ref={featuresRef}
              variants={containerVariants}
              initial="hidden"
              animate={featuresInView ? "visible" : "hidden"}
              className="space-y-6"
            >
              <motion.h3 
                variants={itemVariants}
                className="text-2xl font-bold text-gray-900 mb-8"
              >
                Points clés du projet
              </motion.h3>
              
              <div className="grid gap-6">
                {features.slice(0, 4).map((feature, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="group"
                  >
                    <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300">
                      <div className={`w-12 h-12 bg-${color}/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-${color}/20 transition-colors`}>
                        <DynamicIcon 
                          name={feature.icone || 'FaStar'} 
                          className={`w-5 h-5 text-${color}`} 
                        />
                      </div>
                      
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-2 group-hover:text-gray-800">
                          {feature.titre}
                        </h4>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.section>
  )
}