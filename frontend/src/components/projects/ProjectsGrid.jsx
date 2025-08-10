'use client'

import { useState, useRef } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import { getStrapiMediaUrl } from '@/utils/helpers'
import { FaTimes, FaChevronLeft, FaChevronRight, FaExpand, FaDesktop, FaMobile } from 'react-icons/fa'

export default function ProjectGallery({ images, projectTitle, color = 'blue' }) {
  // Animation au défilement
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })
  
  const sectionOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8])
  
  // Animation d'apparition
  const [titleRef, titleInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [desktopRef, desktopInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [mobileRef, mobileInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  
  // États pour la lightbox
  const [selectedImage, setSelectedImage] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  
  // Fonction pour obtenir les classes de couleur statiques
  const getColorClasses = (colorName) => {
    const colorMap = {
      purple: {
        text: 'text-purple-600',
        bg: 'bg-purple-600',
        bgLight: 'bg-purple-100',
        border: 'border-purple-200',
        hover: 'hover:border-purple-200',
        gradient: 'from-purple-600 to-purple-700'
      },
      blue: {
        text: 'text-blue-600',
        bg: 'bg-blue-600',
        bgLight: 'bg-blue-100',
        border: 'border-blue-200',
        hover: 'hover:border-blue-200',
        gradient: 'from-blue-600 to-blue-700'
      },
      red: {
        text: 'text-red-600',
        bg: 'bg-red-600',
        bgLight: 'bg-red-100',
        border: 'border-red-200',
        hover: 'hover:border-red-200',
        gradient: 'from-red-600 to-red-700'
      },
      green: {
        text: 'text-green-600',
        bg: 'bg-green-600',
        bgLight: 'bg-green-100',
        border: 'border-green-200',
        hover: 'hover:border-green-200',
        gradient: 'from-green-600 to-green-700'
      },
      yellow: {
        text: 'text-yellow-600',
        bg: 'bg-yellow-600',
        bgLight: 'bg-yellow-100',
        border: 'border-yellow-200',
        hover: 'hover:border-yellow-200',
        gradient: 'from-yellow-600 to-yellow-700'
      }
    }
    
    return colorMap[colorName] || colorMap.blue
  }
  
  const colorClasses = getColorClasses(color)
  
  // Traitement et séparation des images
  const processedImages = images?.map((img, index) => {
    if (!img) return null
    
    const imageUrl = getStrapiMediaUrl(
      img.url || 
      img.formats?.large?.url || 
      img.formats?.medium?.url || 
      img.formats?.small?.url
    )
    
    // Détection du type d'image basée sur le nom
    const isDesktop = img.name?.includes('desktop') || false
    const isMobile = img.name?.includes('mobile') || false
    
    // Extraction du nom de la page depuis le nom du fichier
    let pageName = 'Image'
    if (img.name) {
      // Format: projet_salltech_nouakchott_site_creer_page_desktop.png
      const parts = img.name.split('_')
      if (parts.length >= 6) {
        pageName = parts[5]
          .replace(/[-_]/g, ' ')
          .replace(/\b\w/g, l => l.toUpperCase())
      }
    }
    
    return {
      id: index,
      url: imageUrl,
      alt: img.alternativeText || `${projectTitle} - ${pageName}`,
      caption: pageName,
      name: img.name || '',
      isDesktop,
      isMobile,
      width: img.width || 1920,
      height: img.height || 1080
    }
  }).filter(Boolean) || []
  
  // Séparer par type et trier
  const desktopImages = processedImages
    .filter(img => img.isDesktop)
    .sort((a, b) => {
      // Mettre accueil en premier, puis ordre alphabétique
      if (a.caption.toLowerCase().includes('accueil')) return -1
      if (b.caption.toLowerCase().includes('accueil')) return 1
      return a.caption.localeCompare(b.caption)
    })
  
  const mobileImages = processedImages
    .filter(img => img.isMobile)
    .sort((a, b) => {
      // Mettre accueil en premier, puis ordre alphabétique
      if (a.caption.toLowerCase().includes('accueil')) return -1
      if (b.caption.toLowerCase().includes('accueil')) return 1
      return a.caption.localeCompare(b.caption)
    })
  
  const otherImages = processedImages.filter(img => !img.isDesktop && !img.isMobile)
  
  // Images pour la lightbox (toutes)
  const allImages = [...desktopImages, ...mobileImages, ...otherImages]
  
  // Animation variants
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
    hidden: { y: 30, opacity: 0, scale: 0.9 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  }
  
  // Fonctions de navigation lightbox
  const openLightbox = (image) => {
    const indexInAll = allImages.findIndex(img => img.id === image.id)
    setSelectedImage(image)
    setCurrentIndex(indexInAll)
  }
  
  const closeLightbox = () => {
    setSelectedImage(null)
  }
  
  const nextImage = () => {
    const nextIndex = (currentIndex + 1) % allImages.length
    setCurrentIndex(nextIndex)
    setSelectedImage(allImages[nextIndex])
  }
  
  const prevImage = () => {
    const prevIndex = currentIndex === 0 ? allImages.length - 1 : currentIndex - 1
    setCurrentIndex(prevIndex)
    setSelectedImage(allImages[prevIndex])
  }
  
  // Fonction pour déterminer l'aspect ratio optimal
  const getAspectRatio = (image) => {
    const ratio = image.width / image.height
    
    if (image.isDesktop) {
      // Images desktop : gérer les très longues pages
      if (ratio < 0.3) return 'aspect-[1/3]' // Très très haute
      if (ratio < 0.5) return 'aspect-[1/2]' // Très haute
      if (ratio < 0.8) return 'aspect-[3/4]' // Haute
      return 'aspect-[16/10]' // Standard desktop
    } else if (image.isMobile) {
      // Images mobile : format portrait
      return 'aspect-[9/16]'
    } else {
      // Autres images
      return 'aspect-video'
    }
  }
  
  // Fonction pour obtenir la grille adaptative
  const getGridClasses = (images, isMobile = false) => {
    const count = images.length
    
    if (isMobile) {
      // Grille mobile plus dense
      if (count === 1) return 'grid-cols-1 max-w-xs mx-auto'
      if (count === 2) return 'grid-cols-2 max-w-md mx-auto'
      if (count <= 4) return 'grid-cols-2 md:grid-cols-4 max-w-4xl mx-auto'
      return 'grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6'
    } else {
      // Grille desktop
      if (count === 1) return 'grid-cols-1 max-w-4xl mx-auto'
      if (count === 2) return 'grid-cols-1 lg:grid-cols-2'
      if (count <= 3) return 'grid-cols-1 lg:grid-cols-3'
      return 'grid-cols-1 lg:grid-cols-2 xl:grid-cols-3'
    }
  }
  
  if (!processedImages || processedImages.length === 0) return null

  return (
    <>
      <motion.section 
        ref={sectionRef}
        style={{ opacity: sectionOpacity }}
        className="py-20 bg-gradient-to-br from-white to-gray-50 relative overflow-hidden"
      >
        {/* Éléments décoratifs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 10 }).map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-2 h-2 ${colorClasses.bgLight} rounded-full`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            />
          ))}
        </div>

        <div className="container relative z-10">
          {/* En-tête de section */}
          <div className="text-center mb-16">
            <motion.span
              ref={titleRef}
              initial={{ opacity: 0, y: 20 }}
              animate={titleInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className={`inline-block ${colorClasses.text} font-semibold tracking-wider uppercase text-sm mb-4`}
            >
              GALERIE DU PROJET
            </motion.span>
            
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={titleInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-6"
            >
              Captures d'<span className={colorClasses.text}>écran</span>
            </motion.h2>
            
            <motion.div 
              initial={{ width: 0 }}
              animate={titleInView ? { width: "6rem" } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className={`h-1 ${colorClasses.bg} mx-auto mb-8`}
            ></motion.div>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={titleInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-lg text-gray-600 max-w-3xl mx-auto"
            >
              Découvrez le rendu final du projet sur différents appareils et résolutions.
            </motion.p>
          </div>
          
          {/* Images Desktop */}
          {desktopImages.length > 0 && (
            <div className="mb-20">
              <motion.div
                ref={desktopRef}
                initial={{ opacity: 0, y: 30 }}
                animate={desktopInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8 }}
                className="flex items-center gap-4 mb-12"
              >
                <div className={`w-12 h-12 ${colorClasses.bgLight} rounded-xl flex items-center justify-center`}>
                  <FaDesktop className={`w-6 h-6 ${colorClasses.text}`} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Version Desktop</h3>
                  <p className="text-gray-600">{desktopImages.length} image{desktopImages.length > 1 ? 's' : ''}</p>
                </div>
              </motion.div>
              
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate={desktopInView ? "visible" : "hidden"}
                className={`grid gap-6 ${getGridClasses(desktopImages, false)}`}
              >
                {desktopImages.map((image, index) => (
                  <motion.div
                    key={image.id}
                    variants={itemVariants}
                    className="group cursor-pointer"
                    onClick={() => openLightbox(image)}
                  >
                    <div className={`relative ${getAspectRatio(image)} overflow-hidden rounded-xl bg-gray-100 shadow-lg hover:shadow-xl transition-all duration-500 border-2 border-transparent ${colorClasses.hover}`}>
                      <Image
                        src={image.url}
                        alt={image.alt}
                        fill
                        className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      
                      {/* Contrôles */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className={`w-12 h-12 ${colorClasses.bg} rounded-full flex items-center justify-center text-white shadow-lg`}>
                          <FaExpand className="w-5 h-5" />
                        </div>
                      </div>
                      
                      {/* Badge nom */}
                      <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {image.caption}
                      </div>
                      
                      {/* Badge numéro */}
                      <div className={`absolute top-4 right-4 w-8 h-8 ${colorClasses.bg} text-white rounded-full flex items-center justify-center text-sm font-bold`}>
                        {index + 1}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          )}
          
          {/* Images Mobile */}
          {mobileImages.length > 0 && (
            <div className="mb-20">
              <motion.div
                ref={mobileRef}
                initial={{ opacity: 0, y: 30 }}
                animate={mobileInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8 }}
                className="flex items-center gap-4 mb-12"
              >
                <div className={`w-12 h-12 ${colorClasses.bgLight} rounded-xl flex items-center justify-center`}>
                  <FaMobile className={`w-6 h-6 ${colorClasses.text}`} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Version Mobile</h3>
                  <p className="text-gray-600">{mobileImages.length} image{mobileImages.length > 1 ? 's' : ''}</p>
                </div>
              </motion.div>
              
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate={mobileInView ? "visible" : "hidden"}
                className={`grid gap-6 ${getGridClasses(mobileImages, true)}`}
              >
                {mobileImages.map((image, index) => (
                  <motion.div
                    key={image.id}
                    variants={itemVariants}
                    className="group cursor-pointer"
                    onClick={() => openLightbox(image)}
                  >
                    <div className={`relative ${getAspectRatio(image)} overflow-hidden rounded-xl bg-gray-100 shadow-lg hover:shadow-xl transition-all duration-500 border-2 border-transparent ${colorClasses.hover}`}>
                      <Image
                        src={image.url}
                        alt={image.alt}
                        fill
                        className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
                      />
                      
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      
                      {/* Contrôles */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className={`w-10 h-10 ${colorClasses.bg} rounded-full flex items-center justify-center text-white shadow-lg`}>
                          <FaExpand className="w-4 h-4" />
                        </div>
                      </div>
                      
                      {/* Badge nom */}
                      <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-sm text-white px-2 py-1 rounded text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {image.caption}
                      </div>
                      
                      {/* Badge numéro */}
                      <div className={`absolute top-2 right-2 w-6 h-6 ${colorClasses.bg} text-white rounded-full flex items-center justify-center text-xs font-bold`}>
                        {index + 1}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          )}
          
          {/* Autres images */}
          {otherImages.length > 0 && (
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-12">Autres captures</h3>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate={mobileInView ? "visible" : "hidden"}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {otherImages.map((image, index) => (
                  <motion.div
                    key={image.id}
                    variants={itemVariants}
                    className="group cursor-pointer"
                    onClick={() => openLightbox(image)}
                  >
                    <div className="relative aspect-video overflow-hidden rounded-xl bg-gray-100 shadow-lg hover:shadow-xl transition-all duration-500">
                      <Image
                        src={image.url}
                        alt={image.alt}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className={`w-12 h-12 ${colorClasses.bg} rounded-full flex items-center justify-center text-white`}>
                          <FaExpand className="w-5 h-5" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          )}
          
          {/* Info statistiques */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1 }}
            className="text-center mt-16 p-6 bg-white/50 backdrop-blur-sm rounded-2xl border border-gray-200"
          >
            <div className="flex flex-wrap justify-center gap-8">
              <div className="text-center">
                <div className={`text-3xl font-bold ${colorClasses.text} mb-1`}>{desktopImages.length}</div>
                <div className="text-sm text-gray-600">Desktop</div>
              </div>
              <div className="text-center">
                <div className={`text-3xl font-bold ${colorClasses.text} mb-1`}>{mobileImages.length}</div>
                <div className="text-sm text-gray-600">Mobile</div>
              </div>
              <div className="text-center">
                <div className={`text-3xl font-bold ${colorClasses.text} mb-1`}>{processedImages.length}</div>
                <div className="text-sm text-gray-600">Total</div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            {/* Image */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-7xl max-h-[90vh] mx-auto"
              onClick={e => e.stopPropagation()}
            >
              <Image
                src={selectedImage.url}
                alt={selectedImage.alt}
                width={selectedImage.width}
                height={selectedImage.height}
                className="object-contain max-h-[90vh] w-auto"
                priority
              />
              
              {/* Contrôles */}
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 w-12 h-12 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-colors"
              >
                <FaTimes className="w-6 h-6" />
              </button>
              
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-colors"
              >
                <FaChevronLeft className="w-6 h-6" />
              </button>
              
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-colors"
              >
                <FaChevronRight className="w-6 h-6" />
              </button>
              
              {/* Info image */}
              <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-lg">
                <p className="font-medium">{selectedImage.caption}</p>
                <p className="text-sm opacity-80">{currentIndex + 1} / {allImages.length}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}