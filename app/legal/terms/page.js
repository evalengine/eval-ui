"use client";
import { cn } from "@/lib/utils";

export default function Page() {
    return (
        <main className={cn("flex flex-col flex-shrink-0 flex-grow")}>
            <div className="flex-grow mx-auto max-w-3xl flex flex-col items-center justify-center pb-20">
                <div className="py-16">
                    <div className="mx-auto max-w-screen-md px-4 sm:px-6 lg:px-8">
                        <h1 className="font-display text-center text-3xl font-extrabold leading-[1.15] sm:text-5xl sm:leading-[1.15]">
                            Eva Engine Terms
                        </h1>
                    </div>
                </div>

                <article className="prose-headings:font-display prose prose-invert prose-zinc text-white max-w-none transition-all prose-headings:relative prose-headings:scroll-mt-20 prose-headings:font-semibold">
                    <p>
                        <a href="https://vercel.com">Vercel</a> develops products and
                        features designed to help developers rapidly create their next
                        website or project. Our innovative tools harness the latest
                        advancements in AI technology to provide a seamless and accelerated
                        development experience. This Policy outlines Vercel's approach to
                        responsibly developing, deploying, and using artificial intelligence
                        ("AI") in our products and services, including Vercel's v0
                        (available at: <a href="https://v0.dev/">https://v0.dev/</a>) and AI
                        SDK (available at:{" "}
                        <a href="https://sdk.vercel.ai/">https://sdk.vercel.ai/</a>)
                        (collectively, "AI Products"). You may select or purchase offerings
                        from third parties through Vercel's{" "}
                        <a href="https://vercel.com/marketplace">Marketplace</a>,{" "}
                        <a href="https://vercel.com/ai-integrations">AI Integrations</a>, or
                        other similar services, which are not covered by this Policy.
                    </p>
                    <a
                        href="#vercels-ai-products-and-your-data"
                        className="no-underline hover:underline"
                    >
                        <h2 id="vercels-ai-products-and-your-data">
                            Vercel's AI Products and Your Data
                        </h2>
                    </a>
                    <p>
                        Vercel's AI Products consist of tools that help users generate code
                        and user interfaces, improve their technical skills, and build,
                        debug, and ship web applications, including through a generative
                        chat assistant. These AI Products enhance user productivity and
                        improve the development experience from the initial stages of
                        project conception to the final stages of deployment.
                    </p>
                    <p>
                        We take our responsibility seriously to protect user data and be
                        transparent about how such data is used. User input and prompt
                        content, queries, ratings, and/or other interactions with user
                        generations and other output may be used by Vercel (and as
                        applicable, our{" "}
                        <a href="https://vercel.com/docs/third-party-service-providers">
                            Third-Party Service Providers'
                        </a>{" "}
                        models) to generate outputs. Such content may also be used by
                        Vercel's (but not by third parties') models and learning systems to
                        improve our AI Products and provide more accurate and relevant
                        recommendations to our users. Users can opt out of training our AI
                        Products by purchasing the appropriate subscription. Vercel does not
                        use customer source code or content hosted on Vercel's platform
                        services to train, improve, or fine tune any of the models used in
                        Vercel's AI Products.
                    </p>
                    <a href="#acceptable-use" className="no-underline hover:underline">
                        <h2 id="acceptable-use">Acceptable Use</h2>
                    </a>
                    <p>
                        Vercel's AI Products are intended to provide tailored responses to
                        users' prompts and queries. Due to the nature of AI products,
                        responses may not be unique to you and may be similar to output
                        provided to other users. Our AI Products are not intended for, and
                        users shall not use the AI Products for the following:
                    </p>
                    <ul>
                        <li>Illegal or malicious activity;</li>
                        <li>
                            Fraudulent, deceptive, or impersonating behavior, including but
                            not limited to creation or dissemination of misinformation,
                            deepfakes, or phishing content;
                        </li>
                        <li>
                            Creating defamatory, obscene, tortious, abusive, threatening or
                            harassing content;
                        </li>
                        <li>Hate speech;</li>
                        <li>Spam, content-farm, or click-bait activity or content;</li>
                        <li>
                            Creating content that is, or is intended to be, disseminated in
                            electoral campaigns;
                        </li>
                        <li>
                            Creating content that encourages violence, terrorism, or other
                            serious harms;
                        </li>
                        <li>
                            Prompt injection, or any attempt to discover Vercel's AI Products'
                            or other Vercel products' source code;
                        </li>
                        <li>
                            Representing that output is human-generated without reliance on
                            AI;
                        </li>
                        <li>Violation of intellectual property rights;</li>
                        <li>
                            "High-risk" areas, as defined under applicable AI legislation
                            (e.g, the EU AI Act);
                        </li>
                        <li>
                            Creating and/or disseminating age-inappropriate, sexualized,
                            and/or harmful content to, relating to, or about minors;
                        </li>
                        <li>
                            Compromising your privacy rights or the privacy rights of others,
                            for example by submitting personal information as input in
                            violation of privacy laws;
                        </li>
                        <li>Developing or advancing facial recognition databases;</li>
                        <li>
                            Making inferences about personal characteristics of a real person
                            based on biometric data;
                        </li>
                        <li>
                            Any other use that would violate Vercel's{" "}
                            <a href="https://vercel.com/docs/policies">
                                standard published policies
                            </a>
                            , <a href="https://vercel.com/guidelines">guidelines</a>, codes of
                            conduct (i.e.,{" "}
                            <a href="https://vercel.com/community">community</a>), and/or any
                            other contract you have with Vercel.
                        </li>
                    </ul>
                    <p>
                        If you have any questions around acceptable use, wish to report
                        misuse of Vercel's AI Products, or discover that an output is
                        inaccurate or harmful, please submit a report at{" "}
                        <a href="https://vercel.com/abuse">https://vercel.com/abuse</a>. To
                        report suspected copyright infringement, please refer to our{" "}
                        <a href="https://vercel.com/docs/dmca">DMCA Policy</a>.
                    </p>
                    <a href="#ai-usage-at-vercel" className="no-underline hover:underline">
                        <h2 id="ai-usage-at-vercel">AI Usage at Vercel</h2>
                    </a>
                    <p>
                        We are committed to providing customers the ability to deploy,
                        scale, and secure their frontend applications faster through
                        Vercel’s platform services.
                    </p>
                    <p>
                        <strong>
                            Vercel’s platform services, such as the Developer Experience
                            Platform and Managed Infrastructure, do not incorporate any
                            commercial LLMs or “high risk” AI technologies.
                        </strong>
                    </p>
                    <p>
                        We leverage internal and third party AI technologies to assist with
                        (a) fraud and abuse prevention, (b) customer support services, and
                        (c) website search functionality. Customer account information,
                        service-generated information, and content of customer help or
                        support requests are used to provide and improve our fraud/abuse
                        detection, customer support, and search capabilities.
                    </p>
                    <h1>Security, Privacy, and Trust</h1>
                    <p>
                        Vercel strives to develop and deploy AI technologies and products
                        that align with ethical, moral, and legal standards, and to promote
                        a safe and respectful environment for all users. We are our own
                        customers and have high standards for AI safety within Vercel. When
                        using our AI Products, please note the following:
                    </p>
                    <ul>
                        <li>
                            Features that rely on third-party AI platforms will be disclosed
                            through a special marker, designation, hovering-enabled
                            explanatory note, codebase, or other form of notification as
                            determined by Vercel.
                        </li>
                        <li>
                            We collect, use, and process personal data as set forth in our{" "}
                            <a href="https://vercel.com/privacy">Privacy Notice</a>. Users can
                            contact us at{" "}
                            <a href="mailto:privacy@vercel.com">privacy@vercel.com</a> with
                            questions.
                        </li>
                        <li>
                            We periodically review and update our policies and procedures in
                            an effort to comply with applicable data protection regulations
                            and applicable industry standards.
                        </li>
                        <li>
                            We use reasonable measures designed to maintain the safety of
                            users and avoid harm to individuals. Vercel's design and
                            development process includes considerations for ethical and
                            security requirements with certain safeguards to prevent and
                            report misuse or abuse.
                        </li>
                    </ul>
                    <p>
                        The LLMs utilized by Vercel's AI Products are trained on human and
                        web-based content that may be inaccurate, biased, unverified, or
                        potentially harmful. We recommend using discretion when engaging
                        with our AI Products and reviewing any outputs or content before
                        public use.
                    </p>
                    <p>
                        Users of our AI Products should additionally adhere to the
                        following:
                    </p>
                    <ul>
                        <li>
                            Information generated from Vercel's AI Products should be reviewed
                            for accuracy, trustworthiness, and accountability to support AI
                            safety and mitigate the risk of unintended or unexpected
                            functionality.
                        </li>
                        <li>
                            Users should be transparent, providing individuals access to
                            appropriate information and resources about your use of Vercel's
                            AI Products based on their expected knowledge levels of AI.
                        </li>
                        <li>
                            Code output from Vercel's AI Products should be paired with human
                            review, where applicable, to ensure suitability for any commercial
                            use, and to mitigate risks of intellectual property infringement,
                            bugs, or disclosure of proprietary information.
                        </li>
                    </ul>
                    <a
                        href="#third-party-service-providers"
                        className="no-underline hover:underline"
                    >
                        <h2 id="third-party-service-providers">
                            Third-Party Service Providers
                        </h2>
                    </a>
                    <p>
                        We leverage various third-party providers to enhance our services,
                        and will continue to do so for our AI Products and other Vercel
                        services and features. Your use of Vercel's AI-enabled products and
                        services is also governed by the terms of use, codes of conduct, and
                        policies with these third-party service providers located on each
                        provider's websites. The current list of third-party AI providers
                        integrated into Vercel products is as follows:
                    </p>
                    <p>
                        <strong>AI Products</strong>
                    </p>
                    <ul>
                        <li>
                            <a href="https://openai.com/policies">OpenAI</a>
                        </li>
                        <li>
                            <a href="https://console.anthropic.com/legal/terms">Anthropic</a>
                        </li>
                        <li>
                            <a href="https://learn.microsoft.com/en-us/legal/cognitive-services/openai/data-privacy">
                                Azure Cognitive Services
                            </a>
                        </li>
                        <li>
                            <a href="https://aws.amazon.com/service-terms/">AWS Bedrock</a>
                        </li>
                        <li>
                            <a href="https://cohere.com/terms-of-use">Cohere</a>
                        </li>
                        <li>
                            <a href="https://elevenlabs.io/terms">ElevenLabs</a>
                        </li>
                        <li>
                            <a href="https://fireworks.ai/terms-of-service">Fireworks</a>
                        </li>
                        <li>
                            <a href="https://policies.google.com/terms/generative-ai">
                                Google
                            </a>
                        </li>
                        <li>
                            <a href="https://wow.groq.com/terms-and-conditions/">Groq</a>
                        </li>
                        <li>
                            <a href="https://huggingface.co/terms-of-service">Hugging Face</a>
                        </li>
                        <li>
                            <a href="https://www.facebook.com/policies_center">Meta AI</a>
                        </li>
                        <li>
                            <a href="https://mistral.ai/terms/">Mistral</a>
                        </li>
                        <li>
                            <a href="https://www.monterey.ai/terms-of-service">Monterey.ai</a>
                        </li>
                        <li>
                            <a href="https://www.perplexity.ai/hub/legal/terms-of-service">
                                Perplexity
                            </a>
                        </li>
                        <li>
                            <a href="https://replicate.com/terms">Replicate</a>
                        </li>
                    </ul>
                    <p>
                        <strong>Vercel Core Products</strong>
                    </p>
                    <ul>
                        <li>
                            <a href="https://markprompt.com/legal/terms">Markprompt</a>{" "}
                            (customer support services)
                        </li>
                        <li>
                            <a href="https://sift.com/legal-and-compliance">Sift</a> (fraud
                            and abuse prevention)
                        </li>
                        <li>
                            <a href="https://openai.com/policies">OpenAI</a> (Language
                            detection for domain name registrations)
                        </li>
                    </ul>
                    <a href="#compliance" className="no-underline hover:underline">
                        <h2 id="compliance">Compliance</h2>
                    </a>
                    <p>
                        Any violation of this AI Policy or any Vercel policies or terms of
                        service may result in suspension or termination of use of Vercel’s
                        services at Vercel's sole discretion. We review and update this AI
                        Policy periodically with information about Vercel's use of AI.
                    </p>
                    <p>
                        If you have any questions about this Policy, please reach out to{" "}
                        <a href="mailto:privacy@vercel.com">privacy@vercel.com</a>.
                    </p>
                    <a href="#footnotes" className="no-underline hover:underline">
                        <h2 id="footnotes">Footnotes</h2>
                    </a>
                    <p>
                        1: “High risk” refers to an AI system that is used as a safety
                        component of a product or an AI product that is covered by the EU AI
                        Act. A list of areas where AI systems may be deemed “high risk” can
                        be found{" "}
                        <a href="https://artificialintelligenceact.eu/annex/3/">here</a>.
                    </p>
                </article>
            </div>
        </main>
    );
}
