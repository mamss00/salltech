'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { getServices, titreToSlug } from '@/utils/api'
import Link from 'next/link'

const Services = () => {
  const [titleRef, titleInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [descRef, descInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [servicesRef, servicesInView] = useInView({ triggerOnce: true, threshold: 0.1 })

  const [services, setServices] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const servicesData = await getServices()
        const sorted = [...servicesData].sort((a, b) => (a.Ordreaffichage || 999) - (b.Ordreaffichage || 999))
        setServices(sorted)
      } catch (err) {
        console.error('Erreur lors du chargement des services:', err)
        setError('Erreur lors du chargement des services. Veuillez réessayer plus tard.')
      } finally {
        setIsLoading(false)
      }
    }
    fetchServices()
  }, [])

  const extractTextFromRichText = (content) => {
    if (!Array.isArray(content)) return ''
    return content.map(block => block.children?.map(child => child.text || '').join('')).join('\n')
  }

  const unicodeToEmoji = (value) => {
    if (!value?.startsWith('U+')) return value || '💡'
    try {
      return String.fromCodePoint(parseInt(value.replace('U+', ''), 16))
    } catch {
      return '💡'
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
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

  const getColorByIndex = (index) => {
    const colorClasses = [
      'from-blue/20 to-blue/5',
      'from-purple/20 to-purple/5',
      'from-red/20 to-red/5'
    ]
    return colorClasses[index % colorClasses.length]
  }

  return (
    <section id="services" className="py-32 relative overflow-hidden">
      <div className="absolute -top-20 -right-20 w-96 h-96 bg-blue/5 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-purple/5 rounded-full blur-3xl"></div>
      <div className="container relative z-10">
        <motion.h2
          ref={titleRef}
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-extrabold mb-6 text-center"
        >
          Nos <span className="gradient-text">Services</span>
        </motion.h2>

        <motion.p
          ref={descRef}
          initial={{ opacity: 0, y: 20 }}
          animate={descInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg text-gray-600 max-w-3xl mx-auto text-center mb-20"
        >
          Nous proposons des services digitaux sur mesure pour les entreprises mauritaniennes.
        </motion.p>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-gray-500">Chargement en cours...</p>
          </div>
        ) : error ? (
          <div className="text-center text-red py-10">
            <p className="text-xl font-semibold">{error}</p>
          </div>
        ) : (
          <motion.div
            ref={servicesRef}
            variants={containerVariants}
            initial="hidden"
            animate={servicesInView ? 'visible' : 'hidden'}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {services.map((service, index) => {
              const color = service.Couleur || getColorByIndex(index)
              const emoji = unicodeToEmoji(service.Emoji)
              const textColor = color.includes('blue') ? 'text-blue' : color.includes('purple') ? 'text-purple' : color.includes('red') ? 'text-red' : 'text-blue'
              const slug = service.slug || titreToSlug(service.Titre)

              return (
                <motion.div
                  key={service.id}
                  variants={itemVariants}
                  className={`bg-gradient-to-br ${color} backdrop-blur-sm rounded-2xl shadow-lg p-8 hover:-translate-y-2 transition-all`}
                >
                  <div className="text-4xl mb-4">
                    <span className={`text-5xl ${textColor}`}>{emoji}</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{service.Titre}</h3>
                  <p className="text-gray-600 mb-6">{extractTextFromRichText(service.Description)}</p>
                  <Link href={`/services/${slug}`} className="text-blue hover:underline">
                    En savoir plus →
                  </Link>
                </motion.div>
              )
            })}
          </motion.div>
        )}
      </div>
    </section>
  )
}

export default Services