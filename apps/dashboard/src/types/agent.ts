export interface Agent {
  id: string
  name: string
  persona: string
  description: string
  expertise: string[]
  commands: AgentCommand[]
  color: string
  icon: string
  status: 'idle' | 'active' | 'busy' | 'error'
}

export interface AgentCommand {
  name: string
  description: string
  usage: string
}

export interface Message {
  id: string
  agentId: string
  content: string
  timestamp: Date
  type: 'user' | 'agent' | 'system'
  status?: 'pending' | 'completed' | 'error'
}

export interface Conversation {
  id: string
  agentId: string
  messages: Message[]
  createdAt: Date
  updatedAt: Date
  title: string
}

export interface AgentTask {
  id: string
  agentId: string
  title: string
  description: string
  status: 'pending' | 'in_progress' | 'completed' | 'failed'
  createdAt: Date
  updatedAt: Date
  result?: string
}
