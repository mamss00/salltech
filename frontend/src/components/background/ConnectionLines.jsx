'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function ConnectionLines({ color = 'blue', animate = true }) {
  // État pour savoir si le composant est monté
  const [isMounted, setIsMounted] = useState(false)
  
  // Attendre que le composant soit monté pour accéder à window
  useEffect(() => {
    setIsMounted(true)
  }, [])
  
  // Ne rien rendre tant que le composant n'est pas monté
  if (!isMounted) {
    return null
  }

  // Fonction pour assurer que les nombres sont formatés correctement
  // Pour éviter les problèmes de virgule/point décimal
  const n = (num) => {
    // Convertit en chaîne, remplace les virgules par des points et s'assure que c'est un nombre valide
    return Number(num.toString().replace(',', '.')).toFixed(2).replace(/\.00$/, '');
  }

  return (
    <svg className="absolute inset-0 w-full h-full overflow-visible pointer-events-none" xmlns="http://www.w3.org/2000/svg">
      {/* Ligne gauche */}
      <motion.path
        d={`M 20 0 C 40 ${n(window.innerHeight * 0.2)} 20 ${n(window.innerHeight * 0.4)} 40 ${n(window.innerHeight * 0.6)} C 60 ${n(window.innerHeight * 0.8)} 30 ${n(window.innerHeight)}`}
        stroke={`rgba(var(--color-${color}-rgb), 0.03)`}
        strokeWidth="60"
        strokeLinecap="round"
        fill="none"
        animate={animate ? {
          d: [
            `M 20 0 C 40 ${n(window.innerHeight * 0.2)} 20 ${n(window.innerHeight * 0.4)} 40 ${n(window.innerHeight * 0.6)} C 60 ${n(window.innerHeight * 0.8)} 30 ${n(window.innerHeight)}`,
            `M 20 0 C 60 ${n(window.innerHeight * 0.3)} 0 ${n(window.innerHeight * 0.5)} 60 ${n(window.innerHeight * 0.7)} C 30 ${n(window.innerHeight * 0.9)} 30 ${n(window.innerHeight)}`,
            `M 20 0 C 40 ${n(window.innerHeight * 0.2)} 20 ${n(window.innerHeight * 0.4)} 40 ${n(window.innerHeight * 0.6)} C 60 ${n(window.innerHeight * 0.8)} 30 ${n(window.innerHeight)}`
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
        d={`M ${n(window.innerWidth - 30)} 0 C ${n(window.innerWidth - 60)} ${n(window.innerHeight * 0.2)} ${n(window.innerWidth - 20)} ${n(window.innerHeight * 0.4)} ${n(window.innerWidth - 60)} ${n(window.innerHeight * 0.7)} C ${n(window.innerWidth - 40)} ${n(window.innerHeight * 0.9)} ${n(window.innerWidth - 50)} ${n(window.innerHeight)}`}
        stroke={`rgba(var(--color-purple-rgb), 0.025)`}
        strokeWidth="50"
        strokeLinecap="round"
        fill="none"
        animate={animate ? {
          d: [
            `M ${n(window.innerWidth - 30)} 0 C ${n(window.innerWidth - 60)} ${n(window.innerHeight * 0.2)} ${n(window.innerWidth - 20)} ${n(window.innerHeight * 0.4)} ${n(window.innerWidth - 60)} ${n(window.innerHeight * 0.7)} C ${n(window.innerWidth - 40)} ${n(window.innerHeight * 0.9)} ${n(window.innerWidth - 50)} ${n(window.innerHeight)}`,
            `M ${n(window.innerWidth - 30)} 0 C ${n(window.innerWidth - 30)} ${n(window.innerHeight * 0.3)} ${n(window.innerWidth - 70)} ${n(window.innerHeight * 0.5)} ${n(window.innerWidth - 20)} ${n(window.innerHeight * 0.7)} C ${n(window.innerWidth - 60)} ${n(window.innerHeight * 0.9)} ${n(window.innerWidth - 50)} ${n(window.innerHeight)}`,
            `M ${n(window.innerWidth - 30)} 0 C ${n(window.innerWidth - 60)} ${n(window.innerHeight * 0.2)} ${n(window.innerWidth - 20)} ${n(window.innerHeight * 0.4)} ${n(window.innerWidth - 60)} ${n(window.innerHeight * 0.7)} C ${n(window.innerWidth - 40)} ${n(window.innerHeight * 0.9)} ${n(window.innerWidth - 50)} ${n(window.innerHeight)}`
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
        d={`M ${n(window.innerWidth / 2)} 0 C ${n(window.innerWidth / 2 - 50)} ${n(window.innerHeight * 0.3)} ${n(window.innerWidth / 2 + 50)} ${n(window.innerHeight * 0.6)} ${n(window.innerWidth / 2 - 20)} ${n(window.innerHeight)}`}
        stroke={`rgba(var(--color-red-rgb), 0.02)`}
        strokeWidth="40"
        strokeLinecap="round"
        fill="none"
        animate={animate ? {
          d: [
            `M ${n(window.innerWidth / 2)} 0 C ${n(window.innerWidth / 2 - 50)} ${n(window.innerHeight * 0.3)} ${n(window.innerWidth / 2 + 50)} ${n(window.innerHeight * 0.6)} ${n(window.innerWidth / 2 - 20)} ${n(window.innerHeight)}`,
            `M ${n(window.innerWidth / 2)} 0 C ${n(window.innerWidth / 2 + 70)} ${n(window.innerHeight * 0.4)} ${n(window.innerWidth / 2 - 70)} ${n(window.innerHeight * 0.7)} ${n(window.innerWidth / 2 + 40)} ${n(window.innerHeight)}`,
            `M ${n(window.innerWidth / 2)} 0 C ${n(window.innerWidth / 2 - 50)} ${n(window.innerHeight * 0.3)} ${n(window.innerWidth / 2 + 50)} ${n(window.innerHeight * 0.6)} ${n(window.innerWidth / 2 - 20)} ${n(window.innerHeight)}`
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