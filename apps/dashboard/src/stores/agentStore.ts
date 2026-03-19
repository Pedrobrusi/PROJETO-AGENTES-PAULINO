import { create } from 'zustand'
import type { Agent, Message, Conversation, AgentTask } from '@/types/agent'
import { agents as initialAgents } from '@/data/agents'
import { analyzeRequest, generateOrchestrationResponse, executeTask } from '@/services/orchestration'

interface AgentStore {
  agents: Agent[]
  selectedAgent: Agent | null
  conversations: Conversation[]
  activeConversation: Conversation | null
  tasks: AgentTask[]
  webSearchFunction?: (query: string) => Promise<any[]>

  // Actions
  selectAgent: (agentId: string) => void
  sendMessage: (agentId: string, content: string) => Promise<void>
  createConversation: (agentId: string) => void
  updateAgentStatus: (agentId: string, status: Agent['status']) => void
  addTask: (task: Omit<AgentTask, 'id' | 'createdAt' | 'updatedAt'>) => void
  updateTask: (taskId: string, updates: Partial<AgentTask>) => void
  setWebSearchFunction: (fn: (query: string) => Promise<any[]>) => void
}

export const useAgentStore = create<AgentStore>((set, get) => ({
  agents: initialAgents,
  selectedAgent: null,
  conversations: [],
  activeConversation: null,
  tasks: [],

  selectAgent: (agentId: string) => {
    const agent = get().agents.find(a => a.id === agentId)
    if (agent) {
      set({ selectedAgent: agent })

      // Create or get existing conversation
      let conversation = get().conversations.find(
        c => c.agentId === agentId && c.messages.length > 0
      )

      if (!conversation) {
        get().createConversation(agentId)
      } else {
        set({ activeConversation: conversation })
      }
    }
  },

  sendMessage: async (agentId: string, content: string) => {
    const userMessage: Message = {
      id: crypto.randomUUID(),
      agentId,
      content,
      timestamp: new Date(),
      type: 'user',
      status: 'pending'
    }

    // Add user message
    set(state => {
      const conversation = state.activeConversation
      if (conversation) {
        return {
          activeConversation: {
            ...conversation,
            messages: [...conversation.messages, userMessage],
            updatedAt: new Date()
          },
          conversations: state.conversations.map(c =>
            c.id === conversation.id
              ? { ...conversation, messages: [...conversation.messages, userMessage] }
              : c
          )
        }
      }
      return state
    })

    // Update agent status
    get().updateAgentStatus(agentId, 'busy')

    // JARVIS ORCHESTRATION LOGIC
    if (agentId === 'jarvis') {
      // Analyze request and create orchestration plan
      const orchestrationTask = analyzeRequest(content, get().agents)

      // Send orchestration response immediately
      const orchestrationResponse = generateOrchestrationResponse(orchestrationTask)

      const orchestrationMessage: Message = {
        id: crypto.randomUUID(),
        agentId: 'jarvis',
        content: orchestrationResponse,
        timestamp: new Date(),
        type: 'agent',
        status: 'completed'
      }

      set(state => {
        const conversation = state.activeConversation
        if (conversation) {
          return {
            activeConversation: {
              ...conversation,
              messages: [
                ...conversation.messages.map(m =>
                  m.id === userMessage.id ? { ...m, status: 'completed' as const } : m
                ),
                orchestrationMessage
              ],
              updatedAt: new Date()
            },
            conversations: state.conversations.map(c =>
              c.id === conversation.id
                ? {
                    ...conversation,
                    messages: [
                      ...conversation.messages.map(m =>
                        m.id === userMessage.id ? { ...m, status: 'completed' as const } : m
                      ),
                      orchestrationMessage
                    ]
                  }
                : c
            )
          }
        }
        return state
      })

      // Execute task asynchronously
      setTimeout(async () => {
        const executionResult = await executeTask(
          orchestrationTask,
          get().webSearchFunction
        )

        const resultMessage: Message = {
          id: crypto.randomUUID(),
          agentId: 'jarvis',
          content: executionResult,
          timestamp: new Date(),
          type: 'agent',
          status: 'completed'
        }

        set(state => {
          const conversation = state.activeConversation
          if (conversation) {
            return {
              activeConversation: {
                ...conversation,
                messages: [...conversation.messages, resultMessage],
                updatedAt: new Date()
              },
              conversations: state.conversations.map(c =>
                c.id === conversation.id
                  ? { ...conversation, messages: [...conversation.messages, resultMessage] }
                  : c
              )
            }
          }
          return state
        })

        get().updateAgentStatus('jarvis', 'active')
      }, 2000)

      return
    }

    // Normal agent response (non-JARVIS)
    setTimeout(() => {
      const agent = get().agents.find(a => a.id === agentId)
      const agentMessage: Message = {
        id: crypto.randomUUID(),
        agentId,
        content: `[${agent?.persona}] Recebi sua mensagem: "${content}". Como posso ajudar?`,
        timestamp: new Date(),
        type: 'agent',
        status: 'completed'
      }

      set(state => {
        const conversation = state.activeConversation
        if (conversation) {
          return {
            activeConversation: {
              ...conversation,
              messages: [...conversation.messages, agentMessage],
              updatedAt: new Date()
            },
            conversations: state.conversations.map(c =>
              c.id === conversation.id
                ? { ...conversation, messages: [...conversation.messages, agentMessage] }
                : c
            )
          }
        }
        return state
      })

      // Update user message status
      set(state => {
        const conversation = state.activeConversation
        if (conversation) {
          return {
            activeConversation: {
              ...conversation,
              messages: conversation.messages.map(m =>
                m.id === userMessage.id ? { ...m, status: 'completed' } : m
              )
            },
            conversations: state.conversations.map(c =>
              c.id === conversation.id
                ? {
                    ...conversation,
                    messages: conversation.messages.map(m =>
                      m.id === userMessage.id ? { ...m, status: 'completed' } : m
                    )
                  }
                : c
            )
          }
        }
        return state
      })

      get().updateAgentStatus(agentId, 'idle')
    }, 1000 + Math.random() * 2000)
  },

  createConversation: (agentId: string) => {
    const agent = get().agents.find(a => a.id === agentId)
    if (!agent) return

    const conversation: Conversation = {
      id: crypto.randomUUID(),
      agentId,
      messages: [
        {
          id: crypto.randomUUID(),
          agentId,
          content: `Olá! Eu sou ${agent.persona} ${agent.icon}. ${agent.description}. Como posso ajudar você hoje?`,
          timestamp: new Date(),
          type: 'agent'
        }
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
      title: `Conversa com ${agent.name}`
    }

    set(state => ({
      conversations: [...state.conversations, conversation],
      activeConversation: conversation
    }))
  },

  updateAgentStatus: (agentId: string, status: Agent['status']) => {
    set(state => ({
      agents: state.agents.map(a =>
        a.id === agentId ? { ...a, status } : a
      ),
      selectedAgent:
        state.selectedAgent?.id === agentId
          ? { ...state.selectedAgent, status }
          : state.selectedAgent
    }))
  },

  addTask: (task) => {
    const newTask: AgentTask = {
      ...task,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date()
    }
    set(state => ({ tasks: [...state.tasks, newTask] }))
  },

  updateTask: (taskId: string, updates: Partial<AgentTask>) => {
    set(state => ({
      tasks: state.tasks.map(t =>
        t.id === taskId
          ? { ...t, ...updates, updatedAt: new Date() }
          : t
      )
    }))
  },

  setWebSearchFunction: (fn: (query: string) => Promise<any[]>) => {
    set({ webSearchFunction: fn })
  }
}))
