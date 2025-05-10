'use client'

import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import CTAButton from '@/components/CTAButton'
import { generateParticles } from '@/components/background/GridUtils'

const EnhancedPortfolio = () => {
  // Refs pour animation
  const [titleRef, titleInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [descRef, descInView] = useInView({ triggerOnce: true, threshold: 0.1 })
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
  
  // Fonction pour obtenir une configuration de couleur unique par projet
  const getProjectStyle = (index) => {
    const styles = [
      { 
        gradient: "from-purple-500/20 to-purple-600/5",
        textColor: "text-purple-600",
        accentColor: "bg-purple-500" 
      },
      { 
        gradient: "from-blue-500/20 to-blue-600/5",
        textColor: "text-blue-600", 
        accentColor: "bg-blue-500" 
      },
      { 
        gradient: "from-red-500/20 to-red-600/5",
        textColor: "text-red-500", 
        accentColor: "bg-red-500" 
      },
      { 
        gradient: "from-amber-500/20 to-amber-600/5",
        textColor: "text-amber-600", 
        accentColor: "bg-amber-500" 
      },
      { 
        gradient: "from-emerald-500/20 to-emerald-600/5",
        textColor: "text-emerald-600", 
        accentColor: "bg-emerald-500" 
      },
      { 
        gradient: "from-pink-500/20 to-pink-600/5",
        textColor: "text-pink-500", 
        accentColor: "bg-pink-500" 
      }
    ]
    
    return styles[index % styles.length]
  }

  return (
    <section 
      id="portfolio" 
      className="py-24 lg:py-32 relative overflow-hidden"
      ref={sectionRef}
    >
      {/* Arrière-plan élaboré spécifique au portfolio */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Fond principal avec gradient spécifique au portfolio - plus artistique */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-purple-50/30 to-gray-50/80 opacity-80"></div>
        
        {/* Cercles décoratifs avec positions et tailles variées */}
        <motion.div 
          className="absolute -top-40 right-1/4 w-96 h-96 rounded-full"
          style={{ 
            background: "radial-gradient(circle, rgba(155, 89, 182, 0.15) 0%, rgba(155, 89, 182, 0) 70%)"
          }}
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
          className="absolute bottom-20 -left-20 w-72 h-72 rounded-full"
          style={{ 
            background: "radial-gradient(circle, rgba(231, 76, 60, 0.1) 0%, rgba(231, 76, 60, 0) 70%)"
          }}
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
        
        <motion.div 
          className="absolute top-1/3 left-0 w-64 h-64 rounded-full"
          style={{ 
            background: "radial-gradient(circle, rgba(52, 152, 219, 0.1) 0%, rgba(52, 152, 219, 0) 70%)"
          }}
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ 
            duration: 14,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 4
          }}
        />
        
        {/* Motif géométrique hexagonal unique au portfolio */}
        <div className="absolute inset-0 opacity-[0.03]">
          <svg width="100%" height="100%">
            <pattern id="portfolioPattern" width="56" height="100" patternUnits="userSpaceOnUse" patternTransform="scale(0.8) rotate(0)">
              <path 
                d="M28 0L56 25L56 75L28 100L0 75L0 25Z" 
                stroke="rgba(155, 89, 182, 0.7)" 
                strokeWidth="1" 
                fill="none" 
              />
            </pattern>
            <rect width="100%" height="100%" fill="url(#portfolioPattern)" />
          </svg>
        </div>
        
        {/* Particules décoratives avec mouvements uniques */}
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
              boxShadow: index % 5 === 0 ? '0 0 5px rgba(155, 89, 182, 0.5)' : 'none'
            }}
            animate={{
              // Trajectoires curvilinéaires uniques pour le portfolio
              x: [0, 
                (index % 2 === 0 ? 50 : -50) * Math.sin(index), 
                0],
              y: [0, 
                (index % 2 === 0 ? -30 : 30) * Math.cos(index), 
                0],
              opacity: [particle.size / 5, particle.size / 2, particle.size / 5],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
        
        {/* Lignes connectées dynamiques exclusives au portfolio */}
        <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.04 }}>
          <motion.path
            d="M0,100 C150,50 250,150 400,50 C550,0 650,100 800,50"
            stroke="url(#portfolioGradient)"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 5, ease: "easeInOut", repeat: Infinity, repeatType: "loop", repeatDelay: 2 }}
          >
            <defs>
              <linearGradient id="portfolioGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(155, 89, 182, 0.5)" />
                <stop offset="50%" stopColor="rgba(52, 152, 219, 0.5)" />
                <stop offset="100%" stopColor="rgba(231, 76, 60, 0.5)" />
              </linearGradient>
            </defs>
          </motion.path>
          <motion.path
            d="M800,200 C650,250 550,150 400,250 C250,300 150,200 0,250"
            stroke="url(#portfolioGradient2)"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 6, ease: "easeInOut", repeat: Infinity, repeatType: "loop", repeatDelay: 1 }}
          >
            <defs>
              <linearGradient id="portfolioGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(231, 76, 60, 0.5)" />
                <stop offset="50%" stopColor="rgba(155, 89, 182, 0.5)" />
                <stop offset="100%" stopColor="rgba(52, 152, 219, 0.5)" />
              </linearGradient>
            </defs>
          </motion.path>
        </svg>
      </div>

      <motion.div 
        className="container relative z-10"
        style={{ opacity: sectionOpacity, scale: sectionScale }}
      >
        {/* En-tête section avec animation spéciale */}
        <div className="text-center mb-16 md:mb-20 relative">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-block mb-5"
          >
            <span className="inline-flex items-center px-5 py-2.5 rounded-full relative overflow-hidden shadow-md" style={{ background: "linear-gradient(120deg, rgba(155, 89, 182, 0.1), rgba(155, 89, 182, 0.2), rgba(155, 89, 182, 0.1))" }}>
              <motion.span 
                className="w-2.5 h-2.5 rounded-full bg-purple-500 mr-3 flex-shrink-0"
                animate={{ 
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <span className="text-purple-800 text-sm font-medium tracking-wider uppercase">
                NOS RÉALISATIONS
              </span>
            </span>
          </motion.div>
          
          <motion.h2
            ref={titleRef}
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold mb-6 text-center relative"
          >
            Notre <motion.span
              className="gradient-text bg-clip-text text-transparent inline-block relative"
              style={{ 
                backgroundImage: "linear-gradient(45deg, #9b59b6, #3498db, #e74c3c)" 
              }}
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
              
              {/* Points lumineux décoratifs */}
              <motion.div 
                className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-purple-500/70 shadow-lg shadow-purple-500/20"
                animate={{ 
                  scale: [1, 1.5, 1],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "mirror"
                }}
              />
              <motion.div 
                className="absolute -bottom-1 -left-1 w-1.5 h-1.5 rounded-full bg-blue-500/70 shadow-lg shadow-blue-500/20"
                animate={{ 
                  scale: [1, 1.5, 1],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{ 
                  duration: 2.5,
                  repeat: Infinity,
                  repeatType: "mirror",
                  delay: 1
                }}
              />
            </motion.span>
            
            {/* Ligne décorative animée unique */}
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={titleInView ? { width: "7rem", opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="h-1 mx-auto mt-6 overflow-hidden rounded-full relative"
              style={{ background: "linear-gradient(to right, rgba(155, 89, 182, 0.3), rgba(52, 152, 219, 0.3))" }}
            >
              <motion.div 
                className="absolute inset-0"
                style={{ background: "linear-gradient(to right, #9b59b6, #3498db, #e74c3c)" }}
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
              />
            </motion.div>
          </motion.h2>
          
          <motion.p
            ref={descRef}
            initial={{ opacity: 0, y: 20 }}
            animate={descInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-600 max-w-3xl mx-auto text-center"
          >
            Découvrez nos créations pour des entreprises mauritaniennes et internationales
            qui reflètent notre expertise et notre passion pour l'innovation digitale.
          </motion.p>
        </div>
        
        {/* Nouveau filtre de catégories élégant */}
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
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20' 
                  : 'bg-white/80 text-gray-600 hover:bg-gray-100'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={activeFilter === category ? {
                boxShadow: ['0 10px 15px -3px rgba(155, 89, 182, 0.1), 0 4px 6px -2px rgba(155, 89, 182, 0.05)', 
                            '0 15px 20px -3px rgba(155, 89, 182, 0.2), 0 8px 8px -2px rgba(155, 89, 182, 0.1)',
                            '0 10px 15px -3px rgba(155, 89, 182, 0.1), 0 4px 6px -2px rgba(155, 89, 182, 0.05)']
              } : {}}
              transition={{ duration: 2, repeat: activeFilter === category ? Infinity : 0, repeatType: "reverse" }}
            >
              {category}
              {activeFilter === category && (
                <motion.span
                  layoutId="categoryIndicator"
                  className="absolute inset-0 rounded-full bg-purple-600 -z-10"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </motion.div>
        
        {/* État de chargement élégant */}
        {isLoading ? (
          <div className="flex justify-center items-center h-72">
            <motion.div
              className="relative w-20 h-20"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <motion.span
                className="absolute w-full h-full rounded-full border-2 border-t-transparent border-purple-500"
                animate={{ 
                  rotate: 360,
                  borderColor: ['rgba(155, 89, 182, 0.3) rgba(155, 89, 182, 0.3) rgba(155, 89, 182, 0.3) transparent', 
                               'rgba(52, 152, 219, 0.3) rgba(52, 152, 219, 0.3) rgba(52, 152, 219, 0.3) transparent',
                               'rgba(155, 89, 182, 0.3) rgba(155, 89, 182, 0.3) rgba(155, 89, 182, 0.3) transparent']
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <motion.span 
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-purple-600"
                animate={{ 
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            </motion.div>
          </div>
        ) : (
          <>
            {/* Mise en avant des projets spéciaux - Nouveau design asymétrique */}
            <div className="mb-16">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
              >
                {filteredProjects.filter(project => project.featured).map((project, index) => (
                  <motion.div
                    key={project.id}
                    custom={index}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    className={`group relative ${
                      index === 0 ? 'md:col-span-2 md:row-span-2' : ''
                    }`}
                    onClick={() => setActiveProject(project)}
                    whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  >
                    <div className={`relative h-full rounded-2xl overflow-hidden shadow-lg transition-all duration-500 bg-gradient-to-br ${
                      index === 0 ? 'from-purple-500/20 to-purple-600/5' : getProjectStyle(index).gradient
                    }`}>
                      {/* Image avec effet parallaxe au survol */}
                      <div className={`relative overflow-hidden ${
                        index === 0 ? 'aspect-[16/9] md:aspect-[2/1]' : 'aspect-[4/3]'
                      }`}>
                        <motion.div
                          className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-110"
                          style={{ originY: 0.5 }}
                        >
                          <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            priority={index < 3}
                            unoptimized
                          />
                          
                          {/* Overlay dégradé au survol */}
                          <motion.div 
                            className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-300"
                          />
                        </motion.div>
                        
                        {/* Badge de catégorie */}
                        <motion.div 
                          className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm shadow-md z-10"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 * index + 0.5 }}
                        >
                          <span className={index === 0 ? "text-purple-600" : getProjectStyle(index).textColor}>
                            {project.category}
                          </span>
                        </motion.div>
                        
                        {/* Boutons d'action au survol */}
                        <motion.div 
                          className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
                          initial={{ y: 20 }}
                          whileInView={{ y: 0 }}
                          transition={{ delay: 0.1 }}
                        >
                          <motion.a
                            href={project.link}
                            className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-purple-600 shadow-lg"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </motion.a>
                          <motion.a
                            href={project.link}
                            className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-purple-600 shadow-lg"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </motion.a>
                        </motion.div>
                      </div>
                      
                      {/* Contenu descriptif avec révélation au survol */}
                      <div className="p-6 relative z-10">
                        <h3 className={`text-xl ${index === 0 ? 'md:text-2xl' : ''} font-bold mb-3 group-hover:text-purple-600 transition-colors duration-300`}>
                          {project.title}
                        </h3>
                        
                        {/* Ligne décorative dynamique */}
                        <motion.div 
                          className={`h-0.5 w-12 mb-4 ${index === 0 ? "bg-purple-500/60" : getProjectStyle(index).accentColor + "/60"} group-hover:w-20 transition-all duration-300`}
                        />
                        
                        {/* Description avec taille adaptée */}
                        <p className={`text-gray-600 mb-4 ${
                          index === 0 ? 'line-clamp-3 md:line-clamp-4' : 'line-clamp-2 md:line-clamp-3'
                        } group-hover:text-gray-700 transition-colors duration-300`}>
                          {project.description}
                        </p>
                        
                        {/* Technologies utilisées avec design amélioré */}
                        <div className="flex flex-wrap gap-2 mt-auto">
                          {project.technologies.map((tech, techIndex) => (
                            <motion.span 
                              key={techIndex} 
                              className={`text-xs px-2.5 py-1 rounded-full ${
                                index === 0 
                                  ? 'bg-purple-100 text-purple-700' 
                                  : `bg-${getProjectStyle(index).textColor.split('-')[1]}-100 ${getProjectStyle(index).textColor}`
                              } transition-all duration-300 hover:scale-105`}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.1 * techIndex + 0.5 + (0.1 * index) }}
                            >
                              {tech}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
            
            {/* Grille de projets principale avec layout alternatif */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8"
            >
              {filteredProjects.filter(project => !project.featured).map((project, index) => {
                const style = getProjectStyle(index + 3); // Décalage pour varier les styles
                
                // Layout alternatif pour créer un design asymétrique intéressant
                const spanClasses = index % 5 === 0 
                  ? 'md:col-span-8' 
                  : index % 5 === 1 
                    ? 'md:col-span-4' 
                    : index % 5 === 2 
                      ? 'md:col-span-6' 
                      : index % 5 === 3 
                        ? 'md:col-span-6' 
                        : 'md:col-span-12';
                
                return (
                  <motion.div
                    key={project.id}
                    custom={index}
                    variants={itemVariants}
                    className={`group cursor-pointer ${spanClasses}`}
                    onClick={() => setActiveProject(project)}
                    whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  >
                    <div className={`h-full rounded-2xl overflow-hidden shadow-lg transition-all duration-500 bg-gradient-to-br ${style.gradient}`}>
                      {/* Image avec effet parallaxe au survol */}
                      <div className="relative overflow-hidden aspect-[16/9]">
                        <motion.div
                          className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-110"
                        >
                          <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            unoptimized
                          />
                          
                          {/* Overlay dégradé au survol */}
                          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-300" />
                        </motion.div>
                        
                        {/* Badge de catégorie */}
                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm shadow-md z-10">
                          <span className={style.textColor}>
                            {project.category}
                          </span>
                        </div>
                        
                        {/* Boutons d'action */}
                        <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                          <motion.a
                            href={project.link}
                            className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <svg className={`w-4 h-4 ${style.textColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </motion.a>
                        </div>
                      </div>
                      
                      {/* Contenu au format compact */}
                      <div className="p-5">
                        <h3 className={`text-lg font-bold mb-2 group-hover:${style.textColor} transition-colors duration-300`}>
                          {project.title}
                        </h3>
                        
                        <div className={`h-0.5 w-10 mb-3 ${style.accentColor}/60 group-hover:w-16 transition-all duration-300`} />
                        
                        <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                          {project.description}
                        </p>
                        
                        {/* Liste de technologies compacte */}
                        <div className="flex flex-wrap gap-1.5">
                          {project.technologies.slice(0, 2).map((tech, techIndex) => (
                            <span 
                              key={techIndex} 
                              className={`text-xs px-2 py-0.5 rounded-full ${
                                `bg-${style.textColor.split('-')[1]}-100 ${style.textColor}`
                              }`}
                            >
                              {tech}
                            </span>
                          ))}
                          {project.technologies.length > 2 && (
                            <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-700">
                              +{project.technologies.length - 2}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </>
        )}
        
        {/* Modal détaillé pour les projets */}
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
                    <span className="inline-block px-3 py-1 bg-white/90 text-purple-600 rounded-full text-sm font-medium shadow-md mb-4">
                      {activeProject.category}
                    </span>
                    <h3 className="text-3xl font-bold text-white mb-2">{activeProject.title}</h3>
                    <div className="h-1 w-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mb-4"></div>
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
                        className="px-3 py-1.5 rounded-full bg-purple-100 text-purple-700 text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex justify-end mt-6">
                    <a 
                      href={activeProject.link} 
                      className="inline-flex items-center px-6 py-3 bg-purple-600 text-white rounded-lg shadow-lg hover:bg-purple-700 transition-colors duration-300"
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
        
        {/* Call to Action avec style amélioré */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="relative inline-block">
            <motion.div
              className="absolute -inset-1 rounded-xl opacity-70"
              style={{ 
                background: "linear-gradient(120deg, rgba(155, 89, 182, 0.6), rgba(52, 152, 219, 0.6), rgba(231, 76, 60, 0.6))",
                filter: "blur(15px)",
                zIndex: -1 
              }}
              animate={{ 
                background: [
                  "linear-gradient(120deg, rgba(155, 89, 182, 0.6), rgba(52, 152, 219, 0.6), rgba(231, 76, 60, 0.6))",
                  "linear-gradient(240deg, rgba(155, 89, 182, 0.6), rgba(52, 152, 219, 0.6), rgba(231, 76, 60, 0.6))",
                  "linear-gradient(360deg, rgba(155, 89, 182, 0.6), rgba(52, 152, 219, 0.6), rgba(231, 76, 60, 0.6))",
                ]
              }}
              transition={{ duration: 10, repeat: Infinity }}
            />
            <CTAButton 
              href="/portfolio" 
              className="relative z-10 py-4 px-8 text-lg font-medium"
              showDots={true}
            >
              Explorer tous nos projets
            </CTAButton>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default EnhancedPortfolio