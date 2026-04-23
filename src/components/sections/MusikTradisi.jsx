import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { musicCards } from '../../data/siteContent'
import { useGsapReveal } from '../../hooks/useGsapReveal'

gsap.registerPlugin(ScrollTrigger)

export function MusikTradisi({ assets, audio, reducedMotion }) {
  const sectionRef = useRef(null)
  const layerARef = useRef(null)
  const layerBRef = useRef(null)
  const layerCRef = useRef(null)

  useGsapReveal(sectionRef, reducedMotion)

  useLayoutEffect(() => {
    if (reducedMotion || !sectionRef.current) {
      return undefined
    }

    const context = gsap.context(() => {
      const layers = [
        { element: layerARef.current, yPercent: -7 },
        { element: layerBRef.current, yPercent: 8 },
        { element: layerCRef.current, yPercent: -12 },
      ]

      layers.forEach(({ element, yPercent }) => {
        gsap.to(element, {
          yPercent,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        })
      })
    }, sectionRef)

    return () => {
      context.revert()
    }
  }, [reducedMotion])

  return (
    <section
      className="mx-auto w-full max-w-[1320px] px-5 py-16 sm:px-8 lg:px-10 lg:py-24"
      id="musik-tradisi"
      ref={sectionRef}
    >
      <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.88fr)_minmax(340px,0.84fr)]">
        <div className="space-y-7">
          <div data-reveal="left">
            <p className="font-body text-[0.68rem] uppercase tracking-[0.34em] text-[var(--color-accent)]">
              Musik dan Bunyi Tradisi
            </p>
            <h2 className="mt-4 max-w-[12ch] font-display text-[clamp(2.5rem,4.8vw,4.9rem)] leading-[0.98] tracking-[-0.04em] text-[var(--color-cream)]">
              Saat bambu bergetar, kebersamaan ikut terdengar.
            </h2>
            <p className="mt-5 max-w-[42rem] text-base leading-8 text-[rgba(226,216,198,0.74)] sm:text-lg">
              Angklung menyimpan pelajaran sosial yang indah: satu orang tidak bisa
              memainkan keseluruhan lagu sendiri. Harmoni lahir ketika tiap nada saling
              percaya, saling menunggu, dan saling memberi ruang.
            </p>
          </div>

          <div className="relative min-h-[32rem]" data-parallax-section="true">
            <div
              className="absolute inset-x-0 top-0 h-[82%] overflow-hidden rounded-[2.4rem] border border-[rgba(206,180,123,0.12)] bg-[rgba(10,12,10,0.58)] shadow-[0_28px_90px_rgba(0,0,0,0.32)]"
              ref={layerARef}
            >
              <img
                alt="Instrumen angklung bambu"
                className="h-full w-full object-cover object-center opacity-80"
                decoding="async"
                loading="lazy"
                src={assets.angklung}
              />
            </div>
            <div
              className="absolute left-[8%] top-[12%] h-[42%] w-[30%] rounded-[2rem] border border-[rgba(255,255,255,0.08)] bg-[linear-gradient(180deg,rgba(206,180,123,0.16),rgba(8,10,8,0.2))] p-5 backdrop-blur-md"
              ref={layerBRef}
            >
              <p className="font-body text-[0.62rem] uppercase tracking-[0.3em] text-[var(--color-accent)]">
                Bunyi
              </p>
              <p className="mt-3 font-display text-2xl text-[var(--color-cream)]">
                ringan, jernih, mengisi udara
              </p>
            </div>
            <div
              className="absolute bottom-[3%] right-[4%] w-[42%] rounded-[2rem] border border-[rgba(255,255,255,0.08)] bg-[rgba(7,10,8,0.82)] p-5 shadow-[0_18px_55px_rgba(0,0,0,0.35)]"
              ref={layerCRef}
            >
              <p className="text-sm leading-7 text-[rgba(226,216,198,0.72)]">
                Suasana pertunjukan tradisi tidak selalu gaduh. Sering kali justru hadir
                sebagai ruang yang mengajak penonton menurunkan tempo dan membuka telinga.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <div
            className="flex flex-wrap items-center justify-between gap-4 rounded-[2rem] border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.03)] p-5"
            data-reveal="right"
          >
            <div>
              <p className="font-body text-[0.64rem] uppercase tracking-[0.3em] text-[var(--color-accent)]">
                Ambient Toggle
              </p>
              <p className="mt-2 max-w-sm text-sm leading-7 text-[rgba(226,216,198,0.68)]">
                Nyalakan ambience lembut untuk menambah suasana, tetap nonaktif secara default.
              </p>
            </div>
            <button
              className={`rounded-full border px-5 py-3 text-[0.66rem] uppercase tracking-[0.28em] transition-all duration-300 ${
                audio.isActive
                  ? 'border-[rgba(206,180,123,0.28)] bg-[rgba(206,180,123,0.14)] text-[var(--color-cream)]'
                  : 'border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.04)] text-[var(--color-muted)] hover:text-[var(--color-cream)]'
              }`}
              onClick={audio.toggle}
              type="button"
            >
              {audio.isActive ? 'Matikan Audio' : 'Nyalakan Audio'}
            </button>
          </div>

          <div className="grid gap-4" data-stagger-group="true">
            {musicCards.map((card) => (
              <article
                className="group relative overflow-hidden rounded-[2rem] border border-[rgba(255,255,255,0.06)] bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.025))] p-6 transition-transform duration-500 hover:-translate-y-1 hover:border-[rgba(206,180,123,0.18)] hover:shadow-[0_20px_70px_rgba(0,0,0,0.28)]"
                data-stagger-item="true"
                key={card.title}
              >
                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <div className="absolute -right-6 top-0 h-28 w-28 rounded-full bg-[rgba(206,180,123,0.12)] blur-3xl" />
                  <div className="absolute inset-x-6 top-5 h-px bg-[linear-gradient(90deg,transparent,rgba(206,180,123,0.45),transparent)]" />
                </div>
                <p className="font-body text-[0.62rem] uppercase tracking-[0.3em] text-[var(--color-accent)]">
                  {card.subtitle}
                </p>
                <p className="mt-3 font-display text-3xl text-[var(--color-cream)]">{card.title}</p>
                <p className="mt-4 text-sm leading-7 text-[rgba(226,216,198,0.72)]">
                  {card.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
