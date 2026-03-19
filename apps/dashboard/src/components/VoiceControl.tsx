import { useEffect } from 'react'
import { Mic, MicOff, Volume2, VolumeX } from 'lucide-react'
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition'
import { useSpeechSynthesis } from '@/hooks/useSpeechSynthesis'

interface VoiceControlProps {
  onCommand: (command: string) => void
  onResponse?: (response: string) => void
}

export function VoiceControl({ onCommand, onResponse }: VoiceControlProps) {
  const {
    isListening,
    transcript,
    startListening,
    stopListening,
    resetTranscript,
    isSupported: isSpeechRecognitionSupported,
    error: speechError
  } = useSpeechRecognition()

  const {
    speak,
    cancel,
    isSpeaking,
    isSupported: isSpeechSynthesisSupported
  } = useSpeechSynthesis()

  // Process voice commands
  useEffect(() => {
    if (transcript) {
      const lowerTranscript = transcript.toLowerCase()

      // Check for JARVIS activation
      if (lowerTranscript.includes('jarvis') || lowerTranscript.includes('jarvis')) {
        const command = lowerTranscript.replace(/jarvis[,\s]*/gi, '').trim()

        if (command) {
          onCommand(command)
          speak('At your service.')
        } else {
          speak('Yes, how can I help you?')
        }

        resetTranscript()
      }
    }
  }, [transcript, onCommand, speak, resetTranscript])

  // Speak responses
  useEffect(() => {
    if (onResponse) {
      // This will be called when a response is ready to speak
    }
  }, [onResponse])

  const toggleListening = () => {
    if (isListening) {
      stopListening()
    } else {
      startListening()
    }
  }

  const toggleSpeaking = () => {
    if (isSpeaking) {
      cancel()
    }
  }

  if (!isSpeechRecognitionSupported && !isSpeechSynthesisSupported) {
    return (
      <div className="jarvis-panel p-4 text-center">
        <p className="text-jarvis-text-dim text-sm">
          Controle de voz não suportado neste navegador
        </p>
      </div>
    )
  }

  return (
    <div className="jarvis-panel p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="jarvis-text-glow font-bold text-lg">Voice Control</h3>
        <div className="flex items-center gap-2">
          {/* Microphone Control */}
          {isSpeechRecognitionSupported && (
            <button
              onClick={toggleListening}
              className={`
                p-3 rounded-full transition-all duration-300
                ${isListening
                  ? 'jarvis-glow-strong bg-sky-500/20'
                  : 'bg-slate-800/50 hover:bg-slate-700/50'
                }
              `}
              title={isListening ? 'Stop Listening' : 'Start Listening'}
            >
              {isListening ? (
                <Mic size={24} className="text-sky-400" />
              ) : (
                <MicOff size={24} className="text-slate-400" />
              )}
            </button>
          )}

          {/* Speaker Control */}
          {isSpeechSynthesisSupported && (
            <button
              onClick={toggleSpeaking}
              className={`
                p-3 rounded-full transition-all duration-300
                ${isSpeaking
                  ? 'jarvis-glow-strong bg-sky-500/20'
                  : 'bg-slate-800/50 hover:bg-slate-700/50'
                }
              `}
              title={isSpeaking ? 'Stop Speaking' : 'Speaker Active'}
            >
              {isSpeaking ? (
                <Volume2 size={24} className="text-sky-400" />
              ) : (
                <VolumeX size={24} className="text-slate-400" />
              )}
            </button>
          )}
        </div>
      </div>

      {/* Status Display */}
      <div className="space-y-3">
        {isListening && (
          <div className="flex items-center gap-3">
            <div className="jarvis-wave">
              <div className="jarvis-wave-bar" style={{ height: '40%' }}></div>
              <div className="jarvis-wave-bar" style={{ height: '60%' }}></div>
              <div className="jarvis-wave-bar" style={{ height: '80%' }}></div>
              <div className="jarvis-wave-bar" style={{ height: '60%' }}></div>
              <div className="jarvis-wave-bar" style={{ height: '40%' }}></div>
            </div>
            <span className="text-sky-400 text-sm font-medium">Listening...</span>
          </div>
        )}

        {transcript && (
          <div className="p-3 rounded bg-slate-800/50 border border-sky-500/30">
            <p className="text-sm text-slate-300">
              <span className="text-sky-400 font-semibold">You said:</span> {transcript}
            </p>
          </div>
        )}

        {isSpeaking && (
          <div className="flex items-center gap-3">
            <div className="jarvis-typing">
              <div className="jarvis-typing-dot"></div>
              <div className="jarvis-typing-dot"></div>
              <div className="jarvis-typing-dot"></div>
            </div>
            <span className="text-sky-400 text-sm font-medium">JARVIS speaking...</span>
          </div>
        )}

        {speechError && (
          <div className="p-3 rounded bg-red-500/10 border border-red-500/30">
            <p className="text-sm text-red-400">{speechError}</p>
          </div>
        )}

        {/* Instructions */}
        {!isListening && !transcript && (
          <div className="p-4 rounded bg-slate-800/30 border border-sky-500/20">
            <p className="text-xs text-slate-400 text-center">
              {isSpeechRecognitionSupported ? (
                <>
                  Clique no microfone e diga:<br />
                  <span className="text-sky-400 font-mono">"JARVIS, [seu comando]"</span>
                </>
              ) : (
                'Reconhecimento de voz não disponível'
              )}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
