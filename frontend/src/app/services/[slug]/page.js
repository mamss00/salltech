// app/services/[slug]/page.js
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

export async function generateStaticParams() {
  const slugs = await getAllServiceSlugs()
  return slugs.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }) {
  const service = await getServiceBySlug(params.slug)

  if (!service) {
    return {
      title: 'Service introuvable | SALLTECH',
      description: 'Ce service est introuvable.'
    }
  }

  return {
    title: service.seo?.metaTitle || `${service.titre_page || service.Titre || 'Service'} | SALLTECH`,
    description: service.seo?.metaDescription || '',
    openGraph: {
      title: service.seo?.metaTitle || '',
      description: service.seo?.metaDescription || ''
    },
    keywords: service.seo?.keywords || ''
  }
}

export default async function Page({ params }) {
  const service = await getServiceBySlug(params.slug)

  if (!service) return notFound()

  // Extraire les données du service
  const {
    titre_page,
    Titre,
    Description,
    introduction,
    Image,
    Emoji,
    Couleur,
    caracteristiques,
    types_services,
    methodologie,
    technologies,
    projets_lies,
    faq
  } = service

  // Préparer les données formatées pour les composants
  const titreFinal = titre_page || Titre || 'Service'
  
  // Extraire le texte de description depuis la structure RichText
  const description = Description?.[0]?.children?.[0]?.text || ''
  
  // Déterminer la couleur principale à partir de la classe CSS
  const color = Couleur?.includes('blue') 
    ? 'blue' 
    : Couleur?.includes('purple') 
      ? 'purple' 
      : Couleur?.includes('red') 
        ? 'red' 
        : 'blue'

  return (
    <>
      <Header />
      <main className="pt-32">
        {/* Héro du service */}
        <ServiceHero 
          title={titreFinal} 
          description={description} 
          image={Image && Image.length > 0 ? Image[0] : null} 
          icon={Emoji} 
          color={color} 
        />
        
        {/* Introduction et caractéristiques */}
        {introduction && introduction.length > 0 && (
          <ServiceIntroduction 
            content={introduction} 
            features={caracteristiques || []} 
            color={color} 
          />
        )}
        
        {/* Types de services */}
        {types_services && types_services.length > 0 && (
          <ServiceFeatures 
            features={types_services} 
            color={color} 
          />
        )}
        
        {/* Méthodologie */}
        {methodologie && methodologie.length > 0 && (
          <ServiceProcess 
            steps={methodologie} 
            color={color} 
          />
        )}
        
        {/* Technologies */}
        {technologies && technologies.length > 0 && (
          <ServiceTechnologies 
            technologies={technologies} 
            color={color} 
          />
        )}
        
        {/* Projets en relation */}
        {projets_lies && projets_lies.length > 0 && (
          <ServicePortfolio 
            projects={projets_lies} 
            color={color} 
          />
        )}
        
        {/* FAQ */}
        {faq && faq.length > 0 && (
          <ServiceFAQ 
            questions={faq} 
            color={color} 
          />
        )}
        
        {/* Call-To-Action */}
        <ServiceCTA 
          serviceName={titreFinal} 
          color={color} 
        />
      </main>
      <Footer />
    </>
  )
}