'use client'

import Link from 'next/link'
import CTAButton from '@/components/CTAButton'

export default function ServiceCTA({ serviceName, color = 'blue' }) {
  return (
    <section className={`py-20 bg-gradient-to-r from-${color}/5 via-purple/5 to-red/5`}>
      <div className="container">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 p-12 md:p-16 flex items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Prêt à transformer votre <span className="gradient-text">entreprise</span> ?
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  {serviceName ? (
                    <>
                      Contactez SALLTECH dès aujourd'hui pour discuter de votre projet de <span className="font-semibold">{serviceName.toLowerCase()}</span> et obtenir un devis personnalisé sans engagement.
                    </>
                  ) : (
                    <>
                      Contactez SALLTECH dès aujourd'hui pour discuter de votre projet et obtenir un devis personnalisé sans engagement.
                    </>
                  )}
                </p>
                <div className="flex flex-wrap gap-4">
                  <CTAButton href="/contact" variant="primary">
                    Demander un devis
                  </CTAButton>
                  <CTAButton href="/services" variant="secondary" showDots={false}>
                    Voir tous nos services
                  </CTAButton>
                </div>
              </div>
            </div>
            <div className={`md:w-1/2 bg-gradient-to-br from-${color} via-purple to-red relative min-h-[300px] md:min-h-0`}>
              <div className="absolute inset-0 opacity-20">
                <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <defs>
                    <pattern id="grid" width="8" height="8" patternUnits="userSpaceOnUse">
                      <path d="M 8 0 L 0 0 0 8" fill="none" stroke="white" strokeWidth="0.5" />
                    </pattern>
                  </defs>
                  <rect width="100" height="100" fill="url(#grid)" />
                </svg>
              </div>
              <div className="absolute inset-0 flex items-center justify-center p-8">
                <div className="text-white text-center">
                  <svg className="w-16 h-16 mx-auto mb-6 opacity-90" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.672 1.911a1 1 0 10-1.932.518l.259.966a1 1 0 001.932-.518l-.26-.966zM2.429 4.74a1 1 0 10-.517 1.932l.966.259a1 1 0 00.517-1.932l-.966-.26zm8.814-.569a1 1 0 00-1.415-1.414l-.707.707a1 1 0 101.415 1.415l.707-.708zm-7.071 7.072l.707-.707A1 1 0 003.465 9.12l-.708.707a1 1 0 001.415 1.415zm3.2-5.171a1 1 0 00-1.3 1.3l4 10a1 1 0 001.823.075l1.38-2.759 3.018 3.02a1 1 0 001.414-1.415l-3.019-3.02 2.76-1.379a1 1 0 00-.076-1.822l-10-4z" clipRule="evenodd" />
                  </svg>
                  <h3 className="text-2xl font-bold mb-4">Entreprises mauritaniennes de toutes tailles</h3>
                  <p className="text-lg opacity-90">
                    Nous adaptons nos solutions à votre budget et à vos besoins, que vous soyez une startup, une PME ou un grand groupe.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}