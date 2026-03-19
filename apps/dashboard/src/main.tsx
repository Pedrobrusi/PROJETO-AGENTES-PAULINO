import React from 'react'
import ReactDOM from 'react-dom/client'
import JarvisApp from './JarvisApp.tsx'
import './styles/index.css'
import './styles/jarvis.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <JarvisApp />
  </React.StrictMode>,
)
