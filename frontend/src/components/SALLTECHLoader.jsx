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
    <div 
      className={`fixed inset-0 z-50 transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'} ${className}`}
      style={{
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <style jsx>{`
        .loader-background {
          position: absolute;
          inset: 0;
          background-image: 
            radial-gradient(circle at 25% 25%, rgba(52, 152, 219, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(155, 89, 182, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(231, 76, 60, 0.05) 0%, transparent 50%);
          animation: patternFloat 15s ease-in-out infinite;
        }
        
        .loader-container {
          position: relative;
          padding: 4rem 5rem;
          border-radius: 1.875rem;
          overflow: hidden;
          z-index: 10;
        }
        
        .loader-container::before {
          content: '';
          position: absolute;
          inset: 0;
          backdrop-filter: blur(16px);
          background: rgba(255, 255, 255, 0.75);
          border-radius: inherit;
          z-index: 1;
        }
        
        .loader-container::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, 
            rgba(255, 255, 255, 0.4) 0%, 
            rgba(255, 255, 255, 0.1) 50%, 
            rgba(255, 255, 255, 0.4) 100%);
          opacity: 0.6;
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: inherit;
          z-index: 2;
          box-shadow: 
            0 8px 32px rgba(0, 0, 0, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.5);
        }
        
        .loader-content {
          position: relative;
          z-index: 3;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 3rem;
        }
        
        .logo-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.25rem;
        }
        
        .logo-letter {
          font-size: 5.625rem;
          font-weight: 200;
          position: relative;
          background: linear-gradient(45deg, #3498db, #9b59b6, #e74c3c);
          background-size: 300% 300%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: logoFloat 3s ease-in-out infinite, gradientShift 2s ease-in-out infinite;
          filter: drop-shadow(0 0 20px rgba(52, 152, 219, 0.1));
        }
        
        .logo-letter::after {
          content: '';
          position: absolute;
          bottom: -0.25rem;
          left: 50%;
          transform: translateX(-50%);
          width: 0%;
          height: 0.1875rem;
          background: linear-gradient(90deg, #3498db, #9b59b6, #e74c3c);
          border-radius: 0.125rem;
          animation: lineExpand 2s ease-out forwards;
        }
        
        .company-name {
          font-size: 1.375rem;
          font-weight: 300;
          letter-spacing: 0.2em;
          color: #64748b;
          text-transform: uppercase;
          opacity: 0;
          animation: textFadeIn 2.5s ease-out forwards;
        }
        
        .progress-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.25rem;
        }
        
        .progress-container {
          width: 18.75rem;
          height: 0.25rem;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 0.5rem;
          overflow: hidden;
          position: relative;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .progress-bar {
          width: 0%;
          height: 100%;
          background: linear-gradient(90deg, #3498db, #9b59b6, #e74c3c);
          border-radius: 0.5rem;
          animation: progressLoad 3.5s ease-out infinite;
          position: relative;
          box-shadow: 0 0 15px rgba(52, 152, 219, 0.2);
        }
        
        .progress-bar::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent);
          animation: progressShine 2s ease-in-out infinite;
          border-radius: inherit;
        }
        
        .loading-text {
          font-size: 1rem;
          color: #94a3b8;
          font-weight: 300;
          letter-spacing: 0.1em;
          animation: loadingPulse 2s ease-in-out infinite;
        }
        
        .particle {
          position: absolute;
          width: 0.25rem;
          height: 0.25rem;
          background: rgba(255, 255, 255, 0.4);
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
          0% { width: 0%; }
          100% { width: 70%; }
        }
        
        @keyframes textFadeIn {
          0% { opacity: 0; transform: translateY(0.625rem); }
          100% { opacity: 1; transform: translateY(0); }
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
          .logo-letter { 
            font-size: 4.375rem; 
          }
          .company-name { 
            font-size: 1.125rem; 
            letter-spacing: 0.15em; 
          }
          .progress-container { 
            width: 16.25rem; 
          }
          .loader-container { 
            padding: 2.5rem 3.125rem;
            margin: 1.25rem;
            border-radius: 1.25rem;
          }
        }
      `}</style>
      
      {/* Fond avec motif subtil */}
      <div className="loader-background"></div>
      
      {/* Particules minimalistes */}
      <div className="particle"></div>
      <div className="particle"></div>
      <div className="particle"></div>
      <div className="particle"></div>
      
      {/* Container principal avec effet glass */}
      <div className="loader-container">
        <div className="loader-content">
          {/* Section Logo */}
          <div className="logo-section">
            <div className="logo-letter">S</div>
            <div className="company-name">SALLTECH</div>
          </div>
          
          {/* Section Progress */}
          <div className="progress-section">
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
