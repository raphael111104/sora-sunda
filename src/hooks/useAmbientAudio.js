import { useEffect, useRef, useState } from 'react'

const AMBIENT_VOLUME = 1
const LAYER_GAINS = {
  low: 0.07,
  high: 0.046,
  shimmer: 0.032,
  wind: 0.018,
  tremolo: 0.022,
}

function createNoiseBuffer(audioContext) {
  const buffer = audioContext.createBuffer(1, audioContext.sampleRate * 2, audioContext.sampleRate)
  const channel = buffer.getChannelData(0)

  for (let index = 0; index < channel.length; index += 1) {
    channel[index] = (Math.random() * 2 - 1) * 0.4
  }

  return buffer
}

export function useAmbientAudio() {
  const [isActive, setIsActive] = useState(false)
  const audioRef = useRef(null)
  const suspendTimeoutRef = useRef(null)

  const ensureGraph = async () => {
    if (audioRef.current) {
      return audioRef.current
    }

    const AudioContextClass = window.AudioContext || window.webkitAudioContext
    if (!AudioContextClass) {
      return null
    }

    const context = new AudioContextClass()
    const master = context.createGain()
    const windGain = context.createGain()
    const lowGain = context.createGain()
    const highGain = context.createGain()
    const shimmerGain = context.createGain()
    const tremolo = context.createOscillator()
    const tremoloGain = context.createGain()
    const lowTone = context.createOscillator()
    const highTone = context.createOscillator()
    const shimmerTone = context.createOscillator()
    const noiseSource = context.createBufferSource()
    const noiseFilter = context.createBiquadFilter()

    master.gain.value = 0
    lowGain.gain.value = LAYER_GAINS.low
    highGain.gain.value = LAYER_GAINS.high
    shimmerGain.gain.value = LAYER_GAINS.shimmer
    windGain.gain.value = LAYER_GAINS.wind
    tremolo.frequency.value = 0.09
    tremoloGain.gain.value = LAYER_GAINS.tremolo
    lowTone.type = 'sine'
    highTone.type = 'triangle'
    shimmerTone.type = 'sine'
    lowTone.frequency.value = 109.5
    highTone.frequency.value = 219
    shimmerTone.frequency.value = 328.5
    noiseFilter.type = 'bandpass'
    noiseFilter.frequency.value = 950
    noiseFilter.Q.value = 0.65
    noiseSource.buffer = createNoiseBuffer(context)
    noiseSource.loop = true

    lowTone.connect(lowGain)
    highTone.connect(highGain)
    shimmerTone.connect(shimmerGain)
    lowGain.connect(master)
    highGain.connect(master)
    shimmerGain.connect(master)
    noiseSource.connect(noiseFilter)
    noiseFilter.connect(windGain)
    windGain.connect(master)
    tremolo.connect(tremoloGain)
    tremoloGain.connect(master.gain)
    master.connect(context.destination)

    lowTone.start()
    highTone.start()
    shimmerTone.start()
    noiseSource.start()
    tremolo.start()

    audioRef.current = {
      context,
      master,
      nodes: [lowTone, highTone, shimmerTone, noiseSource, tremolo],
    }

    return audioRef.current
  }

  const stopAmbient = () => {
    const audio = audioRef.current
    if (!audio) {
      return
    }

    const now = audio.context.currentTime
    audio.master.gain.cancelScheduledValues(now)
    audio.master.gain.setValueAtTime(audio.master.gain.value, now)
    audio.master.gain.linearRampToValueAtTime(0, now + 0.5)

    clearTimeout(suspendTimeoutRef.current)
    suspendTimeoutRef.current = window.setTimeout(() => {
      if (audio.context.state === 'running') {
        audio.context.suspend()
      }
    }, 650)
  }

  const startAmbient = async () => {
    const audio = await ensureGraph()
    if (!audio) {
      return
    }

    clearTimeout(suspendTimeoutRef.current)

    if (audio.context.state !== 'running') {
      await audio.context.resume()
    }

    const now = audio.context.currentTime
    audio.master.gain.cancelScheduledValues(now)
    audio.master.gain.setValueAtTime(audio.master.gain.value, now)
    audio.master.gain.linearRampToValueAtTime(AMBIENT_VOLUME, now + 1.1)
  }

  const toggle = async () => {
    const nextState = !isActive
    setIsActive(nextState)

    if (nextState) {
      await startAmbient()
      return
    }

    stopAmbient()
  }

  useEffect(() => {
    return () => {
      clearTimeout(suspendTimeoutRef.current)

      if (audioRef.current?.context) {
        audioRef.current.context.close()
      }
    }
  }, [])

  return {
    isActive,
    toggle,
  }
}
