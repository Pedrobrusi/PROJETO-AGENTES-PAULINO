# AIOX Squad - Agent Orchestration Dashboard

Interface visual moderna para orquestração e gerenciamento dos agentes AIOX.

## 🚀 Funcionalidades

### ✨ Principais Features

- **Visualização de Agentes**: Grid interativo com todos os agentes disponíveis
- **Chat em Tempo Real**: Interface de conversação com cada agente
- **Gerenciamento de Tarefas**: Acompanhamento de tarefas por agente
- **Status Dinâmico**: Visualização do status (disponível/ocupado/erro) de cada agente
- **Histórico de Conversas**: Manutenção de conversas com cada agente
- **Comandos dos Agentes**: Visualização e execução de comandos específicos

### 🎯 Agentes Disponíveis

| Agente | Persona | Especialidade |
|--------|---------|---------------|
| Dex | Developer | Implementação de código e desenvolvimento |
| Quinn | QA | Testes e garantia de qualidade |
| Aria | Architect | Arquitetura e design técnico |
| Morgan | PM | Gestão de produto e planejamento |
| Pax | PO | Stories, epics e backlog |
| River | SM | Processos ágeis e facilitação |
| Alex | Analyst | Pesquisa e análise de negócios |
| Dara | Data Engineer | Design de banco de dados |
| Uma | UX Designer | Experiência do usuário |
| Gage | DevOps | CI/CD e infraestrutura |

## 🛠️ Tecnologias

- **React 18** - Framework UI
- **TypeScript** - Type safety
- **Vite** - Build tool e dev server
- **Tailwind CSS** - Styling
- **Zustand** - State management
- **Lucide React** - Icons
- **Axios** - HTTP client

## 📦 Instalação

```bash
# Navegar para o diretório do dashboard
cd apps/dashboard

# Instalar dependências
npm install
```

## 🚀 Executar

```bash
# Modo desenvolvimento (porta 3000)
npm run dev

# Build para produção
npm run build

# Preview da build
npm run preview

# Lint
npm run lint

# Type check
npm run typecheck
```

## 📁 Estrutura do Projeto

```
apps/dashboard/
├── src/
│   ├── components/        # Componentes React
│   │   ├── AgentCard.tsx       # Card de agente
│   │   ├── ChatPanel.tsx       # Painel de chat
│   │   └── TaskList.tsx        # Lista de tarefas
│   ├── data/              # Dados estáticos
│   │   └── agents.ts           # Configuração dos agentes
│   ├── stores/            # Estado global (Zustand)
│   │   └── agentStore.ts       # Store de agentes
│   ├── types/             # TypeScript types
│   │   └── agent.ts            # Tipos de agentes
│   ├── styles/            # Estilos globais
│   │   └── index.css           # CSS + Tailwind
│   ├── App.tsx            # Componente principal
│   └── main.tsx           # Entry point
├── index.html             # HTML template
├── package.json           # Dependências
├── tsconfig.json          # TypeScript config
├── vite.config.ts         # Vite config
└── tailwind.config.js     # Tailwind config
```

## 💡 Como Usar

### 1. Visualizar Agentes

Na tela inicial, você verá todos os agentes disponíveis em cards interativos mostrando:
- Nome e persona do agente
- Status atual (disponível/ocupado)
- Especialidades principais
- Ícone representativo

### 2. Conversar com Agentes

1. Clique em um agente para abrir o chat
2. Visualize os comandos disponíveis para aquele agente
3. Digite sua mensagem no campo de input
4. Envie com Enter ou clique no botão de enviar
5. Acompanhe as respostas em tempo real

### 3. Gerenciar Tarefas

1. Navegue para a seção "Tarefas"
2. Visualize tarefas de todos os agentes ou filtre por agente específico
3. Acompanhe o status: Pendente / Em Progresso / Concluída / Falhou

### 4. Monitorar Atividade

O painel lateral mostra estatísticas em tempo real:
- Agentes disponíveis
- Agentes ocupados
- Total de agentes

## 🎨 Componentes Principais

### AgentCard

Componente de card para visualização de agentes:
- Mostra status em tempo real
- Exibe expertise e skills
- Clique para selecionar e abrir chat
- Visual personalizado por agente (cores e ícones)

### ChatPanel

Interface de chat com agentes:
- Histórico de mensagens
- Input com validação
- Indicador de digitação/processamento
- Comandos disponíveis
- Cópia de mensagens

### TaskList

Gerenciamento de tarefas:
- Visualização por status
- Filtro por agente
- Timestamps de criação/atualização
- Resultados das tarefas

## 🔄 Estado da Aplicação

Gerenciado com **Zustand**, o estado global inclui:

```typescript
{
  agents: Agent[]                    // Lista de agentes
  selectedAgent: Agent | null        // Agente selecionado
  conversations: Conversation[]      // Histórico de conversas
  activeConversation: Conversation   // Conversa ativa
  tasks: AgentTask[]                // Tarefas dos agentes
}
```

## 🔌 Integração Futura com AIOX CLI

Atualmente o dashboard funciona com dados simulados. Para integração completa:

1. **Backend API**: Criar servidor Express que se comunica com `bin/aiox.js`
2. **WebSockets**: Comunicação em tempo real entre UI e CLI
3. **Execução de Comandos**: Enviar comandos AIOX através da API
4. **Streaming de Respostas**: Receber respostas dos agentes em tempo real

## 📝 Próximas Features

- [ ] Integração real com AIOX CLI
- [ ] WebSocket para comunicação em tempo real
- [ ] Execução de comandos shell através da UI
- [ ] Visualização de logs e outputs
- [ ] Gráficos de performance dos agentes
- [ ] Temas claro/escuro
- [ ] Exportação de conversas
- [ ] Configuração de agentes personalizados
- [ ] Dashboard de métricas

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma feature branch (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'feat: adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📄 Licença

MIT - Veja [LICENSE](../../LICENSE) para mais detalhes.

---

**AIOX Squad** - CLI First, Observability Second, UI Third
