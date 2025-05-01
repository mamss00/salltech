// frontend/src/utils/api.js - version simplifiée sans contenu statique

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.sall.technology';

/**
 * Récupère les services depuis Strapi
 */
export async function getServices() {
  try {
    // Utiliser ?populate=* pour récupérer toutes les relations de premier niveau
    // et ?populate=deep pour récupérer toutes les relations imbriquées
    const url = `${API_URL}/api/services?populate=deep`;
    console.log(`Récupération des services: ${url}`);
    
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Erreur API: ${response.status}`);
    
    const data = await response.json();
    console.log(`Services récupérés: ${data.data?.length || 0}`);
    
    // Retourner les données transformées
    return data.data.map(service => ({
      id: service.id,
      ...service.attributes
    }));
  } catch (error) {
    console.error("Erreur dans getServices:", error);
    return [];
  }
}

/**
 * Récupère un service par son slug
 */
export async function getServiceBySlug(slug) {
  try {
    console.log(`Recherche du service avec slug: "${slug}"`);
    
    // Récupérer le service directement par son ID si c'est possible
    if (slug === "sites-internet-professionnels") {
      // Note: ID 33 basé sur les données que vous avez partagées
      const serviceUrl = `${API_URL}/api/services/33?populate=deep`;
      console.log(`Tentative de récupération directe par ID: ${serviceUrl}`);
      
      try {
        const serviceResponse = await fetch(serviceUrl);
        if (serviceResponse.ok) {
          const serviceData = await serviceResponse.json();
          console.log("Service récupéré par ID");
          return {
            id: serviceData.data.id,
            ...serviceData.data.attributes
          };
        }
      } catch (error) {
        console.error("Erreur lors de la récupération directe par ID:", error);
      }
    }
    
    // Essayer de filtrer par slug
    const url = `${API_URL}/api/services?filters[slug]=${slug}&populate=deep`;
    console.log(`URL d'appel: ${url}`);
    
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Erreur API: ${response.status}`);
    
    const data = await response.json();
    console.log(`Résultat de la recherche: ${data.data?.length || 0} services trouvés`);
    
    if (data.data && data.data.length > 0) {
      return {
        id: data.data[0].id,
        ...data.data[0].attributes
      };
    }
    
    // Si le service n'a pas été trouvé, essayer de récupérer tous les services
    console.log("Service non trouvé par slug, tentative avec tous les services");
    const allServices = await getServices();
    
    // Rechercher dans tous les services
    const service = allServices.find(s => 
      s.slug === slug || 
      (s.Titre && s.Titre.toLowerCase().includes(slug.replace(/-/g, ' ')))
    );
    
    if (service) {
      console.log(`Service trouvé par recherche générale: ${service.Titre}`);
      return service;
    }
    
    console.log("Aucun service trouvé après toutes les tentatives");
    return null;
  } catch (error) {
    console.error(`Erreur dans getServiceBySlug pour "${slug}":`, error);
    return null;
  }
}

/**
 * Récupère tous les slugs des services
 */
export async function getAllServiceSlugs() {
  try {
    const services = await getServices();
    return services.map(service => {
      // Utiliser le slug du service ou générer à partir du titre si non disponible
      const slug = service.slug || service.Titre.toLowerCase().replace(/\s+/g, '-');
      return { slug };
    });
  } catch (error) {
    console.error("Erreur dans getAllServiceSlugs:", error);
    return [];
  }
}