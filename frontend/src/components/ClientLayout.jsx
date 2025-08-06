'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import SALLTECHLoader from '@/components/SALLTECHLoader'

export default function ClientLayout({ children }) {
  const [isLoading, setIsLoading] = useState(true)

  const handleLoaderComplete = () => {
    setIsLoading(false)
  }

  return (
    <>
      {/* Loader - apparaît en premier */}
      <SALLTECHLoader 
        onComplete={handleLoaderComplete}
        duration={3500}
        showOnlyFirstVisit={true}
      />
      
      {/* Contenu principal - affiché après le loader */}
      <div className={`transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <Header />
        {children}
        <Footer />
      </div>
    </>
  )
}
