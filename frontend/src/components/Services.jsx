'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { getServices } from '@/utils/api'

const Services = () => {
  // États pour les animations et les données
  const [titleRef, titleInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [descRef, descInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [servicesRef, servicesInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  
  // État pour les données de services
  const [services, setServices] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  
  // Récupérer les services depuis l'API Strapi
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setIsLoading(true)
        const servicesData = await getServices()
        
        // Vérifier si nous avons des données valides
        if (Array.isArray(servicesData) && servicesData.length > 0) {
          setServices(servicesData)
        } else {
          // Si l'API ne renvoie pas de données, utiliser les données de secours
          setServices(fallbackServices)
        }
        setIsLoading(false)
      } catch (err) {
        console.error('Erreur lors du chargement des services:', err)
        setError('Impossible de charger les services')
        // En cas d'erreur, utiliser les données de secours
        setServices(fallbackServices)
        setIsLoading(false)
      }
    }
    
    fetchServices()
  }, [])
  
  // Données de secours au cas où l'API échoue
  const fallbackServices = [
    {
      id: 1,
      attributes: {
        emoji: "⚡",
        title: "Sites Internet",
        description: "Nous créons des sites web responsifs et conviviaux qui engagent les visiteurs et génèrent des conversions.",
        color: "from-blue/20 to-blue/5"
      }
    },
    {
      id: 2,
      attributes: {
        emoji: "📱",
        title: "Applications Mobiles",
        description: "Applications natives et multi-plateformes pour iOS et Android offrant une expérience utilisateur exceptionnelle.",
        color: "from-purple/20 to-purple/5"
      }
    },
    {
      id: 3,
      attributes: {
        emoji: "🔍",
        title: "Solutions Odoo",
        description: "Implémentation, personnalisation et support pour Odoo ERP, adaptés à vos processus métier spécifiques.",
        color: "from-red/20 to-red/5"
      }
    },
    {
      id: 4,
      attributes: {
        emoji: "🚀",
        title: "Consulting DevOps",
        description: "Optimisation de vos processus de développement, déploiement continu et gestion d'infrastructure cloud.",
        color: "from-blue/20 to-blue/5"
      }
    },
    {
      id: 5,
      attributes: {
        emoji: "🌐",
        title: "Hébergement Web",
        description: "Services d'hébergement haute performance, sécurisés et évolutifs pour tous types de projets web et applications.",
        color: "from-purple/20 to-purple/5"
      }
    },
    {
      id: 6,
      attributes: {
        emoji: "📈",
        title: "SEO & Référencement",
        description: "Stratégies d'optimisation pour les moteurs de recherche qui améliorent votre visibilité en ligne et génèrent du trafic qualifié.",
        color: "from-red/20 to-red/5"
      }
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
  
  // Fonction pour obtenir la couleur en fonction de l'index
  const getColorByIndex = (index) => {
    const colorClasses = [
      "from-blue/20 to-blue/5",
      "from-purple/20 to-purple/5",
      "from-red/20 to-red/5"
    ]
    return colorClasses[index % colorClasses.length]
  }
  
  return (
    <section id="services" className="py-32 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute -top-20 -right-20 w-96 h-96 bg-blue/5 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-purple/5 rounded-full blur-3xl"></div>
      
      <div className="container relative z-10">
        <motion.h2
          ref={titleRef}
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-extrabold mb-6 text-center"
        >
          Nos <span className="gradient-text">Services</span>
        </motion.h2>
        
        <motion.p
          ref={descRef}
          initial={{ opacity: 0, y: 20 }}
          animate={descInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg text-gray-600 max-w-3xl mx-auto text-center mb-20"
        >
          Nous proposons des services digitaux sur mesure pour répondre aux besoins 
          spécifiques des entreprises mauritaniennes.
        </motion.p>
        
        {isLoading ? (
          // Afficher un loader pendant le chargement
          <div className="flex justify-center items-center h-64">
            <div className="flex space-x-2">
              <div className="w-4 h-4 bg-blue rounded-full animate-dot-pulse-1"></div>
              <div className="w-4 h-4 bg-purple rounded-full animate-dot-pulse-2"></div>
              <div className="w-4 h-4 bg-red rounded-full animate-dot-pulse-3"></div>
            </div>
          </div>
        ) : error ? (
          // Afficher un message d'erreur si nécessaire
          <div className="text-center text-red py-10">
            <p className="text-xl">{error}</p>
            <p className="mt-4">Veuillez réessayer ultérieurement.</p>
          </div>
        ) : (
          // Afficher les services
          <motion.div
            ref={servicesRef}
            variants={containerVariants}
            initial="hidden"
            animate={servicesInView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                variants={itemVariants}
                className={`bg-gradient-to-br ${service.attributes?.color || getColorByIndex(index)} backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg p-8 transition-all duration-500 hover:shadow-xl hover:-translate-y-2 hover:bg-white group`}
              >
                <div className="relative">
                  <div className="text-4xl mb-4">{service.attributes.emoji}</div>
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-blue transition-colors duration-300">
                    {service.attributes.title}
                  </h3>
                  <div className="h-0.5 w-16 bg-gradient-to-r from-blue via-purple to-red mb-5 opacity-60 group-hover:w-24 transition-all duration-300"></div>
                  <p className="text-gray-600 mb-4">{service.attributes.description}</p>
                  
                  <div className="flex items-center text-blue hover:underline group-hover:text-opacity-80 transition-all duration-300">
                    <span>En savoir plus</span>
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                    </svg>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  )
}

export default Services