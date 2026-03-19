/**
 * Backend server for AIOX Dashboard
 * Enables file system operations and bash command execution
 */

import express from 'express'
import cors from 'cors'
import { exec } from 'child_process'
import { promisify } from 'util'
import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const execAsync = promisify(exec)
const __dirname = path.dirname(fileURLToPath(import.meta.url))

const app = express()
const PORT = 3003

app.use(cors())
app.use(express.json({ limit: '50mb' }))

// API endpoint to create project files
app.post('/api/create-project', async (req, res) => {
  try {
    const { project, baseDir } = req.body

    if (!project || !project.name || !project.files) {
      return res.status(400).json({
        success: false,
        message: 'Invalid project data'
      })
    }

    // Use provided baseDir or default to Desktop
    const projectBaseDir = baseDir || path.join(process.env.USERPROFILE || process.env.HOME, 'Desktop')
    const projectPath = path.join(projectBaseDir, project.name)

    console.log(`Creating project at: ${projectPath}`)

    // Create project directory
    await fs.mkdir(projectPath, { recursive: true })

    let filesCreated = 0

    // Create all files
    for (const file of project.files) {
      const filePath = path.join(projectPath, file.path)
      const fileDir = path.dirname(filePath)

      // Create directory if needed
      await fs.mkdir(fileDir, { recursive: true })

      // Write file
      await fs.writeFile(filePath, file.content, 'utf-8')
      filesCreated++
      console.log(`Created: ${file.path}`)
    }

    // Install dependencies if package.json exists
    let installOutput = ''
    if (project.files.some(f => f.path === 'package.json')) {
      console.log('Installing dependencies...')
      try {
        const { stdout, stderr } = await execAsync('npm install', {
          cwd: projectPath,
          timeout: 120000 // 2 minutes timeout
        })
        installOutput = stdout + stderr
        console.log('Dependencies installed')
      } catch (error) {
        console.error('Error installing dependencies:', error.message)
        installOutput = `Warning: Could not install dependencies automatically. Please run 'npm install' manually.\n${error.message}`
      }
    }

    res.json({
      success: true,
      message: `Project created successfully at: ${projectPath}`,
      filesCreated,
      projectPath,
      installOutput
    })
  } catch (error) {
    console.error('Error creating project:', error)
    res.status(500).json({
      success: false,
      message: error.message,
      filesCreated: 0
    })
  }
})

// API endpoint to execute bash commands
app.post('/api/exec', async (req, res) => {
  try {
    const { command, cwd } = req.body

    if (!command) {
      return res.status(400).json({
        success: false,
        message: 'No command provided'
      })
    }

    console.log(`Executing: ${command}`)
    const { stdout, stderr } = await execAsync(command, {
      cwd: cwd || process.cwd(),
      timeout: 30000 // 30 seconds timeout
    })

    res.json({
      success: true,
      stdout,
      stderr
    })
  } catch (error) {
    console.error('Error executing command:', error)
    res.status(500).json({
      success: false,
      message: error.message,
      stdout: error.stdout || '',
      stderr: error.stderr || ''
    })
  }
})

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'AIOX Backend Server Running' })
})

app.listen(PORT, () => {
  console.log(`🚀 AIOX Backend Server running on http://localhost:${PORT}`)
  console.log(`📁 File operations enabled`)
  console.log(`⚡ Bash execution enabled`)
})
