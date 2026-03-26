import React from 'react'
import { RegenClient } from '@toknwrks/regen-compute-client'

export const REGEN_GREEN = '#2D6A4F'
export const REGEN_LIGHT = '#52B788'
export const REGEN_LIGHT_BG = '#F0FAF4'
export const BORDER = '#B7E4C7'
export const REGEN_NAVY = '#1B4332'

export function getClient(): RegenClient | null {
  const apiKey = process.env.REGEN_API_KEY
  if (!apiKey) return null
  return new RegenClient({ apiKey })
}

export function MissingKeyNotice() {
  return (
    <div style={{
      padding: '24px',
      backgroundColor: '#FEF9C3',
      border: '1px solid #FDE047',
      borderRadius: '12px',
      fontFamily: 'system-ui, sans-serif',
      fontSize: '14px',
      color: '#713F12',
    }}>
      <strong>⚠️ REGEN_API_KEY is not set.</strong>
      <p style={{ margin: '8px 0 0' }}>
        Add your API key to <code>.env.local</code>:
      </p>
      <pre style={{
        margin: '8px 0 0',
        padding: '10px 14px',
        backgroundColor: '#fff',
        borderRadius: '6px',
        fontSize: '13px',
        fontFamily: 'monospace',
      }}>
        REGEN_API_KEY=rfa_...
      </pre>
      <p style={{ margin: '8px 0 0' }}>
        Get your key at{' '}
        <a href="https://compute.regen.network" target="_blank" rel="noopener noreferrer"
          style={{ color: REGEN_GREEN }}>
          compute.regen.network
        </a>
      </p>
    </div>
  )
}

export function DashboardShell({ children, title }: { children: React.ReactNode; title: string }) {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#F9FAFB',
      fontFamily: 'system-ui, sans-serif',
    }}>
      <div style={{
        borderBottom: `2px solid ${REGEN_GREEN}`,
        backgroundColor: '#fff',
        padding: '0 32px',
      }}>
        <div style={{
          maxWidth: '900px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          height: '56px',
        }}>
          <LeafIcon />
          <span style={{ fontWeight: 800, fontSize: '16px', color: REGEN_GREEN }}>
            Regenerative Compute
          </span>
          <span style={{ color: '#ccc', fontSize: '14px' }}>/</span>
          <span style={{ fontSize: '14px', color: '#555' }}>{title}</span>
        </div>
      </div>
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '32px' }}>
        {children}
      </div>
    </div>
  )
}

export function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div style={{
      backgroundColor: '#fff',
      border: `1px solid ${BORDER}`,
      borderRadius: '10px',
      padding: '16px 20px',
    }}>
      <div style={{ fontSize: '26px', fontWeight: 800, color: REGEN_GREEN, lineHeight: 1 }}>
        {typeof value === 'number' ? value.toLocaleString() : value}
      </div>
      <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>{label}</div>
    </div>
  )
}

function LeafIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={REGEN_GREEN}
      strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
    </svg>
  )
}
