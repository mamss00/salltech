'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import Image from 'next/image'
import { getStrapiMediaUrl } from '@/utils/helpers'

export default function ServicePortfolio({ projects, color = 'blue' }) {
  // Animation
  const [showcaseRef, showcaseInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  
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
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  }
  
  if (!projects || projects.length === 0) {
    return null;
  }

  // Limiter à 3 projets maximum pour cet affichage
  const displayProjects = projects.slice(0, 6);

  return (
    <section id="portfolio" className="py-20 bg-gray-50">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Exemples de <span className={`text-${color}`}>Réalisations</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Découvrez quelques-uns de nos projets liés à ce service
          </p>
        </div>
        
        <motion.div
          ref={showcaseRef}
          variants={containerVariants}
          initial="hidden"
          animate={showcaseInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {displayProjects.map((project, index) => {
            // Accéder aux attributs du projet
            const projectData = project.attributes || project;
            
            // Extraire le premier paragraphe de description
            let descriptionText = '';
            if (projectData.Description && Array.isArray(projectData.Description)) {
              const firstParagraph = projectData.Description[0];
              if (firstParagraph?.children && firstParagraph.children.length > 0) {
                descriptionText = firstParagraph.children[0].text || '';
              }
            }
            
            // Extraire l'URL de l'image principale
            let imageUrl = null;
            if (projectData.Imageprincipale?.data) {
              const imgData = projectData.Imageprincipale.data.attributes;
              imageUrl = getStrapiMediaUrl(imgData.url);
            } else if (projectData.Imageprincipale?.url) {
              imageUrl = getStrapiMediaUrl(projectData.Imageprincipale.url);
            }
            
            // Extraire les technologies
            let technologies = [];
            if (typeof projectData.Technologies === 'string') {
              technologies = [projectData.Technologies];
            } else if (Array.isArray(projectData.Technologies)) {
              technologies = projectData.Technologies;
            }
            
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group"
              >
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-xl hover:-translate-y-2 h-full">
                  {/* Image avec overlay */}
                  <div className="relative h-56 overflow-hidden">
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={projectData.Titre || "Projet"}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    ) : (
                      <div className={`w-full h-full bg-${color}/20 flex items-center justify-center`}>
                        <span className="text-2xl font-bold text-gray-400">Image non disponible</span>
                      </div>
                    )}
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* Badges */}
                    <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                      <span className="inline-block px-3 py-1 text-sm bg-white/90 text-blue font-medium rounded-full shadow-md">
                        {projectData.Categorie || "Projet"}
                      </span>
                    </div>
                    
                    {/* Boutons d'action */}
                    <div className="absolute bottom-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                      <Link href={`/portfolio/${projectData.slug || '#'}`} className="p-2 bg-white/90 text-blue hover:text-purple rounded-full shadow-md transition-colors duration-300">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                        </svg>
                      </Link>
                    </div>
                  </div>
                  
                  {/* Contenu */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3 group-hover:text-blue transition-colors duration-300">
                      {projectData.Titre || "Titre du projet"}
                    </h3>
                    
                    <div className="h-0.5 w-12 bg-gradient-to-r from-blue via-purple to-red mb-4 opacity-60 group-hover:w-20 transition-all duration-300"></div>
                    
                    <p className="text-gray-600 mb-6 line-clamp-3">
                      {descriptionText || "Description du projet"}
                    </p>
                    
                    {/* Technologies utilisées */}
                    {technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-auto">
                        {technologies.slice(0, 4).map((tech, idx) => (
                          <span key={idx} className="text-xs px-3 py-1 bg-gray-100 text-gray-700 rounded-full transition-colors duration-300 hover:bg-blue/10 hover:text-blue">
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
        
        {/* Bouton pour voir tous les projets */}
        <div className="text-center mt-12">
          <Link 
            href="/portfolio" 
            className={`inline-flex items-center justify-center px-6 py-3 rounded-xl bg-${color} text-white font-medium hover:bg-${color}/90 transition-colors duration-300`}
          >
            <span>Voir tous nos projets</span>
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
