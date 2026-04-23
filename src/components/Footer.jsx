export function Footer({ items, onNavigate }) {
  return (
    <footer className="relative z-10 border-t border-[rgba(206,180,123,0.08)] bg-[rgba(5,7,5,0.9)]">
      <div className="mx-auto flex max-w-[1320px] flex-col gap-8 px-5 py-8 sm:px-8 lg:flex-row lg:items-end lg:justify-between lg:px-10">
        <div className="max-w-xl">
          <p className="font-body text-[0.62rem] uppercase tracking-[0.34em] text-[var(--color-accent)]">
            Sora Sunda
          </p>
          <p className="mt-3 font-display text-3xl text-[var(--color-cream)]">
            Ruang digital yang merawat rasa, bunyi, dan ingatan.
          </p>
          <p className="mt-4 text-sm leading-7 text-[rgba(220,209,188,0.68)]">
            Visual diramu dari arsip bebas pakai Pexels, Pixabay, Wikimedia Commons,
            serta styling editorial untuk menghadirkan suasana Sunda yang kontemplatif dan modern.
          </p>
        </div>

        <div className="flex flex-col gap-4 lg:items-end">
          <div className="flex flex-wrap gap-2">
            {items.map((item) => (
              <button
                className="rounded-full border border-[rgba(255,255,255,0.08)] px-4 py-2 text-[0.64rem] uppercase tracking-[0.24em] text-[var(--color-muted)] transition-colors duration-300 hover:text-[var(--color-cream)]"
                key={item.id}
                onClick={() => onNavigate(item.id)}
                type="button"
              >
                {item.label}
              </button>
            ))}
          </div>
          <p className="text-[0.68rem] uppercase tracking-[0.26em] text-[rgba(220,209,188,0.48)]">
            Dibangun dengan React, Tailwind, Motion, GSAP, ScrollTrigger, dan Lenis
          </p>
          <p className="text-[0.72rem] tracking-[0.08em] text-[rgba(220,209,188,0.62)]">
            © 2026 Rafli A. Seluruh hak cipta dilindungi.
          </p>
        </div>
      </div>
    </footer>
  )
}
