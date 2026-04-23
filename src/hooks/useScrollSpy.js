import {
  startTransition,
  useDeferredValue,
  useEffect,
  useEffectEvent,
  useState,
} from 'react'

export function useScrollSpy(ids) {
  const [activeSection, setActiveSection] = useState(ids[0] ?? '')
  const deferredActiveSection = useDeferredValue(activeSection)

  const commitActiveSection = useEffectEvent((nextId) => {
    startTransition(() => {
      setActiveSection(nextId)
    })
  })

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean)

    if (!elements.length) {
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visibleEntries[0]?.target?.id) {
          commitActiveSection(visibleEntries[0].target.id)
        }
      },
      {
        rootMargin: '-20% 0px -45% 0px',
        threshold: [0.15, 0.35, 0.6, 0.8],
      },
    )

    elements.forEach((element) => observer.observe(element))

    return () => {
      observer.disconnect()
    }
  }, [ids])

  return deferredActiveSection
}
