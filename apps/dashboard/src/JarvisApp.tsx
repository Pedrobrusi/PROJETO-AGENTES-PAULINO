import { useState, useEffect } from 'react'
import { Bot, Zap, Activity, Network, Search, Monitor } from 'lucide-react'
import { VoiceControl } from '@/components/VoiceControl'
import { ChatPanel } from '@/components/ChatPanel'
import { SearchPanel } from '@/components/SearchPanel'
import { ProjectPreview } from '@/components/ProjectPreview'
import { useAgentStore } from '@/stores/agentStore'
import { useProjectStore, initializeDemoProjects } from '@/stores/projectStore'
import { useSpeechSynthesis } from '@/hooks/useSpeechSynthesis'
import '@/styles/jarvis.css'

function JarvisApp() {
  const [activeView, setActiveView] = useState<'orchestrator' | 'agents' | 'tasks' | 'search' | 'preview'>('orchestrator')
  const { agents, selectedAgent, activeConversation, selectAgent, sendMessage } = useAgentStore()
  const { speak } = useSpeechSynthesis()

  const jarvisAgent = agents.find(a => a.id === 'jarvis')
  const otherAgents = agents.filter(a => a.id !== 'jarvis')
  const { activeProject, getProjectByAgent } = useProjectStore()

  // Initialize demo projects on mount
  useEffect(() => {
    initializeDemoProjects()
  }, [])

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
        <header className="jarvis-panel m-4 p-6 jarvis-slide-in-left">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="jarvis-circle jarvis-glow-strong w-16 h-16 flex items-center justify-center">
                <Bot size={32} className="text-sky-400" />
              </div>
              <div>
                <h1 className="jarvis-neon text-3xl font-bold">
                  J.A.R.V.I.S.
                </h1>
                <p className="text-slate-400 text-sm">
                  Just A Rather Very Intelligent System
                </p>
              </div>
            </div>

            {/* System Status */}
            <div className="flex gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">
                  {getStatusCount('idle')}
                </div>
                <div className="text-xs text-slate-400">Available</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">
                  {getStatusCount('busy')}
                </div>
                <div className="text-xs text-slate-400">Busy</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-sky-400">
                  {agents.length}
                </div>
                <div className="text-xs text-slate-400">Total</div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <div className="flex-1 flex gap-4 px-4 pb-4 overflow-hidden">
          {/* Left Sidebar - Voice Control & Navigation */}
          <aside className="w-80 flex flex-col gap-4 jarvis-slide-in-left">
            {/* Voice Control */}
            <VoiceControl onCommand={handleVoiceCommand} />

            {/* Navigation */}
            <nav className="jarvis-panel p-4 flex-1">
              <h3 className="jarvis-text-glow font-bold text-sm mb-4 uppercase tracking-wider">
                Control Center
              </h3>
              <div className="space-y-2">
                <button
                  onClick={() => setActiveView('orchestrator')}
                  className={`
                    w-full flex items-center gap-3 p-3 rounded-lg transition-all
                    ${activeView === 'orchestrator'
                      ? 'jarvis-glow bg-sky-500/20 text-sky-400'
                      : 'text-slate-400 hover:bg-slate-800/50'
                    }
                  `}
                >
                  <Bot size={20} />
                  <span>Orchestrator</span>
                </button>

                <button
                  onClick={() => setActiveView('agents')}
                  className={`
                    w-full flex items-center gap-3 p-3 rounded-lg transition-all
                    ${activeView === 'agents'
                      ? 'jarvis-glow bg-sky-500/20 text-sky-400'
                      : 'text-slate-400 hover:bg-slate-800/50'
                    }
                  `}
                >
                  <Network size={20} />
                  <span>Agent Network</span>
                </button>

                <button
                  onClick={() => setActiveView('tasks')}
                  className={`
                    w-full flex items-center gap-3 p-3 rounded-lg transition-all
                    ${activeView === 'tasks'
                      ? 'jarvis-glow bg-sky-500/20 text-sky-400'
                      : 'text-slate-400 hover:bg-slate-800/50'
                    }
                  `}
                >
                  <Activity size={20} />
                  <span>Task Monitor</span>
                </button>

                <button
                  onClick={() => setActiveView('search')}
                  className={`
                    w-full flex items-center gap-3 p-3 rounded-lg transition-all
                    ${activeView === 'search'
                      ? 'jarvis-glow bg-sky-500/20 text-sky-400'
                      : 'text-slate-400 hover:bg-slate-800/50'
                    }
                  `}
                >
                  <Search size={20} />
                  <span>Web Search</span>
                </button>

                <button
                  onClick={() => setActiveView('preview')}
                  className={`
                    w-full flex items-center gap-3 p-3 rounded-lg transition-all
                    ${activeView === 'preview'
                      ? 'jarvis-glow bg-sky-500/20 text-sky-400'
                      : 'text-slate-400 hover:bg-slate-800/50'
                    }
                  `}
                >
                  <Monitor size={20} />
                  <span>Live Preview</span>
                </button>
              </div>

              {/* Agent Status List */}
              <div className="mt-6">
                <h4 className="text-xs text-slate-500 uppercase tracking-wider mb-3">
                  Agent Status
                </h4>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {otherAgents.map(agent => (
                    <button
                      key={agent.id}
                      onClick={() => {
                        selectAgent(agent.id)
                        setActiveView('agents')
                      }}
                      className="w-full flex items-center gap-3 p-2 rounded hover:bg-slate-800/50 transition-all group"
                    >
                      <div className={`
                        w-2 h-2 rounded-full
                        ${agent.status === 'idle' ? 'bg-green-400' :
                          agent.status === 'busy' ? 'bg-yellow-400 animate-pulse' :
                          'bg-gray-400'}
                      `} />
                      <span className="text-xs flex-1 text-left text-slate-400 group-hover:text-sky-400">
                        {agent.name}
                      </span>
                      <span className="text-xl">{agent.icon}</span>
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
                <h2 className="jarvis-text-glow text-2xl font-bold mb-6">
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
                        <div className="flex items-center gap-3 mb-3">
                          <div className={`
                            w-12 h-12 rounded-full flex items-center justify-center text-2xl
                            jarvis-glow
                          `} style={{ backgroundColor: `${agent.color}20` }}>
                            {agent.icon}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-bold text-slate-200">{agent.name}</h3>
                            <p className="text-xs text-slate-400">{agent.persona}</p>
                          </div>
                          <div className={`
                            w-3 h-3 rounded-full
                            ${agent.status === 'idle' ? 'bg-green-400' :
                              agent.status === 'busy' ? 'bg-yellow-400 animate-pulse' :
                              'bg-gray-400'}
                          `} />
                        </div>

                        <p className="text-sm text-slate-300 mb-3">
                          {agent.description}
                        </p>

                        <div className="flex flex-wrap gap-1">
                          {agent.expertise.slice(0, 3).map(skill => (
                            <span
                              key={skill}
                              className="px-2 py-1 text-xs rounded"
                              style={{
                                backgroundColor: `${agent.color}15`,
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
                <h2 className="jarvis-text-glow text-2xl font-bold mb-6">
                  Task Monitor
                </h2>
                <div className="text-center py-12">
                  <Activity size={64} className="mx-auto mb-4 text-sky-400/30" />
                  <p className="text-slate-400">No active tasks</p>
                  <p className="text-sm text-slate-500 mt-2">
                    Delegate tasks to agents through JARVIS
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
          <aside className="w-80 flex flex-col gap-4 jarvis-slide-in-right">
            {/* Quick Stats */}
            <div className="jarvis-panel p-4">
              <h3 className="jarvis-text-glow font-bold text-sm mb-4 uppercase tracking-wider">
                System Stats
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 text-sm">CPU Usage</span>
                  <span className="text-sky-400 font-mono">12%</span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-sky-500 to-cyan-500 jarvis-glow" style={{ width: '12%' }} />
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-400 text-sm">Memory</span>
                  <span className="text-sky-400 font-mono">45%</span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-sky-500 to-cyan-500 jarvis-glow" style={{ width: '45%' }} />
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-400 text-sm">Network</span>
                  <span className="text-green-400 font-mono flex items-center gap-1">
                    <Zap size={12} />
                    Online
                  </span>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="jarvis-panel p-4 flex-1 overflow-auto">
              <h3 className="jarvis-text-glow font-bold text-sm mb-4 uppercase tracking-wider">
                Activity Log
              </h3>
              <div className="space-y-2 text-xs">
                <div className="p-2 rounded bg-slate-800/50 text-slate-300">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sky-400">JARVIS</span>
                    <span className="text-slate-500">22:35:12</span>
                  </div>
                  <p>System initialized</p>
                </div>
                <div className="p-2 rounded bg-slate-800/50 text-slate-300">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sky-400">JARVIS</span>
                    <span className="text-slate-500">22:35:15</span>
                  </div>
                  <p>All agents standing by</p>
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
