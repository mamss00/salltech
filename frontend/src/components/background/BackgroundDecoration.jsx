'use client'

import React from 'react'
import { motion } from 'framer-motion'

export default function BackgroundDecoration({
  primaryColor = 'blue',
  secondaryColor = 'purple',
  type = 'default'
}) {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Blobs et formes organiques */}
      <motion.div 
        className={`absolute -top-20 -right-20 w-96 h-96 bg-${primaryColor}/5 rounded-full blur-3xl`}
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ 
          duration: 12,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      <motion.div 
        className={`absolute -bottom-20 -left-20 w-96 h-96 bg-${secondaryColor}/5 rounded-full blur-3xl`}
        animate={{ 
          scale: [1, 1.15, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ 
          duration: 15,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 2
        }}
      />
      
      {/* Type spécifique - motifs géométriques */}
      {type === 'geometric' && (
        <>
          <motion.div
            className={`absolute top-20 left-20 w-24 h-24 border border-${primaryColor}/20 rounded-lg opacity-20`}
            animate={{
              rotate: [0, 45, 0],
              scale: [1, 1.1, 1],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          <motion.div
            className={`absolute bottom-40 right-20 w-16 h-16 border border-${secondaryColor}/20 rounded-full opacity-20`}
            animate={{
              rotate: [0, 360],
              scale: [1, 0.8, 1],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          <motion.div
            className={`absolute top-40 right-40 w-20 h-20 border border-${primaryColor}/20 rotate-45 opacity-20`}
            animate={{
              rotate: [45, 90, 45],
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 5
            }}
          />
        </>
      )}
      
      {/* Type spécifique - tech */}
      {type === 'tech' && (
        <>
          <div className="absolute inset-0 opacity-5">
            <svg width="100%" height="100%">
              <pattern id="circuitPattern" patternUnits="userSpaceOnUse" width="100" height="100">
                <path d="M 0 50 L 100 50 M 50 0 L 50 100" stroke={`var(--color-${primaryColor})`} strokeWidth="0.5" fill="none" />
                <circle cx="50" cy="50" r="2" fill="none" stroke={`var(--color-${primaryColor})`} strokeWidth="0.5" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#circuitPattern)" />
            </svg>
          </div>
          
          {Array.from({ length: 10 }).map((_, i) => (
            <motion.div
              key={`tech-point-${i}`}
              className={`absolute w-2 h-2 rounded-full bg-${i % 2 === 0 ? primaryColor : secondaryColor}/20`}
              style={{
                left: `${10 + (i * 8)}%`,
                top: `${20 + (i * 6)}%`
              }}
              animate={{
                opacity: [0.1, 0.5, 0.1],
                scale: [1, 1.5, 1]
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                repeatType: "mirror",
                delay: i * 0.5
              }}
            />
          ))}
        </>
      )}
      
      {/* Type spécifique - gradient */}
      {type === 'gradient' && (
        <motion.div 
          className="absolute inset-0"
          style={{ 
            background: `linear-gradient(135deg, var(--color-${primaryColor}-rgb, 0.03), var(--color-${secondaryColor}-rgb, 0.03))`,
            backgroundSize: "400% 400%",
          }}
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}
    </div>
  );
}