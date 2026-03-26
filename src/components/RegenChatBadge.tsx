import React from 'react'

export interface RegenChatBadgeProps {
  /** Link to the latest retirement certificate. Defaults to compute.regen.network */
  certificateUrl?: string
  /** Credits retired to display, e.g. "0.42 C" */
  creditsRetired?: string
  /**
   * Custom icon to replace the default leaf SVG. Use this to slot in the
   * official Regen mark once design assets are available.
   * @example
   * icon={<img src="/regen-mark.svg" width={12} height={12} alt="" />}
   */
  icon?: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

const REGEN_GREEN = '#2D6A4F'

/**
 * A small inline badge for chat footers and message input areas.
 * Signals to end users that the AI session is backed by verified
 * ecological credit retirement.
 *
 * @example
 * // Typical placement in a chat UI:
 * <div className="chat-input-area">
 *   <textarea ... />
 *   <div className="chat-footer">
 *     <RegenChatBadge certificateUrl={latestCertUrl} />
 *     <SendButton />
 *   </div>
 * </div>
 */
export function RegenChatBadge({
  certificateUrl = 'https://compute.regen.network',
  creditsRetired,
  icon,
  className,
  style,
}: RegenChatBadgeProps) {
  return (
    <a
      href={certificateUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      title="This AI uses Regenerative Compute — verified ecological credits retired on Regen Network"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '5px',
        padding: '3px 9px',
        borderRadius: '9999px',
        backgroundColor: REGEN_GREEN,
        color: '#fff',
        fontSize: '11px',
        fontWeight: 600,
        fontFamily: 'system-ui, sans-serif',
        textDecoration: 'none',
        lineHeight: 1,
        opacity: 0.9,
        ...style,
      }}
    >
      {icon ?? <LeafIcon />}
      Regenerative AI
      {creditsRetired && (
        <span style={{ opacity: 0.75, fontWeight: 400 }}>· {creditsRetired}</span>
      )}
    </a>
  )
}

function LeafIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
    </svg>
  )
}
