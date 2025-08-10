// frontend/src/components/projects/EnhancedProjectCTA.jsx - VERSION COMPLÈTE CORRIGÉE
'use client'

import { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import CTAButton from '@/components/CTAButton'
import { FaRocket, FaExternalLinkAlt, FaEnvelope, FaPhone, FaComments, FaAward, FaUsers, FaClock } from 'react-icons/fa'

export default function EnhancedProjectCTA({ projectName, projectUrl, client, color = 'blue' }) {
  // Animation au défilement sophistiquée
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })
  
  const sectionOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8])
  const contentY = useTransform(scrollYProgress, [0, 0.5], [0, -40])
  
  // Animation d'apparition sophistiquée
  const [contentRef, contentInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [statsRef, statsInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  
  // Contrôles d'animation
  const titleControls = useAnimation()
  const badgeControls = useAnimation()
  const buttonsControls = useAnimation()
  const statsControls = useAnimation()
  
  // RGB values pour les effets
  const colorRGB = {
    blue: '52, 152, 219',
    purple: '155, 89, 182', 
    red: '231, 76, 60'
  }
  const mainColorRGB = colorRGB[color] || colorRGB.blue

  // Fonction pour obtenir les styles de couleurs
  const getColorStyles = (colorName) => {
    const colorMap = {
      blue: { solid: '#3498db', rgb: '52, 152, 219' },
      purple: { solid: '#9b59b6', rgb: '155, 89, 182' },
      red: { solid: '#e74c3c', rgb: '231, 76, 60' }
    }
    return colorMap[colorName] || colorMap.blue
  }

  const colors = getColorStyles(color)

  // Animation séquentielle sophistiquée
  useEffect(() => {
    if (contentInView) {
      const sequence = async () => {
        await badgeControls.start({
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration: 0.6, type: "spring", stiffness: 100 }
        })
        
        await titleControls.start({
          opacity: 1,
          y: 0,
          transition: { duration: 0.8, delay: 0.1 }
        })
        
        await buttonsControls.start({
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, delay: 0.2 }
        })
      }
      sequence()
    }
  }, [contentInView, titleControls, badgeControls, buttonsControls])

  // Animation des statistiques
  useEffect(() => {
    if (statsInView) {
      statsControls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, staggerChildren: 0.1 }
      })
    }
  }, [statsInView, statsControls])

  // Statistiques impressionnantes
  const stats = [
    {
      icon: FaAward,
      number: "50+",
      label: "Projets réussis",
      color: color
    },
    {
      icon: FaUsers,
      number: "100%",
      label: "Clients satisfaits",
      color: "purple"
    },
    {
      icon: FaClock,
      number: "24/7",
      label: "Support technique",
      color: "red"
    }
  ]

  // Styles pour les backgrounds - CORRIGÉS
  const sectionBackgroundStyle = {
    background: `linear-gradient(135deg, rgba(${mainColorRGB}, 0.05) 0%, #ffffff 50%, rgba(155, 89, 182, 0.05) 100%)`
  }

  const badgeBackgroundStyle = {
    background: `linear-gradient(90deg, rgba(${mainColorRGB}, 0.1) 0%, #ffffff 50%, rgba(155, 89, 182, 0.1) 100%)`,
    border: `1px solid rgba(${mainColorRGB}, 0.2)`
  }

  const iconGradientStyle = {
    background: `linear-gradient(135deg, ${colors.solid} 0%, #9b59b6 100%)`
  }

  const underlineGradientStyle = {
    background: `linear-gradient(90deg, rgba(${mainColorRGB}, 0.3) 0%, rgba(155, 89, 182, 0.3) 50%, rgba(231, 76, 60, 0.3) 100%)`
  }

  const linkStyle = {
    color: colors.solid,
    borderColor: `rgba(${mainColorRGB}, 0.2)`
  }

  const linkHoverStyle = {
    borderColor: `rgba(${mainColorRGB}, 0.4)`,
    backgroundColor: `rgba(${mainColorRGB}, 0.05)`
  }

  return (
    <motion.section 
      ref={sectionRef}
      style={{ 
        opacity: sectionOpacity,
        ...sectionBackgroundStyle
      }}
      className="py-24 relative overflow-hidden"
    >
      {/* Fond décoratif premium */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Formes organiques sophistiquées */}
        <motion.div
          className="absolute top-20 right-20 w-80 h-80 opacity-5"
          animate={{
            rotate: [0, 180, 360],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <path
              d="M47.2,-73.9C61.3,-66.9,73,-54.2,79.6,-39.3C86.1,-24.4,87.5,-7.2,82.7,7.8C78,22.8,66.9,35.8,55.3,47.5C43.6,59.3,31.3,69.9,16.5,75.4C1.7,80.8,-15.6,81.1,-28.9,74.4C-42.2,67.8,-51.6,54.1,-58.9,40.3C-66.3,26.5,-71.7,12.6,-73.1,-2.5C-74.6,-17.7,-72.1,-34.1,-63.3,-46.1C-54.5,-58.1,-39.6,-65.8,-24.5,-72C-9.5,-78.2,5.7,-83,20.2,-81.5C34.8,-79.9,48.8,-71.9,61.8,-61.9Z"
              fill={`rgba(${mainColorRGB}, 0.08)`}
            />
          </svg>
        </motion.div>

        <motion.div
          className="absolute bottom-20 left-20 w-64 h-64 opacity-5"
          animate={{
            rotate: [360, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <path
              d="M39.3,-64.8C52.8,-59.2,66.9,-51.9,71.1,-40.3C75.3,-28.6,69.7,-12.7,67.8,2.8C65.9,18.2,68,33.2,62.4,43.8C56.9,54.5,43.7,60.8,30.6,65.1C17.4,69.3,4.4,71.4,-9.1,70.7C-22.5,70,-36.4,66.5,-47.5,58.2C-58.6,49.9,-66.8,37,-71.7,22.5C-76.5,8.1,-77.9,-7.9,-73.6,-21.5C-69.3,-35.1,-59.2,-46.3,-47,-54.4C-34.8,-62.4,-20.4,-67.2,-5.3,-69.9C9.8,-72.7,25.7,-70.5,39.3,-64.8Z"
              fill={`rgba(${mainColorRGB}, 0.06)`}
            />
          </svg>
        </motion.div>

        {/* Grille sophistiquée */}
        <div className="absolute inset-0 opacity-3">
          <svg width="100%" height="100%">
            <pattern id="ctaPattern" patternUnits="userSpaceOnUse" width="100" height="100">
              <circle cx="50" cy="50" r="1.5" fill={`rgb(${mainColorRGB})`} />
              <circle cx="25" cy="25" r="0.8" fill={`rgb(${mainColorRGB})`} />
              <circle cx="75" cy="75" r="0.8" fill={`rgb(${mainColorRGB})`} />
              <path d="M25,25 Q50,40 75,25" stroke={`rgb(${mainColorRGB})`} strokeWidth="0.4" fill="none" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#ctaPattern)" />
          </svg>
        </div>
      </div>

      <div className="container relative z-10">
        <motion.div
          ref={contentRef}
          style={{ y: contentY }}
          className="max-w-5xl mx-auto"
        >
          
          {/* En-tête sophistiqué */}
          <div className="text-center mb-16">
            {/* Badge premium animé - CORRIGÉ */}
            <motion.div
              initial={{ opacity: 0, y: -30, scale: 0.8 }}
              animate={badgeControls}
              className="inline-block mb-8"
            >
              <div 
                className="px-8 py-4 rounded-full backdrop-blur-sm shadow-lg"
                style={badgeBackgroundStyle}
              >
                <div className="flex items-center gap-4">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
                    style={iconGradientStyle}
                  >
                    <FaRocket className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-left">
                    <p 
                      className="font-bold text-sm uppercase tracking-wider"
                      style={{ color: colors.solid }}
                    >
                      Prêt pour le prochain défi ?
                    </p>
                    <p className="text-gray-600 text-xs">
                      Transformons vos idées en réalité
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Titre sophistiqué - CORRIGÉ */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={titleControls}
              className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight"
            >
              Un projet similaire{' '}
              <span className="relative" style={{ color: colors.solid }}>
                en tête ?
                <motion.div
                  className="absolute -bottom-3 left-0 h-2 rounded-full"
                  style={underlineGradientStyle}
                  initial={{ width: 0 }}
                  animate={contentInView ? { width: "100%" } : {}}
                  transition={{ duration: 1, delay: 1 }}
                ></motion.div>
              </span>
            </motion.h2>
            
            {/* Description sophistiquée */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={titleControls}
              transition={{ delay: 0.3 }}
              className="text-xl text-gray-600 mb-12 leading-relaxed max-w-3xl mx-auto"
            >
              Nous créons des solutions sur mesure adaptées à vos besoins spécifiques. 
              Rejoignez nos clients satisfaits et donnez vie à vos ambitions digitales.
            </motion.p>
          </div>
          
          {/* Boutons d'action sophistiqués */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={buttonsControls}
            className="flex flex-col lg:flex-row items-center justify-center gap-6 mb-16"
          >
            {/* Bouton principal premium */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <CTAButton 
                href="/contact" 
                variant="primary"
                showDots={true}
                className="transform hover:scale-105 transition-transform"
              >
                <FaComments className="w-4 h-4 mr-2" />
                Discutons de votre projet
              </CTAButton>
              
              <CTAButton 
                href="/projets" 
                variant="secondary"
                showDots={false}
                className="transform hover:scale-105 transition-transform"
              >
                Voir d'autres réalisations
              </CTAButton>
            </div>
            
            {/* Lien externe sophistiqué - CORRIGÉ */}
            {projectUrl && (
              <Link
                href={projectUrl}
                target="_blank"
                className="inline-flex items-center gap-3 transition-all font-medium px-6 py-3 rounded-xl border-2 backdrop-blur-sm"
                style={linkStyle}
                onMouseEnter={(e) => {
                  Object.assign(e.target.style, linkHoverStyle)
                }}
                onMouseLeave={(e) => {
                  Object.assign(e.target.style, linkStyle)
                }}
              >
                <FaExternalLinkAlt className="w-4 h-4" />
                <span>Voir le site en ligne</span>
                <div 
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{ backgroundColor: colors.solid }}
                ></div>
              </Link>
            )}
          </motion.div>
          
          {/* Statistiques impressionnantes - CORRIGÉES */}
          <motion.div
            ref={statsRef}
            initial={{ opacity: 0, y: 50 }}
            animate={statsControls}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
          >
            {stats.map((stat, index) => {
              const statColors = getColorStyles(stat.color)
              const iconBgStyle = {
                background: `linear-gradient(135deg, rgba(${colorRGB[stat.color]}, 0.1) 0%, rgba(${colorRGB[stat.color]}, 0.05) 100%)`,
                border: `1px solid rgba(${colorRGB[stat.color]}, 0.2)`
              }
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={statsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
                >
                  <div 
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
                    style={iconBgStyle}
                  >
                    <stat.icon 
                      className="w-8 h-8"
                      style={{ color: statColors.solid }}
                    />
                  </div>
                  <div 
                    className="text-3xl font-bold mb-2"
                    style={{ color: statColors.solid }}
                  >
                    {stat.number}
                  </div>
                  <div className="text-gray-600 font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
          
          {/* Contact rapide sophistiqué - CORRIGÉ */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={contentInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="p-8 rounded-2xl border border-gray-200 shadow-lg"
            style={{
              background: `linear-gradient(90deg, #ffffff 0%, #f9f9f9 50%, #ffffff 100%)`
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  Besoin d'un devis personnalisé ?
                </h3>
                <p className="text-gray-600 mb-4">
                  Notre équipe est disponible pour discuter de votre projet et vous proposer une solution adaptée.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <a 
                  href="mailto:contact@sall.technology" 
                  className="inline-flex items-center gap-3 transition-colors font-medium px-6 py-3 rounded-xl border backdrop-blur-sm flex-1 justify-center"
                  style={{
                    color: colors.solid,
                    borderColor: `rgba(${mainColorRGB}, 0.2)`
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = `rgba(${mainColorRGB}, 0.05)`
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'transparent'
                  }}
                >
                  <FaEnvelope className="w-4 h-4" />
                  <span>contact@sall.technology</span>
                </a>
                
                <a 
                  href="tel:+22233445566" 
                  className="inline-flex items-center gap-3 text-purple hover:text-purple/80 transition-colors font-medium px-6 py-3 rounded-xl border border-purple/20 hover:bg-purple/5 backdrop-blur-sm"
                >
                  <FaPhone className="w-4 h-4" />
                  <span>+222 33 44 55 66</span>
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  )
}