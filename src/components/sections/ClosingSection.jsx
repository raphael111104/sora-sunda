import { motion } from 'motion/react'

export function ClosingSection({ assets, onNavigate, reducedMotion }) {
  const MotionP = motion.p
  const MotionH2 = motion.h2
  const MotionDiv = motion.div

  return (
    <section
      className="relative isolate overflow-hidden border-t border-[rgba(206,180,123,0.08)]"
      id="closing"
    >
      <div className="absolute inset-0">
        <img
          alt="Pemandangan pedesaan Sunda pada suasana senja"
          className="h-full w-full object-cover object-center opacity-48"
          decoding="async"
          loading="lazy"
          src={assets.riceTerrace}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,7,5,0.72),rgba(5,7,5,0.52)_28%,rgba(5,7,5,0.9)_100%)]" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[82vh] max-w-[1320px] flex-col justify-center px-5 py-16 text-center sm:px-8 lg:px-10">
        <MotionP
          className="font-body text-[0.72rem] uppercase tracking-[0.4em] text-[var(--color-accent)]"
          initial={reducedMotion ? false : { opacity: 0, y: 20 }}
          transition={{ duration: reducedMotion ? 0 : 0.7 }}
          whileInView={reducedMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.7 }}
        >
          Call To Preserve
        </MotionP>
        <MotionH2
          className="mx-auto mt-5 max-w-[12ch] text-balance font-display text-[clamp(3rem,6vw,6rem)] leading-[0.94] tracking-[-0.05em] text-[var(--color-cream)]"
          initial={reducedMotion ? false : { opacity: 0, y: 24, filter: 'blur(10px)' }}
          transition={{ duration: reducedMotion ? 0 : 0.85, delay: reducedMotion ? 0 : 0.12 }}
          whileInView={reducedMotion ? {} : { opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, amount: 0.6 }}
        >
          Rawat budaya Sunda agar terus hidup, bahkan di layar yang paling modern.
        </MotionH2>
        <MotionP
          className="mx-auto mt-6 max-w-2xl text-balance text-base leading-8 text-[rgba(234,225,209,0.76)] sm:text-lg"
          initial={reducedMotion ? false : { opacity: 0, y: 24 }}
          transition={{ duration: reducedMotion ? 0 : 0.78, delay: reducedMotion ? 0 : 0.25 }}
          whileInView={reducedMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
        >
          Setiap generasi menerima warisan dengan caranya sendiri. Di era digital, merawat
          adat berarti menghadirkannya kembali dengan rasa hormat, visual yang jernih, dan
          pengalaman yang sanggup menyentuh generasi baru.
        </MotionP>

        <MotionDiv
          className="mt-10 flex flex-wrap justify-center gap-4"
          initial={reducedMotion ? false : { opacity: 0, y: 18 }}
          transition={{ duration: reducedMotion ? 0 : 0.74, delay: reducedMotion ? 0 : 0.34 }}
          whileInView={reducedMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
        >
          <button
            className="rounded-full border border-[rgba(206,180,123,0.32)] bg-[linear-gradient(180deg,rgba(206,180,123,0.18),rgba(206,180,123,0.08))] px-6 py-3 text-[0.72rem] uppercase tracking-[0.28em] text-[var(--color-cream)] shadow-[0_18px_60px_rgba(0,0,0,0.34)]"
            onClick={() => onNavigate('nilai-adat')}
            type="button"
          >
            Rawat Warisan
          </button>
          <button
            className="rounded-full border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.04)] px-6 py-3 text-[0.72rem] uppercase tracking-[0.28em] text-[var(--color-muted)] transition-colors duration-300 hover:text-[var(--color-cream)]"
            onClick={() => onNavigate('hero')}
            type="button"
          >
            Mulai Eksplorasi
          </button>
        </MotionDiv>
      </div>
    </section>
  )
}
