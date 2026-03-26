import React from 'react'
import type { ImpactResponse } from '@toknwrks/regen-compute-client'

export interface RegenImpactProps {
  impact: ImpactResponse
  className?: string
  style?: React.CSSProperties
}

const REGEN_GREEN = '#2D6A4F'
const REGEN_LIGHT_BG = '#F0FAF4'
const BORDER = '#B7E4C7'

export function RegenImpact({ impact, className, style }: RegenImpactProps) {
  const stats = [
    { label: 'Active Projects', value: impact.active_projects ?? '—' },
    { label: 'Credit Classes', value: impact.credit_classes ?? '—' },
    { label: 'Jurisdictions', value: impact.jurisdictions ?? '—' },
    { label: 'Total Retirements', value: formatNumber(impact.total_retirements) },
  ]

  return (
    <div
      className={className}
      style={{
        backgroundColor: REGEN_LIGHT_BG,
        border: `1px solid ${BORDER}`,
        borderRadius: '12px',
        padding: '24px',
        fontFamily: 'system-ui, sans-serif',
        ...style,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
        <LeafIcon />
        <span style={{ fontWeight: 700, fontSize: '16px', color: REGEN_GREEN }}>
          Regen Network Impact
        </span>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '16px',
        marginBottom: impact.credit_types?.length ? '20px' : 0,
      }}>
        {stats.map(({ label, value }) => (
          <div key={label} style={{
            backgroundColor: '#fff',
            borderRadius: '8px',
            padding: '12px 14px',
            border: `1px solid ${BORDER}`,
          }}>
            <div style={{ fontSize: '22px', fontWeight: 800, color: REGEN_GREEN, lineHeight: 1 }}>
              {value}
            </div>
            <div style={{ fontSize: '11px', color: '#666', marginTop: '4px' }}>
              {label}
            </div>
          </div>
        ))}
      </div>

      {impact.credit_types && impact.credit_types.length > 0 && (
        <div>
          <div style={{ fontSize: '11px', color: '#666', marginBottom: '8px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Credit Types
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {impact.credit_types.map(ct => (
              <span key={ct.abbreviation} style={{
                padding: '3px 10px',
                backgroundColor: '#fff',
                border: `1px solid ${BORDER}`,
                borderRadius: '9999px',
                fontSize: '11px',
                color: REGEN_GREEN,
                fontWeight: 600,
              }}>
                {ct.abbreviation} · {ct.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function formatNumber(n?: number | null): string {
  if (n == null) return '—'
  return n.toLocaleString()
}

function LeafIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2D6A4F"
      strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
    </svg>
  )
}
