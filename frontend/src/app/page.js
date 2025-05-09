import SectionWrapper from '@/components/background/SectionWrapper'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import Portfolio from '@/components/Portfolio' 
import Contact from '@/components/Contact'

export default function Home() {
  return (
    <main>
      <SectionWrapper id="home" primaryColor="blue" showTopConnection={false}>
        <Hero />
      </SectionWrapper>
      
      <SectionWrapper id="services" primaryColor="blue">
        <Services />
      </SectionWrapper>
      
      <SectionWrapper id="portfolio" primaryColor="blue">
        <Portfolio />
      </SectionWrapper>
      
      <SectionWrapper id="contact" primaryColor="blue" showBottomConnection={false}>
        <Contact />
      </SectionWrapper>
    </main>
  )
}