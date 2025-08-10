// frontend/src/components/projects/EnhancedProjectHero.jsx - VERSION CORRIGÉE
'use client'

import { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import Link from 'next/link'
import { getStrapiMediaUrl } from '@/utils/helpers'
import { FaExternalLinkAlt, FaCalendarAlt, FaBuilding, FaPlay, FaArrowRight, FaAward } from 'react-icons/fa'

export default function EnhancedProjectHero({ 
  title, 
  category, 
  description, 
  image, 
  images = [],
  client, 
  date, 
  projectUrl, 
  color = 'blue' 
}) {
  // Animation au défilement pour effets parallax
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })
  
  // Transformations parallax
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 300])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.8])
  const imageScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1])
  
  // Animation d'apparition
  const [contentRef, contentInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [badgeRef, badgeInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  
  // Contrôles d'animation séquentielle
  const badgeControls = useAnimation()
  const titleControls = useAnimation()
  const descControls = useAnimation()
  const ctaControls = useAnimation()
  
  // ✅ SOLUTION : Fonction pour obtenir les couleurs ET les classes CSS
  const getColorStyles = (colorName) => {
    const colorMap = {
      blue: { 
        solid: '#3498db', 
        rgb: '52, 152, 219',
        // ✅ Classes CSS statiques définies explicitement
        textClass: 'text-blue-500',
        bgClass: 'bg-blue-500',
        borderClass: 'border-blue-500',
        bgOpacityClass: 'bg-blue-500/10'
      },
      purple: { 
        solid: '#9b59b6', 
        rgb: '155, 89, 182',
        textClass: 'text-purple-500',
        bgClass: 'bg-purple-500',
        borderClass: 'border-purple-500',
        bgOpacityClass: 'bg-purple-500/10'
      },
      red: { 
        solid: '#e74c3c', 
        rgb: '231, 76, 60',
        textClass: 'text-red-500',
        bgClass: 'bg-red-500',
        borderClass: 'border-red-500',
        bgOpacityClass: 'bg-red-500/10'
      }
    }
    return colorMap[colorName] || colorMap.blue
  }

  const colors = getColorStyles(color)
  
  // Animation séquentielle
  useEffect(() => {
    if (contentInView) {
      const sequence = async () => {
        await badgeControls.start({
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration: 0.6, type: "spring" }
        })
        
        await titleControls.start({
          opacity: 1,
          y: 0,
          transition: { duration: 0.8, delay: 0.1 }
        })
        
        await descControls.start({
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, delay: 0.2 }
        })
        
        await ctaControls.start({
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, delay: 0.3 }
        })
      }
      sequence()
    }
  }, [contentInView, badgeControls, titleControls, descControls, ctaControls])
  
  // Préparer les images
  const mainImage = image ? 
    getStrapiMediaUrl(image.url || (image.formats?.large?.url || image.formats?.medium?.url)) : 
    '/images/projects/default-project.jpg'
    
  const additionalImages = images?.slice(0, 3).map(img => 
    getStrapiMediaUrl(img.url || (img.formats?.medium?.url || img.formats?.small?.url))
  ) || []
  
  // Formater la date
  const formatDate = (dateString) => {
    if (!dateString) return ''
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long'
    })
  }

  // ✅ Styles pour les backgrounds avec les couleurs CSS
  const sectionStyle = {
    background: `linear-gradient(135deg, #ffffff 0%, rgba(${colors.rgb}, 0.02) 30%, #ffffff 70%, rgba(${colors.rgb}, 0.01) 100%)`
  }

  const badgeStyle = {
    background: `rgba(${colors.rgb}, 0.1)`,
    border: `1px solid rgba(${colors.rgb}, 0.2)`,
    color: colors.solid
  }

  return (
    <motion.section 
      ref={containerRef}
      className="relative min-h-screen overflow-hidden"
      style={sectionStyle}
    >
      {/* Background décoratif avec parallax */}
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0 overflow-hidden pointer-events-none"
      >
        {/* Formes géométriques subtiles */}
        <motion.div 
          className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full opacity-5"
          style={{ backgroundColor: colors.solid }}
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 20, repeat: Infinity }}
        />
        
        <motion.div 
          className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full opacity-5"
          style={{ backgroundColor: colors.solid }}
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [360, 180, 0]
          }}
          transition={{ duration: 25, repeat: Infinity }}
        />
        
        {/* Points décoratifs flottants */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={`floating-${i}`}
            className="absolute w-2 h-2 rounded-full opacity-20"
            style={{ 
              backgroundColor: colors.solid,
              left: `${10 + (i * 7)}%`,
              top: `${20 + (i * 5)}%`
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.1, 0.4, 0.1]
            }}
            transition={{
              duration: 6 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.8
            }}
          />
        ))}
      </motion.div>

      <div className="container relative z-10 min-h-screen flex items-center py-24">
        <motion.div 
          style={{ opacity: contentOpacity }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center w-full"
        >
          
          {/* Contenu principal - 7 colonnes */}
          <motion.div 
            ref={contentRef}
            className="lg:col-span-7 space-y-8"
          >
            {/* Badge premium animé */}
            <motion.div
              ref={badgeRef}
              initial={{ opacity: 0, y: -30, scale: 0.8 }}
              animate={badgeControls}
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full backdrop-blur-sm shadow-lg"
              style={badgeStyle}
            >
              <div 
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ backgroundColor: colors.solid }}
              >
                <FaAward className="w-4 h-4 text-white" />
              </div>
              <div className="text-left">
                <div className="font-bold text-sm uppercase tracking-wider">
                  {category || 'Projet'}
                </div>
                <div className="text-xs opacity-80">
                  Réalisation SALLTECH
                </div>
              </div>
              
              {/* Lien externe dans le badge */}
              {projectUrl && (
                <Link 
                  href={projectUrl} 
                  target="_blank"
                  className="ml-2 p-2 hover:bg-white/20 rounded-full transition-colors"
                >
                  <FaExternalLinkAlt className="w-3 h-3" />
                </Link>
              )}
            </motion.div>
            
            {/* Titre principal sophistiqué */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={titleControls}
              className="text-4xl md:text-6xl font-extrabold leading-tight"
            >
              {/* ✅ Utilisation de style inline au lieu de classes dynamiques */}
              <span style={{ color: colors.solid }}>
                {title?.split(' ')[0] || 'Projet'}
              </span>
              {title?.split(' ').length > 1 && (
                <span className="text-gray-900 block md:inline md:ml-4">
                  {title.split(' ').slice(1).join(' ')}
                </span>
              )}
            </motion.h1>
            
            {/* Ligne décorative animée */}
            <motion.div 
              initial={{ width: 0 }}
              animate={contentInView ? { width: "5rem" } : {}}
              transition={{ duration: 1, delay: 0.8 }}
              className="h-1 rounded-full"
              style={{ 
                background: `linear-gradient(90deg, ${colors.solid} 0%, rgba(155, 89, 182, 0.6) 100%)`
              }}
            />
            
            {/* Description premium */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={descControls}
              className="text-xl text-gray-600 leading-relaxed max-w-2xl"
            >
              {description || 'Description du projet'}
            </motion.p>
            
            {/* Informations du projet */}
            {(client || date) && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={contentInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 1 }}
                className="flex flex-wrap gap-6 text-gray-500"
              >
                {client && (
                  <div className="flex items-center gap-3 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-lg">
                    {/* ✅ Icône avec couleur inline */}
                    <FaBuilding className="w-4 h-4" style={{ color: colors.solid }} />
                    <span className="font-medium">Client: {client}</span>
                  </div>
                )}
                {date && (
                  <div className="flex items-center gap-3 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-lg">
                    {/* ✅ Icône avec couleur inline */}
                    <FaCalendarAlt className="w-4 h-4" style={{ color: colors.solid }} />
                    <span className="font-medium">{formatDate(date)}</span>
                  </div>
                )}
              </motion.div>
            )}
            
            {/* CTA sophistiqué */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={ctaControls}
              className="flex flex-wrap gap-4 pt-4"
            >
              {projectUrl && (
                <Link
                  href={projectUrl}
                  target="_blank"
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  style={{ backgroundColor: colors.solid }}
                >
                  <FaPlay className="w-4 h-4" />
                  Voir le projet
                  <FaArrowRight className="w-4 h-4" />
                </Link>
              )}
              
              <Link
                href="#details"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-semibold border-2 hover:bg-white/50 transition-all duration-300"
                style={{ 
                  borderColor: colors.solid,
                  color: colors.solid 
                }}
              >
                Découvrir les détails
                <FaArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </motion.div>
          
          {/* Galerie d'images - 5 colonnes */}
          <motion.div 
            className="lg:col-span-5 relative"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* Image principale avec parallax */}
            <motion.div 
              style={{ scale: imageScale }}
              className="relative h-[500px] lg:h-[600px] rounded-3xl overflow-hidden shadow-2xl"
            >
              <Image
                src={mainImage}
                alt={title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              
              {/* Overlay gradient subtil */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
            </motion.div>
            
            {/* Images supplémentaires flottantes */}
            {additionalImages.map((imgUrl, index) => (
              <motion.div
                key={`additional-${index}`}
                className="absolute w-24 h-24 md:w-32 md:h-32 rounded-2xl overflow-hidden shadow-xl border-4 border-white"
                style={{
                  top: `${20 + index * 15}%`,
                  right: index % 2 === 0 ? '-10%' : '-15%',
                  zIndex: 10 + index
                }}
                initial={{ opacity: 0, x: 50, y: 30 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.2 }}
                whileHover={{ scale: 1.1, zIndex: 20 }}
              >
                <Image
                  src={imgUrl}
                  alt={`${title} - Image ${index + 2}`}
                  fill
                  className="object-cover"
                  sizes="150px"
                />
              </motion.div>
            ))}
            
            {/* Effets décoratifs */}
            <div 
              className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full opacity-10 blur-3xl"
              style={{ backgroundColor: colors.solid }}
            />
            <div 
              className="absolute -top-8 -left-8 w-24 h-24 rounded-full opacity-10 blur-2xl"
              style={{ backgroundColor: colors.solid }}
            />
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  )
}