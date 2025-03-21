'use client'

import SallTechLogo from './SallTechLogo'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-white pt-20 pb-10 relative">
      {/* Ligne décorative en haut - pas trop épaisse mais visible */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue via-purple to-red"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Logo et description */}
          <div className="lg:col-span-4 mb-10 lg:mb-0">
            <div className="mb-6">
              <SallTechLogo />
            </div>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Solutions technologiques innovantes pour les entreprises mauritaniennes.
              Nous vous accompagnons dans votre transformation digitale avec
              expertise et passion.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-blue/10 flex items-center justify-center text-blue hover:bg-blue hover:text-white transition-all duration-300">
                <span className="sr-only">Facebook</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-purple/10 flex items-center justify-center text-purple hover:bg-purple hover:text-white transition-all duration-300">
                <span className="sr-only">Twitter</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-red/10 flex items-center justify-center text-red hover:bg-red hover:text-white transition-all duration-300">
                <span className="sr-only">Instagram</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-blue/10 flex items-center justify-center text-blue hover:bg-blue hover:text-white transition-all duration-300">
                <span className="sr-only">LinkedIn</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd"></path>
                </svg>
              </a>
            </div>
          </div>
          
          {/* Services et liens */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Liens rapides */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Navigation</h3>
                <div className="h-0.5 w-16 bg-gradient-to-r from-blue to-transparent mb-6"></div>
                <ul className="space-y-3">
                  <li>
                    <a href="#home" className="text-gray-600 hover:text-blue transition-colors duration-300 flex items-center group">
                      <svg className="w-4 h-4 mr-2 text-gray-400 group-hover:text-blue transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                      </svg>
                      Accueil
                    </a>
                  </li>
                  <li>
                    <a href="#services" className="text-gray-600 hover:text-blue transition-colors duration-300 flex items-center group">
                      <svg className="w-4 h-4 mr-2 text-gray-400 group-hover:text-blue transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                      </svg>
                      Services
                    </a>
                  </li>
                  <li>
                    <a href="#portfolio" className="text-gray-600 hover:text-blue transition-colors duration-300 flex items-center group">
                      <svg className="w-4 h-4 mr-2 text-gray-400 group-hover:text-blue transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                      </svg>
                      Portfolio
                    </a>
                  </li>
                  <li>
                    <a href="#contact" className="text-gray-600 hover:text-blue transition-colors duration-300 flex items-center group">
                      <svg className="w-4 h-4 mr-2 text-gray-400 group-hover:text-blue transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                      </svg>
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
              
              {/* Services */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Nos services</h3>
                <div className="h-0.5 w-16 bg-gradient-to-r from-purple to-transparent mb-6"></div>
                <ul className="space-y-3">
                  <li>
                    <a href="#services" className="text-gray-600 hover:text-purple transition-colors duration-300 flex items-center">
                      <span className="w-5 h-5 mr-2 flex-shrink-0">⚡</span>
                      Sites Internet
                    </a>
                  </li>
                  <li>
                    <a href="#services" className="text-gray-600 hover:text-purple transition-colors duration-300 flex items-center">
                      <span className="w-5 h-5 mr-2 flex-shrink-0">📱</span>
                      Applications Mobiles
                    </a>
                  </li>
                  <li>
                    <a href="#services" className="text-gray-600 hover:text-purple transition-colors duration-300 flex items-center">
                      <span className="w-5 h-5 mr-2 flex-shrink-0">🔍</span>
                      Solutions Odoo
                    </a>
                  </li>
                  <li>
                    <a href="#services" className="text-gray-600 hover:text-purple transition-colors duration-300 flex items-center">
                      <span className="w-5 h-5 mr-2 flex-shrink-0">🚀</span>
                      Consulting DevOps
                    </a>
                  </li>
                  <li>
                    <a href="#services" className="text-gray-600 hover:text-purple transition-colors duration-300 flex items-center">
                      <span className="w-5 h-5 mr-2 flex-shrink-0">🌐</span>
                      Hébergement Web
                    </a>
                  </li>
                  <li>
                    <a href="#services" className="text-gray-600 hover:text-purple transition-colors duration-300 flex items-center">
                      <span className="w-5 h-5 mr-2 flex-shrink-0">📈</span>
                      SEO & Référencement
                    </a>
                  </li>
                </ul>
              </div>
              
              {/* Contact */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Contact</h3>
                <div className="h-0.5 w-16 bg-gradient-to-r from-red to-transparent mb-6"></div>
                <ul className="space-y-4">
                  <li className="flex group">
                    <div className="w-8 h-8 rounded-lg bg-blue/10 flex items-center justify-center mr-3 flex-shrink-0 group-hover:bg-blue/20 transition-colors duration-300">
                      <svg className="w-4 h-4 text-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      </svg>
                    </div>
                    <span className="text-gray-600 group-hover:text-gray-900 transition-colors duration-300">
                      Immeuble Zein, 4ème étage<br />
                      Rue des Ambassades<br />
                      Nouakchott, Mauritanie
                    </span>
                  </li>
                  <li className="flex items-center group">
                    <div className="w-8 h-8 rounded-lg bg-purple/10 flex items-center justify-center mr-3 flex-shrink-0 group-hover:bg-purple/20 transition-colors duration-300">
                      <svg className="w-4 h-4 text-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                      </svg>
                    </div>
                    <a href="mailto:contact@salltech.mr" className="text-gray-600 group-hover:text-purple transition-colors duration-300">
                      contact@salltech.mr
                    </a>
                  </li>
                  <li className="flex items-center group">
                    <div className="w-8 h-8 rounded-lg bg-red/10 flex items-center justify-center mr-3 flex-shrink-0 group-hover:bg-red/20 transition-colors duration-300">
                      <svg className="w-4 h-4 text-red" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                      </svg>
                    </div>
                    <a href="tel:+22245251632" className="text-gray-600 group-hover:text-red transition-colors duration-300">
                      +222 45 25 16 32
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Newsletter */}
            <div className="mt-12 pt-8 border-t border-gray-100">
              <div className="bg-gradient-to-r from-blue/5 via-purple/5 to-red/5 rounded-lg p-6">
                <div className="md:flex items-center">
                  <div className="mb-6 md:mb-0 md:mr-12">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Newsletter</h3>
                    <p className="text-gray-600">Restez informés de nos dernières actualités</p>
                  </div>
                  <div className="flex-1">
                    <div className="flex">
                      <input 
                        type="email" 
                        placeholder="Votre email" 
                        className="border border-gray-200 rounded-l-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-blue/30 focus:border-transparent"
                      />
                      <button className="bg-gradient-to-r from-blue to-purple text-white px-6 py-3 rounded-r-lg font-medium hover:shadow-md transition-all duration-300">
                        S'abonner
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Copyright et liens légaux */}
        <div className="mt-16 pt-8 border-t border-gray-100 flex flex-col md:flex-row md:items-center justify-between">
          <p className="text-gray-500 mb-4 md:mb-0">
            &copy; {currentYear} SALLTECH. Tous droits réservés.
          </p>
          
          <div className="flex flex-wrap gap-8">
            <a href="#" className="text-gray-500 hover:text-blue transition-colors duration-300 relative group">
              Mentions légales
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="#" className="text-gray-500 hover:text-purple transition-colors duration-300 relative group">
              Politique de confidentialité
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="#" className="text-gray-500 hover:text-red transition-colors duration-300 relative group">
              CGV
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red group-hover:w-full transition-all duration-300"></span>
            </a>
          </div>
        </div>
      </div>
      
      {/* Bouton retour en haut */}
      <div className="fixed bottom-8 right-8 z-40">
        <a 
          href="#home" 
          className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
        >
          <svg className="w-5 h-5 text-blue group-hover:text-purple transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
          </svg>
        </a>
      </div>
    </footer>
  )
}

export default Footer