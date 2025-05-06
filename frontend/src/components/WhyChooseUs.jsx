import React from 'react';

// Composant simple sans animation externe
function WhyChooseUs() {
  return (
    <div className="absolute right-0 top-0 bottom-0 w-1/2 h-full overflow-hidden md:flex items-center justify-center hidden">
      {/* Overlay de couleur */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue/80 to-purple/80 mix-blend-multiply z-10"></div>
      
      {/* Contenu */}
      <div className="relative z-20 p-8 text-white w-full max-w-xl">
        {/* Badge */}
        <div className="inline-block px-4 py-1 rounded-full bg-white/20 backdrop-blur-sm text-sm font-medium mb-6">
          EXPERTISE INTERNATIONALE
        </div>
        
        {/* Titre */}
        <h2 className="text-3xl font-bold mb-4">
          Pourquoi nous choisir
        </h2>
        
        {/* Ligne décorative */}
        <div className="h-1 w-20 bg-white/40 mb-6"></div>
        
        {/* Points clés */}
        <ul className="space-y-4 mb-8">
          <li className="flex items-start">
            <span className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
              <span className="text-lg">🌍</span>
            </span>
            <span>
              <strong className="block text-lg">Expertise internationale</strong>
              <span className="text-white/90">Tous nos experts ont une expérience significative à l'international</span>
            </span>
          </li>
          
          <li className="flex items-start">
            <span className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
              <span className="text-lg">🏆</span>
            </span>
            <span>
              <strong className="block text-lg">Experts de calibre international</strong>
              <span className="text-white/90">Nos experts ont travaillé sur des projets prestigieux pour BMW, Air France, LVMH, SAP et HDI</span>
            </span>
          </li>
          
          <li className="flex items-start">
            <span className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
              <span className="text-lg">🏢</span>
            </span>
            <span>
              <strong className="block text-lg">Leaders locaux</strong>
              <span className="text-white/90">La plus grande agence immobilière du pays nous a fait confiance</span>
            </span>
          </li>
          
          <li className="flex items-start">
            <span className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
              <span className="text-lg">🚀</span>
            </span>
            <span>
              <strong className="block text-lg">50% de clients internationaux</strong>
              <span className="text-white/90">Notre expertise s'étend au-delà des frontières mauritaniennes</span>
            </span>
          </li>
        </ul>
        
        {/* Projets */}
        <div>
          <p className="text-sm text-white/70 mb-3">Projets sur lesquels nos experts ont travaillé :</p>
          <div className="flex flex-wrap gap-2">
            {['BMW', 'Air France', 'LVMH', 'SAP', 'HDI'].map((name, index) => (
              <div key={index} className="bg-white/10 p-2 rounded-lg hover:bg-white/20 transition-colors">
                <div className="text-white font-bold px-2 py-1">{name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default WhyChooseUs;