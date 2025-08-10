// frontend/src/app/projets/[slug]/page.js - VERSION PREMIUM COMPLÈTE
import { notFound } from 'next/navigation'

// Composants projet premium inspirés des services
import EnhancedProjectHero from '@/components/projects/ProjectHero'
import ProjectIntroduction from '@/components/projects/ProjectIntroduction'
import EnhancedProjectFeatures from '@/components/projects/ProjectFeatures'
import ProjectProcess from '@/components/projects/ProjectProcess'
import ProjectTechnologies from '@/components/projects/ProjectTechnologies'
import ProjectTestimonial from '@/components/projects/ProjectTestimonial'
import ProjectRelated from '@/components/projects/ProjectRelated'
import ProjectMetrics from '@/components/projects/ProjectMetrics'
import EnhancedProjectCTA from '@/components/projects/ProjectCTA'

import { getProjetBySlug, getAllProjetSlugs, getProjects } from '@/utils/api'

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

  // Récupérer les projets liés pour la section "Projets similaires"
  const allProjects = await getProjects()
  const relatedProjects = allProjects
    .filter(p => p.Categorie === projet.Categorie && p.id !== projet.id)
    .slice(0, 3)

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
    methodologie,
    resultats,
    metrics
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

  // Processus par défaut si pas de méthodologie
  const defaultProcess = [
    {
      titre: "Analyse & Stratégie",
      description: "Étude approfondie des besoins client et définition de la stratégie technique",
      icone: "FaSearchengin"
    },
    {
      titre: "Design & Prototypage", 
      description: "Création des maquettes et prototypes pour validation du concept",
      icone: "FaPalette"
    },
    {
      titre: "Développement",
      description: "Implémentation technique avec les meilleures pratiques de développement",
      icone: "FaCode"
    },
    {
      titre: "Tests & Optimisation",
      description: "Tests complets et optimisations pour une performance maximale",
      icone: "FaRocket"
    },
    {
      titre: "Déploiement & Suivi",
      description: "Mise en production et accompagnement post-lancement",
      icone: "FaCloudUploadAlt"
    }
  ]

  return (
    <main className="pt-24">
      {/* Hero premium avec parallax et animations sophistiquées */}
      <EnhancedProjectHero 
        title={titreFinal}
        category={Categorie}
        description={resumeFinal}
        image={Imageprincipale}
        images={Imagesadditionnelles}
        client={Client}
        date={Datederealisation}
        projectUrl={URLduprojet}
        color={color}
      />
      
      {/* Introduction sophistiquée avec contenu riche */}
      <ProjectIntroduction 
        content={introduction || Description}
        features={caracteristiques}
        color={color}
      />

      {/* Fonctionnalités avancées du projet */}
      {caracteristiques && caracteristiques.length > 0 && (
        <EnhancedProjectFeatures 
          features={caracteristiques} 
          color={color}
          projectTitle={titreFinal}
        />
      )}

      {/* Processus/Méthodologie du projet */}
      <ProjectProcess 
        steps={methodologie || defaultProcess}
        color={color}
        projectTitle={titreFinal}
      />

      {/* Technologies avec design premium */}
      {technologies && technologies.length > 0 && (
        <ProjectTechnologies 
          technologies={technologies}
          color={color}
        />
      )}

      {/* Métriques et résultats du projet */}
      <ProjectMetrics 
        metrics={metrics}
        results={resultats}
        color={color}
        projectUrl={URLduprojet}
      />

      {/* Témoignage client */}
      <ProjectTestimonial 
        client={Client}
        projectTitle={titreFinal}
        color={color}
      />

      {/* Projets similaires/liés */}
      {relatedProjects.length > 0 && (
        <ProjectRelated 
          projects={relatedProjects}
          currentCategory={Categorie}
          color={color}
        />
      )}
      
      {/* CTA final sophistiqué avec statistiques */}
      <EnhancedProjectCTA 
        projectName={titreFinal}
        projectUrl={URLduprojet}
        client={Client}
        color={color}
      />
    </main>
  )
}