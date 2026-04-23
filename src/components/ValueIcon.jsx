const baseClassName =
  'h-12 w-12 rounded-2xl border border-[rgba(206,180,123,0.16)] bg-[rgba(206,180,123,0.05)] p-3 text-[var(--color-accent)]'

export function ValueIcon({ type }) {
  const commonProps = {
    fill: 'none',
    stroke: 'currentColor',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    strokeWidth: 1.35,
    viewBox: '0 0 24 24',
  }

  switch (type) {
    case 'arch':
      return (
        <svg className={baseClassName} {...commonProps}>
          <path d="M4 18c2.5-6.5 5.15-9.75 8-9.75S17.5 11.5 20 18" />
          <path d="M8 18V7.75m8 10.25V7.75" />
        </svg>
      )
    case 'leaf':
      return (
        <svg className={baseClassName} {...commonProps}>
          <path d="M18.5 5.5c-5.75.3-9.8 2.95-12.15 7.95 3.4 1.35 6.58 1.1 9.55-.75 2.23-1.38 3.1-3.8 2.6-7.2Z" />
          <path d="M8.5 15.5 5.5 19" />
        </svg>
      )
    case 'threads':
      return (
        <svg className={baseClassName} {...commonProps}>
          <path d="M5 8h14M5 12h14M5 16h14" />
          <path d="M8 5v14m8-14v14" />
        </svg>
      )
    case 'steps':
      return (
        <svg className={baseClassName} {...commonProps}>
          <path d="M5 17h5v-4h4V9h5" />
          <path d="M5 17V7" />
        </svg>
      )
    case 'spire':
      return (
        <svg className={baseClassName} {...commonProps}>
          <path d="M12 4 8.5 11.5 12 14.5 15.5 11.5 12 4Z" />
          <path d="M12 14.5V20" />
          <path d="M8 20h8" />
        </svg>
      )
    case 'circle':
    default:
      return (
        <svg className={baseClassName} {...commonProps}>
          <circle cx="12" cy="12" r="6.5" />
          <path d="M12 4.5v15M4.5 12h15" />
        </svg>
      )
  }
}
