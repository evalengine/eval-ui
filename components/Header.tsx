"use client"

import Link from "next/link"
import { useState, createContext, useContext, useEffect } from "react"
import { Eye, EyeOff, Settings } from "lucide-react"

const VIRTUAL_LOCAL_STORAGE_KEY = "virtual-api-key"
const JWT_LOCAL_STORAGE_KEY = "virtual-jwt-token"

interface HeaderProps {
  className?: string
}

interface KeysContextType {
  apiKey: string
  jwtToken: string
  setApiKey: (value: string) => void
  setJwtToken: (value: string) => void
}

const KeysContext = createContext<KeysContextType>({
  apiKey: "",
  jwtToken: "",
  setApiKey: () => {},
  setJwtToken: () => {}
})

export const useKeys = () => useContext(KeysContext)

export const KeysProvider = ({ children }: { children: React.ReactNode }) => {
  const [apiKey, setApiKey] = useState("")
  const [jwtToken, setJwtToken] = useState("")

  useEffect(() => {
    // Load saved values from localStorage on mount
    const savedApiKey = localStorage.getItem(VIRTUAL_LOCAL_STORAGE_KEY)
    const savedJwtToken = localStorage.getItem(JWT_LOCAL_STORAGE_KEY)
    
    if (savedApiKey) setApiKey(savedApiKey)
    if (savedJwtToken) setJwtToken(savedJwtToken)
  }, [])

  const handleSetApiKey = (value: string) => {
    if (!value) return
    setApiKey(value)
    localStorage.setItem(VIRTUAL_LOCAL_STORAGE_KEY, value)
  }

  const handleSetJwtToken = (value: string) => {
    if (!value) return
    setJwtToken(value)
    localStorage.setItem(JWT_LOCAL_STORAGE_KEY, value)
  }

  return (
    <KeysContext.Provider value={{
      apiKey,
      jwtToken,
      setApiKey: handleSetApiKey,
      setJwtToken: handleSetJwtToken
    }}>
      {children}
    </KeysContext.Provider>
  )
}

export default function Header({ className = '' }: HeaderProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showApiKey, setShowApiKey] = useState(false)
  const [showJwtToken, setShowJwtToken] = useState(false)
  const { apiKey, jwtToken, setApiKey, setJwtToken } = useKeys()

  useEffect(() => {
    const savedApiKey = localStorage.getItem(VIRTUAL_LOCAL_STORAGE_KEY)
    const savedJwtToken = localStorage.getItem(JWT_LOCAL_STORAGE_KEY)
    
    if (savedApiKey) setApiKey(savedApiKey)
    if (savedJwtToken) setJwtToken(savedJwtToken)
  }, [setApiKey, setJwtToken])

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 py-4 bg-black/80 backdrop-blur-sm border-b border-purple-500/10 ${className}`}>
        <div className="container mx-auto px-4 py-2 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-[#FFF8F8]">
            EVAEngine
          </Link>
          <button
            onClick={() => setIsModalOpen(true)}
            className="p-2 text-purple-400 hover:text-purple-300 transition-colors"
          >
            <Settings className="w-6 h-6" />
          </button>
        </div>
      </header>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="w-full max-w-md mx-4 p-6 bg-black/90 rounded-xl border border-purple-500/20 shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-purple-400">API Settings</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-[#F5EEEE]/60 hover:text-[#F5EEEE] transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="apiKey" className="block text-sm font-medium text-[#F5EEEE]/80">API Key</label>
                <div className="relative">
                  <input
                    id="apiKey"
                    type={showApiKey ? "text" : "password"}
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="Enter your API key"
                    className="w-full px-4 py-2 rounded-lg bg-black/50 border border-purple-500/20 text-[#F5EEEE] placeholder-[#F5EEEE]/50 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 pr-10"
                    autoComplete="off"
                  />
                  <button
                    type="button"
                    onClick={() => setShowApiKey(!showApiKey)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#F5EEEE]/50 hover:text-[#F5EEEE]"
                  >
                    {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="jwtToken" className="block text-sm font-medium text-[#F5EEEE]/80">JWT Token</label>
                <div className="relative">
                  <input
                    id="jwtToken"
                    type={showJwtToken ? "text" : "password"}
                    value={jwtToken}
                    // onChange={(e) => setJwtToken(e.target.value)}
                    onChange={e => {
                      console.log(e.target.value)
                      setJwtToken(e.target.value)
                    }}
                    placeholder="Enter your JWT token"
                    className="w-full px-4 py-2 rounded-lg bg-black/50 border border-purple-500/20 text-[#F5EEEE] placeholder-[#F5EEEE]/50 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 pr-10"
                    autoComplete="off"
                  />
                  <button
                    type="button"
                    onClick={() => setShowJwtToken(!showJwtToken)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#F5EEEE]/50 hover:text-[#F5EEEE]"
                  >
                    {showJwtToken ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
