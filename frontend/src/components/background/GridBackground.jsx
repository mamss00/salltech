'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { generateParticles, generateGridPattern } from './GridUtils'
import ConnectionLines from './ConnectionLines'

/**
 * Composant principal pour ajouter une grille décorative et des éléments animés
 * en arrière-plan qui créent une continuité visuelle
 */
export default function GridBackground({ 
  type = 'lines', 
  color = 'blue',
  opacity = 5,
  animate = true,
  addParticles = true,
  particleCount = 15
}) {
  // État pour les particules
  const [particles, setParticles] = useState([]);
  
  // Générer les particules au montage du composant
  useEffect(() => {
    if (!addParticles) return;
    const newParticles = generateParticles(particleCount, color);
    setParticles(newParticles);
  }, [addParticles, particleCount, color]);
  
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Grille de fond */}
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className={`opacity-${opacity}`}>
        {generateGridPattern(type, color)}
        <rect width="100%" height="100%" fill={`url(#${type === 'dots' ? 'dotsPattern' : type === 'circuit' ? 'circuitPattern' : type === 'honeycomb' ? 'honeycombPattern' : 'linesPattern'})`} />
      </svg>
      
      {/* Lignes de connexion */}
      <ConnectionLines color={color} animate={animate} />
      
      {/* Particules animées */}
      {addParticles && particles.map(particle => (
        <motion.div
          key={particle.id}
          className={`absolute w-1 h-1 rounded-full bg-${particle.color}/${opacity * 4}`}
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`
          }}
          animate={{
            y: ["0%", "100%"],
            opacity: [0, 0.8, 0]
          }}
          transition={{
            y: {
              duration: particle.duration,
              repeat: Infinity,
              ease: "linear",
              delay: particle.delay
            },
            opacity: {
              duration: particle.duration * 0.8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: particle.delay
            }
          }}
        />
      ))}
      
      {/* Nuages colorés en arrière-plan */}
      <motion.div 
        className={`absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-${color}/2 blur-3xl`}
        animate={animate ? {
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.3, 0.2]
        } : {}}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      <motion.div 
        className="absolute bottom-1/3 left-1/4 w-96 h-96 rounded-full bg-purple/2 blur-3xl"
        animate={animate ? {
          scale: [1, 1.15, 1],
          opacity: [0.15, 0.25, 0.15]
        } : {}}
        transition={{
          duration: 25,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 5
        }}
      />
      
      <motion.div 
        className="absolute top-2/3 right-1/3 w-64 h-64 rounded-full bg-red/2 blur-3xl"
        animate={animate ? {
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1]
        } : {}}
        transition={{
          duration: 22,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 8
        }}
      />
      
      {/* Formes géométriques flottantes */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Cercle décoratif */}
        <motion.div 
          className={`absolute top-1/4 left-10 w-40 h-40 border border-${color}/10 rounded-full`}
          style={{ opacity: opacity / 100 }}
          animate={animate ? {
            rotate: 360,
            x: [0, 20, 0],
            y: [0, -20, 0]
          } : {}}
          transition={{
            rotate: { duration: 40, repeat: Infinity, ease: "linear" },
            x: { duration: 20, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" },
            y: { duration: 25, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: 5 }
          }}
        >
          <motion.div 
            className={`absolute inset-4 border border-${color}/15 rounded-full`}
            animate={animate ? {
              rotate: -360,
            } : {}}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear",
              delay: 2
            }}
          />
        </motion.div>
        
        {/* Triangle décoratif */}
        <motion.div 
          className="absolute bottom-1/4 right-20 opacity-10"
          animate={animate ? {
            rotate: [0, 10, -10, 0],
            scale: [1, 1.05, 0.95, 1]
          } : {}}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <svg width="100" height="100" viewBox="0 0 100 100">
            <motion.path 
              d="M50,10 L90,80 L10,80 Z" 
              stroke={`var(--color-${color})`} 
              strokeWidth="1.5" 
              fill="none"
              animate={animate ? {
                d: [
                  "M50,10 L90,80 L10,80 Z",
                  "M50,15 L85,75 L15,75 Z",
                  "M50,10 L90,80 L10,80 Z"
                ]
              } : {}}
              transition={{
                duration: 15,
                repeat: Infinity,
                repeatType: "mirror"
              }}
            />
          </svg>
        </motion.div>
        
        {/* Rectangle décoratif */}
        <motion.div 
          className="absolute top-1/3 left-1/3 opacity-10"
          animate={animate ? {
            rotate: [45, 30, 45, 60, 45],
            scale: [1, 1.1, 1, 0.9, 1]
          } : {}}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 10
          }}
        >
          <svg width="80" height="80" viewBox="0 0 80 80">
            <motion.rect 
              x="20" 
              y="20" 
              width="40" 
              height="40" 
              stroke={`var(--color-purple)`} 
              strokeWidth="1.5" 
              fill="none"
              animate={animate ? {
                width: [40, 50, 40, 30, 40],
                height: [40, 30, 40, 50, 40],
                x: [20, 15, 20, 25, 20],
                y: [20, 25, 20, 15, 20]
              } : {}}
              transition={{
                duration: 25,
                repeat: Infinity,
                repeatType: "mirror"
              }}
            />
          </svg>
        </motion.div>
        
        {/* Points décoratifs */}
        <div className="absolute inset-0">
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.div
              key={`dot-${i}`}
              className={`absolute w-1 h-1 rounded-full bg-${i % 2 === 0 ? color : 'purple'}/20`}
              style={{
                left: `${20 + (i * 15)}%`,
                top: `${80 - (i * 10)}%`
              }}
              animate={animate ? {
                opacity: [0.2, 0.5, 0.2],
                scale: [1, 1.5, 1]
              } : {}}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                repeatType: "mirror",
                delay: i * 0.5
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Points de connexion aux bords pour transition entre sections */}
      <div className="absolute inset-x-0 top-0 h-2 overflow-hidden">
        <div className="flex justify-around">
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={`top-point-${i}`}
              className={`w-1 h-1 rounded-full bg-${i % 3 === 0 ? color : i % 3 === 1 ? 'purple' : 'red'}/30`}
              animate={animate ? {
                y: [-5, 5, -5],
                opacity: [0.2, 0.4, 0.2]
              } : {}}
              transition={{
                duration: 3 + (i % 3),
                repeat: Infinity,
                repeatType: "mirror",
                delay: i * 0.2
              }}
            />
          ))}
        </div>
      </div>
      
      <div className="absolute inset-x-0 bottom-0 h-2 overflow-hidden">
        <div className="flex justify-around">
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={`bottom-point-${i}`}
              className={`w-1 h-1 rounded-full bg-${i % 3 === 0 ? color : i % 3 === 1 ? 'purple' : 'red'}/30`}
              animate={animate ? {
                y: [5, -5, 5],
                opacity: [0.2, 0.4, 0.2]
              } : {}}
              transition={{
                duration: 3 + (i % 3),
                repeat: Infinity,
                repeatType: "mirror",
                delay: i * 0.2
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}