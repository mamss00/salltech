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
  
  // États
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
      featured: true
    },
    {
      id: 2,
      title: 'Application Mobile Nouadhibou Pêche',
      category: 'Application Mobile',
      image: 'https://picsum.photos/600/400?random=2',
      description: 'Application permettant aux pêcheurs de suivre les prix du marché en temps réel.',
      technologies: ['React Native', 'Firebase', 'Redux'],
      featured: true
    },
    {
      id: 3,
      title: 'Dashboard Administratif',
      category: 'Web App',
      image: 'https://picsum.photos/600/400?random=3',
      description: 'Panneau d\'administration sur mesure pour une entreprise locale.',
      technologies: ['Vue.js', 'Node.js', 'MongoDB'],
      featured: true
    },
    {
      id: 4,
      title: 'Boutique en ligne Mauritanie Artisanat',
      category: 'E-commerce',
      image: 'https://picsum.photos/600/400?random=4',
      description: 'Plateforme de vente en ligne pour les artisans mauritaniens.',
      technologies: ['WordPress', 'WooCommerce', 'Elementor']
    },
    {
      id: 5,
      title: 'Site vitrine Banque BNM',
      category: 'Site Web',
      image: 'https://picsum.photos/600/400?random=5',
      description: 'Site institutionnel moderne pour la Banque Nationale de Mauritanie.',
      technologies: ['Next.js', 'TypeScript', 'Framer Motion']
    },
    {
      id: 6,
      title: 'Application de livraison Nouakchott Express',
      category: 'Application Mobile',
      image: 'https://picsum.photos/600/400?random=6',
      description: 'Service de livraison à domicile pour les restaurants et commerces de Nouakchott.',
      technologies: ['Flutter', 'Firebase', 'Stripe'],
      featured: true
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
    
    @keyframes dots-pulse {
      0%, 100% { opacity: 0; }
      50% { opacity: 1; }
    }
    
    .grid-masonry {
      display: grid;
      grid-template-columns: repeat(12, 1fr);
      grid-auto-rows: minmax(100px, auto);
      gap: 2rem;
    }
    
    @media (max-width: 768px) {
      .grid-masonry {
        display: flex;
        flex-direction: column;
        gap: 2rem;
      }
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
        
        {/* Layout asymétrique avec une vraie disposition masonry */}
        <motion.div
          ref={projectsRef}
          variants={containerVariants}
          initial="hidden"
          animate={projectsInView ? "visible" : "hidden"}
          className="grid-masonry"
        >
          {/* Premier projet - Grande taille */}
          {filteredProjects.length > 0 && (
            <motion.div
              variants={itemVariants}
              className="group col-span-12 md:col-span-8 md:row-span-2 md:col-start-1 md:row-start-1"
            >
              <motion.div 
                className={`bg-gradient-to-br ${getCardColor(0)} backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-xl hover:-translate-y-2 h-full`}
                whileHover={{ 
                  y: -8,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                }}
              >
                {/* Image avec overlay et badges */}
                <div className="relative h-64 md:h-96 overflow-hidden">
                  <Image
                    src={filteredProjects[0].image}
                    alt={filteredProjects[0].title}
                    fill
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 66vw"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                    <span className="inline-block px-3 py-1 text-sm bg-white/90 text-purple font-medium rounded-full shadow-md">
                      {filteredProjects[0].category}
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
                <div className="p-6 md:p-8">
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-purple transition-colors duration-300">
                    {filteredProjects[0].title}
                  </h3>
                  
                  <div className="h-0.5 w-16 bg-gradient-to-r from-purple via-blue to-red mb-4 opacity-60 group-hover:w-24 transition-all duration-300"></div>
                  
                  <p className="text-gray-600 mb-6 md:text-lg">{filteredProjects[0].description}</p>
                  
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {filteredProjects[0].technologies.map((tech, index) => (
                      <span 
                        key={index} 
                        className="text-sm px-3 py-1 bg-gray-100 text-gray-700 rounded-full transition-colors duration-300 hover:bg-purple/10 hover:text-purple"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
          
          {/* Deuxième projet - taille moyenne, à droite du premier */}
          {filteredProjects.length > 1 && (
            <motion.div
              variants={itemVariants}
              className="group col-span-12 md:col-span-4 md:row-span-2 md:col-start-9 md:row-start-1"
            >
              <motion.div 
                className={`bg-gradient-to-br ${getCardColor(1)} backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-xl hover:-translate-y-2 h-full`}
              >
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={filteredProjects[1].image}
                    alt={filteredProjects[1].title}
                    fill
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                    <span className="inline-block px-3 py-1 text-sm bg-white/90 text-blue font-medium rounded-full shadow-md">
                      {filteredProjects[1].category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6 flex flex-col h-[calc(100%-14rem)]">
                  <h3 className="text-xl font-bold mb-3 group-hover:text-blue transition-colors duration-300">
                    {filteredProjects[1].title}
                  </h3>
                  
                  <div className="h-0.5 w-12 bg-gradient-to-r from-purple via-blue to-red mb-4 opacity-60 group-hover:w-20 transition-all duration-300"></div>
                  
                  <p className="text-gray-600 mb-6 flex-grow">{filteredProjects[1].description}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    {filteredProjects[1].technologies.map((tech, index) => (
                      <span 
                        key={index} 
                        className="text-xs px-3 py-1 bg-gray-100 text-gray-700 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
          
          {/* Troisième projet - horizontal en dessous du premier et deuxième */}
          {filteredProjects.length > 2 && (
            <motion.div
              variants={itemVariants}
              className="group col-span-12 md:col-span-12 md:col-start-1 md:row-start-3"
            >
              <motion.div 
                className={`bg-gradient-to-br ${getCardColor(2)} backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-xl hover:-translate-y-2 h-full`}
              >
                <div className="flex flex-col md:flex-row h-full">
                  <div className="md:w-1/3 relative">
                    <div className="h-48 md:h-full relative">
                      <Image
                        src={filteredProjects[2].image}
                        alt={filteredProjects[2].title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                        unoptimized
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </div>
                  
                  <div className="p-6 md:w-2/3 flex flex-col justify-center">
                    <span className="inline-block px-3 py-1 text-sm w-fit bg-red/10 text-red font-medium rounded-full mb-4">
                      {filteredProjects[2].category}
                    </span>
                    
                    <h3 className="text-2xl font-bold mb-3 group-hover:text-red transition-colors duration-300">
                      {filteredProjects[2].title}
                    </h3>
                    
                    <div className="h-0.5 w-16 bg-gradient-to-r from-purple via-blue to-red mb-4 opacity-60 group-hover:w-24 transition-all duration-300"></div>
                    
                    <p className="text-gray-600 mb-6">{filteredProjects[2].description}</p>
                    
                    <div className="flex flex-wrap gap-2">
                      {filteredProjects[2].technologies.map((tech, index) => (
                        <span 
                          key={index} 
                          className="text-sm px-3 py-1 bg-gray-100 text-gray-700 rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
          
          {/* Quatrième projet - petit, en dessous du troisième côté gauche */}
          {filteredProjects.length > 3 && (
            <motion.div
              variants={itemVariants}
              className="group col-span-12 md:col-span-4 md:col-start-1 md:row-start-4"
            >
              <motion.div 
                className={`bg-gradient-to-br ${getCardColor(3)} backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-xl hover:-translate-y-2 h-full`}
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={filteredProjects[3].image}
                    alt={filteredProjects[3].title}
                    fill
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                <div className="p-5">
                  <h3 className="text-lg font-bold mb-2 group-hover:text-purple transition-colors duration-300">
                    {filteredProjects[3].title}
                  </h3>
                  
                  <div className="h-0.5 w-10 bg-gradient-to-r from-purple via-blue to-red mb-3 opacity-60 group-hover:w-16 transition-all duration-300"></div>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{filteredProjects[3].description}</p>
                  
                  <div className="flex flex-wrap gap-1.5">
                    {filteredProjects[3].technologies.slice(0, 2).map((tech, index) => (
                      <span 
                        key={index} 
                        className="text-xs px-2 py-0.5 bg-gray-100 text-gray-700 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                    {filteredProjects[3].technologies.length > 2 && (
                      <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-700 rounded-full">
                        +{filteredProjects[3].technologies.length - 2}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
          
          {/* Cinquième projet - moyen, au milieu */}
          {filteredProjects.length > 4 && (
            <motion.div
              variants={itemVariants}
              className="group col-span-12 md:col-span-4 md:col-start-5 md:row-start-4 md:row-span-2"
            >
              <motion.div 
                className={`bg-gradient-to-br ${getCardColor(4)} backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-xl hover:-translate-y-2 h-full`}
              >
                <div className="relative h-56 md:h-64 overflow-hidden">
                  <Image
                    src={filteredProjects[4].image}
                    alt={filteredProjects[4].title}
                    fill
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                    <span className="inline-block px-3 py-1 text-sm bg-white/90 text-blue font-medium rounded-full shadow-md">
                      {filteredProjects[4].category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold mb-3 group-hover:text-blue transition-colors duration-300">
                    {filteredProjects[4].title}
                  </h3>
                  
<div className="h-0.5 w-12 bg-gradient-to-r from-purple via-blue to-red mb-4 opacity-60 group-hover:w-20 transition-all duration-300"></div>
                  
                  <p className="text-gray-600 mb-6 flex-grow">{filteredProjects[4].description}</p>
                  
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {filteredProjects[4].technologies.map((tech, index) => (
                      <span 
                        key={index} 
                        className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
          
          {/* Sixième projet - à droite */}
          {filteredProjects.length > 5 && (
            <motion.div
              variants={itemVariants}
              className="group col-span-12 md:col-span-4 md:col-start-9 md:row-start-4"
            >
              <motion.div 
                className={`bg-gradient-to-br ${getCardColor(5)} backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-xl hover:-translate-y-2 h-full`}
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={filteredProjects[5].image}
                    alt={filteredProjects[5].title}
                    fill
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                    <span className="inline-block px-3 py-1 text-sm bg-white/90 text-red font-medium rounded-full shadow-md">
                      {filteredProjects[5].category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-lg font-bold mb-2 group-hover:text-red transition-colors duration-300">
                    {filteredProjects[5].title}
                  </h3>
                  
                  <div className="h-0.5 w-10 bg-gradient-to-r from-purple via-blue to-red mb-3 opacity-60 group-hover:w-16 transition-all duration-300"></div>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">{filteredProjects[5].description}</p>
                  
                  <div className="flex flex-wrap gap-1.5">
                    {filteredProjects[5].technologies.slice(0, 2).map((tech, index) => (
                      <span 
                        key={index} 
                        className="text-xs px-2 py-0.5 bg-gray-100 text-gray-700 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                    {filteredProjects[5].technologies.length > 2 && (
                      <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-700 rounded-full">
                        +{filteredProjects[5].technologies.length - 2}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
          
          {/* Projet supplémentaire - en bas à gauche */}
          {filteredProjects.length > 6 && (
            <motion.div
              variants={itemVariants}
              className="group col-span-12 md:col-span-4 md:col-start-1 md:row-start-5"
            >
              <motion.div 
                className={`bg-gradient-to-br from-blue/20 to-purple/5 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-xl hover:-translate-y-2 h-full`}
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={filteredProjects[6].image}
                    alt={filteredProjects[6].title}
                    fill
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                <div className="p-5">
                  <h3 className="text-lg font-bold mb-2 group-hover:text-blue transition-colors duration-300">
                    {filteredProjects[6].title}
                  </h3>
                  
                  <div className="h-0.5 w-10 bg-gradient-to-r from-purple via-blue to-red mb-3 opacity-60 group-hover:w-16 transition-all duration-300"></div>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{filteredProjects[6].description}</p>
                  
                  <div className="flex flex-wrap gap-1.5">
                    {filteredProjects[6].technologies.slice(0, 2).map((tech, index) => (
                      <span 
                        key={index} 
                        className="text-xs px-2 py-0.5 bg-gray-100 text-gray-700 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
          
          {/* Projet supplémentaire - en bas à droite */}
          {filteredProjects.length > 7 && (
            <motion.div
              variants={itemVariants}
              className="group col-span-12 md:col-span-3 md:col-start-9 md:row-start-5"
            >
              <motion.div 
                className={`bg-gradient-to-br from-red/20 to-blue/5 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-xl hover:-translate-y-2 h-full`}
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={filteredProjects[7].image}
                    alt={filteredProjects[7].title}
                    fill
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                <div className="p-5">
                  <h3 className="text-lg font-bold mb-2 group-hover:text-red transition-colors duration-300">
                    {filteredProjects[7].title}
                  </h3>
                  
                  <div className="h-0.5 w-10 bg-gradient-to-r from-purple via-blue to-red mb-3 opacity-60 group-hover:w-16 transition-all duration-300"></div>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{filteredProjects[7].description}</p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </motion.div>
        
        {/* Bouton "Explorer Tous Nos Projets" */}
        <div className="text-center mt-16">
          <CTAButton 
            href="/portfolio" 
            className="mx-auto inline-flex items-center justify-center"
          >
            Explorer Tous Nos Projets
          </CTAButton>
        </div>
      </motion.div>
    </section>
  )
}

export default Portfolio