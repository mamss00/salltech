// frontend/src/utils/api.js
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.sall.technology';

export function titreToSlug(titre) {
  if (!titre) return '';
  return titre
    .toLowerCase()
    .normalize("NFD").replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

/**
 * Normalise les données reçues de Strapi pour être facilement utilisables
 * @param {Object} entry - Entrée de données Strapi
 * @returns {Object} - Données normalisées
 */
function normalizeAttributes(entry) {
  // Si entry n'a pas d'attributs (peut-être déjà normalisé), retourner tel quel
  if (!entry.attributes) return entry;
  
  const attrs = { ...entry.attributes };
  
  // Traitement spécial pour SEO si disponible
  if (attrs.seo?.data) {
    attrs.seo = attrs.seo.data.attributes;
  }
  
  // Traitement pour les projets liés
  if (attrs.projets_lies?.data) {
    attrs.projets_lies = attrs.projets_lies.data.map(p => ({
      id: p.id,
      attributes: p.attributes
    }));
  }
  
  // Traitement des images avec formats
  if (attrs.Image?.data) {
    if (Array.isArray(attrs.Image.data)) {
      attrs.Image = attrs.Image.data.map(img => ({
        id: img.id,
        ...img.attributes
      }));
    } else {
      attrs.Image = [{
        id: attrs.Image.data.id,
        ...attrs.Image.data.attributes
      }];
    }
  }
  
  // Ajout de l'ID à l'objet normalisé
  return { id: entry.id, ...attrs };
}

export async function getServices() {
  try {
    const url = `${API_URL}/api/services?populate[Image]=true&populate[caracteristiques]=true&populate[types_services]=true&populate[methodologie]=true&populate[technologies]=true&populate[faq]=true&populate[seo]=true&populate[projets_lies][populate]=*`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Erreur API: ${res.status}`);
    const data = await res.json();
    return (data.data || []).map(normalizeAttributes);
  } catch (e) {
    console.error("getServices error:", e);
    throw e;
  }
}

export async function getAllServiceSlugs() {
  try {
    const services = await getServices();
    return services
      .filter(service => service.slug)
      .map(service => ({ slug: service.slug || titreToSlug(service.Titre) }));
  } catch (error) {
    console.error("getAllServiceSlugs error:", error);
    return [];
  }
}

export async function getServiceBySlug(slug) {
  try {
    const url = `${API_URL}/api/services?filters[slug][$eq]=${slug}` +
                `&populate[Image]=true` +
                `&populate[caracteristiques]=true` +
                `&populate[types_services]=true` +
                `&populate[methodologie]=true` +
                `&populate[technologies]=true` +
                `&populate[faq]=true` +
                `&populate[seo][populate]=*` +
                `&populate[projets_lies][populate]=*`;
    
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Erreur API: ${res.status}`);
    const data = await res.json();
    
    if (!data.data?.[0]) return null;
    return normalizeAttributes(data.data[0]);
  } catch (e) {
    console.error(`getServiceBySlug error for slug "${slug}":`, e);
    return null;
  }
}

export async function getProjects() {
  try {
    const url = `${API_URL}/api/projets?populate=*`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Erreur API: ${res.status}`);
    const data = await res.json();
    return (data.data || []).map(normalizeAttributes);
  } catch (e) {
    console.error("getProjects error:", e);
    return [];
  }
}

export async function getHomePageContent() {
  try {
    const url = `${API_URL}/api/home-page?populate=*`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Erreur API: ${res.status}`);
    const data = await res.json();
    return data.data?.attributes || {};
  } catch (e) {
    console.error("getHomePageContent error:", e);
    throw e;
  }
}

export async function getContactInfo() {
  try {
    const url = `${API_URL}/api/contact-info`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Erreur API: ${res.status}`);
    const data = await res.json();
    return data.data?.attributes || {};
  } catch (e) {
    console.error("getContactInfo error:", e);
    throw e;
  }
}

export async function submitContactForm(formData) {
  try {
    const url = `${API_URL}/api/contact`;
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: formData }),
    });
    if (!res.ok) throw new Error(`Erreur API: ${res.status}`);
    return await res.json();
  } catch (e) {
    console.error("submitContactForm error:", e);
    throw e;
  }
}

/**
 * Formate une URL d'image Strapi pour qu'elle soit complète
 * @param {string} url - URL relative de l'image
 * @returns {string} - URL complète
 */
export function getStrapiMediaUrl(url) {
  if (!url) return null;
  
  // Si l'URL est absolue, la retourner telle quelle
  if (url.startsWith('http') || url.startsWith('https')) {
    return url;
  }
  
  // Sinon, préfixer avec l'URL de l'API
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api.sall.technology';
  return `${apiUrl}${url}`;
}