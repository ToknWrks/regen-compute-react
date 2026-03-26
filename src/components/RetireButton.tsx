'use client'

import React, { useState } from 'react'
import type { RetireResponse } from '@toknwrks/regen-compute-client'

type RetireState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; result: RetireResponse }
  | { status: 'error'; message: string }

export interface RetireButtonProps {
  /**
   * Async function that calls your server action or API route to retire credits.
   * Keep your API key server-side — don't pass it to this component directly.
   *
   * @example
   * // app/actions/retire.ts
   * 'use server'
   * export async function retireCredits() {
   *   const regen = new RegenClient({ apiKey: process.env.REGEN_API_KEY! })
   *   return regen.retire({ credit_class: 'C', quantity: 1 })
   * }
   */
  onRetire: () => Promise<RetireResponse>
  /** Called after a successful retirement */
  onSuccess?: (result: RetireResponse) => void
  /** Called on error */
  onError?: (error: Error) => void
  children?: React.ReactNode
  className?: string
  style?: React.CSSProperties
  /** Disable the button regardless of state */
  disabled?: boolean
}

const REGEN_GREEN = '#2D6A4F'
const REGEN_GREEN_HOVER = '#1B4332'

export function RetireButton({
  onRetire,
  onSuccess,
  onError,
  children = 'Retire Ecological Credits',
  className,
  style,
  disabled = false,
}: RetireButtonProps) {
  const [state, setState] = useState<RetireState>({ status: 'idle' })

  async function handleClick() {
    if (state.status === 'loading') return
    setState({ status: 'loading' })
    try {
      const result = await onRetire()
      setState({ status: 'success', result })
      onSuccess?.(result)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Something went wrong'
      setState({ status: 'error', message })
      onError?.(err instanceof Error ? err : new Error(message))
    }
  }

  const isLoading = state.status === 'loading'
  const isSuccess = state.status === 'success'

  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', gap: '8px', fontFamily: 'system-ui, sans-serif' }}>
      <button
        onClick={handleClick}
        disabled={disabled || isLoading || isSuccess}
        className={className}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '10px 20px',
          borderRadius: '8px',
          backgroundColor: isSuccess ? '#52B788' : REGEN_GREEN,
          color: '#fff',
          fontSize: '14px',
          fontWeight: 600,
          border: 'none',
          cursor: disabled || isLoading || isSuccess ? 'not-allowed' : 'pointer',
          opacity: disabled ? 0.6 : 1,
          transition: 'background-color 0.15s',
          ...style,
        }}
        onMouseEnter={e => {
          if (!disabled && !isLoading && !isSuccess) {
            (e.target as HTMLButtonElement).style.backgroundColor = REGEN_GREEN_HOVER
          }
        }}
        onMouseLeave={e => {
          if (!isSuccess) {
            (e.target as HTMLButtonElement).style.backgroundColor = isSuccess ? '#52B788' : REGEN_GREEN
          }
        }}
      >
        {isLoading ? <Spinner /> : <LeafIcon />}
        {isLoading ? 'Retiring…' : isSuccess ? 'Credits Retired ✓' : children}
      </button>

      {state.status === 'success' && state.result.status === 'success' && state.result.certificate_url && (
        <a
          href={state.result.certificate_url}
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontSize: '12px', color: REGEN_GREEN, textDecoration: 'underline' }}
        >
          View certificate →
        </a>
      )}

      {state.status === 'success' && state.result.status === 'marketplace_link' && (
        <a
          href={state.result.marketplace_url}
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontSize: '12px', color: REGEN_GREEN, textDecoration: 'underline' }}
        >
          Complete purchase on Regen Marketplace →
        </a>
      )}

      {state.status === 'error' && (
        <span style={{ fontSize: '12px', color: '#DC2626' }}>
          {state.message}
        </span>
      )}
    </div>
  )
}

function LeafIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
    </svg>
  )
}

function Spinner() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2.5" strokeLinecap="round" aria-hidden="true"
      style={{ animation: 'spin 0.8s linear infinite' }}>
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  )
}
