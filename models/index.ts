export type TweetEvaluation = {
    id: number;
    original_tweet: string;
    responded_tweet: string;
    truth: {
        score: number;
        rationale: string;
    };
    accuracy: {
        score: number;
        rationale: string;
    };
    creativity: {
        score: number;
        rationale: string;
    };
    engagement: {
        score: number;
        rationale: string;
    };
    final_score: number;
    recommended_response: string;
    created_at: string; // ISO timestamp
    updated_at: string; // ISO timestamp
};