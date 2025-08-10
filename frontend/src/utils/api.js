const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://backend.sall.technology';

export function titreToSlug(titre) {
  if (!titre) return '';
  return titre
    .toLowerCase()
    .normalize("NFD").replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function addNoCacheParam(url) {
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}timestamp=${Date.now()}`;
}

function normalizeAttributes(entry) {
  if (!entry?.attributes) return entry || {};
  
  const attrs = { ...entry.attributes };
  
  if (attrs.seo?.data) {
    attrs.seo = attrs.seo.data.attributes || {};
  }
  
  if (attrs.projets_lies?.data) {
    attrs.projets_lies = attrs.projets_lies.data.map(p => ({
      id: p.id || Math.random(),
      attributes: p.attributes || {}
    }));
  }
  
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

// --------- Projects ---------
// frontend/src/utils/api.js - SECTION PROJETS MISE À JOUR

export async function getProjetBySlug(slug) {
  if (!slug || typeof slug !== 'string') return null;
  
  try {
    let url = `${API_URL}/api/projets?filters[slug][$eq]=${encodeURIComponent(slug)}` +
              `&populate[Imageprincipale]=true` +
              `&populate[Imagesadditionnelles]=true` +
              `&populate[technologies]=true` +
              `&populate[caracteristiques]=true` +
              `&populate[services]=true` +
              `&populate[seo]=true` +
              // ✅ NOUVEAUX CHAMPS AJOUTÉS
              `&populate[methodologie]=true` +          // Processus du projet
              `&populate[resultats]=true` +             // Résultats chiffrés  
              `&populate[equipe]=true`;                 // Équipe projet
    
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
      Description: Array.isArray(project.Description) ? project.Description : [],
      // ✅ NOUVEAUX CHAMPS AVEC VALEURS PAR DÉFAUT
      methodologie: project.methodologie || [],      // Processus du projet
      resultats: project.resultats || null,          // Résultats chiffrés
      defis: project.defis || '',                    // Défis techniques
      duree_projet: project.duree_projet || '',      // Durée du projet
      equipe: project.equipe || []                   // Équipe projet
    };
  } catch (e) {
    console.error(`getProjetBySlug error for slug "${slug}":`, e.message);
    return null;
  }
}

// --------- Services ---------

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

// --------- Helpers ---------

export function getStrapiMediaUrl(url) {
  if (!url || typeof url !== 'string') return null;
  
  if (url.startsWith('http') || url.startsWith('https')) {
    return url;
  }
  
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://backend.sall.technology';
  return `${apiUrl}${url.startsWith('/') ? url : `/${url}`}`;
}
