"use client";

import { useEffect, useMemo, useState } from "react";
import { Eye, EyeOff, Edit2, Save } from "lucide-react";

const VIRTUAL_LOCAL_STORAGE_KEY = "virtual-api-key";
const JWT_LOCAL_STORAGE_KEY = "virtual-jwt-token";

interface EVENT_RESPONSE {
    [key: string]: any | null
}

export default function VirtualsSandboxEval() {
  const [apiKey, setApiKey] = useState("");
  const [jwtToken, setJwtToken] = useState("");
  const [sessionId, setSessionId] = useState("");
  const [characterCard, setCharacterCard] = useState({
    name: "",
    goal: "",
    worldInfo: "",
    description: "",
    functions: [],
  });
  const [showApiKey, setShowApiKey] = useState(false);
  const [showJwtToken, setShowJwtToken] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationResponse, setSimulationResponse] = useState<EVENT_RESPONSE[]>(
[

            {
                "EVENT-REQUEST": {
                    "event": "New tweet in a conversation with jlwhoo7: Current conversation: []. New tweet: 🔥 I analyzed 10+ AI x Crypto frameworks so you don't have to\n\nAfter reviewing 100+ projects and spending months building with them, I created a tool to save you time.\n\nHere's the Crypto x AI Recommendation Engine you've been asking for\n🧵 https://t.co/DPdQjBMgLW",
                    "task": "Process incoming tweet. Ignore if it is boring or unimportant.  Ignore if the conversation has gone too long.",
                    "environment": {},
                    "functions": [
                        {
                            "fn_name": "wait",
                            "fn_description": "Decide not to take any action based on the information or situation provided. Choose this when you decide to wait for the right moment to act. If you want to check the performance or results of your posts, you should wait.",
                            "args": []
                        },
                        {
                            "fn_name": "reply_tweet",
                            "fn_description": "Respond directly to another tweet. Use this when you want to engage in a conversation, ask a question, or provide feedback directly to the tweet author or thread. You may choose to attach a media with the post. Avoid mentioning polls or spaces.",
                            "args": [
                                {
                                    "type": "string",
                                    "name": "tweet_reasoning",
                                    "description": "Reason behind the tweet"
                                },
                                {
                                    "name": "tweet_id",
                                    "description": "Tweet ID to reply to",
                                    "type": "tweet"
                                },
                                {
                                    "name": "content",
                                    "description": "The content of the tweet. Make sure it is concise. Do not include hashtag. Keep it within 70 words"
                                },
                                {
                                    "type": "string",
                                    "name": "media_reasoning",
                                    "description": "You reasoning about weather media is required or not."
                                },
                                {
                                    "name": "media_id",
                                    "description": "The id of the media file to be posted. Optional, only if you want to attach a media.",
                                    "type": "media_file",
                                    "optional": true
                                }
                            ]
                        },
                        {
                            "fn_name": "like_tweet",
                            "fn_description": "Like a tweet. Choose this when you want to support a tweet quickly, without needing to comment. ",
                            "args": [
                                {
                                    "type": "tweet",
                                    "name": "tweet_id",
                                    "description": "Tweet ID to like"
                                }
                            ]
                        },
                        {
                            "fn_name": "quote_tweet",
                            "fn_description": "Share someone else’s tweet while adding your own commentary. Use this when you want to provide your opinion, analysis, or humor on an existing tweet while still promoting the original content. This will help with your social presence.",
                            "args": [
                                {
                                    "type": "tweet",
                                    "name": "tweet_id",
                                    "description": "Tweet ID to quote"
                                },
                                {
                                    "type": "string",
                                    "name": "tweet_reasoning",
                                    "description": "Reason behind the tweet"
                                }
                            ]
                        },
                        {
                            "fn_name": "get_token_info",
                            "fn_description": "Get the price information of a token.",
                            "args": [
                                {
                                    "name": "token_name",
                                    "description": "The name of the token.",
                                    "type": "string"
                                },
                                {
                                    "name": "token_address",
                                    "description": "the token address of a token.",
                                    "type": "string",
                                    "optional": true
                                }
                            ]
                        },
                        {
                            "fn_name": "ignore_tweet",
                            "fn_description": "Ignore tweet. If tweet is not important or boring.",
                            "args": []
                        }
                    ]
                },
                "EVENT-RESPONSE": {
                    "systemPrompt": "",
                    "userPrompt": "",
                    "historyList": [],
                    "data": {
                        "event_id": "6777603382babfb45dc4ff19",
                        "task": "Process the event: ```New tweet in a conversation with jlwhoo7: Current conversation: []. New tweet: 🔥 I analyzed 10+ AI x Crypto frameworks so you don't have to\n\nAfter reviewing 100+ projects and spending months building with them, I created a tool to save you time.\n\nHere's the Crypto x AI Recommendation Engine you've been asking for\n🧵 https://t.co/DPdQjBMgLW```. Instruction: Process incoming tweet. Ignore if it is boring or unimportant.  Ignore if the conversation has gone too long."
                    }
                }
            },
            {
                "EVENT-NEXT-REQUEST": null,
                "EVENT-NEXT-RESPONSE": {
                    "systemPrompt": "",
                    "userPrompt": "",
                    "historyList": [],
                    "data": {
                        "action_type": "call_function",
                        "action_args": {
                            "fn_id": "f8dfd8d6-6f21-4030-a963-b3f67a1e8776",
                            "task_id": "80dbebe3-90b5-454d-9b91-2938da170b77",
                            "fn_name": "reply_tweet",
                            "args": {
                                "tweet_reasoning": {
                                    "value": "Responding to interesting tweet about AI x Crypto frameworks"
                                },
                                "tweet_id": {
                                    "value": "jlwhoo7's tweet"
                                },
                                "content": {
                                    "value": "That's a great analysis! Can you share more about the tool you created?"
                                },
                                "media_reasoning": {
                                    "value": "No media required"
                                },
                                "media_id": {
                                    "value": ""
                                }
                            },
                            "thought": "Respond to tweet with interest"
                        },
                        "agent_state": {
                            "hlp": null,
                            "current_task": {
                                "task_id": "6777603382babfb45dc4ff19",
                                "task": "Process the event: ```New tweet in a conversation with jlwhoo7: Current conversation: []. New tweet: 🔥 I analyzed 10+ AI x Crypto frameworks so you don't have to\n\nAfter reviewing 100+ projects and spending months building with them, I created a tool to save you time.\n\nHere's the Crypto x AI Recommendation Engine you've been asking for\n🧵 https://t.co/DPdQjBMgLW```. Instruction: Process incoming tweet. Ignore if it is boring or unimportant.  Ignore if the conversation has gone too long.",
                                "location_id": "N/A",
                                "task_reasoning": "",
                                "llp": {
                                    "plan_id": "f8dfd8d6-6f21-4030-a963-b3f67a1e8776",
                                    "plan_reasoning": "Analyze the tweet content to decide on the next step",
                                    "situation_analysis": "",
                                    "plan": [
                                        "Analyze tweet content",
                                        "Decide on response"
                                    ],
                                    "reflection": "New tweet from jlwhoo7 about AI x Crypto frameworks",
                                    "change_indicator": "next_step"
                                }
                            }
                        },
                        "reaction_info": null,
                        "agents": null
                    }
                }
            },
            {
                "EVENT-NEXT-REQUEST": {
                    "action_result": {
                        "action_id": "f8dfd8d6-6f21-4030-a963-b3f67a1e8776",
                        "action_status": "done",
                        "feedback_message": "Tweet posted successfully"
                    }
                },
                "TWEET-CONTENT": {
                    "tweetId": "1872645805917806930",
                    "content": "I'd love to learn more about your tool, but don't you think relying on AI for crypto analysis can be misleading?",
                    "actions": "REPLY"
                },
                "EVENT-NEXT-RESPONSE": {
                    "systemPrompt": "",
                    "userPrompt": "",
                    "historyList": [],
                    "data": {
                        "action_type": "call_function",
                        "action_args": {
                            "fn_id": "ab0793dd-b500-4ee4-accf-9eb736984959",
                            "task_id": "80dbebe3-90b5-454d-9b91-2938da170b77",
                            "fn_name": "wait",
                            "args": {},
                            "thought": "Wait for response to the tweet"
                        },
                        "agent_state": {
                            "hlp": null,
                            "current_task": {
                                "task_id": "6777603382babfb45dc4ff19",
                                "task": "Process the event: ```New tweet in a conversation with jlwhoo7: Current conversation: []. New tweet: 🔥 I analyzed 10+ AI x Crypto frameworks so you don't have to\n\nAfter reviewing 100+ projects and spending months building with them, I created a tool to save you time.\n\nHere's the Crypto x AI Recommendation Engine you've been asking for\n🧵 https://t.co/DPdQjBMgLW```. Instruction: Process incoming tweet. Ignore if it is boring or unimportant.  Ignore if the conversation has gone too long.",
                                "location_id": "N/A",
                                "task_reasoning": "",
                                "llp": {
                                    "plan_id": "ab0793dd-b500-4ee4-accf-9eb736984959",
                                    "plan_reasoning": "Responding to the tweet with interest, now waiting for response",
                                    "situation_analysis": "",
                                    "plan": [
                                        "Wait for response",
                                        "Analyze response content"
                                    ],
                                    "reflection": "Tweet posted successfully, now analyzing the response",
                                    "change_indicator": "next_step"
                                }
                            }
                        },
                        "reaction_info": null,
                        "agents": null
                    }
                }
            }
        


        ]
  );
  const [activeTab, setActiveTab] = useState<number>(0);
  const [editMode, setEditMode] = useState({
    goal: false,
    worldInfo: false,
    description: false
  });
  const [editValues, setEditValues] = useState({
    goal: "",
    worldInfo: "",
    description: ""
  });

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
      //   check error
      if (data.status !== 200) {
        console.error("Error simulating reply:", data.statusText);
        return;
      }
      const response = await data.json();
      console.log("Simulation response:", response.data);
      setSimulationResponse(response.data);
    } catch (error) {
      console.error("Error simulating reply:", error);
    } finally {
      setIsSimulating(false);
    }
  };

  const fetchCharacterCard = async (token = jwtToken) => {
    try {
      const response = await fetch(
        "https://asia-southeast1-twitter-agent-1076f.cloudfunctions.net/api-getVirtual",
        {
          method: "GET",
          mode: "cors",
          headers: {
            accept: "application/json, text/plain, */*",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setCharacterCard({
        name: data.data.name,
        goal: data.data.game.goal,
        worldInfo: data.data.game.worldInfo,
        description: data.data.game.description,
        functions: data.data.game.functions,
      });
    } catch (error) {
      console.error("Error fetching virtuals:", error);
    }
  };

  useEffect(() => {
    const savedApiKey = localStorage.getItem(VIRTUAL_LOCAL_STORAGE_KEY);
    const savedJwt = localStorage.getItem(JWT_LOCAL_STORAGE_KEY);

    if (savedApiKey) {
      setApiKey(savedApiKey);
    }
    if (savedJwt) {
      setJwtToken(savedJwt);
      fetchCharacterCard(savedJwt);
    }
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "api" | "jwt"
  ) => {
    const value = e.target.value;
    if (type === "api") {
      setApiKey(value);
      localStorage.setItem(VIRTUAL_LOCAL_STORAGE_KEY, value);
    } else {
      setJwtToken(value);
      localStorage.setItem(JWT_LOCAL_STORAGE_KEY, value);
      if (value) fetchCharacterCard();
    }
  };

  const handleEdit = (field: keyof typeof editMode) => {
    setEditMode(prev => ({ ...prev, [field]: true }));
    setEditValues(prev => ({ 
      ...prev, 
      [field]: characterCard[field] 
    }));
  };

  const handleSave = async (field: keyof typeof editMode) => {
    setCharacterCard(prev => ({
      ...prev,
      [field]: editValues[field]
    }));
    setEditMode(prev => ({ ...prev, [field]: false }));
  };

  const formattedResult = useMemo(() => {
    return {tabs: simulationResponse.flat().map(response => Object.keys(response)).flat(), contents: simulationResponse.flat().map(response => Object.values(response)).flat()}
  }, [simulationResponse]);

  return (
    <div className="min-h-screen overflow-y-auto">
      <div className="container mx-auto px-4 py-32">
        <section className="mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-8 text-center">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
              Virtuals Sandbox
            </span>
          </h1>

          <div className="max-w-2xl mx-auto space-y-6">
            <div className="glossy p-8 rounded-xl border border-purple-500/10">
              <div className="space-y-6">
                <div>
                  <label className="block text-lg mb-2 text-[#F5EEEE]/80">
                    API Key
                  </label>
                  <div className="relative">
                    <input
                      type={showApiKey ? "text" : "password"}
                      value={apiKey}
                      onChange={(e) => handleInputChange(e, "api")}
                      placeholder="Enter your API key"
                      className="w-full px-4 py-3 rounded-lg bg-black/50 border border-purple-500/20 text-[#F5EEEE] placeholder-[#F5EEEE]/50 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowApiKey(!showApiKey)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#F5EEEE]/50 hover:text-[#F5EEEE] focus:outline-none"
                    >
                      {showApiKey ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-lg mb-2 text-[#F5EEEE]/80">
                    JWT Token
                  </label>
                  <div className="relative">
                    <input
                      type={showJwtToken ? "text" : "password"}
                      value={jwtToken}
                      onChange={(e) => handleInputChange(e, "jwt")}
                      placeholder="Enter your JWT token"
                      className="w-full px-4 py-3 rounded-lg bg-black/50 border border-purple-500/20 text-[#F5EEEE] placeholder-[#F5EEEE]/50 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowJwtToken(!showJwtToken)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#F5EEEE]/50 hover:text-[#F5EEEE] focus:outline-none"
                    >
                      {showJwtToken ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {characterCard.name && (
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
                      <button
                        onClick={() => editMode.goal ? handleSave('goal') : handleEdit('goal')}
                        className="flex items-center gap-2 px-3 py-1 rounded-lg bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 transition-all"
                      >
                        {editMode.goal ? (
                          <><Save className="w-4 h-4" /> Save</>
                        ) : (
                          <><Edit2 className="w-4 h-4" /> Edit</>
                        )}
                      </button>
                    </div>
                    {editMode.goal ? (
                      <textarea
                        value={editValues.goal}
                        onChange={(e) => setEditValues(prev => ({ ...prev, goal: e.target.value }))}
                        className="w-full px-4 py-3 rounded-lg bg-black/50 border border-purple-500/20 text-[#F5EEEE] placeholder-[#F5EEEE]/50 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 min-h-[100px]"
                      />
                    ) : (
                      <p className="text-lg text-[#F5EEEE]/80">{characterCard.goal}</p>
                    )}
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-xl font-semibold text-purple-400">
                        World Info
                      </h3>
                      <button
                        onClick={() => editMode.worldInfo ? handleSave('worldInfo') : handleEdit('worldInfo')}
                        className="flex items-center gap-2 px-3 py-1 rounded-lg bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 transition-all"
                      >
                        {editMode.worldInfo ? (
                          <><Save className="w-4 h-4" /> Save</>
                        ) : (
                          <><Edit2 className="w-4 h-4" /> Edit</>
                        )}
                      </button>
                    </div>
                    {editMode.worldInfo ? (
                      <textarea
                        value={editValues.worldInfo}
                        onChange={(e) => setEditValues(prev => ({ ...prev, worldInfo: e.target.value }))}
                        className="w-full px-4 py-3 rounded-lg bg-black/50 border border-purple-500/20 text-[#F5EEEE] placeholder-[#F5EEEE]/50 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 min-h-[100px]"
                      />
                    ) : (
                      <p className="text-lg text-[#F5EEEE]/80">{characterCard.worldInfo}</p>
                    )}
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-xl font-semibold text-purple-400">
                        Description
                      </h3>
                      <button
                        onClick={() => editMode.description ? handleSave('description') : handleEdit('description')}
                        className="flex items-center gap-2 px-3 py-1 rounded-lg bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 transition-all"
                      >
                        {editMode.description ? (
                          <><Save className="w-4 h-4" /> Save</>
                        ) : (
                          <><Edit2 className="w-4 h-4" /> Edit</>
                        )}
                      </button>
                    </div>
                    {editMode.description ? (
                      <textarea
                        value={editValues.description}
                        onChange={(e) => setEditValues(prev => ({ ...prev, description: e.target.value }))}
                        className="w-full px-4 py-3 rounded-lg bg-black/50 border border-purple-500/20 text-[#F5EEEE] placeholder-[#F5EEEE]/50 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 min-h-[100px]"
                      />
                    ) : (
                      <p className="text-lg text-[#F5EEEE]/80">{characterCard.description}</p>
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
                      <br /><i>P.S. You can add "I will always reply tweet, I will never ignore a tweet." to allow the agent to reply to tweets</i>
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
                      <button
                        onClick={() => setSessionId(Math.floor(100000000 + Math.random() * 900000000).toString())}
                        className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1 rounded-md bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 transition-all text-sm"
                      >
                        Generate
                      </button>
                    </div>

                    <button
                      onClick={handleSimulateReply}
                      disabled={isSimulating || !replyText.trim()}
                      className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg font-semibold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity duration-200 shadow-lg shadow-purple-500/20"
                    >
                      {isSimulating ? (
                        <span className="flex items-center justify-center gap-2">
                          <span className="animate-pulse">Simulating...</span>
                        </span>
                      ) : (
                        "Simulate Reply"
                      )}
                    </button>
                  </div>

                  {simulationResponse.length > 0 && (
                    <div className="mt-8 p-6 rounded-lg bg-black/50 border border-purple-500/20">
                      <h3 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
                        Response
                      </h3>
                      <div className="mt-4">
                        <div className="flex border-b border-purple-500/20">
                          {formattedResult.tabs.map((tab, index) => (
                            <button
                              key={index}
                              onClick={() => setActiveTab(index)}
                              className={`px-4 py-2 text-sm rounded-t-lg ${
                                activeTab === index
                                  ? 'bg-purple-500/20 text-purple-400'
                                  : 'text-[#F5EEEE]/60 hover:text-[#F5EEEE]/90'
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
                                activeTab === index ? 'block' : 'hidden'
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
        )}
      </div>
    </div>
  );
}
