// frontend/src/app/projets/page.js
import { Suspense } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ProjectsHero from '@/components/projects/ProjectsHero'
import ProjectsGrid from '@/components/projects/ProjectsGrid'
import ProjectsStats from '@/components/projects/ProjectsStats'
import { getProjects } from '@/utils/api'

export const metadata = {
  title: 'Nos Projets & Réalisations | SALLTECH',
  description: 'Découvrez nos projets web, applications mobiles et solutions digitales réalisés pour nos clients en Mauritanie et à l\'international.',
  openGraph: {
    title: 'Portfolio SALLTECH - Projets & Réalisations',
    description: 'Solutions digitales innovantes : sites web, apps mobiles, e-commerce. Plus de 50 projets réussis.',
    images: [
      {
        url: '/images/portfolio-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Portfolio SALLTECH'
      }
    ]
  },
  keywords: 'portfolio SALLTECH, projets web Mauritanie, applications mobiles, e-commerce, développement sur mesure'
}

// Composant de loading
function ProjectsLoading() {
  return (
    <div className="container py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-gray-200 aspect-[4/3] rounded-xl mb-4"></div>
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-2/3 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Composant principal de la page
async function ProjectsContent() {
  const projets = await getProjects()
  
  // Trier les projets par date de réalisation (plus récents en premier)
  const sortedProjets = [...projets].sort((a, b) => {
    const dateA = new Date(a.Datederealisation || 0)
    const dateB = new Date(b.Datederealisation || 0)
    return dateB - dateA
  })
  
  // Extraire les catégories uniques
  const categories = ['Tous', ...new Set(projets.map(p => p.Categorie).filter(Boolean))]
  
  // Calculer quelques statistiques
  const stats = {
    total: projets.length,
    websites: projets.filter(p => p.Categorie?.includes('Site')).length,
    mobile: projets.filter(p => p.Categorie?.includes('Mobile') || p.Categorie?.includes('App')).length,
    ecommerce: projets.filter(p => p.Categorie?.includes('E-commerce')).length,
    clients: new Set(projets.map(p => p.Client).filter(Boolean)).size
  }

  return (
    <>
      {/* Hero section */}
      <ProjectsHero 
        totalProjects={stats.total}
        categories={categories.slice(1)} // Exclure "Tous"
      />
      
      {/* Statistiques */}
      <ProjectsStats stats={stats} />
      
      {/* Grille des projets */}
      <ProjectsGrid 
        projets={sortedProjets}
        categories={categories}
      />
    </>
  )
}

export default function ProjectsPage() {
  return (
    <>
      <Header />
      
      <main className="pt-24">
        <Suspense fallback={<ProjectsLoading />}>
          <ProjectsContent />
        </Suspense>
      </main>
      
      <Footer />
    </>
  )
}