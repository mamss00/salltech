// utils/api.js
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.sall.technology';

export function titreToSlug(titre) {
  if (!titre) return '';
  return titre
    .toLowerCase()
    .normalize("NFD").replace(/\u0300-\u036f/g, "")
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

export async function getServices() {
  try {
    const url = `${API_URL}/api/services?populate=deep`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Erreur API: ${res.status}`);
    const data = await res.json();
    return (data.data || []).map(s => ({ id: s.id, ...s.attributes }));
  } catch (e) {
    console.error("getServices error:", e);
    return [];
  }
}

export async function getAllServiceSlugs() {
  const services = await getServices();
  return services.map(service => ({ slug: service.slug || titreToSlug(service.Titre) }));
}

export async function getServiceBySlug(slug) {
  try {
    const url = `${API_URL}/api/services?filters[slug][$eq]=${slug}&populate=deep`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Erreur API: ${res.status}`);
    const data = await res.json();
    if (data.data && data.data.length > 0) {
      return { id: data.data[0].id, ...data.data[0].attributes };
    }
    return null;
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
    return data.data || [];
  } catch (e) {
    console.error("getProjects error:", e);
    return [];
  }
}

export async function getHomePageContent() {
  try {
    const url = `${API_URL}/api/home-page?populate=deep`;
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
