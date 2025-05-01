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

// Génération statique des chemins
export async function generateStaticParams() {
  const slugs = await getAllServiceSlugs()
  return slugs.map(({ slug }) => ({ slug }))
}

// Métadonnées SEO
export async function generateMetadata({ params }) {
  const service = await getServiceBySlug(params.slug)
  if (!service) return { title: 'Service introuvable | SALLTECH' }

  const titre = service.Titre || 'Service'
  const description = service.seo?.metaDescription || service.Description?.[0]?.children?.[0]?.text || `Découvrez notre service ${titre}`

  return {
    title: service.seo?.metaTitle || `${titre} | SALLTECH`,
    description,
    openGraph: {
      title: service.seo?.metaTitle || `${titre} | SALLTECH`,
      description
    }
  }
}

// Rendu de la page
export default async function Page({ params }) {
  const { slug } = params
  const service = await getServiceBySlug(slug)

  if (!service) return notFound()

  const titre = service.titre_page || service.Titre
  const description = service.Description?.[0]?.children?.[0]?.text || ''
  const introduction = service.introduction || []
  const image = Array.isArray(service.Image) ? service.Image[0] : null
  const icone = service.Emoji
  const couleur = service.Couleur || ''
  const caracteristiques = service.caracteristiques || []
  const types_services = service.types_services || []
  const methodologie = service.methodologie || []
  const technologies = service.technologies || []
  const projets_lies = Array.isArray(service.projets_lies) ? service.projets_lies : []
  const faq = service.faq || []

  const mainColor = couleur.includes('blue')
    ? 'blue'
    : couleur.includes('purple')
    ? 'purple'
    : couleur.includes('red')
    ? 'red'
    : 'gray'

  return (
    <>
      <Header />
      <main className="pt-32">
        <ServiceHero
          title={titre}
          description={description}
          image={image}
          icon={icone}
          color={mainColor}
        />
        {introduction.length > 0 && (
          <ServiceIntroduction
            content={introduction}
            features={caracteristiques}
            color={mainColor}
          />
        )}
        {types_services.length > 0 && (
          <ServiceFeatures features={types_services} color={mainColor} />
        )}
        {methodologie.length > 0 && (
          <ServiceProcess steps={methodologie} color={mainColor} />
        )}
        {technologies.length > 0 && (
          <ServiceTechnologies technologies={technologies} color={mainColor} />
        )}
        {projets_lies.length > 0 && (
          <ServicePortfolio projects={projets_lies} color={mainColor} />
        )}
        {faq.length > 0 && <ServiceFAQ questions={faq} color={mainColor} />}
        <ServiceCTA serviceName={titre} color={mainColor} />
      </main>
      <Footer />
    </>
  )
}
