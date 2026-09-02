/**
 * Skills.tsx
 *
 * Technical skills & core computing stack for Phanindra Kaushik Chennu.
 * Grouped into: Core Languages, Systems & Engineering Fundamentals,
 * and Full Stack Development.
 */

import { SectionWrapper, SectionHeader, Card, TagBadge } from '@/components/ui'

// Custom sleek SVG icons for core skills
const CodeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
)

const LayersIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 17 12 22 22 17" />
    <polyline points="2 12 12 17 22 12" />
  </svg>
)

const DatabaseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
  </svg>
)

const CpuIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="4" y="4" width="16" height="16" rx="2" />
    <rect x="9" y="9" width="6" height="6" />
    <line x1="9" y1="1" x2="9" y2="4" />
    <line x1="15" y1="1" x2="15" y2="4" />
    <line x1="9" y1="20" x2="9" y2="23" />
    <line x1="15" y1="20" x2="15" y2="23" />
    <line x1="20" y1="9" x2="23" y2="9" />
    <line x1="20" y1="14" x2="23" y2="14" />
    <line x1="1" y1="9" x2="4" y2="9" />
    <line x1="1" y1="14" x2="4" y2="14" />
  </svg>
)

const GlobeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
)

const GitCommitIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="4" />
    <line x1="1.05" y1="12" x2="7" y2="12" />
    <line x1="17.01" y1="12" x2="22.96" y2="12" />
  </svg>
)

interface SkillItem {
  name:        string
  category:    string
  description: string
  icon:        React.ReactNode
  tags:        string[]
}

const PRIMARY_SKILLS: SkillItem[] = [
  {
    name: 'C',
    category: 'Programming Languages',
    description: 'Low-level memory management, pointers, and foundational algorithmic thinking.',
    icon: <CodeIcon />,
    tags: ['Memory Management', 'Procedural', 'Core Fundamentals'],
  },
  {
    name: 'Java',
    category: 'Programming Languages',
    description: 'Object-oriented architecture, multi-threading, and scalable backend design.',
    icon: <CodeIcon />,
    tags: ['OOP', 'Collections', 'Enterprise Fundamentals'],
  },
  {
    name: 'Python',
    category: 'Programming Languages',
    description: 'Rapid prototyping, data manipulation, AI/ML integrations, and scripting.',
    icon: <CodeIcon />,
    tags: ['AI Integrations', 'Automation', 'Data Processing'],
  },
  {
    name: 'Data Structures & Algorithms (DSA)',
    category: 'Core Computer Science',
    description: 'Algorithmic complexity optimization, trees, graphs, dynamic programming, and search/sort paradigms.',
    icon: <LayersIcon />,
    tags: ['Time/Space Complexity', 'Problem Solving', 'Data Organization'],
  },
  {
    name: 'Software Engineering',
    category: 'Engineering Methodologies',
    description: 'SDLC practices, modular system design, clean code patterns, and testing.',
    icon: <GitCommitIcon />,
    tags: ['System Architecture', 'Design Patterns', 'Modular Code'],
  },
  {
    name: 'DBMS',
    category: 'Systems & Data',
    description: 'Relational data modeling, SQL queries, normalization, ACID transactions, and indexing.',
    icon: <DatabaseIcon />,
    tags: ['Relational Schemas', 'SQL', 'Query Optimization'],
  },
  {
    name: 'Operating Systems (OS)',
    category: 'Systems & Data',
    description: 'Process scheduling, concurrency & synchronization, memory virtualization, and file systems.',
    icon: <CpuIcon />,
    tags: ['Processes & Threads', 'Memory Virtualization', 'Concurrency'],
  },
  {
    name: 'Full Stack Development',
    category: 'Web & Applications',
    description: 'End-to-end web apps with responsive UIs, RESTful APIs, real-time messaging, and cloud deployments.',
    icon: <GlobeIcon />,
    tags: ['Frontend & Backend', 'REST APIs', 'Real-Time Systems'],
  },
]

export default function Skills() {
  return (
    <SectionWrapper id="skills" label="Technical Skills and Computer Science Stack">
      <SectionHeader
        label="Technical Stack"
        heading={
          <span>
            Core <span className="gradient-text">Computer Science</span> & Engineering Toolkit
          </span>
        }
        sub="A balance of core computing fundamentals, algorithmic problem solving, and modern full-stack application development."
      />

      {/* Skills Grid */}
      <div data-reveal-stagger="0.08" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {PRIMARY_SKILLS.map((skill) => (
          <Card key={skill.name} hover className="flex flex-col justify-between group p-4 sm:p-6">
            <div>
              {/* Header with Icon & Category */}
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className="w-10 h-10 rounded-lg bg-accent-dim flex items-center justify-center text-accent transition-transform duration-300 group-hover:scale-110">
                  {skill.icon}
                </div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-subtle">
                  {skill.category.split(' ')[0]}
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="text-base font-bold text-primary mb-2 transition-colors duration-200 group-hover:text-accent">
                {skill.name}
              </h3>
              <p className="text-xs text-muted leading-relaxed mb-4">
                {skill.description}
              </p>
            </div>

            {/* Tag Badges */}
            <div className="pt-3 border-t border-default flex flex-wrap gap-1.5">
              {skill.tags.map((tag) => (
                <TagBadge key={tag} className="text-[10px] px-2 py-0.5">
                  {tag}
                </TagBadge>
              ))}
            </div>
          </Card>
        ))}
      </div>

      {/* Summary Highlight Banner */}
      <div data-reveal data-reveal-y="20" className="mt-12 p-6 rounded-2xl bg-surface-1 border border-default flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col gap-1 text-center md:text-left">
          <h4 className="text-sm font-bold text-primary">
            Continuous Learning & Adaptability
          </h4>
          <p className="text-xs text-muted max-w-xl">
            Strong foundations in C, Java, and CS theory empower rapid adoption of emerging AI frameworks, modern runtimes, and specialized toolchains.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-accent bg-accent-dim px-3 py-1.5 rounded-full border border-accent/20">
            CSE Core + Modern Stack
          </span>
        </div>
      </div>
    </SectionWrapper>
  )
}
