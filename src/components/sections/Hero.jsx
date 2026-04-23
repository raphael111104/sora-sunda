import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { DecorativePattern } from '../DecorativePattern'
import { TextSplit } from '../TextSplit'

export function Hero({ assets, onNavigate, reducedMotion }) {
  const MotionP = motion.p
  const MotionDiv = motion.div
  const [videoFailed, setVideoFailed] = useState(false)
  const [videoTier, setVideoTier] = useState('desktop')

  useEffect(() => {
    if (reducedMotion) {
      return undefined
    }

    const mediaQuery = window.matchMedia('(min-width: 1024px)')
    const connection =
      navigator.connection || navigator.mozConnection || navigator.webkitConnection

    const updateVideoTier = () => {
      const saveData = Boolean(connection?.saveData)
      const slowConnection = ['slow-2g', '2g'].includes(connection?.effectiveType)

      if (saveData || slowConnection) {
        setVideoTier('poster')
        return
      }

      setVideoTier(mediaQuery.matches ? 'desktop' : 'mobile')
    }

    updateVideoTier()
    mediaQuery.addEventListener?.('change', updateVideoTier)
    connection?.addEventListener?.('change', updateVideoTier)

    return () => {
      mediaQuery.removeEventListener?.('change', updateVideoTier)
      connection?.removeEventListener?.('change', updateVideoTier)
    }
  }, [reducedMotion])

  const effectiveVideoTier = reducedMotion ? 'poster' : videoTier
  const activeVideo =
    effectiveVideoTier === 'desktop'
      ? assets.heroVideoDesktop
      : effectiveVideoTier === 'mobile'
        ? assets.heroVideoMobile
        : null

  return (
    <section className="relative isolate h-[100svh] min-h-[100svh] overflow-hidden" id="hero">
      <div className="absolute inset-0">
        {activeVideo && !videoFailed && (
          <video
            autoPlay
            className="h-full w-full object-cover object-center opacity-70"
            loop
            muted
            onError={() => setVideoFailed(true)}
            playsInline
            poster={assets.heroPoster}
            preload="metadata"
          >
            <source src={activeVideo} type="video/mp4" />
          </video>
        )}

        <img
          alt="Lansekap sawah berkabut sebagai fallback visual"
          className={`h-full w-full object-cover object-center ${videoFailed || !activeVideo ? 'opacity-80' : 'opacity-0'}`}
          fetchPriority="high"
          src={assets.heroPoster}
        />

        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,7,5,0.16),rgba(5,7,5,0.32)_30%,rgba(5,7,5,0.84)_74%,rgba(5,7,5,0.98))]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(196,167,108,0.16),transparent_24%),radial-gradient(circle_at_78%_10%,rgba(91,118,76,0.18),transparent_22%)]" />
        <div className="absolute inset-0 vignette-mask" />
      </div>

      <div className="pointer-events-none absolute left-1/2 top-[15vh] hidden w-[min(82vw,980px)] -translate-x-1/2 xl:block">
        <DecorativePattern className="h-20" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-[1440px] flex-col justify-between px-5 pb-[max(1.1rem,env(safe-area-inset-bottom))] pt-[calc(5.35rem+env(safe-area-inset-top))] sm:px-8 sm:pt-[calc(6rem+env(safe-area-inset-top))] lg:px-10 lg:pb-5 lg:pt-[calc(6.25rem+env(safe-area-inset-top))]">
        <div className="grid items-end gap-6 md:gap-8 lg:grid-cols-[minmax(0,1.12fr)_minmax(280px,0.62fr)] lg:gap-10 xl:gap-12">
          <div className="max-w-[780px]">
            <MotionP
              className="mb-4 font-body text-[0.68rem] uppercase tracking-[0.36em] text-[var(--color-accent)] sm:text-[0.72rem] sm:tracking-[0.4em]"
              initial={reducedMotion ? false : { opacity: 0, y: 16 }}
              transition={{ duration: reducedMotion ? 0 : 0.7, delay: reducedMotion ? 0 : 0.1 }}
              viewport={{ once: true, amount: 0.8 }}
              whileInView={reducedMotion ? {} : { opacity: 1, y: 0 }}
            >
              Pameran Web Interaktif • Warisan Pasundan
            </MotionP>

            <TextSplit
              as="h1"
              className="max-w-[11.5ch] font-display text-[clamp(2.75rem,8vw,6.7rem)] leading-[0.9] tracking-[-0.04em] text-[var(--color-cream)]"
              delay={0.1}
              reducedMotion={reducedMotion}
              text="Ngamumule Warisan Sunda dalam Ruang Digital"
            />

            <MotionP
              className="mt-4 max-w-[34rem] text-balance text-[0.97rem] leading-7 text-[rgba(234,225,209,0.74)] sm:mt-5 sm:text-[1.04rem] sm:leading-8 lg:max-w-[36rem]"
              initial={reducedMotion ? false : { opacity: 0, y: 24, filter: 'blur(12px)' }}
              transition={{ duration: reducedMotion ? 0 : 0.85, delay: reducedMotion ? 0 : 0.42 }}
              viewport={{ once: true, amount: 0.6 }}
              whileInView={reducedMotion ? {} : { opacity: 1, y: 0, filter: 'blur(0px)' }}
            >
              Budaya Sunda bukan sekadar peninggalan yang diam di rak sejarah. Ia tetap
              bernapas dalam tutur, bunyi bambu, rumah panggung, sawah berkabut, dan
              cara manusia menjaga rasa hormat satu sama lain.
            </MotionP>

            <MotionDiv
              className="mt-6 flex flex-wrap gap-3 sm:mt-8 sm:gap-4"
              initial={reducedMotion ? false : { opacity: 0, y: 18 }}
              transition={{ duration: reducedMotion ? 0 : 0.75, delay: reducedMotion ? 0 : 0.56 }}
              viewport={{ once: true, amount: 0.6 }}
              whileInView={reducedMotion ? {} : { opacity: 1, y: 0 }}
            >
              <button
                className="group rounded-full border border-[rgba(206,180,123,0.32)] bg-[linear-gradient(180deg,rgba(206,180,123,0.18),rgba(206,180,123,0.08))] px-6 py-3 text-[0.72rem] uppercase tracking-[0.28em] text-[var(--color-cream)] shadow-[0_18px_60px_rgba(0,0,0,0.34)] transition-transform duration-500 hover:-translate-y-0.5"
                onClick={() => onNavigate('narasi')}
                type="button"
              >
                Jelajahi Budaya
              </button>
              <button
                className="rounded-full border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.04)] px-6 py-3 text-[0.72rem] uppercase tracking-[0.28em] text-[var(--color-muted)] transition-colors duration-300 hover:text-[var(--color-cream)]"
                onClick={() => onNavigate('busana-sunda')}
                type="button"
              >
                Lihat Galeri
              </button>
            </MotionDiv>

            <div className="mt-5 grid max-w-[34rem] grid-cols-2 gap-3 lg:hidden">
              <div className="rounded-[1.1rem] border border-[rgba(255,255,255,0.08)] bg-[rgba(10,12,10,0.56)] px-4 py-3 backdrop-blur-sm">
                <p className="font-body text-[0.58rem] uppercase tracking-[0.28em] text-[var(--color-accent)]">
                  Nuansa
                </p>
                <p className="mt-1 text-sm text-[rgba(234,225,209,0.76)]">
                  Gelap, sinematik, elegan
                </p>
              </div>
              <div className="rounded-[1.1rem] border border-[rgba(255,255,255,0.08)] bg-[rgba(10,12,10,0.56)] px-4 py-3 backdrop-blur-sm">
                <p className="font-body text-[0.58rem] uppercase tracking-[0.28em] text-[var(--color-accent)]">
                  Material
                </p>
                <p className="mt-1 text-sm text-[rgba(234,225,209,0.76)]">
                  Bambu, kayu, kabut, emas kusam
                </p>
              </div>
            </div>
          </div>

          <MotionDiv
            className="hidden justify-self-end rounded-[2rem] border border-[rgba(206,180,123,0.12)] bg-[linear-gradient(180deg,rgba(14,18,14,0.76),rgba(8,10,8,0.88))] p-5 shadow-[0_30px_120px_rgba(0,0,0,0.42)] backdrop-blur-md lg:block lg:max-w-[350px] xl:max-w-[390px] xl:p-6"
            initial={reducedMotion ? false : { opacity: 0, x: 42 }}
            transition={{ duration: reducedMotion ? 0 : 0.85, delay: reducedMotion ? 0 : 0.22 }}
            viewport={{ once: true, amount: 0.5 }}
            whileInView={reducedMotion ? {} : { opacity: 1, x: 0 }}
          >
            <p className="font-body text-[0.65rem] uppercase tracking-[0.32em] text-[var(--color-accent)]">
              Kisah Pembuka
            </p>
            <p className="mt-3 font-display text-[1.75rem] leading-tight text-[var(--color-cream)] xl:text-3xl">
              Sakral, hening, dan hangat seperti senja yang turun di tanah Pasundan.
            </p>
            <p className="mt-4 text-sm leading-7 text-[rgba(234,225,209,0.68)]">
              Masuki halaman ini seperti memasuki ruang pamer: perlahan, tenang, dan
              peka pada setiap detail bambu, kayu, kabut, serta bunyi yang bergerak
              mengikuti scroll.
            </p>
            <div className="mt-5 grid grid-cols-2 gap-3 text-sm xl:mt-6">
              <div className="rounded-[1.2rem] border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.03)] p-4">
                <p className="font-body text-[0.6rem] uppercase tracking-[0.3em] text-[var(--color-accent)]">
                  Suasana
                </p>
                <p className="mt-2 text-[rgba(234,225,209,0.76)]">Gelap, sinematik, elegan</p>
              </div>
              <div className="rounded-[1.2rem] border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.03)] p-4">
                <p className="font-body text-[0.6rem] uppercase tracking-[0.3em] text-[var(--color-accent)]">
                  Material
                </p>
                <p className="mt-2 text-[rgba(234,225,209,0.76)]">Kayu, bambu, kabut, emas kusam</p>
              </div>
            </div>
          </MotionDiv>
        </div>

        <MotionDiv
          animate={reducedMotion ? { y: 0 } : { y: [0, 8, 0] }}
          className="mt-5 flex items-center gap-4 self-start sm:mt-6"
          transition={
            reducedMotion
              ? { duration: 0 }
              : { duration: 2.4, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }
          }
        >
          <span className="font-body text-[0.64rem] uppercase tracking-[0.32em] text-[rgba(220,209,188,0.56)] sm:text-[0.66rem] sm:tracking-[0.34em]">
            Scroll perlahan
          </span>
          <span className="relative h-12 w-px overflow-hidden rounded-full bg-[rgba(255,255,255,0.12)] sm:h-14">
            <span className="absolute inset-x-0 top-0 h-1/3 rounded-full bg-[linear-gradient(180deg,rgba(225,204,160,0.94),transparent)]" />
          </span>
        </MotionDiv>
      </div>
    </section>
  )
}
