import { useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'

export function Navbar({
  items,
  activeSection,
  onNavigate,
  isAudioActive,
  onToggleAudio,
  reducedMotion,
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { scrollY } = useScroll()
  const MotionDiv = motion.div
  const MotionAside = motion.aside
  const MotionButton = motion.button

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsScrolled(latest > 40)
  })

  const navClassName = isScrolled
    ? 'border-[rgba(206,180,123,0.14)] bg-[rgba(7,10,8,0.82)] shadow-[0_20px_80px_rgba(0,0,0,0.32)] backdrop-blur-xl'
    : 'border-transparent bg-transparent'

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-40 px-4 pt-4 sm:px-6 lg:px-10">
        <MotionDiv
          animate={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          className={`pointer-events-auto mx-auto flex max-w-[1440px] items-center justify-between rounded-full border px-4 py-3 text-[0.78rem] uppercase tracking-[0.28em] text-[var(--color-muted)] transition-all duration-500 sm:px-6 ${navClassName}`}
          initial={reducedMotion ? false : { opacity: 0, y: -24 }}
          transition={{ duration: reducedMotion ? 0 : 0.8, ease: 'easeOut' }}
        >
          <button
            className="group flex items-center gap-3 text-left"
            onClick={() => onNavigate('hero')}
            type="button"
          >
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(206,180,123,0.24)] bg-[rgba(204,186,148,0.06)] text-[0.62rem] tracking-[0.34em] text-[var(--color-accent)] transition-transform duration-500 group-hover:scale-105">
              SD
            </span>
            <span className="hidden flex-col leading-none sm:flex">
              <span className="font-body text-[0.62rem] tracking-[0.38em] text-[var(--color-accent)]">
                Galeri Digital
              </span>
              <span className="mt-1 font-display text-lg normal-case tracking-[0.08em] text-[var(--color-cream)]">
                Adat Sunda
              </span>
            </span>
          </button>

          <nav className="hidden items-center gap-6 lg:flex">
            {items.map((item) => {
              const isActive = activeSection === item.id

              return (
                <button
                  className={`relative pb-1 transition-colors duration-300 ${
                    isActive ? 'text-[var(--color-cream)]' : 'text-[var(--color-muted)] hover:text-[var(--color-cream)]'
                  }`}
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  type="button"
                >
                  {item.label}
                  <span
                    className={`absolute inset-x-0 bottom-0 h-px origin-left bg-[linear-gradient(90deg,transparent,rgba(206,180,123,0.88),transparent)] transition-transform duration-500 ${
                      isActive ? 'scale-x-100' : 'scale-x-0'
                    }`}
                  />
                </button>
              )
            })}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              aria-label={isAudioActive ? 'Matikan ambience' : 'Nyalakan ambience'}
              className={`hidden rounded-full border px-4 py-2 text-[0.68rem] tracking-[0.28em] transition-all duration-300 sm:inline-flex ${
                isAudioActive
                  ? 'border-[rgba(206,180,123,0.36)] bg-[rgba(206,180,123,0.16)] text-[var(--color-cream)]'
                  : 'border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] text-[var(--color-muted)] hover:border-[rgba(206,180,123,0.24)] hover:text-[var(--color-cream)]'
              }`}
              onClick={onToggleAudio}
              type="button"
            >
              {isAudioActive ? 'Ambien On' : 'Ambien Off'}
            </button>
            <button
              aria-expanded={isOpen}
              aria-label="Buka menu"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.04)] text-[var(--color-cream)] lg:hidden"
              onClick={() => setIsOpen((value) => !value)}
              type="button"
            >
              <span className="relative flex h-4 w-5 flex-col justify-between">
                <span
                  className={`h-px w-full bg-current transition-transform duration-300 ${
                    isOpen ? 'translate-y-[7px] rotate-45' : ''
                  }`}
                />
                <span
                  className={`h-px w-3/4 bg-current transition-opacity duration-300 ${
                    isOpen ? 'opacity-0' : 'opacity-100'
                  }`}
                />
                <span
                  className={`h-px w-full bg-current transition-transform duration-300 ${
                    isOpen ? '-translate-y-[7px] -rotate-45' : ''
                  }`}
                />
              </span>
            </button>
          </div>
        </MotionDiv>
      </header>

      <AnimatePresence>
        {isOpen && (
          <MotionAside
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-30 bg-[rgba(4,5,4,0.7)] px-4 pt-24 backdrop-blur-md lg:hidden"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
          >
            <MotionDiv
              animate={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              className="mx-auto max-w-xl rounded-[2rem] border border-[rgba(206,180,123,0.12)] bg-[rgba(10,12,10,0.94)] p-6 shadow-[0_30px_120px_rgba(0,0,0,0.45)]"
              exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
              initial={reducedMotion ? false : { opacity: 0, y: 16 }}
              transition={{ duration: reducedMotion ? 0 : 0.35, ease: 'easeOut' }}
            >
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="font-body text-[0.65rem] uppercase tracking-[0.34em] text-[var(--color-accent)]">
                    Navigasi
                  </p>
                  <p className="mt-2 font-display text-2xl text-[var(--color-cream)]">
                    Jejak Warisan Sunda
                  </p>
                </div>
                <button
                  className="rounded-full border border-[rgba(255,255,255,0.08)] px-4 py-2 text-[0.68rem] uppercase tracking-[0.24em] text-[var(--color-muted)]"
                  onClick={onToggleAudio}
                  type="button"
                >
                  {isAudioActive ? 'Audio On' : 'Audio Off'}
                </button>
              </div>

              <div className="space-y-2">
                {items.map((item, index) => (
                  <MotionButton
                    className={`flex w-full items-center justify-between rounded-[1.35rem] border px-4 py-4 text-left ${
                      activeSection === item.id
                        ? 'border-[rgba(206,180,123,0.22)] bg-[rgba(206,180,123,0.09)] text-[var(--color-cream)]'
                        : 'border-[rgba(255,255,255,0.06)] text-[var(--color-muted)]'
                    }`}
                    key={item.id}
                    onClick={() => {
                      onNavigate(item.id)
                      setIsOpen(false)
                    }}
                    transition={{ duration: reducedMotion ? 0 : 0.22, delay: reducedMotion ? 0 : index * 0.03 }}
                    type="button"
                    >
                      <span className="font-body text-[0.7rem] uppercase tracking-[0.28em]">
                        {item.label}
                      </span>
                      <span className="font-display text-xl text-[var(--color-accent)]">
                        0{index + 1}
                      </span>
                  </MotionButton>
                ))}
              </div>
            </MotionDiv>
          </MotionAside>
        )}
      </AnimatePresence>
    </>
  )
}
