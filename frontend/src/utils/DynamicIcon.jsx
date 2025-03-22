'use client'

import React from 'react'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import * as BiIcons from 'react-icons/bi'
import * as BsIcons from 'react-icons/bs'
import * as FiIcons from 'react-icons/fi'
import * as HiIcons from 'react-icons/hi'
import * as MdIcons from 'react-icons/md'
import * as TbIcons from 'react-icons/tb'
import * as IoIcons from 'react-icons/io5'
import * as RiIcons from 'react-icons/ri'
import * as GoIcons from 'react-icons/go'

/**
 * Composant d'icône dynamique compatible avec Tailwind
 * @param {string} icon - Nom de l'icône au format "Préfixe/NomIcone" (ex: "Fa/FaGlobe")
 * @param {string} className - Classes CSS optionnelles
 * @param {string} colorClass - Classe Tailwind de couleur (ex: "text-blue")
 * @param {string} fallback - Texte/emoji de secours si l'icône n'est pas trouvée
 * @param {object} rest - Autres props à passer au composant d'icône
 */
const DynamicIcon = ({ 
  icon, 
  className = "", 
  colorClass = "", 
  fallback = "✦", 
  ...rest 
}) => {
  // Si aucune icône n'est spécifiée, retourner le fallback
  if (!icon) {
    return <span className={`${className} ${colorClass}`} {...rest}>{fallback}</span>
  }
  
  // Bibliothèques d'icônes disponibles
  const iconLibraries = {
    'Fa': FaIcons,
    'Ai': AiIcons,
    'Bi': BiIcons,
    'Bs': BsIcons,
    'Fi': FiIcons,
    'Hi': HiIcons,
    'Md': MdIcons,
    'Tb': TbIcons,
    'Io': IoIcons,
    'Ri': RiIcons,
    'Go': GoIcons,
  }
  
  // Extraire le préfixe de bibliothèque et le nom de l'icône
  if (icon.includes('/')) {
    const [libraryPrefix, iconComponentName] = icon.split('/')
    const iconLibrary = iconLibraries[libraryPrefix]
    
    if (iconLibrary && iconLibrary[iconComponentName]) {
      const IconComponent = iconLibrary[iconComponentName]
      
      // Traduction des classes Tailwind vers des styles CSS pour les couleurs
      let style = {};
      
      if (colorClass.includes('text-blue')) {
        style.color = '#3498db';
      } else if (colorClass.includes('text-purple')) {
        style.color = '#9b59b6';
      } else if (colorClass.includes('text-red')) {
        style.color = '#e74c3c';
      } else if (colorClass.includes('text-white')) {
        style.color = '#ffffff';
      } else if (colorClass.includes('text-gray')) {
        style.color = '#718096';
      }
      
      return <IconComponent className={className} style={style} {...rest} />
    }
  }
  
  // Si le format n'est pas correct ou l'icône n'existe pas
  return <span className={`${className} ${colorClass}`} {...rest}>{icon}</span>
}

export default DynamicIcon