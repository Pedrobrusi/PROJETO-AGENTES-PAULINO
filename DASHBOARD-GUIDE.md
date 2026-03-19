# 🚀 Guia do AIOX Agent Orchestration Dashboard

## 📋 Visão Geral

O **AIOX Squad Dashboard** é uma interface visual moderna para orquestrar e gerenciar todos os agentes do framework AIOX. Com ele, você pode interagir visualmente com cada agente, enviar requisições, acompanhar tarefas e monitorar a atividade do sistema.

## ✨ Características Principais

### 🎯 Agentes Disponíveis (10 Agentes)

| Agente | Ícone | Persona | Especialidade |
|--------|-------|---------|---------------|
| **Dex** | 💻 | Developer | Implementação de código e desenvolvimento |
| **Quinn** | ✓ | QA | Testes e garantia de qualidade |
| **Aria** | 🏗️ | Architect | Arquitetura e design técnico |
| **Morgan** | 📊 | PM | Gestão de produto e planejamento |
| **Pax** | 📝 | PO | Stories, epics e backlog |
| **River** | 🎯 | SM | Processos ágeis e facilitação |
| **Alex** | 🔍 | Analyst | Pesquisa e análise de negócios |
| **Dara** | 🗄️ | Data Engineer | Design de banco de dados |
| **Uma** | 🎨 | UX Designer | Experiência do usuário |
| **Gage** | 🚀 | DevOps | CI/CD e infraestrutura |

## 🚀 Como Iniciar

### Método 1: Script de Inicialização (Recomendado)

```bash
# Windows
cd apps/dashboard
start.bat
```

### Método 2: Comando NPM

```bash
cd apps/dashboard
npm run dev
```

O dashboard será iniciado em:
- **URL Local**: http://localhost:3001
- **URL Rede**: http://192.168.1.104:3001

## 📖 Como Usar o Dashboard

### 1️⃣ Tela de Agentes

Na tela inicial, você verá todos os 10 agentes disponíveis em cards visuais que mostram:

- **Ícone** do agente
- **Nome** e **Persona**
- **Status** em tempo real (Disponível/Ocupado)
- **Descrição** da especialidade
- **Skills** principais (primeiras 3)

**Para interagir:**
- Clique em qualquer card de agente para abrir o chat

### 2️⃣ Chat com Agentes

Ao selecionar um agente, você será levado para a tela de chat onde pode:

#### Visualizar Informações do Agente
- Nome e persona no topo
- Status online/processando
- **Painel de Comandos Disponíveis** - cada agente tem comandos específicos

#### Comandos Disponíveis por Agente

**Todos os agentes suportam:**
- `*help` - Mostrar comandos disponíveis
- `*exit` - Sair do modo agente

**Comandos específicos:**

**@dev (Dex - Developer)**
- `*create-story` - Criar story de desenvolvimento
- `*task {name}` - Executar task específica

**@qa (Quinn - QA)**
- `*test` - Executar testes
- `*coverage` - Verificar cobertura de testes

**@architect (Aria - Architect)**
- `*design` - Criar design de sistema
- `*review` - Revisar arquitetura

**@pm (Morgan - PM)**
- `*roadmap` - Criar/atualizar roadmap
- `*requirements` - Definir requisitos

**@po (Pax - PO)**
- `*create-story` - Criar user story
- `*backlog` - Gerenciar backlog

**@sm (River - SM)**
- `*sprint` - Gerenciar sprint
- `*retro` - Conduzir retrospectiva

**@analyst (Alex - Analyst)**
- `*analyze` - Analisar requisitos
- `*research` - Pesquisar soluções

**@data-engineer (Dara - Data Engineer)**
- `*schema` - Design de schema
- `*migration` - Criar migration

**@ux-design-expert (Uma - UX Designer)**
- `*design` - Criar design
- `*prototype` - Criar protótipo

**@devops (Gage - DevOps)**
- `*deploy` - Realizar deploy
- `*push` - Push para repositório

#### Conversar com o Agente

1. Digite sua mensagem no campo de input na parte inferior
2. Pressione **Enter** ou clique no botão **Enviar** (ícone de avião)
3. Aguarde a resposta do agente
4. Use o botão **Copiar** (ícone de dois quadrados) para copiar qualquer mensagem

**Exemplo de conversa:**
```
Você: *help
Dex: Aqui estão meus comandos disponíveis...

Você: Preciso implementar autenticação JWT
Dex: Vou ajudar com a implementação...
```

### 3️⃣ Gerenciar Tarefas

Na seção **Tarefas**, você pode:

- Ver todas as tarefas de todos os agentes
- Filtrar tarefas por agente específico
- Acompanhar status das tarefas:
  - 🔵 **Pendente** - Não iniciada
  - 🔄 **Em Progresso** - Executando
  - ✅ **Concluída** - Finalizada com sucesso
  - ❌ **Falhou** - Erro na execução

**Informações exibidas:**
- Título e descrição da tarefa
- Status atual
- Resultado (quando concluída)
- Timestamps de criação e atualização

### 4️⃣ Monitorar Atividade

No painel lateral esquerdo, você tem acesso a estatísticas em tempo real:

- **Disponíveis** - Agentes prontos para trabalhar
- **Ocupados** - Agentes processando requisições
- **Total** - Quantidade total de agentes

## 🎨 Interface do Usuário

### Navegação Lateral

A barra lateral possui 4 seções principais:

1. **👥 Agentes** - Grid com todos os agentes
2. **💬 Chat** - Conversa com agente selecionado
3. **📋 Tarefas** - Gerenciamento de tarefas
4. **📊 Atividade** - Monitoramento (em desenvolvimento)

### Indicadores Visuais

**Status dos Agentes:**
- 🟢 Verde = Disponível
- 🟡 Amarelo = Ocupado/Processando
- 🔴 Vermelho = Erro

**Status das Tarefas:**
- ⚪ Cinza = Pendente
- 🔵 Azul = Em Progresso
- 🟢 Verde = Concluída
- 🔴 Vermelho = Falhou

## 💡 Casos de Uso Práticos

### Caso 1: Implementar Nova Feature

1. Selecione **@po (Pax)** para criar a story
2. Use comando `*create-story`
3. Mude para **@architect (Aria)** para design
4. Use `*design` para criar arquitetura
5. Vá para **@dev (Dex)** para implementação
6. Finalize com **@qa (Quinn)** usando `*test`

### Caso 2: Análise de Requisitos

1. Comece com **@analyst (Alex)**
2. Use `*research` para pesquisar soluções
3. Depois `*analyze` para analisar requisitos
4. Mude para **@pm (Morgan)** para roadmap

### Caso 3: Deploy de Aplicação

1. **@dev (Dex)** - Finalizar código
2. **@qa (Quinn)** - `*test` e `*coverage`
3. **@devops (Gage)** - `*deploy`

## 🔧 Configuração Técnica

### Estrutura de Arquivos

```
apps/dashboard/
├── src/
│   ├── components/           # Componentes React
│   │   ├── AgentCard.tsx    # Card de agente
│   │   ├── ChatPanel.tsx    # Painel de chat
│   │   └── TaskList.tsx     # Lista de tarefas
│   ├── data/
│   │   └── agents.ts        # Configuração dos agentes
│   ├── stores/
│   │   └── agentStore.ts    # Estado global
│   ├── types/
│   │   └── agent.ts         # Tipos TypeScript
│   └── App.tsx              # Componente principal
├── package.json             # Dependências
└── vite.config.ts           # Configuração Vite
```

### Tecnologias Utilizadas

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Dev server ultra-rápido
- **Tailwind CSS** - Utility-first CSS
- **Zustand** - State management leve
- **Lucide React** - Ícones modernos

## 🚧 Roadmap de Features Futuras

### Em Desenvolvimento

- [ ] **Integração Real com AIOX CLI** - Executar comandos reais
- [ ] **WebSocket** - Comunicação em tempo real
- [ ] **Streaming de Respostas** - Ver respostas incrementais
- [ ] **Logs e Outputs** - Visualizar saída dos comandos

### Planejado

- [ ] **Temas** - Modo claro/escuro
- [ ] **Exportação** - Salvar conversas
- [ ] **Métricas** - Dashboard de performance
- [ ] **Agentes Customizados** - Criar seus próprios agentes
- [ ] **Multi-Agente** - Orquestrar múltiplos agentes simultaneamente

## 🐛 Troubleshooting

### Porta 3000 em uso

Se a porta 3000 estiver ocupada, o Vite automaticamente usa 3001, 3002, etc.

### Erro ao instalar dependências

```bash
cd apps/dashboard
rm -rf node_modules package-lock.json
npm install
```

### Servidor não inicia

Verifique se o Node.js está instalado (v18+):
```bash
node --version
npm --version
```

## 📞 Suporte

- **Issues**: https://github.com/Pedrobrusi/PROJETO-AGENTES-PAULINO/issues
- **Documentação AIOX**: `.aiox-core/`
- **Agent Configs**: `.aiox-core/development/agents/`

---

**AIOX Squad Dashboard** - Orquestre seus agentes com facilidade! 🚀
