// frontend/src/components/projects/ProjectHero.jsx - VERSION CORRIGÉE
'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import Link from 'next/link'
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
  const [contentRef, contentInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  
  // SÉCURISER le titre
  const safeTitle = title || 'Projet'
  const titleWords = safeTitle.split(' ')
  
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
    <section className="relative min-h-[80vh] bg-white overflow-hidden">
      {/* Arrière-plan minimal */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50/30 to-white"></div>

      <div className="container relative z-10 min-h-[80vh] flex items-center py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
          
          {/* Contenu textuel simplifié */}
          <motion.div 
            ref={contentRef}
            className="space-y-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Badge catégorie + Lien externe compact */}
            <div className="flex items-center gap-4">
              <span className={`inline-block px-3 py-1.5 bg-${color}/10 text-${color} font-medium rounded-full text-sm uppercase tracking-wide`}>
                {category || 'Projet'}
              </span>
              {projectUrl && (
                <Link 
                  href={projectUrl} 
                  target="_blank"
                  className={`inline-flex items-center gap-1.5 text-${color} hover:text-${color}/80 transition-colors text-sm font-medium`}
                >
                  <FaExternalLinkAlt className="w-3 h-3" />
                  Voir le site
                </Link>
              )}
            </div>
            
            {/* Titre principal - SÉCURISÉ */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-3xl md:text-5xl font-extrabold leading-tight"
            >
              <span className={`text-${color}`}>
                {titleWords[0]}
              </span>
              {titleWords.length > 1 && (
                <span className="text-gray-900 ml-2">
                  {titleWords.slice(1).join(' ')}
                </span>
              )}
            </motion.h1>
            
            {/* Ligne décorative */}
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "4rem" }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className={`h-1 bg-${color}`}
            ></motion.div>
            
            {/* Description */}
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg text-gray-600 leading-relaxed"
            >
              {description || 'Description du projet'}
            </motion.p>
            
            {/* Informations du projet - Version compacte */}
            {(client || date) && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex items-center gap-6 text-sm text-gray-500 pt-2"
              >
                {client && (
                  <div className="flex items-center gap-2">
                    <FaBuilding className={`w-4 h-4 text-${color}`} />
                    <span>{client}</span>
                  </div>
                )}
                {date && (
                  <div className="flex items-center gap-2">
                    <FaCalendarAlt className={`w-4 h-4 text-${color}`} />
                    <span>{formatDate(date)}</span>
                  </div>
                )}
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
            <div className="relative h-[400px] md:h-[500px] rounded-xl overflow-hidden shadow-xl">
              <Image
                src={imageUrl}
                alt={safeTitle}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              
              {/* Badge flottant */}
              <div className="absolute top-4 left-4">
                <div className={`px-3 py-1.5 bg-white/95 backdrop-blur-sm rounded-full text-${color} font-medium text-sm shadow-lg`}>
                  {category || 'Projet'}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}