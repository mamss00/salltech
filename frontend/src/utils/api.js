// frontend/src/utils/api.js
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

// Modification: Ajout d'entrées supplémentaires pour améliorer la correspondance
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
    // Modification: Ajout de populate=* pour récupérer toutes les relations
    const data = await fetchAPI('/services?populate=deep');
    console.log("Services data:", data);
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
    
    // Nouvelle approche: récupérer directement par le champ slug
    const data = await fetchAPI(`/services?filters[slug]=${slug}&populate=deep`);
    console.log('Résultat de la recherche par slug:', data);
    
    if (data.data && data.data.length > 0) {
      console.log('Service trouvé directement par le slug:', data.data[0].attributes.Titre);
      return data.data[0].attributes;
    }
    
    // Si rien n'est trouvé, on essaie l'ancienne méthode
    console.log('Aucun service trouvé directement, essai avec la méthode alternative');
    
    // Récupérer tous les services
    const services = await getServices();
    console.log('Nombre de services trouvés:', services.length);
    
    // Loguer tous les titres disponibles pour le débogage
    services.forEach(service => console.log('Service disponible:', service.attributes?.Titre || service.Titre));
    
    // Rechercher le service en utilisant les correspondances
    const service = services.find(s => {
      const serviceTitle = s.attributes?.Titre || s.Titre;
      const serviceSlug = s.attributes?.slug || s.slug;
      
      // Vérifier d'abord si le slug correspond directement
      if (serviceSlug === slug) {
        console.log(`Correspondance directe trouvée par slug: ${serviceSlug}`);
        return true;
      }
      
      // Essayer ensuite la correspondance via le mapping
      if (TITLE_TO_SLUG_MAP[serviceTitle] === slug) {
        console.log(`Correspondance via mapping pour "${serviceTitle}"`);
        return true;
      }
      
      // Enfin, générer le slug et comparer
      const generatedSlug = titreToSlug(serviceTitle);
      console.log(`Comparaison: "${serviceTitle}" => "${generatedSlug}" vs "${slug}"`);
      return generatedSlug === slug;
    });
    
    if (service) {
      console.log('Service trouvé par méthode alternative:', service.attributes?.Titre || service.Titre);
      return service.attributes || service;
    }
    
    console.log(`Aucun service trouvé pour le slug "${slug}"`);
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
    // Modification: récupérer directement les slugs depuis l'API
    const data = await fetchAPI('/services?fields=slug');
    
    if (data.data && data.data.length > 0) {
      return data.data.map(service => ({
        slug: service.attributes.slug
      }));
    }
    
    // Méthode de secours
    const services = await getServices();
    return services.map(service => {
      const titre = service.attributes?.Titre || service.Titre;
      const slug = service.attributes?.slug || service.slug || TITLE_TO_SLUG_MAP[titre] || titreToSlug(titre);
      return { slug };
    });
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
      const id = service.id;
      const titre = service.attributes?.Titre || service.Titre;
      const slug = service.attributes?.slug || service.slug;
      const generatedSlug = titreToSlug(titre);
      
      console.log(`ID: ${id}, Titre: ${titre}, Slug stocké: ${slug}, Slug généré: ${generatedSlug}`);
    });
    console.log('------------------------');
    return true;
  } catch (error) {
    console.error("Error in logAllServices:", error);
    return false;
  }
}

// Fonction de débogage pour afficher les données brutes
export async function debugServices() {
  try {
    const response = await fetch(`${API_URL}/api/services?populate=*`);
    const data = await response.json();
    console.log("Services raw data:", data);
    return data;
  } catch (error) {
    console.error("Error fetching raw services data:", error);
    return null;
  }
}