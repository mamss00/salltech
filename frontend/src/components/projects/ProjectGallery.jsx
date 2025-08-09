'use client'

import { useState, useRef } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import { getStrapiMediaUrl } from '@/utils/helpers'
import { FaTimes, FaChevronLeft, FaChevronRight, FaExpand } from 'react-icons/fa'

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
  const [galleryRef, galleryInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  
  // États pour la lightbox
  const [selectedImage, setSelectedImage] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  
  // Préparer les images
  const processedImages = images.map((img, index) => {
    if (!img) return null
    
    const imageUrl = getStrapiMediaUrl(
      img.url || 
      img.formats?.large?.url || 
      img.formats?.medium?.url || 
      img.formats?.small?.url
    )
    
    return {
      id: index,
      url: imageUrl,
      alt: img.alternativeText || `${projectTitle} - Image ${index + 1}`,
      caption: img.caption || null
    }
  }).filter(Boolean)
  
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
  
  // Fonctions de navigation
  const openLightbox = (image, index) => {
    setSelectedImage(image)
    setCurrentIndex(index)
  }
  
  const closeLightbox = () => {
    setSelectedImage(null)
  }
  
  const nextImage = () => {
    const nextIndex = (currentIndex + 1) % processedImages.length
    setCurrentIndex(nextIndex)
    setSelectedImage(processedImages[nextIndex])
  }
  
  const prevImage = () => {
    const prevIndex = currentIndex === 0 ? processedImages.length - 1 : currentIndex - 1
    setCurrentIndex(prevIndex)
    setSelectedImage(processedImages[prevIndex])
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
              className={`absolute w-2 h-2 bg-${color}/10 rounded-full`}
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
              className={`inline-block text-${color} font-semibold tracking-wider uppercase text-sm mb-4`}
            >
              GALERIE DU PROJET
            </motion.span>
            
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={titleInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-6"
            >
              Aperçu{' '}
              <span className={`text-${color}`}>visuel</span>
            </motion.h2>
            
            <motion.div 
              initial={{ width: 0 }}
              animate={titleInView ? { width: "6rem" } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className={`h-1 bg-${color} mx-auto mb-8`}
            ></motion.div>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={titleInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-lg text-gray-600 max-w-3xl mx-auto"
            >
              Explorez les différentes facettes de ce projet à travers notre galerie d'images.
            </motion.p>
          </div>
          
          {/* Grille d'images */}
          <motion.div
            ref={galleryRef}
            variants={containerVariants}
            initial="hidden"
            animate={galleryInView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {processedImages.map((image, index) => (
              <motion.div
                key={image.id}
                variants={itemVariants}
                className="group cursor-pointer"
                onClick={() => openLightbox(image, index)}
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-gray-100 shadow-lg hover:shadow-xl transition-all duration-500">
                  <Image
                    src={image.url}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  
                  {/* Overlay avec effet */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Icône d'agrandissement */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className={`w-12 h-12 bg-${color} rounded-full flex items-center justify-center text-white`}>
                      <FaExpand className="w-5 h-5" />
                    </div>
                  </div>
                  
                  {/* Badge numéro */}
                  <div className={`absolute top-4 left-4 w-8 h-8 bg-${color} text-white rounded-full flex items-center justify-center text-sm font-bold`}>
                    {index + 1}
                  </div>
                </div>
                
                {/* Caption si disponible */}
                {image.caption && (
                  <p className="mt-3 text-sm text-gray-600 text-center">
                    {image.caption}
                  </p>
                )}
              </motion.div>
            ))}
          </motion.div>
          
          {/* Info badge */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={galleryInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-center mt-12"
          >
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-white rounded-full shadow-lg border border-gray-100">
              <div className={`w-2 h-2 bg-${color} rounded-full`}></div>
              <span className="text-gray-600 font-medium">
                {processedImages.length} image{processedImages.length > 1 ? 's' : ''} • Cliquez pour agrandir
              </span>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-4xl max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image */}
              <div className="relative">
                <Image
                  src={selectedImage.url}
                  alt={selectedImage.alt}
                  width={1200}
                  height={800}
                  className="max-w-full max-h-[80vh] object-contain rounded-lg"
                />
                
                {/* Bouton fermer */}
                <button
                  onClick={closeLightbox}
                  className="absolute top-4 right-4 w-10 h-10 bg-black/50 backdrop-blur-sm text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
                >
                  <FaTimes className="w-4 h-4" />
                </button>
                
                {/* Navigation */}
                {processedImages.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 backdrop-blur-sm text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
                    >
                      <FaChevronLeft className="w-5 h-5" />
                    </button>
                    
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 backdrop-blur-sm text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
                    >
                      <FaChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>
              
              {/* Info */}
              <div className="mt-4 text-center">
                <p className="text-white font-medium">
                  {selectedImage.alt}
                </p>
                <p className="text-gray-300 text-sm mt-1">
                  {currentIndex + 1} / {processedImages.length}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}