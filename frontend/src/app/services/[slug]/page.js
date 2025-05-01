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
    title: service.seo?.metaTitle || `${service.Titre} | SALLTECH`,
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

  console.log("📦 Données complètes du service :", service)

  if (!service) {
    console.warn("⚠️ Aucune donnée trouvée pour le slug :", params.slug)
    return notFound()
  }

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

  const titre = titre_page || Titre
  const description = Description?.[0]?.children?.[0]?.text || ''
  const image = Image?.[0] || null
  const icon = Emoji
  const color = Couleur?.includes('blue')
    ? 'blue'
    : Couleur?.includes('purple')
    ? 'purple'
    : Couleur?.includes('red')
    ? 'red'
    : 'gray'

  return (
    <>
      <Header />
      <main className="pt-32">
        <ServiceHero title={titre} description={description} image={image} icon={icon} color={color} />
        {introduction?.length > 0 && (
          <ServiceIntroduction content={introduction} features={caracteristiques || []} color={color} />
        )}
        {types_services?.length > 0 && (
          <ServiceFeatures features={types_services} color={color} />
        )}
        {methodologie?.length > 0 && (
          <ServiceProcess steps={methodologie} color={color} />
        )}
        {technologies?.length > 0 && (
          <ServiceTechnologies technologies={technologies} color={color} />
        )}
        {projets_lies?.length > 0 && (
          <ServicePortfolio projects={projets_lies} color={color} />
        )}
        {faq?.length > 0 && <ServiceFAQ questions={faq} color={color} />}
        <ServiceCTA serviceName={titre} color={color} />
      </main>
      <Footer />
    </>
  )
}
