'use client'

import { useEffect, useRef, useState, useMemo } from 'react'
import {
  animate,
  motion,
  useInView,
  useMotionValue,
} from 'framer-motion'
import { WordsReveal } from '../text-reveal'

function Counter({
  to,
  suffix = '',
  decimals = 0,
}: {
  to: number
  suffix?: string
  decimals?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-20%' })
  const mv = useMotionValue(0)
  const [display, setDisplay] = useState('0')

  useEffect(() => {
    if (!inView) return
    const controls = animate(mv, to, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(v.toFixed(decimals)),
    })
    return () => controls.stop()
  }, [inView, to, mv, decimals])

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  )
}

function ContributionGraph() {
  const weeks = 52
  const days = 7
  const cells = useMemo(() => {
    const out: number[][] = []
    let seed = 7
    const rand = () => {
      seed = (seed * 9301 + 49297) % 233280
      return seed / 233280
    }
    for (let w = 0; w < weeks; w++) {
      const col: number[] = []
      for (let d = 0; d < days; d++) {
        const r = rand()
        const level = r > 0.78 ? 4 : r > 0.6 ? 3 : r > 0.42 ? 2 : r > 0.25 ? 1 : 0
        col.push(level)
      }
      out.push(col)
    }
    return out
  }, [])

  const levelClass = [
    'bg-foreground/10',
    'bg-primary/30',
    'bg-primary/55',
    'bg-primary/80',
    'bg-primary',
  ]

  return (
    <div className="overflow-x-auto">
      <div className="flex min-w-[640px] gap-1">
        {cells.map((col, w) => (
          <div key={w} className="flex flex-col gap-1">
            {col.map((level, d) => (
              <motion.span
                key={d}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: (w * 7 + d) * 0.0015 }}
                className={`h-3 w-3 rounded-[3px] ${levelClass[level]}`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

const STATS = [
  { label: 'Contributions / yr', to: 1284, suffix: '+' },
  { label: 'LeetCode solved', to: 540, suffix: '+' },
  { label: 'Public repos', to: 38, suffix: '' },
  { label: 'Longest streak', to: 96, suffix: ' days' },
]

export function CodingActivity() {
  return (
    <section
      id="activity"
      className="relative mx-auto max-w-[1400px] scroll-mt-24 px-5 py-24 md:px-10 md:py-36"
    >
      <p className="mb-6 font-mono text-xs uppercase tracking-[0.25em] text-primary">
        (04) — Live activity
      </p>
      <h2 className="mb-12 font-heading text-4xl font-bold leading-[1.05] tracking-tighter text-foreground sm:text-6xl">
        <WordsReveal text="Always shipping." />
      </h2>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-6 lg:col-span-2 md:p-8">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="font-heading text-lg font-semibold tracking-tight text-foreground">
              Contribution graph
            </h3>
            <span className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
              <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
              last 12 months
            </span>
          </div>
          <ContributionGraph />
          <div className="mt-5 flex items-center justify-end gap-2 font-mono text-[10px] text-muted-foreground">
            Less
            <span className="h-3 w-3 rounded-[3px] bg-foreground/10" />
            <span className="h-3 w-3 rounded-[3px] bg-primary/30" />
            <span className="h-3 w-3 rounded-[3px] bg-primary/55" />
            <span className="h-3 w-3 rounded-[3px] bg-primary/80" />
            <span className="h-3 w-3 rounded-[3px] bg-primary" />
            More
          </div>
        </div>

        <div className="grid grid-cols-2 gap-5 lg:grid-cols-1">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col justify-between rounded-2xl border border-border bg-card p-6"
            >
              <span className="font-heading text-4xl font-bold tracking-tighter text-primary sm:text-5xl">
                <Counter to={stat.to} suffix={stat.suffix} />
              </span>
              <span className="mt-2 font-mono text-xs uppercase tracking-wider text-muted-foreground">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}