'use client'

import React from 'react'
import { motion } from 'framer-motion'

/**
 * Composant qui génère les lignes courbes de connexion entre les sections
 */
export default function ConnectionLines({ color = 'blue', animate = true }) {
  return (
    <svg className="absolute inset-0 w-full h-full overflow-visible pointer-events-none" xmlns="http://www.w3.org/2000/svg">
      {/* Ligne gauche */}
      <motion.path
        d={`M 20,0 C 40,${window.innerHeight * 0.2} 20,${window.innerHeight * 0.4} 40,${window.innerHeight * 0.6} C 60,${window.innerHeight * 0.8} 30,${window.innerHeight}`}
        stroke={`rgba(var(--color-${color}-rgb), 0.03)`}
        strokeWidth="60"
        strokeLinecap="round"
        fill="none"
        animate={animate ? {
          d: [
            `M 20,0 C 40,${window.innerHeight * 0.2} 20,${window.innerHeight * 0.4} 40,${window.innerHeight * 0.6} C 60,${window.innerHeight * 0.8} 30,${window.innerHeight}`,
            `M 20,0 C 60,${window.innerHeight * 0.3} 0,${window.innerHeight * 0.5} 60,${window.innerHeight * 0.7} C 30,${window.innerHeight * 0.9} 30,${window.innerHeight}`,
            `M 20,0 C 40,${window.innerHeight * 0.2} 20,${window.innerHeight * 0.4} 40,${window.innerHeight * 0.6} C 60,${window.innerHeight * 0.8} 30,${window.innerHeight}`
          ]
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
        d={`M ${window.innerWidth - 30},0 C ${window.innerWidth - 60},${window.innerHeight * 0.2} ${window.innerWidth - 20},${window.innerHeight * 0.4} ${window.innerWidth - 60},${window.innerHeight * 0.7} C ${window.innerWidth - 40},${window.innerHeight * 0.9} ${window.innerWidth - 50},${window.innerHeight}`}
        stroke={`rgba(var(--color-purple-rgb), 0.025)`}
        strokeWidth="50"
        strokeLinecap="round"
        fill="none"
        animate={animate ? {
          d: [
            `M ${window.innerWidth - 30},0 C ${window.innerWidth - 60},${window.innerHeight * 0.2} ${window.innerWidth - 20},${window.innerHeight * 0.4} ${window.innerWidth - 60},${window.innerHeight * 0.7} C ${window.innerWidth - 40},${window.innerHeight * 0.9} ${window.innerWidth - 50},${window.innerHeight}`,
            `M ${window.innerWidth - 30},0 C ${window.innerWidth - 30},${window.innerHeight * 0.3} ${window.innerWidth - 70},${window.innerHeight * 0.5} ${window.innerWidth - 20},${window.innerHeight * 0.7} C ${window.innerWidth - 60},${window.innerHeight * 0.9} ${window.innerWidth - 50},${window.innerHeight}`,
            `M ${window.innerWidth - 30},0 C ${window.innerWidth - 60},${window.innerHeight * 0.2} ${window.innerWidth - 20},${window.innerHeight * 0.4} ${window.innerWidth - 60},${window.innerHeight * 0.7} C ${window.innerWidth - 40},${window.innerHeight * 0.9} ${window.innerWidth - 50},${window.innerHeight}`
          ]
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
        d={`M ${window.innerWidth / 2},0 C ${window.innerWidth / 2 - 50},${window.innerHeight * 0.3} ${window.innerWidth / 2 + 50},${window.innerHeight * 0.6} ${window.innerWidth / 2 - 20},${window.innerHeight}`}
        stroke={`rgba(var(--color-red-rgb), 0.02)`}
        strokeWidth="40"
        strokeLinecap="round"
        fill="none"
        animate={animate ? {
          d: [
            `M ${window.innerWidth / 2},0 C ${window.innerWidth / 2 - 50},${window.innerHeight * 0.3} ${window.innerWidth / 2 + 50},${window.innerHeight * 0.6} ${window.innerWidth / 2 - 20},${window.innerHeight}`,
            `M ${window.innerWidth / 2},0 C ${window.innerWidth / 2 + 70},${window.innerHeight * 0.4} ${window.innerWidth / 2 - 70},${window.innerHeight * 0.7} ${window.innerWidth / 2 + 40},${window.innerHeight}`,
            `M ${window.innerWidth / 2},0 C ${window.innerWidth / 2 - 50},${window.innerHeight * 0.3} ${window.innerWidth / 2 + 50},${window.innerHeight * 0.6} ${window.innerWidth / 2 - 20},${window.innerHeight}`
          ]
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