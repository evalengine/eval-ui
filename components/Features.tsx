import { 
  Network, 
  Brain,  
  LineChart,
  ShieldCheck,
  Rocket
} from 'lucide-react';

const features = [
  {
    icon: <Network className="w-12 h-12 text-purple-400" />,
    title: "Decentralized Evaluation Protocol",
    description: "Leverage our gas-free blockchain infrastructure powered by Chromia for transparent, immutable, and cost-effective AI agent evaluations."
  },
  {
    icon: <Brain className="w-12 h-12 text-purple-400" />,
    title: "LLM-Powered Judges",
    description: "Access sophisticated evaluation metrics through our network of LLM judges, providing comprehensive assessments across multiple dimensions."
  },
  {
    icon: <LineChart className="w-12 h-12 text-purple-400" />,
    title: "Real-Time Social Feedback",
    description: "Integrate continuous learning from social engagement metrics, allowing your AI to evolve based on real-world performance and user interactions."
  },
  {
    icon: <ShieldCheck className="w-12 h-12 text-purple-400" />,
    title: "Verifiable Results",
    description: "Every evaluation is cryptographically signed and stored on-chain, ensuring complete transparency and trustless verification."
  },
  {
    icon: <Rocket className="w-12 h-12 text-purple-400" />,
    title: "Cost-Efficient Scaling",
    description: "Benefit from gas-free operations and efficient resource utilization, making large-scale AI evaluation economically viable."
  },
  {
    icon: <ShieldCheck className="w-12 h-12 text-purple-400" />,
    title: "Trusted by reputable Partners",
    description: "EVA Engine is trusted by reputable partners, including Virtuals, Chromia, and other core contributors."
  }
];

export default function Features() {
  return (
    <section id="features" className="py-24 px-4 relative overflow-hidden bg-black">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-purple-500/10 via-transparent to-transparent opacity-50" />
      
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-semibold tracking-tight mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
              Key Features
            </span>
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group relative p-8 rounded-2xl bg-white/[0.02] border border-purple-500/10 
                        backdrop-blur-sm transition-all duration-300 hover:bg-white/[0.05]
                        hover:border-purple-500/20 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]
                        animate-fade-in-up"
              style={{
                animationDelay: `${index * 150}ms`
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 to-transparent opacity-0 
                            group-hover:opacity-100 transition-opacity rounded-2xl" />
              
              <div className="relative">
                <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-semibold mb-4 bg-clip-text text-transparent 
                             bg-gradient-to-r from-purple-400 to-blue-500 tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-base md:text-lg text-white/70 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

