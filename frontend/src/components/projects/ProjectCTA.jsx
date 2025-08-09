// frontend/src/components/projects/ProjectCTA.jsx - VERSION SIMPLIFIÉE
'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import CTAButton from '@/components/CTAButton'
import { FaRocket, FaExternalLinkAlt } from 'react-icons/fa'

export default function ProjectCTA({ projectName, projectUrl, color = 'blue' }) {
  const [contentRef, contentInView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section className={`py-20 bg-gradient-to-br from-gray-900 to-${color}/20 text-white relative overflow-hidden`}>
      {/* Particules discrètes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/10 rounded-full"
            style={{
              left: `${20 + (i * 10)}%`,
              top: `${20 + (i * 8)}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 6 + i,
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
          className="max-w-3xl mx-auto text-center"
        >
          {/* Icône */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={contentInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={`w-16 h-16 bg-${color}/20 rounded-full flex items-center justify-center mx-auto mb-6`}
          >
            <FaRocket className={`w-8 h-8 text-${color}`} />
          </motion.div>
          
          {/* Titre */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={contentInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Un projet similaire en tête ?
          </motion.h2>
          
          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={contentInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg text-gray-300 mb-8 leading-relaxed"
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
          
          {/* Boutons d'action - SIMPLIFIÉS */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={contentInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
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
              href="/portfolio" 
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
                className={`inline-flex items-center gap-2 text-${color} hover:text-${color}/80 transition-colors font-medium px-4 py-2 rounded-lg hover:bg-white/5`}
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
            className="mt-8 pt-6 border-t border-white/10"
          >
            <p className="text-gray-400 text-sm">
              💬 Besoin d'un devis ?{' '}
              <a 
                href="mailto:contact@sall.technology" 
                className={`text-${color} hover:text-${color}/80 transition-colors font-medium underline`}
              >
                contact@sall.technology
              </a>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}