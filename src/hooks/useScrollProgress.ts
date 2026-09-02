/**
 * hooks/useScrollProgress.ts
 * Returns the overall page scroll progress as a value between 0 and 1.
 */

import { useState, useEffect } from 'react'

export function useScrollProgress(): number {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const el     = document.documentElement
      const total  = el.scrollHeight - el.clientHeight
      const current = window.scrollY
      setProgress(total > 0 ? current / total : 0)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // initialise
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return progress
}
