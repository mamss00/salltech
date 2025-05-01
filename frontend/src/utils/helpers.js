// frontend/src/utils/helpers.js

import React from 'react';

/**
 * Convertit le contenu richtext de Strapi en JSX
 * @param {Array} content - Contenu richtext de Strapi
 * @returns {JSX.Element} - Éléments JSX correspondants
 */
export function renderRichText(content) {
  if (!content || !Array.isArray(content)) {
    return null;
  }

  return content.map((block, blockIndex) => {
    switch (block.type) {
      case 'paragraph':
        return (
          <p key={blockIndex} className="mb-4">
            {block.children.map((child, childIndex) => renderTextNode(child, childIndex))}
          </p>
        );
      case 'heading':
        const HeadingTag = `h${block.level}`;
        return (
          <HeadingTag key={blockIndex} className={`font-bold mb-4 ${block.level === 1 ? 'text-3xl' : block.level === 2 ? 'text-2xl' : 'text-xl'}`}>
            {block.children.map((child, childIndex) => renderTextNode(child, childIndex))}
          </HeadingTag>
        );
      case 'list':
        const ListTag = block.format === 'ordered' ? 'ol' : 'ul';
        return (
          <ListTag key={blockIndex} className={`mb-4 pl-6 ${block.format === 'ordered' ? 'list-decimal' : 'list-disc'}`}>
            {block.children.map((item, itemIndex) => (
              <li key={itemIndex}>
                {item.children.map((child, childIndex) => renderTextNode(child, childIndex))}
              </li>
            ))}
          </ListTag>
        );
      case 'quote':
        return (
          <blockquote key={blockIndex} className="border-l-4 border-gray-300 pl-4 italic my-4">
            {block.children.map((child, childIndex) => renderTextNode(child, childIndex))}
          </blockquote>
        );
      case 'code':
        return (
          <pre key={blockIndex} className="bg-gray-100 p-4 rounded-md overflow-x-auto my-4">
            <code>{block.children.map((child) => child.text).join('')}</code>
          </pre>
        );
      case 'image':
        if (block.image?.url) {
          return (
            <figure key={blockIndex} className="my-4">
              <img 
                src={getStrapiMediaUrl(block.image.url)} 
                alt={block.image.alternativeText || ''} 
                className="rounded-md"
              />
              {block.image.caption && (
                <figcaption className="text-center text-sm text-gray-500 mt-2">
                  {block.image.caption}
                </figcaption>
              )}
            </figure>
          );
        }
        return null;
      default:
        return null;
    }
  });
}

/**
 * Rendu des nœuds de texte avec leurs styles
 * @param {Object} node - Nœud de texte
 * @param {number} index - Index du nœud
 * @returns {JSX.Element} - Élément JSX
 */
function renderTextNode(node, index) {
  if (!node) return null;
  
  if (node.type === 'text') {
    let content = node.text;
    
    // Appliquer les styles au texte
    if (node.bold) {
      content = <strong key={`bold-${index}`}>{content}</strong>;
    }
    if (node.italic) {
      content = <em key={`italic-${index}`}>{content}</em>;
    }
    if (node.underline) {
      content = <u key={`underline-${index}`}>{content}</u>;
    }
    if (node.strikethrough) {
      content = <del key={`del-${index}`}>{content}</del>;
    }
    if (node.code) {
      content = <code key={`code-${index}`} className="bg-gray-100 px-1 rounded">{content}</code>;
    }
    
    return content;
  }
  
  if (node.type === 'link' && node.children) {
    return (
      <a 
        key={index}
        href={node.url} 
        target={node.target || '_blank'} 
        rel="noopener noreferrer"
        className="text-blue hover:underline"
      >
        {node.children.map((child, childIndex) => renderTextNode(child, childIndex))}
      </a>
    );
  }
  
  return null;
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

/**
 * Extrait le titre principal d'un contenu richtext
 * @param {Array} content - Contenu richtext
 * @returns {string} - Titre principal
 */
export function extractMainTitle(content) {
  if (!content || !Array.isArray(content)) {
    return '';
  }
  
  // Chercher le premier titre de niveau 1 ou 2
  const headingBlock = content.find(block => 
    block.type === 'heading' && (block.level === 1 || block.level === 2)
  );
  
  if (headingBlock && headingBlock.children) {
    return headingBlock.children
      .map(child => child.text || '')
      .join('');
  }
  
  return '';
}

/**
 * Extrait le premier paragraphe d'un contenu richtext
 * @param {Array} content - Contenu richtext
 * @returns {string} - Premier paragraphe
 */
export function extractFirstParagraph(content) {
  if (!content || !Array.isArray(content)) {
    return '';
  }
  
  // Chercher le premier paragraphe
  const paragraphBlock = content.find(block => block.type === 'paragraph');
  
  if (paragraphBlock && paragraphBlock.children) {
    return paragraphBlock.children
      .map(child => child.text || '')
      .join('');
  }
  
  return '';
}

/**
 * Tronque un texte à une longueur maximale
 * @param {string} text - Texte à tronquer
 * @param {number} maxLength - Longueur maximale
 * @returns {string} - Texte tronqué
 */
export function truncateText(text, maxLength = 150) {
  if (!text || text.length <= maxLength) {
    return text;
  }
  
  return text.substring(0, maxLength) + '...';
}