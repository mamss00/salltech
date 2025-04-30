// frontend/src/app/services/page.js

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ServiceCard from '@/components/services/ServiceCard'
import CTAButton from '@/components/CTAButton'
import { getServices } from '@/utils/api'

export const metadata = {
  title: 'Nos Services | SALLTECH',
  description: 'Découvrez l\'ensemble des services digitaux proposés par SALLTECH pour accompagner votre entreprise dans sa transformation numérique.',
}

export default async function ServicesIndexPage() {
  // Récupérer tous les services depuis Strapi
  const services = await getServices();
  
  // Trier les services par ordre d'affichage
  const sortedServices = [...services].sort((a, b) => {
    const orderA = a.attributes?.ordre_affichage || 99;
    const orderB = b.attributes?.ordre_affichage || 99;
    return orderA - orderB;
  });

  return (
    <>
      <Header />
      
      <main className="pt-32">
        {/* Hero section */}
        <section className="py-20 relative overflow-hidden">
          {/* Éléments d'arrière-plan animés */}
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-blue/10 rounded-full blur-3xl animate-float-1"></div>
          <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-purple/10 rounded-full blur-3xl animate-float-2"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-5xl max-h-5xl bg-gradient-to-br from-blue/5 via-purple/5 to-red/5 rounded-full blur-3xl opacity-50 animate-float-3"></div>
          
          <div className="container relative z-10">
            <div className="text-center max-w-5xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
                Nos <span className="gradient-text bg-gradient-text bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-shift">Services</span>
              </h1>
              
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-12">
                SALLTECH propose une gamme complète de services numériques adaptés aux besoins des 
                entreprises mauritaniennes. De la conception de sites web à l'hébergement cloud en passant 
                par le développement d'applications mobiles et le référencement, nous vous accompagnons 
                dans votre transformation digitale.
              </p>
              
              <div className="max-w-4xl mx-auto">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-100 shadow-lg">
                  <div className="flex flex-col md:flex-row items-center">
                    <div className="mb-6 md:mb-0 md:mr-8">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue to-purple rounded-xl flex items-center justify-center text-white">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Vous ne savez pas quel service correspond à vos besoins ?</h3>
                      <p className="text-gray-600 mb-4">Contactez notre équipe pour une consultation gratuite et personnalisée.</p>
                      <CTAButton href="/contact" variant="primary">
                        Demander un conseil
                      </CTAButton>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Liste des services */}
        <section className="py-20 bg-gray-50">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sortedServices.map((service, index) => (
                <ServiceCard 
                  key={service.id || index}
                  service={service.attributes}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>
        
        {/* Section Méthodologie */}
        <section className="py-20">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Notre <span className="gradient-text">Méthodologie</span></h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Nous suivons un processus structuré pour assurer la qualité, les délais et la satisfaction de nos clients.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="relative">
                <div className="bg-white rounded-2xl shadow-md p-6 h-full relative z-10">
                  <div className="w-14 h-14 bg-blue/10 rounded-xl flex items-center justify-center text-blue mb-4">
                    <span className="text-xl font-bold">1</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3">Analyse des besoins</h3>
                  <p className="text-gray-600">Nous étudions en détail vos exigences, objectifs et contraintes pour définir le périmètre du projet.</p>
                </div>
                <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 z-0">
                  <svg className="w-12 h-12 text-blue/20" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M13.92 8.08L18.5 3.5l-5-5L9.93 7.07 8.5 8.5 3 14l2 2 7-7 1.42 1.42-7 7 2 2 5.5-5.5 1.42 1.42 8.58-8.58-3-3z"></path>
                  </svg>
                </div>
              </div>
              
              <div className="relative">
                <div className="bg-white rounded-2xl shadow-md p-6 h-full relative z-10">
                  <div className="w-14 h-14 bg-purple/10 rounded-xl flex items-center justify-center text-purple mb-4">
                    <span className="text-xl font-bold">2</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3">Conception</h3>
                  <p className="text-gray-600">Nous élaborons l'architecture du projet, créons les maquettes et définissons les spécifications techniques.</p>
                </div>
                <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 z-0">
                  <svg className="w-12 h-12 text-purple/20" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M13.92 8.08L18.5 3.5l-5-5L9.93 7.07 8.5 8.5 3 14l2 2 7-7 1.42 1.42-7 7 2 2 5.5-5.5 1.42 1.42 8.58-8.58-3-3z"></path>
                  </svg>
                </div>
              </div>
              
              <div className="relative">
                <div className="bg-white rounded-2xl shadow-md p-6 h-full relative z-10">
                  <div className="w-14 h-14 bg-red/10 rounded-xl flex items-center justify-center text-red mb-4">
                    <span className="text-xl font-bold">3</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3">Réalisation</h3>
                  <p className="text-gray-600">Notre équipe développe votre solution avec des points d'étape réguliers pour recueillir vos retours.</p>
                </div>
                <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 z-0">
                  <svg className="w-12 h-12 text-red/20" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M13.92 8.08L18.5 3.5l-5-5L9.93 7.07 8.5 8.5 3 14l2 2 7-7 1.42 1.42-7 7 2 2 5.5-5.5 1.42 1.42 8.58-8.58-3-3z"></path>
                  </svg>
                </div>
              </div>
              
              <div className="relative">
                <div className="bg-white rounded-2xl shadow-md p-6 h-full relative z-10">
                  <div className="w-14 h-14 bg-blue/10 rounded-xl flex items-center justify-center text-blue mb-4">
                    <span className="text-xl font-bold">4</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3">Livraison & Suivi</h3>
                  <p className="text-gray-600">Nous déployons votre solution, formons vos équipes et vous accompagnons dans le temps avec un support dédié.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Section CTA */}
        <section className="py-20 bg-gradient-to-r from-blue/5 via-purple/5 to-red/5">
          <div className="container">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/2 p-12 md:p-16 flex items-center">
                  <div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                      Prêt à transformer votre <span className="gradient-text">entreprise</span> ?
                    </h2>
                    <p className="text-lg text-gray-600 mb-8">
                      Contactez SALLTECH dès aujourd'hui pour discuter de votre projet et obtenir un devis personnalisé sans engagement.
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <CTAButton href="/contact" variant="primary">
                        Demander un devis
                      </CTAButton>
                      <CTAButton href="/portfolio" variant="secondary" showDots={false}>
                        Voir nos réalisations
                      </CTAButton>
                    </div>
                  </div>
                </div>
                <div className="md:w-1/2 bg-gradient-to-br from-blue via-purple to-red relative min-h-[300px] md:min-h-0">
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
      </main>
      
      <Footer />
    </>
  )
}