import { useState, useEffect } from "react"
import { CheckCircleIcon, ExclamationCircleIcon, InformationCircleIcon, XMarkIcon } from "@heroicons/react/24/outline"
import "~style.css"

function OptionsIndex() {
  const [apiKey, setApiKey] = useState("")
  const [savedMessage, setSavedMessage] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  // Load API key from Chrome storage on mount
  useEffect(() => {
    chrome.storage.local.get(["tavilyApiKey"], (result) => {
      if (result.tavilyApiKey) {
        setApiKey(result.tavilyApiKey)
      }
      setIsLoading(false)
    })
  }, [])

  const handleSave = () => {
    if (!apiKey.trim()) {
      setSavedMessage("error:Please enter an API key")
      setTimeout(() => setSavedMessage(""), 3000)
      return
    }

    chrome.storage.local.set({ tavilyApiKey: apiKey.trim() }, () => {
      setSavedMessage("success:API key saved successfully!")
      setTimeout(() => setSavedMessage(""), 3000)
    })
  }

  const getMessageType = () => {
    if (savedMessage.startsWith("success:")) return "success"
    if (savedMessage.startsWith("error:")) return "error"
    return "info"
  }

  const getMessageText = () => {
    return savedMessage.split(":")[1] || savedMessage
  }

  if (isLoading) {
    return (
      <div className="plasmo-min-h-screen plasmo-bg-gray-50 plasmo-flex plasmo-items-center plasmo-justify-center">
        <div className="plasmo-text-gray-600">Loading...</div>
      </div>
    )
  }

  return (
    <div className="plasmo-min-h-screen plasmo-bg-gray-50 plasmo-py-12 plasmo-px-4 plasmo-relative">
      {/* Global Toast Message */}
      {savedMessage && (
        <div className="plasmo-fixed plasmo-top-4 plasmo-left-1/2 plasmo--translate-x-1/2 plasmo-z-50 plasmo-animate-in plasmo-fade-in plasmo-slide-in-from-top-2 plasmo-duration-300">
          <div
            className={`plasmo-flex plasmo-items-center plasmo-gap-3 plasmo-px-6 plasmo-py-4 plasmo-rounded-lg plasmo-shadow-lg plasmo-border plasmo-min-w-[320px] plasmo-max-w-md ${
              getMessageType() === "success"
                ? "plasmo-bg-green-50 plasmo-border-green-400 plasmo-text-green-800"
                : getMessageType() === "error"
                ? "plasmo-bg-red-50 plasmo-border-red-400 plasmo-text-red-800"
                : "plasmo-bg-blue-50 plasmo-border-blue-400 plasmo-text-blue-800"
            }`}>
            {/* Icon */}
            <div className="plasmo-flex-shrink-0">
              {getMessageType() === "success" ? (
                <CheckCircleIcon className="plasmo-w-5 plasmo-h-5 plasmo-text-green-600" />
              ) : getMessageType() === "error" ? (
                <ExclamationCircleIcon className="plasmo-w-5 plasmo-h-5 plasmo-text-red-600" />
              ) : (
                <InformationCircleIcon className="plasmo-w-5 plasmo-h-5 plasmo-text-blue-600" />
              )}
            </div>

            {/* Message Text */}
            <p className="plasmo-flex-1 plasmo-text-sm plasmo-font-medium">
              {getMessageText()}
            </p>

            {/* Close Button */}
            <button
              onClick={() => setSavedMessage("")}
              className="plasmo-flex-shrink-0 plasmo-p-1 plasmo-rounded-md hover:plasmo-bg-black/5 plasmo-transition plasmo-bg-transparent plasmo-border-none plasmo-cursor-pointer">
              <XMarkIcon className="plasmo-w-4 plasmo-h-4" />
            </button>
          </div>
        </div>
      )}

      <div className="plasmo-max-w-2xl plasmo-mx-auto">
        <div className="plasmo-bg-white plasmo-rounded-lg plasmo-shadow-sm plasmo-border plasmo-border-gray-200 plasmo-p-8">
          {/* Header */}
          <div className="plasmo-mb-8">
            <h1 className="plasmo-text-3xl plasmo-font-bold plasmo-text-gray-900 plasmo-mb-2">
              Side Search Settings
            </h1>
            <p className="plasmo-text-gray-600">
              Configure your Tavily API key for AI-powered web search
            </p>
          </div>

          {/* API Key Section */}
          <div className="plasmo-mb-6">
            <label
              htmlFor="apiKey"
              className="plasmo-block plasmo-text-sm plasmo-font-medium plasmo-text-gray-700 plasmo-mb-2">
              Tavily API Key <span className="plasmo-text-red-500">*</span>
            </label>
            <input
              type="password"
              id="apiKey"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="tvly-YOUR_API_KEY"
              className="plasmo-w-full plasmo-px-4 plasmo-py-3 plasmo-border plasmo-border-gray-300 plasmo-rounded-lg focus:plasmo-ring-2 focus:plasmo-ring-blue-500 focus:plasmo-border-transparent plasmo-outline-none plasmo-transition"
            />
            <p className="plasmo-mt-2 plasmo-text-sm plasmo-text-gray-500">
              Don't have an API key?{" "}
              <a
                href="https://tavily.com"
                target="_blank"
                rel="noopener noreferrer"
                className="plasmo-text-blue-600 hover:plasmo-underline plasmo-font-medium">
                Get one free at tavily.com
              </a>
            </p>
          </div>

          {/* Action Buttons */}
          <div className="plasmo-flex plasmo-gap-3">
            <button
              onClick={handleSave}
              className="plasmo-flex-1 plasmo-py-3 plasmo-px-4 plasmo-bg-blue-600 hover:plasmo-bg-blue-700 plasmo-text-white plasmo-font-medium plasmo-rounded-lg plasmo-transition">
              Save API Key
            </button>
          </div>

          {/* Info Section */}
          <div className="plasmo-mt-8 plasmo-pt-6 plasmo-border-t plasmo-border-gray-200">
            <h3 className="plasmo-text-lg plasmo-font-semibold plasmo-text-gray-900 plasmo-mb-3">
              About Tavily API
            </h3>
            <div className="plasmo-space-y-2 plasmo-text-sm plasmo-text-gray-600">
              <p>
                • Tavily provides AI-powered search results with generated answers
              </p>
              <p>• Free tier includes monthly API credits</p>
              <p>• Your API key is stored locally and never shared</p>
              <p>
                • Learn more at{" "}
                <a
                  href="https://docs.tavily.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="plasmo-text-blue-600 hover:plasmo-underline">
                  docs.tavily.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OptionsIndex
