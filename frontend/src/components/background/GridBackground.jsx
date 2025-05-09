'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function GridBackground({ color = 'blue', opacity = 5 }) {
  // État pour activer le rendu côté client uniquement
  const [isClient, setIsClient] = useState(false);
  // États pour les nœuds et connexions
  const [connections, setConnections] = useState([]);
  const [nodes, setNodes] = useState([]);

  // Sécuriser l'hydratation en ne rendant les éléments aléatoires que côté client
  useEffect(() => {
    setIsClient(true);
    
    // Générer un ensemble de nœuds
    const nodeCount = Math.floor(window.innerWidth / 150);
    const newNodes = Array.from({ length: nodeCount }).map(() => ({
      x: Math.random() * 98 + 1,
      y: Math.random() * 98 + 1,
      size: Math.random() * 2 + 1
    }));
    setNodes(newNodes);

    // Générer des connexions entre certains nœuds
    const newConnections = [];
    newNodes.forEach((node, i) => {
      const connectionCount = Math.floor(Math.random() * 2) + 1;
      for (let j = 0; j < connectionCount; j++) {
        const targetIndex = Math.floor(Math.random() * nodeCount);
        if (targetIndex !== i) {
          newConnections.push({
            start: { x: node.x, y: node.y },
            end: { x: newNodes[targetIndex].x, y: newNodes[targetIndex].y },
            width: Math.random() * 0.5 + 0.1
          });
        }
      }
    });
    setConnections(newConnections);
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Fond tech subtil */}
      <div className={`absolute inset-0 bg-gradient-to-b from-gray-50 to-gray-100 opacity-${opacity}`}></div>
      
      {/* Grille de fond */}
      <svg className={`absolute inset-0 opacity-${opacity/2}`} width="100%" height="100%">
        <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke={`rgba(var(--color-${color}-rgb), 0.1)`} strokeWidth="0.3" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
      
      {/* Rendu conditionnel pour éviter les erreurs d'hydratation */}
      {isClient && (
        <>
          {/* Éléments de circuit */}
          <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
            {/* Lignes de connexion */}
            {connections.map((conn, i) => (
              <motion.line
                key={`conn-${i}`}
                x1={`${conn.start.x}%`}
                y1={`${conn.start.y}%`}
                x2={`${conn.end.x}%`}
                y2={`${conn.end.y}%`}
                stroke={`rgba(var(--color-${color}-rgb), 0.15)`}
                strokeWidth={conn.width}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: Math.random() * 2 + 1, delay: Math.random() * 2 }}
              />
            ))}
            
            {/* Nœuds */}
            {nodes.map((node, i) => (
              <motion.circle
                key={`node-${i}`}
                cx={`${node.x}%`}
                cy={`${node.y}%`}
                r={node.size}
                fill={`rgba(var(--color-${color}-rgb), 0.2)`}
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1, 0.8, 1] }}
                transition={{ duration: 0.5, delay: Math.random() * 2 }}
              />
            ))}
          </svg>
          
          {/* Points lumineux subtils */}
          <div className="absolute inset-0">
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={`point-${i}`}
                className={`absolute w-1 h-1 rounded-full bg-${color}/20`}
                style={{
                  left: `${10 + (i * 10)}%`,
                  top: `${15 + (i * 8)}%`,
                }}
                animate={{
                  opacity: [0.1, 0.3, 0.1],
                  scale: [1, 1.5, 1]
                }}
                transition={{
                  duration: 3 + i,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
            ))}
          </div>
          
          {/* Effet de code binaire */}
          <div className="absolute inset-0 overflow-hidden opacity-10">
            {Array.from({ length: 15 }).map((_, i) => (
              <motion.div
                key={`binary-${i}`}
                className="absolute text-xs font-mono"
                style={{
                  left: `${Math.random() * 90 + 5}%`,
                  top: 0,
                  color: `rgba(var(--color-${color}-rgb), 0.5)`
                }}
                initial={{ y: -100 }}
                animate={{ y: '100vh' }}
                transition={{
                  duration: Math.random() * 60 + 30,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                {Array.from({ length: Math.floor(Math.random() * 20) + 10 }).map((_, j) => (
                  <div key={j}>{Math.random() > 0.5 ? '1' : '0'}</div>
                ))}
              </motion.div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}