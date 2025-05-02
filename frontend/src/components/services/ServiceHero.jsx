'use client'

import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import DynamicIcon from '@/utils/DynamicIcon'
import CTAButton from '@/components/CTAButton'
import { getStrapiMediaUrl } from '@/utils/helpers'

export default function EnhancedServiceHero({ title, description, image, icon, color = 'blue' }) {
  // Animation avec plusieurs effets
  const [titleRef, titleInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [contentRef, contentInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  
  // Animation au défilement
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })
  
  // Transformations basées sur le défilement
  const imageScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1])
  const imageBrightness = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.8])
  
  // Gérer l'image
  const imageUrl = image ? 
    getStrapiMediaUrl(image.url || (image.formats?.medium?.url || image.formats?.small?.url || image.formats?.thumbnail?.url)) : 
    '/images/services/default-service.jpg'
  
  // Convertir le code Unicode en emoji si nécessaire
  const displayIcon = icon?.startsWith('U+') 
    ? String.fromCodePoint(parseInt(icon.replace('U+', ''), 16)) 
    : icon || '💡'
    
  // Effet de particules pour l'arrière-plan
  const particlesRef = useRef(null)
  
  useEffect(() => {
    // Créer un effet de particules en mouvement
    let particles = []
    const canvas = particlesRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    const dpr = window.devicePixelRatio || 1
    
    // Définir la taille du canvas
    const updateCanvasSize = () => {
      const container = canvas.parentElement
      canvas.width = container.clientWidth * dpr
      canvas.height = container.clientHeight * dpr
      ctx.scale(dpr, dpr)
    }
    
    // Initialiser les particules
    const initParticles = () => {
      particles = []
      const particleCount = Math.min(Math.floor(window.innerWidth / 10), 50)
      
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width / dpr,
          y: Math.random() * canvas.height / dpr,
          radius: Math.random() * 2 + 1,
          color: getParticleColor(),
          speedX: Math.random() * 0.5 - 0.25,
          speedY: Math.random() * 0.5 - 0.25,
          opacity: Math.random() * 0.5 + 0.1
        })
      }
    }
    
    // Obtenir une couleur de particule basée sur la couleur principale
    const getParticleColor = () => {
      const colors = {
        blue: 'rgba(52, 152, 219, %o)',
        purple: 'rgba(155, 89, 182, %o)',
        red: 'rgba(231, 76, 60, %o)'
      }
      
      const baseColor = colors[color] || colors.blue
      return baseColor.replace('%o', Math.random() * 0.4 + 0.1)
    }
    
    // Animer les particules
    const animateParticles = () => {
      ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr)
      
      particles.forEach(p => {
        p.x += p.speedX
        p.y += p.speedY
        
        // Rebondir sur les bords
        if (p.x < 0 || p.x > canvas.width / dpr) p.speedX *= -1
        if (p.y < 0 || p.y > canvas.height / dpr) p.speedY *= -1
        
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.fill()
      })
      
      // Dessiner des lignes entre particules proches
      ctx.strokeStyle = `rgba(${color === 'blue' ? '52, 152, 219' : color === 'purple' ? '155, 89, 182' : '231, 76, 60'}, 0.1)`
      ctx.lineWidth = 0.3
      
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          if (distance < 100) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }
      
      requestAnimationFrame(animateParticles)
    }
    
    // Initialiser
    updateCanvasSize()
    initParticles()
    window.addEventListener('resize', () => {
      updateCanvasSize()
      initParticles()
    })
    
    // Démarrer l'animation
    const animation = requestAnimationFrame(animateParticles)
    
    // Nettoyer
    return () => {
      window.removeEventListener('resize', updateCanvasSize)
      cancelAnimationFrame(animation)
    }
  }, [color])

  // Liste des mots-clés pour l'animation de texte
  const keywords = title.split(' ').filter(word => word.length > 3).slice(0, 3)
  
  return (
    <section ref={containerRef} className="min-h-screen py-20 relative overflow-hidden flex items-center">
      {/* Canvas pour les particules d'arrière-plan */}
      <canvas
        ref={particlesRef} 
        className="absolute inset-0 w-full h-full z-0"
      ></canvas>
      
      {/* Éléments d'arrière-plan animés */}
      <div className={`absolute -top-20 -right-20 w-96 h-96 bg-${color}/10 rounded-full blur-3xl animate-float-1`}></div>
      <div className={`absolute -bottom-20 -left-20 w-96 h-96 bg-${color}/10 rounded-full blur-3xl animate-float-2`}></div>
      <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-5xl max-h-5xl bg-${color}/5 rounded-full blur-3xl opacity-50 animate-float-3`}></div>
      
      <div className="container relative z-10 py-16">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
          <motion.div 
            ref={contentRef}
            style={{ opacity: contentOpacity }}
            className="md:w-7/12"
          >
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={contentInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="inline-block text-gray-600 font-semibold tracking-wider uppercase text-sm mb-4 pl-1"
            >
              NOS SERVICES
            </motion.span>
            
            <motion.h1
              ref={titleRef}
              initial={{ opacity: 0 }}
              animate={titleInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-extrabold mb-6"
            >
              {title.split(' ').map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={titleInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ 
                    duration: 0.5, 
                    delay: 0.1 * i,
                    type: "spring",
                    stiffness: 100
                  }}
                  className={`inline-block mr-3 ${keywords.includes(word) ? `text-${color}` : ''}`}
                >
                  {word}
                </motion.span>
              ))}
            </motion.h1>
            
            <motion.div 
              initial={{ width: 0 }}
              animate={titleInView ? { width: "6rem" } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className={`h-1 bg-${color} mb-8`}
            ></motion.div>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={contentInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg md:text-xl text-gray-600 mb-8"
            >
              {description}
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={contentInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <CTAButton 
                href="/contact" 
                variant="primary" 
                showDots={true}
              >
                Demander un devis
              </CTAButton>
              <CTAButton 
                href="#portfolio" 
                variant="secondary" 
                showDots={false}
              >
                Voir nos réalisations
              </CTAButton>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="md:w-5/12 relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={contentInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ 
              duration: 0.8,
              delay: 0.4,
              type: "spring",
              stiffness: 50
            }}
          >
            <motion.div 
              style={{ 
                scale: imageScale,
                filter: `brightness(${imageBrightness})`
              }}
              className="relative h-[400px] w-full rounded-2xl overflow-hidden shadow-xl"
            >
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt={title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              ) : (
                <div className={`absolute inset-0 bg-gradient-to-br from-${color}/80 to-purple/80`}></div>
              )}
              
              {/* Overlay de couleur */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                transition={{ duration: 1 }}
                className={`absolute inset-0 bg-gradient-to-br from-${color}/80 to-purple/80 mix-blend-multiply`}
              ></motion.div>
              
              {/* Motif géométrique */}
              <svg width="100%" height="100%" className="absolute inset-0 opacity-20">
                <defs>
                  <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
                    <path d="M 30 0 L 0 0 0 30" fill="none" stroke="white" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
              
              {/* Effet de surbrillance */}
              <motion.div
                initial={{ x: "-100%", opacity: 0.5 }}
                animate={{ x: "100%" }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity, 
                  repeatDelay: 3 
                }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 w-1/2"
              ></motion.div>
            </motion.div>
            
            {/* Icône flottante */}
            <motion.div 
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                duration: 0.6, 
                delay: 0.8,
                type: "spring",
                stiffness: 100
              }}
              className={`absolute -bottom-10 -left-10 w-24 h-24 bg-white rounded-2xl shadow-lg flex items-center justify-center text-${color}`}
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, 0, -5, 0]
                }}
                transition={{ 
                  duration: 5, 
                  repeat: Infinity,
                  repeatType: "mirror"
                }}
              >
                {typeof displayIcon === 'string' ? (
                  <span className="text-4xl">{displayIcon}</span>
                ) : (
                  <DynamicIcon 
                    icon={displayIcon} 
                    className="w-12 h-12"
                    colorClass={`text-${color}`}
                    fallback="💡"
                  />
                )}
              </motion.div>
            </motion.div>
            
            {/* Formes décoratives */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 0.8, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="absolute -bottom-6 -right-6 w-12 h-12 rounded-full border-4 border-purple/30"
            ></motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 0.8, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="absolute -top-6 right-12 w-8 h-8 bg-red/20 rounded-lg"
            ></motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}