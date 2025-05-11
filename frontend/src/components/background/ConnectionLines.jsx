'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

// Version complètement réécrite pour éviter les erreurs de chemin SVG
export default function ConnectionLines({ color = 'blue', animate = true }) {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  // Rien à rendre côté serveur
  if (!mounted) return null
  
  // Couleurs basées sur les variables CSS
  const colorValues = {
    blue: 'rgba(52, 152, 219, 0.03)',
    purple: 'rgba(155, 89, 182, 0.025)',
    red: 'rgba(231, 76, 60, 0.02)'
  }
  
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
      {/* Utiliser des divs avec des dégradés au lieu des paths SVG complexes */}
      <div className="absolute inset-0">
        {/* Ligne gauche */}
        <motion.div 
          className="absolute left-0 h-full w-[60px]"
          style={{ 
            background: `linear-gradient(to bottom, transparent, ${colorValues[color]}, transparent)`,
            opacity: 0.8,
            borderRadius: '50%',
          }}
          animate={animate ? { 
            left: ['2%', '5%', '2%'],
            width: ['60px', '80px', '60px'],
          } : {}}
          transition={{
            duration: 40,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "mirror"
          }}
        />
        
        {/* Ligne centrale */}
        <motion.div 
          className="absolute h-full w-[40px]"
          style={{ 
            background: `linear-gradient(to bottom, transparent, ${colorValues.red}, transparent)`,
            opacity: 0.8,
            borderRadius: '50%',
            left: '50%',
            transform: 'translateX(-50%)'
          }}
          animate={animate ? { 
            left: ['50%', '45%', '55%', '50%'],
            width: ['40px', '60px', '50px', '40px'],
          } : {}}
          transition={{
            duration: 50,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "mirror",
            delay: 10
          }}
        />
        
        {/* Ligne droite */}
        <motion.div 
          className="absolute right-0 h-full w-[50px]"
          style={{ 
            background: `linear-gradient(to bottom, transparent, ${colorValues.purple}, transparent)`,
            opacity: 0.8,
            borderRadius: '50%'
          }}
          animate={animate ? { 
            right: ['2%', '5%', '2%'],
            width: ['50px', '70px', '50px'],
          } : {}}
          transition={{
            duration: 45,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "mirror",
            delay: 5
          }}
        />
      </div>
      
      {/* Éléments décoratifs additionnels qui ne nécessitent pas d'animation de chemin */}
      <motion.div 
        className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full opacity-20"
        style={{ background: `radial-gradient(circle, ${colorValues[color]} 0%, transparent 70%)` }}
        animate={animate ? { 
          scale: [1, 1.2, 1],
          x: [0, 20, 0],
          y: [0, -20, 0]
        } : {}}
        transition={{
          duration: 30,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "mirror"
        }}
      />
      
      <motion.div 
        className="absolute bottom-1/4 right-1/4 w-32 h-32 rounded-full opacity-20"
        style={{ background: `radial-gradient(circle, ${colorValues.purple} 0%, transparent 70%)` }}
        animate={animate ? { 
          scale: [1, 1.2, 1],
          x: [0, -20, 0],
          y: [0, 20, 0]
        } : {}}
        transition={{
          duration: 35,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "mirror",
          delay: 15
        }}
      />
      
      {/* Points décoratifs */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={`dot-${i}`}
          className="absolute w-1 h-1 rounded-full"
          style={{ 
            background: i % 3 === 0 ? colorValues[color] : 
                      i % 3 === 1 ? colorValues.purple : 
                                  colorValues.red,
            left: `${10 + (i * 8)}%`,
            top: `${20 + (i * 6)}%`
          }}
          animate={animate ? { 
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.5, 1]
          } : {}}
          transition={{
            duration: 5 + i * 2,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "mirror",
            delay: i * 0.5
          }}
        />
      ))}
    </div>
  )
}