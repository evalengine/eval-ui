"use client";

import { useEffect, useMemo, useState, useRef, useCallback } from "react";
import { Edit2, Save, ChevronRight, X } from "lucide-react";
import { useToast } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";
import { evaBaseUrl } from "@/lib/evaApi";
import { EvaluationModal } from "@/components/virtuals/EvaluationModal";
import { useKeys } from "@/components/Header";

interface EVENT_RESPONSE {
  [key: string]: any | null;
}

interface Metrics {
  score: number;
  rationale: string;
}

interface EvalResult {
  id: number;
  tweet_id: string;
  original_tweet: string;
  responded_tweet: string;
  truth: Metrics;
  accuracy: Metrics;
  creativity: Metrics;
  final_score: number;
  recommended_response: string;
  created_at: string;
  updated_at: string;
}

export default function VirtualsSandboxEval() {
  const { addToast } = useToast();
  const { apiKey, jwtToken } = useKeys();
  const [sessionId, setSessionId] = useState("");
  const [characterCard, setCharacterCard] = useState({
    name: "",
    goal: "",
    worldInfo: "",
    description: "",
    functions: [],
  });
  const [replyText, setReplyText] = useState("");
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationResponse, setSimulationResponse] = useState<
    EVENT_RESPONSE[]
  >([]);

  const [activeTab, setActiveTab] = useState<number>(0);
  const [editMode, setEditMode] = useState({
    goal: false,
    worldInfo: false,
    description: false,
  });
  const [editValues, setEditValues] = useState({
    goal: "",
    worldInfo: "",
    description: "",
  });
  const [evaluationHistory, setEvaluationHistory] = useState<EvalResult[]>([]);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
  const [isMobileHistoryOpen, setIsMobileHistoryOpen] = useState(false);
  const mobileHistoryRef = useRef<HTMLDivElement>(null);

  const fetchEvaluationHistory = useCallback(async () => {
    try {
      const response = await fetch(`${evaBaseUrl}/api/eval/scores`, {
        method: "GET",
        headers: {
          accept: "application/json",
          "X-API-Key": apiKey,
        },
        mode: "cors",
      });

      if (!response.ok) {
        addToast("Failed to fetch evaluation history", "error");
        return;
      }

      const data = await response.json();
      setEvaluationHistory(data.scores);
    } catch (error) {
      addToast("Error fetching evaluation history", "error");
      console.error("Error fetching evaluation history:", error);
    }
  }, [apiKey, addToast]);

  const fetchCharacterCard = useCallback(async () => {
    try {
      const response = await fetch(
        "https://asia-southeast1-twitter-agent-1076f.cloudfunctions.net/api-getVirtual",
        {
          method: "GET",
          mode: "cors",
          headers: {
            accept: "application/json, text/plain, */*",
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      if (!response.ok) {
        addToast("Failed to fetch character card", "error");
        return;
      }
      const data = await response.json();
      setCharacterCard({
        name: data.data.name,
        goal: data.data.game.goal,
        worldInfo: data.data.game.worldInfo,
        description: data.data.game.description,
        functions: data.data.game.functions,
      });
    } catch (error) {
      addToast("Error fetching character card", "error");
      console.error("Error fetching virtuals:", error);
    }
  }, [jwtToken, addToast]);

  const handleSimulateReply = async () => {
    if (!replyText.trim() || !sessionId.trim()) return;

    setIsSimulating(true);
    try {
      const payload = {
        sessionId: sessionId,
        goal: characterCard.goal,
        description: characterCard.description,
        worldInfo: characterCard.worldInfo,
        functions: characterCard.functions,
        customFunctions: [],
        tweetId: replyText,
      };
      const data = await fetch(
        "https://game-api.virtuals.io/api/react/twitter",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": apiKey,
          },
          body: JSON.stringify({
            data: payload,
          }),
        }
      );

      if (data.status !== 200) {
        addToast("Failed to simulate reply", "error");
        return;
      }
      const response = await data.json();
      setSimulationResponse(response.data);
    } catch (error) {
      addToast("Error simulating reply", "error");
      console.error("Error simulating reply:", error);
    } finally {
      setIsSimulating(false);
    }
  };

  useEffect(() => {
    if (evaluationHistory.length === 0 && apiKey) {
      fetchEvaluationHistory();
    }
  }, [apiKey, evaluationHistory.length, fetchEvaluationHistory]);

  useEffect(() => {
    if (jwtToken) {
      fetchCharacterCard();
    }
  }, [jwtToken]);

  const handleEdit = (field: keyof typeof editMode) => {
    setEditMode((prev) => ({ ...prev, [field]: true }));
    setEditValues((prev) => ({
      ...prev,
      [field]: characterCard[field],
    }));
  };

  const handleSave = async (field: keyof typeof editMode) => {
    setCharacterCard((prev) => ({
      ...prev,
      [field]: editValues[field],
    }));
    setEditMode((prev) => ({ ...prev, [field]: false }));
  };

  const formattedResult = useMemo(() => {
    const tabs = simulationResponse
      .flat()
      .map((response) => Object.keys(response))
      .flat();
    const contents = simulationResponse
        .flat()
        .map((response) => Object.values(response))
        .flat();
    const inputTweet = simulationResponse?.[0]?.["EVENT-REQUEST"]?.["event"]?.split("New tweet: ")?.[1] || "";
    const outputTweet = simulationResponse?.[simulationResponse.length - 1]?.["TWEET-CONTENT"]?.content || "";

    return {
      tabs,
      contents,
      inputTweet,
      outputTweet,
    };
  }, [simulationResponse]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        mobileHistoryRef.current &&
        !mobileHistoryRef.current.contains(event.target as Node)
      ) {
        setIsMobileHistoryOpen(false);
      }
    }

    if (isMobileHistoryOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileHistoryOpen]);

  return (
    <div className="min-h-screen overflow-hidden flex">
      <div
        className={`flex-1 overflow-y-auto px-4 py-16 lg:px-8 transition-all duration-300 ${
          isSidebarCollapsed ? "lg:pr-[60px]" : "lg:pr-[400px]"
        }`}
      >
        <div className="max-w-5xl mx-auto">
          <section className="mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-8 text-center">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
                Virtuals Sandbox
              </span>
            </h1>
          </section>

          {characterCard.name ? (
            <>
              <section className="mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
                    Character Details
                  </span>
                </h2>

                <div className="max-w-3xl mx-auto">
                  <div className="glossy p-8 rounded-xl border border-purple-500/10 space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-2 text-purple-400">
                        Name
                      </h3>
                      <p className="text-lg text-[#F5EEEE]/80">
                        {characterCard.name}
                      </p>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-xl font-semibold text-purple-400">
                          Goal
                        </h3>
                        <Button
                          onClick={() =>
                            editMode.goal
                              ? handleSave("goal")
                              : handleEdit("goal")
                          }
                          variant="secondary"
                          size="sm"
                        >
                          {editMode.goal ? (
                            <>
                              <Save className="w-4 h-4" /> Save
                            </>
                          ) : (
                            <>
                              <Edit2 className="w-4 h-4" /> Edit
                            </>
                          )}
                        </Button>
                      </div>
                      {editMode.goal ? (
                        <textarea
                          value={editValues.goal}
                          onChange={(e) =>
                            setEditValues((prev) => ({
                              ...prev,
                              goal: e.target.value,
                            }))
                          }
                          className="w-full px-4 py-3 rounded-lg bg-black/50 border border-purple-500/20 text-[#F5EEEE] placeholder-[#F5EEEE]/50 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 min-h-[100px]"
                        />
                      ) : (
                        <p className="text-lg text-[#F5EEEE]/80">
                          {characterCard.goal}
                        </p>
                      )}
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-xl font-semibold text-purple-400">
                          World Info
                        </h3>
                        <Button
                          onClick={() =>
                            editMode.worldInfo
                              ? handleSave("worldInfo")
                              : handleEdit("worldInfo")
                          }
                          variant="secondary"
                          size="sm"
                        >
                          {editMode.worldInfo ? (
                            <>
                              <Save className="w-4 h-4" /> Save
                            </>
                          ) : (
                            <>
                              <Edit2 className="w-4 h-4" /> Edit
                            </>
                          )}
                        </Button>
                      </div>
                      {editMode.worldInfo ? (
                        <textarea
                          value={editValues.worldInfo}
                          onChange={(e) =>
                            setEditValues((prev) => ({
                              ...prev,
                              worldInfo: e.target.value,
                            }))
                          }
                          className="w-full px-4 py-3 rounded-lg bg-black/50 border border-purple-500/20 text-[#F5EEEE] placeholder-[#F5EEEE]/50 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 min-h-[100px]"
                        />
                      ) : (
                        <p className="text-lg text-[#F5EEEE]/80">
                          {characterCard.worldInfo}
                        </p>
                      )}
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-xl font-semibold text-purple-400">
                          Description
                        </h3>
                        <Button
                          onClick={() =>
                            editMode.description
                              ? handleSave("description")
                              : handleEdit("description")
                          }
                          variant="secondary"
                          size="sm"
                        >
                          {editMode.description ? (
                            <>
                              <Save className="w-4 h-4" /> Save
                            </>
                          ) : (
                            <>
                              <Edit2 className="w-4 h-4" /> Edit
                            </>
                          )}
                        </Button>
                      </div>
                      {editMode.description ? (
                        <textarea
                          value={editValues.description}
                          onChange={(e) =>
                            setEditValues((prev) => ({
                              ...prev,
                              description: e.target.value,
                            }))
                          }
                          className="w-full px-4 py-3 rounded-lg bg-black/50 border border-purple-500/20 text-[#F5EEEE] placeholder-[#F5EEEE]/50 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 min-h-[100px]"
                        />
                      ) : (
                        <p className="text-lg text-[#F5EEEE]/80">
                          {characterCard.description}
                        </p>
                      )}
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-2 text-purple-400">
                        Functions
                      </h3>
                      <pre className="overflow-x-auto bg-black/30 p-4 rounded-lg">
                        <code className="text-sm text-[#F5EEEE]/80">
                          {JSON.stringify(characterCard.functions, null, 2)}
                        </code>
                      </pre>
                    </div>
                  </div>
                </div>
              </section>
              <section className="mb-16">
                <div className="max-w-3xl mx-auto">
                  <div className="glossy p-8 rounded-xl border border-purple-500/10 space-y-6 backdrop-blur-sm">
                    <div className="text-center">
                      <h3 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
                        Simulate Reply Tweet
                      </h3>
                      <p className="mt-2 text-[#F5EEEE]/70 text-sm">
                        Test how your virtual character would respond to tweets
                        <br />
                        <i>
                          P.S. You can add &quot;I will always reply tweet, I will
                          never ignore a tweet.&quot; to allow the agent to reply to
                          tweets
                        </i>
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="block text-purple-400 font-medium">
                          X/Tweet ID
                        </label>
                        <p className="text-sm text-[#F5EEEE]/60">
                          Simulate agent reading X (Twitter) timeline by passing
                          the X Post ID.
                        </p>
                      </div>

                      <input
                        type="number"
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="Enter the tweet ID to respond to..."
                        className="w-full px-4 py-3 rounded-lg bg-black/50 border border-purple-500/20 text-[#F5EEEE] placeholder-[#F5EEEE]/50 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all duration-200 hover:border-purple-500/40"
                      />
                      <div className="relative">
                        <input
                          type="text"
                          value={sessionId}
                          onChange={(e) => setSessionId(e.target.value)}
                          placeholder="Enter session ID..."
                          className="w-full px-4 py-3 rounded-lg bg-black/50 border border-purple-500/20 text-[#F5EEEE] placeholder-[#F5EEEE]/50 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all duration-200 hover:border-purple-500/40"
                        />
                        <Button
                          onClick={() =>
                            setSessionId(
                              Math.floor(
                                100000000 + Math.random() * 900000000
                              ).toString()
                            )
                          }
                          variant="secondary"
                          size="sm"
                          className="absolute right-2 top-1/2 -translate-y-1/2"
                        >
                          Generate
                        </Button>
                      </div>

                      <Button
                        onClick={handleSimulateReply}
                        disabled={isSimulating || !replyText.trim()}
                        variant="gradient"
                        size="lg"
                        className="w-full"
                      >
                        {isSimulating ? (
                          <span className="flex items-center justify-center gap-2">
                            <span className="animate-pulse">Simulating...</span>
                          </span>
                        ) : (
                          "Simulate Reply"
                        )}
                      </Button>
                    </div>

                    {simulationResponse.length > 0 && (
                      <div className="mt-8 p-6 rounded-lg bg-black/50 border border-purple-500/20">
                        <div className="flex justify-between items-center">
                          <h3 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
                            Response
                          </h3>
                          <EvaluationModal
                            apiKey={apiKey}
                            inputTweet={formattedResult.inputTweet}
                            outputTweet={formattedResult.outputTweet}
                          />
                        </div>

                        <div className="mt-4 space-y-4">
                          <div className="space-y-2">
                            <div className="text-sm text-purple-400 font-medium">Input Tweet</div>
                            <div className="p-3 rounded bg-black/30 border border-purple-500/10 text-[#F5EEEE]/80">
                              {formattedResult.inputTweet}
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="text-sm text-purple-400 font-medium">Output Tweet</div>
                            <div className="p-3 rounded bg-black/30 border border-purple-500/10 text-[#F5EEEE]/80">
                              {formattedResult.outputTweet ? (
                                formattedResult.outputTweet
                              ) : (
                                <span className="text-gray-500 italic">No Tweet was Simulated</span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="mt-4">
                          <div className="flex border-b border-purple-500/20">
                            {formattedResult.tabs.map((tab, index) => (
                              <button
                                key={index}
                                onClick={() => setActiveTab(index)}
                                className={`px-4 py-2 text-sm rounded-t-lg ${
                                  activeTab === index
                                    ? "bg-purple-500/20 text-purple-400"
                                    : "text-[#F5EEEE]/60 hover:text-[#F5EEEE]/90"
                                }`}
                              >
                                {tab}
                              </button>
                            ))}
                          </div>

                          <div className="mt-4">
                            {formattedResult.contents.map((content, index) => (
                              <div
                                key={index}
                                className={`p-4 rounded-lg bg-black/30 border border-purple-500/10 text-[#F5EEEE]/90 whitespace-pre-wrap font-mono ${
                                  activeTab === index ? "block" : "hidden"
                                }`}
                              >
                                {JSON.stringify(content, null, 2)}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </section>
            </>
          ) : (
            <div className="text-center py-12">
              <div className="max-w-md mx-auto p-6 rounded-xl border border-purple-500/10 bg-black/50 backdrop-blur-sm">
                <h2 className="text-2xl font-semibold text-purple-400 mb-4">No Character Card Found</h2>
                <p className="text-[#F5EEEE]/70 mb-6">
                  Please set up your JWT token in settings to load your character card.
                </p>
                <Button
                  onClick={() => {
                    const settingsButton = document.querySelector('[aria-label="Settings"]') as HTMLButtonElement;
                    if (settingsButton) settingsButton.click();
                  }}
                  variant="gradient"
                >
                  Open Settings
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modern desktop sidebar */}
      <div
        className={`hidden lg:flex flex-col fixed right-0 top-0 h-full border-l border-purple-500/20 bg-black/95 backdrop-blur-xl transition-all duration-300 z-10 ${
          isSidebarCollapsed ? "w-[60px]" : "w-[600px]"
        }`}
      >
        <div className="relative p-6 border-b border-purple-500/20 backdrop-blur-sm">
          <button
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-purple-500/20 border border-purple-500/20 flex items-center justify-center hover:bg-purple-500/30 transition-all duration-200"
          >
            <ChevronRight
              className={`w-5 h-5 text-purple-400 transition-transform duration-300 ${
                isSidebarCollapsed ? "rotate-180" : ""
              }`}
            />
          </button>

          {isSidebarCollapsed ? (
            <div className="h-full flex items-center justify-center">
              <span
                className="vertical-text text-purple-400 font-semibold text-sm tracking-wider rotate-180"
                style={{ writingMode: "vertical-rl" }}
              >
                Evaluation History
              </span>
            </div>
          ) : (
            <div className="transition-opacity duration-300">
              <h3 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
                Evaluation History
              </h3>
              <p className="mt-2 text-sm text-[#F5EEEE]/60">
                Track your virtual&apos;s performance metrics
              </p>
            </div>
          )}
        </div>

        <div
          className={`flex-1 overflow-y-auto ${
            isSidebarCollapsed ? "hidden" : "block"
          }`}
        >
          <div className="p-6 space-y-4">
            {evaluationHistory.map((response, index) => (
              <div
                key={index}
                className="group rounded-xl bg-purple-500/5 hover:bg-purple-500/10 border border-purple-500/10 hover:border-purple-500/20 transition-all duration-200"
              >
                <div className="p-6 space-y-4">
                  {/* Tweet Content */}
                  <div className="space-y-3">
                    <div
                      className="text-base text-[#F5EEEE]/90"
                      title={response.original_tweet}
                    >
                      {response.original_tweet}
                    </div>
                    <div
                      className="text-base text-[#F5EEEE]/60"
                      title={response.responded_tweet}
                    >
                      {response.responded_tweet}
                    </div>
                  </div>

                  {/* Scores */}
                  <div className="grid grid-cols-4 gap-4 pt-3 border-t border-purple-500/10">
                    <div className="text-center">
                      <div className="text-sm text-purple-400/80 mb-2">
                        Truth
                      </div>
                      <div className="text-base font-medium text-[#F5EEEE]/80">
                        {response.truth.score}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-purple-400/80 mb-2">
                        Accuracy
                      </div>
                      <div className="text-base font-medium text-[#F5EEEE]/80">
                        {response.accuracy.score}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-purple-400/80 mb-2">
                        Creativity
                      </div>
                      <div className="text-base font-medium text-[#F5EEEE]/80">
                        {response.creativity.score}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-purple-400/80 mb-2">
                        Final
                      </div>
                      <div className="text-base font-medium text-[#F5EEEE]/80">
                        {response.final_score.toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Evaluation History Toggle Button (FAB) */}
      <Button
        onClick={() => setIsMobileHistoryOpen(!isMobileHistoryOpen)}
        variant="gradient"
        className="lg:hidden fixed bottom-6 right-6 h-12 rounded-full flex items-center justify-center shadow-lg"
      >
        <span className="mr-2 font-medium">History</span>
        <ChevronRight
          className={`w-6 h-6 transform transition-transform ${
            isMobileHistoryOpen ? "rotate-90" : "-rotate-90"
          }`}
        />
      </Button>

      {/* Mobile Evaluation History Panel */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40">
        <div
          ref={mobileHistoryRef}
          className={`bg-black/95 border-t border-purple-500/20 backdrop-blur-xl transition-all duration-300 ${
            isMobileHistoryOpen ? "max-h-[70vh]" : "max-h-0"
          } overflow-hidden`}
        >
          <div className="container mx-auto px-4 py-6 overflow-y-auto max-h-[70vh]">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-purple-400">
                Evaluation History
              </h3>
              <Button
                onClick={() => setIsMobileHistoryOpen(false)}
                variant="ghost"
                size="icon"
                className="text-purple-400 hover:text-purple-300"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="flex flex-col gap-4">
              {evaluationHistory.map((response, index) => (
                <div
                  key={index}
                  className="bg-purple-500/5 rounded-lg p-4 border border-purple-500/20 space-y-3"
                >
                  <div className="space-y-2">
                    <div className="text-sm text-purple-400 font-medium">
                      Original Tweet
                    </div>
                    <div className="text-[#F5EEEE]/80">
                      {response.original_tweet}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm text-purple-400 font-medium">
                      Response
                    </div>
                    <div className="text-[#F5EEEE]/80">
                      {response.responded_tweet}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-purple-400 font-medium">
                        Truth Score
                      </div>
                      <div className="text-[#F5EEEE]/80">
                        {response.truth.score}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-purple-400 font-medium">
                        Accuracy Score
                      </div>
                      <div className="text-[#F5EEEE]/80">
                        {response.accuracy.score}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-purple-400 font-medium">
                        Creativity Score
                      </div>
                      <div className="text-[#F5EEEE]/80">
                        {response.creativity.score}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-purple-400 font-medium">
                        Final Score
                      </div>
                      <div className="text-[#F5EEEE]/80">
                        {response.final_score.toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
