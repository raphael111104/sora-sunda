import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { alamCaptions } from '../../data/siteContent'
import { useGsapReveal } from '../../hooks/useGsapReveal'

gsap.registerPlugin(ScrollTrigger)

export function AlamSunda({ assets, reducedMotion }) {
  const sectionRef = useRef(null)
  const backgroundRef = useRef(null)
  const midgroundRef = useRef(null)
  const foregroundRef = useRef(null)

  useGsapReveal(sectionRef, reducedMotion)

  useLayoutEffect(() => {
    if (reducedMotion || !sectionRef.current) {
      return undefined
    }

    const context = gsap.context(() => {
      ;[
        { element: backgroundRef.current, yPercent: -6 },
        { element: midgroundRef.current, yPercent: 7 },
        { element: foregroundRef.current, yPercent: -10 },
      ].forEach(({ element, yPercent }) => {
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
      id="alam-sunda"
      ref={sectionRef}
    >
      <div className="mb-8 max-w-3xl" data-reveal="left">
        <p className="font-body text-[0.68rem] uppercase tracking-[0.34em] text-[var(--color-accent)]">
          Alam dan Kehidupan Pedesaan
        </p>
        <h2 className="mt-4 max-w-[11ch] font-display text-[clamp(2.5rem,5vw,5rem)] leading-[0.96] tracking-[-0.04em] text-[var(--color-cream)]">
          Lanskap yang membentuk cara hidup, bukan sekadar pemandangan.
        </h2>
      </div>

      <div className="relative min-h-[38rem] overflow-hidden rounded-[2.8rem] border border-[rgba(206,180,123,0.14)] bg-[rgba(7,10,8,0.8)] shadow-[0_32px_120px_rgba(0,0,0,0.38)]">
        <div
          className="absolute inset-0 opacity-65"
          ref={backgroundRef}
          style={{
            backgroundImage: `url(${assets.villageNight})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          }}
        />
        <div
          className="absolute inset-x-[8%] top-[14%] h-[56%] overflow-hidden rounded-[2.2rem] border border-[rgba(255,255,255,0.08)]"
          ref={midgroundRef}
        >
          <img
            alt="Sawah bertingkat berkabut"
            className="h-full w-full object-cover object-center opacity-80"
            decoding="async"
            loading="lazy"
            src={assets.terraceMist}
          />
        </div>
        <div
          className="absolute bottom-[7%] left-[10%] w-[44%] overflow-hidden rounded-[2rem] border border-[rgba(255,255,255,0.08)] bg-[rgba(6,8,6,0.72)] p-3 shadow-[0_20px_70px_rgba(0,0,0,0.32)]"
          ref={foregroundRef}
        >
          <img
            alt="Lansekap desa dan persawahan"
            className="h-44 w-full rounded-[1.4rem] object-cover object-center"
            decoding="async"
            loading="lazy"
            src={assets.villageAerial}
          />
        </div>

        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,7,6,0.18),rgba(6,7,6,0.42)_45%,rgba(6,7,6,0.9)_100%)]" />

        <div className="relative z-10 flex min-h-[38rem] flex-col justify-end p-6 sm:p-8 lg:p-10">
          <div className="grid gap-4 lg:max-w-[58rem] lg:grid-cols-3" data-stagger-group="true">
            {alamCaptions.map((caption) => (
              <div
                className="rounded-[1.8rem] border border-[rgba(255,255,255,0.06)] bg-[rgba(6,8,6,0.55)] p-5 backdrop-blur-md"
                data-stagger-item="true"
                key={caption}
              >
                <p className="font-display text-2xl leading-tight text-[var(--color-cream)]">
                  {caption}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
