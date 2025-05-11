'use client'

import React from 'react'

/**
 * Fonctions utilitaires pour les composants de grille et de décoration
 */

/**
 * Génère un tableau de particules aléatoires
 * @param {number} count - Nombre de particules à générer
 * @param {string} color - Couleur principale des particules
 * @returns {Array} - Tableau de particules
 */
export function generateParticles(count, color = 'blue') {
  return Array.from({ length: count }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    duration: Math.random() * 30 + 20,
    delay: Math.random() * 5,
    color: i % 3 === 0 ? color : i % 3 === 1 ? 'purple' : 'red'
  }));
}

/**
 * Génère un motif SVG pour la grille selon le type
 * @param {string} type - Type de grille ('dots', 'lines', 'circuit', 'honeycomb')
 * @param {string} color - Couleur de la grille
 * @returns {JSX.Element} - Pattern SVG
 */
export function generateGridPattern(type, color) {
  switch (type) {
    case 'dots':
      return (
        <pattern 
          id="dotsPattern" 
          width="20" 
          height="20" 
          patternUnits="userSpaceOnUse"
        >
          <circle 
            cx="10" 
            cy="10" 
            r="1" 
            fill={`var(--color-${color})`} 
          />
        </pattern>
      );
    
    case 'circuit':
      return (
        <pattern 
          id="circuitPattern" 
          width="100" 
          height="100" 
          patternUnits="userSpaceOnUse"
        >
          <path 
            d="M 10 10 L 90 10 M 10 50 L 90 50 M 10 90 L 90 90 M 10 10 L 10 90 M 50 10 L 50 90 M 90 10 L 90 90" 
            stroke={`var(--color-${color})`} 
            strokeWidth="0.5" 
            fill="none" 
          />
          <circle cx="10" cy="10" r="2" fill="none" stroke={`var(--color-${color})`} strokeWidth="0.5" />
          <circle cx="50" cy="10" r="2" fill="none" stroke={`var(--color-${color})`} strokeWidth="0.5" />
          <circle cx="90" cy="10" r="2" fill="none" stroke={`var(--color-${color})`} strokeWidth="0.5" />
          <circle cx="10" cy="50" r="2" fill="none" stroke={`var(--color-${color})`} strokeWidth="0.5" />
          <circle cx="50" cy="50" r="2" fill="none" stroke={`var(--color-${color})`} strokeWidth="0.5" />
          <circle cx="90" cy="50" r="2" fill="none" stroke={`var(--color-${color})`} strokeWidth="0.5" />
          <circle cx="10" cy="90" r="2" fill="none" stroke={`var(--color-${color})`} strokeWidth="0.5" />
          <circle cx="50" cy="90" r="2" fill="none" stroke={`var(--color-${color})`} strokeWidth="0.5" />
          <circle cx="90" cy="90" r="2" fill="none" stroke={`var(--color-${color})`} strokeWidth="0.5" />
        </pattern>
      );
    
    case 'honeycomb':
      return (
        <pattern 
          id="honeycombPattern" 
          width="40" 
          height="40" 
          patternUnits="userSpaceOnUse"
          patternTransform="translate(0 0) scale(1) rotate(0)"
        >
          <path 
            d="M20 10 L30 20 L20 30 L10 20 Z" 
            stroke={`var(--color-${color})`} 
            strokeWidth="0.5" 
            fill="none" 
          />
        </pattern>
      );
      
    case 'lines':
    default:
      return (
        <pattern 
          id="linesPattern" 
          width="40" 
          height="40" 
          patternUnits="userSpaceOnUse"
        >
          <path 
            d="M 40 0 L 0 0 0 40" 
            fill="none" 
            stroke={`var(--color-${color})`} 
            strokeWidth="0.5" 
          />
        </pattern>
      );
  }
}