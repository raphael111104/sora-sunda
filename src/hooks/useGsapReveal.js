import { useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const revealPresets = {
  up: { y: 64, x: 0, filter: 'blur(10px)', scale: 0.98 },
  down: { y: -64, x: 0, filter: 'blur(10px)', scale: 0.98 },
  left: { x: -78, y: 0, filter: 'blur(12px)', scale: 0.985 },
  right: { x: 78, y: 0, filter: 'blur(12px)', scale: 0.985 },
  diagonal: { x: 42, y: 42, filter: 'blur(12px)', scale: 0.975 },
  soft: { x: 0, y: 32, filter: 'blur(8px)', scale: 0.99 },
}

export function useGsapReveal(rootRef, reducedMotion) {
  useLayoutEffect(() => {
    if (reducedMotion || !rootRef.current) {
      return undefined
    }

    const context = gsap.context(() => {
      gsap.utils.toArray('[data-reveal]').forEach((element) => {
        const preset = revealPresets[element.dataset.reveal] ?? revealPresets.up

        gsap.fromTo(
          element,
          {
            autoAlpha: 0,
            x: preset.x,
            y: preset.y,
            scale: preset.scale,
            filter: preset.filter,
          },
          {
            autoAlpha: 1,
            x: 0,
            y: 0,
            scale: 1,
            filter: 'blur(0px)',
            duration: 1.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: element,
              start: 'top 84%',
              once: true,
            },
          },
        )
      })

      gsap.utils.toArray('[data-stagger-group]').forEach((group) => {
        const items = group.querySelectorAll('[data-stagger-item]')
        if (!items.length) {
          return
        }

        gsap.fromTo(
          items,
          {
            autoAlpha: 0,
            y: 42,
            filter: 'blur(10px)',
          },
          {
            autoAlpha: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 1.05,
            ease: 'power3.out',
            stagger: 0.12,
            scrollTrigger: {
              trigger: group,
              start: 'top 82%',
              once: true,
            },
          },
        )
      })

      gsap.utils.toArray('[data-parallax]').forEach((element) => {
        const depth = Number(element.dataset.parallax ?? 12)
        gsap.to(element, {
          yPercent: depth,
          ease: 'none',
          scrollTrigger: {
            trigger: element.closest('[data-parallax-section]') ?? element,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        })
      })

      gsap.utils.toArray('[data-horizontal-track]').forEach((element) => {
        gsap.fromTo(
          element,
          {
            xPercent: 11,
            autoAlpha: 0.65,
          },
          {
            xPercent: 0,
            autoAlpha: 1,
            duration: 1.25,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: element,
              start: 'top 82%',
              once: true,
            },
          },
        )
      })
    }, rootRef)

    return () => {
      context.revert()
    }
  }, [reducedMotion, rootRef])
}
