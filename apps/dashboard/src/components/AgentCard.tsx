import type { Agent } from '@/types/agent'

interface AgentCardProps {
  agent: Agent
  onClick: () => void
  isSelected: boolean
}

export function AgentCard({ agent, onClick, isSelected }: AgentCardProps) {
  const statusColors = {
    idle: 'bg-gray-400',
    active: 'bg-green-500',
    busy: 'bg-yellow-500',
    error: 'bg-red-500'
  }

  const statusLabels = {
    idle: 'Disponível',
    active: 'Ativo',
    busy: 'Ocupado',
    error: 'Erro'
  }

  return (
    <div
      onClick={onClick}
      className={`
        relative p-4 rounded-lg cursor-pointer transition-all duration-200
        hover:shadow-lg hover:scale-105
        ${isSelected ? 'ring-2 ring-offset-2' : 'hover:ring-1 hover:ring-offset-1'}
      `}
      style={{
        backgroundColor: `${agent.color}15`,
        borderColor: agent.color,
        borderWidth: '2px',
        ringColor: agent.color
      }}
    >
      {/* Status Indicator */}
      <div className="absolute top-2 right-2 flex items-center gap-1">
        <div className={`w-2 h-2 rounded-full ${statusColors[agent.status]}`} />
        <span className="text-xs text-gray-600">{statusLabels[agent.status]}</span>
      </div>

      {/* Agent Icon & Name */}
      <div className="flex items-center gap-3 mb-3">
        <div className="text-4xl">{agent.icon}</div>
        <div>
          <h3 className="font-bold text-lg" style={{ color: agent.color }}>
            {agent.name}
          </h3>
          <p className="text-sm text-gray-600">{agent.persona}</p>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-700 mb-3">{agent.description}</p>

      {/* Expertise Tags */}
      <div className="flex flex-wrap gap-1">
        {agent.expertise.slice(0, 3).map((skill) => (
          <span
            key={skill}
            className="px-2 py-1 text-xs rounded-full"
            style={{
              backgroundColor: `${agent.color}25`,
              color: agent.color
            }}
          >
            {skill}
          </span>
        ))}
        {agent.expertise.length > 3 && (
          <span className="px-2 py-1 text-xs text-gray-500">
            +{agent.expertise.length - 3}
          </span>
        )}
      </div>
    </div>
  )
}
