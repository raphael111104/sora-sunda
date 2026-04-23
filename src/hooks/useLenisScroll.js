import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useLenisScroll(reducedMotion) {
  useEffect(() => {
    if (reducedMotion) {
      return undefined
    }

    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      touchMultiplier: 1.1,
      easing: (value) => Math.min(1, 1.001 - 2 ** (-10 * value)),
    })

    const update = (time) => {
      lenis.raf(time * 1000)
    }

    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add(update)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(update)
      lenis.destroy()
    }
  }, [reducedMotion])
}
