import { useState } from 'react'
import { Search, ExternalLink, Clock, Loader2, X } from 'lucide-react'
import { useWebSearch, type SearchResult } from '@/hooks/useWebSearch'

interface SearchPanelProps {
  agentId?: string
  onResultSelect?: (result: SearchResult) => void
}

export function SearchPanel({ agentId, onResultSelect }: SearchPanelProps) {
  const [query, setQuery] = useState('')
  const { search, isSearching, results, error, clearResults } = useWebSearch()

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      await search(query)
    }
  }

  const handleResultClick = (result: SearchResult) => {
    if (onResultSelect) {
      onResultSelect(result)
    }
  }

  const formatTimeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000)
    if (seconds < 60) return 'just now'
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
    return `${Math.floor(seconds / 86400)}d ago`
  }

  return (
    <div className="flex flex-col h-full">
      {/* Search Header */}
      <div className="jarvis-panel p-4 mb-4">
        <div className="flex items-center gap-3 mb-3">
          <Search className="text-sky-400" size={20} />
          <h3 className="jarvis-text-glow font-bold">Real-Time Search</h3>
          {agentId && (
            <span className="text-xs text-slate-500 ml-auto">
              for {agentId}
            </span>
          )}
        </div>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search the web in real-time..."
            className="flex-1 px-4 py-2 bg-slate-800/50 border border-sky-500/30 rounded-lg
                     text-slate-200 placeholder-slate-500
                     focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                     transition-all"
            disabled={isSearching}
          />
          <button
            type="submit"
            disabled={isSearching || !query.trim()}
            className="jarvis-button px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSearching ? (
              <Loader2 size={20} className="animate-spin" />
            ) : (
              <Search size={20} />
            )}
          </button>
          {results.length > 0 && (
            <button
              type="button"
              onClick={clearResults}
              className="p-2 rounded-lg bg-slate-800/50 border border-slate-700
                       hover:border-red-500/50 hover:bg-red-500/10
                       transition-all"
              title="Clear results"
            >
              <X size={20} className="text-slate-400 hover:text-red-400" />
            </button>
          )}
        </form>

        {error && (
          <div className="mt-3 p-3 rounded-lg bg-red-500/10 border border-red-500/30">
            <p className="text-sm text-red-400">{error}</p>
          </div>
        )}
      </div>

      {/* Search Results */}
      <div className="flex-1 overflow-y-auto space-y-3">
        {isSearching && (
          <div className="jarvis-panel p-8 text-center">
            <Loader2 size={48} className="mx-auto mb-4 text-sky-400 animate-spin" />
            <p className="text-slate-400">Searching the web...</p>
          </div>
        )}

        {!isSearching && results.length === 0 && query && (
          <div className="jarvis-panel p-8 text-center">
            <Search size={48} className="mx-auto mb-4 text-slate-600" />
            <p className="text-slate-400">No results found for "{query}"</p>
            <p className="text-sm text-slate-500 mt-2">Try a different search term</p>
          </div>
        )}

        {!isSearching && results.length === 0 && !query && (
          <div className="jarvis-panel p-8 text-center">
            <Search size={48} className="mx-auto mb-4 text-slate-600" />
            <p className="text-slate-400">Enter a search query to begin</p>
            <p className="text-sm text-slate-500 mt-2">
              All agents can search the web in real-time
            </p>
          </div>
        )}

        {results.map((result) => (
          <div
            key={result.id}
            className="jarvis-card cursor-pointer group"
            onClick={() => handleResultClick(result)}
          >
            {/* Result Header */}
            <div className="flex items-start justify-between mb-2">
              <h4 className="font-bold text-slate-200 group-hover:text-sky-400 transition-colors">
                {result.title}
              </h4>
              <a
                href={result.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-1 rounded hover:bg-sky-500/20 transition-colors"
                title="Open in new tab"
              >
                <ExternalLink size={16} className="text-slate-400 hover:text-sky-400" />
              </a>
            </div>

            {/* Result Snippet */}
            <p className="text-sm text-slate-300 mb-3 line-clamp-2">
              {result.snippet}
            </p>

            {/* Result Footer */}
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 rounded bg-sky-500/20 text-sky-400">
                  {result.source}
                </span>
                <a
                  href={result.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-500 hover:text-sky-400 transition-colors truncate max-w-xs"
                  onClick={(e) => e.stopPropagation()}
                >
                  {result.url}
                </a>
              </div>
              <div className="flex items-center gap-1 text-slate-500">
                <Clock size={12} />
                <span>{formatTimeAgo(result.timestamp)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
