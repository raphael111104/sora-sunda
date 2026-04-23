import { motion } from 'motion/react'

export function TextSplit({
  as = 'p',
  className = '',
  delay = 0,
  text,
  variant = 'words',
  reducedMotion = false,
}) {
  const MotionSpan = motion.span
  const Component = as
  const units = variant === 'chars' ? [...text] : text.split(' ')

  return (
    <Component aria-label={text} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="inline-flex flex-wrap">
        {units.map((unit, index) => (
          <span className="mr-[0.28em] inline-flex overflow-hidden" key={`${unit}-${index}`}>
            <MotionSpan
              initial={reducedMotion ? false : { opacity: 0, y: '110%' }}
              transition={{
                duration: reducedMotion ? 0 : 0.85,
                delay: reducedMotion ? 0 : delay + index * (variant === 'chars' ? 0.018 : 0.04),
                ease: [0.22, 1, 0.36, 1],
              }}
              viewport={{ once: true, amount: 0.8 }}
              whileInView={reducedMotion ? {} : { opacity: 1, y: '0%' }}
            >
              {unit === ' ' ? '\u00A0' : unit}
            </MotionSpan>
          </span>
        ))}
      </span>
    </Component>
  )
}
