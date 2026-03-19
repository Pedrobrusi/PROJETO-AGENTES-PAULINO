# 🤖 J.A.R.V.I.S. - AI Agent Orchestration System

## Just A Rather Very Intelligent System

Bem-vindo ao sistema de orquestração de agentes AI inspirado no JARVIS do Homem de Ferro! Esta é uma interface futurística e altamente funcional para controlar todos os 10 agentes AIOX simultaneamente através de um agente orquestrador master.

---

## ✨ Características Principais

### 🎯 Agente Orquestrador JARVIS

O **J.A.R.V.I.S.** é o agente master que coordena todos os outros agentes:

- **Multi-Agent Coordination** - Delega tarefas para agentes especializados
- **Intelligent Task Routing** - Analisa requisições e roteia automaticamente
- **Voice & Text Interface** - Aceita comandos por voz E texto
- **Progress Monitoring** - Rastreia atividades de todos os agentes
- **Context Management** - Mantém contexto entre conversas
- **System Intelligence** - Insights e recomendações proativas

### 🎨 Design Futurístico

Interface inspirada no JARVIS com:

- **Background Holográfico** - Grade animada com efeitos de profundidade
- **Painéis Translúcidos** - Vidro fosco com bordas neon
- **Animações Suaves** - Scan lines, pulsos e transições fluidas
- **Círculos Holográficos** - Visualização dos agentes em movimento
- **Tipografia Futurista** - Fontes Orbitron e Rajdhani
- **Efeitos de Brilho** - Glow effects em todos os elementos interativos
- **Tema Dark Ciber** - Paleta azul cyan com tons escuros

### 🎤 Controle por Voz

Sistema de reconhecimento de voz completo:

```
"JARVIS, show me the agent status"
"JARVIS, create a new feature"
"JARVIS, deploy the application"
"JARVIS, run all tests"
```

**Como ativar:**
1. Clique no ícone do microfone
2. Fale "JARVIS" seguido do seu comando
3. JARVIS responderá com voz sintetizada

### 📊 Interface Dividida em 3 Painéis

#### 🎛️ Painel Esquerdo - Controle
- **Voice Control** - Microfone e alto-falante
- **Navigation** - Orchestrator / Agent Network / Task Monitor
- **Agent Status List** - Status em tempo real de todos os agentes

#### 💬 Painel Central - Display Principal
- **Orchestrator View** - Chat direto com JARVIS
- **Agent Network** - Grid de todos os agentes disponíveis
- **Task Monitor** - Tarefas ativas e progresso

#### 📈 Painel Direito - Informações
- **System Stats** - CPU, Memória, Network
- **Activity Log** - Log de eventos em tempo real

---

## 🚀 Como Iniciar

### Passo 1: Navegar para o Dashboard

```bash
cd apps/dashboard
```

### Passo 2: Iniciar Servidor

**Opção A - Script BAT (Windows):**
```bash
start.bat
```

**Opção B - NPM:**
```bash
npm run dev
```

### Passo 3: Acessar

- **URL Local**: http://localhost:3002
- **URL Rede**: http://192.168.1.104:3002

---

## 💬 Como Usar

### 1️⃣ Interagir com JARVIS

**Por Texto:**
1. A interface inicia automaticamente com JARVIS selecionado
2. Digite sua mensagem no campo de input
3. JARVIS processa e responde
4. Comandos especiais começam com `*`

**Por Voz:**
1. Clique no ícone do microfone 🎤
2. Aguarde indicador "Listening..."
3. Fale: "JARVIS, [seu comando]"
4. JARVIS responde em voz e texto

### 2️⃣ Comandos do JARVIS

| Comando | Descrição | Exemplo |
|---------|-----------|---------|
| `*help` | Ajuda completa | `*help` |
| `*status` | Status do sistema | `*status` |
| `*delegate <agent> <task>` | Delegar para agente | `*delegate dev "fix bug"` |
| `*workflow <nome>` | Executar workflow | `*workflow new-feature` |
| `*report` | Relatório de progresso | `*report` |
| `*exit` | Sair do modo JARVIS | `*exit` |

### 3️⃣ Workflows Multi-Agente

JARVIS pode orquestrar workflows complexos:

#### Nova Feature
```
Você: "JARVIS, create a new payment feature"

JARVIS:
  ├─ @po → Criar story
  ├─ @architect → Design arquitetura
  ├─ @ux-design-expert → Criar mockups
  ├─ @dev → Implementar
  ├─ @qa → Testar
  └─ @devops → Deploy
```

#### Hotfix
```
Você: "JARVIS, fix the authentication bug"

JARVIS:
  ├─ @dev → Corrigir bug
  ├─ @qa → Verificar correção
  └─ @devops → Deploy hotfix
```

#### Pesquisa e Análise
```
Você: "JARVIS, research payment solutions"

JARVIS:
  ├─ @analyst → Pesquisar soluções
  ├─ @pm → Analisar viabilidade
  └─ @architect → Assessment técnico
```

### 4️⃣ Navegar Entre Visualizações

**Orchestrator** - Chat principal com JARVIS
- Interface de conversação direta
- Visualização de comandos disponíveis
- Histórico de mensagens

**Agent Network** - Grid de agentes
- Clique em qualquer agente para conversar
- Visualize especialidades e status
- Chat individual com cada agente

**Task Monitor** - Tarefas ativas
- Acompanhe tarefas em progresso
- Veja tarefas concluídas
- Monitore falhas e erros

---

## 🎨 Elementos Visuais

### Efeitos Holográficos

**Background Animado:**
- Grade em movimento constante
- Gradientes radiais pulsantes
- Profundidade com múltiplas camadas

**Painéis:**
- Backdrop blur (vidro fosco)
- Bordas cyan neon
- Scan lines animadas
- Sombras com glow

**Agentes:**
- Círculos holográficos rotativos
- Indicadores de status pulsantes
- Cards com hover effects
- Transições suaves

### Paleta de Cores

```css
Primary:   #0ea5e9  (Cyan 500)
Secondary: #06b6d4  (Cyan 600)
Accent:    #38bdf8  (Cyan 400)
Glow:      #7dd3fc  (Cyan 300)

Background Dark:   #050b1a
Background Panel:  rgba(15, 23, 42, 0.8)
Border:            rgba(14, 165, 233, 0.3)

Text:      #e0f2fe (Cyan 50)
Text Dim:  #94a3b8 (Slate 400)
```

### Animações

- **Scan Line** - 3s loop vertical
- **Grid Move** - 20s loop contínuo
- **Pulse Glow** - 2s breathing effect
- **Wave Bars** - Voice input visualização
- **Typing Dots** - AI processamento
- **Rotate Circle** - 2s spin infinito

---

## 🔊 Sistema de Voz

### Reconhecimento de Voz (Speech Recognition)

**Suporte:**
- Chrome ✅
- Edge ✅
- Safari ⚠️ (limitado)
- Firefox ❌

**Idioma:** Português (pt-BR)

**Configuração:**
```typescript
recognition.continuous = true
recognition.interimResults = true
recognition.lang = 'pt-BR'
```

### Síntese de Voz (Text-to-Speech)

**JARVIS Voice Settings:**
- **Voice**: Google UK English Male (quando disponível)
- **Rate**: 0.9 (levemente mais lento)
- **Pitch**: 0.8 (tom mais grave)
- **Volume**: 1.0

**Como funciona:**
```typescript
speak("At your service", {
  rate: 0.9,
  pitch: 0.8
})
```

---

## 🤖 Os 11 Agentes

| # | ID | Nome | Persona | Especialidade |
|---|-------|------|---------|---------------|
| 0 | jarvis | J.A.R.V.I.S. | Master Orchestrator | Coordenação multi-agente |
| 1 | dev | Dex | Developer | Implementação de código |
| 2 | qa | Quinn | QA | Testes e qualidade |
| 3 | architect | Aria | Architect | Arquitetura técnica |
| 4 | pm | Morgan | PM | Gestão de produto |
| 5 | po | Pax | PO | Stories e backlog |
| 6 | sm | River | SM | Scrum Master |
| 7 | analyst | Alex | Analyst | Pesquisa e análise |
| 8 | data-engineer | Dara | Data Engineer | Banco de dados |
| 9 | ux-design-expert | Uma | UX Designer | Interface/UX |
| 10 | devops | Gage | DevOps | CI/CD, Deploy |

---

## 🛠️ Stack Tecnológico

### Frontend
- **React 18** - UI Framework
- **TypeScript** - Type Safety
- **Vite** - Build Tool (ultra-rápido)
- **Tailwind CSS** - Utility CSS
- **Zustand** - State Management

### Áudio/Voz
- **Web Speech API** - Reconhecimento de voz
- **SpeechSynthesis API** - Text-to-speech
- **Custom Hooks** - useSpeechRecognition, useSpeechSynthesis

### Tipografia
- **Orbitron** - Títulos e display
- **Rajdhani** - Body text e UI

### Ícones
- **Lucide React** - Ícones SVG modernos

---

## 📁 Estrutura de Arquivos

```
apps/dashboard/
├── src/
│   ├── components/
│   │   ├── AgentCard.tsx        # Card de agente
│   │   ├── ChatPanel.tsx        # Painel de chat
│   │   ├── TaskList.tsx         # Lista de tarefas
│   │   └── VoiceControl.tsx     # Controle de voz
│   ├── hooks/
│   │   ├── useSpeechRecognition.ts  # Hook de voz
│   │   └── useSpeechSynthesis.ts    # Hook de síntese
│   ├── stores/
│   │   └── agentStore.ts        # Estado global
│   ├── types/
│   │   └── agent.ts             # Tipos TypeScript
│   ├── data/
│   │   └── agents.ts            # Dados dos agentes
│   ├── styles/
│   │   ├── index.css            # Estilos globais
│   │   └── jarvis.css           # Tema JARVIS
│   ├── App.tsx                  # App original
│   ├── JarvisApp.tsx            # App JARVIS
│   └── main.tsx                 # Entry point
├── index.html
├── package.json
└── vite.config.ts
```

---

## 🎯 Casos de Uso

### Caso 1: Desenvolver Nova API

```
Voice: "JARVIS, I need to build a REST API"

JARVIS:
  "Certainly. I'll coordinate with the team.

   📋 Task Analysis: API Development
   ├─ Story Creation → @po (Pax)
   ├─ Architecture → @architect (Aria)
   ├─ Database Schema → @data-engineer (Dara)
   ├─ Implementation → @dev (Dex)
   ├─ Testing → @qa (Quinn)
   └─ Deployment → @devops (Gage)

   Initiating workflow. ETA: 60 minutes.
   I'll keep you updated."
```

### Caso 2: Hotfix de Produção

```
Voice: "JARVIS, we have a critical bug in production"

JARVIS:
  "Acknowledged. Initiating emergency protocol.

   🚨 Priority: CRITICAL
   ├─ @dev (Dex) → Investigating issue
   ├─ @devops (Gage) → Preparing rollback
   └─ @qa (Quinn) → Standing by for verification

   Status updates every 5 minutes."
```

### Caso 3: Planejamento de Sprint

```
Voice: "JARVIS, help plan next sprint"

JARVIS:
  "Initiating sprint planning workflow.

   📊 Sprint Planning
   ├─ @sm (River) → Facilitate planning meeting
   ├─ @po (Pax) → Prioritize backlog
   ├─ @pm (Morgan) → Review roadmap alignment
   └─ @architect (Aria) → Technical capacity planning

   Would you like me to create a planning document?"
```

---

## 🐛 Troubleshooting

### Voz não funciona

**Problema**: Microfone não ativa
**Solução**:
1. Verifique permissões do navegador
2. Use HTTPS ou localhost
3. Teste em Chrome/Edge

**Problema**: JARVIS não responde por voz
**Solução**:
1. Verifique se áudio está habilitado
2. Clique no ícone de speaker
3. Teste síntese manualmente

### Interface não carrega

**Problema**: Tela branca
**Solução**:
```bash
cd apps/dashboard
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Porta em uso

**Problema**: Porta 3002 ocupada
**Solução**: Vite automaticamente usa próxima porta disponível (3003, 3004...)

---

## 🔮 Roadmap

### Em Desenvolvimento
- [ ] **Backend Integration** - API real para executar comandos AIOX
- [ ] **WebSocket Real-Time** - Updates instantâneos
- [ ] **Voice Streaming** - Respostas em tempo real
- [ ] **Task Queue System** - Fila de tarefas persistente

### Planejado
- [ ] **Dashboard Metrics** - Gráficos de performance
- [ ] **Agent Customization** - Criar agentes personalizados
- [ ] **Workflow Builder** - Editor visual de workflows
- [ ] **Multi-Language** - Suporte EN/ES/PT
- [ ] **Dark/Light Themes** - Temas alternativos
- [ ] **Mobile App** - React Native version
- [ ] **AR Interface** - Holograms com WebXR

---

## 📞 Suporte

- **Issues**: https://github.com/Pedrobrusi/PROJETO-AGENTES-PAULINO/issues
- **JARVIS Agent**: `.aiox-core/development/agents/jarvis.md`
- **Agent Configs**: `.aiox-core/development/agents/`

---

## 🎬 Easter Eggs

Digite no chat com JARVIS:

- `*infinity` - Referência ao Tony Stark
- `*protocol` - Lista protocolos especiais
- `*stark` - Mensagem especial
- `*42` - A resposta para tudo

---

**"At your service."** - J.A.R.V.I.S. 🤖

---

*AIOX Squad - CLI First, Observability Second, UI Third*
*Generated with Claude Code - Powered by AIOX Framework*
