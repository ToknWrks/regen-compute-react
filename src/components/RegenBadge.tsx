import React from 'react'

export interface RegenBadgeProps {
  /** Link to a specific retirement certificate, or defaults to compute.regen.network */
  certificateUrl?: string
  /** Credits retired to display, e.g. "0.42 C" */
  creditsRetired?: string
  /** compact = small inline badge, full = card with more detail */
  variant?: 'compact' | 'full'
  className?: string
  style?: React.CSSProperties
}

const REGEN_GREEN = '#2D6A4F'
const REGEN_LIGHT = '#52B788'

export function RegenBadge({
  certificateUrl = 'https://compute.regen.network',
  creditsRetired,
  variant = 'compact',
  className,
  style,
}: RegenBadgeProps) {
  if (variant === 'compact') {
    return (
      <a
        href={certificateUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          padding: '4px 10px',
          borderRadius: '9999px',
          backgroundColor: REGEN_GREEN,
          color: '#fff',
          fontSize: '11px',
          fontWeight: 600,
          fontFamily: 'system-ui, sans-serif',
          textDecoration: 'none',
          lineHeight: 1,
          ...style,
        }}
      >
        <LeafIcon />
        Regenerative AI
        {creditsRetired && (
          <span style={{ opacity: 0.8, fontWeight: 400 }}>· {creditsRetired}</span>
        )}
      </a>
    )
  }

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
        backgroundColor: '#F0FAF4',
        border: `1px solid ${REGEN_LIGHT}`,
        color: REGEN_GREEN,
        fontFamily: 'system-ui, sans-serif',
        textDecoration: 'none',
        maxWidth: '240px',
        ...style,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, fontSize: '13px' }}>
        <LeafIcon color={REGEN_GREEN} />
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

function LeafIcon({ color = '#fff', size = 12 }: { color?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
    </svg>
  )
}
