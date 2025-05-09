'use client'

import React from 'react'
import { motion } from 'framer-motion'
import BackgroundDecoration from './BackgroundDecoration'
import ConnectingElements from './ConnectingElements'
import GridBackground from './GridBackground'

/**
 * Composant pour envelopper les sections et créer une continuité visuelle
 * @param {Object} props - Propriétés du composant
 * @param {React.ReactNode} props.children - Contenu de la section
 * @param {string} props.id - ID de la section pour le scroll
 * @param {string} props.className - Classes CSS additionnelles
 * @param {string} props.primaryColor - Couleur principale (blue, purple, red)
 * @param {string} props.secondaryColor - Couleur secondaire (blue, purple, red)
 * @param {boolean} props.showTopConnection - Afficher la connexion du haut
 * @param {boolean} props.showBottomConnection - Afficher la connexion du bas
 * @param {string} props.connectionType - Type de connexion ('wave', 'line', 'dots', 'triangles')
 * @param {string} props.backgroundType - Type d'arrière-plan ('dots', 'lines', 'circuit', 'honeycomb')
 */
export default function SectionWrapper({
  children,
  id,
  className = "",
  primaryColor = "blue",
  secondaryColor = "purple",
  showTopConnection = true,
  showBottomConnection = true,
  connectionType = "wave",
  backgroundType = "lines",
  opacity = 5,
  animate = true,
  addParticles = true,
  particleCount = 15
}) {
  // Position de la connexion
  const connectionPosition = showTopConnection && showBottomConnection 
    ? 'both' 
    : showTopConnection 
      ? 'top' 
      : showBottomConnection 
        ? 'bottom' 
        : null;
  
  return (
    <section id={id} className={`relative ${className}`}>
      {/* Arrière-plan décoratif commun */}
      <GridBackground 
        type={backgroundType}
        color={primaryColor}
        opacity={opacity}
        animate={animate}
        addParticles={addParticles}
        particleCount={particleCount}
      />
      
      {/* Éléments de connexion entre les sections */}
      {connectionPosition && (
        <ConnectingElements 
          position={connectionPosition}
          type={connectionType}
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
        />
      )}
      
      {/* Décorations d'arrière-plan */}
      <BackgroundDecoration
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
      />
      
      {/* Le contenu de la section */}
      {children}
    </section>
  );
}