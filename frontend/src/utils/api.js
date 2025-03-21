// frontend/src/utils/api.js
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.sall.technology';

async function fetchAPI(path) {
  try {
    const res = await fetch(`${API_URL}/api${path}`);
    
    if (!res.ok) {
      console.error(`API error: ${res.status} on ${path}`);
      throw new Error(`API error: ${res.status}`);
    }
    
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching from API:", error);
    return { data: [] }; // Retourner un objet vide compatible avec l'API Strapi
  }
}

export async function getServices() {
  const data = await fetchAPI('/services?populate=*');
  return data.data || [];
}

export async function getProjects() {
  const data = await fetchAPI('/projects?populate=*');
  return data.data || [];
}

export async function getHomePageContent() {
  const data = await fetchAPI('/home-page?populate=deep');
  return data.data?.attributes || {};
}

export async function getContactInfo() {
  const data = await fetchAPI('/contact-info');
  return data.data?.attributes || {};
}