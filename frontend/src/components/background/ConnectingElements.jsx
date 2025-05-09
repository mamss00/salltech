'use client'

import React from 'react'
import { motion } from 'framer-motion'

export default function ConnectingElements({ 
  position = 'both', 
  type = 'wave',
  primaryColor = 'blue',
  secondaryColor = 'purple'
}) {
  return (
    <>
      {/* Connexion du haut */}
      {(position === 'top' || position === 'both') && (
        <div className="absolute top-0 left-0 right-0 overflow-hidden" style={{ height: '40px' }}>
          {type === 'wave' && (
            <svg className="absolute bottom-0 w-full" viewBox="0 0 1200 40" preserveAspectRatio="none">
              <motion.path 
                d="M0,0 C300,40 600,0 1200,30 L1200,40 L0,40 Z" 
                fill={`var(--color-${primaryColor})`} 
                fillOpacity="0.05"
                animate={{
                  d: [
                    "M0,0 C300,40 600,0 1200,30 L1200,40 L0,40 Z",
                    "M0,0 C500,20 700,40 1200,10 L1200,40 L0,40 Z",
                    "M0,0 C300,40 600,0 1200,30 L1200,40 L0,40 Z"
                  ]
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  repeatType: "mirror"
                }}
              />
            </svg>
          )}
          
          {type === 'line' && (
            <div className={`absolute bottom-0 w-full h-px bg-gradient-to-r from-${primaryColor}/20 via-${secondaryColor}/15 to-${primaryColor}/10`}></div>
          )}
          
          {type === 'dots' && (
            <div className="absolute bottom-0 w-full flex justify-around">
              {Array.from({ length: 20 }).map((_, i) => (
                <motion.div
                  key={`top-dot-${i}`}
                  className={`w-1 h-1 rounded-full bg-${i % 2 === 0 ? primaryColor : secondaryColor}/20`}
                  animate={{
                    y: [-3, 3, -3],
                    opacity: [0.3, 0.7, 0.3]
                  }}
                  transition={{
                    duration: 3 + (i % 3),
                    repeat: Infinity,
                    repeatType: "mirror",
                    delay: i * 0.1
                  }}
                />
              ))}
            </div>
          )}
          
          {type === 'triangles' && (
            <div className="absolute bottom-0 w-full flex justify-around">
              {Array.from({ length: 12 }).map((_, i) => (
                <motion.div
                  key={`top-triangle-${i}`}
                  className="relative"
                  animate={{
                    y: [-2, 4, -2],
                    rotate: [-5, 5, -5],
                    opacity: [0.2, 0.4, 0.2]
                  }}
                  transition={{
                    duration: 5 + (i % 3),
                    repeat: Infinity,
                    repeatType: "mirror",
                    delay: i * 0.2
                  }}
                >
                  <svg width="20" height="10" viewBox="0 0 20 10">
                    <path 
                      d="M10,0 L20,10 L0,10 Z" 
                      fill={`var(--color-${i % 2 === 0 ? primaryColor : secondaryColor})`}
                      fillOpacity="0.1"
                    />
                  </svg>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      )}
      
      {/* Connexion du bas */}
      {(position === 'bottom' || position === 'both') && (
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden" style={{ height: '40px' }}>
          {type === 'wave' && (
            <svg className="absolute top-0 w-full rotate-180" viewBox="0 0 1200 40" preserveAspectRatio="none">
              <motion.path 
                d="M0,0 C300,40 600,0 1200,30 L1200,40 L0,40 Z" 
                fill={`var(--color-${secondaryColor})`} 
                fillOpacity="0.05"
                animate={{
                  d: [
                    "M0,0 C300,40 600,0 1200,30 L1200,40 L0,40 Z",
                    "M0,0 C500,20 700,40 1200,10 L1200,40 L0,40 Z",
                    "M0,0 C300,40 600,0 1200,30 L1200,40 L0,40 Z"
                  ]
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  repeatType: "mirror",
                  delay: 5
                }}
              />
            </svg>
          )}
          
          {type === 'line' && (
            <div className={`absolute top-0 w-full h-px bg-gradient-to-r from-${secondaryColor}/10 via-${primaryColor}/15 to-${secondaryColor}/20`}></div>
          )}
          
          {type === 'dots' && (
            <div className="absolute top-0 w-full flex justify-around">
              {Array.from({ length: 20 }).map((_, i) => (
                <motion.div
                  key={`bottom-dot-${i}`}
                  className={`w-1 h-1 rounded-full bg-${i % 2 === 0 ? secondaryColor : primaryColor}/20`}
                  animate={{
                    y: [3, -3, 3],
                    opacity: [0.3, 0.7, 0.3]
                  }}
                  transition={{
                    duration: 3 + (i % 3),
                    repeat: Infinity,
                    repeatType: "mirror",
                    delay: i * 0.1
                  }}
                />
              ))}
            </div>
          )}
          
          {type === 'triangles' && (
            <div className="absolute top-0 w-full flex justify-around">
              {Array.from({ length: 12 }).map((_, i) => (
                <motion.div
                  key={`bottom-triangle-${i}`}
                  className="relative rotate-180"
                  animate={{
                    y: [2, -4, 2],
                    rotate: [175, 185, 175],
                    opacity: [0.2, 0.4, 0.2]
                  }}
                  transition={{
                    duration: 5 + (i % 3),
                    repeat: Infinity,
                    repeatType: "mirror",
                    delay: i * 0.2
                  }}
                >
                  <svg width="20" height="10" viewBox="0 0 20 10">
                    <path 
                      d="M10,0 L20,10 L0,10 Z" 
                      fill={`var(--color-${i % 2 === 0 ? secondaryColor : primaryColor})`}
                      fillOpacity="0.1"
                    />
                  </svg>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}