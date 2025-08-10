// frontend/src/components/projects/ProjectProcess.jsx
'use client'

import { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  FaSearchengin, FaPalette, FaCode, FaRocket, FaCloudUploadAlt,
  FaCheckCircle, FaArrowRight, FaClock, FaUsers, FaCog
} from 'react-icons/fa'

export default function ProjectProcess({ steps, color = 'blue', projectTitle }) {
  // Animation au défilement
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })
  
  const sectionOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8])
  
  // Animation d'apparition
  const [titleRef, titleInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [timelineRef, timelineInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  
  // Contrôles d'animation
  const titleControls = useAnimation()
  const badgeControls = useAnimation()
  
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

  // Mapping des icônes
  const iconMap = {
    'FaSearchengin': FaSearchengin,
    'FaPalette': FaPalette,
    'FaCode': FaCode,
    'FaRocket': FaRocket,
    'FaCloudUploadAlt': FaCloudUploadAlt,
    'FaCheckCircle': FaCheckCircle,
    'FaClock': FaClock,
    'FaUsers': FaUsers
  }

  const getIcon = (iconName) => {
    return iconMap[iconName] || FaRocket
  }

  // Animation séquentielle du titre
  useEffect(() => {
    if (titleInView) {
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
      }
      sequence()
    }
  }, [titleInView, titleControls, badgeControls])

  // Animation variants pour les étapes
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }
  
  const stepVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  }

  const lineVariants = {
    hidden: { scaleY: 0 },
    visible: {
      scaleY: 1,
      transition: { duration: 1.5, ease: "easeInOut" }
    }
  }

  // Styles pour les backgrounds
  const sectionStyle = {
    background: `linear-gradient(180deg, #ffffff 0%, rgba(${colors.rgb}, 0.02) 50%, #ffffff 100%)`
  }

  const badgeStyle = {
    background: `rgba(${colors.rgb}, 0.1)`,
    border: `1px solid rgba(${colors.rgb}, 0.15)`,
    color: colors.solid
  }

  return (
    <motion.section 
      ref={sectionRef}
      id="details"
      style={{ 
        opacity: sectionOpacity,
        ...sectionStyle
      }}
      className="py-24 relative overflow-hidden"
    >
      {/* Background décoratif subtil */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-1/4 right-10 w-32 h-32 rounded-full opacity-5"
          style={{ backgroundColor: colors.solid }}
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 15, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-1/4 left-10 w-24 h-24 rounded-full opacity-5"
          style={{ backgroundColor: colors.solid }}
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [360, 180, 0]
          }}
          transition={{ duration: 18, repeat: Infinity }}
        />
      </div>

      <div className="container relative z-10">
        
        {/* En-tête de section */}
        <div className="text-center mb-20">
          <motion.div
            ref={titleRef}
            initial={{ opacity: 0, y: -30, scale: 0.8 }}
            animate={badgeControls}
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full backdrop-blur-sm shadow-lg mb-8"
            style={badgeStyle}
          >
            <div 
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ backgroundColor: colors.solid }}
            >
              <FaCog className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-sm uppercase tracking-wider">
              Méthodologie de développement
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={titleControls}
            className="text-3xl md:text-5xl font-bold text-gray-900 mb-6"
          >
            Notre approche pour{' '}
            <span style={{ color: colors.solid }}>
              {projectTitle || 'ce projet'}
            </span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            Découvrez les étapes clés qui ont permis de mener ce projet à la réussite, 
            de la conception initiale au déploiement final.
          </motion.p>
        </div>

        {/* Timeline des étapes */}
        <motion.div
          ref={timelineRef}
          variants={containerVariants}
          initial="hidden"
          animate={timelineInView ? "visible" : "hidden"}
          className="relative max-w-4xl mx-auto"
        >
          {/* Ligne centrale de la timeline */}
          <motion.div
            variants={lineVariants}
            className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 origin-top transform md:-translate-x-1/2 rounded-full"
            style={{ backgroundColor: `rgba(${colors.rgb}, 0.2)` }}
          />

          {/* Étapes */}
          <div className="space-y-12">
            {steps.map((step, index) => {
              const IconComponent = getIcon(step.icone)
              const isEven = index % 2 === 0
              
              return (
                <motion.div
                  key={index}
                  variants={stepVariants}
                  className={`relative flex items-center ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} flex-row`}
                >
                  {/* Numéro de l'étape */}
                  <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 z-10">
                    <motion.div 
                      className="w-16 h-16 rounded-full flex items-center justify-center border-4 border-white shadow-lg"
                      style={{ backgroundColor: colors.solid }}
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <IconComponent className="w-6 h-6 text-white" />
                    </motion.div>
                  </div>

                  {/* Contenu de l'étape */}
                  <div className={`flex-1 ${isEven ? 'md:pr-16 pl-24' : 'md:pl-16 pl-24'} md:pl-0`}>
                    <motion.div 
                      className={`bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 ${isEven ? 'md:mr-8' : 'md:ml-8'}`}
                      whileHover={{ y: -5 }}
                    >
                      {/* Badge numéro */}
                      <div 
                        className="inline-flex items-center justify-center w-8 h-8 rounded-full text-white text-sm font-bold mb-4"
                        style={{ backgroundColor: colors.solid }}
                      >
                        {index + 1}
                      </div>
                      
                      <h3 className="text-xl font-bold text-gray-900 mb-3">
                        {step.titre}
                      </h3>
                      
                      <div 
                        className="w-12 h-1 rounded-full mb-4"
                        style={{ backgroundColor: colors.solid }}
                      />
                      
                      <p className="text-gray-600 leading-relaxed">
                        {step.description}
                      </p>
                      
                      {/* Durée estimée si disponible */}
                      {step.duree && (
                        <div className="flex items-center gap-2 mt-4 text-sm text-gray-500">
                          <FaClock className="w-3 h-3" />
                          <span>Durée: {step.duree}</span>
                        </div>
                      )}
                    </motion.div>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Résumé final */}
          <motion.div
            variants={stepVariants}
            className="mt-20 text-center"
          >
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 max-w-2xl mx-auto">
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                style={{ backgroundColor: `rgba(${colors.rgb}, 0.1)` }}
              >
                <FaCheckCircle 
                  className="w-8 h-8"
                  style={{ color: colors.solid }}
                />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Résultat final
              </h3>
              
              <p className="text-gray-600 leading-relaxed">
                Cette méthodologie rigoureuse nous a permis de livrer un projet 
                qui dépasse les attentes initiales, dans les délais impartis et 
                avec un niveau de qualité exceptionnel.
              </p>
              
              <div className="flex items-center justify-center gap-6 mt-6 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <FaUsers className="w-4 h-4" style={{ color: colors.solid }} />
                  <span>Équipe dédiée</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaClock className="w-4 h-4" style={{ color: colors.solid }} />
                  <span>Respect des délais</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaRocket className="w-4 h-4" style={{ color: colors.solid }} />
                  <span>Performance optimisée</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  )
}