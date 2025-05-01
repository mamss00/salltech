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
    const data = await fetchAPI('/services');
    return data.data || [];
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
    const data = await fetchAPI('/projects?populate=*');
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
    // Récupérer tous les services
    const services = await getServices();
    console.log('Nombre de services trouvés:', services.length);
    
    // Loguer tous les titres disponibles pour le débogage
    services.forEach(s => console.log('Service disponible:', s.Titre));
    
    // Rechercher le service en utilisant d'abord la correspondance directe puis la génération de slug
    const service = services.find(s => {
      // Essayer d'abord la correspondance directe
      if (TITLE_TO_SLUG_MAP[s.Titre] === slug) {
        return true;
      }
      
      // Sinon, générer le slug et comparer
      const generatedSlug = titreToSlug(s.Titre);
      console.log(`Comparaison: "${s.Titre}" => "${generatedSlug}" vs "${slug}"`);
      return generatedSlug === slug;
    });
    
    if (service) {
      console.log('Service trouvé:', service.Titre);
      return service;
    }
    
    // Solution de secours: chercher par ID si le slug semble être un nombre
    if (!isNaN(slug)) {
      const numericId = parseInt(slug, 10);
      const serviceById = services.find(s => s.id === numericId);
      if (serviceById) {
        console.log('Service trouvé par ID:', serviceById.Titre);
        return serviceById;
      }
    }
    
    console.log('Service non trouvé pour le slug:', slug);
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
    return services.map(service => ({
      slug: TITLE_TO_SLUG_MAP[service.Titre] || titreToSlug(service.Titre)
    }));
  } catch (error) {
    console.error("Error in getAllServiceSlugs:", error);
    return [];
  }
}

// Ajout pour les tests et le débogage
export async function logAllServices() {
  try {
    const services = await getServices();
    console.log('--- TOUS LES SERVICES ---');
    services.forEach(service => {
      console.log(`ID: ${service.id}, Titre: ${service.Titre}, Slug généré: ${titreToSlug(service.Titre)}`);
    });
    console.log('------------------------');
    return true;
  } catch (error) {
    console.error("Error in logAllServices:", error);
    return false;
  }
}