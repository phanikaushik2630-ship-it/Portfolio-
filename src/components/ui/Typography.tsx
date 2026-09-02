/**
 * Typography.tsx
 *
 * Polymorphic heading, subheading, body-text, and eyebrow-label components.
 * Every size variant maps to the design token type scale.
 */

import React, {
  type ReactNode,
  type HTMLAttributes,
  forwardRef,
} from 'react'

// ────────────────────────────────────────────────────────────
// Heading
// ────────────────────────────────────────────────────────────
const headingSizeMap: Record<string, string> = {
  '8xl': 'text-8xl leading-[0.95] -tracking-[0.04em]',
  '7xl': 'text-7xl leading-[0.97] -tracking-[0.03em]',
  '6xl': 'text-6xl leading-[1.0]  -tracking-[0.025em]',
  '5xl': 'text-5xl leading-[1.05] -tracking-[0.02em]',
  '4xl': 'text-4xl leading-[1.1]  -tracking-[0.015em]',
  '3xl': 'text-3xl leading-[1.15] -tracking-[0.01em]',
  '2xl': 'text-2xl leading-[1.2]  -tracking-[0.005em]',
  'xl':  'text-xl  leading-[1.25]',
}

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  as?:       'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'span'
  size?:     keyof typeof headingSizeMap
  gradient?: boolean
  muted?:    boolean
  children:  ReactNode
  className?: string
}

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ as = 'h2', size = '4xl', gradient, muted, children, className = '', ...rest }, ref) => {
    const sizeClass  = headingSizeMap[size] ?? headingSizeMap['4xl']
    const colorClass = gradient
      ? 'gradient-text'
      : muted
        ? 'text-muted'
        : 'text-primary'

    const Tag = as as keyof React.JSX.IntrinsicElements

    return React.createElement(
      Tag,
      {
        ref,
        className: ['font-bold font-sans', sizeClass, colorClass, className]
          .filter(Boolean)
          .join(' '),
        ...rest,
      },
      children,
    )
  },
)
Heading.displayName = 'Heading'

// ────────────────────────────────────────────────────────────
// Subheading
// ────────────────────────────────────────────────────────────
interface SubheadingProps extends HTMLAttributes<HTMLHeadingElement> {
  as?:      'h2' | 'h3' | 'h4' | 'h5' | 'div' | 'p'
  size?:    'xl' | '2xl' | '3xl'
  muted?:   boolean
  children: ReactNode
  className?: string
}

export const Subheading = forwardRef<HTMLHeadingElement, SubheadingProps>(
  ({ as = 'h3', size = '2xl', muted, children, className = '', ...rest }, ref) => {
    const sizeMap = { xl: 'text-xl', '2xl': 'text-2xl', '3xl': 'text-3xl' }
    const Tag = as as keyof React.JSX.IntrinsicElements

    return React.createElement(
      Tag,
      {
        ref,
        className: [
          'font-semibold font-sans leading-snug -tracking-[0.01em]',
          sizeMap[size],
          muted ? 'text-muted' : 'text-primary',
          className,
        ]
          .filter(Boolean)
          .join(' '),
        ...rest,
      },
      children,
    )
  },
)
Subheading.displayName = 'Subheading'

// ────────────────────────────────────────────────────────────
// Body
// ────────────────────────────────────────────────────────────
const bodySizeMap: Record<string, string> = {
  sm:   'text-sm  leading-relaxed',
  base: 'text-base leading-relaxed',
  lg:   'text-lg  leading-relaxed',
  xl:   'text-xl  leading-relaxed',
}

interface BodyProps extends HTMLAttributes<HTMLParagraphElement> {
  as?:      'p' | 'span' | 'div'
  size?:    keyof typeof bodySizeMap
  muted?:   boolean
  subtle?:  boolean
  children: ReactNode
  className?: string
}

export const Body = forwardRef<HTMLParagraphElement, BodyProps>(
  ({ as = 'p', size = 'base', muted, subtle, children, className = '', ...rest }, ref) => {
    const sizeClass  = bodySizeMap[size] ?? bodySizeMap['base']
    const colorClass = subtle ? 'text-subtle' : muted ? 'text-muted' : 'text-primary'
    const Tag = as as keyof React.JSX.IntrinsicElements

    return React.createElement(
      Tag,
      {
        ref,
        className: ['font-normal font-sans', sizeClass, colorClass, className]
          .filter(Boolean)
          .join(' '),
        ...rest,
      },
      children,
    )
  },
)
Body.displayName = 'Body'

// ────────────────────────────────────────────────────────────
// Label
// ────────────────────────────────────────────────────────────
interface LabelProps extends HTMLAttributes<HTMLSpanElement> {
  children:  ReactNode
  className?: string
}

export function Label({ children, className = '', ...rest }: LabelProps) {
  return (
    <span
      className={['label-tag mb-3 block', className].filter(Boolean).join(' ')}
      {...rest}
    >
      {children}
    </span>
  )
}
