import { Icons } from "@/components/icons";
import {
  BrainIcon,
  CodeIcon,
  GlobeIcon,
  PlugIcon,
  UsersIcon,
  ZapIcon,
} from "lucide-react";

export const BLUR_FADE_DELAY = 0.15;

export const siteConfig = {
  name: "EVAL Engine",
  description: "",
  cta: "Evaluate",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  keywords: [
    "EVAL Engine",
    "Multi-Agent Systems",
    "Tool Integration",
    "Workflow Automation",
  ],
  links: {
    email: "support@aiagentsdk.com",
    twitter: "https://twitter.com/aiagentsdk",
    discord: "https://discord.gg/aiagentsdk",
    github: "https://github.com/aiagentsdk",
    instagram: "https://instagram.com/aiagentsdk",
  },
  header: [
    {
      href: "/playground/tweets",
      label: "Evaluate Reply Tweet",
    },
    {
      href: "/playground/virtuals",
      label: "Virtuals Sandbox",
    },
    {
      href: "/analytics",
      label: "Analytics",
    },
    {
      href: "/benchmarking",
      label: "Benchmarking",
    },
  ],
  hero: {
    title: "EVAL Engine",
    description:
      "EVAL Engine gives your AI agent a real performance score. We evaluate every interaction, record it on blockchain for proof.",
    cta: "Evaluate",
    ctaDescription: "Finally, a way to evaluate responses from your AI Agent.",
  },
  features: [
    {
      name: "Decentralized Evaluation Protocol",
      description:
        "Leverage our gas-free blockchain infrastructure powered by Chromia for transparent, immutable, and cost-effective AI agent evaluations.",
      icon: <BrainIcon className="h-6 w-6" />,
    },
    {
      name: "LLM-Powered Judges",
      description:
        "Access sophisticated evaluation metrics through our network of LLM judges, providing comprehensive assessments across multiple dimensions.",
      icon: <UsersIcon className="h-6 w-6" />,
    },
    {
      name: "Real-Time Social Feedback",
      description:
        "Integrate continuous learning from social engagement metrics, allowing your AI to evolve based on real-world performance and user interactions.",
      icon: <PlugIcon className="h-6 w-6" />,
    },
    {
      name: "Verifiable Results",
      description:
        "Every evaluation is cryptographically signed and stored on-chain, ensuring complete transparency and trustless verification.",
      icon: <GlobeIcon className="h-6 w-6" />,
    },
    {
      name: "Multi-Dimensional Assessment",
      description:
        "Evaluate various aspects of AI performance including tweet quality, response appropriateness, code generation, and custom metrics.",
      icon: <CodeIcon className="h-6 w-6" />,
    },
    {
      name: "Cost-Efficient Scaling",
      description:
        "Benefit from gas-free operations and efficient resource utilization, making large-scale AI evaluation economically viable.",
      icon: <ZapIcon className="h-6 w-6" />,
    },
  ],
  pricing: [
    {
      name: "Basic",
      price: { monthly: "$9", yearly: "$99" },
      frequency: { monthly: "month", yearly: "year" },
      description: "Perfect for individuals and small projects.",
      features: [
        "100 AI generations per month",
        "Basic text-to-image conversion",
        "Email support",
        "Access to community forum",
      ],
      cta: "Evaluate",
    },
    {
      name: "Pro",
      price: { monthly: "$29", yearly: "$290" },
      frequency: { monthly: "month", yearly: "year" },
      description: "Ideal for professionals and growing businesses.",
      features: [
        "1000 AI generations per month",
        "Advanced text-to-image conversion",
        "Priority email support",
        "API access",
        "Custom AI model fine-tuning",
        "Collaboration tools",
      ],
      cta: "Evaluate",
    },
    {
      name: "Enterprise",
      price: { monthly: "$999", yearly: "Custom" },
      frequency: { monthly: "month", yearly: "year" },
      description: "Tailored solutions for large organizations.",
      features: [
        "Unlimited AI generations",
        "Dedicated account manager",
        "24/7 phone and email support",
        "Custom AI model development",
        "On-premises deployment option",
        "Advanced analytics and reporting",
      ],
      popular: true,
      cta: "Evaluate",
    },
  ],
  footer: {
    socialLinks: [
      {
        icon: <Icons.github className="h-5 w-5" />,
        url: "https://github.com/evalengine",
      },
      {
        icon: <Icons.twitter className="h-5 w-5" />,
        url: "https://x.com/Eval_Engine ",
      },
    ],
    links: [
      // { text: "Privacy Policy", url: "/legal/privacy" },
      // { text: "Terms of Service", url: "/legal/terms" },
      // { text: "Contact", url: "#" },
      { text: "Docs", url: process.env.NEXT_PUBLIC_DOCS_URL! },
    ],
    bottomText: "© 2025 EVALEngine. All rights reserved.",
    brandText: "EVAL Engine",
  },

  testimonials: [
    {
      id: 1,
      text: "The EVAL Engine has revolutionized how we build intelligent systems. It's incredibly intuitive and powerful.",
      name: "Alice Johnson",
      company: "OpenMind Labs",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cG9ydHJhaXR8ZW58MHx8MHx8fDA%3D",
    },
    {
      id: 2,
      text: "We've significantly reduced development time for our AI projects using this SDK. The multi-agent feature is a game-changer.",
      name: "Bob Brown",
      company: "NeuralForge",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHBvcnRyYWl0fGVufDB8fDB8fHww",
    },
    {
      id: 3,
      text: "The cross-language support allowed us to seamlessly integrate AI agents into our existing tech stack.",
      name: "Charlie Davis",
      company: "CodeHarbor",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHBvcnRyYWl0fGVufDB8fDB8fHww",
    },
    {
      id: 4,
      text: "The EVAL Engine's tool integration feature has streamlined our workflow automation processes.",
      name: "Diana Evans",
      company: "AutomateX",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fHBvcnRyYWl0fGVufDB8fDB8fHww",
    },
    {
      id: 5,
      text: "The customizable agent behaviors have allowed us to create highly specialized AI solutions for our clients.",
      name: "Ethan Ford",
      company: "AICore",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fHBvcnRyYWl0fGVufDB8fDB8fHww",
    },
    {
      id: 6,
      text: "The EVAL Engine's efficiency features have significantly improved our system's performance and scalability.",
      name: "Fiona Grant",
      company: "ScaleAI",
      image:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDB8fHBvcnRyYWl0fGVufDB8fDB8fHww",
    },
    {
      id: 7,
      text: "The SDK's intuitive APIs have made it easy for our team to quickly prototype and deploy AI agent systems.",
      name: "George Harris",
      company: "RapidAI",
      image:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDR8fHBvcnRyYWl0fGVufDB8fDB8fHww",
    },
    {
      id: 8,
      text: "The EVAL Engine's multi-agent system has enabled us to build complex, collaborative AI solutions with ease.",
      name: "Hannah Irving",
      company: "CollabAI",
      image:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTJ8fHBvcnRyYWl0fGVufDB8fDB8fHww",
    },
    {
      id: 9,
      text: "The SDK's flexibility in integrating external tools has expanded our AI agents' capabilities tremendously.",
      name: "Ian Johnson",
      company: "FlexAI",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTZ8fHBvcnRyYWl0fGVufDB8fDB8fHww",
    },
    {
      id: 10,
      text: "The EVAL Engine's documentation and support have made our learning curve much smoother.",
      name: "Julia Kim",
      company: "DevAI",
      image:
        "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjR8fHBvcnRyYWl0fGVufDB8fDB8fHww",
    },
    {
      id: 11,
      text: "We've seen a significant boost in our AI's decision-making capabilities thanks to the EVAL Engine.",
      name: "Kevin Lee",
      company: "DecisionTech",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzB8fHBvcnRyYWl0fGVufDB8fDB8fHww",
    },
    {
      id: 12,
      text: "The SDK's multi-agent system has revolutionized our approach to complex problem-solving.",
      name: "Laura Martinez",
      company: "SolveX",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzZ8fHBvcnRyYWl0fGVufDB8fDB8fHww",
    },
    {
      id: 13,
      text: "The customization options in the EVAL Engine have allowed us to create truly unique AI solutions.",
      name: "Michael Chen",
      company: "UniqueAI",
      image:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODJ8fHBvcnRyYWl0fGVufDB8fDB8fHww",
    },
    {
      id: 14,
      text: "The efficiency of the EVAL Engine has significantly reduced our development time and costs.",
      name: "Natalie Wong",
      company: "FastTrackAI",
      image:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODh8fHBvcnRyYWl0fGVufDB8fDB8fHww",
    },
    {
      id: 15,
      text: "The cross-language support has made it easy for our diverse team to collaborate on AI projects.",
      name: "Oliver Smith",
      company: "GlobalAI",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTR8fHBvcnRyYWl0fGVufDB8fDB8fHww",
    },
  ],
};

export type SiteConfig = typeof siteConfig;
