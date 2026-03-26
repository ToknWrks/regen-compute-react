# @toknwrks/regen-compute-react

React components for [Regenerative Compute](https://compute.regen.network) — drop-in UI for ecological credit retirement in AI applications.

## Install

```bash
npm install @toknwrks/regen-compute-react @toknwrks/regen-compute-client
```

## Components

### `<RegenBadge />`

A small "Regenerative AI" badge that links to a retirement certificate or compute.regen.network.

```tsx
import { RegenBadge } from '@toknwrks/regen-compute-react'

// Compact inline badge
<RegenBadge />

// With certificate link and credit display
<RegenBadge
  certificateUrl="https://compute.regen.network/certificate/WyJy..."
  creditsRetired="0.42 C"
/>

// Full card variant
<RegenBadge variant="full" creditsRetired="0.42 C" />
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
    <RetireButton
      onRetire={retireCredits}
      onSuccess={result => console.log(result)}
    >
      Offset This Session
    </RetireButton>
  )
}
```

After retirement, the button automatically shows a certificate link (on-chain) or a marketplace link (credit card fallback).

---

### `<RegenCertificate />`

Displays a retirement certificate with on-chain details.

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
<RegenBadge className="my-badge" style={{ borderRadius: '4px' }} />
```

## License

Apache-2.0
