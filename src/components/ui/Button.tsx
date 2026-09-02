/**
 * Button.tsx
 *
 * Variants: primary | ghost | subtle
 * Sizes:    sm | md | lg
 * Supports: as (anchor/button), href, disabled, loading, icon slots.
 */

import {
  forwardRef,
  type ReactNode,
  type ButtonHTMLAttributes,
  type AnchorHTMLAttributes,
} from 'react'

type Variant = 'primary' | 'ghost' | 'subtle'
type Size    = 'sm' | 'md' | 'lg'

type ButtonBaseProps = {
  variant?:      Variant
  size?:         Size
  loading?:      boolean
  disabled?:     boolean
  icon?:         ReactNode
  iconPosition?: 'left' | 'right'
  children?:     ReactNode
  className?:    string
}

type AsButton = ButtonBaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { as?: 'button'; href?: never }

type AsAnchor = ButtonBaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { as: 'a'; href: string }

type ButtonProps = AsButton | AsAnchor

const variantClass: Record<Variant, string> = {
  primary: 'btn-primary',
  ghost:   'btn-ghost',
  subtle:  'btn-subtle',
}

const sizeClass: Record<Size, string> = {
  sm: 'btn-sm',
  md: 'btn-md',
  lg: 'btn-lg',
}

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (props, ref) => {
    const {
      as,
      variant = 'primary',
      size    = 'md',
      loading = false,
      disabled,
      icon,
      iconPosition = 'left',
      children,
      className = '',
      ...rest
    } = props

    const isDisabled = disabled || loading

    const classes = [
      'btn focus-ring',
      variantClass[variant],
      sizeClass[size],
      className,
    ].filter(Boolean).join(' ')

    const iconNode = icon && (
      <span className="shrink-0 flex items-center" aria-hidden="true">
        {icon}
      </span>
    )

    const content = (
      <>
        {!loading && iconPosition === 'left'  && iconNode}

        {loading ? (
          <span className="flex items-center gap-2">
            <svg
              className="animate-spin h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle
                className="opacity-25"
                cx="12" cy="12" r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              />
            </svg>
            {children}
          </span>
        ) : (
          children
        )}

        {!loading && iconPosition === 'right' && iconNode}
      </>
    )

    if (as === 'a') {
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          className={classes}
          aria-disabled={isDisabled}
          tabIndex={isDisabled ? -1 : undefined}
          {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {content}
        </a>
      )
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={classes}
        disabled={isDisabled}
        aria-busy={loading}
        {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {content}
      </button>
    )
  },
)

Button.displayName = 'Button'
