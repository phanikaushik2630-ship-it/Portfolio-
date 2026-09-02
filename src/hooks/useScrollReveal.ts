/**
 * useScrollReveal.ts
 *
 * Animates children of a container ref into view on scroll.
 * Respects prefers-reduced-motion — falls back to instant show.
 *
 * Usage:
 *   const ref = useRef<HTMLDivElement>(null)
 *   useScrollReveal(ref)                          // fade+slide whole container
 *   useScrollReveal(ref, { selector: '.card' })   // stagger children
 *   useScrollReveal(ref, { stagger: 0.12, y: 40 })
 */

import { useEffect, type RefObject } from 'react'
import { gsap, ScrollTrigger, initGSAP } from '@/lib/gsap'

interface ScrollRevealOptions {
  /** CSS selector to query inside the ref (staggered children) */
  selector?:   string
  /** Duration of each element's animation */
  duration?:   number
  /** Starting y offset (pixels) */
  y?:          number
  /** Starting x offset (pixels) */
  x?:          number
  /** Stagger delay between children (seconds) */
  stagger?:    number
  /** GSAP ease string */
  ease?:       string
  /** ScrollTrigger start string */
  start?:      string
  /** Delay before animation starts */
  delay?:      number
  /** Also animate scale from this value */
  scaleFrom?:  number
}

const REDUCED = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function useScrollReveal<T extends HTMLElement>(
  ref: RefObject<T | null>,
  options: ScrollRevealOptions = {},
) {
  const {
    selector,
    duration  = 0.75,
    y         = 32,
    x         = 0,
    stagger   = 0.1,
    ease      = 'power3.out',
    start     = 'top 88%',
    delay     = 0,
    scaleFrom,
  } = options

  useEffect(() => {
    initGSAP()

    const el = ref.current
    if (!el) return

    // Reduced-motion: make elements immediately visible, no ScrollTrigger
    if (REDUCED()) {
      const targets = selector ? el.querySelectorAll(selector) : [el]
      gsap.set(targets, { opacity: 1, y: 0, x: 0, scale: 1 })
      return
    }

    const ctx = gsap.context(() => {
      const targets = selector
        ? el.querySelectorAll<HTMLElement>(selector)
        : [el]

      if (!targets.length) return

      // Set initial hidden state
      gsap.set(targets, {
        opacity: 0,
        y,
        x,
        ...(scaleFrom !== undefined && { scale: scaleFrom }),
      })

      gsap.to(targets, {
        opacity:  1,
        y:        0,
        x:        0,
        ...(scaleFrom !== undefined && { scale: 1 }),
        duration,
        ease,
        delay,
        stagger:  targets.length > 1 ? stagger : 0,
        scrollTrigger: {
          trigger: el,
          start,
          toggleActions: 'play none none reverse',
        },
      })
    }, el)

    return () => {
      ctx.revert()
      // ScrollTrigger.getAll() is cleaned by ctx.revert(), but be explicit
      ScrollTrigger.refresh()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref])
}
