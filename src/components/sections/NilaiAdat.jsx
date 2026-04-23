import { useRef } from 'react'
import { nilaiCards } from '../../data/siteContent'
import { useGsapReveal } from '../../hooks/useGsapReveal'
import { ValueIcon } from '../ValueIcon'

export function NilaiAdat({ reducedMotion }) {
  const sectionRef = useRef(null)

  useGsapReveal(sectionRef, reducedMotion)

  return (
    <section
      className="mx-auto w-full max-w-[1320px] px-5 py-16 sm:px-8 lg:px-10 lg:py-24"
      id="nilai-adat"
      ref={sectionRef}
    >
      <div className="max-w-3xl" data-reveal="left">
        <p className="font-body text-[0.68rem] uppercase tracking-[0.34em] text-[var(--color-accent)]">
          Nilai Adat dan Kearifan Lokal
        </p>
        <h2 className="mt-4 max-w-[12ch] font-display text-[clamp(2.5rem,4.8vw,4.8rem)] leading-[0.96] tracking-[-0.04em] text-[var(--color-cream)]">
          Prinsip hidup yang tetap relevan di zaman serba cepat.
        </h2>
        <p className="mt-5 max-w-[42rem] text-base leading-8 text-[rgba(226,216,198,0.74)] sm:text-lg">
          Di balik estetika Sunda yang lembut, terdapat nilai-nilai yang sangat kokoh.
          Nilai inilah yang membuat adat tidak berhenti sebagai simbol, tetapi tetap
          bekerja sebagai kompas etis di masa kini.
        </p>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3" data-stagger-group="true">
        {nilaiCards.map((card) => (
          <article
            className="group rounded-[2rem] border border-[rgba(255,255,255,0.06)] bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.025))] p-6 transition-all duration-500 hover:-translate-y-1 hover:border-[rgba(206,180,123,0.2)] hover:shadow-[0_20px_70px_rgba(0,0,0,0.28)]"
            data-stagger-item="true"
            key={card.title}
          >
            <ValueIcon type={card.icon} />
            <p className="mt-5 font-display text-3xl text-[var(--color-cream)]">{card.title}</p>
            <p className="mt-4 text-sm leading-7 text-[rgba(226,216,198,0.72)]">
              {card.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}
