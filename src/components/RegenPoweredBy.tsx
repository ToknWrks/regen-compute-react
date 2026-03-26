import React from 'react'

export interface RegenPoweredByProps {
  /** Link to a specific retirement certificate, or defaults to compute.regen.network */
  certificateUrl?: string
  /** Credits retired to display, e.g. "0.42 C" */
  creditsRetired?: string
  /**
   * Custom icon to replace the default leaf SVG. Use this to slot in the
   * official Regen mark once design assets are available.
   * @example
   * icon={<img src="/regen-mark.svg" width={14} height={14} alt="" />}
   */
  icon?: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

const REGEN_GREEN = '#2D6A4F'
const REGEN_LIGHT = '#52B788'
const REGEN_LIGHT_BG = '#F0FAF4'
const BORDER = '#B7E4C7'

/**
 * A "Powered by" card for app footers, sidebars, and about pages.
 * Shows the Regen brand with a short description and a link to the
 * certificate or compute.regen.network.
 *
 * @example
 * // App footer:
 * <footer>
 *   <p>© 2025 Acme AI</p>
 *   <RegenPoweredBy />
 * </footer>
 *
 * // Sidebar:
 * <aside>
 *   <nav>...</nav>
 *   <RegenPoweredBy certificateUrl={latestCertUrl} creditsRetired="1.2 C" />
 * </aside>
 */
export function RegenPoweredBy({
  certificateUrl = 'https://compute.regen.network',
  creditsRetired,
  icon,
  className,
  style,
}: RegenPoweredByProps) {
  return (
    <a
      href={certificateUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        gap: '4px',
        padding: '12px 16px',
        borderRadius: '12px',
        backgroundColor: REGEN_LIGHT_BG,
        border: `1px solid ${BORDER}`,
        color: REGEN_GREEN,
        fontFamily: 'system-ui, sans-serif',
        textDecoration: 'none',
        maxWidth: '240px',
        ...style,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, fontSize: '13px' }}>
        {icon ?? <LeafIcon />}
        Regenerative AI
      </div>
      <div style={{ fontSize: '11px', color: '#555', lineHeight: 1.4 }}>
        {creditsRetired
          ? `${creditsRetired} ecological credits retired on Regen Network`
          : 'Verified ecological credits retired on Regen Network'}
      </div>
      <div style={{ fontSize: '10px', color: REGEN_LIGHT, fontWeight: 600, marginTop: '2px' }}>
        View certificate →
      </div>
    </a>
  )
}

function LeafIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={REGEN_GREEN}
      strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
    </svg>
  )
}
