/**
 * Card.tsx
 *
 * Base card and specialised variants for project and skill cards.
 *
 * Usage:
 *   <Card hover>Generic card content</Card>
 *   <ProjectCard title="…" tags={[…]} href="…" image="…" />
 *   <SkillCard label="React" icon={<ReactIcon />} level={90} />
 *   <TagBadge>TypeScript</TagBadge>
 */

import { type ReactNode, type HTMLAttributes, forwardRef } from 'react'

// ────────────────────────────────────────────────────────────
// Base Card
// ────────────────────────────────────────────────────────────
interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Enables hover elevation + border-glow animation */
  hover?:      boolean
  /** Use smaller internal padding */
  compact?:    boolean
  children:    ReactNode
  className?:  string
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ hover, compact, children, className = '', ...rest }, ref) => {
    return (
      <div
        ref={ref}
        className={[
          'card',
          hover   ? 'card-hover' : '',
          compact ? 'card-pad-sm' : 'card-pad',
          className,
        ].filter(Boolean).join(' ')}
        {...rest}
      >
        {children}
      </div>
    )
  },
)
Card.displayName = 'Card'

// ────────────────────────────────────────────────────────────
// TagBadge  (tech tag pill)
// ────────────────────────────────────────────────────────────
interface TagBadgeProps {
  children:  ReactNode
  className?: string
}

export function TagBadge({ children, className = '' }: TagBadgeProps) {
  return (
    <span
      className={[
        'inline-flex items-center px-2.5 py-0.5',
        'text-xs font-medium tracking-wide',
        'bg-accent-dim text-accent',
        'rounded-full border border-accent/20',
        className,
      ].filter(Boolean).join(' ')}
    >
      {children}
    </span>
  )
}

// ────────────────────────────────────────────────────────────
// ProjectCard
// ────────────────────────────────────────────────────────────
interface ProjectCardProps {
  title:       string
  description: string
  tags?:       string[]
  href?:       string
  image?:      string
  /** e.g. "01" — displayed as large decorative number */
  index?:      string
  className?:  string
}

export function ProjectCard({
  title,
  description,
  tags = [],
  href,
  image,
  index,
  className = '',
}: ProjectCardProps) {
  const Inner = (
    <article className="h-full flex flex-col">
      {/* Image / placeholder area */}
      {image ? (
        <div className="relative h-48 md:h-56 -mx-7 -mt-7 mb-6 overflow-hidden bg-surface-2">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
      ) : (
        <div className="relative h-48 md:h-56 -mx-7 -mt-7 mb-6 overflow-hidden bg-surface-2 flex items-center justify-center">
          {/* Decorative index number */}
          {index && (
            <span
              aria-hidden="true"
              className="text-[6rem] font-bold leading-none select-none"
              style={{ color: 'var(--color-border)' }}
            >
              {index}
            </span>
          )}
          {/* Subtle grid overlay */}
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                'linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)',
              backgroundSize: '32px 32px',
            }}
          />
        </div>
      )}

      {/* Content */}
      <div className="flex flex-col flex-1 gap-3">
        <h3 className="text-lg font-semibold -tracking-tight text-primary transition-colors duration-200 group-hover:text-accent">
          {title}
        </h3>
        <p className="text-sm text-muted leading-relaxed flex-1">
          {description}
        </p>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {tags.map((tag) => (
              <TagBadge key={tag}>{tag}</TagBadge>
            ))}
          </div>
        )}

        {/* CTA arrow */}
        {href && (
          <div className="flex items-center gap-1 mt-2 text-xs font-medium text-accent tracking-wide group-hover:gap-2 transition-all duration-200">
            <span>View project</span>
            <span aria-hidden="true">→</span>
          </div>
        )}
      </div>
    </article>
  )

  const cardClasses = [
    'card card-hover card-pad group flex flex-col',
    'focus-ring',
    className,
  ].filter(Boolean).join(' ')

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cardClasses}
        aria-label={`View project: ${title}`}
      >
        {Inner}
      </a>
    )
  }

  return (
    <div className={cardClasses}>
      {Inner}
    </div>
  )
}

// ────────────────────────────────────────────────────────────
// SkillCard
// ────────────────────────────────────────────────────────────
interface SkillCardProps {
  label:      string
  sublabel?:  string
  icon?:      ReactNode
  /** 0–100 proficiency percentage (renders progress bar if provided) */
  level?:     number
  className?: string
}

export function SkillCard({
  label,
  sublabel,
  icon,
  level,
  className = '',
}: SkillCardProps) {
  return (
    <div
      className={[
        'card card-hover card-pad-sm flex flex-col gap-3 group',
        className,
      ].filter(Boolean).join(' ')}
    >
      {/* Icon */}
      {icon && (
        <div className="w-10 h-10 rounded-md bg-accent-dim flex items-center justify-center text-accent transition-transform duration-300 group-hover:scale-110">
          {icon}
        </div>
      )}

      {/* Label */}
      <div>
        <p className="text-sm font-semibold text-primary">{label}</p>
        {sublabel && (
          <p className="text-xs text-muted mt-0.5">{sublabel}</p>
        )}
      </div>

      {/* Proficiency bar */}
      {typeof level === 'number' && (
        <div
          role="meter"
          aria-valuenow={level}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${label} proficiency: ${level}%`}
          className="h-0.5 rounded-full bg-surface-2 overflow-hidden"
        >
          <div
            className="h-full rounded-full bg-accent transition-[width] duration-700 ease-out"
            style={{ width: `${level}%` }}
          />
        </div>
      )}
    </div>
  )
}

// ────────────────────────────────────────────────────────────
// StatCard  (for "years experience", "projects shipped", etc.)
// ────────────────────────────────────────────────────────────
interface StatCardProps {
  value:      string
  label:      string
  className?: string
}

export function StatCard({ value, label, className = '' }: StatCardProps) {
  return (
    <div
      className={[
        'card card-pad-sm flex flex-col gap-1',
        className,
      ].filter(Boolean).join(' ')}
    >
      <span className="text-4xl font-bold gradient-text leading-none">{value}</span>
      <span className="text-xs text-muted tracking-wide uppercase">{label}</span>
    </div>
  )
}
