'use client'

import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import CTAButton from '@/components/CTAButton'
import { generateParticles } from '@/components/background/GridUtils'
import ConnectionLines from '@/components/background/ConnectionLines'

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
  
  // Simulation d'un chargement depuis une API
  const [hasScrolled, setHasScrolled] = useState(false)
  const [activeFilter, setActiveFilter] = useState('Tous')
  const [filteredProjects, setFilteredProjects] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState(null)
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset
      if (scrollTop < (hasScrolled ? window.innerHeight * 0.5 : window.innerHeight)) {
        setHasScrolled(true)
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [hasScrolled])
  
  // Couleurs des cartes - progression subtile
  const getCardColor = (index) => {
    // Créer une progression plus subtile et élégante entre les couleurs
    switch (index % 5) {
      case 0: return "from-purple/20 to-purple/5";
      case 1: return "from-blue/20 to-blue/5";
      case 2: return "from-red/20 to-red/5";
      case 3: return "from-purple/20 to-blue/5";
      case 4: return "from-blue/20 to-red/5";
      default: return "from-purple/20 to-purple/5";
    }
  };
  
  const projects = [
    {
      id: 1,
      title: 'Site E-commerce SMCI',
      category: 'E-commerce',
      image: 'https://picsum.photos/600/400?random=1',
      description: 'Plateforme e-commerce pour la Société Mauritanienne de Commerce International.',
      technologies: ['Next.js', 'Tailwind', 'Stripe'],
      featured: true,
      size: 'large'
    },
    {
      id: 2,
      title: 'Application Mobile Nouadhibou Pêche',
      category: 'Application Mobile',
      image: 'https://picsum.photos/600/400?random=2',
      description: 'Application permettant aux pêcheurs de suivre les prix du marché en temps réel.',
      technologies: ['React Native', 'Firebase', 'Redux'],
      featured: true,
      size: 'medium'
    },
    {
      id: 3,
      title: 'Dashboard Administratif',
      category: 'Web App',
      image: 'https://picsum.photos/600/400?random=3',
      description: 'Panneau d\'administration sur mesure pour une entreprise locale.',
      technologies: ['Vue.js', 'Node.js', 'MongoDB'],
      featured: true,
      size: 'medium'
    },
    {
      id: 4,
      title: 'Boutique en ligne Mauritanie Artisanat',
      category: 'E-commerce',
      image: 'https://picsum.photos/600/400?random=4',
      description: 'Plateforme de vente en ligne pour les artisans mauritaniens.',
      technologies: ['WordPress', 'WooCommerce', 'Elementor'],
      size: 'small'
    },
    {
      id: 5,
      title: 'Site vitrine Banque BNM',
      category: 'Site Web',
      image: 'https://picsum.photos/600/400?random=5',
      description: 'Site institutionnel moderne pour la Banque Nationale de Mauritanie.',
      technologies: ['Next.js', 'TypeScript', 'Framer Motion'],
      size: 'medium'
    },
    {
      id: 6,
      title: 'Application de livraison Nouakchott Express',
      category: 'Application Mobile',
      image: 'https://picsum.photos/600/400?random=6',
      description: 'Service de livraison à domicile pour les restaurants et commerces de Nouakchott.',
      technologies: ['Flutter', 'Firebase', 'Stripe'],
      featured: true,
      size: 'small'
    }
  ]
  
  useEffect(() => {
    setFilteredProjects(projects)
  }, [])
  
  // Filtrer les projets par catégorie
  const filterByCategory = (category) => {
    setActiveFilter(category)
    if (category === 'Tous') {
      setFilteredProjects(projects)
    } else {
      setFilteredProjects(projects.filter(project => project.category === category))
    }
  }
  
  // Obtenir les catégories uniques
  const categories = ['Tous', ...Array.from(new Set(projects.map(project => project.category)))]
  
  // Animation variants qui fonctionnent
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

  // Style personnalisé pour les animations et les gradients
  const customStyles = `
    
    @keyframes gradientMove {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    
    .animate-gradient-shift {
      animation: gradientMove 4s ease infinite;
    }
    
    .bg-gradient-text {
      background-image: linear-gradient(45deg, #3498db, #9b59b6, #e74c3c);
    }
    
    @keyframes float-1 {
      0%, 100% { transform: translateY(0) rotate(0); }
      50% { transform: translateY(-20px) rotate(5deg); }
    }
    
    @keyframes float-2 {
      0%, 100% { transform: translateY(0) rotate(0); }
      50% { transform: translateY(20px) rotate(-5deg); }
    }
    
    @keyframes float-3 {
      0%, 100% { transform: translate(-50%, -50%) scale(1); }
      50% { transform: translate(-50%, -50%) scale(1.1); }
    }
    
    .animate-float-1 {
      animation: float-1 15s ease-in-out infinite;
    }
    
    .animate-float-2 {
      animation: float-2 18s ease-in-out infinite;
    }
    
    .animate-float-3 {
      animation: float-3 20s ease-in-out infinite;
    }
  `;

  return (
    <section 
      id="portfolio" 
      ref={containerRef}
      className="py-32 relative overflow-hidden"
    >
      <style jsx>{customStyles}</style>
      
      {/* Arrière-plan élaboré */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {/* Lignes de connexion fluides */}
        <ConnectionLines color="purple" animate={true} />
        
        {/* Éléments de fond animés */}
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-purple/10 rounded-full blur-3xl animate-float-1"></div>
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-blue/10 rounded-full blur-3xl animate-float-2"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-5xl max-h-5xl bg-gradient-to-br from-purple/5 via-blue/5 to-red/5 rounded-full blur-3xl opacity-50 animate-float-3"></div>
        
        {/* Particules */}
        {particles.map((particle, index) => (
          <motion.div
            key={`particle-${index}`}
            className="absolute rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              backgroundColor: particle.color === 'purple' ? 'rgba(155, 89, 182, 0.3)' : 
                              particle.color === 'blue' ? 'rgba(52, 152, 219, 0.3)' : 
                                                      'rgba(231, 76, 60, 0.3)'
            }}
            animate={{
              x: [0, Math.random() * 20 - 10, 0],
              y: [0, Math.random() * 20 - 10, 0],
              opacity: [0, particle.size / 3, 0],
              scale: [0, 1, 0]
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: particle.delay
            }}
          />
        ))}
        
        {/* Grille de fond subtile */}
        <div className="absolute inset-0 opacity-5">
          <svg width="100%" height="100%">
            <pattern id="portfolioHoneycomb" width="56" height="100" patternUnits="userSpaceOnUse">
              <path 
                d="M28 0L56 25L56 75L28 100L0 75L0 25Z" 
                stroke="rgba(155, 89, 182, 0.8)" 
                strokeWidth="1" 
                fill="none" 
              />
            </pattern>
            <rect width="100%" height="100%" fill="url(#portfolioHoneycomb)" />
          </svg>
        </div>
      </div>
      
      <motion.div 
        className="container relative z-10"
        style={{ opacity: containerOpacity }}
      >
        <motion.h2
          ref={titleRef}
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-extrabold mb-6 text-center"
        >
          Notre <span className="gradient-text bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-shift">Portfolio</span>
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
        
        {/* Filtres de catégories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={descInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          {categories.map((category, index) => (
            <motion.button
              key={index}
              onClick={() => filterByCategory(category)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all relative ${
                activeFilter === category
                  ? 'text-white shadow-lg' 
                  : 'bg-white/80 text-gray-600 hover:bg-gray-100'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {activeFilter === category && (
                <motion.span
                  layoutId="activeCategory"
                  className="absolute inset-0 bg-purple-600 rounded-full -z-10"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                />
              )}
              {category}
            </motion.button>
          ))}
        </motion.div>
        
        {/* Grille asymétrique avec design plus élégant */}
        <motion.div
          ref={projectsRef}
          variants={containerVariants}
          initial="hidden"
          animate={projectsInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-12 gap-8"
        >
          {/* Section Projets Vedettes - Disposition asymétrique distincte */}
          {filteredProjects.filter(project => project.featured).map((project, index) => {
            let colSpan;
            
            // Première rangée avec disposition asymétrique
            if (index === 0) {
              colSpan = "md:col-span-8"; // Premier projet en vedette (large)
            } else if (index === 1) {
              colSpan = "md:col-span-4"; // Deuxième projet
            } else if (index === 2) {
              colSpan = "md:col-span-6"; // Troisième projet
            } else {
              colSpan = "md:col-span-6"; // Autres projets
            }
            
            return (
              <motion.div
                key={`featured-${project.id}`}
                variants={itemVariants}
                className={`group ${colSpan}`}
              >
                <motion.div 
                  className={`bg-gradient-to-br ${getCardColor(index)} backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 h-full`}
                  whileHover={{ 
                    y: -8,
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                  }}
                >
                  {/* Image avec overlay et badges */}
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                      <span className="inline-block px-3 py-1 text-sm bg-white/90 text-purple font-medium rounded-full shadow-md">
                        {project.category}
                      </span>
                    </div>
                    
                    <div className="absolute bottom-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                      <a href="#" className="p-2 bg-white/90 text-purple hover:text-blue rounded-full shadow-md transition-colors duration-300">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                        </svg>
                      </a>
                      <a href="#" className="p-2 bg-white/90 text-purple hover:text-blue rounded-full shadow-md transition-colors duration-300">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                        </svg>
                      </a>
                    </div>
                  </div>
                  
                  {/* Contenu de la carte */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3 group-hover:text-purple transition-colors duration-300">
                      {project.title}
                    </h3>
                    
                    <div className="h-0.5 w-12 bg-gradient-to-r from-purple via-blue to-red mb-4 opacity-60 group-hover:w-20 transition-all duration-300"></div>
                    
                    <p className="text-gray-600 mb-6 line-clamp-3">{project.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {project.technologies.map((tech, index) => (
                        <span 
                          key={index} 
                          className="text-xs px-3 py-1 bg-gray-100 text-gray-700 rounded-full transition-colors duration-300 hover:bg-purple/10 hover:text-purple"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
          
          {/* Projets réguliers avec disposition asymétrique plus subtile */}
          {filteredProjects.filter(project => !project.featured).map((project, index) => {
            // Disposition asymétrique pour les projets non vedettes
            let colSpan;
            const actualIndex = index + filteredProjects.filter(p => p.featured).length;
            
            if (index % 3 === 0) {
              colSpan = "md:col-span-5"; 
            } else if (index % 3 === 1) {
              colSpan = "md:col-span-7";
            } else {
              colSpan = "md:col-span-12 md:h-64";
            }
            
            return (
              <motion.div
                key={`regular-${project.id}`}
                variants={itemVariants}
                className={`group ${colSpan}`}
              >
                <motion.div 
                  className={`bg-gradient-to-br ${getCardColor(actualIndex)} backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-xl hover:-translate-y-2 h-full group`}
                  animate={{ 
                    background: [
                      `linear-gradient(135deg, rgba(155, 89, 182, 0.2), rgba(155, 89, 182, 0.05))`,
                      `linear-gradient(135deg, rgba(52, 152, 219, 0.2), rgba(52, 152, 219, 0.05))`,
                      `linear-gradient(135deg, rgba(231, 76, 60, 0.2), rgba(231, 76, 60, 0.05))`,
                      `linear-gradient(135deg, rgba(155, 89, 182, 0.2), rgba(155, 89, 182, 0.05))`
                    ]
                  }}
                  transition={{ 
                    duration: 20, 
                    ease: "linear", 
                    repeat: Infinity,
                    delay: index * 3 // Décalage entre les cartes
                  }}
                >
                  {/* Contenu différent en fonction de la taille */}
                  {index % 3 === 2 ? (
                    // Projet horizontal
                    <div className="flex h-full">
                      <div className="relative w-1/3 md:w-1/4">
                        <div className="absolute inset-0">
                          <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            className="object-cover"
                            sizes="33vw"
                            unoptimized
                          />
                          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                      </div>
                      <div className="p-6 flex-1 flex flex-col justify-center">
                        <span className="inline-block px-3 py-1 text-xs bg-purple/10 text-purple font-medium rounded-full mb-3">
                          {project.category}
                        </span>
                        <h3 className="text-xl font-bold mb-3 group-hover:text-purple transition-colors duration-300">
                          {project.title}
                        </h3>
                        <div className="h-0.5 w-12 bg-gradient-to-r from-purple via-blue to-red mb-4 opacity-60 group-hover:w-20 transition-all duration-300"></div>
                        <p className="text-gray-600 mb-4 line-clamp-2">{project.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech, techIndex) => (
                            <span 
                              key={techIndex} 
                              className="text-xs px-2 py-0.5 bg-gray-100 text-gray-700 rounded-full"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
                      {/* Image avec overlay et badges */}
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          unoptimized
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        
                        <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                          <span className="inline-block px-3 py-1 text-sm bg-white/90 text-purple font-medium rounded-full shadow-md">
                            {project.category}
                          </span>
                        </div>
                        
                        <div className="absolute bottom-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                          <a href="#" className="p-2 bg-white/90 text-purple hover:text-blue rounded-full shadow-md transition-colors duration-300">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                            </svg>
                          </a>
                        </div>
                      </div>
                      
                      {/* Contenu de la carte */}
                      <div className="p-5">
                        <h3 className="text-lg font-bold mb-2 group-hover:text-purple transition-colors duration-300">
                          {project.title}
                        </h3>
                        
                        <div className="h-0.5 w-10 bg-gradient-to-r from-purple via-blue to-red mb-3 opacity-60 group-hover:w-16 transition-all duration-300"></div>
                        
                        <p className="text-gray-600 mb-4 line-clamp-2 text-sm">{project.description}</p>
                        
                        <div className="flex flex-wrap gap-1.5">
                          {project.technologies.slice(0, 2).map((tech, techIndex) => (
                            <span 
                              key={techIndex} 
                              className="text-xs px-2 py-0.5 bg-gray-100 text-gray-700 rounded-full"
                            >
                              {tech}
                            </span>
                          ))}
                          {project.technologies.length > 2 && (
                            <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-700 rounded-full">
                              +{project.technologies.length - 2}
                            </span>
                          )}
                        </div>
                      </div>
                    </>
                  )}
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
        
        {/* Bouton "Explorer Tous Nos Projets" */}
        <div className="text-center mt-16">
          <CTAButton 
            href="/portfolio" 
            className="mx-auto inline-flex items-center justify-center space-x-3"
          >
            Explorer Tous Nos Projets
          </CTAButton>
        </div>
      </motion.div>
    </section>
  )
}

export default Portfolio