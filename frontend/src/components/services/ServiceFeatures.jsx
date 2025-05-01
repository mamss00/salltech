'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import DynamicIcon from '@/utils/DynamicIcon'
import { getStrapiMediaUrl } from '@/utils/helpers'

export default function ServiceFeatures({ features, color = 'blue' }) {
  // Animation
  const [featuresRef, featuresInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  
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
  
  if (!features || features.length === 0) {
    return null;
  }

  // Convertir le code Unicode en emoji si nécessaire
  const getDisplayIcon = (iconStr) => {
    if (!iconStr) return null;
    if (iconStr.startsWith('U+')) {
      try {
        return String.fromCodePoint(parseInt(iconStr.replace('U+', ''), 16));
      } catch (e) {
        return '💡';
      }
    }
    return iconStr;
  };

  return (
    <section className="py-20">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ce que nous <span className={`text-${color}`}>proposons</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Nos solutions sont complètes et adaptées à vos besoins spécifiques
          </p>
        </div>
        
        <motion.div
          ref={featuresRef}
          variants={containerVariants}
          initial="hidden"
          animate={featuresInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {features.map((feature, index) => {
            // Récupérer l'icône (émoji ou icône)
            const displayIcon = getDisplayIcon(feature.icone);
            
            // Récupérer l'URL de l'image s'il existe
            let imageUrl = null;
            if (feature.image?.data) {
              imageUrl = getStrapiMediaUrl(feature.image.data.attributes.url);
            } else if (feature.image?.url) {
              imageUrl = getStrapiMediaUrl(feature.image.url);
            }

            return (
              <motion.div 
                key={index}
                variants={itemVariants}
                className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100"
              >
                <div className="p-8">
                  <div className={`w-14 h-14 bg-${color}/10 rounded-xl flex items-center justify-center text-${color} mb-6`}>
                    {displayIcon ? (
                      <span className="text-3xl">{displayIcon}</span>
                    ) : (
                      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                      </svg>
                    )}
                  </div>
                  
                  <h3 className="text-xl font-bold mb-4">{feature.titre}</h3>
                  <p className="text-gray-600 mb-6">{feature.description}</p>
                  
                  {/* Afficher les fonctionnalités spécifiques si disponibles */}
                  {feature.fonctionnalites && feature.fonctionnalites.length > 0 && (
                    <ul className="space-y-3 mb-6">
                      {feature.fonctionnalites.map((item, i) => (
                        <li key={i} className="flex items-start">
                          <svg className={`w-5 h-5 text-${color} mt-0.5 mr-2 flex-shrink-0`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                          <span>{item.texte}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                
                {/* Afficher l'image si disponible */}
                {imageUrl && (
                  <div className="relative h-48 w-full">
                    <Image
                      src={imageUrl}
                      alt={feature.titre}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    {/* Overlay de couleur */}
                    <div className={`absolute inset-0 bg-gradient-to-t from-${color}/40 to-transparent`}></div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  )
}