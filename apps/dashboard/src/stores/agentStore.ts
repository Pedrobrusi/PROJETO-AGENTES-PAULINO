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

      // Execute task asynchronously with real agent delegation
      setTimeout(async () => {
        // Create a function to delegate messages to agents
        const delegateToAgent = async (targetAgentId: string, message: string) => {
          // Find or create conversation with target agent
          let targetConversation = get().conversations.find(
            c => c.agentId === targetAgentId
          )

          if (!targetConversation) {
            targetConversation = {
              id: crypto.randomUUID(),
              agentId: targetAgentId,
              messages: [],
              createdAt: new Date(),
              updatedAt: new Date()
            }
            set(state => ({
              conversations: [...state.conversations, targetConversation!]
            }))
          }

          // Add orchestrated task message to agent's conversation
          const taskMessage: Message = {
            id: crypto.randomUUID(),
            agentId: 'jarvis',
            content: `🎯 **Task from Orchestrator:**\n\n${message}`,
            timestamp: new Date(),
            type: 'user',
            status: 'sending'
          }

          set(state => ({
            conversations: state.conversations.map(c =>
              c.id === targetConversation!.id
                ? { ...c, messages: [...c.messages, taskMessage], updatedAt: new Date() }
                : c
            )
          }))

          // Trigger agent response
          get().updateAgentStatus(targetAgentId, 'busy')

          // Simulate agent processing and response
          setTimeout(() => {
            const targetAgent = get().agents.find(a => a.id === targetAgentId)

            // Generate contextual response based on agent type
            let agentResponse = `**[${targetAgent?.persona}]**\n\n`
            agentResponse += `✅ Task acknowledged and processed.\n\n`
            agentResponse += `**My Analysis:**\n`

            if (targetAgentId === 'dev') {
              agentResponse += `- Reviewing code requirements\n`
              agentResponse += `- Planning implementation strategy\n`
              agentResponse += `- Identifying dependencies and libraries needed\n`
              agentResponse += `- Preparing development environment\n\n`
              agentResponse += `**Next Steps:**\n`
              agentResponse += `1. Create file structure\n`
              agentResponse += `2. Implement core functionality\n`
              agentResponse += `3. Add error handling and validation\n`
              agentResponse += `4. Write unit tests\n`
            } else if (targetAgentId === 'qa') {
              agentResponse += `- Analyzing test scenarios\n`
              agentResponse += `- Preparing test cases and coverage plan\n`
              agentResponse += `- Setting up test environment\n\n`
              agentResponse += `**Test Strategy:**\n`
              agentResponse += `1. Unit tests for core logic\n`
              agentResponse += `2. Integration tests\n`
              agentResponse += `3. E2E workflow validation\n`
            } else if (targetAgentId === 'architect') {
              agentResponse += `- Evaluating system design patterns\n`
              agentResponse += `- Considering scalability and performance\n`
              agentResponse += `- Planning component architecture\n\n`
              agentResponse += `**Architecture Proposal:**\n`
              agentResponse += `1. System components and boundaries\n`
              agentResponse += `2. Data flow and state management\n`
              agentResponse += `3. API contracts and interfaces\n`
            } else if (targetAgentId === 'ux-design-expert') {
              agentResponse += `- Analyzing user needs and workflows\n`
              agentResponse += `- Considering accessibility and usability\n`
              agentResponse += `- Planning component design system\n\n`
              agentResponse += `**UX Approach:**\n`
              agentResponse += `1. User journey mapping\n`
              agentResponse += `2. Wireframe and prototype\n`
              agentResponse += `3. Visual design and interactions\n`
            } else {
              agentResponse += `- Analyzing requirements\n`
              agentResponse += `- Gathering relevant information\n`
              agentResponse += `- Formulating approach\n\n`
              agentResponse += `**Action Plan:**\n`
              agentResponse += `1. Research and analysis\n`
              agentResponse += `2. Strategy development\n`
              agentResponse += `3. Implementation roadmap\n`
            }

            agentResponse += `\n📋 **Status:** Ready to proceed\n`
            agentResponse += `\n*Note: In production, this would execute actual AIOX CLI commands and generate real deliverables.*`

            const agentResponseMessage: Message = {
              id: crypto.randomUUID(),
              agentId: targetAgentId,
              content: agentResponse,
              timestamp: new Date(),
              type: 'agent',
              status: 'completed'
            }

            set(state => ({
              conversations: state.conversations.map(c =>
                c.id === targetConversation!.id
                  ? {
                      ...c,
                      messages: [
                        ...c.messages.map(m =>
                          m.id === taskMessage.id ? { ...m, status: 'completed' as const } : m
                        ),
                        agentResponseMessage
                      ],
                      updatedAt: new Date()
                    }
                  : c
              )
            }))

            get().updateAgentStatus(targetAgentId, 'idle')
          }, 1500)
        }

        const executionResult = await executeTask(
          orchestrationTask,
          get().webSearchFunction,
          delegateToAgent
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
