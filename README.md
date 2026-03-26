# @toknwrks/regen-compute-react

React components for [Regenerative Compute](https://compute.regen.network) — drop-in UI for ecological credit retirement in AI applications.

Developers use these to signal to their users that their AI product is backed by verified ecological regeneration on Regen Network.

## Install

```bash
npm install @toknwrks/regen-compute-react @toknwrks/regen-compute-client
```

## Components

### `<RegenChatBadge />`

A small inline badge for chat footers and message input areas. The most common placement — always visible to the end user while they're using the AI.

```tsx
import { RegenChatBadge } from '@toknwrks/regen-compute-react'

// Minimal
<RegenChatBadge />

// With certificate link and credit display
<RegenChatBadge
  certificateUrl="https://compute.regen.network/certificate/WyJy..."
  creditsRetired="0.42 C"
/>
```

**Typical placement in a chat UI:**

```tsx
<div className="chat-input-wrapper">
  <textarea placeholder="Message..." />
  <div className="chat-input-footer">
    <RegenChatBadge certificateUrl={latestCertUrl} />
    <button type="submit">Send</button>
  </div>
</div>
```

---

### `<RegenPoweredBy />`

A "Powered by" card for app footers, sidebars, and about pages. Shows the Regen brand with a short description and a link to the retirement certificate.

```tsx
import { RegenPoweredBy } from '@toknwrks/regen-compute-react'

// App footer
<footer>
  <p>© 2025 Acme AI</p>
  <RegenPoweredBy />
</footer>

// Sidebar with live stats
<RegenPoweredBy
  certificateUrl={latestCertUrl}
  creditsRetired="1.2 C"
/>
```

---

### `<RetireButton />`

A button that retires credits via your server action or API route. Your API key never leaves the server.

```tsx
// app/actions/retire.ts
'use server'
import { RegenClient } from '@toknwrks/regen-compute-client'

const regen = new RegenClient({ apiKey: process.env.REGEN_API_KEY! })

export async function retireCredits() {
  return regen.retire({ credit_class: 'C', quantity: 1, reason: 'AI session' })
}
```

```tsx
// app/components/MyChat.tsx
'use client'
import { RetireButton } from '@toknwrks/regen-compute-react'
import { retireCredits } from '../actions/retire'

export function MyChat() {
  return (
    <RetireButton onRetire={retireCredits}>
      Offset This Session
    </RetireButton>
  )
}
```

After retirement, the button automatically shows a certificate link (on-chain) or marketplace link (credit card fallback).

---

### `<RegenCertificate />`

Displays a full retirement certificate with on-chain details.

```tsx
import { RegenCertificate } from '@toknwrks/regen-compute-react'
import { RegenClient } from '@toknwrks/regen-compute-client'

// In a Next.js server component:
const regen = new RegenClient({ apiKey: process.env.REGEN_API_KEY! })
const cert = await regen.certificate('WyJy...')

<RegenCertificate certificate={cert} />
```

---

### `<RegenImpact />`

Displays aggregate Regen Network impact statistics.

```tsx
import { RegenImpact } from '@toknwrks/regen-compute-react'
import { RegenClient } from '@toknwrks/regen-compute-client'

const regen = new RegenClient({ apiKey: process.env.REGEN_API_KEY! })
const impact = await regen.impact()

<RegenImpact impact={impact} />
```

---

## Styling

All components use inline styles with zero CSS dependencies. Override with `className` or `style`:

```tsx
<RegenChatBadge className="my-badge" style={{ fontSize: '12px' }} />
```

## License

Apache-2.0
