// frontend/src/components/projects/ProjectCTA.jsx - BOUTONS CORRIGÉS
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
      {/* Effet de particules dynamiques - réduit pour éviter les zones sombres */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 15 }).map((_, i) => ( // Réduit de 50 à 15
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/10 rounded-full" // Réduit l'opacité
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0], // Réduit le mouvement
              opacity: [0.05, 0.3, 0.05], // Plus discret
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 10 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
        
        {/* Formes géométriques plus discrètes */}
        <motion.div
          className={`absolute top-10 right-10 w-32 h-32 border border-${color}/20 rounded-full`} // Plus petit et discret
          animate={{ 
            rotate: 360,
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            rotate: { duration: 30, repeat: Infinity, ease: "linear" },
            scale: { duration: 12, repeat: Infinity }
          }}
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
          
          {/* Boutons d'action - CORRIGÉS */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={contentInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            {/* Bouton principal - utilise variant="primary" correctement */}
            <CTAButton 
              href="/contact" 
              variant="primary"
              showDots={true}
            >
              Démarrer mon projet
            </CTAButton>
            
            {/* Bouton secondaire - utilise variant="secondary" correctement */}
            <CTAButton 
              href="/portfolio" 
              variant="secondary"
              showDots={false}
            >
              Voir d'autres projets
            </CTAButton>
            
            {/* Lien externe - reste comme Link simple */}
            {projectUrl && (
              <Link
                href={projectUrl}
                target="_blank"
                className={`inline-flex items-center gap-2 text-${color} hover:text-${color}/80 transition-colors font-medium px-4 py-2 rounded-lg hover:bg-white/10`}
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
            className="mt-12 pt-8 border-t border-white/10"
          >
            <p className="text-gray-400 text-sm">
              💬 Une question ? Contactez-nous directement :{' '}
              <a 
                href="mailto:contact@sall.technology" 
                className={`text-${color} hover:text-${color}/80 transition-colors font-medium`}
              >
                contact@sall.technology
              </a>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  )
}