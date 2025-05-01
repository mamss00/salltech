// pages/services/[slug].tsx
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
  const slugs = await getAllServiceSlugs();
  return slugs.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = params;
  const serviceData = await getServiceBySlug(slug);

  if (!serviceData) {
    return {
      title: 'Service introuvable | SALLTECH',
      description: 'La page que vous recherchez n\'existe pas.'
    };
  }

  const title = serviceData.Titre || slug;
  const description = serviceData.Description?.[0]?.children?.[0]?.text || `Découvrez notre service ${title}`;

  return {
    title: `${title} | SALLTECH`,
    description,
    openGraph: {
      title: `${title} | SALLTECH`,
      description,
    }
  };
}

export default async function ServicePage({ params }) {
  const { slug } = params;
  const serviceData = await getServiceBySlug(slug);

  if (!serviceData) return notFound();

  const titre = serviceData.titre_page || serviceData.Titre;
  const description = serviceData.Description?.[0]?.children?.[0]?.text || '';
  const introduction = serviceData.introduction;
  const image = serviceData.Image?.[0] || null;
  const icone = serviceData.Emoji;
  const couleur = serviceData.Couleur || '';
  const caracteristiques = serviceData.caracteristiques || [];
  const types_services = serviceData.types_services || [];
  const methodologie = serviceData.methodologie || [];
  const technologies = serviceData.technologies || [];
  const projets_lies = serviceData.projets_lies || [];
  const faq = serviceData.faq || [];

  const mainColor = couleur.includes('blue') ? 'blue' : couleur.includes('purple') ? 'purple' : couleur.includes('red') ? 'red' : 'gray';

  return (
    <>
      <Header />
      <main className="pt-32">
        <ServiceHero title={titre} description={description} image={image} icon={icone} color={mainColor} />
        {introduction && <ServiceIntroduction content={introduction} features={caracteristiques} color={mainColor} />}
        {types_services.length > 0 && <ServiceFeatures features={types_services} color={mainColor} />}
        {methodologie.length > 0 && <ServiceProcess steps={methodologie} color={mainColor} />}
        {technologies.length > 0 && <ServiceTechnologies technologies={technologies} color={mainColor} />}
        {projets_lies.length > 0 && <ServicePortfolio projects={projets_lies} color={mainColor} />}
        {faq.length > 0 && <ServiceFAQ questions={faq} color={mainColor} />}
        <ServiceCTA serviceName={titre} color={mainColor} />
      </main>
      <Footer />
    </>
  );
}
