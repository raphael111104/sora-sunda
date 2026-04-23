export function SectionDivider({ eyebrow, label }) {
  return (
    <div className="relative z-10 mx-auto flex w-full max-w-[1320px] items-center gap-4 px-5 py-10 sm:px-8 lg:px-10">
      <div className="h-px flex-1 bg-[linear-gradient(90deg,transparent,rgba(206,180,123,0.38),rgba(206,180,123,0.04))]" />
      <div className="flex flex-col items-center gap-2 text-center">
        <span className="font-body text-[0.62rem] uppercase tracking-[0.34em] text-[var(--color-accent)]">
          {eyebrow}
        </span>
        <span className="max-w-[22rem] text-balance text-sm text-[rgba(220,209,188,0.72)]">
          {label}
        </span>
      </div>
      <div className="h-px flex-1 bg-[linear-gradient(90deg,rgba(206,180,123,0.04),rgba(206,180,123,0.38),transparent)]" />
    </div>
  )
}
