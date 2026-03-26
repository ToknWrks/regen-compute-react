import React from 'react'
import { getClient, MissingKeyNotice, DashboardShell, REGEN_GREEN, REGEN_LIGHT_BG, BORDER } from './shared.js'

/**
 * Drop-in Next.js server component — certificates list.
 * Accepts a certificateIds prop so you can pass IDs you've stored
 * (e.g. from your own database after withRegen's onRetire callback).
 *
 * @example
 * // app/regen/certificates/page.tsx
 * export { RegenCertificatesPage as default } from '@toknwrks/regen-compute-react/dashboard'
 */
export async function RegenCertificatesPage({
  certificateIds = [],
}: {
  /** Certificate node IDs or tx hashes to display */
  certificateIds?: string[]
}) {
  const client = getClient()
  if (!client) return <DashboardShell title="Certificates"><MissingKeyNotice /></DashboardShell>

  const certs = await Promise.all(
    certificateIds.map(id => client.certificate(id).catch(() => null))
  )
  const valid = certs.filter(Boolean)

  return (
    <DashboardShell title="Certificates">
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '22px', fontWeight: 800, color: '#1B4332', margin: 0 }}>
          Retirement Certificates
        </h1>
        <span style={{ fontSize: '13px', color: '#888' }}>
          {valid.length} certificate{valid.length !== 1 ? 's' : ''}
        </span>
      </div>

      {valid.length === 0 ? (
        <div style={{
          padding: '40px',
          textAlign: 'center',
          color: '#888',
          backgroundColor: '#fff',
          border: `1px solid ${BORDER}`,
          borderRadius: '12px',
          fontSize: '14px',
        }}>
          {certificateIds.length === 0
            ? 'Pass certificateIds to this page to display certificates. Collect them via the onRetire hook in withRegen().'
            : 'No certificates could be loaded.'}
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {valid.map(cert => {
            if (!cert) return null
            const date = cert.timestamp
              ? new Date(cert.timestamp).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
              : null
            return (
              <a
                key={cert.node_id}
                href={`certificates/${encodeURIComponent(cert.node_id)}`}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr 1fr auto',
                  alignItems: 'center',
                  gap: '16px',
                  padding: '16px 20px',
                  backgroundColor: '#fff',
                  border: `1px solid ${BORDER}`,
                  borderRadius: '10px',
                  textDecoration: 'none',
                  color: 'inherit',
                }}
              >
                <div>
                  <div style={{ fontWeight: 700, fontSize: '15px', color: REGEN_GREEN }}>
                    {cert.amount} credits
                  </div>
                  <div style={{ fontSize: '11px', color: '#888', marginTop: '2px', fontFamily: 'monospace' }}>
                    {cert.batch_denom}
                  </div>
                </div>
                <div style={{ fontSize: '13px', color: '#555' }}>
                  {cert.reason ?? '—'}
                </div>
                <div style={{ fontSize: '12px', color: '#888' }}>
                  {date ?? '—'}
                </div>
                <span style={{ fontSize: '12px', color: REGEN_GREEN, fontWeight: 600 }}>
                  View →
                </span>
              </a>
            )
          })}
        </div>
      )}

      <div style={{ marginTop: '32px' }}>
        <a href=".." style={{ fontSize: '13px', color: REGEN_GREEN, textDecoration: 'underline' }}>
          ← Back to Dashboard
        </a>
      </div>
    </DashboardShell>
  )
}
