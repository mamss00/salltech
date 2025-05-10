'use client'

import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import CTAButton from '@/components/CTAButton'
import { generateParticles } from '@/components/background/GridUtils'
import ConnectionLines from '@/components/background/ConnectionLines'

const Portfolio = () => {
  // Références pour animations au scroll
  const [titleRef, titleInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [descRef, descInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [projectsRef, projectsInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  
  // Référence au conteneur pour l'effet de scroll
  const sectionRef = useRef(null)
  
  // Animation au scroll
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })
  
  const sectionOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0.5, 1, 1, 0.5])
  
  // Particules pour l'arrière-plan
  const particles = generateParticles(30, 'purple')
  
  // Projets
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
      technologies: ['WordPress', 'WooCommerce', 'Elementor'],
    },
    {
      id: 5,
      title: 'Site vitrine Banque BNM',
      category: 'Site Web',
      image: 'https://picsum.photos/600/400?random=5',
      description: 'Site institutionnel moderne pour la Banque Nationale de Mauritanie.',
      technologies: ['Next.js', 'TypeScript', 'Framer Motion'],
    },
    {
      id: 6,
      title: 'Application de livraison Nouakchott Express',
      category: 'Application Mobile',
      image: 'https://picsum.photos/600/400?random=6',
      description: 'Service de livraison à domicile pour les restaurants et commerces de Nouakchott.',
      technologies: ['Flutter', 'Firebase', 'Stripe'],
    }
  ]
  
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

  // Couleurs des cartes
  const getCardColor = (index) => {
    switch (index % 6) {
      case 0: return "from-blue/20 to-blue/5";
      case 1: return "from-blue/20 to-purple/5";
      case 2: return "from-purple/20 to-purple/5";
      case 3: return "from-purple/20 to-red/5";
      case 4: return "from-red/20 to-red/5";
      case 5: return "from-red/20 to-blue/5";
      default: return "from-blue/20 to-blue/5";
    }
  }

  // Obtenir la couleur du texte
  const getTextColor = (index) => {
    switch (index % 3) {
      case 0: return "text-blue";
      case 1: return "text-purple";
      case 2: return "text-red";
      default: return "text-blue";
    }
  }

  return (
    <section id="portfolio" className="py-32 relative overflow-hidden" ref={sectionRef}>
      {/* Arrière-plan amélioré avec ConnectionLines et particules */}
      <div className="absolute inset-0 overflow-hidden">
        <ConnectionLines color="purple" animate={true} />
        
        {/* Cercles colorés en arrière-plan */}
        <motion.div 
          className="absolute -top-20 -right-20 w-96 h-96 bg-purple/10 rounded-full blur-3xl"
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
          className="absolute -bottom-20 -left-20 w-96 h-96 bg-blue/10 rounded-full blur-3xl"
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
        
        {/* Particules animées */}
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
                                                'rgba(231, 76, 60, 0.3)'
            }}
            animate={{
              x: [0, (index % 2 === 0 ? 30 : -30), 0],
              y: [0, (index % 2 === 0 ? -20 : 20), 0],
              opacity: [0.2, 0.4, 0.2],
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
        style={{ opacity: sectionOpacity }}
      >
        <motion.h2
          ref={titleRef}
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-extrabold mb-6 text-center"
        >
          Notre <span className="gradient-text bg-gradient-text bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-shift">Portfolio</span>
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
        
        {/* Layout asymétrique */}
        <motion.div
          ref={projectsRef}
          variants={containerVariants}
          initial="hidden"
          animate={projectsInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-12 gap-8"
        >
          {/* Projet vedette en grand */}
          <motion.div
            variants={itemVariants}
            className="col-span-12 md:col-span-8 transform hover:-translate-y-3 transition-transform duration-500"
            style={{ transform: "rotate(0.8deg)" }}
          >
            <div className={`bg-gradient-to-br from-blue/20 to-blue/5 rounded-2xl overflow-hidden shadow-lg h-full group`}>
              <div className="md:flex h-full">
                <div className="md:w-7/12 relative overflow-hidden h-60 md:h-auto">
                  <Image
                    src={projects[0].image}
                    alt={projects[0].title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 text-blue rounded-full text-sm font-medium shadow-md">
                    {projects[0].category}
                  </div>
                </div>
                
                <div className="p-6 md:w-5/12 flex flex-col justify-center">
                  <h3 className="text-xl md:text-2xl font-bold mb-3 group-hover:text-blue transition-colors duration-300">
                    {projects[0].title}
                  </h3>
                  
                  <div className="h-0.5 w-12 bg-blue/60 mb-4 group-hover:w-20 transition-all duration-300"></div>
                  
                  <p className="text-gray-600 mb-6">
                    {projects[0].description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {projects[0].technologies.map((tech, index) => (
                      <span 
                        key={index} 
                        className="text-xs px-3 py-1 bg-gray-100 text-gray-700 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Deux projets secondaires côte à côte */}
          <motion.div
            variants={itemVariants}
            className="col-span-12 md:col-span-4 transform hover:-translate-y-3 transition-transform duration-500"
            style={{ transform: "rotate(-0.5deg)" }}
          >
            <div className={`bg-gradient-to-br from-purple/20 to-purple/5 rounded-2xl overflow-hidden shadow-lg h-full group`}>
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={projects[1].image}
                  alt={projects[1].title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 text-purple rounded-full text-sm font-medium shadow-md">
                  {projects[1].category}
                </div>
              </div>
              
              <div className="p-5">
                <h3 className="text-xl font-bold mb-2 group-hover:text-purple transition-colors duration-300">
                  {projects[1].title}
                </h3>
                
                <div className="h-0.5 w-12 bg-purple/60 mb-3 group-hover:w-16 transition-all duration-300"></div>
                
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {projects[1].description}
                </p>
                
                <div className="flex flex-wrap gap-1.5">
                  {projects[1].technologies.map((tech, index) => (
                    <span 
                      key={index} 
                      className="text-xs px-2 py-0.5 bg-gray-100 text-gray-700 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Troisième projet en format légèrement différent */}
          <motion.div
            variants={itemVariants}
            className="col-span-12 md:col-span-6 transform hover:-translate-y-3 transition-transform duration-500"
            style={{ transform: "rotate(0.3deg)" }}
          >
            <div className={`bg-gradient-to-br from-red/20 to-red/5 rounded-2xl overflow-hidden shadow-lg h-full group flex flex-col md:flex-row`}>
              <div className="md:w-2/5 relative overflow-hidden h-48 md:h-auto">
                <Image
                  src={projects[2].image}
                  alt={projects[2].title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 30vw"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 text-red rounded-full text-sm font-medium shadow-md">
                  {projects[2].category}
                </div>
              </div>
              
              <div className="p-5 md:w-3/5 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-red transition-colors duration-300">
                    {projects[2].title}
                  </h3>
                  
                  <div className="h-0.5 w-12 bg-red/60 mb-3 group-hover:w-16 transition-all duration-300"></div>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {projects[2].description}
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {projects[2].technologies.map((tech, index) => (
                    <span 
                      key={index} 
                      className="text-xs px-2 py-0.5 bg-gray-100 text-gray-700 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Quatrième projet plus fin */}
          <motion.div
            variants={itemVariants}
            className="col-span-12 md:col-span-6 transform hover:-translate-y-3 transition-transform duration-500"
            style={{ transform: "rotate(-0.7deg)" }}
          >
            <div className={`bg-gradient-to-br from-blue/20 to-purple/5 rounded-2xl overflow-hidden shadow-lg h-full group`}>
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={projects[3].image}
                  alt={projects[3].title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 text-blue rounded-full text-sm font-medium shadow-md">
                  {projects[3].category}
                </div>
              </div>
              
              <div className="p-5">
                <h3 className="text-xl font-bold mb-2 group-hover:text-blue transition-colors duration-300">
                  {projects[3].title}
                </h3>
                
                <div className="h-0.5 w-12 bg-blue/60 mb-3 group-hover:w-16 transition-all duration-300"></div>
                
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {projects[3].description}
                </p>
                
                <div className="flex flex-wrap gap-1.5">
                  {projects[3].technologies.map((tech, index) => (
                    <span 
                      key={index} 
                      className="text-xs px-2 py-0.5 bg-gray-100 text-gray-700 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Cinquième et sixième projets dans un format large et plat */}
          <motion.div
            variants={itemVariants}
            className="col-span-12 transform hover:-translate-y-3 transition-transform duration-500"
            style={{ transform: "rotate(0.4deg)" }}
          >
            <div className={`bg-gradient-to-br from-purple/20 to-red/5 rounded-2xl overflow-hidden shadow-lg h-full group`}>
              <div className="md:flex">
                <div className="md:w-1/3 relative overflow-hidden h-48 md:h-auto">
                  <Image
                    src={projects[4].image}
                    alt={projects[4].title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 text-purple rounded-full text-sm font-medium shadow-md">
                    {projects[4].category}
                  </div>
                </div>
                
                <div className="p-6 md:w-2/3 flex flex-col justify-center">
                  <h3 className="text-xl font-bold mb-3 group-hover:text-purple transition-colors duration-300">
                    {projects[4].title}
                  </h3>
                  
                  <div className="h-0.5 w-12 bg-purple/60 mb-4 group-hover:w-20 transition-all duration-300"></div>
                  
                  <p className="text-gray-600 mb-6">
                    {projects[4].description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {projects[4].technologies.map((tech, index) => (
                      <span 
                        key={index} 
                        className="text-xs px-3 py-1 bg-gray-100 text-gray-700 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Dernier projet */}
          <motion.div
            variants={itemVariants}
            className="col-span-12 transform hover:-translate-y-3 transition-transform duration-500"
            style={{ transform: "rotate(-0.3deg)" }}
          >
            <div className={`bg-gradient-to-br from-red/20 to-blue/5 rounded-2xl overflow-hidden shadow-lg h-full group`}>
              <div className="md:flex">
                <div className="md:w-1/4 relative overflow-hidden h-48 md:h-auto">
                  <Image
                    src={projects[5].image}
                    alt={projects[5].title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 25vw"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 text-red rounded-full text-sm font-medium shadow-md">
                    {projects[5].category}
                  </div>
                </div>
                
                <div className="p-6 md:w-3/4 flex flex-col justify-center">
                  <div className="md:flex items-start">
                    <div className="md:w-2/3 pr-6">
                      <h3 className="text-xl font-bold mb-3 group-hover:text-red transition-colors duration-300">
                        {projects[5].title}
                      </h3>
                      
                      <div className="h-0.5 w-12 bg-red/60 mb-4 group-hover:w-20 transition-all duration-300"></div>
                      
                      <p className="text-gray-600 mb-6">
                        {projects[5].description}
                      </p>
                    </div>
                    
                    <div className="md:w-1/3 mt-4 md:mt-0">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="text-sm font-semibold mb-2 text-gray-800">Technologies</h4>
                        <div className="flex flex-wrap gap-2">
                          {projects[5].technologies.map((tech, index) => (
                            <span 
                              key={index} 
                              className="text-xs px-3 py-1 bg-white text-gray-700 rounded-full shadow-sm"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>