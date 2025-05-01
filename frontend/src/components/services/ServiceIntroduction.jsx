'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import DynamicIcon from '@/utils/DynamicIcon'
import { renderRichText } from '@/utils/helpers'

export default function ServiceIntroduction({ content, features, color = 'blue' }) {
  // Animation
  const [contentRef, contentInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  
  // Convertir le code Unicode en emoji si nécessaire
  const getDisplayIcon = (iconStr) => {
    if (!iconStr) return null;
    if (iconStr.startsWith('U+')) {
      try {
        return String.fromCodePoint(parseInt(iconStr.replace('U+', ''), 16));
      } catch (e) {
        return null;
      }
    }
    return iconStr;
  };
  
  return (
    <section className="py-20 bg-gray-50">
      <div className="container">
        <motion.div
          ref={contentRef}
          initial={{ opacity: 0, y: 20 }}
          animate={contentInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-4xl mx-auto">
            {/* Contenu riche de l'introduction */}
            <div className="prose prose-lg max-w-none mb-12">
              {renderRichText(content)}
            </div>
            
            {/* Caractéristiques principales, si disponibles */}
            {features && features.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                {features.map((feature, index) => {
                  // Récupérer l'icône (emoji ou icône)
                  const displayIcon = getDisplayIcon(feature.icone);
                
                  return (
                    <div key={index} className="bg-white p-6 rounded-xl shadow-md">
                      <div className={`w-12 h-12 bg-${color}/10 rounded-lg flex items-center justify-center text-${color} mb-4 mx-auto`}>
                        {displayIcon ? (
                          <span className="text-2xl">{displayIcon}</span>
                        ) : feature.icone && !feature.icone.startsWith('U+') ? (
                          <DynamicIcon 
                            icon={feature.icone} 
                            className="w-6 h-6"
                            colorClass={`text-${color}`}
                          />
                        ) : (
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                        )}
                      </div>
                      <h3 className="text-xl font-semibold mb-2 text-center">{feature.titre}</h3>
                      <p className="text-gray-600 text-center">{feature.description}</p>
                    </div>
                  );
                })}
              </div>
            )}
            
            {/* Encadré d'information supplémentaire */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
              <div className="flex flex-col md:flex-row items-center">
                <div className="mb-6 md:mb-0 md:mr-8">
                  <div className={`w-16 h-16 bg-gradient-to-r from-${color} to-purple rounded-xl flex items-center justify-center text-white`}>
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"></path>
                    </svg>
                  </div>
                </div>
                <div className="text-left">
                  <h3 className="text-xl font-semibold mb-2">Pourquoi choisir SALLTECH ?</h3>
                  <p className="text-gray-600">
                    Notre expertise technique combinée à notre connaissance approfondie du marché mauritanien nous permet 
                    de créer des solutions parfaitement adaptées à vos besoins spécifiques et à votre contexte local.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}