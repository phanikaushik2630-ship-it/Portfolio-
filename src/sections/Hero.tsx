/**
 * Hero.tsx
 *
 * Full-viewport hero section with:
 *   • Layered 3D + parallax + text depth system
 *   • React Three Fiber canvas (TorusKnot, OrbitControls, lighting rig)
 *   • GSAP staggered entrance animation (text + CTA)
 *   • Mouse-driven parallax on the background layer (desktop)
 *   • Graceful degradation on mobile / reduced-motion preferences
 *   • Fully responsive layout from 375px mobile to 1920px+ desktop
 */

import { useRef, useEffect, useState, Suspense, lazy, useCallback } from 'react'
import { gsap, initGSAP } from '@/lib/gsap'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { Button } from '@/components/ui'

// Lazy-load the 3D canvas visual to preserve initial load speed
const HeroCanvas = lazy(() => import('@/components/three/HeroCanvas'))

// ── Scroll indicator ───────────────────────────────────────
function ScrollIndicator() {
  return (
    <div
      className="hidden sm:flex absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 opacity-0 pointer-events-none z-20"
      id="hero-scroll"
    >
      <span className="text-[10px] md:text-xs tracking-widest uppercase text-subtle font-medium font-mono">
        Scroll
      </span>
      <span
        className="block w-px h-8 md:h-10 origin-top"
        style={{
          background: 'linear-gradient(to bottom, var(--color-accent), transparent)',
          animation:  'scrollLine 2s ease-in-out infinite',
        }}
        aria-hidden="true"
      />
    </div>
  )
}

// ── 3D Scene Loading Fallback ──────────────────────────────
function Hero3DFallback() {
  return (
    <div
      aria-hidden="true"
      className="w-full h-full flex items-center justify-center pointer-events-none"
    >
      <div className="relative w-48 h-48 sm:w-64 sm:h-64 flex items-center justify-center">
        {/* Ambient Pulsing Halo */}
        <div className="absolute inset-0 rounded-full border border-accent/20 animate-ping opacity-25" />
        <div
          className="absolute inset-4 rounded-full border border-dashed border-accent/30 animate-spin"
          style={{ animationDuration: '16s' }}
        />
        <div className="w-24 h-24 rounded-full bg-accent/10 blur-xl animate-pulse" />
        <span className="text-[10px] font-mono tracking-widest uppercase text-accent/60 select-none">
          3D · Initializing
        </span>
      </div>
    </div>
  )
}

// ── Background radial gradient layer ──────────────────────
function HeroBackground({ x, y, reduced }: { x: number; y: number; reduced: boolean }) {
  return (
    <div
      id="hero-parallax-bg"
      aria-hidden="true"
      className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
      style={{
        transform:  reduced ? 'none' : `translate(${x * 0.015}px, ${y * 0.015}px)`,
        transition: 'transform 0.8s cubic-bezier(0.25,0.46,0.45,0.94)',
      }}
    >
      {/* Accent glow following 3D visual position */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 70% 60% at 75% 50%,
              rgba(200, 169, 110, 0.12) 0%,
              rgba(200, 169, 110, 0.03) 45%,
              transparent 70%
            ),
            radial-gradient(ellipse 50% 50% at 20% 30%,
              rgba(107, 125, 232, 0.06) 0%,
              transparent 60%
            )
          `,
        }}
      />

      {/* Subtle horizontal grid lines */}
      <div
        className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(200,169,110,0.08) 25%, rgba(200,169,110,0.08) 75%, transparent)',
        }}
      />

      {/* Tech dot grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            'radial-gradient(circle, var(--color-text-muted) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
    </div>
  )
}

// ── Main Hero component ────────────────────────────────────
export default function Hero() {
  const sectionRef    = useRef<HTMLElement>(null)
  const availRef      = useRef<HTMLSpanElement>(null)
  const titleRef      = useRef<HTMLHeadingElement>(null)
  const roleRef       = useRef<HTMLParagraphElement>(null)
  const statementRef  = useRef<HTMLParagraphElement>(null)
  const ctaRef        = useRef<HTMLDivElement>(null)
  const dividerRef    = useRef<HTMLDivElement>(null)
  const statsRef      = useRef<HTMLDivElement>(null)

  const [mouse, setMouse] = useState({ x: 0, y: 0 })

  // Breakpoints & capability flags
  const isMobile       = useMediaQuery('(max-width: 767px)')
  const prefersReduced = useMediaQuery('(prefers-reduced-motion: reduce)')
  const reduced        = isMobile || prefersReduced

  // Mouse parallax handler (active only on non-mobile desktop devices)
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (reduced) return
    const rect = sectionRef.current?.getBoundingClientRect()
    if (!rect) return
    setMouse({
      x: e.clientX - rect.width  / 2,
      y: e.clientY - rect.height / 2,
    })
  }, [reduced])

  // GSAP Entrance Timeline
  useEffect(() => {
    initGSAP()

    if (prefersReduced) {
      gsap.set(
        [
          availRef.current,
          titleRef.current,
          roleRef.current,
          statementRef.current,
          dividerRef.current,
          ctaRef.current,
          statsRef.current,
          '#hero-scroll',
        ],
        { opacity: 1, y: 0 },
      )
      return
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.25 })

      tl.fromTo(
        availRef.current,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
      )
        .fromTo(
          titleRef.current,
          { opacity: 0, y: 40, skewX: -1 },
          { opacity: 1, y: 0, skewX: 0, duration: 0.85, ease: 'expo.out' },
          '-=0.2',
        )
        .fromTo(
          dividerRef.current,
          { scaleX: 0, transformOrigin: 'left center' },
          { scaleX: 1, duration: 0.5, ease: 'power2.inOut' },
          '-=0.4',
        )
        .fromTo(
          roleRef.current,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out' },
          '-=0.3',
        )
        .fromTo(
          statementRef.current,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
          '-=0.3',
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out' },
          '-=0.2',
        )
        .fromTo(
          statsRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out' },
          '-=0.2',
        )
        .fromTo(
          '#hero-scroll',
          { opacity: 0 },
          { opacity: 1, duration: 0.6 },
          '-=0.1',
        )
    }, sectionRef)

    return () => ctx.revert()
  }, [prefersReduced])

  const handleViewWork = () => {
    document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' })
  }
  const handleContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      ref={sectionRef}
      aria-label="Hero — Phanindra Kaushik Chennu"
      onMouseMove={handleMouseMove}
      className="relative min-h-[100svh] w-full max-w-full overflow-hidden bg-base flex items-center"
    >
      {/* ── Layer 0: Parallax background ─────────────── */}
      <HeroBackground x={mouse.x} y={mouse.y} reduced={reduced} />

      {/* ── Layer 1: 3D Canvas ───────────────────────── */}
      <div
        aria-hidden="true"
        className={[
          'absolute inset-0 z-10 overflow-hidden',
          isMobile
            ? 'opacity-25 pointer-events-none scale-90'
            : 'left-[38%] xl:left-[42%] opacity-100 pointer-events-auto',
        ].join(' ')}
        style={{
          background:  'transparent',
          transform:   isMobile ? 'none' : `translate(${mouse.x * -0.006}px, ${mouse.y * -0.005}px)`,
          transition:  'transform 1s cubic-bezier(0.25,0.46,0.45,0.94)',
        }}
      >
        <Suspense fallback={<Hero3DFallback />}>
          <HeroCanvas reduced={reduced} />
        </Suspense>
      </div>

      {/* ── Layer 2: Text content ─────────────────────── */}
      <div
        className={[
          'relative z-20 w-full section-inner',
          'flex flex-col justify-center',
          'pt-24 pb-14 sm:pt-28 sm:pb-16 md:pt-32 md:pb-24',
          isMobile ? 'max-w-full' : 'md:max-w-[62%] lg:max-w-[56%] xl:max-w-[52%]',
        ].join(' ')}
        style={{
          transform:  reduced ? 'none' : `translate(${mouse.x * 0.003}px, ${mouse.y * 0.002}px)`,
          transition: 'transform 1.2s cubic-bezier(0.25,0.46,0.45,0.94)',
        }}
      >
        {/* Availability tag */}
        <span
          ref={availRef}
          className="label-tag mb-4 sm:mb-6 opacity-0 text-xs"
          role="status"
          aria-label="Currently available for work"
        >
          Available for work
        </span>

        {/* Name with responsive clamp */}
        <h1
          ref={titleRef}
          className="opacity-0 font-bold font-sans leading-[0.98] tracking-tighter text-primary mb-4 break-words"
          style={{ fontSize: 'clamp(2.2rem, 7vw, 5.25rem)' }}
        >
          Phanindra{' '}
          <br className="hidden xs:block sm:block" />
          <span className="gradient-text">Kaushik</span>{' '}
          <br className="hidden xs:block sm:block" />
          Chennu
        </h1>

        {/* Decorative divider */}
        <div
          ref={dividerRef}
          aria-hidden="true"
          className="h-px w-20 sm:w-24 mb-4 sm:mb-5 opacity-0 bg-accent"
        />

        {/* Role Subtitle */}
        <p
          ref={roleRef}
          className="opacity-0 text-xs sm:text-sm md:text-base font-semibold tracking-wide text-muted mb-3 sm:mb-4 uppercase leading-snug"
        >
          Computer Science Engineering Student
          <span className="text-accent mx-1.5 sm:mx-2">·</span>
          Full Stack Developer
        </p>

        {/* Positioning statement */}
        <p
          ref={statementRef}
          className="opacity-0 text-base sm:text-lg md:text-xl text-muted leading-relaxed max-w-lg mb-8 sm:mb-10"
        >
          Building AI-powered and full-stack applications, from{' '}
          <em className="not-italic text-primary font-medium">
            conversational platforms
          </em>{' '}
          to{' '}
          <em className="not-italic text-primary font-medium">
            real-time systems.
          </em>
        </p>

        {/* CTA Buttons (Minimum 44px touch targets) */}
        <div
          ref={ctaRef}
          className="opacity-0 flex flex-col xs:flex-row sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4"
        >
          <Button
            id="hero-cta-primary"
            variant="primary"
            size="lg"
            onClick={handleViewWork}
            className="min-h-[44px] justify-center text-sm font-semibold"
            icon={
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                aria-hidden="true"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            }
            iconPosition="right"
          >
            View Work
          </Button>

          <Button
            id="hero-cta-secondary"
            variant="ghost"
            size="lg"
            onClick={handleContact}
            className="min-h-[44px] justify-center text-sm font-semibold"
          >
            Get in touch
          </Button>
        </div>

        {/* Social Proof / Stats Grid */}
        <div
          ref={statsRef}
          className="mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-default grid grid-cols-3 gap-3 sm:gap-6 md:flex md:gap-8 opacity-0"
        >
          {[
            { value: 'B.Tech', label: 'CSE (2024–28)' },
            { value: 'AI',     label: 'Full-Stack Apps' },
            { value: '4+',     label: 'Solo Projects' },
          ].map(({ value, label }) => (
            <div key={label} className="flex flex-col gap-0.5">
              <span className="text-xl sm:text-2xl font-bold gradient-text leading-none font-mono">
                {value}
              </span>
              <span className="text-[10px] sm:text-xs text-subtle tracking-wider uppercase font-medium mt-1">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Scroll indicator ─────────────────────────── */}
      <ScrollIndicator />

      {/* ── CSS keyframes ────────────────────────────── */}
      <style>{`
        @keyframes scrollLine {
          0%   { transform: scaleY(0);   opacity: 0; transform-origin: top; }
          30%  { transform: scaleY(1);   opacity: 1; transform-origin: top; }
          70%  { transform: scaleY(1);   opacity: 1; transform-origin: bottom; }
          100% { transform: scaleY(0);   opacity: 0; transform-origin: bottom; }
        }
      `}</style>
    </section>
  )
}
