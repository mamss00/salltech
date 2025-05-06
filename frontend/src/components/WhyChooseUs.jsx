import React, { useEffect, useState } from 'react';

function WhyChooseUs() {
  // État pour contrôler l'animation séquentielle
  const [animationStage, setAnimationStage] = useState(0);
  
  // Déclencher les animations séquentiellement
  useEffect(() => {
    // Badge
    setTimeout(() => setAnimationStage(1), 300);
    // Titre
    setTimeout(() => setAnimationStage(2), 600);
    // Ligne
    setTimeout(() => setAnimationStage(3), 900);
    // Points
    setTimeout(() => setAnimationStage(4), 1200);
    // Projets
    setTimeout(() => setAnimationStage(5), 1800);
  }, []);

  // Données des projets
  const expertProjects = ['BMW', 'Air France', 'LVMH', 'SAP', 'HDI'];

  return (
    <div className="absolute right-0 top-0 bottom-0 w-1/2 h-full overflow-hidden md:flex items-center justify-center hidden">
      {/* Fond avec animation gradient */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-blue/80 to-purple/80 mix-blend-multiply z-10"
        style={{
          animation: 'gradientShift 15s ease infinite',
        }}
      ></div>
      
      {/* Éléments flottants décoratifs */}
      <div 
        className="absolute top-1/4 right-1/4 w-32 h-32 bg-blue/30 rounded-full blur-xl opacity-30"
        style={{ animation: 'float1 8s ease-in-out infinite' }}
      ></div>
      <div 
        className="absolute bottom-1/4 left-1/4 w-24 h-24 bg-purple/30 rounded-full blur-xl opacity-30"
        style={{ animation: 'float2 12s ease-in-out infinite' }}
      ></div>
      
      {/* Container du contenu */}
      <div className="relative z-20 p-8 text-white w-full max-w-xl">
        {/* Badge */}
        <div 
          className={`inline-block px-4 py-1 rounded-full bg-white/20 backdrop-blur-sm text-sm font-medium mb-6 transition-all duration-500 ${
            animationStage >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
          }`}
        >
          EXPERTISE INTERNATIONALE
        </div>
        
        {/* Titre avec animation */}
        <h2 
          className={`text-3xl font-bold mb-4 transition-all duration-500 ${
            animationStage >= 2 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
          }`}
        >
          Pourquoi nous choisir
        </h2>
        
        {/* Ligne décorative animée */}
        <div 
          className={`h-1 bg-white/40 mb-6 transition-all duration-700 ease-out ${
            animationStage >= 3 ? 'w-20 opacity-100' : 'w-0 opacity-0'
          }`}
        ></div>
        
        {/* Points clés avec animation */}
        <ul className="space-y-4 mb-8">
          {[
            {
              icon: '🌍',
              title: 'Expertise internationale',
              description: 'Tous nos experts ont une expérience significative à l\'international'
            },
            {
              icon: '🏆',
              title: 'Experts de calibre international',
              description: 'Nos experts ont travaillé sur des projets prestigieux pour BMW, Air France, LVMH, SAP et HDI'
            },
            {
              icon: '🏢',
              title: 'Leaders locaux',
              description: 'La plus grande agence immobilière du pays nous a fait confiance'
            },
            {
              icon: '🚀',
              title: '50% de clients internationaux',
              description: 'Notre expertise s\'étend au-delà des frontières mauritaniennes'
            }
          ].map((item, index) => (
            <li 
              key={index}
              className={`flex items-start transition-all duration-500 ${
                animationStage >= 4 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <span className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0 hover:bg-white/40 transition-colors duration-300">
                <span className="text-lg">{item.icon}</span>
              </span>
              <span>
                <strong className="block text-lg">{item.title}</strong>
                <span className="text-white/90">{item.description}</span>
              </span>
            </li>
          ))}
        </ul>
        
        {/* Projets */}
        <div className={`transition-all duration-500 ${
          animationStage >= 5 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <p className="text-sm text-white/70 mb-3">Projets sur lesquels nos experts ont travaillé :</p>
          <div className="flex flex-wrap gap-2">
            {expertProjects.map((name, index) => (
              <div 
                key={index} 
                className="bg-white/10 p-2 rounded-lg hover:bg-white/30 transition-all duration-300 hover:-translate-y-1"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="text-white font-bold px-2 py-1">{name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Style pour les animations */}
      <style jsx>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes float1 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-20px, 20px); }
        }
        
        @keyframes float2 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(20px, -20px); }
        }
        
        .bg-gradient-to-br {
          background-size: 200% 200%;
        }
      `}</style>
    </div>
  );
}

export default WhyChooseUs;