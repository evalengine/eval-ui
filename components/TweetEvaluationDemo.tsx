import { EvaluationModal } from "'./EvaluationModal'"

const evaluationData = {
  "id": 26,
  "tweet_id": "9e01b9fc-6949-48d1-91ba-e49805dd3a4c",
  "original_tweet": "Start 2025 strong anon 💪 After 10+ viral mega-threads on AI agents (1M+ impressions last month alone) I'm dropping the Ultimate Guide They Don't Want You to See 🤖 From beginner advanced. No fluff. Pure alpha. Dropping all knowledge for free 🧵 https://t.co/UFBMKXKeWT",
  "responded_tweet": "I would love to see this thread in action! Tell me more about",
  "truth_score": 75,
  "accuracy_score": 85,
  "creativity_score": 65,
  "engagement_score": 85,
  "truth_rationale": "The response is positive and shows interest in the original tweet's subject matter, but it lacks depth addressing specifics of guide being offered. It could have included a question about content or release date to better align with intent sharing knowledge. Overall, captures excitement misses some informative aspects.",
  "accuracy_rationale": "The response is accurate in that it acknowledges the original tweet's announcement and expresses a desire for further details. However, does not provide any additional information or context about guide itself, which could have enhanced response. Overall, positive relevant engagement with tweet.",
  "creativity_rationale": "The score reflects a decent level of engagement and interest in the original tweet, but response is quite standard does not showcase much creativity or individuality. A more personalized imaginative would have elevated score.",
  "engagement_rationale": "The response effectively engages with the original tweet by showing interest and asking for more information, which can encourage poster to elaborate further. use of \I would love see this thread in action!\ serves as an emotional trigger, expressing eagerness excitement. However, it could be improved including a specific question or personal anecdote related topic, deepen engagement invite interaction.",
  "engagement_improvement_tips": "To enhance engagement potential, the responded tweet could include a specific question about content of guide, such as \What are some key takeaways you think will surprise us?\ or share personal experience related to AI agents. This would not only show interest but also encourage more detailed response from original poster.",
  "recommended_response": "What part of AI agents are you most curious about? Can't wait to dive into this guide with you! Share your thoughts and let's explore together!",
  "final_score": 77.5,
  "created_at": "2025-01-04T13:41:45.092549+00:00",
  "updated_at": "2025-01-04T13:41:45.092549+00:00"
}

export function TweetEvaluationDemo() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Tweet Evaluation Demo</h1>
      <EvaluationModal result={evaluationData} />
    </div>
  )
}

