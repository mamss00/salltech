// src/components/TailwindDebug.jsx
'use client'

import React from 'react';

const TailwindDebug = () => {
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold text-center mb-6">Test de Tailwind CSS</h2>
      
      {/* Test des couleurs de base */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-blue p-4 rounded-lg text-white text-center">
          bg-blue (couleur personnalisée)
        </div>
        <div className="bg-purple p-4 rounded-lg text-white text-center">
          bg-purple (couleur personnalisée)
        </div>
        <div className="bg-red p-4 rounded-lg text-white text-center">
          bg-red (couleur personnalisée)
        </div>
      </div>
      
      {/* Test des classes Tailwind standards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-blue-500 p-4 rounded-lg text-white text-center">
          bg-blue-500 (couleur Tailwind)
        </div>
        <div className="bg-purple-500 p-4 rounded-lg text-white text-center">
          bg-purple-500 (couleur Tailwind)
        </div>
        <div className="bg-red-500 p-4 rounded-lg text-white text-center">
          bg-red-500 (couleur Tailwind)
        </div>
      </div>
      
      {/* Test des classes personnalisées */}
      <div className="mb-8">
        <h3 className="gradient-text text-2xl font-bold text-center mb-4">
          Texte avec gradient (classe personnalisée)
        </h3>
        <a href="#" className="header-link block text-center">
          Lien avec style header-link (classe personnalisée)
        </a>
      </div>
      
      {/* Test des animations */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-blue/10 p-4 rounded-lg text-center animate-float-1">
          Animation float-1
        </div>
        <div className="bg-purple/10 p-4 rounded-lg text-center animate-float-2">
          Animation float-2
        </div>
        <div className="bg-red/10 p-4 rounded-lg text-center animate-float-3">
          Animation float-3
        </div>
      </div>
      
      {/* Test des points d'animation */}
      <div className="text-center mb-8">
        <button className="bg-gradient-to-r from-blue via-purple to-red text-white px-6 py-3 rounded-xl font-medium">
          Bouton avec gradient
          <span className="dots-container">
            <span className="dot animate-dot-pulse-1"></span>
            <span className="dot animate-dot-pulse-2"></span>
            <span className="dot animate-dot-pulse-3"></span>
          </span>
        </button>
      </div>
    </div>
  );
};

export default TailwindDebug;