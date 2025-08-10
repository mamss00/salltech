// frontend/src/app/projets/[slug]/page.js - VERSION SANS RÉPÉTITIONS
import { notFound } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

// Composants projet
import ProjectHero from '@/components/projects/ProjectHero'
import ProjectIntroduction from '@/components/projects/ProjectIntroduction'
import ProjectTechnologies from '@/components/projects/ProjectTechnologies'
import ProjectGallery from '@/components/projects/ProjectGallery'
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

  // SÉPARER les caractéristiques et technologies pour éviter les doublons
  const separateContent = () => {
    let cleanCaracteristiques = []
    let cleanTechnologies = []
    
    // Filtrer les caractéristiques (exclure celles qui sont des technologies)
    if (caracteristiques && Array.isArray(caracteristiques)) {
      cleanCaracteristiques = caracteristiques.filter(carac => {
        if (!carac.titre) return false
        
        // Exclure si c'est clairement une technologie
        const techKeywords = ['react', 'next', 'node', 'php', 'javascript', 'typescript', 'vue', 'angular', 'laravel', 'wordpress', 'mysql', 'mongodb', 'api', 'rest', 'graphql']
        const isCaracTech = techKeywords.some(keyword => 
          carac.titre.toLowerCase().includes(keyword) || 
          (carac.description && carac.description.toLowerCase().includes(keyword))
        )
        
        return !isCaracTech
      })
    }
    
    // Utiliser les technologies dédiées
    if (technologies && Array.isArray(technologies)) {
      cleanTechnologies = technologies
    }
    
    return { cleanCaracteristiques, cleanTechnologies }
  }

  const { cleanCaracteristiques, cleanTechnologies } = separateContent()

  // Préparer les images pour la galerie (éviter les doublons)
  const prepareGalleryImages = () => {
    const images = []
    
    // Ajouter les images additionnelles seulement
    if (Imagesadditionnelles && Array.isArray(Imagesadditionnelles)) {
      images.push(...Imagesadditionnelles.filter(Boolean))
    }
    
    return images
  }

  const galleryImages = prepareGalleryImages()

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
        
        {/* Introduction - AVEC caractéristiques seulement (pas technologies) */}
        <ProjectIntroduction 
          content={introduction || Description}
          features={cleanCaracteristiques} // Caractéristiques nettoyées
          color={color}
        />
        
        {/* Technologies - Section séparée uniquement pour les vraies technologies */}
        {cleanTechnologies && cleanTechnologies.length > 0 && (
          <ProjectTechnologies 
            technologies={cleanTechnologies}
            color={color}
          />
        )}
        
        {/* Galerie - seulement s'il y a des images additionnelles */}
        {galleryImages.length > 0 && (
          <ProjectGallery 
            images={galleryImages}
            projectTitle={titreFinal}
            color={color}
          />
        )}
        
        {/* CTA final */}
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