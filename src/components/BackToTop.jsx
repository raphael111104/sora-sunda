import { useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'

export function BackToTop({ reducedMotion }) {
  const MotionButton = motion.button
  const [visible, setVisible] = useState(false)
  const { scrollYProgress } = useScroll()

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    setVisible(latest > 0.16)
  })

  return (
    <AnimatePresence>
      {visible && (
        <MotionButton
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-4 right-4 z-30 rounded-full border border-[rgba(206,180,123,0.18)] bg-[rgba(8,10,8,0.76)] px-4 py-3 text-[0.64rem] uppercase tracking-[0.28em] text-[var(--color-cream)] shadow-[0_18px_60px_rgba(0,0,0,0.35)] backdrop-blur-lg"
          exit={{ opacity: 0, y: 16 }}
          initial={reducedMotion ? false : { opacity: 0, y: 16 }}
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: reducedMotion ? 'auto' : 'smooth',
            })
          }
          transition={{ duration: reducedMotion ? 0 : 0.28, ease: 'easeOut' }}
          type="button"
        >
          Ke Atas
        </MotionButton>
      )}
    </AnimatePresence>
  )
}
