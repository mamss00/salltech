// frontend/src/app/services/[slug]/page.js

import { notFound } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ServiceHero from '@/components/services/ServiceHero'
import ServiceIntroduction from '@/components/services/ServiceIntroduction'
import ServiceFeatures from '@/components/services/ServiceFeatures'
import ServiceProcess from '@/components/services/ServiceProcess'
import ServiceTechnologies from '@/components/services/ServiceTechnologies'
import ServicePortfolio from '@/components/services/ServicePortfolio'
import ServiceFAQ from '@/components/services/ServiceFAQ'
import ServiceCTA from '@/components/services/ServiceCTA'
import { getServiceBySlug, getAllServiceSlugs } from '@/utils/api'

// Générer les routes statiques pour tous les services
export async function generateStaticParams() {
  try {
    const slugs = await getAllServiceSlugs()
    return slugs.map(slug => ({ slug }))
  } catch (error) {
    console.error('Erreur lors de la génération des chemins statiques :', error)
    return []
  }
}

// Définir les métadonnées de la page pour le SEO
export async function generateMetadata({ params }) {
  try {
    const { slug } = params
    const serviceData = await getServiceBySlug(slug)
    
    if (!serviceData) {
      return {
        title: 'Service introuvable | SALLTECH',
        description: 'La page que vous recherchez n\'existe pas.'
      }
    }

    const { seo } = serviceData
    
    return {
      title: seo?.metaTitle || `${serviceData.titre} | SALLTECH`,
      description: seo?.metaDescription || serviceData.description_courte,
      openGraph: {
        title: seo?.metaTitle || `${serviceData.titre} | SALLTECH`,
        description: seo?.metaDescription || serviceData.description_courte,
        images: seo?.metaImage?.url ? [{ url: seo.metaImage.url }] : []
      }
    }
  } catch (error) {
    console.error('Erreur lors de la génération des métadonnées :', error)
    return {
      title: 'Services | SALLTECH',
      description: 'Découvrez nos services sur mesure.'
    }
  }
}

// Page principale du service
export default async function ServicePage({ params }) {
  // Récupérer les données du service depuis Strapi en utilisant le slug
  const { slug } = params
  const serviceData = await getServiceBySlug(slug)
  
  // Si le service n'existe pas, afficher une page 404
  if (!serviceData) {
    notFound()
  }
  
  // Extraire les données du service
  const {
    titre,
    titre_page,
    description_courte,
    introduction,
    image_principale,
    icone,
    couleur,
    caracteristiques,
    types_services,
    methodologie,
    technologies,
    projets_lies,
    faq
  } = serviceData
  
  // Déterminer la couleur principale pour les accents visuels
  const mainColor = couleur?.includes('blue') ? 'blue' : 
                   couleur?.includes('purple') ? 'purple' : 
                   couleur?.includes('red') ? 'red' : 'blue'

  return (
    <>
      <Header />
      
      <main className="pt-32">
        {/* Section Hero avec les informations de base du service */}
        <ServiceHero 
          title={titre_page || titre}
          description={description_courte}
          image={image_principale}
          icon={icone}
          color={mainColor}
        />
        
        {/* Section Introduction détaillée */}
        {introduction && (
          <ServiceIntroduction 
            content={introduction}
            features={caracteristiques}
            color={mainColor}
          />
        )}
        
        {/* Section des caractéristiques ou types de services */}
        {types_services && types_services.length > 0 && (
          <ServiceFeatures 
            features={types_services}
            color={mainColor}
          />
        )}
        
        {/* Méthodologie - processus de réalisation */}
        {methodologie && methodologie.length > 0 && (
          <ServiceProcess 
            steps={methodologie}
            color={mainColor}
          />
        )}
        
        {/* Technologies utilisées */}
        {technologies && technologies.length > 0 && (
          <ServiceTechnologies 
            technologies={technologies}
            color={mainColor}
          />
        )}
        
        {/* Projets liés à ce service */}
        {projets_lies && projets_lies.length > 0 && (
          <ServicePortfolio 
            projects={projets_lies}
            color={mainColor}
          />
        )}
        
        {/* Questions fréquentes */}
        {faq && faq.length > 0 && (
          <ServiceFAQ 
            questions={faq}
            color={mainColor}
          />
        )}
        
        {/* Appel à l'action */}
        <ServiceCTA 
          serviceName={titre}
          color={mainColor}
        />
      </main>
      
      <Footer />
    </>
  )
}