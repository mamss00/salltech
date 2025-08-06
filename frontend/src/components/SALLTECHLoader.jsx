'use client'

import { useEffect, useState } from 'react'

export default function SALLTECHLoader({ 
  onComplete, 
  duration = 3500,
  showOnlyFirstVisit = true,
  className = "" 
}) {
  const [isVisible, setIsVisible] = useState(true)
  const [shouldShow, setShouldShow] = useState(true)

  useEffect(() => {
    // Vérifier si on doit afficher le loader selon les paramètres
    if (showOnlyFirstVisit) {
      const hasLoadedBefore = sessionStorage.getItem('salltech_loaded')
      if (hasLoadedBefore) {
        setShouldShow(false)
        if (onComplete) onComplete()
        return
      }
      sessionStorage.setItem('salltech_loaded', 'true')
    }

    // Timer pour masquer le loader
    const timer = setTimeout(() => {
      setIsVisible(false)
      if (onComplete) {
        setTimeout(onComplete, 500) // Attendre la fin de l'animation de fade out
      }
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onComplete, showOnlyFirstVisit])

  // Ne pas afficher si shouldShow est false
  if (!shouldShow) return null

  return (
    <div 
      className={`fixed inset-0 z-50 transition-opacity duration-500 ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      } ${className}`}
      style={{
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'
      }}
    >
      {/* Styles CSS intégrés */}
      <style jsx>{`
        .loader-body {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%);
          overflow: hidden;
          position: relative;
        }
        
        .loader-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 50px;
          z-index: 10;
          position: relative;
          padding: 60px 80px;
        }
        
        .glass-effect {
          position: absolute;
          inset: 0;
          border-radius: 30px;
          overflow: hidden;
        }
        
        .glass-blur {
          position: absolute;
          inset: 0;
          backdrop-filter: blur(16px);
          background: rgba(255, 255, 255, 0.75);
        }
        
        .glass-gradient {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, 
            rgba(255, 255, 255, 0.4) 0%, 
            rgba(255, 255, 255, 0.1) 50%, 
            rgba(255, 255, 255, 0.4) 100%);
          opacity: 0.6;
        }
        
        .glass-border {
          position: absolute;
          inset: 0;
          border-radius: 30px;
          border: 1px solid rgba(255, 255, 255, 0.3);
          background: linear-gradient(135deg, 
            rgba(255, 255, 255, 0.2) 0%, 
            rgba(255, 255, 255, 0.05) 50%, 
            rgba(255, 255, 255, 0.2) 100%);
        }
        
        .logo-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
          position: relative;
        }
        
        .logo-letter {
          font-size: 90px;
          font-weight: 200;
          position: relative;
          background: linear-gradient(45deg, #3498db, #9b59b6, #e74c3c);
          background-size: 300% 300%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: logoFloat 3s ease-in-out infinite, gradientShift 2s ease-in-out infinite;
          font-family: 'Inter', sans-serif;
        }
        
        .logo-letter::after {
          content: '';
          position: absolute;
          bottom: -6px;
          left: 50%;
          transform: translateX(-50%);
          width: 0%;
          height: 3px;
          background: linear-gradient(90deg, #3498db, #9b59b6, #e74c3c);
          border-radius: 2px;
          animation: lineExpand 3s ease-in-out infinite;
        }
        
        .company-name {
          font-size: 22px;
          font-weight: 300;
          letter-spacing: 0.2em;
          color: #64748b;
          opacity: 0;
          animation: textFadeIn 3s ease-out infinite;
          text-transform: uppercase;
        }
        
        .progress-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
        }
        
        .progress-container {
          width: 300px;
          height: 4px;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 8px;
          overflow: hidden;
          position: relative;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .progress-bar {
          width: 0%;
          height: 100%;
          background: linear-gradient(90deg, #3498db, #9b59b6, #e74c3c);
          border-radius: 8px;
          animation: progressLoad 3.5s ease-out infinite;
          position: relative;
          box-shadow: 0 0 15px rgba(52, 152, 219, 0.2);
        }
        
        .progress-bar::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent);
          animation: progressShine 2s ease-in-out infinite;
          border-radius: 8px;
        }
        
        .loading-text {
          font-size: 16px;
          color: #94a3b8;
          font-weight: 300;
          letter-spacing: 0.1em;
          animation: loadingPulse 2s ease-in-out infinite;
        }
        
        .minimal-particles {
          position: absolute;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }
        
        .particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          opacity: 0.4;
        }
        
        .particle:nth-child(1) {
          top: 20%;
          left: 15%;
          animation: floatGentle 6s ease-in-out infinite;
        }
        
        .particle:nth-child(2) {
          top: 70%;
          right: 20%;
          animation: floatGentle 8s ease-in-out infinite 2s;
        }
        
        .particle:nth-child(3) {
          bottom: 30%;
          left: 30%;
          animation: floatGentle 7s ease-in-out infinite 4s;
        }
        
        .particle:nth-child(4) {
          top: 40%;
          right: 15%;
          animation: floatGentle 9s ease-in-out infinite 1s;
        }
        
        @keyframes logoFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes lineExpand {
          0%, 25% { width: 0%; }
          60%, 100% { width: 80%; }
        }
        
        @keyframes textFadeIn {
          0%, 30% { opacity: 0; transform: translateY(10px); }
          60%, 100% { opacity: 1; transform: translateY(0px); }
        }
        
        @keyframes progressLoad {
          0% { width: 0%; }
          75% { width: 85%; }
          100% { width: 100%; }
        }
        
        @keyframes progressShine {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(300px); }
        }
        
        @keyframes loadingPulse {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }
        
        @keyframes floatGentle {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.3; }
          50% { transform: translate(20px, -20px) scale(1.1); opacity: 0.6; }
        }
        
        @media (max-width: 768px) {
          .logo-letter { font-size: 70px; }
          .company-name { font-size: 18px; letter-spacing: 0.15em; }
          .progress-container { width: 260px; }
          .loader-container { 
            padding: 40px 50px;
            margin: 20px;
          }
          .glass-effect {
            border-radius: 20px;
          }
          .glass-border {
            border-radius: 20px;
          }
        }
      `}</style>
      
      <div className="loader-body">
        {/* Particules minimalistes */}
        <div className="minimal-particles">
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
        </div>
        
        {/* Container principal du loader */}
        <div className="loader-container">
          {/* Effet glass comme le header */}
          <div className="glass-effect">
            <div className="glass-blur"></div>
            <div className="glass-gradient"></div>
            <div className="glass-border"></div>
          </div>
          
          {/* Section du logo - identité préservée */}
          <div className="logo-section" style={{ position: 'relative', zIndex: 10 }}>
            <div className="logo-letter">S</div>
            <div className="company-name">SALLTECH</div>
          </div>
          
          {/* Section de progression */}
          <div className="progress-section" style={{ position: 'relative', zIndex: 10 }}>
            <div className="progress-container">
              <div className="progress-bar"></div>
            </div>
            <div className="loading-text">Chargement...</div>
          </div>
        </div>
      </div>
    </div>
  )
}
