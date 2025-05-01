const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.sall.technology';

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

/**
 * Récupère la liste des services depuis Strapi
 * @returns {Promise<Array>} - Liste des services
 */
export async function getServices() {
  try {
    // Récupérer les services avec toutes leurs relations
    const url = `${API_URL}/api/services?populate=deep`;
    console.log(`Récupération des services: ${url}`);
    
    const response = await fetch(url);
    if (!response.ok) {
      console.error(`Erreur API: ${response.status}`);
      throw new Error(`Erreur API: ${response.status}`);
    }
    
    const data = await response.json();
    console.log(`Services récupérés: ${data.data?.length || 0}`);
    
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
    const url = `${API_URL}/api/projets?populate=*`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Erreur API: ${response.status}`);
    }
    
    const data = await response.json();
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
    const url = `${API_URL}/api/home-page?populate=deep`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Erreur API: ${response.status}`);
    }
    
    const data = await response.json();
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
    const url = `${API_URL}/api/contact-info`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Erreur API: ${response.status}`);
    }
    
    const data = await response.json();
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
    const url = `${API_URL}/api/contact`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: formData }),
    });
    
    if (!response.ok) {
      throw new Error(`Erreur API: ${response.status}`);
    }
    
    return await response.json();
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
    
    // Essayer d'abord directement par le slug
    const url = `${API_URL}/api/services?filters[slug]=${slug}&populate=deep`;
    console.log(`URL d'appel API: ${url}`);
    
    const response = await fetch(url);
    
    if (!response.ok) {
      console.error(`Erreur API: ${response.status}`);
      throw new Error(`Erreur API: ${response.status}`);
    }
    
    const data = await response.json();
    console.log(`Résultat de la recherche: ${data.data?.length || 0} services trouvés`);
    
    if (data.data && data.data.length > 0) {
      console.log(`Service trouvé via API avec slug "${slug}"`);
      return {
        id: data.data[0].id,
        ...data.data[0].attributes
      };
    }
    
    // Si pas trouvé par slug, essayer de trouver par ID (si c'est "sites-internet-professionnels")
    if (slug === "sites-internet-professionnels") {
      console.log("Tentative de récupération directe du service 'Sites Internet Professionnels' par ID");
      
      const idUrl = `${API_URL}/api/services/33?populate=deep`;
      console.log(`URL par ID: ${idUrl}`);
      
      const idResponse = await fetch(idUrl);
      
      if (idResponse.ok) {
        const idData = await idResponse.json();
        console.log("Service trouvé par ID");
        
        return {
          id: idData.data.id,
          ...idData.data.attributes
        };
      }
    }
    
    // Si toujours pas trouvé, récupérer tous les services
    console.log("Service non trouvé par slug ou ID, recherche dans tous les services");
    
    const services = await getServices();
    
    // Chercher par titre qui inclut "Sites Internet"
    if (slug === "sites-internet-professionnels") {
      const siteService = services.find(s => 
        s.Titre && (
          s.Titre.includes("Sites Internet") || 
          s.Titre.toLowerCase().includes("site")
        )
      );
      
      if (siteService) {
        console.log(`Service trouvé par titre: ${siteService.Titre}`);
        return siteService;
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
 * @returns {Promise<Array<{slug: string}>>} - Liste des slugs
 */
export async function getAllServiceSlugs() {
  try {
    const services = await getServices();
    
    return services.map(service => {
      // Utiliser le slug s'il existe, sinon le générer à partir du titre
      const slug = service.slug || titreToSlug(service.Titre);
      return { slug };
    });
  } catch (error) {
    console.error("Error in getAllServiceSlugs:", error);
    return [];
  }
}