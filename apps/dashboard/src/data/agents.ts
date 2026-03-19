import type { Agent } from '@/types/agent'

export const agents: Agent[] = [
  {
    id: 'dev',
    name: 'Dex',
    persona: 'Developer',
    description: 'Especialista em implementação de código e desenvolvimento',
    expertise: ['TypeScript', 'React', 'Node.js', 'API Development', 'Testing'],
    commands: [
      { name: '*help', description: 'Mostrar comandos disponíveis', usage: '*help' },
      { name: '*create-story', description: 'Criar story de desenvolvimento', usage: '*create-story' },
      { name: '*task', description: 'Executar task específica', usage: '*task {name}' },
      { name: '*exit', description: 'Sair do modo agente', usage: '*exit' }
    ],
    color: '#3b82f6',
    icon: '💻',
    status: 'idle'
  },
  {
    id: 'qa',
    name: 'Quinn',
    persona: 'Quality Assurance',
    description: 'Especialista em testes e garantia de qualidade',
    expertise: ['Testing', 'Quality Gates', 'Test Automation', 'Bug Detection'],
    commands: [
      { name: '*help', description: 'Mostrar comandos disponíveis', usage: '*help' },
      { name: '*test', description: 'Executar testes', usage: '*test' },
      { name: '*coverage', description: 'Verificar cobertura de testes', usage: '*coverage' },
      { name: '*exit', description: 'Sair do modo agente', usage: '*exit' }
    ],
    color: '#10b981',
    icon: '✓',
    status: 'idle'
  },
  {
    id: 'architect',
    name: 'Aria',
    persona: 'Software Architect',
    description: 'Especialista em arquitetura e design técnico de sistemas',
    expertise: ['System Design', 'Architecture Patterns', 'Scalability', 'Technical Decisions'],
    commands: [
      { name: '*help', description: 'Mostrar comandos disponíveis', usage: '*help' },
      { name: '*design', description: 'Criar design de sistema', usage: '*design' },
      { name: '*review', description: 'Revisar arquitetura', usage: '*review' },
      { name: '*exit', description: 'Sair do modo agente', usage: '*exit' }
    ],
    color: '#8b5cf6',
    icon: '🏗️',
    status: 'idle'
  },
  {
    id: 'pm',
    name: 'Morgan',
    persona: 'Product Manager',
    description: 'Especialista em gestão de produto e planejamento',
    expertise: ['Product Strategy', 'Roadmap', 'Stakeholder Management', 'Requirements'],
    commands: [
      { name: '*help', description: 'Mostrar comandos disponíveis', usage: '*help' },
      { name: '*roadmap', description: 'Criar/atualizar roadmap', usage: '*roadmap' },
      { name: '*requirements', description: 'Definir requisitos', usage: '*requirements' },
      { name: '*exit', description: 'Sair do modo agente', usage: '*exit' }
    ],
    color: '#f59e0b',
    icon: '📊',
    status: 'idle'
  },
  {
    id: 'po',
    name: 'Pax',
    persona: 'Product Owner',
    description: 'Especialista em stories, epics e backlog',
    expertise: ['User Stories', 'Epics', 'Backlog Management', 'Acceptance Criteria'],
    commands: [
      { name: '*help', description: 'Mostrar comandos disponíveis', usage: '*help' },
      { name: '*create-story', description: 'Criar user story', usage: '*create-story' },
      { name: '*backlog', description: 'Gerenciar backlog', usage: '*backlog' },
      { name: '*exit', description: 'Sair do modo agente', usage: '*exit' }
    ],
    color: '#ec4899',
    icon: '📝',
    status: 'idle'
  },
  {
    id: 'sm',
    name: 'River',
    persona: 'Scrum Master',
    description: 'Especialista em processos ágeis e facilitação',
    expertise: ['Scrum', 'Sprint Planning', 'Retrospectives', 'Team Facilitation'],
    commands: [
      { name: '*help', description: 'Mostrar comandos disponíveis', usage: '*help' },
      { name: '*sprint', description: 'Gerenciar sprint', usage: '*sprint' },
      { name: '*retro', description: 'Conduzir retrospectiva', usage: '*retro' },
      { name: '*exit', description: 'Sair do modo agente', usage: '*exit' }
    ],
    color: '#06b6d4',
    icon: '🎯',
    status: 'idle'
  },
  {
    id: 'analyst',
    name: 'Alex',
    persona: 'Business Analyst',
    description: 'Especialista em pesquisa e análise de negócios',
    expertise: ['Business Analysis', 'Research', 'Requirements Gathering', 'Documentation'],
    commands: [
      { name: '*help', description: 'Mostrar comandos disponíveis', usage: '*help' },
      { name: '*analyze', description: 'Analisar requisitos', usage: '*analyze' },
      { name: '*research', description: 'Pesquisar soluções', usage: '*research' },
      { name: '*exit', description: 'Sair do modo agente', usage: '*exit' }
    ],
    color: '#84cc16',
    icon: '🔍',
    status: 'idle'
  },
  {
    id: 'data-engineer',
    name: 'Dara',
    persona: 'Data Engineer',
    description: 'Especialista em design de banco de dados e pipelines',
    expertise: ['Database Design', 'SQL', 'Data Pipelines', 'Schema Design', 'Migrations'],
    commands: [
      { name: '*help', description: 'Mostrar comandos disponíveis', usage: '*help' },
      { name: '*schema', description: 'Design de schema', usage: '*schema' },
      { name: '*migration', description: 'Criar migration', usage: '*migration' },
      { name: '*exit', description: 'Sair do modo agente', usage: '*exit' }
    ],
    color: '#6366f1',
    icon: '🗄️',
    status: 'idle'
  },
  {
    id: 'ux-design-expert',
    name: 'Uma',
    persona: 'UX/UI Designer',
    description: 'Especialista em experiência do usuário e design de interface',
    expertise: ['UX Design', 'UI Design', 'Prototyping', 'User Research', 'Wireframing'],
    commands: [
      { name: '*help', description: 'Mostrar comandos disponíveis', usage: '*help' },
      { name: '*design', description: 'Criar design', usage: '*design' },
      { name: '*prototype', description: 'Criar protótipo', usage: '*prototype' },
      { name: '*exit', description: 'Sair do modo agente', usage: '*exit' }
    ],
    color: '#f43f5e',
    icon: '🎨',
    status: 'idle'
  },
  {
    id: 'devops',
    name: 'Gage',
    persona: 'DevOps Engineer',
    description: 'Especialista em CI/CD, infraestrutura e deployments',
    expertise: ['CI/CD', 'Docker', 'Kubernetes', 'Git', 'Infrastructure as Code'],
    commands: [
      { name: '*help', description: 'Mostrar comandos disponíveis', usage: '*help' },
      { name: '*deploy', description: 'Realizar deploy', usage: '*deploy' },
      { name: '*push', description: 'Push para repositório', usage: '*push' },
      { name: '*exit', description: 'Sair do modo agente', usage: '*exit' }
    ],
    color: '#ef4444',
    icon: '🚀',
    status: 'idle'
  }
]
