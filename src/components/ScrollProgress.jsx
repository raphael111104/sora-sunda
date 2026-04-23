import { motion, useScroll, useSpring } from 'motion/react'

export function ScrollProgress() {
  const MotionSpan = motion.span
  const { scrollYProgress } = useScroll()
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 160,
    damping: 30,
    mass: 0.2,
  })

  return (
    <div className="pointer-events-none fixed right-3 top-1/2 z-30 hidden -translate-y-1/2 items-center gap-4 lg:flex">
      <div className="flex h-48 w-px items-center justify-center rounded-full bg-[rgba(255,255,255,0.08)]">
        <MotionSpan
          className="origin-top rounded-full bg-[linear-gradient(180deg,rgba(225,204,160,0.95),rgba(122,145,104,0.8))]"
          style={{ height: '100%', scaleY, width: '100%' }}
        />
      </div>
      <div className="[writing-mode:vertical-rl] text-[0.62rem] uppercase tracking-[0.42em] text-[rgba(220,209,188,0.45)]">
        Jelajah
      </div>
    </div>
  )
}
