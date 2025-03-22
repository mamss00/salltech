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
 * Composant d'icône dynamique qui peut afficher des icônes de différentes bibliothèques
 * @param {string} icon - Nom de l'icône au format "Préfixe/NomIcone" (ex: "Fa/FaGlobe")
 * @param {string} className - Classes CSS optionnelles pour styliser l'icône
 * @param {string} fallback - Texte/emoji de secours si l'icône n'est pas trouvée
 * @param {object} rest - Autres props à passer au composant d'icône
 */
const DynamicIcon = ({ icon, className = "w-6 h-6", fallback = "✦", ...rest }) => {
  // Si aucune icône n'est spécifiée, retourner le fallback
  if (!icon) {
    return <span className={className} {...rest}>{fallback}</span>
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
      return <IconComponent className={className} {...rest} />
    }
  }
  
  // Si le format n'est pas correct ou l'icône n'existe pas,
  // vérifier si l'entrée est un emoji ou du texte simple
  return <span className={className} {...rest}>{icon}</span>
}

export default DynamicIcon