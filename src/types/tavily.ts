// Tavily Search API Types

export type SearchTopic = "general" | "news" | "finance"

export interface SearchRequest {
  query: string
  topic?: SearchTopic
  max_results?: number
  include_answer?: boolean | "basic" | "advanced"
  include_favicon?: boolean
}

export interface SearchResult {
  title: string
  url: string
  content: string
  score: number
  favicon?: string
}

export interface SearchResponse {
  query: string
  answer?: string
  results: SearchResult[]
  images: any[]
  response_time: number
  request_id?: string
}

export interface SearchError {
  detail: {
    error: string
  }
}

