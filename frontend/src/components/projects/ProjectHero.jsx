'use client'

import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import Link from 'next/link'
import CTAButton from '@/components/CTAButton'
import { getStrapiMediaUrl } from '@/utils/helpers'
import { FaExternalLinkAlt, FaCalendarAlt, FaBuilding } from 'react-icons/fa'

export default function ProjectHero({ 
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
  
  // Animation au défilement
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })
  
  // Transformations basées sur le défilement
  const imageScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1])
  const imageBrightness = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.8])
  
  // Gérer l'image
  const imageUrl = image ? 
    getStrapiMediaUrl(image.url || (image.formats?.large?.url || image.formats?.medium?.url || image.formats?.small?.url)) : 
    '/images/projects/default-project.jpg'
  
  // Formater la date
  const formatDate = (dateString) => {
    if (!dateString) return ''
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long'
    })
  }

  return (
    <motion.section 
      ref={containerRef}
      style={{ opacity: contentOpacity }}
      className="relative min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 overflow-hidden"
    >
      {/* Particules d'arrière-plan */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-2 h-2 bg-${color}/20 rounded-full`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="container relative z-10 min-h-screen flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">
          
          {/* Contenu textuel */}
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={contentInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            {/* Badge catégorie */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={titleInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-4"
            >
              <span className={`inline-block px-4 py-2 bg-${color}/10 text-${color} font-semibold rounded-full text-sm uppercase tracking-wider`}>
                {category || 'Projet'}
              </span>
              {projectUrl && (
                <Link 
                  href={projectUrl} 
                  target="_blank"
                  className={`inline-flex items-center gap-2 text-${color} hover:text-${color}/80 transition-colors text-sm font-medium`}
                >
                  <FaExternalLinkAlt className="w-3 h-3" />
                  Voir le site
                </Link>
              )}
            </motion.div>
            
            {/* Titre principal */}
            <motion.h1
              ref={titleRef}
              initial={{ opacity: 0 }}
              animate={titleInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-extrabold leading-tight"
            >
              {title.split(' ').map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={titleInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ 
                    duration: 0.5, 
                    delay: 0.1 * i,
                    type: "spring",
                    stiffness: 100
                  }}
                  className={`inline-block mr-3 ${i === 0 ? `text-${color}` : 'text-gray-900'}`}
                >
                  {word}
                </motion.span>
              ))}
            </motion.h1>
            
            {/* Ligne décorative */}
            <motion.div 
              initial={{ width: 0 }}
              animate={titleInView ? { width: "6rem" } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className={`h-1 bg-${color}`}
            ></motion.div>
            
            {/* Description */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={contentInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-xl"
            >
              {description}
            </motion.p>
            
            {/* Informations du projet */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={contentInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            >
              {client && (
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 bg-${color}/10 rounded-lg flex items-center justify-center`}>
                    <FaBuilding className={`w-4 h-4 text-${color}`} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Client</p>
                    <p className="font-semibold text-gray-900">{client}</p>
                  </div>
                </div>
              )}
              
              {date && (
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 bg-${color}/10 rounded-lg flex items-center justify-center`}>
                    <FaCalendarAlt className={`w-4 h-4 text-${color}`} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Réalisé en</p>
                    <p className="font-semibold text-gray-900">{formatDate(date)}</p>
                  </div>
                </div>
              )}
            </motion.div>
            
            {/* Boutons d'action */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={contentInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <CTAButton 
                href="/contact" 
                variant="primary" 
                showDots={true}
              >
                Projet similaire ?
              </CTAButton>
              
              {projectUrl && (
                <CTAButton 
                  href={projectUrl}
                  target="_blank"
                  variant="secondary" 
                  showDots={false}
                >
                  Voir le site live
                </CTAButton>
              )}
            </motion.div>
          </motion.div>
          
          {/* Image du projet */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={contentInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative">
              {/* Image principale avec effets */}
              <motion.div
                style={{ 
                  scale: imageScale,
                  filter: `brightness(${imageBrightness})`
                }}
                className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl"
              >
                <Image
                  src={imageUrl}
                  alt={title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
                
                {/* Overlay décoratif */}
                <div className={`absolute inset-0 bg-gradient-to-tr from-${color}/20 via-transparent to-transparent`}></div>
              </motion.div>
              
              {/* Élément décoratif */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={contentInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.8 }}
                className={`absolute -bottom-6 -right-6 w-24 h-24 bg-${color} rounded-2xl shadow-lg flex items-center justify-center`}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="text-white text-2xl font-bold"
                >
                  ✨
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}