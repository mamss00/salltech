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
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    
    if (showOnlyFirstVisit) {
      const hasLoadedBefore = sessionStorage.getItem('salltech_loaded')
      if (hasLoadedBefore) {
        setShouldShow(false)
        if (onComplete) onComplete()
        return
      }
      sessionStorage.setItem('salltech_loaded', 'true')
    }

    const timer = setTimeout(() => {
      setIsVisible(false)
      if (onComplete) {
        setTimeout(onComplete, 500)
      }
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onComplete, showOnlyFirstVisit])

  if (!isClient || !shouldShow) return null

  return (
    <>
      {/* Injection CSS critique en premier */}
      <style jsx global>{`
        .salltech-loader-styles * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        .salltech-loader-body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif !important;
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%) !important;
          min-height: 100vh !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          overflow: hidden !important;
          position: relative !important;
        }
        
        .salltech-background-pattern {
          position: absolute !important;
          top: 0 !important;
          left: 0 !important;
          width: 100% !important;
          height: 100% !important;
          background-image: 
            radial-gradient(circle at 25% 25%, rgba(52, 152, 219, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(155, 89, 182, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(231, 76, 60, 0.05) 0%, transparent 50%) !important;
          animation: patternFloat 15s ease-in-out infinite !important;
        }
        
        .salltech-loader-container {
          position: relative !important;
          padding: 4rem 5rem !important;
          border-radius: 1.875rem !important;
          overflow: hidden !important;
          z-index: 10 !important;
        }
        
        .salltech-loader-container::before {
          content: '' !important;
          position: absolute !important;
          inset: 0 !important;
          backdrop-filter: blur(16px) !important;
          background: rgba(255, 255, 255, 0.75) !important;
          border-radius: inherit !important;
          z-index: 1 !important;
        }
        
        .salltech-loader-container::after {
          content: '' !important;
          position: absolute !important;
          inset: 0 !important;
          background: linear-gradient(135deg, 
            rgba(255, 255, 255, 0.4) 0%, 
            rgba(255, 255, 255, 0.1) 50%, 
            rgba(255, 255, 255, 0.4) 100%) !important;
          opacity: 0.6 !important;
          border: 1px solid rgba(255, 255, 255, 0.3) !important;
          border-radius: inherit !important;
          z-index: 2 !important;
          box-shadow: 
            0 8px 32px rgba(0, 0, 0, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.5) !important;
        }
        
        .salltech-loader-content {
          position: relative !important;
          z-index: 3 !important;
          display: flex !important;
          flex-direction: column !important;
          align-items: center !important;
          gap: 3rem !important;
        }
        
        .salltech-logo-section {
          display: flex !important;
          flex-direction: column !important;
          align-items: center !important;
          gap: 1.25rem !important;
        }
        
        .salltech-logo-letter {
          font-size: 5.625rem !important;
          font-weight: 200 !important;
          position: relative !important;
          background: linear-gradient(45deg, #3498db, #9b59b6, #e74c3c) !important;
          background-size: 300% 300% !important;
          -webkit-background-clip: text !important;
          -webkit-text-fill-color: transparent !important;
          background-clip: text !important;
          animation: logoFloat 3s ease-in-out infinite, gradientShift 2s ease-in-out infinite !important;
          filter: drop-shadow(0 0 20px rgba(52, 152, 219, 0.1)) !important;
        }
        
        .salltech-logo-letter::after {
          content: '' !important;
          position: absolute !important;
          bottom: -0.375rem !important;
          left: 50% !important;
          transform: translateX(-50%) !important;
          width: 0% !important;
          height: 0.1875rem !important;
          background: linear-gradient(90deg, #3498db, #9b59b6, #e74c3c) !important;
          border-radius: 0.125rem !important;
          animation: lineExpand 3s ease-in-out infinite !important;
        }
        
        .salltech-company-name {
          font-size: 1.375rem !important;
          font-weight: 300 !important;
          letter-spacing: 0.2em !important;
          color: #64748b !important;
          text-transform: uppercase !important;
          opacity: 0 !important;
          animation: textFadeIn 3s ease-out infinite !important;
        }
        
        .salltech-progress-section {
          display: flex !important;
          flex-direction: column !important;
          align-items: center !important;
          gap: 1.25rem !important;
        }
        
        .salltech-progress-container {
          width: 18.75rem !important;
          height: 0.25rem !important;
          background: rgba(255, 255, 255, 0.3) !important;
          border-radius: 0.5rem !important;
          overflow: hidden !important;
          position: relative !important;
          backdrop-filter: blur(10px) !important;
          border: 1px solid rgba(255, 255, 255, 0.2) !important;
        }
        
        .salltech-progress-bar {
          width: 0% !important;
          height: 100% !important;
          background: linear-gradient(90deg, #3498db, #9b59b6, #e74c3c) !important;
          border-radius: 0.5rem !important;
          animation: progressLoad 3.5s ease-out infinite !important;
          position: relative !important;
          box-shadow: 0 0 15px rgba(52, 152, 219, 0.2) !important;
        }
        
        .salltech-progress-bar::after {
          content: '' !important;
          position: absolute !important;
          inset: 0 !important;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent) !important;
          animation: progressShine 2s ease-in-out infinite !important;
          border-radius: inherit !important;
        }
        
        .salltech-loading-text {
          font-size: 1rem !important;
          color: #94a3b8 !important;
          font-weight: 300 !important;
          letter-spacing: 0.1em !important;
          animation: loadingPulse 2s ease-in-out infinite !important;
        }
        
        .salltech-particle {
          position: absolute !important;
          width: 0.25rem !important;
          height: 0.25rem !important;
          background: rgba(255, 255, 255, 0.4) !important;
          border-radius: 50% !important;
          opacity: 0.4 !important;
        }
        
        .salltech-particle:nth-child(1) {
          top: 20% !important;
          left: 15% !important;
          animation: floatGentle 6s ease-in-out infinite !important;
        }
        
        .salltech-particle:nth-child(2) {
          top: 70% !important;
          right: 20% !important;
          animation: floatGentle 8s ease-in-out infinite 2s !important;
        }
        
        .salltech-particle:nth-child(3) {
          bottom: 30% !important;
          left: 30% !important;
          animation: floatGentle 7s ease-in-out infinite 4s !important;
        }
        
        .salltech-particle:nth-child(4) {
          top: 40% !important;
          right: 15% !important;
          animation: floatGentle 9s ease-in-out infinite 1s !important;
        }
        
        @keyframes patternFloat {
          0%, 100% { opacity: 1; transform: translateY(0px); }
          50% { opacity: 0.8; transform: translateY(-10px); }
        }
        
        @keyframes logoFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-0.5rem); }
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
          0%, 30% { opacity: 0; transform: translateY(0.625rem); }
          60%, 100% { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes progressLoad {
          0% { width: 0%; }
          75% { width: 85%; }
          100% { width: 100%; }
        }
        
        @keyframes progressShine {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(18.75rem); }
        }
        
        @keyframes loadingPulse {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }
        
        @keyframes floatGentle {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.3; }
          50% { transform: translate(1.25rem, -1.25rem) scale(1.1); opacity: 0.6; }
        }
        
        @media (max-width: 768px) {
          .salltech-logo-letter { 
            font-size: 4.375rem !important; 
          }
          .salltech-company-name { 
            font-size: 1.125rem !important; 
            letter-spacing: 0.15em !important; 
          }
          .salltech-progress-container { 
            width: 16.25rem !important; 
          }
          .salltech-loader-container { 
            padding: 2.5rem 3.125rem !important;
            margin: 1.25rem !important;
            border-radius: 1.25rem !important;
          }
        }
      `}</style>

      <div 
        className={`
          fixed inset-0 z-50 
          transition-opacity duration-500
          ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}
          ${className}
        `}
      >
        <div className="salltech-loader-styles">
          <div className="salltech-loader-body">
            {/* Fond avec motif subtil */}
            <div className="salltech-background-pattern"></div>
            
            {/* Particules minimalistes */}
            <div className="salltech-particle"></div>
            <div className="salltech-particle"></div>
            <div className="salltech-particle"></div>
            <div className="salltech-particle"></div>
            
            {/* Container principal avec effet glass */}
            <div className="salltech-loader-container">
              <div className="salltech-loader-content">
                {/* Section Logo */}
                <div className="salltech-logo-section">
                  <div className="salltech-logo-letter">S</div>
                  <div className="salltech-company-name">SALLTECH</div>
                </div>
                
                {/* Section Progress */}
                <div className="salltech-progress-section">
                  <div className="salltech-progress-container">
                    <div className="salltech-progress-bar"></div>
                  </div>
                  <div className="salltech-loading-text">Chargement...</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
