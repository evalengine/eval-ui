"use client"

import { useKeys } from "@/components/Header"
import { EvaluationModal } from "@/components/virtuals/EvaluationModal"
import { useEffect, useState } from "react"
import {
  type TweetProps,
  EmbeddedTweet,
  TweetNotFound,
  TweetSkeleton,
  useTweet,
} from 'react-tweet'

const Tweet = ({
  id,
  apiUrl,
  fallback = <TweetSkeleton />,
  components,
  onError,
  setFinalTweet,
  isOutput = false,
  setInputTweet,
  inputTweet,
}: TweetProps & { 
  setFinalTweet: (tweet: string) => void,
  isOutput?: boolean,
  setInputTweet?: (url: string) => void,
  inputTweet?: string
}) => {
  const { data, error, isLoading } = useTweet(id, apiUrl)
  
  useEffect(() => {
    if (data) {
      setFinalTweet(data.text)
      if (isOutput && setInputTweet && !inputTweet && data.parent?.user?.id_str && data.parent?.id_str) {
        const parentUrl = `https://x.com/${data.parent.user.screen_name}/status/${data.parent.id_str}`
        setInputTweet(parentUrl)
      }
    }
  }, [data, setFinalTweet, isOutput, setInputTweet, inputTweet])

  if (isLoading) return fallback
  if (error || !data) {
    const NotFound = components?.TweetNotFound || TweetNotFound
    return <NotFound error={onError ? onError(error) : error} />
  }

  return <EmbeddedTweet tweet={data} components={components} />
}

export default function TweetsPage() {
    const { apiKey } = useKeys()

    const [finalInputTweet, setFinalInputTweet] = useState("")
    const [finalOutputTweet, setFinalOutputTweet] = useState("")
    const [inputTweet, setInputTweet] = useState("")
    const [outputTweet, setOutputTweet] = useState("")
    const [inputTweetId, setInputTweetId] = useState("")
    const [outputTweetId, setOutputTweetId] = useState("")

    const [isEvaluationComplete, setIsEvaluationComplete] = useState(false)

    const extractTweetId = (text: string) => {
        const urlMatches = text.match(/(?:twitter\.com|x\.com)\/\w+\/status\/(\d+)/)
        return urlMatches ? urlMatches[1] : ""
    }

    useEffect(() => {
        const debounce = setTimeout(() => {
            const inputId = extractTweetId(inputTweet)
            const outputId = extractTweetId(outputTweet)
            setInputTweetId(inputId)
            setOutputTweetId(outputId)

            if (!inputId && inputTweet) setFinalInputTweet(inputTweet)
            if (!outputId && outputTweet) setFinalOutputTweet(outputTweet)
        }, 150)

        return () => clearTimeout(debounce)
    }, [inputTweet, outputTweet])
    
    return (
        <div className="min-h-screen overflow-x-hidden w-full">
            <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
                <section className="mb-8 sm:mb-12 lg:mb-16">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8 text-center">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
                            Evaluate Reply Tweet
                        </span>
                    </h1>

                    <div className="w-full max-w-3xl mx-auto">
                        <div className="glossy p-4 sm:p-6 lg:p-8 rounded-xl border border-purple-500/10 space-y-4 sm:space-y-6 backdrop-blur-sm">
                            <div className="text-center">
                                <h3 className="text-xl sm:text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
                                    Tweet Evaluation Tool
                                </h3>
                                <p className="mt-2 text-[#F5EEEE]/70 text-xs sm:text-sm">
                                    Evaluate the quality of tweet responses
                                </p>
                            </div>
                            
                            <form className="space-y-4 sm:space-y-6" onSubmit={e => e.preventDefault()}>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="block text-purple-400 font-medium text-sm sm:text-base">Input Tweet</label>
                                        <p className="text-xs sm:text-sm text-[#F5EEEE]/60">
                                            Paste the original tweet URL or text here
                                        </p>
                                        <textarea
                                            disabled={isEvaluationComplete}
                                            value={inputTweet}
                                            onChange={(e) => setInputTweet(e.target.value)}
                                            placeholder="Enter original tweet URL or text..."
                                            className={`w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-black/50 border border-purple-500/20 text-[#F5EEEE] placeholder-[#F5EEEE]/50 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all duration-200 hover:border-purple-500/40 min-h-[80px] sm:min-h-[100px] text-sm sm:text-base ${
                                                isEvaluationComplete 
                                                    ? 'opacity-40 cursor-not-allowed bg-gray-900/50 border-gray-600/20 text-gray-400 placeholder-gray-600' 
                                                    : ''
                                            }`}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="block text-purple-400 font-medium text-sm sm:text-base">Output Tweet</label>
                                        <p className="text-xs sm:text-sm text-[#F5EEEE]/60">
                                            Paste the response tweet URL or text here
                                        </p>
                                        <textarea
                                            disabled={isEvaluationComplete}
                                            value={outputTweet}
                                            onChange={(e) => setOutputTweet(e.target.value)}
                                            placeholder="Enter response tweet URL or text..."
                                            className={`w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-black/50 border border-purple-500/20 text-[#F5EEEE] placeholder-[#F5EEEE]/50 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all duration-200 hover:border-purple-500/40 min-h-[80px] sm:min-h-[100px] text-sm sm:text-base ${
                                                isEvaluationComplete
                                                    ? 'opacity-40 cursor-not-allowed bg-gray-900/50 border-gray-600/20 text-gray-400 placeholder-gray-600'
                                                    : ''
                                            }`}
                                        />
                                    </div>
                                    <div className="flex flex-col justify-center items-center">
                                        <EvaluationModal
                                            apiKey={apiKey}
                                            inputTweet={finalInputTweet}
                                            outputTweet={finalOutputTweet}
                                            onEvaluationComplete={() => {
                                                setIsEvaluationComplete(true)
                                            }}
                                        />
                                        
                                        {isEvaluationComplete && (
                                            <div className="mt-4 sm:mt-6 p-4 rounded-lg bg-purple-500/10 border border-purple-500/20 backdrop-blur-sm">
                                                <p className="text-sm sm:text-base text-purple-300 font-medium text-center">
                                                    Evaluation Complete! 🎉
                                                </p>
                                                <p className="mt-2 text-xs sm:text-sm text-[#F5EEEE]/80 text-center">
                                                    Sign up for a Chromia Account to save your progress and access more features
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </form>

                            {(inputTweetId || outputTweetId) && (
                                <div className="mt-6 sm:mt-8 p-4 sm:p-6 rounded-lg bg-black/50 border border-purple-500/20 space-y-4 sm:space-y-6">
                                    <h3 className="text-xl sm:text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
                                        Tweet Evaluation
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                                        {inputTweetId && (
                                            <div className="space-y-2">
                                                <div className="text-xs sm:text-sm text-purple-400 font-medium">Original Tweet</div>
                                                <p className="text-sm sm:text-base">{finalInputTweet}</p>
                                                <div className="p-3 sm:p-4 rounded-lg bg-black/30 border border-purple-500/10">
                                                    <Tweet setFinalTweet={setFinalInputTweet} id={inputTweetId} />
                                                </div>
                                            </div>
                                        )}
                                        {outputTweetId && (
                                            <div className="space-y-2">
                                                <div className="text-xs sm:text-sm text-purple-400 font-medium">Response Tweet</div>
                                                <p className="text-sm sm:text-base">{finalOutputTweet}</p>
                                                <div className="p-3 sm:p-4 rounded-lg bg-black/30 border border-purple-500/10">
                                                    <Tweet 
                                                        inputTweet={inputTweet}
                                                        setFinalTweet={setFinalOutputTweet} 
                                                        id={outputTweetId}
                                                        isOutput={true}
                                                        setInputTweet={(url) => {
                                                            if (!inputTweet) setInputTweet(url)
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {(!inputTweetId && inputTweet) && (
                                <div className="mt-6 sm:mt-8 p-4 sm:p-6 rounded-lg bg-black/50 border border-purple-500/20 space-y-2">
                                    <div className="text-xs sm:text-sm text-purple-400 font-medium">Original Tweet Text</div>
                                    <div className="p-3 sm:p-4 rounded-lg bg-black/30 border border-purple-500/10 text-[#F5EEEE]/80 whitespace-pre-wrap text-sm sm:text-base">
                                        {inputTweet}
                                    </div>
                                </div>
                            )}

                            {(!outputTweetId && outputTweet) && (
                                <div className="mt-6 sm:mt-8 p-4 sm:p-6 rounded-lg bg-black/50 border border-purple-500/20 space-y-2">
                                    <div className="text-xs sm:text-sm text-purple-400 font-medium">Response Tweet Text</div>
                                    <div className="p-3 sm:p-4 rounded-lg bg-black/30 border border-purple-500/10 text-[#F5EEEE]/80 whitespace-pre-wrap text-sm sm:text-base">
                                        {outputTweet}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}