import { useState, useCallback, useEffect } from 'react'

interface UseSpeechSynthesisReturn {
  speak: (text: string, options?: SpeechSynthesisOptions) => void
  cancel: () => void
  isSpeaking: boolean
  isSupported: boolean
  voices: SpeechSynthesisVoice[]
}

interface SpeechSynthesisOptions {
  voice?: SpeechSynthesisVoice
  rate?: number
  pitch?: number
  volume?: number
}

export function useSpeechSynthesis(): UseSpeechSynthesisReturn {
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])

  const isSupported = typeof window !== 'undefined' && 'speechSynthesis' in window

  useEffect(() => {
    if (!isSupported) return

    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices()
      setVoices(availableVoices)
    }

    loadVoices()
    window.speechSynthesis.onvoiceschanged = loadVoices

    return () => {
      window.speechSynthesis.cancel()
    }
  }, [isSupported])

  const speak = useCallback((text: string, options: SpeechSynthesisOptions = {}) => {
    if (!isSupported) return

    // Cancel any ongoing speech
    window.speechSynthesis.cancel()

    const utterance = new SpeechSynthesisUtterance(text)

    // JARVIS voice settings - British male voice with lower pitch
    const defaultVoice = voices.find(v =>
      v.lang.startsWith('en') && v.name.includes('Google UK English Male')
    ) || voices.find(v =>
      v.lang.startsWith('en') && v.name.includes('Male')
    ) || voices[0]

    utterance.voice = options.voice || defaultVoice
    utterance.rate = options.rate || 0.9 // Slightly slower for dramatic effect
    utterance.pitch = options.pitch || 0.8 // Lower pitch for JARVIS-like voice
    utterance.volume = options.volume || 1

    utterance.onstart = () => setIsSpeaking(true)
    utterance.onend = () => setIsSpeaking(false)
    utterance.onerror = () => setIsSpeaking(false)

    window.speechSynthesis.speak(utterance)
  }, [isSupported, voices])

  const cancel = useCallback(() => {
    if (isSupported) {
      window.speechSynthesis.cancel()
      setIsSpeaking(false)
    }
  }, [isSupported])

  return {
    speak,
    cancel,
    isSpeaking,
    isSupported,
    voices
  }
}
