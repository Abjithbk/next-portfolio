'use client'

import { useRef, useState } from 'react'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import { WordsReveal } from '../text-reveal'

const TIMELINE = [
  {
    year: '2026',
    title: 'Building AI Operations Agent',
    tag: 'Now',
    detail:
      'Designing an autonomous agent that triages tasks, runs tools, and reports back — wiring LLMs into real workflows.',
  },
  {
    year: '2025',
    title: 'InternPath — Full Stack Platform',
    tag: 'Project',
    detail:
      'Built an intelligent internship guidance platform with NLP-powered resume analysis, skill-based recommendations, and fake internship detection using React, FastAPI, and PostgreSQL.',
  },
  {
    year: '2024',
    title: 'Research — Underwater Image Enhancement',
    tag: 'Research',
    detail:
      'Explored deep learning techniques and classical image processing to restore color and clarity in degraded underwater imagery using CNN-based models and FastAPI.',
  },
  {
    year: '2023',
    title: 'B.Tech — College of Engineering Chengannur',
    tag: 'Education',
    detail:
      'Deep dive into algorithms, systems, and the web — where the obsession with shipping polished products began. Expected graduation: 2027.',
  },
]

function TimelineItem({
  item,
  index,
}: {
  item: (typeof TIMELINE)[number]
  index: number
}) {
  const [open, setOpen] = useState(index === 0)
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-15%' }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="border-b border-border"
    >
      <button
        onClick={() => setOpen((v) => !v)}
        data-cursor
        aria-expanded={open}
        className="flex w-full items-center gap-5 py-5 text-left"
      >
        <span className="font-mono text-sm text-primary">{item.year}</span>
        <span className="flex-1 font-heading text-xl font-semibold tracking-tight sm:text-2xl">
          {item.title}
        </span>
        <span className="hidden rounded-full border border-border px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground sm:inline">
          {item.tag}
        </span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          className="text-2xl text-primary"
        >
          +
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="max-w-md pb-6 pl-12 text-pretty leading-relaxed text-muted-foreground">
              {item.detail}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export function About() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [60, -60])

  return (
    <section
      id="about"
      ref={ref}
      className="relative mx-auto max-w-[1400px] scroll-mt-24 px-5 py-24 md:px-10 md:py-36"
    >
      <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-20">
        <div className="lg:col-span-5">
          <motion.div style={{ y }} className="lg:sticky lg:top-32">
            <p className="mb-6 font-mono text-xs uppercase tracking-[0.25em] text-primary">
              (01) — About
            </p>
            <h2 className="font-heading text-4xl font-bold leading-[1.05] tracking-tighter sm:text-6xl">
              <WordsReveal text="I turn ideas into" />
              <br />
              <span className="text-primary">
                <WordsReveal text="things you can feel." delay={0.2} />
              </span>
            </h2>
            <p className="mt-8 max-w-md text-pretty text-lg leading-relaxed text-muted-foreground">
              I&apos;m a developer who cares as much about the millisecond of a
              transition as the architecture behind it. I like hard problems,
              clean interfaces, and work that feels alive.
            </p>
          </motion.div>
        </div>

        <div className="lg:col-span-7">
          <p className="mb-2 font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
            The path so far — tap to expand
          </p>
          <div>
            {TIMELINE.map((item, i) => (
              <TimelineItem key={item.year} item={item} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}