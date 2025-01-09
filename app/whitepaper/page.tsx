import React from 'react';
import styles from './whitepaper.module.css';

// Subcomponents for different sections
const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="mb-12">
    <h2 className="text-3xl font-semibold tracking-tight mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">{title}</h2>
    {children}
  </div>
);

export default function WhitepaperPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-950 to-black text-white pt-24 pb-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-semibold tracking-tight mb-8 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            EVA Engine Whitepaper
          </h1>

          <p className="text-sm text-white/60 mb-12 tracking-tight">
            LitePaper from Johnson Lai, Prem Kumar at Chromia Team
          </p>
          
          <div className={`prose prose-invert prose-lg max-w-none space-y-8 ${styles.prose}`}>
            <Section title="Abstract">
              <p>
                We present EVA Engine (Evaluation Validation Architecture), a decentralized framework for evaluating AI
                agents with a focus on crypto-native agents through verifiable real-time assessments and continuous learning capabilities.
              </p>
              <p>
                Our system utilizes Chromias gas-free relational blockchain architecture to enable transparent, immutable, and
                cost-effective evaluation of AI agent performance. The system incorporates LLM-as-a-judge and social
engagement metrics for continuous reinforcement learning via feedback loop and reward system.
              </p>
              <p>
                We demonstrate EvaEngine can achieve efficient, secure evaluations while adapting to evolving performance
                standards through engagement-driven feedback loops.
              </p>
              <p>
                We also present a comprehensive roadmap for the development of EvaEngine, including API development, data
                preparation, model development, and model deployment.
              </p>
            </Section>

            <Section title="Introduction">
              <p>
                We saw Crypto x AI Agent taking off in the space of Crypto Twitter (CT), particularly on the social aspect of
                things. But most AI that weve seen dont even have evaluation metrics. Its just pure hallucination, and you are
                not able to evaluate whether it is able to perform well.
              </p>
                
                <Section title="Key Challenges">
                    <ul className="list-disc pl-5 space-y-1">
                        <li>Lack of real-time verification capabilities</li>
                        <li>High computational cost to store evaluation data unreliably due to gas fees</li>
                        <li>Absence of continuous learning mechanisms</li>
                        <li>Limited integration with engagement metrics</li>
                    </ul>
                </Section>
            </Section>

            <Section title="Key Objectives">
              <ul className="list-disc pl-5 space-y-1">
                <li>Achieving real-time, on-chain verification of AI agent performance.</li>
                <li>Minimizing gas-related overhead through a gas-free, scalable relational blockchain.</li>
                <li>Building a continuous learning workflow that leverages social engagement metrics.</li>
                <li>Ensuring data integrity via double-signed transactions and robust smart contracts.</li>
              </ul>
            </Section>

            <p>
              EvaEngine addresses these challenges head-on with a decentralized system specifically designed for real-time,
              cost-effective, and transparent evaluations.
              Built on Chromias gas-free relational blockchain, our framework unlocks efficient data storage while preserving
              immutability and traceability. By integrating LLM-based judgments, social engagement metrics, and continuous
              reinforcement learning strategies, EvaEngine enables a dynamic environment where AI agents—particularly
              crypto-native ones—can evolve and improve continuously.
            </p>


            <Section title="System Architecture">
              <Section title="Data Format & Ingestion Layer">
                <ul className="list-disc pl-5 space-y-1">
                  <li>Standardized APIs facilitate interoperability with different AI agents, evaluation modules, and social media platforms.</li>
                  <li>Allows for quick retrieval of agent outputs, user feedback, and third-party metrics.</li>
                  <li>Cleans and normalizes incoming data (e.g., raw tweets, platform engagement stats) to ensure consistency before evaluation.</li>
                </ul>
              </Section>

              <Section title="EvaEngine: Evaluation Engine">
                <ul className="list-disc pl-5 space-y-1">
                  <li>The EvaEngine orchestrates multiple evaluators (e.g., classification models, LLM judges) to form a composite score that reflects various performance metrics (accuracy, creativity, factual correctness).</li>
                  <li>Each module executes asynchronously, enabling parallel evaluation and reduced latency.</li>
                  <li>Final evaluation scores and relevant data are batched for submission to Chromia gas-free blockchain.</li>
                </ul>
              </Section>

              <Section title="Storage & Smart Contract Layer">
                <ul className="list-disc pl-5 space-y-1">
                  <li>Stores evaluation results in a structured table-based format.</li>
                  <li>Relational indexing allows for advanced queries, efficient retrieval, and scalable data operations.</li>
                  <li>Both the AI agent and the evaluation service provider must sign off on each transaction to ensure mutual transparency and accountability.</li>
                </ul>
              </Section>

              <Section title="Engagement Evaluation Module">
                <ul className="list-disc pl-5 space-y-1">
                  <li>Ingests real-time engagement data from Twitter (likes, retweets, commentary) to gauge public reception.</li>
                  <li>Uses these metrics to dynamically adjust weighting factors in the multi-evaluation engine.</li>
                  <li>Incorporates user feedback and on-chain predictions into a long-term reinforcement learning algorithm.</li>
                </ul>
              </Section>

              <Section title="Continuous Evaluation & Reinforcement Learning">
                <ul className="list-disc pl-5 space-y-1">
                  <li>Submitted evaluations feed additional insights into the AI Agents model, refining future performance outputs.</li>
                  <li>Performance thresholds arent static; they evolve based on community engagement and empirical performance data.</li>
                </ul>
              </Section>
            </Section>


            <Section title="Evaluation Technicalities">
              <p className="mb-4">
                Traditional single-prompt scoring systems are vulnerable to manipulation through prompt injection and leaking.
                EvaEngine implements a robust multi-layer approach to ensure evaluation integrity:
              </p>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold mb-2">Multi-Model Evaluation Architecture</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Parallel evaluation using multiple specialized models, each focused on distinct criteria (factual accuracy, creativity, coherence)</li>
                    <li>Weighted fusion of individual scores into a comprehensive evaluation metric</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-2">Real-Time Engagement Analysis</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Integration of social signals (likes, shares, comments) for continuous evaluation refinement</li>
                    <li>Feedback loop for continuous improvement of evaluation criteria</li>
                  </ul>
                </div>
              </div>
            </Section>

            <Section title="Evaluation Mathematics">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold mt-4">Basic Weighted Average Evaluation</h3>
                  <p className="mb-4">
                    Let {'{'}𝑠𝑐₁, 𝑠𝑐₂, …, 𝑠𝑐ₙ{'}'} be individual scores from different evaluation criteria
                    (e.g., factual correctness, creativity, coherence) and {'{'}𝑤₁, 𝑤₂, …, 𝑤ₙ{'}'} be their
                    respective weights where Σ(𝑤ᵢ) = 1.
                  </p>
                  <p className="text-lg font-mono mb-2">𝑆 = Σ(𝑤ᵢ × 𝑠𝑐ᵢ), 𝑓𝑜𝑟 𝑖 = 1 𝑡𝑜 𝑁</p>
                  <p className="ml-4 text-gray-300">
                    Where:<br />
                    𝑠𝑐ᵢ = sub-score from the i-th model or criterion<br />
                    𝑤ᵢ = weighting factor reflecting importance of sub-score
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold mt-4">Engagement-Driven Feedback Loop</h3>
                  <p className="mb-4">
                    Real-time engagement metrics are incorporated through an engagement factor E:
                  </p>
                  <p className="text-lg font-mono mb-2">𝐸 = α𝑅 + β𝐿 + γ𝐶</p>
                  <p className="ml-4 text-gray-300">
                    Where:<br />
                    𝑅 = retweets, 𝐿 = likes, 𝐶 = comments<br />
                    α, β, γ = importance coefficients for each metric
                  </p>
                  
                  <p className="mt-4 mb-2">Dynamic weight adjustment:</p>
                  <p className="text-lg font-mono mb-2">𝑤ᵢ = 𝑤ᵢ + (δ × 𝐸)</p>
                  <p className="ml-4 text-gray-300">
                    Where:<br />
                    δ = engagement impact factor<br />
                    𝑤ᵢ = adjusted weight after normalization
                  </p>

                  <p className="mt-4 mb-2">Final weighted score:</p>
                  <p className="text-lg font-mono mb-2">𝑆* = Σ(𝑤ᵢ × 𝑠𝑐ᵢ)</p>
                </div>
              </div>
            </Section>

            <Section title="Tokenomics">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold">$EVAL Token Overview</h3>
                  <p className="mb-4">
                    $EVAL is a fair launch project via Virtuals which will be bridge to Chromia as FT4 token down the road. How
                    $EVAL bridges to $CHR is detailed below:
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold">Account Creation Requirements</h3>
                  <p className="mb-4">
                    To set up a self-sovereign Evaluation Engine Account, users must hold a minimum of 10 $CHR. This
                    requirement creates an entry barrier that discourages spam and ensures that all registered accounts have a
                    stake in the network integrity.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold">Subscription Model in $EVAL</h3>
                  <p className="mb-4">
                    Each evaluation report on EvaEngine is paid for using $EVAL tokens through a subscription model detailed in
                    Chromia{' '}
                    <a 
                      href="https://docs.chromia.com/ft4/backend/accounts/subscription" 
                      className="text-blue-400 hover:text-blue-300 underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      FT4 documentation
                    </a>
                    . By tokenizing the cost per evaluation, the platform seamlessly handles real-time user demand for
                    evaluation services.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold">Token Utility and Conversion</h3>
                  <p className="mb-4">
                    EvaEngine uses $EVAL tokens to acquire $CHR when computational resources are required. This design
                    leverages Chromias gas-free architecture while maintaining a clear payment model. Because each evaluation is
                    properly backed by tokens (both in $EVAL and $CHR), the network remains secure, cost-effective, and
                    accessible for continuous AI evaluation needs.
                  </p>
                </div>
              </div>
            </Section>

            <Section title="Roadmap">
              <p className="mb-6">
                EvaEngine continually refines its AI evaluation capabilities, leverages decentralized data storage on Chromia,
                and integrates real-time social signals to maintain accuracy and adaptability.
              </p>

              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-bold">Phase 1: API Development</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Deploy evaluation APIs using Virtuals SDK for seamless integration with partner ecosystems</li>
                    <li>Develop custom endpoints for both public and partner access</li>
                    <li>Create intuitive frontend interface for:
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
                    <li>Implement ELT+L (Extract, Load, Transform + Load to Chromia) pipeline</li>
                    <li>Data processing workflow:
                      <ul className="list-circle pl-5 mt-1 space-y-1">
                        <li>Aggregate raw input from multiple sources</li>
                        <li>Clean and normalize user feedback and social signals</li>
                        <li>Process upvotes and engagement metrics</li>
                      </ul>
                    </li>
                    <li>Establish manual and automated labeling workflows for specific tasks</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold">Phase 3: Model Development</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Fine-tune lightweight open source AI models:
                      <ul className="list-circle pl-5 mt-1 space-y-1">
                        <li>Finetune Open Source Models on TogetherAI or any provider</li>
                        <li>Optimize for evaluation specific tasks</li>
                      </ul>
                    </li>
                    <li>Data integration:
                      <ul className="list-circle pl-5 mt-1 space-y-1">
                        <li>$GRASS UpVoteWeb dataset integration for engagement metrics</li>
                        <li>$Elfa.ai real-time data ingestion for source of truth</li>
                        <li>Custom data finetuning prepared by Chromia team</li>
                      </ul>
                    </li>
                    <li>Setup real-time engagement tracking system for:
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
                    <li>Hugging Face platform integration:
                      <ul className="list-circle pl-5 mt-1 space-y-1">
                        <li>Public access deployment</li>
                        <li>Community collaboration framework</li>
                        <li>Version control and model tracking</li>
                      </ul>
                    </li>
                    <li>Continuous improvement cycle:
                      <ul className="list-circle pl-5 mt-1 space-y-1">
                        <li>Global feedback integration</li>
                        <li>Dataset updates and refinement</li>
                        <li>Performance optimization</li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </Section>
            
          </div>
        </div>
      </div>
    </main>
  );
}
