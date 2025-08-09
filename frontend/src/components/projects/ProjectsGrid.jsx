'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import Image from 'next/image'
import { getStrapiMediaUrl, extractFirstParagraph } from '@/utils/helpers'
import { FaExternalLinkAlt, FaCalendarAlt, FaUser, FaArrowRight } from 'react-icons/fa'

export default function ProjectsGrid({ projets, categories }) {
  // États
  const [activeFilter, setActiveFilter] = useState('Tous')
  const [filteredProjects, setFilteredProjects] = useState(projets)
  const [visibleCount, setVisibleCount] = useState(6)
  
  // Animation d'apparition
  const [filtersRef, filtersInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [gridRef, gridInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  
  // Filtrer les projets
  useEffect(() => {
    if (activeFilter === 'Tous') {
      setFilteredProjects(projets)
    } else {
      setFilteredProjects(projets.filter(projet => projet.Categorie === activeFilter))
    }
    setVisibleCount(6) // Reset la pagination lors du changement de filtre
  }, [activeFilter, projets])
  
  // Fonctions utilitaires
  const getProjectImage = (projet) => {
    if (projet.Imageprincipale?.url) {
      return getStrapiMediaUrl(projet.Imageprincipale.url)
    }
    if (projet.Imageprincipale?.formats?.medium?.url) {
      return getStrapiMediaUrl(projet.Imageprincipale.formats.medium.url)
    }
    return '/images/projects/default-project.jpg'
  }
  
  const getProjectDescription = (projet) => {
    return projet.Resume || extractFirstParagraph(projet.Description) || 'Description du projet'
  }
  
  const formatDate = (dateString) => {
    if (!dateString) return ''
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long'
    })
  }
  
  const getCardColor = (index) => {
    const colors = ['purple', 'blue', 'red', 'green', 'yellow']
    return colors[index % colors.length]
  }
  
  // Charger plus de projets
  const loadMore = () => {
    setVisibleCount(prev => prev + 6)
  }
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }
  
  const itemVariants = {
    hidden: { y: 30, opacity: 0, scale: 0.95 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  }

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container">
        
        {/* Filtres */}
        <motion.div
          ref={filtersRef}
          initial={{ opacity: 0, y: 30 }}
          animate={filtersInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Filtrer par <span className="text-purple">catégorie</span>
            </h2>
            <p className="text-gray-600">
              Explorez nos réalisations par domaine d'expertise
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setActiveFilter(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeFilter === category
                    ? 'bg-purple text-white shadow-lg shadow-purple/25'
                    : 'bg-white text-gray-600 hover:bg-purple/10 hover:text-purple border border-gray-200 hover:border-purple/20'
                }`}
              >
                {category}
                {activeFilter === category && (
                  <motion.span
                    layoutId="activeFilter"
                    className="ml-2 inline-block w-2 h-2 bg-white rounded-full"
                  />
                )}
              </motion.button>
            ))}
          </div>
          
          {/* Compteur de résultats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center mt-6"
          >
            <span className="text-gray-500 text-sm">
              {filteredProjects.length} projet{filteredProjects.length > 1 ? 's' : ''} trouvé{filteredProjects.length > 1 ? 's' : ''}
            </span>
          </motion.div>
        </motion.div>
        
        {/* Grille des projets */}
        <motion.div
          ref={gridRef}
          variants={containerVariants}
          initial="hidden"
          animate={gridInView ? "visible" : "hidden"}
          className="mb-12"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredProjects.slice(0, visibleCount).map((projet, index) => {
                const color = getCardColor(index)
                const projectImage = getProjectImage(projet)
                const projectDescription = getProjectDescription(projet)
                
                return (
                  <motion.div
                    key={projet.id}
                    variants={itemVariants}
                    className="group"
                    layout
                  >
                    <div className={`bg-gradient-to-br from-${color}/5 to-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 h-full border border-gray-100 hover:border-${color}/20`}>
                      
                      {/* Image du projet */}
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <Image
                          src={projectImage}
                          alt={projet.Titre || 'Projet'}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        
                        {/* Overlay avec gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        
                        {/* Badge catégorie */}
                        {projet.Categorie && (
                          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-gray-700">
                            {projet.Categorie}
                          </div>
                        )}
                        
                        {/* Lien externe si disponible */}
                        {projet.URLduprojet && (
                          <Link
                            href={projet.URLduprojet}
                            target="_blank"
                            className={`absolute top-4 left-4 w-10 h-10 bg-${color}/90 backdrop-blur-sm text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-${color}`}
                          >
                            <FaExternalLinkAlt className="w-4 h-4" />
                          </Link>
                        )}
                      </div>
                      
                      {/* Contenu de la carte */}
                      <div className="p-6">
                        {/* Titre */}
                        <h3 className={`text-xl font-bold mb-3 group-hover:text-${color} transition-colors duration-300`}>
                          {projet.Titre || 'Projet'}
                        </h3>
                        
                        {/* Ligne décorative */}
                        <div className={`h-0.5 w-12 bg-gradient-to-r from-${color} to-${color}/50 mb-4 group-hover:w-20 transition-all duration-300`}></div>
                        
                        {/* Description */}
                        <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                          {projectDescription}
                        </p>
                        
                        {/* Informations du projet */}
                        <div className="space-y-2 mb-6">
                          {projet.Client && (
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                              <FaUser className="w-3 h-3" />
                              <span>{projet.Client}</span>
                            </div>
                          )}
                          
                          {projet.Datederealisation && (
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                              <FaCalendarAlt className="w-3 h-3" />
                              <span>{formatDate(projet.Datederealisation)}</span>
                            </div>
                          )}
                        </div>
                        
                        {/* Lien vers le projet */}
                        <Link
                          href={`/projets/${projet.slug}`}
                          className={`inline-flex items-center gap-2 text-${color} hover:text-${color}/80 transition-colors font-medium text-sm group/link`}
                        >
                          Voir les détails
                          <FaArrowRight className="w-3 h-3 transition-transform group-hover/link:translate-x-1" />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          </AnimatePresence>
        </motion.div>
        
        {/* Bouton "Charger plus" */}
        {visibleCount < filteredProjects.length && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <button
              onClick={loadMore}
              className="px-8 py-4 bg-purple text-white rounded-lg hover:bg-purple/90 transition-colors font-medium shadow-lg hover:shadow-xl"
            >
              Charger plus de projets ({filteredProjects.length - visibleCount} restants)
            </button>
          </motion.div>
        )}
        
        {/* Message si aucun projet */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center py-16"
          >
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl">🔍</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Aucun projet trouvé
            </h3>
            <p className="text-gray-600 mb-6">
              Aucun projet ne correspond aux critères sélectionnés.
            </p>
            <button
              onClick={() => setActiveFilter('Tous')}
              className="px-6 py-3 bg-purple text-white rounded-lg hover:bg-purple/90 transition-colors"
            >
              Afficher tous les projets
            </button>
          </motion.div>
        )}
      </div>
    </section>
  )
}