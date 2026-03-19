import { useState, useCallback } from 'react'

export interface SearchResult {
  id: string
  title: string
  url: string
  snippet: string
  source: string
  timestamp: Date
}

interface UseWebSearchReturn {
  search: (query: string) => Promise<SearchResult[]>
  isSearching: boolean
  results: SearchResult[]
  error: string | null
  clearResults: () => void
}

export function useWebSearch(): UseWebSearchReturn {
  const [isSearching, setIsSearching] = useState(false)
  const [results, setResults] = useState<SearchResult[]>([])
  const [error, setError] = useState<string | null>(null)

  const search = useCallback(async (query: string): Promise<SearchResult[]> => {
    if (!query.trim()) {
      setError('Query cannot be empty')
      return []
    }

    setIsSearching(true)
    setError(null)

    try {
      // In production, this would call a real search API
      // For now, we'll simulate with DuckDuckGo Instant Answer API (no key needed)
      const response = await fetch(
        `https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json&no_html=1&skip_disambig=1`
      )

      if (!response.ok) {
        throw new Error('Search API error')
      }

      const data = await response.json()

      // Transform DuckDuckGo results to our format
      const searchResults: SearchResult[] = []

      // Add abstract as first result if available
      if (data.Abstract) {
        searchResults.push({
          id: crypto.randomUUID(),
          title: data.Heading || query,
          url: data.AbstractURL || '#',
          snippet: data.Abstract,
          source: data.AbstractSource || 'DuckDuckGo',
          timestamp: new Date()
        })
      }

      // Add related topics
      if (data.RelatedTopics && Array.isArray(data.RelatedTopics)) {
        data.RelatedTopics.slice(0, 5).forEach((topic: any) => {
          if (topic.Text && topic.FirstURL) {
            searchResults.push({
              id: crypto.randomUUID(),
              title: topic.Text.split(' - ')[0] || topic.Text,
              url: topic.FirstURL,
              snippet: topic.Text,
              source: 'DuckDuckGo',
              timestamp: new Date()
            })
          }
        })
      }

      // Fallback: create simulated results if API returns nothing
      if (searchResults.length === 0) {
        searchResults.push(
          {
            id: crypto.randomUUID(),
            title: `Search results for: ${query}`,
            url: `https://duckduckgo.com/?q=${encodeURIComponent(query)}`,
            snippet: `Performing real-time search for "${query}". Click to see full results.`,
            source: 'DuckDuckGo',
            timestamp: new Date()
          },
          {
            id: crypto.randomUUID(),
            title: `${query} - GitHub`,
            url: `https://github.com/search?q=${encodeURIComponent(query)}`,
            snippet: `Find code, repositories, and developers related to ${query}`,
            source: 'GitHub',
            timestamp: new Date()
          },
          {
            id: crypto.randomUUID(),
            title: `${query} - Stack Overflow`,
            url: `https://stackoverflow.com/search?q=${encodeURIComponent(query)}`,
            snippet: `Technical Q&A and solutions for ${query}`,
            source: 'Stack Overflow',
            timestamp: new Date()
          }
        )
      }

      setResults(searchResults)
      setIsSearching(false)
      return searchResults

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Search failed'
      setError(errorMessage)
      setIsSearching(false)

      // Return fallback results even on error
      const fallbackResults: SearchResult[] = [
        {
          id: crypto.randomUUID(),
          title: query,
          url: `https://duckduckgo.com/?q=${encodeURIComponent(query)}`,
          snippet: `Search for "${query}" (API temporarily unavailable - click to search manually)`,
          source: 'Fallback',
          timestamp: new Date()
        }
      ]
      setResults(fallbackResults)
      return fallbackResults
    }
  }, [])

  const clearResults = useCallback(() => {
    setResults([])
    setError(null)
  }, [])

  return {
    search,
    isSearching,
    results,
    error,
    clearResults
  }
}
