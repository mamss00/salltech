'use client'

import { motion } from 'framer-motion'
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
            
            {/* Réseaux sociaux */}
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-blue/10 flex items-center justify-center text-blue hover:bg-blue hover:text-white transition-all duration-300">
                <span className="sr-only">Facebook</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-blue/10 flex items-center justify-center text-blue hover:bg-blue hover:text-white transition-all duration-300">
                <span className="sr-only">Instagram</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.017 0C8.396 0 7.929.013 6.71.06 5.487.107 4.65.277 3.927.525 3.166.792 2.525 1.162 1.884 1.803.887 2.8.52 3.85.273 4.926.025 6.065.013 6.532.013 12.017c0 5.485.012 5.952.06 7.091.047 1.076.277 1.916.525 2.639.267.76.637 1.401 1.278 2.042.641.641 1.282 1.011 2.042 1.278.723.248 1.563.478 2.639.525 1.139.047 1.606.06 7.091.06 5.485 0 5.952-.013 7.091-.06 1.076-.047 1.916-.277 2.639-.525.76-.267 1.401-.637 2.042-1.278.641-.641 1.011-1.282 1.278-2.042.248-.723.478-1.563.525-2.639.047-1.139.06-1.606.06-7.091 0-5.485-.013-5.952-.06-7.091-.047-1.076-.277-1.916-.525-2.639C21.533 1.928 21.163 1.287 20.522.646c-.997-.997-2.047-1.364-3.123-1.612C16.265.025 15.798.013 12.017.013h.002zm-.025 1.802h.023c2.309 0 2.584.012 3.637.06.876.04 1.351.187 1.667.31.419.163.717.358 1.03.671.314.314.508.611.671 1.03.123.316.27.791.31 1.667.048 1.053.06 1.328.06 3.637 0 2.309-.012 2.584-.06 3.637-.04.876-.187 1.351-.31 1.667-.163.419-.358.717-.671 1.03a2.764 2.764 0 01-1.03.671c-.316.123-.791.27-1.667.31-1.053.048-1.328.06-3.637.06s-2.584-.012-3.637-.06c-.876-.04-1.351-.187-1.667-.31a2.764 2.764 0 01-1.03-.671 2.764 2.764 0 01-.671-1.03c-.123-.316-.27-.791-.31-1.667-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path>
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
                    <motion.a 
                      href="#home" 
                      className="text-gray-600 hover:text-blue transition-colors duration-300 flex items-center group"
                      whileHover={{ 
                        x: 5, 
                        transition: { 
                          type: "spring", 
                          stiffness: 200, 
                          damping: 20, 
                          duration: 0.6 
                        } 
                      }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ 
                        x: { delay: 0.2, duration: 0.4 }
                      }}
                    >
                      <motion.svg 
                        className="w-4 h-4 mr-2 text-gray-400 group-hover:text-blue transition-colors duration-300" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                        whileHover={{ 
                          rotate: [0, -8, 8, 0], 
                          transition: { 
                            duration: 0.8, 
                            ease: "easeInOut",
                            delay: 0.1
                          } 
                        }}
                        transition={{
                          rotate: { delay: 0.3, duration: 0.5 }
                        }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                      </motion.svg>
                      <span className="relative">
                        Accueil
                        <motion.span 
                          className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue"
                          whileHover={{ 
                            width: "100%", 
                            transition: { 
                              duration: 0.5, 
                              ease: "easeInOut" 
                            } 
                          }}
                          transition={{
                            width: { delay: 0.2, duration: 0.4 }
                          }}
                        />
                      </span>
                    </motion.a>
                  </li>
                  <li>
                    <motion.a 
                      href="#services" 
                      className="text-gray-600 hover:text-blue transition-colors duration-300 flex items-center group"
                      whileHover={{ 
                        x: 5, 
                        transition: { 
                          type: "spring", 
                          stiffness: 200, 
                          damping: 20, 
                          duration: 0.6 
                        } 
                      }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ 
                        x: { delay: 0.2, duration: 0.4 }
                      }}
                    >
                      <motion.svg 
                        className="w-4 h-4 mr-2 text-gray-400 group-hover:text-blue transition-colors duration-300" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                        whileHover={{ 
                          scale: 1.15, 
                          rotate: 12, 
                          transition: { 
                            type: "spring", 
                            stiffness: 200, 
                            damping: 15, 
                            duration: 0.6 
                          } 
                        }}
                        transition={{
                          scale: { delay: 0.3, duration: 0.4 },
                          rotate: { delay: 0.3, duration: 0.4 }
                        }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                      </motion.svg>
                      <span className="relative">
                        Services
                        <motion.span 
                          className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue"
                          whileHover={{ 
                            width: "100%", 
                            transition: { 
                              duration: 0.5, 
                              ease: "easeInOut" 
                            } 
                          }}
                          transition={{
                            width: { delay: 0.2, duration: 0.4 }
                          }}
                        />
                      </span>
                    </motion.a>
                  </li>
                  <li>
                    <motion.a 
                      href="#portfolio" 
                      className="text-gray-600 hover:text-blue transition-colors duration-300 flex items-center group"
                      whileHover={{ 
                        x: 5, 
                        transition: { 
                          type: "spring", 
                          stiffness: 200, 
                          damping: 20, 
                          duration: 0.6 
                        } 
                      }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ 
                        x: { delay: 0.2, duration: 0.4 }
                      }}
                    >
                      <motion.svg 
                        className="w-4 h-4 mr-2 text-gray-400 group-hover:text-blue transition-colors duration-300" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                        whileHover={{ 
                          y: -1.5, 
                          transition: { 
                            type: "spring", 
                            stiffness: 200, 
                            damping: 15, 
                            duration: 0.5 
                          } 
                        }}
                        transition={{
                          y: { delay: 0.3, duration: 0.4 }
                        }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                      </motion.svg>
                      <span className="relative">
                        Portfolio
                        <motion.span 
                          className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue"
                          whileHover={{ 
                            width: "100%", 
                            transition: { 
                              duration: 0.5, 
                              ease: "easeInOut" 
                            } 
                          }}
                          transition={{
                            width: { delay: 0.2, duration: 0.4 }
                          }}
                        />
                      </span>
                    </motion.a>
                  </li>
                  <li>
                    <motion.a 
                      href="#contact" 
                      className="text-gray-600 hover:text-blue transition-colors duration-300 flex items-center group"
                      whileHover={{ 
                        x: 5, 
                        transition: { 
                          type: "spring", 
                          stiffness: 200, 
                          damping: 20, 
                          duration: 0.6 
                        } 
                      }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ 
                        x: { delay: 0.2, duration: 0.4 }
                      }}
                    >
                      <motion.svg 
                        className="w-4 h-4 mr-2 text-gray-400 group-hover:text-blue transition-colors duration-300" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                        whileHover={{ scale: [1, 1.15, 1], transition: { duration: 0.6, ease: "easeInOut" } }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                      </motion.svg>
                      <span className="relative">
                        Contact
                        <motion.span 
                          className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue"
                          whileHover={{ 
                            width: "100%", 
                            transition: { 
                              duration: 0.5, 
                              ease: "easeInOut" 
                            } 
                          }}
                          transition={{
                            width: { delay: 0.2, duration: 0.4 }
                          }}
                        />
                      </span>
                    </motion.a>
                  </li>
                </ul>
              </div>
              
              {/* Services */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Nos services</h3>
                <div className="h-0.5 w-16 bg-gradient-to-r from-purple to-transparent mb-6"></div>
                <ul className="space-y-3">
                  <li>
                    <motion.a 
                      href="#services" 
                      className="text-gray-600 hover:text-purple transition-colors duration-300 flex items-center group"
                      whileHover={{ x: 5, transition: { type: "spring", stiffness: 200, damping: 20, duration: 0.6 } }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <motion.span 
                        className="w-5 h-5 mr-2 flex-shrink-0"
                        whileHover={{ 
                          rotate: 180, 
                          scale: 1.1, 
                          transition: { 
                            duration: 0.8, 
                            ease: "easeInOut" 
                          } 
                        }}
                        transition={{
                          rotate: { delay: 0.3, duration: 0.5 },
                          scale: { delay: 0.3, duration: 0.5 }
                        }}
                      >
                        ⚡
                      </motion.span>
                      <span className="relative">
                        Sites Internet
                        <motion.span 
                          className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple"
                          whileHover={{ width: "100%", transition: { duration: 0.5, ease: "easeInOut" } }}
                        />
                      </span>
                    </motion.a>
                  </li>
                  <li>
                    <motion.a 
                      href="#services" 
                      className="text-gray-600 hover:text-purple transition-colors duration-300 flex items-center group"
                      whileHover={{ x: 5, transition: { type: "spring", stiffness: 200, damping: 20, duration: 0.6 } }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <motion.span 
                        className="w-5 h-5 mr-2 flex-shrink-0"
                        whileHover={{ 
                          y: [-1, -4, -1], 
                          transition: { 
                            duration: 0.8, 
                            ease: "easeInOut" 
                          } 
                        }}
                        transition={{
                          y: { delay: 0.3, duration: 0.5 }
                        }}
                      >
                        📱
                      </motion.span>
                      <span className="relative">
                        Applications Mobiles
                        <motion.span 
                          className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple"
                          whileHover={{ width: "100%", transition: { duration: 0.5, ease: "easeInOut" } }}
                        />
                      </span>
                    </motion.a>
                  </li>
                  <li>
                    <motion.a 
                      href="#services" 
                      className="text-gray-600 hover:text-purple transition-colors duration-300 flex items-center group"
                      whileHover={{ x: 5, transition: { type: "spring", stiffness: 200, damping: 20, duration: 0.6 } }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <motion.span 
                        className="w-5 h-5 mr-2 flex-shrink-0"
                        whileHover={{ scale: [1, 1.3, 1], transition: { duration: 0.4 } }}
                      >
                        🔍
                      </motion.span>
                      <span className="relative">
                        Solutions Odoo
                        <motion.span 
                          className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple"
                          whileHover={{ width: "100%", transition: { duration: 0.5, ease: "easeInOut" } }}
                        />
                      </span>
                    </motion.a>
                  </li>
                  <li>
                    <motion.a 
                      href="#services" 
                      className="text-gray-600 hover:text-purple transition-colors duration-300 flex items-center group"
                      whileHover={{ x: 5, transition: { type: "spring", stiffness: 200, damping: 20, duration: 0.6 } }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <motion.span 
                        className="w-5 h-5 mr-2 flex-shrink-0"
                        whileHover={{ rotate: [0, 10, -10, 0], transition: { duration: 0.8, ease: "easeInOut" } }}
                      >
                        🚀
                      </motion.span>
                      <span className="relative">
                        Consulting DevOps
                        <motion.span 
                          className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple"
                          whileHover={{ width: "100%", transition: { duration: 0.5, ease: "easeInOut" } }}
                        />
                      </span>
                    </motion.a>
                  </li>
                  <li>
                    <motion.a 
                      href="#services" 
                      className="text-gray-600 hover:text-purple transition-colors duration-300 flex items-center group"
                      whileHover={{ x: 5, transition: { type: "spring", stiffness: 200, damping: 20, duration: 0.6 } }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <motion.span 
                        className="w-5 h-5 mr-2 flex-shrink-0"
                        whileHover={{ rotate: 180, transition: { duration: 0.8, ease: "easeInOut" } }}
                      >
                        🌐
                      </motion.span>
                      <span className="relative">
                        Hébergement Web
                        <motion.span 
                          className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple"
                          whileHover={{ width: "100%", transition: { duration: 0.5, ease: "easeInOut" } }}
                        />
                      </span>
                    </motion.a>
                  </li>
                  <li>
                    <motion.a 
                      href="#services" 
                      className="text-gray-600 hover:text-purple transition-colors duration-300 flex items-center group"
                      whileHover={{ x: 8, transition: { type: "spring", stiffness: 400, damping: 10 } }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <motion.span 
                        className="w-5 h-5 mr-2 flex-shrink-0"
                        whileHover={{ y: [-0.5, -2, -0.5], scale: [1, 1.05, 1], transition: { duration: 0.7, ease: "easeInOut" } }}
                      >
                        📈
                      </motion.span>
                      <span className="relative">
                        SEO & Référencement
                        <motion.span 
                          className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple"
                          whileHover={{ width: "100%", transition: { duration: 0.5, ease: "easeInOut" } }}
                        />
                      </span>
                    </motion.a>
                  </li>
                </ul>
              </div>
              
              {/* Contact */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Contact</h3>
                <div className="h-0.5 w-16 bg-gradient-to-r from-red to-transparent mb-6"></div>
                <ul className="space-y-4">
                  <li>
                    <motion.div 
                      className="flex group"
                      whileHover={{ 
                        x: 3, 
                        transition: { 
                          type: "spring", 
                          stiffness: 200, 
                          damping: 20, 
                          duration: 0.6 
                        } 
                      }}
                      transition={{ 
                        x: { delay: 0.2, duration: 0.4 }
                      }}
                    >
                      <motion.div 
                        className="w-8 h-8 rounded-lg bg-blue/10 flex items-center justify-center mr-3 flex-shrink-0 group-hover:bg-blue/20 transition-colors duration-300"
                        whileHover={{ 
                          scale: 1.05, 
                          rotate: [0, -3, 3, 0],
                          backgroundColor: "rgba(59, 130, 246, 0.15)",
                          transition: { 
                            duration: 0.6, 
                            ease: "easeInOut" 
                          }
                        }}
                        transition={{
                          scale: { delay: 0.3, duration: 0.4 },
                          rotate: { delay: 0.3, duration: 0.4 }
                        }}
                      >
                        <motion.svg 
                          className="w-4 h-4 text-blue" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                          whileHover={{ 
                          scale: 1.1, 
                          transition: { 
                            duration: 0.4 
                          } 
                        }}
                        transition={{
                          scale: { delay: 0.2, duration: 0.3 }
                        }}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        </motion.svg>
                      </motion.div>
                      <span className="text-gray-600 group-hover:text-gray-900 transition-colors duration-300">
                        Immeuble Zein, 4ème étage<br />
                        Rue des Ambassades<br />
                        Nouakchott, Mauritanie
                      </span>
                    </motion.div>
                  </li>
                  <li>
                    <motion.div 
                      className="flex items-center group"
                      whileHover={{ x: 3, transition: { type: "spring", stiffness: 200, damping: 20, duration: 0.6 } }}
                    >
                      <motion.div 
                        className="w-8 h-8 rounded-lg bg-purple/10 flex items-center justify-center mr-3 flex-shrink-0 group-hover:bg-purple/20 transition-colors duration-300"
                        whileHover={{ 
                          scale: 1.05,
                          rotate: [0, 6, -6, 0],
                          backgroundColor: "rgba(147, 51, 234, 0.15)",
                          transition: { duration: 0.6, ease: "easeInOut" }
                        }}
                      >
                        <motion.svg 
                          className="w-4 h-4 text-purple" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                          whileHover={{ y: [-0.5, -2, -0.5], transition: { duration: 0.5, ease: "easeInOut" } }}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                        </motion.svg>
                      </motion.div>
                      <motion.a 
                        href="mailto:contact@sall.technology" 
                        className="text-gray-600 group-hover:text-purple transition-colors duration-300 relative"
                        whileHover={{ 
                          y: -0.5, 
                          transition: { 
                            duration: 0.4 
                          } 
                        }}
                        transition={{
                          y: { delay: 0.2, duration: 0.3 }
                        }}
                      >
                        contact@sall.technology
                        <motion.span 
                          className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple"
                          whileHover={{ width: "100%", transition: { duration: 0.5, ease: "easeInOut" } }}
                        />
                      </motion.a>
                    </motion.div>
                  </li>
                  <li>
                    <motion.div 
                      className="flex items-center group"
                      whileHover={{ x: 3, transition: { type: "spring", stiffness: 200, damping: 20, duration: 0.6 } }}
                    >
                      <motion.div 
                        className="w-8 h-8 rounded-lg bg-red/10 flex items-center justify-center mr-3 flex-shrink-0 group-hover:bg-red/20 transition-colors duration-300"
                        whileHover={{ 
                          scale: 1.05,
                          rotate: [0, -5, 5, 0],
                          backgroundColor: "rgba(239, 68, 68, 0.15)",
                          transition: { duration: 0.6, ease: "easeInOut" }
                        }}
                      >
                        <motion.svg 
                          className="w-4 h-4 text-red" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                          whileHover={{ 
                            scale: [1, 1.1, 1], 
                            rotate: [0, 3, -3, 0],
                            transition: { duration: 0.7, ease: "easeInOut" }
                          }}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                        </motion.svg>
                      </motion.div>
                      <motion.a 
                        href="tel:46147651" 
                        className="text-gray-600 group-hover:text-red transition-colors duration-300 relative"
                        whileHover={{ y: -0.5, transition: { duration: 0.4 } }}
                      >
                        46147651
                        <motion.span 
                          className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red"
                          whileHover={{ width: "100%", transition: { duration: 0.5, ease: "easeInOut" } }}
                        />
                      </motion.a>
                    </motion.div>
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
