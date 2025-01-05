import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { evaBaseUrl } from "@/lib/evaApi"
import { Button } from "../ui/button"
import { useToast } from "@/components/ui/toast"
import { useMutation } from "@tanstack/react-query"

interface EvaluationResult {
    id: number
    tweet_id: string
    original_tweet: string
    responded_tweet: string
    truth: {
        score: number
        rationale: string
    }
    accuracy: {
        score: number
        rationale: string
    }
    creativity: {
        score: number
        rationale: string
    }
    engagement: {
        score: number
        rationale: string
        improvement_tips: string
    }
    recommended_response: string
    final_score: number
}

interface EvaluationModalProps {
    apiKey: string
    inputTweet: string
    outputTweet: string
    onEvaluationComplete?: (result: EvaluationResult) => void
}

export function EvaluationModal({ apiKey, inputTweet, outputTweet, onEvaluationComplete }: EvaluationModalProps) {
    const [open, setOpen] = useState(false)
    const { addToast } = useToast()
    const [result, setResult] = useState<EvaluationResult | null>(null)

    const evaluateMutation = useMutation({
        mutationFn: async () => {
            const formData = new URLSearchParams();
            formData.append('input_tweet', inputTweet);
            formData.append('output_tweet', outputTweet);

            const response = await fetch(`${evaBaseUrl}/api/eval/evaluate-tweet`, {
                method: "POST",
                headers: {
                    "accept": "application/json",
                    "X-API-Key": apiKey,
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Failed to evaluate tweet');
            }

            const data = await response.json();
            return data as EvaluationResult;
        },
        onSuccess: (data) => {
            setResult(data);
            onEvaluationComplete?.(data);
            addToast("Successfully evaluated reply", "success");
            setOpen(true);
        },
        onError: (error: Error) => {
            addToast(`Error evaluating reply: ${error.message}`, "error");
        }
    });

    if (!result) {
        return (
            <Button
                variant="gradient"
                size="sm"
                onClick={() => evaluateMutation.mutate()}
                disabled={evaluateMutation.isPending}
            >
                {evaluateMutation.isPending ? "Evaluating..." : "Evaluate"}
            </Button>
        )
    }

    console.log(result)

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="gradient" size="sm">View Evaluation</Button>
            </DialogTrigger>
            <DialogContent className="w-[95vw] md:w-[90vw] lg:w-[85vw] xl:w-[80vw] max-w-7xl max-h-[90vh] md:max-h-[85vh] bg-black/95 border border-purple-500/20 backdrop-blur-xl overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">Tweet Evaluation Report</DialogTitle>
                </DialogHeader>
                <div className="space-y-6 p-4 md:p-6">
                    {/* Overall Score Card - Prominently displayed at top */}
                    <Card className="bg-black/50 border border-[var(--purple)]/30">
                        <CardHeader>
                            <CardTitle className="text-xl md:text-2xl text-center text-[var(--purple)]">Overall Performance</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col items-center">
                            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-[var(--purple)]/30 flex items-center justify-center mb-4 bg-black/70">
                                <p className="text-3xl md:text-4xl font-bold text-[var(--off-white)]">{result.final_score.toFixed(1)}</p>
                            </div>
                            <Progress
                                value={result.final_score}
                                className="mb-2 h-2.5 bg-gradient-to-r from-purple-900/30 to-purple-700/30 rounded-lg overflow-hidden"
                                indicatorClassName="bg-gradient-to-r from-purple-500 to-purple-300 transition-all duration-500 ease-in-out shadow-[0_0_8px_rgba(168,85,247,0.3)]"
                            />
                            <div className="text-center space-y-4 max-w-2xl">
                                <p className="text-base md:text-lg font-medium text-[var(--purple)]">Suggested Response</p>
                                <p className="text-sm md:text-base text-white">{result.recommended_response}</p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Tweet Content Card */}
                    <Card className="bg-black/50 border border-purple-500/20">
                        <CardHeader>
                            <CardTitle className="text-purple-400">Tweet Exchange</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <p className="font-medium text-purple-400">Original Tweet</p>
                                <p className="mt-1 text-sm md:text-base text-[#F5EEEE]/80 p-3 bg-black/30 rounded">{result.original_tweet}</p>
                            </div>
                            <div>
                                <p className="font-medium text-purple-400">Your Response</p>
                                <p className="mt-1 text-sm md:text-base text-[#F5EEEE]/80 p-3 bg-black/30 rounded">{result.responded_tweet}</p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Detailed Scores Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {Object.entries({
                            truth: result.truth,
                            accuracy: result.accuracy,
                            creativity: result.creativity,
                            engagement: result.engagement
                        }).map(([category, data]) => (
                            <Card key={category} className="bg-black/50 border border-purple-500/20">
                                <CardHeader className="p-3 md:p-4">
                                    <CardTitle className="capitalize text-sm text-purple-400">{category}</CardTitle>
                                </CardHeader>
                                <CardContent className="p-3 md:p-4 pt-0">
                                    <Progress
                                        value={data.score}
                                        className="mb-2 h-2.5 bg-gradient-to-r from-purple-900/30 to-purple-700/30 rounded-lg overflow-hidden"
                                        indicatorClassName="bg-gradient-to-r from-purple-500 to-purple-300 transition-all duration-500 ease-in-out shadow-[0_0_8px_rgba(168,85,247,0.3)]"
                                    />
                                    <p className="text-lg md:text-xl font-bold text-[#F5EEEE]">{data.score}</p>
                                    <div
                                        className="mt-2 text-xs md:text-sm text-[#F5EEEE]/60 hover:text-[#F5EEEE]/80 transition-all duration-200 cursor-pointer"
                                        onClick={(e) => {
                                            const target = e.currentTarget;
                                            const isExpanded = target.classList.contains('expanded');
                                            if (isExpanded) {
                                                target.textContent = data.rationale.substring(0, 60) + '...';
                                                target.classList.remove('expanded');
                                            } else {
                                                target.textContent = data.rationale;
                                                target.classList.add('expanded');
                                            }
                                        }}
                                    >
                                        {data.rationale.substring(0, 60)}...
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
