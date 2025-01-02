import Header from "../components/Header"
import Hero from "../components/Hero"
import Features from "../components/Features"
import CTA from "../components/CTA"
import Footer from "../components/Footer"
import Partners from "@/components/Partners"

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-[#FFF8F8] relative overflow-hidden flex flex-col">
      <Header className="relative z-50" />
      <main className="flex-1 flex flex-col relative z-10">
        <Hero />
        <Features />
        <Partners />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}

