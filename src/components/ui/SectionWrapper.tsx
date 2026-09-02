/**
 * SectionWrapper.tsx
 *
 * Enforces consistent vertical rhythm, max-width, and horizontal padding
 * across all page sections. Handles the "alt" (surface-1) background variant.
 * Responsive from 375px to 1920px+.
 */

import { type ReactNode, type HTMLAttributes, forwardRef } from 'react'

// ────────────────────────────────────────────────────────────
// SectionWrapper
// ────────────────────────────────────────────────────────────
interface SectionWrapperProps extends HTMLAttributes<HTMLElement> {
  id:         string
  alt?:       boolean
  fullBleed?: boolean
  label?:     string
  children:   ReactNode
  className?: string
}

export const SectionWrapper = forwardRef<HTMLElement, SectionWrapperProps>(
  ({ id, alt, fullBleed, label, children, className = '', ...rest }, ref) => {
    return (
      <section
        id={id}
        ref={ref}
        aria-label={label ?? id}
        className={[
          'py-16 sm:py-20 md:py-28 lg:py-32 xl:py-36 relative overflow-hidden',
          alt ? 'bg-surface-1' : 'bg-base',
          className,
        ].filter(Boolean).join(' ')}
        {...rest}
      >
        {fullBleed ? (
          children
        ) : (
          <div className="section-inner w-full">
            {children}
          </div>
        )}
      </section>
    )
  },
)
SectionWrapper.displayName = 'SectionWrapper'

// ────────────────────────────────────────────────────────────
// SectionHeader  (label + heading block above section content)
// ────────────────────────────────────────────────────────────
interface SectionHeaderProps {
  label?:     string
  heading:    ReactNode
  sub?:       ReactNode
  align?:     'left' | 'center'
  className?: string
}

export function SectionHeader({
  label,
  heading,
  sub,
  align = 'left',
  className = '',
}: SectionHeaderProps) {
  return (
    <div
      className={[
        'mb-10 sm:mb-12 md:mb-16',
        align === 'center' ? 'text-center' : '',
        className,
      ].filter(Boolean).join(' ')}
    >
      {label && (
        <span className="label-tag mb-3 sm:mb-4 block text-xs">
          {label}
        </span>
      )}
      <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.12] -tracking-[0.02em] text-primary break-words">
        {heading}
      </div>
      {sub && (
        <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-muted max-w-2xl leading-relaxed">
          {sub}
        </p>
      )}
    </div>
  )
}

// ────────────────────────────────────────────────────────────
// SectionGrid  (responsive column grid)
// ────────────────────────────────────────────────────────────
interface SectionGridProps extends HTMLAttributes<HTMLDivElement> {
  cols?:      1 | 2 | 3 | 4
  children:   ReactNode
  className?: string
}

const colsMap: Record<number, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
}

export function SectionGrid({
  cols = 3,
  children,
  className = '',
  ...rest
}: SectionGridProps) {
  return (
    <div
      className={[
        'grid gap-5 sm:gap-6 md:gap-8',
        colsMap[cols] ?? colsMap[3],
        className,
      ].filter(Boolean).join(' ')}
      {...rest}
    >
      {children}
    </div>
  )
}

// ────────────────────────────────────────────────────────────
// Divider
// ────────────────────────────────────────────────────────────
export function Divider({ className = '' }: { className?: string }) {
  return <hr className={['divider-line', className].filter(Boolean).join(' ')} />
}
