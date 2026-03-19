import { useState, useEffect, useRef } from 'react'
import { Monitor, Code, Eye, EyeOff, Maximize2, Minimize2, RotateCcw, Download } from 'lucide-react'

interface ProjectFile {
  name: string
  content: string
  type: 'html' | 'css' | 'js' | 'tsx' | 'ts'
}

interface ProjectPreviewProps {
  agentId?: string
  files?: ProjectFile[]
  autoRefresh?: boolean
}

export function ProjectPreview({ agentId, files = [], autoRefresh = true }: ProjectPreviewProps) {
  const [isCodeView, setIsCodeView] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [selectedFile, setSelectedFile] = useState<ProjectFile | null>(files[0] || null)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  // Generate HTML content for preview
  const generatePreviewHTML = () => {
    const htmlFile = files.find(f => f.type === 'html')
    const cssFile = files.find(f => f.type === 'css')
    const jsFile = files.find(f => f.type === 'js')

    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Agent Preview</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
          ${cssFile?.content || ''}
        </style>
      </head>
      <body>
        ${htmlFile?.content || '<div style="padding: 40px; text-align: center; color: #94a3b8;"><h2>No content yet</h2><p>Agents will populate this preview as they work</p></div>'}
        <script>
          ${jsFile?.content || ''}
        </script>
      </body>
      </html>
    `
  }

  // Update iframe content
  useEffect(() => {
    if (iframeRef.current && !isCodeView) {
      const iframe = iframeRef.current
      const doc = iframe.contentDocument || iframe.contentWindow?.document

      if (doc) {
        doc.open()
        doc.write(generatePreviewHTML())
        doc.close()
      }
    }
  }, [files, isCodeView])

  // Auto-refresh
  useEffect(() => {
    if (autoRefresh && !isCodeView) {
      const interval = setInterval(() => {
        if (iframeRef.current) {
          const iframe = iframeRef.current
          const doc = iframe.contentDocument || iframe.contentWindow?.document

          if (doc) {
            doc.open()
            doc.write(generatePreviewHTML())
            doc.close()
          }
        }
      }, 2000)

      return () => clearInterval(interval)
    }
  }, [autoRefresh, files, isCodeView])

  const handleRefresh = () => {
    if (iframeRef.current && !isCodeView) {
      const iframe = iframeRef.current
      const doc = iframe.contentDocument || iframe.contentWindow?.document

      if (doc) {
        doc.open()
        doc.write(generatePreviewHTML())
        doc.close()
      }
    }
  }

  const handleDownload = () => {
    const content = generatePreviewHTML()
    const blob = new Blob([content], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `agent-${agentId || 'preview'}.html`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className={`flex flex-col ${isFullscreen ? 'fixed inset-0 z-50 bg-slate-950' : 'h-full'}`}>
      {/* Preview Header */}
      <div className="jarvis-panel p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Monitor className="text-sky-400" size={20} />
            <h3 className="jarvis-text-glow font-bold">Live Preview</h3>
            {agentId && (
              <span className="text-xs text-slate-500">
                {agentId}'s workspace
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {/* View Toggle */}
            <button
              onClick={() => setIsCodeView(!isCodeView)}
              className={`p-2 rounded-lg transition-all ${
                isCodeView
                  ? 'bg-sky-500/20 text-sky-400'
                  : 'bg-slate-800/50 text-slate-400 hover:bg-slate-700/50'
              }`}
              title={isCodeView ? 'Show preview' : 'Show code'}
            >
              {isCodeView ? <Eye size={18} /> : <Code size={18} />}
            </button>

            {/* Refresh */}
            <button
              onClick={handleRefresh}
              className="p-2 rounded-lg bg-slate-800/50 text-slate-400 hover:bg-slate-700/50 transition-all"
              title="Refresh preview"
            >
              <RotateCcw size={18} />
            </button>

            {/* Download */}
            <button
              onClick={handleDownload}
              className="p-2 rounded-lg bg-slate-800/50 text-slate-400 hover:bg-slate-700/50 transition-all"
              title="Download HTML"
            >
              <Download size={18} />
            </button>

            {/* Fullscreen */}
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-2 rounded-lg bg-slate-800/50 text-slate-400 hover:bg-slate-700/50 transition-all"
              title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
            >
              {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
            </button>
          </div>
        </div>

        {/* File Tabs */}
        {isCodeView && files.length > 0 && (
          <div className="flex gap-2 mt-3">
            {files.map((file) => (
              <button
                key={file.name}
                onClick={() => setSelectedFile(file)}
                className={`px-3 py-1 rounded-lg text-sm transition-all ${
                  selectedFile?.name === file.name
                    ? 'bg-sky-500/20 text-sky-400 border border-sky-500/50'
                    : 'bg-slate-800/50 text-slate-400 border border-slate-700 hover:border-sky-500/30'
                }`}
              >
                {file.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Preview Content */}
      <div className="flex-1 jarvis-panel m-4 mt-0 overflow-hidden">
        {isCodeView ? (
          <div className="h-full overflow-auto p-4">
            {selectedFile ? (
              <pre className="text-sm">
                <code className="text-sky-400 font-mono">
                  {selectedFile.content}
                </code>
              </pre>
            ) : (
              <div className="flex items-center justify-center h-full text-slate-500">
                No file selected
              </div>
            )}
          </div>
        ) : (
          <iframe
            ref={iframeRef}
            className="w-full h-full border-0 bg-white rounded-lg"
            sandbox="allow-scripts allow-same-origin"
            title="Agent Preview"
          />
        )}
      </div>

      {/* Status Bar */}
      <div className="jarvis-panel mx-4 mb-4 p-2 flex items-center justify-between text-xs text-slate-500">
        <div className="flex items-center gap-4">
          <span>{files.length} files</span>
          <span className={autoRefresh ? 'text-green-400' : ''}>
            {autoRefresh ? '● Auto-refresh ON' : 'Auto-refresh OFF'}
          </span>
        </div>
        <div>
          Last update: {new Date().toLocaleTimeString('pt-BR')}
        </div>
      </div>
    </div>
  )
}
