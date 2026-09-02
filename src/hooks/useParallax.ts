/**
 * useParallax.ts
 *
 * Applies a scroll-driven vertical (or horizontal) translate
 * to the element in the given ref using GSAP ScrollTrigger scrub.
 * Automatically cleans up on unmount.
 *
 * Usage:
 *   const ref = useRef<HTMLDivElement>(null)
 *   useParallax(ref, { speed: 0.3 })          // moves up at 30% of scroll speed
 *   useParallax(ref, { speed: -0.15 })        // moves down (reverse parallax)
 *   useParallax(ref, { speed: 0.2, axis: 'x' })
 */

import { useEffect, type RefObject } from 'react'
import { gsap, initGSAP } from '@/lib/gsap'

interface ParallaxOptions {
  /**
   * Movement ratio relative to scroll distance.
   * Positive = element moves UP as page scrolls down.
   * Range typically 0.05–0.5 for subtle effect.
   */
  speed?:    number
  /** Which axis to translate on */
  axis?:     'y' | 'x'
  /** ScrollTrigger trigger selector/element — defaults to the ref itself */
  trigger?:  string | Element | null
  /** ScrollTrigger start */
  start?:    string
  /** ScrollTrigger end */
  end?:      string
  /** Scrub smoothness (true = 1s lag, number = seconds) */
  scrub?:    boolean | number
}

const REDUCED = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function useParallax<T extends HTMLElement>(
  ref: RefObject<T | null>,
  options: ParallaxOptions = {},
) {
  const {
    speed   = 0.2,
    axis    = 'y',
    trigger,
    start   = 'top bottom',
    end     = 'bottom top',
    scrub   = 1.2,
  } = options

  useEffect(() => {
    initGSAP()

    const el = ref.current
    if (!el || REDUCED()) return

    const ctx = gsap.context(() => {
      // Calculate total movement: scrolled distance × speed
      // We use a "from percentage" approach so the effect scales
      // with viewport size automatically
      const distance = `${speed * 100}%`

      gsap.fromTo(
        el,
        { [axis]: axis === 'y' ? `-${distance}` : `-${distance}` },
        {
          [axis]: distance,
          ease: 'none',
          scrollTrigger: {
            trigger: trigger ?? el,
            start,
            end,
            scrub,
          },
        },
      )
    })

    return () => ctx.revert()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref])
}
