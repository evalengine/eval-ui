"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";

const ModelCard = ({ name, stats }) => (
  <div className="p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-lg transition-shadow">
    <h3 className="text-lg font-semibold mb-4 text-center">{name}</h3>
    <div className="grid grid-cols-2 gap-4">
      <div className="text-center">
        <p className="text-sm text-gray-500">Average</p>
        <p className="text-xl font-bold">{stats.mean}s</p>
      </div>
      <div className="text-center">
        <p className="text-sm text-gray-500">Range</p>
        <p className="text-xl font-bold">{stats.min}-{stats.max}s</p>
      </div>
      <div className="text-center">
        <p className="text-sm text-gray-500">Std Dev</p>
        <p className="text-xl font-bold">{stats.std}</p>
      </div>
      <div className="text-center">
        <p className="text-sm text-gray-500">Median</p>
        <p className="text-xl font-bold">{stats.median}s</p>
      </div>
    </div>
  </div>
);

const models = [
  {
    name: 'DeepSeek R1 Distill LLaMA 70B',
    stats: {
      mean: 2.39,
      min: 1.94,
      max: 2.94,
      std: 0.29,
      median: 2.32
    }
  },
  {
    name: 'LLaMA 3.1 8B Instant',
    stats: {
      mean: 0.56,
      min: 0.49,
      max: 0.70,
      std: 0.07,
      median: 0.53
    }
  }
];

export default function Page() {
  return (
    <main className={cn("flex flex-col flex-shrink-0 flex-grow")}>
      <div className="flex-grow mx-auto max-w-3xl flex flex-col items-center justify-center pb-20">
        <div className="w-full py-16">
          <div className="mx-auto max-w-screen-md w-full">
            <h1 className="font-display text-center text-4xl font-extrabold leading-[1.15] sm:text-6xl sm:leading-[1.15] bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              EVAL Engine LitePaper
            </h1>
            <p className="mt-3 text-sm text-center text-gray-200">
              drafted by <a href="https://x.com/jlwhoo7" className="text-blue-400 hover:text-blue-300" target="_blank" rel="noopener noreferrer">Johnson Lai</a> & <a href="https://x.com/defichemist95" className="text-blue-400 hover:text-blue-300" target="_blank" rel="noopener noreferrer">Prem Kumar</a>
            </p>
          </div>
        </div>

        <article className="prose-headings:font-display prose prose-invert prose-zinc text-white max-w-none transition-all prose-headings:relative prose-headings:scroll-mt-20 prose-headings:font-semibold prose-a:text-blue-400 hover:prose-a:text-blue-300">
          <h2>Abstract</h2>
          <p>
            We present EVAL Engine (Evaluation Validation Architecture), a
            decentralized framework for evaluating AI agents with a focus on
            crypto-native agents through verifiable real-time assessments and
            continuous learning capabilities.
          </p>
          <p>
            Our system utilizes Chromias gas-free relational blockchain
            architecture to enable transparent, immutable, and cost-effective
            evaluation of AI agent performance. The system incorporates multiple LLM-as-a-judge<sup><a href="#references">[1]</a></sup> and social engagement metrics for continuous
            reinforcement learning via feedback loop and reward system.
          </p>

          <p>
            We demonstrate EVAL Engine can achieve efficient, secure evaluations
            while adapting to evolving performance standards through
            engagement-driven feedback loops.
          </p>
          <p>
            We also present a comprehensive roadmap for the development of
            EVAL Engine, including API development, data preparation, model
            development, and model deployment.
          </p>
          <div>
            <h2>Introduction</h2>
            <p>
              We saw Crypto x AI Agent taking off in the space of Crypto Twitter
              (CT), particularly on the social aspect of things. But most AI
              that weve seen dont even have evaluation metrics.
              This creates a significant risk of hallucination - the generation of plausible yet factually unsupported content<sup><a href="#references">[2]</a></sup>.
              Without standardized evaluation metrics, it becomes challenging to verify the reliability and trustworthiness of these AI agents' outputs, particularly in the context of sensitive financial and cryptocurrency-related information
            </p>
            <div className="border-l-4 border-blue-400 pl-4 my-8">
              <h2>Key Challenges</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>Lack of real-time verification capabilities.</li>
                <li>
                  High computational cost to store evaluation data unreliably
                  due to gas fees.
                </li>
                <li>Absence of continuous learning mechanisms.</li>
                <li>Limited integration with engagement metrics.</li>
              </ul>
            </div>
          </div>
          <div>
            <h2>Key Objectives</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                Achieving real-time, on-chain verification of AI agent
                performance.
              </li>
              <li>
                Minimizing gas-related overhead through a gas-free, scalable
                relational blockchain.
              </li>
              <li>
                Building a continuous learning workflow that leverages social
                engagement metrics.
              </li>
              <li>
                Ensuring data integrity via double-signed transactions and
                robust smart contracts.
              </li>
            </ul>
          </div>
          <p>
            EVAL Engine addresses these challenges head-on with a decentralized
            system specifically designed for real-time, cost-effective, and
            transparent evaluations.
            <br />
            <br />
            Built on Chromias gas-free relational blockchain, our framework
            unlocks efficient data storage while preserving immutability and
            traceability.
            <br />
            <br />
            By integrating LLM-based judgments, social engagement metrics, and
            continuous reinforcement learning strategies, EVAL Engine enables a
            dynamic environment where AI agents—particularly crypto-native ones—
            can evolve and improve continuously.
          </p>
          <div>
            <h2>System Architecture</h2>

            <div className="relative w-full">
              <img
                src="/arch.png"
                alt="EVAL Engine Architecture"
                width="800"
                height="600"
                className="my-8 w-full h-auto rounded-lg shadow-lg"
                onError={(e) => {
                  console.error('Error loading image:', e);
                }}
              />
            </div>

            <div>
              <h2>Data Format &amp; Ingestion Layer</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  Standardized APIs facilitate interoperability with different
                  AI agents, evaluation modules, and social media platforms.
                </li>
                <li>
                  Allows for quick retrieval of AI Agent outputs and historical evaluation scores
                </li>
                <li>
                  Normalizes incoming data (e.g., raw tweets, platform engagement stats) to ensure consistency before evaluation.
                </li>
              </ul>
            </div>
            <div>
              <h2>EVAL Engine: Evaluation Engine</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  The EVAL Engine orchestrates multiple LLM evaluators to form a composite score
                  that reflects various performance metrics (accuracy,
                  creativity, truthfulnes and engagement).
                </li>
                <li>
                  Each LLM executes asynchronously, enabling parallel evaluation and reduced latency, powered by DSPy<sup><a href="#references">[6]</a></sup>
                </li>
                <li>
                  Final evaluation scores and relevant data are batched for submission to Chromia gas-free blockchain.
                  submission to Chromia gas-free blockchain.
                </li>
              </ul>
            </div>
            <div>
              <h2>Storage &amp; Smart Contract Layer</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  Stores evaluation results in a structured table-based format.
                </li>
                <li>
                  Relational indexing allows for advanced queries, efficient
                  retrieval, and scalable data operations.
                </li>
                <li>
                  Both the AI agent and the evaluation service provider must
                  sign off on each transaction to ensure mutual transparency and
                  accountability.
                </li>
              </ul>
            </div>
            <div>
              <h2>Engagement Evaluation Module</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  Ingests real-time engagement data from Twitter (likes,
                  retweets, commentary) to gauge public reception.
                </li>
                <li>
                  Uses these metrics to dynamically adjust weighting factors in
                  the multi-evaluation engine.
                </li>
                <li>
                  Incorporates user feedback and on-chain predictions into a
                  long-term reinforcement learning algorithm.
                </li>
              </ul>
            </div>
            <div>
              <h2>Continuous Evaluation &amp; Reinforcement Learning</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  Submitted evaluations feed additional insights into the AI
                  Agents model, refining future performance outputs.
                </li>
                <li>
                  Performance thresholds arent static; they evolve based on
                  community engagement and empirical performance data.
                </li>
              </ul>
            </div>
          </div>
          <div>
            <h2>Evaluation Technicalities</h2>
            <p className="mb-4">
              Traditional single-prompt scoring systems are vulnerable to
              manipulation through prompt injection and leaking. EVAL Engine
              implements a robust multi-layer approach to ensure evaluation
              integrity:
            </p>
            <img src="/maths.png" alt="EVAL Engine Architecture" width="300" height="300" className="my-8 w-full h-auto rounded-lg shadow-lg" />
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-2">
                  Multi-LLM Evaluation Engine
                </h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    Parallel evaluation using multiple specialized LLMs, each
                    focused on distinct criteria (truthfulness, creativity,
                    accuracy and engagement)
                  </li>
                  <li>
                    Our models are powered by Hyperbolic<sup><a href="#references">[4]</a></sup> and Groq<sup><a href="#references">[5]</a></sup> to serve instant open-source LLMs at low latency to keep our response time within industry standards. Different LLMs are used for different criteria to ensure accuracy and diversity. The image below shows average response time using our providers for some of the LLMs that is powering our EVAL Engine.
                    <br />
                    <br />
                    <b>Note:</b> The image below is not an exhaustive list of all the LLMs that we use, but just a few examples - average of 50 calls
                  </li>
                  <img src="/models.png" alt="EVAL Engine Architecture" width="800" height="600" className="my-8 w-full h-auto rounded-lg shadow-lg" />
                  
                </ul>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {models.map(model => (
                    <ModelCard key={model.name} {...model} />
                  ))}
                </div>

              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">
                  Real-Time Engagement Analysis
                </h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    Integration of social signals (likes, shares, comments) for
                    continuous evaluation refinement
                  </li>
                  <li>
                    Feedback loop for continuous improvement of evaluation
                    criteria
                  </li>
                </ul>
                <h3 className="text-xl font-bold mb-2">
                  On-Chain Storage
                </h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    Final evaluation outcomes and intermediate results are stored on Chromia's relational blockchain, guaranteeing transparency, verifiability, and historical traceability.
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div>
            <h2>Evaluation Mathematics</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold mt-4">
                  Weighted Average Evaluation
                </h3>
                <p className="mb-4">
                  Let {"{"}𝑠𝑐₁, 𝑠𝑐₂, …, 𝑠𝑐ₙ{"}"} be individual scores from
                  different evaluation criteria (e.g., factual correctness,
                  creativity, coherence) and {"{"}𝑤₁, 𝑤₂, …, 𝑤ₙ{"}"} be their
                  respective weights where Σ(𝑤ᵢ) = 1.
                </p>
                <p className="text-lg font-mono mb-2">
                  𝑆 = Σ(𝑤ᵢ × 𝑠𝑐ᵢ), 𝑓𝑜𝑟 𝑖 = 1 𝑡𝑜 𝑁
                </p>
                <p className="ml-4 text-gray-300">
                  Where:
                  <br />
                  𝑠𝑐ᵢ = sub-score from the i-th model or criterion
                  <br />
                  𝑤ᵢ = weighting factor reflecting importance of sub-score
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold mt-4">
                  Engagement-Driven Feedback Loop
                </h3>
                <p className="mb-4">
                  Real-time engagement metrics are incorporated through an
                  engagement factor E:
                </p>
                <p className="text-lg font-mono mb-2">𝐸 = α𝑅 + β𝐿 + γ𝐶</p>
                <p className="ml-4 text-gray-300">
                  Where:
                  <br />
                  𝑅 = retweets, 𝐿 = likes, 𝐶 = comments
                  <br />
                  α, β, γ = importance coefficients for each metric
                </p>
                <p className="mt-4 mb-2">Dynamic weight adjustment:</p>
                <p className="text-lg font-mono mb-2">𝑤ᵢ = 𝑤ᵢ + (δ × 𝐸)</p>
                <p className="ml-4 text-gray-300">
                  Where:
                  <br />δ = engagement impact factor
                  <br />
                  𝑤ᵢ = adjusted weight after normalization
                </p>
                <p className="mt-4 mb-2">Final weighted score:</p>
                <p className="text-lg font-mono mb-2">𝑆* = Σ(𝑤ᵢ × 𝑠𝑐ᵢ)</p>
              </div>
            </div>
          </div>
          <div>
            <h2>Tokenomics</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold">$EVAL Token Overview</h3>
                <p className="mb-4">
                  $EVAL is a fair launch project via Virtuals which will be
                  bridge to Chromia as FT4 token down the road. How $EVAL
                  bridges to $CHR is detailed below:
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold">
                  Account Creation Requirements
                </h3>
                <p className="mb-4">
                  To set up a self-sovereign Evaluation Engine Account, users
                  must hold a minimum of 10 $CHR. This requirement creates an
                  entry barrier that discourages spam and ensures that all
                  registered accounts have a stake in the network integrity.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold">
                  Subscription Model in $EVAL
                </h3>
                <p className="mb-4">
                  Each evaluation report on EVAL Engine is paid for using $EVAL
                  tokens through a subscription model<sup><a href="#references">[3]</a></sup>. By tokenizing the cost per evaluation, the platform
                  seamlessly handles real-time user demand for evaluation
                  services.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold">
                  Token Utility and Conversion
                </h3>
                <p className="mb-4">
                  EVAL Engine uses $EVAL tokens to acquire $CHR when computational
                  resources are required. This design leverages Chromias
                  gas-free architecture while maintaining a clear payment model.
                  Because each evaluation is properly backed by tokens (both in
                  $EVAL and $CHR), the network remains secure, cost-effective,
                  and accessible for continuous AI evaluation needs.
                </p>
              </div>
            </div>
          </div>
          <div>
            <h2>Roadmap</h2>
            <p className="mb-6">
              EVAL Engine continually refines its AI evaluation capabilities,
              leverages decentralized data storage on Chromia, and integrates
              real-time social signals to maintain accuracy and adaptability.
            </p>
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold">Phase 1: API Development</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    Deploy evaluation APIs using Virtuals SDK for seamless
                    integration with partner ecosystems
                  </li>
                  <li>
                    Develop custom endpoints for both public and partner access
                  </li>
                  <li>
                    Create intuitive frontend interface for:
                    <ul className="list-circle pl-5 mt-1 space-y-1">
                      <li>API access management</li>
                      <li>Evaluation history visualization</li>
                      <li>Performance metrics dashboard</li>
                    </ul>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold">Phase 2: Data Preparation</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    Implement ELT+L (Extract, Load, Transform + Load to Chromia)
                    pipeline
                  </li>
                  <li>
                    Data processing workflow:
                    <ul className="list-circle pl-5 mt-1 space-y-1">
                      <li>Aggregate raw input from multiple sources</li>
                      <li>
                        Clean and normalize user feedback and social signals
                      </li>
                      <li>Process upvotes and engagement metrics</li>
                    </ul>
                  </li>
                  <li>
                    Establish manual and automated labeling workflows for
                    specific tasks
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold">
                  Phase 3: Model Development
                </h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    Fine-tune lightweight open source AI models:
                    <ul className="list-circle pl-5 mt-1 space-y-1">
                      <li>
                        Finetune Open Source Models on TogetherAI or any
                        provider
                      </li>
                      <li>Optimize for evaluation specific tasks</li>
                    </ul>
                  </li>
                  <li>
                    Data integration:
                    <ul className="list-circle pl-5 mt-1 space-y-1">
                      <li>
                        $GRASS UpVoteWeb dataset integration for engagement
                        metrics
                      </li>
                      <li>
                        $Elfa.ai real-time data ingestion for source of truth
                      </li>
                      <li>Custom data finetuning prepared by Chromia team</li>
                    </ul>
                  </li>
                  <li>
                    Setup real-time engagement tracking system for:
                    <ul className="list-circle pl-5 mt-1 space-y-1">
                      <li>Social media likes and retweets</li>
                      <li>User comments and feedback</li>
                      <li>Performance metrics analysis</li>
                    </ul>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold">Phase 4: Model Deployment</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    Hugging Face platform integration:
                    <ul className="list-circle pl-5 mt-1 space-y-1">
                      <li>Public access deployment</li>
                      <li>Community collaboration framework</li>
                      <li>Version control and model tracking</li>
                    </ul>
                  </li>
                  <li>
                    Continuous improvement cycle:
                    <ul className="list-circle pl-5 mt-1 space-y-1">
                      <li>Global feedback integration</li>
                      <li>Dataset updates and refinement</li>
                      <li>Performance optimization</li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div>
            <h2>References</h2>
            <div className="space-y-4">
              <p id="references">
                [1] Zheng, L., et al. (2023). "Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena." [v4] <a href="https://arxiv.org/abs/2306.05685" className="text-blue-400 hover:text-blue-300 underline" target="_blank" rel="noopener noreferrer">arXiv:2306.05685</a>
              </p>
              <p>
                [2] Huang, L., et al. (2023). "A Survey on Hallucination in Large Language Models: Principles, Taxonomy, Challenges, and Open Questions." [v2] <a href="https://arxiv.org/abs/2311.05232" className="text-blue-400 hover:text-blue-300 underline" target="_blank" rel="noopener noreferrer">arXiv:2311.05232</a>
              </p>
              <p>
                [3] Chromia Documentation. "Subscription Fee Strategy." <a href="https://docs.chromia.com/ft4/backend/accounts/subscription" className="text-blue-400 hover:text-blue-300 underline" target="_blank" rel="noopener noreferrer">Chromia FT4 Documentation</a>
              </p>
              <p>
                [4] The Open Access AI Cloud <a href="https://hyperbolic.xyz/" className="text-blue-400 hover:text-blue-300 underline" target="_blank" rel="noopener noreferrer">Hyperbolic</a>
              </p>
              <p>
                [5] Platform for Fast AI Inference <a href="https://groq.com/" className="text-blue-400 hover:text-blue-300 underline" target="_blank" rel="noopener noreferrer">Groq</a>
              </p>
              <p>
                [6] Framework for programming—rather than prompting—language models <a href="https://dspy.ai/" className="text-blue-400 hover:text-blue-300 underline" target="_blank" rel="noopener noreferrer">Dspy</a>
              </p>
            </div>
          </div>
        </article>
      </div>
    </main>
  );
}
