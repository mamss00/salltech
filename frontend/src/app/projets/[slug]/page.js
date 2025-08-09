// frontend/src/app/projets/[slug]/page.js
import { notFound } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

// Composants de projet
import ProjectHero from '@/components/projects/ProjectHero'
import ProjectIntroduction from '@/components/projects/ProjectIntroduction'
import ProjectFeatures from '@/components/projects/ProjectFeatures'
import ProjectTechnologies from '@/components/projects/ProjectTechnologies'
import ProjectGallery from '@/components/projects/ProjectGallery'
import ProjectTestimonial from '@/components/projects/ProjectTestimonial'
import ProjectCTA from '@/components/projects/ProjectCTA'

import { getProjetBySlug, getAllProjetSlugs } from '@/utils/api'

export async function generateStaticParams() {
  const slugs = await getAllProjetSlugs()
  return slugs.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }) {
  const projet = await getProjetBySlug(params.slug)

  if (!projet) {
    return {
      title: 'Projet introuvable | SALLTECH',
      description: 'Ce projet est introuvable.'
    }
  }

  return {
    title: projet.seo?.metaTitle || `${projet.titre_page || projet.Titre || 'Projet'} | SALLTECH`,
    description: projet.seo?.metaDescription || projet.Resume || '',
    openGraph: {
      title: projet.seo?.metaTitle || projet.Titre,
      description: projet.seo?.metaDescription || projet.Resume || '',
      images: [
        {
          url: projet.Imageprincipale?.url || '/images/projects/default-project.jpg',
          width: 1200,
          height: 630,
          alt: projet.Titre
        }
      ]
    },
    keywords: projet.seo?.keywords || ''
  }
}

export default async function ProjetPage({ params }) {
  const projet = await getProjetBySlug(params.slug)

  if (!projet) return notFound()

  // Extraire les données du projet
  const {
    titre_page,
    Titre,
    Resume,
    Description,
    introduction,
    Imageprincipale,
    Imagesadditionnelles,
    Categorie,
    technologies,
    caracteristiques,
    URLduprojet,
    Client,
    Datederealisation
  } = projet

  // Préparer les données formatées
  const titreFinal = titre_page || Titre || 'Projet'
  const resumeFinal = Resume || Description?.[0]?.children?.[0]?.text || ''
  
  // Déterminer la couleur selon la catégorie
  const color = Categorie?.includes('E-commerce') 
    ? 'purple' 
    : Categorie?.includes('Mobile') || Categorie?.includes('App')
      ? 'blue' 
      : Categorie?.includes('Web') || Categorie?.includes('Site')
        ? 'red'
        : 'blue'

  return (
    <>
      <Header />
      
      <main className="pt-24">
        {/* Hero du projet */}
        <ProjectHero 
          title={titreFinal}
          category={Categorie}
          description={resumeFinal}
          image={Imageprincipale}
          client={Client}
          date={Datederealisation}
          projectUrl={URLduprojet}
          color={color}
        />
        
        {/* Introduction détaillée */}
        {(introduction || Description) && (
          <ProjectIntroduction 
            content={introduction || Description}
            features={caracteristiques || []}
            color={color}
          />
        )}
        
        {/* Caractéristiques/Fonctionnalités */}
        {caracteristiques && caracteristiques.length > 0 && (
          <ProjectFeatures 
            features={caracteristiques}
            color={color}
          />
        )}
        
        {/* Technologies utilisées */}
        {technologies && technologies.length > 0 && (
          <ProjectTechnologies 
            technologies={technologies}
            color={color}
          />
        )}
        
        {/* Galerie d'images */}
        {Imagesadditionnelles && Imagesadditionnelles.length > 0 && (
          <ProjectGallery 
            images={[Imageprincipale, ...Imagesadditionnelles].filter(Boolean)}
            projectTitle={titreFinal}
            color={color}
          />
        )}
        
        {/* Témoignage client (si applicable) */}
        {Client && (
          <ProjectTestimonial 
            client={Client}
            projectTitle={titreFinal}
            color={color}
          />
        )}
        
        {/* Call-To-Action */}
        <ProjectCTA 
          projectName={titreFinal}
          projectUrl={URLduprojet}
          color={color}
        />
      </main>
      
      <Footer />
    </>
  )
}