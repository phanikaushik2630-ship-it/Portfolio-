/**
 * About.tsx
 *
 * About section for Phanindra Kaushik Chennu.
 * Highlights academic background at DMSSVH College of Engineering / JNTUK,
 * engineering philosophy, and core focus areas with a high-end avatar display.
 */

import { SectionWrapper, SectionHeader, Card, TagBadge, Button } from '@/components/ui'

export default function About() {
  const handleScrollToWork = () => {
    document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleScrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <SectionWrapper id="about" label="About Phanindra Kaushik Chennu" className="relative overflow-hidden">
      {/* Decorative parallax ambient orb */}
      <div
        id="about-parallax-orb"
        aria-hidden="true"
        className="absolute top-1/4 -right-28 w-96 h-96 rounded-full pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle, rgba(200, 169, 110, 0.08) 0%, rgba(200, 169, 110, 0.02) 40%, transparent 70%)',
        }}
      />

      <div className="relative z-10">
        <SectionHeader
          label="About Me"
          heading={
            <span>
              Passionate about <span className="gradient-text">computer science fundamentals</span> & practical software craftsmanship.
            </span>
          }
          sub="Bridging rigorous engineering theory with modern, user-centric full-stack development."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Column: Avatar & Quick Profile Card */}
          <div data-reveal data-reveal-y="30" className="lg:col-span-5 flex flex-col items-center">
            <div className="relative group w-full max-w-sm">
              {/* Outer Glow & Gradient Border */}
              <div
                className="absolute -inset-0.5 rounded-2xl bg-gradient-to-br from-accent/40 via-accent/10 to-transparent opacity-60 blur-md group-hover:opacity-100 transition duration-500"
                aria-hidden="true"
              />

              {/* Avatar Container */}
              <div className="relative rounded-2xl bg-surface-1 border border-default p-5 sm:p-6 overflow-hidden flex flex-col items-center text-center">
                {/* Visual Avatar Placeholder with Monogram & Tech Frame */}
                <div className="relative w-36 h-36 sm:w-44 sm:h-44 my-3 sm:my-4 rounded-2xl bg-surface-2 border border-accent/30 flex items-center justify-center shadow-inner overflow-hidden group">
                  {/* Subtle Grid Pattern */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage:
                        'linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)',
                      backgroundSize: '20px 20px',
                    }}
                  />

                  {/* Monogram Graphics */}
                  <div className="relative z-10 flex flex-col items-center justify-center">
                    <span className="text-4xl sm:text-5xl font-black gradient-text tracking-tighter select-none font-sans">
                      PKC
                    </span>
                    <span className="text-[9px] sm:text-[10px] tracking-widest uppercase text-muted mt-1 font-semibold">
                      Engineering Portfolio
                    </span>
                  </div>

                  {/* Corner Accent Indicators */}
                  <div className="absolute top-2 left-2 w-2 h-2 border-t-2 border-l-2 border-accent" />
                  <div className="absolute top-2 right-2 w-2 h-2 border-t-2 border-r-2 border-accent" />
                  <div className="absolute bottom-2 left-2 w-2 h-2 border-b-2 border-l-2 border-accent" />
                  <div className="absolute bottom-2 right-2 w-2 h-2 border-b-2 border-r-2 border-accent" />
                </div>

                {/* Profile Meta */}
                <h3 className="text-lg sm:text-xl font-bold text-primary mt-2">
                  Phanindra Kaushik Chennu
                </h3>
                <p className="text-xs font-medium text-accent tracking-wide uppercase mt-1">
                  Computer Science Engineer
                </p>

                {/* Status Pill */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 mt-3 sm:mt-4 rounded-full bg-accent-dim border border-accent/20 text-xs text-accent">
                  <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                  <span>Open to Internships & Roles</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative Bio & Academic Milestone Cards */}
          <div data-reveal data-reveal-y="40" data-reveal-delay="0.15" className="lg:col-span-7 flex flex-col gap-6">
            {/* Primary Bio Card */}
            <Card hover className="flex flex-col gap-4">
              <h4 className="text-lg font-bold text-primary flex items-center gap-2">
                <span className="w-1.5 h-5 bg-accent rounded-full inline-block" />
                Background & Engineering Focus
              </h4>
              <p className="text-base text-muted leading-relaxed">
                I am a <strong className="text-primary font-semibold">Computer Science Engineering student (2024–2028)</strong> at{' '}
                <span className="text-primary font-medium">DMSSVH College of Engineering</span>, affiliated with{' '}
                <span className="text-primary font-medium">JNTUK University, Machilipatnam</span>.
              </p>
              <p className="text-base text-muted leading-relaxed">
                Focused on building strong fundamentals in data structures &amp; algorithms, software engineering, and full stack development.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                <TagBadge>Data Structures & Algorithms (DSA)</TagBadge>
                <TagBadge>Software Engineering</TagBadge>
                <TagBadge>Full Stack Development</TagBadge>
                <TagBadge>DBMS & Systems</TagBadge>
              </div>
            </Card>

            {/* Academic & Milestones Grid */}
            <div data-reveal-stagger className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card compact hover className="flex flex-col justify-between">
                <div>
                  <span className="text-xs font-semibold text-accent uppercase tracking-wider block mb-1">
                    Education
                  </span>
                  <h5 className="text-base font-bold text-primary">
                    B.Tech in Computer Science
                  </h5>
                  <p className="text-xs text-muted mt-1 leading-relaxed">
                    DMSSVH College of Engineering
                    <br />
                    Affiliated with JNTUK, Machilipatnam
                  </p>
                </div>
                <div className="mt-3 pt-3 border-t border-default text-xs text-accent font-mono font-semibold">
                  2024 — 2028
                </div>
              </Card>

              <Card compact hover className="flex flex-col justify-between">
                <div>
                  <span className="text-xs font-semibold text-accent uppercase tracking-wider block mb-1">
                    Philosophy
                  </span>
                  <h5 className="text-base font-bold text-primary">
                    Clean Code & Practical AI
                  </h5>
                  <p className="text-xs text-muted mt-1 leading-relaxed">
                    Building robust, production-grade applications that solve real-world problems with scalable architectures.
                  </p>
                </div>
                <div className="mt-3 pt-3 border-t border-default text-xs text-accent font-medium">
                  4+ Shipped Solo Projects →
                </div>
              </Card>
            </div>

            {/* CTA Button Row */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Button variant="primary" size="md" onClick={handleScrollToWork}>
                Explore My Work
              </Button>
              <Button variant="ghost" size="md" onClick={handleScrollToContact}>
                Get in Touch
              </Button>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
