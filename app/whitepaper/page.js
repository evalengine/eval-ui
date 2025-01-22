"use client";
import { cn } from "@/lib/utils";

export default function Page() {
  return (
    <main className={cn("flex flex-col flex-shrink-0 flex-grow")}>
      <div className="flex-grow mx-auto max-w-3xl flex flex-col items-center justify-center pb-20">
        <div className="w-full py-16">
          <div className="mx-auto max-w-screen-md w-full">
            <h1 className="font-display text-center text-3xl font-extrabold leading-[1.15] sm:text-5xl sm:leading-[1.15]">
              EVAL Engine Whitepaper
            </h1>
            <p className="mt-3 text-sm text-center text-gray-200">
              LitePaper from Johnson Lai, Prem Kumar at Chromia Team
            </p>
          </div>
        </div>

        <article className="prose-headings:font-display prose prose-invert prose-zinc text-white max-w-none transition-all prose-headings:relative prose-headings:scroll-mt-20 prose-headings:font-semibold">
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
            evaluation of AI agent performance. The system incorporates
            LLM-as-a-judge and social engagement metrics for continuous
            reinforcement learning via feedback loop and reward system.
          </p>
          <p>
            We demonstrate EvalEngine can achieve efficient, secure evaluations
            while adapting to evolving performance standards through
            engagement-driven feedback loops.
          </p>
          <p>
            We also present a comprehensive roadmap for the development of
            EvalEngine, including API development, data preparation, model
            development, and model deployment.
          </p>
          <div>
            <h2>Introduction</h2>
            <p>
              We saw Crypto x AI Agent taking off in the space of Crypto Twitter
              (CT), particularly on the social aspect of things. But most AI
              that weve seen dont even have evaluation metrics. Its just pure
              hallucination, and you are not able to evaluate whether it is able
              to perform well.
            </p>
            <div>
              <h2>Key Challenges</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>Lack of real-time verification capabilities</li>
                <li>
                  High computational cost to store evaluation data unreliably
                  due to gas fees
                </li>
                <li>Absence of continuous learning mechanisms</li>
                <li>Limited integration with engagement metrics</li>
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
            EvalEngine addresses these challenges head-on with a decentralized
            system specifically designed for real-time, cost-effective, and
            transparent evaluations. Built on Chromias gas-free relational
            blockchain, our framework unlocks efficient data storage while
            preserving immutability and traceability. By integrating LLM-based
            judgments, social engagement metrics, and continuous reinforcement
            learning strategies, EvalEngine enables a dynamic environment where
            AI agents—particularly crypto-native ones—can evolve and improve
            continuously.
          </p>
          <div>
            <h2>System Architecture</h2>
            <div>
              <h2>Data Format &amp; Ingestion Layer</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  Standardized APIs facilitate interoperability with different
                  AI agents, evaluation modules, and social media platforms.
                </li>
                <li>
                  Allows for quick retrieval of agent outputs, user feedback,
                  and third-party metrics.
                </li>
                <li>
                  Cleans and normalizes incoming data (e.g., raw tweets,
                  platform engagement stats) to ensure consistency before
                  evaluation.
                </li>
              </ul>
            </div>
            <div>
              <h2>EvalEngine: Evaluation Engine</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  The EvalEngine orchestrates multiple evaluators (e.g.,
                  classification models, LLM judges) to form a composite score
                  that reflects various performance metrics (accuracy,
                  creativity, factual correctness).
                </li>
                <li>
                  Each module executes asynchronously, enabling parallel
                  evaluation and reduced latency.
                </li>
                <li>
                  Final evaluation scores and relevant data are batched for
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
              manipulation through prompt injection and leaking. EvalEngine
              implements a robust multi-layer approach to ensure evaluation
              integrity:
            </p>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-2">
                  Multi-Model Evaluation Architecture
                </h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    Parallel evaluation using multiple specialized models, each
                    focused on distinct criteria (factual accuracy, creativity,
                    coherence)
                  </li>
                  <li>
                    Weighted fusion of individual scores into a comprehensive
                    evaluation metric
                  </li>
                </ul>
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
              </div>
            </div>
          </div>
          <div>
            <h2>Evaluation Mathematics</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold mt-4">
                  Basic Weighted Average Evaluation
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
                  Each evaluation report on EvalEngine is paid for using $EVAL
                  tokens through a subscription model detailed in Chromia{" "}
                  <a
                    href="https://docs.chromia.com/ft4/backend/accounts/subscription"
                    className="text-blue-400 hover:text-blue-300 underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    FT4 documentation
                  </a>
                  . By tokenizing the cost per evaluation, the platform
                  seamlessly handles real-time user demand for evaluation
                  services.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold">
                  Token Utility and Conversion
                </h3>
                <p className="mb-4">
                  EvalEngine uses $EVAL tokens to acquire $CHR when computational
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
              EvalEngine continually refines its AI evaluation capabilities,
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
        </article>
      </div>
    </main>
  );
}
