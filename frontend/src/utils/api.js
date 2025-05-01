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
 * Récupère la liste des services depuis Strapi
 * @returns {Promise<Array>} - Liste des services
 */
export async function getServices() {
  try {
    const data = await fetchAPI('/services?populate=*');
    return data.data || [];
  } catch (error) {
    console.error("Error in getServices:", error);
    throw error;
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
    throw error;
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
 * Récupère tous les services pour pouvoir filtrer côté client
 * @returns {Promise<Array>} - Liste des services
 */
export async function getAllServices() {
  try {
    const data = await fetchAPI('/services?populate=deep');
    return data.data || [];
  } catch (error) {
    console.error("Error in getAllServices:", error);
    return [];
  }
}

/**
 * Récupère un service par son slug
 * @param {string} slug - Slug du service
 * @returns {Promise<Object>} - Données du service
 */
export async function getServiceBySlug(slug) {
  try {
    // Récupérer tous les services et filtrer côté client
    const allServices = await getAllServices();
    const service = allServices.find(s => s.attributes.slug === slug);
    
    if (service) {
      return service.attributes;
    }

    return null;
  } catch (error) {
    console.error(`Error in getServiceBySlug for slug "${slug}":`, error);
    return null; // Retourner null au lieu de lancer une erreur
  }
}

/**
 * Récupère tous les slugs des services pour la génération de pages statiques
 * @returns {Promise<Array<string>>} - Liste des slugs
 */
export async function getAllServiceSlugs() {
  try {
    const allServices = await getAllServices();
    return allServices.map(service => service.attributes.slug).filter(Boolean);
  } catch (error) {
    console.error("Error in getAllServiceSlugs:", error);
    return [];
  }
}