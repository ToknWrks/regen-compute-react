import React from 'react'
import type { CertificateResponse } from '@toknwrks/regen-compute-client'

export interface RegenCertificateProps {
  certificate: CertificateResponse
  className?: string
  style?: React.CSSProperties
}

const REGEN_GREEN = '#2D6A4F'
const REGEN_LIGHT_BG = '#F0FAF4'
const BORDER = '#B7E4C7'

export function RegenCertificate({ certificate, className, style }: RegenCertificateProps) {
  const date = certificate.timestamp
    ? new Date(certificate.timestamp).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })
    : null

  return (
    <div
      className={className}
      style={{
        backgroundColor: REGEN_LIGHT_BG,
        border: `1px solid ${BORDER}`,
        borderRadius: '12px',
        padding: '24px',
        fontFamily: 'system-ui, sans-serif',
        maxWidth: '480px',
        ...style,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
        <LeafIcon />
        <span style={{ fontWeight: 700, fontSize: '16px', color: REGEN_GREEN }}>
          Retirement Certificate
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <Row label="Credits Retired" value={`${certificate.amount} ${creditTypeName(certificate.batch_denom)}`} large />
        {certificate.reason && <Row label="Reason" value={certificate.reason} />}
        {certificate.jurisdiction && <Row label="Jurisdiction" value={certificate.jurisdiction} />}
        {date && <Row label="Date" value={date} />}
        <Row label="Batch" value={certificate.batch_denom} mono />
        <Row label="Transaction" value={shortHash(certificate.tx_hash)} mono link={txUrl(certificate.tx_hash)} />
      </div>

      <a
        href={certificate.certificate_url}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'block',
          marginTop: '20px',
          padding: '10px 16px',
          backgroundColor: REGEN_GREEN,
          color: '#fff',
          borderRadius: '8px',
          textAlign: 'center',
          textDecoration: 'none',
          fontSize: '13px',
          fontWeight: 600,
        }}
      >
        View On-Chain Certificate →
      </a>
    </div>
  )
}

function Row({
  label,
  value,
  mono = false,
  large = false,
  link,
}: {
  label: string
  value: string
  mono?: boolean
  large?: boolean
  link?: string
}) {
  const valueEl = link ? (
    <a href={link} target="_blank" rel="noopener noreferrer"
      style={{ color: '#2D6A4F', textDecoration: 'underline', fontFamily: mono ? 'monospace' : 'inherit' }}>
      {value}
    </a>
  ) : (
    <span style={{
      fontFamily: mono ? 'monospace' : 'inherit',
      fontSize: large ? '18px' : '13px',
      fontWeight: large ? 700 : 400,
      color: large ? '#1B4332' : '#333',
    }}>
      {value}
    </span>
  )

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '12px' }}>
      <span style={{ fontSize: '12px', color: '#666', flexShrink: 0 }}>{label}</span>
      {valueEl}
    </div>
  )
}

function shortHash(hash: string) {
  return hash.length > 16 ? `${hash.slice(0, 8)}…${hash.slice(-6)}` : hash
}

function txUrl(hash: string) {
  return `https://www.mintscan.io/regen/tx/${hash}`
}

function creditTypeName(batchDenom: string) {
  if (batchDenom.startsWith('C0')) return 'Carbon Credits'
  if (batchDenom.startsWith('BT')) return 'Biodiversity Credits'
  if (batchDenom.startsWith('USS')) return 'Umbrella Species Credits'
  if (batchDenom.startsWith('MBS')) return 'Marine Biodiversity Credits'
  if (batchDenom.startsWith('KSH')) return 'Grazing Credits'
  return 'Ecological Credits'
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
