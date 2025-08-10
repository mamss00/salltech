// frontend/src/components/projects/ProjectCTA.jsx - VERSION CLAIRE
'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import CTAButton from '@/components/CTAButton'
import { FaRocket, FaExternalLinkAlt, FaEnvelope } from 'react-icons/fa'

export default function ProjectCTA({ projectName, projectUrl, color = 'blue' }) {
  const [contentRef, contentInView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section className={`py-20 bg-gradient-to-br from-${color}/5 to-white relative overflow-hidden`}>
      {/* Éléments décoratifs légers */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Formes géométriques subtiles */}
        <div className="absolute top-20 left-20 w-32 h-32 opacity-10">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="25" fill="none" stroke={`var(--color-${color})`} strokeWidth="1" />
            <circle cx="50" cy="50" r="15" fill={`var(--color-${color})`} opacity="0.3" />
          </svg>
        </div>
        
        <div className="absolute bottom-20 right-20 w-24 h-24 opacity-10">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <polygon points="50,10 90,90 10,90" fill="none" stroke={`var(--color-${color})`} strokeWidth="1" />
          </svg>
        </div>
        
        {/* Particules flottantes */}
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-2 h-2 bg-${color}/20 rounded-full`}
            style={{
              left: `${20 + (i * 15)}%`,
              top: `${20 + (i * 10)}%`,
            }}
            animate={{
              y: [0, -15, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 0.8,
            }}
          />
        ))}
      </div>

      <div className="container relative z-10">
        <motion.div
          ref={contentRef}
          initial={{ opacity: 0, y: 30 }}
          animate={contentInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Icône */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={contentInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={`w-16 h-16 bg-${color}/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-${color}/20`}
          >
            <FaRocket className={`w-8 h-8 text-${color}`} />
          </motion.div>
          
          {/* Titre */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={contentInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            Un projet similaire en tête ?
          </motion.h2>
          
          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={contentInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto"
          >
            Nous créons des solutions sur mesure adaptées à vos besoins spécifiques.
          </motion.p>
          
          {/* Ligne décorative */}
          <motion.div 
            initial={{ width: 0 }}
            animate={contentInView ? { width: "4rem" } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className={`h-1 bg-${color} mx-auto mb-8`}
          ></motion.div>
          
          {/* Boutons d'action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={contentInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
          >
            {/* Bouton principal */}
            <CTAButton 
              href="/contact" 
              variant="primary"
              showDots={true}
            >
              Discutons de votre projet
            </CTAButton>
            
            {/* Bouton secondaire */}
            <CTAButton 
              href="/projets" 
              variant="secondary"
              showDots={false}
            >
              Voir d'autres réalisations
            </CTAButton>
            
            {/* Lien externe - seulement si disponible */}
            {projectUrl && (
              <Link
                href={projectUrl}
                target="_blank"
                className={`inline-flex items-center gap-2 text-${color} hover:text-${color}/80 transition-colors font-medium px-4 py-2 rounded-lg hover:bg-${color}/5 border border-${color}/20`}
              >
                <FaExternalLinkAlt className="w-3 h-3" />
                Site en ligne
              </Link>
            )}
          </motion.div>
          
          {/* Contact rapide */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={contentInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="pt-6 border-t border-gray-200"
          >
            <div className="flex items-center justify-center gap-2 text-gray-600">
              <FaEnvelope className={`w-4 h-4 text-${color}`} />
              <span className="text-sm">Besoin d'un devis ?</span>
              <a 
                href="mailto:contact@sall.technology" 
                className={`text-${color} hover:text-${color}/80 transition-colors font-medium underline decoration-${color}/30 hover:decoration-${color}/60`}
              >
                contact@sall.technology
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}