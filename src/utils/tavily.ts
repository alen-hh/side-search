import type { SearchRequest, SearchResponse, SearchError } from "~types/tavily"

const TAVILY_API_URL = "https://api.tavily.com/search"

export async function searchWithTavily(
  request: SearchRequest,
  apiKey: string
): Promise<SearchResponse> {
  if (!apiKey) {
    throw new Error("API key is required")
  }

  try {
    const response = await fetch(TAVILY_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        api_key: apiKey,
        ...request
      })
    })

    if (!response.ok) {
      const error: SearchError = await response.json()
      throw new Error(error.detail?.error || `HTTP error! status: ${response.status}`)
    }

    const data: SearchResponse = await response.json()
    return data
  } catch (error) {
    if (error instanceof Error) {
      throw error
    }
    throw new Error("An unknown error occurred")
  }
}

