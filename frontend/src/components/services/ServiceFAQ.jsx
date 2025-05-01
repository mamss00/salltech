'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { renderRichText } from '@/utils/helpers'

export default function ServiceFAQ({ questions, color = 'blue' }) {
  // Animation
  const [faqRef, faqInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  
  // État pour gérer les questions ouvertes
  const [openIndex, setOpenIndex] = useState(null)
  
  // Fonction pour basculer l'état ouvert/fermé d'une question
  const toggleQuestion = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }
  
  if (!questions || questions.length === 0) {
    return null;
  }

  return (
    <section className="py-20">
      <div className="container">
        <motion.div
          ref={faqRef}
          initial={{ opacity: 0, y: 20 }}
          animate={faqInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Questions <span className={`text-${color}`}>Fréquentes</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Des réponses à vos interrogations sur notre service
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="space-y-4">
              {questions.map((item, index) => (
                <div 
                  key={index}
                  className={`bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-300 ${
                    openIndex === index ? 'shadow-lg' : ''
                  }`}
                >
                  <button
                    className="w-full flex justify-between items-center p-6 text-left focus:outline-none"
                    onClick={() => toggleQuestion(index)}
                    aria-expanded={openIndex === index}
                    aria-controls={`faq-content-${index}`}
                  >
                    <h3 className="font-bold text-lg pr-10">{item.question}</h3>
                    <span className={`flex-shrink-0 ml-4 text-${color}`}>
                      {openIndex === index ? (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"></path>
                        </svg>
                      ) : (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                      )}
                    </span>
                  </button>
                  
                  <div 
                    id={`faq-content-${index}`}
                    className={`px-6 pb-6 transition-all duration-300 overflow-hidden ${
                      openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className={`h-px w-full bg-gray-100 mb-4`}></div>
                    <div className="prose prose-sm max-w-none text-gray-600">
                      {renderRichText(item.reponse)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}