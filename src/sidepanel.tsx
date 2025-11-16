import { useState, useEffect } from "react"
import { Cog6ToothIcon, ArrowLeftIcon, BoltIcon, GlobeAltIcon, EyeIcon, FaceFrownIcon } from "@heroicons/react/24/outline"
import type { SearchTopic, SearchResponse } from "~types/tavily"
import { searchWithTavily } from "~utils/tavily"
import "~style.css"

type Page = "query" | "result"

function IndexSidePanel() {
  // Page state
  const [currentPage, setCurrentPage] = useState<Page>("query")

  // Form state
  const [query, setQuery] = useState("")
  const [topic, setTopic] = useState<SearchTopic>("general")
  const [apiKey, setApiKey] = useState("")

  // Result state
  const [searchResponse, setSearchResponse] = useState<SearchResponse | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Load API key from Chrome storage on mount
  useEffect(() => {
    chrome.storage.local.get(["tavilyApiKey"], (result) => {
      if (result.tavilyApiKey) {
        setApiKey(result.tavilyApiKey)
      }
    })
  }, [])

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!query.trim()) {
      setError("Please enter a search query")
      return
    }

    if (!apiKey.trim()) {
      setError(
        "Please configure your Tavily API key in the extension options"
      )
      return
    }

    setIsLoading(true)

    try {
      const response = await searchWithTavily(
        {
          query: query.trim(),
          topic,
          max_results: 10,
          include_answer: true,
          include_favicon: true
        },
        apiKey
      )

      setSearchResponse(response)
      setCurrentPage("result")
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred during search")
    } finally {
      setIsLoading(false)
    }
  }

  const handleBackToQuery = () => {
    setCurrentPage("query")
    setError(null)
  }

  return (
    <div className="plasmo-min-h-screen plasmo-bg-gray-50 plasmo-font-sans">
      {currentPage === "query" && (
        <div className="plasmo-max-w-2xl plasmo-mx-auto plasmo-p-6">
          <div className="plasmo-bg-white plasmo-rounded-lg plasmo-shadow-sm plasmo-border plasmo-border-gray-200 plasmo-p-6">
            <div className="plasmo-mb-6">
              <div className="plasmo-flex plasmo-items-center plasmo-justify-between plasmo-mb-2">
                <h1 className="plasmo-text-2xl plasmo-font-bold plasmo-text-gray-900">
                  Web Search
                </h1>
                <button
                  onClick={() => chrome.runtime.openOptionsPage()}
                  className="plasmo-flex plasmo-items-center plasmo-gap-1 plasmo-px-3 plasmo-py-1.5 plasmo-text-sm plasmo-text-gray-600 hover:plasmo-text-gray-900 hover:plasmo-bg-gray-100 plasmo-rounded-md plasmo-transition plasmo-bg-transparent plasmo-border plasmo-border-gray-300 plasmo-cursor-pointer"
                  title="Open Settings">
                  <Cog6ToothIcon className="plasmo-w-4 plasmo-h-4" />
                </button>
              </div>
              <p className="plasmo-text-sm plasmo-text-gray-600">
                Search the web using Tavily AI-powered search
              </p>
              {!apiKey && (
                <div className="plasmo-mt-3 plasmo-p-3 plasmo-bg-yellow-50 plasmo-border plasmo-border-yellow-200 plasmo-rounded-lg">
                  <p className="plasmo-text-sm plasmo-text-yellow-800">
                    ⚠️ No API key configured.{" "}
                    <button
                      onClick={() => chrome.runtime.openOptionsPage()}
                      className="plasmo-text-yellow-900 plasmo-font-medium plasmo-underline hover:plasmo-text-yellow-700 plasmo-bg-transparent plasmo-border-none plasmo-cursor-pointer">
                      Configure it now
                    </button>
                  </p>
                </div>
              )}
            </div>

            <form onSubmit={handleSearch} className="plasmo-space-y-6">
              {/* Query Input */}
              <div>
                <label
                  htmlFor="query"
                  className="plasmo-block plasmo-text-sm plasmo-font-medium plasmo-text-gray-700 plasmo-mb-2">
                  Search Query <span className="plasmo-text-red-500">*</span>
                </label>
                <textarea
                  id="query"
                  value={query}
                  onChange={(e) => {
                    if (e.target.value.length <= 1000) {
                      setQuery(e.target.value)
                    }
                  }}
                  maxLength={1000}
                  rows={4}
                  placeholder="What would you like to search for?"
                  className="plasmo-w-full plasmo-px-4 plasmo-py-2 plasmo-border plasmo-border-gray-300 plasmo-rounded-lg focus:plasmo-ring-2 focus:plasmo-ring-blue-500 focus:plasmo-border-transparent plasmo-outline-none plasmo-transition plasmo-resize-none plasmo-text-sm"
                />
                <div className="plasmo-mt-1 plasmo-flex plasmo-justify-end plasmo-text-xs plasmo-text-gray-500">
                  <span>{query.length}/1000</span>
                </div>
              </div>

              {/* Topic Radio Buttons */}
              <div>
                <label className="plasmo-block plasmo-text-sm plasmo-font-medium plasmo-text-gray-700 plasmo-mb-3">
                  Topic <span className="plasmo-text-red-500">*</span>
                </label>
                <div className="plasmo-space-y-3">
                  <label className="plasmo-flex plasmo-items-center plasmo-cursor-pointer">
                    <input
                      type="radio"
                      name="topic"
                      value="general"
                      checked={topic === "general"}
                      onChange={(e) => setTopic(e.target.value as SearchTopic)}
                      className="plasmo-w-4 plasmo-h-4 plasmo-text-blue-600 focus:plasmo-ring-2 focus:plasmo-ring-blue-500"
                    />
                    <span className="plasmo-ml-3 plasmo-flex-1">
                      <span className="plasmo-block plasmo-text-sm plasmo-font-medium plasmo-text-gray-900">
                        General
                      </span>
                      <span className="plasmo-block plasmo-text-xs plasmo-text-gray-500">
                        Broader, general-purpose searches
                      </span>
                    </span>
                  </label>

                  <label className="plasmo-flex plasmo-items-center plasmo-cursor-pointer">
                    <input
                      type="radio"
                      name="topic"
                      value="news"
                      checked={topic === "news"}
                      onChange={(e) => setTopic(e.target.value as SearchTopic)}
                      className="plasmo-w-4 plasmo-h-4 plasmo-text-blue-600 focus:plasmo-ring-2 focus:plasmo-ring-blue-500"
                    />
                    <span className="plasmo-ml-3 plasmo-flex-1">
                      <span className="plasmo-block plasmo-text-sm plasmo-font-medium plasmo-text-gray-900">
                        News
                      </span>
                      <span className="plasmo-block plasmo-text-xs plasmo-text-gray-500">
                        Real-time updates and current events
                      </span>
                    </span>
                  </label>

                  <label className="plasmo-flex plasmo-items-center plasmo-cursor-pointer">
                    <input
                      type="radio"
                      name="topic"
                      value="finance"
                      checked={topic === "finance"}
                      onChange={(e) => setTopic(e.target.value as SearchTopic)}
                      className="plasmo-w-4 plasmo-h-4 plasmo-text-blue-600 focus:plasmo-ring-2 focus:plasmo-ring-blue-500"
                    />
                    <span className="plasmo-ml-3 plasmo-flex-1">
                      <span className="plasmo-block plasmo-text-sm plasmo-font-medium plasmo-text-gray-900">
                        Finance
                      </span>
                      <span className="plasmo-block plasmo-text-xs plasmo-text-gray-500">
                        Financial news and market information
                      </span>
                    </span>
                  </label>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="plasmo-p-4 plasmo-bg-red-50 plasmo-border plasmo-border-red-200 plasmo-rounded-lg">
                  <p className="plasmo-text-sm plasmo-text-red-800">
                    {error}
                    {error.includes("API key") && (
                      <>
                        {" "}
                        <button
                          onClick={() => chrome.runtime.openOptionsPage()}
                          className="plasmo-text-red-900 plasmo-font-medium plasmo-underline hover:plasmo-text-red-700 plasmo-bg-transparent plasmo-border-none plasmo-cursor-pointer">
                          Open Settings
                        </button>
                      </>
                    )}
                  </p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="plasmo-w-full plasmo-py-3 plasmo-px-4 plasmo-bg-blue-600 hover:plasmo-bg-blue-700 disabled:plasmo-bg-blue-400 plasmo-text-white plasmo-font-medium plasmo-rounded-lg plasmo-transition plasmo-flex plasmo-items-center plasmo-justify-center plasmo-text-sm disabled:plasmo-cursor-not-allowed">
                {isLoading ? (
                  <>
                    <svg
                      className="plasmo-animate-spin plasmo-mr-3 plasmo-h-5 plasmo-w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24">
                      <circle
                        className="plasmo-opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"></circle>
                      <path
                        className="plasmo-opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Searching...
                  </>
                ) : (
                  "Search"
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      {currentPage === "result" && searchResponse && (
        <div className="plasmo-max-w-4xl plasmo-mx-auto plasmo-p-6">
          {/* Header with Back Button */}
          <div className="plasmo-mb-6">
            <div className="plasmo-flex plasmo-items-center plasmo-justify-between plasmo-mb-4">
              <button
                onClick={handleBackToQuery}
                className="plasmo-flex plasmo-items-center plasmo-text-blue-600 hover:plasmo-text-blue-700 plasmo-font-medium plasmo-transition plasmo-bg-transparent plasmo-border-none plasmo-cursor-pointer plasmo-text-sm">
                <ArrowLeftIcon className="plasmo-w-5 plasmo-h-5 plasmo-mr-2" />
                New Search
              </button>

            </div>

            <div className="plasmo-bg-white plasmo-rounded-lg plasmo-shadow-sm plasmo-border plasmo-border-gray-200 plasmo-p-6">
              <h2 className="plasmo-text-xl plasmo-font-bold plasmo-text-gray-900 plasmo-mb-2">
                {searchResponse.query}
              </h2>
              <p className="plasmo-text-xs plasmo-text-gray-500">
                Found {searchResponse.results.length} results in{" "}
                {searchResponse.response_time.toFixed(2)}s
              </p>
            </div>
          </div>

          {/* AI-Generated Answer */}
          {searchResponse.answer && (
            <div className="plasmo-mb-6 plasmo-bg-gradient-to-br plasmo-from-blue-50 plasmo-to-indigo-50 plasmo-rounded-lg plasmo-shadow-sm plasmo-border plasmo-border-blue-200 plasmo-p-6">
              <div className="plasmo-flex plasmo-items-start plasmo-mb-3">
                <div className="plasmo-flex-shrink-0 plasmo-w-8 plasmo-h-8 plasmo-bg-blue-600 plasmo-rounded-full plasmo-flex plasmo-items-center plasmo-justify-center">
                  <BoltIcon className="plasmo-w-5 plasmo-h-5 plasmo-text-white" />
                </div>
                <h3 className="plasmo-ml-3 plasmo-text-lg plasmo-font-semibold plasmo-text-gray-900">
                  AI Answer
                </h3>
              </div>
              <p className="plasmo-text-base plasmo-text-gray-800 plasmo-leading-relaxed">{searchResponse.answer}</p>
            </div>
          )}

          {/* Search Results */}
          <div className="plasmo-bg-white plasmo-rounded-lg plasmo-shadow-sm plasmo-border plasmo-border-gray-200">
            <h3 className="plasmo-text-lg plasmo-font-semibold plasmo-text-gray-900 plasmo-px-4 plasmo-py-4 plasmo-border-b plasmo-border-gray-200">
              Top Results
            </h3>

            <div className="plasmo-divide-y plasmo-divide-gray-200">

            {searchResponse.results.map((result, index) => (
              <div
                key={index}
                className="plasmo-py-4 plasmo-px-4 hover:plasmo-bg-gray-50 plasmo-transition">
                <div
                  className="plasmo-no-underline plasmo-group plasmo-block">
                  {/* Title with favicon */}
                  <div className="plasmo-flex plasmo-items-start plasmo-gap-2 plasmo-mb-1">
                    <div className="plasmo-w-4 plasmo-h-4 plasmo-mt-0.5 plasmo-flex-shrink-0">
                      {result.favicon ? (
                        <img
                          src={result.favicon}
                          alt=""
                          className="plasmo-w-full plasmo-h-full plasmo-rounded-sm"
                          onError={(e) => {
                            // Replace with placeholder SVG on error
                            const parent = e.currentTarget.parentElement
                            if (parent) {
                              parent.innerHTML = `
                                <svg class="plasmo-w-full plasmo-h-full plasmo-text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                              `
                            }
                          }}
                        />
                      ) : (
                        <GlobeAltIcon className="plasmo-w-full plasmo-h-full plasmo-text-gray-400" />
                      )}
                    </div>
                    <h4 className="plasmo-text-base plasmo-font-semibold plasmo-text-blue-600 group-hover:plasmo-text-blue-700 group-hover:plasmo-underline plasmo-flex-1 plasmo-leading-snug">
                      <a href={result.url} target="_blank" rel="noopener noreferrer">{result.title}</a>
                    </h4>
                  </div>

                  {/* Content snippet */}
                  <p className="plasmo-text-sm plasmo-text-gray-600 plasmo-leading-relaxed plasmo-ml-6 plasmo-break-words plasmo-overflow-hidden">
                    {result.content.length > 100
                      ? `${result.content.substring(0, 100)}...`
                      : result.content}
                  </p>

                  {/* Relevance score */}
                  <div className="plasmo-mt-2 plasmo-ml-6">
                    <span className="plasmo-inline-flex plasmo-items-center plasmo-text-xs plasmo-text-gray-500">
                      <EyeIcon className="plasmo-w-3 plasmo-h-3 plasmo-mr-1" />
                      Relevance: {(result.score * 100).toFixed(0)}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
            </div>
          </div>

          {searchResponse.results.length === 0 && (
            <div className="plasmo-bg-white plasmo-rounded-lg plasmo-shadow-sm plasmo-border plasmo-border-gray-200 plasmo-p-8 plasmo-text-center">
              <FaceFrownIcon className="plasmo-mx-auto plasmo-h-12 plasmo-w-12 plasmo-text-gray-400 plasmo-mb-4" />
              <p className="plasmo-text-gray-600">No results found</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default IndexSidePanel
