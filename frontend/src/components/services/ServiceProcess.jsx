'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export default function ServiceProcess({ steps, color = 'blue' }) {
  // Animation
  const [processRef, processInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  
  // Trier les étapes par numéro si nécessaire
  const sortedSteps = [...steps].sort((a, b) => a.numero - b.numero);
  
  if (!steps || steps.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="container">
        <motion.div
          ref={processRef}
          initial={{ opacity: 0, y: 20 }}
          animate={processInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Notre <span className={`text-${color}`}>Méthodologie</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Un processus éprouvé pour créer des solutions qui atteignent vos objectifs
            </p>
          </div>
          
          <div className="max-w-5xl mx-auto">
            <div className="relative">
              {/* Ligne verticale de connexion */}
              <div className={`absolute top-0 bottom-0 left-16 md:left-28 w-0.5 bg-${color}/20 z-0 hidden md:block`}></div>
              
              <div className="space-y-12">
                {sortedSteps.map((step, index) => (
                  <div key={index} className="flex flex-col md:flex-row">
                    <div className="md:w-28 flex-shrink-0 flex items-start justify-center mb-4 md:mb-0 relative z-10">
                      <div className={`w-16 h-16 bg-white rounded-full border-2 border-${color} shadow-md flex items-center justify-center text-${color}`}>
                        <span className="text-xl font-bold">{step.numero}</span>
                      </div>
                    </div>
                    <div className="bg-white rounded-2xl shadow-md p-8 md:ml-4 relative z-10">
                      <h3 className={`text-xl font-bold mb-3 text-${color}`}>{step.titre}</h3>
                      <p className="text-gray-600 mb-4">{step.description}</p>
                      
                      {/* Afficher les tags si disponibles */}
                      {step.tags && step.tags.length > 0 && (
                        <div className="flex flex-wrap gap-3">
                          {step.tags.map((tag, tagIndex) => (
                            <span key={tagIndex} className={`inline-block px-3 py-1 text-sm bg-${color}/10 text-${color} rounded-full`}>
                              {tag.texte}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}