'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useTypingEffect, useAnimateOnScroll } from '@/utils/animations'
import CTAButton from '@/components/CTAButton'

const Hero = () => {
  const phrases = [
    "les beaux sites",
    "les apps élégantes",
    "le travail propre",
    "l'excellence", 
    "le professionnalisme"
  ]
  
  const { text, isTyping } = useTypingEffect(phrases)
  const taglineAnimation = useAnimateOnScroll()
  const titleAnimation = useAnimateOnScroll()
  const descriptionAnimation = useAnimateOnScroll()
  const buttonAnimation = useAnimateOnScroll()
  
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden pt-32 pb-16">
      <div className="container relative z-10">
        <div className="md:w-1/2 md:pr-8 md:text-left text-center">
          <motion.h2
            ref={taglineAnimation.ref}
            initial={{ opacity: 0, y: 20 }}
            animate={taglineAnimation.inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-blue text-lg font-semibold tracking-wider uppercase mb-6"
          >
            Innover. Créer. Transformer.
          </motion.h2>
          
          <div className="h-[140px] mb-6 md:mb-8 relative">
            <motion.h1
              ref={titleAnimation.ref}
              initial={{ opacity: 0, y: 30 }}
              animate={titleAnimation.inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-4xl md:text-[3.5rem] font-extrabold leading-tight absolute top-0 left-0 w-full md:whitespace-nowrap"
            >
              Pour ceux qui<br />
              aiment <span className="gradient-text inline-block relative min-w-[280px]">
                {text}
                <span className={`absolute -right-2 ${isTyping ? 'animate-blink' : ''}`}>|</span>
              </span>
            </motion.h1>
          </div>
          
          <div className="mt-20 md:mt-0">
            <motion.p
              ref={descriptionAnimation.ref}
              initial={{ opacity: 0, y: 30 }}
              animate={descriptionAnimation.inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-lg md:text-[1.25rem] text-gray-600 max-w-[520px] mx-auto md:mx-0 leading-[1.7] mb-8"
            >
              Startup innovante à Nouakchott, nous développons des solutions digitales sur mesure pour accompagner les entreprises mauritaniennes dans leur transformation numérique.
            </motion.p>
          </div>
          
				<CTAButton 
				  href="#services" 
				  className="md:text-left text-center md:self-start inline-flex items-center py-[14px] px-[34px] text-[1.05rem]"
				>
				  Découvrir nos services
				</CTAButton>
        </div>
      </div>
      
      {/* Hero Image */}
      <div className="absolute right-0 top-0 bottom-0 w-full md:w-1/2 h-full z-0 opacity-25 md:opacity-100">
        <Image
          src="/images/technology.jpg"
          alt="Image d'accueil"
          fill
          priority
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
      
      {/* Floating Shapes */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute bg-blue w-[300px] h-[300px] rounded-full filter blur-[30px] opacity-20 -top-[100px] -left-[100px] animate-float-1"></div>
        <div className="absolute bg-purple w-[400px] h-[400px] rounded-full filter blur-[30px] opacity-20 -bottom-[200px] -right-[200px] animate-float-2"></div>
        <div className="absolute bg-red w-[200px] h-[200px] rounded-full filter blur-[30px] opacity-20 bottom-[100px] left-[30%] animate-float-3"></div>
      </div>
    </section>
  )
}

export default Hero