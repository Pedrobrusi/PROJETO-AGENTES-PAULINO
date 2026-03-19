import { useState, useEffect } from 'react'
import { Bot, Zap, Activity, Network, Search, Monitor } from 'lucide-react'
import { VoiceControl } from '@/components/VoiceControl'
import { ChatPanel } from '@/components/ChatPanel'
import { SearchPanel } from '@/components/SearchPanel'
import { ProjectPreview } from '@/components/ProjectPreview'
import { useAgentStore } from '@/stores/agentStore'
import { useProjectStore, initializeDemoProjects } from '@/stores/projectStore'
import { useSpeechSynthesis } from '@/hooks/useSpeechSynthesis'
import { useWebSearch } from '@/hooks/useWebSearch'
import '@/styles/jarvis.css'

function JarvisApp() {
  const [activeView, setActiveView] = useState<'orchestrator' | 'agents' | 'tasks' | 'search' | 'preview'>('orchestrator')
  const { agents, selectedAgent, activeConversation, selectAgent, sendMessage, setWebSearchFunction } = useAgentStore()
  const { search } = useWebSearch()
  const { speak } = useSpeechSynthesis()

  const jarvisAgent = agents.find(a => a.id === 'jarvis')
  const otherAgents = agents.filter(a => a.id !== 'jarvis')
  const { activeProject, getProjectByAgent } = useProjectStore()

  // Initialize demo projects on mount
  useEffect(() => {
    initializeDemoProjects()
  }, [])

  // Set web search function for orchestration
  useEffect(() => {
    setWebSearchFunction(search)
  }, [search, setWebSearchFunction])

  // Auto-select JARVIS on mount
  useEffect(() => {
    if (jarvisAgent && !selectedAgent) {
      selectAgent('jarvis')
      setTimeout(() => {
        speak('JARVIS online. All systems operational. At your service.')
      }, 500)
    }
  }, [jarvisAgent, selectedAgent, selectAgent, speak])

  // Get current project for selected agent
  const currentProject = selectedAgent ? getProjectByAgent(selectedAgent.id) : activeProject

  const handleVoiceCommand = (command: string) => {
    console.log('Voice command:', command)

    // Send command to JARVIS
    if (jarvisAgent) {
      sendMessage('jarvis', command)
    }
  }

  const getStatusCount = (status: string) => {
    return otherAgents.filter(a => a.status === status).length
  }

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Effects */}
      <div className="jarvis-background" />
      <div className="jarvis-grid" />

      {/* Main Container */}
      <div className="relative z-10 w-full h-full flex flex-col">
        {/* Header */}
        <header className="jarvis-panel m-6 p-6 jarvis-slide-in-left">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-5">
              <div className="jarvis-circle w-14 h-14 flex items-center justify-center">
                <Bot size={28} className="text-primary-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-neutral-900">
                  AIOX Orchestrator
                </h1>
                <p className="text-neutral-500 text-sm font-medium">
                  Agent Management System
                </p>
              </div>
            </div>

            {/* System Status */}
            <div className="flex gap-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-success">
                  {getStatusCount('idle')}
                </div>
                <div className="text-xs text-neutral-500 font-medium uppercase tracking-wider">Available</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-warning">
                  {getStatusCount('busy')}
                </div>
                <div className="text-xs text-neutral-500 font-medium uppercase tracking-wider">Active</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-600">
                  {agents.length}
                </div>
                <div className="text-xs text-neutral-500 font-medium uppercase tracking-wider">Total</div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <div className="flex-1 flex gap-6 px-6 pb-6 overflow-hidden">
          {/* Left Sidebar - Voice Control & Navigation */}
          <aside className="w-80 flex flex-col gap-5 jarvis-slide-in-left">
            {/* Voice Control */}
            <VoiceControl onCommand={handleVoiceCommand} />

            {/* Navigation */}
            <nav className="jarvis-panel p-5 flex-1">
              <h3 className="text-sm font-semibold text-neutral-700 mb-4 uppercase tracking-wider">
                Control Center
              </h3>
              <div className="space-y-2">
                <button
                  onClick={() => setActiveView('orchestrator')}
                  className={`
                    w-full flex items-center gap-3 p-3 rounded-lg transition-all font-medium
                    ${activeView === 'orchestrator'
                      ? 'bg-primary-50 text-primary-700 border border-primary-200'
                      : 'text-neutral-600 hover:bg-neutral-100 border border-transparent'
                    }
                  `}
                >
                  <Bot size={20} />
                  <span>Orchestrator</span>
                </button>

                <button
                  onClick={() => setActiveView('agents')}
                  className={`
                    w-full flex items-center gap-3 p-3 rounded-lg transition-all font-medium
                    ${activeView === 'agents'
                      ? 'bg-primary-50 text-primary-700 border border-primary-200'
                      : 'text-neutral-600 hover:bg-neutral-100 border border-transparent'
                    }
                  `}
                >
                  <Network size={20} />
                  <span>Agent Network</span>
                </button>

                <button
                  onClick={() => setActiveView('tasks')}
                  className={`
                    w-full flex items-center gap-3 p-3 rounded-lg transition-all font-medium
                    ${activeView === 'tasks'
                      ? 'bg-primary-50 text-primary-700 border border-primary-200'
                      : 'text-neutral-600 hover:bg-neutral-100 border border-transparent'
                    }
                  `}
                >
                  <Activity size={20} />
                  <span>Task Monitor</span>
                </button>

                <button
                  onClick={() => setActiveView('search')}
                  className={`
                    w-full flex items-center gap-3 p-3 rounded-lg transition-all font-medium
                    ${activeView === 'search'
                      ? 'bg-primary-50 text-primary-700 border border-primary-200'
                      : 'text-neutral-600 hover:bg-neutral-100 border border-transparent'
                    }
                  `}
                >
                  <Search size={20} />
                  <span>Web Search</span>
                </button>

                <button
                  onClick={() => setActiveView('preview')}
                  className={`
                    w-full flex items-center gap-3 p-3 rounded-lg transition-all font-medium
                    ${activeView === 'preview'
                      ? 'bg-primary-50 text-primary-700 border border-primary-200'
                      : 'text-neutral-600 hover:bg-neutral-100 border border-transparent'
                    }
                  `}
                >
                  <Monitor size={20} />
                  <span>Live Preview</span>
                </button>
              </div>

              {/* Agent Status List */}
              <div className="mt-8 pt-6 border-t border-neutral-200">
                <h4 className="text-xs font-semibold text-neutral-600 uppercase tracking-wider mb-3">
                  Active Agents
                </h4>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {otherAgents.map(agent => (
                    <button
                      key={agent.id}
                      onClick={() => {
                        selectAgent(agent.id)
                        setActiveView('agents')
                      }}
                      className="w-full flex items-center gap-3 p-2.5 rounded-lg hover:bg-neutral-100 transition-all group"
                    >
                      <div className={`
                        w-2 h-2 rounded-full
                        ${agent.status === 'idle' ? 'bg-success' :
                          agent.status === 'busy' ? 'bg-warning animate-pulse' :
                          'bg-neutral-400'}
                      `} />
                      <span className="text-sm flex-1 text-left text-neutral-700 font-medium group-hover:text-primary-700">
                        {agent.name}
                      </span>
                      <span className="text-lg">{agent.icon}</span>
                    </button>
                  ))}
                </div>
              </div>
            </nav>
          </aside>

          {/* Main Display Area */}
          <main className="flex-1 flex flex-col jarvis-fade-in">
            {activeView === 'orchestrator' && jarvisAgent && activeConversation && (
              <div className="jarvis-panel h-full overflow-hidden jarvis-scanline">
                <ChatPanel
                  agent={jarvisAgent}
                  messages={activeConversation.messages}
                  onSendMessage={(content) => {
                    sendMessage('jarvis', content)
                    speak('Processing your request.')
                  }}
                />
              </div>
            )}

            {activeView === 'agents' && (
              <div className="jarvis-panel p-6 overflow-auto h-full">
                <h2 className="text-2xl font-bold text-neutral-900 mb-6">
                  Agent Network
                </h2>

                {selectedAgent && selectedAgent.id !== 'jarvis' && activeConversation ? (
                  <div className="h-full">
                    <ChatPanel
                      agent={selectedAgent}
                      messages={activeConversation.messages}
                      onSendMessage={(content) => sendMessage(selectedAgent.id, content)}
                    />
                  </div>
                ) : (
                  <div className="grid grid-cols-2 xl:grid-cols-3 gap-4">
                    {otherAgents.map((agent, index) => (
                      <div
                        key={agent.id}
                        onClick={() => selectAgent(agent.id)}
                        className="jarvis-card cursor-pointer"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <div className="flex items-center gap-3 mb-4">
                          <div className={`
                            w-12 h-12 rounded-lg flex items-center justify-center text-2xl border-2
                          `} style={{
                            backgroundColor: `${agent.color}15`,
                            borderColor: `${agent.color}30`
                          }}>
                            {agent.icon}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-neutral-900">{agent.name}</h3>
                            <p className="text-xs text-neutral-500 font-medium">{agent.persona}</p>
                          </div>
                          <div className={`
                            w-3 h-3 rounded-full
                            ${agent.status === 'idle' ? 'bg-success' :
                              agent.status === 'busy' ? 'bg-warning animate-pulse' :
                              'bg-neutral-400'}
                          `} />
                        </div>

                        <p className="text-sm text-neutral-700 mb-4 leading-relaxed">
                          {agent.description}
                        </p>

                        <div className="flex flex-wrap gap-2">
                          {agent.expertise.slice(0, 3).map(skill => (
                            <span
                              key={skill}
                              className="px-3 py-1.5 text-xs font-medium rounded-md border"
                              style={{
                                backgroundColor: `${agent.color}10`,
                                borderColor: `${agent.color}30`,
                                color: agent.color
                              }}
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeView === 'tasks' && (
              <div className="jarvis-panel p-6 overflow-auto">
                <h2 className="text-2xl font-bold text-neutral-900 mb-6">
                  Task Monitor
                </h2>
                <div className="text-center py-16">
                  <Activity size={64} className="mx-auto mb-4 text-neutral-300" />
                  <p className="text-neutral-600 font-medium">No active tasks</p>
                  <p className="text-sm text-neutral-500 mt-2">
                    Delegate tasks to agents through the orchestrator
                  </p>
                </div>
              </div>
            )}

            {activeView === 'search' && (
              <div className="jarvis-panel p-6 overflow-auto h-full">
                <SearchPanel
                  agentId={selectedAgent?.id}
                  onResultSelect={(result) => {
                    console.log('Search result selected:', result)
                    if (selectedAgent) {
                      sendMessage(selectedAgent.id, `Research this: ${result.title} - ${result.url}`)
                    }
                  }}
                />
              </div>
            )}

            {activeView === 'preview' && (
              <div className="h-full">
                <ProjectPreview
                  agentId={selectedAgent?.id}
                  files={currentProject?.files || []}
                  autoRefresh={true}
                />
              </div>
            )}
          </main>

          {/* Right Sidebar - System Info */}
          <aside className="w-80 flex flex-col gap-5 jarvis-slide-in-right">
            {/* Quick Stats */}
            <div className="jarvis-panel p-5">
              <h3 className="text-sm font-semibold text-neutral-700 mb-5 uppercase tracking-wider">
                System Metrics
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-neutral-600 text-sm font-medium">CPU Usage</span>
                    <span className="text-primary-600 font-mono font-semibold text-sm">12%</span>
                  </div>
                  <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-primary-500 to-primary-400 transition-all" style={{ width: '12%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-neutral-600 text-sm font-medium">Memory</span>
                    <span className="text-primary-600 font-mono font-semibold text-sm">45%</span>
                  </div>
                  <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-primary-500 to-primary-400 transition-all" style={{ width: '45%' }} />
                  </div>
                </div>

                <div className="pt-3 border-t border-neutral-200">
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-600 text-sm font-medium">Network Status</span>
                    <span className="text-success font-semibold text-sm flex items-center gap-1.5">
                      <Zap size={14} />
                      Online
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="jarvis-panel p-5 flex-1 overflow-auto">
              <h3 className="text-sm font-semibold text-neutral-700 mb-4 uppercase tracking-wider">
                Activity Log
              </h3>
              <div className="space-y-3 text-sm">
                <div className="p-3 rounded-lg bg-neutral-50 border border-neutral-200">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-semibold text-primary-700">Orchestrator</span>
                    <span className="text-neutral-500 text-xs font-mono">{new Date().toLocaleTimeString()}</span>
                  </div>
                  <p className="text-neutral-700">System initialized</p>
                </div>
                <div className="p-3 rounded-lg bg-neutral-50 border border-neutral-200">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-semibold text-primary-700">Orchestrator</span>
                    <span className="text-neutral-500 text-xs font-mono">{new Date().toLocaleTimeString()}</span>
                  </div>
                  <p className="text-neutral-700">All agents ready</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}

export default JarvisApp
