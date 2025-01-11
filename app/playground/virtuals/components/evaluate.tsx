"use client";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

import { Settings } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm, useFormContext } from "react-hook-form";
import { useModalWithProps } from "@/hooks/useModalWithProps";
import { useEffect } from "react";

interface EvaluationResult {
  id: number;
  tweet_id: string;
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
    improvement_tips: string;
  };
  recommended_response: string;
  final_score: number;
}

interface EvaluationModalProps {
  apiKey: string;
  inputTweet: string;
  outputTweet: string;
  onEvaluationComplete?: (result: EvaluationResult) => void;
}
import { useIsMutating } from "@tanstack/react-query";

export function Evaluate() {
  const evaluateTweet = useIsMutating({ mutationKey: ["evaluateTweet"] });

  return (
    <>
      <Button type="submit" variant="secondary" disabled={evaluateTweet > 0}>
        Simulate Reply
      </Button>
    </>
  );
}
