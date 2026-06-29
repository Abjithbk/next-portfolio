'use client'

import { motion } from 'framer-motion'
import { WordsReveal } from '../text-reveal';

const SKILLS = [
  { name: 'React / Next.js', level: 'Expert', note: 'App Router, RSC, SSR, performance.' },
  { name: 'TypeScript', level: 'Expert', note: 'Strict types, generics, DX-first APIs.' },
  { name: 'Tailwind CSS', level: 'Expert', note: 'Design systems & tokens at scale.' },
  { name: 'Framer Motion', level: 'Advanced', note: 'Scroll, gesture & layout animation.' },
  { name: 'Python / FastAPI', level: 'Advanced', note: 'Async APIs, data pipelines.' },
  { name: 'Node.js', level: 'Advanced', note: 'APIs, tooling, real-time services.' },
  { name: 'PostgreSQL', level: 'Advanced', note: 'Modeling, queries, optimization.' },
  { name: 'MongoDB', level: 'Proficient', note: 'Document modeling & aggregation.' },
  { name: 'Docker', level: 'Proficient', note: 'Containerized dev & deploy.' },
  { name: 'Git / GitHub', level: 'Expert', note: 'Branching, reviews, clean history.' },
  { name: 'Playwright', level: 'Advanced', note: 'E2E tests & browser automation.' },
  { name: 'Figma', level: 'Proficient', note: 'Prototyping & design handoff.' },
]

function FlipCard({ skill, index }: { skill: (typeof SKILLS)[number]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.06 }}
      className="group relative h-32 [perspective:1000px]"
      tabIndex={0}
    >
      <div className="relative h-full w-full transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] group-focus:[transform:rotateY(180deg)]">
        {/* Front */}
        <div className="absolute inset-0 flex flex-col justify-between rounded-xl border border-border bg-card p-4 [backface-visibility:hidden]">
          <span className="font-mono text-[10px] text-muted-foreground">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className="font-heading text-xl font-semibold leading-tight tracking-tight text-foreground">
            {skill.name}
          </span>
        </div>
        {/* Back */}
        <div className="absolute inset-0 flex flex-col justify-between rounded-xl border border-primary bg-primary p-4 text-primary-foreground [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <span className="font-mono text-[10px] uppercase tracking-wider opacity-80">
            {skill.level}
          </span>
          <span className="text-pretty text-sm leading-snug">{skill.note}</span>
        </div>
      </div>
    </motion.div>
  )
}

export function Skills() {
  return (
    <section
      id="skills"
      className="relative scroll-mt-24 bg-navy py-24 text-navy-foreground md:py-36"
    >
      <div className="pointer-events-none absolute inset-0 grid-lines opacity-10" />
      <div className="relative mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="mb-6 font-mono text-xs uppercase tracking-[0.25em] text-primary">
              (02) — Toolkit
            </p>
            <h2 className="font-heading text-4xl font-bold leading-[1.05] tracking-tighter text-navy-foreground sm:text-6xl">
              <WordsReveal text="The stack I build with" />
            </h2>
          </div>
          <p className="max-w-xs text-pretty text-navy-foreground/60">
            Hover or focus a card to flip it. Twelve tools I reach for to ship
            fast without cutting corners.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {SKILLS.map((skill, i) => (
            <FlipCard key={skill.name} skill={skill} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}