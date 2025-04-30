'use client'

import Link from 'next/link'
import DynamicIcon from '@/utils/DynamicIcon'

export default function ServiceCard({ service, index }) {
  if (!service) return null;
  
  const {
    titre,
    slug,
    description_courte,
    icone,
    couleur
  } = service;
  
  // Déterminer la couleur en fonction de la propriété ou de l'index
  const color = couleur || getColorByIndex(index);
  
  // Obtenir la couleur principale pour l'icône
  const iconColor = color.includes('blue') ? 'text-blue' : 
                   color.includes('purple') ? 'text-purple' : 
                   color.includes('red') ? 'text-red' : 
                   'text-blue';
  
  // Obtenir l'icône par défaut en fonction du titre si nécessaire
  const defaultIcons = {
    'Sites Internet': 'Fa/FaGlobe',
    'Applications Mobiles': 'Md/MdPhoneIphone',
    'Solutions Odoo': 'Fa/FaSearch',
    'Consulting DevOps': 'Fa/FaRocket',
    'Hébergement Web': 'Fa/FaServer',
    'SEO & Référencement': 'Fa/FaChartLine',
  };
  
  const iconName = icone || defaultIcons[titre] || 'Fa/FaLightbulb';
  
  return (
    <div className="group h-full">
      <div className={`bg-gradient-to-br ${color} backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-xl hover:-translate-y-2 hover:bg-white/10 h-full group p-8`}>
        <div className="text-4xl mb-5">
          <DynamicIcon 
            icon={iconName} 
            className="w-12 h-12"
            colorClass={iconColor}
          />
        </div>
        
        <h3 className="text-2xl font-bold mb-4 group-hover:text-blue transition-colors duration-300">
          {titre}
        </h3>
        
        <div className="h-0.5 w-16 bg-gradient-to-r from-blue via-purple to-red mb-5 opacity-60 group-hover:w-24 transition-all duration-300"></div>
        
        <p className="text-gray-600 mb-6">{description_courte}</p>
        
        <Link 
          href={`/services/${slug}`}
          className="inline-flex items-center text-blue font-medium hover:underline transition-all duration-300 group-hover:text-opacity-80 mt-auto"
        >
          <span>Découvrir ce service</span>
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