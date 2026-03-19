import { useState } from 'react'
import { Users, MessageSquare, ListTodo, Activity } from 'lucide-react'
import { AgentCard } from '@/components/AgentCard'
import { ChatPanel } from '@/components/ChatPanel'
import { TaskList } from '@/components/TaskList'
import { useAgentStore } from '@/stores/agentStore'

type View = 'agents' | 'chat' | 'tasks' | 'activity'

function App() {
  const [currentView, setCurrentView] = useState<View>('agents')
  const {
    agents,
    selectedAgent,
    activeConversation,
    tasks,
    selectAgent,
    sendMessage
  } = useAgentStore()

  const menuItems = [
    { id: 'agents' as View, label: 'Agentes', icon: Users },
    { id: 'chat' as View, label: 'Chat', icon: MessageSquare },
    { id: 'tasks' as View, label: 'Tarefas', icon: ListTodo },
    { id: 'activity' as View, label: 'Atividade', icon: Activity }
  ]

  const handleAgentSelect = (agentId: string) => {
    selectAgent(agentId)
    setCurrentView('chat')
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            AIOX Squad
          </h1>
          <p className="text-sm text-gray-600 mt-1">Agent Orchestration</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentView(item.id)}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                    ${
                      currentView === item.id
                        ? 'bg-blue-50 text-blue-600 font-semibold'
                        : 'text-gray-700 hover:bg-gray-50'
                    }
                  `}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </button>
              )
            })}
          </div>
        </nav>

        {/* Agent Status Summary */}
        <div className="p-4 border-t border-gray-200">
          <h3 className="text-xs font-semibold text-gray-500 uppercase mb-2">Status</h3>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Disponíveis</span>
              <span className="font-semibold text-green-600">
                {agents.filter(a => a.status === 'idle').length}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Ocupados</span>
              <span className="font-semibold text-yellow-600">
                {agents.filter(a => a.status === 'busy').length}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total</span>
              <span className="font-semibold text-blue-600">{agents.length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <h2 className="text-xl font-bold text-gray-900">
            {currentView === 'agents' && 'Agentes Disponíveis'}
            {currentView === 'chat' && (selectedAgent ? `Chat com ${selectedAgent.name}` : 'Selecione um Agente')}
            {currentView === 'tasks' && 'Tarefas dos Agentes'}
            {currentView === 'activity' && 'Atividade Recente'}
          </h2>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto p-6">
          {currentView === 'agents' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {agents.map((agent) => (
                <AgentCard
                  key={agent.id}
                  agent={agent}
                  onClick={() => handleAgentSelect(agent.id)}
                  isSelected={selectedAgent?.id === agent.id}
                />
              ))}
            </div>
          )}

          {currentView === 'chat' && (
            <div className="h-full max-w-5xl mx-auto">
              {selectedAgent && activeConversation ? (
                <div className="h-full bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                  <ChatPanel
                    agent={selectedAgent}
                    messages={activeConversation.messages}
                    onSendMessage={(content) => sendMessage(selectedAgent.id, content)}
                  />
                </div>
              ) : (
                <div className="h-full flex items-center justify-center text-gray-500">
                  <div className="text-center">
                    <MessageSquare size={64} className="mx-auto mb-4 opacity-30" />
                    <p className="text-lg">Selecione um agente para começar a conversar</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {currentView === 'tasks' && (
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Tarefas {selectedAgent ? `de ${selectedAgent.name}` : 'de Todos os Agentes'}
                  </h3>
                  {selectedAgent && (
                    <button
                      onClick={() => selectAgent('')}
                      className="text-sm text-blue-600 hover:text-blue-700"
                    >
                      Ver todas
                    </button>
                  )}
                </div>
                <TaskList tasks={tasks} agentId={selectedAgent?.id} />
              </div>
            </div>
          )}

          {currentView === 'activity' && (
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Atividade Recente</h3>
                <div className="text-center py-12 text-gray-500">
                  <Activity size={48} className="mx-auto mb-2 opacity-30" />
                  <p>Funcionalidade de atividade em desenvolvimento</p>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default App
