'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import DynamicIcon from '@/utils/DynamicIcon'
import CTAButton from '@/components/CTAButton'
import { getStrapiMediaUrl } from '@/utils/helpers'

export default function ServiceHero({ title, description, image, icon, color = 'blue' }) {
  // Animation
  const [titleRef, titleInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  
  // Gérer l'image par défaut si nécessaire
  const imageUrl = image && image.attributes ? 
    getStrapiMediaUrl(image.attributes.url) : 
    '/images/services/default-service.jpg'
  
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Éléments d'arrière-plan animés */}
      <div className={`absolute -top-20 -right-20 w-96 h-96 bg-${color}/10 rounded-full blur-3xl animate-float-1`}></div>
      <div className={`absolute -bottom-20 -left-20 w-96 h-96 bg-${color}/10 rounded-full blur-3xl animate-float-2`}></div>
      <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-5xl max-h-5xl bg-${color}/5 rounded-full blur-3xl opacity-50 animate-float-3`}></div>
      
      <div className="container relative z-10">
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row items-center gap-8 md:gap-16"
        >
          <div className="md:w-7/12">
            <span className="inline-block text-gray-600 font-semibold tracking-wider uppercase text-sm mb-4">NOS SERVICES</span>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
              {title}
            </h1>
            
            <div className={`h-1 w-24 bg-${color} mb-8`}></div>
            
            <p className="text-lg md:text-xl text-gray-600 mb-8">
              {description}
            </p>
            
            <div className="flex flex-wrap gap-4">
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
            </div>
          </div>
          
          <div className="md:w-5/12 relative">
            <div className="relative h-[400px] w-full rounded-2xl overflow-hidden shadow-xl">
              {image ? (
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
              <div className={`absolute inset-0 bg-gradient-to-br from-${color}/80 to-purple/80 mix-blend-multiply opacity-60`}></div>
            </div>
            
            {/* Icône flottante */}
            <div className={`absolute -bottom-10 -left-10 w-20 h-20 bg-white rounded-2xl shadow-lg flex items-center justify-center text-${color}`}>
              <DynamicIcon 
                icon={icon} 
                className="w-10 h-10"
                colorClass={`text-${color}`}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}