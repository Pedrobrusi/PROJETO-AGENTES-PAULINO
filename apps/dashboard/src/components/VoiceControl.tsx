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
          speak('Processing your request.')
        } else {
          speak('How can I help you?')
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
      <div className="jarvis-panel p-5 text-center">
        <p className="text-neutral-500 text-sm">
          Voice control not supported in this browser
        </p>
      </div>
    )
  }

  return (
    <div className="jarvis-panel p-5">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-semibold text-neutral-900">Voice Control</h3>
        <div className="flex items-center gap-2">
          {/* Microphone Control */}
          {isSpeechRecognitionSupported && (
            <button
              onClick={toggleListening}
              className={`
                p-2.5 rounded-lg transition-all border
                ${isListening
                  ? 'bg-primary-50 border-primary-300 text-primary-600'
                  : 'bg-neutral-100 border-neutral-200 text-neutral-600 hover:bg-neutral-200'
                }
              `}
              title={isListening ? 'Stop Listening' : 'Start Listening'}
            >
              {isListening ? (
                <Mic size={20} />
              ) : (
                <MicOff size={20} />
              )}
            </button>
          )}

          {/* Speaker Control */}
          {isSpeechSynthesisSupported && (
            <button
              onClick={toggleSpeaking}
              className={`
                p-2.5 rounded-lg transition-all border
                ${isSpeaking
                  ? 'bg-primary-50 border-primary-300 text-primary-600'
                  : 'bg-neutral-100 border-neutral-200 text-neutral-600 hover:bg-neutral-200'
                }
              `}
              title={isSpeaking ? 'Stop Speaking' : 'Speaker Active'}
            >
              {isSpeaking ? (
                <Volume2 size={20} />
              ) : (
                <VolumeX size={20} />
              )}
            </button>
          )}
        </div>
      </div>

      {/* Status Display */}
      <div className="space-y-3">
        {isListening && (
          <div className="flex items-center gap-3 p-3 rounded-lg bg-primary-50 border border-primary-200">
            <div className="flex items-center gap-1">
              <div className="w-1 h-4 bg-primary-500 rounded-full animate-pulse" style={{ animationDelay: '0s' }}></div>
              <div className="w-1 h-6 bg-primary-500 rounded-full animate-pulse" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-1 h-8 bg-primary-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-1 h-6 bg-primary-500 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }}></div>
              <div className="w-1 h-4 bg-primary-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>
            <span className="text-primary-700 text-sm font-medium">Listening...</span>
          </div>
        )}

        {transcript && (
          <div className="p-3 rounded-lg bg-neutral-50 border border-neutral-200">
            <p className="text-sm text-neutral-700">
              <span className="text-primary-700 font-semibold">You said:</span> {transcript}
            </p>
          </div>
        )}

        {isSpeaking && (
          <div className="flex items-center gap-3 p-3 rounded-lg bg-primary-50 border border-primary-200">
            <div className="flex gap-1">
              <span className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></span>
              <span className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
              <span className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
            </div>
            <span className="text-primary-700 text-sm font-medium">Speaking...</span>
          </div>
        )}

        {speechError && (
          <div className="p-3 rounded-lg bg-error/10 border border-error/30">
            <p className="text-sm text-error">{speechError}</p>
          </div>
        )}

        {/* Instructions */}
        {!isListening && !transcript && (
          <div className="p-4 rounded-lg bg-neutral-50 border border-neutral-200">
            <p className="text-xs text-neutral-600 text-center leading-relaxed">
              {isSpeechRecognitionSupported ? (
                <>
                  Click the microphone and say:<br />
                  <span className="text-primary-700 font-semibold font-mono">"JARVIS, [your command]"</span>
                </>
              ) : (
                'Voice recognition not available'
              )}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
