'use client'

import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'

export const useTypingEffect = (phrases, typingSpeed = 100, deleteSpeed = 50, delayBeforeDelete = 2000, delayBeforeNewPhrase = 500) => {
  const [text, setText] = useState('')
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [speed, setSpeed] = useState(typingSpeed)
  
  useEffect(() => {
    const timer = setTimeout(() => {
      const currentPhrase = phrases[phraseIndex]
      
      // Typing or deleting logic
      if (isDeleting) {
        setText(currentPhrase.substring(0, charIndex - 1))
        setCharIndex(prev => prev - 1)
        setSpeed(deleteSpeed)
      } else {
        setText(currentPhrase.substring(0, charIndex + 1))
        setCharIndex(prev => prev + 1)
        setSpeed(typingSpeed)
      }
      
      // State transitions
      if (!isDeleting && charIndex === currentPhrase.length) {
        setIsDeleting(true)
        setSpeed(delayBeforeDelete)
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false)
        setPhraseIndex((prev) => (prev + 1) % phrases.length)
        setSpeed(delayBeforeNewPhrase)
      } else if (!isDeleting && charIndex < currentPhrase.length) {
        // Slight natural variation when typing
        setSpeed(Math.random() * 30 + 80)
      }
    }, speed)
    
    return () => clearTimeout(timer)
  }, [charIndex, delayBeforeDelete, delayBeforeNewPhrase, deleteSpeed, isDeleting, phraseIndex, phrases, typingSpeed, speed])
  
  return { text, isTyping: !isDeleting && charIndex < phrases[phraseIndex].length }
}

export const useAnimateOnScroll = (threshold = 0.1) => {
  const { ref, inView } = useInView({
    threshold,
    triggerOnce: true
  })
  
  return { ref, inView }
}