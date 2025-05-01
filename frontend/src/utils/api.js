const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.sall.technology';

/**
 * Fonction pour effectuer des appels à l'API Strapi
 * @param {string} path - Chemin de l'API
 * @param {Object} options - Options supplémentaires pour fetch
 * @returns {Promise<Object>} - Données de l'API
 */
async function fetchAPI(path, options = {}) {
  try {
    const defaultOptions = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const mergedOptions = {
      ...defaultOptions,
      ...options,
    };

    console.log(`[fetchAPI] Calling: ${API_URL}/api${path}`);
    const res = await fetch(`${API_URL}/api${path}`, mergedOptions);

    if (!res.ok) {
      console.error(`API error: ${res.status} on ${path}`);
      throw new Error(`API error: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching from API:", error);
    throw error; // Propager l'erreur pour la gérer dans le composant
  }
}

/**
 * Convertit un titre en slug
 * @param {string} titre - Titre à convertir
 * @returns {string} - Slug généré
 */
export function titreToSlug(titre) {
  if (!titre) return '';
  
  return titre
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // Supprimer les accents
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

// Correspondance directe entre titres et slugs
const TITLE_TO_SLUG_MAP = {
  "Sites Internet": "sites-internet-professionnels",
  "Sites Internet Professionnels": "sites-internet-professionnels",
  "Applications Mobiles": "applications-mobiles",
  "Solutions Odoo": "solutions-odoo",
  "Consulting DevOps": "consulting-devops",
  "Hébergement Web": "hebergement-web",
  "SEO & Référencement": "seo-referencement"
};

/**
 * Récupère la liste des services depuis Strapi
 * @returns {Promise<Array>} - Liste des services
 */
export async function getServices() {
  try {
    // Utiliser populate=deep pour récupérer toutes les relations
    const response = await fetch(`${API_URL}/api/services?populate=deep`);
    console.log("Appel API pour tous les services avec populate=deep");
    
    if (!response.ok) {
      console.error(`Erreur API: ${response.status}`);
      throw new Error(`Erreur API: ${response.status}`);
    }
    
    const data = await response.json();
    console.log("Données brutes des services:", data);
    
    if (!data || !data.data) {
      console.error("Format de données inattendu:", data);
      return [];
    }
    
    // Transformer les données pour avoir une structure plus simple
    const services = data.data.map(service => ({
      id: service.id,
      ...service.attributes
    }));
    
    console.log(`${services.length} services récupérés avec succès`);
    return services;
  } catch (error) {
    console.error("Error in getServices:", error);
    return [];
  }
}

/**
 * Récupère la liste des projets depuis Strapi
 * @returns {Promise<Array>} - Liste des projets
 */
export async function getProjects() {
  try {
    const data = await fetchAPI('/projets?populate=*');
    return data.data || [];
  } catch (error) {
    console.error("Error in getProjects:", error);
    return [];
  }
}

/**
 * Récupère le contenu de la page d'accueil depuis Strapi
 * @returns {Promise<Object>} - Contenu de la page d'accueil
 */
export async function getHomePageContent() {
  try {
    const data = await fetchAPI('/home-page?populate=deep');
    return data.data?.attributes || {};
  } catch (error) {
    console.error("Error in getHomePageContent:", error);
    throw error;
  }
}

/**
 * Récupère les informations de contact depuis Strapi
 * @returns {Promise<Object>} - Informations de contact
 */
export async function getContactInfo() {
  try {
    const data = await fetchAPI('/contact-info');
    return data.data?.attributes || {};
  } catch (error) {
    console.error("Error in getContactInfo:", error);
    throw error;
  }
}

/**
 * Envoie les données du formulaire de contact à Strapi
 * @param {Object} formData - Données du formulaire
 * @returns {Promise<Object>} - Réponse de l'API
 */
export async function submitContactForm(formData) {
  try {
    const response = await fetchAPI('/contact', {
      method: 'POST',
      body: JSON.stringify({ data: formData }),
    });
    return response;
  } catch (error) {
    console.error("Error in submitContactForm:", error);
    throw error;
  }
}

/**
 * Récupère un service par son slug
 * @param {string} slug - Slug du service
 * @returns {Promise<Object>} - Données du service
 */
export async function getServiceBySlug(slug) {
  try {
    console.log(`Recherche du service avec slug: "${slug}"`);
    
    // Utiliser populate=deep pour récupérer toutes les relations
    const url = `${API_URL}/api/services?filters[slug]=${slug}&populate=deep`;
    console.log(`URL d'appel API: ${url}`);
    
    const response = await fetch(url);
    
    if (!response.ok) {
      console.error(`Erreur API: ${response.status}`);
      throw new Error(`Erreur API: ${response.status}`);
    }
    
    const data = await response.json();
    console.log("Données brutes pour le slug:", data);
    
    if (data && data.data && data.data.length > 0) {
      console.log(`Service trouvé via API avec slug "${slug}"`);
      const service = {
        id: data.data[0].id,
        ...data.data[0].attributes
      };
      console.log("Service formaté:", service);
      return service;
    }
    
    console.log(`Aucun service trouvé directement avec le slug "${slug}"`);
    console.log("Tentative de correspondance par titre...");
    
    // Récupérer tous les services si nécessaire pour une correspondance manuelle
    const services = await getServices();
    
    // Vérifier les correspondances possibles
    for (const service of services) {
      // Par le mapping de titres
      if (TITLE_TO_SLUG_MAP[service.Titre] === slug) {
        console.log(`Correspondance trouvée via mapping pour "${service.Titre}"`);
        return service;
      }
      
      // Par génération de slug à partir du titre
      const generatedSlug = titreToSlug(service.Titre);
      if (generatedSlug === slug) {
        console.log(`Correspondance trouvée via slug généré pour "${service.Titre}"`);
        return service;
      }
    }
    
    console.log(`Aucun service trouvé pour le slug "${slug}" après toutes les tentatives`);
    return null;
  } catch (error) {
    console.error(`Error in getServiceBySlug for slug "${slug}":`, error);
    return null;
  }
}

/**
 * Récupère tous les slugs des services pour la génération de pages statiques
 * @returns {Promise<Array<string>>} - Liste des slugs
 */
export async function getAllServiceSlugs() {
  try {
    const services = await getServices();
    return services.map(service => {
      // Utiliser le slug stocké s'il existe, sinon générer à partir du titre
      const slug = service.slug || TITLE_TO_SLUG_MAP[service.Titre] || titreToSlug(service.Titre);
      return { slug };
    });
  } catch (error) {
    console.error("Error in getAllServiceSlugs:", error);
    return [];
  }
}

/**
 * Fonction de diagnostic pour tester l'API Strapi
 */
export async function testStrapiConnection() {
  console.log("=== DÉBUT DU TEST DE CONNEXION STRAPI ===");
  
  try {
    // 1. Test d'accès à l'API de base
    console.log("1. Test d'accès à l'API...");
    const baseUrl = `${API_URL}/api/services`;
    
    console.log(`URL: ${baseUrl}`);
    const baseResponse = await fetch(baseUrl);
    
    if (!baseResponse.ok) {
      console.error(`Erreur d'accès: ${baseResponse.status}`);
      return false;
    }
    
    const baseData = await baseResponse.json();
    console.log("Réponse de base:", baseData);
    
    // 2. Test avec populate=deep
    console.log("\n2. Test avec populate=deep...");
    const deepUrl = `${API_URL}/api/services?populate=deep`;
    
    console.log(`URL: ${deepUrl}`);
    const deepResponse = await fetch(deepUrl);
    
    if (!deepResponse.ok) {
      console.error(`Erreur d'accès: ${deepResponse.status}`);
      return false;
    }
    
    const deepData = await deepResponse.json();
    console.log("Réponse avec populate=deep:", deepData);
    
    // 3. Test pour le slug spécifique
    console.log("\n3. Test pour 'sites-internet-professionnels'...");
    const slugUrl = `${API_URL}/api/services?filters[slug]=sites-internet-professionnels&populate=deep`;
    
    console.log(`URL: ${slugUrl}`);
    const slugResponse = await fetch(slugUrl);
    
    if (!slugResponse.ok) {
      console.error(`Erreur d'accès: ${slugResponse.status}`);
      return false;
    }
    
    const slugData = await slugResponse.json();
    console.log("Réponse pour le slug:", slugData);
    
    return true;
  } catch (error) {
    console.error("Erreur lors du test:", error);
    return false;
  } finally {
    console.log("=== FIN DU TEST DE CONNEXION STRAPI ===");
  }
}