'use client'

import Link from 'next/link'
import DynamicIcon from '@/utils/DynamicIcon'

// Fonction locale simple pour créer un slug
function createSlug(title) {
  if (!title) return '';
  
  return title
    .toLowerCase()
    .replace(/[àáâãäå]/g, 'a')
    .replace(/[èéêë]/g, 'e')
    .replace(/[ìíîï]/g, 'i')
    .replace(/[òóôõö]/g, 'o')
    .replace(/[ùúûü]/g, 'u')
    .replace(/[ç]/g, 'c')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Fonction pour convertir un code Unicode en emoji
function unicodeToEmoji(unicode) {
  if (!unicode) return '💡'; // Emoji par défaut
  
  if (!unicode.startsWith('U+')) {
    return unicode; // Déjà un emoji ou une chaîne normale
  }
  
  try {
    // Enlever le préfixe "U+" et convertir en nombre hexadécimal
    const codePoint = parseInt(unicode.replace('U+', ''), 16);
    // Convertir en caractère
    return String.fromCodePoint(codePoint);
  } catch (e) {
    console.error("Erreur lors de la conversion unicode:", e);
    return '💡'; // Emoji par défaut en cas d'erreur
  }
}

export default function ServiceCard({ service, index }) {
  if (!service) return null;
  
  // Utiliser directement les propriétés du service (sans .attributes)
  const titre = service.Titre;
  
  // Extraire le texte de description de la structure Strapi
  let description = '';
  if (Array.isArray(service.Description) && service.Description.length > 0) {
    const firstParagraph = service.Description[0];
    if (firstParagraph.children && firstParagraph.children.length > 0) {
      description = firstParagraph.children[0].text || '';
    }
  }
  
  // Récupérer l'emoji et le convertir si nécessaire
  const emoji = unicodeToEmoji(service.Emoji);
  const couleur = service.Couleur;
  
  // Générer le slug à partir du titre directement dans le composant
  const slug = createSlug(titre);
  
  // Déterminer la couleur en fonction de la propriété ou de l'index
  const color = couleur || getColorByIndex(index);
  
  // Obtenir la couleur principale pour l'icône
  const iconColor = color.includes('blue') ? 'text-blue' : 
                    color.includes('purple') ? 'text-purple' : 
                    color.includes('red') ? 'text-red' : 
                    'text-blue';
  
  return (
    <div className="group h-full">
      <div className={`bg-gradient-to-br ${color} backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-xl hover:-translate-y-2 hover:bg-white/10 h-full group p-8`}>
        <div className="text-4xl mb-5">
          <span className={`text-5xl ${iconColor}`}>{emoji}</span>
        </div>
        
        <h3 className="text-2xl font-bold mb-4 group-hover:text-blue transition-colors duration-300">
          {titre}
        </h3>
        
        <div className="h-0.5 w-16 bg-gradient-to-r from-blue via-purple to-red mb-5 opacity-60 group-hover:w-24 transition-all duration-300"></div>
        
        <p className="text-gray-600 mb-6">{description}</p>
        
        <Link 
          href={`/services/${slug}`}
          className="inline-flex items-center text-blue font-medium hover:underline transition-all duration-300 group-hover:text-opacity-80 mt-auto"
        >
          <span>En savoir plus</span>
          <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
          </svg>
        </Link>
      </div>
    </div>
  )
}

// Fonction pour obtenir la couleur en fonction de l'index
function getColorByIndex(index) {
  const colorClasses = [
    "from-blue/20 to-blue/5",
    "from-purple/20 to-purple/5",
    "from-red/20 to-red/5"
  ]
  return colorClasses[index % colorClasses.length]
}