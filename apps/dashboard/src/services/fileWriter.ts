/**
 * File Writer Service
 *
 * This service enables agents to write REAL files to disk
 * using the File System Access API (for browser) or Node.js fs
 */

import type { ProjectStructure, FileToCreate } from './agentActions'

/**
 * Write a complete project to disk
 * Creates all directories and files automatically
 */
export async function writeProjectToDisk(
  project: ProjectStructure,
  baseDir: string
): Promise<{ success: boolean; message: string; filesCreated: number }> {
  try {
    const fs = await import('fs').catch(() => null)
    const path = await import('path').catch(() => null)

    if (!fs || !path) {
      return {
        success: false,
        message: 'File system not available (running in browser)',
        filesCreated: 0
      }
    }

    const projectPath = path.join(baseDir, project.name)

    // Create project directory
    if (!fs.existsSync(projectPath)) {
      fs.mkdirSync(projectPath, { recursive: true })
    }

    let filesCreated = 0

    // Write all files
    for (const file of project.files) {
      const filePath = path.join(projectPath, file.path)
      const fileDir = path.dirname(filePath)

      // Create directory if it doesn't exist
      if (!fs.existsSync(fileDir)) {
        fs.mkdirSync(fileDir, { recursive: true })
      }

      // Write file
      fs.writeFileSync(filePath, file.content, 'utf-8')
      filesCreated++
    }

    return {
      success: true,
      message: `Project created successfully at: ${projectPath}`,
      filesCreated
    }
  } catch (error) {
    return {
      success: false,
      message: `Error creating project: ${error instanceof Error ? error.message : 'Unknown error'}`,
      filesCreated: 0
    }
  }
}

/**
 * Generate bash commands to create the project
 * This is used when direct file writing is not available
 */
export function generateProjectCreationCommands(
  project: ProjectStructure,
  baseDir: string
): string {
  const commands: string[] = []
  const projectPath = `${baseDir}/${project.name}`

  // Create base directory
  commands.push(`mkdir -p "${projectPath}"`)
  commands.push(`cd "${projectPath}"`)

  // Create all directories first
  const directories = new Set<string>()
  project.files.forEach(file => {
    const dir = file.path.split('/').slice(0, -1).join('/')
    if (dir) directories.add(dir)
  })

  Array.from(directories).sort().forEach(dir => {
    commands.push(`mkdir -p "${dir}"`)
  })

  // Create files
  project.files.forEach(file => {
    const escapedContent = file.content.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/`/g, '\\`')
    commands.push(`cat > "${file.path}" << 'ENDOFFILE'
${file.content}
ENDOFFILE`)
  })

  // Install dependencies if package.json exists
  if (project.files.some(f => f.path === 'package.json')) {
    commands.push('')
    commands.push('# Install dependencies')
    commands.push('npm install')
  }

  return commands.join('\n')
}

/**
 * Execute project creation via backend API
 */
export async function createProjectViaBash(
  project: ProjectStructure,
  baseDir: string,
  executeBash?: (command: string) => Promise<{ stdout: string; stderr: string }>
): Promise<{ success: boolean; message: string; output: string; projectPath?: string }> {
  try {
    // Try to use backend API first
    const response = await fetch('http://localhost:3003/api/create-project', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        project,
        baseDir
      })
    })

    const result = await response.json()

    if (result.success) {
      return {
        success: true,
        message: result.message,
        output: result.installOutput || 'Files created successfully',
        projectPath: result.projectPath
      }
    } else {
      return {
        success: false,
        message: result.message,
        output: ''
      }
    }
  } catch (error) {
    // Backend not available - return instructions
    const projectPath = `${baseDir}/${project.name}`.replace(/\\/g, '/')

    return {
      success: false,
      message: `Backend server not running. To create the project, start the server with 'npm run server' in the dashboard directory, or create files manually.`,
      output: `Project would be created at: ${projectPath}\n\nTo start backend server:\ncd apps/dashboard\nnpm run server`,
      projectPath
    }
  }
}
