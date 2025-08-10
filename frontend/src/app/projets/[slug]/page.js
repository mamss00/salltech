// frontend/src/app/projets/[slug]/page.js - VERSION FINALE CORRIGÉE
import { notFound } from 'next/navigation'

// Composants existants (utilisation des noms corrects)
import ProjectHero from '@/components/projects/ProjectHero'              // ✅ Existe
import ProjectIntroduction from '@/components/projects/ProjectIntroduction' // ✅ Existe  
import ProjectFeatures from '@/components/projects/ProjectFeatures'     // ✅ Existe
import ProjectTechnologies from '@/components/projects/ProjectTechnologies' // ✅ Existe
import ProjectTestimonial from '@/components/projects/ProjectTestimonial'   // ✅ Existe
import ProjectRelated from '@/components/projects/ProjectRelated'       // ✅ Créé précédemment
import ProjectCTA from '@/components/projects/ProjectCTA'               // ✅ Existe

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
    Datederealisation,
    slug
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
        
        {/* Introduction avec contenu riche */}
        <ProjectIntroduction 
          content={introduction || Description}
          features={caracteristiques}
          color={color}
        />

        {/* Fonctionnalités du projet - seulement si il y en a */}
        {caracteristiques && caracteristiques.length > 0 && (
          <ProjectFeatures 
            features={caracteristiques} 
            color={color}
          />
        )}
        
        {/* Technologies - seulement si il y en a */}
        {technologies && technologies.length > 0 && (
          <ProjectTechnologies 
            technologies={technologies}
            color={color}
          />
        )}

        {/* Témoignage client - seulement si il y a un client */}
        {Client && (
          <ProjectTestimonial 
            client={Client}
            projectTitle={titreFinal}
            color={color}
          />
        )}

        {/* Projets connexes */}
        <ProjectRelated 
          currentProjectSlug={slug}
          currentCategory={Categorie}
          color={color}
          maxProjects={3}
        />
        
        {/* CTA final */}
        <ProjectCTA 
          projectName={titreFinal}
          projectUrl={URLduprojet}
          color={color}
        />
      </main>
      
    </>
  )
}