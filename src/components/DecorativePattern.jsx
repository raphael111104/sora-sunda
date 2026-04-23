export function DecorativePattern({ className = '' }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none relative overflow-hidden rounded-full border border-[rgba(206,180,123,0.12)] ${className}`}
    >
      <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent,transparent_18px,rgba(206,180,123,0.12)_18px,rgba(206,180,123,0.12)_19px)]" />
      <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-[linear-gradient(180deg,transparent,rgba(206,180,123,0.34),transparent)]" />
      <div className="absolute inset-x-4 top-1/2 h-px -translate-y-1/2 bg-[linear-gradient(90deg,transparent,rgba(206,180,123,0.18),transparent)]" />
    </div>
  )
}
