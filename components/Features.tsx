import { 
  Network, 
  Brain,  
  LineChart,
  ShieldCheck,
  LayoutGrid,
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
    icon: <LayoutGrid className="w-12 h-12 text-purple-400" />,
    title: "Multi-Dimensional Assessment",
    description: "Evaluate various aspects of AI performance including tweet quality, response appropriateness, code generation, and custom metrics."
  },
  {
    icon: <Rocket className="w-12 h-12 text-purple-400" />,
    title: "Cost-Efficient Scaling",
    description: "Benefit from gas-free operations and efficient resource utilization, making large-scale AI evaluation economically viable."
  }
];

export default function Features() {
  return (
    <section id="features" className="pt-20 pb-8 px-4 relative overflow-hidden bg-black">
      <div className="container mx-auto relative z-10">
        <h2 className="text-5xl md:text-7xl font-bold mb-16 text-center">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
            Key Features
          </span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="glossy glossy-hover p-8 rounded-xl transition-all duration-300 hover:scale-105 border border-purple-500/10 flex flex-col items-center text-center"
            >
              <div className="mb-6 transform hover:scale-110 transition-transform">{feature.icon}</div>
              <h3 className="text-2xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
                {feature.title}
              </h3>
              <p className="text-lg text-[#F5EEEE]/80">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

