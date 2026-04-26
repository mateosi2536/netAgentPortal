import Nav from './components/Nav'
import Hero from './components/Hero'
import WhatsAppDemo from './components/WhatsAppDemo'
import UseCases from './components/UseCases'
import Pricing from './components/Pricing'
import Faq from './components/Faq'
import Footer from './components/Footer'
import Grain from './components/ui/Grain'

export default function App() {
  return (
    <div className="relative min-h-screen bg-bg text-ink overflow-x-hidden">
      <Grain />
      <Nav />
      <main className="relative">
        <Hero />
        <WhatsAppDemo />
        <UseCases />
        <Pricing />
        <Faq />
      </main>
      <Footer />
    </div>
  )
}
