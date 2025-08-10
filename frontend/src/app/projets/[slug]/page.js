// frontend/src/app/projets/[slug]/page.js - VERSION OPTIMISÉE
// 
// 🚀 AMÉLIORATIONS APPORTÉES :
// ✅ Ajout du composant ProjectProcess (était manquant)
// ✅ Éviter les répétitions entre ProjectIntroduction et ProjectFeatures  
// ✅ Processus adaptatif selon la catégorie de projet
// ✅ Support des vraies données de processus depuis Strapi (si disponibles)
// ✅ Structure logique et optimisée des sections
// ✅ Séparation intelligente des caractéristiques
//
import { notFound } from 'next/navigation'

// Composants existants + ProjectProcess ajouté
import ProjectHero from '@/components/projects/ProjectHero'              
import ProjectIntroduction from '@/components/projects/ProjectIntroduction'
import ProjectFeatures from '@/components/projects/ProjectFeatures'     
import ProjectProcess from '@/components/projects/ProjectProcess'        // ✅ AJOUTÉ
import ProjectTechnologies from '@/components/projects/ProjectTechnologies'
import ProjectTestimonial from '@/components/projects/ProjectTestimonial'
import ProjectRelated from '@/components/projects/ProjectRelated'       
import ProjectCTA from '@/components/projects/ProjectCTA'
import ProjectGallery from '@/components/projects/ProjectGallery'               

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
    slug,
    // ✅ NOUVEAUX CHAMPS
    methodologie,
    resultats,
    defis,
    duree_projet,
    equipe
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

  // 🔧 PROCESSUS PAR DÉFAUT basé sur la catégorie du projet
  const getDefaultProcess = (category) => {
    const baseSteps = [
      {
        titre: "Analyse des besoins",
        description: "Étude approfondie des objectifs et contraintes du projet pour définir les spécifications fonctionnelles.",
        icone: "FaSearch",
        duree: "1-2 semaines"
      },
      {
        titre: "Conception & Design",
        description: "Création des maquettes, architecture technique et définition de l'expérience utilisateur.",
        icone: "FaPencilRuler",
        duree: "2-3 semaines"
      },
      {
        titre: "Développement",
        description: "Implémentation du code, intégrations API et développement des fonctionnalités principales.",
        icone: "FaCode",
        duree: "4-8 semaines"
      },
      {
        titre: "Tests & Optimisation",
        description: "Tests rigoureux, optimisation des performances et corrections des bugs identifiés.",
        icone: "FaBug",
        duree: "1-2 semaines"
      },
      {
        titre: "Déploiement & Livraison",
        description: "Mise en production, formation utilisateur et documentation complète du projet.",
        icone: "FaRocket",
        duree: "1 semaine"
      }
    ]

    // Personnaliser selon la catégorie
    if (category?.includes('E-commerce')) {
      baseSteps[2].description = "Développement du système de paiement, gestion des stocks et interface d'administration."
      baseSteps.splice(3, 0, {
        titre: "Intégration Paiement",
        description: "Configuration sécurisée des passerelles de paiement et tests de transactions.",
        icone: "FaCreditCard",
        duree: "1 semaine"
      })
    } else if (category?.includes('Mobile')) {
      baseSteps[2].description = "Développement natif iOS/Android avec optimisation pour chaque plateforme."
      baseSteps.push({
        titre: "Publication Store",
        description: "Soumission aux App Store et Google Play avec gestion du processus de validation.",
        icone: "FaMobileAlt",
        duree: "1 semaine"
      })
    }

    return baseSteps
  }

  // ✅ UTILISER LES VRAIES DONNÉES DE PROCESSUS OU CELLES PAR DÉFAUT
  const projectProcess = methodologie && methodologie.length > 0 
    ? methodologie.sort((a, b) => (a.ordre || 0) - (b.ordre || 0)) // Trier par ordre
    : getDefaultProcess(Categorie) // Utiliser le processus par défaut

  // Diviser les caractéristiques pour éviter les répétitions
  const allFeatures = caracteristiques || []
  const keyFeatures = allFeatures.slice(0, 3) // Pour ProjectIntroduction (points clés)
  const detailedFeatures = allFeatures.slice(3) // Pour ProjectFeatures (détails)
  
  return (
    <>
      <main className="pt-24">
        {/* 1. Hero du projet */}
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
        
        {/* 2. Introduction avec points clés (max 3 features) */}
        <ProjectIntroduction 
          content={introduction || Description}
          features={keyFeatures} // ✅ Seulement les 3 premières
          color={color}
        />
        {/* Galerie d'images */}
        {Imagesadditionnelles && Imagesadditionnelles.length > 0 && (
        <ProjectGallery 
            images={Imagesadditionnelles}
            projectTitle={titreFinal}
            color={color}
        />
        )}

        {/* 3. Notre processus pour ce projet */}
        <ProjectProcess 
          steps={projectProcess} // ✅ Vraies données ou processus par défaut
          color={color}
          projectTitle={titreFinal}
        />

        {/* 4. Fonctionnalités détaillées - seulement si il y en a d'autres */}
        {detailedFeatures.length > 0 && (
          <ProjectFeatures 
            features={detailedFeatures} // ✅ Les features restantes
            color={color}
          />
        )}
        
        {/* 5. Technologies - seulement si il y en a */}
        {technologies && technologies.length > 0 && (
          <ProjectTechnologies 
            technologies={technologies}
            color={color}
          />
        )}

        {/* 6. Témoignage client - seulement si il y a un client */}
        {Client && (
          <ProjectTestimonial 
            client={Client}
            projectTitle={titreFinal}
            color={color}
          />
        )}

        {/* 7. Projets connexes */}
        <ProjectRelated 
          currentProjectSlug={slug}
          currentCategory={Categorie}
          color={color}
          maxProjects={3}
        />
        
        {/* 8. CTA final */}
        <ProjectCTA 
          projectName={titreFinal}
          projectUrl={URLduprojet}
          color={color}
        />
      </main>
    </>
  )
}