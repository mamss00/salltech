'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import { getStrapiMediaUrl } from '@/utils/helpers'

export default function ServiceTechnologies({ technologies, color = 'blue' }) {
  // Animation
  const [techRef, techInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  
  if (!technologies || technologies.length === 0) {
    return null;
  }

  return (
    <section className="py-20">
      <div className="container">
        <motion.div
          ref={techRef}
          initial={{ opacity: 0, y: 20 }}
          animate={techInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Technologies <span className={`text-${color}`}>utilisées</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Nous utilisons les technologies les plus modernes et performantes pour créer vos solutions
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {technologies.map((tech, index) => {
              // Récupérer l'URL du logo s'il existe
              let logoUrl = null;
              if (tech.logo?.data) {
                logoUrl = getStrapiMediaUrl(tech.logo.data.attributes.url);
              } else if (tech.logo?.url) {
                logoUrl = getStrapiMediaUrl(tech.logo.url);
              }

              return (
                <div 
                  key={index} 
                  className="bg-white rounded-xl p-6 shadow-md text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  {logoUrl ? (
                    <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      <Image
                        src={logoUrl}
                        alt={tech.nom || `Technologie ${index + 1}`}
                        width={64}
                        height={64}
                        className="object-contain"
                      />
                    </div>
                  ) : (
                    <div className={`w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-${color}/10 text-${color}`}>
                      <span className="text-xl font-semibold">{tech.nom?.charAt(0) || '?'}</span>
                    </div>
                  )}
                  
                  <h3 className="text-lg font-semibold mb-2">{tech.nom || `Technologie ${index + 1}`}</h3>
                  
                  {tech.description && (
                    <p className="text-sm text-gray-500">{tech.description}</p>
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}