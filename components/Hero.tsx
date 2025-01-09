import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link'

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-gray-950 to-black">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Badge */}
          <div className="flex justify-center mb-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-sm font-medium text-white/80">Revolutionizing AI Agents Evaluation</span>
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold text-center mb-6 animate-fade-in">
            <span className="inline-block bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
              EVA Engine
            </span>
          </h1>

          {/* Subheading */}
          <div className="text-xl sm:text-2xl md:text-3xl text-center mb-8 text-white/80 font-light">
            <span className="font-semibold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Evaluation Validation Architecture
            </span>
          </div>

          {/* Description */}
          <p className="text-lg sm:text-xl text-center mb-12 text-white/70 max-w-3xl mx-auto leading-relaxed">
            EVA Engine provides real, verifiable evaluation metrics for your AI agents. 
            Every interaction is evaluated and permanently recorded on the blockchain, 
            giving you indisputable proof of your AI&apos;s capabilities.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button className="group relative px-8 py-4 w-64 overflow-hidden rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium text-lg transition-all hover:shadow-[0_0_40px_8px_rgba(168,85,247,0.2)]">
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform" />
              <span className="relative flex items-center justify-center gap-2">
                Explore EVAEngine
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>

            <Link 
              href="/whitepaper" 
              className="relative px-8 py-4 w-64 rounded-xl border border-white/10 text-white/90 font-medium text-lg hover:bg-white/5 hover:border-white/20 transition-all text-center"
            >
              View Whitepaper
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
            {[
              {
                value: 'Multi-LLMs',
                label: 'Working together as weighted judges to provide comprehensive evaluation'
              },
              {
                value: '100%',
                label: 'Of evaluation data stored on-chain for transparency'
              },
              {
                value: '< 5s',
                label: 'Average scoring latency for real-time performance feedback'
              }
            ].map((stat, index) => (
              <div 
                key={index} 
                className="p-8 rounded-2xl bg-white/ border border-white/20 backdrop-blur-sm"
              >
                <div className="text-2xl text-center font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-center text-white/60">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;