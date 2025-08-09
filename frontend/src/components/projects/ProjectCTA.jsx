'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import CTAButton from '@/components/CTAButton'
import { FaRocket, FaHeart, FaLightbulb, FaExternalLinkAlt } from 'react-icons/fa'

export default function ProjectCTA({ projectName, projectUrl, color = 'blue' }) {
  // Animation au défilement
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })
  
  const sectionOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8])
  
  // Animation d'apparition
  const [contentRef, contentInView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <motion.section 
      ref={sectionRef}
      style={{ opacity: sectionOpacity }}
      className={`py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-${color}/20 text-white relative overflow-hidden`}
    >
      {/* Effet de particules dynamiques */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -50, 0],
              opacity: [0.1, 0.8, 0.1],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
        
        {/* Formes géométriques animées */}
        <motion.div
          className={`absolute top-10 right-10 w-40 h-40 border-2 border-${color}/30 rounded-full`}
          animate={{ 
            rotate: 360,
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            rotate: { duration: 25, repeat: Infinity, ease: "linear" },
            scale: { duration: 8, repeat: Infinity }
          }}
        />
        
        <motion.div
          className={`absolute bottom-10 left-10 w-32 h-32 bg-${color}/10 rounded-lg`}
          animate={{ 
            rotate: [0, 45, 0],
            y: [0, -20, 0]
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      <div className="container relative z-10">
        <motion.div
          ref={contentRef}
          initial={{ opacity: 0, y: 50 }}
          animate={contentInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Icône principale */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={contentInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`w-20 h-20 bg-${color}/20 rounded-full flex items-center justify-center mx-auto mb-8 backdrop-blur-sm`}
          >
            <FaRocket className={`w-10 h-10 text-${color}`} />
          </motion.div>
          
          {/* Titre principal */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={contentInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Prêt pour votre{' '}
            <span className={`text-${color}`}>prochain projet</span> ?
          </motion.h2>
          
          {/* Sous-titre */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={contentInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto"
          >
            Comme pour <strong className={`text-${color}`}>{projectName}</strong>, 
            nous pouvons transformer vos idées en solutions digitales exceptionnelles. 
            Parlons de votre vision !
          </motion.p>
          
          {/* Ligne décorative */}
          <motion.div 
            initial={{ width: 0 }}
            animate={contentInView ? { width: "6rem" } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className={`h-1 bg-${color} mx-auto mb-12`}
          ></motion.div>
          
          {/* Points de valeur */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={contentInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
          >
            <div className="flex items-center justify-center gap-3">
              <FaLightbulb className={`w-6 h-6 text-${color}`} />
              <span className="text-gray-300">Solutions sur mesure</span>
            </div>
            <div className="flex items-center justify-center gap-3">
              <FaHeart className={`w-6 h-6 text-${color}`} />
              <span className="text-gray-300">Accompagnement expert</span>
            </div>
            <div className="flex items-center justify-center gap-3">
              <FaRocket className={`w-6 h-6 text-${color}`} />
              <span className="text-gray-300">Résultats garantis</span>
            </div>
          </motion.div>
          
          {/* Boutons d'action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={contentInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <CTAButton 
              href="/contact" 
              variant="primary" 
              size="large"
              showDots={true}
              className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-4"
            >
              Démarrer mon projet
            </CTAButton>
            
            <CTAButton 
              href="/portfolio" 
              variant="secondary" 
              size="large"
              showDots={false}
              className="border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4"
            >
              Voir d'autres projets
            </CTAButton>
            
            {projectUrl && (
              <Link
                href={projectUrl}
                target="_blank"
                className={`inline-flex items-center gap-2 text-${color} hover:text-${color}/80 transition-colors font-medium`}
              >
                <FaExternalLinkAlt className="w-4 h-4" />
                Visiter le site
              </Link>
            )}
          </motion.div>
          
          {/* Message de contact rapide */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={contentInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="mt-12 pt-8 border-t border-gray-700"
          >
            <p className="text-gray-400 mb-4">
              Une question ? Besoin d'un devis personnalisé ?
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6">
              <a 
                href="tel:+22200000000" 
                className={`text-${color} hover:text-${color}/80 transition-colors font-medium`}
              >
                📞 +222 00 00 00 00
              </a>
              <a 
                href="mailto:contact@sall.technology" 
                className={`text-${color} hover:text-${color}/80 transition-colors font-medium`}
              >
                ✉️ contact@sall.technology
              </a>
              <a 
                href="https://wa.me/22200000000" 
                target="_blank"
                className={`text-${color} hover:text-${color}/80 transition-colors font-medium`}
              >
                💬 WhatsApp
              </a>
            </div>
          </motion.div>
          
          {/* Badge de confiance */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={contentInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 1.6 }}
            className="mt-8"
          >
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
              <div className={`w-3 h-3 bg-${color} rounded-full animate-pulse`}></div>
              <span className="text-gray-300 text-sm font-medium">
                Plus de 50 projets réussis • 100% satisfaction client
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  )
}