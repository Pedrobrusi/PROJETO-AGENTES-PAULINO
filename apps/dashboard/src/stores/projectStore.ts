import { create } from 'zustand'

export interface ProjectFile {
  id: string
  name: string
  content: string
  type: 'html' | 'css' | 'js' | 'tsx' | 'ts'
  agentId: string
  updatedAt: Date
}

export interface Project {
  id: string
  name: string
  agentId: string
  files: ProjectFile[]
  createdAt: Date
  updatedAt: Date
}

interface ProjectStore {
  projects: Project[]
  activeProject: Project | null

  // Actions
  createProject: (agentId: string, name: string) => Project
  addFile: (projectId: string, file: Omit<ProjectFile, 'id' | 'updatedAt'>) => void
  updateFile: (projectId: string, fileId: string, content: string) => void
  deleteFile: (projectId: string, fileId: string) => void
  setActiveProject: (projectId: string) => void
  getProjectByAgent: (agentId: string) => Project | undefined
}

export const useProjectStore = create<ProjectStore>((set, get) => ({
  projects: [],
  activeProject: null,

  createProject: (agentId: string, name: string) => {
    const project: Project = {
      id: crypto.randomUUID(),
      name,
      agentId,
      files: [],
      createdAt: new Date(),
      updatedAt: new Date()
    }

    set(state => ({
      projects: [...state.projects, project],
      activeProject: project
    }))

    return project
  },

  addFile: (projectId: string, fileData) => {
    const file: ProjectFile = {
      ...fileData,
      id: crypto.randomUUID(),
      updatedAt: new Date()
    }

    set(state => ({
      projects: state.projects.map(p =>
        p.id === projectId
          ? { ...p, files: [...p.files, file], updatedAt: new Date() }
          : p
      ),
      activeProject:
        state.activeProject?.id === projectId
          ? { ...state.activeProject, files: [...state.activeProject.files, file] }
          : state.activeProject
    }))
  },

  updateFile: (projectId: string, fileId: string, content: string) => {
    set(state => ({
      projects: state.projects.map(p =>
        p.id === projectId
          ? {
              ...p,
              files: p.files.map(f =>
                f.id === fileId
                  ? { ...f, content, updatedAt: new Date() }
                  : f
              ),
              updatedAt: new Date()
            }
          : p
      ),
      activeProject:
        state.activeProject?.id === projectId
          ? {
              ...state.activeProject,
              files: state.activeProject.files.map(f =>
                f.id === fileId
                  ? { ...f, content, updatedAt: new Date() }
                  : f
              )
            }
          : state.activeProject
    }))
  },

  deleteFile: (projectId: string, fileId: string) => {
    set(state => ({
      projects: state.projects.map(p =>
        p.id === projectId
          ? {
              ...p,
              files: p.files.filter(f => f.id !== fileId),
              updatedAt: new Date()
            }
          : p
      ),
      activeProject:
        state.activeProject?.id === projectId
          ? {
              ...state.activeProject,
              files: state.activeProject.files.filter(f => f.id !== fileId)
            }
          : state.activeProject
    }))
  },

  setActiveProject: (projectId: string) => {
    const project = get().projects.find(p => p.id === projectId)
    if (project) {
      set({ activeProject: project })
    }
  },

  getProjectByAgent: (agentId: string) => {
    return get().projects.find(p => p.agentId === agentId)
  }
}))

// Create demo projects for agents
export function initializeDemoProjects() {
  const store = useProjectStore.getState()

  // Dev agent - Login Page
  const devProject = store.createProject('dev', 'Login Page')
  store.addFile(devProject.id, {
    name: 'index.html',
    type: 'html',
    agentId: 'dev',
    content: `<div class="login-container">
  <div class="login-card">
    <h1>Welcome Back</h1>
    <p class="subtitle">Sign in to your account</p>
    <form class="login-form">
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" placeholder="you@example.com" required>
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" id="password" placeholder="••••••••" required>
      </div>
      <button type="submit" class="btn-primary">Sign In</button>
    </form>
    <p class="footer-text">Don't have an account? <a href="#">Sign up</a></p>
  </div>
</div>`
  })

  store.addFile(devProject.id, {
    name: 'styles.css',
    type: 'css',
    agentId: 'dev',
    content: `.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.login-card {
  background: white;
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.3);
  max-width: 400px;
  width: 100%;
}

h1 {
  margin: 0 0 8px 0;
  font-size: 28px;
  color: #1a202c;
}

.subtitle {
  margin: 0 0 32px 0;
  color: #718096;
  font-size: 14px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  color: #4a5568;
  font-weight: 500;
  font-size: 14px;
}

input {
  width: 100%;
  padding: 12px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 14px;
  transition: border-color 0.2s;
}

input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.btn-primary {
  width: 100%;
  padding: 12px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: transform 0.2s;
}

.btn-primary:hover {
  transform: translateY(-2px);
}

.footer-text {
  margin-top: 24px;
  text-align: center;
  color: #718096;
  font-size: 14px;
}

.footer-text a {
  color: #667eea;
  text-decoration: none;
  font-weight: 500;
}`
  })

  // UX Designer - Landing Page
  const uxProject = store.createProject('ux-design-expert', 'Landing Page Concept')
  store.addFile(uxProject.id, {
    name: 'index.html',
    type: 'html',
    agentId: 'ux-design-expert',
    content: `<div class="hero">
  <nav class="navbar">
    <div class="logo">✨ Synkra AIOX</div>
    <div class="nav-links">
      <a href="#features">Features</a>
      <a href="#pricing">Pricing</a>
      <a href="#contact" class="btn-nav">Get Started</a>
    </div>
  </nav>
  <div class="hero-content">
    <h1 class="hero-title">Build Faster with AI Agents</h1>
    <p class="hero-subtitle">Orchestrate multiple AI agents to accelerate your development workflow</p>
    <button class="btn-hero">Start Free Trial</button>
  </div>
</div>

<div class="features">
  <div class="feature-card">
    <div class="feature-icon">🤖</div>
    <h3>AI Orchestration</h3>
    <p>Coordinate multiple agents seamlessly</p>
  </div>
  <div class="feature-card">
    <div class="feature-icon">⚡</div>
    <h3>Lightning Fast</h3>
    <p>10x faster development cycles</p>
  </div>
  <div class="feature-card">
    <div class="feature-icon">🎯</div>
    <h3>Precision</h3>
    <p>High-quality code every time</p>
  </div>
</div>`
  })

  store.addFile(uxProject.id, {
    name: 'styles.css',
    type: 'css',
    agentId: 'ux-design-expert',
    content: `.hero {
  min-height: 100vh;
  background: linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%);
  color: white;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;
}

.logo {
  font-size: 24px;
  font-weight: bold;
}

.nav-links {
  display: flex;
  gap: 32px;
  align-items: center;
}

.nav-links a {
  color: white;
  text-decoration: none;
  transition: opacity 0.2s;
}

.nav-links a:hover {
  opacity: 0.8;
}

.btn-nav {
  background: white;
  color: #0ea5e9;
  padding: 10px 24px;
  border-radius: 8px;
  font-weight: 600;
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
  padding: 100px 40px;
  text-align: center;
}

.hero-title {
  font-size: 56px;
  margin: 0 0 24px 0;
  line-height: 1.2;
}

.hero-subtitle {
  font-size: 20px;
  margin: 0 0 40px 0;
  opacity: 0.9;
}

.btn-hero {
  background: white;
  color: #0ea5e9;
  padding: 16px 48px;
  border: none;
  border-radius: 12px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s;
}

.btn-hero:hover {
  transform: scale(1.05);
}

.features {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
  max-width: 1200px;
  margin: -60px auto 0;
  padding: 0 40px 80px;
  position: relative;
}

.feature-card {
  background: white;
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.1);
  text-align: center;
}

.feature-icon {
  font-size: 48px;
  margin-bottom: 20px;
}

.feature-card h3 {
  margin: 0 0 12px 0;
  color: #1a202c;
  font-size: 24px;
}

.feature-card p {
  margin: 0;
  color: #718096;
  line-height: 1.6;
}`
  })
}
