'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function ConnectionLines({ color = 'blue', animate = true }) {
  // État pour savoir si le composant est monté
  const [isMounted, setIsMounted] = useState(false)
  const [dimensions, setDimensions] = useState({ width: 1000, height: 1000 })
  
  // Attendre que le composant soit monté pour accéder à window
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setDimensions({
        width: window.innerWidth || 1000,
        height: window.innerHeight || 1000
      })
      setIsMounted(true)

      // Gérer le redimensionnement
      const handleResize = () => {
        setDimensions({
          width: window.innerWidth,
          height: window.innerHeight
        })
      }

      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
    }
  }, [])
  
  // Ne rien rendre tant que le composant n'est pas monté
  if (!isMounted) {
    return null
  }

  // Fonction de formatage sécurisée pour les nombres SVG
  const formatSVGNumber = (num) => {
    if (num === undefined || num === null || isNaN(num)) return 0;
    // Limiter à 2 décimales et s'assurer que c'est un nombre
    return parseFloat(parseFloat(num).toFixed(2));
  }

  // Créer des paths SVG sécurisés
  const generateSafePath = (commands) => {
    try {
      return commands.join(' ');
    } catch (error) {
      console.error("Error generating SVG path:", error);
      return "M 0 0"; // Fallback path
    }
  }

  // Récupérer les dimensions de manière sécurisée
  const w = formatSVGNumber(dimensions.width);
  const h = formatSVGNumber(dimensions.height);

  // Générer les chemins de manière sécurisée
  const leftPath = generateSafePath([
    "M", 20, 0,
    "C", 40, formatSVGNumber(h * 0.2), 20, formatSVGNumber(h * 0.4), 40, formatSVGNumber(h * 0.6),
    "C", 60, formatSVGNumber(h * 0.8), 30, h
  ]);

  const leftPathAlt = generateSafePath([
    "M", 20, 0,
    "C", 60, formatSVGNumber(h * 0.3), 0, formatSVGNumber(h * 0.5), 60, formatSVGNumber(h * 0.7),
    "C", 30, formatSVGNumber(h * 0.9), 30, h
  ]);

  const rightPath = generateSafePath([
    "M", formatSVGNumber(w - 30), 0,
    "C", formatSVGNumber(w - 60), formatSVGNumber(h * 0.2), formatSVGNumber(w - 20), formatSVGNumber(h * 0.4), formatSVGNumber(w - 60), formatSVGNumber(h * 0.7),
    "C", formatSVGNumber(w - 40), formatSVGNumber(h * 0.9), formatSVGNumber(w - 50), h
  ]);

  const rightPathAlt = generateSafePath([
    "M", formatSVGNumber(w - 30), 0,
    "C", formatSVGNumber(w - 30), formatSVGNumber(h * 0.3), formatSVGNumber(w - 70), formatSVGNumber(h * 0.5), formatSVGNumber(w - 20), formatSVGNumber(h * 0.7),
    "C", formatSVGNumber(w - 60), formatSVGNumber(h * 0.9), formatSVGNumber(w - 50), h
  ]);

  const centerPath = generateSafePath([
    "M", formatSVGNumber(w / 2), 0,
    "C", formatSVGNumber(w / 2 - 50), formatSVGNumber(h * 0.3), formatSVGNumber(w / 2 + 50), formatSVGNumber(h * 0.6), formatSVGNumber(w / 2 - 20), h
  ]);

  const centerPathAlt = generateSafePath([
    "M", formatSVGNumber(w / 2), 0,
    "C", formatSVGNumber(w / 2 + 70), formatSVGNumber(h * 0.4), formatSVGNumber(w / 2 - 70), formatSVGNumber(h * 0.7), formatSVGNumber(w / 2 + 40), h
  ]);

  return (
    <svg className="absolute inset-0 w-full h-full overflow-visible pointer-events-none" xmlns="http://www.w3.org/2000/svg">
      {/* Ligne gauche */}
      <motion.path
        d={leftPath}
        stroke={`rgba(var(--color-${color}-rgb), 0.03)`}
        strokeWidth="60"
        strokeLinecap="round"
        fill="none"
        animate={animate ? {
          d: [leftPath, leftPathAlt, leftPath]
        } : {}}
        transition={{
          duration: 40,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "mirror"
        }}
      />
      
      {/* Ligne droite */}
      <motion.path
        d={rightPath}
        stroke={`rgba(var(--color-purple-rgb), 0.025)`}
        strokeWidth="50"
        strokeLinecap="round"
        fill="none"
        animate={animate ? {
          d: [rightPath, rightPathAlt, rightPath]
        } : {}}
        transition={{
          duration: 45,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "mirror",
          delay: 5
        }}
      />
      
      {/* Ligne centrale */}
      <motion.path
        d={centerPath}
        stroke={`rgba(var(--color-red-rgb), 0.02)`}
        strokeWidth="40"
        strokeLinecap="round"
        fill="none"
        animate={animate ? {
          d: [centerPath, centerPathAlt, centerPath]
        } : {}}
        transition={{
          duration: 50,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "mirror",
          delay: 10
        }}
      />
    </svg>
  );
}