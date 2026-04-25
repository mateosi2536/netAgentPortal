import Nav from './components/Nav'
import Hero from './components/Hero'
import WhatsAppDemo from './components/WhatsAppDemo'
import Pipeline from './components/Pipeline'
import Features from './components/Features'
import Stack from './components/Stack'
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
        <Pipeline />
        <Features />
        <Stack />
        <Pricing />
        <Faq />
      </main>
      <Footer />
    </div>
  )
}
