import { useState, useEffect } from "react"
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
      setError("Please enter your Tavily API key")
      return
    }

    // Save API key to Chrome storage for future use
    chrome.storage.local.set({ tavilyApiKey: apiKey })

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
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f9fafb",
        fontFamily: "Inter, system-ui, sans-serif"
      }}>
      {currentPage === "query" && (
        <div style={{ maxWidth: "42rem", margin: "0 auto", padding: "1.5rem" }}>
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "0.5rem",
              boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
              border: "1px solid #e5e7eb",
              padding: "1.5rem"
            }}>
            <div style={{ marginBottom: "1.5rem" }}>
              <h1
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "700",
                  color: "#111827",
                  marginBottom: "0.5rem"
                }}>
                Web Search
              </h1>
              <p style={{ fontSize: "0.875rem", color: "#4b5563" }}>
                Search the web using Tavily AI-powered search
              </p>
            </div>

            <form
              onSubmit={handleSearch}
              style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              {/* API Key Input */}
              <div>
                <label
                  htmlFor="apiKey"
                  style={{
                    display: "block",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    color: "#374151",
                    marginBottom: "0.5rem"
                  }}>
                  Tavily API Key
                </label>
                <input
                  type="password"
                  id="apiKey"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="tvly-YOUR_API_KEY"
                  style={{
                    width: "100%",
                    padding: "0.5rem 1rem",
                    border: "1px solid #d1d5db",
                    borderRadius: "0.5rem",
                    outline: "none",
                    fontSize: "0.875rem"
                  }}
                />
                <p style={{ marginTop: "0.25rem", fontSize: "0.75rem", color: "#6b7280" }}>
                  Get your API key from{" "}
                  <a
                    href="https://tavily.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#2563eb", textDecoration: "underline" }}>
                    tavily.com
                  </a>
                </p>
              </div>

              {/* Query Input */}
              <div>
                <label
                  htmlFor="query"
                  style={{
                    display: "block",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    color: "#374151",
                    marginBottom: "0.5rem"
                  }}>
                  Search Query <span style={{ color: "#ef4444" }}>*</span>
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
                  style={{
                    width: "100%",
                    padding: "0.5rem 1rem",
                    border: "1px solid #d1d5db",
                    borderRadius: "0.5rem",
                    outline: "none",
                    fontSize: "0.875rem",
                    resize: "none"
                  }}
                />
                <div
                  style={{
                    marginTop: "0.25rem",
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "0.75rem",
                    color: "#6b7280"
                  }}>
                  <span>Enter your search query</span>
                  <span>{query.length}/1000</span>
                </div>
              </div>

              {/* Topic Radio Buttons */}
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    color: "#374151",
                    marginBottom: "0.75rem"
                  }}>
                  Topic <span style={{ color: "#ef4444" }}>*</span>
                </label>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  <label style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
                    <input
                      type="radio"
                      name="topic"
                      value="general"
                      checked={topic === "general"}
                      onChange={(e) => setTopic(e.target.value as SearchTopic)}
                      style={{ width: "1rem", height: "1rem" }}
                    />
                    <span style={{ marginLeft: "0.75rem", flex: "1" }}>
                      <span
                        style={{
                          display: "block",
                          fontSize: "0.875rem",
                          fontWeight: "500",
                          color: "#111827"
                        }}>
                        General
                      </span>
                      <span
                        style={{
                          display: "block",
                          fontSize: "0.75rem",
                          color: "#6b7280"
                        }}>
                        Broader, general-purpose searches
                      </span>
                    </span>
                  </label>

                  <label style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
                    <input
                      type="radio"
                      name="topic"
                      value="news"
                      checked={topic === "news"}
                      onChange={(e) => setTopic(e.target.value as SearchTopic)}
                      style={{ width: "1rem", height: "1rem" }}
                    />
                    <span style={{ marginLeft: "0.75rem", flex: "1" }}>
                      <span
                        style={{
                          display: "block",
                          fontSize: "0.875rem",
                          fontWeight: "500",
                          color: "#111827"
                        }}>
                        News
                      </span>
                      <span
                        style={{
                          display: "block",
                          fontSize: "0.75rem",
                          color: "#6b7280"
                        }}>
                        Real-time updates and current events
                      </span>
                    </span>
                  </label>

                  <label style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
                    <input
                      type="radio"
                      name="topic"
                      value="finance"
                      checked={topic === "finance"}
                      onChange={(e) => setTopic(e.target.value as SearchTopic)}
                      style={{ width: "1rem", height: "1rem" }}
                    />
                    <span style={{ marginLeft: "0.75rem", flex: "1" }}>
                      <span
                        style={{
                          display: "block",
                          fontSize: "0.875rem",
                          fontWeight: "500",
                          color: "#111827"
                        }}>
                        Finance
                      </span>
                      <span
                        style={{
                          display: "block",
                          fontSize: "0.75rem",
                          color: "#6b7280"
                        }}>
                        Financial news and market information
                      </span>
                    </span>
                  </label>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div
                  style={{
                    padding: "1rem",
                    backgroundColor: "#fef2f2",
                    border: "1px solid #fecaca",
                    borderRadius: "0.5rem"
                  }}>
                  <p style={{ fontSize: "0.875rem", color: "#991b1b" }}>{error}</p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                style={{
                  width: "100%",
                  padding: "0.75rem 1rem",
                  backgroundColor: isLoading ? "#60a5fa" : "#2563eb",
                  color: "white",
                  fontWeight: "500",
                  borderRadius: "0.5rem",
                  border: "none",
                  cursor: isLoading ? "not-allowed" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.875rem"
                }}>
                {isLoading ? (
                  <>
                    <svg
                      style={{
                        animation: "spin 1s linear infinite",
                        marginRight: "0.75rem",
                        height: "1.25rem",
                        width: "1.25rem"
                      }}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24">
                      <circle
                        style={{ opacity: 0.25 }}
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"></circle>
                      <path
                        style={{ opacity: 0.75 }}
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
        <div style={{ maxWidth: "56rem", margin: "0 auto", padding: "1.5rem" }}>
          {/* Header with Back Button */}
          <div style={{ marginBottom: "1.5rem" }}>
            <button
              onClick={handleBackToQuery}
              style={{
                display: "flex",
                alignItems: "center",
                color: "#2563eb",
                fontWeight: "500",
                marginBottom: "1rem",
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: "0.875rem"
              }}>
              <svg
                style={{ width: "1.25rem", height: "1.25rem", marginRight: "0.5rem" }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              New Search
            </button>

            <div
              style={{
                backgroundColor: "white",
                borderRadius: "0.5rem",
                boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
                border: "1px solid #e5e7eb",
                padding: "1.5rem"
              }}>
              <h2
                style={{
                  fontSize: "1.25rem",
                  fontWeight: "700",
                  color: "#111827",
                  marginBottom: "0.5rem"
                }}>
                {searchResponse.query}
              </h2>
              <p style={{ fontSize: "0.75rem", color: "#6b7280" }}>
                Found {searchResponse.results.length} results in{" "}
                {searchResponse.response_time.toFixed(2)}s
              </p>
            </div>
          </div>

          {/* AI-Generated Answer */}
          {searchResponse.answer && (
            <div
              style={{
                marginBottom: "1.5rem",
                background: "linear-gradient(to bottom right, #eff6ff, #eef2ff)",
                borderRadius: "0.5rem",
                boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
                border: "1px solid #bfdbfe",
                padding: "1.5rem"
              }}>
              <div style={{ display: "flex", alignItems: "flex-start", marginBottom: "0.75rem" }}>
                <div
                  style={{
                    flexShrink: 0,
                    width: "2rem",
                    height: "2rem",
                    backgroundColor: "#2563eb",
                    borderRadius: "9999px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}>
                  <svg
                    style={{ width: "1.25rem", height: "1.25rem", color: "white" }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3
                  style={{
                    marginLeft: "0.75rem",
                    fontSize: "1.125rem",
                    fontWeight: "600",
                    color: "#111827"
                  }}>
                  AI Answer
                </h3>
              </div>
              <p style={{ color: "#1f2937", lineHeight: "1.625" }}>
                {searchResponse.answer}
              </p>
            </div>
          )}

          {/* Search Results */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <h3
              style={{
                fontSize: "1.125rem",
                fontWeight: "600",
                color: "#111827",
                marginBottom: "1rem"
              }}>
              Top Results
            </h3>

            {searchResponse.results.map((result, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: "white",
                  borderRadius: "0.5rem",
                  boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
                  border: "1px solid #e5e7eb",
                  padding: "1.25rem"
                }}>
                <a
                  href={result.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "none" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", marginBottom: "0.5rem" }}>
                    {result.favicon && (
                      <img
                        src={result.favicon}
                        alt=""
                        style={{
                          width: "1rem",
                          height: "1rem",
                          marginTop: "0.25rem",
                          marginRight: "0.5rem",
                          flexShrink: 0
                        }}
                        onError={(e) => {
                          e.currentTarget.style.display = "none"
                        }}
                      />
                    )}
                    <h4
                      style={{
                        fontSize: "1.125rem",
                        fontWeight: "600",
                        color: "#2563eb",
                        flex: "1"
                      }}>
                      {result.title}
                    </h4>
                  </div>

                  <p
                    style={{
                      fontSize: "0.75rem",
                      color: "#6b7280",
                      marginBottom: "0.5rem",
                      wordBreak: "break-all"
                    }}>
                    {result.url}
                  </p>

                  <p
                    style={{
                      fontSize: "0.875rem",
                      color: "#374151",
                      lineHeight: "1.625"
                    }}>
                    {result.content}
                  </p>

                  <div
                    style={{
                      marginTop: "0.75rem",
                      display: "flex",
                      alignItems: "center",
                      fontSize: "0.75rem",
                      color: "#6b7280"
                    }}>
                    <span style={{ display: "flex", alignItems: "center" }}>
                      <svg
                        style={{ width: "0.75rem", height: "0.75rem", marginRight: "0.25rem" }}
                        fill="currentColor"
                        viewBox="0 0 20 20">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path
                          fillRule="evenodd"
                          d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Relevance: {(result.score * 100).toFixed(0)}%
                    </span>
                  </div>
                </a>
              </div>
            ))}
          </div>

          {searchResponse.results.length === 0 && (
            <div
              style={{
                backgroundColor: "white",
                borderRadius: "0.5rem",
                boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
                border: "1px solid #e5e7eb",
                padding: "2rem",
                textAlign: "center"
              }}>
              <svg
                style={{
                  margin: "0 auto",
                  height: "3rem",
                  width: "3rem",
                  color: "#9ca3af",
                  marginBottom: "1rem"
                }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p style={{ color: "#4b5563" }}>No results found</p>
            </div>
          )}
        </div>
      )}

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}

export default IndexSidePanel
