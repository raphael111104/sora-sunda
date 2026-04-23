import { useRef } from 'react'
import { busanaNotes } from '../../data/siteContent'
import { useGsapReveal } from '../../hooks/useGsapReveal'

export function BusanaSunda({ assets, reducedMotion }) {
  const sectionRef = useRef(null)

  useGsapReveal(sectionRef, reducedMotion)

  return (
    <section
      className="mx-auto w-full max-w-[1320px] px-5 py-16 sm:px-8 lg:px-10 lg:py-24"
      id="busana-sunda"
      ref={sectionRef}
    >
      <div className="grid items-center gap-10 lg:grid-cols-[minmax(280px,0.65fr)_minmax(0,1fr)]">
        <div className="relative" data-reveal="left">
          <span className="pointer-events-none absolute -left-3 top-1/2 hidden -translate-y-1/2 font-display text-[11rem] leading-none text-[rgba(206,180,123,0.08)] xl:block">
            Rupa
          </span>
          <div className="relative overflow-hidden rounded-[2.5rem] border border-[rgba(206,180,123,0.14)] bg-[rgba(10,12,10,0.72)] p-4 shadow-[0_28px_90px_rgba(0,0,0,0.34)]">
            <div className="aspect-[4/6] overflow-hidden rounded-[2rem]">
              <img
                alt="Busana tradisional Sunda"
                className="h-full w-full object-cover object-center"
                decoding="async"
                loading="lazy"
                src={assets.busanaSunda}
              />
            </div>
          </div>
        </div>

        <div className="relative">
          <p className="font-body text-[0.68rem] uppercase tracking-[0.34em] text-[var(--color-accent)]" data-reveal="right">
            Busana dan Identitas Visual
          </p>
          <h2
            className="mt-4 max-w-[12ch] font-display text-[clamp(2.5rem,4.5vw,5rem)] leading-[0.96] tracking-[-0.04em] text-[var(--color-cream)]"
            data-reveal="right"
          >
            Anggun, membumi, dan tetap menyimpan wibawa.
          </h2>

          <div className="mt-10 grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(220px,0.38fr)]" data-stagger-group="true">
            <div className="space-y-5">
              {busanaNotes.map((note) => (
                <p
                  className="max-w-[36rem] text-base leading-8 text-[rgba(226,216,198,0.74)] sm:text-lg"
                  data-stagger-item="true"
                  key={note}
                >
                  {note}
                </p>
              ))}
            </div>

            <div className="rounded-[2rem] border border-[rgba(255,255,255,0.06)] bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-5" data-reveal="diagonal">
              <p className="font-body text-[0.6rem] uppercase tracking-[0.3em] text-[var(--color-accent)]">
                Palet
              </p>
              <div className="mt-5 space-y-3">
                {[
                  ['Kayu Tua', 'bg-[#5a4128]'],
                  ['Tanah Basah', 'bg-[#2d3227]'],
                  ['Krem Bambu', 'bg-[#d3c2a3]'],
                  ['Hitam Arang', 'bg-[#090b09]'],
                ].map(([label, swatch]) => (
                  <div className="flex items-center gap-3" key={label}>
                    <span className={`h-8 w-8 rounded-full border border-[rgba(255,255,255,0.08)] ${swatch}`} />
                    <span className="text-sm text-[rgba(226,216,198,0.72)]">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 overflow-hidden rounded-[2rem] border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.03)] p-6" data-reveal="up">
            <p className="font-display text-[clamp(1.6rem,2.6vw,2.5rem)] leading-tight text-[var(--color-cream)]">
              Busana Sunda mengajarkan bahwa keanggunan tidak perlu berteriak; ia cukup hadir dengan tenang dan terukur.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
