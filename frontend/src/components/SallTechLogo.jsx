'use client'

const SallTechLogo = () => {
  return (
    <div className="logo-vertical">
      <div className="letter">S</div>
      <div className="text">SALLTECH</div>
      
      <style jsx>{`
        .logo-vertical {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }
        
        .logo-vertical .letter {
          font-size: 64px;
          font-weight: 200;
          position: relative;
          background: linear-gradient(45deg, #3498db, #9b59b6, #e74c3c);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
        }
        
        .logo-vertical .letter::after {
          content: '';
          position: absolute;
          bottom: -6px;
          left: 50%;
          transform: translateX(-50%);
          width: 75%;
          height: 2px;
          background: linear-gradient(90deg, #3498db, #9b59b6, #e74c3c);
          border-radius: 1px;
        }
        
        .logo-vertical .text {
          font-size: 18px;
          font-weight: 400;
          letter-spacing: 0.15em;
          color: #666;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
        }
        
        /* Responsive pour mobile */
        @media (max-width: 768px) {
          .logo-vertical .letter {
            font-size: 48px;
          }
          .logo-vertical .text {
            font-size: 14px;
          }
        }
      `}</style>
    </div>
  )
}

export default SallTechLogo
