'use client'

import React from 'react'
import { motion } from 'framer-motion'

export default function ConnectingElements({ 
  position = 'both', 
  primaryColor = 'blue'
}) {
  return (
    <>
      {/* Connexion du haut */}
      {(position === 'top' || position === 'both') && (
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent overflow-hidden">
          {/* Points de circuit */}
          <div className="flex justify-around absolute inset-0">
            {Array.from({ length: 12 }).map((_, i) => (
              <motion.div
                key={`top-node-${i}`}
                className={`w-1 h-1 rounded-full bg-${primaryColor}/40`}
                animate={{
                  opacity: [0.2, 0.5, 0.2],
                  scale: [1, 1.5, 1]
                }}
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
      )}
      
      {/* Connexion du bas */}
      {(position === 'bottom' || position === 'both') && (
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent overflow-hidden">
          {/* Points de circuit */}
          <div className="flex justify-around absolute inset-0">
            {Array.from({ length: 12 }).map((_, i) => (
              <motion.div
                key={`bottom-node-${i}`}
                className={`w-1 h-1 rounded-full bg-${primaryColor}/40`}
                animate={{
                  opacity: [0.2, 0.5, 0.2],
                  scale: [1, 1.5, 1]
                }}
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
      )}
    </>
  );
}