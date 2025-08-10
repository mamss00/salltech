// frontend/src/app/projets/[slug]/page.js - VERSION PREMIUM COMPLÈTE
import { notFound } from 'next/navigation'

// Composants Enhanced de niveau premium
import EnhancedProjectHero from '@/components/projects/EnhancedProjectHero'
import EnhancedProjectIntroduction from '@/components/projects/EnhancedProjectIntroduction'
import ProjectTechnologies from '@/components/projects/ProjectTechnologies' // Version claire déjà corrigée
import ProjectGallery from '@/components/projects/ProjectGallery' // Version optimisée
import EnhancedProjectCTA from '@/components/projects/EnhancedProjectCTA'
import ProjectTestimonial from '@/components/projects/ProjectTestimonial'
import ProjectMetrics from '@/components/projects/ProjectMetrics'

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

export default async function EnhancedProjetPage({ params }) {
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
  const titreFinal = titre_page || Titre || 'Projet Exceptionnel'
  const resumeFinal = Resume || Description?.[0]?.children?.[0]?.text || 'Une réalisation qui démontre notre expertise technique et notre capacité à créer des solutions innovantes.'
  
  // Déterminer la couleur selon la catégorie avec fallback intelligent
  const color = Categorie?.includes('E-commerce') 
    ? 'purple' 
    : Categorie?.includes('Mobile') || Categorie?.includes('App')
      ? 'blue' 
      : Categorie?.includes('Web') || Categorie?.includes('Site')
        ? 'red'
        : 'blue'

  // Préparer les images pour la galerie (éviter les doublons)
  const galleryImages = Imagesadditionnelles && Array.isArray(Imagesadditionnelles) 
    ? Imagesadditionnelles.filter(Boolean) 
    : []

  // Préparer les caractéristiques (filtrer les technologies si nécessaire)
  const cleanFeatures = caracteristiques && Array.isArray(caracteristiques) 
    ? caracteristiques.filter(carac => {
        if (!carac?.titre) return false
        
        // Exclure les éléments qui sont clairement des technologies
        const techKeywords = ['react', 'next', 'node', 'php', 'javascript', 'vue', 'laravel', 'wordpress']
        const isCaracTech = techKeywords.some(keyword => 
          carac.titre.toLowerCase().includes(keyword)
        )
        
        return !isCaracTech
      })
    : []

  // Métriques de performance sophistiquées
  const projectMetrics = {
    performance: "98%",
    satisfaction: "100%",
    delivery: "Dans les délais",
    maintenance: "24/7"
  }

  return (
    <>
      
      <main>
        {/* Hero sophistiqué avec parallax et animations */}
        <EnhancedProjectHero 
          title={titreFinal}
          category={Categorie}
          description={resumeFinal}
          image={Imageprincipale}
          client={Client}
          date={Datederealisation}
          projectUrl={URLduprojet}
          color={color}
        />
        
        {/* Introduction sophistiquée avec points clés */}
        <EnhancedProjectIntroduction 
          content={introduction || Description}
          features={cleanFeatures}
          color={color}
        />
        
        {/* Métriques de performance */}
        <ProjectMetrics 
          metrics={projectMetrics}
          color={color}
        />
        
        {/* Technologies - Version claire et moderne */}
        {technologies && technologies.length > 0 && (
          <ProjectTechnologies 
            technologies={technologies}
            color={color}
          />
        )}
        
        {/* Témoignage client sophistiqué */}
        {Client && (
          <ProjectTestimonial 
            client={Client}
            projectTitle={titreFinal}
            color={color}
          />
        )}
        
        {/* Galerie sophistiquée */}
        {galleryImages.length > 0 && (
          <ProjectGallery 
            images={galleryImages}
            projectTitle={titreFinal}
            color={color}
          />
        )}
        
        {/* CTA final sophistiqué */}
        <EnhancedProjectCTA 
          projectName={titreFinal}
          projectUrl={URLduprojet}
          client={Client}
          color={color}
        />
      </main>
    </>
  )
}