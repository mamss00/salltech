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
    const response = await fetch(`${API_URL}/api/services?populate=*`);
    
    if (!response.ok) {
      console.error(`Erreur API: ${response.status}`);
      throw new Error(`Erreur API: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (!data || !data.data) {
      console.error("Format de données inattendu:", data);
      return [];
    }
    
    // Transformer les données pour avoir une structure plus simple
    return data.data.map(service => ({
      id: service.id,
      ...service.attributes
    }));
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
    
    // Récupération directe via l'API
    const response = await fetch(`${API_URL}/api/services?filters[slug]=${slug}&populate=*`);
    const data = await response.json();
    
    if (data && data.data && data.data.length > 0) {
      console.log(`Service trouvé via API avec slug "${slug}"`);
      return {
        ...data.data[0].attributes,
        id: data.data[0].id
      };
    }
    
    // Si nous sommes ici, c'est que le service n'a pas été trouvé directement
    console.log(`Tentative de recherche alternative pour le slug "${slug}"`);
    
    // Récupérer tous les services
    const services = await getServices();
    
    // Essayer de trouver le service par correspondance exacte du slug
    const serviceByDirectSlug = services.find(s => s.slug === slug);
    if (serviceByDirectSlug) {
      console.log(`Service trouvé par correspondance directe du slug: ${serviceByDirectSlug.Titre}`);
      return serviceByDirectSlug;
    }
    
    // Essayer de trouver le service par mapping de titre
    const serviceByTitleMapping = services.find(s => TITLE_TO_SLUG_MAP[s.Titre] === slug);
    if (serviceByTitleMapping) {
      console.log(`Service trouvé par mapping de titre: ${serviceByTitleMapping.Titre}`);
      return serviceByTitleMapping;
    }
    
    // Essayer de trouver le service en générant le slug à partir du titre
    const serviceByGeneratedSlug = services.find(s => titreToSlug(s.Titre) === slug);
    if (serviceByGeneratedSlug) {
      console.log(`Service trouvé par génération de slug à partir du titre: ${serviceByGeneratedSlug.Titre}`);
      return serviceByGeneratedSlug;
    }
    
    // Si on arrive ici, c'est que le service n'a pas été trouvé
    console.log(`Aucun service trouvé pour le slug "${slug}" après multiples tentatives`);
    
    // Solution de dernier recours: renvoyer le premier service si disponible
    if (services.length > 0) {
      console.log("Renvoi du premier service disponible comme solution de secours");
      return services[0];
    }
    
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
    console.log("Services récupérés pour les slugs statiques:", services.length);
    
    return services.map(service => {
      // Utiliser le slug si disponible, sinon le générer
      const slug = service.slug || TITLE_TO_SLUG_MAP[service.Titre] || titreToSlug(service.Titre);
      console.log(`Service: "${service.Titre}" => Slug: "${slug}"`);
      return { slug };
    });
  } catch (error) {
    console.error("Error in getAllServiceSlugs:", error);
    return [];
  }
}

// Fonction spéciale de débogage
export async function debugServicePage(slug) {
  console.log(`========== DÉBOGAGE DE LA PAGE SERVICE "${slug}" ==========`);
  
  try {
    // 1. Vérifier si on peut obtenir le service directement via l'API
    console.log("1. Tentative d'appel direct à l'API...");
    const directApiUrl = `${API_URL}/api/services?filters[slug]=${slug}&populate=*`;
    console.log(`URL: ${directApiUrl}`);
    
    const directResponse = await fetch(directApiUrl);
    const directData = await directResponse.json();
    
    console.log("Réponse directe de l'API:", directData);
    
    if (directData && directData.data && directData.data.length > 0) {
      console.log("✅ Service trouvé directement via l'API!");
      console.log("ID:", directData.data[0].id);
      console.log("Titre:", directData.data[0].attributes.Titre);
      console.log("Slug:", directData.data[0].attributes.slug);
    } else {
      console.log("❌ Service non trouvé directement via l'API");
    }
    
    // 2. Vérifier les services disponibles
    console.log("\n2. Récupération de tous les services...");
    const allServices = await getServices();
    
    console.log(`Nombre de services trouvés: ${allServices.length}`);
    
    allServices.forEach((service, index) => {
      console.log(`\nService #${index + 1}`);
      console.log("ID:", service.id);
      console.log("Titre:", service.Titre);
      console.log("Slug stocké:", service.slug);
      console.log("Slug généré:", titreToSlug(service.Titre));
      console.log("Slug via mapping:", TITLE_TO_SLUG_MAP[service.Titre]);
    });
    
    // 3. Conclusion
    console.log("\n3. CONCLUSION");
    if (directData && directData.data && directData.data.length > 0) {
      console.log("✅ Le service existe dans Strapi et est accessible via l'API");
      return true;
    } else if (allServices.some(s => 
      s.slug === slug || 
      TITLE_TO_SLUG_MAP[s.Titre] === slug || 
      titreToSlug(s.Titre) === slug
    )) {
      console.log("⚠️ Le service existe mais n'est pas directement accessible via l'API avec ce slug");
      return true;
    } else {
      console.log("❌ Le service n'existe pas du tout");
      return false;
    }
  } catch (error) {
    console.error("Erreur pendant le débogage:", error);
    return false;
  } finally {
    console.log("========== FIN DU DÉBOGAGE ==========");
  }
}