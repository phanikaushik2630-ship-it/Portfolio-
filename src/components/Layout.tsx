import { type ReactNode } from 'react'
import Nav from './Nav'
import Footer from './Footer'
import ScrollAnimations from './ScrollAnimations'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="relative min-h-screen bg-base text-primary overflow-x-hidden">
      {/* Fixed navigation */}
      <Nav />

      {/* Global scroll animation orchestrator (renders scroll-progress bar) */}
      <ScrollAnimations />

      {/* Page sections */}
      <main id="main-content" role="main">
        {children}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
