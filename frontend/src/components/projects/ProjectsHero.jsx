'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { generateParticles } from '@/components/background/GridUtils'
import ConnectionLines from '@/components/background/ConnectionLines'

export default function ProjectsHero({ totalProjects, categories }) {
  // Animation au défilement
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  })
  
  const contentOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.8])
  const contentY = useTransform(scrollYProgress, [0, 0.5], [0, 50])
  
  // Animation d'apparition
  const [titleRef, titleInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [contentRef, contentInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  
  // Particules pour l'arrière-plan
  const particles = generateParticles(40, 'purple')

  return (
    <motion.section 
      ref={sectionRef}
      style={{ 
        opacity: contentOpacity,
        y: contentY
      }}
      className="relative min-h-[80vh] bg-gradient-to-br from-gray-50 via-white to-purple/10 overflow-hidden flex items-center"
    >
      {/* Particules d'arrière-plan */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle, index) => (
          <motion.div
            key={index}
            className="absolute w-2 h-2 bg-purple/20 rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
            }}
          />
        ))}
      </div>

      {/* Lignes de connexion */}
      <ConnectionLines color="purple" intensity="light" />

      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Badge d'introduction */}
          <motion.span
            ref={titleRef}
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-block text-purple font-semibold tracking-wider uppercase text-sm mb-6"
          >
            Portfolio • Réalisations • Success Stories
          </motion.span>
          
          {/* Titre principal */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight"
          >
            Nos{' '}
            <span className="text-purple">Projets</span>
            <br />
            & Réalisations
          </motion.h1>
          
          {/* Ligne décorative */}
          <motion.div 
            initial={{ width: 0 }}
            animate={titleInView ? { width: "8rem" } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="h-1 bg-purple mx-auto mb-8"
          ></motion.div>
          
          {/* Description */}
          <motion.p
            ref={contentRef}
            initial={{ opacity: 0, y: 20 }}
            animate={contentInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl text-gray-600 mb-12 leading-relaxed max-w-3xl mx-auto"
          >
            Découvrez notre portfolio de <strong className="text-purple">{totalProjects} projets réussis</strong> : 
            sites web, applications mobiles, plateformes e-commerce et solutions sur mesure 
            qui ont transformé les entreprises de nos clients.
          </motion.p>
          
          {/* Catégories principales */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={contentInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {categories.slice(0, 4).map((category, index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={contentInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ 
                  duration: 0.5, 
                  delay: 1 + (index * 0.1),
                  type: "spring",
                  stiffness: 200
                }}
                className="px-6 py-3 bg-white rounded-full shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
              >
                <span className="text-gray-700 font-medium">{category}</span>
              </motion.div>
            ))}
          </motion.div>
          
          {/* Statistiques rapides */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={contentInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto"
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-purple mb-2">{totalProjects}+</div>
              <div className="text-gray-600 text-sm">Projets réussis</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple mb-2">100%</div>
              <div className="text-gray-600 text-sm">Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple mb-2">5+</div>
              <div className="text-gray-600 text-sm">Secteurs d'activité</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple mb-2">∞</div>
              <div className="text-gray-600 text-sm">Possibilités</div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Dégradé en bas */}
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-white to-transparent"></div>
    </motion.section>
  )
}