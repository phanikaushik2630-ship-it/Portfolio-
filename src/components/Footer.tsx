const FOOTER_LINKS = [
  { label: 'GitHub',   href: 'https://github.com/phanikaushik2630-ship-it' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/phanindra-kaushik-chennu-aa9114335/' },
  { label: 'Email',    href: 'mailto:phanikaushik2630@gmail.com' },
  { label: 'Projects', href: '#work' },
] as const

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      id="site-footer"
      role="contentinfo"
      className="relative border-t border-default bg-surface-1"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left — copyright & name */}
        <div className="flex flex-col md:flex-row items-center gap-2 text-center md:text-left">
          <p className="text-sm text-muted">
            &copy; {year}{' '}
            <span className="text-accent font-semibold">Phanindra Kaushik Chennu</span>.
            All rights reserved.
          </p>
        </div>

        {/* Right — social / quick links */}
        <nav aria-label="Social links" className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          {FOOTER_LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
              aria-label={`Visit ${label}`}
              className="text-xs font-medium uppercase tracking-wider text-muted hover:text-accent transition-colors duration-200 min-h-[44px] min-w-[44px] flex items-center justify-center px-2 focus-ring"
            >
              {label}
            </a>
          ))}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            className="text-xs font-medium uppercase tracking-wider text-accent hover:underline min-h-[44px] flex items-center px-2 focus-ring"
          >
            ↑ Top
          </a>
        </nav>
      </div>
    </footer>
  )
}
