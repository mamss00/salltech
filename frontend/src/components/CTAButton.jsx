'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const CTAButton = ({ 
  href, 
  children, 
  className = "", 
  showDots = true, 
  variant = "primary",
  headerStyle = false,
  loading = false,
  onClick,
  type
}) => {
  // Configurations des variantes
  const variants = {
    primary: "bg-gradient-to-r from-blue via-purple to-red bg-[length:200%_auto] animate-gradient-shift text-white",
    secondary: "bg-white text-blue border border-blue/20",
    subtle: "bg-blue/10 text-blue"
  }

  // Style de base commun à toutes les variantes
  const baseStyle = "rounded-xl font-medium transition-all duration-400 shadow-lg hover:shadow-xl"
  
  // Style de padding par défaut
  const sizeStyle = "px-8 py-3"
  
  // Animation hover
  const hoverAnimation = {
    scale: 1.05,
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
  }
  
  // Animation tap
  const tapAnimation = {
    scale: 0.95
  }

  // Si headerStyle est true, utiliser les classes spécifiques au header
  const additionalClasses = headerStyle ? "hidden md:inline-block" : "";

  // Si un onClick est fourni, on utilise un bouton, sinon un lien
  const Component = onClick || type ? motion.button : motion.a
  const componentProps = onClick 
    ? { onClick, type } 
    : type 
      ? { type }
      : { href }
  
  return (
    <Component
      {...componentProps}
      disabled={loading}
      whileHover={loading ? {} : hoverAnimation}
      whileTap={loading ? {} : tapAnimation}
      className={`${baseStyle} ${sizeStyle} ${variants[variant]} ${additionalClasses} ${className}`}
    >
      <span className="flex items-center justify-center">
        {loading ? (
          <span className="flex items-center">
            Envoi en cours
            <span className="ml-2 flex">
              <span className="w-2 h-2 bg-white rounded-full mx-0.5 animate-dot-pulse-1"></span>
              <span className="w-2 h-2 bg-white rounded-full mx-0.5 animate-dot-pulse-2"></span>
              <span className="w-2 h-2 bg-white rounded-full mx-0.5 animate-dot-pulse-3"></span>
            </span>
          </span>
        ) : (
          <>
            <span>{children}</span>
            {showDots && (
              <span className="dots-container">
                <span className="dot animate-dot-pulse-1"></span>
                <span className="dot animate-dot-pulse-2"></span>
                <span className="dot animate-dot-pulse-3"></span>
              </span>
            )}
          </>
        )}
      </span>
    </Component>
  )
}

// Assurez-vous d'ajouter cette ligne d'exportation par défaut
export default CTAButton