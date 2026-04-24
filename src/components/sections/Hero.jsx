import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { DecorativePattern } from '../DecorativePattern'

export function Hero({ assets, onNavigate, reducedMotion }) {
  const MotionP = motion.p
  const MotionDiv = motion.div
  const MotionH1 = motion.h1
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
      <div className="absolute inset-0 -z-10">
        <img
          alt="Lansekap sawah berkabut sebagai fallback visual"
          className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-700 ${
            videoFailed || !activeVideo ? 'opacity-90' : 'opacity-0'
          }`}
          fetchPriority="high"
          src={assets.heroPoster}
        />

        {activeVideo && !videoFailed && (
          <video
            autoPlay
            className="absolute inset-0 h-full w-full object-cover object-center opacity-80"
            key={activeVideo}
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

        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,7,5,0.12),rgba(5,7,5,0.34)_36%,rgba(5,7,5,0.76)_82%,rgba(5,7,5,0.94))]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_28%,rgba(196,167,108,0.16),transparent_24%),radial-gradient(circle_at_82%_16%,rgba(91,118,76,0.18),transparent_23%)]" />
        <div className="absolute inset-0 vignette-mask" />
      </div>

      <div className="pointer-events-none absolute left-1/2 top-[16svh] hidden w-[min(82vw,920px)] -translate-x-1/2 opacity-70 xl:block">
        <DecorativePattern className="h-16" />
      </div>

      <div className="relative z-10 mx-auto grid h-full w-full max-w-[1440px] grid-rows-[1fr_auto] px-5 pb-[max(0.8rem,env(safe-area-inset-bottom))] pt-[calc(4.85rem+env(safe-area-inset-top))] sm:px-8 sm:pt-[calc(5.85rem+env(safe-area-inset-top))] lg:px-10 lg:pb-5 lg:pt-[calc(6.2rem+env(safe-area-inset-top))]">
        <div className="grid min-h-0 items-center gap-6 py-3 sm:py-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(280px,0.46fr)] lg:gap-10 lg:py-10 xl:gap-16">
          <div className="w-full max-w-[760px]">
            <MotionP
              className="mb-3 font-body text-[0.58rem] uppercase tracking-[0.24em] text-[var(--color-accent)] sm:mb-4 sm:text-[0.72rem] sm:tracking-[0.4em]"
              initial={reducedMotion ? false : { opacity: 0, y: 16 }}
              transition={{ duration: reducedMotion ? 0 : 0.7, delay: reducedMotion ? 0 : 0.08 }}
              viewport={{ once: true, amount: 0.8 }}
              whileInView={reducedMotion ? {} : { opacity: 1, y: 0 }}
            >
              Pameran Web Interaktif
            </MotionP>

            <MotionH1
              className="max-w-[12ch] font-display text-[clamp(2.25rem,8vw,4.8rem)] leading-[0.9] text-[var(--color-cream)] [text-shadow:0_14px_44px_rgba(0,0,0,0.34)] sm:max-w-[12ch] lg:text-[clamp(3.65rem,5.35vw,5.85rem)] lg:leading-[0.9] xl:text-[clamp(4.2rem,6vw,6.35rem)]"
              initial={reducedMotion ? false : { opacity: 0, y: 28, filter: 'blur(10px)' }}
              transition={{ duration: reducedMotion ? 0 : 0.95, delay: reducedMotion ? 0 : 0.14 }}
              viewport={{ once: true, amount: 0.7 }}
              whileInView={reducedMotion ? {} : { opacity: 1, y: 0, filter: 'blur(0px)' }}
            >
              Ngamumule Warisan Sunda dalam Ruang Digital
            </MotionH1>

            <MotionP
              className="mt-4 max-w-[34rem] text-balance text-[0.88rem] leading-6 text-[rgba(234,225,209,0.78)] sm:mt-6 sm:text-[1.04rem] sm:leading-8 lg:max-w-[31rem]"
              initial={reducedMotion ? false : { opacity: 0, y: 22, filter: 'blur(10px)' }}
              transition={{ duration: reducedMotion ? 0 : 0.82, delay: reducedMotion ? 0 : 0.3 }}
              viewport={{ once: true, amount: 0.6 }}
              whileInView={reducedMotion ? {} : { opacity: 1, y: 0, filter: 'blur(0px)' }}
            >
              Sebuah ruang digital yang merawat tutur, bunyi bambu, rumah panggung,
              sawah berkabut, dan rasa hormat dalam budaya Sunda.
            </MotionP>

            <MotionDiv
              className="mt-5 flex flex-wrap gap-3 sm:mt-8 sm:gap-4"
              initial={reducedMotion ? false : { opacity: 0, y: 18 }}
              transition={{ duration: reducedMotion ? 0 : 0.74, delay: reducedMotion ? 0 : 0.42 }}
              viewport={{ once: true, amount: 0.6 }}
              whileInView={reducedMotion ? {} : { opacity: 1, y: 0 }}
            >
              <button
                className="rounded-full border border-[rgba(206,180,123,0.34)] bg-[linear-gradient(180deg,rgba(206,180,123,0.18),rgba(206,180,123,0.08))] px-5 py-2.5 text-[0.64rem] uppercase tracking-[0.2em] text-[var(--color-cream)] shadow-[0_18px_60px_rgba(0,0,0,0.34)] transition-transform duration-500 hover:-translate-y-0.5 sm:px-6 sm:py-3 sm:text-[0.72rem] sm:tracking-[0.28em]"
                onClick={() => onNavigate('narasi')}
                type="button"
              >
                Jelajahi Budaya
              </button>
              <button
                className="rounded-full border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.05)] px-5 py-2.5 text-[0.64rem] uppercase tracking-[0.2em] text-[var(--color-muted)] transition-colors duration-300 hover:text-[var(--color-cream)] sm:px-6 sm:py-3 sm:text-[0.72rem] sm:tracking-[0.28em]"
                onClick={() => onNavigate('busana-sunda')}
                type="button"
              >
                Lihat Galeri
              </button>
            </MotionDiv>
          </div>

          <MotionDiv
            className="hidden justify-self-end lg:block"
            initial={reducedMotion ? false : { opacity: 0, x: 28, filter: 'blur(10px)' }}
            transition={{ duration: reducedMotion ? 0 : 0.8, delay: reducedMotion ? 0 : 0.28 }}
            viewport={{ once: true, amount: 0.55 }}
            whileInView={reducedMotion ? {} : { opacity: 1, x: 0, filter: 'blur(0px)' }}
          >
            <div className="w-[min(28vw,360px)] rounded-lg border border-[rgba(206,180,123,0.16)] bg-[rgba(8,11,9,0.5)] p-5 shadow-[0_26px_100px_rgba(0,0,0,0.32)] backdrop-blur-md xl:p-6">
              <div className="flex items-center justify-between gap-4 border-b border-[rgba(206,180,123,0.14)] pb-4">
                <span className="font-body text-[0.62rem] uppercase tracking-[0.3em] text-[var(--color-accent)]">
                  Sorotan
                </span>
                <span className="rounded-full border border-[rgba(206,180,123,0.24)] px-3 py-1 font-body text-[0.58rem] uppercase tracking-[0.22em] text-[rgba(246,238,224,0.72)]">
                  01
                </span>
              </div>
              <p className="mt-4 font-display text-[1.8rem] leading-none text-[var(--color-cream)] xl:text-[2.05rem]">
                Warisan yang bergerak pelan di layar.
              </p>
              <p className="mt-4 text-sm leading-7 text-[rgba(234,225,209,0.68)]">
                Dari kabut, bambu, rumah panggung, hingga tata krama yang hidup dalam
                ingatan.
              </p>
            </div>

            <div className="ml-auto mt-4 flex w-[min(24vw,300px)] items-center gap-3 rounded-full border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.05)] px-4 py-3 text-[0.64rem] uppercase tracking-[0.24em] text-[rgba(234,225,209,0.68)] backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-[var(--color-accent)] shadow-[0_0_22px_rgba(201,176,125,0.64)]" />
              Kabut - Bambu - Rasa
            </div>
          </MotionDiv>
        </div>

        <MotionDiv
          animate={reducedMotion ? { y: 0 } : { y: [0, 8, 0] }}
          className="hero-scroll flex w-full items-center justify-center gap-4 self-end pb-1 text-center"
          transition={
            reducedMotion
              ? { duration: 0 }
              : { duration: 2.4, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }
          }
        >
          <span className="font-body text-[0.62rem] uppercase tracking-[0.3em] text-[rgba(220,209,188,0.56)] sm:text-[0.66rem] sm:tracking-[0.34em]">
            Scroll perlahan
          </span>
          <span className="relative h-11 w-px overflow-hidden rounded-full bg-[rgba(255,255,255,0.12)] sm:h-14">
            <span className="absolute inset-x-0 top-0 h-1/3 rounded-full bg-[linear-gradient(180deg,rgba(225,204,160,0.94),transparent)]" />
          </span>
        </MotionDiv>
      </div>
    </section>
  )
}
