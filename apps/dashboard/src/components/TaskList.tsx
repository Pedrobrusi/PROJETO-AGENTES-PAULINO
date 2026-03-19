import { CheckCircle2, Circle, XCircle, Loader2 } from 'lucide-react'
import type { AgentTask } from '@/types/agent'

interface TaskListProps {
  tasks: AgentTask[]
  agentId?: string
}

export function TaskList({ tasks, agentId }: TaskListProps) {
  const filteredTasks = agentId
    ? tasks.filter(t => t.agentId === agentId)
    : tasks

  const getStatusIcon = (status: AgentTask['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 size={20} className="text-green-500" />
      case 'in_progress':
        return <Loader2 size={20} className="text-blue-500 animate-spin" />
      case 'failed':
        return <XCircle size={20} className="text-red-500" />
      default:
        return <Circle size={20} className="text-gray-400" />
    }
  }

  const getStatusLabel = (status: AgentTask['status']) => {
    switch (status) {
      case 'completed':
        return 'Concluída'
      case 'in_progress':
        return 'Em Progresso'
      case 'failed':
        return 'Falhou'
      default:
        return 'Pendente'
    }
  }

  const getStatusColor = (status: AgentTask['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-50 border-green-200'
      case 'in_progress':
        return 'bg-blue-50 border-blue-200'
      case 'failed':
        return 'bg-red-50 border-red-200'
      default:
        return 'bg-gray-50 border-gray-200'
    }
  }

  return (
    <div className="space-y-3">
      {filteredTasks.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <Circle size={48} className="mx-auto mb-2 opacity-30" />
          <p>Nenhuma tarefa encontrada</p>
        </div>
      ) : (
        filteredTasks.map((task) => (
          <div
            key={task.id}
            className={`p-4 rounded-lg border ${getStatusColor(task.status)} transition-all`}
          >
            <div className="flex items-start gap-3">
              <div className="mt-1">{getStatusIcon(task.status)}</div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-semibold text-gray-900">{task.title}</h4>
                  <span className="text-xs px-2 py-1 rounded-full bg-white border">
                    {getStatusLabel(task.status)}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                {task.result && (
                  <div className="mt-2 p-2 bg-white rounded border border-gray-200">
                    <p className="text-xs font-semibold text-gray-700 mb-1">Resultado:</p>
                    <p className="text-sm text-gray-600">{task.result}</p>
                  </div>
                )}
                <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                  <span>Criada: {new Date(task.createdAt).toLocaleString('pt-BR')}</span>
                  <span>Atualizada: {new Date(task.updatedAt).toLocaleString('pt-BR')}</span>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  )
}
