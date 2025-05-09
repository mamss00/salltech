import SectionWrapper from '@/components/sections/SectionWrapper'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import Portfolio from '@/components/Portfolio'
import Contact from '@/components/Contact'

export default function Home() {
  return (
    <main>
      <SectionWrapper 
        id="home" 
        primaryColor="blue" 
        secondaryColor="purple" 
        showTopConnection={false} 
        backgroundType="lines"
      >
        <Hero />
      </SectionWrapper>
      
      <SectionWrapper 
        id="services" 
        primaryColor="purple" 
        secondaryColor="blue" 
        connectionType="wave"
        backgroundType="dots"
      >
        <Services />
      </SectionWrapper>
      
      <SectionWrapper 
        id="portfolio" 
        primaryColor="red" 
        secondaryColor="purple" 
        connectionType="line"
        backgroundType="circuit"
      >
        <Portfolio />
      </SectionWrapper>
      
      <SectionWrapper 
        id="contact" 
        primaryColor="blue" 
        secondaryColor="red" 
        showBottomConnection={false}
        connectionType="dots"
        backgroundType="honeycomb"
      >
        <Contact />
      </SectionWrapper>
    </main>
  )
}