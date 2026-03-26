import React from 'react'
import { getClient, MissingKeyNotice, DashboardShell, StatCard, REGEN_GREEN, REGEN_LIGHT_BG, BORDER, REGEN_LIGHT } from './shared.js'

/**
 * Drop-in Next.js server component — overview dashboard.
 *
 * @example
 * // app/regen/page.tsx
 * export { RegenDashboardPage as default } from '@toknwrks/regen-compute-react/dashboard'
 */
export async function RegenDashboardPage() {
  const client = getClient()
  if (!client) return <DashboardShell title="Dashboard"><MissingKeyNotice /></DashboardShell>

  const [impact, credits] = await Promise.all([
    client.impact().catch(() => null),
    client.credits({ type: 'all', max_results: 5 }).catch(() => null),
  ])

  return (
    <DashboardShell title="Dashboard">
      <h1 style={{ fontSize: '22px', fontWeight: 800, color: '#1B4332', margin: '0 0 24px' }}>
        Impact Overview
      </h1>

      {impact ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '40px' }}>
          <StatCard label="Active Projects" value={impact.active_projects ?? '—'} />
          <StatCard label="Credit Classes" value={impact.credit_classes ?? '—'} />
          <StatCard label="Jurisdictions" value={impact.jurisdictions ?? '—'} />
          <StatCard label="Total Retirements" value={impact.total_retirements ?? '—'} />
        </div>
      ) : (
        <p style={{ color: '#888', marginBottom: '40px' }}>Could not load impact data.</p>
      )}

      {impact?.credit_types && impact.credit_types.length > 0 && (
        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '15px', fontWeight: 700, color: '#333', margin: '0 0 12px' }}>
            Credit Types Available
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {impact.credit_types.map(ct => (
              <span key={ct.abbreviation} style={{
                padding: '4px 12px',
                backgroundColor: REGEN_LIGHT_BG,
                border: `1px solid ${BORDER}`,
                borderRadius: '9999px',
                fontSize: '12px',
                color: REGEN_GREEN,
                fontWeight: 600,
              }}>
                {ct.abbreviation} · {ct.name}
              </span>
            ))}
          </div>
        </section>
      )}

      {credits?.marketplace_snapshot && credits.marketplace_snapshot.length > 0 && (
        <section>
          <h2 style={{ fontSize: '15px', fontWeight: 700, color: '#333', margin: '0 0 12px' }}>
            Marketplace Snapshot
          </h2>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
            <thead>
              <tr style={{ borderBottom: `2px solid ${BORDER}` }}>
                {['Credit Type', 'Available Credits', 'Sell Orders'].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '8px 12px', color: '#555', fontWeight: 600 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {credits.marketplace_snapshot.map((row, i) => (
                <tr key={i} style={{ borderBottom: `1px solid ${BORDER}`, backgroundColor: i % 2 === 0 ? '#fff' : REGEN_LIGHT_BG }}>
                  <td style={{ padding: '10px 12px', fontWeight: 600, color: REGEN_GREEN }}>{row.credit_type}</td>
                  <td style={{ padding: '10px 12px' }}>{row.available_credits.toLocaleString()}</td>
                  <td style={{ padding: '10px 12px' }}>{row.sell_orders}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      <div style={{ marginTop: '40px', paddingTop: '24px', borderTop: `1px solid ${BORDER}`, display: 'flex', gap: '16px' }}>
        <a href="certificates" style={{ fontSize: '13px', color: REGEN_GREEN, textDecoration: 'underline' }}>
          View Certificates →
        </a>
        <a href="https://compute.regen.network" target="_blank" rel="noopener noreferrer"
          style={{ fontSize: '13px', color: REGEN_LIGHT, textDecoration: 'underline' }}>
          compute.regen.network ↗
        </a>
      </div>
    </DashboardShell>
  )
}
