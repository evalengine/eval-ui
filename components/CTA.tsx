import { Button } from "@/components/ui/button"

export default function CTA() {
  return (
    <div className="py-16 px-4 bg-black">
      <div className="container mx-auto relative">
        <div className="rounded-3xl border border-purple-500/10 bg-black/50 backdrop-blur-sm">
          <div className="px-8 py-16 text-center">
            <h2 className="text-4xl sm:text-6xl font-bold mb-8">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
                Ready to Revolutionize AI Evaluation?
              </span>
            </h2>
            <p className="text-xl sm:text-2xl mb-12 text-[#F5EEEE]/80 max-w-3xl mx-auto">
              Join the future of decentralized AI agent assessment with EVAEngine.
            </p>
            <Button className="glossy glossy-hover font-bold px-12 py-8 text-xl bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 transform hover:scale-105 transition-all">
              Playground
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

