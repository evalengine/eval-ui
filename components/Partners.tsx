import { 
  Building2, 
  Network, 
  Shield, 
  Cpu,
  Globe,
  Blocks
} from 'lucide-react';

const partners = [
  {
    icon: <Building2 className="w-12 h-12 text-purple-400" />,
    name: "Enterprise Solutions",
    link: "https://example.com/enterprise"
  },
  {
    icon: <Network className="w-12 h-12 text-purple-400" />,
    name: "Research Institutions",
    link: "https://example.com/research"
  },
  {
    icon: <Shield className="w-12 h-12 text-purple-400" />,
    name: "Security Firms",
    link: "https://example.com/security"
  },
  {
    icon: <Cpu className="w-12 h-12 text-purple-400" />,
    name: "AI Companies",
    link: "https://example.com/ai"
  },
  {
    icon: <Globe className="w-12 h-12 text-purple-400" />,
    name: "Global Networks",
    link: "https://example.com/global"
  },
  {
    icon: <Blocks className="w-12 h-12 text-purple-400" />,
    name: "Blockchain Partners",
    link: "https://example.com/blockchain"
  }
];

export default function Partners() {
  return (
    <section id="partners" className="pt-20 pb-8 px-4 relative overflow-hidden bg-black">
      <div className="container mx-auto relative z-10">
        <h2 className="text-5xl md:text-7xl font-bold mb-16 text-center">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
            Our Partners
          </span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {partners.map((partner, index) => (
            <div 
              key={index} 
              className="glossy glossy-hover p-8 rounded-xl transition-all duration-300 hover:scale-105 border border-purple-500/10 flex flex-col items-center text-center"
            >
              <a href={partner.link} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center">
                <div className="mb-6 transform hover:scale-110 transition-transform">{partner.icon}</div>
                <h3 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
                  {partner.name}
                </h3>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
