/**
 * Work.tsx
 *
 * Selected solo projects by Phanindra Kaushik Chennu.
 * Features Canvo, Renewable Energy Locator & ROI Analyzer, Beacon, and Veritas AI.
 */

import { SectionWrapper, SectionHeader, TagBadge } from '@/components/ui'

interface Project {
  id:          string
  index:       string
  title:       string
  subtitle:    string
  description: string
  tags:        string[]
  href:        string
  accentColor: string
  gradient:    string
}

const PROJECTS: Project[] = [
  {
    id: 'canvo',
    index: '01',
    title: 'Canvo',
    subtitle: 'Conversational AI Platform for Local Commerce',
    description:
      "Turns a business's own information into a branded AI concierge — customers can chat, place takeout orders, and book tables directly in the conversation, with support for multiple currencies and multiple business tenants.",
    tags: ['Full-Stack', 'AI', 'Solo Project'],
    href: 'https://canvo-business-app.netlify.app',
    accentColor: '#c8a96e',
    gradient: 'from-amber-500/20 via-accent/10 to-transparent',
  },
  {
    id: 'renewable-energy',
    index: '02',
    title: 'Renewable Energy Locator & ROI Analyzer',
    subtitle: 'Clean Energy Tracking & Carbon Analytics',
    description:
      "Locates, tracks, and analyzes India's renewable energy installations with real-time data, distance calculations, and financial ROI/carbon offset projections. Built for clean energy investors, ESG teams, grid administrators, and researchers.",
    tags: ['Data Analysis', 'Full-Stack', 'Solo Project'],
    href: 'https://renewable-energy-loc.netlify.app',
    accentColor: '#48bb78',
    gradient: 'from-emerald-500/20 via-teal-500/10 to-transparent',
  },
  {
    id: 'beacon',
    index: '03',
    title: 'Beacon',
    subtitle: 'Real-Time 1-to-1 Messaging Platform',
    description:
      'A real-time 1-to-1 messaging platform built for instant communication, low-latency message streaming, and responsive live synchronization.',
    tags: ['Full-Stack', 'Real-Time', 'Solo Project'],
    href: 'https://beacon-message.netlify.app',
    accentColor: '#63b3ed',
    gradient: 'from-blue-500/20 via-indigo-500/10 to-transparent',
  },
  {
    id: 'veritas-ai',
    index: '04',
    title: 'Veritas AI',
    subtitle: 'Content Authenticity & Deepfake Checker',
    description:
      'AI-powered detection tool for checking the authenticity of text, image, and audio content, identifying AI-generated artifacts and synthetic media patterns.',
    tags: ['AI', 'Full-Stack', 'Solo Project'],
    href: 'https://veritas-ai-checker.netlify.app',
    accentColor: '#b794f4',
    gradient: 'from-purple-500/20 via-pink-500/10 to-transparent',
  },
]

export default function Work() {
  return (
    <SectionWrapper id="work" alt label="Featured Solo Projects by Phanindra Kaushik Chennu">
      <SectionHeader
        label="Featured Projects"
        heading={
          <span>
            Selected <span className="gradient-text">Solo Projects</span>
          </span>
        }
        sub="Full-stack web applications, AI-driven platforms, and real-time systems designed and engineered end-to-end."
      />

      {/* 2x2 Grid of 4 Real Solo Projects */}
      <div data-reveal-stagger="0.12" className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {PROJECTS.map((project) => (
          <article
            key={project.id}
            className="card card-hover flex flex-col justify-between group relative overflow-hidden p-5 sm:p-7 md:p-8 bg-surface-1 border border-default rounded-2xl transition-all duration-300"
          >
            {/* Ambient Corner Glow on Hover */}
            <div
              className={`absolute top-0 right-0 w-72 h-72 bg-gradient-to-br ${project.gradient} rounded-full blur-3xl opacity-30 group-hover:opacity-75 transition-opacity duration-500 pointer-events-none`}
              aria-hidden="true"
            />

            <div>
              {/* Header: Project Index & Live Status Badge */}
              <div className="flex items-center justify-between mb-5 sm:mb-6">
                <span className="text-2xl sm:text-3xl md:text-4xl font-black font-mono text-border group-hover:text-accent/60 transition-colors duration-300">
                  {project.index}
                </span>

                <div className="flex items-center gap-2">
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
                  </span>
                  <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-muted">
                    Live Web App
                  </span>
                </div>
              </div>

              {/* Title & Subtitle */}
              <h3 className="text-xl sm:text-2xl font-bold text-primary group-hover:text-accent transition-colors duration-200">
                {project.title}
              </h3>
              <p className="text-xs font-semibold text-accent mt-1 mb-3">
                {project.subtitle}
              </p>

              {/* Description */}
              <p className="text-xs sm:text-sm text-muted leading-relaxed mb-6">
                {project.description}
              </p>
            </div>

            {/* Footer: Tags & Live Launch Link */}
            <div className="pt-4 sm:pt-5 border-t border-default flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <TagBadge key={tag} className="text-[11px] sm:text-xs">
                    {tag}
                  </TagBadge>
                ))}
              </div>

              {/* Action Button Link (Min 44px touch height) */}
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open live project: ${project.title} (opens in new tab)`}
                className="inline-flex items-center gap-2 text-xs font-semibold text-primary hover:text-accent group-hover:translate-x-1 transition-all duration-200 shrink-0 min-h-[44px] py-1 px-1 focus-ring"
              >
                <span>Launch App</span>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </a>
            </div>
          </article>
        ))}
      </div>
    </SectionWrapper>
  )
}
