/**
 * DesignSystem.tsx — temporary living showcase of all UI components.
 * Mount this in App.tsx as a section to verify the design system visually.
 * Remove or comment out when building real section content.
 */

import {
  Heading,
  Subheading,
  Body,
  Label,
  Button,
  SectionWrapper,
  SectionHeader,
  SectionGrid,
  Divider,
  Card,
  TagBadge,
  ProjectCard,
  SkillCard,
  StatCard,
} from '@/components/ui'

const CodeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="16 18 22 12 16 6"/>
    <polyline points="8 6 2 12 8 18"/>
  </svg>
)

export default function DesignSystem() {
  return (
    <>
      {/* ── Typography ──────────────────────────── */}
      <SectionWrapper id="ds-typography" label="Design System — Typography">
        <SectionHeader
          label="Design System"
          heading="Typography Scale"
          sub="Every size variant, weight, and colour token — all token-driven."
        />

        <div className="flex flex-col gap-6">
          <Label>Label / Eyebrow</Label>
          <Heading as="h1" size="8xl">Display 8xl</Heading>
          <Heading as="h1" size="7xl" gradient>Display 7xl gradient</Heading>
          <Heading as="h2" size="6xl">Heading 6xl</Heading>
          <Heading as="h2" size="5xl">Heading 5xl</Heading>
          <Heading as="h3" size="4xl">Heading 4xl</Heading>
          <Heading as="h3" size="3xl">Heading 3xl</Heading>
          <Subheading size="2xl">Subheading 2xl</Subheading>
          <Subheading size="xl" muted>Subheading xl — muted</Subheading>
          <Divider />
          <Body size="xl">Body XL — Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Body>
          <Body size="lg" muted>Body LG muted — Long-form copy describing your experience, philosophy, or process in a measured, professional tone.</Body>
          <Body size="base" subtle>Body base subtle — Additional metadata or supplementary details that provide context without competing for attention.</Body>
          <Body size="sm" muted>Body SM muted — Caption-level text for dates, roles, fine print.</Body>
        </div>
      </SectionWrapper>

      {/* ── Buttons ────────────────────────────── */}
      <SectionWrapper id="ds-buttons" alt label="Design System — Buttons">
        <SectionHeader label="Design System" heading="Buttons" />

        <div className="flex flex-col gap-8">
          {/* Sizes */}
          <div>
            <Body size="sm" muted className="mb-3 uppercase tracking-widest text-xs">Sizes — Primary</Body>
            <div className="flex flex-wrap items-center gap-4">
              <Button variant="primary" size="sm">Small</Button>
              <Button variant="primary" size="md">Medium</Button>
              <Button variant="primary" size="lg">Large</Button>
            </div>
          </div>

          {/* Variants */}
          <div>
            <Body size="sm" muted className="mb-3 uppercase tracking-widest text-xs">Variants</Body>
            <div className="flex flex-wrap items-center gap-4">
              <Button variant="primary">Primary</Button>
              <Button variant="ghost">Ghost / Outline</Button>
              <Button variant="subtle">Subtle</Button>
            </div>
          </div>

          {/* States */}
          <div>
            <Body size="sm" muted className="mb-3 uppercase tracking-widest text-xs">States</Body>
            <div className="flex flex-wrap items-center gap-4">
              <Button variant="primary" loading>Loading…</Button>
              <Button variant="ghost" disabled>Disabled</Button>
              <Button
                variant="ghost"
                icon={<span aria-hidden="true">→</span>}
                iconPosition="right"
              >
                With icon
              </Button>
            </div>
          </div>

          {/* As anchor */}
          <div>
            <Body size="sm" muted className="mb-3 uppercase tracking-widest text-xs">As anchor tag</Body>
            <div className="flex flex-wrap items-center gap-4">
              <Button as="a" href="#contact" variant="primary">Hire me →</Button>
              <Button as="a" href="https://github.com" variant="ghost">GitHub</Button>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* ── Cards ──────────────────────────────── */}
      <SectionWrapper id="ds-cards" label="Design System — Cards">
        <SectionHeader label="Design System" heading="Card Components" />

        {/* Project cards */}
        <div className="mb-12">
          <Body size="sm" muted className="mb-6 uppercase tracking-widest text-xs">Project Cards</Body>
          <SectionGrid cols={3}>
            <ProjectCard
              title="3D Portfolio Experience"
              description="An immersive WebGL portfolio with scroll-driven animations, particle systems, and physics-based interactions."
              tags={['React', 'Three.js', 'GSAP', 'TypeScript']}
              href="https://github.com"
              index="01"
            />
            <ProjectCard
              title="Design System Library"
              description="A comprehensive, token-driven component library built for premium product teams — 80+ components, fully accessible."
              tags={['React', 'Storybook', 'Radix UI']}
              href="https://github.com"
              index="02"
            />
            <ProjectCard
              title="Real-time Dashboard"
              description="High-density data visualisation dashboard with WebSocket streaming and sub-100ms render cycles."
              tags={['Vue 3', 'D3.js', 'WebSocket']}
              index="03"
            />
          </SectionGrid>
        </div>

        {/* Skill cards */}
        <div className="mb-12">
          <Body size="sm" muted className="mb-6 uppercase tracking-widest text-xs">Skill Cards</Body>
          <SectionGrid cols={4}>
            <SkillCard label="React" sublabel="UI Engineering" icon={<CodeIcon />} level={95} />
            <SkillCard label="TypeScript" sublabel="Type Systems" icon={<CodeIcon />} level={88} />
            <SkillCard label="Three.js / R3F" sublabel="3D & WebGL" icon={<CodeIcon />} level={72} />
            <SkillCard label="GSAP" sublabel="Motion Design" icon={<CodeIcon />} level={80} />
          </SectionGrid>
        </div>

        {/* Stat cards */}
        <div className="mb-12">
          <Body size="sm" muted className="mb-6 uppercase tracking-widest text-xs">Stat Cards</Body>
          <SectionGrid cols={4}>
            <StatCard value="5+" label="Years of experience" />
            <StatCard value="40+" label="Projects shipped" />
            <StatCard value="12" label="Open-source libs" />
            <StatCard value="∞"  label="Cups of coffee" />
          </SectionGrid>
        </div>

        {/* Base cards + tags */}
        <div>
          <Body size="sm" muted className="mb-6 uppercase tracking-widest text-xs">Base Card + Tag Badges</Body>
          <SectionGrid cols={2}>
            <Card hover>
              <Subheading size="xl" className="mb-2">Base Card — hover me</Subheading>
              <Body muted size="sm">A generic card container with border-glow + elevation on hover.</Body>
              <div className="flex flex-wrap gap-2 mt-4">
                <TagBadge>React</TagBadge>
                <TagBadge>TypeScript</TagBadge>
                <TagBadge>Tailwind CSS</TagBadge>
              </div>
            </Card>
            <Card compact>
              <Subheading size="xl" className="mb-2">Compact variant</Subheading>
              <Body muted size="sm">Same card with reduced padding — useful inside grid cells or sidebars.</Body>
            </Card>
          </SectionGrid>
        </div>
      </SectionWrapper>
    </>
  )
}
