import { useEffect, useState } from 'react'
import type { NeuralPathway } from '../types/brain'
export function useReducedMotion() {
  const [reduced, setReduced] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(media.matches)
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])
  return reduced
}
export function usePathwayAnimation(pathway?: NeuralPathway) {
  const reduced = useReducedMotion()
  const [step, setStep] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [complete, setComplete] = useState(false)
  useEffect(() => {
    if (!playing || !pathway) return
    const timer = window.setTimeout(() => {
      if (step < pathway.steps.length - 1) setStep(step + 1)
      else {
        setPlaying(false)
        setComplete(true)
      }
    }, 1500)
    return () => window.clearTimeout(timer)
  }, [playing, step, pathway])
  const start = (autoplay = true) => {
    setStep(0)
    setComplete(false)
    setPlaying(autoplay && !reduced)
  }
  const go = (next: number) => {
    setPlaying(false)
    setComplete(false)
    setStep(Math.max(0, Math.min(next, (pathway?.steps.length ?? 1) - 1)))
  }
  const toggle = () => {
    if (complete) {
      setStep(0)
      setComplete(false)
    }
    setPlaying(!playing)
  }
  return { step, playing, complete, reduced, start, go, toggle, stop: () => setPlaying(false) }
}
