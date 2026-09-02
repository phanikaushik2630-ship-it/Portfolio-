/**
 * lib/gsap.ts
 *
 * Centralised GSAP + ScrollTrigger initialisation.
 * Import and call `initGSAP()` once at the app root (e.g. in main.tsx or App.tsx).
 *
 * Usage:
 *   import { initGSAP, gsap } from '@/lib/gsap'
 *   initGSAP()
 */

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

let initialised = false

export function initGSAP() {
  if (initialised) return
  gsap.registerPlugin(ScrollTrigger)

  // Default GSAP settings for the project
  gsap.defaults({
    ease:     'power3.out',
    duration: 0.8,
  })

  // ScrollTrigger defaults
  ScrollTrigger.defaults({
    toggleActions: 'play none none reverse',
    start:         'top 85%',
  })

  initialised = true
}

// Re-export so consumers don't need to import gsap directly
export { gsap, ScrollTrigger }
