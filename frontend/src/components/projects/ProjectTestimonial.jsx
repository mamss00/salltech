// frontend/src/components/projects/ProjectTestimonial.jsx
'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaQuoteLeft, FaStar, FaHeart, FaAward, FaRocket } from 'react-icons/fa'

export default function ProjectTestimonial({ client, projectTitle, color = 'blue' }) {
  // Animation au défilement
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })
  
  const sectionOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8])
  
  // Animation d'apparition
  const [contentRef, contentInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  
  // Fonction pour obtenir les couleurs
  const getColorStyles = (colorName) => {
    const colorMap = {
      blue: { solid: '#3498db', rgb: '52, 152, 219' },
      purple: { solid: '#9b59b6', rgb: '155, 89, 182' },
      red: { solid: '#e74c3c', rgb: '231, 76, 60' }
    }
    return colorMap[colorName] || colorMap.blue
  }

  const colors = getColorStyles(color)
  
  // Témoignages contextualisés selon le client
  const getTestimonial = (clientName) => {
    const normalizedClient = clientName?.toLowerCase() || ''
    
    if (normalizedClient.includes('agence')) {
      return {
        quote: "SALLTECH a transformé notre présence digitale. Grâce à leur expertise SEO exceptionnelle, nous sommes désormais #1 sur Google pour 'immobilier Mauritanie'. Leur équipe technique a livré une solution WordPress sécurisée et parfaitement optimisée qui dépasse toutes nos attentes.",
        author: "Amelle Bacar",
        position: "Directrice Générale",
        company: "L'Agence - Transaction Immobilière",
        rating: 5,
        highlight: "Position #1 Google atteinte",
        avatar: "AB"
      }
    } else if (normalizedClient.includes('awa')) {
      return {
        quote: "En tant que champion de streetfood européen, j'avais besoin d'une plateforme e-commerce à la hauteur de mes ambitions. SALLTECH a créé une solution complète (site + app) qui gère parfaitement notre business international. Performance et design au rendez-vous !",
        author: "Awa Ibrahim",
        position: "CEO & Champion Streetfood",
        company: "AWA Event",
        rating: 5,
        highlight: "Solution e-commerce internationale",
        avatar: "AI"
      }
    } else {
      return {
        quote: "Travailler avec SALLTECH a été une expérience exceptionnelle. Leur expertise technique et leur approche professionnelle ont permis de livrer un projet qui dépasse nos attentes. Nous recommandons vivement leurs services.",
        author: "Direction",
        position: "Responsable Projet",
        company: client || "Client Confidentiel",
        rating: 5,
        highlight: "Projet réussi avec excellence",
        avatar: client?.substring(0, 2)?.toUpperCase() || "CL"
      }
    }
  }
  
  const testimonial = getTestimonial(client)

  // Styles pour les backgrounds
  const sectionStyle = {
    background: `linear-gradient(135deg, rgba(${colors.rgb}, 0.02) 0%, #ffffff 50%, rgba(${colors.rgb}, 0.01) 100%)`
  }

  const badgeStyle = {
    background: `rgba(${colors.rgb}, 0.1)`,
    border: `1px solid rgba(${colors.rgb}, 0.15)`,
    color: colors.solid
  }

  const highlightStyle = {
    background: `linear-gradient(135deg, ${colors.solid} 0%, rgba(${colors.rgb}, 0.8) 100%)`
  }

  return (
    <motion.section 
      ref={sectionRef}
      style={{ 
        opacity: sectionOpacity,
        ...sectionStyle
      }}
      className="py-24 relative overflow-hidden"
    >
      {/* Background décoratif subtil */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Particules flottantes */}
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-1 h-1 rounded-full opacity-20"
            style={{
              backgroundColor: colors.solid,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.1, 0.4, 0.1],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 4,
            }}
          />
        ))}
        
        {/* Formes géométriques */}
        <motion.div
          className="absolute top-1/4 right-1/4 w-32 h-32 border opacity-10 rounded-full"
          style={{ borderColor: colors.solid }}
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/4 w-24 h-24 opacity-5 rounded-lg"
          style={{ backgroundColor: colors.solid }}
          animate={{ 
            rotate: [0, 45, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 12, repeat: Infinity }}
        />
      </div>

      <div className="container relative z-10">
        <motion.div
          ref={contentRef}
          initial={{ opacity: 0, y: 50 }}
          animate={contentInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto"
        >
          
          {/* En-tête de section */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: -30, scale: 0.8 }}
              animate={contentInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.6, type: "spring" }}
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full backdrop-blur-sm shadow-lg mb-8"
              style={badgeStyle}
            >
              <div 
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ backgroundColor: colors.solid }}
              >
                <FaHeart className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-sm uppercase tracking-wider">
                Témoignage Client
              </span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={contentInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            >
              Ce que nos clients{' '}
              <span style={{ color: colors.solid }}>disent de nous</span>
            </motion.h2>
          </div>

          {/* Card de témoignage principal */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={contentInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            {/* Highlight badge flottant */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={contentInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="absolute -top-6 -left-6 z-10"
            >
              <div 
                className="px-4 py-2 rounded-full text-white text-sm font-semibold shadow-lg"
                style={highlightStyle}
              >
                <div className="flex items-center gap-2">
                  <FaAward className="w-3 h-3" />
                  {testimonial.highlight}
                </div>
              </div>
            </motion.div>

            {/* Card principale */}
            <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-gray-100 relative overflow-hidden">
              
              {/* Icône de citation */}
              <div className="absolute top-8 right-8 opacity-10">
                <FaQuoteLeft 
                  className="w-16 h-16"
                  style={{ color: colors.solid }}
                />
              </div>
              
              {/* Étoiles */}
              <motion.div 
                className="flex items-center gap-1 mb-6"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={contentInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                {[...Array(testimonial.rating)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, rotate: -180 }}
                    animate={contentInView ? { opacity: 1, rotate: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.7 + i * 0.1 }}
                  >
                    <FaStar 
                      className="w-5 h-5"
                      style={{ color: colors.solid }}
                    />
                  </motion.div>
                ))}
              </motion.div>
              
              {/* Citation */}
              <motion.blockquote 
                className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8 relative z-10"
                initial={{ opacity: 0 }}
                animate={contentInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.9 }}
              >
                "{testimonial.quote}"
              </motion.blockquote>
              
              {/* Auteur */}
              <motion.div 
                className="flex items-center gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={contentInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 1.1 }}
              >
                {/* Avatar */}
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg"
                  style={{ backgroundColor: colors.solid }}
                >
                  {testimonial.avatar}
                </div>
                
                {/* Informations */}
                <div>
                  <div className="font-bold text-gray-900 text-lg">
                    {testimonial.author}
                  </div>
                  <div className="text-gray-600 font-medium">
                    {testimonial.position}
                  </div>
                  <div 
                    className="text-sm font-semibold"
                    style={{ color: colors.solid }}
                  >
                    {testimonial.company}
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
          
          {/* Métriques de satisfaction */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={contentInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16"
          >
            {[
              { label: "Satisfaction client", value: "100%", icon: FaHeart },
              { label: "Projets livrés à temps", value: "100%", icon: FaRocket },
              { label: "Clients qui recommandent", value: "95%", icon: FaAward }
            ].map((metric, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={contentInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 1.5 + index * 0.1 }}
                className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100"
              >
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: `rgba(${colors.rgb}, 0.1)` }}
                >
                  <metric.icon 
                    className="w-6 h-6"
                    style={{ color: colors.solid }}
                  />
                </div>
                <div 
                  className="text-2xl font-bold mb-2"
                  style={{ color: colors.solid }}
                >
                  {metric.value}
                </div>
                <div className="text-gray-600 font-medium text-sm">
                  {metric.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  )
}