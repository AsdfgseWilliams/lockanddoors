// app/layout.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.locksanddoors24h.com'),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // [lang]/layout.tsx se encarga del <html> y <body>
  return children as React.ReactElement
}