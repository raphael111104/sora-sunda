import { useRef } from 'react'
import { TextSplit } from '../TextSplit'
import { DecorativePattern } from '../DecorativePattern'
import { introLines } from '../../data/siteContent'
import { useGsapReveal } from '../../hooks/useGsapReveal'

export function StoryIntro({ assets, reducedMotion }) {
  const sectionRef = useRef(null)

  useGsapReveal(sectionRef, reducedMotion)

  return (
    <section
      className="relative mx-auto grid w-full max-w-[1320px] gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(360px,0.92fr)] lg:gap-14 lg:px-10 lg:py-24"
      id="narasi"
      ref={sectionRef}
    >
      <div className="space-y-8">
        <div data-reveal="left">
          <p className="font-body text-[0.68rem] uppercase tracking-[0.34em] text-[var(--color-accent)]">
            Filosofi Masyarakat Sunda
          </p>
          <h2 className="mt-4 max-w-[12ch] font-display text-[clamp(2.5rem,5vw,4.6rem)] leading-[0.96] tracking-[-0.04em] text-[var(--color-cream)]">
            Lembut dalam tutur, kuat dalam menjaga harmoni.
          </h2>
        </div>

        <div className="space-y-5" data-stagger-group="true">
          {introLines.map((line) => (
            <p
              className="max-w-[38rem] text-base leading-8 text-[rgba(226,216,198,0.76)] sm:text-lg"
              data-stagger-item="true"
              key={line}
            >
              {line}
            </p>
          ))}
        </div>

        <blockquote
          className="border-l border-[rgba(206,180,123,0.28)] pl-5"
          data-reveal="up"
        >
          <p className="font-display text-[clamp(1.7rem,3vw,2.8rem)] italic leading-[1.14] text-[var(--color-cream)]">
            “Nu hadé ku basa, nu mulya ku lampah; keindahan terasa utuh ketika sikap
            dan rasa berjalan beriringan.”
          </p>
        </blockquote>
      </div>

      <div className="relative" data-parallax-section="true">
        <div
          className="relative overflow-hidden rounded-[2.4rem] border border-[rgba(206,180,123,0.14)] bg-[rgba(10,12,10,0.74)] p-4 shadow-[0_30px_100px_rgba(0,0,0,0.36)]"
          data-reveal="right"
        >
          <div className="absolute right-5 top-5 z-10 hidden sm:block">
            <DecorativePattern className="h-[4.5rem] w-40 opacity-60" />
          </div>
          <div className="aspect-[4/5] overflow-hidden rounded-[2rem]">
            <img
              alt="Lansekap desa tradisional bernuansa Sunda"
              className="h-full w-full object-cover object-center"
              data-parallax="-8"
              decoding="async"
              loading="lazy"
              src={assets.villageAerial}
            />
          </div>
          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 px-2">
            <div>
              <p className="font-body text-[0.62rem] uppercase tracking-[0.3em] text-[var(--color-accent)]">
                Suasana
              </p>
              <p className="mt-2 max-w-xs text-sm leading-7 text-[rgba(226,216,198,0.72)]">
                Kabut tipis, tanah basah, halaman yang akrab dengan bambu dan langkah pelan.
              </p>
            </div>
            <p className="font-display text-xl italic text-[rgba(220,209,188,0.6)]">
              editor’s note
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
