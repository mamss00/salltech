// frontend/src/utils/api.js - VERSION CORRIGÉE AVEC TOUS LES EXPORTS

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://backend.sall.technology';

// Helper function pour créer un slug à partir d'un titre
function titreToSlug(titre) {
  if (!titre || typeof titre !== 'string') return 'projet';
  return titre
    .toLowerCase()
    .replace(/[àáâãäå]/g, 'a')
    .replace(/[èéêë]/g, 'e')
    .replace(/[ìíîï]/g, 'i')
    .replace(/[òóôõö]/g, 'o')
    .replace(/[ùúûü]/g, 'u')
    .replace(/[ç]/g, 'c')
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

// Helper function pour ajouter un timestamp anti-cache
function addNoCacheParam(url) {
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}timestamp=${Date.now()}`;
}

// Helper function pour normaliser les attributs Strapi
function normalizeAttributes(entry) {
  if (!entry?.attributes) return entry || {};
  
  const attrs = { ...entry.attributes };
  
  // Normaliser le SEO
  if (attrs.seo?.data) {
    attrs.seo = attrs.seo.data.attributes || {};
  }
  
  // Normaliser les projets liés
  if (attrs.projets_lies?.data) {
    attrs.projets_lies = attrs.projets_lies.data.map(p => ({
      id: p.id || Math.random(),
      attributes: p.attributes || {}
    }));
  }
  
  // Normaliser les images
  if (attrs.Image?.data) {
    if (Array.isArray(attrs.Image.data)) {
      attrs.Image = attrs.Image.data.map(img => ({
        id: img.id || Math.random(),
        ...img.attributes || {}
      }));
    } else {
      attrs.Image = [{
        id: attrs.Image.data.id || Math.random(),
        ...attrs.Image.data.attributes || {}
      }];
    }
  }
  
  // Normaliser les technologies
  if (attrs.technologies?.data) {
    attrs.technologies = attrs.technologies.data.map(tech => {
      const techData = { id: tech.id || Math.random(), ...tech.attributes || {} };
      
      if (techData.logo?.data) {
        if (Array.isArray(techData.logo.data)) {
          techData.logo = techData.logo.data.map(img => ({
            id: img.id || Math.random(),
            ...img.attributes || {}
          }));
        } else {
          techData.logo = {
            id: techData.logo.data.id || Math.random(),
            ...techData.logo.data.attributes || {}
          };
        }
      }
      
      return techData;
    });
  }
  
  return { id: entry.id || Math.random(), ...attrs };
}

// ========== PROJETS ==========

export async function getProjects() {
  try {
    let url = `${API_URL}/api/projets?populate=*`;
    url = addNoCacheParam(url);
    
    const res = await fetch(url, {
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      signal: AbortSignal.timeout(10000)
    });
    
    if (!res.ok) {
      console.warn(`API request failed: ${res.status} ${res.statusText}`);
      return [];
    }
    
    const data = await res.json();
    
    if (!data.data || !Array.isArray(data.data)) {
      console.warn('API returned invalid data structure');
      return [];
    }
    
    return data.data.map(project => {
      const normalized = normalizeAttributes(project);
      return {
        ...normalized,
        Titre: normalized.Titre || 'Projet sans titre',
        Resume: normalized.Resume || '',
        Categorie: normalized.Categorie || 'Non catégorisé',
        Datederealisation: normalized.Datederealisation || new Date().toISOString(),
        slug: normalized.slug || titreToSlug(normalized.Titre),
        technologies: normalized.technologies || [],
        caracteristiques: normalized.caracteristiques || [],
        Description: Array.isArray(normalized.Description) ? normalized.Description : []
      };
    });
  } catch (e) {
    console.error("getProjects error:", e.message);
    if (process.env.NODE_ENV === 'production' || process.env.CI) {
      console.warn('Returning empty projects array due to API error during build');
      return [];
    }
    return [];
  }
}

export async function getAllProjetSlugs() {
  try {
    const projets = await getProjects();
    return projets
      .filter(projet => projet.slug && typeof projet.slug === 'string')
      .map(projet => ({ slug: projet.slug }));
  } catch (error) {
    console.error("getAllProjetSlugs error:", error);
    return [];
  }
}

export async function getProjetBySlug(slug) {
  if (!slug || typeof slug !== 'string') return null;
  
  try {
    let url = `${API_URL}/api/projets?filters[slug][$eq]=${encodeURIComponent(slug)}` +
              `&populate[Imageprincipale]=true` +
              `&populate[Imagesadditionnelles]=true` +
              `&populate[technologies]=true` +
              `&populate[caracteristiques]=true` +
              `&populate[services]=true` +
              `&populate[seo]=true`;
    url = addNoCacheParam(url);
    
    const res = await fetch(url, {
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      signal: AbortSignal.timeout(10000)
    });
    
    if (!res.ok) {
      console.warn(`Project by slug API request failed: ${res.status}`);
      return null;
    }
    
    const data = await res.json();
    if (!data.data?.[0]) return null;
    
    const project = normalizeAttributes(data.data[0]);
    return {
      ...project,
      Titre: project.Titre || 'Projet sans titre',
      Resume: project.Resume || '',
      Categorie: project.Categorie || 'Non catégorisé',
      slug: project.slug || slug,
      technologies: project.technologies || [],
      caracteristiques: project.caracteristiques || [],
      Description: Array.isArray(project.Description) ? project.Description : []
    };
  } catch (e) {
    console.error(`getProjetBySlug error for slug "${slug}":`, e.message);
    return null;
  }
}

// ========== SERVICES ==========

export async function getServices() {
  try {
    let url = `${API_URL}/api/services?populate[Image]=true&populate[caracteristiques]=true&populate[types_services][populate][fonctionnalites]=true&populate[methodologie]=true&populate[technologies][populate][logo]=true&populate[faq]=true&populate[seo]=true&populate[projets_lies][populate]=*`;
    url = addNoCacheParam(url);
    
    const res = await fetch(url, {
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      signal: AbortSignal.timeout(10000)
    });
    
    if (!res.ok) {
      console.warn(`Services API request failed: ${res.status}`);
      return [];
    }
    
    const data = await res.json();
    return (data.data || []).map(normalizeAttributes);
  } catch (e) {
    console.error("getServices error:", e.message);
    return [];
  }
}

export async function getAllServiceSlugs() {
  try {
    const services = await getServices();
    return services
      .filter(service => service.slug && typeof service.slug === 'string')
      .map(service => ({ slug: service.slug }));
  } catch (error) {
    console.error("getAllServiceSlugs error:", error);
    return [];
  }
}

export async function getServiceBySlug(slug) {
  if (!slug || typeof slug !== 'string') return null;
  
  try {
    let url = `${API_URL}/api/services?filters[slug][$eq]=${encodeURIComponent(slug)}` +
              `&populate[Image]=true&populate[caracteristiques]=true&populate[types_services][populate][fonctionnalites]=true&populate[methodologie]=true&populate[technologies][populate][logo]=true&populate[faq]=true&populate[seo]=true&populate[projets_lies][populate]=*`;
    url = addNoCacheParam(url);
    
    const res = await fetch(url, {
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      signal: AbortSignal.timeout(10000)
    });
    
    if (!res.ok) {
      console.warn(`Service by slug API request failed: ${res.status}`);
      return null;
    }
    
    const data = await res.json();
    if (!data.data?.[0]) return null;
    
    const service = normalizeAttributes(data.data[0]);
    return {
      ...service,
      Titre: service.Titre || 'Service sans titre',
      slug: service.slug || slug,
      Description: Array.isArray(service.Description) ? service.Description : [],
      caracteristiques: service.caracteristiques || [],
      types_services: service.types_services || [],
      methodologie: service.methodologie || {},
      technologies: service.technologies || [],
      faq: service.faq || [],
      seo: service.seo || {},
      projets_lies: service.projets_lies || [],
      Image: service.Image || []
    };
  } catch (e) {
    console.error(`getServiceBySlug error for slug "${slug}":`, e.message);
    return null;
  }
}

// ========== HELPERS ==========

export function getStrapiMediaUrl(url) {
  if (!url || typeof url !== 'string') return null;
  
  if (url.startsWith('http') || url.startsWith('https')) {
    return url;
  }
  
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://backend.sall.technology';
  return `${apiUrl}${url.startsWith('/') ? url : `/${url}`}`;
}