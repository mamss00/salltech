'use client'

import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import CTAButton from '@/components/CTAButton'
import { generateParticles } from '@/components/background/GridUtils'
import Link from 'next/link'

const EnhancedPortfolio = () => {
  // Refs pour animation
  const [titleRef, titleInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [descRef, descInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [projectsRef, projectsInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const sectionRef = useRef(null)
  
  // État pour les projets et filtres
  const [projects, setProjects] = useState([])
  const [filteredProjects, setFilteredProjects] = useState([])
  const [activeFilter, setActiveFilter] = useState('Tous')
  const [activeProject, setActiveProject] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  
  // Effet de défilement
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })
  
  const sectionOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0.5, 1, 1, 0.5])
  const sectionScale = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0.95, 1, 1, 0.95])
  
  // Pour les particules d'arrière-plan
  const particles = generateParticles(20, 'purple')
  
  // Définition des projets
  useEffect(() => {
    // Simulation d'un chargement depuis une API
    setTimeout(() => {
      const projectsData = [
        {
          id: 1,
          title: 'Site E-commerce SMCI',
          category: 'E-commerce',
          image: 'https://picsum.photos/600/400?random=1',
          description: 'Plateforme e-commerce complète pour la Société Mauritanienne de Commerce International, offrant une expérience d\'achat fluide et sécurisée.',
          technologies: ['Next.js', 'Tailwind CSS', 'Stripe'],
          link: '#',
          featured: true
        },
        {
          id: 2,
          title: 'Application Mobile Nouadhibou Pêche',
          category: 'Application Mobile',
          image: 'https://picsum.photos/600/400?random=2',
          description: 'Application permettant aux pêcheurs de suivre les prix du marché en temps réel et de gérer leurs ventes efficacement.',
          technologies: ['React Native', 'Firebase', 'Redux'],
          link: '#',
          featured: true
        },
        {
          id: 3,
          title: 'Dashboard Administratif',
          category: 'Web App',
          image: 'https://picsum.photos/600/400?random=3',
          description: 'Panneau d\'administration sur mesure pour une entreprise locale avec visualisation de données avancée et rapports personnalisés.',
          technologies: ['Vue.js', 'Node.js', 'MongoDB'],
          link: '#',
          featured: true
        },
        {
          id: 4,
          title: 'Boutique en ligne Mauritanie Artisanat',
          category: 'E-commerce',
          image: 'https://picsum.photos/600/400?random=4',
          description: 'Plateforme de vente en ligne pour les artisans mauritaniens mettant en valeur l\'artisanat local et facilitant l\'accès au marché international.',
          technologies: ['WordPress', 'WooCommerce', 'Elementor'],
          link: '#'
        },
        {
          id: 5,
          title: 'Site vitrine Banque BNM',
          category: 'Site Web',
          image: 'https://picsum.photos/600/400?random=5',
          description: 'Site institutionnel moderne pour la Banque Nationale de Mauritanie avec des fonctionnalités avancées et une interface utilisateur intuitive.',
          technologies: ['Next.js', 'TypeScript', 'Framer Motion'],
          link: '#'
        },
        {
          id: 6,
          title: 'App de livraison Nouakchott Express',
          category: 'Application Mobile',
          image: 'https://picsum.photos/600/400?random=6',
          description: 'Service de livraison à domicile pour les restaurants et commerces de Nouakchott avec suivi en temps réel et paiement intégré.',
          technologies: ['Flutter', 'Firebase', 'Stripe'],
          link: '#',
          featured: true
        }
      ]
      
      setProjects(projectsData)
      setFilteredProjects(projectsData)
      setIsLoading(false)
    }, 1000)
  }, [])
  
  // Filtrer les projets
  const filterProjects = (category) => {
    setActiveFilter(category)
    
    if (category === 'Tous') {
      setFilteredProjects(projects)
      return
    }
    
    const filtered = projects.filter(project => project.category === category)
    setFilteredProjects(filtered)
  }
  
  // Obtenir les catégories uniques
  const categories = ['Tous', ...new Set(projects.map(project => project.category))]
  
  // Variants pour animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  }
  
  const itemVariants = {
    hidden: { y: 30, opacity: 0, scale: 0.9 },
    visible: (i) => ({
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { 
        type: "spring",
        stiffness: 80,
        damping: 12,
        delay: i * 0.1
      }
    })
  }
  
  // Fonction pour obtenir une couleur en fonction de l'index
  const getColorClass = (index) => {
    const colors = [
      { bg: "from-blue/20 to-blue/5", text: "text-blue", accent: "bg-blue" },
      { bg: "from-purple/20 to-purple/5", text: "text-purple", accent: "bg-purple" },
      { bg: "from-red/20 to-red/5", text: "text-red", accent: "bg-red" }
    ]
    return colors[index % colors.length]
  }

  return (
    <section 
      id="portfolio" 
      className="py-32 relative overflow-hidden"
      ref={sectionRef}
    >
      {/* Arrière-plan élaboré */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {/* Cercles décoratifs */}
        <motion.div 
          className="absolute -top-40 right-1/4 w-96 h-96 rounded-full bg-purple/5 blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ 
            duration: 12,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        
        <motion.div 
          className="absolute bottom-20 -left-20 w-72 h-72 rounded-full bg-red/5 blur-3xl"
          animate={{ 
            scale: [1, 1.15, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ 
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 2
          }}
        />
        
        {/* Motif géométrique */}
        <div className="absolute inset-0 opacity-5">
          <svg width="100%" height="100%">
            <pattern id="portfolioPattern" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M20 20L40 20L40 40" stroke="rgba(155, 89, 182, 0.7)" strokeWidth="0.5" fill="none" />
              <path d="M0 0L0 20L20 20" stroke="rgba(155, 89, 182, 0.7)" strokeWidth="0.5" fill="none" />
              <circle cx="20" cy="20" r="1" fill="rgba(155, 89, 182, 0.5)" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#portfolioPattern)" />
          </svg>
        </div>
        
        {/* Particules décoratives */}
        {particles.map((particle, index) => (
          <motion.div
            key={`particle-${index}`}
            className="absolute rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              backgroundColor: index % 3 === 0 ? 'rgba(155, 89, 182, 0.3)' : 
                             index % 3 === 1 ? 'rgba(52, 152, 219, 0.3)' : 
                                              'rgba(231, 76, 60, 0.3)',
            }}
            animate={{
              x: [0, (index % 2 === 0 ? 30 : -30), 0],
              y: [0, (index % 2 === 0 ? -20 : 20), 0],
              opacity: [particle.size / 5, particle.size / 2, particle.size / 5],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <motion.div 
        className="container relative z-10"
        style={{ opacity: sectionOpacity, scale: sectionScale }}
      >
        <motion.h2
          ref={titleRef}
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-extrabold mb-6 text-center"
        >
          Notre <motion.span 
            className="gradient-text"
            animate={{ 
              backgroundPosition: ['0% center', '100% center', '0% center'] 
            }}
            transition={{ 
              duration: 8, 
              ease: 'linear', 
              repeat: Infinity 
            }}
          >
            Portfolio
          </motion.span>
        </motion.h2>
        
        <motion.p
          ref={descRef}
          initial={{ opacity: 0, y: 20 }}
          animate={descInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg text-gray-600 max-w-3xl mx-auto text-center mb-20"
        >
          Découvrez nos réalisations et projets pour des entreprises mauritaniennes
          et internationales qui reflètent notre expertise et notre savoir-faire.
        </motion.p>
        
        {/* Filtre de catégories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={descInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category, index) => (
            <motion.button
              key={category}
              onClick={() => filterProjects(category)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeFilter === category 
                  ? 'bg-purple text-white shadow-lg shadow-purple/20' 
                  : 'bg-white/80 text-gray-600 hover:bg-gray-100'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
              {activeFilter === category && (
                <motion.span
                  layoutId="categoryIndicator"
                  className="absolute inset-0 rounded-full bg-purple -z-10"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </motion.div>
        
        {/* État de chargement */}
        {isLoading ? (
          <div className="flex justify-center items-center h-72">
            <motion.div
              className="relative w-20 h-20"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <motion.span
                className="absolute w-full h-full rounded-full border-2 border-t-transparent border-purple"
                animate={{ 
                  rotate: 360,
                  borderColor: ['rgba(155, 89, 182, 0.3) rgba(155, 89, 182, 0.3) rgba(155, 89, 182, 0.3) transparent', 
                               'rgba(52, 152, 219, 0.3) rgba(52, 152, 219, 0.3) rgba(52, 152, 219, 0.3) transparent',
                               'rgba(155, 89, 182, 0.3) rgba(155, 89, 182, 0.3) rgba(155, 89, 182, 0.3) transparent']
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <motion.span 
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-purple"
                animate={{ 
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            </motion.div>
          </div>
        ) : (
          <motion.div
            ref={projectsRef}
            variants={containerVariants}
            initial="hidden"
            animate={projectsInView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project, index) => {
              const colorClass = getColorClass(index);
              
              return (
                <motion.div
                  key={project.id}
                  custom={index}
                  variants={itemVariants}
                  className="group h-full"
                  onClick={() => setActiveProject(project)}
                >
                  <motion.div 
                    className={`bg-gradient-to-br ${colorClass.bg} backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-xl hover:-translate-y-2 h-full`}
                    whileHover={{ 
                      y: -10, 
                      boxShadow: '0 20px 30px rgba(0, 0, 0, 0.1)',
                    }}
                  >
                    {/* Image avec overlay */}
                    <div className="relative h-56 overflow-hidden">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        unoptimized
                      />
                      
                      {/* Overlay au survol */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      
                      {/* Badge de catégorie */}
                      <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                        <span className="inline-block px-3 py-1 text-sm bg-white/90 text-blue font-medium rounded-full shadow-md">
                          {project.category}
                        </span>
                      </div>
                      
                      {/* Boutons d'action */}
                      <div className="absolute bottom-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                        <a href="#" className="p-2 bg-white/90 text-blue hover:text-purple rounded-full shadow-md transition-colors duration-300">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                          </svg>
                        </a>
                        <a href="#" className="p-2 bg-white/90 text-blue hover:text-purple rounded-full shadow-md transition-colors duration-300">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                          </svg>
                        </a>
                      </div>
                    </div>
                    
                    {/* Contenu de la carte */}
                    <div className="p-6">
                      <h3 className={`text-xl font-bold mb-3 group-hover:${colorClass.text} transition-colors duration-300`}>
                        {project.title}
                      </h3>
                      
                      <div className={`h-0.5 w-12 ${colorClass.accent}/60 mb-4 opacity-60 group-hover:w-20 transition-all duration-300`}></div>
                      
                      <p className="text-gray-600 mb-6 line-clamp-3">{project.description}</p>
                      
                      <div className="flex flex-wrap gap-2 mt-auto">
                        {project.technologies.map((tech, techIndex) => (
                          <span 
                            key={techIndex} 
                            className="text-xs px-3 py-1 bg-gray-100 text-gray-700 rounded-full transition-colors duration-300 hover:bg-blue/10 hover:text-blue"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {/* Lien "Voir le projet" avec animation des points */}
                    <div className="px-6 pb-6 pt-0 mt-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <a href="#" className={`flex items-center ${colorClass.text} font-medium hover:underline transition-all duration-300 group-hover:text-opacity-80`}>
                        <span>Voir le projet</span>
                        <span className="flex items-center ml-2">
                          <span className="dots-container">
                            <span className="dot animate-dot-pulse-1"></span>
                            <span className="dot animate-dot-pulse-2"></span>
                            <span className="dot animate-dot-pulse-3"></span>
                          </span>
                        </span>
                      </a>
                    </div>
                  </motion.div>
                </motion.div>
              )
            })}
          </motion.div>
        )}
        
        {/* Modal de projet */}
        <AnimatePresence>
          {activeProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 sm:p-8"
              onClick={() => setActiveProject(null)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="bg-white rounded-2xl max-w-4xl max-h-[90vh] overflow-auto shadow-2xl"
                onClick={e => e.stopPropagation()}
              >
                <div className="relative aspect-video">
                  <Image
                    src={activeProject.image}
                    alt={activeProject.title}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <span className="inline-block px-3 py-1 bg-white/90 text-purple rounded-full text-sm font-medium shadow-md mb-4">
                      {activeProject.category}
                    </span>
                    <h3 className="text-3xl font-bold text-white mb-2">{activeProject.title}</h3>
                    <div className="h-1 w-16 bg-gradient-to-r from-blue via-purple to-red rounded-full mb-4"></div>
                  </div>
                  
                  <button 
                    className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-colors duration-300"
                    onClick={() => setActiveProject(null)}
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </button>
                </div>
                
                <div className="p-8">
                  <p className="text-gray-700 text-lg mb-6">{activeProject.description}</p>
                  
                  <h4 className="text-lg font-semibold mb-3">Technologies utilisées</h4>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {activeProject.technologies.map((tech, techIndex) => (
                      <span 
                        key={techIndex} 
                        className="px-3 py-1.5 rounded-full bg-purple/10 text-purple text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex justify-end mt-6">
                    <a 
                      href={activeProject.link} 
                      className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue via-purple to-red text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <span>Voir le projet</span>
                      <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                      </svg>
                    </a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Bouton "Explorer Tous Nos Projets" */}
        <div className="text-center mt-16">
          <CTAButton 
            href="#" 
            className="mx-auto inline-flex items-center justify-center space-x-3"
          >
            Explorer Tous Nos Projets
          </CTAButton>
        </div>
      </motion.div>
    </section>
  )
}

export default EnhancedPortfolio