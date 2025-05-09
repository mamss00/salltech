'use client'

import React from 'react'
import { motion } from 'framer-motion'
import GridBackground from '@/components/background/GridBackground'
import ConnectingElements from '@/components/background/ConnectingElements'

export default function SectionWrapper({
  children,
  id,
  className = "",
  primaryColor = "blue",
  showTopConnection = true,
  showBottomConnection = true,
  opacity = 5
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
      {/* Arrière-plan technique */}
      <GridBackground 
        color={primaryColor}
        opacity={opacity}
      />
      
      {/* Éléments de connexion entre les sections */}
      {connectionPosition && (
        <ConnectingElements 
          position={connectionPosition}
          primaryColor={primaryColor}
        />
      )}
      
      {/* Le contenu de la section */}
      {children}
    </section>
  );
}