// frontend/src/components/projects/EnhancedProjectHero.jsx
'use client'

import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import Link from 'next/link'
import CTAButton from '@/components/CTAButton'
import { getStrapiMediaUrl } from '@/utils/helpers'
import { FaExternalLinkAlt, FaCalendarAlt, FaBuilding, FaCode, FaMedal } from 'react-icons/fa'

export default function EnhancedProjectHero({ 
  title, 
  category, 
  description, 
  image, 
  client, 
  date, 
  projectUrl, 
  color = 'blue' 
}) {
  // Animation avec plusieurs effets
  const [titleRef, titleInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [contentRef, contentInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  
  // Animation au défilement avec parallax
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })
  
  // Transformations sophistiquées basées sur le défilement
  const imageScale = useTransform(scrollYProgress, [0, 0.6], [1, 1.15])
  const imageY = useTransform(scrollYProgress, [0, 0.6], [0, -100])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.8])
  const contentY = useTransform(scrollYProgress, [0, 0.4], [0, -50])
  
  // Gérer l'image avec fallback intelligent
  const imageUrl = image ? 
    getStrapiMediaUrl(image.url || (image.formats?.large?.url || image.formats?.medium?.url || image.formats?.small?.url)) : 
    '/images/projects/default-project.jpg'
  
  // Mots-clés pour la coloration dynamique
  const keywords = ['App', 'Site', 'E-commerce', 'Web', 'Mobile', 'Digital', 'Platform']
  
  // Formater la date avec style
  const formatDate = (dateString) => {
    if (!dateString) return ''
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long'
    })
  }

  // RGB values pour les effets
  const colorRGB = {
    blue: '52, 152, 219',
    purple: '155, 89, 182', 
    red: '231, 76, 60'
  }

  const mainColorRGB = colorRGB[color] || colorRGB.blue

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen bg-gradient-to-br from-white via-gray-50 to-white overflow-hidden"
    >
      {/* Fond décoratif sophistiqué */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Formes organiques animées */}
        <motion.div
          className="absolute -top-32 -right-32 w-96 h-96 opacity-10"
          animate={{
            rotate: [0, 180, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <path
              d="M47.2,-73.9C61.3,-66.9,73,-54.2,79.6,-39.3C86.1,-24.4,87.5,-7.2,82.7,7.8C78,22.8,66.9,35.8,55.3,47.5C43.6,59.3,31.3,69.9,16.5,75.4C1.7,80.8,-15.6,81.1,-28.9,74.4C-42.2,67.8,-51.6,54.1,-58.9,40.3C-66.3,26.5,-71.7,12.6,-73.1,-2.5C-74.6,-17.7,-72.1,-34.1,-63.3,-46.1C-54.5,-58.1,-39.6,-65.8,-24.5,-72C-9.5,-78.2,5.7,-83,20.2,-81.5C34.8,-79.9,48.8,-71.9,61.8,-61.9Z"
              fill={`rgba(${mainColorRGB}, 0.1)`}
            />
          </svg>
        </motion.div>

        {/* Grille de points sophistiquée */}
        <div className="absolute inset-0 opacity-5">
          <svg width="100%" height="100%">
            <pattern id="projectDots" patternUnits="userSpaceOnUse" width="60" height="60">
              <circle cx="30" cy="30" r="1" fill={`rgb(${mainColorRGB})`} />
              <circle cx="10" cy="10" r="0.5" fill={`rgb(${mainColorRGB})`} />
              <circle cx="50" cy="50" r="0.5" fill={`rgb(${mainColorRGB})`} />
            </pattern>
            <rect width="100%" height="100%" fill="url(#projectDots)" />
          </svg>
        </div>

        {/* Particules flottantes */}
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-1 h-1 bg-${color}/20 rounded-full`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      <div className="container relative z-10 min-h-screen flex items-center py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">
          
          {/* Contenu textuel sophistiqué */}
          <motion.div 
            ref={contentRef}
            style={{ opacity: contentOpacity, y: contentY }}
            className="space-y-8 lg:pr-8"
          >
            {/* Badge premium avec icône */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={contentInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-4"
            >
              <div className={`px-4 py-2 bg-gradient-to-r from-${color}/10 to-${color}/5 rounded-full border border-${color}/20 flex items-center gap-2`}>
                <FaMedal className={`w-3 h-3 text-${color}`} />
                <span className={`text-${color} font-semibold text-sm uppercase tracking-wider`}>
                  {category || 'Projet Premium'}
                </span>
              </div>
              
              {projectUrl && (
                <Link 
                  href={projectUrl} 
                  target="_blank"
                  className={`inline-flex items-center gap-2 text-${color} hover:text-${color}/80 transition-colors font-medium px-3 py-1.5 rounded-lg border border-${color}/20 hover:bg-${color}/5`}
                >
                  <FaExternalLinkAlt className="w-3 h-3" />
                  <span className="text-sm">Voir en ligne</span>
                </Link>
              )}
            </motion.div>
            
            {/* Titre avec animation sophistiquée */}
            <motion.h1
              ref={titleRef}
              initial={{ opacity: 0 }}
              animate={titleInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-extrabold leading-tight"
            >
              {(title || 'Projet').split(' ').map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  animate={titleInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ 
                    duration: 0.6, 
                    delay: 0.1 * i,
                    type: "spring",
                    stiffness: 100
                  }}
                  className={`inline-block mr-3 ${keywords.some(keyword => word.includes(keyword)) ? `text-${color}` : 'text-gray-900'}`}
                >
                  {word}
                </motion.span>
              ))}
            </motion.h1>
            
            {/* Ligne décorative animée */}
            <motion.div 
              initial={{ width: 0 }}
              animate={titleInView ? { width: "8rem" } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className={`h-1 bg-gradient-to-r from-${color} via-purple to-red rounded-full`}
            ></motion.div>
            
            {/* Description enrichie */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={contentInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl"
            >
              {description || 'Un projet exceptionnel qui démontre notre expertise technique et notre capacité à créer des solutions innovantes.'}
            </motion.p>
            
            {/* Informations du projet avec design moderne */}
            {(client || date) && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={contentInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                {client && (
                  <div className="flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-100 hover:shadow-md transition-shadow">
                    <div className={`w-10 h-10 bg-${color}/10 rounded-lg flex items-center justify-center`}>
                      <FaBuilding className={`w-4 h-4 text-${color}`} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">Client</p>
                      <p className="font-semibold text-gray-900">{client}</p>
                    </div>
                  </div>
                )}
                
                {date && (
                  <div className="flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-100 hover:shadow-md transition-shadow">
                    <div className={`w-10 h-10 bg-${color}/10 rounded-lg flex items-center justify-center`}>
                      <FaCalendarAlt className={`w-4 h-4 text-${color}`} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">Réalisé en</p>
                      <p className="font-semibold text-gray-900">{formatDate(date)}</p>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
            
            {/* CTA Buttons sophistiqués */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={contentInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-wrap gap-4"
            >
              <CTAButton 
                href="/contact" 
                variant="primary" 
                showDots={true}
              >
                Projet similaire ?
              </CTAButton>
              
              <CTAButton 
                href="/projets" 
                variant="secondary" 
                showDots={false}
              >
                Autres réalisations
              </CTAButton>
            </motion.div>
          </motion.div>
          
          {/* Image avec effets sophistiqués */}
          <motion.div 
            className="relative lg:h-[700px] h-[500px]"
            style={{ y: imageY }}
          >
            <motion.div
              style={{ scale: imageScale }}
              className="relative h-full w-full rounded-2xl overflow-hidden shadow-2xl"
            >
              <Image
                src={imageUrl}
                alt={title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              
              {/* Overlay sophistiqué */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
              
              {/* Badge catégorie flottant */}
              <div className="absolute top-6 left-6">
                <div className={`px-4 py-2 bg-white/95 backdrop-blur-sm rounded-full shadow-lg border border-white/20`}>
                  <div className="flex items-center gap-2">
                    <FaCode className={`w-3 h-3 text-${color}`} />
                    <span className={`text-${color} font-semibold text-sm`}>
                      {category || 'Digital'}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Effets décoratifs sophistiqués */}
            <div className={`absolute -bottom-8 -right-8 w-32 h-32 bg-${color}/5 rounded-full blur-2xl`}></div>
            <div className={`absolute -top-8 -left-8 w-24 h-24 bg-purple/5 rounded-full blur-xl`}></div>
            
            {/* Indicateur de défilement */}
            <motion.div
              className="absolute -bottom-16 left-1/2 transform -translate-x-1/2"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center">
                <div className="w-1 h-3 bg-gray-400 rounded-full mt-2"></div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Trame visuelle au bas avec motif sophistiqué */}
      <div className="absolute bottom-0 left-0 w-full h-20 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <svg width="100%" height="100%">
            <pattern id="bottomProjectPattern" patternUnits="userSpaceOnUse" width="40" height="40">
              <circle cx="20" cy="20" r="1" fill={`rgb(${mainColorRGB})`} />
              <circle cx="10" cy="30" r="0.5" fill={`rgb(${mainColorRGB})`} />
              <circle cx="30" cy="10" r="0.5" fill={`rgb(${mainColorRGB})`} />
            </pattern>
            <rect width="100%" height="100%" fill="url(#bottomProjectPattern)" />
          </svg>
        </div>
      </div>
    </section>
  )
}