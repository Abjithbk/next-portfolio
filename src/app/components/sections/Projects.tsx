'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'
import { WordsReveal } from '../text-reveal'
import { Magnetic } from './magnetic'

type Project = {
  num: string
  title: string
  year: string
  category: string
  image: string
  blurb: string
  tags: string[]
  study: string[]
}

const PROJECTS: Project[] = [
  {
    num: '01',
    title: 'InternPath',
    year: '2025',
    category: 'Platform',
    image: '/projects/internpath.png',
    blurb:
      'An intelligent internship guidance platform with NLP-powered resume analysis, skill-based recommendations, and fake internship detection.',
    tags: ['React.js', 'FastAPI', 'PostgreSQL', 'NLP'],
    study: [
      'Built a skill-based recommendation engine that matches student profiles with internship requirements.',
      'Implemented NLP techniques using spaCy and NLTK for resume analysis and key information extraction.',
      'Created a rule-based Internship Readiness Scoring mechanism with actionable improvement recommendations.',
      'Added fake internship detection module to identify potentially fraudulent opportunities.',
    ],
  },
  {
    num: '02',
    title: 'Underwater Image Enhancement',
    year: '2024',
    category: 'Research / ML',
    image: '/projects/underwater.png',
    blurb:
      'Deep-learning pipeline that restores color, contrast, and clarity in degraded underwater imagery using CNN-based models.',
    tags: ['Computer Vision', 'FastAPI', 'Deep Learning', 'Python'],
    study: [
      'Analyzed RGB channel imbalance mathematically and implemented classical enhancement algorithms.',
      'Built and served a CNN-based model for automatic enhancement through a FastAPI backend.',
      'Created a full-stack AI application with frontend interface for uploading and visualizing results.',
      'Compared deep learning approaches against classical techniques like white balance and CLAHE.',
    ],
  },
  {
    num: '03',
    title: 'AI Operations Agent',
    year: '2026',
    category: 'AI / Agents',
    image: '/projects/ai-agent.png',
    blurb:
      'A proactive observability platform that automates incident detection and root-cause analysis using NLP and LLMs.',
    tags: ['Next.js', 'FastAPI', 'Redis', 'LLM / Groq'],
    study: [
      'Built a Universal Ingestion API and lightweight Python SDK for seamless log and metrics streaming.',
      'Implemented multi-stage AI pipeline using Sentence Transformers and DBSCAN for error clustering.',
      'Integrated Large Language Models via Groq to generate plain-English root cause summaries.',
      'Added statistical anomaly detection with Isolation Forest and automated Slack notifications.',
    ],
  },
]

function TiltImage({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rx = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), {
    stiffness: 150,
    damping: 18,
  })
  const ry = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), {
    stiffness: 150,
    damping: 18,
  })

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    x.set((e.clientX - r.left) / r.width - 0.5)
    y.set((e.clientY - r.top) / r.height - 0.5)
  }
  const reset = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
      className="group relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-border bg-card shadow-xl"
    >
      <Image
        src={src || '/placeholder.svg'}
        alt={alt}
        fill
        sizes="(max-width: 1024px) 100vw, 50vw"
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-foreground/5" />
    </motion.div>
  )
}

function ProjectRow({ project, index }: { project: Project; index: number }) {
  const [open, setOpen] = useState(false)
  const flip = index % 2 === 1

  return (
    <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-16">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-15%' }}
        transition={{ duration: 0.6 }}
        className={flip ? 'lg:order-2' : ''}
      >
        <TiltImage src={project.image} alt={`${project.title} preview`} />
      </motion.div>

      <div className={flip ? 'lg:order-1' : ''}>
        <div className="mb-4 flex items-center gap-4 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
          <span className="text-primary">{project.num}</span>
          <span>{project.category}</span>
          <span>·</span>
          <span>{project.year}</span>
        </div>
        <h3 className="font-heading text-4xl font-bold leading-[1.02] tracking-tighter text-foreground sm:text-5xl">
          {project.title}
        </h3>
        <p className="mt-5 max-w-md text-pretty text-lg leading-relaxed text-muted-foreground">
          {project.blurb}
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="cursor-default rounded-full border border-border px-3 py-1.5 font-mono text-xs text-muted-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-primary hover:bg-primary hover:text-primary-foreground"
            >
              {tag}
            </span>
          ))}
        </div>

        <Magnetic>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            className="group mt-8 flex items-center gap-3 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            {open ? 'Close case study' : 'View case study'}
            <motion.span animate={{ rotate: open ? 45 : 0 }} className="text-primary group-hover:text-primary-foreground">
              {open ? '×' : '→'}
            </motion.span>
          </button>
        </Magnetic>

        <AnimatePresence initial={false}>
          {open && (
            <motion.ul
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 space-y-3 overflow-hidden border-l-2 border-primary pl-5"
            >
              {project.study.map((point, i) => (
                <li
                  key={i}
                  className="text-pretty leading-relaxed text-muted-foreground"
                >
                  {point}
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export function Projects() {
  return (
    <section
      id="work"
      className="relative mx-auto max-w-[1400px] scroll-mt-24 px-5 py-24 md:px-10 md:py-36"
    >
      <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <p className="mb-6 font-mono text-xs uppercase tracking-[0.25em] text-primary">
            (03) — Selected work
          </p>
          <h2 className="font-heading text-4xl font-bold leading-[1.05] tracking-tighter text-foreground sm:text-7xl">
            <WordsReveal text="Things I&apos;ve" />
            <br />
            <WordsReveal text="shipped." delay={0.15} />
          </h2>
        </div>
        <p className="max-w-xs text-pretty text-muted-foreground">
          Three projects that pushed me — from platforms to research to
          autonomous AI. Tilt the previews, activate the tags, open the studies.
        </p>
      </div>

      <div className="space-y-24 md:space-y-36">
        {PROJECTS.map((project, i) => (
          <ProjectRow key={project.num} project={project} index={i} />
        ))}
      </div>
    </section>
  )
}