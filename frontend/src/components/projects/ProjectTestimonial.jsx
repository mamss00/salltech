'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaQuoteLeft, FaStar, FaHeart } from 'react-icons/fa'

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
  
  // Témoignages prédéfinis selon le client
  const getTestimonial = (clientName) => {
    if (clientName?.includes('Agence')) {
      return {
        quote: "SALLTECH a transformé notre présence digitale. Grâce à leur expertise SEO exceptionnelle, nous sommes désormais #1 sur Google pour 'immobilier Mauritanie'. Leur équipe technique a livré une solution WordPress sécurisée et parfaitement optimisée qui dépasse toutes nos attentes.",
        author: "Amelle Bacar",
        position: "Directrice Générale",
        company: "L'Agence - Transaction Immobilière",
        rating: 5,
        highlight: "Position #1 Google atteinte"
      }
    } else if (clientName?.includes('AWA')) {
      return {
        quote: "En tant que champion de streetfood européen, j'avais besoin d'une plateforme e-commerce à la hauteur de mes ambitions. SALLTECH a créé une solution complète (site + app) qui gère parfaitement notre business international. Performance et design au rendez-vous !",
        author: "Awa Ibrahim",
        position: "CEO & Champion Streetfood",
        company: "AWA Event",
        rating: 5,
        highlight: "Solution e-commerce internationale"
      }
    } else {
      return {
        quote: "Travailler avec SALLTECH a été une expérience exceptionnelle. Leur expertise technique et leur approche professionnelle ont permis de livrer un projet qui dépasse nos attentes. Nous recommandons vivement leurs services.",
        author: "Direction",
        position: "Responsable Projet",
        company: client || "Client Confidentiel",
        rating: 5,
        highlight: "Projet réussi avec excellence"
      }
    }
  }
  
  const testimonial = getTestimonial(client)

  return (
    <motion.section 
      ref={sectionRef}
      style={{ opacity: sectionOpacity }}
      className={`py-20 bg-gradient-to-br from-${color}/5 via-white to-${color}/10 relative overflow-hidden`}
    >
      {/* Éléments décoratifs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Particules flottantes */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-1 h-1 bg-${color}/20 rounded-full`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 6 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 4,
            }}
          />
        ))}
        
        {/* Formes géométriques */}
        <motion.div
          className={`absolute top-20 right-20 w-32 h-32 border border-${color}/10 rounded-full`}
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className={`absolute bottom-20 left-20 w-24 h-24 bg-${color}/5 rounded-lg`}
          animate={{ 
            rotate: [0, 45, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      <div className="container relative z-10">
        <motion.div
          ref={contentRef}
          initial={{ opacity: 0, y: 50 }}
          animate={contentInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Badge de section */}
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={contentInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className={`inline-block text-${color} font-semibold tracking-wider uppercase text-sm mb-8`}
          >
            TÉMOIGNAGE CLIENT
          </motion.span>
          
          {/* Icône de citation */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={contentInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`w-16 h-16 bg-${color}/10 rounded-full flex items-center justify-center mx-auto mb-8`}
          >
            <FaQuoteLeft className={`w-7 h-7 text-${color}`} />
          </motion.div>
          
          {/* Citation principale */}
          <motion.blockquote
            initial={{ opacity: 0, y: 30 }}
            animate={contentInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-8 font-medium italic"
          >
            "{testimonial.quote}"
          </motion.blockquote>
          
          {/* Étoiles de notation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={contentInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex items-center justify-center gap-1 mb-8"
          >
            {Array.from({ length: testimonial.rating }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={contentInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ 
                  duration: 0.3, 
                  delay: 0.8 + (i * 0.1),
                  type: "spring",
                  stiffness: 200
                }}
              >
                <FaStar className={`w-6 h-6 text-yellow-400`} />
              </motion.div>
            ))}
          </motion.div>
          
          {/* Badge de mise en valeur */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={contentInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 1 }}
            className={`inline-flex items-center gap-2 px-6 py-3 bg-${color}/10 text-${color} rounded-full font-semibold mb-8`}
          >
            <FaHeart className="w-4 h-4" />
            {testimonial.highlight}
          </motion.div>
          
          {/* Informations de l'auteur */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={contentInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="border-t border-gray-200 pt-8"
          >
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {/* Avatar placeholder */}
              <div className={`w-16 h-16 bg-${color}/20 rounded-full flex items-center justify-center flex-shrink-0`}>
                <span className={`text-${color} font-bold text-xl`}>
                  {testimonial.author.charAt(0)}
                </span>
              </div>
              
              {/* Informations */}
              <div className="text-center sm:text-left">
                <h4 className="text-lg font-bold text-gray-900">
                  {testimonial.author}
                </h4>
                <p className="text-gray-600">
                  {testimonial.position}
                </p>
                <p className={`text-${color} font-semibold text-sm`}>
                  {testimonial.company}
                </p>
              </div>
            </div>
          </motion.div>
          
          {/* Statistiques impressionnantes */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={contentInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-12 pt-8 border-t border-gray-200"
          >
            <div className="text-center">
              <div className={`text-3xl font-bold text-${color} mb-2`}>100%</div>
              <div className="text-gray-600 text-sm">Satisfaction client</div>
            </div>
            <div className="text-center">
              <div className={`text-3xl font-bold text-${color} mb-2`}>24/7</div>
              <div className="text-gray-600 text-sm">Support technique</div>
            </div>
            <div className="text-center">
              <div className={`text-3xl font-bold text-${color} mb-2`}>∞</div>
              <div className="text-gray-600 text-sm">Évolutions possibles</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  )
}