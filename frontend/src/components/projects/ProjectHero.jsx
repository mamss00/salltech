// frontend/src/components/projects/ProjectHero.jsx - CORRIGÉ
'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
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
  // Simplifier les animations - juste l'apparition
  const [titleRef, titleInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [contentRef, contentInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  
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
    <section className="relative min-h-[90vh] bg-white overflow-hidden">
      {/* Arrière-plan simplifié - plus de gradients sombres */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50/30 to-white"></div>
      
      {/* Quelques particules légères - BEAUCOUP moins */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 6 }).map((_, i) => ( // Réduit de 20 à 6
          <motion.div
            key={i}
            className={`absolute w-1 h-1 bg-${color}/10 rounded-full`} // Plus petites et plus légères
            style={{
              left: `${20 + (i * 15)}%`, // Distribution plus contrôlée
              top: `${20 + (i * 10)}%`,
            }}
            animate={{
              y: [0, -15, 0],
              opacity: [0.1, 0.3, 0.1], // Très discrètes
            }}
            transition={{
              duration: 4 + Math.random(),
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      <div className="container relative z-10 min-h-[90vh] flex items-center py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">
          
          {/* Contenu textuel - Suppression des animations complexes */}
          <motion.div 
            ref={contentRef}
            className="space-y-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }} // Animation simple sans conditions
            transition={{ duration: 0.6 }}
          >
            {/* Badge catégorie */}
            <div className="flex items-center gap-4">
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
            </div>
            
            {/* Titre principal - Animation simplifiée */}
            <motion.h1
              ref={titleRef}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }} // Simple sans conditions
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl md:text-6xl font-extrabold leading-tight text-gray-900"
            >
              <span className={`text-${color}`}>
                {title.split(' ')[0]} {/* Premier mot coloré */}
              </span>
              {title.split(' ').slice(1).length > 0 && (
                <span className="text-gray-900 ml-2">
                  {title.split(' ').slice(1).join(' ')}
                </span>
              )}
            </motion.h1>
            
            {/* Ligne décorative */}
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "6rem" }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className={`h-1 bg-${color}`}
            ></motion.div>
            
            {/* Description */}
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-xl"
            >
              {description}
            </motion.p>
            
            {/* Informations du projet */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap gap-6 text-sm text-gray-500"
            >
              {client && (
                <div className="flex items-center gap-2">
                  <FaBuilding className={`w-4 h-4 text-${color}`} />
                  <span>Client: {client}</span>
                </div>
              )}
              {date && (
                <div className="flex items-center gap-2">
                  <FaCalendarAlt className={`w-4 h-4 text-${color}`} />
                  <span>{formatDate(date)}</span>
                </div>
              )}
            </motion.div>
            
            {/* CTA - si URL du projet disponible */}
            {projectUrl && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <CTAButton 
                  href={projectUrl}
                  variant="primary"
                  showDots={true}
                  className="inline-flex"
                >
                  Découvrir le projet
                </CTAButton>
              </motion.div>
            )}
          </motion.div>
          
          {/* Image du projet - Animation simplifiée */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="relative h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={imageUrl}
                alt={title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              
              {/* Overlay léger pour améliorer la lisibilité */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
              
              {/* Badge flottant */}
              <div className="absolute top-6 left-6">
                <div className={`px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-${color} font-semibold text-sm shadow-lg`}>
                  {category || 'Projet'}
                </div>
              </div>
            </div>
            
            {/* Effet décoratif subtle */}
            <div className={`absolute -bottom-6 -right-6 w-24 h-24 bg-${color}/10 rounded-full blur-xl`}></div>
            <div className={`absolute -top-6 -left-6 w-16 h-16 bg-${color}/5 rounded-full blur-lg`}></div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}