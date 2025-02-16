export interface Models {
    timestamp: string;
    models: {
        [key: string]: ModelMetrics;
    };
}

export interface ModelMetrics {
    overall_performance: {
        score: number;
        total_questions: number;
        correct_answers: number;
    };
    costs: {
        input: number;
        output: number;
        total: number;
    };
    speed: {
        tokens_per_second: number;
    };
    category_performance: {
        ai_llm: number;
        blockchain_fundamentals: number;
        cryptocurrency_history: number;
        defi: number;
        instruction_following: number;
        layer2_and_scaling: number;
        nft: number;
        platform_specific: number;
        security_and_privacy: number;
        technical_implementation: number;
        trading_and_finance: number;
    };
    source_performance: {
        chromia: number;
        instruction_following: number;
        swim_test_level_1: number;
    };
    last_updated: string;
}


export interface ModelComparison {
    timestamp: string;
    metrics: string[];
    results: ModelResult[];
}

interface ModelResult {
    model: string;
    overall_score: number;
    tokens_per_second: number;
    total_cost: number;
}

// Type guard to ensure all metrics are present in results
type ValidMetrics = 'overall_score' | 'tokens_per_second' | 'total_cost';
type MetricsArray = ValidMetrics[];

// Ensure type safety for the metrics array
type EnsureValidMetrics<T extends string[]> = T extends MetricsArray ? T : never;


interface ModelCosts {
    input: number;
    output: number;
    total: number;
}

interface ModelInfo {
    model: string;
    costs: ModelCosts;
    speed: number;
    score: number;
}

export interface ModelStats {
    total_models: number;
    models: ModelInfo[];
    timestamp: string;
}