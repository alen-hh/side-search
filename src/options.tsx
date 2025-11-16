import { useState, useEffect } from "react"
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
      setSavedMessage("Please enter an API key")
      setTimeout(() => setSavedMessage(""), 3000)
      return
    }

    chrome.storage.local.set({ tavilyApiKey: apiKey.trim() }, () => {
      setSavedMessage("API key saved successfully!")
      setTimeout(() => setSavedMessage(""), 3000)
    })
  }

  const handleClear = () => {
    chrome.storage.local.remove("tavilyApiKey", () => {
      setApiKey("")
      setSavedMessage("API key cleared")
      setTimeout(() => setSavedMessage(""), 3000)
    })
  }

  if (isLoading) {
    return (
      <div className="plasmo-min-h-screen plasmo-bg-gray-50 plasmo-flex plasmo-items-center plasmo-justify-center">
        <div className="plasmo-text-gray-600">Loading...</div>
      </div>
    )
  }

  return (
    <div className="plasmo-min-h-screen plasmo-bg-gray-50 plasmo-py-12 plasmo-px-4">
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

          {/* Success/Error Message */}
          {savedMessage && (
            <div
              className={`plasmo-mb-6 plasmo-p-4 plasmo-rounded-lg ${
                savedMessage.includes("successfully")
                  ? "plasmo-bg-green-50 plasmo-border plasmo-border-green-200"
                  : "plasmo-bg-yellow-50 plasmo-border plasmo-border-yellow-200"
              }`}>
              <p
                className={`plasmo-text-sm ${
                  savedMessage.includes("successfully")
                    ? "plasmo-text-green-800"
                    : "plasmo-text-yellow-800"
                }`}>
                {savedMessage}
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="plasmo-flex plasmo-gap-3">
            <button
              onClick={handleSave}
              className="plasmo-flex-1 plasmo-py-3 plasmo-px-4 plasmo-bg-blue-600 hover:plasmo-bg-blue-700 plasmo-text-white plasmo-font-medium plasmo-rounded-lg plasmo-transition">
              Save API Key
            </button>
            <button
              onClick={handleClear}
              className="plasmo-py-3 plasmo-px-4 plasmo-bg-gray-200 hover:plasmo-bg-gray-300 plasmo-text-gray-700 plasmo-font-medium plasmo-rounded-lg plasmo-transition">
              Clear
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
