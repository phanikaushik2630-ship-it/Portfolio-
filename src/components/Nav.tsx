import { useState, useEffect, useRef } from 'react'

const NAV_LINKS = [
  { label: 'About',   href: '#about'   },
  { label: 'Skills',  href: '#skills'  },
  { label: 'Work',    href: '#work'    },
  { label: 'Contact', href: '#contact' },
] as const

export default function Nav() {
  const [scrolled,  setScrolled]  = useState(false)
  const [hidden,    setHidden]     = useState(false)
  const [menuOpen,  setMenuOpen]   = useState(false)
  const lastScrollY = useRef(0)

  // Scroll listener for sticky glass header
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY
      const delta    = currentY - lastScrollY.current

      setScrolled(currentY > 20)

      // Hide nav on scroll-down, show on scroll-up (after 80px)
      if (currentY > 80 && !menuOpen) {
        setHidden(delta > 5)
      } else {
        setHidden(false)
      }

      lastScrollY.current = currentY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [menuOpen])

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && menuOpen) {
        setMenuOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [menuOpen])

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const handleAnchorClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault()
    setMenuOpen(false)
    const target = document.querySelector(href)
    target?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <header
        id="site-nav"
        role="banner"
        style={{
          transform: hidden && !menuOpen ? 'translateY(-100%)' : 'translateY(0)',
          transition: 'transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        }}
        className={[
          'fixed top-0 left-0 right-0 z-50',
          scrolled || menuOpen ? 'glass border-b border-default' : 'bg-transparent',
          'transition-[background,border] duration-300',
        ].join(' ')}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 h-16 md:h-18 flex items-center justify-between">
          {/* Logo / wordmark - Minimum 44px touch area */}
          <a
            href="#"
            aria-label="Back to top"
            onClick={(e) => {
              e.preventDefault()
              setMenuOpen(false)
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            className="flex items-center gap-2 group min-h-[44px] py-1 focus-ring"
          >
            <span className="w-8 h-8 rounded-lg bg-accent-dim border border-accent/30 flex items-center justify-center text-accent font-mono font-black text-sm group-hover:scale-105 transition-transform duration-200">
              PK
            </span>
            <span className="text-sm sm:text-base font-bold tracking-tight text-primary group-hover:text-accent transition-colors duration-200">
              Kaushik Chennu
            </span>
          </a>

          {/* Desktop Links (>= 768px tablet & above) */}
          <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-6 lg:gap-8">
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                onClick={(e) => handleAnchorClick(e, href)}
                className="nav-link text-sm font-medium text-muted hover:text-primary transition-colors duration-200 min-h-[44px] flex items-center px-2"
              >
                {label}
              </a>
            ))}

            {/* Desktop CTA Button */}
            <a
              href="#contact"
              onClick={(e) => handleAnchorClick(e, '#contact')}
              className="text-sm font-semibold px-4 py-2.5 rounded-lg border border-accent text-accent hover:bg-accent hover:text-bg transition-all duration-200 min-h-[44px] flex items-center"
            >
              Get in touch
            </a>
          </nav>

          {/* Mobile Hamburger Button (< 768px) - 44px min touch target */}
          <button
            id="mobile-menu-btn"
            type="button"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden min-w-[44px] min-h-[44px] flex flex-col items-center justify-center gap-1.5 p-2.5 rounded-lg focus-ring text-primary"
          >
            <span
              className={[
                'block w-6 h-0.5 bg-current transition-transform duration-300',
                menuOpen ? 'translate-y-2 rotate-45' : '',
              ].join(' ')}
            />
            <span
              className={[
                'block w-6 h-0.5 bg-current transition-opacity duration-300',
                menuOpen ? 'opacity-0' : '',
              ].join(' ')}
            />
            <span
              className={[
                'block w-6 h-0.5 bg-current transition-transform duration-300',
                menuOpen ? '-translate-y-2 -rotate-45' : '',
              ].join(' ')}
            />
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        <div
          id="mobile-menu"
          aria-hidden={!menuOpen}
          className={[
            'md:hidden glass border-t border-default overflow-hidden transition-[max-height,opacity] duration-300',
            menuOpen ? 'max-h-[380px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none',
          ].join(' ')}
        >
          <nav className="flex flex-col px-6 py-4 gap-2" aria-label="Mobile navigation">
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                onClick={(e) => handleAnchorClick(e, href)}
                className="text-base font-medium text-muted hover:text-primary transition-colors duration-200 min-h-[44px] flex items-center px-3 rounded-lg hover:bg-surface-2"
              >
                {label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={(e) => handleAnchorClick(e, '#contact')}
              className="text-sm font-semibold px-4 min-h-[44px] flex items-center justify-center rounded-lg border border-accent text-accent text-center mt-2 bg-accent-dim active:scale-95 transition-transform"
            >
              Get in touch →
            </a>
          </nav>
        </div>
      </header>

      {/* Backdrop overlay when mobile menu is open */}
      {menuOpen && (
        <div
          aria-hidden="true"
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden animate-fade-in"
        />
      )}
    </>
  )
}
