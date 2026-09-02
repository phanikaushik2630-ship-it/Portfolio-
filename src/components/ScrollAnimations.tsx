/**
 * ScrollAnimations.tsx
 *
 * Global scroll-animation orchestrator — mount ONCE inside Layout.
 * Handles:
 *   1. Section reveal — any element with [data-reveal] animates in on scroll.
 *      [data-reveal-stagger] on a parent staggers its direct children.
 *   2. Hero background parallax (scrubbed).
 *   3. About-section decorative parallax element.
 *   4. Progress bar that shows scroll depth at the top of the viewport.
 *
 * This component renders nothing visible — it's purely side-effect.
 */

import { useEffect } from 'react'
import { gsap, ScrollTrigger, initGSAP } from '@/lib/gsap'

const REDUCED = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export default function ScrollAnimations() {
  useEffect(() => {
    initGSAP()

    if (REDUCED()) {
      // Make all reveal elements instantly visible
      document
        .querySelectorAll<HTMLElement>('[data-reveal], [data-reveal-stagger] > *')
        .forEach((el) => {
          el.style.opacity = '1'
          el.style.transform = 'none'
        })
      return
    }

    const ctx = gsap.context(() => {

      // ── 1. Section content reveals ─────────────────────
      // [data-reveal]: fade + slide the element itself
      const revealEls = gsap.utils.toArray<HTMLElement>('[data-reveal]')
      revealEls.forEach((el) => {
        const fromY     = Number(el.dataset.revealY    ?? 36)
        const fromX     = Number(el.dataset.revealX    ?? 0)
        const dur       = Number(el.dataset.revealDur  ?? 0.72)
        const delay     = Number(el.dataset.revealDelay ?? 0)
        const ease      =        el.dataset.revealEase ?? 'power3.out'

        gsap.fromTo(
          el,
          { opacity: 0, y: fromY, x: fromX },
          {
            opacity:  1,
            y:        0,
            x:        0,
            duration: dur,
            delay,
            ease,
            scrollTrigger: {
              trigger: el,
              start:   'top 88%',
              toggleActions: 'play none none reverse',
            },
          },
        )
      })

      // [data-reveal-stagger]: stagger the direct children
      const staggerParents = gsap.utils.toArray<HTMLElement>('[data-reveal-stagger]')
      staggerParents.forEach((parent) => {
        const children  = gsap.utils.toArray<HTMLElement>(':scope > *', parent)
        const fromY     = Number(parent.dataset.revealY       ?? 40)
        const stagger   = Number(parent.dataset.revealStagger ?? 0.1)
        const dur       = Number(parent.dataset.revealDur     ?? 0.65)
        const ease      =        parent.dataset.revealEase    ?? 'power3.out'

        if (!children.length) return

        gsap.fromTo(
          children,
          { opacity: 0, y: fromY },
          {
            opacity:  1,
            y:        0,
            duration: dur,
            ease,
            stagger,
            scrollTrigger: {
              trigger: parent,
              start:   'top 85%',
              toggleActions: 'play none none reverse',
            },
          },
        )
      })

      // ── 2. Hero background parallax (scrub) ────────────
      const heroBg = document.querySelector<HTMLElement>('#hero-parallax-bg')
      if (heroBg) {
        gsap.fromTo(
          heroBg,
          { y: '-8%' },
          {
            y: '12%',
            ease: 'none',
            scrollTrigger: {
              trigger: '#hero',
              start:   'top top',
              end:     'bottom top',
              scrub:   1.5,
            },
          },
        )
      }

      // ── 3. Section-after-hero (About) decorative layer ─
      const aboutOrb = document.querySelector<HTMLElement>('#about-parallax-orb')
      if (aboutOrb) {
        gsap.fromTo(
          aboutOrb,
          { y: '-20%' },
          {
            y: '20%',
            ease: 'none',
            scrollTrigger: {
              trigger: '#about',
              start:   'top bottom',
              end:     'bottom top',
              scrub:   2,
            },
          },
        )
      }

      // ── 4. Scroll progress bar ─────────────────────────
      const bar = document.querySelector<HTMLElement>('#scroll-progress')
      if (bar) {
        gsap.to(bar, {
          scaleX: 1,
          ease:   'none',
          scrollTrigger: {
            trigger:    document.body,
            start:      'top top',
            end:        'bottom bottom',
            scrub:      0.3,
          },
        })
      }

    }) // gsap.context

    // Refresh ScrollTrigger after a short delay (allows images/fonts to settle)
    const timer = setTimeout(() => ScrollTrigger.refresh(), 300)

    return () => {
      ctx.revert()
      clearTimeout(timer)
    }
  }, [])

  // Render the scroll progress bar (position: fixed, top 0)
  return (
    <div
      id="scroll-progress"
      aria-hidden="true"
      style={{
        position:        'fixed',
        top:             0,
        left:            0,
        right:           0,
        height:          '2px',
        zIndex:          100,
        transformOrigin: 'left center',
        transform:       'scaleX(0)',
        background:      'linear-gradient(90deg, var(--color-accent), var(--color-accent-hover))',
        pointerEvents:   'none',
      }}
    />
  )
}
