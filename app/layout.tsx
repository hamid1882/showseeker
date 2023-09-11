import { AppBar } from '@mui/material'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import TopBar from './compoonents/topbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Show Seeker',
  description: 'Search for TV Shows',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
          <TopBar />
          {children}
        </body>
    </html>
  )
}
