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
    // Utiliser directement Ordreaffichage sans passer par attributes
    const orderA = a.Ordreaffichage || 99;
    const orderB = b.Ordreaffichage || 99;
    return orderA - orderB;
  });

  return (
    <>
      <Header />
      
      <main className="pt-32">
        {/* Hero section reste inchangée */}
        {/* ... */}
        
        {/* Liste des services - passage direct du service */}
        <section className="py-20 bg-gray-50">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sortedServices.map((service, index) => (
                <ServiceCard 
                  key={service.id || index}
                  service={service} // Passer directement le service sans .attributes
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>
        
        {/* Le reste de la page reste inchangé */}
        {/* ... */}
      </main>
      
      <Footer />
    </>
  )
}