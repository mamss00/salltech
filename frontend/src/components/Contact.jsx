'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import CTAButton from '@/components/CTAButton'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })

  const [formStatus, setFormStatus] = useState(null)
  const [titleRef, titleInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [descRef, descInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [contactInfoRef, contactInfoInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [formRef, formInView] = useInView({ triggerOnce: true, threshold: 0.1 })

  // Animation variants pour les cartes de contact
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Simuler l'envoi du formulaire
    setFormStatus('loading')

    // Dans un environnement réel, nous enverrions les données à une API ou un service d'email
    setTimeout(() => {
      setFormStatus('success')
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      })
    }, 1500)
  }

  // Style pour les animations et effets visuels
  const customStyles = `
    /* Animation du gradient */
    @keyframes gradientMove {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    
    .animate-gradient-shift {
      animation: gradientMove 4s ease infinite;
    }
    
    /* Effet de flottement pour les éléments d'arrière-plan */
    @keyframes float-1 {
      0%, 100% { transform: translateY(0) rotate(0); }
      50% { transform: translateY(-20px) rotate(5deg); }
    }
    
    @keyframes float-2 {
      0%, 100% { transform: translateY(0) rotate(0); }
      50% { transform: translateY(20px) rotate(-5deg); }
    }
    
    .animate-float-1 {
      animation: float-1 15s ease-in-out infinite;
    }
    
    .animate-float-2 {
      animation: float-2 18s ease-in-out infinite;
    }
    
    /* Effet de survol pour les cartes */
    .contact-card {
      transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    
    .contact-card:hover {
      transform: translateY(-10px);
      box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.1);
    }
    
    /* Effet de brillance pour le bouton */
    .shine-button {
      position: relative;
      overflow: hidden;
    }
    
    .shine-button::after {
      content: '';
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: linear-gradient(to right, transparent, rgba(255, 255, 255, 0.2), transparent);
      transform: rotate(30deg);
      transition: transform 0.5s;
    }
    
    .shine-button:hover::after {
      transform: rotate(30deg) translate(80%, -50%);
    }
    
    /* Styles pour les champs du formulaire */
    .form-input {
      transition: all 0.3s ease;
      border: 1px solid rgba(0, 0, 0, 0.1);
    }
    
    .form-input:focus {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px -3px rgba(0, 0, 0, 0.1);
    }
    
    /* Effet de soulignement pour les liens */
    .fancy-link {
      position: relative;
      text-decoration: none;
      font-weight: 500;
    }
    
    .fancy-link::after {
      content: '';
      position: absolute;
      width: 100%;
      height: 2px;
      bottom: -2px;
      left: 0;
      background: linear-gradient(to right, #3498db, #9b59b6, #e74c3c);
      transform: scaleX(0);
      transform-origin: bottom right;
      transition: transform 0.3s;
    }
    
    .fancy-link:hover::after {
      transform: scaleX(1);
      transform-origin: bottom left;
    }
    
    /* Styles pour les icônes */
    .icon-wrapper {
      position: relative;
      z-index: 1;
      transition: transform 0.3s;
    }
    
    .icon-wrapper::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, rgba(52, 152, 219, 0.2), rgba(155, 89, 182, 0.2));
      border-radius: inherit;
      z-index: -1;
      opacity: 0;
      transform: scale(0.8);
      transition: all 0.3s;
    }
    
    .icon-wrapper:hover {
      transform: scale(1.1);
    }
    
    .icon-wrapper:hover::before {
      opacity: 1;
      transform: scale(1);
    }
  `;

  return (
    <section id="contact" className="py-32 relative overflow-hidden">
      <style jsx>{customStyles}</style>

      {/* Éléments d'arrière-plan animés */}
      <div className="absolute -top-20 -right-20 w-96 h-96 bg-blue/5 rounded-full blur-3xl animate-float-1"></div>
      <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-purple/5 rounded-full blur-3xl animate-float-2"></div>
      <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-red/5 rounded-full blur-3xl animate-float-2"></div>
      <div className="absolute bottom-1/3 left-1/4 w-72 h-72 bg-blue/5 rounded-full blur-3xl animate-float-1"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl">
        <motion.h2
          ref={titleRef}
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-extrabold mb-6 text-center"
        >
          Contactez-<span className="gradient-text bg-gradient-to-r from-blue via-purple to-red bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-shift">nous</span>
        </motion.h2>

        <motion.p
          ref={descRef}
          initial={{ opacity: 0, y: 20 }}
          animate={descInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg text-gray-600 max-w-3xl mx-auto text-center mb-16"
        >
          Une idée de projet ? Une question ? N'hésitez pas à nous contacter.
          Notre équipe vous répondra dans les plus brefs délais.
        </motion.p>

        {/* Carte de contact principale */}
        <div className="max-w-6xl mx-auto bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden">
          {/* En-tête décoratif raffiné */}
          <div className="relative h-[2px]">
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-blue/40 via-purple/40 to-red/40 animate-gradient-shift bg-[length:200%_auto]"></div>
            <div className="absolute bottom-0 inset-x-0 h-px bg-white/80"></div>
          </div>

          <div className="p-8 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              {/* Colonne de gauche: Infos de contact */}
              <motion.div
                ref={contactInfoRef}
                variants={containerVariants}
                initial="hidden"
                animate={contactInfoInView ? "visible" : "hidden"}
                className="lg:col-span-4 space-y-8"
              >
                {/* Carte d'information de contact */}
                <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-sm p-8 contact-card">
                  <h3 className="text-2xl font-bold mb-5 text-gray-800">Comment nous joindre</h3>

                  <div className="space-y-8">
                    <div className="flex">
                      <div className="icon-wrapper w-14 h-14 rounded-xl bg-gradient-to-br from-blue/10 to-purple/5 flex items-center justify-center mr-5 flex-shrink-0">
                        <svg className="w-6 h-6 text-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">Adresse</h4>
                        <p className="text-gray-600">
                          Immeuble Zein, 4ème étage<br />
                          Rue des Ambassades<br />
                          Nouakchott, Mauritanie
                        </p>
                      </div>
                    </div>

                    <div className="flex">
                      <div className="icon-wrapper w-14 h-14 rounded-xl bg-gradient-to-br from-purple/10 to-red/5 flex items-center justify-center mr-5 flex-shrink-0">
                        <svg className="w-6 h-6 text-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">Email</h4>
                        <a href="mailto:contact@salltech.mr" className="text-gray-600 hover:text-blue transition-colors duration-300 fancy-link">
                          contact@salltech.mr
                        </a>
                      </div>
                    </div>

                    <div className="flex">
                      <div className="icon-wrapper w-14 h-14 rounded-xl bg-gradient-to-br from-red/10 to-blue/5 flex items-center justify-center mr-5 flex-shrink-0">
                        <svg className="w-6 h-6 text-red" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">Téléphone</h4>
                        <a href="tel:+22245251632" className="text-gray-600 hover:text-blue transition-colors duration-300 fancy-link">
                          +222 45 25 16 32
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Carte de réseaux sociaux */}
                <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-sm p-8 contact-card">
                  <h3 className="text-2xl font-bold mb-5 text-gray-800">Suivez-nous</h3>

                  <div className="grid grid-cols-4 gap-4">
                    <a href="#" className="icon-wrapper aspect-square rounded-xl bg-gradient-to-br from-blue/10 to-blue/5 flex items-center justify-center text-blue hover:text-white transition-colors duration-300 relative group">
                      <div className="absolute inset-0 bg-blue opacity-0 group-hover:opacity-90 transition-opacity duration-300 rounded-xl"></div>
                      <svg className="w-6 h-6 relative z-10" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                      </svg>
                    </a>

                    <a href="#" className="icon-wrapper aspect-square rounded-xl bg-gradient-to-br from-blue/10 to-purple/5 flex items-center justify-center text-purple hover:text-white transition-colors duration-300 relative group">
                      <div className="absolute inset-0 bg-purple opacity-0 group-hover:opacity-90 transition-opacity duration-300 rounded-xl"></div>
                      <svg className="w-6 h-6 relative z-10" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                      </svg>
                    </a>

                    <a href="#" className="icon-wrapper aspect-square rounded-xl bg-gradient-to-br from-purple/10 to-red/5 flex items-center justify-center text-red hover:text-white transition-colors duration-300 relative group">
                      <div className="absolute inset-0 bg-gradient-to-br from-purple to-red opacity-0 group-hover:opacity-90 transition-opacity duration-300 rounded-xl"></div>
                      <svg className="w-6 h-6 relative z-10" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path>
                      </svg>
                    </a>

                    <a href="#" className="icon-wrapper aspect-square rounded-xl bg-gradient-to-br from-red/10 to-blue/5 flex items-center justify-center text-blue hover:text-white transition-colors duration-300 relative group">
                      <div className="absolute inset-0 bg-blue opacity-0 group-hover:opacity-90 transition-opacity duration-300 rounded-xl"></div>
                      <svg className="w-6 h-6 relative z-10" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd"></path>
                      </svg>
                    </a>
                  </div>

                  <div className="mt-8 pt-6 border-t border-gray-100">
                    <div className="flex items-center text-gray-600">
                      <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      <span>Horaires d'ouverture:</span>
                    </div>

                    <div className="mt-3 space-y-2 pl-7">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Lun - Jeu</span>
                        <span className="font-medium">8h30 - 17h30</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Vendredi</span>
                        <span className="font-medium">8h30 - 12h00</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Weekend</span>
                        <span className="font-medium">Fermé</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Colonne de droite: Formulaire */}
              <motion.div
                ref={formRef}
                initial={{ opacity: 0, x: 20 }}
                animate={formInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="lg:col-span-8"
              >
                <div className="bg-white rounded-2xl shadow-sm p-8 md:p-10 h-full contact-card">
                  <h3 className="text-2xl font-bold mb-2 text-gray-800">Envoyez-nous un message</h3>
                  <div className="h-px w-16 bg-gradient-to-r from-blue/40 via-purple/40 to-red/40 mb-6"></div>
                  <p className="text-gray-600 mb-8">Nous vous répondrons dans les meilleurs délais</p>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="form-group">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Nom complet <span className="text-red">*</span></label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-xl border-gray-200 form-input focus:ring-blue focus:border-blue transition duration-300"
                          placeholder="Votre nom"
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email <span className="text-red">*</span></label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-xl border-gray-200 form-input focus:ring-blue focus:border-blue transition duration-300"
                          placeholder="exemple@domaine.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="form-group">
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border-gray-200 form-input focus:ring-blue focus:border-blue transition duration-300"
                          placeholder="+222 XX XX XX XX"
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">Sujet <span className="text-red">*</span></label>
                        <input
                          type="text"
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-xl border-gray-200 form-input focus:ring-blue focus:border-blue transition duration-300"
                          placeholder="Sujet de votre message"
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message <span className="text-red">*</span></label>
                      <textarea
                        id="message"
                        name="message"
                        rows="6"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border-gray-200 form-input focus:ring-blue focus:border-blue transition duration-300"
                        placeholder="Détaillez votre demande ici..."
                      ></textarea>
                    </div>

                    <div className="flex items-center">
                      <input
                        id="privacy"
                        type="checkbox"
                        required
                        className="w-5 h-5 text-blue border-gray-200 rounded focus:ring-blue/20"
                      />
                      <label htmlFor="privacy" className="ml-3 block text-sm text-gray-700">
                        J'accepte la <a href="#" className="text-blue hover:text-purple fancy-link transition-colors duration-300">politique de confidentialité</a>
                      </label>
                    </div>

                    <div className="pt-4">
						<CTAButton 
						  type="submit"
						  loading={formStatus === 'loading'}
						  loadingText="Envoi en cours"
						  className="max-w-xs mx-auto" // Réduire la largeur mais centrer le bouton
						  showDots={true}
						>
						  Envoyer le message
						</CTAButton>
                    </div>

                    {formStatus === 'success' && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="mt-6 bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-xl flex items-start"
                      >
                        <div className="mr-3 flex-shrink-0 bg-green-100 rounded-full p-2">
                          <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                          </svg>
                        </div>
                        <div>
                          <p className="text-green-800 font-medium">Message envoyé avec succès !</p>
                          <p className="text-green-700 text-sm mt-1">Merci de nous avoir contactés. Nous vous répondrons dans les meilleurs délais.</p>
                        </div>
                      </motion.div>
                    )}
                  </form>
                </div>
              </motion.div>
            </div>

            {/* Section supplémentaire pour options de contact alternatives */}
            <div className="mt-12 pt-10 border-t border-gray-100 text-center">
              <h3 className="text-xl font-bold mb-6 text-gray-800">Autres façons de nous contacter</h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="relative overflow-hidden rounded-xl group">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue/30 to-blue/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="bg-white rounded-xl p-6 relative z-10 transition-transform duration-300 group-hover:-translate-y-1">
                    <div className="w-12 h-12 bg-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-6 h-6 text-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                      </svg>
                    </div>
                    <h4 className="font-semibold mb-2">Demande de devis</h4>
                    <p className="text-gray-600 text-sm mb-4">Obtenez une estimation gratuite pour votre projet</p>
                    <a href="#" className="text-blue fancy-link text-sm font-medium">Demander un devis</a>
                  </div>
                </div>

                <div className="relative overflow-hidden rounded-xl group">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple/30 to-purple/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="bg-white rounded-xl p-6 relative z-10 transition-transform duration-300 group-hover:-translate-y-1">
                    <div className="w-12 h-12 bg-purple/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-6 h-6 text-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                      </svg>
                    </div>
                    <h4 className="font-semibold mb-2">Planifier un appel</h4>
                    <p className="text-gray-600 text-sm mb-4">Réservez un créneau avec notre équipe technique</p>
                    <a href="#" className="text-purple fancy-link text-sm font-medium">Réserver maintenant</a>
                  </div>
                </div>

                <div className="relative overflow-hidden rounded-xl group">
                  <div className="absolute inset-0 bg-gradient-to-r from-red/30 to-red/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="bg-white rounded-xl p-6 relative z-10 transition-transform duration-300 group-hover:-translate-y-1">
                    <div className="w-12 h-12 bg-red/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-6 h-6 text-red" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"></path>
                      </svg>
                    </div>
                    <h4 className="font-semibold mb-2">Support technique</h4>
                    <p className="text-gray-600 text-sm mb-4">Besoin d'aide avec nos services ou produits</p>
                    <a href="#" className="text-red fancy-link text-sm font-medium">Contacter le support</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Carte Google Maps (optionnelle) */}
        <div className="mt-16 max-w-6xl mx-auto overflow-hidden rounded-3xl shadow-lg">
          <div className="h-80 bg-gray-200 relative">
            {/* Ici, vous pouvez intégrer une carte Google Maps avec l'adresse de votre entreprise */}
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue/10 via-purple/10 to-red/10">
              <div className="text-center">
                <div className="w-16 h-16 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                  <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                </div>
                <p className="text-gray-700 font-medium max-w-xs mx-auto">Pour une intégration de carte Google Maps, ajoutez votre clé API Google Maps</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact