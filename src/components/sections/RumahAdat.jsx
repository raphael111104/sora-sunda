import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { rumahDetails, rumahPanels } from '../../data/siteContent'
import { useGsapReveal } from '../../hooks/useGsapReveal'

gsap.registerPlugin(ScrollTrigger)

export function RumahAdat({ assets, reducedMotion }) {
  const sectionRef = useRef(null)
  const imageRef = useRef(null)
  const railRef = useRef(null)

  useGsapReveal(sectionRef, reducedMotion)

  useLayoutEffect(() => {
    if (reducedMotion || !sectionRef.current) {
      return undefined
    }

    const context = gsap.context(() => {
      gsap.to(imageRef.current, {
        yPercent: 8,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })

      gsap.fromTo(
        railRef.current?.children ?? [],
        {
          xPercent: 16,
          autoAlpha: 0,
        },
        {
          xPercent: 0,
          autoAlpha: 1,
          stagger: 0.11,
          duration: 1.05,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: railRef.current,
            start: 'top 82%',
            once: true,
          },
        },
      )
    }, sectionRef)

    return () => {
      context.revert()
    }
  }, [reducedMotion])

  return (
    <section
      className="mx-auto grid w-full max-w-[1320px] gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[minmax(340px,0.78fr)_minmax(0,1fr)] lg:px-10 lg:py-24"
      id="rumah-adat"
      ref={sectionRef}
    >
      <div className="lg:sticky lg:top-24 lg:h-fit">
        <div
          className="overflow-hidden rounded-[2.5rem] border border-[rgba(206,180,123,0.14)] bg-[rgba(10,12,10,0.72)] p-4 shadow-[0_28px_90px_rgba(0,0,0,0.36)]"
          data-reveal="left"
        >
          <div className="overflow-hidden rounded-[2rem]">
            <img
              alt="Rumah adat Sulah Nyanda Baduy"
              className="h-[28rem] w-full object-cover object-center sm:h-[34rem]"
              decoding="async"
              loading="lazy"
              ref={imageRef}
              src={assets.rumahBaduy}
            />
          </div>
          <div className="mt-5 grid gap-4 px-2 sm:grid-cols-2">
            {rumahDetails.map((detail) => (
              <div
                className="rounded-[1.2rem] border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.03)] px-4 py-4 text-sm leading-7 text-[rgba(226,216,198,0.72)]"
                key={detail}
              >
                {detail}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-8">
        <div data-reveal="right">
          <p className="font-body text-[0.68rem] uppercase tracking-[0.34em] text-[var(--color-accent)]">
            Rumah Adat Sunda
          </p>
          <h2 className="mt-4 max-w-[13ch] font-display text-[clamp(2.5rem,4.5vw,4.8rem)] leading-[0.98] tracking-[-0.04em] text-[var(--color-cream)]">
            Arsitektur yang membaca cuaca sebelum menyusun ruang.
          </h2>
          <p className="mt-5 max-w-[42rem] text-base leading-8 text-[rgba(226,216,198,0.74)] sm:text-lg">
            Rumah adat Sunda tumbuh dari percakapan panjang dengan iklim, tanah, dan
            kebiasaan hidup. Rumah panggung tidak dibuat demi bentuk semata, melainkan
            sebagai jawaban terhadap hujan, udara lembap, dan kebutuhan akan ruang yang
            terasa lapang namun tetap akrab.
          </p>
        </div>

        <div
          className="grid gap-4 sm:grid-cols-3"
          data-horizontal-track="true"
          ref={railRef}
        >
          {rumahPanels.map((panel) => (
            <article
              className="rounded-[1.7rem] border border-[rgba(206,180,123,0.1)] bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-5 shadow-[0_18px_55px_rgba(0,0,0,0.24)]"
              key={panel.title}
            >
              <p className="font-display text-2xl text-[var(--color-cream)]">{panel.title}</p>
              <p className="mt-3 text-sm leading-7 text-[rgba(226,216,198,0.7)]">
                {panel.description}
              </p>
            </article>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(300px,0.7fr)]">
          <div
            className="rounded-[2rem] border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.03)] p-6"
            data-reveal="up"
          >
            <p className="font-body text-[0.66rem] uppercase tracking-[0.3em] text-[var(--color-accent)]">
              Relasi Dengan Alam
            </p>
            <p className="mt-4 font-display text-[clamp(1.7rem,2.8vw,2.7rem)] leading-tight text-[var(--color-cream)]">
              Rumah bukan penghalang alam, melainkan selubung yang hidup berdampingan dengannya.
            </p>
          </div>
          <div
            className="rounded-[2rem] border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.03)] p-6"
            data-reveal="diagonal"
          >
            <p className="text-sm leading-7 text-[rgba(226,216,198,0.72)]">
              Dari susunan umpak hingga bukaan cahaya, setiap detail menunjukkan bahwa
              keindahan arsitektur Sunda berangkat dari pemahaman pada kebutuhan hidup yang sederhana, sehat, dan selaras.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
