// frontend/src/components/projects/ProjectHero.jsx - VERSION FINALE CLAIRE
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
  // Animations simples et propres
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
      {/* Arrière-plan très léger et discret */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 to-white"></div>
      
      {/* Quelques particules très discrètes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 4 }).map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-1 h-1 bg-${color}/5 rounded-full`}
            style={{
              left: `${25 + (i * 20)}%`,
              top: `${30 + (i * 15)}%`,
            }}
            animate={{
              y: [0, -10, 0],
              opacity: [0.05, 0.15, 0.05],
            }}
            transition={{
              duration: 6 + i,
              repeat: Infinity,
              delay: i * 2,
            }}
          />
        ))}
      </div>

      <div className="container relative z-10 min-h-[90vh] flex items-center py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">
          
          {/* Contenu textuel */}
          <motion.div 
            ref={contentRef}
            className="space-y-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
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
            
            {/* Titre principal */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl md:text-6xl font-extrabold leading-tight text-gray-900"
            >
              <span className={`text-${color}`}>
                {title.split(' ')[0]}
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
            
            {/* CTA Button - CELUI QUI FONCTIONNE BIEN */}
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
          
          {/* Image du projet */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="relative h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src={imageUrl}
                alt={title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              
              {/* Overlay très léger */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent"></div>
              
              {/* Badge flottant */}
              <div className="absolute top-6 left-6">
                <div className={`px-4 py-2 bg-white/95 backdrop-blur-sm rounded-full text-${color} font-semibold text-sm shadow-lg`}>
                  {category || 'Projet'}
                </div>
              </div>
            </div>
            
            {/* Effets décoratifs très discrets */}
            <div className={`absolute -bottom-4 -right-4 w-16 h-16 bg-${color}/5 rounded-full blur-xl`}></div>
            <div className={`absolute -top-4 -left-4 w-12 h-12 bg-${color}/3 rounded-full blur-lg`}></div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}