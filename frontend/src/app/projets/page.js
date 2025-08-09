// frontend/src/app/projets/page.js - FIXED VERSION
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

// Safe helper function to extract categories
function extractCategories(projets) {
  if (!Array.isArray(projets)) return ['Tous'];
  
  try {
    const uniqueCategories = new Set();
    
    projets.forEach(projet => {
      if (projet?.Categorie && typeof projet.Categorie === 'string') {
        // Handle potential comma-separated categories
        if (projet.Categorie.includes(',')) {
          projet.Categorie.split(',').forEach(cat => {
            const trimmed = cat.trim();
            if (trimmed) uniqueCategories.add(trimmed);
          });
        } else {
          uniqueCategories.add(projet.Categorie);
        }
      }
    });
    
    return ['Tous', ...Array.from(uniqueCategories)];
  } catch (error) {
    console.error('Error extracting categories:', error);
    return ['Tous'];
  }
}

// Safe helper function to calculate stats
function calculateStats(projets) {
  if (!Array.isArray(projets)) {
    return {
      total: 0,
      websites: 0,
      mobile: 0,
      ecommerce: 0,
      clients: 0
    };
  }
  
  try {
    const uniqueClients = new Set();
    let websites = 0, mobile = 0, ecommerce = 0;
    
    projets.forEach(projet => {
      // Count clients safely
      if (projet?.Client && typeof projet.Client === 'string') {
        uniqueClients.add(projet.Client);
      }
      
      // Count categories safely
      const category = projet?.Categorie || '';
      if (typeof category === 'string') {
        const lowerCategory = category.toLowerCase();
        
        if (lowerCategory.includes('site') || lowerCategory.includes('web')) {
          websites++;
        }
        if (lowerCategory.includes('mobile') || lowerCategory.includes('app')) {
          mobile++;
        }
        if (lowerCategory.includes('e-commerce') || lowerCategory.includes('ecommerce')) {
          ecommerce++;
        }
      }
    });
    
    return {
      total: projets.length,
      websites,
      mobile,
      ecommerce,
      clients: uniqueClients.size
    };
  } catch (error) {
    console.error('Error calculating stats:', error);
    return {
      total: projets.length,
      websites: 0,
      mobile: 0,
      ecommerce: 0,
      clients: 0
    };
  }
}

// Safe helper function to sort projects
function sortProjects(projets) {
  if (!Array.isArray(projets)) return [];
  
  try {
    return [...projets].sort((a, b) => {
      const dateA = a?.Datederealisation ? new Date(a.Datederealisation) : new Date(0);
      const dateB = b?.Datederealisation ? new Date(b.Datederealisation) : new Date(0);
      
      // Handle invalid dates
      if (isNaN(dateA.getTime())) return 1;
      if (isNaN(dateB.getTime())) return -1;
      
      return dateB - dateA;
    });
  } catch (error) {
    console.error('Error sorting projects:', error);
    return projets;
  }
}

async function ProjectsContent() {
  let projets = [];
  
  try {
    projets = await getProjects();
    
    // Ensure projets is always an array
    if (!Array.isArray(projets)) {
      console.warn('getProjects did not return an array:', typeof projets);
      projets = [];
    }
  } catch (error) {
    console.error('Error fetching projects:', error);
    projets = [];
  }
  
  // Safe processing of projects data
  const sortedProjets = sortProjects(projets);
  const categories = extractCategories(projets);
  const stats = calculateStats(projets);

  return (
    <>
      <ProjectsHero 
        totalProjects={stats.total}
        categories={categories.slice(1)} // Exclude "Tous"
      />
      
      <ProjectsStats stats={stats} />
      
      <ProjectsGrid 
        projets={sortedProjets}
        categories={categories}
      />
    </>
  )
}

// Error boundary component
function ProjectsErrorBoundary({ children }) {
  try {
    return children;
  } catch (error) {
    console.error('Error in ProjectsErrorBoundary:', error);
    return (
      <div className="container py-20 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Erreur de chargement des projets
        </h2>
        <p className="text-gray-600">
          Une erreur s'est produite lors du chargement des projets. 
          Veuillez réessayer plus tard.
        </p>
      </div>
    );
  }
}

export default function ProjectsPage() {
  return (
    <>
      <Header />
      
      <main className="pt-24">
        <ProjectsErrorBoundary>
          <Suspense fallback={<ProjectsLoading />}>
            <ProjectsContent />
          </Suspense>
        </ProjectsErrorBoundary>
      </main>
      
      <Footer />
    </>
  )
}