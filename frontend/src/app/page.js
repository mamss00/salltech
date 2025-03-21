import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import Portfolio from '@/components/Portfolio'
import Contact from '@/components/Contact'
import CTAButton from '@/components/CTAButton'

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <Services />
      <Portfolio />
      <Contact />
    </main>
  )
}