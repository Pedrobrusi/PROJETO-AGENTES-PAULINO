import { useState, useRef, useEffect } from 'react'
import { Send, Loader2, Terminal, Copy, Check } from 'lucide-react'
import type { Agent, Message } from '@/types/agent'

interface ChatPanelProps {
  agent: Agent
  messages: Message[]
  onSendMessage: (content: string) => void
}

export function ChatPanel({ agent, messages, onSendMessage }: ChatPanelProps) {
  const [input, setInput] = useState('')
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      onSendMessage(input.trim())
      setInput('')
    }
  }

  const handleCopy = (messageId: string, content: string) => {
    navigator.clipboard.writeText(content)
    setCopiedId(messageId)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const formatTimestamp = (date: Date) => {
    return new Date(date).toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div
        className="flex items-center gap-3 p-4 border-b"
        style={{ borderColor: `${agent.color}30` }}
      >
        <div className="text-3xl">{agent.icon}</div>
        <div className="flex-1">
          <h2 className="font-bold text-xl" style={{ color: agent.color }}>
            {agent.name}
          </h2>
          <p className="text-sm text-gray-600">{agent.persona}</p>
        </div>
        <div className="flex items-center gap-2">
          <div
            className={`w-3 h-3 rounded-full ${
              agent.status === 'busy' ? 'bg-yellow-500 animate-pulse' : 'bg-green-500'
            }`}
          />
          <span className="text-sm text-gray-600">
            {agent.status === 'busy' ? 'Processando...' : 'Online'}
          </span>
        </div>
      </div>

      {/* Agent Commands Info */}
      <div className="p-3 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center gap-2 mb-2">
          <Terminal size={16} className="text-gray-600" />
          <span className="text-sm font-semibold text-gray-700">Comandos Disponíveis:</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {agent.commands.map((cmd) => (
            <div
              key={cmd.name}
              className="text-xs p-2 rounded bg-white border border-gray-200"
            >
              <code className="font-mono text-blue-600">{cmd.usage}</code>
              <p className="text-gray-600 mt-1">{cmd.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.type === 'user'
                  ? 'bg-blue-500 text-white'
                  : message.type === 'agent'
                  ? 'bg-gray-100 text-gray-900'
                  : 'bg-yellow-50 text-yellow-900 border border-yellow-200'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  {message.type === 'agent' && (
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg">{agent.icon}</span>
                      <span className="font-semibold text-sm">{agent.name}</span>
                    </div>
                  )}
                  <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span
                      className={`text-xs ${
                        message.type === 'user' ? 'text-blue-200' : 'text-gray-500'
                      }`}
                    >
                      {formatTimestamp(message.timestamp)}
                    </span>
                    {message.status === 'pending' && (
                      <Loader2 size={12} className="animate-spin" />
                    )}
                  </div>
                </div>
                <button
                  onClick={() => handleCopy(message.id, message.content)}
                  className={`p-1 rounded hover:bg-black/10 transition-colors ${
                    message.type === 'user' ? 'text-white' : 'text-gray-600'
                  }`}
                  title="Copiar mensagem"
                >
                  {copiedId === message.id ? (
                    <Check size={14} />
                  ) : (
                    <Copy size={14} />
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        className="p-4 border-t"
        style={{ borderColor: `${agent.color}30` }}
      >
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Envie uma mensagem para ${agent.name}...`}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
            style={{ focusRingColor: agent.color }}
            disabled={agent.status === 'busy'}
          />
          <button
            type="submit"
            disabled={!input.trim() || agent.status === 'busy'}
            className="px-4 py-2 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90"
            style={{ backgroundColor: agent.color }}
          >
            {agent.status === 'busy' ? (
              <Loader2 size={20} className="animate-spin" />
            ) : (
              <Send size={20} />
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
