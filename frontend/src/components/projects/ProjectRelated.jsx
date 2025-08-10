// frontend/src/components/projects/ProjectRelated.jsx
'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import Link from 'next/link'
import { FaExternalLinkAlt, FaCalendarAlt, FaArrowRight } from 'react-icons/fa'
import { getProjects } from '@/utils/api'
import { getStrapiMediaUrl } from '@/utils/helpers'

export default function ProjectRelated({ 
  currentProjectSlug, 
  currentCategory, 
  color = 'blue',
  maxProjects = 3 
}) {
  const [relatedProjects, setRelatedProjects] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [contentRef, contentInView] = useInView({ triggerOnce: true, threshold: 0.1 })

  // Couleurs selon le type
  const colorStyles = {
    blue: { solid: '#3498db', rgb: '52, 152, 219' },
    purple: { solid: '#9b59b6', rgb: '155, 89, 182' },
    red: { solid: '#e74c3c', rgb: '231, 76, 60' }
  }
  const colors = colorStyles[color] || colorStyles.blue

  useEffect(() => {
    const fetchRelatedProjects = async () => {
      try {
        setIsLoading(true)
        const allProjects = await getProjects()
        
        // Filtrer les projets connexes
        const filtered = allProjects
          .filter(project => project.slug !== currentProjectSlug) // Exclure le projet actuel
          .filter(project => {
            // Prioriser les projets de la même catégorie
            if (currentCategory && project.Categorie) {
              return project.Categorie === currentCategory
            }
            return true
          })
          .sort((a, b) => {
            // Trier par date (plus récents en premier)
            const dateA = new Date(a.Datederealisation || 0)
            const dateB = new Date(b.Datederealisation || 0)
            return dateB - dateA
          })
          .slice(0, maxProjects)

        setRelatedProjects(filtered)
      } catch (error) {
        console.error('Erreur lors du chargement des projets connexes:', error)
        setRelatedProjects([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchRelatedProjects()
  }, [currentProjectSlug, currentCategory, maxProjects])

  // Formater la date
  const formatDate = (dateString) => {
    if (!dateString) return ''
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long'
    })
  }

  // Extraire la description du projet
  const getProjectDescription = (project) => {
    if (project.Resume) return project.Resume
    if (project.Description?.[0]?.children?.[0]?.text) {
      return project.Description[0].children[0].text
    }
    return 'Découvrez ce projet réalisé par notre équipe.'
  }

  // Ne rien afficher s'il n'y a pas de projets connexes
  if (!isLoading && relatedProjects.length === 0) {
    return null
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="container">
        <motion.div
          ref={contentRef}
          initial={{ opacity: 0, y: 30 }}
          animate={contentInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* En-tête de section */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={contentInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full mb-6"
              style={{
                background: `rgba(${colors.rgb}, 0.1)`,
                border: `1px solid rgba(${colors.rgb}, 0.2)`
              }}
            >
              <div 
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ backgroundColor: colors.solid }}
              >
                <FaArrowRight className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold" style={{ color: colors.solid }}>
                Projets connexes
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={contentInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            >
              Découvrez nos autres
              <span style={{ color: colors.solid }} className="ml-2">
                réalisations
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={contentInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg text-gray-600 max-w-2xl mx-auto"
            >
              Explorez d'autres projets similaires qui pourraient vous inspirer
            </motion.p>
          </div>

          {/* Grille des projets */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: maxProjects }).map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="bg-gray-200 aspect-[4/3] rounded-xl mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProjects.map((project, index) => {
                const projectImage = project.Imageprincipale
                  ? getStrapiMediaUrl(
                      project.Imageprincipale.url ||
                      project.Imageprincipale.formats?.medium?.url ||
                      project.Imageprincipale.formats?.small?.url
                    )
                  : '/images/projects/default-project.jpg'

                return (
                  <motion.div
                    key={project.slug || index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={contentInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                    className="group"
                  >
                    <Link href={`/projets/${project.slug}`}>
                      <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                        {/* Image du projet */}
                        <div className="relative aspect-[4/3] overflow-hidden">
                          <Image
                            src={projectImage}
                            alt={project.Titre || 'Projet'}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                          
                          {/* Overlay au hover */}
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                          
                          {/* Badge catégorie */}
                          {project.Categorie && (
                            <div className="absolute top-4 left-4">
                              <span 
                                className="px-3 py-1 rounded-full text-xs font-semibold text-white"
                                style={{ backgroundColor: colors.solid }}
                              >
                                {project.Categorie}
                              </span>
                            </div>
                          )}

                          {/* Icône lien externe */}
                          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center">
                              <FaExternalLinkAlt className="w-3 h-3" style={{ color: colors.solid }} />
                            </div>
                          </div>
                        </div>

                        {/* Contenu */}
                        <div className="p-6">
                          <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-gray-700 transition-colors">
                            {project.Titre || 'Projet'}
                          </h3>

                          {/* Ligne décorative */}
                          <div 
                            className="h-0.5 w-12 mb-4 group-hover:w-20 transition-all duration-300"
                            style={{ 
                              background: `linear-gradient(90deg, ${colors.solid} 0%, rgba(${colors.rgb}, 0.5) 100%)`
                            }}
                          />

                          {/* Description */}
                          <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                            {getProjectDescription(project)}
                          </p>

                          {/* Métadonnées */}
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            {project.Client && (
                              <span className="font-medium">
                                {project.Client}
                              </span>
                            )}
                            
                            {project.Datederealisation && (
                              <div className="flex items-center gap-1">
                                <FaCalendarAlt className="w-3 h-3" />
                                <span>{formatDate(project.Datederealisation)}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                )
              })}
            </div>
          )}

          {/* CTA pour voir tous les projets */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={contentInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center mt-12"
          >
            <Link
              href="/projets"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-semibold border-2 hover:bg-white/50 transition-all duration-300"
              style={{ 
                borderColor: colors.solid,
                color: colors.solid 
              }}
            >
              Voir tous nos projets
              <FaArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}