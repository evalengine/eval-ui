"use client"

import Link from "next/link"
import { useState, createContext, useContext, useEffect } from "react"
import { Eye, EyeOff, Settings } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

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
    setApiKey(value)
    localStorage.setItem(VIRTUAL_LOCAL_STORAGE_KEY, value)
  }

  const handleSetJwtToken = (value: string) => {
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
  const [open, setOpen] = useState(false)
  const [showApiKey, setShowApiKey] = useState(false)
  const [showJwtToken, setShowJwtToken] = useState(false)
  const { apiKey, jwtToken, setApiKey, setJwtToken } = useKeys()
  const [tempApiKey, setTempApiKey] = useState(apiKey)
  const [tempJwtToken, setTempJwtToken] = useState(jwtToken)

  useEffect(() => {
    const savedApiKey = localStorage.getItem(VIRTUAL_LOCAL_STORAGE_KEY)
    const savedJwtToken = localStorage.getItem(JWT_LOCAL_STORAGE_KEY)
    
    if (savedApiKey) setApiKey(savedApiKey)
    if (savedJwtToken) setJwtToken(savedJwtToken)
  }, [setApiKey, setJwtToken])

  useEffect(() => {
    setTempApiKey(apiKey)
    setTempJwtToken(jwtToken)
  }, [apiKey, jwtToken])

  const handleSave = () => {
    setApiKey(tempApiKey)
    setJwtToken(tempJwtToken)
    setOpen(false)
  }

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 py-1 bg-black/80 backdrop-blur-sm border-b border-purple-500/10 ${className}`}>
        <div className="container mx-auto px-4 py-2 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-[#FFF8F8]">
            EVAEngine
          </Link>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon" className="text-purple-400 hover:text-purple-300">
                <Settings className="w-6 h-6" />
              </Button>
            </DialogTrigger>
            <DialogContent className="w-full max-w-md bg-black/95 border border-purple-500/20 backdrop-blur-xl">
              <DialogHeader>
                <DialogTitle className="text-xl font-semibold text-purple-400">API Settings</DialogTitle>
              </DialogHeader>
              <div className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="apiKey" className="block text-sm font-medium text-[#F5EEEE]/80">API Key</label>
                  <div className="relative">
                    <input
                      id="apiKey"
                      type={showApiKey ? "text" : "password"}
                      value={tempApiKey}
                      onChange={(e) => setTempApiKey(e.target.value)}
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
                      value={tempJwtToken}
                      onChange={(e) => setTempJwtToken(e.target.value || "")}
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

                <Button
                  onClick={handleSave}
                  className="w-full"
                  variant="gradient"
                >
                  Save
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </header>
    </>
  )
}
