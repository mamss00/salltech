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
import { getServiceBySlug, getAllServiceSlugs, getAllServices } from '@/utils/api'

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
      title: seo?.metaTitle || `${serviceData.Titre || serviceData.titre || 'Service'} | SALLTECH`,
      description: seo?.metaDescription || serviceData.description_courte || serviceData.Description,
      openGraph: {
        title: seo?.metaTitle || `${serviceData.Titre || serviceData.titre || 'Service'} | SALLTECH`,
        description: seo?.metaDescription || serviceData.description_courte || serviceData.Description,
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
  console.log('Slug demandé:', slug) // Ajout d'un log
  
  // Récupérer tous les services et trouver celui correspondant au slug
  let serviceData;
  let allServices;
  
  try {
    // Récupérer tous les services
    allServices = await getAllServices();
    console.log('Nombre de services trouvés:', allServices.length);
    
    // Lister tous les slugs disponibles pour le débogage
    const availableSlugs = allServices.map(s => s.attributes.slug);
    console.log('Slugs disponibles:', availableSlugs);
    
    // Chercher le service correspondant au slug
    const service = allServices.find(s => s.attributes.slug === slug);
    
    if (service) {
      serviceData = service.attributes;
      console.log('Service trouvé:', serviceData.Titre || serviceData.titre);
    } else {
      console.log('Aucun service trouvé avec le slug:', slug);
      
      // Affichage d'une page 404 personnalisée
      return (
        <>
          <Header />
          <main className="pt-32 min-h-screen flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-4">Service non trouvé</h1>
              <p className="text-xl mb-6">Le service avec le slug '{slug}' n'existe pas ou n'est pas accessible.</p>
              <p className="mb-6">Veuillez vérifier que ce service existe dans votre CMS Strapi.</p>
              <a href="/services" className="text-blue hover:underline">Voir tous nos services</a>
            </div>
          </main>
          <Footer />
        </>
      )
    }
  } catch (error) {
    console.error('Erreur lors de la récupération des services:', error);
    
    // Affichage d'une page d'erreur
    return (
      <>
        <Header />
        <main className="pt-32 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Erreur lors du chargement</h1>
            <p className="text-xl mb-6">Une erreur s'est produite lors du chargement du service '{slug}'</p>
            <pre className="bg-gray-100 p-4 rounded-md text-left overflow-auto mb-6 max-w-2xl mx-auto">
              {error.toString()}
            </pre>
            <a href="/services" className="text-blue hover:underline">Voir tous nos services</a>
          </div>
        </main>
        <Footer />
      </>
    )
  }
  
  // Si nous sommes ici, c'est que nous avons trouvé le service
  // Extraire les données du service (adaptation pour gérer différentes structures de données)
  const titre = serviceData.titre_page || serviceData.Titre || serviceData.titre || 'Service'
  const description = serviceData.description_courte || serviceData.Description || ''
  const introduction = serviceData.introduction || null
  const image = serviceData.image_principale || serviceData.Image || null
  const icone = serviceData.icone || null
  const couleur = serviceData.couleur || serviceData.Couleur || ''
  const caracteristiques = serviceData.caracteristiques || []
  const types_services = serviceData.types_services || []
  const methodologie = serviceData.methodologie || []
  const technologies = serviceData.technologies || []
  const projets_lies = serviceData.projets_lies?.data || []
  const faq = serviceData.faq || []
  
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
          title={titre}
          description={description}
          image={image}
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