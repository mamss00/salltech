'use client'

import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import CTAButton from '@/components/CTAButton'
import { generateParticles } from '@/components/background/GridUtils'
import ConnectionLines from '@/components/background/ConnectionLines'
import { getProjects } from '@/utils/api'
import { getStrapiMediaUrl, extractFirstParagraph } from '@/utils/helpers'

const Portfolio = () => {
  // Animation avec plusieurs effets
  const [titleRef, titleInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [descRef, descInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [projectsRef, projectsInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  
  // Animation au défilement
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })
  
  // Transformations basées sur le défilement
  const containerOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.7, 1, 1, 0.7])
  
  // Pour les particules d'arrière-plan
  const particles = generateParticles(30, 'purple')
  
  // États
  const [activeFilter, setActiveFilter] = useState('Tous')
  const [projects, setProjects] = useState([])
  const [filteredProjects, setFilteredProjects] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  
  // Charger les projets depuis Strapi
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true)
        const projectsData = await getProjects()
        setProjects(projectsData)
        setFilteredProjects(projectsData)
      } catch (err) {
        console.error('Erreur lors du chargement des projets:', err)
        setError('Erreur lors du chargement des projets.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchProjects()
  }, [])
  
  // Filtrer les projets par catégorie
  useEffect(() => {
    if (activeFilter === 'Tous') {
      setFilteredProjects(projects)
    } else {
      setFilteredProjects(projects.filter(project => project.Categorie === activeFilter))
    }
  }, [activeFilter, projects])
  
  // Couleurs des cartes
  const getCardColor = (index) => {
    switch (index % 5) {
      case 0: return "from-purple/20 to-purple/5";
      case 1: return "from-blue/20 to-blue/5";
      case 2: return "from-red/20 to-red/5";
      case 3: return "from-purple/20 to-blue/5";
      case 4: return "from-blue/20 to-red/5";
      default: return "from-purple/20 to-purple/5";
    }
  };
  
  // Obtenir les catégories uniques
  const categories = ['Tous', ...new Set(projects.map(project => project.Categorie).filter(Boolean))]
  
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

  // Fonctions utilitaires
  const getProjectDescription = (project) => {
    return project.Resume || extractFirstParagraph(project.Description) || 'Description du projet'
  }

  const getProjectImage = (project) => {
    if (project.Imageprincipale?.url) {
      return getStrapiMediaUrl(project.Imageprincipale.url)
    }
    if (project.Imageprincipale?.formats?.medium?.url) {
      return getStrapiMediaUrl(project.Imageprincipale.formats.medium.url)
    }
    return '/images/projects/default-project.jpg'
  }

  const getProjectTechnologies = (project) => {
    if (!project.technologies) return []
    
    if (Array.isArray(project.technologies)) {
      return project.technologies.map(tech => 
        typeof tech === 'string' ? tech : tech.nom || tech.name || 'Tech'
      )
    }
    
    return []
  }

  if (isLoading) {
    return (
      <section id="portfolio" className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
        <div className="container">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple mx-auto"></div>
            <p className="mt-4 text-gray-600">Chargement des projets...</p>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section id="portfolio" className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
        <div className="container">
          <div className="text-center">
            <p className="text-red-600">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 px-6 py-2 bg-purple text-white rounded-lg hover:bg-purple/90 transition-colors"
            >
              Réessayer
            </button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <motion.section 
      id="portfolio" 
      ref={containerRef}
      style={{ opacity: containerOpacity }}
      className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden"
    >
      {/* Particules d'arrière-plan */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle, index) => (
          <motion.div
            key={index}
            className="absolute w-1 h-1 bg-gradient-to-r from-purple/30 to-transparent rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3],
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

      <motion.div className="container relative z-10">
        {/* En-tête de section */}
        <div className="text-center mb-16">
          <motion.h2
            ref={titleRef}
            initial={{ opacity: 0, y: 50 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-3xl md:text-4xl font-bold mb-6"
          >
            Notre <span className="text-purple">Portfolio</span>
          </motion.h2>
          
          <motion.p
            ref={descRef}
            initial={{ opacity: 0, y: 30 }}
            animate={descInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-lg text-gray-600 max-w-3xl mx-auto mb-12"
          >
            Découvrez nos réalisations et projets qui illustrent notre expertise 
            dans le développement de solutions digitales innovantes.
          </motion.p>

          {/* Filtres par catégorie */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={descInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  activeFilter === category
                    ? 'bg-purple text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-purple/10 hover:text-purple border border-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>
        </div>
        
        {/* Grille de projets */}
        <motion.div
          ref={projectsRef}
          variants={containerVariants}
          initial="hidden"
          animate={projectsInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.slice(0, 6).map((project, index) => {
            const projectImage = getProjectImage(project)
            const projectDescription = getProjectDescription(project)
            const projectTechnologies = getProjectTechnologies(project)
            
            return (
              <motion.div
                key={project.id || index}
                variants={itemVariants}
                className="group"
              >
                <Link href={`/projets/${project.slug}`}>
                  <motion.div 
                    className={`bg-gradient-to-br ${getCardColor(index)} backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-xl hover:-translate-y-2 h-full cursor-pointer`}
                  >
                    {/* Image du projet */}
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={projectImage}
                        alt={project.Titre || 'Projet'}
                        fill
                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      
                      {/* Badge catégorie */}
                      {project.Categorie && (
                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-gray-700">
                          {project.Categorie}
                        </div>
                      )}
                    </div>
                    
                    {/* Contenu de la carte */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-3 group-hover:text-purple transition-colors duration-300">
                        {project.Titre || 'Projet'}
                      </h3>
                      
                      {/* Ligne décorative */}
                      <div className="h-0.5 w-12 bg-gradient-to-r from-purple via-blue to-red mb-4 opacity-60 group-hover:w-20 transition-all duration-300"></div>
                      
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                        {projectDescription}
                      </p>
                      
                      {/* Client */}
                      {project.Client && (
                        <p className="text-xs text-gray-500 mb-3 font-medium">
                          Client: {project.Client}
                        </p>
                      )}
                      
                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2">
                        {projectTechnologies.slice(0, 3).map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="text-xs px-2 py-1 bg-white/70 text-gray-700 rounded-full border border-gray-200"
                          >
                            {tech}
                          </span>
                        ))}
                        {projectTechnologies.length > 3 && (
                          <span className="text-xs px-2 py-1 bg-white/70 text-gray-500 rounded-full border border-gray-200">
                            +{projectTechnologies.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>
        
        {/* Message si aucun projet */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              Aucun projet trouvé pour cette catégorie.
            </p>
          </div>
        )}
        
        {/* Bouton "Explorer Tous Nos Projets" */}
        <div className="text-center mt-16">
          <CTAButton 
            href="/projets" 
            className="mx-auto inline-flex items-center justify-center"
          >
            Explorer Tous Nos Projets
          </CTAButton>
        </div>
      </motion.div>
    </motion.section>
  )
}

export default Portfolio