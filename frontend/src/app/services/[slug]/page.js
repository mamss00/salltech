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
import { getServiceBySlug, getAllServiceSlugs, debugServicePage } from '@/utils/api'

// Générer les routes statiques pour tous les services
export async function generateStaticParams() {
  try {
    const slugs = await getAllServiceSlugs()
    console.log("Generated static paths for slugs:", slugs);
    return slugs
  } catch (error) {
    console.error('Erreur lors de la génération des chemins statiques :', error)
    return []
  }
}

// Définir les métadonnées de la page pour le SEO
export async function generateMetadata({ params }) {
  try {
    const { slug } = params
    console.log(`Génération des métadonnées pour le slug: ${slug}`);
    
    const serviceData = await getServiceBySlug(slug)
    
    if (!serviceData) {
      return {
        title: 'Service introuvable | SALLTECH',
        description: 'La page que vous recherchez n\'existe pas.'
      }
    }

    // Extraction de la description
    let description = '';
    if (Array.isArray(serviceData.Description) && serviceData.Description.length > 0) {
      const firstParagraph = serviceData.Description[0];
      if (firstParagraph.children && firstParagraph.children.length > 0) {
        description = firstParagraph.children[0].text || '';
      }
    }
    
    // Si pas de description trouvée, utiliser une description par défaut
    if (!description) {
      description = `Services professionnels pour les entreprises mauritaniennes - ${serviceData.Titre || 'SALLTECH'}`;
    }
    
    return {
      title: `${serviceData.Titre || 'Service'} | SALLTECH`,
      description: description,
      openGraph: {
        title: `${serviceData.Titre || 'Service'} | SALLTECH`,
        description: description,
      }
    }
  } catch (error) {
    console.error('Erreur lors de la génération des métadonnées :', error)
    return {
      title: 'Services | SALLTECH',
      description: 'Découvrez nos services sur mesure.'
    }
  }
}

// Page principale du service
export default async function ServicePage({ params }) {
  // Récupérer les données du service depuis le slug
  const { slug } = params
  console.log('Slug demandé:', slug);
  
  // Exécuter le débogage - ne pas supprimer cette ligne
  await debugServicePage(slug);
  
  // Récupérer le service correspondant au slug
  const serviceData = await getServiceBySlug(slug);
  
  // Debug
  console.log('Service trouvé:', serviceData ? 'Oui' : 'Non');
  if (serviceData) {
    console.log('Titre:', serviceData.Titre);
  }
  
  // Fallback pour les services manquants
  // Si nous sommes en développement et qu'il n'y a pas de service,
  // utiliser des données de démonstration
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  if (!serviceData && isDevelopment) {
    console.log('Utilisation des données de démonstration pour le développement');
    
    // Ici, vous pouvez créer des données de démonstration pour le développement
    const mockServiceData = {
      id: 999,
      Titre: "Service de démonstration",
      Description: [
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Ceci est un service de démonstration pour faciliter le développement."
            }
          ]
        }
      ],
      Emoji: "🚀",
      Couleur: "from-blue/20 to-blue/5",
      slug: slug,
      introduction: [
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Introduction de démonstration pour le développement."
            }
          ]
        }
      ],
      caracteristiques: [
        {
          titre: "Caractéristique 1",
          description: "Description de la caractéristique 1",
          icone: "Fa/FaCheck"
        }
      ],
      types_services: [
        {
          titre: "Type de service 1",
          description: "Description du type de service 1",
          icone: "Fa/FaStar"
        }
      ],
      methodologie: [
        {
          numero: 1,
          titre: "Étape 1",
          description: "Description de l'étape 1"
        }
      ],
      technologies: [
        {
          nom: "Technologie 1",
          description: "Description de la technologie 1"
        }
      ],
      faq: [
        {
          question: "Question fréquente 1?",
          reponse: [
            {
              type: "paragraph",
              children: [
                {
                  type: "text",
                  text: "Réponse à la question fréquente 1."
                }
              ]
            }
          ]
        }
      ]
    };
    
    // Utiliser les données de démonstration
    return renderServicePage(mockServiceData, slug);
  }
  
  // Si le service n'existe pas, afficher une page 404
  if (!serviceData) {
    return (
      <>
        <Header />
        <main className="pt-32 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Service non trouvé</h1>
            <p className="text-xl mb-6">Le service avec le slug '{slug}' n'existe pas ou n'est pas accessible.</p>
            <p className="mb-6">Veuillez vérifier que ce service existe dans votre CMS Strapi.</p>
            <a href="/services" className="text-blue hover:underline">Voir tous nos services</a>
          </div>
        </main>
        <Footer />
      </>
    );
  }
  
  // Rendu de la page avec les données du service
  return renderServicePage(serviceData, slug);
}

// Fonction utilitaire pour le rendu de la page de service
function renderServicePage(serviceData, slug) {
  // Extraire les données du service
  const titre = serviceData.titre_page || serviceData.Titre || 'Service';
  
  // Extraire la description des données
  let description = '';
  if (Array.isArray(serviceData.Description) && serviceData.Description.length > 0) {
    const firstParagraph = serviceData.Description[0];
    if (firstParagraph.children && firstParagraph.children.length > 0) {
      description = firstParagraph.children[0].text || '';
    }
  }
  
  // Extraire les autres données (si disponibles)
  const introduction = serviceData.introduction || null;
  const image = serviceData.Image && serviceData.Image.data ? serviceData.Image.data[0] : null;
  const icone = serviceData.icone || serviceData.Emoji || null;
  const couleur = serviceData.couleur || serviceData.Couleur || '';
  const caracteristiques = serviceData.caracteristiques || [];
  const types_services = serviceData.types_services || [];
  const methodologie = serviceData.methodologie || [];
  const technologies = serviceData.technologies || [];
  const projets_lies = serviceData.projets_lies?.data || [];
  const faq = serviceData.faq || [];
  
  // Déterminer la couleur principale pour les accents visuels
  const mainColor = couleur?.includes('blue') ? 'blue' : 
                   couleur?.includes('purple') ? 'purple' : 
                   couleur?.includes('red') ? 'red' : 'blue';

  return (
    <>
      <Header />
      
      <main className="pt-32">
        {/* Section Hero avec les informations de base du service */}
        <ServiceHero 
          title={titre}
          description={description}
          image={image}
          icon={icone}
          color={mainColor}
        />
        
        {/* Section Introduction détaillée si disponible */}
        {introduction && (
          <ServiceIntroduction 
            content={introduction}
            features={caracteristiques}
            color={mainColor}
          />
        )}
        
        {/* Autres sections seulement si les données existent */}
        {types_services && types_services.length > 0 && (
          <ServiceFeatures 
            features={types_services}
            color={mainColor}
          />
        )}
        
        {methodologie && methodologie.length > 0 && (
          <ServiceProcess 
            steps={methodologie}
            color={mainColor}
          />
        )}
        
        {technologies && technologies.length > 0 && (
          <ServiceTechnologies 
            technologies={technologies}
            color={mainColor}
          />
        )}
        
        {projets_lies && projets_lies.length > 0 && (
          <ServicePortfolio 
            projects={projets_lies}
            color={mainColor}
          />
        )}
        
        {faq && faq.length > 0 && (
          <ServiceFAQ 
            questions={faq}
            color={mainColor}
          />
        )}
        
        {/* Section CTA */}
        <ServiceCTA 
          serviceName={titre}
          color={mainColor}
        />
      </main>
      
      <Footer />
    </>
  );
}