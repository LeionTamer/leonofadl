import type { Metadata } from 'next'
import { Inter as Inter } from 'next/font/google'
import './globals.css'
import './globalIcons.css'
import AppProviders from './_providers'
import Navbar from './_navbar'
import { HEADER_HEIGHT } from '@/helpers/consts'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Leon of Adelaide',
  description: 'A foodie who can code',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <AppProviders>
        <body
          className={`${inter.className} grid`}
          style={{ gridTemplateRows: `${HEADER_HEIGHT} 1fr` }}
        >
          <Navbar />
          {children}
        </body>
      </AppProviders>
    </html>
  )
}
