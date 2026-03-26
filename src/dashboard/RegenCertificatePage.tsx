import React from 'react'
import { getClient, MissingKeyNotice, DashboardShell, REGEN_GREEN, REGEN_LIGHT_BG, BORDER } from './shared.js'

/**
 * Drop-in Next.js server component — single certificate detail page.
 *
 * @example
 * // app/regen/certificates/[id]/page.tsx
 * import { RegenCertificatePage } from '@toknwrks/regen-compute-react/dashboard'
 *
 * export default function Page({ params }: { params: { id: string } }) {
 *   return <RegenCertificatePage id={params.id} />
 * }
 */
export async function RegenCertificatePage({ id }: { id: string }) {
  const client = getClient()
  if (!client) return <DashboardShell title="Certificate"><MissingKeyNotice /></DashboardShell>

  const cert = await client.certificate(id).catch(() => null)

  if (!cert) {
    return (
      <DashboardShell title="Certificate">
        <div style={{
          padding: '40px',
          textAlign: 'center',
          color: '#888',
          backgroundColor: '#fff',
          border: `1px solid ${BORDER}`,
          borderRadius: '12px',
          fontSize: '14px',
        }}>
          Certificate not found for ID: <code>{id}</code>
        </div>
      </DashboardShell>
    )
  }

  const date = cert.timestamp
    ? new Date(cert.timestamp).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })
    : null

  return (
    <DashboardShell title="Certificate">
      <div style={{ marginBottom: '24px' }}>
        <a href=".." style={{ fontSize: '13px', color: REGEN_GREEN, textDecoration: 'underline' }}>
          ← Back to Certificates
        </a>
      </div>

      <div style={{
        backgroundColor: '#fff',
        border: `1px solid ${BORDER}`,
        borderRadius: '12px',
        overflow: 'hidden',
      }}>
        <div style={{
          backgroundColor: REGEN_LIGHT_BG,
          borderBottom: `1px solid ${BORDER}`,
          padding: '20px 24px',
        }}>
          <div style={{ fontSize: '28px', fontWeight: 800, color: REGEN_GREEN }}>
            {cert.amount} Ecological Credits Retired
          </div>
          {date && (
            <div style={{ fontSize: '13px', color: '#666', marginTop: '4px' }}>{date}</div>
          )}
        </div>

        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {[
            { label: 'Batch', value: cert.batch_denom, mono: true },
            { label: 'Owner', value: cert.owner, mono: true },
            cert.reason ? { label: 'Reason', value: cert.reason } : null,
            cert.jurisdiction ? { label: 'Jurisdiction', value: cert.jurisdiction } : null,
            { label: 'Transaction', value: cert.tx_hash, mono: true, link: `https://www.mintscan.io/regen/tx/${cert.tx_hash}` },
            cert.block_height ? { label: 'Block', value: cert.block_height, mono: true } : null,
          ].filter(Boolean).map((row) => {
            if (!row) return null
            return (
              <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '12px', fontSize: '13px' }}>
                <span style={{ color: '#666', flexShrink: 0, minWidth: '100px' }}>{row.label}</span>
                {row.link ? (
                  <a href={row.link} target="_blank" rel="noopener noreferrer"
                    style={{ color: REGEN_GREEN, textDecoration: 'underline', fontFamily: row.mono ? 'monospace' : 'inherit', wordBreak: 'break-all' }}>
                    {row.value}
                  </a>
                ) : (
                  <span style={{ fontFamily: row.mono ? 'monospace' : 'inherit', color: '#333', wordBreak: 'break-all' }}>
                    {row.value}
                  </span>
                )}
              </div>
            )
          })}
        </div>

        <div style={{ padding: '16px 24px', borderTop: `1px solid ${BORDER}` }}>
          <a
            href={cert.certificate_url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              padding: '10px 20px',
              backgroundColor: REGEN_GREEN,
              color: '#fff',
              borderRadius: '8px',
              textDecoration: 'none',
              fontSize: '13px',
              fontWeight: 600,
            }}
          >
            View On-Chain Certificate →
          </a>
        </div>
      </div>
    </DashboardShell>
  )
}
