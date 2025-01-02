import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden bg-gradient-to-b from-gray-950 to-black">
      <div className="container mx-auto text-center relative z-10 py-20">
        <h1 className="text-6xl md:text-8xl font-bold mb-8 text-[#FFF8F8] animate-fade-in">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
            EVA Engine
          </span>
        </h1>

        <p className="text-2xl md:text-3xl mb-16 max-w-4xl mx-auto text-[#FFF8F8]/90 leading-relaxed">
          <i className="font-bold bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
            EVA: Evaluation Validation Architecture
          </i>
          <br />
          <br />
          EVA Engine gives your AI agent a real performance score. We evaluate
          every interaction, record it on blockchain for proof.
          <br />
          <br />
          <strong>
            Finally, a way to show your AI agent is better than the rest.
          </strong>
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Button
            size="lg"
            variant="default"
            className="font-bold glossy glossy-hover w-72 py-8 text-xl bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 transform hover:scale-105 transition-all"
          >
            Explore EVAEngine
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="font-bold w-72 py-8 text-xl border-2 border-white/20 hover:bg-white/10 transform hover:scale-105 transition-all"
          >
            View Documentation
          </Button>
        </div>
      </div>
    </section>
  );
}
