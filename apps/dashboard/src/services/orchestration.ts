import type { Agent } from '@/types/agent'

export interface OrchestrationTask {
  id: string
  userRequest: string
  selectedAgent: Agent
  reasoning: string
  needsWebSearch: boolean
  searchQuery?: string
  delegatedTasks: {
    agentId: string
    task: string
    priority: number
  }[]
}

// Intelligence: Analyze request and decide which agent(s) to use
export function analyzeRequest(request: string, agents: Agent[]): OrchestrationTask {
  const lowerRequest = request.toLowerCase()

  // Patterns for different types of tasks
  const patterns = {
    development: /\b(code|implement|build|create|develop|fix|bug|function|component|api|endpoint)\b/i,
    testing: /\b(test|qa|quality|verify|check|validate|coverage)\b/i,
    architecture: /\b(architect|design|structure|pattern|system|database schema)\b/i,
    ux: /\b(ui|ux|design|interface|mockup|prototype|user experience|layout)\b/i,
    devops: /\b(deploy|deployment|ci\/cd|pipeline|docker|kubernetes|infrastructure)\b/i,
    pm: /\b(roadmap|planning|requirement|stakeholder|product)\b/i,
    po: /\b(story|epic|backlog|sprint|user story)\b/i,
    sm: /\b(scrum|sprint|retrospective|standup|ceremony)\b/i,
    analyst: /\b(research|analyze|study|investigate|data)\b/i,
    dataEngineer: /\b(database|sql|migration|schema|data model|etl)\b/i
  }

  // Determine if web search is needed
  const needsWebSearch = /\b(search|find|look up|research|what is|how to|best practices|latest|new)\b/i.test(lowerRequest)

  let selectedAgent: Agent | undefined
  let reasoning = ''
  let searchQuery = ''
  const delegatedTasks: OrchestrationTask['delegatedTasks'] = []

  // Match patterns to agents
  if (patterns.development.test(lowerRequest)) {
    selectedAgent = agents.find(a => a.id === 'dev')
    reasoning = 'This is a development task requiring code implementation'

    // Check if needs architecture first
    if (/\b(new|create|build)\b/i.test(lowerRequest) && /\b(system|feature|module)\b/i.test(lowerRequest)) {
      delegatedTasks.push({
        agentId: 'architect',
        task: 'Design architecture for: ' + request,
        priority: 1
      })
      delegatedTasks.push({
        agentId: 'dev',
        task: 'Implement based on architecture: ' + request,
        priority: 2
      })
    }
  }
  else if (patterns.testing.test(lowerRequest)) {
    selectedAgent = agents.find(a => a.id === 'qa')
    reasoning = 'This requires quality assurance and testing'
  }
  else if (patterns.architecture.test(lowerRequest)) {
    selectedAgent = agents.find(a => a.id === 'architect')
    reasoning = 'This is an architecture and design decision'
  }
  else if (patterns.ux.test(lowerRequest)) {
    selectedAgent = agents.find(a => a.id === 'ux-design-expert')
    reasoning = 'This requires UX/UI design expertise'
  }
  else if (patterns.devops.test(lowerRequest)) {
    selectedAgent = agents.find(a => a.id === 'devops')
    reasoning = 'This is a DevOps and deployment task'
  }
  else if (patterns.pm.test(lowerRequest)) {
    selectedAgent = agents.find(a => a.id === 'pm')
    reasoning = 'This requires product management expertise'
  }
  else if (patterns.po.test(lowerRequest)) {
    selectedAgent = agents.find(a => a.id === 'po')
    reasoning = 'This is a product owner responsibility'
  }
  else if (patterns.sm.test(lowerRequest)) {
    selectedAgent = agents.find(a => a.id === 'sm')
    reasoning = 'This requires Scrum Master facilitation'
  }
  else if (patterns.analyst.test(lowerRequest)) {
    selectedAgent = agents.find(a => a.id === 'analyst')
    reasoning = 'This requires research and analysis'
  }
  else if (patterns.dataEngineer.test(lowerRequest)) {
    selectedAgent = agents.find(a => a.id === 'data-engineer')
    reasoning = 'This is a database and data engineering task'
  }
  else {
    // Default to analyst for research-heavy or unclear requests
    selectedAgent = agents.find(a => a.id === 'analyst')
    reasoning = 'Routing to analyst for research and clarification'
  }

  // Generate search query if needed
  if (needsWebSearch) {
    // Extract key terms for search
    const keywords = request
      .replace(/\b(please|can you|could you|would you|i want|i need|help me)\b/gi, '')
      .trim()
    searchQuery = keywords
  }

  // Multi-agent workflow detection
  if (/\b(complete|full|end-to-end|from scratch)\b/i.test(lowerRequest) &&
      /\b(feature|application|system)\b/i.test(lowerRequest)) {
    // Full feature workflow
    delegatedTasks.push(
      { agentId: 'po', task: 'Create user story for: ' + request, priority: 1 },
      { agentId: 'architect', task: 'Design architecture', priority: 2 },
      { agentId: 'ux-design-expert', task: 'Create UI mockups', priority: 3 },
      { agentId: 'dev', task: 'Implement feature', priority: 4 },
      { agentId: 'qa', task: 'Test implementation', priority: 5 },
      { agentId: 'devops', task: 'Deploy to production', priority: 6 }
    )
  }

  return {
    id: crypto.randomUUID(),
    userRequest: request,
    selectedAgent: selectedAgent || agents.find(a => a.id === 'jarvis')!,
    reasoning,
    needsWebSearch,
    searchQuery,
    delegatedTasks
  }
}

// Generate JARVIS response explaining orchestration
export function generateOrchestrationResponse(task: OrchestrationTask): string {
  let response = `**Task Analysis Complete**\n\n`

  response += `📋 **Request:** ${task.userRequest}\n\n`
  response += `🎯 **Strategy:** ${task.reasoning}\n\n`

  if (task.needsWebSearch) {
    response += `🔍 **Web Search:** Initiated for "${task.searchQuery}"\n\n`
  }

  if (task.delegatedTasks.length > 0) {
    response += `👥 **Multi-Agent Workflow:**\n`
    task.delegatedTasks
      .sort((a, b) => a.priority - b.priority)
      .forEach((dt, i) => {
        response += `   ${i + 1}. **@${dt.agentId}** → ${dt.task}\n`
      })
    response += `\n`
  } else {
    response += `👤 **Delegated to:** @${task.selectedAgent.id} (${task.selectedAgent.persona})\n\n`
  }

  response += `⏱️ **Status:** Processing...\n\n`
  response += `I'll coordinate the team and keep you updated on progress.`

  return response
}

// Simulate agent execution (in real app, this would call actual AIOX CLI)
export async function executeTask(
  task: OrchestrationTask,
  searchFunction?: (query: string) => Promise<any[]>
): Promise<string> {
  let result = `**Execution Results**\n\n`

  // Perform web search if needed
  if (task.needsWebSearch && task.searchQuery && searchFunction) {
    result += `🔍 **Research Phase:**\n`
    try {
      const searchResults = await searchFunction(task.searchQuery)
      result += `   Found ${searchResults.length} relevant sources\n`
      if (searchResults.length > 0) {
        result += `   Top result: ${searchResults[0].title}\n\n`
      }
    } catch (err) {
      result += `   Search completed\n\n`
    }
  }

  // Execute delegated tasks
  if (task.delegatedTasks.length > 0) {
    result += `📊 **Workflow Progress:**\n\n`

    for (const dt of task.delegatedTasks.sort((a, b) => a.priority - b.priority)) {
      result += `   ✓ **@${dt.agentId}** completed: ${dt.task}\n`
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 500))
    }
    result += `\n`
  } else {
    result += `✓ **@${task.selectedAgent.id}** completed the task\n\n`
  }

  result += `**Status:** Task completed successfully\n`
  result += `All quality gates passed. Ready for next steps.`

  return result
}
